// Title matching: token-sort ratio and a prefix rule. No token_set_ratio: a title contained in a longer one
// would score 1.0 (review-science, objection 20).
import { normalizeTitle } from "./normalize.ts";

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
    }
    prev = cur;
  }
  return prev[b.length]!;
}

/** 0..1: words normalized and sorted, then 1 - Levenshtein / longest length. */
export function tokenSortRatio(a: string, b: string): number {
  const sorted = (s: string) => normalizeTitle(s).split(" ").filter(Boolean).sort().join(" ");
  const x = sorted(a);
  const y = sorted(b);
  if (!x && !y) return 0;
  const longest = Math.max(x.length, y.length);
  return 1 - levenshtein(x, y) / longest;
}

export const PREFIX_COVERAGE = 0.6;

/** The declared title is the exact (normalized) word-prefix of the candidate and covers ≥ 60 % of its words. */
export function prefixMatch(declared: string, candidate: string, coverage = PREFIX_COVERAGE): boolean {
  const d = normalizeTitle(declared).split(" ").filter(Boolean);
  const c = normalizeTitle(candidate).split(" ").filter(Boolean);
  if (!d.length || d.length > c.length) return false;
  if (!d.every((w, i) => c[i] === w)) return false;
  return d.length / c.length >= coverage;
}
