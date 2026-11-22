// The shell: what no style decides (docs/conception.md §4.8). Drawn after the style, which can neither hide it nor
// move it; a style only gives it a theme (ink, paper, accent). Texts come from the timeline (the language file and the
// registry), never typed here.
import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { Timeline } from "../schema/timeline.ts";
import { FONT } from "./fonts.ts";
import { ZONES, type Aspect, type Box } from "./layout.ts";
import { lineAt } from "./state.ts";

export type ChromeTheme = { ink: string; paper: string; accent: string; card: string; cardInk: string };
export const DEFAULT_THEME: ChromeTheme = { ink: "#17181d", paper: "#f6f3ec", accent: "#e0a83a", card: "#fffaf0", cardInk: "#17181d" };

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const fade = (f: number, f0: number, f1: number, d = 6) => interpolate(f, [f0, f0 + d, f1 - d, f1], [0, 1, 1, 0], CLAMP);

const BADGE_COLOR = { confirmed: "#2e9e5b", nuanced: "#d9902b", contradicted: "#d2453b", unknown: "#7d8290" } as const;

/** The badge's sign, drawn in SVG (never an emoji font: it differs between machines). Each has its own shape too,
 *  for viewers who do not see colours: a square, a circle, an octagon, a triangle. */
const BadgeSign: React.FC<{ badge: Timeline["cards"]["badge"]["badge"]; r: number }> = ({ badge, r }) => {
  const c = BADGE_COLOR[badge];
  const W = "#ffffff";
  const sw = r * 0.16;
  if (badge === "confirmed") return (<g><rect x={-r} y={-r} width={2 * r} height={2 * r} rx={r * 0.3} fill={c} /><path d={`M ${-r * 0.5} 0 L ${-r * 0.12} ${r * 0.4} L ${r * 0.55} ${-r * 0.42}`} stroke={W} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>);
  if (badge === "contradicted") {
    const pts = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + (i * Math.PI) / 4; return `${(r * 1.05 * Math.cos(a)).toFixed(1)},${(r * 1.05 * Math.sin(a)).toFixed(1)}`; }).join(" ");
    return (<g><polygon points={pts} fill={c} /><path d={`M ${-r * 0.42} ${-r * 0.42} L ${r * 0.42} ${r * 0.42} M ${r * 0.42} ${-r * 0.42} L ${-r * 0.42} ${r * 0.42}`} stroke={W} strokeWidth={sw} strokeLinecap="round" /></g>);
  }
  if (badge === "unknown") return (<g><path d={`M 0 ${-r * 1.1} L ${r * 1.1} ${r * 0.85} L ${-r * 1.1} ${r * 0.85} Z`} fill={c} strokeLinejoin="round" /><text x={0} y={r * 0.62} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={r * 1.1} fill={W}>?</text></g>);
  // nuanced: a balance in a circle
  return (
    <g>
      <circle r={r} fill={c} />
      <path d={`M 0 ${-r * 0.55} L 0 ${r * 0.5} M ${-r * 0.35} ${r * 0.5} L ${r * 0.35} ${r * 0.5} M ${-r * 0.55} ${-r * 0.32} L ${r * 0.55} ${-r * 0.42}`} stroke={W} strokeWidth={sw * 0.7} strokeLinecap="round" />
      <path d={`M ${-r * 0.75} ${-r * 0.05} Q ${-r * 0.55} ${r * 0.2} ${-r * 0.35} ${-r * 0.05} Z M ${r * 0.35} ${-r * 0.13} Q ${r * 0.55} ${r * 0.12} ${r * 0.75} ${-r * 0.13} Z`} fill={W} />
    </g>
  );
};

export const Badge: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme; until: number }> = ({ tl, aspect, theme, until }) => {
  const f = useCurrentFrame();
  const b = tl.cards.badge;
  if (f < b.f || f >= until) return null;
  const z = ZONES[aspect].badge;
  const k = interpolate(f, [b.f, b.f + 9], [1.7, 1], { ...CLAMP, easing: Easing.out(Easing.back(2)) });
  const o = interpolate(f, [b.f, b.f + 4, until - 6, until], [0, 1, 1, 0], CLAMP);
  const r = z.w * 0.24;
  return (
    <g opacity={o} transform={`translate(${z.x + z.w / 2} ${z.y + r + 10}) scale(${k}) rotate(${interpolate(f, [b.f, b.f + 9], [-14, -4], CLAMP)})`}>
      <BadgeSign badge={b.badge} r={r} />
      <g transform="rotate(4)">
        <text y={r + 70} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={62} fill={theme.ink} stroke={theme.paper} strokeWidth={10} paintOrder="stroke">{b.label}</text>
        <text y={r + 118} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={theme.ink} stroke={theme.paper} strokeWidth={8} paintOrder="stroke">{b.certainty}</text>
      </g>
    </g>
  );
};

const Panel: React.FC<{ box: Box; theme: ChromeTheme; o: number; children: React.ReactNode }> = ({ box, theme, o, children }) => (
  <g opacity={o}>
    <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={28} fill={theme.card} stroke={theme.ink} strokeWidth={6} />
    {children}
  </g>
);

/** The study on screen: the line in the viewer's language first (« تحليل لـ 31 دراسة »), the reference small under it. */
export const StudyCard: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  const s = tl.cards.study;
  if (f < s.f0 || f >= s.f1) return null;
  const z = ZONES[aspect].study;
  return (
    <Panel box={z} theme={theme} o={fade(f, s.f0, s.f1)}>
      <foreignObject x={z.x + 24} y={z.y + 18} width={z.w - 48} height={z.h - 36}>
        <div style={{ fontFamily: FONT, color: theme.cardInk, textAlign: "center", lineHeight: 1.25 }}>
          <div dir={tl.dir} style={{ fontSize: 44, fontWeight: 800 }}>{s.line}</div>
          <div style={{ fontSize: 28, fontWeight: 600, marginTop: 14, opacity: 0.8 }}><bdi dir="ltr">{s.ref}</bdi></div>
        </div>
      </foreignObject>
    </Panel>
  );
};

/** The book: a generic closed book (never the cover nor its colours), « الكتاب بيقول », the published title, the
 *  author's name (the only place it appears), and the idea in our words. */
export const BookCard: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme; label: string }> = ({ tl, aspect, theme, label }) => {
  const f = useCurrentFrame();
  const b = tl.cards.book;
  if (f < b.f0 || f >= b.f1) return null;
  const z = ZONES[aspect].book;
  return (
    <Panel box={z} theme={theme} o={fade(f, b.f0, b.f1)}>
      <g transform={`translate(${z.x + z.w - 110} ${z.y + 70})`}>
        <rect x={-50} y={-40} width={100} height={130} rx={8} fill="#8c8f99" stroke={theme.ink} strokeWidth={5} />
        <rect x={-50} y={-40} width={16} height={130} fill="#6c6f78" stroke={theme.ink} strokeWidth={5} />
        <path d="M -22 0 L 36 0 M -22 22 L 30 22" stroke="#e9e6df" strokeWidth={6} strokeLinecap="round" />
      </g>
      <foreignObject x={z.x + 24} y={z.y + 16} width={z.w - 190} height={z.h - 32}>
        <div dir={tl.dir} style={{ fontFamily: FONT, color: theme.cardInk, lineHeight: 1.25 }}>
          <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.75 }}>{label}</div>
          <div style={{ fontSize: 40, fontWeight: 900 }}>{b.title}</div>
          <div style={{ fontSize: 26, fontWeight: 600, opacity: 0.75 }}>{b.author}</div>
          <div style={{ fontSize: 38, fontWeight: 700, marginTop: 14 }}>{b.idea}</div>
        </div>
      </foreignObject>
    </Panel>
  );
};

/** The words of the hook's first frame, read in a second with the sound off. */
export const FirstFrame: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  const c = tl.cards.firstFrame;
  if (f >= c.f1) return null;
  const z = ZONES[aspect].firstFrame;
  const o = interpolate(f, [c.f1 - 8, c.f1], [1, 0], CLAMP);
  return (
    <foreignObject x={z.x} y={z.y} width={z.w} height={z.h} opacity={o}>
      <div dir={tl.dir} style={{ fontFamily: FONT, fontSize: 70, fontWeight: 900, color: theme.ink, textAlign: "center", lineHeight: 1.15, WebkitTextStroke: `0px`, textShadow: `0 0 18px ${theme.paper}, 0 0 8px ${theme.paper}` }}>
        <span style={{ background: theme.accent, padding: "4px 22px", borderRadius: 18, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{c.text}</span>
      </div>
    </foreignObject>
  );
};

/** One card of text (the orientation line, the share call), in the card zone. */
const TextCard: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme; card?: { f0: number; f1: number; text: string }; icon: "heart" | "send" }> = ({ tl, aspect, theme, card, icon }) => {
  const f = useCurrentFrame();
  if (!card || f < card.f0 || f >= card.f1) return null;
  const z = ZONES[aspect].card;
  return (
    <Panel box={z} theme={theme} o={fade(f, card.f0, card.f1)}>
      <g transform={`translate(${z.x + z.w / 2} ${z.y + 62})`}>
        {icon === "heart"
          ? <path d="M 0 22 C -40 -6 -30 -40 0 -22 C 30 -40 40 -6 0 22 Z" fill={theme.accent} stroke={theme.ink} strokeWidth={5} />
          : <path d="M -34 10 L 34 -24 L 12 30 L 4 10 Z" fill={theme.accent} stroke={theme.ink} strokeWidth={5} strokeLinejoin="round" />}
      </g>
      <foreignObject x={z.x + 30} y={z.y + 100} width={z.w - 60} height={z.h - 110}>
        <div dir={tl.dir} style={{ fontFamily: FONT, fontSize: 40, fontWeight: 800, color: theme.cardInk, textAlign: "center", lineHeight: 1.3 }}>{card.text}</div>
      </foreignObject>
    </Panel>
  );
};

/** The current line, the word being said in the accent colour. Whole words in normal flow (never inline-block): an
 *  English title inside an Arabic line keeps its order (review T2). */
export const Subtitles: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  const l = lineAt(tl, f);
  if (!l) return null;
  const z = ZONES[aspect].subtitles;
  const chunk = 9;
  const idx = Math.max(0, l.words.findIndex((w) => f >= w.f0 && f < w.f1));
  const start = l.words.length > chunk ? Math.floor(idx / chunk) * chunk : 0;
  const shown = l.words.slice(start, start + chunk);
  return (
    <foreignObject x={z.x} y={z.y} width={z.w} height={z.h}>
      <div dir={tl.dir} style={{ fontFamily: FONT, fontSize: 50, fontWeight: 800, color: "#ffffff", textAlign: "center", lineHeight: 1.3, WebkitTextStroke: `9px ${theme.ink}`, paintOrder: "stroke fill" }}>
        {shown.map((w, i) => (
          <span key={i}>
            <span style={{ color: start + i === idx ? theme.accent : "#ffffff" }}>{w.w}</span>
            {i < shown.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </foreignObject>
  );
};

export const Draft: React.FC<{ tl: Timeline; aspect: Aspect; label: string }> = ({ tl, aspect, label }) => {
  if (!tl.draft) return null;
  const z = ZONES[aspect].draft;
  return (
    <g>
      <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={10} fill="#d2453b" />
      <text x={z.x + z.w / 2} y={z.y + 31} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill="#fff">{label} · DRAFT</text>
    </g>
  );
};

/** Everything the shell draws, in order. `verdictEnd`: the badge stays through the verdict and the takeaway. */
export const Chrome: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme; labels: { bookSays: string; draft: string }; subtitles?: boolean }> = ({ tl, aspect, theme, labels, subtitles = true }) => (
  <svg width={aspect === "9x16" ? 1080 : 1920} height={aspect === "9x16" ? 1920 : 1080} style={{ position: "absolute", inset: 0 }}>
    <FirstFrame tl={tl} aspect={aspect} theme={theme} />
    <BookCard tl={tl} aspect={aspect} theme={theme} label={labels.bookSays} />
    <Badge tl={tl} aspect={aspect} theme={theme} until={tl.frames} />
    <StudyCard tl={tl} aspect={aspect} theme={theme} />
    <TextCard tl={tl} aspect={aspect} theme={theme} card={tl.cards.orientation} icon="heart" />
    <TextCard tl={tl} aspect={aspect} theme={theme} card={tl.cards.share} icon="send" />
    {subtitles ? <Subtitles tl={tl} aspect={aspect} theme={theme} /> : null}
    <Draft tl={tl} aspect={aspect} label={labels.draft} />
  </svg>
);
