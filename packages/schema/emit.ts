// Writes the JSON Schemas read by tools in other languages (Python) and by editors ($schema).
// Files written by hand are emitted in "input" mode (a field with a default stays optional); files produced by the
// pipeline would be emitted in "output" mode. `--check` fails when a committed schema no longer matches zod (CI).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Approvals, Book, CharacterDef, Episode, LangFile, LanguagePack, Source, Verification } from "./index.ts";

const OUT = join(import.meta.dirname, "..", "..", "schemas");
const SCHEMAS: Record<string, [z.ZodType, "input" | "output"]> = {
  "episode.schema.json": [Episode, "input"],
  "lang.schema.json": [LangFile, "input"],
  "source.schema.json": [Source, "input"],
  "book.schema.json": [Book, "input"],
  "approvals.schema.json": [Approvals, "input"],
  "verification.schema.json": [Verification, "output"],
  "language.schema.json": [LanguagePack, "input"],
  "character.schema.json": [CharacterDef, "input"],
};

const check = process.argv.includes("--check");
mkdirSync(OUT, { recursive: true });
let stale = 0;
for (const [file, [schema, io]] of Object.entries(SCHEMAS)) {
  const text = JSON.stringify(z.toJSONSchema(schema, { io, target: "draft-2020-12" }), null, 2) + "\n";
  const path = join(OUT, file);
  if (check) {
    let current = "";
    try { current = readFileSync(path, "utf8"); } catch { /* missing */ }
    if (current !== text) { console.error(`stale: schemas/${file} (run npm run schemas)`); stale++; }
  } else {
    writeFileSync(path, text);
    console.log(`schemas/${file}`);
  }
}
if (stale) process.exit(1);
