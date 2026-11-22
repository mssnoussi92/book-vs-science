# Proposition A : « le livre face à la science », réutilisation maximale et pilote rapide

Architecte A, 2026-11-22. Lecture seule des deux dépôts (vérifié à la fin : `git status --short` vide des deux côtés).
Ce qui n'a pas été vérifié par moi est marqué « (à vérifier) ». Ce qui a été vérifié le 2026-11-22 l'est avec sa
source : pages officielles (Gemini TTS, conditions Gemini, licence Remotion, politique YouTube, Rhubarb) et 13 DOI
interrogés sur Crossref et OpenAlex depuis la session (§9, §15).

---

## 1. Résumé

1. **Un dépôt neuf, deux moitiés qui existent déjà chez le propriétaire** : des outils Python lancés par `uv`
   (voix, alignement, niveau, sources, contrôle) et un projet Remotion 4.0.541 épinglé comme quran-themes-demo.
2. **Un épisode = un fichier JSON** validé par un schéma **zod**, seule source de vérité ; un JSON Schema en est
   généré pour le côté Python. Le script ne contient **aucune coordonnée ni rien de propre à un style**.
3. **Le rendu = une coquille + un style** : la coquille (`Episode.tsx`) pose ce qui ne change jamais (badge, carte
   d'étude, carte du livre, sous-titres, signature, zones sûres) ; un style (module) ne dessine que le décor et le jeu.
   Patron : `StyleKit` de l'ancien circuit, élargi en 5 parties (hook, scène, livre, verdict, à retenir).
4. **Les personnages sont un rig SVG** tiré des bonshommes `Stick` de `Sahib.tsx` (segments, cinématique inverse
   `reach`, contour à double trait, `mix`, `walk`), avec en plus une bouche à 9 visèmes, un clignement et des sourcils.
   Une **petite chorégraphie en données** (actions fermées : entrer, pointer, s'asseoir…) remplace les scènes en TSX.
5. **La voix** : Gemini 3.8 Flash TTS sur le **projet Google de la nouvelle chaîne** (décision du 2026-11-22),
   **2 requêtes par épisode** (les deux personnages ensemble, puis le narrateur), communes aux 3 styles.
6. **Synchro labiale** : Rhubarb `--recognizer phonetic` sur chaque réplique, repli par le volume (le seuillage
   RMS de `Character.tsx`, porté à 4 niveaux) ; choix sur un extrait comparé, pas par principe.
7. **Sources** : registre à la manière de `content/sources/` de quran-themes-demo, mais **vérifié par DOI** (Crossref +
   OpenAlex + Europe PMC), rétractations lues dans Crossref (`updated-by`, données Retraction Watch) ; chaque phrase
   du verdict pointe une « preuve » recopiée mot pour mot du résumé. Une source non vérifiée bloque le rendu.
8. **Trois portes humaines** avant la voix (script, sources) et à la fin (vidéos), inscrites avec l'**empreinte**
   du contenu validé : une réplique changée après validation redevient à valider, sans que personne ait à y penser.
9. **Anti-« inauthentic content »** : tirage déterministe (graine) du style, de la palette, du cadrage, du décor, de la
   structure de scène et du hook, contraint par un **registre des tirages** (`ledger.json`) commité.
10. **Pilote en ~8 jours de session** (dont 2 jours calendaires de quota de voix), presque tout repris par copie
    datée (`VENDORED.md`), sans toucher aux deux dépôts ; publication hors pilote, branchée plus tard sur le patron
    `themepub/` de quran-reels.

**Noms du dépôt** (le dépôt survit à un changement de nom de chaîne, donc neutre d'abord) :
`book-vs-science` (recommandé), `kalam-kotob`, `shelf-to-lab`. CLI : `bvs`.

**Noms de chaîne** (courts, égyptiens, « le livre face à la science ») :

| Nom | Translittération | Pourquoi |
|---|---|---|
| **« كلام كتب؟ »** (recommandé) | *Kalam Kotob?* | En égyptien, « ده كلام كتب » = « c'est de la théorie, pas la vraie vie » : le point d'interrogation dit tout le concept (est-ce que ça tient ?). Court, se dit, se tape. |
| « مكتوب ولا مُثبت؟ » | *Maktoub walla Mosbat?* | « Écrit, ou prouvé ? » : presque une rime, le verdict est dans le nom. |
| « الكتاب والمعمل » | *El-Ketab wel-Ma'mal* | « Le livre et le labo » : le plus clair pour un public non égyptien, le moins accrocheur. |

Disponibilité des noms sur les 4 plateformes : (à vérifier) avant tout choix.

**Licences** : code **MIT** (comme quran-themes-demo) ; contenu original (JSON des épisodes, dessins SVG des
personnages et des décors, docs) **CC BY 4.0** (`LICENSE-CONTENT.md`) ; prises de voix de synthèse : publiées avec le
dépôt sans licence revendiquée (Google ne revendique pas la propriété des sorties, conditions lues le 2026-11-22 ; le
statut d'une sortie d'IA reste incertain) ; Remotion : **source-available, pas open source**, gratuit pour un particulier
même en usage commercial et pour une structure de 3 personnes au plus (FAQ Remotion lue le 2026-11-22) : le README le
dit en clair ; polices OFL (licences copiées à côté) ; bruitages générés par code (`sfx.py`), ambiances CC0.

---

## 2. Arborescence du dépôt

```
book-vs-science/
├── README.md  LICENSE (MIT)  LICENSE-CONTENT.md (CC BY 4.0)  LIMITES.md  VENDORED.md  CLAUDE.md
├── package.json            workspaces: schema, video ; Node ≥ 22.18 (exécute .ts tel quel, comme quran-themes-demo)
├── pyproject.toml  uv.lock  constraints.txt          paquet Python `bvs` ; PIP_CONSTRAINT dans chaque workflow
├── schema/                 SOURCE DE VÉRITÉ (zod)
│   ├── src/common.ts  cast.ts  source.ts  book.ts  episode.ts  index.ts
│   ├── scripts/emit-json-schema.ts                  → ../schemas/*.schema.json (vérifié identique en CI)
│   └── test/*.test.ts                               node --test (aucune dépendance de test en plus)
├── schemas/                episode.schema.json source.schema.json cast.schema.json book.schema.json   (générés)
├── content/
│   ├── cast/               nour.json  karim.json  adasa.json        (voix, couleurs, proportions du rig)
│   ├── books/              subtle-art.json                          (titre, auteur, année, ISBN ; jamais de couverture)
│   ├── sources/            ford-2018-acceptance.json …              (registre : DOI, déclaré, vérification, design)
│   ├── episodes/           feeling-bad-about-feeling-bad.json
│   ├── takes/<ep>/arz/     <empreinte>.flac + .json                 (prises gardées, jamais redemandées)
│   ├── ledger.json         tirages de variation, rôles, hooks utilisés (append-only)
│   └── wording.json        mots refusés, lexiques : causal, stéréotypes, « expert », intensité d'effet
├── py/bvs/
│   ├── cli.py              bvs idea|script|sources|validate|voice|align|lipsync|timeline|vary|render|check|review
│   ├── schema.py rules.py hashing.py
│   ├── sources/            crossref.py openalex.py europepmc.py match.py verify.py report.py
│   ├── voice/              plan.py gemini.py recorded.py
│   ├── audio/              align.py listen.py level.py sfx.py ambience.py mix.py      (copiés, généralisés)
│   ├── lipsync/            rhubarb.py rms.py compare.py
│   └── timeline.py vary.py check.py review.py
├── video/
│   ├── package.json remotion.config.ts tsconfig.json                 (remotion 4.0.541 épinglé, react 19.2.0)
│   ├── src/Root.tsx  Episode.tsx (coquille)  formats.ts  fonts.ts  bidi.tsx  timeline.ts
│   ├── src/shell/          VerdictBadge StudyCard BookCard Subtitles Signature SafeDebug
│   ├── src/rig/            Rig.tsx parts/ visemes.ts emotions.ts poses.ts ik.ts blink.ts walk.ts skins.ts
│   ├── src/stage/          choreo.ts marks.ts sets/ props/
│   ├── src/styles/         contract.ts registry.ts cartoon/ kinetic/ split/  (whiteboard/ infographic/ papercut/ : plus tard)
│   ├── src/labs/           StyleLab.tsx HookLab.tsx CharacterSheet.tsx LipLab.tsx
│   └── public/fonts/ (OFL + licences)   public/ep/ (généré, ignoré)
├── tests/                  pytest : test_rules_bite.py test_sources_match.py test_align.py test_level.py test_vary.py …
├── reports/<ep>/           sources.md sources.json (rapport commité) ; sources-review.md (relecteur indépendant)
├── docs/                   format.md styles.md characters.md voice.md sources.md variation.md publishing.md
├── .github/workflows/      ci.yml voice.yml render.yml sources-recheck.yml
├── .github/scripts/        save-state.sh (copié tel quel de quran-reels, servira à la publication)
├── .claude/skills/         new-episode write-hooks check-sources voice-takes render-check
└── build/                  (ignoré) caches, timelines, rendus
```

Deux langages, une frontière nette : **Node** valide (zod) et rend (Remotion) ; **Python** fait tout ce qui touche
au son, aux API de sources et aux contrôles, comme dans quran-themes-demo. Python lit les JSON Schema générés.

---

## 3. Schéma d'un épisode (zod)

Choix : **zod 4** (`z.toJSONSchema` intégré) dans `schema/`, utilisé pour valider le contenu, **pas** passé à
`<Composition schema>` de Remotion, ce qui évite de lier la version de zod à celle de Remotion (Remotion 4 demandait
une version précise de zod 3 pour ses éditeurs de props (à vérifier)). Extrait réel de `schema/src/episode.ts` :

```ts
import { z } from "zod";

// ---- Textes multilingues : la structure une fois, chaque feuille porte ses langues -----------------
export const LANGS = ["arz", "en", "fr"] as const;            // arz = arabe égyptien (BCP 47 valide)
export const Lang = z.enum(LANGS);
/** Un texte : l'égyptien est obligatoire ; l'anglais et le français viennent plus tard sans changer la forme.
 *  Une langue est « complète » pour un épisode quand toutes ses feuilles l'ont (vérifié par bvs rules). */
export const L = z.object({ arz: z.string().min(1), en: z.string().min(1).optional(),
                            fr: z.string().min(1).optional() }).strict();

export const Emotion = z.enum(["neutral", "happy", "sad", "anxious", "frustrated", "angry", "surprised",
  "embarrassed", "relieved", "skeptical", "curious", "warm"]);
export const Id = z.string().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);
export const SpeakerId = z.string().regex(/^[a-z][a-z0-9-]{1,20}$/);           // content/cast/<id>.json

// ---- Une réplique, une action, un temps (beat) ------------------------------------------------------
export const Line = z.object({
  id: Id,                                  // « scene.3 » : stable, les prises et les validations s'y réfèrent
  speaker: SpeakerId,
  emotion: Emotion,                        // pilote la voix (style), le visage et la posture
  text: L,                                 // dit par la voix ; sous-titre = text sans les balises <sigh>, <laugh>
  delivery: z.string().max(80).optional(), // direction pour la voix, jamais dite (« بصوت واطي، مستعجلة »)
  onScreen: L.optional(),                  // mots écrits à l'écran (≤ 6 mots, bvs rules)
  pauseAfter: z.number().min(0).max(2).default(0.25),
  claimIds: z.array(Id).default([]),       // une réplique qui énonce un résultat nomme le claim qui la porte
}).strict();

const Mark = z.enum(["left", "center", "right"]);                       // repères abstraits, traduits par format
const Pose = z.enum(["idle", "sit", "arms_crossed", "shrug", "facepalm", "think", "hands_on_hips", "slump",
  "celebrate", "phone", "read"]);
const Prop = z.enum(["phone", "book", "mug", "laptop", "pillow", "none"]);
export const Action = z.discriminatedUnion("do", [
  z.object({ do: z.literal("enter"), who: SpeakerId, from: z.enum(["left", "right"]) }),
  z.object({ do: z.literal("exit"), who: SpeakerId, to: z.enum(["left", "right"]) }),
  z.object({ do: z.literal("move"), who: SpeakerId, to: Mark }),
  z.object({ do: z.literal("pose"), who: SpeakerId, pose: Pose }),
  z.object({ do: z.literal("look"), who: SpeakerId, at: z.union([SpeakerId, z.enum(["camera", "prop", "away"])]) }),
  z.object({ do: z.literal("point"), who: SpeakerId, at: z.union([SpeakerId, z.enum(["card", "badge"])]) }),
  z.object({ do: z.literal("hold"), who: SpeakerId, prop: Prop }),
  z.object({ do: z.literal("react"), who: SpeakerId, emotion: Emotion }),   // visage sans parler
]);
export const Beat = z.object({ line: Line.optional(), actions: z.array(Action).default([]),
                               hold: z.number().min(0).max(3).optional() })
  .refine((b) => b.line || b.actions.length > 0 || b.hold, "un beat dit, fait ou attend quelque chose");

// ---- Les 5 parties -----------------------------------------------------------------------------------
export const HookType = z.enum(["question", "paradox", "cold_open", "book_claim", "number", "pov", "myth_bust"]);
export const Hook = z.object({
  id: Id, type: HookType,
  beats: z.array(Beat).min(1).max(3),      // ≤ 3 s une fois chronométré (bvs timeline refuse au-delà de 3,5 s)
  firstFrame: L,                           // les mots de la première image, lisibles sans le son
  claimIds: z.array(Id).default([]),       // obligatoire pour « number » et « paradox » (superRefine plus bas)
}).strict();

export const BookPart = z.object({
  bookId: Id,                              // content/books/<id>.json : titre, auteur, année, ISBN ; aucun champ image
  idea: z.object({
    restated: L,                           // nos mots ; bvs rules refuse 8 mots de suite repris de `basis` ou `quote`
    onScreen: L,                           // ≤ 12 mots
    basis: z.object({                      // où l'idée est dite : on ne prête pas au livre ce qu'il ne dit pas
      kind: z.enum(["book", "author_article", "publisher_summary"]),
      locator: z.string(),                 // « ch. 1, The Feedback Loop from Hell » ; URL si article
      url: z.string().url().optional() }),
    quote: z.object({ text: z.string(), locator: z.string() }).optional(),   // une seule, ≤ 12 mots (bvs rules)
  }),
  beats: z.array(Beat).min(1),
}).strict();

export const Relation = z.enum(["supports", "nuances", "contradicts"]);
export const Claim = z.object({
  id: Id, text: L, relation: Relation,
  sourceIds: z.array(Id).min(1),
  evidence: z.array(z.object({             // recopié MOT POUR MOT (anglais) ; vérifié contre le résumé récupéré
    sourceId: Id, quote: z.string().max(320), locator: z.enum(["abstract", "results", "table", "discussion"]),
  })).min(1),
  population: z.string(),                  // qui a été étudié ; le script ne généralise pas au-delà
  causal: z.boolean(),                     // vrai seulement si une source porteuse est expérimentale (registre)
}).strict();

export const Verdict = z.object({
  badge: z.enum(["confirmed", "nuanced", "contradicted"]),   // ✅ ⚠️ ❌ (dessinés par la coquille, jamais le style)
  confidence: z.enum(["high", "moderate", "low"]),           // ≤ plafond calculé par bvs rules (§9)
  justification: L,
  nuances: z.array(z.object({ what: L, forWhom: L })).default([]),
  claims: z.array(Claim).min(1),
  shownSourceId: Id,                       // l'étude écrite à l'écran : méta-analyse ou revue d'abord
  beats: z.array(Beat).min(1),
}).strict().superRefine((v, ctx) => {
  const rel = new Set(v.claims.map((c) => c.relation));
  if (v.badge === "confirmed" && rel.has("contradicts"))
    ctx.addIssue({ code: "custom", message: "✅ avec un claim qui contredit : c'est ⚠️" });
  if (v.badge === "nuanced" && v.nuances.length === 0)
    ctx.addIssue({ code: "custom", message: "⚠️ sans nuance nommée (quoi, pour qui)" });
  if (v.badge === "contradicted" && !rel.has("contradicts"))
    ctx.addIssue({ code: "custom", message: "❌ sans claim qui contredit" });
});

export const Takeaway = z.object({
  action: L,                               // une action concrète, faisable aujourd'hui
  onScreen: L,
  beats: z.array(Beat).min(1),
  safetyLine: L.optional(),                // obligatoire si topics contient mental_health (bvs rules)
}).strict();

// ---- Variation, validations, épisode ------------------------------------------------------------------
export const StyleId = z.enum(["cartoon", "kinetic", "split", "whiteboard", "infographic", "papercut"]);
export const Variation = z.object({
  seed: z.number().int().nonnegative(),
  force: z.object({                        // ce que le propriétaire impose ; le reste est tiré (§11)
    style: StyleId, palette: z.string(), framing: z.enum(["close", "medium", "wide"]),
    set: z.string(), hookId: Id, music: z.literal("none"),
  }).partial().default({}),
}).strict();

/** Posé par `bvs validate` sur la parole du propriétaire, jamais par l'IA. `hash` = empreinte du contenu validé. */
export const Validation = z.object({
  by: z.literal("owner"), on: z.string().date(), words: z.string().min(2),   // ses mots, recopiés
  hash: z.string().regex(/^sha256:[0-9a-f]{64}$/),
}).strict().nullable();

export const Episode = z.object({
  schema: z.literal(1),
  id: z.string().regex(/^[a-z0-9-]{3,60}$/),
  title: L,
  langs: z.array(Lang).min(1),             // langues à rendre ; pilote : ["arz"]
  cast: z.array(SpeakerId).min(1).max(3),
  topics: z.array(z.enum(["emotions", "habits", "relationships", "gender", "work", "money",
                          "mental_health", "productivity"])).min(1),
  hooks: z.array(Hook).min(5),
  scene: z.object({ set: z.string(),
    structure: z.enum(["single", "replay_twice", "three_moments", "split_parallel"]),
    beats: z.array(Beat).min(2) }).strict(),
  book: BookPart,
  verdict: Verdict,
  takeaway: Takeaway,
  variation: Variation,
  script_validated: Validation,            // empreinte de : title, hooks, scene, book, verdict.justification/nuances, takeaway
  sources_validated: Validation,           // empreinte de : verdict.claims + fiches des sources citées + leur vérification
}).strict().superRefine((ep, ctx) => {
  const types = new Set(ep.hooks.map((h) => h.type));
  if (types.size < 5) ctx.addIssue({ code: "custom", message: "5 hooks de 5 types différents au moins" });
  const claims = new Set(ep.verdict.claims.map((c) => c.id));
  for (const h of ep.hooks) {
    if ((h.type === "number" || h.type === "paradox") && h.claimIds.length === 0)
      ctx.addIssue({ code: "custom", path: ["hooks", h.id], message: `hook ${h.type} sans claim` });
    for (const c of h.claimIds) if (!claims.has(c)) ctx.addIssue({ code: "custom", message: `claim inconnu ${c}` });
  }
  // (les autres contrôles croisés vivent dans bvs rules : locuteurs ∈ cast, ids uniques, durées, lexiques…)
});
export type Episode = z.infer<typeof Episode>;
```

Fiche source (`schema/src/source.ts`, extrait) : la vérification est **écrite par la machine**, jamais à la main.

```ts
export const Design = z.enum(["umbrella-review", "meta-analysis", "systematic-review", "review", "rct",
  "experiment", "longitudinal", "cross-sectional", "qualitative", "other"]);
export const Source = z.object({
  id: Id, doi: z.string().regex(/^10\.\d{4,9}\/\S+$/i),
  declared: z.object({ title: z.string(), authors: z.array(z.string()).min(1),   // noms de famille, dans l'ordre
                       year: z.number().int(), venue: z.string().optional() }),
  design: Design, n: z.number().int().optional(), k: z.number().int().optional(),  // participants, études
  effect: z.object({ metric: z.enum(["d", "g", "r", "OR", "beta"]), value: z.number(),
                     ci: z.tuple([z.number(), z.number()]).optional() }).optional(),
  shows: L, limits: z.array(L).min(1),
  label: L,                                  // ce que la carte d'étude écrit (« Ford et al., 2018 · JPSP »)
  verification: z.object({                   // écrit par `bvs sources verify`
    on: z.string().date(), status: z.enum(["ok", "needs_review", "mismatch", "not_found", "retracted"]),
    crossref: z.object({ title: z.string(), firstAuthor: z.string(), year: z.number(), type: z.string(),
                         updatedBy: z.array(z.object({ type: z.string(), doi: z.string() })) }),
    openalex: z.object({ id: z.string(), type: z.string(), isRetracted: z.boolean(), year: z.number() }).optional(),
    scores: z.object({ title: z.number(), authors: z.number(), yearDelta: z.number() }),
    abstractFrom: z.enum(["openalex", "europepmc", "semanticscholar", "none"]),
    rawSha256: z.string(),                   // empreinte des réponses brutes gardées en release (preuve)
  }).optional(),
}).strict();
```

**Ce que le schéma garantit et ce qu'il laisse à `bvs rules`** : zod tient la forme et les contraintes locales
(5 types de hook, cohérence badge/claims). Les contraintes qui croisent plusieurs fichiers (sources vérifiées,
locuteurs du `cast`, durées après la voix, lexiques, nombre d'épisodes par livre) sont dans `py/bvs/rules.py`, avec
le test « copie et casse » de quran-themes-demo (`tests/test_trial_rules.py` : copier `content/`, casser une chose,
vérifier que la règle mord). La CI exécute les deux.

**Les 5 hooks du pilote** (types imposés ; textes rédigés en production par le subagent écrivain, défiés par l'autre ;
aucun chiffre avant lecture des études) : `question` (« إمتى آخر مرة اتضايقت… إنك متضايق؟ »), `paradox` (porté par un
claim : chercher le bonheur à tout prix et ce qu'en dit l'expérience de Mauss 2011), `cold_open` (Karim sur le canapé,
une réplique), `book_claim` (« كتاب مشهور بيقول… والعلم؟ »), `number` (un chiffre tiré d'une preuve recopiée).

---

## 4. Contrat d'un style

Patron repris : `video/src/styles/kit.ts` (`StyleKit`) et la règle « Ce qui ne change jamais » de
`docs/styles.md` (quran-themes-demo, ancien circuit). Élargi : un style rend **les 5 parties** à partir du même
épisode **résolu** (minuté), et reçoit des **rectangles réservés** où il ne met rien d'important.

```ts
// video/src/styles/contract.ts
import type React from "react";
import type { Format, FormatId, Rect } from "../formats";
import type { Resolved, TimedPart, ResolvedVariation, Lang } from "../timeline";

export type PartKind = "hook" | "scene" | "book" | "verdict" | "takeaway";
/** Ce que la coquille dessine elle-même ; le style laisse ces zones lisibles (pas de visage, pas de texte dessous). */
export type Reserved = { safe: Rect; subtitles: Rect; badge: Rect; studyCard: Rect; bookCard: Rect; signature: Rect };

export type PartProps = {
  ep: Resolved;               // épisode + timeline : répliques avec début/fin, mots minutés, bouches, événements
  part: TimedPart;            // la partie en cours : ses beats minutés, ses acteurs
  t: number;                  // secondes depuis le début de la partie
  format: Format;             // 1080×1920 ou 1920×1080, zones sûres
  lang: Lang;
  v: ResolvedVariation;       // palette, cadrage, décor, structure tirés (§11)
  reserved: Reserved;
};

export type StyleModule = {
  id: "cartoon" | "kinetic" | "split" | "whiteboard" | "infographic" | "papercut";
  formats: FormatId[];                                   // pilote : ["reel"] ; 16:9 déclaré quand dessiné
  variation: { palettes: string[]; framings: ("close" | "medium" | "wide")[]; transitions: string[] };
  parts: Record<PartKind, React.FC<PartProps>>;          // les 5, obligatoires (le registre refuse un trou)
  Transition: React.FC<{ from: PartKind; to: PartKind; progress: number; v: ResolvedVariation }>;
  Cover: React.FC<{ ep: Resolved; format: Format; v: ResolvedVariation }>;   // couverture 9:16, vignette 16:9
  measured?: { framesPerSecond: number; on: string };    // vitesse de rendu mesurée (StyleLab --bench)
};
```

`Episode.tsx` (la coquille) : `calculateMetadata` lit `public/ep/<id>/<lang>/timeline.json` (patron `trialMetadata`
de `Trial.tsx`) ; une `<Sequence>` par partie appelle `style.parts[kind]` ; **par-dessus**, dans cet ordre et aux
positions fixées par le format : `<StudyCard>` (auteurs, année, revue, design, n/k, DOI court, tirés du registre,
jamais saisis), `<BookCard>` (titre et auteur en typographie, un livre générique, **jamais la couverture**),
`<VerdictBadge>` (✅/⚠️/❌, même dessin dans tous les styles : c'est la marque), `<Subtitles>`, `<Signature>`. Le
style ne choisit ni le moment du badge (événement de la timeline, ancré sur un mot), ni son texte, ni la référence.

**Les 3 styles du pilote** (même JSON, aucune ligne de script propre à un style) :

| Style | Ce qu'il dessine | Personnages | Ce qu'il fait des parties |
|---|---|---|---|
| `cartoon` (scène cartoon) | décors SVG plats (salon, bureau, métro, café, cuisine), accessoires | rig complet, jeu par `stage/choreo.ts` | scène jouée ; livre : le narrateur tient un livre générique ; verdict : le narrateur pointe la carte d'étude |
| `kinetic` (typographie animée) | champs de couleur, mots qui arrivent au temps de chaque mot (temps des mots de l'alignement), mot accentué agrandi | têtes seules en médaillon, bouche synchronisée | la scène devient un échange de bulles typographiques ; verdict : la phrase du livre barrée/nuancée mot à mot |
| `split` (« Livre vs Science ») | écran coupé : haut « le livre », bas « la science » (9:16) ; gauche/droite (16:9) | petits rigs dans chaque moitié | scène dans la moitié haute ; livre : l'idée posée en haut ; verdict : une balance passe d'une moitié à l'autre |

**Les styles futurs se branchent par le rig et les décors, pas par les scripts** : le rig a des **peaux**
(`skins.ts` : `flat` | `ink` | `silhouette` | `cutout`) et les décors sont des couches nommées. `whiteboard` = peau
`ink` + révélation du trait (`strokeDashoffset`) + main qui dessine ; `infographic` = graphiques tirés du registre
(taille d'effet et intervalle de chaque source : un petit « forest plot » lisible), personnages en icônes ;
`papercut` = peau `cutout` + parallaxe des couches (les idées du style `paper` archivé : lumière, couches, poussée
lente). Ajouter un style = un dossier + une ligne dans `styles/registry.ts` + une planche `StyleLab` validée.
Un test (`node --test`) vérifie qu'aucun fichier de `styles/**` n'importe `content/` ni `schema/` : un style ne lit que
l'épisode résolu.

**9:16 et 16:9** : le script ne connaît que des repères (`left|center|right`, cadrage) ; `stage/marks.ts` les traduit
par format ; les zones sûres viennent de `formats.ts` copié de quran-themes-demo (reel : haut 250, bas 420, côtés 90 ;
16:9 : 80/160/120/160). Pilote : 9:16 seulement ; un style déclare `formats` et le rendu 16:9 est refusé tant qu'il
ne l'a pas.

**Ce qu'un style ne décide jamais** : le badge et son moment ; la référence de l'étude et du livre ; les zones sûres ;
les sous-titres (police, place, mot surligné) ; la signature ; le son (pilote : une seule piste par épisode, les
bruitages d'événements sont posés par la coquille) ; les chiffres (toujours 123, jamais ١٢٣, comme dans les deux
dépôts, à confirmer par le propriétaire pour cette chaîne) ; le texte (jamais réécrit, jamais coupé).

---

## 5. Personnages : rig SVG articulé

**Repris** (copie datée, `VENDORED.md`) de `video/src/trial/Sahib.tsx` : `Pose` (angles par segment), `SEG`
(proportions), `limb`, **`reach` (cinématique inverse à deux segments, côté du coude)**, le contour à double trait
(`part()` : trait d'encre large puis remplissage), `heldF/heldB` (objet dans la main) ; de `Lens.tsx` : `mix(a, b, k)`
(interpolation de poses) et `walk(phase)` ; de `Character.tsx` : la respiration (`scaleY(1 + 0.006 sin)`) et le
seuillage RMS. **Non repris** : les 12 visages figés de `FaceMarks` comme tels (le visage devient trois couches
indépendantes), les scènes `*Played` (une fonction TSX par scène : c'est ce que le format doit éviter).

```tsx
// video/src/rig/Rig.tsx (structure)
export type Viseme = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "X";
export type FaceState = { emotion: Emotion; blink: number /* 0 ouvert → 1 fermé */; look: -1 | 1; gaze: P2 };
export type RigState = { x: number; y: number; s: number; facing: 1 | -1; pose: Pose; face: FaceState;
                         mouth: Viseme; prop?: PropId; handF?: P2; handB?: P2; breath: number };
export const Rig: React.FC<{ spec: CharacterSpec; state: RigState; skin: Skin }> = ({ spec, state, skin }) => (
  <g>{/* ordre : jambe arrière, bras arrière, torse/vêtement, jambe avant, tête (forme, cheveux/hijab arrière),
        Eyes (paupière = blink), Brows (emotions.ts), Mouth (visemes.ts × coin d'émotion), cheveux avant,
        bras avant + main + objet tenu */}</g>
);
```

- **Bouche** : 9 formes dessinées dans une boîte normalisée (`visemes.ts`), selon la table de Rhubarb : **A** fermée
  (M, B, P), **B** entrouverte dents serrées (la plupart des consonnes), **C** ouverte (voyelles moyennes), **D** grande
  ouverte (« aa »), **E** arrondie, **F** lèvres en avant (« ou », « w »), **G** dents sur la lèvre (F, V), **H** langue
  levée (L long), **X** repos (description lue sur le dépôt Rhubarb le 2026-11-22). L'émotion déplace les **coins** de
  la bouche (± 6 unités : sourire, moue) sans changer la forme du visème ; au repos (X), la bouche reprend la forme
  d'émotion (celles de `FaceMarks` : `smile`, `worried`, `cross`…). Changement de forme en coupe franche, tenue
  minimale 2 images (66 ms).
- **Clignement** : calendrier **déterministe** par personnage (`random(seed)` de Remotion, jamais `Math.random`) :
  un clignement toutes les 2,5 à 5,5 s, 4 images (ouvert, mi, fermé, mi), plus un clignement à chaque changement
  d'émotion.
- **Sourcils et émotions** (`emotions.ts`, une table, partagée avec la voix) : `emotion → { sourcils: hauteur, angle
  intérieur ; ouverture des yeux ; coins de bouche ; inclinaison de tête ; posture d'attente ; style de voix }`.
  Ex. `anxious` : sourcils intérieurs levés, yeux grands, coins bas, épaules montées, voix « inquiète, rapide ».
- **Bras** : par **poses nommées** (`idle`, `arms_crossed`, `shrug`, `facepalm`, `think`, `point`…) interpolées par
  `mix` sur 0,25 s ; par **cinématique inverse** (`reach`) quand une main doit toucher quelque chose (pointer la carte
  d'étude, tenir le téléphone). Le moteur `stage/choreo.ts` transforme les `Action` minutées en pistes d'images clés
  par personnage (position, pose, regard, objet, émotion) ; celui qui écoute garde sa dernière émotion et hoche la tête
  aux fins de phrase de l'autre. **Aucune scène n'est écrite en TSX.**

**Les trois personnages, dessinés par le code, sans IA** : la session écrit les SVG à partir d'une fiche
(`docs/characters.md` : proportions, palette, silhouette reconnaissable en noir à 200 px, ce qui les distingue), les
regarde sur la planche `CharacterSheet` (une image fixe : chaque visème × 4 émotions, chaque pose, de face et de
profil) et la montre au propriétaire, qui valide l'image. Proposition : **نور (Nour)**, femme de ~28 ans, accent
sarcelle ; **كريم (Karim)**, homme de ~30 ans, accent orange (le style à plat de `Sahib.tsx`, tête plus grande pour
lire la bouche à 1080 px : rayon 80 au lieu de 52 × 1,3) ; **le narrateur « عدسة » (Adasa), une loupe** avec des yeux
dans la lentille, deux bras, une voix posée et sceptique. Pourquoi une mascotte et pas un humain : la politique de
YouTube refuse les « personas IA » qui se présentent comme des experts humains donnant des conseils de santé ou de
bien-être (page lue le 2026-11-22 : « An AI "doctor" providing … health advice, or wellness remedies ») ; une loupe ne
se fait passer pour aucun psychologue. Le propriétaire tranche (hijab ou non pour Nour, mascotte ou bonhomme).

**Règle « aucune personne réelle, l'auteur compris »** (vérifiée par `bvs rules`) : tout `cast` est
`kind: "fictional" | "mascot"` ; aucun nom de personnage n'est celui d'un auteur du registre ; **le nom de l'auteur
n'apparaît que dans les répliques du narrateur de la partie `book`** (attribution : « مارك مانسون في كتابه بيقول… »),
jamais dans la bouche d'un personnage à la première personne ; l'auteur n'est ni dessiné ni imité (pas de voix
« de l'auteur »). Les rôles s'alternent : celui qui « a le problème » n'est pas du même genre plus de 2 épisodes de
suite (`ledger.json`), pour qu'aucun stéréotype ne s'installe par répétition.

---

## 6. Voix en arabe égyptien, plusieurs voix, émotion

**Décision du propriétaire (2026-11-22) intégrée** : la chaîne a **son propre compte Google, donc son projet et sa
clé Gemini**, avec son propre palier gratuit ; ce quota ne sert jamais à compléter celui de quran-themes-demo, et
inversement. Budget : **~10 requêtes/jour à elle** (chiffre à revérifier pour le modèle choisi : la page des limites
d'AI Studio ne publie plus de ligne TTS pour le palier gratuit, lue le 2026-11-22 ; elle dit que les limites sont
« par projet » et « varient selon le modèle »).

**Option principale : Gemini 3.8 Flash TTS** (`gemini-3.8-flash-tts`, le modèle et le point d'entrée `interactions` que
`tools/tts/gemini.py` emploie déjà). Vérifié sur la documentation le 2026-11-22 : l'**arabe égyptien** est dans la
liste des langues ; **2 locuteurs au plus par requête** avec des voix préfabriquées ; style par tour en langage
naturel (`speech_metadata.style`) ; balises vocales en chevrons dans le texte (`<laugh>`, `<sigh>`, `<short pause>`).
Conditions (lues le 2026-11-22, effet au 23 mars 2026) : Google ne revendique pas la propriété des sorties ; dans
l'EEE ce sont les conditions de données des services payants qui s'appliquent même au quota gratuit ; interdiction
d'usage « clinique » ou de « conseil médical » (notre contenu ne l'est pas : c'est une raison de plus pour la ligne
de prudence de §10). L'usage monétisé de l'audio n'est pas interdit par ce texte ; pas un avis juridique.

**Plan de requêtes d'un épisode (communes aux 3 styles, à toutes les plateformes)** :

| Requête | Locuteurs | Contenu | Pourquoi |
|---|---|---|---|
| R1 « personnages » | Nour + Karim (multi-locuteurs, 2 voix) | toutes leurs répliques : scène, hook `cold_open`, répliques d'eux ailleurs | 2 locuteurs = la limite de l'API ; le dialogue garde son rythme dans une seule prise |
| R2 « narrateur » | Adasa seul | les 5 hooks, le livre, le verdict, à retenir, dans l'ordre, une ligne par réplique | une prise, coupée ensuite par `align.py` comme les shorts de quran-themes-demo |
| R3 (au plus 1) | selon le besoin | **toutes** les corrections regroupées | patron `narration-takes` : une correction = une requête |

Émotion par réplique, dans l'ordre d'essai : (1) le style du tour décrit l'arc de chaque locuteur (« Karim : agacé puis
soulagé ; Nour : patiente, taquine ») ; (2) balises en chevrons (retirées des sous-titres par la coquille) ;
(3) la ponctuation et les mots égyptiens eux-mêmes. Si l'émotion par réplique ne passe pas, **repli coûteux** :
regrouper les répliques par émotion dominante (R1 → 2 requêtes). Le format exact du multi-locuteurs dans l'API
`interactions` n'est **pas vérifié** (la liste `speech_config` de `gemini.py` le laisse supposer) : la première requête
d'essai le dira.

**Le « planificateur de voix »** (`bvs voice plan <ep>`) calcule les requêtes à faire **avant d'envoyer** : empreinte
de chaque requête = texte exact + voix + style + modèle ; une prise dont l'empreinte existe dans `content/takes/` n'est
jamais redemandée ; il affiche « 2 requêtes nécessaires, 0 en cache, budget du jour : 10 » et refuse au-delà de
`--max-requests` (repris de `gemini.py`, avec « pas d'attente si le message dit per day »). La voix tourne dans le
workflow `voice.yml` (job `gemini` de `voice-test.yml` repris : la clé est un secret du dépôt, jamais dans la session ;
le formulaire de clé des sessions n'envoie pas l'en-tête de Gemini, noté dans docs/retention.md) ; sorties MP3 pour
l'écoute au téléphone, FLAC gardé dans `content/takes/`.

**Distribution** : un essai de casting le premier jour, 4 requêtes : 2 couples de voix pour Nour/Karim sur la même
scène (ex. `Puck`+`Kore`, `Fenrir`+`Aoede` (noms de voix à vérifier sur le modèle 3.8)), 2 narrateurs : **`Algieba`**
(la seule voix que le propriétaire a déjà jugée bonne en égyptien) et une autre. **Avis franc** : Algieba est le moindre
risque, mais c'est la voix de la Page coranique ; une même voix sur deux chaînes au public proche les confond. Je
recommande une autre voix pour le narrateur, et Algieba seulement si l'autre est nettement moins bonne. Le
propriétaire tranche à l'oreille.

**Budget du pilote** : casting 4 requêtes (jour A) ; prises 2 (jour B) ; corrections ≤ 2 (jour B ou C) ; **8 au
plus en 2 à 3 jours**. En production : 2 à 3 requêtes par épisode, soit **3 épisodes par jour au maximum** sur le
palier gratuit, ce qui dépasse le rythme réaliste de validation humaine.

**Ce qui dirait « la qualité ne suffit pas »** (l'oreille du propriétaire décide ; la transcription automatique ne
mesure pas la qualité d'une voix, leçon de docs/retention.md) : (a) il entend de l'arabe standard au lieu de
l'égyptien ; (b) **test d'émotion à l'aveugle** : 6 répliques sans étiquette, il reconnaît l'émotion voulue pour moins
de 4 ; (c) les deux personnages ne se distinguent pas les yeux fermés ; (d) artefacts (souffle, coupure, voix qui
change en cours de prise). Contrôle machine seulement en garde-fou : `align.py` signale une réplique entendue à moins
de 60 % de ses lettres (`HEARD_ENOUGH`). Deux castings ratés (8 requêtes) → secours.

**Secours, dans l'ordre** (aucun n'est aussi bon, je le dis) :
1. **Gemini 3.8 Flash-Lite TTS** (même projet ; l'égyptien est dans sa liste, vérifié) : si son quota est compté à
   part (à vérifier), est-ce « multiplier un quota » ? Ce n'est ni un second projet ni un second compte, mais c'est
   à lui de dire si l'esprit de sa règle l'exclut (question à choix).
2. **Voix enregistrées** (`voice/recorded.py`) : une prise humaine par réplique, depuis un téléphone (le propriétaire,
   des proches) ; le pipeline accepte n'importe quel WAV par réplique ; seule option où l'émotion est sûre.
3. **Azure AI Speech, palier F0** (0,5 million de caractères neuronaux par mois gratuits, vérifié sur la page de prix ;
   voix égyptiennes `ar-EG-SalmaNeural` et `ar-EG-ShakirNeural` (à vérifier) ; sans styles d'émotion en ar-EG (à
   vérifier) ; un compte Azure demande une carte bancaire pour l'identité (à vérifier) : contraire à l'esprit « zéro
   dépense » si le propriétaire ne veut pas la donner).
4. **Écartés** : Chatterbox Multilingual (MIT) jugé « trop rapide/mécanique » et lent sur CPU, Supertonic 3 « très
   mauvais » (essais du propriétaire, 2026-11-11) ; VoiceTut (poids d'origine CC-BY-NC) ; XTTS-v2 (licence non
   commerciale), MMS-TTS (CC-BY-NC), F5-TTS (poids non commerciaux) (licences de mémoire, à vérifier si l'un revenait).

---

## 7. Synchro labiale

**Entrée** : la réplique découpée dans sa prise par `align.py` (début = fin de la pause qui la précède), en WAV mono.
**Rhubarb Lip Sync 1.13.0** (binaire Linux de la release, 87 Mo, téléchargeable depuis la session d'après le brief ;
licence MIT (à vérifier sur LICENSE.md)) : `rhubarb -r phonetic --extendedShapes GHX -f json -o out.json line.wav`.
Le module `phonetic` est celui que la documentation recommande « pour les enregistrements non anglais » : il reconnaît
des sons, pas des mots. L'option `-d` (texte du dialogue) aide surtout le module PocketSphinx, anglais (son effet en
phonétique : à vérifier, on la passe quand même). Sortie : `mouthCues: [{start, end, value}]`.

**Repli par le volume** (`lipsync/rms.py`, calculé hors ligne, le même format) : RMS sur 0,1 s (la fenêtre de
`Character.tsx`), quatre niveaux au lieu de deux (X silence, B faible, C moyen, D fort), seuils relatifs au niveau
médian de la réplique (les voix Gemini ne sont pas les voix VoiceTut sur lesquelles 0,08 avait été mesuré), hystérésis
et tenue de 2 images ; **enrichi par le texte** : un **A** (lèvres fermées) inséré 50 ms sur chaque « م » et « ب » dont
la place dans le mot est estimée au prorata des lettres entre les temps du mot (Whisper donne les mots, pas les sons).

**Comment on décide** (`bvs lipsync compare`, composition `LipLab`) : sur 3 répliques du pilote (un dialogue rapide,
une réplique lente du narrateur, une réplique émue), on calcule (1) la **part des « م/ب » où la bouche est fermée**
à ± 60 ms ; (2) les **changements par seconde** (6 à 12 attendus ; au-delà, ça tremble) ; (3) la part de silences en
X/A. Puis un extrait de 10 s côte à côte (gauche Rhubarb, droite volume, sans dire lequel) est envoyé au propriétaire :
il choisit. Le choix va dans `config/lipsync.json` et chaque timeline note sa méthode (`mouthSource`). Rhubarb n'est
retenu que s'il gagne à l'œil ; sinon le repli devient la méthode, sans honte : le seuillage RMS a déjà été publié.

**Format passé à Remotion** (`public/ep/<id>/arz/timeline.json`, écrit par `bvs timeline`) :

```json
{ "fps": 30, "seconds": 52.4, "audio": "mix.wav", "hookId": "h3", "mouthSource": "rhubarb-phonetic-1.13.0",
  "parts": [{ "kind": "hook", "start": 0, "end": 2.9 }, { "kind": "scene", "start": 2.9, "end": 21.6 }],
  "lines": [{ "id": "scene.2", "speaker": "nour", "emotion": "anxious", "start": 4.12, "end": 6.8,
              "sub": "…", "words": [{ "w": "…", "t0": 4.12, "t1": 4.3 }] }],
  "mouth": { "nour": [[4.12, "B"], [4.21, "C"], [4.35, "A"]], "karim": [], "adasa": [] },
  "actions": [{ "t": 4.0, "do": "pose", "who": "karim", "pose": "slump" }],
  "events": [{ "t": 31.2, "kind": "badge", "value": "nuanced" }, { "t": 31.2, "kind": "sfx", "name": "stamp" }] }
```

Le rig lit `mouth[speaker]` par recherche dichotomique à `frame / fps` ; hors de ses répliques, un personnage est en X.

---

## 8. Pipeline

```
idée → recherche de preuves → script (+ verdict) → vérification des sources → [P1 script] [P2 sources]
     → voix → alignement → synchro → timeline → rendu ×3 styles → contrôle → [P3 vidéos]
```

**Écart assumé avec l'ordre du brief** : les sources sont cherchées *avant* d'écrire le verdict (sinon on écrit un
verdict puis on cherche ce qui l'arrange), et **les deux validations P1 et P2 précèdent la voix** : un verdict changé
après la voix coûte des requêtes d'un quota de 10 par jour.

| Étape | Commande | Entrées (empreinte) | Sorties |
|---|---|---|---|
| idée | `bvs idea new <slug> --book <bookId>` | — | `content/episodes/<slug>.json` (squelette), `content/books/<id>.json` |
| preuves | `bvs sources add <doi>…` puis `bvs sources verify <slug>` | DOI, champs déclarés | `content/sources/*.json` (`verification`), `reports/<ep>/sources.{md,json}` |
| script | écrit par le subagent écrivain, défié par le relecteur ; `bvs script show <ep>` | épisode | une page lisible (Markdown) : hooks, répliques, verdict, durée estimée |
| règles | `npm run validate -- <ep>` puis `bvs rules <ep>` | épisode + registre | erreurs / avertissements / « à vérifier à l'œil » |
| validation | `bvs validate script|sources <ep> --words "<ses mots>"` | empreintes | `script_validated`, `sources_validated` |
| voix | `bvs voice plan <ep>` ; workflow `voice.yml` | texte des requêtes + voix + style + modèle | `content/takes/<ep>/arz/<empreinte>.flac` |
| alignement | `bvs align <ep>` | prises + répliques | `build/<ep>/arz/lines/*.wav`, mots minutés |
| synchro | `bvs lipsync <ep>` | WAV des répliques + méthode | `build/<ep>/arz/mouth.json` |
| timeline | `bvs timeline <ep>` | tout ce qui précède + `variation` | `video/public/ep/<ep>/arz/timeline.json`, `mix.wav` (−16 LUFS) |
| rendu | `bvs render <ep> --style cartoon|kinetic|split` ou `render.yml` | timeline + code du style | `build/<ep>/out/<style>.mp4` |
| contrôle | `bvs check build/<ep>/out/<style>.mp4` | MP4 + timeline | planche JPEG, mesures |

**Idempotence** : chaque étape écrit `build/<ep>/<étape>/inputs.sha256` = empreinte de (sous-ensemble canonique du
JSON concerné + fichiers d'entrée + version de l'outil + configuration) ; même empreinte → rien n'est refait. Les
prises vivent dans le dépôt (comme `content/trial/takes/` de quran-themes-demo), les caches lourds (modèle Whisper
~1,5 Go, binaire Rhubarb, réponses d'API) dans `.cache/` et le cache d'Actions, restauré et sauvé même en échec
(`if: always()`, leçon de quran-reels : 9 minutes de téléchargements perdues sinon).

**Portes humaines, concrètement depuis le téléphone** :
- **P0 idée** : 3 idées proposées par une question à choix (la recommandée en premier, avec la raison et la force
  probable des preuves).
- **P1 script** : la session envoie dans la conversation le script en une page (`bvs script show`) et le lien d'une
  page de relecture privée (artefact claude.ai, patron `gallery.py` : hooks, répliques, verdict, aperçus), puis une
  question à choix dont l'option nomme l'objet et l'empreinte : « Je valide le script de feeling-bad (empreinte
  3f2a9c) ». Sa réponse est recopiée dans `words` par `bvs validate script`.
- **P2 sources** : même chose avec le rapport (`reports/<ep>/sources.md`) : chaque DOI cliquable, déclaré/trouvé,
  type d'étude, rétraction, preuve recopiée, verdict du relecteur indépendant.
- **P3 vidéos** : les 3 MP4 (aperçus 540p dans la page, MP4 en release brouillon du dépôt), une question par vidéo.
- Une validation **n'est jamais posée par l'IA** ; un « je valide » qui ne nomme pas son objet se confirme avant
  toute requête de voix (incident du 2026-11-11 de quran-themes-demo, à recopier dans le CLAUDE.md du dépôt).

**Ce qui bloque le rendu** (le job `prepare` de `render.yml` l'exécute en premier, comme `rules.py` dans `film.yml`) :
schéma invalide ; erreur de `bvs rules` ; une source citée sans `verification.status == "ok"` ; `script_validated`
ou `sources_validated` absent **ou dont l'empreinte ne correspond plus** ; une prise manquante ; une réplique
entendue < 60 % ; un hook > 3,5 s ; une durée hors 40-70 s (avertissement hors 45-60 s) ; un signe sans glyphe dans
la police.

---

## 9. Vérification des sources

**Algorithme** (`py/bvs/sources/verify.py`), pour chaque source citée par l'épisode :

1. **DOI normalisé** : minuscules, sans `https://doi.org/`, `doi:`, espaces ; doit valoir `^10\.\d{4,9}/\S+$`.
2. **Crossref** `GET api.crossref.org/works/{doi}` (User-Agent générique du projet, aucune adresse personnelle ;
   réponse brute gardée). 404 → `not_found` (bloquant).
3. **OpenAlex** `GET api.openalex.org/works/doi:{doi}` : second avis sur titre et année, `type`, `is_retracted`,
   `abstract_inverted_index`.
4. **Titre** : NFKC, minuscules, balises retirées (Crossref met du `<i>`), ponctuation → espace, espaces réduits,
   point final retiré ; score = max(`SequenceMatcher` sur les titres entiers, sur les titres principaux avant « : »)
   (bibliothèque standard, comme `align.py`). **≥ 0,92 : concorde ; 0,80-0,92 : `needs_review` (bloquant jusqu'au
   relecteur) ; < 0,80 : `mismatch` (bloquant).**
5. **Auteurs** : noms de famille sans accents (NFKD), minuscules, tirets et apostrophes retirés. Le **premier auteur
   déclaré doit être le premier de Crossref** ; au moins **2/3 des 5 premiers** déclarés présents ; un auteur
   collectif (`name` au lieu de `family`) compte comme un nom.
6. **Année** : l'année déclarée doit être dans {`published-print`, `published-online`, `issued`, année OpenAlex}
   **± 1** (mise en ligne anticipée). Cas réel constaté le 2026-11-22 : Aldao et al. (10.1016/j.cpr.2009.11.004) vaut
   2010 chez Crossref et 2009 chez OpenAlex.
7. **Type** : Crossref `journal-article`, `proceedings-article`, `book-chapter` acceptés ; `posted-content` (prépublication)
   accepté avec avertissement et **ne peut porter seul un ✅** ; le reste refusé. Le **design** déclaré (méta-analyse,
   revue…) est recoupé : OpenAlex `type: review`, mots du titre ou du résumé (« meta-analy », « systematic review »),
   types de publication PubMed via **Europe PMC** (joignable depuis la session, vérifié : HTTP 200). Déclaré
   méta-analyse sans aucun de ces signes → `needs_review`.
8. **Rétractations et corrections** : Crossref `updated-by[]` (données Retraction Watch intégrées ; vérifié le
   2026-11-22 sur l'article rétracté de Wakefield 1998 : `type: retraction` et `correction`, et `is_retracted: true`
   chez OpenAlex). `retraction` ou `expression_of_concern` → **`retracted`, bloquant** ; `correction`/`erratum` →
   avertissement, la correction doit être lue et notée (cas réel : Macnamara et al. 2014,
   10.1177/0956797614535810, porte une correction).
9. **Résumé** : OpenAlex (index inversé recomposé), sinon Europe PMC, sinon Semantic Scholar (joignable, vérifié).
   Constaté : pas de résumé chez OpenAlex pour deux articles Elsevier testés (Aldao 2010, Abramowitz 2001) : la chaîne
   de repli est nécessaire. Le résumé n'est pas commité en entier (droits de l'éditeur) : seulement son empreinte et
   les extraits de preuve.
10. **Preuves** : chaque `evidence.quote` (≤ 320 caractères, anglais) doit se retrouver **mot pour mot** (espaces et
    guillemets normalisés) dans le résumé si `locator: "abstract"` ; sinon (résultats, tableau, texte intégral) le
    relecteur doit la confirmer (`human_checked`) en ayant lu le passage.

**Rapport** (`reports/<ep>/sources.md` et `.json`, commités) : une ligne par source (DOI cliquable, titre
déclaré/trouvé et score, auteurs trouvés, écart d'année, type Crossref/OpenAlex/PubMed, rétraction et corrections,
source du résumé, preuves trouvées ✓/✗, statut) puis, par claim, sa relation et ses preuves. **Preuve conservée** :
les réponses brutes Crossref/OpenAlex/Europe PMC dans une release `sources-<ep>` (empreinte sha256 dans la fiche) et
la date de récupération. **Revérification** : `sources-recheck.yml` chaque semaine sur toutes les sources citées
(rétraction après publication → ticket d'alerte, patron `notify.py`).

**Pour qu'une vraie étude ne soit pas citée pour ce qu'elle ne dit pas** (contrôles de `bvs rules`) :
- toute réplique qui énonce un résultat porte un `claimId` ; tout **chiffre** dit ou écrit doit figurer dans une
  preuve de ce claim ;
- **corrélation ≠ cause** : si aucune source porteuse n'est expérimentale (`rct`, `experiment`, ou méta-analyse
  d'expériences), `causal` doit être faux, et les verbes causaux du lexique égyptien (`wording.json` : « بيسبب »،
  « بيخلّي »، « بيعالج »…) sont refusés dans les répliques de ce claim ;
- **intensité** : avec une taille d'effet au registre, les mots d'intensité suivent une table (d < 0,2 « أثر صغير
  جدًا » ; 0,2-0,5 « صغير » ; 0,5-0,8 « متوسط » ; > 0,8 « كبير » ; r : 0,1/0,3/0,5) ; « كبير » sur un petit effet est
  refusé ;
- **portée** : `population` est écrite sous la carte d'étude ; une nuance « pour qui » est exigée quand la population
  est restreinte (étudiants, un seul pays) ;
- **plafond de confiance** calculé : `high` exige ≥ 1 méta-analyse ou revue systématique qui soutient et rien de
  contraire de même niveau ; seulement des études transversales → `low` au plus ; l'épisode ne peut dépasser ce plafond ;
- **méta-analyses et revues d'abord** : `shownSourceId` doit être une méta-analyse/revue s'il en existe une parmi les
  sources ; sinon avertissement visible au propriétaire ;
- **le relecteur revérifie lui-même** : un subagent distinct lance `bvs sources verify --fresh` (sans cache), relit
  chaque résumé, et écrit `reports/<ep>/sources-review.md` (soutient / en partie / ne soutient pas, par claim) ; un
  désaccord bloque P2.

---

## 10. Droit d'auteur et sujets sensibles (règles vérifiées par le code)

| Règle | Comment le code la tient |
|---|---|
| Aucune longue citation du livre | `book.idea.quote` : une au plus, **≤ 12 mots**, avec locator ; le pilote n'en a pas |
| Reformuler, pas recopier | `restated` ne partage **aucune suite de 8 mots** (normalisés) avec `quote` ni avec le texte de `basis` quand il est en ligne (article de l'auteur, présentation de l'éditeur : récupéré et comparé) |
| Pas de couverture | le schéma de livre n'a **aucun champ image** ; `BookCard` dessine un livre générique et le titre en typographie ; `bvs rules` refuse un fichier `*cover*` dans `video/public` ; contrôle à l'œil sur la planche |
| Pas de résumé chapitre par chapitre | **une idée par épisode** (le schéma n'en accepte qu'une) ; pas de champ « chapitre » ; au plus **3 épisodes par livre** (`ledger.json`), jamais deux de suite du même livre ; au-delà, son « je valide » explicite |
| Titre et auteur nommés, jamais imités | voir §5 (nom de l'auteur seulement dans les répliques du narrateur de la partie `book`) |
| Hommes/femmes : jamais un stéréotype présenté comme un fait | topic `gender` → au moins **une méta-analyse** parmi les sources (ex. la littérature des « similarités de genre » : Hyde 2005, 10.1037/0003-066X.60.6.581 ; Zell et al. 2015, 10.1037/a0038208, existence vérifiée sur Crossref) ; lexique de généralisations (« الستات كلهم »، « الراجل بطبعه »…) refusé sauf dans une réplique marquée comme l'affirmation du livre puis nuancée ; nuance « pour qui » obligatoire ; alternance des rôles (§5) |
| Santé mentale | topic `mental_health` → `safetyLine` obligatoire (« لو الإحساس ده تقيل عليك كل يوم، كلّم متخصص ») et ligne « ce n'est pas un avis médical » dans la description ; lexique « expert » refusé (« أنا دكتور »، « كأخصائي ») : aucun personnage ne se présente comme expert (politique YouTube, §5) |
| Pas de chiffre sans source | tout nombre d'une réplique ou d'un texte à l'écran doit être dans une preuve (§9) |

---

## 11. Anti « inauthentic content »

La politique (page d'aide YouTube lue le 2026-11-22) refuse les contenus « faits avec un modèle » à peu de variation
et les contenus d'IA « à partir de modèles génériques donnant une impression de production de masse » ; elle **permet**
une même intro et une même fin si l'essentiel diffère, et « une série dont chaque vidéo a son histoire, son angle ou
son concept ». Notre défense principale est donc le fond (une idée différente, des études différentes, un verdict
argumenté) ; la variation de forme l'accompagne, tirée et tracée :

| Axe | Valeurs du pilote | Contrainte de tirage |
|---|---|---|
| style | cartoon, kinetic, split (+ futurs) | pas le même que l'épisode précédent |
| palette | 4 par style | pas une des 3 dernières |
| cadrage / caméra | close, medium, wide ; poussée lente, panoramique, parallaxe | pas le même couple que l'épisode précédent |
| décor | salon, bureau, métro, café, cuisine, rue | (décor, structure) absent des 5 derniers |
| structure de scène | `single`, `replay_twice` (la même situation rejouée, une chose change : leçon de « STICK TO IT »), `three_moments`, `split_parallel` | choisie par l'écrivain, rejetée par `vary` si répétée 2 fois de suite |
| hook | 5 variantes de 5 types ; le type publié | pas le même type 3 fois de suite |
| révélation du verdict | tampon, balance, jauge, carte retournée (dans le style) | tirée |
| musique | **aucune au pilote** (bruitages générés par code, ambiances CC0) ; place prévue `music` | décision du propriétaire avant tout essai (risque Content ID) |

**Tirage** (`bvs vary <ep>`) : PRNG déterministe (`seed` de l'épisode) ; les valeurs imposées (`variation.force`)
sont gardées ; les autres tirées puis **rejetées tant que la distance de Hamming pondérée aux 6 derniers épisodes du
`ledger.json` est < 0,5**, la graine incrémentée de façon reproductible ; le résultat et le nombre d'essais sont écrits
dans la timeline et ajoutés à `ledger.json` au moment du rendu final (commit). En production : **un style par épisode**
(les 3 styles ne sont rendus que pour le pilote), ce qui varie la chaîne et divise le coût de rendu par 3.

---

## 12. Rendu

**Où** : **GitHub Actions** pour tout rendu à montrer (dépôt public : minutes gratuites ; runners `ubuntu-24.04`
épinglés, 4 vCPU (à vérifier pour le dépôt neuf)) ; la session seulement pour des images fixes et des essais courts
(`remotion still`, 150 images de `--bench`), une chose lourde à la fois (règle de quran-themes-demo : un rendu a déjà
été tué faute de mémoire). `render.yml` = squelette de `film.yml` : `prepare` (schéma, règles, empreintes, timeline,
ffmpeg statique `imageio-ffmpeg==0.8.1` sans apt, ffprobe de Remotion) → **matrice** (style × format, lue des fichiers,
jamais d'une table) `npx remotion render --concurrency=100% --crf=21` → `check.py` → **release brouillon**
`<ep>-candidate` (le seul job qui écrit ; ce qui a réussi est publié même si un autre rendu échoue) ; `from_run` pour
refaire la release sans re-rendre ; `concurrency: render-<ep>`, sans annulation. Dernière étape commune : la copie
« Instagram » (`-bf 0 -use_editlist 0 -movflags +faststart`, options de `for_instagram` de quran-reels : les vidéos
Remotion portent des edit lists qu'Instagram ne digérait pas).

**Temps estimés pour 50 s (1 500 images), à mesurer au premier `--bench`** : la mesure connue (~4 images/s) inclut
le décodage d'un clip filmé, que nos styles n'ont pas ; le style plat de l'ancien circuit mesurait 0,04 s/image et le
papier 0,13-0,17 s/image (docs/styles.md). Estimation : `kinetic` 1-3 min, `cartoon` 2-5 min, `split` 2-5 min, plus
~3 min d'installation par job ; les 3 en parallèle : **~10 min** de bout en bout ; dans la session, à la suite :
~15-20 min.

**Contrôle sur planches** : `tools/trial/check.py` repris (format, durée contre la timeline, EBU R128 −17,5 à −15 LUFS,
crête, planche de 16 images que la session ouvre et lit), `moments()` adapté : première image, milieu de chaque
partie, badge + 0,5 s, carte d'étude + 1 s, dernière seconde. Ajouts tirés des leçons de quran-reels : **détecteur
d'« image statique »** (écart moyen absolu entre images à 0,5 s d'intervalle ; une fenêtre sous 0,5 est signalée : la
liste de qualité de Facebook a signalé 0,44 et pas 2,90) ; **bande uniforme sombre** de plus de 100 px en bas
(« vidéo avec bordures », 2026-11-13) ; **zones sûres** sur `remotion still` de la composition `SafeDebug` par style
(équivalent du test Chromium de quran-reels : saute en local sans navigateur, échoue en CI). Ce qui ne se voit que là
(un texte qui sort du cadre, un bras qui traverse la carte) est jugé à l'œil ; la voix et le son, à l'oreille.

---

## 13. Réutilisation

Mode : **copie datée** dans le nouveau dépôt (en-tête `# copied from <dépôt>@<sha>:<chemin>`, liste dans
`VENDORED.md`), généralisée dans la copie ; **aucune modification** de quran-themes-demo ni de quran-reels.

| Brique | De | Vers | Comment |
|---|---|---|---|
| `Stick`, `SEG`, `limb`, `reach`, contour double trait, `heldF/B` | qtd `video/src/trial/Sahib.tsx` | `video/src/rig/` | copie puis découpe en parties ; visage en 3 couches |
| `mix`, `walk`, `POSES` | qtd `video/src/trial/Lens.tsx` | `rig/poses.ts`, `rig/walk.ts` | copie |
| bouche RMS, respiration | qtd `video/src/characters/Character.tsx` | `lipsync/rms.py`, `rig/Rig.tsx` | patron (4 niveaux, hors ligne) |
| `StyleKit`, « ce qui ne change jamais », `StyleLab` | qtd `video/src/styles/kit.ts`, `docs/styles.md`, `StyleLab.tsx` | `styles/contract.ts`, `labs/` | patron |
| `formats.ts` (zones sûres), `fonts.ts`, `calculateMetadata` | qtd `video/src/` | `video/src/` | copie |
| Remotion 4.0.541, react 19.2.0, `remotion.config.ts` | qtd `video/package.json` | `video/` | mêmes versions épinglées |
| `gemini.py` (budget, « per day », clé en en-tête) | qtd `tools/tts/gemini.py` | `py/bvs/voice/gemini.py` | copie + multi-locuteurs + planificateur |
| job `gemini` de `voice-test.yml` | qtd | `voice.yml` | copie (~60 lignes utiles) |
| `align.py`, `listen.py` (`transcribe`, `words_of`, `silences`, `LOUDER_FLOORS`) | qtd `tools/audio/` | `py/bvs/audio/` | **presque tel quel** : l'égyptien s'écrit en lettres arabes, `plain()` et `language="ar"` conviennent |
| `level`, `loudness` (un gain, limiteur, ±12 dB), test | qr `render/video.py`, `tests/test_loudness.py` | `py/bvs/audio/level.py` | copie (cible −16 LUFS) |
| `tighten` (silences raccourcis) | qtd `tools/audio/build.py` | `level.py` | copie de ~40 lignes |
| `sfx.py` (whoosh, pop, click, count, knock, buzz) | qtd `tools/trial/sfx.py` | `py/bvs/audio/sfx.py` | copie + « tampon » pour le badge |
| `ambience.py` (nappe −36 LUFS, boucle, retrait autour d'un segment) | qtd | `py/bvs/audio/ambience.py` | patron (retrait autour du verdict au lieu d'un verset) |
| `check.py` | qtd `tools/trial/check.py` | `py/bvs/check.py` | copie, `moments()` réécrit |
| `splice.py` | qtd | plus tard | dès la première correction d'un rendu validé |
| règles + test « copie et casse » | qtd `tools/trial/rules.py`, `tests/test_trial_rules.py` | `py/bvs/rules.py`, `tests/test_rules_bite.py` | patron (réécrit, aucune règle coranique) |
| registre de sources, statut, `--check` en CI | qtd `content/sources/`, `tools/sources/fetch.py` | `content/sources/`, `py/bvs/sources/` | patron + DOI |
| « je valide » (`script_validated`, `validated`) | qtd CLAUDE.md, skill `release-render` | `bvs validate` + empreinte | patron renforcé |
| page de relecture (`gallery.py`) | qtd | `py/bvs/review.py` | patron (artefact privé) |
| `film.yml` (prepare → matrice → release brouillon, `from_run`) | qtd | `render.yml` | squelette (~150 lignes sur 584) |
| skills `narration-takes`, `write-hook`, `new-scene` | qtd | `.claude/skills/` | patron (budget, premières secondes, mots refusés) |
| analyses `stickman-shorts-analysis.md`, `fb-metaphor-reels-analysis.md` | qtd `reference/` | `docs/format.md` | leçons : visages, relation, une chute toutes les ~6 s, partage plutôt qu'abonnement |
| `bidi.py` (marques de sens) | qr | `py/bvs/bidi.py` + `<Bidi>` (isolats `unicode-bidi: isolate` pour l'écran) | copie (descriptions arabe + titres d'études anglais) |
| `save-state.sh` + test | qr `.github/scripts/` | idem | **tel quel** (servira au registre et à la publication) |
| `constraints.txt`, runners épinglés, ffmpeg statique, cache `if: always()` | qr workflows | tous les workflows | patron |
| `gh_secrets.py`, `notify.py` (`Issues`) | qr | plus tard | tel quel à la publication |
| publishers Meta / TikTok / YouTube, `rights.py` | qr `publishers/` | plus tard (§14) | copie-généralisation (`Post` à 6 champs) |
| « Seul le propriétaire », questions à choix, contredire, fusion des PR | les deux CLAUDE.md | `CLAUDE.md` du dépôt | recopié et adapté |

**Plan d'extraction sans casser quran-reels** (aligné sur l'audit) : (0) **pilote : rien n'est extrait**, tout est
copié ; (1) à la publication : copie-généralisation des publishers dans le nouveau dépôt, avec leurs tests à faux
Graph/TikTok/YouTube ; (2) **si** deux consommateurs réels et stables existent et **si le propriétaire le décide** :
promotion des copies en deux paquets (`shortform-audio` : niveau, loudness, align, sfx ; `shortform-publish` :
publishers) publiés en **roues sur une release GitHub avec empreinte** (installables par `PIP_CONSTRAINT`, sans
compte PyPI), puis adoption par quran-reels **en trois PR** (base + meta + rights ; tiktok + gh_secrets ; youtube),
chacune verte sur ses 10 300 lignes de tests et un `publish-test` en dry-run, jamais une publication réelle pour
tester ; aucun changement observable (textes d'erreur lus par `notify.py`, champs de `published.json`). Côté
TypeScript (rig), pas de paquet npm : la copie suffit tant qu'un seul dépôt l'utilise.

---

## 14. Publication future (hors pilote)

Branchement : le patron `themepub/` de quran-reels (calendrier en tableau, textes validés mot pour mot, fichiers d'une
release publique, état sur une branche `state`, plusieurs vidéos par jour sur des plateformes distinctes) appliqué
**dans le nouveau dépôt lui-même** : `publish/` contient l'interface `Publisher` / `Post` / `PublishResult` dès le
pilote (vide), les publishers copiés ensuite. Le JSON d'épisode prévoit déjà ce que la publication lira : titre,
hooks (le type publié est noté dans `ledger.json` par plateforme pour les comparer), sources (crédits de la
description : DOI, livre), ligne « voix générée par IA » (règle de quran-themes-demo), sous-titres exacts tirés des
répliques (pas de Whisper). À vérifier le moment venu : la déclaration « contenu altéré ou synthétique » de YouTube
(réservée aux contenus réalistes ; un dessin animé n'y est probablement pas soumis) et l'étiquette IA de Meta.

**Comptes à créer** (aucun jeton de Quran Words Daily dans ce dépôt, jamais) : compte Google de la chaîne (décidé) →
chaîne YouTube, projet Google Cloud (YouTube Data API v3 + Analytics, écran de consentement « en production »,
3 jetons séparés : statistiques, envois, playlists), clé AI Studio ; Page Facebook + compte Instagram Créateur reliés,
**nouvelle app Meta** passée en Live (le budget d'appels est par app, partagé sinon avec la Page coranique) ; compte
TikTok + app TikTok (Sandbox, brouillons, préfixe d'URL vérifié sur le Pages du nouveau dépôt) ; jeton GitHub fin
(secrets du seul dépôt, échéance surveillée) ; pages Confidentialité et Conditions sur le Pages du dépôt. Planification :
le cron GitHub suffit si l'heure n'est pas critique, jamais dans un groupe de concurrence partagé avec la publication,
avec l'alerte « créneau jamais tenté » de quran-reels comme filet.

---

## 15. Plan du pilote

| # | Étape | Qui | Durée | Livré |
|---|---|---|---|---|
| 0 | Choisir le nom (question à choix), créer le dépôt **vide et public**, créer le compte Google et la clé AI Studio → secret `GEMINI_API_KEY` du dépôt ; attacher le dépôt à la session | propriétaire | 30 min | dépôt vide, secret |
| 1 | Squelette : README, licences, `CLAUDE.md` (règles des deux dépôts adaptées), `VENDORED.md`, copies datées, `ci.yml` (zod, JSON Schema identique, pytest, ruff, `tsc`) ; PR, checks, fusion | session | 0,5 j | CI verte |
| 2 | Schéma zod + JSON Schema + `bvs rules` + test « copie et casse » | session (subagent Sonnet possible : code spécifié avec tests) | 0,5 j | `npm run validate`, `bvs rules` |
| 3 | Sources : clients Crossref/OpenAlex/Europe PMC, `match`, `verify`, rapport ; **pré-lecture des preuves du pilote** | session | 1 j | `reports/feeling-bad…/sources.md` |
| 4 | **Point de décision** : le verdict tient-il ? sinon 2 idées de remplacement (ci-dessous) | propriétaire (question à choix) | — | idée confirmée |
| 5 | Script : écrivain + relecteur contradictoire (5 hooks de 5 types) ; P1 puis P2 ; relecteur indépendant des DOI | 2 subagents + propriétaire | 0,5-1 j | JSON validé, empreintes |
| 6 | Rig + 3 personnages + `CharacterSheet` (en parallèle de 3-5) | session | 1,5 j | planche validée par le propriétaire |
| 7 | Voix : casting (jour A, 4 requêtes), prises (jour B, 2), corrections (≤ 2) ; alignement, niveau | workflow `voice.yml` + propriétaire (oreille) | 2-3 j calendaires | prises FLAC, voix choisies |
| 8 | Synchro : Rhubarb vs volume sur `LipLab`, choix du propriétaire | session + propriétaire | 0,5 j | `config/lipsync.json` |
| 9 | Coquille + 3 styles + `StyleLab` + `HookLab` (les 5 hooks, 3 s chacun, en une planche) | session | 2-3 j | stills validés |
| 10 | Rendus `render.yml` (3 styles), planches, P3 ; `LIMITES.md` | session + propriétaire | 0,5 j | **3 MP4**, rapport des sources, JSON, `LIMITES.md` |

Total : **~8 à 10 jours de session**, le quota de voix imposant au moins 2 jours calendaires.

**Preuves du pilote, existence vérifiée sur Crossref le 2026-11-22** (titre, premier auteur et année concordent ; aucun
`updated-by` ; **ce que chacune montre reste à lire**, rien n'est affirmé ici) :
Ford, Lam, John & Mauss 2018, *JPSP* (10.1037/pspp0000157 : bénéfices de l'acceptation des émotions négatives,
laboratoire, journal et longitudinal) ; Mauss et al. 2011, *Emotion* (10.1037/a0022010 : effets paradoxaux de la
valorisation du bonheur) ; Bastian et al. 2012, *Emotion* (10.1037/a0024755 : « feeling bad about being sad ») ;
Dejonckheere et al. 2022, *Scientific Reports* (10.1038/s41598-021-04262-z : pression sociale à être heureux) ;
Ford et al. 2014, *J. Soc. Clin. Psychol.* (10.1521/jscp.2014.33.10.890) ; et, pour les nuances, deux méta-analyses :
Aldao, Nolen-Hoeksema & Schweizer 2010, *Clin. Psychol. Rev.* (10.1016/j.cpr.2009.11.004 : stratégies de régulation
émotionnelle et psychopathologie) et Abramowitz, Tolin & Street 2001 (10.1016/S0272-7358(00)00057-X : effets
paradoxaux de la suppression de pensée) ; plus Gloster et al. 2020 (10.1016/j.jcbs.2020.09.009 : revue de
méta-analyses sur l'ACT). Pronostic, à confirmer par la lecture : **⚠️ nuancé, confiance modérée** (beaucoup de
corrélationnel, des échantillons occidentaux, accepter n'est pas se résigner, pas un traitement de la dépression).

**Si le verdict ne tient pas, deux idées de remplacement** (DOI vérifiés sur Crossref le même jour) : « visualiser la
réussite la fait venir » (*Le Secret* et ses suites) face à Kappes & Oettingen 2011, *JESP*
(10.1016/j.jesp.2011.02.003 : les fantasmes positifs « sapent l'énergie ») ; « 10 000 heures de pratique font un
expert » (Gladwell, *Outliers*) face à Macnamara, Hambrick & Oswald 2014, *Psychological Science*
(10.1177/0956797614535810, méta-analyse, **porte une correction à lire**). Les deux promettent un verdict plus tranché
(❌ ou ⚠️ fort) ; le propriétaire choisit.

---

## 16. Risques et limites de cette proposition

1. **Le multi-locuteurs de l'API `interactions` n'est pas vérifié** : la limite de 2 locuteurs l'est, pas le format
   ni le style par locuteur. Si l'émotion par réplique ne passe pas en une prise, un épisode coûte 3-4 requêtes ;
   si les voix de personnages ne sonnent pas égyptien (seule Algieba a été jugée), il faut le secours humain.
2. **Le quota de 10/jour est un chiffre de quran-themes-demo**, non republié pour les modèles TTS sur la page des
   limites ; il peut être plus bas pour un projet neuf (à vérifier dès la clé créée).
3. **Rhubarb en phonétique sur l'arabe** : aucune mesure ; il peut faire pire que le volume. La comparaison est prévue,
   pas le résultat.
4. **Le rig est la pièce la plus chère** (1,5 j estimé) : bouche lisible à 1080 px, 9 visèmes × émotions, mains ;
   le risque est un rendu « kit » sans charme. Repli : les bonshommes `Stick` tels quels avec 3 bouches, déjà validés
   par le propriétaire dans un autre contexte.
5. **La politique YouTube sur les personas IA et la santé** (lue le 2026-11-22) touche de près une chaîne de
   psychologie à voix de synthèse ; la mascotte, la ligne de prudence et l'absence de « conseil » réduisent le
   risque sans l'annuler ; la monétisation est jugée par des humains chez YouTube.
6. **Le « livre » repose sur un résumé** : la session ne lit pas le livre (droits) ; `basis` réduit le risque de lui
   prêter une idée qu'il n'a pas, sans le supprimer ; un épisode peut caricaturer un auteur. Le propriétaire valide
   la formulation ; il n'a peut-être pas lu le livre non plus.
7. **Les preuves se lisent souvent sur le seul résumé** (texte intégral payant) ; deux articles Elsevier testés n'ont
   pas de résumé chez OpenAlex. Un claim « résultats/tableau » dépend du relecteur humain.
8. **Temps de rendu estimés, pas mesurés** pour ces styles ; un style riche (ombres, flous) peut être 4× plus lent.
9. **Remotion n'est pas open source** : gratuit pour lui seul ; si la chaîne devient une structure de plus de 3
   personnes, licence entreprise (FAQ lue). Le README doit le dire pour qu'un contributeur ne soit pas surpris.
10. **zod 4 et Remotion** : je ne passe pas le schéma à Remotion pour éviter un conflit de versions ; si Remotion
    impose zod 3 ailleurs dans sa chaîne, deux versions coexisteront (à vérifier à l'installation).
11. **Réutilisation par copie = dérive** : un correctif de production d'un dépôt ne passe pas seul dans l'autre
    (`VENDORED.md` liste les origines pour le faire à la main).
12. **Choix que je ne peux pas trancher** : nom de la chaîne, mascotte ou bonhomme pour le narrateur, Algieba ou non,
    Flash-Lite comme secours, musique, chiffres 123 sur cette chaîne : chacun est une question à choix pour le
    propriétaire.
13. Ce que je n'ai **pas** vérifié : les noms des voix du modèle 3.8, les voix égyptiennes d'Azure et ses conditions
    de compte, la licence exacte de Rhubarb (MIT de mémoire), la taille des runners du dépôt neuf, la disponibilité
    des noms de chaîne.

---

Sources consultées le 2026-11-22 : documentation Gemini TTS (aistudio.google.com/docs/speech-generation), limites
(aistudio.google.com/docs/rate-limits), conditions Gemini API (aistudio.google.com/docs/terms), FAQ de licence Remotion
(remotion.dev/docs/license/faq), politique de monétisation YouTube (support.google.com/youtube/answer/1311392),
dépôt Rhubarb Lip Sync (github.com/DanielSWolf/rhubarb-lip-sync), prix Azure Speech
(azure.microsoft.com/pricing/details/cognitive-services/speech-services), API Crossref, OpenAlex, Europe PMC,
Semantic Scholar (requêtes de la session).
