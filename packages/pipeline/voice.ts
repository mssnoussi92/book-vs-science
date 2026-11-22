// The voice requests of an episode, before any is sent: who says what, in how many requests, each line addressed by its
// text key (docs/conception.md §4.5). Nothing here calls the API; the plan is what the owner and the quota see first.
//
// Two modes. "single" (the default since 2026-11-22): one request per speaker, because Gemini 3.8 Flash TTS mixes the
// two voices of a two-speaker request at speaker changes since about 2026-11-05 (Google AI forum, threads 198552 and
// 199715, no fix announced). "dialogue": the characters of the scene in one two-speaker request, the narrator in another.
// A line said twice with the same words by the same speaker is asked once (Nour's « مالك؟ »: the same question both
// times, only Karim's answer changes).
import type { EpisodeEntry, Repo } from "../rules/types.ts";
import type { Beat } from "../schema/index.ts";
import { words } from "../core/text.ts";

export type VoiceMode = "single" | "dialogue";
export type Turn = { keys: string[]; speaker: string; text: string; style: string };
export type VoiceRequest = { name: string; speakers: string[]; turns: Turn[]; words: number };

/** How each language asks for its accent: written once, in English (the model reads directions in English best). */
const ACCENT: Record<string, string> = {
  "ar-EG": "Egyptian Arabic, Cairo accent, everyday spoken Egyptian (never Modern Standard Arabic)",
  en: "natural conversational English",
};

export function planVoice(e: EpisodeEntry, lang: string, mode: VoiceMode = "single"): VoiceRequest[] {
  const ep = e.episode;
  const texts = e.langs.get(lang)?.texts;
  if (!texts) throw new Error(`no texts in ${lang}`);
  const accent = ACCENT[lang] ?? "natural speech";
  const turns: Turn[] = [];
  const add = (key: string, speaker: string, emotion: string, intensity: number, delivery?: string, inner = false) => {
    const text = texts[key];
    if (!text) throw new Error(`no text for ${key}`);
    const same = turns.find((t) => t.speaker === speaker && t.text === text);
    if (same) { same.keys.push(key); return; }
    const how = [`${accent}`, `${emotion}${intensity >= 0.7 ? ", strongly" : intensity <= 0.3 ? ", softly" : ""}`, delivery, inner ? "said to oneself, under the breath" : ""];
    turns.push({ keys: [key], speaker, text, style: how.filter(Boolean).join("; ") });
  };
  const narrator = ep.cast.narrator;
  for (const h of ep.hooks) if (h.spokenBy !== "none") add(`hook.${h.id}`, h.spokenBy === "narrator" ? narrator : h.spokenBy, h.emotion, 0.5);
  const lines = (scope: string, beats: readonly Beat[]) => {
    for (const b of beats) if (b.kind === "line") add(`${scope}.${b.id}`, b.speaker, b.emotion, b.intensity, b.delivery, b.voice === "inner");
  };
  for (const s of ep.scenes) lines(s.id, s.beats);
  lines("book", ep.book.beats);
  lines("verdict", ep.verdict.beats);
  if (ep.verdict.nuance && ep.verdict.nuanceSpoken) add("verdict.nuance", narrator, "neutral", 0.5);
  lines("takeaway", ep.takeaway.beats);
  if (ep.takeaway.orientation) add("takeaway.orientation", narrator, "warm", 0.4, "calm and caring, slower");

  const groups: string[][] = mode === "single"
    ? [...new Set(turns.map((t) => t.speaker))].map((s) => [s])
    : [ep.cast.characters, [narrator]];
  return groups
    .map((speakers) => {
      const ts = turns.filter((t) => speakers.includes(t.speaker));
      return { name: speakers.join("+"), speakers, turns: ts, words: ts.reduce((n, t) => n + words(t.text).length, 0) };
    })
    .filter((r) => r.turns.length > 0);
}

/** The plan as the owner reads it: one block per request. */
export function planPage(repo: Repo, e: EpisodeEntry, lang: string, mode: VoiceMode): string {
  const name = (id: string) => repo.characters.get(id)?.names[lang] ?? id;
  const reqs = planVoice(e, lang, mode);
  const out = [`# Voix de « ${e.id} » · ${lang} · ${reqs.length} requête(s) (${mode === "single" ? "une voix par requête" : "dialogue à deux voix"})`, ""];
  reqs.forEach((r, i) => {
    out.push(`## Requête ${i + 1} : ${r.speakers.map(name).join(" + ")} (${r.turns.length} répliques, ${r.words} mots)`, "");
    for (const t of r.turns) out.push(`- ${t.keys.join(", ")} · ${name(t.speaker)} : ${t.text}`, `  - *${t.style}*`);
    out.push("");
  });
  return out.join("\n");
}
