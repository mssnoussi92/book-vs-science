# Proposition C : « automatisation et variation d'abord »

Architecte C, 2026-11-22, sans lire A ni B. Accent : **un épisode par jour sans humain**, sauf les deux validations du
propriétaire (script, sources). Non vérifié = « (à vérifier) ». Vérifié en ligne aujourd'hui : licences Remotion et
Revideo, documentation Gemini TTS 3.8, conditions de l'API Gemini, README de Rhubarb, « inauthentic content » (juillet
2025), et **en direct** Crossref (`updated-by`, `updates:`, titres balisés) et OpenAlex (`is_retracted`, `type`, budget).

## 1. Résumé

1. **Un épisode = un fichier `episode.json` validé par zod**, structure dans la langue source (arabe égyptien), traductions
   à part par identifiant de texte (`i18n/<lang>.json`) : on traduit sans dupliquer la structure, une traduction périmée se voit.
2. **Le statut d'un épisode se calcule, il ne s'écrit jamais** : d'après les fichiers, les empreintes (sha256) et les
   validations. Chaque étape est une commande idempotente dont la sortie est rangée sous l'empreinte de ses entrées.
3. **Les validations du propriétaire sont liées à une empreinte** : modifier une réplique validée annule la validation
   d'elle-même, sans dépendre de la mémoire d'une session.
4. **Sources** : registre d'études par DOI, vérifié par Crossref + OpenAlex (titre, auteurs, année ± 1, type, rétractations,
   corrections) **et** par une « phrase d'appui » copiée du résumé de l'étude, que le code retrouve mot pour mot.
5. **Voix** : Gemini 3.8 Flash TTS sur le **compte Google propre à la chaîne** ; 2 requêtes par épisode (une pour le dialogue
   à 2 voix, une pour le narrateur), ~3 avec reprises ; ≤ 10/jour : 1 épisode/jour tient avec une marge réelle.
6. **Rendu** : **Remotion gardé** (licence gratuite pour un particulier, usage commercial permis ; acquis du propriétaire),
   avec une issue de secours imposée par le lint : styles et personnages n'importent jamais `remotion`.
7. **Un style = un module** (`StyleModule`) qui dessine des « temps » (hook, scène, livre, verdict, à retenir) ; badge, étude,
   livre, sous-titres et zones sûres sont dessinés par une couche commune qu'aucun style ne touche.
8. **Moteur de variation** déterministe (graine = épisode), sous contraintes de distance avec les 7 derniers épisodes, tracé
   dans `variation.lock.json` sur la branche `state` : style, structure de scène, type de hook, cadrage, palette, polices, son.
9. **File d'épisodes** : `advance` fait chaque nuit l'étape machine suivante de chaque épisode, dans les budgets (voix,
   minutes), s'arrête aux portes humaines, et tient un tampon de 7 épisodes prêts. Le propriétaire valide **par lot**.
10. **Pilote** : le squelette, le dossier scientifique d'abord, le script et ses 5 hooks, les 3 personnages, la voix, 3
    méthodes de synchro labiale comparées, 3 styles rendus dans GitHub Actions, LIMITES.md.

**Noms de dépôt proposés** : `kalam-kotob` (si le nom de chaîne n°1 est retenu), `book-vs-science`, `shelf-lab`.

**Noms de chaîne** (courts, égyptiens, disponibilité sur les 4 plateformes à vérifier) :

| Arabe | Translittération | Ce qu'il dit |
|---|---|---|
| **كلام كتب؟** | *Kalām kotob?* | « Du blabla de livre ? » : l'expression égyptienne pour « belle théorie, pas la vraie vie » ; le point d'interrogation, c'est la science qui répond. Ma recommandation. |
| **الكتاب في المعمل** | *El-ketāb fel-maʿmal* | « Le livre au labo » : explicite, un peu plus long. |
| **كتاب ولّا علم؟** | *Ketāb walla ʿelm?* | « Livre ou science ? » : le plus littéral. |

**Licences** : code **MIT** ; textes et données d'épisodes (scripts, registre de sources, rapports) **CC BY 4.0** ; nom,
logo et **dessins des 3 personnages « tous droits réservés »** (`BRAND.md`) : sous une licence libre, n'importe qui pourrait
ouvrir une chaîne clone avec les mêmes personnages, ce qui nuirait à l'originalité dont YouTube juge la monétisation.
Remotion garde sa licence propre (non OSI : le README le dit). Polices OFL. Rhubarb (MIT, à confirmer dans son LICENSE.md)
téléchargé, jamais commité. Métadonnées Crossref et OpenAlex : CC0 (à vérifier pour Crossref : « faits », réutilisables).

## 2. Arborescence du dépôt

```
kalam-kotob/
├── README.md · LICENSE (MIT) · LICENSE-CONTENT.md (CC BY 4.0) · BRAND.md · LIMITES.md · CLAUDE.md · VENDORED.md
├── package.json (workspaces npm) · package-lock.json · tsconfig.base.json · .nvmrc (22)
├── pyproject.toml · uv.lock · constraints.txt          # pipeline Python (uv), versions qui changent la sortie
├── packages/                                           # TypeScript
│   ├── schema/            zod : episode.ts, source.ts, cast.ts, variation.ts, timeline.ts
│   │                      scripts/export.ts → schema/*.json (JSON Schema, lu par le pipeline Python)
│   ├── core/              pur TS, sans React ni Remotion : timeline.ts (épisode + temps → Timeline),
│   │                      variation/ (prng.ts, axes.ts, engine.ts, ledger.ts), bidi.ts, zones.ts, estimate.ts
│   ├── characters/        rig/ (Rig, Head, Eyes, Brows, Mouth, Limb, ik, poses, emotions, visemes, blink, gestures),
│   │                      cast/ (nour, karim, adasa), extras.ts (passants anonymes), CastSheet.tsx
│   ├── overlay/           VerdictBadge, StudyCard, BookCard, Subtitles, Signature, Disclaimer, layout.ts
│   ├── styles/            contract.ts · registry.ts (le seul fichier touché pour brancher un style)
│   │   ├── cartoon/ typo/ split/                       # pilote
│   │   └── _template/                                  # copié pour whiteboard/, infographic/, papercut/
│   └── render-remotion/   Root.tsx (Episode916, Episode169, Cover, CastSheet, StyleLab), Shell.tsx (frame → t),
│                          fonts.ts, remotion.config.ts  # SEUL paquet qui importe `remotion`
├── pipeline/bvs/          # Python, `uv run bvs <commande>`
│   ├── cli.py · cas.py (empreintes, cache) · status.py · advance.py · validate.py
│   ├── lint/              rules.py (règles croisées), wording.py, copyright.py, sensitive.py
│   ├── sources/           crossref.py, openalex.py, abstracts.py, match.py, evidence.py, report.py
│   ├── voice/             plan.py (regroupe les répliques en requêtes), gemini.py, ledger.py (quota), casting.py
│   ├── audio/             align.py, level.py (−16 LUFS), pitch.py (contrôle des locuteurs), sfx.py, music.py
│   ├── lipsync/           rhubarb.py, text_visemes.py, rms.py, compare.py
│   └── render/            props.py, check.py (planches, son, image statique), splice.py
├── content/
│   ├── cast.yaml          3 personnages : voix par langue, plage de hauteur attendue, garde-robe
│   ├── books/<slug>.yaml  titre, auteur, année, ISBN, idées déjà traitées (registre anti-résumé)
│   ├── sources/<id>.json  registre : une étude = un fichier (déclaré par l'auteur du script)
│   ├── episodes/<id>/     episode.json · i18n/en.json · i18n/fr.json
│   ├── ideas/backlog.yaml idées notées (portée, solidité des preuves, sensibilité)
│   ├── policy.yaml        règles éditoriales en données (types d'études, citations, sujets sensibles)
│   └── wording.yaml       mots refusés par le propriétaire (patron de quran-themes-demo)
├── evidence/<doi-slug>/   réponses brutes Crossref/OpenAlex (gzip, datées) + verdict JSON : la preuve gardée
├── review/<id>/           script.md, sources.md, cast.md : feuilles générées, lisibles sur téléphone
├── assets/                fonts/ (OFL + licences), decor/ (SVG dessinés), music/ (CC0 + preuve), sfx/ (générés)
├── tests/                 pytest + vitest : « copie et casse », image fixe de chaque style, zones sûres, bidi
├── docs/                  Pages : board.html (file, lien fixe), method.html (méthode publique) ; plus tard CGU, OAuth
└── .github/
    ├── workflows/         validate.yml · sources.yml · voice.yml · render.yml · advance.yml · nightly.yml · gate.yml
    └── scripts/           save-state.sh (copié de quran-reels, avec son test)
```

Deux branches de données, jamais mêlées : **`main` = ce que l'humain écrit ou valide** (scripts, registre, validations) ;
**`state` = ce que la machine décide et constate** (quota de voix, registre de variation, verrous de variation, index des
prises, `status.json` lu par `board.html`), écrit par `save-state.sh` (rejoue son commit si la branche a bougé).
**Stockage adressé par contenu** : prises de voix et rendus vont dans des releases (`takes-2026`, `ep-<id>`), nommés par
empreinte (`<sha12>.flac`) ; le dépôt garde seulement les empreintes. Raison : à 1 épisode/jour, ~1,2 Mo de FLAC par
épisode ferait ~450 Mo d'historique Git par an ; quran-themes-demo commite ses prises, ici ce serait intenable.

Deux langages : rendu en TypeScript (Remotion, zod), audio en Python éprouvé (faster-whisper, `align.py`, `level`,
`check.py`, `sfx.py`). **Une seule source de vérité** : zod, exporté en JSON Schema que le Python valide (CI : à jour).

## 3. Schéma d'un épisode

### 3.1 Extrait réel (zod 4)

```ts
// packages/schema/src/episode.ts
import { z } from "zod";

export const SOURCE_LANG = "ar-EG" as const;
export const Lang = z.enum(["ar-EG", "en", "fr"]);
const Slug = z.string().regex(/^[a-z0-9][a-z0-9-]{1,48}$/);
const Sha256 = z.string().regex(/^[0-9a-f]{64}$/);
/** Every text has a stable id; translations live in i18n/<lang>.json under that id. */
const TextId = z.string().regex(/^[a-z][a-z0-9-]*(\.[a-z0-9-]+)+$/); // "scene.s1.l3", "verdict.why"
export const Text = z.object({ id: TextId, text: z.string().trim().min(1).max(240) });

export const CastId = z.enum(["nour", "karim", "adasa"]); // adasa = the narrator (a magnifying glass)
export const Emotion = z.enum(["neutral", "happy", "sad", "anxious", "angry", "surprised", "ashamed", "relieved",
  "skeptical", "thinking"]);
export const Gesture = z.enum(["idle", "point", "shrug", "facepalm", "arms_crossed", "hand_on_chest", "wave",
  "phone_scroll", "head_in_hands"]);

export const Line = Text.extend({
  who: CastId, emotion: Emotion, intensity: z.number().min(0).max(1).default(0.5),
  delivery: z.string().max(80).optional(), // voice direction only, English, never shown: "whispering, tired"
  gesture: Gesture.default("idle"),
  to: CastId.optional(),                   // who the speaker looks at
});

export const HookType = z.enum([
  "question", "in_medias_res", // a question about what the viewer feels · the scene starts at its peak
  "surprising_fact",           // a number or a finding: must point to a claim of the registry
  "myth_vs_fact",              // "the book says X... science says something else"
  "verdict_teaser", "pov",     // the badge first · "لما..." a moment everybody knows
  "challenge",                 // a 3-second test the viewer does
]);
export const Hook = z.object({
  id: Slug, type: HookType, lines: z.array(Line).min(1).max(2),
  firstFrame: Text.optional(),  // ≤ 6 words written on frame 1 (sound off)
  claim: z.string().optional(), // "<sourceId>#<claimId>", required for surprising_fact
});

export const Place = z.enum(["kitchen", "office", "ahwa", "microbus", "living_room", "street", "bedroom", "phone"]);
export const SceneShape = z.enum([
  "replay_twice",   // the same moment twice, one thing changes (grey then colour)
  "escalation",     // three beats, each worse
  "inner_voice",    // a character and the voice in his head (the other character plays it)
  "argument",       // A and B disagree, the narrator does not take sides before the verdict
  "before_after",   // the habit, then the same day with the change
]);
export const Scene = z.object({
  id: Slug, place: Place, shape: SceneShape,
  voice: z.enum(["spoken", "mimed"]), // mimed: speech bubbles, no voice, no lip sync
  beats: z.array(z.object({ lines: z.array(Line).max(4),
    bubble: Text.optional(),          // mimed scenes: ≤ 7 words
    label: Text.optional() })).min(2).max(6), // "قبل" / "بعد", "المرة الأولى"...
});
export const ClaimRef = z.object({ // a claim of content/sources/<source>.json
  source: Slug, claim: Slug, relation: z.enum(["supports", "nuances", "contradicts"]),
});
export const Verdict = z.object({
  badge: z.enum(["confirmed", "nuanced", "contradicted"]), // ✅ ⚠️ ❌
  why: Text,                     // one sentence, said by the narrator
  confidence: z.enum(["high", "moderate", "low"]), // ≤ the cap computed from the sources (rules.py)
  nuances: z.array(z.object({ text: Text, forWhom: z.string().max(80), claims: z.array(ClaimRef).min(1) })).max(3),
  claims: z.array(ClaimRef).min(1),
  onScreen: Slug,                // the study whose card is shown; the card text comes from the registry only
});
export const BookIdea = z.object({
  book: Slug,                    // content/books/<slug>.yaml (title, author, year, ISBN)
  idea: Text,                    // our words; quotation marks refused by the linter
  locus: z.string().max(80),     // chapter or concept name, for the owner's check, never shown
  quote: z.object({ text: z.string().max(90), page: z.string().max(12) }).optional(), // ≤ 12 words, rules.py
});
export const Validation = z.object({
  by: z.literal("owner"), on: z.iso.date(),
  hash: Sha256,                  // empreinte of exactly what was validated (scope below)
  words: z.string().min(2),      // his words, verbatim: "je valide le script de habits-21"
  proof: z.url().optional(),     // the GitHub comment that carried it, when it came that way
});
export const Episode = z.object({
  schema: z.literal(1), id: Slug, lang: z.literal(SOURCE_LANG), title: Text,
  hooks: z.array(Hook).length(5),
  scenes: z.array(Scene).min(1).max(2),
  book: BookIdea, verdict: Verdict,
  takeaway: z.object({ action: Text, when: Text.optional() }), // a concrete action, a moment to do it
  share: Text.optional(),        // "ابعتها لحد..." (send to someone), never "subscribe"
  sensitivity: z.array(z.enum(["gender", "mental_health", "health", "money", "relationships"])).default([]),
  variation: z.object({
    pin: z.partialRecord(z.enum(["style", "shape", "hook", "palette", "fonts", "music", "camera"]), z.string()).optional(),
    avoid: z.array(z.string()).default([]), // e.g. "style:split" when a scene would not read in it
  }).default({ avoid: [] }),
  validations: z.object({ script: Validation.optional(), sources: Validation.optional(), render: Validation.optional() })
    .default({}),
}).superRefine((ep, ctx) => {
  const types = new Set(ep.hooks.map((h) => h.type));
  if (types.size < 4) ctx.addIssue({ code: "custom", path: ["hooks"], message: "5 hooks, at least 4 different types" });
  for (const [i, h] of ep.hooks.entries())
    if (h.type === "surprising_fact" && !h.claim)
      ctx.addIssue({ code: "custom", path: ["hooks", i, "claim"], message: "a fact hook names its claim" });
  if (!ep.verdict.claims.some((c) => c.source === ep.verdict.onScreen))
    ctx.addIssue({ code: "custom", path: ["verdict", "onScreen"], message: "the study on screen must back the verdict" });
});
```

```ts
// packages/schema/src/source.ts — one study, declared by the script writer, then verified by code
export const Design = z.enum(["meta_analysis", "systematic_review", "multilab_replication", "rct", "review",
  "longitudinal", "experiment", "cross_sectional", "preprint"]);
export const Source = z.object({
  id: Slug,                                   // "lally-2010"
  doi: z.string().regex(/^10\.\d{4,9}\/\S+$/),
  declared: z.object({                        // what the writer believes; compared by code to Crossref/OpenAlex
    title: z.string(), firstAuthor: z.string(), authors: z.array(z.string()).optional(),
    year: z.number().int(), journal: z.string().optional(), design: Design,
  }),
  n: z.number().int().positive().optional(),  // participants (or k studies for a meta-analysis: `k`)
  k: z.number().int().positive().optional(),
  population: z.string().max(120),            // "96 UK volunteers", "US and East-Asian adults"
  claims: z.array(z.object({
    id: Slug,
    finding: z.string().max(300),             // our English words: what it shows
    support: z.object({ quote: z.string().max(320), where: z.enum(["abstract", "fulltext"]) }), // ≤ 40 words
    effect: z.object({ metric: z.enum(["d", "g", "r", "OR", "RR", "beta", "median", "percent"]),
      value: z.number(), ci: z.tuple([z.number(), z.number()]).optional(),
      where: z.enum(["abstract", "fulltext"]), page: z.string().optional() }).optional(),
  })).min(1),
  limits: z.array(z.string().max(200)).min(1), // at least one limit, always
});
// The verification report (evidence/<doi-slug>/report.json) is written by `bvs sources verify`, never by hand.
```

### 3.2 Ce que porte chaque partie, et les règles qui ne tiennent pas dans zod (`pipeline/bvs/lint/rules.py`)

- **5 hooks, types différents** : au moins 4 types distincts (refine ci-dessus) ; un hook dit ≤ 3 s (estimé à la vitesse
  mesurée de la voix, ~13 caractères/s pour commencer, à recalibrer sur la première prise) ; `firstFrame` ≤ 6 mots. Les 5
  sont **tous dits** dans les mêmes requêtes de voix (aucune requête de plus) ; le rendu en choisit un par la variation, et
  plus tard un par plateforme.
- **Scène** : ≥ 40 % de la durée estimée (le brief veut une idée « jouée ») ; chaque réplique a son locuteur et son émotion ;
  `mimed` = bulles, sans voix (mode de repli et axe de variation, voir §6 et §11).
- **Idée du livre** : reformulée (`idea`), jamais entre guillemets ; `locus` sert au propriétaire à vérifier que le livre dit
  bien ça (aucun code ne peut le vérifier : limite écrite dans LIMITES.md). Citation directe : facultative, ≤ 12 mots, une
  par épisode, avec page (§10).
- **Verdict** : badge + une phrase + niveau de confiance + nuances « pour qui » (chaque nuance pointe une affirmation du
  registre). **Plafond de confiance calculé par le code**, que l'auteur peut baisser mais jamais dépasser :
  `high` exige ≥ 1 méta-analyse ou revue systématique ou réplication multi-labos vérifiée qui va dans le sens du badge et
  aucune qui le contredit ; `moderate` exige ≥ 2 études primaires concordantes dont 1 expérimentale ou longitudinale ;
  sinon `low`. **✅ ou ❌ avec `low` est refusé** (on dit ⚠️). Un épisode `gender` ne peut pas affirmer une différence de
  groupe sans une nuance qui dit le recouvrement des distributions (§10).
- **Sources** : registre séparé, cité par identifiant (patron « une citation n'existe que par son id » de
  quran-themes-demo). La carte d'étude à l'écran (premier auteur et al., année, revue, type, n) **se compose depuis le
  registre vérifié** ; aucun style ne peut l'écrire.
- **« À retenir »** : une action concrète (verbe à l'impératif, ≤ 12 mots) et, si possible, quand la faire.
- **Textes multilingues** : la structure n'existe qu'une fois ; `i18n/en.json` = `{ "<textId>": { "text": "…", "of": "<sha8
  du texte source>" } }`. Si le texte source change, `of` ne correspond plus : la traduction est « périmée », `lint` le dit,
  le rendu de cette langue est bloqué. Sens d'écriture, police, voix et normalisation d'alignement se déduisent de la langue
  (`cast.yaml`, `core/bidi.ts`). Le pilote n'écrit que `ar-EG` et le sous-titre `en`.
- **Variation** : `pin` (le propriétaire impose un style, par exemple) et `avoid` ; le reste est tiré (§11).
- **Validations** : `script` et `sources` (exigées), `render` (exigée pendant les 10 premiers épisodes, puis au choix du
  propriétaire). **Portée des empreintes** (`validate.py`) :
  - `script.hash` = sha256 du JSON canonique (clés triées, NFC) de `title, hooks, scenes, book, takeaway, share` ;
  - `sources.hash` = sha256 de `verdict` + des fichiers `content/sources/<id>.json` cités + des `report.json` de
    vérification correspondants (une rétractation apparue plus tard change le rapport, donc annule la validation).
  Une validation dont l'empreinte ne correspond plus est **ignorée** (statut recalculé) et `board.html` affiche « à revalider ».
  **Écrites seulement par `bvs validate` sur la parole du propriétaire** (ses mots recopiés dans `words`) ; aucune session
  ne pose de validation d'elle-même (règle du CLAUDE.md, reprise de quran-themes-demo).

## 4. Contrat d'un style

### 4.1 L'interface

```ts
// packages/styles/contract.ts — no import of "remotion" allowed in packages/styles/** (ESLint no-restricted-imports)
import type React from "react";
import type { Timeline, ResolvedBeat, Look, CastApi, Rect, Insets } from "@kk/core";

export type Ratio = "9:16" | "16:9";
export type BeatKind = "hook" | "scene" | "book" | "verdict" | "takeaway" | "outro";

export type Stage = {
  w: number; h: number; ratio: Ratio;
  safe: Insets;     // the platforms' safe area (9:16: top 250, sides 90, bottom 420 — as in quran-reels)
  reserved: Rect[]; // where the overlay draws at this instant (badge, cards, subtitles): keep it readable
};

export type BeatProps = {
  t: number;             // seconds since the beat started (never a frame: the engine is not the style's business)
  beat: ResolvedBeat;    // lines with their start/end, speaker, emotion, gesture; mouth cues per character
  tl: Timeline;          // the whole resolved episode (read-only)
  stage: Stage;
  look: Look;            // palette, font pair, camera plan, structure: chosen by the variation engine
  cast: CastApi;         // <cast.Rig who="nour" .../> already wired to mouths, blinks and emotions
};

export interface StyleModule {
  id: string;                                   // "cartoon", "typo", "split"
  version: string;                              // enters the render empreinte
  ratios: readonly Ratio[];
  sceneVoices: readonly ("spoken" | "mimed")[];
  axes: {                                       // what the variation engine may choose inside this style
    camera: readonly ("static_push" | "pan" | "cut_close" | "dolly_out" | "two_shot" | "over_shoulder")[];
    palettes: readonly string[] | "any";
    fonts: readonly string[] | "any";
    shapes: readonly string[];                  // scene shapes this style can tell
  };
  Background: React.FC<BeatProps>;
  beats: Record<BeatKind, React.FC<BeatProps>>; // every kind is mandatory: a style cannot skip the verdict
  Transition: React.FC<{ from: BeatKind; to: BeatKind; p: number; stage: Stage; look: Look }>;
  costHint: { fps: number };                    // frames rendered per second, measured by render.yml, written back
}
```

`registry.ts` est une simple table `{ cartoon, typo, split }`. **Ajouter un style** = copier `styles/_template/`, le
remplir, l'inscrire dans la table, ajouter son image fixe aux tests. Les scripts ne bougent pas : un épisode ne nomme
jamais un style (sauf `variation.pin`, réglage, pas script) ; l'empreinte du script exclut `variation`.

### 4.2 Les trois styles du pilote, sur le même JSON

- **`cartoon`** : décor SVG du `place`, les rigs sur scène, gestes et regards des répliques, bouches pilotées, caméra
  du plan tiré (zoom lent continu, coupe en plan rapproché sur l'émotion forte) ; scène `mimed` = bulles ; « livre » : les
  personnages réagissent pendant que la carte du livre s'affiche ; « verdict » : un décor de « labo » dessiné et le badge.
- **`typo`** (typographie animée) : les répliques deviennent des mots animés, une couleur et un côté par personnage,
  l'émotion devient un mouvement de lettres (tremblé pour `anxious`, lent et bas pour `sad`, rebond pour `happy`) ; les
  têtes des rigs en médaillon parlent ; le moins cher à rendre, le plus lisible son coupé.
- **`split`** (« Livre vs Science ») : écran partagé (haut/bas en 9:16, gauche/droite en 16:9) : la moitié « الكتاب » joue la
  scène en petit et porte l'idée ; la moitié « العلم » se remplit (pictos d'étude, n, type) ; au verdict, une moitié gagne
  l'écran (✅ : elles fusionnent ; ❌ : la moitié livre se déchire ; ⚠️ : elles restent côte à côte, la nuance au milieu).
- **Plus tard** : `whiteboard` (main qui dessine les tracés SVG avec `stroke-dashoffset`), `infographic` (barres et
  points d'effet tirés du registre : `effect`, `ci`), `papercut` (formes à ombre portée, texture papier), chacun depuis
  `_template/`, sans toucher aux scripts.

### 4.3 9:16 et 16:9

Le pilote rend en 9:16. Le contrat porte `ratios` dès maintenant : `Stage` change de taille et de zones, la couche commune
a ses positions par format (`overlay/layout.ts`), un style déclare ce qu'il sait faire. Le 16:9 servira aux compilations
(« 5 idées d'un même livre »), pas au pilote.

### 4.4 Ce qu'un style ne décide jamais (couche `overlay/`, au-dessus de tout style)

Le **badge** (forme, couleurs, animation et position fixes : c'est la marque récurrente) ; la **carte d'étude** (texte
composé depuis le registre vérifié) ; la **carte du livre** (titre et auteur en typographie, icône de livre générique
dessinée par nous, jamais une couverture) ; les **sous-titres** (texte des répliques, langue d'affichage, `<bdi>` pour les
mots latins) ; les **zones sûres** ; la **signature** ; l'avertissement « مش نصيحة طبية » pour `mental_health`/`health`.
La couche mesure ses textes (`@remotion/layout-utils` dans le shell, puis valeurs passées en props) et **fait échouer le
rendu** si un texte sort de sa zone, au lieu de le laisser déborder en silence.

## 5. Personnages

### 5.1 La distribution (aucune personne réelle)

- **نور (Nour)** et **كريم (Karim)** : deux amis et collègues trentenaires du Caire, ni couple ni frère et sœur (le sujet
  hommes/femmes ne doit pas devenir un sketch de couple). Prénoms très courants, aucune ressemblance voulue.
- **عدسة (ʿAdasa, « la loupe »)**, le narrateur : une loupe avec des yeux et une bouche, pas un humain. Raisons : pas de
  figure d'« expert en blouse » (qui ferait passer la vidéo pour un avis médical), pas de personne réelle, et un symbole
  de la vérification. Alternative à proposer au propriétaire : un livre à lunettes (mais il est « le livre », juge et
  partie).
- **Figurants** : silhouettes anonymes tirées de `Stick` (visage simple, sans nom). **L'auteur du livre n'est jamais
  dessiné** : son nom n'existe que sur la carte du livre et dans la bouche du narrateur (« مارك مانسون بيقول… »).
- Code : `who` ∈ `CastId` ; `lint` refuse un nom de `content/books/*.yaml` (auteurs) dans un champ de dessin, une étiquette
  ou une bulle attribuée à un personnage ; les décors n'ont pas d'objet à logo.

### 5.2 Le rig SVG articulé

```
<Rig who="nour" x y scale facing pose emotion intensity viseme energy blink gaze armF armB held />
 ├─ Body          tronc, cou (segments et contour à double tracé repris de Stick : trait d'encre + remplissage)
 ├─ Clothes       calques avant/arrière, garde-robe par épisode (axe de variation, cast.yaml)
 ├─ Limb ×4       2 segments ; bras : angles de pose OU cinématique inverse `reach()` (point du monde à atteindre)
 └─ Head
     ├─ HairBack · HeadShape · HairFront
     ├─ Eyes      paupière 0..1 (clignement), pupille décalée (regard vers `to`)
     ├─ Brows     angle intérieur/extérieur + hauteur, par émotion × intensité
     └─ Mouth     paramétrique : { width, open, round, teeth, tongue, cornerLift }
```

- **Bouche paramétrique** plutôt que 9 dessins figés : chaque visème Rhubarb donne `width/open/round/teeth/tongue`, l'émotion
  donne `cornerLift` (sourire, moue) ; les deux se composent, l'interpolation entre deux visèmes est triviale (2 images
  de transition) et la bouche « parle en souriant ». Table de départ :

| Visème | Son (Rhubarb) | width | open | round | teeth |
|---|---|---|---|---|---|
| A | P B M (pressée) | 0.55 | 0 | 0 | non |
| B | K S T, « i » | 0.70 | 0.15 | 0 | oui |
| C | « è », « a » court | 0.65 | 0.45 | 0.1 | oui |
| D | « aa » | 0.60 | 0.85 | 0.1 | oui |
| E | « o » ouvert | 0.50 | 0.45 | 0.5 | non |
| F | « ou », W | 0.35 | 0.25 | 0.9 | non |
| G | F V | 0.60 | 0.12 | 0 | haut sur lèvre |
| H | L long | 0.60 | 0.50 | 0.1 | langue |
| X | repos | 0.55 | 0 | 0 | non (détendue) |

- **Clignement** : calendrier déterministe tiré de la graine de l'épisode (toutes les 2 à 6 s, 4 images, double
  clignement 1 fois sur 6), suspendu sur un pic `surprised`.
- **Émotions** (10) : chacune est un jeu de paramètres (sourcils, paupières, coins de bouche, inclinaison de tête, épaules)
  multiplié par `intensity` ; les 12 visages de `FaceMarks` (Sahib.tsx) servent de référence de dessin.
- **Bras** : poses nommées (`POSES`, `mix`, `walk` de Lens.tsx) pour les gestes, `reach()` de Sahib.tsx pour une main qui
  prend un téléphone ou montre l'écran ; `gestures.ts` traduit `Line.gesture` en clés de pose dans le temps.
- **À l'écoute** : un personnage qui ne parle pas regarde celui qui parle, cligne, réagit (petit hochement, émotion
  « résiduelle » à 30 %) : sans quoi une scène à deux paraît figée.

### 5.3 Dessiner sans IA

La session écrit les tracés SVG à la main en TSX (comme `Stick`), paramétrés ; `CastSheet` (composition Remotion fixe)
rend une planche par personnage : 10 émotions × 9 visèmes, 6 poses, 3 tenues. Le propriétaire valide l'apparence **une fois**
sur ces planches (porte « cast », hors des deux validations par épisode). Taille de tête : 1,6 fois celle de `Stick` en
plan moyen, sinon la bouche ne se lit pas en 1080×1920 sur un téléphone (à vérifier sur la planche).

### 5.4 Repris de `Stick` (quran-themes-demo, `video/src/trial/Sahib.tsx`)

`reach()` (cinématique inverse à deux segments, 10 lignes), `SEG` (proportions), le double tracé du contour, `POSES`, `mix`
et `walk` (Lens.tsx), les accessoires tenus (`heldF`). Copiés dans `packages/characters/` avec l'en-tête
`// vendored from quran-themes-demo@<sha> video/src/trial/Sahib.tsx` et listés dans `VENDORED.md`. **Pas repris** : les
scènes `*Played` (chorégraphie à la main, l'opposé d'un style piloté par le JSON) ni les visages figés comme bouches.

## 6. Voix en arabe égyptien

### 6.1 Option principale : Gemini 3.8 Flash TTS, compte Google de la chaîne

- **Décision du propriétaire (2026-11-22)** : la chaîne a son propre compte Google, donc son projet et sa clé
  (`GEMINI_API_KEY`, secret du nouveau dépôt, lu par `voice.yml` seulement) et son propre palier gratuit. Ce quota ne sert
  jamais à compléter celui de quran-themes-demo, et inversement (règle écrite dans les deux CLAUDE.md).
- **Ce que la documentation dit aujourd'hui** (lue le 2026-11-22) : l'« arabe égyptien » est dans la liste des langues de
  `gemini-3.8-flash-tts` ; multi-locuteurs **jusqu'à 2 voix préfabriquées par requête**
  (`speech_config: {speakers: [{speaker, voice}, …]}`), chaque réplique est un élément avec une annotation
  `speech_metadata` qui porte `speaker` **et `style`** (donc une émotion par réplique) ; balises vocales en anglais dans un
  texte non anglais (`<sigh>`, `<laugh>`, `<short pause>`, `<whispering>`…). Les limites de requêtes du palier gratuit ne
  sont **pas** dans la page : **10/jour à vérifier** sur la console du projet ; les limites sont par projet et varient par
  modèle (documentation des limites).
- **Plan de requêtes** (`bvs voice plan`, sans réseau) : les répliques sont réparties en groupes d'au plus 2 locuteurs ;
  avec 3 voix il faut **2 requêtes** : `R1` = Nour + Karim (scènes et hooks joués), `R2` = ʿAdasa (hooks dits, livre, verdict,
  à retenir, partage). Émotion → `style` en anglais (`voice/emotions.yaml` : `anxious` × 0,8 → « anxious, speaking fast,
  short breaths »), plus `delivery` s'il existe. Une reprise regroupe **toutes** les corrections d'un groupe en une requête
  (patron `narration-takes`).
- **Contrôles machine d'une prise** (jamais un jugement de qualité, seulement des refus) : chaque réplique retrouvée par
  l'alignement (`heard ≥ 0,6`, patron `align.py`) ; durée de chaque réplique à ± 40 % de l'estimation ; **hauteur médiane
  (F0) de chaque réplique dans la plage de son personnage** (`audio/pitch.py`, autocorrélation numpy, plages mesurées sur la
  prise de casting) : attrape une réplique dite avec la mauvaise voix dans une prise à deux voix.
- **Choix des voix** : pas `Algieba` pour le narrateur, à mon avis : c'est la voix des vidéos de quran-themes-demo ; la
  même voix dirait des épisodes religieux et des avis sur des livres de développement personnel, sur des chaînes
  distinctes (confusion de marque, et risque d'image pour la chaîne religieuse). Au propriétaire de trancher.
  **Casting** : 3 requêtes multi-locuteurs de 2 voix candidates chacune (~20 s, mêmes répliques émues) = 6 voix écoutées.

### 6.2 Budget de requêtes

| Poste | Requêtes |
|---|---|
| Épisode nominal (R1 + R2) | 2 |
| Reprises, moyenne attendue (à mesurer sur les 10 premiers) | 0,5 à 1 |
| **Épisode moyen** | **~3** |
| Version d'une autre langue (plus tard) | +2 à 3 par langue |
| Casting (une fois) | 3 à 4 |

**À un épisode par jour** : ~3 requêtes sur 10 ; `advance` garde une réserve de 3 pour les reprises du jour et refuse
de lancer une nouvelle prise si `utilisées + nécessaires > 10 − 3`. Débit maximal soutenable : ~2 épisodes/jour en une
langue, ou 1 épisode en 2 langues. **Grand livre du quota** : `state/quota/gemini-tts.json` (jour en heure du Pacifique, où
le compteur se remet à zéro d'après quran-themes-demo, à vérifier), chaque requête inscrite **avant** l'envoi (`pending`)
puis `ok`/`failed` : une panne au milieu ne fait jamais dépenser deux fois sans le savoir. Garde-fous repris de
`tools/tts/gemini.py` : `--max-requests`, aucune nouvelle tentative si l'erreur dit « per day », prise sauvée en artefact
avant toute autre étape.

### 6.3 Licence et conditions (pas un avis juridique)

Conditions de l'API Gemini lues le 2026-11-22 : Google « won't claim ownership » du contenu généré, l'utilisateur en est
responsable ; service « for professional or business purposes » ; 18 ans ; pour l'EEE, la Suisse et le Royaume-Uni, les
règles de données du service payant s'appliquent aussi au quota gratuit ; la clause « only Paid Services when making API
Clients available to users in the EEA » vise une application offerte à des utilisateurs, pas une chaîne qui publie des
vidéos (à vérifier). Rien n'interdit la publication de l'audio monétisé, rien ne l'autorise explicitement non plus.
**Règle reprise** : « voix générée par IA » dans chaque description.

### 6.4 Replis, dans l'ordre

1. **Quota épuisé ou panne** : on attend ; c'est le tampon de 7 épisodes prêts (§8.5) qui protège le calendrier, pas une
   autre voix.
2. **Multi-locuteurs décevant** (voix qui se ressemblent, émotion plate) : une requête par personnage (3 par épisode, ~4 avec
   reprises : tient encore à 1/jour).
3. **Mode « mimé »** : scènes à bulles sans voix, seul le narrateur parle (1 à 2 requêtes, aucune synchro labiale). Ce n'est
   pas une dégradation honteuse : la chaîne « STICK TO IT » analysée dans quran-themes-demo fait ses 2,6 M de vues **sans
   un mot**. C'est aussi un axe de variation.
4. **Voix humaine** : si le propriétaire (ou un proche) parle égyptien, un narrateur enregistré au téléphone (40 s) serait
   le meilleur argument d'authenticité pour YouTube. À lui demander, je ne le suppose pas.
5. **Azure Speech, palier gratuit** (voix `ar-EG` Salma et Shakir) : secours d'urgence à écouter, (à vérifier : existence du
   palier gratuit, carte bancaire exigée à l'inscription, styles d'émotion absents pour `ar-EG`, conditions d'usage commercial).
6. **Écartés** : Chatterbox Multilingual (MIT, jugé « trop rapide/mécanique » et lent sur CPU le 2026-11-11), Supertonic 3
   (« très mauvais ») ; XTTS-v2, F5-TTS, Fish Speech, MMS (poids non commerciaux) ; Edge-TTS (point d'accès non officiel).

### 6.5 Ce qui dirait « la qualité ne suffit pas »

Seulement l'oreille du propriétaire (quran-themes-demo l'a appris : une voix « très mauvaise » se transcrivait sans faute).
Test : la première scène du pilote dite par R1, écoutée **sans l'image**, avec 3 questions à choix : « l'accent est-il
égyptien ? », « distingue-t-on Nour de Karim les yeux fermés ? », « entend-on l'émotion de chaque réplique ? ». Deux « non »
à la même question sur deux prises → repli 2 (une voix par requête), puis 3. Un « pas égyptien » sur les deux prises →
la voix principale ne convient pas : on arrête et on lui présente 4 et 5.

## 7. Synchro labiale

### 7.1 Trois méthodes, une seule sortie

1. **Rhubarb 1.13.0, `-r phonetic`** (documenté « language-independent », pour les enregistrements non anglais ; moins précis
   que le mode anglais) : `rhubarb -r phonetic -f json --extendedShapes GHX -o <turn>.json <turn>.wav`, **par réplique**
   (la prise à deux voix est découpée aux temps de l'alignement : chaque réplique a un seul locuteur, connu du script).
   Binaire Linux de la release GitHub (87 Mo, téléchargeable d'après le brief), mis en cache Actions, jamais commité.
2. **Volume** (repli exigé) : RMS par image (fenêtre 1/30 s), normalisé par personnage (95ᵉ centile), hystérésis, 4 niveaux
   → X / B / C / D (patron de `Character.tsx`, 2 niveaux là-bas).
3. **Texte → visèmes** (ma proposition en plus) : on connaît le texte et le temps de chaque mot (faster-whisper,
   `words_of`) ; chaque lettre arabe a son visème (ب م → A ; ف → G ; و ُ → F ; ا آ ى → D ; ي ِ → B ; ل → H ; ع ح خ ه → C ;
   autres consonnes → B), répartie dans le mot au prorata (comme `screens.py` de quran-reels), puis **modulée par le
   volume réel** (ouverture × énergie). Sans voyelles écrites en égyptien, l'ouverture vient surtout du volume.

### 7.2 Comment on décide

- **Mesures sans humain** sur toutes les répliques du pilote : (a) **fermeture labiale** : part des ب/م/ف de l'alignement où
  la bouche est A ou G à ± 60 ms ; (b) **repos** : part des pauses > 150 ms où la bouche est X ; (c) **battement** : changements
  par seconde entre 4 et 12 (en dessous : figé ; au-dessus : tremblé) ; (d) **corrélation** ouverture/volume.
- **L'œil du propriétaire** : une vidéo de 8 s avec les trois bouches côte à côte, **étiquettes cachées**, ordre tiré d'une
  graine révélée après son choix. La méthode retenue va dans `config/lipsync.yaml` par langue ; les mesures restent pour
  surveiller la dérive. Hypothèse (à vérifier) : 3 l'emporte en arabe, Rhubarb phonétique étant entraîné sur des sons anglais.

### 7.3 Données passées au rendu (`build/<id>/timeline.json`, extrait)

```json
{
  "fps": 30,
  "mouths": {
    "nour": {
      "method": "text_visemes",
      "cues": [{ "t": 3.20, "v": "X" }, { "t": 3.27, "v": "B" }, { "t": 3.36, "v": "D" }, { "t": 3.51, "v": "A" }],
      "energy": { "from": 3.20, "step": 0.0333, "values": [0.0, 0.31, 0.72, 0.65, 0.12] }
    }
  }
}
```

`cues` : forme par instant ; `energy` : volume par image (0..1) pour l'ouverture. Le rig fait `forme(cue) × energy`, lissé
sur 2 images. Une piste vide = bouche au repos (X), qui ne casse rien.

## 8. Pipeline

### 8.1 Étapes

| # | Étape | Commande | Où | Entrées de l'empreinte | Sortie | Porte |
|---|---|---|---|---|---|---|
| 0 | Idée | `bvs ideas rank` · `bvs sources probe <doi>` | session | backlog, DOI candidats | idée notée (portée, preuves) | — |
| 1 | Script | `bvs new <id>` puis `bvs lint <id>` | session (2 sous-agents : auteur, contradicteur) | episode.json, policy, wording | rapport de lint | — |
| 2 | Feuilles | `bvs review script <id>` · `bvs render <id> --draft` | session · Actions | champs du script | `review/<id>/script.md`, animatique muette 540p filigranée | **1 : script** |
| 3 | Sources | `bvs sources verify <id>` · `bvs review sources <id>` | Actions `sources.yml` | registre cité, DOI | `evidence/`, `report.json`, `review/<id>/sources.md` | **2 : sources** |
| 4 | Voix | `bvs voice plan <id>` · `bvs voice take <id>` | Actions `voice.yml` (secret) | répliques du groupe, voix, styles, modèle | `takes/<sha12>.flac` (release) | quota |
| 5 | Alignement | `bvs align <id>` | Actions | prise, texte | temps par réplique et par mot, `heard`, F0, niveau −16 LUFS | — |
| 6 | Synchro | `bvs lipsync <id>` | Actions | prise découpée, méthode, version Rhubarb | pistes de bouche | — |
| 7 | Variation | `bvs vary <id>` | Actions | id, `pin/avoid`, registre de variation | `state/variation/<id>.lock.json` | — |
| 8 | Minutage | `bvs timeline <id>` | Actions | 5 + 6 + 7 + épisode | `timeline.json` (les props du rendu) | — |
| 9 | Rendu | `bvs render <id> --style s --ratio 9:16` | Actions `render.yml` (matrice) | timeline, version du style, paquets, polices, Remotion | `<id>.<style>.<sha12>.mp4` + couverture (release `ep-<id>`) | — |
| 10 | Contrôle | `bvs check <id>` | Actions | MP4, timeline | planches JPEG, `check.json` | **3 : vidéo** (10 premiers) |
| — | Tableau | `bvs status` · `bvs advance` | Actions `advance.yml` | tout | `state/status.json` → `docs/board.html` | — |

Contradiction franche sur l'ordre du brief (script, **puis** sources) : écrire un script dont le verdict peut se renverser à
la vérification gâche une validation du propriétaire. Je garde les deux portes dans cet ordre, mais j'ajoute l'étape 0
(**sondage des preuves avant d'écrire**) : une idée n'entre en script que si ses DOI candidats passent `sources probe`
(existence, type, rétractation) et si une méta-analyse ou une revue au moins existe.

### 8.2 Idempotence et cache adressé par contenu (`pipeline/bvs/cas.py`)

- `clé = sha256(JSON canonique {étape, version_étape, entrées: [sha256 de fichier | valeur d'un pointeur JSON], outils:
  {remotion, rhubarb, modèle whisper@révision, ffmpeg}})`. **Seuls les champs qui changent la sortie** entrent dans la clé :
  corriger un sous-titre anglais ne refait pas la voix ; changer une émotion de Karim refait `R1`, pas `R2`.
- Sortie écrite dans un dossier temporaire puis renommée (`build/<id>/<étape>/<clé12>/`), pointeur `build/<id>/<étape>.json`.
  Relancer une étape à jour ne fait rien et le dit. Persistance : cache Actions (clé = la clé de l'étape) pour le
  calculable ; **releases** pour le précieux (prises, rendus), dont les noms portent la clé : avant de travailler, l'étape
  regarde si l'actif existe déjà (`gh release view`), donc un run relancé après une panne reprend où il était.
- Versions qui changent la sortie, épinglées : `remotion` et `@remotion/*` (même version partout), le navigateur,
  `faster-whisper` et la révision du modèle, Rhubarb, ffmpeg statique (`imageio-ffmpeg==0.8.1`, sans apt, leçon de
  quran-reels) ; une montée de version change les clés, donc les rendus suivants sont refaits exprès.

### 8.3 Portes humaines, depuis le téléphone

1. **Dans la conversation** (cas normal) : la session envoie la feuille (`review/<id>/script.md` en texte, l'animatique en
   lien) et pose une question à choix qui **nomme l'épisode et l'empreinte courte** (« Je valide le script de `habits-21`
   (a1b2c3d4) ») ; sur sa réponse, `bvs validate script habits-21 --words "<ses mots>"`.
2. **Sans session** : une issue par épisode « Épisode habits-21 — à valider » (feuilles en commentaire, liens MP4) ; il commente
   `/valide script a1b2c3d4` ; `gate.yml` vérifie l'auteur (propriétaire), que l'empreinte est **la courante**, écrit la
   validation avec `proof` = lien du commentaire, ouvre la PR. **Garde-fou** : les outils GitHub d'une session agissent sous
   son compte et passeraient ce contrôle ; le CLAUDE.md interdit à toute session de poster `/valide` (comme `/publier` dans
   quran-reels).
3. **Par lot** (recommandé à 1/jour) : le dimanche, 7 scripts et 7 dossiers de sources ; `board.html` (lien fixe, lecture de
   `state/status.json`) dit ce qui l'attend. Une validation par jour n'est pas tenable des mois ; une séance par semaine, oui.

### 8.4 Ce qui bloque le rendu final

Schéma invalide · erreur de `lint` · validation `script` ou `sources` absente ou d'empreinte périmée · une source non
`verified` (rapport absent, ou plus vieux que 30 jours : refait, la rétractation se relit au rendu) · une réplique sans prise
ou `heard < 0,6` · une F0 hors plage · verrou de variation absent · traduction périmée pour la langue rendue. Le **brouillon**
(`--draft`) passe sans tout cela, avec un filigrane « مسودة — غير معتمدة » et `draft: true` dans les métadonnées du MP4 :
l'étape de publication future refusera tout fichier `draft`.

### 8.5 File, reprise après panne, budget

- **File** : `content/queue.yaml` = ordre des épisodes ; `advance` (chaque nuit et à la demande) calcule le statut de
  chacun, fait l'étape machine suivante dans les budgets (voix ≤ 7 requêtes/jour hors réserve, ≤ 60 min de rendu/run),
  s'arrête aux portes, alerte par une issue quand le **tampon d'épisodes prêts passe sous 7** (même patron que le stock de
  vidéos thématiques).
- **Reprise** : le statut se recalcule depuis les fichiers et les releases ; chaque étape est idempotente ; l'état machine
  passe par `save-state.sh` ; `concurrency: group: kk-<étape>-<id>` sans annulation (une annulation perdait des prises
  comptées dans quran-themes-demo).
- **Lancement** : le cron GitHub n'a pas été fiable sur quran-reels (6 à 8 h de retard) ; ici l'heure exacte compte peu
  (on fabrique d'avance) : cron GitHub nocturne **plus** un témoin « jamais tenté » dans `advance` ; tâche planifiée Claude
  seulement pour les étapes d'écriture (scripts), qui demandent une session.

| Coût par épisode (estimations, à mesurer) | |
|---|---|
| Gemini TTS | ~3 requêtes sur 10/jour |
| Crossref | 5 à 15 requêtes (gratuit, sans clé) |
| OpenAlex | 5 à 15 lectures par DOI (clé gratuite : le budget sans clé est partagé par IP et était **épuisé** dans la session aujourd'hui ; lectures par identifiant annoncées gratuites, à vérifier) |
| GitHub Actions | ~15 min (1 style) à ~35 min (3 styles), gratuit pour un dépôt public |
| Session Claude | écriture + contradiction + relecture des DOI (abonnement existant, pas de dépense nouvelle) |
| Propriétaire | ~5 min par épisode, en lot |

## 9. Vérification des sources

### 9.1 Algorithme (`bvs sources verify`, chaque DOI du registre cité)

1. **DOI** : minuscules, retirer `https://doi.org/`, `doi:`, espaces ; doit matcher `^10\.\d{4,9}/\S+$`.
2. **Crossref** `GET api.crossref.org/works/{doi}` (User-Agent générique ; le `mailto` du « polite pool » sera l'adresse de la
   chaîne si le propriétaire le veut) ; 3 essais avec attente sur 5xx, délai ou réponse non JSON (constaté aujourd'hui :
   `10.1037/xge0000108` a échoué une fois puis répondu) ; 404 → **bloque** (`not_found`).
3. **OpenAlex** `GET api.openalex.org/works/doi:{doi}` avec la clé du projet (`OPENALEX_API_KEY`, gratuite) : `is_retracted`,
   `type`, `publication_date`, `authorships`, `abstract_inverted_index`. Indisponible → la vérification continue sur
   Crossref seul, avec un avertissement.
4. **Titre** : normaliser les deux côtés (retirer les balises HTML/JATS, constaté : `<i>P</i>-Curving…` de Cuddy 2018 ;
   NFKC ; minuscules ; accents retirés ; ponctuation → espace ; espaces réduits). Candidats : `title[0]`, `title + ": " +
   subtitle`, `short-title`, `original-title`, `display_name` d'OpenAlex. Score = max du `token_set_ratio` (rapidfuzz, MIT).
   **≥ 92 : concorde** ; le titre déclaré est un préfixe couvrant ≥ 60 % des mots du titre officiel (sous-titre omis) :
   concorde ; **80-92 : à vérifier** (bloque sauf validation explicite de cette source) ; **< 80 : bloque**.
5. **Auteurs** : noms de famille normalisés (accents, tirets, particules « van », « de », « al- ») ; le **premier auteur**
   déclaré doit être le premier de Crossref (ou d'OpenAlex) : sinon **bloque** ; si d'autres sont déclarés, ≥ 80 % doivent être
   dans la liste (réplication à 64 auteurs : seul le premier est exigé).
6. **Année** : candidates = `issued`, `published-print`, `published-online`, `publication_year` d'OpenAlex ; l'année déclarée
   doit être l'une d'elles **ou à ± 1 de l'une d'elles** (mise en ligne anticipée ; constaté : Lally et al. « 2010 » a
   `issued` 2009-07-16 ; Aldao et al. « 2010 » est daté 2009-11-21 dans OpenAlex). Sinon **bloque**.
7. **Type** : Crossref `type` ∈ {`journal-article`, `proceedings-article`, `book-chapter`, `report`} ; `posted-content` =
   préprint : accepté seulement en `design: preprint`, jamais pour `high`. **Niveau détecté** : `meta_analysis` si titre ou
   résumé matche `/meta-?analy/` ; `systematic_review` si `/systematic review/` ; `review` si OpenAlex `type = review`
   (constaté pour Aldao 2010) ; `multilab_replication` si `/multi-?lab|registered replication/` ; `rct` si `/randomi[sz]ed/` ;
   sinon primaire. **Un niveau déclaré au-dessus du niveau détecté bloque** (on ne déclare pas une méta-analyse pour une
   étude unique), sauf note signée du propriétaire.
8. **Rétractations et corrections** : Crossref `updated-by[]` (constaté en direct : Wakefield 1998 porte `retraction` et
   `correction`, `source: retraction-watch`) : `retraction`, `withdrawal`, `removal`, `expression_of_concern` → **bloque** ;
   `correction`, `erratum`, `addendum` → **avertissement qui exige de lire la correction** (constaté : Mauss et al. 2011, source
   probable du pilote, a une `correction`). Recoupement : `GET /works?filter=updates:{doi}` (avis qui pointent vers l'étude)
   et `is_retracted` d'OpenAlex. Une seule des trois qui dit « rétractée » suffit à bloquer.
9. **Phrase d'appui** : texte du résumé = Crossref `abstract` (JATS → texte) sinon OpenAlex (index inversé → texte) sinon
   Europe PMC (à vérifier : joignable depuis la session et Actions). Chaque `claims[].support.quote` (≤ 40 mots, anglais,
   jamais affichée) doit s'y retrouver **mot pour mot** après normalisation des espaces, guillemets et tirets (tolérance :
   ratio ≥ 97 pour les coupures de mots). Trouvée : `supported_by_abstract`. Résumé introuvable (constaté : Aldao 2010 n'a pas de
   résumé dans OpenAlex) ou `where: fulltext` : **`needs_human_support`**, qui bloque sauf mention explicite de cette source
   dans la validation des sources.
10. **Taille d'effet** : une valeur déclarée (`d = 0.13`, `66 days`) doit apparaître dans la phrase d'appui ou le résumé ; sinon
    `where: fulltext` + `page` et la même exigence humaine qu'au point 9.
11. **Informations sans effet de blocage** : citations (`is-referenced-by-count`), âge de l'étude, revue.

### 9.2 Rapport et preuve

- `evidence/<doi-slug>/crossref-<date>.json.gz`, `openalex-<date>.json.gz` : réponses brutes ; `report.json` : chaque champ
  comparé, les scores, les décisions, la version de l'algorithme, l'empreinte des réponses brutes. Commités (petits,
  métadonnées CC0) : on peut prouver dans un an ce qu'on avait vérifié et quand.
- `review/<id>/sources.md` : une carte par étude, lisible sur téléphone : lien DOI, type détecté, n ou k, effet, **la phrase
  d'appui surlignée dans le résumé**, corrections à lire, limites, ✓/⚠/✗ par contrôle.
- `nightly.yml` refait les contrôles 8 de tout le registre cité (épisodes en file **et publiés**) : une rétractation après
  publication ouvre une issue avec l'épisode concerné.

### 9.3 Qu'une vraie étude ne soit pas citée pour ce qu'elle ne dit pas

Le DOI prouve l'existence, pas le sens. Défenses, de la plus mécanique à la plus humaine : (1) la phrase d'appui retrouvée
mot pour mot dans le résumé (une affirmation sans appui ne passe pas) ; (2) les chiffres à l'écran viennent du registre,
jamais du texte libre (`lint` refuse un nombre dans `verdict.why` ou une réplique du narrateur qui n'est ni dans `n`, ni
dans `k`, ni dans `effect`) ; (3) `population` obligatoire et montrée sur la carte (« 96 متطوع في بريطانيا ») : le
contradicteur relève toute généralisation (« الناس كلها ») au-delà ; (4) `limits` obligatoires, au moins une ; (5) le
**relecteur** (sous-agent distinct de l'auteur) refait lui-même chaque DOI et lit le résumé entier, comme le prévoit le
brief ; (6) le propriétaire valide le dossier. Ce qui reste hors d'atteinte : une étude bien résumée mais contredite par
une littérature que l'auteur n'a pas cherchée ; d'où l'exigence d'une méta-analyse ou revue au sondage (étape 0).

**Lecture provisoire du pilote** (à refaire par le pipeline et le relecteur, je n'ai vérifié que l'existence et les
métadonnées) : Ford, Lam, John & Mauss 2018 (*JPSP*, `10.1037/pspp0000157` : laboratoire, journal, longitudinal) va dans
le sens de « accepter ses émotions négatives » ; Aldao et al. 2010 (méta-analyse, `10.1016/j.cpr.2009.11.004`) et Kohl et
al. 2012 (méta-analyse d'expériences, `10.1016/j.jbtep.2012.03.004`) pour l'acceptation face à l'évitement ; Mauss et al.
2011 (`10.1037/a0022010`, **avec une correction à lire**) sur « courir après le bonheur » ; mais Ford et al. 2015
(`10.1037/xge0000108`) trouve que cet effet **dépend de la culture** (constaté aux États-Unis, pas en Asie de l'Est d'après
le titre et ce que j'en sais, à vérifier) : aucune donnée égyptienne. Verdict attendu : **⚠️ nuancé**, confiance moyenne,
« pour qui » = la culture. C'est un bon pilote **à condition** de dire cette nuance ; s'il faut un verdict net, voir §15.

## 10. Droit d'auteur et sujets sensibles : règles vérifiées par le code

| Règle | Contrôle (`lint/copyright.py`, `lint/sensitive.py`) |
|---|---|
| Idée reformulée | `book.idea` et toute réplique : refus de guillemets (« » " " ‹ › « ») autour d'un texte attribué au livre |
| Citation directe rare et courte | `book.quote` facultatif : ≤ 12 mots, ≤ 1 par épisode, `page` obligatoire ; plus de 2 épisodes d'un même livre avec citation → refus (droit de citation français : « courte » et à but critique, à vérifier pour une chaîne monétisée) |
| Pas de couverture | aucun champ d'image pour le livre dans le schéma ; `assets/` refusé s'il contient un fichier nommé d'après un ISBN ou un titre de `books/` ; la carte du livre est typographique, l'icône dessinée par nous |
| Pas de résumé par chapitre | une idée par épisode (schéma) ; registre `books/<slug>.yaml` des idées traitées : > 3 épisodes d'un même livre en 30 jours → refus ; 3 épisodes qui suivent l'ordre des chapitres (`locus`) → avertissement |
| Auteur jamais dessiné | §5.1 : noms d'auteurs refusés dans les champs de dessin, de bulle, d'étiquette |
| Hommes / femmes | `sensitivity: gender` exige : badge ≠ ✅ sur une différence de groupe sans nuance de recouvrement (« الفروق متوسطات، مش قاعدة لكل واحد ») ; aucune réplique de personnage qui énonce une généralisation sans réponse du narrateur dans le même épisode ; **registre des rôles** : sur les épisodes `gender`, le personnage qui porte le stéréotype alterne entre Nour et Karim (refus s'il porte le même 2 fois de suite) |
| Santé mentale | `mental_health`/`health` : carte « مش نصيحة طبية » (couche commune), aucun conseil de traitement, ni diagnostic, ni posologie (mots refusés dans `wording.yaml`) |
| Partage plutôt qu'abonnement | `share` jamais « اشترك » (leçon des analyses de quran-themes-demo) : avertissement |

Le code voit la forme, pas le fond : le contradicteur, le relecteur et le propriétaire jugent ce qu'une règle ne sait pas
lire (une caricature, un sous-entendu). LIMITES.md le dit.

## 11. Anti « inauthentic content »

**Constat honnête d'abord** : depuis le 2025-07-15, YouTube appelle « inauthentic content » ce qui s'appelait « repetitious
content » ; les exemples cités visent le contenu produit en masse, sur un gabarit répété « with little variation », facile à
copier à grande échelle ; c'est une règle de **monétisation**, pas d'interdiction. Faire varier la surface ne sauve pas une
vidéo creuse : ce qui protège d'abord, c'est un script écrit pour chaque idée, des sources vérifiées, deux validations
humaines, des personnages et des décors à nous, et une méthode expliquée publiquement (`docs/method.html`). La variation
ci-dessous évite en plus que 30 épisodes **se ressemblent à l'œil**.

### 11.1 Les axes

| Axe | Valeurs (pilote → plus tard) | Contrainte sur l'historique |
|---|---|---|
| Style | cartoon, typo, split → +whiteboard, infographic, papercut | jamais le même 2 fois de suite ; aucun > 40 % des 10 derniers |
| Forme de scène | replay_twice, escalation, inner_voice, argument, before_after | pas répétée dans les 3 derniers |
| Hook rendu | l'un des 5 de l'épisode | type pas répété dans les 3 derniers |
| Ordre des temps | classique (hook, scène, livre, verdict, retenir) ; « verdict d'abord » (le badge caché au hook) ; « quiz » (le spectateur parie avant le badge) | « classique » ≤ 60 % des 10 derniers |
| Cadrage | plans permis par le style (push lent, panoramique, coupe serrée, contre-champ…) | aucune image immobile > 6 s (leçon de rétention et « image statique » de Facebook) |
| Palette | 12 palettes à contraste vérifié (WCAG AA sur le texte) | pas dans les 4 derniers |
| Polices | 6 paires OFL arabe + latin (Cairo, Tajawal, Readex Pro, El Messiri, Changa, Baloo Bhaijaan 2 + Inter/Lora) | pas dans les 3 derniers |
| Décor | le `place` vient du script ; la variation choisit heure, lumière, angle | — |
| Tenues | 3 par personnage | — |
| Son | rien / nappe CC0 / musique générée par code (graine : tonalité, tempo, timbre) | pas la même ambiance 2 fois de suite |
| Bruitages | 3 jeux de sons générés (patron `sfx.py`) | — |
| Sous-titres | mot qui saute / karaoké / ligne entière | — |
| Couverture | 4 mises en page | pas dans les 2 derniers |

**Musique** : décision du propriétaire. Je recommande **de la musique générée par code** (accords et pulsation tirés de la
graine, numpy, comme `sfx.py`) : aucun risque Content ID ni Rights Manager, à juger à l'oreille (risque : sonner « jouet »).
Sinon des pistes CC0 avec la preuve de licence dans `assets/music/<piste>.license.json`. Jamais de musique « libre » des
plateformes de stock sans preuve (des pistes y sont enregistrées dans Content ID, à vérifier au cas par cas).

### 11.2 Le tirage, déterministe et tracé (`packages/core/variation/`)

1. Graine = `sha256(id d'épisode + "v" + version du moteur)`, générateur `xoshiro128**` (pur TS, testable).
2. Vecteur de choix sur les axes, en respectant `pin` et `avoid` de l'épisode et ce que le style permet (`axes`).
3. **Distance** à chacun des 7 derniers épisodes du registre (`state/variation-ledger.json`) : nombre d'axes différents,
   **≥ 7 des 13 axes** exigé, plus les contraintes du tableau. Rejet et nouveau tirage (même suite pseudo-aléatoire) jusqu'à 1 000
   fois ; impossible → les contraintes les plus faibles sont relâchées une à une, **et c'est écrit**.
4. Sortie `state/variation/<id>.lock.json` : graine, version du moteur, choix, distances obtenues, contraintes relâchées,
   empreinte du registre lu. Un rendu relancé relit le verrou (même vidéo, toujours) ; `bvs vary --redraw <id>` seulement sur
   demande.
5. `bvs variation report` : tableau des 30 derniers épisodes par axe, pour la revue (et pour montrer, si YouTube demandait,
   que la chaîne n'est pas un gabarit).

## 12. Rendu

### 12.1 Le moteur : Remotion, Revideo ou Motion Canvas

| | Remotion | Revideo | Motion Canvas |
|---|---|---|---|
| Licence | propre, non OSI : gratuite pour un particulier, une entreprise de ≤ 3 personnes, une association ; usage commercial permis ; les conditions récentes permettent l'automatisation aux utilisateurs gratuits (les sources divergent, à relire dans le LICENSE.md de la version épinglée) | **MIT** (vérifié sur GitHub) | MIT |
| Rendu sans interface (CI) | oui (`remotion render`, `renderMedia`), éprouvé dans `film.yml` | oui (`renderVideo()`, rendu parallèle) | pas d'outil officiel sans éditeur (c'est la raison d'être de Revideo, à vérifier pour sa dernière version) |
| Modèle | React : composant = fonction de l'image | générateurs impératifs (`yield*`), JSX propre (pas React) | idem Revideo |
| Ce que le propriétaire a | ~10 000 lignes Remotion 4.0.541, `Stick`, skills `release-render`, `film.yml`, `check.py`, `splice.py` | rien | rien |
| Communauté, maintien | grande, entreprise dédiée | plus petite (~3 000 téléchargements/semaine selon un guide tiers), liée à une entreprise (Midrender) ; activité récente à vérifier | plus grande que Revideo, orientée éditeur |

**Je tranche : Remotion**, épinglé à la version de quran-themes-demo. Raisons : tout ce qui est réutilisable (rig, réglages,
workflow, contrôles, raccords) est en Remotion ; le modèle « composant = fonction du temps » colle exactement à « un style
lit le même minutage », alors que les générateurs de Revideo sont faits pour une chorégraphie écrite à la main, ce que ce
projet veut justement éviter ; la licence couvre un particulier qui monétise. Le prix à payer : un moteur non libre. **Issue
de secours imposée** : styles, personnages et couche commune reçoivent `t` en props et n'importent jamais `remotion`
(règle ESLint en CI) ; seul `render-remotion/` le fait. Si la licence changeait ou si la chaîne devenait une société de
plus de 3 personnes (« Remotion for Creators » : 25 $/siège/mois d'après un résumé de ses conditions, à vérifier), un rendu de secours MIT tient en
~200 lignes : Chromium pas à pas (Playwright) → PNG → ffmpeg, le patron de `render/frames.py` de quran-reels, plus lent
(à mesurer). Je ne le construis pas dans le pilote.

### 12.2 Où, et combien de temps

- **GitHub Actions** (dépôt public : minutes gratuites ; runner `ubuntu-24.04`, 4 vCPU et 16 Go à vérifier), `render.yml` en
  matrice (`style × ratio`), `fail-fast: false`, une release brouillon par épisode (patron `film.yml` : `prepare → render →
  release`, `from_run` pour republier sans rendre).
- **La session** ne rend que des images fixes (`CastSheet`, `StyleLab` : un même instant dans les 3 styles) ; une vidéo entière
  seulement par exception, seule, rien de lourd à côté (leçon de quran-themes-demo).
- **Estimations pour 50 s (1 500 images à 30 i/s)**, à remplacer par `costHint` mesuré : `typo` ~6-8 i/s → 3-4 min ;
  `split` ~4-5 i/s → 5-6 min ; `cartoon` ~3-4 i/s → 6-8 min ; + ~3 min d'installation (npm et navigateur en cache). Les 3
  styles en parallèle : ~12 min de bout en bout. En production : 1 style par épisode (~10 min).

### 12.3 Contrôle sur planches (`pipeline/bvs/render/check.py`, adapté de quran-themes-demo)

Format (1080×1920, 30 i/s, H.264 sans B-frames, AAC 48 kHz, sans edit list : les options Instagram de quran-reels
appliquées dès le rendu), durée = minutage ± 1 image, **45-60 s**, son à −16 LUFS ± 1 et crête vraie ≤ −1 dBTP ; planche de 16
images (première, milieu de chaque temps, image du badge, dernière seconde) que la session **ouvre et regarde** ; **détecteur
d'image statique** (écart moyen absolu entre images espacées de 0,5 s, calculé sur chaque fenêtre de 6 s ; sous le seuil
→ échec ; quran-reels a constaté le signalement Facebook entre 0,44 et 2,90) ; journal de la couche commune (aucun texte
hors zone). Le contrôle ne juge ni la voix ni le jeu : l'œil et l'oreille du propriétaire.

## 13. Réutilisation

| Brique | D'où | Comment |
|---|---|---|
| `Stick`, `reach`, `SEG`, contour, `POSES`/`mix`/`walk` | quran-themes-demo `Sahib.tsx`, `Lens.tsx` | copie + généralisation → `packages/characters/rig/` |
| Visages `FaceMarks` | `Sahib.tsx` | référence de dessin des 10 émotions (réécrits en paramètres) |
| Bouche au volume | `video/src/characters/Character.tsx` | patron → `lipsync/rms.py` + rig |
| Interface de style | ancien `video/src/styles/kit.ts` (`StyleKit`, « ce qui ne change jamais ») | patron → `StyleModule`, `overlay/` |
| Données → composition | `Trial.tsx` (`calculateMetadata`, JSON en props), `formats.ts`, `fonts.ts` | patron |
| Voix Gemini | `tools/tts/gemini.py`, `voice-test.yml` | copie + généralisation : multi-locuteurs, styles par réplique, grand livre du quota |
| Alignement | `tools/audio/align.py`, `listen.py` | copie, langue et normalisation en paramètres, `word_times()` ; garder `LOUDER_FLOORS`, `holder`, `before_its_word` |
| Niveau, pauses | `tools/audio/build.py` (`loudness`, `level`, `tighten`) ; quran-reels `render/video.py` (`level` à gain unique) | copie (≈ 120 lignes) |
| Bruitages, ambiance | `tools/trial/sfx.py`, `ambience.py` | copie ; « jamais sous un verset » → « jamais sous une réplique » |
| Contrôle, raccord | `tools/trial/check.py`, `splice.py` | copie, `moments()` adapté au minutage |
| Règles et leur test | `tools/trial/rules.py`, `tests/test_trial_rules.py` | **patron seulement** (« copie et casse une chose ») |
| Rendu en CI | `.github/workflows/film.yml` | squelette (~150 lignes utiles) |
| Feuilles et galerie | `tools/trial/gallery.py`, `publish.py` | patron (feuilles Markdown, `board.html`) |
| État | quran-reels `save-state.sh` + `test_save_state.py` | **tel quel** |
| Secrets, alertes | quran-reels `gh_secrets.py`, `notify.Issues` | tel quel / patron |
| Texte bidirectionnel | quran-reels `bidi.py` | tel quel (descriptions) ; équivalent TS dans `core/bidi.ts` |
| Workflows | quran-reels : `constraints.txt`, ffmpeg statique sans apt, runners épinglés, secrets par étape, cache `if: always()` | patron |
| Publication | quran-reels `publishers/` | plus tard (§14), copie généralisée |

**Méthode** : copier (« vendoriser ») avec l'en-tête `vendored from <dépôt>@<sha> <chemin>` et une ligne par fichier dans
`VENDORED.md` (origine, ce qui a changé). Ni sous-module, ni monorepo, ni import d'un dépôt dans l'autre.

**Extraction des briques communes sans casser quran-reels** (reprise de l'audit, que je partage) : (1) pilote : rien
n'est extrait, quran-reels n'est pas touché ; (2) quand deux dépôts copient la même brique depuis 2 mois sans dérive
(candidates : `align`/`level`/`check` côté audio, `publishers/` côté publication), la promouvoir en paquet Python publié
comme roue sur une release GitHub, empreinte épinglée dans `constraints.txt` ; (3) quran-reels l'adopte seulement par PR,
une brique à la fois (`base`/`meta`/`rights`, puis `tiktok`, puis `youtube`), filet = ses 10 300 lignes de tests + un
`publish-test` en essai à blanc, et sur la parole du propriétaire (production). Les textes d'erreur lus par `notify.py`
et les champs de `published.json` ne changent jamais.

## 14. Publication future (hors pilote)

- **Branchement** : `pipeline/bvs/publish/` = copie généralisée des publishers de quran-reels sur un `Post` à 6 champs
  (vidéo, légende par plateforme, hashtags, couverture, titre, url) ; textes tirés de `episode.json` (+ `publish` par
  plateforme, validés mot pour mot) ; état `state/published.json` ; `concurrency: accounts` pour ce qui publie, et rien
  d'autre dedans. Ordre de risque : YouTube (API ouverte depuis le 2026-11-02 d'après quran-reels), Facebook, Instagram (le
  plus fragile), TikTok (brouillon).
- **Le hook par plateforme** : les 5 hooks sont déjà dits ; Facebook/Instagram (où l'on part en 4-8 s) reçoivent le hook
  le plus court, YouTube celui que les mesures désignent ; c'est l'expérience la moins chère qui soit.
- **Déclarations** : « voix générée par IA » dans chaque description ; `containsSyntheticMedia` : YouTube n'exige la
  déclaration que pour un contenu réaliste, ce qui n'est pas le cas d'un dessin animé (à vérifier au lancement).
- **Comptes à créer** : compte Google de la chaîne (décidé) → chaîne YouTube, projet Google Cloud (Gemini TTS, YouTube Data
  et Analytics), écran de consentement « en production » ; compte OpenAlex (clé gratuite) ; **nouvelle** Page Facebook +
  Instagram Créateur + **nouvelle** app Meta (budget d'appels séparé de la Page Quran, passée en Live) ; compte TikTok + app
  Sandbox (préfixe d'URL vérifié sur le Pages du nouveau dépôt) ; dépôt GitHub public (créé vide par le propriétaire),
  Pages, PAT fin pour la rotation du jeton TikTok. Secrets préfixés, **aucun secret de Quran Words Daily dans ce dépôt**.

## 15. Plan du pilote

| Étape | Ce qui est fait | Livré | Quota |
|---|---|---|---|
| P0 | Décisions du propriétaire par questions à choix : nom de chaîne et de dépôt, licences, narrateur (loupe ou autre), musique, voix d'Algieba ou non | décisions écrites dans CLAUDE.md du dépôt | — |
| P1 | Il crée le dépôt vide ; la session l'attache ; squelette : `schema` (zod + export), `bvs lint`, `cas.py`, `status`, tests « copie et casse », `validate.yml`, CLAUDE.md, LIMITES.md (premier jet) | PR 1 fusionnée, checks verts | — |
| P2 | **Dossier scientifique d'abord** : registre des 5-6 sources du pilote, `bvs sources verify`, rapport ; le relecteur refait chaque DOI | `review/pilot/sources.md`, `evidence/` | Crossref, OpenAlex (clé) |
| P2b | Si le verdict n'est pas solide : présenter 2 idées de rechange, DOI déjà vérifiés aujourd'hui (existence et métadonnées) : **« 21 jours pour une habitude »** (Lally et al., *EJSP*, `10.1002/ejsp.674` ; Singh et al. 2024, revue systématique et méta-analyse, `10.3390/healthcare12232488`) → ❌ attendu, très parlant ; **« la volonté est un muscle qui s'épuise »** (Hagger et al. 2016, réplication multi-labos préenregistrée, `10.1177/1745691616652873`) → ❌ ou ⚠️ | question à choix | — |
| P3 | Script : sous-agent auteur (5 hooks de types différents) + sous-agent contradicteur ; `lint` ; feuille | `episode.json`, `review/pilot/script.md` | — |
| G1 | **Porte 1** : « je valide le script » | `validations.script` | — |
| G2 | **Porte 2** : « je valide les sources » | `validations.sources` | — |
| P4 | Personnages : rig, 3 personnages, `CastSheet` | planches → validation de l'apparence | — |
| P5 | Voix : clé du nouveau projet en secret, casting (6 voix en 3 requêtes), puis R1 + R2 | MP3 à écouter (release), test des 3 questions | 3-4 puis 2-3 (2 jours) |
| P6 | Alignement, F0, niveau ; 3 méthodes de synchro + vidéo de comparaison à l'aveugle | `config/lipsync.yaml` choisi par lui | — |
| P7 | Styles `typo` (le moins cher) puis `split` puis `cartoon` ; `StyleLab` | une planche par style, validée | — |
| P8 | Variation : moteur, verrou du pilote (avec 3 styles forcés par `pin`, puisqu'on les compare) | `variation.lock.json` | — |
| P9 | Rendu Actions (matrice des 3 styles en 9:16), contrôle sur planches | 3 MP4 en release brouillon + planches | ~35 min Actions |
| G3 | **Porte 3** : il regarde les 3 vidéos | `validations.render` | — |
| P10 | LIMITES.md final, README, `VENDORED.md`, `board.html` | dépôt prêt à être public | — |

Ordre de grandeur : 6 à 9 jours de session, dont 2 contraints par le quota de voix ; 3 décisions et 3 portes du
propriétaire. **Ce qui n'est pas dans le pilote** : `advance` complet (seulement `status`), publication, traductions
(seuls les sous-titres anglais), 16:9, les 3 styles futurs, la musique générée si elle n'est pas choisie.

## 16. Risques et limites de cette proposition

1. **Plus lourde que nécessaire pour un pilote.** Empreintes, verrous, grand livre, registre de variation coûtent des jours
   avant la première vidéo. Parade : le plan ne construit au pilote que `cas.py` simple, `status`, le verrou de variation
   et le quota ; `advance` et la file viennent après. Si le propriétaire veut une vidéo vite, cette proposition est la plus
   lente des trois, probablement.
2. **Deux langages** (TS pour le rendu, Python pour l'audio et les sources) : plus de surface, deux chaînes d'outils en CI.
   Je l'assume pour réutiliser l'audio éprouvé ; une réécriture en TS du pipeline serait plus propre et coûterait l'alignement.
3. **Voix non essayée** : je n'ai pas vérifié que le multi-locuteurs de Gemini 3.8 rend bien deux voix égyptiennes
   distinctes avec émotion, ni le chiffre de 10 requêtes/jour pour ce modèle sur un nouveau compte, ni la stabilité de ce
   modèle (les modèles TTS de Gemini ont été en « Preview »). Le budget de §6.2 est une estimation.
4. **Synchro labiale** : Rhubarb phonétique en arabe n'est pas mesuré ; ma méthode « texte → visèmes » non plus ; la bouche
   d'un rig à 1080×1920 peut se lire mal sur téléphone. Le mode « mimé » est le filet.
5. **Vérification des sources** : seuils (92/80, ± 1 an, 80 % des auteurs) choisis sur 9 DOI essayés aujourd'hui, à calibrer
   sur 50 ; le résumé manque souvent (Elsevier dans OpenAlex) et renvoie à l'humain ; Europe PMC non vérifié ; le budget
   d'OpenAlex a changé en 2026 (clé, budget quotidien) et peut changer encore. Aucun code ne vérifie que **le livre** dit ce
   qu'on lui prête : seul le propriétaire, aidé de `locus`.
6. **La variation ne garantit pas la monétisation.** La règle de YouTube n'a pas de définition exhaustive ; ma défense
   principale est éditoriale, la variation n'est qu'un complément. Un moteur de variation peut aussi produire des
   combinaisons laides : le verrou se tire avant le rendu, la porte 3 les attrape pendant les 10 premiers épisodes, ensuite
   seulement les contrôles automatiques.
7. **Le goulot est le propriétaire.** À 1 épisode/jour, 7 scripts et 7 dossiers par semaine à lire depuis un téléphone. Si
   la séance du dimanche saute deux fois, le tampon de 7 se vide. L'automatisation ne retire pas ce travail, elle le range.
8. **Remotion** : licence non OSI, susceptible de changer ; ma sortie de secours n'existe que sur le papier (et le lint qui
   la rend possible). Estimations de rendu par style non mesurées.
9. **Écriture par IA** : le script vient d'un sous-agent ; le contradicteur et les règles attrapent beaucoup, pas tout (humour
   raté, égyptien approximatif, fausse attribution au livre). C'est pour cela que la porte 1 n'est jamais automatisée.
10. **Non vérifié** : la disponibilité des noms de chaîne et de dépôt ; la licence de Rhubarb dans son fichier ; les
    conditions Azure ; les 4 vCPU des runners publics ; l'interprétation des conditions Gemini pour l'UE (pas un avis
    juridique) ; la nécessité de déclarer du « contenu synthétique » pour un dessin animé à voix de synthèse.
