// Rules on the evidence and the verdict (docs/verdict.md). They guard, they do not decide: the badge stays a written
// choice, challenged by the counter-evidence agent and approved by the owner.
import { CERTAINTY_RANK } from "../schema/index.ts";
import type { Episode, Source } from "../schema/index.ts";
import type { Issue, Repo, Rule } from "./types.ts";
import { beats, where } from "./walk.ts";

/** Starting cap of a study design (docs/verdict.md §3): 3 high, 2 moderate, 1 low. */
export function tier(design: Source["design"]): 1 | 2 | 3 {
  switch (design) {
    case "umbrella-review": case "multisite-replication": case "meta-analysis": case "systematic-review": return 3;
    case "rct": case "experiment": case "longitudinal": return 2;
    default: return 1;
  }
}

type Assessment = Episode["verdict"]["assessments"][number];

/** The highest certainty an assessment may claim, from its evidence (never above, may be below). */
export function certaintyCap(repo: Repo, ep: Episode, a: Assessment): { cap: number; why: string[] } {
  const why: string[] = [];
  const claim = ep.book.claims.find((c) => c.id === a.claim);
  const rows = a.evidence.map((e) => {
    const s = repo.sources.get(e.source);
    return { e, s, f: s?.findings.find((f) => f.id === e.finding) };
  });
  const inDirection = rows.filter(({ e }) =>
    a.direction === "supports" ? e.relation === "supports"
      : a.direction === "contradicts" ? e.relation === "contradicts"
        : true);
  let cap = a.direction === "insufficient" ? 1 : Math.max(1, ...inDirection.map(({ s }) => (s ? tier(s.design) : 1)));
  why.push(`meilleur plan dans le sens de l'évaluation : ${["", "bas", "modéré", "haut"][cap]}`);
  if (claim?.causal && !inDirection.some(({ f }) => f && f.kind !== "association")) {
    cap = Math.min(cap, 1);
    why.push("affirmation causale sans preuve dont l'exposition a été manipulée : plafond bas");
  }
  const contested = rows.filter(({ s }) => s && (repo.contested.has(s.id) || repo.contested.has(s.doi.toLowerCase())));
  if (contested.length && !rows.some(({ s }) => s?.design === "multisite-replication")) {
    cap = Math.min(cap, 1);
    why.push(`effet contesté (${contested.map(({ s }) => s!.id).join(", ")}) sans réplication multi-laboratoires : plafond bas`);
  }
  return { cap, why };
}

const cited = (ep: Episode) => [...new Set(ep.verdict.assessments.flatMap((a) => a.evidence.map((e) => e.source)))];

export const sourcesExist: Rule = {
  id: "sources-exist",
  describe: "Chaque preuve citée existe au registre (la source et son constat) ; l'étude à l'écran en fait partie.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      for (const a of ep.verdict.assessments) for (const e of a.evidence) {
        const s = repo.sources.get(e.source);
        if (!s) out.push({ rule: "sources-exist", severity: "error", where: where(dir, `verdict.assessments.${a.claim}`), message: `source inconnue « ${e.source} » (content/sources/)` });
        else if (!s.findings.some((f) => f.id === e.finding)) out.push({ rule: "sources-exist", severity: "error", where: where(dir, `verdict.assessments.${a.claim}`), message: `« ${e.source} » n'a pas de constat « ${e.finding} »` });
      }
      if (!cited(ep).includes(ep.verdict.onScreen)) out.push({ rule: "sources-exist", severity: "error", where: where(dir, "verdict.onScreen"), message: "l'étude à l'écran doit porter le verdict" });
    }
    return out;
  },
};

export const sourcesVerified: Rule = {
  id: "sources-verified",
  describe: "Chaque source citée est vérifiée par son DOI (bvs sources verify : statut pass). Sinon la voix et le rendu sont bloqués.",
  check(repo) {
    const out: Issue[] = [];
    for (const { episode: ep } of repo.episodes) for (const id of cited(ep)) {
      const s = repo.sources.get(id);
      if (!s) continue;
      const v = repo.verifications.get(id);
      const at = `content/sources/${id}.verify.json`;
      if (!v) out.push({ rule: "sources-verified", severity: "error", gate: true, where: at, message: `non vérifiée (épisode ${ep.id})` });
      else if (v.doi.toLowerCase() !== s.doi.toLowerCase()) out.push({ rule: "sources-verified", severity: "error", gate: true, where: at, message: "la vérification porte sur un autre DOI" });
      else if (v.status !== "pass") out.push({ rule: "sources-verified", severity: "error", gate: true, where: at, message: `statut ${v.status} : ${v.checks.filter((c) => c.result !== "pass").map((c) => c.name).join(", ")}` });
    }
    return out;
  },
};

export const verdict: Rule = {
  id: "verdict",
  describe: "La grille du badge (docs/verdict.md) : sens des preuves, plafond de certitude, badge, nuance, protocole de recherche.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const err = (p: string, m: string) => out.push({ rule: "verdict", severity: "error", where: where(dir, p), message: m });
      const v = ep.verdict;
      const claims = new Map(ep.book.claims.map((c) => [c.id, c]));
      const inScope = ep.book.claims.filter((c) => c.inScope);
      if (inScope.length === 0) err("book.claims", "aucune affirmation dans le champ de l'épisode");
      for (const c of inScope) if (!v.assessments.some((a) => a.claim === c.id)) err("verdict.assessments", `l'affirmation ${c.id} est dans le champ mais n'est pas évaluée`);
      const scoped: Assessment[] = [];
      for (const a of v.assessments) {
        const p = `verdict.assessments.${a.claim}`;
        if (!claims.has(a.claim)) { err(p, `affirmation inconnue « ${a.claim} »`); continue; }
        const rel = (r: string) => a.evidence.filter((e) => e.relation === r).map((e) => repo.sources.get(e.source)).filter((s) => s !== undefined);
        const best = (list: Source[]) => Math.max(0, ...list.map((s) => tier(s.design)));
        if (a.direction === "supports") {
          if (rel("supports").length === 0) err(p, "« soutient » sans preuve qui soutient");
          if (best(rel("contradicts")) >= best(rel("supports")) && rel("contradicts").length) err(p, "une preuve de rang égal ou supérieur contredit : ce n'est pas « soutient »");
        }
        if (a.direction === "contradicts") {
          if (rel("contradicts").length === 0) err(p, "« contredit » sans preuve qui contredit");
          if (best(rel("supports")) >= best(rel("contradicts")) && rel("supports").length) err(p, "une preuve de rang égal ou supérieur soutient : ce n'est pas « contredit »");
        }
        const { cap, why } = certaintyCap(repo, ep, a);
        if (CERTAINTY_RANK[a.certainty] > cap) err(p, `certitude ${a.certainty} au-dessus du plafond (${why.join(" ; ")})`);
        if (claims.get(a.claim)?.inScope) scoped.push(a);
      }
      const floor = Math.min(...scoped.map((a) => CERTAINTY_RANK[a.certainty]), 3);
      if (CERTAINTY_RANK[v.certainty] > floor) err("verdict.certainty", "la certitude du verdict dépasse celle d'une affirmation du champ");
      const dirs = new Set(scoped.map((a) => a.direction));
      const firm = CERTAINTY_RANK[v.certainty] >= CERTAINTY_RANK.moderate;
      if ((v.badge === "confirmed" || v.badge === "contradicted") && !firm) err("verdict.badge", "✅ ou ❌ exige une certitude au moins modérée : dire ⚖️ ou ❓");
      if (v.badge === "confirmed" && [...dirs].some((d) => d !== "supports")) err("verdict.badge", "✅ exige que toutes les affirmations du champ soient soutenues");
      if (v.badge === "contradicted" && !dirs.has("contradicts")) err("verdict.badge", "❌ sans affirmation contredite");
      if (dirs.size === 1 && dirs.has("insufficient") && v.badge !== "unknown") err("verdict.badge", "preuves insuffisantes partout : le badge est ❓");
      if (v.badge === "nuanced" && !v.nuance) err("verdict.nuance", "⚖️ dit sa nuance (une seule)");
      if (v.nuance && !v.assessments.some((a) => a.claim === v.nuance)) err("verdict.nuance", `« ${v.nuance} » n'est pas une affirmation évaluée`);
      const queries = v.searched.queries.map((q) => q.query.toLowerCase()).join(" | ");
      for (const [re, what] of [[/meta-?analy/, "meta-analysis"], [/replicat/, "replication"], [/cultur|moderat/, "culture ou moderator"]] as const) {
        if (!re.test(queries)) err("verdict.searched", `le protocole de recherche ne cherche pas « ${what} »`);
      }
      const shown = repo.sources.get(v.onScreen);
      const top = cited(ep).map((id) => repo.sources.get(id)).filter((s) => s && tier(s.design) === 3);
      if (shown && tier(shown.design) < 3 && top.length) out.push({ rule: "verdict", severity: "warn", where: where(dir, "verdict.onScreen"), message: `une méta-analyse ou revue est au dossier (${top.map((s) => s!.id).join(", ")}) : la montrer plutôt` });
    }
    return out;
  },
};

export const claimsSaid: Rule = {
  id: "claims-said",
  describe: "Hook ≤ verdict : un hook ou une réplique ne s'appuie que sur une affirmation du champ, nette et au moins modérée.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const scope = new Map(ep.book.claims.map((c) => [c.id, c.inScope]));
      const assessed = new Map(ep.verdict.assessments.map((a) => [a.claim, a]));
      const check = (p: string, ids: string[], strict: boolean) => {
        for (const c of ids) {
          if (scope.get(c) === false) out.push({ rule: "claims-said", severity: "error", where: where(dir, p), message: `« ${c} » est hors du champ de l'épisode : jamais dit comme un résultat` });
          const a = assessed.get(c);
          if (!a) { out.push({ rule: "claims-said", severity: "error", where: where(dir, p), message: `« ${c} » n'est pas évaluée au verdict` }); continue; }
          if (strict && (a.direction === "mixed" || a.direction === "insufficient" || CERTAINTY_RANK[a.certainty] < CERTAINTY_RANK.moderate)) {
            out.push({ rule: "claims-said", severity: "error", where: where(dir, p), message: `un hook ne s'appuie pas sur « ${c} » (${a.direction}, ${a.certainty}) : en faire une question` });
          }
        }
      };
      // docs/verdict.md §5: « sinon il devient une question ». A hook whose every text (said and first frame, in every
      // language) ends in a question asks, it does not assert: it may rest on a claim the verdict assessed (not
      // « insufficient ») of at least low certainty; a very low one is still refused, even asked (the owner's choice,
      // 2026-11-22, on money-happiness where every claim is low).
      const asks = (id: string) => [...langs.values()].every((l) => [`hook.${id}`, `hook.${id}.frame`].every((k) => !l.texts[k] || /[؟?]\s*$/u.test(l.texts[k]!.trim())));
      const fair = (c: string) => { const a = assessed.get(c); return !!a && a.direction !== "insufficient" && CERTAINTY_RANK[a.certainty] >= CERTAINTY_RANK.low; };
      for (const h of ep.hooks) check(`hooks.${h.id}`, asks(h.id) ? h.claims.filter((c) => !fair(c)) : h.claims, true);
      for (const p of beats(ep)) if (p.beat.kind === "line") check(`${p.scope}.${p.beat.id}`, p.beat.claims, false);
    }
    return out;
  },
};

const OUTCOMES = {
  confirmed: ["better", "a-bit-better"],
  nuanced: ["a-bit-better", "unresolved"],
  unknown: ["unresolved"],
  contradicted: ["unresolved", "worse"],
} as const;

export const outcome: Rule = {
  id: "outcome",
  describe: "Dénouement ≤ verdict : une scène ne finit pas en guérison sur un ⚖️ ou un ❓.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const allowed: readonly string[] = OUTCOMES[ep.verdict.badge];
      for (const s of ep.scenes) if (!allowed.includes(s.outcome)) {
        out.push({ rule: "outcome", severity: "error", where: where(dir, `scenes.${s.id}.outcome`), message: `« ${s.outcome} » raconte plus que le badge (${ep.verdict.badge} : ${allowed.join(" ou ")})` });
      }
    }
    return out;
  },
};

export const takeaway: Rule = {
  id: "takeaway",
  describe: "« À retenir » rattaché à des affirmations évaluées ; « preuve » seulement si une preuve causale porte sur l'action.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const assessed = new Map(ep.verdict.assessments.map((a) => [a.claim, a]));
      const scope = new Map(ep.book.claims.map((c) => [c.id, c.inScope]));
      for (const c of ep.takeaway.claims) {
        if (!assessed.has(c)) out.push({ rule: "takeaway", severity: "error", where: where(dir, "takeaway.claims"), message: `« ${c} » n'est pas évaluée` });
        else if (!scope.get(c)) out.push({ rule: "takeaway", severity: "error", where: where(dir, "takeaway.claims"), message: `« ${c} » est hors du champ` });
      }
      if (ep.takeaway.strength === "evidence") {
        const causal = ep.takeaway.claims.flatMap((c) => assessed.get(c)?.evidence ?? []).some((e) => {
          const f = repo.sources.get(e.source)?.findings.find((x) => x.id === e.finding);
          return e.relation === "supports" && f && f.kind !== "association";
        });
        if (!causal) out.push({ rule: "takeaway", severity: "error", where: where(dir, "takeaway.strength"), message: "aucune preuve causale ne porte sur l'action : « ممكن يساعد / جرّب » (low-risk-suggestion)" });
      }
    }
    return out;
  },
};
