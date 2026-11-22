// The owner's approvals are fresh: their hash is still the one of what is in the files now.
import { scriptHash, sourcesHash } from "../core/fingerprint.ts";
import { short } from "../core/canonical.ts";
import type { Issue, Rule } from "./types.ts";

export const approvals: Rule = {
  id: "approvals",
  describe: "Sources puis script validés par le propriétaire, empreintes à jour ; sinon la voix et le rendu sont bloqués.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs, approvals: a } of repo.episodes) {
      const at = `${dir}/approvals.json`;
      const sh = sourcesHash(ep, repo.sources, repo.verifications);
      if (!a.sources) out.push({ rule: "approvals", severity: "error", gate: true, where: at, message: `sources à valider (empreinte ${short(sh)})` });
      else if (a.sources.hash !== sh) out.push({ rule: "approvals", severity: "error", gate: true, where: at, message: `validation des sources périmée (validée ${short(a.sources.hash)}, maintenant ${short(sh)})` });
      for (const code of ep.languages) {
        const lang = langs.get(code);
        if (!lang) continue;
        const h = scriptHash(ep, lang);
        const given = a.script[code];
        if (!given) out.push({ rule: "approvals", severity: "error", gate: true, where: at, message: `script ${code} à valider (empreinte ${short(h)})` });
        else if (given.hash !== h) out.push({ rule: "approvals", severity: "error", gate: true, where: at, message: `validation du script ${code} périmée (validée ${short(given.hash)}, maintenant ${short(h)})` });
      }
    }
    return out;
  },
};
