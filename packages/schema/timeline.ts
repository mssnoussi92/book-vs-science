// The resolved episode the styles draw (build/<ep>/<lang>/timeline.json → assets/ep/<ep>/<lang>/timeline.json):
// every line, action and card placed in frames, the mouths per character, the chosen hook and variation. A style
// reads this, never the episode itself. Produced by `bvs timeline` (from the voice takes, or estimated in --draft).
import { z } from "zod";
import { Badge, Emotion, FolderId, LangCode, Look, NodeId, Slug } from "./common.ts";

const Frame = z.number().int().min(0);
export const Viseme = z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "X"]);
export const PartKind = z.enum(["hook", "scene", "book", "verdict", "takeaway"]);

export const TimedLine = z.strictObject({
  key: z.string(),                       // the text key (s1.l3, verdict.l1, hook.h1…)
  part: PartKind,
  speaker: FolderId,
  emotion: Emotion,
  intensity: z.number(),
  gesture: FolderId.optional(),
  look: Look.optional(),
  f0: Frame, f1: Frame,
  text: z.string(),
  /** Each word with its frames (from the alignment, or spread over the line in a draft). */
  words: z.array(z.strictObject({ w: z.string(), f0: Frame, f1: Frame })),
});

export const TimedAction = z.strictObject({
  id: NodeId, part: PartKind, scope: z.string(), who: FolderId,
  gesture: FolderId.optional(),
  prop: z.strictObject({ id: FolderId, state: z.string() }).optional(),
  fx: z.strictObject({ id: FolderId, params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])) }).optional(),
  emotion: Emotion.optional(),
  look: Look.optional(),
  f0: Frame, f1: Frame,
});

const Card = z.strictObject({ f0: Frame, f1: Frame, text: z.string() });

export const Timeline = z.strictObject({
  episode: Slug,
  lang: LangCode,
  dir: z.enum(["rtl", "ltr"]),
  fps: z.literal(30),
  frames: z.number().int().positive(),
  draft: z.boolean(),                     // estimated durations, no voice: watermarked
  hook: NodeId,
  audio: z.string().nullable(),           // file under assets/ep/<ep>/<lang>/, or null in a draft
  parts: z.array(z.strictObject({ kind: PartKind, scope: z.string(), f0: Frame, f1: Frame, setting: FolderId.optional(), shape: z.string().optional(), outcome: z.string().optional() })),
  lines: z.array(TimedLine),
  actions: z.array(TimedAction),
  mouths: z.record(FolderId, z.array(z.strictObject({ f: Frame, v: Viseme }))),
  mouthEngine: z.enum(["rhubarb", "text", "volume", "hybrid"]),
  cast: z.strictObject({ narrator: FolderId, characters: z.array(FolderId) }),
  cards: z.strictObject({
    firstFrame: Card,
    book: z.strictObject({ f0: Frame, f1: Frame, idea: z.string(), title: z.string(), author: z.string() }),
    study: z.strictObject({ f0: Frame, f1: Frame, line: z.string(), ref: z.string(), design: z.string() }),
    badge: z.strictObject({ f: Frame, badge: Badge, label: z.string(), certainty: z.string() }),
    nuance: Card.optional(),
    orientation: Card.optional(),
    share: Card.optional(),
  }),
  variation: z.strictObject({ style: z.string(), palette: z.number().int().min(0), camera: z.string(), light: z.string() }),
}).meta({ id: "Timeline" });

export type Timeline = z.infer<typeof Timeline>;
export type TimedLine = z.infer<typeof TimedLine>;
export type TimedAction = z.infer<typeof TimedAction>;
export type VisemeName = z.infer<typeof Viseme>;
