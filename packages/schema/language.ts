// A language folder (languages/<code>/language.json): what the rules and the tools need to know about it.
// Adding a language is adding this folder; no schema, no rule changes.
import { z } from "zod";
import { LangCode } from "./common.ts";

export const LanguagePack = z.strictObject({
  $schema: z.string().optional(),
  code: LangCode,
  name: z.string(),
  dir: z.enum(["rtl", "ltr"]),
  /** Measured speaking rate of the voices, to estimate durations before any voice request (recalibrated). */
  wordsPerSecond: z.number().min(0.5).max(6),
  limits: z.strictObject({
    hookFrameWords: z.number().int().min(1),   // words on the first frame of a hook
    bookCardWords: z.number().int().min(1),
    lineChars: z.number().int().min(20),
  }),
  /** Plain words or phrases; matched on normalized text (rules/text.ts). */
  lexicons: z.strictObject({
    /** Verbs that state a cause: refused on a claim that only associations support. */
    causal: z.array(z.string()).default([]),
    /** Generalizations about a group (« الستات كلهم »): only in a character's line, never as a finding. */
    generalizing: z.array(z.string()).default([]),
    /** Words that make an episode sensitive, whatever the writer declared. */
    sensitive: z.partialRecord(z.enum(["gender", "mental-health", "health", "money", "relationships", "parenting", "body"]),
      z.array(z.string())).default({}),
    /** Actions never given as advice (« طلّع اللي جواك »: venting increases anger). */
    forbiddenAdvice: z.array(z.string()).default([]),
  }),
  /** The sentence said or written when no study has a sample from the Middle East or North Africa. */
  applicabilityLine: z.string(),
}).meta({ id: "LanguagePack" });

/** characters/<id>/character.json : every character is invented; there is no field to base one on a real person. */
export const CharacterDef = z.strictObject({
  $schema: z.string().optional(),
  id: z.string().regex(/^[a-z][a-z0-9-]{1,30}$/),
  role: z.enum(["character", "narrator"]),
  kind: z.enum(["biped", "mascot"]),
  fictional: z.literal(true),
  names: z.partialRecord(LangCode, z.string().min(1)),
}).meta({ id: "CharacterDef" });

export type LanguagePack = z.infer<typeof LanguagePack>;
export type CharacterDef = z.infer<typeof CharacterDef>;
