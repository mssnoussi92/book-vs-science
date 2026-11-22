// Episode + texts (+ voice takes, later) → the timeline the styles draw. In a draft there is no voice yet: every line
// lasts the time its words take at the language's measured rate, and the mouths come from the letters (the « text »
// engine). The draft is watermarked and never published; it shows the owner the three styles before any voice request.
import { words as wordsOf } from "../core/text.ts";
import type { EpisodeEntry, Repo } from "../rules/types.ts";
import type { Beat, Timeline, TimedAction, TimedLine, VisemeName } from "../schema/index.ts";

const FPS = 30;
const PAUSE = 0.3;            // seconds between two lines
const SILENT_HOOK = 2.4;      // a hook without voice: the time to read its first frame
const BADGE_DELAY = 0.6;
const SHARE = 2.2;

/** Arabic letters → mouth shapes (Rhubarb's names), for the draft and the « text » engine. */
const AR: Record<string, VisemeName> = {
  "ب": "A", "م": "A", "ف": "G", "و": "F", "ؤ": "F", "ا": "D", "آ": "D", "ى": "D", "أ": "D", "إ": "C",
  "ي": "B", "ئ": "B", "ل": "H", "ع": "C", "ح": "C", "خ": "C", "ه": "C", "ة": "C",
};
const LATIN: Record<string, VisemeName> = { b: "A", m: "A", p: "A", f: "G", v: "G", o: "E", u: "F", w: "F", a: "D", e: "C", i: "B", l: "H" };

export function lettersToVisemes(word: string): VisemeName[] {
  const out: VisemeName[] = [];
  for (const ch of word.normalize("NFC").replace(/[ً-ٰٟـ]/g, "")) {
    if (!/\p{L}/u.test(ch)) continue;
    out.push(AR[ch] ?? LATIN[ch.toLowerCase()] ?? (out.at(-1) === "B" ? "C" : "B"));
  }
  return out.length ? out : ["C"];
}

export type TimelineOptions = { lang: string; hook?: string; style: string; draft: true };

export function buildTimeline(repo: Repo, e: EpisodeEntry, opts: TimelineOptions): Timeline {
  const ep = e.episode;
  const lang = e.langs.get(opts.lang);
  const pack = repo.languages.get(opts.lang);
  if (!lang || !pack) throw new Error(`no texts or language pack for ${opts.lang}`);
  const text = (k: string) => lang.texts[k] ?? "";
  const secs = (t: string) => wordsOf(t).length / pack.wordsPerSecond;
  const fr = (s: number) => Math.round(s * FPS);

  let f = 0;
  const lines: TimedLine[] = [];
  const actions: TimedAction[] = [];
  const parts: Timeline["parts"] = [];
  const mouths: Record<string, { f: number; v: VisemeName }[]> = {};

  const speak = (key: string, part: TimedLine["part"], speaker: string, emotion: TimedLine["emotion"], extra: Partial<TimedLine> = {}) => {
    const t = text(key);
    const ws = wordsOf(t);
    const len = Math.max(fr(secs(t)), 12);
    const f0 = f;
    const per = len / Math.max(ws.length, 1);
    const words = ws.map((w, i) => ({ w, f0: Math.round(f0 + i * per), f1: Math.round(f0 + (i + 1) * per) }));
    const track = (mouths[speaker] ??= []);
    for (const wd of words) {
      const vs = lettersToVisemes(wd.w);
      const step = Math.max(2, Math.floor((wd.f1 - wd.f0) / vs.length));
      vs.forEach((v, i) => { const at = wd.f0 + i * step; if (at < wd.f1) track.push({ f: at, v }); });
      track.push({ f: Math.max(wd.f1 - 1, wd.f0 + 1), v: "X" });
    }
    track.push({ f: f0 + len, v: "X" });
    lines.push({ key, part, speaker, emotion, intensity: 0.5, f0, f1: f0 + len, text: t, words, ...extra });
    f = f0 + len + fr(PAUSE);
  };

  const play = (scope: string, part: TimedLine["part"], beats: readonly Beat[]) => {
    for (const b of beats) {
      if (b.kind === "line") speak(`${scope}.${b.id}`, part, b.speaker, b.emotion, { intensity: b.intensity, gesture: b.gesture, look: b.look });
      else {
        const f0 = f;
        const len = fr(b.seconds);
        actions.push({ id: b.id, part, scope, who: b.who, gesture: b.gesture, prop: b.prop, fx: b.fx ? { id: b.fx.id, params: b.fx.params } : undefined, emotion: b.emotion, look: b.look, f0, f1: f0 + len });
        f = f0 + len;
      }
    }
  };

  // 1. the hook
  const hook = ep.hooks.find((h) => h.id === (opts.hook ?? ep.hooks[0]!.id)) ?? ep.hooks[0]!;
  const h0 = f;
  if (hook.spokenBy === "none") f += fr(SILENT_HOOK);
  else speak(`hook.${hook.id}`, "hook", hook.spokenBy === "narrator" ? ep.cast.narrator : hook.spokenBy, hook.emotion);
  parts.push({ kind: "hook", scope: "hook", f0: h0, f1: f });
  const firstFrame = { f0: h0, f1: Math.max(f, h0 + fr(SILENT_HOOK)), text: text(`hook.${hook.id}.frame`) };

  // 2. the scenes
  for (const s of ep.scenes) {
    const s0 = f;
    play(s.id, "scene", s.beats);
    parts.push({ kind: "scene", scope: s.id, f0: s0, f1: f, setting: s.setting, shape: s.shape, outcome: s.outcome });
  }

  // 3. the book
  const b0 = f;
  play("book", "book", ep.book.beats);
  parts.push({ kind: "book", scope: "book", f0: b0, f1: f });
  const book = repo.books.get(ep.book.book);

  // 4. the verdict, its nuance said after it
  const v0 = f;
  play("verdict", "verdict", ep.verdict.beats);
  let nuance: Timeline["cards"]["nuance"];
  if (ep.verdict.nuance) {
    const n0 = f;
    speak("verdict.nuance", "verdict", ep.cast.narrator, "neutral");
    nuance = { f0: n0, f1: f, text: text("verdict.nuance") };
  }
  parts.push({ kind: "verdict", scope: "verdict", f0: v0, f1: f });
  const src = repo.sources.get(ep.verdict.onScreen);
  const ver = repo.verifications.get(ep.verdict.onScreen);
  const ref = src ? `${src.declared.firstAuthor} et al., ${src.declared.year}${ver?.found.venue ?? src.declared.venue ? ` · ${ver?.found.venue ?? src.declared.venue}` : ""}` : ep.verdict.onScreen;

  // 5. the takeaway, the orientation line, the share card
  const t0 = f;
  play("takeaway", "takeaway", ep.takeaway.beats);
  let orientation: Timeline["cards"]["orientation"];
  if (ep.takeaway.orientation) {
    const o0 = f;
    speak("takeaway.orientation", "takeaway", ep.cast.narrator, "warm");
    orientation = { f0: o0, f1: f, text: text("takeaway.orientation") };
  }
  let share: Timeline["cards"]["share"];
  if (lang.texts["share"]) { share = { f0: f, f1: f + fr(SHARE), text: text("share") }; f += fr(SHARE); }
  parts.push({ kind: "takeaway", scope: "takeaway", f0: t0, f1: f });

  for (const t of Object.values(mouths)) t.sort((a, b) => a.f - b.f);
  return {
    episode: ep.id, lang: opts.lang, dir: pack.dir, fps: FPS, frames: f, draft: true, hook: hook.id, audio: null,
    parts, lines, actions, mouths, mouthEngine: "text",
    cast: { narrator: ep.cast.narrator, characters: ep.cast.characters },
    cards: {
      firstFrame,
      book: { f0: b0, f1: v0, idea: text("book.card"), title: book?.titles[opts.lang.split("-")[0]!] ?? book?.titles[opts.lang] ?? book?.shortTitle ?? book?.title ?? "", author: book?.authorWritten[opts.lang] ?? book?.author ?? "" },
      study: { f0: v0 + fr(1.0), f1: t0, line: text("verdict.card"), ref, design: src?.design ?? "" },
      badge: { f: v0 + fr(BADGE_DELAY), badge: ep.verdict.badge, label: pack.labels.badge[ep.verdict.badge], certainty: pack.labels.certainty[ep.verdict.certainty] },
      ...(nuance ? { nuance } : {}),
      ...(orientation ? { orientation } : {}),
      ...(share ? { share } : {}),
    },
    variation: { style: opts.style, palette: 0, camera: "push", light: "day" },
  };
}
