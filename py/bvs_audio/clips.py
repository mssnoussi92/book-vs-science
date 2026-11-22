#!/usr/bin/env python3
"""From a checked split to one clip per line, tightened: every pause inside a line longer than --max-pause is brought
down to it (the sentence's own rhythm stays, its dead air goes), then the clip is played --tempo times faster without
changing the pitch (ffmpeg atempo). Gemini speaks slowly (about 2 words a second on the pilot, with pauses up to 1.3 s
inside a line): the episode would last 80 s instead of the minute the format asks for.

  python3 py/bvs_audio/clips.py build/takes/<ep>/<lang>/<req>.wav [--max-pause 0.3] [--tempo 1.1]
  -> build/takes/<ep>/<lang>/clips/<req>.<n>.wav and <req>.clips.json (keys, file, seconds, loudness at 30 fps)

A pause counts only where the voice is far below the take's level (6 dB under the split's threshold): a whispered
syllable of an inner voice is never taken for silence.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

HOP = 0.01
FPS = 30
FADE = 0.01      # seconds of crossfade at every joint
MARGIN = 6       # dB under the split's threshold: a pause, not a whispered syllable


def read(path: Path) -> tuple[np.ndarray, int]:
    with wave.open(str(path), "rb") as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768, w.getframerate()


def write(path: Path, x: np.ndarray, rate: int) -> None:
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())


def tighten(x: np.ndarray, rate: int, threshold_db: float, max_pause: float) -> tuple[np.ndarray, float]:
    n = int(rate * HOP)
    frames = x[: len(x) // n * n].reshape(-1, n)
    db = 20 * np.log10(np.sqrt((frames ** 2).mean(axis=1)) + 1e-12)
    quiet = db < threshold_db - MARGIN
    keep = np.ones(len(x), dtype=bool)
    i, removed = 0, 0.0
    while i < len(quiet):
        if not quiet[i]:
            i += 1; continue
        j = i
        while j < len(quiet) and quiet[j]:
            j += 1
        # only pauses inside the line (not its padded edges)
        if i > 0 and j < len(quiet) and (j - i) * HOP > max_pause:
            cut = (j - i) * HOP - max_pause
            a = int((i * HOP + max_pause / 2) * rate)
            b = a + int(cut * rate)
            keep[a:b] = False
            removed += cut
        i = j
    if removed == 0:
        return x, 0.0
    # rebuild with short crossfades at every joint
    out, pos = [], 0
    edges = np.flatnonzero(np.diff(keep.astype(np.int8)))
    segs, start = [], 0 if keep[0] else None
    for e in edges:
        if keep[e] and start is not None:
            segs.append((start, e + 1)); start = None
        elif not keep[e]:
            start = e + 1
    if start is not None:
        segs.append((start, len(x)))
    f = int(FADE * rate)
    y = x[segs[0][0]: segs[0][1]].copy()
    for a, b in segs[1:]:
        piece = x[a:b].copy()
        k = min(f, len(y), len(piece))
        ramp = np.linspace(0, 1, k, dtype=np.float32)
        y[-k:] = y[-k:] * (1 - ramp) + piece[:k] * ramp
        y = np.concatenate([y, piece[k:]])
    return y, removed


def envelope(x: np.ndarray, rate: int) -> list[float]:
    step = rate / FPS
    rms = [float(np.sqrt((x[int(k * step): int((k + 1) * step)] ** 2).mean() + 1e-12)) for k in range(int(len(x) / step))]
    peak = float(np.percentile(rms, 95)) if rms else 1.0
    return [round(min(1.0, r / (peak or 1)), 3) for r in rms]


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("wav", type=Path)
    p.add_argument("--max-pause", type=float, default=0.3)
    p.add_argument("--tempo", type=float, default=1.1)
    a = p.parse_args()
    if not 1.0 <= a.tempo <= 1.25:
        sys.exit("--tempo between 1.0 and 1.25: faster, Arabic speech stops sounding natural")
    sp = json.loads(a.wav.with_name(a.wav.stem + ".split.json").read_text(encoding="utf-8"))
    if not sp["ok"]:
        sys.exit(f"{a.wav.stem}: the split is refused ({sp['why']}): check it first (check_split.py)")
    x, rate = read(a.wav)
    out_dir = a.wav.parent / "clips"
    out_dir.mkdir(exist_ok=True)
    lines, before, after = [], 0.0, 0.0
    for idx, line in enumerate(sp["lines"]):
        piece = x[int(line["start"] * rate): int(line["end"] * rate)]
        tight, removed = tighten(piece, rate, sp["threshold_db"], a.max_pause)
        name = f"{a.wav.stem}.{idx + 1}.wav"
        raw = out_dir / f"{a.wav.stem}.{idx + 1}.raw.wav"
        write(raw, tight, rate)
        if a.tempo != 1.0:
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", f"atempo={a.tempo}", "-ar", str(rate), "-ac", "1",
                            "-c:a", "pcm_s16le", str(out_dir / name)], check=True)
            raw.unlink()
        else:
            raw.rename(out_dir / name)
        y, _ = read(out_dir / name)
        before += len(piece) / rate; after += len(y) / rate
        lines.append({"keys": line["keys"], "file": f"clips/{name}", "seconds": round(len(y) / rate, 3), "removed_pauses": round(removed, 2), "envelope": envelope(y, rate)})
        print(f"  {','.join(line['keys']):28} {len(piece) / rate:5.2f} s -> {len(y) / rate:5.2f} s (pauses -{removed:.2f} s)")
    out = a.wav.with_name(a.wav.stem + ".clips.json")
    out.write_text(json.dumps({"take": a.wav.name, "sha256": sp.get("sha256"), "max_pause": a.max_pause, "tempo": a.tempo, "lines": lines}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{out}: {before:.1f} s -> {after:.1f} s")


if __name__ == "__main__":
    main()
