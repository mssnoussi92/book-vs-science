// Each rule must still refuse what it was written to refuse. A green CI proves nothing on its own: these tests copy
// a valid fixture, break ONE thing, and check that the rule (and only an error of that rule) bites. Pattern of
// quran-themes-demo (tests/test_trial_rules.py).
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, describe, test } from "node:test";
import { short } from "../core/canonical.ts";
import { scriptHash, sourcesHash } from "../core/fingerprint.ts";
import { check, loadRepo, type Issue } from "./index.ts";

const FIXTURE = join(import.meta.dirname, "fixtures", "repo");
const EP = "content/episodes/example/episode.json";
const AR = "content/episodes/example/lang/ar-EG.json";
const temps: string[] = [];
after(() => { for (const t of temps) rmSync(t, { recursive: true, force: true }); });

type Json = Record<string, any>;
function copy(): string {
  const dir = mkdtempSync(join(tmpdir(), "bvs-rules-"));
  temps.push(dir);
  cpSync(FIXTURE, dir, { recursive: true });
  return dir;
}
function edit(root: string, path: string, fn: (j: Json) => void) {
  const p = join(root, path);
  const j = JSON.parse(readFileSync(p, "utf8"));
  fn(j);
  writeFileSync(p, JSON.stringify(j, null, 2));
}
const errors = (issues: Issue[]) => issues.filter((i) => i.severity === "error" && !i.gate);
const gates = (issues: Issue[]) => issues.filter((i) => i.gate);

/** Break one thing; the rule must report an error, and no other rule may (so the test proves the right thing). */
function bites(rule: string, path: string, fn: (j: Json) => void, opts: { gate?: boolean; also?: string[] } = {}): void {
  const root = copy();
  edit(root, path, fn);
  const issues = check(root);
  const found = (opts.gate ? gates(issues) : errors(issues)).filter((i) => i.rule === rule);
  assert.ok(found.length > 0, `${rule} should refuse, got: ${JSON.stringify(errors(issues).map((i) => `${i.rule}: ${i.message}`))}`);
  const others = errors(issues).filter((i) => i.rule !== rule && !(opts.also ?? []).includes(i.rule));
  assert.deepEqual(others.map((i) => `${i.rule}: ${i.message}`), [], `only ${rule} should refuse`);
}

describe("the fixture", () => {
  test("is valid: no error, and the only gates are the two approvals still to give", () => {
    const issues = check(FIXTURE);
    assert.deepEqual(errors(issues), []);
    assert.deepEqual(gates(issues).map((i) => i.rule), ["approvals", "approvals"]);
  });
});

describe("structure", () => {
  test("folders: a speaker outside the cast", () => bites("folders", EP, (j) => { j.scenes[0].beats[0].speaker = "ghost"; }));
  test("folders: the narrator speaks inside a scene", () => bites("folders", EP, (j) => { j.scenes[0].beats[0].speaker = "lens"; }));
  test("folders: the narrator over a scene, but in the middle of it", () => bites("folders", EP, (j) => {
    const b = j.scenes[0].beats;
    b.splice(2, 0, { kind: "line", id: "n9", speaker: "lens", emotion: "neutral", voice: "over" });
  }, { also: ["lang-complete"] }));
  test("ids-unique: two lines with the same id", () => bites("ids-unique", EP, (j) => { j.scenes[0].beats[2].id = "l1"; }));
  test("hooks: only four types", () => bites("hooks", EP, (j) => { j.hooks[4].type = "question"; }));
  test("hooks: a number hook without a claim", () => bites("hooks", EP, (j) => { j.hooks[4].type = "number"; }));
  const act = (extra: Record<string, unknown>) => ({ kind: "action", id: "a9", who: "omar", seconds: 1, fx: { id: "spiral", params: {} }, ...extra });
  test("hooks: an action kept for a hook that does not exist", () => bites("hooks", EP, (j) => { j.verdict.beats.push(act({ hooks: ["h9"] })); }));
  test("hooks: an action kept for every hook", () => bites("hooks", EP, (j) => { j.verdict.beats.push(act({ hooks: j.hooks.map((h: { id: string }) => h.id) })); }));
  test("hooks: a caption on a hook's action", () => bites("hooks", EP, (j) => { j.hooks[1].beats = [act({ caption: true })]; }));
  test("folders: an action anchored on a line of another part", () => bites("folders", EP, (j) => { j.verdict.beats.push(act({ at: { line: "zz", word: 0 } })); }));
  test("folders: holds a part with nothing to hold", () => bites("folders", EP, (j) => { j.verdict.beats.push({ kind: "action", id: "a9", who: "omar", seconds: 1, gesture: "breathe", holds: "part" }); }));
  test("custom-scene: two custom scenes", () => bites("custom-scene", EP, (j) => {
    j.scenes[0].custom = "spiral";
    j.scenes.push({ ...structuredClone(j.scenes[0]), id: "s2", beats: j.scenes[0].beats.map((b: Json) => ({ ...b, id: `${b.id}x` })) });
  }, { also: ["lang-complete"] }));          // the copied scene has no texts yet
});

describe("texts", () => {
  test("lang-complete: a missing text", () => bites("lang-complete", AR, (j) => { delete j.texts["s1.l2"]; }));
  test("text-chars: Arabic-Indic digits (123, never ١٢٣)", () => bites("text-chars", AR, (j) => { j.texts["verdict.card"] = "تحليل لـ ٤٠ دراسة"; }));
  test("text-chars: an invisible mark typed by a phone", () => bites("text-chars", AR, (j) => { j.texts["s1.l1"] += "‏"; }));
  test("duration: a version longer than 90 s at the measured rate", () => bites("duration", "languages/ar-EG/language.json", (j) => { j.wordsPerSecond = 0.5; }));
  test("duration: a language nobody voices yet is only warned about", () => {
    const root = copy();
    edit(root, "languages/ar-EG/language.json", (j) => { j.wordsPerSecond = 0.5; });
    edit(root, "characters/omar/character.json", (j) => { delete j.voices; });
    assert.deepEqual(errors(check(root)).filter((i) => i.rule === "duration"), []);
  });
  test("duration: a version longer than the minute is warned about, until the owner validates its video", () => {
    const root = copy();
    edit(root, "languages/ar-EG/language.json", (j) => { j.wordsPerSecond = 0.8; });
    const warned = (r: string) => check(r).filter((i) => i.rule === "duration" && i.severity === "warn" && i.message.startsWith("ar-EG"));
    assert.equal(warned(root).length, 1);
    writeFileSync(join(root, "content/episodes/example/approvals.json"), JSON.stringify({ video: { "ar-EG": { on: "2026-11-22", words: "je valide cette version", via: "conversation", hash: "0".repeat(64) } } }));
    assert.equal(warned(root).length, 0);
  });
  test("lengths: a first frame too long to read in a second", () => bites("lengths", AR, (j) => { j.texts["hook.h2.frame"] = "جرب ده تلات ثواني بس وانت قاعد مكانك"; }));
  test("no-author-name: the author named in a line", () => bites("no-author-name", AR, (j) => { j.texts["book.l1"] = "جين إكزامبل بتقول إن العادة دي بتقلل التوتر."; }));
  test("numbers: a figure that no cited source holds", () => bites("numbers", AR, (j) => { j.texts["verdict.card"] = "تحليل لـ 57 دراسة"; }));
  test("numbers: the study card shows a figure of another study than the one on screen", () =>
    bites("numbers", AR, (j) => { j.texts["verdict.card"] = "تجربة على 120 شخص"; }));   // 120 is exp-2019's n, the card shows meta-2020
  test("sensitive: an emotions episode without its orientation line", () => bites("sensitive", EP, (j) => { j.takeaway.orientation = false; }));
  test("sensitive: a topic the texts reveal but the writer did not declare", () => bites("sensitive", EP, (j) => { j.topic.sensitive = []; }));
  test("sensitive: advice that is never given", () => bites("sensitive", AR, (j) => { j.texts["takeaway.l1"] = "طلّع اللي جواك وخلاص."; }));
  test("causal-verbs: a cause said on associations only", () => {
    const root = copy();
    edit(root, EP, (j) => { j.verdict.assessments[0].evidence = [j.verdict.assessments[0].evidence[0]]; j.takeaway.strength = "low-risk-suggestion"; });
    edit(root, AR, (j) => { j.texts["verdict.l1"] = "الدراسات بتقول إن العادة دي بتسبب توتر أقل."; });
    assert.ok(errors(check(root)).some((i) => i.rule === "causal-verbs"));
  });
  test("generalizations: the narrator generalizes about a group", () => bites("generalizations", AR, (j) => { j.texts["book.l1"] = "الكتاب بيقول إن الستات كلهم متوترين."; }));
  test("applicability: no Arab sample, and nobody says it", () => bites("applicability", AR, (j) => { j.texts["verdict.nuance"] = "الأثر صغير."; }));
  test("applicability: written under the study card, no line needs to say it", () => {
    const root = copy();
    edit(root, AR, (j) => { j.texts["verdict.nuance"] = "الأثر صغير."; });
    edit(root, EP, (j) => { j.verdict.applicability = "written"; });
    assert.deepEqual(errors(check(root)).filter((i) => i.rule === "applicability"), []);
  });
});

describe("book", () => {
  test("a quotation longer than 12 words", () => bites("book", AR, (j) => { j.texts["book.l1"] = "الكتاب بيقول « واحد اتنين تلاتة أربعة خمسة ستة سبعة تمانية تسعة عشرة حداشر اتناشر تلتاشر »"; }));
  test("a basis the book does not have", () => bites("book", EP, (j) => { j.book.basis = "ch9"; }));
  test("an author's article without its URL", () => bites("book", "content/books/example-book.json", (j) => { j.basis[0].kind = "author-article"; }));
  test("a fourth episode on the same book: a warning, not an error (the owner's decision, 2026-11-22)", () => {
    const root = copy();
    for (const n of [2, 3, 4]) {
      cpSync(join(root, "content/episodes/example"), join(root, `content/episodes/example${n}`), { recursive: true });
      edit(root, `content/episodes/example${n}/episode.json`, (j) => { j.id = `example${n}`; });
    }
    const issues = check(root);
    assert.ok(!errors(issues).some((i) => i.rule === "book" && i.message.includes("épisodes sur ce livre")));
    assert.ok(issues.some((i) => i.rule === "book" && i.severity === "warn" && i.message.includes("épisodes sur ce livre")));
  });
});

describe("evidence and verdict", () => {
  test("sources-exist: a source that is not in the registry", () =>
    bites("sources-exist", EP, (j) => { j.verdict.assessments[0].evidence[0].source = "nobody-2021"; }, { also: ["numbers"] }));   // its figures go with it
  test("sources-verified: a source whose verification is not a pass blocks the voice and the render", () =>
    bites("sources-verified", "content/sources/meta-2020.verify.json", (j) => { j.status = "review"; j.checks[0].result = "review"; }, { gate: true }));
  test("verdict: ✅ on a low certainty", () => bites("verdict", EP, (j) => { j.verdict.badge = "confirmed"; j.verdict.certainty = "low"; j.verdict.assessments[0].certainty = "low"; }));
  test("verdict: a certainty above the cap (a causal claim carried by correlations only)", () => bites("verdict", EP, (j) => {
    j.verdict.assessments[0].evidence = [j.verdict.assessments[0].evidence[0]];
    j.verdict.assessments[0].certainty = "high"; j.takeaway.strength = "low-risk-suggestion";
  }));
  test("verdict: a search protocol that never looked for replications", () => bites("verdict", EP, (j) => { j.verdict.searched.queries[1].query = "habit X review"; }));
  test("verdict: an in-scope claim left unassessed", () => bites("verdict", EP, (j) => { j.book.claims[1].inScope = true; }));
  test("verdict: ⚖️ without its nuance", () => bites("verdict", EP, (j) => { delete j.verdict.nuance; }));
  test("verdict: 'supports' while a higher-rank study contradicts (the meta-analysis against the experiment)", () =>
    bites("verdict", EP, (j) => { j.verdict.assessments[0].evidence[0].relation = "contradicts"; }));
  test("verdict: an effect known for its replication failures, without a multi-lab replication", () => {
    const root = copy();
    writeFileSync(join(root, "content/contested.json"), JSON.stringify([{ key: "exp-2019", why: "fixture: failed replication" }]));
    assert.ok(errors(check(root)).some((i) => i.rule === "verdict" && i.message.includes("contesté")));
  });
  test("claims-said: a hook that asserts a mixed claim (hook ≤ verdict)", () => bites("claims-said", EP, (j) => { j.hooks[2].claims = ["c1"]; j.verdict.assessments[0].direction = "mixed"; }));
  test("claims-said: a question on a mixed claim of moderate certainty passes (docs/verdict.md §5)", () => {
    const root = copy();
    edit(root, EP, (j) => { j.hooks[0].claims = ["c1"]; j.verdict.assessments[0].direction = "mixed"; });
    assert.deepEqual(errors(check(root)).filter((i) => i.rule === "claims-said"), []);
  });
  test("claims-said: a question on a low-certainty claim is still refused", () => bites("claims-said", EP, (j) => {
    j.hooks[0].claims = ["c1"]; j.verdict.assessments[0].direction = "mixed"; j.verdict.assessments[0].certainty = "low";
  }, { also: ["verdict"] }));
  test("claims-said: a line that states an out-of-scope claim", () => bites("claims-said", EP, (j) => { j.verdict.beats[0].claims = ["c2"]; }));
  test("outcome: a scene that ends in a cure on a ⚖️", () => bites("outcome", EP, (j) => { j.scenes[0].outcome = "better"; }));
  test("takeaway: 'evidence' without any causal finding on the action", () => bites("takeaway", EP, (j) => {
    j.verdict.assessments[0].evidence = [j.verdict.assessments[0].evidence[0]];
    j.verdict.assessments[0].certainty = "low"; j.verdict.certainty = "low";   // what the verdict rule would demand
  }));
});

describe("approvals", () => {
  test("an approval given, then a line changed: the approval is stale by itself", () => {
    const root = copy();
    const repo = loadRepo(root);
    const e = repo.episodes[0]!;
    const sh = sourcesHash(e.episode, repo.sources, repo.verifications);
    const ch = scriptHash(e.episode, e.langs.get("ar-EG")!);
    writeFileSync(join(root, "content/episodes/example/approvals.json"), JSON.stringify({
      sources: { on: "2026-11-22", words: `je valide les sources (${short(sh)})`, via: "conversation", hash: sh },
      script: { "ar-EG": { on: "2026-11-22", words: `je valide le script (${short(ch)})`, via: "conversation", hash: ch } },
    }));
    assert.deepEqual(gates(check(root)), [], "fresh approvals: no gate left");
    edit(root, AR, (j) => { j.texts["s1.l2"] = "طيب يلا نجربها سوا."; });
    const stale = gates(check(root));
    assert.equal(stale.length, 1);
    assert.match(stale[0]!.message, /script ar-EG périmée/);
  });

  test("a re-verification that changes nothing decisive does not touch the sources approval", () => {
    const root = copy();
    const before = loadRepo(root);
    const h0 = sourcesHash(before.episodes[0]!.episode, before.sources, before.verifications);
    edit(root, "content/sources/meta-2020.verify.json", (j) => { j.checkedOn = "2027-03-01"; j.tool = "bvs-sources@0.2"; j.checks[2].detail = "score 0.981"; });
    const after = loadRepo(root);
    assert.equal(sourcesHash(after.episodes[0]!.episode, after.sources, after.verifications), h0);
  });

  test("a notice appearing on a cited study does change the sources approval", () => {
    const root = copy();
    const before = loadRepo(root);
    const h0 = sourcesHash(before.episodes[0]!.episode, before.sources, before.verifications);
    edit(root, "content/sources/meta-2020.verify.json", (j) => { j.notices = [{ type: "correction", doi: "10.1000/example.fix" }]; });
    const after = loadRepo(root);
    assert.notEqual(sourcesHash(after.episodes[0]!.episode, after.sources, after.verifications), h0);
  });
});
