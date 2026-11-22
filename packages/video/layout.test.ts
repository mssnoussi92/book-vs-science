// Every box the shell draws stays inside the platforms' safe area, in every format (docs/conception.md §4.8).
import assert from "node:assert/strict";
import { test } from "node:test";
import { insideSafe, ZONES, type Aspect } from "./layout.ts";

for (const aspect of Object.keys(ZONES) as Aspect[]) {
  test(`every zone of the shell is inside the safe area (${aspect})`, () => {
    // The draft label is the exception: above the safe area on purpose (it must not hide the first frame's text, and a
    // draft is never published).
    for (const [name, box] of Object.entries(ZONES[aspect])) if (name !== "draft") assert.ok(insideSafe(aspect, box), `${aspect} ${name} ${JSON.stringify(box)}`);
  });
}
test("the badge is never in the lower half of a 9:16 frame (under the Reels caption)", () => {
  const b = ZONES["9x16"].badge;
  assert.ok(b.y + b.h <= 960);
});
test("the subtitles are centred and at most 800 px wide (the buttons on the right)", () => {
  const s = ZONES["9x16"].subtitles;
  assert.ok(s.w <= 800);
  assert.ok(Math.abs(s.x + s.w / 2 - (90 + (1080 - 160 - 90) / 2)) < 30);
});
