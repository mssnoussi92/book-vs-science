// A notice (correction, erratum, comment, reply…) can pass for the article itself: same title, same first author,
// same year, Crossref type journal-article (review-science, objection 1, verified on 10.1037/a0024986).
import { normalizeTitle } from "./normalize.ts";

export const NOTICE_OPENALEX_TYPES = ["erratum", "retraction", "editorial", "letter", "paratext", "peer-review"];

const NOTICE_TITLE_STARTS = [
  "correction", "corrigendum", "erratum", "retraction", "retracted", "expression of concern",
  "comment on", "reply to", "response to",
];

export interface NoticeInput {
  /** Crossref `update-to`: what this record updates (non-empty = it IS a notice). */
  crossrefUpdateTo?: readonly unknown[];
  openalexType?: string | null;
  /** Titles as found at Crossref / OpenAlex (not the declared one). */
  titles: readonly string[];
}

/** Why the record is a notice, or null if it is not. */
export function noticeReason(r: NoticeInput): string | null {
  if (r.crossrefUpdateTo && r.crossrefUpdateTo.length > 0) {
    return `Crossref update-to is not empty (${r.crossrefUpdateTo.length}): this record updates another one`;
  }
  const t = (r.openalexType ?? "").toLowerCase();
  if (NOTICE_OPENALEX_TYPES.includes(t)) return `OpenAlex type is « ${t} »`;
  for (const title of r.titles) {
    const n = normalizeTitle(title);
    for (const start of NOTICE_TITLE_STARTS) {
      if (n === start || n.startsWith(start + " ")) return `the title starts with « ${start} »`;
    }
    if (n.includes("correction to")) return "the title contains « correction to »";
  }
  return null;
}

export function isNotice(r: NoticeInput): boolean {
  return noticeReason(r) !== null;
}
