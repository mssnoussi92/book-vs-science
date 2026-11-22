// Style « split » (Livre vs Science): the science above, the book below, never under the platforms' captions
// (nothing useful below y = 1500). In 9:16 the scene plays small in the book's half, above the subtitles; the
// narrator speaks from the science half, never under a card of the shell.
import type React from "react";
import { RainCloud, Rewind, Spiral, ThoughtBubble, TwoWay } from "../../packages/rig/fx.tsx";
import { INK } from "../../packages/rig/Rig.tsx";
import type { PartProps, StyleModule } from "../../packages/video/contract.ts";
import { FONT } from "../../packages/video/fonts.ts";
import { Actor } from "../../packages/video/stage.tsx";
import { effectsAt, leadOf, presence } from "../../packages/video/state.ts";

const TOP = { y: 250, h: 600, fill: "#e6eef6" };
const BOTTOM = { y: 850, h: 640, fill: "#f6ead8" };
/** The characters stand on it, above the subtitles (y 1250). */
const GROUND = 1235;

/** The half's name, in its corner (the start side of the language). */
const Header: React.FC<{ y: number; text: string; dir: "rtl" | "ltr" }> = ({ y, text, dir }) => (
  <foreignObject x={110} y={y + 12} width={860} height={60}>
    <div dir={dir} style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: INK, opacity: 0.55 }}>{text}</div>
  </foreignObject>
);

/** The science half: the narrator who speaks. Beside the badge while it is up, under the book card, centred
 *  otherwise; never under a card of the shell. */
const Science: React.FC<PartProps> = ({ tl, f, part }) => {
  const at = part.kind === "verdict" || part.kind === "takeaway" ? { x: 900, y: 440, s: 0.4 }
    : part.kind === "book" ? { x: 540, y: 740, s: 0.42 }
    : { x: 540, y: TOP.y + 260, s: 0.62 };
  const fx = effectsAt(tl, f);
  return (
    <>
      <Actor tl={tl} f={f} who={tl.cast.narrator} x={at.x} y={at.y + Math.sin(f / 30) * 6} s={at.s} />
      {fx.filter((e) => e.fx!.id === "two-way" && f < e.f1).map((e) => <TwoWay key={e.id} x={540} y={720} k={e.k} f={f} />)}
    </>
  );
};

/** The book half: the scene in small, mimed. */
const Book: React.FC<PartProps> = ({ tl, f, w }) => {
  const fx = effectsAt(tl, f);
  const lead = leadOf(tl);
  const other = tl.cast.characters.find((c) => c !== lead) ?? lead;
  const k = presence(tl, other, f);
  const X: Record<string, number> = { [lead]: 400, [other]: 1200 - 510 * k };
  return (
    <g>
      <clipPath id="bottom"><rect x={0} y={BOTTOM.y} width={w} height={BOTTOM.h} /></clipPath>
      <g clipPath="url(#bottom)">
        <rect x={0} y={GROUND} width={w} height={BOTTOM.y + BOTTOM.h - GROUND} fill="#dcc7a6" />
        <Actor tl={tl} f={f} who={lead} x={400} y={GROUND - 150} s={0.92} facing={k > 0.5 ? 1 : -1} />
        {/* the other comes in for a line (state.presence), as in the house style */}
        {k > 0 ? <Actor tl={tl} f={f} who={other} x={X[other]!} y={GROUND - 150} s={0.92} facing={-1} walking={k < 1 ? f * 0.45 : undefined} /> : null}
        {fx.filter((e) => e.fx!.id === "spiral" && X[e.who] !== undefined).map((e) => <Spiral key={e.id} x={X[e.who]!} y={BOTTOM.y + 70} size={Number(e.fx!.params.size ?? 1)} f={f} />)}
        {fx.filter((e) => e.fx!.id === "cloud" && X[e.who] !== undefined).map((e) => <RainCloud key={e.id} x={X[e.who]! - 170} y={BOTTOM.y + 90} f={f} s={0.8} />)}
        {fx.filter((e) => e.fx!.id === "thought-bubble").map((e) => <ThoughtBubble key={e.id} x={560} y={BOTTOM.y + 110} k={e.k} image={String(e.fx!.params.image ?? "")} />)}
        {fx.filter((e) => e.fx!.id === "rewind").map((e) => <g key={e.id} transform={`translate(0 ${BOTTOM.y}) scale(1 ${BOTTOM.h / 1920})`}><Rewind k={e.k} w={w} h={1920} f={f} /></g>)}
      </g>
    </g>
  );
};

const Both: React.FC<PartProps> = (p) => (<><Science {...p} /><Book {...p} /></>);

export const style: StyleModule = {
  id: "split",
  theme: { ink: INK, paper: "#ffffff", accent: "#e0a83a", card: "#fffdf8", cardInk: INK },
  Background: ({ tl, f, w, h }) => (
    <g>
      <rect width={w} height={h} fill="#fbf7ef" />
      <rect x={0} y={TOP.y} width={w} height={TOP.h} fill={TOP.fill} />
      <rect x={0} y={BOTTOM.y} width={w} height={BOTTOM.h} fill={BOTTOM.fill} />
      <path d={`M 0 ${BOTTOM.y} L ${w} ${BOTTOM.y}`} stroke={INK} strokeWidth={8} strokeDasharray={`${30 + 6 * Math.sin(f / 15)} 18`} />
      <Header y={TOP.y} text={tl.dir === "rtl" ? "العلم" : "Science"} dir={tl.dir} />
      <Header y={BOTTOM.y} text={tl.dir === "rtl" ? "الكتاب" : "The book"} dir={tl.dir} />
    </g>
  ),
  parts: { hook: Both, scene: Both, book: Both, verdict: Both, takeaway: Both },
};
