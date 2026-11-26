// Episode + texts (+ voice takes, later) → the timeline the styles draw. In a draft there is no voice yet: every line
// lasts the time its words take at the language's measured rate, and the mouths come from the letters (the « text »
// engine). The draft is watermarked and never published; it shows the owner the three styles before any voice request.
import { words as wordsOf } from "../core/text.ts";
import { readingChunks } from "../video/state.ts";
import type { EpisodeEntry, Repo } from "../rules/types.ts";
import type { Action, Beat, SfxEvent, Timeline, TimedAction, TimedLine, VisemeName } from "../schema/index.ts";

const FPS = 30;
const PAUSE = 0.2;            // seconds between two lines (the takes' own breaths are kept inside each line)
const SILENT_HOOK = 2.4;      // a hook without voice: the time to read its first frame
const BADGE_DELAY = 0.6;
const SHARE = 2.2;
const NUANCE_HOLD = 2.6;      // a nuance written only: the time to read its card
const BREATH = 0.6;           // before a rewind: the first take sinks in (the owner's pilot review: too fast)

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

/** A line as measured in a take (py/bvs_audio/split.py): where it is in its take, its loudness at 30 frames a second. */
export type Measured = { take: string; start: number; end: number; envelope: number[] };

/** draft: watermarked (no take yet, or the voice not yet validated by the owner). takes: the measured lines, by text
 *  key; a line without one keeps its estimate (and the timeline says so: audio null). */
export type TimelineOptions = { lang: string; hook?: string; style: string; draft: boolean; takes?: Map<string, Measured> };

/** Mouths in a measured line: closed where the voice is quiet, whatever the letters say. */
const QUIET = 0.12;

export function buildTimeline(repo: Repo, e: EpisodeEntry, opts: TimelineOptions): Timeline {
  return build(repo, e, opts).timeline;
}

/** The timeline and, for each measured line, where its piece of take goes in the episode's audio track. */
export function build(repo: Repo, e: EpisodeEntry, opts: TimelineOptions): { timeline: Timeline; placed: { key: string; f0: number; m: Measured }[] } {
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

  /** Where each measured line sits in the episode (the audio track is assembled from these). */
  const placed: { key: string; f0: number; m: Measured }[] = [];

  const speak = (key: string, part: TimedLine["part"], speaker: string, emotion: TimedLine["emotion"], extra: Partial<TimedLine> = {}) => {
    const t = text(key);
    // Shown words keep their punctuation (« اقبله… » , « صح؟ »): subtitles are read, not only heard.
    const ws = t.normalize("NFC").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
    const m = opts.takes?.get(key);
    const len = m ? Math.max(fr(m.end - m.start), 6) : Math.max(fr(secs(t)), 12);
    const f0 = f;
    // Words spread by their letters over the line (Whisper's word times replace this once the alignment is in).
    const weight = ws.map((w) => Math.max(1, [...w].filter((c) => /\p{L}/u.test(c)).length));
    const total = weight.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    const words = ws.map((w, i) => {
      const a = Math.round(f0 + (acc / total) * len); acc += weight[i]!;
      return { w, f0: a, f1: Math.round(f0 + (acc / total) * len) };
    });
    const track = (mouths[speaker] ??= []);
    const quiet = (at: number) => !!m && (m.envelope[at - f0] ?? 0) < QUIET;
    // Said to oneself: the mouth stays closed (a thought is not spoken to the person next to you).
    if (extra.inner) words.length && track.push({ f: f0, v: "X" });
    else for (const wd of words) {
      const vs = lettersToVisemes(wd.w);
      const step = Math.max(2, Math.floor((wd.f1 - wd.f0) / vs.length));
      vs.forEach((v, i) => { const at = wd.f0 + i * step; if (at < wd.f1) track.push({ f: at, v: quiet(at) ? "X" : v }); });
      track.push({ f: Math.max(wd.f1 - 1, wd.f0 + 1), v: "X" });
    }
    track.push({ f: f0 + len, v: "X" });
    lines.push({ key, part, speaker, emotion, intensity: 0.5, f0, f1: f0 + len, text: t, words, ...extra });
    if (m) placed.push({ key, f0, m });
    f = f0 + len + fr(PAUSE);
  };

  const hook = ep.hooks.find((h) => h.id === (opts.hook ?? ep.hooks[0]!.id)) ?? ep.hooks[0]!;
  const timed = (b: Action, scope: string, part: TimedLine["part"], f0: number, f1: number): TimedAction => ({
    id: b.id, part, scope, who: b.who, gesture: b.gesture, prop: b.prop, fx: b.fx ? { id: b.fx.id, params: b.fx.params } : undefined,
    emotion: b.emotion, look: b.look, f0, f1, ...(b.caption ? { caption: text(`${scope}.${b.id}`) } : {}),
  });

  /** Plays the beats in order; returns the actions that hold beyond their seconds, with how. */
  const play = (scope: string, part: TimedLine["part"], beats: readonly Beat[]) => {
    const held: { a: TimedAction; how: "next" | "part" }[] = [];
    for (const b of beats) {
      if (b.kind === "line") {
        speak(`${scope}.${b.id}`, part, b.speaker, b.emotion, { intensity: b.intensity, gesture: b.gesture, look: b.look, ...(b.voice === "inner" ? { inner: true } : {}), ...(b.voice === "over" ? { over: true } : {}) });
        continue;
      }
      if (b.hooks && !b.hooks.includes(hook.id)) continue;        // an image only the versions with this hook have
      if (b.fx?.id === "rewind") f += fr(BREATH);                   // a breath before the scene is played again
      if (b.at) {                                                   // anchored on a word: does not move the clock
        const l = lines.find((x) => x.key === `${scope}.${b.at!.line}`);
        const w = l?.words[Math.min(b.at.word, l.words.length - 1)];
        const f0 = w?.f0 ?? f;
        const a = timed(b, scope, part, f0, f0 + fr(b.seconds));
        actions.push(a);
        if (b.holds !== "beat") held.push({ a, how: b.holds });
        continue;
      }
      const a = timed(b, scope, part, f, f + fr(b.seconds));
      actions.push(a);
      if (b.holds !== "beat") held.push({ a, how: b.holds });
      f = a.f1;
    }
    return held;
  };
  /** "part": to the end of the part; "next": to the same character's next effect in the part (or its end). */
  const holdTo = (held: { a: TimedAction; how: "next" | "part" }[], end: number) => {
    for (const { a, how } of held) {
      const next = how === "next" ? actions.find((x) => x !== a && x.scope === a.scope && x.who === a.who && x.fx && x.f0 > a.f0) : undefined;
      a.f1 = Math.max(a.f1, next ? next.f0 : end);
    }
  };

  // 1. the hook, its actions all from the first image
  const h0 = f;
  if (hook.spokenBy === "none") f += fr(SILENT_HOOK);
  else speak(`hook.${hook.id}`, "hook", hook.spokenBy === "narrator" ? ep.cast.narrator : hook.spokenBy, hook.emotion);
  for (const b of hook.beats) actions.push(timed(b, `hook.${hook.id}`, "hook", h0, f));
  parts.push({ kind: "hook", scope: "hook", f0: h0, f1: f });
  // The first frame's text is the only text on screen while it is up (the owner's pilot review: the same words twice,
  // in the card and in the subtitles). A silent hook keeps it for the hook; a spoken one, until its first reading
  // screen has been said; the subtitles take the rest (« لحد آخر الفيديو. »).
  const hookLine = lines.find((l) => l.part === "hook");
  const firstScreen = hookLine ? readingChunks(hookLine.words)[0] : undefined;
  const cardEnd = hookLine && firstScreen ? hookLine.words[firstScreen[1] - 1]!.f1 + fr(0.2) : f;
  const firstFrame = { f0: h0, f1: Math.max(hookLine ? cardEnd : f, h0 + fr(SILENT_HOOK)), text: text(`hook.${hook.id}.frame`) };

  // 2. the scenes
  for (const s of ep.scenes) {
    const s0 = f;
    holdTo(play(s.id, "scene", s.beats), f);
    parts.push({ kind: "scene", scope: s.id, f0: s0, f1: f, setting: s.setting, shape: s.shape, outcome: s.outcome });
  }

  // 3. the book
  const b0 = f;
  holdTo(play("book", "book", ep.book.beats), f);
  parts.push({ kind: "book", scope: "book", f0: b0, f1: f });
  const book = repo.books.get(ep.book.book);
  const bookTitle = book?.titles[opts.lang.split("-")[0]!] ?? book?.titles[opts.lang] ?? book?.shortTitle ?? book?.title ?? "";

  // 4. the verdict, its nuance after it (said, or held on its card)
  const v0 = f;
  const vHeld = play("verdict", "verdict", ep.verdict.beats);
  let nuance: Timeline["cards"]["nuance"];
  if (ep.verdict.nuance) {
    const n0 = f;
    if (ep.verdict.nuanceSpoken) speak("verdict.nuance", "verdict", ep.cast.narrator, "neutral");
    else f += fr(NUANCE_HOLD);
    nuance = { f0: n0, f1: f, text: text("verdict.nuance") };
  }
  holdTo(vHeld, f);
  parts.push({ kind: "verdict", scope: "verdict", f0: v0, f1: f });
  const src = repo.sources.get(ep.verdict.onScreen);
  const ver = repo.verifications.get(ep.verdict.onScreen);
  const ref = src ? `${src.declared.firstAuthor} et al., ${src.declared.year}${ver?.found.venue ?? src.declared.venue ? ` · ${ver?.found.venue ?? src.declared.venue}` : ""}` : ep.verdict.onScreen;

  // 5. the takeaway, the orientation line, the share card
  const t0 = f;
  const tHeld = play("takeaway", "takeaway", ep.takeaway.beats);
  let orientation: Timeline["cards"]["orientation"];
  if (ep.takeaway.orientation) {
    const o0 = f;
    speak("takeaway.orientation", "takeaway", ep.cast.narrator, "warm");
    orientation = { f0: o0, f1: f, text: text("takeaway.orientation") };
  }
  // what holds in the takeaway has faded out (10 frames) when the share card begins: one card at a time (owner's pilot
  // review)
  holdTo(tHeld, f - 10);
  let share: Timeline["cards"]["share"];
  if (lang.texts["share"]) { share = { f0: f, f1: f + fr(SHARE), text: text("share") }; f += fr(SHARE); }
  parts.push({ kind: "takeaway", scope: "takeaway", f0: t0, f1: f });

  // The study card comes with the first line that cites the study on screen (`cites`) and leaves at the first later line
  // that cites only others: its reference would sign another study's figure. Lines that cite nothing fall back on their
  // claims: the first line resting on a claim the study supports, until a line resting only on claims it does not
  // (money-happiness: Thomson's card under « في مصر » and the ceiling, which it does not test). Then the nuance card or
  // the takeaway ends it.
  const vLines = ep.verdict.beats.flatMap((b) => (b.kind === "line" ? [b] : []));
  const shown = ep.verdict.onScreen;
  const byCites = vLines.some((b) => b.cites?.length);
  const onScreenFor = new Set(ep.verdict.assessments.filter((a) => a.evidence.some((x) => x.source === shown && x.relation !== "contradicts")).map((a) => a.claim));
  const rests = (b: (typeof vLines)[number]) => (byCites ? !!b.cites?.includes(shown) : b.claims.some((c) => onScreenFor.has(c)));
  const leaves = (b: (typeof vLines)[number]) => (byCites ? !!b.cites?.length && !b.cites.includes(shown) : b.claims.length > 0 && !b.claims.some((c) => onScreenFor.has(c)));
  const from = vLines.findIndex(rests);
  const restsOn = from >= 0 ? vLines[from] : undefined;
  const studyFrom = (restsOn && lines.find((l) => l.key === `verdict.${restsOn.id}`)?.f0) ?? v0 + fr(1.0);
  const off = from >= 0 ? vLines.slice(from + 1).find(leaves) : undefined;
  const offAt = off ? lines.find((l) => l.key === `verdict.${off.id}`)?.f0 : undefined;
  const studyTo = offAt ?? (nuance ? nuance.f0 : t0);

  for (const t of Object.values(mouths)) t.sort((a, b) => a.f - b.f);
  // The takes of a replayed scene: from its first character beat (after the narrator's word) to the rewind, then from
  // the rewind's end to the scene's end; each labelled while it plays.
  const takes: NonNullable<Timeline["cards"]["takes"]> = [];
  for (const p of parts.filter((x) => x.kind === "scene" && x.shape === "replay-twice")) {
    const rewinds = actions.filter((a) => a.fx?.id === "rewind" && a.f0 >= p.f0 && a.f0 < p.f1);
    const firstPlay = Math.min(...[...actions, ...lines.map((l) => ({ ...l, who: l.speaker }))]
      .filter((x) => x.f0 >= p.f0 && x.f0 < p.f1 && !(("key" in x) && (x as TimedLine).over)).map((x) => x.f0));
    const bounds = [Number.isFinite(firstPlay) ? firstPlay : p.f0, ...rewinds.flatMap((r) => [r.f0, r.f1]), p.f1];
    for (let i = 0; i + 1 < bounds.length; i += 2) {
      const n = i / 2 + 1;
      takes.push({ f0: bounds[i]!, f1: bounds[i + 1]!, label: pack.labels.takes[n - 1] ?? String(n), n });
    }
  }

  // Sound effects (packages/pipeline/sfx.ts draws them): what happens is heard, the parts are marked.
  const sfx: SfxEvent[] = [];
  const firstSeen = new Set<string>();
  for (const a of actions) {
    if (a.prop?.state === "rejected" && !firstSeen.has(`${a.who}:${a.prop.id}`)) { firstSeen.add(`${a.who}:${a.prop.id}`); sfx.push({ f: a.f0, kind: "ping" }); }
    if (a.fx?.id === "rewind") sfx.push({ f: a.f0, kind: "rewind", frames: Math.max(1, a.f1 - a.f0) });
    if (a.fx?.id === "spiral" && a.part !== "hook") sfx.push({ f: a.f0, kind: "swirl" });
    if (a.fx?.id === "thought-bubble" || a.fx?.id === "two-way") sfx.push({ f: a.f0, kind: "pop" });
    if (a.fx?.id === "choices") sfx.push({ f: a.f0, kind: "whoosh" });
    if (a.fx?.id === "notification") sfx.push({ f: a.f0, kind: "ping" });
    if (a.fx?.id === "choices" && a.fx.params.countdown) for (let s = 3; s >= 1; s--) { const t = a.f1 - s * FPS; if (t >= a.f0) sfx.push({ f: t, kind: "tick" }); }
    if (a.prop?.state === "chosen" && !firstSeen.has(`${a.who}:chosen`)) { firstSeen.add(`${a.who}:chosen`); sfx.push({ f: a.f0, kind: "ding" }); }
  }
  for (const l of lines) if (l.inner) sfx.push({ f: l.f0, kind: "pop" });
  // Footsteps: a character who comes into a scene for a line (state.presence: ENTER frames before its first line of a take).
  for (const p of parts.filter((x) => x.kind === "scene")) {
    const scene = lines.filter((l) => l.f0 >= p.f0 && l.f0 < p.f1 && !l.over);
    const lead = scene[0]?.speaker;
    const segs = takes.filter((t) => t.f0 >= p.f0 && t.f1 <= p.f1);
    for (const seg of segs.length ? segs : [{ f0: p.f0, f1: p.f1 }]) {
      const seen = new Set<string>();
      for (const l of scene.filter((x) => x.f0 >= seg.f0 && x.f0 < seg.f1 && x.speaker !== lead)) {
        if (seen.has(l.speaker)) continue;
        seen.add(l.speaker);
        sfx.push({ f: Math.max(seg.f0, l.f0 - 24), kind: "steps", frames: 18 });
      }
    }
  }
  for (const p of parts.slice(1)) sfx.push({ f: p.f0, kind: "whoosh" });
  sfx.push({ f: v0 + fr(BADGE_DELAY), kind: "ding" });
  if (studyFrom > v0) sfx.push({ f: studyFrom, kind: "whoosh" });
  if (nuance) sfx.push({ f: nuance.f0, kind: "whoosh" });
  sfx.sort((a, b) => a.f - b.f);

  const timeline: Timeline = {
    episode: ep.id, lang: opts.lang, dir: pack.dir, fps: FPS, frames: f, draft: opts.draft, hook: hook.id, audio: null,
    parts, lines, actions, mouths, mouthEngine: placed.length ? "hybrid" : "text", sfx,
    cast: { narrator: ep.cast.narrator, characters: ep.cast.characters },
    cards: {
      firstFrame,
      // the pill waits for the first frame's text to go: one text at a time at the top
      ...(book ? { tease: { f0: firstFrame.f1, f1: b0, title: bookTitle } } : {}),
      book: { f0: b0, f1: v0, idea: text("book.card"), title: bookTitle, author: book?.authorWritten[opts.lang] ?? book?.author ?? "" },
      study: { f0: studyFrom, f1: studyTo, line: text("verdict.card"), ref, design: src?.design ?? "", ...(ep.verdict.applicability === "written" ? { applies: pack.applicabilityLine } : {}) },
      badge: { f: v0 + fr(BADGE_DELAY), badge: ep.verdict.badge, label: pack.labels.badge[ep.verdict.badge], certainty: pack.labels.certainty[ep.verdict.certainty] },
      ...(nuance ? { nuance } : {}),
      ...(takes.length ? { takes } : {}),
      ...(orientation ? { orientation } : {}),
      ...(share ? { share } : {}),
    },
    variation: { style: opts.style, palette: 0, camera: "push", light: "day" },
  };
  return { timeline, placed };
}
