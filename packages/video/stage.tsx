// An actor on stage: one character (or the narrator) drawn at a place, in the state the timeline gives it at this frame:
// pose and gesture, emotion, the mouth when it speaks, its blinks, what it holds. Shared by every style.
import type React from "react";
import { look as karim } from "../../characters/karim/look.ts";
import { look as nour } from "../../characters/nour/look.ts";
import { EMOTIONS, VISEMES, blinkAt } from "../rig/face.ts";
import { Phone } from "../rig/fx.tsx";
import { Adasa, Rig, type Look } from "../rig/Rig.tsx";
import { POSES, walk, type Pose } from "../rig/skeleton.ts";
import type { Timeline } from "../schema/timeline.ts";
import { emotionAt, lineAt, mouthAt, poseAt, propAt } from "./state.ts";

export const LOOKS: Record<string, Look> = { nour, karim };
const SEEDS: Record<string, number> = { nour: 3, karim: 7, adasa: 11 };

export type ActorProps = {
  tl: Timeline; f: number; who: string;
  x: number; y: number; s: number; facing?: 1 | -1;
  base?: keyof typeof POSES; opacity?: number;
  /** Walking: the phase of the step (the walk replaces the base pose). */
  walking?: number;
};

export const Actor: React.FC<ActorProps> = ({ tl, f, who, x, y, s, facing = 1, base = "stand", opacity = 1, walking }) => {
  const speaking = lineAt(tl, f)?.speaker === who;
  const mouth = VISEMES[speaking ? mouthAt(tl, who, f) : "X"];
  const emotion = emotionAt(tl, who, f);
  const blink = blinkAt(f, tl.fps, SEEDS[who] ?? 1);
  if (who === tl.cast.narrator) {
    const wave = speaking ? Math.sin(f / 6) * 14 : 0;
    return (
      <g opacity={opacity}>
        <Adasa x={x} y={y + (speaking ? Math.sin(f / 9) * 4 : 0)} s={s} face={EMOTIONS[emotion]} mouth={mouth} blink={blink} armF={30 + wave} armB={-30 - wave / 2} />
      </g>
    );
  }
  const look = LOOKS[who];
  if (!look) return null;
  const { pose, handsTo } = poseAt(tl, who, f, walking === undefined ? (POSES[base] as Pose) : walk(walking));
  const breath = Math.sin(f / 22) * 1.5;
  const prop = propAt(tl, who, f);
  return (
    <g opacity={opacity}>
      <Rig look={look} x={x} y={y + breath} s={s} facing={facing} pose={pose} face={EMOTIONS[emotion]} mouth={mouth} blink={blink}
        handsTo={handsTo} heldF={prop?.id === "phone" && !handsTo ? <Phone state={prop.state} /> : undefined} />
    </g>
  );
};
