// Rules on the texts of each language: complete, clean, short enough, and saying no more than the evidence.
import { textTag } from "../core/canonical.ts";
import { ARABIC_INDIC, containsPhrase, numbersIn, strayFormatChars, words } from "../core/text.ts";
import { requiredKeys } from "../schema/index.ts";
import type { Issue, Rule } from "./types.ts";
import { beats, narratorKeys } from "./walk.ts";

const langWhere = (dir: string, lang: string, key: string) => `${dir}/lang/${lang}.json#${key}`;

export const langComplete: Rule = {
  id: "lang-complete",
  describe: "Chaque langue de l'épisode a tous ses textes ; une traduction dont le texte source a changé est périmée.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const keys = requiredKeys(ep);
      const source = langs.get(ep.sourceLang);
      for (const code of ep.languages) {
        const lang = langs.get(code);
        if (!lang) { out.push({ rule: "lang-complete", severity: "error", where: `${dir}/lang/${code}.json`, message: "fichier de langue manquant" }); continue; }
        for (const k of keys) if (!(k in lang.texts)) out.push({ rule: "lang-complete", severity: "error", where: langWhere(dir, code, k), message: "texte manquant" });
        const wanted = new Set(keys);
        for (const k of Object.keys(lang.texts)) if (!wanted.has(k) && k !== "share") out.push({ rule: "lang-complete", severity: "warn", where: langWhere(dir, code, k), message: "texte qu'aucun nœud n'utilise" });
        if (code !== ep.sourceLang && source) {
          for (const k of keys) {
            const src = source.texts[k];
            if (src === undefined) continue;
            if (lang.of?.[k] !== textTag(src)) out.push({ rule: "lang-complete", severity: "error", gate: true, where: langWhere(dir, code, k), message: "traduction périmée : le texte source a changé depuis" });
          }
        }
      }
    }
    return out;
  },
};

export const textChars: Rule = {
  id: "text-chars",
  describe: "Textes en NFC, sans marque invisible, chiffres 123 jamais ١٢٣.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, langs } of repo.episodes) {
      for (const [code, lang] of langs) {
        for (const [k, t] of Object.entries(lang.texts)) {
          const at = langWhere(dir, code, k);
          if (t !== t.normalize("NFC")) out.push({ rule: "text-chars", severity: "error", where: at, message: "texte pas en NFC" });
          const stray = strayFormatChars(t);
          if (stray.length) out.push({ rule: "text-chars", severity: "error", where: at, message: `marques invisibles ${stray.join(", ")}` });
          if (ARABIC_INDIC.test(t)) out.push({ rule: "text-chars", severity: "error", where: at, message: "chiffres arabo-indiens : on écrit 123, jamais ١٢٣" });
        }
      }
    }
    return out;
  },
};

export const lengths: Rule = {
  id: "lengths",
  describe: "Première image d'un hook ≤ N mots et N caractères, carte du livre et carte de l'étude ≤ N mots, réplique ≤ N caractères (langue).",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      for (const [code, lang] of langs) {
        const pack = repo.languages.get(code);
        if (!pack) continue;
        const { hookFrameWords, hookFrameChars, bookCardWords, studyCardWords, lineChars } = pack.limits;
        for (const h of ep.hooks) {
          const t = lang.texts[`hook.${h.id}.frame`];
          if (t && words(t).length > hookFrameWords) out.push({ rule: "lengths", severity: "error", where: langWhere(dir, code, `hook.${h.id}.frame`), message: `${words(t).length} mots sur la première image (${hookFrameWords} au plus : lue en une seconde, son coupé)` });
          else if (t && t.normalize("NFC").length > hookFrameChars) out.push({ rule: "lengths", severity: "error", where: langWhere(dir, code, `hook.${h.id}.frame`), message: `${t.normalize("NFC").length} caractères sur la première image (${hookFrameChars} au plus : au-delà, elle passe sur trois lignes)` });
        }
        const card = lang.texts["book.card"];
        if (card && words(card).length > bookCardWords) out.push({ rule: "lengths", severity: "error", where: langWhere(dir, code, "book.card"), message: `${words(card).length} mots sur la carte du livre (${bookCardWords} au plus)` });
        const study = lang.texts["verdict.card"];
        if (study && words(study).length > studyCardWords) out.push({ rule: "lengths", severity: "error", where: langWhere(dir, code, "verdict.card"), message: `${words(study).length} mots sur la carte de l'étude (${studyCardWords} au plus : au-delà, elle déborde de sa boîte et coupe la ligne d'applicabilité)` });
        for (const p of beats(ep)) {
          const t = p.key ? lang.texts[p.key] : undefined;
          if (t && t.length > lineChars) out.push({ rule: "lengths", severity: "warn", where: langWhere(dir, code, p.key!), message: `${t.length} caractères (${lineChars} conseillés au plus)` });
        }
      }
    }
    return out;
  },
};

export const noAuthorName: Rule = {
  id: "no-author-name",
  describe: "Aucune réplique ni aucun texte ne nomme l'auteur : « الكتاب بيقول » ; son nom n'est que sur la carte du livre.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const book = repo.books.get(ep.book.book);
      if (!book) continue;
      const written = Object.values(book.authorWritten).filter((n): n is string => typeof n === "string");
      const names = [book.author, book.author.split(/\s+/).at(-1) ?? "", ...written];
      for (const w of written) { const last = w.split(/\s+/).at(-1); if (last) names.push(last); }
      for (const [code, lang] of langs) for (const [k, t] of Object.entries(lang.texts)) {
        const hit = names.find((n) => n.length >= 3 && containsPhrase(t, n));
        if (hit) out.push({ rule: "no-author-name", severity: "error", where: langWhere(dir, code, k), message: `nomme l'auteur (« ${hit} ») : dire « الكتاب بيقول », le nom n'est que sur la carte du livre` });
      }
    }
    return out;
  },
};

export const numbersFromRegistry: Rule = {
  id: "numbers",
  describe: "Tout nombre dit ou écrit par le narrateur ou sur une carte vient du registre (n, k, effet, année, constat).",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const allowed = new Set<number>();
      for (const a of ep.verdict.assessments) for (const e of a.evidence) {
        const s = repo.sources.get(e.source);
        if (!s) continue;
        for (const v of [s.n, s.k, s.declared.year]) if (v !== undefined) allowed.add(v);
        for (const f of s.findings) {
          for (const v of numbersIn(f.text)) allowed.add(v);
          if (f.effect) { allowed.add(f.effect.value); allowed.add(Math.abs(f.effect.value)); f.effect.ci?.forEach((v) => allowed.add(v)); }
        }
      }
      for (const n of [1, 2, 3]) allowed.add(n);            // « 2 études », « 3 حاجات » : counts of what is on screen
      // The study card shows ONE study: its figures come from that study, not from another one of the dossier.
      const shown = repo.sources.get(ep.verdict.onScreen);
      const own = new Set<number>([1, 2, 3]);
      if (shown) {
        for (const v of [shown.n, shown.k, shown.declared.year]) if (v !== undefined) own.add(v);
        for (const f of shown.findings) { for (const v of numbersIn(f.text)) own.add(v); if (f.effect) { own.add(f.effect.value); own.add(Math.abs(f.effect.value)); } }
        for (const [code, lang] of langs) {
          const card = lang.texts["verdict.card"];
          for (const n of card ? numbersIn(card) : []) if (!own.has(n)) {
            out.push({ rule: "numbers", severity: "error", where: langWhere(dir, code, "verdict.card"), message: `${n} n'est pas un nombre de l'étude à l'écran (${shown.id})` });
          }
        }
      }
      const keys = [...narratorKeys(ep), ...ep.hooks.filter((h) => h.type === "number").map((h) => `hook.${h.id}`)];
      for (const [code, lang] of langs) for (const k of keys) {
        const t = lang.texts[k];
        if (!t) continue;
        for (const n of numbersIn(t)) if (!allowed.has(n)) {
          out.push({ rule: "numbers", severity: "error", where: langWhere(dir, code, k), message: `le nombre ${n} n'est dans aucune source citée` });
        }
      }
    }
    return out;
  },
};

export const sensitive: Rule = {
  id: "sensitive",
  describe: "Les sujets sensibles se déduisent des textes ; émotions et santé mentale exigent la phrase d'orientation.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const lang = langs.get(ep.sourceLang);
      const pack = repo.languages.get(ep.sourceLang);
      if (!lang || !pack) continue;
      const found = new Set(ep.topic.sensitive);
      const all = Object.values(lang.texts).join(" \n ");
      for (const [topic, list] of Object.entries(pack.lexicons.sensitive)) {
        const hit = (list ?? []).find((w) => containsPhrase(all, w));
        if (hit && !found.has(topic as never)) {
          out.push({ rule: "sensitive", severity: "error", where: `${dir}/episode.json#topic.sensitive`, message: `« ${hit} » : le sujet « ${topic} » est à déclarer` });
          found.add(topic as never);
        }
      }
      if ((found.has("mental-health") || found.has("health")) && !ep.takeaway.orientation) {
        out.push({ rule: "sensitive", severity: "error", where: `${dir}/episode.json#takeaway.orientation`, message: "sujet de santé ou d'émotions : la phrase d'orientation est dite dans la vidéo" });
      }
      for (const [code, l] of langs) {
        const p = repo.languages.get(code);
        if (!p) continue;
        for (const k of ["takeaway.orientation", ...ep.takeaway.beats.filter((b) => b.kind === "line").map((b) => `takeaway.${b.id}`)]) {
          const t = l.texts[k];
          const bad = t && p.lexicons.forbiddenAdvice.find((w) => containsPhrase(t, w));
          if (bad) out.push({ rule: "sensitive", severity: "error", where: langWhere(dir, code, k), message: `« ${bad} » ne se conseille jamais` });
        }
      }
    }
    return out;
  },
};

export const causalVerbs: Rule = {
  id: "causal-verbs",
  describe: "Pas de verbe causal sur une affirmation que seules des associations portent.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const associationOnly = new Set<string>();
      for (const a of ep.verdict.assessments) {
        const kinds = a.evidence.map((e) => repo.sources.get(e.source)?.findings.find((f) => f.id === e.finding)?.kind);
        if (kinds.every((k) => k === "association")) associationOnly.add(a.claim);
      }
      const keys: { key: string; claims: string[] }[] = [];
      for (const p of beats(ep)) if (p.beat.kind === "line" && p.key && (p.part === "verdict" || p.part === "takeaway" || p.part === "book")) {
        keys.push({ key: p.key, claims: p.beat.claims.length ? p.beat.claims : p.part === "verdict" ? ep.verdict.assessments.map((a) => a.claim) : [] });
      }
      if (ep.verdict.nuance) keys.push({ key: "verdict.nuance", claims: [ep.verdict.nuance] });
      for (const [code, lang] of langs) {
        const pack = repo.languages.get(code);
        if (!pack) continue;
        for (const { key, claims } of keys) {
          if (!claims.some((c) => associationOnly.has(c))) continue;
          const t = lang.texts[key];
          const verb = t && pack.lexicons.causal.find((w) => containsPhrase(t, w));
          if (verb) out.push({ rule: "causal-verbs", severity: "error", where: langWhere(dir, code, key), message: `« ${verb} » dit une cause, alors que les preuves sont des associations (« مرتبط بـ »)` });
        }
      }
    }
    return out;
  },
};

export const generalizations: Rule = {
  id: "generalizations",
  describe: "Une généralisation sur un groupe n'est dite que par un personnage, jamais par le narrateur ni sur une carte, jamais sous ✅.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const narrator = new Set(narratorKeys(ep));
      for (const [code, lang] of langs) {
        const pack = repo.languages.get(code);
        if (!pack) continue;
        for (const [k, t] of Object.entries(lang.texts)) {
          const hit = pack.lexicons.generalizing.find((w) => containsPhrase(t, w));
          if (!hit) continue;
          if (narrator.has(k) || k === "title") out.push({ rule: "generalizations", severity: "error", where: langWhere(dir, code, k), message: `généralisation « ${hit} » dans la bouche du narrateur ou à l'écran` });
          else if (ep.verdict.badge === "confirmed") out.push({ rule: "generalizations", severity: "error", where: langWhere(dir, code, k), message: `généralisation « ${hit} » dans un épisode ✅ : elle passerait pour un fait` });
        }
      }
    }
    return out;
  },
};

export const applicability: Rule = {
  id: "applicability",
  describe: "Sans échantillon du Moyen-Orient ou d'Afrique du Nord, la phrase d'applicabilité est dite ou écrite.",
  check(repo) {
    const out: Issue[] = [];
    for (const { dir, episode: ep, langs } of repo.episodes) {
      const cited = ep.verdict.assessments.flatMap((a) => a.evidence.map((e) => repo.sources.get(e.source))).filter((s) => s !== undefined);
      if (cited.length === 0 || cited.some((s) => s.mena)) continue;
      if (ep.verdict.applicability === "written") continue;     // the shell writes the pack's line under the study card
      for (const [code, lang] of langs) {
        const pack = repo.languages.get(code);
        if (!pack) continue;
        const said = Object.values(lang.texts).some((t) => containsPhrase(t, pack.applicabilityLine));
        if (!said) out.push({ rule: "applicability", severity: "error", where: `${dir}/lang/${code}.json`, message: `aucune étude citée n'a d'échantillon arabe : dire « ${pack.applicabilityLine} »` });
      }
    }
    return out;
  },
};
