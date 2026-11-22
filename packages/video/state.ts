// What each character does at a frame, read from the timeline: who speaks, the mouth, the emotion (held after the
// line or action that set it), the gesture (a pose of the rig, eased in and out), the effects running. Every style
// uses these; none reads the episode itself.
import type { EmotionName } from "../rig/face.ts";
import { POSES, mix, type Pose } from "../rig/skeleton.ts";
import type { Timeline, TimedAction, TimedLine, VisemeName } from "../schema/timeline.ts";

export const lineAt = (tl: Timeline, f: number): TimedLine | undefined => tl.lines.find((l) => f >= l.f0 && f < l.f1);
export const partAt = (tl: Timeline, f: number) => tl.parts.find((p) => f >= p.f0 && f < p.f1) ?? tl.parts.at(-1)!;

export function mouthAt(tl: Timeline, who: string, f: number): VisemeName {
  const track = tl.mouths[who];
  if (!track?.length) return "X";
  let lo = 0, hi = track.length - 1, best = -1;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (track[mid]!.f <= f) { best = mid; lo = mid + 1; } else hi = mid - 1; }
  return best < 0 ? "X" : track[best]!.v;
}

/** The last emotion given to `who` by a line or an action that started before `f`. */
export function emotionAt(tl: Timeline, who: string, f: number, fallback: EmotionName = "neutral"): EmotionName {
  let best: { f0: number; e: EmotionName } | null = null;
  for (const l of tl.lines) if (l.speaker === who && l.f0 <= f && (!best || l.f0 > best.f0)) best = { f0: l.f0, e: l.emotion };
  for (const a of tl.actions) if (a.who === who && a.emotion && a.f0 <= f && (!best || a.f0 > best.f0)) best = { f0: a.f0, e: a.emotion };
  return best?.e ?? fallback;
}

const EASE = 8;   // frames to go into and out of a gesture

/** The pose of `who` at `f`: its base pose, blended towards the gesture of the action or line running. */
export function poseAt(tl: Timeline, who: string, f: number, base: Pose = POSES.stand!): { pose: Pose; handsTo?: "head" | "chest"; gesture?: string } {
  const running: { f0: number; f1: number; g: string }[] = [];
  for (const a of tl.actions) if (a.who === who && a.gesture) running.push({ f0: a.f0, f1: a.f1, g: a.gesture });
  for (const l of tl.lines) if (l.speaker === who && l.gesture) running.push({ f0: l.f0, f1: l.f1, g: l.gesture });
  const g = running.find((r) => f >= r.f0 - EASE && f < r.f1 + EASE);
  if (!g) return { pose: base };
  const k = Math.min(1, (f - (g.f0 - EASE)) / EASE, (g.f1 + EASE - f) / EASE);
  const target = POSES[g.g] ?? POSES[g.g.replace(/-seated$/, "")] ?? base;
  const handsTo = g.g.startsWith("head-in-hands") ? "head" : g.g === "hand-on-chest" ? "chest" : undefined;
  return { pose: mix(base, target, Math.max(0, k)), handsTo: k > 0.5 ? handsTo : undefined, gesture: g.g };
}

/** The effects running at `f` (spiral, rewind, thought bubble…), with their progress 0..1. */
export const effectsAt = (tl: Timeline, f: number): (TimedAction & { k: number })[] =>
  tl.actions.filter((a) => a.fx && f >= a.f0 && f < a.f1 + 15).map((a) => ({ ...a, k: Math.min(1, (f - a.f0) / Math.max(1, a.f1 - a.f0)) }));

/** The prop `who` holds at `f`, if an action gave one. */
export function propAt(tl: Timeline, who: string, f: number) {
  let best: TimedAction | undefined;
  for (const a of tl.actions) if (a.who === who && a.prop && a.f0 <= f && (!best || a.f0 > best.f0)) best = a;
  return best?.prop;
}

/** Who is on stage in a part: the characters in scenes and the hook, the narrator in the book, verdict, takeaway. */
export const speakingNow = (tl: Timeline, f: number) => lineAt(tl, f)?.speaker;
