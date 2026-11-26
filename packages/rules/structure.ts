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
        if (p.beat.kind === "action" && p.beat.at) {
          const at = p.beat.at;
          const all = beats(ep);
          const line = all.findIndex((q) => q.scope === p.scope && q.beat.kind === "line" && q.beat.id === at.line);
          if (line < 0) err(`${p.scope}.${p.beat.id}.at`, `« ${at.line} » n'est pas une réplique de ${p.scope}`);
          // An action anchored on a line not played yet would start, with no error, at the clock of the moment (the
          // challenge of money-happiness): the line must come before it.
          else if (line > all.findIndex((q) => q.beat === p.beat)) err(`${p.scope}.${p.beat.id}.at`, `« ${at.line} » vient après cette action : la placer après sa réplique`);
        }
        if (p.beat.kind === "line" && p.beat.cites) {
          const dossier = new Set(ep.verdict.assessments.flatMap((a) => a.evidence.map((x) => x.source)));
          for (const c of p.beat.cites) if (!dossier.has(c)) err(`${p.scope}.${p.beat.id}.cites`, `« ${c} » n'est pas au dossier du verdict : une réplique ne cite qu'une étude évaluée`);
        }
        if (p.beat.kind === "action" && p.beat.holds !== "beat" && !p.beat.fx && !p.beat.prop) {
          err(`${p.scope}.${p.beat.id}.holds`, `« holds: ${p.beat.holds} » garde un effet ou un objet : cette action n'en a pas`);
        }
        if (p.part === "scene" && p.beat.kind === "line" && p.beat.speaker === ep.cast.narrator) {
          // Only over the scene (voice « over »), where it turns: before its first character line, or right after a rewind.
          const scene = ep.scenes.find((s) => s.id === p.scope)!;
          const i = scene.beats.indexOf(p.beat);
          const before = scene.beats.slice(0, i);
          const atStart = !before.some((b) => b.kind === "line" && b.speaker !== ep.cast.narrator);
          const prev = before.at(-1);
          const afterRewind = prev?.kind === "action" && prev.fx?.id === "rewind";
          if (p.beat.voice !== "over" || !(atStart || afterRewind)) {
            err(`${p.scope}.${p.beat.id}`, "le narrateur ne parle dans une scène que par-dessus (voice: over), avant la première prise ou juste après un retour en arrière");
          }
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
        for (const b of h.beats) if (b.caption || b.at || b.hooks) {
          out.push({ rule: "hooks", severity: "error", where: where(dir, `hooks.${h.id}.${b.id}`), message: "une action du hook n'a ni légende (le texte du hook est sa première image), ni ancre, ni liste de hooks" });
        }
      }
      // An action kept for some hooks names hooks that exist, and not all of them (it would be an ordinary action).
      const ids = new Set(ep.hooks.map((h) => h.id));
      for (const p of beats(ep)) if (p.beat.kind === "action" && p.beat.hooks) {
        for (const h of p.beat.hooks) if (!ids.has(h)) out.push({ rule: "hooks", severity: "error", where: where(dir, `${p.scope}.${p.beat.id}`), message: `hook inconnu « ${h} »` });
        if (ep.hooks.every((h) => p.beat.kind === "action" && p.beat.hooks!.includes(h.id))) {
          out.push({ rule: "hooks", severity: "error", where: where(dir, `${p.scope}.${p.beat.id}`), message: "liste de hooks inutile : elle les nomme tous" });
        }
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
