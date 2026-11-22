// Subtitles are cut for reading: at sentence and clause ends, never more than 7 words a screen, never a lone last word.
import assert from "node:assert/strict";
import { test } from "node:test";
import { readingChunks } from "./state.ts";

const w = (s: string) => s.split(" ").map((x) => ({ w: x }));

test("a line is cut after its punctuation, the punctuation kept with its word", () => {
  const words = w("الكتاب بيقول: لما تلوم نفسك على زعلك بيكبر، ولما تطرده بيرجع. الحل؟ اقبله من غير لوم.");
  const cuts = readingChunks(words).map(([a, b]) => words.slice(a, b).map((x) => x.w).join(" "));
  assert.deepEqual(cuts, ["الكتاب بيقول:", "لما تلوم نفسك على زعلك بيكبر،", "ولما تطرده بيرجع.", "الحل؟ اقبله من غير لوم."]);
});

test("never more than 7 words a screen, and a lone last word joins the screen before", () => {
  const words = w("واحد اتنين تلاتة اربعة خمسة ستة سبعة تمانية");
  const cuts = readingChunks(words);
  assert.ok(cuts.every(([a, b]) => b - a <= 8));
  assert.deepEqual(cuts.at(-1), [0, 8]);
  const long = w("واحد اتنين تلاتة اربعة خمسة ستة سبعة تمانية تسعة عشرة");
  assert.ok(readingChunks(long).every(([a, b]) => b - a <= 7));
});

test("a one-word line is one screen", () => {
  assert.deepEqual(readingChunks(w("مالك؟")), [[0, 1]]);
});

import { presence } from "./state.ts";
import type { Timeline } from "../schema/timeline.ts";

test("presence: the first speaker all along, the other one comes in for its line and is gone after the rewind", () => {
  const line = (speaker: string, f0: number, f1: number) => ({ key: `s1.${f0}`, part: "scene", speaker, emotion: "neutral", intensity: 0.5, f0, f1, text: "x", words: [] });
  const tl = {
    parts: [{ kind: "hook", scope: "hook", f0: 0, f1: 10 }, { kind: "scene", scope: "s1", f0: 10, f1: 300 }, { kind: "book", scope: "book", f0: 300, f1: 400 }],
    lines: [line("karim", 12, 40), line("nour", 100, 120), line("karim", 130, 150), line("nour", 220, 240)],
    actions: [{ id: "a4", part: "scene", scope: "s1", who: "karim", fx: { id: "rewind", params: {} }, f0: 160, f1: 180 }],
  } as unknown as Timeline;
  assert.equal(presence(tl, "karim", 50), 1);
  assert.equal(presence(tl, "nour", 50), 0);            // not yet: Karim alone with his thoughts
  assert.equal(presence(tl, "nour", 100), 1);           // in place for her line
  assert.ok(presence(tl, "nour", 84) > 0 && presence(tl, "nour", 84) < 1);   // walking in
  assert.equal(presence(tl, "nour", 170), 0);           // the scene played again: gone
  assert.equal(presence(tl, "nour", 230), 1);
  assert.equal(presence(tl, "nour", 350), 1);           // outside the scene, everybody
});

test("a closing quote alone does not end a screen: the question stays whole", () => {
  const words = w("و«بطّل زعل» دي؟ غالبًا ما بتقلّلش الزعل، والفكرة اللي بتطردها بترجعلك أكتر بعدين.");
  const cuts = readingChunks(words).map(([a, b]) => words.slice(a, b).map((x) => x.w).join(" "));
  assert.equal(cuts[0], "و«بطّل زعل» دي؟");
});
