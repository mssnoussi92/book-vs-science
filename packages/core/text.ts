// Text helpers shared by the rules and the pipeline: Arabic-aware normalization for lexicon matching, word counts,
// numbers written in a text.

/** Arabic letters folded the way people type them on a phone (hamza forms, alef maqsura, taa marbuta, tatweel, harakat). */
export function fold(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[ً-ٰٟـ]/g, "")       // harakat, dagger alef, tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ؤ]/g, "و")
    .replace(/[ئ]/g, "ي")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/** Arabic proclitics written attached to the next word (و ف ب ل ك and their pairs): « ومعظم » is « و + معظم ». */
const PROCLITICS = ["", "و", "ف", "ب", "ل", "ك", "وب", "ول", "فب", "فل", "وك"];

/** True when the folded phrase appears in the folded text as whole words; its first word may carry a proclitic. */
export function containsPhrase(text: string, phrase: string): boolean {
  const t = fold(text).split(" ").filter(Boolean);
  const p = fold(phrase).split(" ").filter(Boolean);
  if (p.length === 0) return false;
  const first = p[0]!;
  for (let i = 0; i + p.length <= t.length; i++) {
    const head = t[i]!;
    if (!PROCLITICS.some((c) => head === c + first)) continue;
    if (p.every((w, j) => j === 0 || t[i + j] === w)) return true;
  }
  return false;
}

/** Words as a reader counts them on screen (Arabic and Latin), punctuation ignored. */
export function words(text: string): string[] {
  return text.normalize("NFC").split(/[\s‌]+/).map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")).filter(Boolean);
}

/** Numbers written in a text with [0-9] (1,381 · 0.43 · 2018), as numbers. */
export function numbersIn(text: string): number[] {
  const out: number[] = [];
  for (const m of text.matchAll(/\d[\d,]*(?:\.\d+)?/g)) {
    const n = Number(m[0].replace(/,/g, ""));
    if (Number.isFinite(n)) out.push(n);
  }
  return out;
}

/** Format characters (Unicode Cf) other than ZWNJ, which Persian-style spelling may need: invisible marks typed by a
 *  phone that change a hash without changing what anyone sees, and that would go to the voice. */
export function strayFormatChars(text: string): string[] {
  return [...text].filter((c) => /\p{Cf}/u.test(c) && c !== "‌").map((c) => `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`);
}

/** Arabic-Indic digits (٠-٩, ۰-۹): the owner's rule is 123, never ١٢٣. */
export const ARABIC_INDIC = /[٠-٩۰-۹]/;
