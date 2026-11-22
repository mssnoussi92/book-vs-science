// Effects of the registry (Action.fx): drawn in code, no image. Each takes its progress k (0..1) and the frame.
import type React from "react";
import { INK } from "./Rig.tsx";

/** The loop of feeling bad about feeling bad: a spiral over the head that grows with `size` (1 to 3) and turns. */
export const Spiral: React.FC<{ x: number; y: number; size: number; f: number; o?: number }> = ({ x, y, size, f, o = 1 }) => {
  const R = 30 + 26 * size;
  const turns = 2.2 + size * 0.6;
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const a = t * turns * 2 * Math.PI + f * 0.12;
    const r = R * t;
    pts.push(`${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a) * 0.62).toFixed(1)}`);
  }
  return (
    <g opacity={o}>
      <polyline points={pts.join(" ")} fill="none" stroke={INK} strokeWidth={9 + size * 2} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts.join(" ")} fill="none" stroke="#7a86c9" strokeWidth={4 + size} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** A thought bubble; `image: white-bear` draws the bear one tries not to think of (Wegner's experiment). */
export const ThoughtBubble: React.FC<{ x: number; y: number; k: number; image?: string }> = ({ x, y, k, image }) => {
  const s = Math.min(1, k * 4);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={-70} cy={150} r={14} fill="#fff" stroke={INK} strokeWidth={5} />
      <circle cx={-40} cy={110} r={22} fill="#fff" stroke={INK} strokeWidth={5} />
      <path d="M -120 0 C -150 -60 -80 -110 -30 -90 C 0 -140 90 -120 100 -70 C 160 -60 150 20 100 30 C 80 80 -10 80 -30 50 C -90 70 -140 40 -120 0 Z" fill="#fff" stroke={INK} strokeWidth={6} />
      {image === "white-bear" ? (
        <g transform="translate(-10 -30)">
          <ellipse cx={0} cy={18} rx={58} ry={38} fill="#f4f4f0" stroke={INK} strokeWidth={5} />
          <circle cx={48} cy={-14} r={28} fill="#f4f4f0" stroke={INK} strokeWidth={5} />
          <circle cx={36} cy={-38} r={9} fill="#f4f4f0" stroke={INK} strokeWidth={4} />
          <circle cx={58} cy={-12} r={4} fill={INK} />
          <circle cx={74} cy={-6} r={5} fill={INK} />
          {[-36, -12, 14, 36].map((dx) => <rect key={dx} x={dx - 8} y={44} width={16} height={22} rx={6} fill="#f4f4f0" stroke={INK} strokeWidth={4} />)}
        </g>
      ) : null}
    </g>
  );
};

/** The rewind between the two takes of a replayed scene: the frame goes grey, two triangles, lines running back. */
export const Rewind: React.FC<{ k: number; w: number; h: number; f: number }> = ({ k, w, h, f }) => {
  const o = Math.sin(Math.min(1, k) * Math.PI);
  return (
    <g opacity={o}>
      <rect x={0} y={0} width={w} height={h} fill="#20222a" opacity={0.45} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={0} y={((i * 220 + f * 40) % h)} width={w} height={6} fill="#ffffff" opacity={0.18} />)}
      <g transform={`translate(${w / 2} ${h * 0.42})`}>
        <path d="M 10 -70 L -110 0 L 10 70 Z M 130 -70 L 10 0 L 130 70 Z" fill="#ffffff" stroke={INK} strokeWidth={8} strokeLinejoin="round" transform="translate(-10 0)" />
      </g>
    </g>
  );
};

/** A phone in a hand; state « rejected » shows a red cross on its screen. */
export const Phone: React.FC<{ state?: string }> = ({ state }) => (
  <g transform="rotate(-14)">
    <rect x={-22} y={-40} width={44} height={78} rx={8} fill="#2a2d36" stroke={INK} strokeWidth={4} />
    <rect x={-16} y={-32} width={32} height={58} rx={4} fill={state === "rejected" ? "#fbe3e0" : "#bfe3f2"} />
    {state === "rejected" ? <path d="M -9 -12 L 9 6 M 9 -12 L -9 6" stroke="#d2453b" strokeWidth={5} strokeLinecap="round" /> : null}
  </g>
);
