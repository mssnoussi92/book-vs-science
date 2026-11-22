// Rules on the episode's structure: the folders it names exist, ids are unique, the five hooks, the escape hatch.
import type { Issue, Rule } from "./types.ts";
import { beats, where } from "./walk.ts";

export const folders: Rule = {
  id: "folders",
  describe: "Les personnages, langues et locuteurs nommés existent (un dossier chacun).",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const err = (p: string, m: string) => out.push({ rule: "folders", severity: "error", where: where(dir, p), message: m });
      const narrator = repo.characters.get(ep.cast.narrator);
      if (!narrator) err("cast.narrator", `characters/${ep.cast.narrator}/ n'existe pas`);
      else if (narrator.role !== "narrator") err("cast.narrator", `${ep.cast.narrator} n'est pas un narrateur`);
      for (const c of ep.cast.characters) {
        const def = repo.characters.get(c);
        if (!def) err("cast.characters", `characters/${c}/ n'existe pas`);
        else if (def.role !== "character") err("cast.characters", `${c} est un narrateur, pas un personnage`);
      }
      const cast = new Set([ep.cast.narrator, ...ep.cast.characters]);
      for (const l of [ep.sourceLang, ...ep.languages]) if (!repo.languages.has(l)) err("languages", `languages/${l}/ n'existe pas`);
      if (!ep.languages.includes(ep.sourceLang)) err("languages", `la langue source ${ep.sourceLang} n'est pas dans languages`);
      for (const h of ep.hooks) {
        if (h.spokenBy !== "narrator" && h.spokenBy !== "none" && !cast.has(h.spokenBy)) err(`hooks.${h.id}.spokenBy`, `${h.spokenBy} n'est pas de la distribution`);
      }
      for (const p of beats(ep)) {
        if (p.beat.kind === "line" && !cast.has(p.beat.speaker)) err(`${p.scope}.${p.beat.id}`, `${p.beat.speaker} n'est pas de la distribution`);
        if (p.beat.kind === "action" && !cast.has(p.beat.who)) err(`${p.scope}.${p.beat.id}`, `${p.beat.who} n'est pas de la distribution`);
        if (p.part === "scene" && p.beat.kind === "line" && p.beat.speaker === ep.cast.narrator) {
          err(`${p.scope}.${p.beat.id}`, "le narrateur ne parle pas dans une scène : les personnages la jouent");
        }
      }
      if (ep.variation.pin.style && !repo.styles.has(ep.variation.pin.style)) err("variation.pin.style", `styles/${ep.variation.pin.style}/ n'existe pas`);
    }
    return out;
  },
};

export const idsUnique: Rule = {
  id: "ids-unique",
  describe: "Chaque identifiant est unique dans son épisode (hooks, scènes, répliques, affirmations).",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const seen = new Map<string, string>();
      const note = (id: string, at: string) => {
        if (seen.has(id)) out.push({ rule: "ids-unique", severity: "error", where: where(dir, at), message: `« ${id} » déjà utilisé (${seen.get(id)})` });
        else seen.set(id, at);
      };
      for (const h of ep.hooks) note(`hook.${h.id}`, `hooks.${h.id}`);
      for (const s of ep.scenes) note(`scene.${s.id}`, `scenes.${s.id}`);
      for (const p of beats(ep)) note(`${p.scope}.${p.beat.id}`, `${p.scope}.${p.beat.id}`);
      for (const c of ep.book.claims) note(`claim.${c.id}`, `book.claims.${c.id}`);
      for (const s of ep.scenes) if (["book", "verdict", "takeaway", "hook", "title", "card"].includes(s.id)) {
        out.push({ rule: "ids-unique", severity: "error", where: where(dir, `scenes.${s.id}`), message: `« ${s.id} » est un nom réservé` });
      }
    }
    return out;
  },
};

export const hooks: Rule = {
  id: "hooks",
  describe: "Au moins 5 hooks de 5 types différents ; « number » et « paradox » s'appuient sur une affirmation.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const types = new Set(ep.hooks.map((h) => h.type));
      if (types.size < 5) out.push({ rule: "hooks", severity: "error", where: where(dir, "hooks"), message: `${types.size} types de hook seulement (5 différents demandés)` });
      const claims = new Set(ep.book.claims.map((c) => c.id));
      for (const h of ep.hooks) {
        if ((h.type === "number" || h.type === "paradox") && h.claims.length === 0) {
          out.push({ rule: "hooks", severity: "error", where: where(dir, `hooks.${h.id}`), message: `un hook « ${h.type} » nomme l'affirmation qui le porte` });
        }
        for (const c of h.claims) if (!claims.has(c)) out.push({ rule: "hooks", severity: "error", where: where(dir, `hooks.${h.id}`), message: `affirmation inconnue « ${c} »` });
      }
    }
    return out;
  },
};

export const customScene: Rule = {
  id: "custom-scene",
  describe: "Au plus une scène à composant propre par épisode (la soupape reste une exception).",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep } of repo.episodes) {
      const custom = ep.scenes.filter((s) => s.custom);
      if (custom.length > 1) out.push({ rule: "custom-scene", severity: "error", where: where(dir, "scenes"), message: `${custom.length} scènes à composant propre (1 au plus)` });
    }
    return out;
  },
};
