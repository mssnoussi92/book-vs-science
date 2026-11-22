// What each character does at a frame, read from the timeline: who speaks, the mouth, the emotion (held after the
// line or action that set it), the gesture (a pose of the rig, eased in and out), the effects running. Every style
// uses these; none reads the episode itself.
import type { EmotionName } from "../rig/face.ts";
import { POSES, mix, type Pose } from "../rig/skeleton.ts";
import type { Timeline, TimedAction, TimedLine, VisemeName } from "../schema/timeline.ts";

export const lineAt = (tl: Timeline, f: number): TimedLine | undefined => tl.lines.find((l) => f >= l.f0 && f < l.f1);

/** A line a card already shows word for word (the nuance, the orientation line, when they are said): its subtitles
 *  would put the same sentence twice on screen (« one text at a time », owner's pilot review). */
export const onCard = (tl: Timeline, l: TimedLine, f: number): boolean =>
  [tl.cards.nuance, tl.cards.orientation].some((c) => !!c && f >= c.f0 && f < c.f1 && c.text === l.text);
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

/** A line cut for reading: after a sentence or clause end (. ، ؟ ! … : ؛), at most MAX_WORDS a screen, a lone last
 *  word kept with the screen before it. The words keep their punctuation (the owner's pilot review: « اقبله » without
 *  its full stop read as a fragment). */
const MAX_WORDS = 7;
export function readingChunks(words: readonly { w: string }[]): [number, number][] {
  const out: [number, number][] = [];
  const ends = (w: string) => /[.!?؟،,…:؛]»?$/u.test(w);   // a closing quote alone is not an end: « بطّل زعل» دي؟ »
  let start = 0;
  for (let i = 0; i < words.length; i++) {
    const n = i - start + 1;
    // At the limit, a clause that ends with the next word is kept whole (8 words, not « …على » then « حياتك، »).
    const nextEnds = i + 1 < words.length && ends(words[i + 1]!.w) && n === MAX_WORDS;
    if ((ends(words[i]!.w) && n >= 2) || (n >= MAX_WORDS && !nextEnds)) { out.push([start, i + 1]); start = i + 1; }
  }
  if (start < words.length) {
    const last = out.at(-1);
    if (last && words.length - start === 1 && last[1] - last[0] <= MAX_WORDS) last[1] = words.length;
    else out.push([start, words.length]);
  }
  return out;
}

/** Who is on stage in a scene (the owner's pilot review: Karim's thoughts read as said to Nour, who was there from the
 *  first image). The one who speaks first is there all along; another character comes in a little before their first
 *  line of a take (the takes of a replayed scene are cut by its rewind) and stays to the end of that take. Outside the
 *  scenes, everybody is. 0 = away, 1 = in place; in between, walking in. */
export const ENTER = 24, WALK = 18;
export function presence(tl: Timeline, who: string, f: number): number {
  const part = partAt(tl, f);
  if (part.kind === "hook") {
    // A hook with its own actions shows only who acts or speaks in it (Karim's confession to the camera is his alone);
    // a hook without any keeps everybody in the background.
    const inHook = (x: { f0: number }) => x.f0 >= part.f0 && x.f0 < part.f1;
    const acts = tl.actions.filter((a) => a.part === "hook" && inHook(a));
    if (!acts.length) return 1;
    return acts.some((a) => a.who === who) || tl.lines.some((l) => l.part === "hook" && inHook(l) && l.speaker === who) ? 1 : 0;
  }
  if (part.kind !== "scene") return 1;
  const lines = tl.lines.filter((l) => l.part === "scene" && l.f0 >= part.f0 && l.f0 < part.f1);
  // The lead lives the problem: there from the scene's first image, even while the narrator speaks over it first.
  if (!lines.length || who === leadOf(tl)) return 1;
  const cuts = tl.actions.filter((a) => a.fx?.id === "rewind" && a.f0 >= part.f0 && a.f0 < part.f1).map((a) => a.f0);
  const bounds = [part.f0, ...cuts, part.f1];
  const i = bounds.findIndex((b, j) => f >= b && f < (bounds[j + 1] ?? Infinity));
  const [s, e] = [bounds[i]!, bounds[i + 1]!];
  const mine = lines.find((l) => l.speaker === who && l.f0 >= s && l.f0 < e);
  if (!mine) return 0;
  return Math.max(0, Math.min(1, (f - (mine.f0 - ENTER)) / WALK));
}

/** Who lives the problem: the first character to speak in a scene (not the narrator over it); the first of the cast
 *  when no scene line exists yet. */
export function leadOf(tl: Timeline): string {
  return tl.lines.find((l) => l.part === "scene" && !l.over && l.speaker !== tl.cast.narrator)?.speaker ?? tl.cast.characters[0]!;
}
