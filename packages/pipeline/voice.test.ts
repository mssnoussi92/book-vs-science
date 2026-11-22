// The voice plan, the request body and the quota day: what decides how many requests leave and what they say.
import assert from "node:assert/strict";
import { test } from "node:test";
import { join } from "node:path";
import { loadRepo } from "../rules/index.ts";
import { body } from "./gemini.ts";
import { quotaDay, usedOn } from "./ledger.ts";
import { planVoice } from "./voice.ts";

const repo = loadRepo(join(import.meta.dirname, "..", "rules", "fixtures", "repo"));
const e = repo.episodes[0]!;

test("single mode: one request per speaker, every spoken key asked once", () => {
  const plan = planVoice(e, e.episode.sourceLang, "single");
  for (const r of plan) assert.equal(r.speakers.length, 1);
  const keys = plan.flatMap((r) => r.turns.flatMap((t) => t.keys));
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.some((k) => k.startsWith("verdict.")));
});

test("dialogue mode: the characters together, the narrator apart", () => {
  const plan = planVoice(e, e.episode.sourceLang, "dialogue");
  assert.ok(plan.length <= 2);
  assert.ok(plan.every((r) => r.speakers.length <= 2));
});

test("a line said twice with the same words by the same speaker is one turn with two keys", () => {
  const copy = structuredClone(e);
  const texts = copy.langs.get(copy.episode.sourceLang)!.texts;
  // the narrator's line of the book and of the verdict, made identical
  const book = copy.episode.book.beats.find((b) => b.kind === "line" && b.speaker === copy.episode.cast.narrator)!;
  const verdict = copy.episode.verdict.beats.find((b) => b.kind === "line" && b.speaker === copy.episode.cast.narrator)!;
  texts[`verdict.${verdict.id}`] = texts[`book.${book.id}`]!;
  const turn = planVoice(copy, copy.episode.sourceLang, "single").flatMap((r) => r.turns).find((t) => t.keys.includes(`book.${book.id}`))!;
  assert.deepEqual(turn.keys, [`book.${book.id}`, `verdict.${verdict.id}`]);
});

test("the body: a long pause after every turn but the last, the voice list for one speaker, speakers for two", () => {
  const one = body({ model: "m", voices: { a: "Puck" }, turns: [{ keys: ["k1"], speaker: "a", text: "x", style: "s" }, { keys: ["k2"], speaker: "a", text: "y", style: "s" }] }) as any;
  assert.equal(one.input[0].content[0].text, "x <long pause>");
  assert.equal(one.input[0].content[1].text, "y");
  assert.deepEqual(one.generation_config.speech_config, [{ voice: "Puck" }]);
  const two = body({ model: "m", voices: { a: "Puck", b: "Kore" }, turns: [{ keys: ["k1"], speaker: "a", text: "x", style: "s" }, { keys: ["k2"], speaker: "b", text: "y", style: "s" }] }) as any;
  assert.deepEqual(two.generation_config.speech_config.speakers.map((s: any) => s.voice), ["Puck", "Kore"]);
  assert.equal(two.input[0].content[1].annotations[0].speaker, "b");
  assert.throws(() => body({ model: "m", voices: {}, turns: [{ keys: ["k"], speaker: "a", text: "x", style: "s" }] }));
});

test("the quota day is Los Angeles's date (the free tier resets at midnight Pacific)", () => {
  assert.equal(quotaDay(new Date("2026-11-23T07:30:00Z")), "2026-11-22");   // 23:30 the day before in LA
  assert.equal(quotaDay(new Date("2026-11-23T08:30:00Z")), "2026-11-23");
  assert.equal(usedOn({ entries: [{ at: "", day: "2026-11-22", episode: "e", lang: "ar-EG", request: "r", voice: "v", model: "m" }] }, "2026-11-22"), 1);
});
