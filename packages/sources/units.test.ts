import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { FIXTURES } from "./testkit.ts";
import { abstractFromInverted } from "./openalex.ts";
import { normalizeCrossref } from "./crossref.ts";
import { cacheFile, makeFetchJson, USER_AGENT } from "./http.ts";
import { mainTitle, normalizeAbstract, normalizeFamily, normalizeTitle, sentenceKey, splitSentences } from "./normalize.ts";
import { prefixMatch, tokenSortRatio } from "./match.ts";
import { isNotice } from "./notices.ts";
import { roleHints } from "./roles.ts";
import { renderReport } from "./report.ts";
import { verifySource } from "./verify.ts";
import { fixtureFetch, makeSource, TODAY } from "./testkit.ts";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

test("10. tokenSortRatio: a title contained in a longer one does not score 1.0, and word order does not matter", () => {
  const short = "Emotion regulation strategies";
  const long = "Emotion regulation strategies across psychopathology: a meta-analytic review";
  assert.ok(tokenSortRatio(short, long) < 0.6);
  assert.equal(tokenSortRatio("a b c d", "d c b a"), 1);
  assert.ok(tokenSortRatio("Let it be: Accepting negative emotions", "let it be accepting negative emotions") > 0.99);
  assert.equal(tokenSortRatio("", ""), 0);
});

test("prefix rule: exact word prefix covering at least 60 % of the candidate's words", () => {
  const ten = "one two three four five six seven eight nine ten";
  assert.equal(prefixMatch("One two three four five six", ten), true); // 6 / 10
  assert.equal(prefixMatch("One two three four five", ten), false); // 5 / 10
  assert.equal(prefixMatch("Two three four five six seven", ten), false); // not a prefix
  // the Mauss title without its subtitle covers only 6 of 11 words: it is the main-title rule that saves it
  const full = "Can seeking happiness make people unhappy? Paradoxical effects of valuing happiness";
  assert.equal(prefixMatch("Can seeking happiness make people unhappy?", full), false);
  assert.equal(tokenSortRatio(mainTitle("Can seeking happiness make people unhappy?"), mainTitle(full)), 1);
});

test("12. no fixture contains an abstract (publishers' rights: the repository is public)", () => {
  const files = readdirSync(FIXTURES).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 20);
  for (const f of files) {
    const text = readFileSync(join(FIXTURES, f), "utf8");
    for (const key of ["abstract", "abstract_inverted_index", "abstractText"]) {
      assert.ok(!text.includes(`"${key}"`), `${f} contains "${key}"`);
    }
  }
});

test("titles: tags, accents and punctuation are normalized; the main title is cut at « : », « ? » or « . »", () => {
  assert.equal(normalizeTitle("<i>Café</i>: A  Study—of H<sub>2</sub>O."), "cafe a study of h2o");
  assert.equal(normalizeTitle("<jats:italic>p</jats:italic>-values &amp; power"), "p values power");
  assert.equal(mainTitle("Can seeking happiness make people unhappy? Paradoxical effects"), "Can seeking happiness make people unhappy");
  assert.equal(mainTitle("Let it be: Accepting negative emotions"), "Let it be");
  assert.equal(mainTitle("A title. And more"), "A title");
  assert.equal(mainTitle("Version 2.5 of a thing"), "Version 2.5 of a thing");
});

test("family names: accents, hyphens, apostrophes and particles are ignored", () => {
  assert.equal(normalizeFamily("Nolen-Hoeksema"), normalizeFamily("Nolen Hoeksema"));
  assert.equal(normalizeFamily("van der Linden"), normalizeFamily("Linden"));
  assert.equal(normalizeFamily("Müller"), normalizeFamily("Muller"));
  assert.equal(normalizeFamily("O'Brien"), normalizeFamily("OBrien"));
  assert.equal(normalizeFamily("Al-Minshawi"), normalizeFamily("Minshawi"));
  assert.equal(normalizeFamily("de"), "de");
});

test("abstracts: dashes, quotes, spaces and the PsycINFO tail are normalized; sentences are split safely", () => {
  const a = normalizeAbstract("It was “good” – really.  Next.  (PsycINFO Database Record (c) 2018 APA, all rights reserved)");
  assert.equal(a, 'It was "good" - really. Next.');
  assert.equal(normalizeAbstract("Done. © 2012 Elsevier Ltd. All rights reserved."), "Done.");
  const s = splitSentences("Effects were small (g = 0.43, p < .05). Older adults, e.g. retirees, differed. We conclude that it works.");
  assert.equal(s.length, 3);
  assert.equal(sentenceKey("Effects were small."), sentenceKey("Effects were small"));
});

test("notices: update-to, OpenAlex type or the title give a notice; a plain article does not", () => {
  assert.equal(isNotice({ crossrefUpdateTo: [{}], titles: ["Anything"] }), true);
  assert.equal(isNotice({ openalexType: "erratum", titles: ["Anything"] }), true);
  for (const t of ["Correction to Smith (2010)", "Erratum: x", "Retracted: y", "Expression of concern", "Comment on a study", "Reply to Jones", "Response to critics",
    "“Can seeking happiness…”: Correction to Mauss, Tamir (2011)."]) assert.equal(isNotice({ titles: [t] }), true, t);
  assert.equal(isNotice({ openalexType: "article", crossrefUpdateTo: [], titles: ["Emotion regulation across psychopathology"] }), false);
  assert.equal(isNotice({ titles: ["Correctional facilities and mood"] }), false);
});

test("role hints: context / aim / method cues come first and are not read as results", () => {
  assert.deepEqual(roleHints("Many studies reported that acceptance strategies were superior to other strategies."), ["context"]);
  assert.deepEqual(roleHints("Research suggests that valuing happiness backfires."), ["context"]);
  assert.ok(roleHints("The aim of this study was to test it.").includes("aim"));
  assert.ok(roleHints("This study examined whether it worked.").includes("aim"));
  assert.ok(roleHints("Participants were 120 students.").includes("method"));
  assert.ok(roleHints("We found that it was associated with less stress (r = .31).").includes("result"));
  assert.ok(roleHints("These findings suggest that acceptance helps.").includes("conclusion"));
  assert.ok(roleHints("The groups did not differ on negative affect.").includes("result"));
  assert.deepEqual(roleHints("Acceptance helps."), []);
});

test("Crossref: titles, subtitle, first author, years and both kinds of notices are read", async () => {
  const body = JSON.parse(readFileSync(join(FIXTURES, "10.1037_a0024986.crossref.json"), "utf8"));
  const r = normalizeCrossref(body.message);
  assert.deepEqual(r.updateTo.map((n) => n.type), ["correction"]);
  assert.equal(r.firstAuthor, "Mauss");
  const m = normalizeCrossref({ DOI: "10.1/x", title: ["T"], subtitle: ["S"], "short-title": ["Short"], "original-title": ["Orig"],
    author: [{ family: "B", sequence: "additional" }, { family: "A", sequence: "first" }],
    issued: { "date-parts": [[2011, 8]] }, created: { "date-parts": [[2010, 1]] }, type: "journal-article",
    "updated-by": [{ DOI: "10.1/e", type: "Retraction" }] });
  assert.deepEqual(m.titles, ["T", "T: S", "Short", "Orig"]);
  assert.equal(m.firstAuthor, "A");
  assert.deepEqual(m.years, [2011, 2010]);
  assert.deepEqual(m.updatedBy, [{ type: "retraction", doi: "10.1/e" }]);
});

test("OpenAlex: the inverted index is rebuilt in word order", () => {
  assert.equal(abstractFromInverted({ the: [0, 3], cat: [1], sat: [2], mat: [4] }), "the cat sat the mat");
  assert.equal(abstractFromInverted(null), null);
});

test("the abstract chain: Crossref is used when Europe PMC has none, in-memory JATS read as text", async () => {
  const base = fixtureFetch();
  const doi = "10.1016/j.jbtep.2012.03.004";
  const fetchJson = async (url: string) => {
    const r = await base(url);
    if (url.includes("api.crossref.org") && r.body) {
      const b = r.body as { message: Record<string, unknown> };
      b.message["abstract"] = "<jats:p><jats:title>Abstract</jats:title>We found <jats:italic>no</jats:italic> difference. Second one here.</jats:p>";
    }
    return r;
  };
  const source = makeSource({ doi, title: "How effective are acceptance strategies? A meta-analytic review of experimental results", firstAuthor: "Kohl", year: 2012,
    design: "meta-analysis", findings: [{ id: "f1", sentence: "We found no difference." }] });
  const v = await verifySource(source, { fetchJson, today: () => TODAY });
  assert.equal(v.abstractFrom, "crossref");
  assert.equal(v.checks.find((c) => c.name === "support:f1")?.result, "pass");
});

test("http: generic User-Agent, three tries on 5xx and non-JSON, 404 returned, no retry on other 4xx, cache", async () => {
  assert.ok(!USER_AGENT.includes("@") || USER_AGENT.includes("github.com/mssnoussi92"));
  assert.ok(!/[\w.]+@[\w.]+\.\w+/.test(USER_AGENT));
  const seen: string[] = [];
  const answers = [new Response("oops", { status: 503 }), new Response("not json", { status: 200 }), new Response('{"ok":true}', { status: 200 })];
  const fetchImpl = (async (_url: string, init?: RequestInit) => {
    seen.push(String((init?.headers as Record<string, string>)["User-Agent"]));
    return answers.shift()!;
  }) as unknown as typeof fetch;
  const waits: number[] = [];
  const dir = mkdtempSync(join(tmpdir(), "bvs-http-"));
  const f = makeFetchJson({ fetchImpl, sleep: async (ms) => { waits.push(ms); }, cacheDir: dir });
  const r = await f("https://example.org/a");
  assert.deepEqual(r, { status: 200, body: { ok: true } });
  assert.equal(seen.length, 3);
  assert.equal(waits.length, 2);
  assert.ok(seen.every((u) => u === USER_AGENT));
  assert.ok(readdirSync(dir).includes(cacheFile(dir, "https://example.org/a").split("/").pop()!));
  // read back from the cache: the fetch implementation is not called again
  const offline = makeFetchJson({ cacheDir: dir, offline: true });
  assert.deepEqual(await offline("https://example.org/a"), r);
  await assert.rejects(offline("https://example.org/b"), /not in the cache/);

  const notFound = makeFetchJson({ fetchImpl: (async () => new Response("", { status: 404 })) as unknown as typeof fetch });
  assert.deepEqual(await notFound("https://example.org/c"), { status: 404, body: null });
  let calls = 0;
  const forbidden = makeFetchJson({ fetchImpl: (async () => { calls++; return new Response("", { status: 403 }); }) as unknown as typeof fetch, sleep: async () => {} });
  await assert.rejects(forbidden("https://example.org/d"), /HTTP 403/);
  assert.equal(calls, 1);
  const always503 = makeFetchJson({ fetchImpl: (async () => new Response("", { status: 503 })) as unknown as typeof fetch, sleep: async () => {} });
  await assert.rejects(always503("https://example.org/e"), /after 3 tries/);
});

test("report: one card per source with the DOI link, the checks and the supporting sentence", async () => {
  const source = makeSource({ doi: "10.1037/a0022010", title: "Can seeking happiness make people unhappy?", firstAuthor: "Mauss", year: 2011 });
  const verification = await verifySource(source, { fetchJson: fixtureFetch(), today: () => TODAY });
  const md = renderReport([{ source, verification }], TODAY);
  assert.match(md, /https:\/\/doi\.org\/10\.1037\/a0022010/);
  assert.match(md, /✓ \*\*title\*\*/);
  assert.match(md, /⚠ \*\*corrections\*\*/);
  assert.match(md, /Read in the full text/);
  assert.match(md, /1 source\(s\)/);
});
