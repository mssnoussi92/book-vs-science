// What a style is (docs/conception.md §4.8): a module that draws the five parts of the same timeline. It never draws
// the badge, the cards nor the signature, nor the subtitles unless its drawing is them (ownSubtitles) (the shell, chrome.tsx, does, after it), and it never reads the
// episode: only the resolved timeline. Its metadata (id, version, formats) is in styles/<id>/style.json, which the
// Node pipeline reads; this file is for the drawing side.
import type React from "react";
import type { Timeline } from "../schema/timeline.ts";
import type { ChromeTheme } from "./chrome.tsx";
import type { Aspect } from "./layout.ts";

export type PartName = "hook" | "scene" | "book" | "verdict" | "takeaway";
export type PartProps = { tl: Timeline; f: number; aspect: Aspect; w: number; h: number; part: Timeline["parts"][number] };

export type StyleModule = {
  id: string;
  theme: ChromeTheme;
  /** Behind everything, the whole video (it moves: Facebook flags a static image). */
  Background: React.FC<PartProps>;
  /** true only when the style's own drawing is the subtitles (kinetic typography: every word said is on screen, in
   *  the subtitles' zone); the shell then leaves them out. */
  ownSubtitles?: boolean;
  /** The five parts: mandatory, a style cannot skip the verdict. */
  parts: Record<PartName, React.FC<PartProps>>;
};
