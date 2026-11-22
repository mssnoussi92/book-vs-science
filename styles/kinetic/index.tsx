// Style « kinetic » (animated typography): each word appears as it is said, large, in the subtitles' zone (the style
// owns the subtitles), the speaker's face in a medallion above it. Kept as a measured trial
// (text on a flat ground retained the least in the owner's own figures).
import type React from "react";
import { Easing, interpolate } from "remotion";
import { Spiral } from "../../packages/rig/fx.tsx";
import { INK } from "../../packages/rig/Rig.tsx";
import type { PartProps, StyleModule } from "../../packages/video/contract.ts";
import { FONT } from "../../packages/video/fonts.ts";
import { Actor } from "../../packages/video/stage.tsx";
import { effectsAt, lineAt } from "../../packages/video/state.ts";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const COLORS: Record<string, string> = { nour: "#2f8f8a", karim: "#e07a3a", adasa: "#3f4d8c" };
const BG = ["#f4ecdc", "#e8eef3"];

const MED = { cy: 1030, r: 130 };

const Medallion: React.FC<PartProps & { who: string }> = ({ tl, f, who }) => {
  const isNarrator = who === tl.cast.narrator;
  return (
    <g>
      <circle cx={540} cy={MED.cy} r={MED.r} fill="#ffffff" stroke={COLORS[who] ?? INK} strokeWidth={14} />
      <clipPath id="med"><circle cx={540} cy={MED.cy} r={MED.r - 7} /></clipPath>
      <g clipPath="url(#med)">
        {isNarrator
          ? <Actor tl={tl} f={f} who={who} x={540} y={MED.cy - 8} s={0.74} />
          : <Actor tl={tl} f={f} who={who} x={532} y={MED.cy + 262} s={1.75} facing={who === "nour" ? -1 : 1} />}
      </g>
    </g>
  );
};

/** The line, each word appearing when it is said (a short jump, then still), in the speaker's colour. Inline spans
 *  only, moved with position: relative: an inline-block would break the order of an English title inside Arabic. */
const Words: React.FC<PartProps> = ({ tl, f }) => {
  const l = lineAt(tl, f);
  if (!l) return null;
  const chunk = 8;
  const idx = Math.max(0, l.words.findIndex((w) => f >= w.f0 && f < w.f1));
  const start = l.words.length > chunk ? Math.floor(idx / chunk) * chunk : 0;
  const shown = l.words.slice(start, start + chunk);
  const color = COLORS[l.speaker] ?? INK;
  return (
    <foreignObject x={100} y={1190} width={880} height={300}>
      <div dir={tl.dir} style={{ fontFamily: FONT, fontSize: 70, fontWeight: 900, textAlign: "center", lineHeight: 1.28, color }}>
        {shown.map((w, i) => {
          const k = interpolate(f, [w.f0 - 2, w.f0 + 6], [0, 1], { ...CLAMP, easing: Easing.out(Easing.back(3)) });
          const now = f >= w.f0 && f < w.f1;
          return (
            <span key={i}>
              <span style={{ position: "relative", top: (1 - k) * -40, opacity: Math.min(1, k * 1.5), color: now ? INK : color }}>{w.w}</span>
              {i < shown.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </foreignObject>
  );
};

const Stage: React.FC<PartProps> = (p) => {
  const who = lineAt(p.tl, p.f)?.speaker ?? (p.part.kind === "scene" || p.part.kind === "hook" ? "karim" : p.tl.cast.narrator);
  const fx = effectsAt(p.tl, p.f).filter((e) => e.fx!.id === "spiral");
  return (
    <>
      <Medallion {...p} who={who} />
      {fx.map((e) => <Spiral key={e.id} x={540} y={MED.cy - MED.r - 40} size={Number(e.fx!.params.size ?? 1) + 1} f={p.f} />)}
      <Words {...p} />
    </>
  );
};

export const style: StyleModule = {
  id: "kinetic",
  theme: { ink: INK, paper: "#ffffff", accent: "#e0a83a", card: "#ffffff", cardInk: INK },
  ownSubtitles: true,
  Background: ({ tl, f, w, h }) => (
    <g>
      <rect width={w} height={h} fill={BG[tl.variation.palette % BG.length]} />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={(i * 173 + f * (0.6 + (i % 3) * 0.3)) % (w + 200) - 100} cy={300 + ((i * 257) % 1300)} r={30 + (i % 4) * 18} fill="#ffffff" opacity={0.35} />
      ))}
    </g>
  ),
  parts: { hook: Stage, scene: Stage, book: Stage, verdict: Stage, takeaway: Stage },
};
