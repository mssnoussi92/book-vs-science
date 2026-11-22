// One episode = its structure (content/episodes/<id>/episode.json), with no sentence in it: every node that carries
// text has a key (requiredKeys), and the texts live in lang/<code>.json. Adding a language is a file; the
// approval of the source language does not move.
//
// The five parts of the owner's brief, in this order: hook → scene (the characters live the problem) → book (the
// idea, reformulated) → verdict (the science, its badge, the study on screen) → takeaway (one concrete action).
// The rules that cross files (sources verified, folders that exist, numbers from the registry, hook ≤ verdict…)
// live in packages/rules, never in a refine that another tool would not see.
import { z } from "zod";
import { Badge, Certainty, Emotion, FolderId, IsoDate, LangCode, Look, NodeId, Slug } from "./common.ts";

// ---- beats -----------------------------------------------------------------------------------------------------

/** "all": in every cut; "long": only in the long cut (YouTube Shorts / TikTok), dropped from the Facebook/Instagram one. */
const Cut = z.enum(["all", "long"]).default("all");

export const Line = z.strictObject({
  kind: z.literal("line"),
  id: NodeId,
  speaker: FolderId,                                // characters/<id>
  emotion: Emotion,
  intensity: z.number().min(0).max(1).default(0.5),
  /** Direction for the voice only, in English, never said nor shown: « tired, speaking slowly ». */
  delivery: z.string().max(80).optional(),
  gesture: FolderId.optional(),                     // packages/rig/gestures/<id>.ts
  look: Look.optional(),
  /** A line that states a finding names the claims (verdict assessments) it rests on. */
  claims: z.array(NodeId).default([]),
  /** "inner": the character speaks to himself (subtitled as a thought, said under the breath). */
  voice: z.enum(["spoken", "inner"]).default("spoken"),
  cut: Cut,
});

export const Action = z.strictObject({
  kind: z.literal("action"),
  id: NodeId,
  who: FolderId,
  gesture: FolderId.optional(),
  /** An object of the registry (packages/rig/props/<id>.tsx) and its state: phone "scrolling", mug "spilled". */
  prop: z.strictObject({ id: FolderId, state: z.string().max(24) }).optional(),
  /** An effect of the registry (spiral of thoughts, rain cloud…) with its parameters. */
  fx: z.strictObject({ id: FolderId, params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}) }).optional(),
  emotion: Emotion.optional(),
  look: Look.optional(),
  seconds: z.number().min(0.3).max(4),
  /** Anchor on a word of a line (its index in the line's text), instead of after the previous beat. */
  at: z.strictObject({ line: NodeId, word: z.number().int().min(0) }).optional(),
  /** Only in the versions that open with these hooks (an image the other hooks never introduced). */
  hooks: z.array(NodeId).min(1).optional(),
  /** How long the effect or prop stays: its own seconds ("beat"), until the same character's next effect ("next":
   *  a spiral that grows until the rewind), or to the end of its part ("part": a rain cloud over the whole scene). */
  holds: z.enum(["beat", "next", "part"]).default("beat"),
  /** A text shown while the action plays, with no voice (text key <part>.<action id>). */
  caption: z.boolean().default(false),
  cut: Cut,
});

export const Beat = z.discriminatedUnion("kind", [Line, Action]);

// ---- the five parts ----------------------------------------------------------------------------------------------

export const HookType = z.enum([
  "question",       // a question about the viewer's own life, shown by a character, not on a card
  "challenge",      // a 3-second test the viewer does
  "number",         // a figure from a verified finding
  "cold-open",      // the scene starts at its peak, mimed in close-up
  "book-promise",   // the book's promise in ≤ 3 words, the badge hidden
  "pov",            // « لما… » a moment everybody knows
  "paradox",        // a counter-intuitive finding (never stronger than the verdict)
  "confession",     // a character admits something
]);

export const Hook = z.strictObject({
  id: NodeId,
  type: HookType,
  /** "none": a silent hook (text and image only), for a feed played without sound. */
  spokenBy: z.union([z.literal("narrator"), z.literal("none"), FolderId]),
  firstFrame: z.enum(["close-up", "text-over-scene", "badge-tease", "challenge", "split"]),
  emotion: Emotion.default("neutral"),
  claims: z.array(NodeId).default([]),             // required for "number" and "paradox"
  /** What the characters do on the first frame (all at once, from the first image: never a still picture). */
  beats: z.array(Action).max(4).default([]),
});

export const Scene = z.strictObject({
  id: NodeId,
  setting: FolderId,                                // a set the styles draw; unknown → the style's generic set
  shape: z.enum(["single", "replay-twice", "three-moments", "argument", "before-after", "inner-voice"]),
  /** How the scene ends: constrained by the badge (a ⚖️ never ends in a cure). */
  outcome: z.enum(["better", "a-bit-better", "unresolved", "worse"]),
  beats: z.array(Beat).min(2).max(16),
  /** A typed escape hatch: one reviewed component (scenes/<id>.tsx), at most one per episode (rule). */
  custom: FolderId.optional(),
});

/** One testable claim drawn from the book's idea: who, what, compared with what, measured how. */
export const BookClaim = z.strictObject({
  id: NodeId,                                       // "c1"
  statement: z.string().min(10).max(240),          // internal, English
  population: z.string().max(120),
  exposure: z.string().max(120),
  comparison: z.string().max(120),
  outcome: z.string().max(120),
  /** The claim says that something causes or helps (not only « goes with »): it needs causal evidence (rules). */
  causal: z.boolean(),
  /** Out of scope claims are named (so that nobody tests them silently) and never said as a finding. */
  inScope: z.boolean(),
});

export const BookPart = z.strictObject({
  book: Slug,                                       // content/books/<slug>.json
  basis: Slug,                                      // the place in the book's basis[] where the idea is said
  claims: z.array(BookClaim).min(1).max(4),
  beats: z.array(Beat).min(1).max(8),
});

export const Assessment = z.strictObject({
  claim: NodeId,                                    // a BookClaim id
  evidence: z.array(z.strictObject({
    source: Slug,                                   // content/sources/<id>.json
    finding: Slug,                                  // a finding of that source
    relation: z.enum(["supports", "nuances", "contradicts"]),
  })).min(1),
  direction: z.enum(["supports", "mixed", "contradicts", "insufficient"]),
  certainty: Certainty,                             // ≤ the cap computed by the rules (docs/verdict.md)
});

export const Verdict = z.strictObject({
  badge: Badge,
  certainty: Certainty,
  assessments: z.array(Assessment).min(1),
  /** The one nuance said in the video (text key verdict.nuance); the others go to the episode's evidence page. */
  nuance: NodeId.optional(),
  /** false: the nuance is written on its card only, held without voice (when the minute is full). */
  nuanceSpoken: z.boolean().default(true),
  /** Without a sample from the Middle East or North Africa, the language's applicability line is said by a line of
   *  the verdict ("said"), or written under the study card ("written", the owner's choice on the pilot). */
  applicability: z.enum(["said", "written"]).default("said"),
  onScreen: Slug,                                   // the source of the study card
  /** The search protocol, written down (what was searched, where, when, and what was not found). */
  searched: z.strictObject({
    on: IsoDate,
    queries: z.array(z.strictObject({
      base: z.enum(["crossref", "openalex", "europepmc", "pubmed", "other"]),
      query: z.string().min(3),
      results: z.number().int().min(0),
    })).min(3),
    notFound: z.array(z.string()).default([]),
  }),
  /** The counter-evidence agent: its only task is to find what contradicts the verdict. */
  counterEvidence: z.strictObject({
    found: z.array(z.strictObject({ source: Slug.optional(), doi: z.string().optional(), note: z.string().max(300) })),
    conclusion: z.string().min(10).max(400),
  }),
  beats: z.array(Beat).min(1).max(8),
});

export const Takeaway = z.strictObject({
  /** The assessments the action rests on: required (an action is presented as working). */
  claims: z.array(NodeId).min(1),
  /** "evidence": causal evidence for this very action; otherwise said as « ممكن يساعد / جرّب ». */
  strength: z.enum(["evidence", "low-risk-suggestion"]),
  /** The orientation line in the video (« لو مكمّل أسابيع ومأثر على حياتك، كلّم متخصص »). */
  orientation: z.boolean(),
  beats: z.array(Beat).min(1).max(6),
});

// ---- the episode -------------------------------------------------------------------------------------------------

export const Sensitive = z.enum(["gender", "mental-health", "health", "money", "relationships", "parenting", "body"]);

export const Episode = z.strictObject({
  $schema: z.string().optional(),
  schema: z.literal(1),
  id: Slug,
  sourceLang: LangCode,
  languages: z.array(LangCode).min(1),
  cast: z.strictObject({
    narrator: FolderId,
    characters: z.array(FolderId).min(1).max(2),
  }),
  topic: z.strictObject({
    tags: z.array(Slug).max(6),
    /** Declared, and completed by a rule from the texts (a lexicon): the writer cannot forget one. */
    sensitive: z.array(Sensitive).default([]),
  }),
  hooks: z.array(Hook).min(5),
  scenes: z.array(Scene).min(1).max(3),
  book: BookPart,
  verdict: Verdict,
  takeaway: Takeaway,
  /** What the owner imposes on the drawing (style, palette…) and what to avoid; the rest is drawn at render time. */
  variation: z.strictObject({
    pin: z.partialRecord(z.enum(["style", "palette", "camera", "outfits", "light"]), z.string()).default({}),
    avoid: z.array(z.string()).default([]),
  }).default({ pin: {}, avoid: [] }),
}).meta({ id: "Episode", title: "One episode: structure only, no text" });

export type Episode = z.infer<typeof Episode>;
export type Beat = z.infer<typeof Beat>;
export type Line = z.infer<typeof Line>;
export type Hook = z.infer<typeof Hook>;
export type Action = z.infer<typeof Action>;

/** Every text key the episode needs, in reading order. A language is complete when its file has them all. */
export function requiredKeys(ep: Episode): string[] {
  const keys = ["title"];
  for (const h of ep.hooks) {
    keys.push(`hook.${h.id}.frame`);                 // the words of the first frame (≤ 6), read without sound
    if (h.spokenBy !== "none") keys.push(`hook.${h.id}`);
  }
  const lines = (part: string, beats: readonly Beat[]) => {
    for (const b of beats) if (b.kind === "line" || b.caption) keys.push(`${part}.${b.id}`);
  };
  for (const s of ep.scenes) lines(s.id, s.beats);
  keys.push("book.card");                            // the idea on the book card (≤ 12 words)
  lines("book", ep.book.beats);
  keys.push("verdict.card");                         // the study card's Arabic line (numbers from the registry)
  if (ep.verdict.nuance) keys.push("verdict.nuance");
  lines("verdict", ep.verdict.beats);
  lines("takeaway", ep.takeaway.beats);
  if (ep.takeaway.orientation) keys.push("takeaway.orientation");
  return keys;
}
