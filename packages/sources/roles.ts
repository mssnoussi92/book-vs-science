// Role of a sentence of an abstract, guessed from cue words. A heuristic: it only ever sends a sentence to a
// human (review), it never approves one. Context / aim / method cues are looked for first and removed from the
// text, so « research suggests that… » is a context sentence and not a conclusion.
export type Role = "context" | "aim" | "method" | "result" | "conclusion";

const NON_RESULT: [Role, RegExp][] = [
  ["context", /\b(?:previous|prior|earlier|existing) (?:studies|research|work|findings|literature)\b/gi],
  ["context", /\b(?:many|several|some|most|numerous) (?:studies|researchers|authors) (?:have )?(?:reported|shown|found|suggested|argued|claimed)\b/gi],
  ["context", /\b(?:has|have) been (?:shown|reported|argued|suggested|found)\b/gi],
  ["context", /\b(?:research|evidence|the literature|theory) (?:suggests?|indicates?|holds?|shows?)\b/gi],
  ["context", /\bit has been (?:argued|suggested|proposed|claimed|reported)\b/gi],
  ["aim", /\bwe hypothesi[sz]ed\b/gi],
  ["aim", /\bthe (?:present |current |main )?(?:aim|goal|purpose|objective)\b/gi],
  ["aim", /\bthis (?:study|research|article|paper|meta-analysis|review) (?:examined|investigated|tested|explored|aimed|sought)\b/gi],
  ["aim", /\bwe (?:examined|investigated|tested|explored) whether\b/gi],
  ["method", /\bparticipants were\b/gi],
  ["method", /\bmethods?\b/gi],
];

const RESULT: [Role, RegExp][] = [
  ["result", /\bresults?\b/i],
  ["result", /\bwe found\b/i],
  ["result", /\bwas associated\b|\bwere associated\b/i],
  ["result", /\bpredicted\b/i],
  ["result", /\bdid not differ\b/i],
  ["result", /\bno (?:significant |reliable )?differences?\b/i],
  ["result", /\b[pP]\s*[<=>]\s*\.?\d|\b[dgr]\s*=\s*[-−]?\.?\d|\bOR\s*=\s*\d|\b\d+(?:\.\d+)?\s?%|\b95\s?% ?CI\b/],
  ["conclusion", /\bthese (?:findings|results) (?:suggest|indicate|show|imply)\b/i],
  ["conclusion", /\bwe conclude\b/i],
  ["conclusion", /\bsuggest that\b/i],
];

/** Every role the cue words point to (empty = no cue). */
export function roleHints(sentence: string): Role[] {
  let rest = sentence.replace(/[‘’]/g, "'");
  const found = new Set<Role>();
  for (const [role, re] of NON_RESULT) {
    rest = rest.replace(re, () => {
      found.add(role);
      return " ";
    });
  }
  for (const [role, re] of RESULT) if (re.test(rest)) found.add(role);
  return [...found];
}

/** True when the cues say context / aim / method only, with no result or conclusion cue. */
export function looksLikeNonResult(sentence: string): Role[] | null {
  const hints = roleHints(sentence);
  const non = hints.filter((h) => h === "context" || h === "aim" || h === "method");
  const res = hints.filter((h) => h === "result" || h === "conclusion");
  return non.length > 0 && res.length === 0 ? non : null;
}
