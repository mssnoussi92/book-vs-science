// Shapes shared by every file of the repository. Ids that name a folder (a language, a character, a style, a
// setting) are plain strings checked by a rule against the folders that exist: adding one is « a folder more »,
// never an edit of this schema.
import { z } from "zod";

export const Slug = z.string().regex(/^[a-z][a-z0-9-]{1,59}$/);
/** A local id inside an episode: "h1", "s1", "l4", "c2". */
export const NodeId = z.string().regex(/^[a-z][a-z0-9]{0,11}$/);
/** BCP 47 code of a language folder: "ar-EG", "en", "fr". */
export const LangCode = z.string().regex(/^[a-z]{2,3}(-[A-Z]{2})?$/);
/** A folder id: characters/<id>, styles/<id>, a setting of the stage. */
export const FolderId = z.string().regex(/^[a-z][a-z0-9-]{1,30}$/);
export const Sha256 = z.string().regex(/^[0-9a-f]{64}$/);
/** Digits written [0-9], never \d: Python's \d accepts Arabic-Indic digits, JavaScript's does not. */
export const Doi = z.string().regex(/^10\.[0-9]{4,9}\/\S+$/);
export const IsoDate = z.iso.date();

/** One emotion drives three things at once: the voice's direction, the face and the posture. */
export const Emotion = z.enum([
  "neutral", "happy", "sad", "anxious", "annoyed", "angry", "ashamed", "surprised",
  "relieved", "amused", "tired", "curious", "skeptical", "warm",
]);
export const Look = z.enum(["other", "viewer", "down", "away", "phone", "card"]);

/** The badge (owner's decision, 2026-11-22): ✅ صح · ⚖️ مش بالظبط · ❌ غلط · ❓ الأدلة مش كفاية. */
export const Badge = z.enum(["confirmed", "nuanced", "contradicted", "unknown"]);
/** GRADE-like certainty of a claim or a verdict (docs/verdict.md). */
export const Certainty = z.enum(["high", "moderate", "low", "very-low"]);
export const CERTAINTY_RANK = { "very-low": 0, low: 1, moderate: 2, high: 3 } as const;
