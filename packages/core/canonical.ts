// Canonical JSON and its hash: keys sorted, strings in NFC, no undefined. Two files that say the same thing have the
// same hash, whatever the order of their keys or the way a phone typed an accent.
import { createHash } from "node:crypto";

export function canonical(value: unknown): string {
  return JSON.stringify(sort(value));
}

function sort(value: unknown): unknown {
  if (typeof value === "string") return value.normalize("NFC");
  if (Array.isArray(value)) return value.map(sort);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      const v = (value as Record<string, unknown>)[key];
      if (v !== undefined) out[key] = sort(v);
    }
    return out;
  }
  return value;
}

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export const hashOf = (value: unknown): string => sha256(canonical(value));

/** The short form shown to the owner in a question (« … (a1b2c3) »). */
export const short = (hash: string): string => hash.slice(0, 6);

/** The 8-digit hash a translation records for the source text it translates (LangFile.of). */
export const textTag = (text: string): string => sha256(text.normalize("NFC")).slice(0, 8);
