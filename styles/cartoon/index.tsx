// Style « cartoon »: a drawn set, the characters acting, a slow camera that never stops (no static image).
import type React from "react";
import { interpolate } from "remotion";
import { Rewind, Spiral, ThoughtBubble } from "../../packages/rig/fx.tsx";
import { INK } from "../../packages/rig/Rig.tsx";
import type { PartProps, StyleModule } from "../../packages/video/contract.ts";
import { Actor } from "../../packages/video/stage.tsx";
import { effectsAt, lineAt } from "../../packages/video/state.ts";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PALETTES = [
  { wall: "#efe4cf", floor: "#c9b59a", accent: "#2f8f8a", window: "#bfe1ec", desk: "#a77b52" },
  { wall: "#dfe8e4", floor: "#a9b8a8", accent: "#e07a3a", window: "#cfe3f0", desk: "#8f6b4a" },
];
const FLOOR = 1330;

/** The office: a wall, a window with a passing cloud, a desk with a lamp and a plant. */
const Office: React.FC<{ f: number; w: number; h: number; p: number }> = ({ f, w, h, p }) => {
  const c = PALETTES[p % PALETTES.length]!;
  const cloud = ((f * 0.6) % 520) - 120;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill={c.wall} />
      <rect x={0} y={FLOOR} width={w} height={h - FLOOR} fill={c.floor} />
      <rect x={0} y={FLOOR - 8} width={w} height={14} fill={INK} opacity={0.75} />
      <g transform="translate(600 430)">
        <rect x={0} y={0} width={360} height={300} rx={10} fill={c.window} stroke={INK} strokeWidth={8} />
        <clipPath id="window"><rect x={0} y={0} width={360} height={300} /></clipPath>
        <g clipPath="url(#window)"><ellipse cx={cloud} cy={110} rx={70} ry={26} fill="#fff" opacity={0.9} /><ellipse cx={cloud + 50} cy={96} rx={46} ry={22} fill="#fff" opacity={0.9} /></g>
        <path d="M 180 0 L 180 300 M 0 150 L 360 150" stroke={INK} strokeWidth={8} />
      </g>
      <g transform={`translate(110 ${FLOOR - 250})`}>
        <rect x={0} y={0} width={420} height={34} rx={6} fill={c.desk} stroke={INK} strokeWidth={7} />
        <rect x={30} y={34} width={22} height={216} fill={c.desk} stroke={INK} strokeWidth={6} />
        <rect x={368} y={34} width={22} height={216} fill={c.desk} stroke={INK} strokeWidth={6} />
        <rect x={240} y={-110} width={150} height={104} rx={8} fill="#2a2d36" stroke={INK} strokeWidth={7} />
        <rect x={252} y={-98} width={126} height={78} rx={4} fill="#9fd0e3" />
      </g>
      <g transform={`translate(${w - 150} ${FLOOR})`}>
        <path d="M -40 0 L -30 -90 L 30 -90 L 40 0 Z" fill={c.accent} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
        {[-50, -10, 30].map((a, i) => <ellipse key={i} cx={a * 0.6} cy={-140 - i * 22} rx={22} ry={60} transform={`rotate(${a} ${a * 0.6} ${-140 - i * 22})`} fill="#5f9e5a" stroke={INK} strokeWidth={6} />)}
      </g>
    </g>
  );
};

/** The camera: a slow push that never stops, a closer frame on the one who speaks in a scene. */
const camera = (f: number, frames: number, focusX: number, close: boolean) => {
  const k = 1.02 + 0.06 * (f / frames) + (close ? 0.18 : 0);
  return `translate(${540 - focusX * k + (focusX - 540) * 0.35} ${960 - 960 * k}) scale(${k})`;
};

const Cast: React.FC<PartProps & { dim?: number; close?: boolean }> = ({ tl, f, dim = 1, close = false }) => {
  const speaker = lineAt(tl, f)?.speaker;
  const focus = speaker === "nour" ? 760 : 380;
  const fx = effectsAt(tl, f);
  return (
    <g transform={camera(f, tl.frames, focus, close)} opacity={dim}>
      <Actor tl={tl} f={f} who="karim" x={380} y={FLOOR - 250} s={1.6} />
      <Actor tl={tl} f={f} who="nour" x={790} y={FLOOR - 250} s={1.6} facing={-1} />
      {fx.map((e) => {
        const who = e.who === "nour" ? 790 : 380;
        if (e.fx!.id === "spiral") return <Spiral key={e.id} x={who} y={640} size={Number(e.fx!.params.size ?? 1)} f={f} o={interpolate(f, [e.f0, e.f0 + 6, e.f1, e.f1 + 12], [0, 1, 1, 0], CLAMP)} />;
        if (e.fx!.id === "thought-bubble") return <ThoughtBubble key={e.id} x={who + 120} y={560} k={e.k} image={String(e.fx!.params.image ?? "")} />;
        return null;
      })}
    </g>
  );
};

const Narrator: React.FC<PartProps & { x?: number; y: number; s: number }> = ({ tl, f, x = 540, y, s }) => (
  <Actor tl={tl} f={f} who={tl.cast.narrator} x={x + Math.sin(f / 40) * 12} y={y} s={s} />
);

const RewindLayer: React.FC<PartProps> = ({ tl, f, w, h }) => (
  <>{effectsAt(tl, f).filter((e) => e.fx!.id === "rewind").map((e) => <Rewind key={e.id} k={e.k} w={w} h={h} f={f} />)}</>
);

export const style: StyleModule = {
  id: "cartoon",
  theme: { ink: INK, paper: "#f6f3ec", accent: "#e0a83a", card: "#fffaf0", cardInk: INK },
  Background: ({ tl, f, w, h }) => <g transform={`translate(${540 - 540 * (1 + 0.03 * f / tl.frames)} ${960 - 960 * (1 + 0.03 * f / tl.frames)}) scale(${1 + 0.03 * f / tl.frames})`}><Office f={f} w={w} h={h} p={tl.variation.palette} /></g>,
  parts: {
    hook: (p) => {
      const l = lineAt(p.tl, p.f);
      return l?.speaker === p.tl.cast.narrator ? <><Cast {...p} dim={0.4} /><Narrator {...p} y={1000} s={0.95} /></> : <Cast {...p} close />;
    },
    scene: (p) => <><Cast {...p} close={lineAt(p.tl, p.f) !== undefined} /><RewindLayer {...p} /></>,
    book: (p) => <><Cast {...p} dim={0.35} /><Narrator {...p} y={1020} s={0.9} /></>,
    verdict: (p) => <><Cast {...p} dim={0.25} /><Narrator {...p} y={1030} s={0.72} /></>,
    takeaway: (p) => <><Cast {...p} /><Narrator {...p} x={900} y={480} s={0.42} /></>,
  },
};
