// The texts of one episode in one language (content/episodes/<id>/lang/<code>.json), by key (requiredKeys).
// A translation records, for each key, the short hash of the source-language text it translates (`of`): when the
// source changes, the translation is stale, visibly, and only that language's render is blocked.
import { z } from "zod";
import { LangCode } from "./common.ts";

export const TextKey = z.string().regex(/^[a-z0-9]+(\.[a-z0-9-]+)*$/);

export const LangFile = z.strictObject({
  $schema: z.string().optional(),
  lang: LangCode,
  texts: z.record(TextKey, z.string().min(1).max(400)),
  /** Translations only: key → first 8 hex digits of sha256 of the source text. */
  of: z.record(TextKey, z.string().regex(/^[0-9a-f]{8}$/)).optional(),
}).meta({ id: "LangFile" });

export type LangFile = z.infer<typeof LangFile>;
