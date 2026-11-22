// The voice quota's ledger (voice-ledger.json on the `state` branch): every request is written down BEFORE it is sent,
// so that a run that dies after sending still counts. The free tier's day starts at midnight Pacific time. While the
// key is shared with quran-themes-demo, this channel takes 3 requests a day at most (CLAUDE.md); the ledger cannot see
// what the other repository spends, so the cap is ours, not the key's.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export type Entry = { at: string; day: string; episode: string; lang: string; request: string; voice: string; model: string };
export type Ledger = { entries: Entry[] };

export const DAILY_CAP = 3;

/** The quota day of a moment: its date in Los Angeles (Google's free-tier counters reset at midnight Pacific). */
export const quotaDay = (d: Date): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

export function readLedger(path: string): Ledger {
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Ledger) : { entries: [] };
}

export const usedOn = (l: Ledger, day: string) => l.entries.filter((e) => e.day === day).length;

/** Adds one attempt and writes the file at once (before the request leaves). */
export function record(path: string, l: Ledger, e: Omit<Entry, "at" | "day">, now = new Date()): void {
  l.entries.push({ at: now.toISOString(), day: quotaDay(now), ...e });
  writeFileSync(path, JSON.stringify(l, null, 2) + "\n");
}
