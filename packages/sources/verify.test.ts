import assert from "node:assert/strict";
import { test } from "node:test";
import { Verification } from "../schema/source.ts";
import { verifySource } from "./verify.ts";
import { fixtureFetch, makeSource, TODAY } from "./testkit.ts";

const deps = (abstracts: Record<string, string> = {}) => ({ fetchJson: fixtureFetch(abstracts), today: () => TODAY });
const result = (v: Verification, name: string) => v.checks.find((c) => c.name === name)?.result;

const MAUSS = {
  doi: "10.1037/a0022010",
  title: "Can seeking happiness make people unhappy? Paradoxical effects of valuing happiness",
  firstAuthor: "Mauss",
  authors: ["Mauss", "Tamir", "Anderson", "Savino"],
  year: 2011,
};
const CORRECTION = { doi: "10.1037/a0024986", type: "correction", changes: "correction of an author table, no effect on the results" };

test("1. Mauss 2011: identity passes, the unacknowledged correction asks for a review", async () => {
  const v = await verifySource(makeSource(MAUSS), deps());
  for (const name of ["exists", "not-a-notice", "title", "first-author", "year", "type", "retraction"]) assert.equal(result(v, name), "pass", name);
  assert.equal(result(v, "corrections"), "review");
  assert.equal(v.status, "review");
  assert.deepEqual(v.notices, [{ type: "correction", doi: "10.1037/a0024986" }]);
  assert.equal(v.tool, "bvs-sources@0.1");
  assert.equal(v.checkedOn, TODAY);
  Verification.parse(v);
});

test("1b. Mauss 2011: the correction acknowledged makes it pass", async () => {
  const v = await verifySource(makeSource({ ...MAUSS, acknowledged: [CORRECTION] }), deps());
  assert.equal(result(v, "corrections"), "pass");
  assert.equal(v.status, "pass");
});

test("2. the DOI of the correction notice, declared with the article's title, authors and year, fails", async () => {
  const v = await verifySource(makeSource({ ...MAUSS, doi: "10.1037/a0024986" }), deps());
  assert.equal(result(v, "not-a-notice"), "fail");
  assert.equal(v.status, "fail");
  assert.match(v.checks.find((c) => c.name === "not-a-notice")!.detail, /update-to|erratum|correction/i);
});

test("3. Ford 2018 declared 2018 while Crossref `created` says 2017 passes", async () => {
  const v = await verifySource(
    makeSource({
      doi: "10.1037/pspp0000157",
      title: "The psychological health benefits of accepting negative emotions and thoughts: Laboratory, diary, and longitudinal evidence",
      firstAuthor: "Ford",
      year: 2018,
      design: "longitudinal",
    }),
    deps(),
  );
  assert.equal(result(v, "year"), "pass");
  assert.ok(v.found.years.includes(2017) && v.found.years.includes(2018));
  assert.equal(v.status, "pass");
});

test("4. Aldao 2010 declared 2010 while OpenAlex says 2009 passes", async () => {
  const v = await verifySource(
    makeSource({
      doi: "10.1016/j.cpr.2009.11.004",
      title: "Emotion-regulation strategies across psychopathology: A meta-analytic review",
      firstAuthor: "Aldao",
      year: 2010,
      design: "meta-analysis",
    }),
    deps(),
  );
  assert.ok(v.found.years.includes(2009) && v.found.years.includes(2010));
  assert.equal(result(v, "year"), "pass");
  assert.equal(result(v, "type"), "pass");
  assert.equal(v.status, "pass");
});

test("5. a right DOI of another article of the same journal and year fails on title and first author", async () => {
  const v = await verifySource(
    makeSource({
      doi: "10.1016/j.brat.2010.05.004", // Flaxman & Bond, not Shallcross
      title: "Let it be: Accepting negative emotional experiences predicts decreased negative affect and depressive symptoms",
      firstAuthor: "Shallcross",
      year: 2010,
    }),
    deps(),
  );
  assert.equal(result(v, "title"), "fail");
  assert.equal(result(v, "first-author"), "fail");
  assert.equal(result(v, "year"), "pass"); // same year: the year alone protects nothing
  assert.equal(v.status, "fail");
});

test("5b. the right DOI for the same declaration passes", async () => {
  const v = await verifySource(
    makeSource({
      doi: "10.1016/j.brat.2010.05.025",
      title: "Let it be: Accepting negative emotional experiences predicts decreased negative affect and depressive symptoms",
      firstAuthor: "Shallcross",
      year: 2010,
    }),
    deps(),
  );
  assert.equal(v.status, "pass");
});

test("6. « Can seeking happiness make people unhappy? » without its subtitle passes (cut at « ? » / prefix)", async () => {
  const v = await verifySource(makeSource({ ...MAUSS, title: "Can seeking happiness make people unhappy?", acknowledged: [CORRECTION] }), deps());
  assert.equal(result(v, "title"), "pass");
});

test("7. a retracted paper (Wakefield 1998) fails", async () => {
  const v = await verifySource(
    makeSource({
      doi: "10.1016/S0140-6736(97)11096-0",
      title: "Ileal-lymphoid-nodular hyperplasia, non-specific colitis, and pervasive developmental disorder in children",
      firstAuthor: "Wakefield",
      year: 1998,
      design: "cross-sectional",
    }),
    deps(),
  );
  assert.equal(result(v, "retraction"), "fail");
  assert.equal(v.retracted, true);
  assert.equal(v.status, "fail");
});

const GLOSTER = {
  doi: "10.1016/j.jcbs.2020.09.009",
  title: "The empirical status of acceptance and commitment therapy: A review of meta-analyses",
  firstAuthor: "Gloster",
  year: 2020,
  design: "umbrella-review",
};

test("8. Gloster 2020: the grouped erratum asks for a review, acknowledged it passes", async () => {
  const open = await verifySource(makeSource(GLOSTER), deps());
  assert.equal(result(open, "corrections"), "review");
  assert.equal(open.status, "review");
  assert.ok(open.notices.some((n) => n.doi === "10.1016/j.jcbs.2021.03.005"));
  const done = await verifySource(
    makeSource({ ...GLOSTER, acknowledged: [{ doi: "10.1016/j.jcbs.2021.03.005", type: "erratum", changes: "grouped erratum of 41 articles, no effect on results" }] }),
    deps(),
  );
  assert.equal(result(done, "corrections"), "pass");
  assert.equal(done.status, "pass");
});

// Synthetic abstract written for the tests (not a publisher's text).
const KOHL = {
  doi: "10.1016/j.jbtep.2012.03.004",
  title: "How effective are acceptance strategies? A meta-analytic review of experimental results",
  firstAuthor: "Kohl",
  year: 2012,
  design: "meta-analysis",
};
const CONTEXT = "Many studies reported that acceptance strategies were superior to other strategies for negative affect.";
const RESULT = "We found no difference between acceptance and other strategies for negative affect, and a moderate advantage for pain tolerance (g = 0.43).";
const ABSTRACT = `${CONTEXT} ${RESULT} Effects were small in this synthetic example.`;

test("9a. support: a whole sentence of the abstract passes", async () => {
  const v = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT }] }), deps({ [KOHL.doi]: ABSTRACT }));
  assert.equal(result(v, "support:f1"), "pass");
  assert.equal(v.abstractFrom, "europepmc");
  assert.match(v.abstractSha256 ?? "", /^[0-9a-f]{64}$/);
  assert.equal(v.status, "pass");
});

test("9b. support: a fragment (substring) fails", async () => {
  const fragment = "no difference between acceptance and other strategies for negative affect";
  const v = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: fragment }] }), deps({ [KOHL.doi]: ABSTRACT }));
  assert.equal(result(v, "support:f1"), "fail");
  assert.match(v.checks.find((c) => c.name === "support:f1")!.detail, /fragment/);
  assert.equal(v.status, "fail");
});

test("9c. support: a context sentence declared as a result asks for a review", async () => {
  const v = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: CONTEXT }] }), deps({ [KOHL.doi]: ABSTRACT }));
  assert.equal(result(v, "support:f1"), "review");
  assert.equal(v.status, "review");
});

test("9d. support: typographic dashes and quotes in the declared sentence do not matter", async () => {
  const abstract = "Participants who valued happiness felt worse – under low stress only. A second sentence follows here.";
  const v = await verifySource(
    makeSource({ ...KOHL, findings: [{ id: "f1", sentence: "Participants who valued happiness felt worse - under low stress only." }] }),
    deps({ [KOHL.doi]: abstract }),
  );
  assert.equal(result(v, "support:f1"), "pass");
});

test("9e. support: no abstract anywhere asks for a review; a full-text reading needs `readBy`", async () => {
  const none = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT }] }), deps());
  assert.equal(none.abstractFrom, "none");
  assert.equal(result(none, "abstract"), "review");
  assert.equal(result(none, "support:f1"), "review");
  const noReader = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT, where: "fulltext" }] }), deps());
  assert.equal(result(noReader, "support:f1"), "review");
  const read = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT, where: "fulltext", readBy: "reviewer, p. 4" }] }), deps());
  assert.equal(result(read, "support:f1"), "pass");
});

test("11. a meta-analysis declared when neither the title nor the abstract says so asks for a review", async () => {
  const v = await verifySource(
    makeSource({
      doi: "10.1037/pspp0000157",
      title: "The psychological health benefits of accepting negative emotions and thoughts: Laboratory, diary, and longitudinal evidence",
      firstAuthor: "Ford",
      year: 2018,
      design: "meta-analysis",
    }),
    deps(),
  );
  assert.equal(result(v, "type"), "review");
  assert.equal(v.status, "review");
});

test("11b. multisite-replication needs « multi-lab », « registered replication »… in the title or abstract", async () => {
  const base = { doi: "10.1037/pspp0000157", title: "The psychological health benefits of accepting negative emotions and thoughts: Laboratory, diary, and longitudinal evidence", firstAuthor: "Ford", year: 2018, design: "multisite-replication" };
  assert.equal(result(await verifySource(makeSource(base), deps()), "type"), "review");
  const ok = await verifySource(makeSource(base), deps({ [base.doi]: "A registered replication report across sites. Nothing else is said here." }));
  assert.equal(result(ok, "type"), "pass");
});

test("a DOI Crossref does not know fails; one database down asks for a review", async () => {
  const unknown = await verifySource(makeSource({ ...MAUSS, doi: "10.1037/zzz999999" }), deps());
  assert.equal(result(unknown, "exists"), "fail");
  assert.equal(unknown.status, "fail");
  const base = fixtureFetch();
  const openalexDown = async (url: string) => {
    if (url.includes("openalex")) throw new Error("HTTP 503 after 3 tries");
    return base(url);
  };
  const v = await verifySource(makeSource({ ...MAUSS, acknowledged: [CORRECTION] }), { fetchJson: openalexDown, today: () => TODAY });
  assert.equal(result(v, "exists"), "review");
  assert.equal(v.status, "review");
  const bothDown = await verifySource(makeSource(MAUSS), { fetchJson: async () => { throw new Error("offline"); }, today: () => TODAY });
  assert.equal(bothDown.status, "review");
});

test("the abstract hash differing from the sheet's asks for a review; a copyright tail does not change the hash", async () => {
  const a = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT }] }), deps({ [KOHL.doi]: ABSTRACT }));
  const b = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT }] }), deps({ [KOHL.doi]: `${ABSTRACT} (PsycINFO Database Record (c) 2018 APA, all rights reserved)` }));
  assert.equal(a.abstractSha256, b.abstractSha256);
  const sheet = { ...makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT }] }), abstractSha256: "0".repeat(64) };
  const c = await verifySource(sheet, deps({ [KOHL.doi]: ABSTRACT }));
  assert.equal(result(c, "abstract"), "review");
});

test("the result never contains an abstract or a finding's sentence", async () => {
  const v = await verifySource(makeSource({ ...KOHL, findings: [{ id: "f1", sentence: RESULT }] }), deps({ [KOHL.doi]: ABSTRACT }));
  const text = JSON.stringify(v);
  assert.ok(!text.includes("moderate advantage"));
  assert.ok(!text.includes("Many studies reported"));
});
