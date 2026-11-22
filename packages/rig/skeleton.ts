// vendored from mssnoussi92/quran-themes-demo@c20d118:video/src/trial/Sahib.tsx (Pose, SEG, reach, limb geometry)
// and video/src/trial/Lens.tsx (mix, walk, some poses). Changed: a bigger head (the mouth must read at 1080 px on a
// phone), more poses for the gestures of the scripts, everything exported, no drawing here.

/** Angles in degrees. Limbs: [first segment from straight down, positive forward; bend of the second segment].
 * `torso`: lean forward from upright; `head`: tilt of the head, positive up. */
export type Pose = { torso: number; head: number; armF: [number, number]; armB: [number, number]; legF: [number, number]; legB: [number, number] };
export type P2 = [number, number];

/** Segment lengths in rig units. The head is 1.25× the one of quran-themes-demo's Stick (52 → 65). */
export const SEG = { torso: 122, neck: 10, head: 65, upper: 64, fore: 60, thigh: 78, shin: 76 };
export const LEGS = SEG.thigh + SEG.shin;

export const rad = (d: number) => (d * Math.PI) / 180;
export const down = (deg: number): P2 => [Math.sin(rad(deg)), Math.cos(rad(deg))];
export const add = (o: P2, d: P2, l: number): P2 => [o[0] + d[0] * l, o[1] + d[1] * l];

export const POSES: Record<string, Pose> = {
  stand: { torso: 0, head: 0, armF: [8, 6], armB: [-8, 6], legF: [6, -4], legB: [-6, -2] },
  seat: { torso: -4, head: 0, armF: [30, 50], armB: [14, 30], legF: [86, -84], legB: [80, -80] },
  stride: { torso: 14, head: 4, armF: [30, 20], armB: [-30, 10], legF: [32, -10], legB: [-26, -18] },
  bent: { torso: 16, head: 10, armF: [24, 30], armB: [-6, 8], legF: [10, -14], legB: [-8, -10] },
  slump: { torso: 30, head: -38, armF: [18, 6], armB: [12, 6], legF: [88, -88], legB: [84, -84] },
  hunch: { torso: 26, head: -34, armF: [36, 86], armB: [30, 90], legF: [88, -88], legB: [84, -84] },
  raise: { torso: 2, head: 14, armF: [20, 40], armB: [16, 44], legF: [88, -88], legB: [84, -84] },
  shrug: { torso: 0, head: 8, armF: [22, 98], armB: [8, 104], legF: [6, -4], legB: [-6, -2] },
  "head-in-hands": { torso: 22, head: -26, armF: [118, 116], armB: [110, 120], legF: [6, -4], legB: [-6, -2] },
  "head-in-hands-seated": { torso: 34, head: -30, armF: [120, 120], armB: [112, 124], legF: [88, -88], legB: [84, -84] },
  "hand-on-chest": { torso: 0, head: -4, armF: [40, 118], armB: [-8, 6], legF: [6, -4], legB: [-6, -2] },
  point: { torso: 4, head: 4, armF: [100, 4], armB: [-8, 6], legF: [6, -4], legB: [-6, -2] },
  breathe: { torso: -6, head: 18, armF: [14, 10], armB: [-14, 10], legF: [6, -4], legB: [-6, -2] },
  "arms-crossed": { torso: 0, head: 0, armF: [36, 120], armB: [30, 126], legF: [6, -4], legB: [-6, -2] },
};

/** A pose between two others (k from 0 to 1). */
export const mix = (a: Pose, b: Pose, k: number): Pose => {
  const m = (x: number, y: number) => x + (y - x) * k;
  const m2 = (x: [number, number], y: [number, number]): [number, number] => [m(x[0], y[0]), m(x[1], y[1])];
  return { torso: m(a.torso, b.torso), head: m(a.head, b.head), armF: m2(a.armF, b.armF), armB: m2(a.armB, b.armB), legF: m2(a.legF, b.legF), legB: m2(a.legB, b.legB) };
};

/** A step of a walk: `phase` in radians grows with the distance walked. */
export const walk = (phase: number): Pose => {
  const s = Math.sin(phase);
  const bendF = -38 * Math.max(0, -Math.cos(phase));
  const bendB = -38 * Math.max(0, Math.cos(phase));
  return { torso: 5, head: 0, armF: [-22 * s, 16], armB: [22 * s, 16], legF: [26 * s, bendF], legB: [-26 * s, bendB] };
};

/** Two segments from `o` to the point `t`, the joint bent to the side `bend` (1 or -1); all in local units. */
export const reach = (o: P2, t: P2, l1: number, l2: number, bend: number): readonly [P2, P2, P2] => {
  const dx = t[0] - o[0];
  const dy = t[1] - o[1];
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(l1 - l2) + 1), l1 + l2 - 0.5);
  const base = Math.atan2(dy, dx);
  const a = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
  const j: P2 = [o[0] + l1 * Math.cos(base + bend * a), o[1] + l1 * Math.sin(base + bend * a)];
  const len = Math.hypot(dx, dy) || 1;
  const end: P2 = [o[0] + (dx / len) * d, o[1] + (dy / len) * d];
  return [o, j, end] as const;
};

/** The joints of a pose, in rig units, pelvis at (0, 0), facing +x. */
export function joints(pose: Pose, hands: { front?: P2; back?: P2; bendF?: number; bendB?: number } = {}) {
  const P: P2 = [0, 0];
  const up: P2 = [Math.sin(rad(pose.torso)), -Math.cos(rad(pose.torso))];
  const neck = add(P, up, SEG.torso);
  const shoulder = add(P, up, SEG.torso - 16);
  const headDir: P2 = [Math.sin(rad(pose.torso - pose.head)), -Math.cos(rad(pose.torso - pose.head))];
  const head = add(neck, headDir, SEG.neck + SEG.head);
  const limb = (o: P2, [a, b]: [number, number], l1: number, l2: number): readonly [P2, P2, P2] => {
    const j = add(o, down(a), l1);
    return [o, j, add(j, down(a + b), l2)] as const;
  };
  const armF = hands.front ? reach(shoulder, hands.front, SEG.upper, SEG.fore, hands.bendF ?? -1) : limb(shoulder, pose.armF, SEG.upper, SEG.fore);
  const armB = hands.back ? reach(shoulder, hands.back, SEG.upper, SEG.fore, hands.bendB ?? -1) : limb(shoulder, pose.armB, SEG.upper, SEG.fore);
  const legF = limb(P, pose.legF, SEG.thigh, SEG.shin);
  const legB = limb(P, pose.legB, SEG.thigh, SEG.shin);
  const tilt = (Math.atan2(headDir[1], headDir[0]) * 180) / Math.PI + 90;
  return { pelvis: P, neck, shoulder, head, tilt, armF, armB, legF, legB };
}
