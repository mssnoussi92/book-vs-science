// A Markdown report readable on a phone: one card per source.
import type { Source, Verification } from "../schema/source.ts";

const ICON = { pass: "✓", review: "⚠", fail: "✗" } as const;
const STATUS = { pass: "✓ pass", review: "⚠ à relire", fail: "✗ bloque" } as const;

export interface ReportItem {
  source: Source;
  verification: Verification;
}

export function renderCard({ source, verification: v }: ReportItem): string {
  const lines: string[] = [];
  lines.push(`### ${STATUS[v.status]} · ${source.id}`);
  lines.push(`[${v.doi}](https://doi.org/${encodeURI(v.doi)})`);
  lines.push("");
  const title = v.checks.find((c) => c.name === "title");
  lines.push(`- **Titre trouvé** : ${v.found.title || "—"}`);
  if (title) lines.push(`- **Score du titre** : ${title.detail}`);
  lines.push(`- **Premier auteur** : ${v.found.firstAuthor || "—"} (déclaré : ${source.declared.firstAuthor})`);
  lines.push(`- **Années** : ${v.found.years.join(", ") || "—"} (déclarée : ${source.declared.year})`);
  lines.push(`- **Type** : ${v.found.type}${v.found.venue ? ` · ${v.found.venue}` : ""}`);
  lines.push(`- **Avis** : ${v.notices.length ? v.notices.map((n) => `${n.type} ${n.doi}`).join(", ") : "aucun"}`);
  lines.push(`- **Rétractation** : ${v.retracted ? "OUI" : "non"}`);
  lines.push(`- **Résumé lu chez** : ${v.abstractFrom}${v.abstractSha256 ? ` (empreinte ${v.abstractSha256.slice(0, 12)}…)` : ""}`);
  lines.push("");
  for (const c of v.checks) lines.push(`- ${ICON[c.result]} **${c.name}** : ${c.detail}`);
  lines.push("");
  for (const f of source.findings) {
    lines.push(`> **${f.id}** (${f.support.role}, ${f.support.where}) : « ${f.support.sentence} »`);
  }
  return lines.join("\n");
}

export function renderReport(items: ReportItem[], date?: string): string {
  const count = (s: Verification["status"]) => items.filter((i) => i.verification.status === s).length;
  const head = [
    `# Vérification des sources${date ? ` · ${date}` : ""}`,
    "",
    `${items.length} source(s) : ✓ ${count("pass")} · ⚠ ${count("review")} · ✗ ${count("fail")}`,
    "",
  ];
  return [...head, ...items.map(renderCard).flatMap((c) => [c, ""])].join("\n").trimEnd() + "\n";
}
