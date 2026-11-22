// Verification of one study of the registry (docs/conception.md §4.4). The identity checks compare what the writer
// DECLARED before any query with what Crossref, OpenAlex and Europe PMC say. Nothing from a publisher's abstract
// goes into the result: only its hash.
import { createHash } from "node:crypto";
import { Verification, type Source } from "../schema/source.ts";
import { fetchCrossref, type CrossrefRecord, type Notice } from "./crossref.ts";
import { fetchEuropePmc, type EuropePmcRecord } from "./europepmc.ts";
import type { FetchJson } from "./http.ts";
import type { Lookup } from "./lookup.ts";
import { mainTitle, normalizeAbstract, normalizeFamily, familyOfDeclared, sentenceKey, splitSentences, words } from "./normalize.ts";
import { prefixMatch, tokenSortRatio } from "./match.ts";
import { noticeReason } from "./notices.ts";
import { fetchOpenAlex, type OpenAlexRecord } from "./openalex.ts";
import { looksLikeNonResult, roleHints } from "./roles.ts";

export { roleHints } from "./roles.ts";
export const TOOL = "bvs-sources@0.1";

type Result = "pass" | "review" | "fail";
interface Check {
  name: string;
  result: Result;
  detail: string;
}

export interface VerifyDeps {
  fetchJson: FetchJson;
  /** YYYY-MM-DD, for tests. */
  today?: () => string;
}

const GOOD_TYPES = new Set(["journal-article", "proceedings-article", "book-chapter", "report"]);
const RETRACTION_TYPES = new Set(["retraction", "withdrawal", "removal", "partial_retraction", "expression_of_concern", "expression-of-concern"]);
const TITLE_PASS = 0.92;
const TITLE_REVIEW = 0.8;

const cut = (s: string, n = 380) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
const check = (name: string, result: Result, detail: string): Check => ({ name, result, detail: cut(detail) });
const ok = <T>(l: Lookup<T>): T | null => (l.kind === "ok" ? l.record : null);
const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const worst = (rs: Result[]): Result => (rs.includes("fail") ? "fail" : rs.includes("review") ? "review" : "pass");
const state = (l: Lookup<unknown>) => (l.kind === "ok" ? "ok" : l.kind === "not-found" ? "404" : `unavailable (${l.error})`);

function titleCheck(declared: string, cr: CrossrefRecord | null, oa: OpenAlexRecord | null): Check {
  const candidates: { title: string; from: string }[] = [
    ...(cr?.titles ?? []).map((title) => ({ title, from: "Crossref" })),
    ...(oa?.titles ?? []).map((title) => ({ title, from: "OpenAlex" })),
  ];
  if (!candidates.length) return check("title", "review", "no title to compare with");
  const dMain = mainTitle(declared);
  let best = { score: -1, via: "", title: "", from: "" };
  for (const c of candidates) {
    let score = tokenSortRatio(declared, c.title);
    let via = "whole title";
    if (prefixMatch(declared, c.title) && score < 1) {
      score = 1;
      via = "prefix of the candidate";
    }
    const cMain = mainTitle(c.title);
    if (words(dMain).length >= 4 && words(cMain).length >= 4) {
      const s = tokenSortRatio(dMain, cMain);
      if (s > score) {
        score = s;
        via = "main title";
      }
    }
    if (score > best.score) best = { score, via, title: c.title, from: c.from };
  }
  const result: Result = best.score >= TITLE_PASS ? "pass" : best.score >= TITLE_REVIEW ? "review" : "fail";
  return check("title", result, `score ${best.score.toFixed(2)} (${best.via}) against « ${best.title} » (${best.from})`);
}

function firstAuthorCheck(source: Source, cr: CrossrefRecord | null, oa: OpenAlexRecord | null): Check {
  const declared = normalizeFamily(familyOfDeclared(source.declared.firstAuthor));
  const firsts = [cr?.firstAuthor, oa?.firstAuthor].filter((x): x is string => !!x);
  if (!firsts.length) return check("first-author", "review", "no author in the databases");
  if (!firsts.some((f) => normalizeFamily(f) === declared)) {
    return check("first-author", "fail", `declared « ${source.declared.firstAuthor} », found « ${firsts.join(" / ")} »`);
  }
  const listed = source.declared.authors?.slice(0, 5);
  if (listed && listed.length) {
    const known = new Set([...(cr?.authorFamilies ?? []), ...(oa?.authorFamilies ?? [])].map(normalizeFamily));
    const present = listed.filter((a) => known.has(normalizeFamily(familyOfDeclared(a)))).length;
    const ratio = present / listed.length;
    if (ratio < 0.75) return check("first-author", "review", `first author matches, but only ${present} of the first ${listed.length} declared authors are listed`);
    return check("first-author", "pass", `first author « ${firsts[0]} » matches; ${present}/${listed.length} declared authors present`);
  }
  return check("first-author", "pass", `first author « ${firsts[0]} » matches`);
}

function yearCheck(declared: number, years: number[]): Check {
  if (!years.length) return check("year", "review", "no year in the databases");
  const near = years.some((y) => Math.abs(y - declared) <= 1);
  return check("year", near ? "pass" : "fail", `declared ${declared}, found ${[...new Set(years)].sort().join(", ")}`);
}

const DESIGN_EVIDENCE: Record<string, RegExp> = {
  "meta-analysis": /meta-?analy/i,
  "systematic-review": /systematic (?:review|search)|meta-?analy/i,
  "umbrella-review": /umbrella|review of meta-?analy|review of systematic/i,
  "multisite-replication": /multi-?lab|multi-?site|registered replication|many labs/i,
};

function typeCheck(source: Source, cr: CrossrefRecord | null, oa: OpenAlexRecord | null, text: string): Check {
  if (!cr) return check("type", "review", "Crossref unavailable: type not checked");
  let result: Result = GOOD_TYPES.has(cr.type) ? "pass" : cr.type === "posted-content" ? "review" : "fail";
  let detail = `Crossref type « ${cr.type} »` + (cr.type === "posted-content" ? " (preprint)" : "");
  const evidence = DESIGN_EVIDENCE[source.design];
  if (evidence) {
    const haystack = [...cr.titles, ...(oa?.titles ?? []), text].join(" ");
    if (!evidence.test(haystack)) {
      result = worst([result, "review"]);
      detail += `; design « ${source.design} » is not corroborated by the title or the abstract`;
    } else {
      detail += `; design « ${source.design} » corroborated by the title or the abstract`;
    }
  }
  return check("type", result, detail);
}

function retractionCheck(cr: CrossrefRecord | null, oa: OpenAlexRecord | null): Check {
  const bad = (cr?.updatedBy ?? []).filter((n) => RETRACTION_TYPES.has(n.type));
  if (bad.length) return check("retraction", "fail", `Crossref updated-by: ${bad.map((n) => `${n.type} ${n.doi}`).join(", ")}`);
  if (oa?.isRetracted) return check("retraction", "fail", "OpenAlex is_retracted is true");
  if (!cr) return check("retraction", "review", "Crossref unavailable: updated-by not read");
  return check("retraction", "pass", "no retraction, withdrawal, removal or expression of concern" + (oa ? "" : " (OpenAlex unavailable)"));
}

function correctionsCheck(source: Source, cr: CrossrefRecord | null): Check {
  if (!cr) return check("corrections", "review", "Crossref unavailable: updated-by not read");
  const others = cr.updatedBy.filter((n) => !RETRACTION_TYPES.has(n.type));
  if (!others.length) return check("corrections", "pass", "no correction or erratum");
  const acknowledged = new Set(source.acknowledged.map((a) => a.doi.toLowerCase()));
  // Any notice short of a retraction can be acknowledged once read (a clarification, a new version: not only corrections).
  const open = others.filter((n) => !acknowledged.has(n.doi.toLowerCase()));
  if (!open.length) return check("corrections", "pass", `${others.length} notice(s), all acknowledged: ${others.map((n) => n.doi).join(", ")}`);
  return check("corrections", "review", `to read and acknowledge: ${open.map((n) => `${n.type} ${n.doi}`).join(", ")}`);
}

function supportChecks(source: Source, abstractText: string | null): Check[] {
  const sentences = abstractText ? splitSentences(abstractText).map(sentenceKey) : [];
  return source.findings.map((f): Check => {
    const name = `support:${f.id}`;
    const s = f.support;
    if (s.where === "fulltext") {
      return s.readBy ? check(name, "pass", `full-text reading by ${s.readBy}`) : check(name, "review", "full-text support without `readBy`: who read it, where?");
    }
    if (!abstractText) return check(name, "review", "no abstract anywhere: a human reading must be recorded (`where: fulltext` + `readBy`)");
    const key = sentenceKey(s.sentence);
    if (!sentences.includes(key)) {
      const fragment = normalizeAbstract(abstractText).toLowerCase().includes(key.toLowerCase());
      return check(name, "fail", fragment ? "the sentence is a fragment of the abstract, not a whole sentence" : "the sentence is not found in the abstract");
    }
    const nonResult = looksLikeNonResult(s.sentence);
    if (nonResult) return check(name, "review", `whole sentence of the abstract, but its cues say ${nonResult.join("/")} while the finding declares « ${s.role} »`);
    const hints = roleHints(s.sentence);
    return check(name, "pass", `whole sentence of the abstract` + (hints.length ? `; cues: ${hints.join("/")}` : "; no role cue"));
  });
}


export async function verifySource(source: Source, deps: VerifyDeps): Promise<Verification> {
  const checkedOn = (deps.today ?? (() => new Date().toISOString().slice(0, 10)))();
  const [crL, oaL, epL] = await Promise.all([
    fetchCrossref(deps.fetchJson, source.doi),
    fetchOpenAlex(deps.fetchJson, source.doi),
    fetchEuropePmc(deps.fetchJson, source.doi),
  ]);
  const cr = ok(crL);
  const oa = ok(oaL);
  const ep: EuropePmcRecord | null = ok(epL);

  const base = {
    doi: source.doi,
    notices: [] as Notice[],
    retracted: false,
    abstractFrom: "none" as const,
    checkedOn,
    tool: TOOL,
  };
  const empty = { title: "", firstAuthor: "", years: [] as number[], type: "unknown" };

  // 1. exists
  if (crL.kind === "not-found") {
    return Verification.parse({
      ...base,
      status: "fail",
      checks: [check("exists", "fail", `Crossref has no record of this DOI (404); OpenAlex: ${state(oaL)}`)],
      found: empty,
    });
  }
  if (!cr && !oa) {
    return Verification.parse({
      ...base,
      status: "review",
      checks: [check("exists", "review", `no database answered: Crossref ${state(crL)}; OpenAlex ${state(oaL)}`)],
      found: empty,
    });
  }
  const checks: Check[] = [];
  checks.push(
    cr && oa
      ? check("exists", "pass", "known by Crossref and OpenAlex")
      : check("exists", "review", cr ? `OpenAlex: ${state(oaL)}` : `Crossref: ${state(crL)}`),
  );

  // 2. notice
  const reason = noticeReason({
    crossrefUpdateTo: cr?.updateTo,
    openalexType: oa?.type,
    titles: [...(cr?.titles ?? []), ...(oa?.titles ?? [])],
  });
  checks.push(reason ? check("not-a-notice", "fail", `this DOI is a notice, not the article: ${reason}`) : check("not-a-notice", "pass", "not a correction, comment or other notice"));

  // abstract chain: Europe PMC, then Crossref, then OpenAlex
  const chain: ["europepmc" | "crossref" | "openalex", string | null][] = [
    ["europepmc", ep?.abstract ?? null],
    ["crossref", cr?.abstract ?? null],
    ["openalex", oa?.abstract ?? null],
  ];
  const hit = chain.find(([, t]) => t && normalizeAbstract(t));
  const abstractFrom = hit ? hit[0] : ("none" as const);
  const abstractText = hit && hit[1] ? normalizeAbstract(hit[1]) : null;
  const abstractSha256 = abstractText ? sha256(abstractText) : undefined;

  checks.push(titleCheck(source.declared.title, cr, oa));
  checks.push(firstAuthorCheck(source, cr, oa));
  const years = [...new Set([...(cr?.years ?? []), ...(oa?.years ?? []), ...(ep?.year ? [ep.year] : [])])].sort();
  checks.push(yearCheck(source.declared.year, years));
  checks.push(typeCheck(source, cr, oa, abstractText ?? ""));
  checks.push(retractionCheck(cr, oa));
  checks.push(correctionsCheck(source, cr));

  const needsAbstract = source.findings.some((f) => f.support.where === "abstract");
  if (!abstractText) {
    checks.push(check("abstract", needsAbstract ? "review" : "pass", "no abstract in Europe PMC, Crossref or OpenAlex"));
  } else if (source.abstractSha256 && source.abstractSha256 !== abstractSha256) {
    checks.push(check("abstract", "review", `from ${abstractFrom}, but its hash differs from the one recorded in the sheet: the abstract changed or another one was read`));
  } else {
    checks.push(check("abstract", "pass", `read from ${abstractFrom}` + (source.abstractSha256 ? ", hash identical to the sheet's" : "")));
  }
  checks.push(...supportChecks(source, abstractText));

  const notices: Notice[] = [];
  for (const n of [...(cr?.updatedBy ?? []), ...(cr?.updateTo ?? [])]) {
    if (!notices.some((m) => m.type === n.type && m.doi === n.doi)) notices.push(n);
  }
  const venue = cr?.venue ?? oa?.venue;
  const verification = Verification.parse({
    ...base,
    status: worst(checks.map((c) => c.result)),
    checks,
    found: {
      title: cr?.titles[0] ?? oa?.titles[0] ?? "",
      firstAuthor: cr?.firstAuthor ?? oa?.firstAuthor ?? "",
      years,
      type: cr?.type ?? oa?.type ?? "unknown",
      ...(venue ? { venue } : {}),
    },
    notices,
    retracted: !!oa?.isRetracted || (cr?.updatedBy ?? []).some((n) => RETRACTION_TYPES.has(n.type)),
    abstractFrom,
    ...(abstractSha256 ? { abstractSha256 } : {}),
  });
  return verification;
}
