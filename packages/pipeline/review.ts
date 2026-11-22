// The pages the owner reads on his phone before he validates (review/<id>/): the sources dossier, then the script
// of each language, each ending with the short hash his answer names. Generated, never edited by hand.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { short } from "../core/canonical.ts";
import { scriptHash, sourcesHash } from "../core/fingerprint.ts";
import { words } from "../core/text.ts";
import { certaintyCap, tier } from "../rules/evidence.ts";
import type { EpisodeEntry, Repo } from "../rules/types.ts";
import { renderCard } from "../sources/report.ts";
import type { Beat } from "../schema/index.ts";

export const BADGE = { confirmed: "✅ صح", nuanced: "⚖️ مش بالظبط", contradicted: "❌ غلط", unknown: "❓ الأدلة مش كفاية" } as const;
const CERT = { high: "haute", moderate: "modérée", low: "basse", "very-low": "très basse" } as const;
const DIR = { supports: "soutient", mixed: "mêlée", contradicts: "contredit", insufficient: "insuffisant" } as const;
const REL = { supports: "soutient", nuances: "nuance", contradicts: "contredit" } as const;
const PAUSE = 0.25;

export function sourcesPage(repo: Repo, e: EpisodeEntry): string {
  const ep = e.episode;
  const v = ep.verdict;
  const book = repo.books.get(ep.book.book);
  const out: string[] = [];
  out.push(`# Sources de « ${ep.id} »`, "");
  out.push(`**Livre** : ${book?.title ?? ep.book.book} (${book?.author ?? "?"}, ${book?.year ?? "?"}) · passage : ${book?.basis.find((b) => b.id === ep.book.basis)?.locator ?? ep.book.basis}`);
  out.push(`**Verdict** : ${BADGE[v.badge]} · certitude ${CERT[v.certainty]}${v.nuance ? ` · nuance dite : ${v.nuance}` : ""} · étude à l'écran : ${v.onScreen}`, "");
  out.push("## Les affirmations tirées du livre", "");
  for (const c of ep.book.claims) {
    const a = v.assessments.find((x) => x.claim === c.id);
    out.push(`### ${c.id} ${c.inScope ? "" : "(hors du champ : jamais dite comme un résultat)"}`);
    out.push(`${c.statement}`);
    out.push(`*${c.causal ? "dit une cause" : "dit une association"} · qui : ${c.population} · quoi : ${c.exposure} · comparé à : ${c.comparison} · mesuré : ${c.outcome}*`, "");
    if (!a) { out.push("Non évaluée.", ""); continue; }
    const { cap, why } = certaintyCap(repo, ep, a);
    out.push(`**${DIR[a.direction]}**, certitude **${CERT[a.certainty]}** (plafond ${["", "basse", "modérée", "haute"][cap]} : ${why.join(" ; ")})`, "");
    out.push("| Étude | Plan | Relation | Ce qu'elle montre | Population |", "|---|---|---|---|---|");
    for (const x of a.evidence) {
      const s = repo.sources.get(x.source);
      const f = s?.findings.find((y) => y.id === x.finding);
      out.push(`| ${x.source} | ${s?.design ?? "?"}${s && tier(s.design) === 3 ? " ★" : ""} | ${REL[x.relation]} | ${f?.text ?? "?"} | ${s?.population ?? "?"}${s && !s.mena ? " · aucun échantillon arabe" : ""} |`);
    }
    out.push("");
  }
  out.push("## Comment on a cherché", "");
  out.push(`Le ${v.searched.on} :`, "", "| Base | Requête | Résultats |", "|---|---|---|");
  for (const q of v.searched.queries) out.push(`| ${q.base} | ${q.query} | ${q.results} |`);
  if (v.searched.notFound.length) out.push("", `**Cherché, pas trouvé** : ${v.searched.notFound.join(" ; ")}`);
  out.push("", "## L'agent contre-preuve", "", v.counterEvidence.conclusion, "");
  for (const c of v.counterEvidence.found) out.push(`- ${c.source ?? c.doi ?? ""} : ${c.note}`);
  out.push("", "## Chaque étude, vérifiée par son DOI", "");
  const cited = [...new Set(v.assessments.flatMap((a) => a.evidence.map((x) => x.source)))];
  for (const id of cited) {
    const s = repo.sources.get(id);
    const ver = repo.verifications.get(id);
    if (s && ver) out.push(renderCard({ source: s, verification: ver }), "");
    else out.push(`### ✗ ${id} : non vérifiée`, "");
  }
  out.push("---", `Empreinte des sources : **${short(sourcesHash(ep, repo.sources, repo.verifications))}**`);
  return out.join("\n") + "\n";
}

export function scriptPage(repo: Repo, e: EpisodeEntry, code: string): { text: string; seconds: number } {
  const ep = e.episode;
  const lang = e.langs.get(code);
  const pack = repo.languages.get(code);
  if (!lang || !pack) throw new Error(`no texts or language pack for ${code}`);
  const t = (k: string) => lang.texts[k] ?? `⟨manque : ${k}⟩`;
  const name = (id: string) => repo.characters.get(id)?.names[code] ?? id;
  const secs = (k: string) => words(lang.texts[k] ?? "").length / pack.wordsPerSecond + PAUSE;
  let total = 0;
  const out: string[] = [];
  const beat = (scope: string, b: Beat) => {
    if (b.kind === "line") {
      const s = secs(`${scope}.${b.id}`);
      total += s;
      out.push(`- **${name(b.speaker)}** *(${b.emotion}${b.delivery ? `, ${b.delivery}` : ""})* : ${t(`${scope}.${b.id}`)}  \`${s.toFixed(1)} s\``);
    } else {
      total += b.seconds;
      out.push(`- *${name(b.who)} : ${[b.gesture, b.prop && `${b.prop.id} ${b.prop.state}`, b.fx?.id, b.emotion].filter(Boolean).join(", ")} (${b.seconds} s)*`);
    }
  };
  out.push(`# Script « ${ep.id} » · ${code}`, "", `**${t("title")}**`, "");
  out.push("## 1. Les hooks (un seul est montré par vidéo)", "");
  let hookSecs = 0;
  for (const h of ep.hooks) {
    const s = h.spokenBy === "none" ? 2 : secs(`hook.${h.id}`);
    hookSecs = Math.max(hookSecs, s);
    out.push(`**${h.id} · ${h.type}** (${h.spokenBy === "none" ? "muet" : name(h.spokenBy === "narrator" ? ep.cast.narrator : h.spokenBy)}, première image ${h.firstFrame}) \`${s.toFixed(1)} s\``);
    out.push(`- à l'écran : ${t(`hook.${h.id}.frame`)}`);
    if (h.spokenBy !== "none") out.push(`- dit : ${t(`hook.${h.id}`)}`);
    out.push("");
  }
  total += hookSecs;
  for (const s of ep.scenes) {
    out.push(`## 2. Scène ${s.id} · ${s.setting} · ${s.shape} · se termine ${s.outcome}`, "");
    s.beats.forEach((b) => beat(s.id, b));
    out.push("");
  }
  out.push("## 3. Ce que dit le livre", "", `*Carte du livre* : ${t("book.card")}`, "");
  ep.book.beats.forEach((b) => beat("book", b));
  out.push("", `## 4. Le verdict : ${BADGE[ep.verdict.badge]}`, "", `*Carte d'étude* : ${t("verdict.card")}`);
  if (ep.verdict.nuance) { out.push(`*Nuance* : ${t("verdict.nuance")}`); total += secs("verdict.nuance"); }
  out.push("");
  ep.verdict.beats.forEach((b) => beat("verdict", b));
  out.push("", `## 5. À retenir (${ep.takeaway.strength === "evidence" ? "appuyé sur une preuve causale" : "suggestion à faible risque"})`, "");
  ep.takeaway.beats.forEach((b) => beat("takeaway", b));
  if (ep.takeaway.orientation) { out.push(`- *orientation* : ${t("takeaway.orientation")}`); total += secs("takeaway.orientation"); }
  out.push("", "---", `Durée estimée : **${Math.round(total)} s** (débit ${pack.wordsPerSecond} mots/s, recalibré sur la première prise)`);
  out.push(`Empreinte du script ${code} : **${short(scriptHash(ep, lang))}**`);
  return { text: out.join("\n") + "\n", seconds: total };
}

export function writeReview(repo: Repo, e: EpisodeEntry): string[] {
  const dir = join(repo.root, "review", e.id);
  mkdirSync(dir, { recursive: true });
  const written = [join(dir, "sources.md")];
  writeFileSync(written[0]!, sourcesPage(repo, e));
  for (const code of e.episode.languages) {
    const p = join(dir, `script.${code}.md`);
    writeFileSync(p, scriptPage(repo, e, code).text);
    written.push(p);
  }
  return written;
}
