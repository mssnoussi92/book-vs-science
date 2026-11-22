// The model sheet of a character: what the owner validates once (docs/conception.md §4.7) before any episode uses
// it. Full body in a few poses, the face in eight emotions, the mouth in the nine visemes, at the size a phone shows.
import type React from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
import { look as karim } from "../../characters/karim/look.ts";
import { look as nour, lookHijab as nourHijab } from "../../characters/nour/look.ts";
import { EMOTIONS, VISEMES, type EmotionName, type Viseme } from "../rig/face.ts";
import { Adasa, INK, Rig, type Look } from "../rig/Rig.tsx";
import { POSES } from "../rig/skeleton.ts";
import { FONT, loadFonts } from "./fonts.ts";

export type SheetProps = { who: "nour" | "nour-hijab" | "karim" | "adasa" };

const LOOKS: Record<Exclude<SheetProps["who"], "adasa">, Look> = { nour, "nour-hijab": nourHijab, karim };
const NAMES = { nour: "نور · Nour", "nour-hijab": "نور · Nour (hijab)", karim: "كريم · Karim", adasa: "عدسة · Adasa" };
const SHOWN: EmotionName[] = ["neutral", "happy", "sad", "anxious", "ashamed", "surprised", "relieved", "skeptical"];
const VIS: Viseme[] = ["X", "A", "B", "C", "D", "E", "F", "G", "H"];
const BG = "#f3efe6";

const handle = delayRender("fonts");
loadFonts().then(() => continueRender(handle));

const Label: React.FC<{ x: number; y: number; children: React.ReactNode; size?: number }> = ({ x, y, children, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={FONT} fontSize={size} fontWeight={600} fill={INK}>{children}</text>
);

/** A head alone, for the rows of faces: the hair or hijab of the look, or the lens of the narrator. */
const Head: React.FC<{ who: SheetProps["who"]; x: number; y: number; emotion: EmotionName; viseme?: Viseme }> = ({ who, x, y, emotion, viseme = "X" }) => {
  if (who === "adasa") return <Adasa x={x} y={y} s={0.5} face={EMOTIONS[emotion]} mouth={VISEMES[viseme]} tilt={0} armF={60} armB={-60} />;
  const look = LOOKS[who];
  // the rig drawn big and clipped to its head: one source of truth for the face
  return (
    <g>
      <clipPath id={`h-${who}-${x}-${y}`}><circle cx={x} cy={y} r={92} /></clipPath>
      <g clipPath={`url(#h-${who}-${x}-${y})`}>
        <Rig look={look} x={x - 8} y={y + 258} s={1.15} pose={POSES.stand!} face={EMOTIONS[emotion]} mouth={VISEMES[viseme]} />
      </g>
      <circle cx={x} cy={y} r={92} fill="none" stroke="#d8d1c2" strokeWidth={3} />
    </g>
  );
};

export const CharacterSheet: React.FC<SheetProps> = ({ who }) => {
  const bodies: [string, keyof typeof POSES, EmotionName][] = [["stand", "stand", "neutral"], ["head-in-hands", "head-in-hands", "sad"], ["shrug", "shrug", "skeptical"], ["point", "point", "happy"]];
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <Label x={540} y={110} size={54}>{NAMES[who]}</Label>
        <Label x={540} y={160} size={24}>personnage inventé · planche à valider par le propriétaire</Label>
        {who === "adasa" ? (
          <g>
            <Adasa x={300} y={430} s={1.05} face={EMOTIONS.curious} mouth={VISEMES.C} />
            <Adasa x={780} y={430} s={1.05} face={EMOTIONS.skeptical} mouth={VISEMES.X} armF={70} armB={10} />
            <Label x={300} y={720}>curious · parle</Label>
            <Label x={780} y={720}>skeptical · écoute</Label>
          </g>
        ) : (
          bodies.map(([label, pose, emotion], i) => (
            <g key={label}>
              <Rig look={LOOKS[who]} x={150 + i * 260} y={600} s={0.95} pose={POSES[pose]!} face={EMOTIONS[emotion]} mouth={VISEMES.X} handsTo={pose === "head-in-hands" ? "head" : undefined} />
              <Label x={150 + i * 260} y={790}>{label}</Label>
            </g>
          ))
        )}
        <Label x={540} y={870} size={30}>émotions</Label>
        {SHOWN.map((e, i) => (
          <g key={e}>
            <Head who={who} x={170 + (i % 4) * 247} y={990 + Math.floor(i / 4) * 250} emotion={e} />
            <Label x={170 + (i % 4) * 247} y={1110 + Math.floor(i / 4) * 250} size={22}>{e}</Label>
          </g>
        ))}
        <Label x={540} y={1490} size={30}>bouche (visèmes de la synchro labiale)</Label>
        {VIS.map((v, i) => (
          <g key={v}>
            <Head who={who} x={110 + (i % 5) * 215} y={1590 + Math.floor(i / 5) * 215} emotion="neutral" viseme={v} />
            <Label x={110 + (i % 5) * 215} y={1700 + Math.floor(i / 5) * 215} size={22}>{v}</Label>
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
