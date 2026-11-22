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

/** A thought bubble; `image: white-bear` draws the bear one tries not to think of (Wegner's experiment),
 *  `phone-rejected` the refusal that started it. */
export const ThoughtBubble: React.FC<{ x: number; y: number; k: number; image?: string }> = ({ x, y, k, image }) => {
  const s = Math.min(1, k * 4);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={-70} cy={150} r={14} fill="#fff" stroke={INK} strokeWidth={5} />
      <circle cx={-40} cy={110} r={22} fill="#fff" stroke={INK} strokeWidth={5} />
      <path d="M -120 0 C -150 -60 -80 -110 -30 -90 C 0 -140 90 -120 100 -70 C 160 -60 150 20 100 30 C 80 80 -10 80 -30 50 C -90 70 -140 40 -120 0 Z" fill="#fff" stroke={INK} strokeWidth={6} />
      {image === "phone-rejected" ? <g transform="translate(-10 -20) scale(1.5)"><Phone state="rejected" /></g> : null}
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

/** A phone in a hand. « rejected »: a red cross on its screen; « scrolling »: a list running (`f` moves it);
 *  « chosen »: a green tick, the choice made. */
export const Phone: React.FC<{ state?: string; f?: number }> = ({ state, f = 0 }) => (
  <g transform="rotate(-14)">
    <rect x={-22} y={-40} width={44} height={78} rx={8} fill="#2a2d36" stroke={INK} strokeWidth={4} />
    <rect x={-16} y={-32} width={32} height={58} rx={4} fill={state === "rejected" ? "#fbe3e0" : state === "chosen" ? "#e3f6e6" : state === "raise" ? "#d4f0d9" : "#bfe3f2"} />
    {state === "rejected" ? <path d="M -9 -12 L 9 6 M 9 -12 L -9 6" stroke="#d2453b" strokeWidth={5} strokeLinecap="round" /> : null}
    {state === "chosen" ? <path d="M -9 -3 L -2 5 L 10 -10" stroke="#2e9e5b" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
    {/* a raise: the bank's notification, a green arrow up and a « + », no number to read */}
    {state === "raise" ? (
      <g>
        <rect x={-13} y={-27} width={26} height={14} rx={4} fill="#ffffff" stroke="#2e9e5b" strokeWidth={2} />
        <path d="M -6 -16 L -6 -24 M -9 -21 L -6 -24 L -3 -21" stroke="#2e9e5b" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 3 -20 L 9 -20 M 6 -23 L 6 -17" stroke="#2e9e5b" strokeWidth={2.5} strokeLinecap="round" />
        <path d="M 0 16 L 0 -4 M -9 5 L 0 -4 L 9 5" stroke="#2e9e5b" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ) : null}
    {state === "scrolling" ? (
      <g>
        <clipPath id="phone-screen"><rect x={-16} y={-32} width={32} height={58} rx={4} /></clipPath>
        <g clipPath="url(#phone-screen)">
          {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-12} y={-30 + ((i * 14 - (f * 1.5) % 14) % 84)} width={24} height={9} rx={2} fill="#7aa9c4" />)}
        </g>
      </g>
    ) : null}
  </g>
);

/** One phone of the grid, the same for every render (a hash of its place). */
export const phoneLook = (i: number) => {
  const h = (n: number) => ((i * 2654435761 + n * 40503) >>> 0) % 1000 / 1000;
  return { w: 38 + Math.round(h(1) * 10), h: 64 + Math.round(h(2) * 20), lenses: 1 + Math.floor(h(3) * 3), battery: 0.25 + 0.6 * h(4), screen: ["#bfe3f2", "#f5d7a1", "#c9e7c4", "#e8c6e9", "#f2c4bd"][Math.floor(h(5) * 5)]! };
};

/** Too many choices: a grid of small phones popping in, each one different (size, one to three lenses, battery) so that
 *  there is something to choose, never a word to read; with `crossed`, all but one get a red cross, one by one, and the
 *  one kept is ticked green (« والباقي لأ »): the one with the full battery, Nour's one criterion, never a choice made
 *  for the viewer. `left`: seconds left on a countdown (a badge 3, 2, 1 on the grid's corner). k: progress 0..1. */
export const Choices: React.FC<{ x: number; y: number; count: number; k: number; f: number; crossed?: boolean; o?: number; left?: number }> = ({ x, y, count, k, crossed = false, o = 1, left }) => {
  const cols = 6, rows = Math.ceil(count / cols), gap = 128;   // big enough to see a battery on a phone's screen
  const keep = Math.floor(count / 2) + 2;
  const box = { x: -70, y: -90, w: (cols - 1) * gap + 140, h: (rows - 1) * gap * 1.3 + 180 };
  const tick = left !== undefined && left > 0 && left <= 3 ? Math.ceil(left) : null;
  const beat = left !== undefined ? 1 + 0.18 * Math.max(0, (left % 1) - 0.75) * 4 : 1;
  return (
    <g transform={`translate(${x - ((cols - 1) * gap) / 2} ${y - ((rows - 1) * gap * 1.3) / 2})`} opacity={o}>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={30} fill="#ffffff" stroke={INK} strokeWidth={6} opacity={0.92} />
      {Array.from({ length: count }, (_, i) => {
        const cx = (i % cols) * gap, cy = Math.floor(i / cols) * gap * 1.3;
        const shown = Math.min(1, Math.max(0, k * (crossed ? 6 : 2.5) - i / count) * 4);
        const out = crossed && i !== keep && k > 0.15 + (0.6 * ((i * 7) % count)) / count;
        const p = phoneLook(i), battery = i === keep ? 1 : p.battery;
        const sw = p.w - 12, sh = p.h - 20;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) scale(${1.2 * Math.min(1, crossed ? 1 : shown)})`} opacity={crossed ? (out ? 0.35 : 1) : Math.min(1, shown)}>
            <rect x={-p.w / 2} y={-p.h / 2} width={p.w} height={p.h} rx={8} fill="#2a2d36" stroke={INK} strokeWidth={4} />
            <rect x={-sw / 2} y={-p.h / 2 + 12} width={sw} height={sh} rx={4} fill={p.screen} />
            {Array.from({ length: p.lenses }, (_, j) => <circle key={j} cx={-sw / 2 + 5 + j * 8} cy={-p.h / 2 + 6} r={3} fill="#8a93a6" />)}
            {/* the battery, at the foot of the screen: the one thing that tells them apart without reading */}
            <rect x={-sw / 2 + 4} y={p.h / 2 - 20} width={sw - 8} height={8} rx={3} fill="#ffffff" stroke={INK} strokeWidth={1.5} />
            <rect x={-sw / 2 + 5} y={p.h / 2 - 19} width={(sw - 10) * battery} height={6} rx={2} fill={battery > 0.6 ? "#2e9e5b" : battery > 0.4 ? "#e0a83a" : "#d2453b"} />
            {out ? <path d="M -20 -20 L 20 20 M 20 -20 L -20 20" stroke="#d2453b" strokeWidth={7} strokeLinecap="round" /> : null}
            {crossed && i === keep && k > 0.8 ? <circle r={p.h / 2 + 4} fill="none" stroke="#2e9e5b" strokeWidth={7} /> : null}
          </g>
        );
      })}
      {tick !== null ? (
        <g transform={`translate(${box.x + box.w} ${box.y}) scale(${beat})`}>
          <circle r={62} fill="#d2453b" stroke={INK} strokeWidth={7} />
          <text y={26} textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight={900} fontSize={74} fill="#ffffff">{tick}</text>
        </g>
      ) : null}
    </g>
  );
};

/** The sadness itself: a rain cloud of constant size (accepting it does not make it smaller, review of the pilot:
 *  only the spiral, the feeling about the feeling, goes away). It bobs and rains. */
export const RainCloud: React.FC<{ x: number; y: number; f: number; o?: number; s?: number }> = ({ x, y, f, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y + Math.sin(f / 18) * 5}) scale(${s})`} opacity={o}>
    {[-40, -10, 22, 48].map((dx, i) => (
      <path key={i} d={`M ${dx} ${30 + ((f * 6 + i * 23) % 70)} l -4 16`} stroke="#5b7fb8" strokeWidth={6} strokeLinecap="round" opacity={0.85} />
    ))}
    <path d="M -80 20 C -100 -10 -70 -40 -40 -30 C -30 -65 25 -70 40 -35 C 75 -45 100 -10 80 20 Z" fill="#9aa3b5" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

/** « It goes both ways »: the spiral and the cloud, an arrow each way between them (a link, not a cause). */
export const TwoWay: React.FC<{ x: number; y: number; k: number; f: number }> = ({ x, y, k, f }) => {
  const o = Math.min(1, k * 5);
  const nudge = Math.sin(f / 6) * 6;
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <rect x={-260} y={-95} width={520} height={190} rx={30} fill="#ffffff" stroke={INK} strokeWidth={6} />
      <Spiral x={-150} y={0} size={1} f={f} />
      <RainCloud x={150} y={-10} f={f} s={0.8} />
      <g stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={`M ${-60 + nudge} -22 L ${60 + nudge} -22 M ${40 + nudge} -40 L ${60 + nudge} -22 L ${40 + nudge} -4`} />
        <path d={`M ${60 - nudge} 26 L ${-60 - nudge} 26 M ${-40 - nudge} 8 L ${-60 - nudge} 26 L ${-40 - nudge} 44`} />
      </g>
    </g>
  );
};
