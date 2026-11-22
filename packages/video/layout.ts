// Where the shell puts what it draws, per format. From the platforms review (docs/conception.md §4.8): the badge is
// always centre-top (never under the Reels caption); the study card above y = 1250; subtitles centred, ≤ 800 px wide,
// in the band the buttons on the right do not cover; nothing useful under y = 1500. A test checks every box.
export type Box = { x: number; y: number; w: number; h: number };
export type Aspect = "9x16" | "16x9";

export const FRAMES = {
  "9x16": { w: 1080, h: 1920, safe: { top: 250, right: 160, bottom: 420, left: 90 } },
  "16x9": { w: 1920, h: 1080, safe: { top: 80, right: 160, bottom: 120, left: 160 } },
} as const;

export const ZONES: Record<Aspect, { firstFrame: Box; tease: Box; badge: Box; study: Box; book: Box; subtitles: Box; card: Box; draft: Box }> = {
  "9x16": {
    firstFrame: { x: 110, y: 322, w: 800, h: 190 },
    tease: { x: 290, y: 256, w: 500, h: 56 },
    badge: { x: 340, y: 270, w: 400, h: 330 },
    study: { x: 120, y: 620, w: 780, h: 280 },
    book: { x: 120, y: 280, w: 780, h: 330 },
    subtitles: { x: 140, y: 1250, w: 760, h: 220 },
    card: { x: 120, y: 640, w: 780, h: 300 },
    draft: { x: 440, y: 150, w: 200, h: 44 },
  },
  "16x9": {
    firstFrame: { x: 260, y: 150, w: 1400, h: 150 },
    tease: { x: 710, y: 86, w: 500, h: 56 },
    badge: { x: 1380, y: 100, w: 360, h: 300 },
    study: { x: 1180, y: 420, w: 560, h: 220 },
    book: { x: 1180, y: 100, w: 560, h: 300 },
    subtitles: { x: 360, y: 820, w: 1200, h: 130 },
    card: { x: 1180, y: 420, w: 560, h: 300 },
    draft: { x: 860, y: 20, w: 200, h: 44 },
  },
};

export function insideSafe(aspect: Aspect, b: Box): boolean {
  const f = FRAMES[aspect];
  return b.x >= f.safe.left && b.y >= f.safe.top && b.x + b.w <= f.w - f.safe.right && b.y + b.h <= f.h - f.safe.bottom;
}
