// `bvs voice take`: the voice requests of an episode, sent (in the `voice` workflow, which holds the key). Refuses
// before anything leaves: an approval missing or stale (sources, script of the language), a speaker without a voice,
// more requests than the day still allows. Each take is written with what was asked (turns, keys, voice, model), so
// that the alignment knows which line is which and a take is never asked for twice.
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { runRules } from "../rules/index.ts";
import type { EpisodeEntry, Repo } from "../rules/types.ts";
import { body, speak, wavSeconds } from "./gemini.ts";
import { DAILY_CAP, quotaDay, readLedger, record, usedOn } from "./ledger.ts";
import { planVoice, type VoiceMode, type VoiceRequest } from "./voice.ts";

export type TakeOptions = {
  lang: string;
  mode: VoiceMode;
  only?: string[];                       // request names (speaker ids) to send; default: all of the plan
  /** Only these text keys (new hooks, a corrected line): the other lines keep their checked takes. The take is
   *  named <speaker>.<tag> so that it never replaces the speaker's full take. */
  keys?: string[];
  tag?: string;
  voices?: Record<string, string>;       // casting: a candidate voice instead of the character's
  model: string;
  max: number;                           // most requests this run may send
  ledger: string;
  out: string;
  dry: boolean;                          // print the bodies, send nothing, write nothing
  /** The day's cap (3 while the key is shared). Above it only on the owner's word for that day (2026-11-22: « je
   *  t'autorise cette fois-ci », no production on quran-themes-demo). */
  cap?: number;
};

export async function takeVoice(repo: Repo, e: EpisodeEntry, o: TakeOptions): Promise<number> {
  // 1. the owner's two approvals (and nothing else blocking) for this episode and language
  const blocking = runRules(repo).filter((i) => (i.severity === "error" || i.gate) && i.where.startsWith(e.dir));
  const mine = blocking.filter((i) => !i.where.includes("/lang/") || i.where.includes(`/lang/${o.lang}.json`));
  const approvalsMissing = mine.filter((i) => i.rule === "approvals" && (/sources/.test(i.message) || i.message.includes(` ${o.lang} `)));
  const errors = mine.filter((i) => i.rule !== "approvals");
  if (approvalsMissing.length || errors.length) {
    for (const i of [...approvalsMissing, ...errors]) console.error(`  ${i.rule}: ${i.message}`);
    console.error("refusé : aucune requête de voix avant les validations du propriétaire et sans erreur");
    return 2;
  }

  // 2. the plan, the voices
  const plan = planVoice(e, o.lang, o.mode)
    .filter((r) => !o.only || o.only.includes(r.name))
    .map((r) => {
      if (!o.keys) return r;
      const turns = r.turns.filter((t) => t.keys.some((k) => o.keys!.includes(k)));
      return { ...r, name: `${r.name}.${o.tag ?? "part"}`, turns, words: turns.reduce((n, t) => n + t.text.split(/\s+/).length, 0) };
    })
    .filter((r) => r.turns.length > 0);
  if (!plan.length) { console.error(`aucune requête : ${o.only?.join(", ")} n'est pas dans le plan`); return 2; }
  const voices: Record<string, string> = {};
  for (const r of plan) for (const s of r.speakers) {
    const v = o.voices?.[s] ?? repo.characters.get(s)?.voices[o.lang]?.voice;
    if (!v) { console.error(`pas de voix pour ${s} en ${o.lang} : casting à faire (--voice ${s}=<Voix>)`); return 2; }
    voices[s] = v;
  }

  // 3. the quota: counted before anything is sent
  const ledger = readLedger(o.ledger);
  const day = quotaDay(new Date());
  const cap = o.cap ?? DAILY_CAP;
  const left = cap - usedOn(ledger, day);
  console.log(`${plan.length} requête(s) à ${o.model} ; jour ${day} (Pacifique) : ${usedOn(ledger, day)} déjà, plafond ${cap}${cap !== DAILY_CAP ? ` (au lieu de ${DAILY_CAP}, sur la parole du propriétaire)` : ""}, limite de ce run ${o.max}`);
  if (plan.length > o.max || plan.length > left) {
    console.error(`refusé : ${plan.length} requête(s) demandée(s), ${Math.min(o.max, left)} permise(s) aujourd'hui`);
    return 2;
  }
  if (o.dry) {
    for (const r of plan) console.log(JSON.stringify(body({ model: o.model, turns: r.turns, voices }), null, 2));
    return 0;
  }
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) { console.error("GEMINI_API_KEY est vide (secret du dépôt : Settings > Secrets and variables > Actions)"); return 2; }

  // 4. the takes, one request each; a refused one does not lose the others
  const dir = join(o.out, e.id, o.lang);
  mkdirSync(dir, { recursive: true });
  let failed = 0;
  for (const [i, r] of plan.entries()) {
    if (i > 0) await new Promise((ok) => setTimeout(ok, 35_000));      // the free tier allows few requests a minute
    try {
      const wav = await speak({ model: o.model, turns: r.turns, voices }, key, () =>
        record(o.ledger, ledger, { episode: e.id, lang: o.lang, request: r.name, voice: r.speakers.map((s) => `${s}=${voices[s]}`).join(","), model: o.model }));
      const hash = createHash("sha256").update(wav).digest("hex");
      writeFileSync(join(dir, `${r.name}.wav`), wav);
      writeFileSync(join(dir, `${r.name}.json`), JSON.stringify(describe(r, voices, o.model, hash, wavSeconds(wav)), null, 2) + "\n");
      console.log(`${dir}/${r.name}.wav : ${wavSeconds(wav).toFixed(1)} s (${r.speakers.map((s) => voices[s]).join(" + ")}, ${hash.slice(0, 8)})`);
    } catch (err) {
      failed++;
      console.error(`${r.name} : ${(err as Error).message}`);
    }
  }
  return failed ? 1 : 0;
}

const describe = (r: VoiceRequest, voices: Record<string, string>, model: string, sha256: string, seconds: number) => ({
  request: r.name, model, voices: Object.fromEntries(r.speakers.map((s) => [s, voices[s]])), at: new Date().toISOString(),
  sha256, seconds, turns: r.turns,
});
