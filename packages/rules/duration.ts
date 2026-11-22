// The length of every version of an episode (one per hook), estimated by the timeline builder at the language's
// measured speaking rate (languages/<code>/language.json, recalibrated on the takes). The pilot was written for 58-60 s
// at an estimated 2.6 words a second and lasted 67-69 s with its voice (2.1 measured): this rule says so before any
// voice request. Above the minute the format aims at: a warning; above 90 s: an error (the owner's other channels
// never publish longer than that).
import { buildTimeline } from "../pipeline/timeline.ts";
import type { Issue, Rule } from "./types.ts";
import { where } from "./walk.ts";

export const TARGET = 60;
export const LIMIT = 90;

export const duration: Rule = {
  id: "duration",
  describe: `Chaque version (un hook) dure au plus ${TARGET} s au débit mesuré de la langue (erreur au-delà de ${LIMIT} s).`,
  check(repo) {
    const out: Issue[] = [];
    for (const e of repo.episodes) {
      for (const code of e.langs.keys()) {
        if (!repo.languages.has(code)) continue;
        let longest = { s: 0, hook: "" };
        for (const h of e.episode.hooks) {
          let tl;
          try { tl = buildTimeline(repo, e, { lang: code, hook: h.id, style: "cartoon", draft: true }); } catch { continue; }
          const s = tl.frames / tl.fps;
          if (s > longest.s) longest = { s, hook: h.id };
        }
        // An error only for a language that is voiced (every speaker of the cast has a voice in it): a translation
        // nobody records yet is only warned about (the English of the pilot, at an estimated rate).
        const speakers = [e.episode.cast.narrator, ...e.episode.cast.characters];
        const voiced = speakers.every((s) => repo.characters.get(s)?.voices[code]);
        if (longest.s > LIMIT) out.push({ rule: "duration", severity: voiced ? "error" : "warn", where: where(e.dir, "hooks"), message: `${code} : ${longest.s.toFixed(0)} s avec ${longest.hook} (${LIMIT} s au plus)${voiced ? "" : " — langue sans voix pour l'instant"}` });
        // A version the owner already validated as a video kept its length by his choice (the pilot, 78 s): no more
        // « shorten before the voice ».
        else if (longest.s > TARGET && !e.approvals.video?.[code]) out.push({ rule: "duration", severity: "warn", where: where(e.dir, "hooks"), message: `${code} : ${longest.s.toFixed(0)} s estimées avec ${longest.hook} (${TARGET} s visées) : raccourcir avant la voix` });
      }
    }
    return out;
  },
};
