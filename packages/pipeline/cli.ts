#!/usr/bin/env node
// bvs: the command line of the pipeline. Every step is a command; every command is safe to run twice.
//
//   bvs check [--gate]                       rules on all the content; --gate also fails on what blocks the voice/render
//   bvs status [<episode>]                   where each episode stands: gates, approvals and their short hashes
//   bvs approve <episode> sources --words "…" [--via <url>]
//   bvs approve <episode> script --lang ar-EG --words "…" [--via <url>]
//   bvs review <episode>                     writes review/<id>/sources.md and script.<lang>.md (the owner's pages)
//   bvs voice plan <episode> [--lang ar-EG] [--mode single|dialogue]
//                                            the voice requests (who says what), before any is sent
//   bvs voice take <episode> [--lang] [--only karim] [--voice karim=Achird] [--max 3] [--ledger f] [--out d] [--dry]
//                                            sends them (workflow voice, key in the environment); --dry prints the bodies
//   bvs timeline <episode> --draft [--lang ar-EG] [--hook h1]
//                                            the timeline the styles draw (draft: estimated durations, no voice)
//   bvs sources verify [<episode>|--all] [--live] [--write]
//                                            checks each cited DOI (Crossref, OpenAlex, Europe PMC); --write saves .verify.json
//                                            records the OWNER's approval, only after he gave it (CLAUDE.md)
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { short } from "../core/canonical.ts";
import { scriptHash, sourcesHash } from "../core/fingerprint.ts";
import { BY_EYE, loadRepo, runRules, type Issue } from "../rules/index.ts";
import { Approvals } from "../schema/index.ts";

const ROOT = resolve(import.meta.dirname, "..", "..");
const [cmd = "help", ...args] = process.argv.slice(2);
const flag = (name: string) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const has = (name: string) => args.includes(`--${name}`);

function print(issues: Issue[]) {
  const blocking = issues.filter((i) => i.severity === "error" && !i.gate);
  const gates = issues.filter((i) => i.gate);
  const warns = issues.filter((i) => i.severity === "warn");
  const line = (i: Issue) => `  ${i.rule.padEnd(16)} ${i.where}\n${" ".repeat(19)}${i.message}`;
  if (blocking.length) console.log(`Erreurs (${blocking.length})\n${blocking.map(line).join("\n")}\n`);
  if (gates.length) console.log(`Bloque la voix et le rendu (${gates.length})\n${gates.map(line).join("\n")}\n`);
  if (warns.length) console.log(`Avertissements (${warns.length})\n${warns.map(line).join("\n")}\n`);
  console.log(`À vérifier à l'œil :\n${BY_EYE.map((b) => `  - ${b}`).join("\n")}`);
  return { blocking, gates };
}

switch (cmd) {
  case "check": {
    const { blocking, gates } = print(runRules(loadRepo(ROOT)));
    if (blocking.length || (has("gate") && gates.length)) process.exit(1);
    break;
  }
  case "status": {
    const repo = loadRepo(ROOT);
    const issues = runRules(repo);
    for (const e of repo.episodes.filter((x) => !args[0] || x.id === args[0])) {
      const mine = issues.filter((i) => i.where.startsWith(e.dir));
      console.log(`${e.id}  (${e.episode.verdict.badge}, ${e.episode.verdict.certainty})`);
      console.log(`  sources : ${short(sourcesHash(e.episode, repo.sources, repo.verifications))}  ${e.approvals.sources ? `validées ${e.approvals.sources.on} (${short(e.approvals.sources.hash)})` : "à valider"}`);
      for (const [code, lang] of e.langs) {
        const a = e.approvals.script[code];
        console.log(`  script ${code} : ${short(scriptHash(e.episode, lang))}  ${a ? `validé ${a.on} (${short(a.hash)})` : "à valider"}`);
      }
      console.log(`  erreurs ${mine.filter((i) => i.severity === "error" && !i.gate).length}, portes ${mine.filter((i) => i.gate).length}`);
    }
    break;
  }
  case "approve": {
    const [id, what] = args;
    const words = flag("words");
    if (!id || (what !== "sources" && what !== "script") || !words) {
      console.error('usage: bvs approve <episode> sources|script [--lang ar-EG] --words "<ses mots>" [--via <url>]');
      process.exit(2);
    }
    const repo = loadRepo(ROOT);
    const e = repo.episodes.find((x) => x.id === id);
    if (!e) { console.error(`épisode inconnu : ${id}`); process.exit(2); }
    const path = join(ROOT, e.dir, "approvals.json");
    const current = Approvals.parse(existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {});
    const on = new Date().toISOString().slice(0, 10);
    const via = flag("via") ?? "conversation";
    if (what === "sources") {
      const hash = sourcesHash(e.episode, repo.sources, repo.verifications);
      current.sources = { on, words, via, hash };
      console.log(`sources de ${id} validées : ${short(hash)}`);
    } else {
      const code = flag("lang") ?? e.episode.sourceLang;
      const lang = e.langs.get(code);
      if (!lang) { console.error(`pas de textes ${code}`); process.exit(2); }
      const hash = scriptHash(e.episode, lang);
      current.script[code] = { on, words, via, hash };
      console.log(`script ${code} de ${id} validé : ${short(hash)}`);
    }
    writeFileSync(path, JSON.stringify({ $schema: "../../../schemas/approvals.schema.json", ...Approvals.parse(current) }, null, 2) + "\n");
    break;
  }
  case "review": {
    const repo = loadRepo(ROOT);
    const e = repo.episodes.find((x) => x.id === args[0]);
    if (!e) { console.error(`épisode inconnu : ${args[0] ?? "(aucun)"}`); process.exit(2); }
    const { writeReview } = await import("./review.ts");
    for (const p of writeReview(repo, e)) console.log(p.slice(ROOT.length + 1));
    break;
  }
  case "voice": {
    // bvs voice plan <episode> [--lang ar-EG] [--mode single|dialogue] : the requests, before any is sent
    // bvs voice take <episode> [--lang] [--only karim,nour] [--voice karim=Achird,...] [--max 3] [--ledger f] [--out d] [--dry]
    if (args[0] !== "plan" && args[0] !== "take") { console.error("bvs voice plan|take <épisode> [--lang] [--mode single|dialogue] …"); process.exit(2); }
    const repo = loadRepo(ROOT);
    const e = repo.episodes.find((x) => x.id === args[1]);
    if (!e) { console.error(`épisode inconnu : ${args[1] ?? "(aucun)"}`); process.exit(2); }
    const mode = flag("mode") === "dialogue" ? "dialogue" : "single";
    const lang = flag("lang") ?? e.episode.sourceLang;
    if (args[0] === "plan") {
      const { planPage } = await import("./voice.ts");
      console.log(planPage(repo, e, lang, mode));
      break;
    }
    const { takeVoice } = await import("./take.ts");
    const list = (v?: string) => (v ? v.split(",").map((x) => x.trim()).filter(Boolean) : undefined);
    const voices = list(flag("voice"))?.map((x) => x.split("=") as [string, string]);
    if (voices?.some(([s, v]) => !s || !/^[A-Z][a-z]+$/.test(v ?? ""))) { console.error("--voice veut personnage=Voix, séparés par des virgules"); process.exit(2); }
    process.exit(await takeVoice(repo, e, {
      lang, mode, only: list(flag("only")), voices: voices ? Object.fromEntries(voices) : undefined,
      model: flag("model") ?? "gemini-3.8-flash-tts", max: Number(flag("max") ?? 3),
      ledger: flag("ledger") ?? join(ROOT, "build", "voice-ledger.json"), out: flag("out") ?? join(ROOT, "build", "takes"), dry: has("dry"),
      cap: flag("cap") ? Number(flag("cap")) : undefined,
    }));
  }
  case "timeline": {
    // bvs timeline <episode> [--lang ar-EG] [--hook h1] [--style cartoon] (--draft | --takes build/takes)
    // --draft: estimated durations, no voice. --takes: the lines measured in the takes (py/bvs_audio/split.py), and
    // the episode's voice track assembled from them at -16 LUFS. Watermarked until the owner validates the voice.
    const repo = loadRepo(ROOT);
    const e = repo.episodes.find((x) => x.id === args[0]);
    if (!e) { console.error(`épisode inconnu : ${args[0] ?? "(aucun)"}`); process.exit(2); }
    const takesDir = flag("takes");
    if (!has("draft") && !takesDir) { console.error("--draft (sans voix) ou --takes <dossier des prises>"); process.exit(2); }
    const { build } = await import("./timeline.ts");
    const { Timeline } = await import("../schema/index.ts");
    const { mkdirSync, readdirSync } = await import("node:fs");
    const code = flag("lang") ?? e.episode.sourceLang;
    let takes: Map<string, { take: string; start: number; end: number; envelope: number[] }> | undefined;
    const takeDir = takesDir ? join(resolve(takesDir), e.id, code) : "";
    if (takesDir) {
      takes = new Map();
      // The tightened clips (py/bvs_audio/clips.py) when there are, else the pieces of the take as split.
      const files = readdirSync(takeDir);
      for (const name of files.filter((n) => n.endsWith(".split.json"))) {
        const req = name.replace(/\.split\.json$/, "");
        const sp = JSON.parse(readFileSync(join(takeDir, name), "utf8"));
        if (!sp.ok) { console.error(`${name} : découpe refusée (${sp.why}) : à écouter avant d'aller plus loin`); process.exit(1); }
        if (files.includes(`${req}.clips.json`)) {
          const cl = JSON.parse(readFileSync(join(takeDir, `${req}.clips.json`), "utf8"));
          for (const l of cl.lines) for (const k of l.keys) takes.set(k, { take: l.file, start: 0, end: l.seconds, envelope: l.envelope });
        } else {
          for (const l of sp.lines) for (const k of l.keys) takes.set(k, { take: sp.take, start: l.start, end: l.end, envelope: l.envelope });
        }
      }
    }
    const approvals = existsSync(join(ROOT, e.dir, "approvals.json")) ? Approvals.parse(JSON.parse(readFileSync(join(ROOT, e.dir, "approvals.json"), "utf8"))) : undefined;
    const draft = has("draft") || !approvals?.voice[code];
    const { timeline, placed } = build(repo, e, { lang: code, hook: flag("hook"), style: flag("style") ?? "cartoon", draft, takes });
    const dir = join(ROOT, "assets/ep", e.id, code);
    mkdirSync(dir, { recursive: true });
    if (takes) {
      const missing = timeline.lines.filter((l) => !takes!.has(l.key)).map((l) => l.key);
      if (missing.length) { console.error(`répliques sans prise : ${missing.join(", ")}`); process.exit(1); }
      const { assemble } = await import("./audio.ts");
      timeline.audio = assemble(takeDir, placed, timeline.frames, join(dir, `voice-${timeline.hook}.wav`));
    }
    const tl = Timeline.parse(timeline);
    writeFileSync(join(dir, `timeline-${tl.hook}.json`), JSON.stringify(tl) + "\n");
    console.log(`assets/ep/${e.id}/${code}/timeline-${tl.hook}.json : ${(tl.frames / tl.fps).toFixed(1)} s, hook ${tl.hook}, ${tl.lines.length} répliques${tl.audio ? `, voix ${tl.audio}` : ""}${tl.draft ? " (brouillon)" : ""}`);
    break;
  }
  case "sources": {
    if (args[0] !== "verify") { console.error("usage: bvs sources verify [<episode>|--all] [--live] [--write]"); process.exit(2); }
    const repo = loadRepo(ROOT);
    const target = args[1] && !args[1].startsWith("--") ? args[1] : undefined;
    const ids = target
      ? [...new Set(repo.episodes.find((e) => e.id === target)?.episode.verdict.assessments.flatMap((a) => a.evidence.map((x) => x.source)) ?? [])]
      : [...repo.sources.keys()];
    if (!ids.length) { console.error(target ? `épisode inconnu ou sans source : ${target}` : "aucune source au registre"); process.exit(2); }
    const { makeFetchJson } = await import("../sources/http.ts");
    const { verifySource } = await import("../sources/verify.ts");
    const { renderReport } = await import("../sources/report.ts");
    const fetchJson = makeFetchJson(has("live") ? { cacheDir: join(ROOT, ".cache/sources"), readCache: false } : { cacheDir: join(ROOT, ".cache/sources"), offline: true });
    const items = [];
    for (const id of ids) {
      const source = repo.sources.get(id);
      if (!source) { console.error(`source inconnue : ${id}`); process.exit(2); }
      const verification = await verifySource(source, { fetchJson });
      items.push({ source, verification });
      if (has("write")) writeFileSync(join(ROOT, "content/sources", `${id}.verify.json`), JSON.stringify(verification, null, 2) + "\n");
    }
    console.log(renderReport(items, new Date().toISOString().slice(0, 10)));
    if (items.some((i) => i.verification.status === "fail")) process.exit(1);
    break;
  }
  default:
    console.log("bvs check [--gate] | status [<episode>] | approve <episode> sources|script … | sources verify [<episode>] [--live] [--write]");
}
