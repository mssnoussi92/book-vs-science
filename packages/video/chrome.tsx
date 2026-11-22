// The shell: what no style decides (docs/conception.md §4.8). Drawn after the style, which can neither hide it nor
// move it; a style only gives it a theme (ink, paper, accent). Texts come from the timeline (the language file and the
// registry), never typed here.
import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import type { Timeline } from "../schema/timeline.ts";
import { FONT } from "./fonts.ts";
import { ZONES, type Aspect, type Box } from "./layout.ts";
import { lineAt, readingChunks } from "./state.ts";

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
          {s.applies ? <div dir={tl.dir} style={{ fontSize: 32, fontWeight: 800, marginTop: 12, color: theme.accent }}>{s.applies}</div> : null}
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
  // One solid card, its lines balanced, alone on screen while it is up (the subtitles wait for it, the book pill too).
  return (
    <foreignObject x={z.x} y={z.y} width={z.w} height={z.h} opacity={o}>
      <div dir={tl.dir} style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%" }}>
        <div style={{ display: "inline-block", maxWidth: z.w - 20, background: theme.accent, borderRadius: 28, padding: "14px 34px 18px", boxShadow: "0 8px 0 rgba(23,24,29,0.85)", fontFamily: FONT, fontSize: 72, fontWeight: 900, color: theme.ink, textAlign: "center", lineHeight: 1.3, textWrap: "balance" }}>
          {c.text}
        </div>
      </div>
    </foreignObject>
  );
};

/** From the first image to the book card: the book and a badge still hidden, so that a verdict is promised. */
export const Tease: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  const c = tl.cards.tease;
  if (!c || f < c.f0 || f >= c.f1) return null;
  const z = ZONES[aspect].tease;
  return (
    <foreignObject x={z.x} y={z.y} width={z.w} height={z.h} opacity={fade(f, c.f0, c.f1, 4)}>
      <div dir={tl.dir} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, height: "100%", fontFamily: FONT, fontSize: 30, fontWeight: 800, color: theme.ink }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, background: theme.card, border: `4px solid ${theme.ink}`, borderRadius: 40, padding: "2px 18px" }}>
          <svg width={30} height={36} viewBox="-16 -20 32 40"><rect x={-14} y={-18} width={28} height={36} rx={4} fill="#8c8f99" stroke={theme.ink} strokeWidth={3} /><rect x={-14} y={-18} width={6} height={36} fill="#6c6f78" /></svg>
          {c.title}
          <svg width={38} height={38} viewBox="-20 -20 40 40"><circle r={17} fill="#7d8290" stroke={theme.ink} strokeWidth={3} /><text y={8} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={24} fill="#fff">?</text></svg>
        </span>
      </div>
    </foreignObject>
  );
};

/** Which take of a replayed scene is playing (« المرة الأولى », « المرة التانية »), under the book pill, while it plays:
 *  the owner's pilot review, the second take with other thoughts was not understood as the same scene played again. */
export const TakeLabel: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  const t = tl.cards.takes?.find((x) => f >= x.f0 && f < x.f1);
  if (!t) return null;
  const z = ZONES[aspect].tease;
  const k = interpolate(f, [t.f0, t.f0 + 8], [0.6, 1], { ...CLAMP, easing: Easing.out(Easing.back(2)) });
  return (
    <foreignObject x={z.x} y={z.y + z.h + 10} width={z.w} height={70} opacity={fade(f, t.f0, t.f1, 6)}>
      <div dir={tl.dir} style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <div style={{ transform: `scale(${k})`, display: "flex", alignItems: "center", gap: 12, background: t.n === 1 ? "#3f5a8a" : "#c9822b", color: "#ffffff", borderRadius: 30, padding: "4px 24px", fontFamily: FONT, fontSize: 34, fontWeight: 900, border: `4px solid ${theme.ink}` }}>
          <span style={{ background: "#ffffff", color: theme.ink, borderRadius: 20, minWidth: 34, textAlign: "center", fontSize: 28 }}>{t.n}</span>
          {t.label}
        </div>
      </div>
    </foreignObject>
  );
};

/** One card of text (the nuance, the orientation line, the share call), in the card zone. */
const TextCard: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme; card?: { f0: number; f1: number; text: string }; icon: "heart" | "send" | "scale" }> = ({ tl, aspect, theme, card, icon }) => {
  const f = useCurrentFrame();
  if (!card || f < card.f0 || f >= card.f1) return null;
  const z = ZONES[aspect].card;
  return (
    <Panel box={z} theme={theme} o={fade(f, card.f0, card.f1)}>
      <g transform={`translate(${z.x + z.w / 2} ${z.y + 62})`}>
        {icon === "heart"
          ? <path d="M 0 22 C -40 -6 -30 -40 0 -22 C 30 -40 40 -6 0 22 Z" fill={theme.accent} stroke={theme.ink} strokeWidth={5} />
          : icon === "scale"
          ? <path d="M 0 -32 L 0 28 M -26 28 L 26 28 M -40 -18 L 40 -18 M -40 -18 L -54 10 L -26 10 Z M 40 -18 L 26 10 L 54 10 Z" fill={theme.accent} stroke={theme.ink} strokeWidth={5} strokeLinejoin="round" />
          : <path d="M -34 10 L 34 -24 L 12 30 L 4 10 Z" fill={theme.accent} stroke={theme.ink} strokeWidth={5} strokeLinejoin="round" />}
      </g>
      <foreignObject x={z.x + 30} y={z.y + 100} width={z.w - 60} height={z.h - 110}>
        {/* A short card (a nuance in four words) is read at a glance: larger. */}
        <div dir={tl.dir} style={{ fontFamily: FONT, fontSize: card.text.length <= 32 ? 58 : 40, fontWeight: 800, color: theme.cardInk, textAlign: "center", lineHeight: 1.3, textWrap: "balance" }}>{card.text}</div>
      </foreignObject>
    </Panel>
  );
};

/** A text shown during an action, with no voice (the book's advice during the rewind): in the subtitles' zone, drawn
 *  by the shell even when a style owns the subtitles. */
export const Caption: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  if (lineAt(tl, f)) return null;
  const c = tl.actions.find((a) => a.caption && f >= a.f0 && f < a.f1);
  if (!c) return null;
  const z = ZONES[aspect].subtitles;
  // The same plate as the subtitles (a highlight under each line hid the bowl of a final « ل », pilot review), with the
  // accent as its edge: a text shown, not said.
  return (
    <foreignObject x={z.x} y={z.y} width={z.w} height={z.h} opacity={fade(f, c.f0, c.f1, 4)}>
      <div dir={tl.dir} style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%" }}>
        <div style={{ display: "inline-block", maxWidth: z.w, padding: "10px 26px 12px", borderRadius: 24, background: "rgba(20,22,30,0.84)", border: `4px solid ${theme.accent}`, color: "#ffffff", fontFamily: FONT, fontSize: 50, fontWeight: 800, textAlign: "center", lineHeight: 1.4, textWrap: "balance" }}>{c.caption}</div>
      </div>
    </foreignObject>
  );
};

/** Who speaks, by a colour under the subtitle (the narrator's blue, Karim's orange, Nour's teal). */
const SPEAKER: Record<string, string> = { adasa: "#5b6bd0", karim: "#e07a3a", nour: "#2f9c95" };

/** The current line on a plate, cut for reading, the word being said in the accent colour. Whole words in normal flow
 *  (never inline-block): an English title inside an Arabic line keeps its order (review T2). A thought (said to
 *  oneself) is on a pale plate with a dashed edge and the dots of a thought bubble: never read as said aloud. */
export const Subtitles: React.FC<{ tl: Timeline; aspect: Aspect; theme: ChromeTheme }> = ({ tl, aspect, theme }) => {
  const f = useCurrentFrame();
  const l = lineAt(tl, f);
  const z = ZONES[aspect].subtitles;
  if (!l || !l.words.length || f < tl.cards.firstFrame.f1) return null;
  let idx = l.words.findIndex((w) => f >= w.f0 && f < w.f1);
  if (idx < 0) idx = f < l.words[0]!.f0 ? 0 : l.words.length - 1;
  const [a, b] = readingChunks(l.words).find(([s, e]) => idx >= s && idx < e) ?? [0, l.words.length];
  const shown = l.words.slice(a, b);
  const inner = !!l.inner;
  const plate: React.CSSProperties = inner
    ? { background: "rgba(255,255,255,0.94)", color: "#2b3152", border: "4px dashed #7a86c9" }
    : { background: "rgba(20,22,30,0.80)", color: "#ffffff", borderBottom: `6px solid ${SPEAKER[l.speaker] ?? theme.accent}` };
  return (
    <foreignObject x={z.x} y={z.y} width={z.w} height={z.h}>
      <div dir={tl.dir} style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%" }}>
        <div style={{ ...plate, display: "inline-block", maxWidth: z.w, padding: "10px 26px 12px", borderRadius: 24, fontFamily: FONT, fontSize: 54, fontWeight: 800, textAlign: "center", lineHeight: 1.35, textWrap: "balance" }}>
          {inner ? (
            <svg width={46} height={34} viewBox="0 0 46 34" style={{ verticalAlign: "middle", marginInlineEnd: 12 }}>
              <circle cx={8} cy={26} r={5} fill="#7a86c9" /><circle cx={20} cy={17} r={7} fill="#7a86c9" /><circle cx={36} cy={10} r={9} fill="#7a86c9" />
            </svg>
          ) : null}
          {shown.map((w, i) => (
            <span key={i}>
              <span style={{ color: a + i === idx ? (inner ? "#c0711e" : theme.accent) : undefined }}>{w.w}</span>
              {i < shown.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
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
    <Tease tl={tl} aspect={aspect} theme={theme} />
    <TakeLabel tl={tl} aspect={aspect} theme={theme} />
    <BookCard tl={tl} aspect={aspect} theme={theme} label={labels.bookSays} />
    <Badge tl={tl} aspect={aspect} theme={theme} until={tl.frames} />
    <StudyCard tl={tl} aspect={aspect} theme={theme} />
    <TextCard tl={tl} aspect={aspect} theme={theme} card={tl.cards.nuance} icon="scale" />
    <TextCard tl={tl} aspect={aspect} theme={theme} card={tl.cards.orientation} icon="heart" />
    <TextCard tl={tl} aspect={aspect} theme={theme} card={tl.cards.share} icon="send" />
    {subtitles ? <Subtitles tl={tl} aspect={aspect} theme={theme} /> : null}
    <Caption tl={tl} aspect={aspect} theme={theme} />
    <Draft tl={tl} aspect={aspect} label={labels.draft} />
  </svg>
);
