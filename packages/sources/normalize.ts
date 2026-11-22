// Text normalization for titles, family names and abstracts. Pure functions, no network.

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…",
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const BLOCK_TAGS = /<\/?(?:p|br|div|sec|abstract|list|list-item|li|ul|ol|table|tr|td|th)(?::[a-z]+)?\b[^>]*>/gi;

/**
 * Removes HTML / JATS / MathML tags. Inline tags (italic, sub, mml:*) disappear; paragraph-level tags become a
 * space; a heading (`<title>`, `<h4>`) becomes its own sentence (« Background. »), and a lone « Abstract » title
 * is dropped. Entities are decoded.
 */
export function stripTags(s: string): string {
  let t = s.replace(/<(?:jats:)?(title|h[1-6])\b[^>]*>([\s\S]*?)<\/(?:jats:)?\1>/gi, (_m, _tag: string, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    if (!text || /^(abstract|summary)$/i.test(text)) return " ";
    return /[.:?!]$/.test(text) ? ` ${text} ` : ` ${text}. `;
  });
  t = t.replace(BLOCK_TAGS, " ").replace(/<[^>]*>/g, "");
  return decodeEntities(t);
}

/** NFKD, no diacritics, no tags, lower case, every non letter/digit becomes a space, spaces collapsed. */
export function normalizeTitle(s: string): string {
  return stripTags(s)
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function words(s: string): string[] {
  const n = normalizeTitle(s);
  return n ? n.split(" ") : [];
}

/** The main title: cut at the first « : », « ? » or sentence-ending « . ». Tags are stripped first. */
export function mainTitle(raw: string): string {
  const t = stripTags(raw).replace(/\s+/g, " ").trim();
  const m = /[:?]|\.(?:\s|$)/.exec(t);
  return m ? t.slice(0, m.index) : t;
}

const PARTICLES = new Set(["van", "von", "de", "der", "den", "di", "da", "du", "le", "la", "al", "el"]);

/** Family name for comparison: no accents, hyphens and apostrophes dropped, particles (van, de, der, al-, el-) ignored. */
export function normalizeFamily(s: string): string {
  const base = s
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/[’'`´]/g, "")
    .replace(/[-‐‑–]/g, " ")
    .replace(/[^\p{L}\p{N} ]+/gu, " ");
  const tokens = base.split(/\s+/).filter(Boolean);
  const kept = tokens.filter((t) => !PARTICLES.has(t));
  return (kept.length ? kept : tokens).join("");
}

/** Family name of a declared author: « Mauss, I. B. » → Mauss ; « Iris B. Mauss » → Mauss ; « Mauss » → Mauss. */
export function familyOfDeclared(name: string): string {
  const n = name.trim();
  if (n.includes(",")) return n.split(",")[0]!.trim();
  const parts = n.split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1]! : n;
}

/** Family name of a full display name (OpenAlex): last word. */
export function familyOfDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] ?? name;
}

const COPYRIGHT_TAIL =
  /\s*(?:\(\s*PsycINFO Database Record\s*\(c\)\s*\d{4}\s*APA,?\s*all rights reserved\s*\)|(?:©|\(c\)|copyright)\s*(?:©\s*)?\d{4}[^]*?all rights reserved)\.?\s*$/i;

/** Abstract text compared sentence by sentence: dashes and quotes made plain, spaces collapsed, copyright tail removed. */
export function normalizeAbstract(s: string): string {
  return stripTags(s)
    .normalize("NFC")
    .replace(/[‐-―−]/g, "-")
    .replace(/[“”„‟«»]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[\s ]+/g, " ")
    .trim()
    .replace(COPYRIGHT_TAIL, "")
    .trim();
}

const ABBREVIATIONS = /\b(e\.g|i\.e|vs|et al|cf|approx|Dr|Mr|Ms|Mrs|Prof|Fig|Figs|No|resp|ca)\./g;

/** Sentences of an already normalized abstract. Decimals (0.43) and common abbreviations do not end a sentence. */
export function splitSentences(text: string): string[] {
  const protectedText = text.replace(ABBREVIATIONS, (m) => m.replace(/\./g, "\u0000"));
  return protectedText
    .split(/(?<=[.!?])["')\]]?\s+(?=["'(\[]?[\p{Lu}\p{N}])/u)
    .map((s) => s.replace(/\u0000/g, ".").trim())
    .filter(Boolean);
}

/** A sentence as compared: normalized, trailing full stop removed. */
export function sentenceKey(s: string): string {
  return normalizeAbstract(s).replace(/[.\s]+$/, "");
}
