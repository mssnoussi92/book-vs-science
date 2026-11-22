// What an approval covers: a projection of the decision, never the volatile data around it (dates, citation counts,
// raw bytes of an API response, wording of a check's detail). Review of the design (objections T1, A7): an
// approval that expired by itself at each re-verification, without any change of substance, would wear out the
// owner's trust faster than any failure.
import type { Episode, LangFile, Source, Verification } from "../schema/index.ts";
import { hashOf } from "./canonical.ts";

/** The sources approval: the verdict, the claims drawn from the book, and what decides each cited study. */
export function sourcesProjection(ep: Episode, sources: Map<string, Source>, verifications: Map<string, Verification>) {
  const cited = [...new Set(ep.verdict.assessments.flatMap((a) => a.evidence.map((e) => e.source)))].sort();
  return {
    claims: ep.book.claims,
    verdict: {
      badge: ep.verdict.badge,
      certainty: ep.verdict.certainty,
      assessments: ep.verdict.assessments,
      nuance: ep.verdict.nuance ?? null,
      onScreen: ep.verdict.onScreen,
    },
    takeaway: { claims: ep.takeaway.claims, strength: ep.takeaway.strength },
    sources: cited.map((id) => {
      const s = sources.get(id);
      const v = verifications.get(id);
      return {
        id,
        source: s ? { doi: s.doi.toLowerCase(), declared: s.declared, design: s.design, n: s.n ?? null, k: s.k ?? null,
                      population: s.population, mena: s.mena, findings: s.findings, limits: s.limits,
                      acknowledged: s.acknowledged } : null,
        verification: v ? {
          status: v.status,
          checks: v.checks.map((c) => [c.name, c.result]).sort(),   // the result, not the wording of the detail
          title: v.found.title.normalize("NFC").toLowerCase(),
          firstAuthor: v.found.firstAuthor.normalize("NFC").toLowerCase(),
          years: [...v.found.years].sort(),
          type: v.found.type,
          notices: v.notices.map((n) => `${n.type}:${n.doi.toLowerCase()}`).sort(),
          retracted: v.retracted,
          abstract: v.abstractSha256 ?? null,
        } : null,
      };
    }),
  };
}

/** The script approval of one language: everything said and played, and the texts of that language. */
export function scriptProjection(ep: Episode, lang: LangFile) {
  const { variation: _variation, verdict, ...rest } = ep;
  const { searched: _searched, counterEvidence: _counter, ...said } = verdict;
  return { episode: { ...rest, verdict: said }, lang: lang.lang, texts: lang.texts };
}

export const sourcesHash = (ep: Episode, s: Map<string, Source>, v: Map<string, Verification>) =>
  hashOf(sourcesProjection(ep, s, v));
export const scriptHash = (ep: Episode, lang: LangFile) => hashOf(scriptProjection(ep, lang));
