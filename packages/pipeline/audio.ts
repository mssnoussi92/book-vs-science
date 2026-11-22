// The episode's voice track: every measured line copied from its take to the frame where the timeline puts it, then
// brought to -16 LUFS integrated (the level of the owner's other channels) by ffmpeg's loudnorm, true peak -1.5 dBTP.
// Takes are 24 kHz mono 16-bit WAV (Gemini); the track keeps that format.
import { execFileSync } from "node:child_process";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { toWav } from "./gemini.ts";
import type { Measured } from "./timeline.ts";

const RATE = 24000;
const FPS = 30;

function samples(path: string): Int16Array {
  const wav = readFileSync(path);
  if (wav.readUInt16LE(22) !== 1 || wav.readUInt32LE(24) !== RATE || wav.readUInt16LE(34) !== 16) throw new Error(`${path}: 24 kHz mono 16-bit expected`);
  // The data chunk (skip any other chunk after "fmt ").
  let at = 12;
  while (at < wav.length - 8 && wav.toString("latin1", at, at + 4) !== "data") at += 8 + wav.readUInt32LE(at + 4);
  const start = at + 8, len = Math.min(wav.readUInt32LE(at + 4), wav.length - start);
  return new Int16Array(wav.buffer.slice(wav.byteOffset + start, wav.byteOffset + start + len - (len % 2)));
}

/** Writes the track, returns its file name (relative to the timeline's folder). */
export function assemble(takeDir: string, placed: { key: string; f0: number; m: Measured }[], frames: number, out: string): string {
  const track = new Int16Array(Math.ceil((frames / FPS) * RATE));
  const cache = new Map<string, Int16Array>();
  for (const { f0, m } of placed) {
    const src = cache.get(m.take) ?? samples(join(takeDir, m.take));
    cache.set(m.take, src);
    const from = Math.round(m.start * RATE), to = Math.min(src.length, Math.round(m.end * RATE));
    const at = Math.round((f0 / FPS) * RATE);
    for (let i = 0; i < to - from && at + i < track.length; i++) {
      // short fades in and out (5 ms): a cut in the middle of a breath does not click
      const fade = Math.min(1, i / 120, (to - from - i) / 120);
      track[at + i] = Math.max(-32768, Math.min(32767, track[at + i]! + src[from + i]! * fade));
    }
  }
  const raw = out.replace(/\.wav$/, ".raw.wav");
  writeFileSync(raw, toWav(Buffer.from(track.buffer)));
  try {
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", String(RATE), "-ac", "1", "-c:a", "pcm_s16le", out]);
  } catch {
    console.error("ffmpeg introuvable : piste gardée sans mise à niveau (-16 LUFS à faire)");
    renameSync(raw, out);
  }
  return basename(out);
}
