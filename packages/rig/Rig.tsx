// A character drawn in code: the flat figure outlined in ink of quran-themes-demo's Stick (vendored, VENDORED.md),
// dressed, with a bigger head and a face that moves (brows and lids from the emotion, the mouth from the viseme).
import type React from "react";
import { blinkAt, EMOTIONS, mixFace, VISEMES, type EmotionName, type FaceParams, type MouthParams, type Viseme } from "./face.ts";
import { joints, SEG, type P2, type Pose } from "./skeleton.ts";

export const INK = "#17181d";

export type Look = {
  skin: string;
  top: string;
  bottom: string;
  hair: string;
  hairStyle: "bun" | "short" | "hijab";
  hijab?: string;
  /** A light beard line on the jaw. */
  stubble?: boolean;
};

export type RigProps = {
  look: Look;
  x: number;
  y: number;              // the pelvis, in frame pixels
  s?: number;             // scale: rig units → pixels
  facing?: 1 | -1;
  pose: Pose;
  face: FaceParams;
  mouth: MouthParams;
  blink?: number;         // 0 open → 1 closed
  hands?: { front?: P2; back?: P2; bendF?: number; bendB?: number };   // world points (pixels) a hand reaches
  /** Both hands to a part of the body (a gesture), placed by inverse kinematics on the current pose. */
  handsTo?: "head" | "chest";
  heldF?: React.ReactNode;
};

const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map(c).map((v) => v.toString(16).padStart(2, "0")).join("")}`;
};

const path = (pts: readonly P2[]) => `M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")}`;
const Part: React.FC<{ pts: readonly P2[]; w: number; color: string }> = ({ pts, w, color }) => (
  <>
    <path d={path(pts)} stroke={INK} strokeWidth={w + 11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={path(pts)} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

/** The face, in head units, looking to +x; (0, 0) is the centre of the head, R its radius. */
export const FaceDrawing: React.FC<{ R: number; face: FaceParams; mouth: MouthParams; blink: number; c?: number }> = ({ R, face, mouth, blink, c = R * 0.2 }) => {
  const closed = Math.min(1, Math.max(face.lid, blink));
  const eyeY = -R * 0.08;
  const rx = R * 0.1 * face.eye;
  const ry = R * 0.15 * face.eye * (1 - closed * 0.9);
  const eye = (dx: number) =>
    closed > 0.85
      ? <path d={`M ${c + dx - rx * 1.2} ${eyeY} Q ${c + dx} ${eyeY + R * 0.06} ${c + dx + rx * 1.2} ${eyeY}`} stroke={INK} strokeWidth={R * 0.07} fill="none" strokeLinecap="round" />
      : <ellipse cx={c + dx} cy={eyeY + (R * 0.15 * face.eye - ry) * 0.5} rx={rx} ry={ry} fill={INK} />;
  const browY = -R * 0.38;
  const brow = (side: -1 | 1) => {
    const up = side === 1 ? (face.browAsym ?? 0) : 0;
    const inner: P2 = [c + side * R * 0.1, browY - (face.browInner + up * 0.6) * (R / 65)];
    const outer: P2 = [c + side * R * 0.46, browY - (face.browOuter + up) * (R / 65)];
    return <path d={`M ${outer[0]} ${outer[1]} L ${inner[0]} ${inner[1]}`} stroke={INK} strokeWidth={R * 0.085} strokeLinecap="round" />;
  };
  const y0 = R * 0.36;
  const W = R * (0.26 + 0.32 * mouth.width) * (1 - 0.45 * mouth.round);
  const Hm = R * 0.5 * mouth.open;
  const lift = face.corner * R * 0.09;
  const mouthEl = Hm < R * 0.03
    ? <path d={`M ${c - W / 2} ${y0 - lift} Q ${c} ${y0 + lift} ${c + W / 2} ${y0 - lift}`} stroke={INK} strokeWidth={mouth.width < 0.76 && mouth.open === 0 && mouth.teeth === 0 && mouth.round === 0 && mouth.width > 0.72 ? R * 0.11 : R * 0.08} fill="none" strokeLinecap="round" />
    : (
      <g>
        <path d={`M ${c - W / 2} ${y0 - lift} Q ${c} ${y0 - Hm * 0.25 + lift * 0.3} ${c + W / 2} ${y0 - lift} Q ${c} ${y0 + Hm + lift} ${c - W / 2} ${y0 - lift} Z`}
          fill={INK} stroke={INK} strokeWidth={R * 0.05} strokeLinejoin="round" />
        {mouth.teeth > 0.5 && Hm > R * 0.05 ? <rect x={c - W * 0.32} y={y0 - Hm * 0.12} width={W * 0.64} height={Math.min(Hm * 0.32, R * 0.08)} rx={R * 0.02} fill="#f6f3ec" /> : null}
        {mouth.tongue > 0.5 && Hm > R * 0.12 ? <ellipse cx={c} cy={y0 + Hm * 0.62} rx={W * 0.28} ry={Hm * 0.2} fill="#e07a6a" /> : null}
      </g>
    );
  return <>{brow(-1)}{brow(1)}{eye(-R * 0.27)}{eye(R * 0.27)}{mouthEl}</>;
};

/** One character, whole. */
export const Rig: React.FC<RigProps> = ({ look, x, y, s = 1.3, facing = 1, pose, face, mouth, blink = 0, hands, handsTo, heldF }) => {
  const local = (w?: P2): P2 | undefined => (w ? [(w[0] - x) / (facing * s), (w[1] - y) / s] : undefined);
  let target = { front: local(hands?.front), back: local(hands?.back), bendF: hands?.bendF, bendB: hands?.bendB };
  if (handsTo) {
    const base = joints(pose);
    const R0 = SEG.head;
    target = handsTo === "head"
      ? { front: [base.head[0] + R0 * 0.55, base.head[1] + R0 * 0.35], back: [base.head[0] - R0 * 0.2, base.head[1] + R0 * 0.55], bendF: 1, bendB: 1 }
      : { front: [base.neck[0] + 18, base.neck[1] + 40], back: [base.neck[0] + 4, base.neck[1] + 52], bendF: 1, bendB: 1 };
  }
  const J = joints(pose, target);
  const R = SEG.head;
  const back = shade(look.top, 0.82);
  const legBack = shade(look.bottom, 0.82);
  const tilt = J.tilt + face.headTilt * 0.3;
  const hF: P2 = [x + J.armF[2][0] * facing * s, y + J.armF[2][1] * s];
  return (
    <g>
      <g transform={`translate(${x} ${y}) scale(${facing * s} ${s})`}>
        <Part pts={J.legB} w={28} color={legBack} />
        <Part pts={J.armB} w={24} color={back} />
        <Part pts={[J.pelvis, J.neck]} w={44} color={look.top} />
        <Part pts={J.legF} w={28} color={look.bottom} />
        <Part pts={J.armF} w={24} color={look.top} />
        {[J.armF[2], J.armB[2]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={10} fill={look.skin} stroke={INK} strokeWidth={5} />)}
        <g transform={`translate(${J.head[0]} ${J.head[1]}) rotate(${tilt})`}>
          {look.hairStyle === "hijab" ? (
            <>
              <path d={`M ${-R * 1.12} ${R * 0.2} Q ${-R * 1.2} ${-R * 1.25} ${R * 0.1} ${-R * 1.18} Q ${R * 1.25} ${-R * 1.05} ${R * 1.1} ${R * 0.3} L ${R * 1.05} ${R * 1.45} L ${-R * 1.2} ${R * 1.5} Z`}
                fill={look.hijab ?? look.hair} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              <ellipse cx={R * 0.18} cy={R * 0.06} rx={R * 0.8} ry={R * 0.88} fill={look.skin} stroke={INK} strokeWidth={5} />
            </>
          ) : (
            <>
              {look.hairStyle === "bun" ? <circle cx={-R * 0.72} cy={-R * 0.62} r={R * 0.38} fill={look.hair} stroke={INK} strokeWidth={6} /> : null}
              <circle cx={0} cy={0} r={R} fill={look.skin} stroke={INK} strokeWidth={6} />
              <path d={look.hairStyle === "bun"
                ? `M ${-R * 0.98} ${R * 0.1} Q ${-R * 1.05} ${-R * 1.05} ${R * 0.15} ${-R * 1.02} Q ${R * 0.85} ${-R * 0.95} ${R * 0.95} ${-R * 0.35} Q ${R * 0.35} ${-R * 0.72} ${-R * 0.35} ${-R * 0.55} Q ${-R * 0.7} ${-R * 0.2} ${-R * 0.98} ${R * 0.1} Z`
                : `M ${-R * 0.98} ${-R * 0.05} Q ${-R * 1.02} ${-R * 1.08} ${R * 0.2} ${-R * 1.04} Q ${R * 0.92} ${-R * 0.92} ${R * 0.98} ${-R * 0.45} Q ${R * 0.5} ${-R * 0.62} ${R * 0.1} ${-R * 0.6} Q ${-R * 0.55} ${-R * 0.55} ${-R * 0.98} ${-R * 0.05} Z`}
                fill={look.hair} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
              {look.stubble ? <path d={`M ${-R * 0.1} ${R * 0.7} Q ${R * 0.35} ${R * 1.0} ${R * 0.8} ${R * 0.62}`} stroke={shade(look.skin, 0.72)} strokeWidth={R * 0.12} fill="none" strokeLinecap="round" opacity={0.45} /> : null}
            </>
          )}
          <FaceDrawing R={R} face={face} mouth={mouth} blink={blink} />
        </g>
      </g>
      {heldF ? <g transform={`translate(${hF[0].toFixed(1)} ${hF[1].toFixed(1)})`}>{heldF}</g> : null}
    </g>
  );
};

/** The narrator « عدسة »: a magnifying glass with a face in its lens and two thin arms. Not a person: no expert in a
 *  white coat, no gender to choose, the symbol of checking. */
export const Adasa: React.FC<{ x: number; y: number; s?: number; face: FaceParams; mouth: MouthParams; blink?: number; armF?: number; armB?: number; tilt?: number }> =
  ({ x, y, s = 1, face, mouth, blink = 0, armF = 30, armB = -30, tilt = -12 }) => {
    const R = 120;
    const arm = (side: 1 | -1, angle: number) => {
      const o: P2 = [side * R * 1.05, R * 0.15];
      const a = (angle * Math.PI) / 180;
      const j: P2 = [o[0] + side * 70 * Math.cos(a), o[1] + 70 * Math.sin(a) + 10];
      const h: P2 = [j[0] + side * 60 * Math.cos(a - 0.7), j[1] + 60 * Math.sin(a - 0.7)];
      return (
        <g>
          <path d={path([o, j, h])} stroke={INK} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={h[0]} cy={h[1]} r={17} fill="#f6f3ec" stroke={INK} strokeWidth={6} />
        </g>
      );
    };
    return (
      <g transform={`translate(${x} ${y}) scale(${s}) rotate(${tilt})`}>
        <path d={`M ${R * 0.62} ${R * 0.62} L ${R * 1.45} ${R * 1.45}`} stroke={INK} strokeWidth={50} strokeLinecap="round" />
        <path d={`M ${R * 0.62} ${R * 0.62} L ${R * 1.45} ${R * 1.45}`} stroke="#b7643a" strokeWidth={36} strokeLinecap="round" />
        {arm(-1, armB)}
        {arm(1, armF)}
        <circle cx={0} cy={0} r={R} fill="#dff1f4" stroke={INK} strokeWidth={30} />
        <circle cx={0} cy={0} r={R} fill="none" stroke="#e0a83a" strokeWidth={16} />
        <path d={`M ${-R * 0.62} ${-R * 0.3} Q ${-R * 0.5} ${-R * 0.62} ${-R * 0.2} ${-R * 0.7}`} stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.85} />
        <g transform={`rotate(${-tilt})`}>
          <FaceDrawing R={R * 0.78} face={face} mouth={mouth} blink={blink} c={0} />
        </g>
      </g>
    );
  };

export const faceOf = (emotion: EmotionName, to?: EmotionName, k = 0): FaceParams => (to ? mixFace(EMOTIONS[emotion], EMOTIONS[to], k) : EMOTIONS[emotion]);
export const mouthOf = (v: Viseme): MouthParams => VISEMES[v];
export { blinkAt };
