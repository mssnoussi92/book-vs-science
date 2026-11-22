#!/usr/bin/env python3
"""Cut one voice take into its lines, at the silences between them (each turn but the last ends with « <long pause> »).

  python3 py/bvs_audio/split.py build/takes/<ep>/<lang>/<request>.wav [--json …/<request>.json] [--out …/<request>.split.json]

The take's JSON (written by `bvs voice take`) gives the turns in order. The n - 1 longest silences inside the take are
the cuts; the take is refused (exit 1) when they are not clearly longer than the silences inside a line (a pause the
voice made inside a sentence, a turn said twice, a turn skipped): then a person listens, or Whisper is asked. For every
turn: where it starts and ends in the take, and its loudness at 30 frames a second (the mouths of the « volume » engine).
Nothing is transcribed here: a split is checked by its count and by its gaps, and by the owner's ear.
"""
from __future__ import annotations

import argparse
import json
import sys
import wave
from pathlib import Path

import numpy as np

HOP = 0.01          # seconds per energy frame
MIN_GAP = 0.25      # a silence shorter than this is never a cut
PAD_IN, PAD_OUT = 0.04, 0.08
FPS = 30


def read(path: Path) -> tuple[np.ndarray, int]:
    with wave.open(str(path), "rb") as w:
        if w.getsampwidth() != 2 or w.getnchannels() != 1:
            raise SystemExit(f"{path}: 16-bit mono expected")
        rate = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    return x, rate


def energy_db(x: np.ndarray, rate: int) -> np.ndarray:
    n = int(rate * HOP)
    frames = x[: len(x) // n * n].reshape(-1, n)
    rms = np.sqrt((frames ** 2).mean(axis=1) + 1e-12)
    return 20 * np.log10(rms)


def silent_runs(quiet: np.ndarray) -> list[tuple[int, int]]:
    runs, start = [], None
    for i, q in enumerate(quiet):
        if q and start is None:
            start = i
        elif not q and start is not None:
            runs.append((start, i)); start = None
    if start is not None:
        runs.append((start, len(quiet)))
    return runs


def split(x: np.ndarray, rate: int, n: int) -> dict:
    db = energy_db(x, rate)
    loud = np.percentile(db, 95)
    floor = np.percentile(db, 5)
    threshold = max(floor + 12, loud - 38)
    quiet = db < threshold
    runs = silent_runs(quiet)
    voiced = np.flatnonzero(~quiet)
    if not len(voiced):
        raise SystemExit("no voice in the take")
    first, last = voiced[0], voiced[-1] + 1
    inner = [(a, b) for a, b in runs if a > first and b < last and (b - a) * HOP >= MIN_GAP]
    if len(inner) < n - 1:
        return {"ok": False, "why": f"{len(inner)} silences of {MIN_GAP} s or more for {n} lines", "threshold_db": float(threshold)}
    by_length = sorted(inner, key=lambda r: r[1] - r[0], reverse=True)
    cuts = sorted(by_length[: n - 1])
    shortest_cut = min((b - a) for a, b in cuts) * HOP if cuts else None
    longest_kept = (by_length[n - 1][1] - by_length[n - 1][0]) * HOP if len(by_length) >= n else 0.0
    # A cut must be clearly longer than any pause left inside a line, or the count could be a coincidence.
    clear = shortest_cut is None or shortest_cut >= 1.5 * longest_kept + 0.1
    bounds = [first] + [v for a, b in cuts for v in (a, b)] + [last]
    lines = []
    env_all = np.sqrt(np.convolve(x ** 2, np.ones(int(rate / FPS)) / int(rate / FPS), mode="same"))
    peak = float(np.percentile(env_all, 99)) or 1.0
    for i in range(n):
        s = max(0.0, bounds[2 * i] * HOP - PAD_IN)
        e = min(len(x) / rate, bounds[2 * i + 1] * HOP + PAD_OUT)
        step = rate / FPS
        env = [round(min(1.0, float(env_all[int(s * rate + k * step)]) / peak), 3) for k in range(int((e - s) * FPS))]
        lines.append({"start": round(s, 3), "end": round(e, 3), "envelope": env})
    return {"ok": bool(clear), "why": None if clear else f"shortest cut {shortest_cut:.2f} s, a pause of {longest_kept:.2f} s kept inside a line",
            "threshold_db": float(threshold), "shortest_cut": shortest_cut, "longest_kept": longest_kept, "lines": lines}


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("wav", type=Path)
    p.add_argument("--json", type=Path, help="the take's description (default: next to the wav)")
    p.add_argument("--out", type=Path, help="default: <wav without .wav>.split.json")
    a = p.parse_args()
    take = json.loads((a.json or a.wav.with_suffix(".json")).read_text(encoding="utf-8"))
    turns = take["turns"]
    x, rate = read(a.wav)
    result = split(x, rate, len(turns))
    if result.get("lines"):
        for t, line in zip(turns, result["lines"]):
            line["keys"] = t["keys"]
    out = a.out or a.wav.with_name(a.wav.stem + ".split.json")
    out.write_text(json.dumps({"take": a.wav.name, "sha256": take.get("sha256"), "seconds": len(x) / rate, **result}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    for line in result.get("lines", []):
        print(f"  {','.join(line['keys']):28} {line['start']:6.2f} → {line['end']:6.2f}  ({line['end'] - line['start']:.2f} s)")
    print(f"{out}: {'ok' if result['ok'] else 'REFUSED: ' + str(result['why'])}")
    sys.exit(0 if result["ok"] else 1)


if __name__ == "__main__":
    main()
