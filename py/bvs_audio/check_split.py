#!/usr/bin/env python3
"""Check a split that its gaps could not settle (py/bvs_audio/split.py refused it): every piece is transcribed by Whisper
and compared with the line it should be and with its neighbours. Accepted when every piece is closer to its own line
than to any neighbour, and close enough (>= MIN_OWN). The transcript is only compared, never shown nor kept.

  uv run --with faster-whisper==1.1.1 --with numpy python3 py/bvs_audio/check_split.py build/takes/<ep>/<lang>/<req>.wav \
      --texts content/episodes/<ep>/lang/<lang>.json [--model small]
"""
from __future__ import annotations

import argparse
import difflib
import json
import re
import sys
import unicodedata
import wave
from pathlib import Path

import numpy as np

MIN_OWN = 0.45


def fold(text: str) -> str:
    """Arabic folded for comparison: no diacritics, one alef, ya and alef maqsura together, ta marbuta as ha."""
    t = unicodedata.normalize("NFKC", text)
    t = re.sub(r"[ً-ٰٟـ]", "", t)
    t = re.sub(r"[إأآٱ]", "ا", t).replace("ى", "ي").replace("ة", "ه").replace("ؤ", "و").replace("ئ", "ي")
    t = re.sub(r"[^\w\s]", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def similarity(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, fold(a), fold(b)).ratio()


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("wav", type=Path)
    p.add_argument("--texts", type=Path, required=True, help="the episode's language file")
    p.add_argument("--model", default="small")
    p.add_argument("--lang", default="ar")
    a = p.parse_args()
    split_path = a.wav.with_name(a.wav.stem + ".split.json")
    sp = json.loads(split_path.read_text(encoding="utf-8"))
    texts = json.loads(a.texts.read_text(encoding="utf-8"))["texts"]
    with wave.open(str(a.wav), "rb") as w:
        rate = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    # Whisper wants 16 kHz: a plain resampling by interpolation is enough to compare words.
    x16 = np.interp(np.arange(0, len(x) * 16000 / rate) * rate / 16000, np.arange(len(x)), x).astype(np.float32)

    from faster_whisper import WhisperModel
    model = WhisperModel(a.model, device="cpu", compute_type="int8")
    expected = [texts[line["keys"][0]] for line in sp["lines"]]
    scores, ok = [], True
    for i, line in enumerate(sp["lines"]):
        piece = x16[int(line["start"] * 16000): int(line["end"] * 16000)]
        segments, _ = model.transcribe(piece, language=a.lang, beam_size=5, vad_filter=False, condition_on_previous_text=False)
        heard = " ".join(s.text for s in segments)
        own = similarity(heard, expected[i])
        near = [similarity(heard, expected[j]) for j in (i - 1, i + 1) if 0 <= j < len(expected)]
        good = own >= MIN_OWN and all(own > n for n in near)
        ok &= good
        scores.append({"keys": line["keys"], "own": round(own, 2), "neighbours": [round(n, 2) for n in near], "ok": good})
        print(f"  {','.join(line['keys']):28} own {own:.2f}  neighbours {', '.join(f'{n:.2f}' for n in near):12} {'ok' if good else 'NO'}")
    sp["verified"] = {"by": f"whisper-{a.model}", "min_own": MIN_OWN, "scores": scores, "ok": ok}
    if ok and not sp["ok"]:
        sp["ok"] = True
        sp["why"] = f"gaps not clear ({sp['why']}), every piece recognised as its own line by whisper-{a.model}"
    split_path.write_text(json.dumps(sp, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{split_path}: {'ok' if ok else 'REFUSED by the transcript check'}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
