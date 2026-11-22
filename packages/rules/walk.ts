// Walks an episode's parts in reading order: every beat with the text key its line would have.
import type { Beat, Episode } from "../schema/index.ts";

export type PartName = "hook" | "scene" | "book" | "verdict" | "takeaway";
export type Placed = { part: PartName; scope: string; beat: Beat; key: string | null };

export function beats(ep: Episode): Placed[] {
  const out: Placed[] = [];
  const add = (part: PartName, scope: string, list: readonly Beat[]) => {
    for (const beat of list) out.push({ part, scope, beat, key: beat.kind === "line" ? `${scope}.${beat.id}` : null });
  };
  for (const s of ep.scenes) add("scene", s.id, s.beats);
  add("book", "book", ep.book.beats);
  add("verdict", "verdict", ep.verdict.beats);
  add("takeaway", "takeaway", ep.takeaway.beats);
  return out;
}

/** Every text key spoken or shown by the narrator (hooks he says, his lines, the cards). */
export function narratorKeys(ep: Episode): string[] {
  const keys: string[] = ["book.card", "verdict.card"];
  if (ep.verdict.nuance) keys.push("verdict.nuance");
  if (ep.takeaway.orientation) keys.push("takeaway.orientation");
  for (const h of ep.hooks) {
    keys.push(`hook.${h.id}.frame`);
    if (h.spokenBy === "narrator") keys.push(`hook.${h.id}`);
  }
  for (const p of beats(ep)) if (p.beat.kind === "line" && p.beat.speaker === ep.cast.narrator && p.key) keys.push(p.key);
  return keys;
}

export const where = (dir: string, pointer: string) => `${dir}/episode.json#${pointer}`;
