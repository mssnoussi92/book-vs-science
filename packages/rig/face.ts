// The face as numbers: an emotion gives brows, lids and the corners of the mouth; a viseme gives the mouth's opening.
// The two compose, so a character can speak while smiling without 9 × 14 hand-drawn mouths (proposal B, §5).
import type { z } from "zod";
import type { Emotion } from "../schema/common.ts";

export type EmotionName = z.infer<typeof Emotion>;

export type FaceParams = {
  /** Inner end of each brow, up (+) or down (−), in head units. */
  browInner: number;
  browOuter: number;
  /** Upper lids: 0 wide open, 1 closed. */
  lid: number;
  /** Eyes a bit bigger when surprised or anxious. */
  eye: number;
  /** Corners of the mouth: up (smile) +, down −. */
  corner: number;
  /** Head tilt in degrees and shoulders (rig units), for the posture of the emotion. */
  headTilt: number;
  /** One brow raised more than the other (skeptical, amused), in head units. */
  browAsym?: number;
};

export const EMOTIONS: Record<EmotionName, FaceParams> = {
  neutral: { browInner: 0, browOuter: 0, lid: 0.1, eye: 1, corner: 0, headTilt: 0 },
  happy: { browInner: 3, browOuter: 3, lid: 0.15, eye: 1, corner: 1, headTilt: 4 },
  sad: { browInner: 9, browOuter: -5, lid: 0.35, eye: 1, corner: -0.8, headTilt: -10 },
  anxious: { browInner: 10, browOuter: -2, lid: 0, eye: 1.15, corner: -0.5, headTilt: -4 },
  annoyed: { browInner: -6, browOuter: 2, lid: 0.3, eye: 1, corner: -0.4, headTilt: 0 },
  angry: { browInner: -10, browOuter: 4, lid: 0.25, eye: 0.95, corner: -0.7, headTilt: -2 },
  ashamed: { browInner: 7, browOuter: -4, lid: 0.45, eye: 0.95, corner: -0.5, headTilt: -16 },
  surprised: { browInner: 10, browOuter: 10, lid: 0, eye: 1.25, corner: 0, headTilt: 6 },
  relieved: { browInner: 4, browOuter: 2, lid: 0.4, eye: 1, corner: 0.6, headTilt: 8 },
  amused: { browInner: 2, browOuter: 4, lid: 0.3, eye: 1, corner: 0.8, headTilt: 6, browAsym: 5 },
  tired: { browInner: 2, browOuter: -3, lid: 0.55, eye: 0.95, corner: -0.2, headTilt: -8 },
  curious: { browInner: 6, browOuter: 0, lid: 0.05, eye: 1.1, corner: 0.2, headTilt: 10 },
  skeptical: { browInner: -2, browOuter: -1, lid: 0.3, eye: 1, corner: -0.25, headTilt: 4, browAsym: 11 },
  warm: { browInner: 3, browOuter: 1, lid: 0.2, eye: 1, corner: 0.7, headTilt: 4 },
};

/** Between two faces (k from 0 to 1): emotions change over a few frames, never in one. */
export const mixFace = (a: FaceParams, b: FaceParams, k: number): FaceParams => {
  const m = (x: number, y: number) => x + (y - x) * k;
  return { browInner: m(a.browInner, b.browInner), browOuter: m(a.browOuter, b.browOuter), lid: m(a.lid, b.lid), eye: m(a.eye, b.eye), corner: m(a.corner, b.corner), headTilt: m(a.headTilt, b.headTilt), browAsym: m(a.browAsym ?? 0, b.browAsym ?? 0) };
};

/** Rhubarb's mouth shapes (A-H, X), and the same shapes from the « text » and « volume » engines. */
export type Viseme = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "X";
export type MouthParams = { open: number; width: number; round: number; teeth: number; tongue: number };

export const VISEMES: Record<Viseme, MouthParams> = {
  A: { open: 0, width: 0.75, round: 0, teeth: 0, tongue: 0 },       // M B P: lips pressed
  B: { open: 0.18, width: 0.9, round: 0, teeth: 1, tongue: 0 },     // most consonants, « ee »
  C: { open: 0.45, width: 0.85, round: 0, teeth: 0.6, tongue: 0 },  // « eh », short « a »
  D: { open: 0.85, width: 0.8, round: 0.1, teeth: 0.5, tongue: 0.4 }, // « aa »
  E: { open: 0.45, width: 0.55, round: 0.6, teeth: 0, tongue: 0 },  // « o »
  F: { open: 0.25, width: 0.35, round: 1, teeth: 0, tongue: 0 },    // « oo », « w »
  G: { open: 0.12, width: 0.8, round: 0, teeth: 1, tongue: 0 },     // F V: teeth on the lip
  H: { open: 0.45, width: 0.8, round: 0.1, teeth: 0.3, tongue: 1 }, // long « l »
  X: { open: 0, width: 0.7, round: 0, teeth: 0, tongue: 0 },        // rest
};

/** Deterministic blinks: every 2.5 to 5.5 s, 4 frames, from the character's seed; never Math.random. */
export function blinkAt(frame: number, fps: number, seed: number): number {
  let t = 0;
  let i = 0;
  const rnd = (n: number) => { const x = Math.sin((seed + 1) * 9301 + n * 49297) * 233280; return x - Math.floor(x); };
  while (t <= frame) {
    const start = t + Math.round((2.5 + 3 * rnd(i)) * fps);
    if (frame >= start && frame < start + 4) return [0.5, 1, 1, 0.5][frame - start]!;
    if (start > frame) return 0;
    t = start + 4;
    i++;
  }
  return 0;
}
