// Sound effects drawn in code (the owner's pilot review: no sound between the moments, hard to follow): a notification
// for the refusal, a tape for the rewind, a pop for a thought, a swirl for the spiral, footsteps, a whoosh between the
// parts and for the cards, a bell for the badge. No sample, so no licence to check; deterministic (seeded noise), so
// the same timeline always sounds the same. 24 kHz mono floats, mixed under the voice before the -16 LUFS levelling.
import type { SfxEvent } from "../schema/timeline.ts";

const RATE = 24000;

/** A seeded noise: the same sound every render. */
function noise(seed: number) {
  let x = seed >>> 0 || 1;
  return () => { x = (x * 1664525 + 1013904223) >>> 0; return (x / 0xffffffff) * 2 - 1; };
}

const len = (s: number) => Math.max(1, Math.round(s * RATE));

function tone(freq: number, seconds: number, decay: number, amp: number, drop = 0): Float32Array {
  const out = new Float32Array(len(seconds));
  let phase = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / RATE;
    phase += (2 * Math.PI * (freq - drop * (t / seconds))) / RATE;
    out[i] = Math.sin(phase) * amp * Math.exp(-t / decay) * Math.min(1, i / 48);
  }
  return out;
}

/** Noise through a low-pass whose cut-off follows `cut(t)` (0..1 of the sound), shaped by `env(t)`. */
function filtered(seconds: number, amp: number, cut: (t: number) => number, env: (t: number) => number, seed: number): Float32Array {
  const out = new Float32Array(len(seconds));
  const rnd = noise(seed);
  let y = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / out.length;
    const a = Math.min(0.99, Math.max(0.01, cut(t)));
    y += a * (rnd() - y);
    out[i] = y * amp * env(t);
  }
  return out;
}

const concat = (...parts: Float32Array[]) => {
  const out = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) { out.set(p, at); at += p.length; }
  return out;
};

export function render(e: SfxEvent): Float32Array {
  const seconds = (e.frames ?? 15) / 30;
  switch (e.kind) {
    case "ping": return concat(tone(880, 0.1, 0.06, 0.22), tone(1318, 0.18, 0.09, 0.22));
    case "pop": return tone(620, 0.08, 0.03, 0.18, 300);
    case "ding": {
      const a = tone(1046, 1.1, 0.35, 0.2), b = tone(2093, 1.1, 0.22, 0.08), c = tone(3136, 1.1, 0.12, 0.04);
      return a.map((v, i) => v + b[i]! + c[i]!);
    }
    case "whoosh": return filtered(0.45, 0.5, (t) => 0.05 + 0.25 * Math.sin(Math.PI * t), (t) => Math.sin(Math.PI * t) ** 2, 7);
    case "swirl": return filtered(0.6, 0.45, (t) => 0.03 + 0.2 * t, (t) => Math.sin(Math.PI * t), 11);
    case "rewind": {
      // a tape running backwards: a fast warble over a band of noise, fading in and out
      const n = filtered(seconds, 0.35, () => 0.25, (t) => Math.min(1, t * 8, (1 - t) * 6), 13);
      const w = new Float32Array(n.length);
      let phase = 0;
      for (let i = 0; i < w.length; i++) {
        const t = i / w.length;
        phase += (2 * Math.PI * (500 + 300 * Math.sin(2 * Math.PI * 9 * t * seconds))) / RATE;
        w[i] = Math.sin(phase) * 0.06 * Math.min(1, t * 8, (1 - t) * 6);
      }
      return n.map((v, i) => v + w[i]!);
    }
    case "steps": {
      // three soft steps over the walk
      const gap = len(seconds / 3);
      const out = new Float32Array(gap * 3);
      for (let k = 0; k < 3; k++) out.set(tone(110, 0.09, 0.03, 0.25, 40), k * gap);
      return out;
    }
  }
}

/** Every effect added into `track` (floats), at its frame. */
export function mix(track: Float32Array, events: readonly SfxEvent[], fps = 30): void {
  for (const e of events) {
    const s = render(e);
    const at = Math.round((e.f / fps) * RATE);
    for (let i = 0; i < s.length && at + i < track.length; i++) track[at + i]! += s[i]!;
  }
}
