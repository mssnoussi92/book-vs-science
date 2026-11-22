# Proposition B : une source de vérité typée, des dossiers qu'on ajoute

Architecte B, 2026-11-22. Accent : extensibilité et contrats typés. Lu : le brief (et sa mise à jour sur le compte
Google), les deux audits, et en lecture seule `Sahib.tsx`, `Lens.tsx`, `styles/kit.ts`, `characters/Character.tsx`,
`bidi.py`, `render/video.py`. Vérifié en ligne ce jour : licences Remotion et Rhubarb, Gemini TTS multi-voix et ses
conditions, `z.toJSONSchema`, politiques YouTube, 9 DOI sur Crossref et OpenAlex. Le reste porte « (à vérifier) ».

## 1. Résumé, noms, licences

1. **Un épisode = un dossier de données** : `episode.json` (la structure, sans une phrase de texte) + un fichier par
   langue `lang/<code>.json` (les textes, rangés par identifiant) + `variation.lock.json` (ce qui a été tiré).
2. **zod est la seule source de vérité** (`packages/schema`) : types TS, validation, et JSON Schema 2020-12 généré
   (`z.toJSONSchema`) et commité, que lisent les outils Python ; la CI échoue si le JSON Schema a dérivé.
3. **Les règles qui croisent les champs** (citation du livre, personne réelle, stéréotypes, verdict cohérent avec les
   études, empreinte des validations) sont un fichier par règle, chacun avec son test « copie et casse ».
4. **Ajouter un style, une langue, un personnage, un geste, un moteur de synchro = un dossier** ; un script
   (`npm run registry`) régénère les listes d'identifiants ; rien d'autre n'est édité à la main.
5. **Un style est une fonction pure d'une timeline résolue** (images, pas secondes) ; il ne dessine jamais le badge,
   la carte d'étude, la carte du livre, les sous-titres ni la signature : la couche `Chrome` les pose par-dessus.
6. **Personnages** : un rig SVG paramétrique (squelette du `Stick` de quran-themes-demo, cinématique inverse,
   visage = émotion ⊕ visème), deux personnages et un narrateur-mascotte, dessinés en code, validés sur planche.
7. **Voix** : Gemini 3.8 Flash TTS sur le compte Google propre à la chaîne ; **2 requêtes par épisode et par langue**
   (dialogue à 2 voix + narrateur), car l'API plafonne à 2 locuteurs par requête (vérifié) ; 1 de réserve.
8. **Sources** : vérification Crossref + OpenAlex par DOI (titre, auteurs, année ± 1, type, rétractations et
   corrections), phrase d'appui retrouvée dans le résumé, revérification aveugle par un second agent ; preuve commitée.
9. **Pipeline TS** (`bvs`, Node 22 sans compilation) en étapes à empreinte ; **Python seulement pour l'audio**
   (faster-whisper, niveau EBU R128, planches), derrière un contrat JSON Schema ; Rhubarb en binaire épinglé.
10. **Portes humaines mécaniques** : une validation porte l'empreinte de ce qu'elle valide ; un texte changé la rend
    périmée, et la voix comme le rendu refusent de partir.

**Noms de dépôt** (indépendants du nom de chaîne, qui peut changer) : **`book-vs-science`** (recommandé : dit ce que
fait le code), `shelf-to-lab`, `kitab-lab`.

**Noms de chaîne** (disponibilité sur les 4 plateformes : à vérifier) :

| Nom | Translittération | Sens | Avis |
|---|---|---|---|
| **الكتاب في المعمل** | El-Ketab fel-Ma3mal | « le livre au labo » | **Recommandé** : livre + science en 3 mots, « معمل » est le mot égyptien du labo |
| ميزان الكتب | Mizan el-Kotob | « la balance des livres » | Clair dans tous les dialectes ; « science » seulement suggérée |
| كتاب ولا علم؟ | Ketab walla 3elm? | « livre ou science ? » | **Contre-avis** : en fousha « ولا علم » se lit « et sans science » ; un spectateur maghrébin ou du Golfe peut lire « un livre sans savoir » |

**Licences** (décision du propriétaire, question à choix) : code **MIT** (comme ses deux dépôts) ; contenu (épisodes
JSON, dessins des personnages, vidéos) **CC BY-NC-SA 4.0** recommandé : le dépôt public permet déjà à n'importe qui de
re-rendre nos épisodes ; « NC » interdit la réutilisation monétisée, au prix de ne pas être « libre » au sens strict.
Tiers : **Remotion** sous sa licence propre, gratuite pour « an individual » et « a for-profit organization with up to
3 employees » (LICENSE.md lu ce jour) ; **Rhubarb Lip Sync MIT** (composants BSD/Boost, LICENSE.md lu ce jour) ;
faster-whisper et poids Whisper MIT ; polices OFL (Cairo, Readex Pro, Noto Kufi Arabic, Inter : OFL à vérifier
fichier par fichier, licences copiées à côté).

## 2. Arborescence du dépôt

```
book-vs-science/
├── README.md  LICENSE (MIT)  LICENSE-CONTENT.md (CC BY-NC-SA 4.0)  NOTICE (tiers)  LIMITES.md  VENDORED.md
├── CLAUDE.md                     règles du propriétaire (contredire, questions à choix, « seul le propriétaire »)
├── package.json  package-lock.json  tsconfig.base.json (erasableSyntaxOnly)  eslint.config.js
├── tools.lock.json               binaires et modèles épinglés : rhubarb 1.13.0 (url + sha256), whisper (id + révision)
├── packages/                     npm workspaces, aucun paquet publié sur npm
│   ├── schema/    src/{episode,lang,language,book,source,character,timeline,post,approval}.ts
│   │              src/ids.generated.ts (StyleId, CharacterId, LangCode, Gesture, Setting : générés)
│   │              scripts/emit-json-schema.ts → ../../schemas/*.schema.json
│   ├── text/      canonical.ts (JSON canonique + sha256), bidi.ts (port de bidi.py), digits.ts, words.ts
│   ├── rules/     src/rules/<rule-id>.ts + <rule-id>.test.ts ; src/index.generated.ts
│   ├── sources/   crossref.ts openalex.ts normalize.ts match.ts verify.ts report.ts
│   ├── voice/     plan.ts (requêtes ≤ 2 locuteurs) engines/{gemini,recorded}.ts styles.ts (émotion → direction)
│   ├── lipsync/   track.ts (format MouthTrack) engines/{rhubarb,text,volume}.ts compare.ts
│   ├── rig/       skeleton.ts ik.ts Rig.tsx Sheet.tsx face/{emotions,visemes,Mouth,Eyes,Brows}.tsx
│   │              gestures/<id>.ts  skins/flat/ (paper/, chalk/ plus tard)
│   ├── video/     Root.tsx EpisodeVideo.tsx contract.ts registry.generated.ts frames.ts
│   │              chrome/{Badge,StudyCard,BookCard,Subtitles,Signature,SafeArea}.tsx  remotion.config.ts
│   └── pipeline/  cli.ts (bin `bvs`) runner.ts (empreintes, cache, portes) steps/<step>.ts variation.ts
├── styles/                       un dossier = un style ; rien d'autre à toucher
│   ├── cartoon-scene/  index.ts Segments.tsx settings/{kitchen,office,bus,bedroom,generic}.tsx README.md
│   ├── kinetic-type/
│   └── split-screen/             (whiteboard/, infographic/, paper-cutout/ : plus tard)
├── characters/                   un dossier = un personnage
│   ├── salma/  index.ts parts.tsx      ├── karim/  …      └── lens/ (narrateur-mascotte)
├── languages/                    un dossier = une langue
│   ├── ar-EG/  index.ts (LanguagePack) pronunciation.json visemes.ts lexicons/{causal,generalizing}.json
│   ├── en/     index.ts lexicons/…   └── fr/  index.ts lexicons/…   (textes seulement dans le pilote)
├── py/                           uv ; Python seulement là où il est meilleur
│   ├── pyproject.toml uv.lock
│   └── bvs_audio/ cli.py align.py level.py mouth_volume.py sfx.py qc.py   tests/
├── content/
│   ├── books/<slug>.json         titre, auteur, année, ISBN ; jamais d'image
│   ├── sources/<doi-slug>.json   métadonnées déclarées + <doi-slug>.verify.json (preuve, générée)
│   ├── ideas/<slug>.json         idées en attente, avec le repérage des méta-analyses
│   ├── casting/<lang>.json       personnage → voix, par langue
│   ├── episodes/<id>/ episode.json lang/{ar-EG,en,fr}.json variation.lock.json takes/ar-EG/<fp>.flac
│   └── ledger.jsonl              une ligne par épisode rendu : axes de variation tirés
├── schemas/                      JSON Schema générés, commités (CI : aucune dérive)
├── review/<id>/                  générés, commités, pour le téléphone : script.<lang>.md, sources.md
├── assets/fonts/ (OFL + licences)
├── .github/workflows/ validate.yml sources.yml voice.yml render.yml
├── .claude/skills/ write-episode challenge-episode verify-sources voice-takes render-check add-style
└── build/ .cache/                ignorés
```

Dépendances : `schema` ← `text` ← (`rules`, `sources`, `voice`, `lipsync`) ← `pipeline` ; `rig` ← `video` ←
`styles/*`. `schema` n'importe jamais le code d'un style : il n'importe que `ids.generated.ts` (des chaînes), ce qui
casse le cycle « le schéma connaît les styles, les styles lisent le schéma ». ESLint (`no-restricted-imports`) interdit
à un style d'importer `pipeline`, `voice`, `sources` ou un autre style.

## 3. Schéma d'un épisode (zod 4)

### 3.1 Structure (extrait réel de `packages/schema/src/episode.ts`)

```ts
import { z } from "zod";
import { CharacterId, Gesture, LangCode, Setting, StyleId } from "./ids.generated.ts";
import { Approval } from "./approval.ts";

export const Slug = z.string().regex(/^[a-z][a-z0-9-]{1,47}$/);
export const NodeId = z.string().regex(/^[a-z][a-z0-9]{0,11}$/);   // local: "h1", "s1", "l4", "e2"
export const Emotion = z.enum([
  "neutral", "happy", "sad", "annoyed", "anxious", "ashamed",
  "surprised", "relieved", "amused", "tired", "curious", "determined",
]);
export const Look = z.enum(["other", "viewer", "down", "away", "phone"]);

export const HookType = z.enum([
  "question",        // a question about the viewer's own life
  "paradox",         // a counter-intuitive statement, backed by an evidence item
  "cold-open",       // the scene starts mid-crisis: a character's line
  "book-vs-science", // the book's promise, the badge hidden until the verdict
  "pov",             // "POV:" the viewer is inside the situation
  "number",          // a figure from a verified study
  "confession",      // a character admits something
]);
export const Hook = z.strictObject({
  id: NodeId,
  type: HookType,
  spokenBy: z.union([z.literal("narrator"), z.literal("none"), CharacterId]),
  firstFrame: z.enum(["text-over-scene", "close-up", "badge-tease", "split"]),
  emotion: Emotion.default("neutral"),
  evidence: NodeId.optional(),      // required by rule hook-evidence for "paradox" and "number"
});

export const Line = z.strictObject({
  kind: z.literal("line"),
  id: NodeId,
  speaker: CharacterId,             // a scene never holds the narrator
  emotion: Emotion,
  intensity: z.number().min(0).max(1).default(0.5),
  delivery: z.string().max(80).optional(),   // TTS direction in English, never spoken, never shown
  gesture: Gesture.optional(),
  look: Look.optional(),
});
export const Action = z.strictObject({
  kind: z.literal("action"),
  id: NodeId,
  who: CharacterId,
  gesture: Gesture,
  emotion: Emotion.optional(),
  seconds: z.number().min(0.3).max(3),
});
export const Scene = z.strictObject({
  id: NodeId,
  setting: Setting,
  cast: z.array(CharacterId).min(1).max(2),
  purpose: z.enum(["problem", "escalation", "twist", "resolution"]),
  beats: z.array(z.discriminatedUnion("kind", [Line, Action])).min(2).max(12),
});

export const BookIdea = z.strictObject({
  book: Slug,                       // content/books/<slug>.json: title, author, year, ISBN
  concept: z.string().max(48),      // the idea's own name, <= 6 words ("the Feedback Loop from Hell")
  // No quotation field exists: the idea is reformulated, in lang/<code>.json under "book.idea".
});

export const StudyKind = z.enum([
  "umbrella-review", "meta-analysis", "systematic-review", "rct",
  "experiment", "longitudinal", "cross-sectional", "preprint",
]);
export const Evidence = z.strictObject({
  id: NodeId,
  source: z.string().regex(/^doi:10\.\d{4,9}\/\S+$/i),   // → content/sources/<doi-slug>.json
  relation: z.enum(["supports", "nuances", "contradicts"]),
  claim: z.string().max(240),       // English, internal: what this study shows, in our own words
  population: z.string().max(120),  // who was studied (shown on the study card)
  support: z.strictObject({         // the abstract sentence that says it (OpenAlex), checked by `bvs verify`
    sentence: z.number().int().min(0),
    sha256: z.string().regex(/^[0-9a-f]{64}$/),
  }).optional(),
  onScreen: z.boolean().default(false),
});

export const Verdict = z.strictObject({
  badge: z.enum(["confirmed", "nuanced", "contradicted"]),      // ✅ ⚠️ ❌
  confidence: z.enum(["high", "moderate", "low"]),
  basis: z.array(NodeId).min(1),    // evidence ids the verdict rests on
  nuances: z.array(z.strictObject({ id: NodeId, forWhom: z.string().max(80) })).max(3),
  // texts: "verdict.rationale", "verdict.<nuance id>"
});
export const Takeaway = z.strictObject({
  kind: z.enum(["try-today", "notice", "say", "stop"]),
  evidence: NodeId.optional(),
});

export const Segment = z.enum(["hook", "scene", "book", "verdict", "takeaway"]);
export const Variation = z.strictObject({  // owner overrides; whatever is absent is drawn (section 11)
  style: StyleId.optional(),
  structure: z.enum(["classic", "verdict-tease", "rewind", "book-first"]).optional(),
  hook: NodeId.optional(),
  palette: z.string().optional(),
  music: z.union([z.literal("none"), Slug]).optional(),
});

export const Episode = z.strictObject({
  $schema: z.string().optional(),
  id: Slug,
  format: z.literal("short-v1"),
  languages: z.array(LangCode).min(1),       // languages this episode is written in
  topic: z.strictObject({
    tags: z.array(Slug).max(6),
    sensitive: z.array(z.enum(["gender", "mental-health", "parenting", "money", "body"])).default([]),
  }),
  cast: z.strictObject({ narrator: CharacterId, struggles: CharacterId, helps: CharacterId.optional() }),
  hooks: z.array(Hook).min(5),
  scenes: z.array(Scene).min(1).max(3),
  book: BookIdea,
  evidence: z.array(Evidence).min(1),
  verdict: Verdict,
  takeaway: Takeaway,
  variation: Variation.default({}),
  sources_validated: Approval.optional(),   // the owner's word on evidence + verdict (section 3.4)
}).meta({ id: "Episode", title: "One episode: structure only, no text" });
export type Episode = z.infer<typeof Episode>;

// source.ts, book.ts: registry entries shared by every episode (content/sources/, content/books/)
export const Source = z.strictObject({
  doi: z.string(), kind: StudyKind,
  declared: z.strictObject({ title: z.string(), authors: z.array(z.string()).min(1), year: z.number().int(), venue: z.string() }),
  n: z.number().int().positive().optional(),           // participants, or studies for a meta-analysis
  effect: z.strictObject({ metric: z.enum(["d", "g", "r", "OR"]), value: z.number(),
    ci: z.tuple([z.number(), z.number()]).optional() }).optional(),
  shows: z.string().max(300),                          // English, internal: what it shows, in our words
  limits: z.array(z.string().max(160)).min(1),         // at least one limit, always
  acknowledged: z.array(z.strictObject({ doi: z.string(), why: z.string() })).default([]),  // corrections read
}).meta({ id: "Source" });
export const Book = z.strictObject({                   // no image field: no cover, ever
  slug: Slug, title: z.string(), author: z.string(), year: z.number().int(), isbn: z.string().optional(),
  titles: z.record(LangCode, z.string()).optional(),   // published translated titles (e.g. the Arabic edition)
}).meta({ id: "Book" });
```

### 3.2 Textes multilingues sans dupliquer la structure (`lang.ts`)

La structure ne contient aucune phrase. Chaque nœud qui porte du texte a une **clé dérivée de ses identifiants** :
`hook.h3`, `s1.l4`, `book.idea`, `verdict.rationale`, `verdict.n1`, `takeaway.action`, `card.population.e2`,
`title.youtube`, `description`. `requiredKeys(episode)` (fonction pure du paquet `schema`) donne la liste ; une langue
est **complète** quand son fichier les a toutes, et seule une langue complète et validée peut être voisée ou rendue.

```ts
export const LangFile = z.strictObject({
  $schema: z.string().optional(),
  lang: LangCode,
  texts: z.record(z.string().regex(/^[a-z0-9]+(\.[a-z0-9]+)+$/), z.string().min(1).max(400)),
  script_validated: Approval.optional(),    // the owner's word on this language's script
}).meta({ id: "LangFile" });
```

Extrait de `content/episodes/feeling-bad-about-feeling-bad/lang/ar-EG.json` (phrases **illustratives**, à écrire par
le rédacteur, à challenger, à valider) :

```json
{ "lang": "ar-EG", "texts": {
  "hook.h1": "إمتى آخر مرة زعلت… وبعدين زعلت أكتر عشان زعلت؟",
  "hook.h2": "كل ما تجري ورا السعادة… ممكن تبعد عنك.",
  "s1.l1": "أنا مش المفروض أبقى متضايقة كده… أنا عندي كل حاجة!",
  "book.idea": "الكتاب بيقول: لما تحارب زعلك، بتلف في دايرة… زعل فوق زعل.",
  "verdict.rationale": "الدراسات بتقول إن اللي بيقبلوا مشاعرهم السلبية حالتهم النفسية أحسن… بس مش لكل الناس بنفس الدرجة.",
  "takeaway.action": "المرة الجاية: سمّي إحساسك بصوت واطي، وسيبه يعدّي." } }
```

Ajouter le français = ajouter `lang/fr.json` (et, une fois, `languages/fr/`) ; `episode.json` ne bouge pas. Les titres
d'études ne se traduisent pas : ils viennent du registre de sources, tels que publiés (anglais, LTR, isolés dans le
texte arabe par `<bdi dir="ltr">` à l'écran et par les marques de `bidi.ts` dans les textes de plateforme).

### 3.3 Les cinq hooks du pilote (types différents)

| id | type | dit par | 1ʳᵉ image | appui |
|---|---|---|---|---|
| h1 | `question` | narrateur | `text-over-scene` | — |
| h2 | `paradox` | narrateur | `close-up` | `evidence: e2` (Mauss et al., 2011) |
| h3 | `cold-open` | Salma | `close-up` | — |
| h4 | `book-vs-science` | narrateur | `badge-tease` | — |
| h5 | `pov` | aucun (texte) | `text-over-scene` | — |

Règles (`packages/rules`) : au moins 5 hooks et 5 types distincts ; `paradox` et `number` exigent une `evidence` de
relation `supports` ; un hook tient en 3 s (estimé par le débit de la langue : `LanguagePack.wordsPerSecond`, à
calibrer sur la première prise) et en `LanguagePack.limits.hookWords` mots (ar-EG : 9).

### 3.4 Validations humaines (`approval.ts`)

```ts
export const Approval = z.strictObject({
  on: z.iso.datetime(),
  words: z.string().min(2).max(300),          // the owner's words, verbatim ("je valide le script")
  scope: z.string().max(80),                  // "script ar-EG", "sources"
  hash: z.string().regex(/^[0-9a-f]{64}$/),   // sha256 of the canonical JSON of what he approved
}).meta({ id: "Approval" });
```

- `script_validated` (dans `lang/<code>.json`) : empreinte de `episode.json` **sans** `sources_validated` ni
  `variation` + des textes de cette langue. `sources_validated` (dans `episode.json`) : empreinte de
  `evidence`, `verdict` et des `*.verify.json` cités.
- Écrites par `bvs approve <id> script --lang ar-EG --words "<ses mots>"`, que la session lance **seulement après sa
  parole** ; la commande calcule l'empreinte. La règle `approvals-fresh` compare l'empreinte au contenu courant :
  une réplique changée après validation redevient à valider, sans que personne ait à s'en souvenir.
- Limite honnête : aucune preuve technique que c'est lui (les outils GitHub d'une session agissent sous son compte,
  leçon de quran-reels) ; la garde est la règle de `CLAUDE.md` + `words` verbatim + la PR qui le montre.

## 4. Contrat d'un style

### 4.1 L'interface (`packages/video/src/contract.ts`)

```ts
import type { z } from "zod";
import type { Timeline, TimelineSegment, SegmentKind } from "@bvs/schema/timeline";
import type { LanguagePack } from "@bvs/schema/language";

export type Aspect = "9x16" | "16x9";
export type Insets = { top: number; right: number; bottom: number; left: number };
export type Frame = { w: number; h: number; aspect: Aspect; safe: Insets; fps: 30 };
export type Rng = { next(): number; pick<T>(xs: readonly T[]): T };

export type StyleProps<P> = { tl: Timeline; frame: Frame; params: P; lang: LanguagePack };
export type SegmentProps<K extends SegmentKind, P> = StyleProps<P> & {
  seg: TimelineSegment<K>;   // f0, f1, lines with frames, mouth tracks, camera cues
  f: number;                 // frame inside the segment
};
/** Where the chrome may sit; the chrome checks every box is inside frame.safe. */
export type ChromeAnchors = {
  badge: "top" | "center" | "lower-third";
  studyCard: "top" | "bottom";
  bookCard: "top" | "center";
  subtitles: "low" | "mid";   // never under the platform UI (safe.bottom)
};

export interface StyleModule<P> {
  id: string;
  version: number;                       // in every render's fingerprint
  aspects: readonly Aspect[];
  usesRig: boolean;
  params: z.ZodType<P>;                  // what the variation engine may draw for this style
  draw(rng: Rng): P;                     // deterministic given rng
  anchors(frame: Frame, params: P): ChromeAnchors;
  Background: React.FC<StyleProps<P>>;
  segments: { [K in SegmentKind]: React.FC<SegmentProps<K, P>> };
  Transition?: React.FC<StyleProps<P> & { from: SegmentKind; to: SegmentKind; f: number; n: number }>;
  bench?: { fps: number; measured: string };   // written by `bvs bench`
}
export const defineStyle = <P,>(s: StyleModule<P>): StyleModule<P> => s;
```

### 4.2 Le compositeur (ce qu'un style ne peut pas retirer)

```tsx
export const EpisodeVideo: React.FC<EpisodeProps> = ({ tl, style: id, aspect, params, lang }) => {
  const style = STYLES[id];                       // registry.generated.ts
  const frame = FRAMES[aspect];
  const p = style.params.parse(params);
  return (
    <AbsoluteFill>
      <style.Background tl={tl} frame={frame} params={p} lang={lang} />
      {tl.segments.map((seg) => {
        const Seg = style.segments[seg.kind] as React.FC<SegmentProps<typeof seg.kind, unknown>>;
        return (
          <Sequence key={seg.key} from={seg.f0} durationInFrames={seg.f1 - seg.f0}>
            <SegFrame render={(f) => <Seg tl={tl} frame={frame} params={p} lang={lang} seg={seg} f={f} />} />
          </Sequence>
        );
      })}
      <Chrome tl={tl} frame={frame} anchors={style.anchors(frame, p)} lang={lang} />
      <Audio src={staticFile(tl.audio.mix)} />
    </AbsoluteFill>
  );
};
```

`Chrome` est un frère posé après le style, pas un enfant : un style ne peut ni le masquer ni le restyler. **Un style ne
décide jamais** : le badge (✅/⚠️/❌, couleurs, pictogramme, libellé de la langue), la carte d'étude (auteurs, année,
revue, type d'étude, n, taille d'effet en mots, composés depuis le registre), la carte du livre (titre et auteur en
texte, jamais d'image), les sous-titres (texte exact de la langue, mots horodatés), la signature, les zones sûres
(9:16 : haut 250, bas 420, côtés 90, comme les deux dépôts ; 16:9 : 80/160/120/160). Il choisit seulement parmi les
`ChromeAnchors` permis, et un test vérifie que chaque boîte reste dans `safe` pour toutes les valeurs.

### 4.3 Les trois styles du pilote et les suivants

| Style | `usesRig` | Ce qu'il dessine par segment |
|---|---|---|
| `cartoon-scene` | oui | décor du `Setting` (cuisine, bureau, bus…), personnages en plans larges/moyens/serrés selon les `camera` de la timeline ; livre : un livre générique fermé (pas de couverture) sur la table, l'idée en bulle ; verdict : le narrateur-loupe entre en scène |
| `kinetic-type` | têtes seules | les mots arrivent au rythme des mots horodatés, mots d'appui en gras (`*mot*` dans le texte) ; visages en médaillon qui parlent (même `MouthTrack`) |
| `split-screen` | oui (réduit) | 9:16 haut/bas, 16:9 gauche/droite : « le livre » (papier, idée) contre « la science » (grille, études qui tombent, jauge) ; la scène joue en petit ; au verdict la frontière se déplace vers le gagnant |
| `whiteboard` (plus tard) | oui, peau `ink` | traits révélés par `strokeDasharray` sur la même géométrie du rig |
| `infographic` (plus tard) | non | barres/forêts tirées des `effect` des sources (aucun chiffre tapé) |
| `paper-cutout` (plus tard) | oui, peau `paper` | même squelette, membres en papier découpé, légère rotation au pas (« 2 images ») |

Pourquoi les scripts n'ont jamais à changer : le script parle un **vocabulaire sémantique fermé** (`Emotion`,
`Gesture`, `Look`, `Setting`, `purpose` d'une scène, types de hook), jamais de coordonnées. Les gestes vivent dans le
rig (`rig/gestures/<id>.ts`), pas dans les styles ; un `Setting` qu'un style n'a pas dessiné tombe sur son `generic`
(test : chaque style rend chaque `Setting`). Un style lit `Timeline`, jamais `Episode`.

**9:16 et 16:9** : `Frame` est un paramètre ; une composition par `(style, aspect)` est générée depuis le registre
(`cartoon-scene-9x16`…). Le pilote rend 9:16 ; la CI fait une image fixe 16:9 de chaque style pour que le contrat
reste tenu (leçon de quran-themes-demo : le 16:9 « redessiné à la main par scène » coûte cher s'il vient après).

## 5. Personnages

### 5.1 Le rig (`packages/rig`)

```tsx
export type CharacterDef = {
  id: string;
  kind: "biped" | "mascot";
  proportions: Partial<typeof SEG>;        // segment lengths, head radius
  palette: { skin: string; top: string; bottom: string; hair: string; ink: string };
  Hair?: React.FC<{ r: number }>; Outfit?: React.FC<OutfitProps>;   // plain SVG paths, written in code
  voiceTimbre: "low" | "mid" | "high";     // only a hint for casting
  fictional: true;                         // the schema has no other value
  approval?: Approval;                     // the owner's word on the model sheet
};
export type RigProps = {
  def: CharacterDef; x: number; y: number; scale: number; facing: 1 | -1;
  pose: Pose;                              // from gestures + base pose, already interpolated
  face: FaceParams;                        // from Emotion (+ intensity), interpolated over 5 frames
  mouth: MouthParams;                      // from the MouthTrack viseme at this frame
  blink: number;                           // 0..1, from blinkAt(frame, seed, emotion)
  look: Look; hands?: { front?: P2; back?: P2 };    // IK targets
  held?: { front?: React.ReactNode; back?: React.ReactNode };
  skin?: "flat" | "paper" | "ink";
};
```

- **Squelette** : repris de `Stick` (`Sahib.tsx`) : deux segments par membre (`SEG`), angles depuis la verticale,
  `reach()` (cinématique inverse à deux os avec côté du coude) pour qu'une main atteigne un point (téléphone, tasse,
  épaule de l'autre), `POSES`, `mix()` et `walk()` de `Lens.tsx`, le contour par double trait. Proportions changées :
  **tête plus grande** (rayon ≥ 90 px en plan moyen 1080×1920, contre 68 px aujourd'hui) pour que la bouche se lise.
- **Bras : poses ou IK.** Un geste (`gestures/facepalm.ts`) est une liste d'images clés `{t, pose?, hands?}` avec
  courbe ; une main avec cible passe en IK, sinon la pose fait foi. Ajouter un geste = un fichier.
- **Émotion → visage** : `FaceParams = {browInner, browOuter, browRaise, lidTop, lidBottom, pupil, cornerLift,
  cheek}` ; les 12 visages de `FaceMarks` servent de point de départ aux préréglages ; l'émotion règle aussi le corps
  (`lean`, épaules) ; transition sur 5 images.
- **Visèmes Rhubarb → bouche** : la bouche est paramétrique (`MouthParams = {open, width, round, teeth, tongue}`) et
  combinée à l'émotion (`cornerLift`) : 9 formes × 12 émotions sans dessiner 108 bouches.

| Visème | Son (Rhubarb) | open | width | round | dents/langue |
|---|---|---|---|---|---|
| A | M, B, P | 0 | 0,9 | 0 | — |
| B | consonnes | 0,15 | 0,9 | 0 | dents |
| C | EH | 0,45 | 0,85 | 0 | — |
| D | AA | 0,8 | 0,8 | 0 | — |
| E | AO, ER | 0,45 | 0,6 | 0,5 | — |
| F | UW, OW, W | 0,25 | 0,35 | 1 | — |
| G | F, V | 0,1 | 0,85 | 0 | dents sur lèvre |
| H | L long | 0,4 | 0,8 | 0 | langue |
| X | repos | 0 | 0,8 | 0 | — |

- **Clignement** : `blinkAt(frame, seed, emotion)` : intervalle tiré entre 2 et 5 s (graine du personnage + épisode),
  6 images, supprimé en `surprised` ; jamais aléatoire au rendu (reproductible).
- **Planche** : `Sheet.tsx`, une `Still` générée pour chaque personnage du registre, en trois rangées : 6 poses,
  12 émotions, 9 visèmes. C'est sur elle que le propriétaire valide un personnage (`approval` dans `characters/<id>/index.ts`).

### 5.2 Deux personnages et un narrateur, sans IA

Dessinés **en code** (chemins SVG écrits par la session, comme `Stick`), jamais générés par un modèle d'image.
Proposition, à valider sur planche : **Salma** et **Karim** (prénoms courants, personnages inventés), fin de vingtaine,
silhouettes distinctes (rond contre anguleux, deux couleurs dominantes) ; **le narrateur est une mascotte**, « عدسة »
(une loupe avec un visage et deux bras-traits). Contre l'idée d'un narrateur humain en blouse : figure d'autorité
cliché, et il faudrait lui choisir un genre ; la loupe dit « on vérifie », sert de marque, et reste neutre.

Règle `roles-rotation` (sur `content/ledger.jsonl`) : un même personnage n'est pas « celui qui souffre » dans plus de
70 % des 10 derniers épisodes, et **alterne** dans les épisodes marqués `gender`.

### 5.3 Aucune personne réelle, l'auteur compris

- `CharacterDef.fictional: true` est le seul type possible ; aucun champ `basedOn`, aucune image importée.
- Règle `no-real-person` : le nom de l'auteur (registre `books`) et une liste `content/people-blocklist.json`
  n'apparaissent **que** dans la carte du livre (Chrome) ; jamais dans une réplique, jamais comme locuteur, jamais
  « مانسون بيقول » : le narrateur dit « الكتاب بيقول ». YouTube cite parmi ce qui exige une divulgation « Making it
  appear as if someone gave advice that they did not actually give » (page lue ce jour) : on ne fait jamais parler
  l'auteur.

## 6. Voix en arabe égyptien, à plusieurs voix, avec émotion

**Faits vérifiés ce jour** (page de Google AI Studio « speech-generation ») : `gemini-3.8-flash-tts` et
`gemini-3.8-flash-lite-tts` font le multi-locuteurs, **2 locuteurs au plus par requête** ; l'émotion se donne **par
réplique** (`speech_metadata` avec `speaker` et `style`, ex. « cheerful and friendly ») ; balises en ligne
`<laugh>`, `<short pause>` ; « Egyptian Arabic » coché pour les deux modèles 3.8, langue détectée depuis le texte.
Le client actuel (`tools/tts/gemini.py`) n'envoie qu'un locuteur : le corps multi-voix est à écrire et à essayer.

**Compte** (décision du propriétaire, 2026-11-22) : un compte Google propre à la chaîne → son projet, sa clé
(`GEMINI_API_KEY` du nouveau dépôt), son palier gratuit (**10 requêtes/jour : chiffre non publié sur la page des
limites lue ce jour, à vérifier dans AI Studio pour le modèle choisi**). Jamais utilisé pour compléter le quota de
quran-themes-demo, et inversement.

### 6.1 Plan des requêtes (`packages/voice/plan.ts`, fonction pure, testée)

Entrée : l'épisode, la langue, le casting ; sortie : des requêtes de **≤ 2 locuteurs**, chacune avec une empreinte
(textes, voix, styles, modèle). Pour le pilote :

| Requête | Locuteurs | Contenu | Durée visée |
|---|---|---|---|
| A — dialogue | Salma + Karim | toutes les répliques des scènes, hooks `cold-open`/`confession` | 25–35 s |
| B — narrateur | Lens | les hooks qu'il dit (h1, h2, h4 : on les voise tous, un seul sert par rendu, les autres aux variantes), l'idée du livre, le verdict, les nuances, l'à-retenir | 30–45 s |

**Budget** : 2 requêtes par épisode et par langue + 1 de réserve = **3** ; une correction refait **la seule requête
touchée** (son empreinte a changé), en regroupant toutes les corrections de cette requête (patron `narration-takes`).
Avec ~10/jour : un épisode neuf par jour et ses reprises, deux au plus. Garde-fous repris de `gemini.py` :
`--max-requests` (refus avant envoi), pause 35 s, reprise sur 429/5xx sauf message « per day », prise refusée sans
perdre les autres, et **les prises FLAC commitées, jamais redemandées** (`content/episodes/<id>/takes/<lang>/<fp>.flac`).
La clé reste un secret du dépôt lu par le workflow `voice.yml` seul (la session ne peut pas l'envoyer elle-même :
noté dans quran-themes-demo).

**Émotion** : `languages/ar-EG/index.ts → ttsStyle(emotion, intensity, delivery)` produit la direction (en anglais :
« Egyptian Arabic, Cairo accent, casual; slightly annoyed, speaking fast »). Prononciations corrigées :
`languages/ar-EG/pronunciation.json` (vocalisation dans le texte voisé seulement, comme `voice-spelling`).

### 6.2 Voix choisies, secours, et ce qui dirait « ça ne suffit pas »

- **Casting** (`content/casting/ar-EG.json`) à choisir à l'oreille parmi les voix préconstruites ; **contre-avis** :
  ne pas reprendre `Algieba` pour le narrateur, c'est la voix de l'autre chaîne ; deux marques, deux voix.
- **Secours, dans l'ordre** : (1) `gemini-3.8-flash-lite-tts`, même corps de requête (quota propre : à vérifier) ;
  (2) trois requêtes mono-voix au lieu de deux (si le multi-voix sonne mal en égyptien) ; (3) **voix humaines
  enregistrées au téléphone** (moteur `recorded` : un WAV par réplique déposé dans une release ; le reste du pipeline
  ne change pas) ; (4) aucun modèle libre : Chatterbox Multilingual (MIT) jugé « trop rapide/mécanique » et lent sur
  CPU, Supertonic 3 « très mauvais » à son oreille (2026-11-11) ; VoiceTut (poids dérivés CC-BY-NC) seulement pour une
  animatique de minutage, jamais publiée.
- **Conditions** (page lue ce jour, pas un avis juridique) : Google « won't claim ownership » des sorties ; services
  « for professional or business purposes » ; dans l'EEE les conditions de données des services payants s'appliquent
  aussi au quota gratuit ; « You may use only Paid Services when making API Clients available to users in the EEA »
  vise un client offert à des utilisateurs, pas notre cas (lecture à confirmer par le propriétaire) ; 18 ans minimum.
  YouTube n'exige pas de divulgation pour une animation non réaliste (page lue ce jour) ; on garde quand même la
  ligne « voix générée par IA » dans chaque description (règle de quran-themes-demo).
- **Test d'écoute** (pilote, 2 requêtes) : MP3 dans la pré-release `voice-<id>`. « La qualité ne suffit pas » si
  l'un de ces points tombe : (a) le propriétaire entend de la fousha ou un accent non égyptien ; (b) il ne distingue
  pas les deux personnages les yeux fermés ; (c) il ne reconnaît pas l'émotion de 2 répliques marquées sur 3, écoutées
  sans le script (question à choix) ; (d) plus de 2 reprises par épisode en moyenne sur les 3 premiers (le quota ne
  tient plus). Whisper signale les mots mal dits (`heard < 0,6`) mais ne juge pas la qualité (leçon de
  `docs/retention.md` : une voix « très mauvaise » transcrite sans faute).

## 7. Synchro labiale

**Trois moteurs (et leur mélange `hybrid`), un seul format**, chacun un fichier de `packages/lipsync/engines/` :

1. `rhubarb` : Rhubarb 1.13.0, `rhubarb -r phonetic --extendedShapes GHX -f json -o out.json line.wav` ; le mode
   `phonetic` est « language-independent », recommandé « if your recordings are not in English » (README lu ce jour).
   Binaire de la release (87 Mo, téléchargeable d'après le brief), sha256 dans `tools.lock.json`, cache Actions.
   Lancé **par réplique** : la prise A contient deux voix ; l'alignement donne les bornes de chaque réplique, on coupe
   un WAV par réplique, on décale les repères.
2. `text` : nous avons le texte et les temps des mots (alignement) : `languages/ar-EG/visemes.ts` associe les lettres
   aux visèmes (ب م → A, و → F, ف → G, ل → H, voyelles longues ا → D, ي → B comme le « EE » de Rhubarb…), répartis au prorata dans chaque mot,
   X entre les mots. Déterministe, pensé pour l'arabe, sans modèle anglais.
3. `volume` : repli demandé, patron de `Character.tsx` (RMS sur 0,1 s, seuil 0,08) amélioré : enveloppe par
   réplique, 3 niveaux (X/A, B/C, D), hystérésis ; calculé en Python (`mouth_volume.py`, numpy), pas dans le
   navigateur au rendu.

**Format passé à Remotion** (dans `timeline.json`, validé par zod) :

```ts
export const Viseme = z.enum(["A", "B", "C", "D", "E", "F", "G", "H", "X"]);
export const MouthTrack = z.strictObject({
  engine: z.enum(["rhubarb", "text", "volume", "hybrid"]),
  fps: z.literal(30),
  cues: z.array(z.strictObject({ f: z.number().int().min(0), shape: Viseme })),  // sorted, run-length
});
// timeline.tracks.mouth: Record<CharacterId, MouthTrack>
```

Le rig fait `shapeAt(track, frame)` (recherche dichotomique) et un fondu de 2 images entre paramètres de bouche.
`hybrid` = Rhubarb forcé en X dans les silences entre mots (> 120 ms d'après l'alignement).

**Comment on décide** : (1) mesures automatiques sur la prise du pilote : part des images de silence où la bouche est
fermée (≥ 95 %), retard d'ouverture au début des mots (≤ 2 images), changements de forme par seconde (> 12 =
papillotement), fermeture A présente dans les mots qui contiennent ب ou م ; (2) **le propriétaire, à l'aveugle** :
le même gros plan de 6 s rendu avec 3 moteurs, ordre tiré, numérotés 1-2-3, question à choix. Le gagnant devient
`LanguagePack.lipsync` de ar-EG ; un épisode peut le changer. Ajouter un moteur = un fichier ; rien d'autre ne change.

## 8. Pipeline

### 8.1 Étapes et commandes (`bvs`, TypeScript exécuté par Node ≥ 22.18 sans compilation)

| Étape | Commande | Produit | Où |
|---|---|---|---|
| idée | `bvs idea scout <slug>` | `content/ideas/<slug>.json` : livre, concept, à qui ça parle, méta-analyses trouvées (OpenAlex `search` + `type`) | session |
| script | `bvs new <id> --idea <slug>` puis rédaction (agent rédacteur) et contre-lecture (agent challenger) ; `bvs check <id>` ; `bvs script <id> --lang ar-EG` | `episode.json`, `lang/ar-EG.json`, `review/<id>/script.ar-EG.md` | session |
| sources | `bvs sources verify <id>` | `content/sources/<doi>.json` + `.verify.json`, `review/<id>/sources.md` | session ou `sources.yml` |
| validation | `bvs approve <id> script --lang ar-EG --words "…"` ; `bvs approve <id> sources --words "…"` | `script_validated`, `sources_validated` | session, sur sa parole |
| voix | `bvs voice plan <id> --lang ar-EG` (hors réseau) ; `bvs voice run …` | prises FLAC (release `voice-<id>` puis commit) | `voice.yml` |
| alignement | `bvs align <id> --lang ar-EG` → `py/bvs_audio align` | `lines.json`, `words.json` | session ou Actions |
| synchro | `bvs lipsync <id> --engine rhubarb\|text\|volume\|hybrid` | `mouth.json` | idem |
| mixage | `bvs mix <id>` → `py/bvs_audio level` | voix à −16 LUFS (un seul gain + limiteur, `level` de quran-reels), sfx | idem |
| timeline | `bvs timeline <id> --lang ar-EG --hook h2` | `timeline.json` (images), audio copié dans `packages/video/public/ep/<id>/` | idem |
| variation | `bvs vary <id>` | `variation.lock.json`, ligne de `ledger.jsonl` au rendu final | session |
| rendu | `bvs render <id> --style split-screen --aspect 9x16 [--draft]` | MP4 | `render.yml` (matrice) |
| contrôle | `bvs qc <id>` → `py/bvs_audio qc` | planches JPEG, `qc.json` | idem |
| paquet | `bvs package <id>` | VTT exacts, `post.json` (publication future), couverture | idem |

`bvs status <id>` affiche les portes et ce qui manque.

### 8.2 Idempotence

Chaque étape déclare ses entrées ; `runner.ts` calcule
`fp = sha256(canonical({step, version, inputs: [{path, sha256}], params, tools: {node, remotion, rhubarb, whisper}}))`
et écrit dans `build/<id>/<step>/<fp[0:12]>/` avec un `manifest.json` validé par zod. Même empreinte → rien à faire.
Deux exceptions **promues dans `content/`** parce qu'elles coûtent ou prouvent : les prises de voix (quota) et les
`.verify.json` (preuve). Tout ce qui coûte du réseau passe par `.cache/` (Crossref, OpenAlex, modèle Whisper,
binaire Rhubarb), restauré et sauvé même en cas d'échec (leçon de quran-reels).

### 8.3 Portes de validation, depuis le téléphone

1. **Script** : la session ouvre une PR ; sa description contient `review/<id>/script.ar-EG.md` (une page : 5 hooks
   avec leur type, scènes avec locuteur et émotion, idée du livre, verdict, à-retenir, durée estimée). Question à
   choix : « Je valide le script ar-EG de `<id>` (empreinte `3f9a…`) » / « Corrections » / « Autre idée ».
2. **Sources** : `review/<id>/sources.md` : par étude, lien DOI cliquable, type, n, effet, ce qu'elle montre, limites,
   contrôles Crossref/OpenAlex ✅/⚠️, corrections et rétractations, phrase d'appui ; même question.
3. **Voix** : MP3 dans la pré-release `voice-<id>` (lien), question à choix.
4. **Rendu** : brouillons dans la pré-release `<id>-candidate` + une page artefact privée (patron `gallery.py` :
   lecteurs, textes, bouton Copier).

**Ce qui bloque** : la voix part seulement si `script` (de cette langue) **et** `sources` sont validés avec une
empreinte à jour (on ne gaspille pas une requête sur un verdict qui changera). Le rendu final refuse si : une règle
de sévérité `error` ; une validation absente ou périmée ; une source dont `.verify.json` n'est pas `pass` ; une
réplique sans prise ou entendue sous 0,6 ; une piste de bouche manquante pour un personnage qui parle. `--draft`
rend sans portes, avec un filigrane « مسودة · DRAFT », jamais copié vers une release publique.

### 8.4 Pourquoi TypeScript ici et Python là

Le pipeline, les règles, les sources et le rendu partagent les types zod sans traduction : TS. Python garde ce où il
est clairement meilleur et déjà payé : faster-whisper (CTranslate2, `align.py` et ses 3 correctifs), `ebur128` et
`level` (tests existants), numpy pour l'enveloppe et les sfx, les planches de `check.py`. Frontière : `bvs` appelle
`uv run python -m bvs_audio <cmd> --in x.json --out y.json` ; Python valide l'entrée contre
`schemas/*.schema.json` (`jsonschema`), TS valide la sortie avec zod. Un test (`py/tests/test_contract.py`) passe les
fixtures TS dans le validateur Python : si le contrat bouge d'un côté, la CI casse.

## 9. Vérification des sources

### 9.1 Algorithme (`packages/sources/verify.ts`)

Pour chaque `evidence.source` (DOI déclaré) et ses métadonnées déclarées (`title`, `authors[]` (noms de famille),
`year`, `kind`, `n?`, `effect?`) :

1. **Normaliser le DOI** (minuscules, préfixes `https://doi.org/` retirés). Crossref renvoie parfois le DOI en
   minuscules (`10.1016/s0272-7358(00)00057-x` constaté ce jour).
2. **Lire** `GET api.crossref.org/works/{doi}` et `GET api.openalex.org/works/doi:{doi}` (User-Agent générique avec
   `mailto` de la chaîne, cache, 3 essais). Un seul des deux résout → `review` ; aucun → `fail`.
3. **Titre** : `norm(t)` = NFKD, marques diacritiques retirées, casse pliée, balises (`<i>`, MathML) retirées, tout
   ce qui n'est pas lettre/chiffre → espace, point final retiré ; `main(t)` = avant le premier « : ».
   `sim = max(tokenSortRatio(norm(a), norm(b)), tokenSortRatio(main(a), main(b)))` (le second seulement si les deux
   titres principaux ont ≥ 4 mots). `≥ 0,92` → bon ; `0,80–0,92` → `review` ; `< 0,80` → `fail`. Comparé aux deux bases.
4. **Auteurs** : le premier nom de famille déclaré doit être le premier de Crossref (normalisé, particules
   « van/de/al- » ignorées) ; ≥ 75 % des noms déclarés (5 premiers au plus) présents ; OpenAlex comparé sur le dernier
   mot de `display_name`.
5. **Année ± 1** : années admises = celles de `issued`, `published-online`, `published-print`, `created` (Crossref)
   et `publication_year` (OpenAlex), chacune ± 1. Cas réels relevés ce jour : Ford et al. « 2018 » a `created` 2017
   (souvent cité 2017) ; Lally et al., cité « 2010 », a `issued` 2009.
6. **Type** : Crossref `journal-article`/`proceedings-article`/`book-chapter` → bon ; `posted-content` → statut
   `preprint` (ne peut pas fonder seul un ✅/❌) ; autre → `fail`. Un `kind` déclaré `meta-analysis`,
   `systematic-review` ou `umbrella-review` doit être corroboré par le titre ou le résumé (`meta-analy`,
   `systematic review`, `review of meta-analyses`, `umbrella`) ; sinon `review`. (PubMed et ses types de
   publication : 3ᵉ contrôle possible, joignabilité d'`eutils.ncbi.nlm.nih.gov` à vérifier.)
7. **Rétractations et corrections** : Crossref `updated-by[].type` ∈ {`retraction`, `withdrawal`, `removal`} ou
   OpenAlex `is_retracted: true` → `fail` ; `expression_of_concern` → `fail` sauf accord écrit du propriétaire ;
   `correction`, `erratum`, `corrigendum`, `addendum` → `review` jusqu'à ce que la session ait lu l'avis et écrit
   `acknowledged: [{doi, why}]`. **Cas réels relevés ce jour** : Mauss et al. 2011 (10.1037/a0022010) a une correction
   (10.1037/a0024986) ; Gloster et al. 2020 (10.1016/j.jcbs.2020.09.009) un erratum (10.1016/j.jcbs.2021.03.005).
8. **Phrase d'appui** : le résumé est reconstruit depuis `abstract_inverted_index` d'OpenAlex, découpé en phrases ;
   `support.sentence` doit exister et son sha256 correspondre. Pas de résumé disponible → `review`, et la source ne
   peut fonder ni un ✅ ni un ❌ « high » sans une lecture humaine du texte (lien `best_oa_location` si libre).

Statut final par source : `pass` / `review` / `fail`. Seul `pass` (ou `review` levé par un accusé écrit) passe la
porte du rendu.

### 9.2 Rapport et preuve

`content/sources/<doi-slug>.verify.json` (commité) : URL des requêtes, date, statut HTTP, **sha256 des réponses
brutes**, champs normalisés des deux bases, scores, décision par contrôle, version de l'outil. Les réponses brutes
**sans le résumé** vont dans `.cache/` et dans la pré-release `sources-<id>` (métadonnées Crossref et OpenAlex sous
CC0 : à vérifier pour Crossref) ; le résumé (droit de l'éditeur) n'est jamais commité, seule son empreinte l'est.
`review/<id>/sources.md` est la vue lisible, et `LIMITES.md` dit ce que la vérification ne prouve pas.

### 9.3 Éviter qu'une vraie étude soit citée pour ce qu'elle ne dit pas

Un DOI vérifié prouve que l'article existe, pas qu'il dit ce qu'on lui fait dire. Quatre gardes :

1. **Revérification aveugle** : un second agent reçoit le DOI et le résumé, **sans** le `claim` du rédacteur, écrit
   sa propre phrase et sa relation (`supports/nuances/contradicts`) ; désaccord → `review`, arbitrage écrit.
2. **Verbes causaux** : `languages/<code>/lexicons/causal.json` (« بيسبب », « causes », « provoque »…) interdits
   dans `verdict.rationale` et `takeaway` quand la `basis` n'a ni `rct` ni `experiment` ni méta-analyse d'ECR ;
   pour du corrélationnel, la langue propose « مرتبط بـ ».
3. **Population à l'écran** : `evidence.population` est sur la carte d'étude (« على N بالغ », N tiré du
   registre) : on ne généralise pas en silence.
4. **Taille d'effet relevée, jamais écrite dans une phrase** : `effect {metric, value, ci?}` relevé dans l'article
   (registre, revérifié par le relecteur), mis en mots par le Chrome (« أثر صغير/متوسط/كبير », seuils de Cohen) ; absente → rien d'affiché.

Règle `verdict-consistency` : ✅ « high » exige au moins une méta-analyse ou revue systématique `supports` dans la
`basis` et aucune `contradicts` ; ❌ exige au moins une `contradicts` issue d'une méta-analyse ou d'ECR ; une
`basis` faite seulement de `cross-sectional`/`preprint` plafonne la confiance à `low`. La règle garde, elle ne décide
pas : le badge reste un choix écrit et validé.

### 9.4 Faisabilité du verdict du pilote (repérage, pas un verdict)

DOI vérifiés ce jour sur Crossref (titre, auteurs, année concordent) : Ford, Lam, John & Mauss 2018
(10.1037/pspp0000157, « accepting negative emotions… laboratory, diary, and longitudinal evidence », OpenAlex : non
rétracté, résumé disponible) ; Mauss, Tamir, Anderson & Savino 2011 (10.1037/a0022010, « Can seeking happiness make
people unhappy? », avec correction) ; Bastian et al. 2012 (10.1037/a0024755, « Feeling bad about being sad ») ;
Abramowitz, Tolin & Street 2001 (méta-analyse de la suppression de pensée, 10.1016/S0272-7358(00)00057-X) ; Aldao,
Nolen-Hoeksema & Schweizer 2010 (méta-analyse des stratégies de régulation, 10.1016/j.cpr.2009.11.004) ; Gloster et
al. 2020 (revue de méta-analyses de l'ACT, avec erratum). Ce que chacune montre et les tailles d'effet : **à lire et
vérifier** par l'étape sources. Lecture prudente : un verdict ⚠️ « nuancé » (l'acceptation est associée à une
meilleure santé psychologique ; « courir après le bonheur » repose sur des expériences plus fragiles) paraît plus
probable qu'un ✅ franc. **Si le repérage ne tient pas, deux idées de remplacement**, DOI vérifiés ce jour : (1) « il
faut 21 jours pour une habitude » (idée répandue par les livres d'habitudes) contre Lally et al. 2009/2010
(10.1002/ejsp.674 : médiane bien plus longue, à vérifier) ; (2) le « grit » (Duckworth) contre la méta-analyse de
Credé, Tynan & Harms 2017 (10.1037/pspp0000102). Le « Mars/Vénus » de John Gray est un bon troisième candidat contre
Hyde 2005 (10.1037/0003-066X.60.6.581, « The gender similarities hypothesis ») mais sensible : il passe par les règles
du §10.

## 10. Droit d'auteur et sujets sensibles (vérifiés par le code)

| Règle | Ce que le code vérifie | Sévérité |
|---|---|---|
| `book-no-quote-field` | le schéma n'a aucun champ de citation ; `concept` ≤ 6 mots | (forme) |
| `book-quote-span` | dans tous les textes de toutes les langues, aucun passage entre guillemets (« » " " „ “ ”) de plus de 6 mots | error |
| `book-no-chapter` | aucune mention « chapter/chapitre/الفصل + nombre » ; `book.concept` sans numéro | error |
| `book-ideas-per-book` | ≤ 3 épisodes par livre sur tout `content/` (au-delà de 5 : refus) : pas de résumé en série | warn / error |
| `book-no-image` | aucun fichier sous `assets/` ou `packages/video/public/` dont le nom ou le chemin cite un livre du registre ; le schéma `Book` n'a pas de champ image ; un style ne reçoit du livre que le titre et l'auteur en texte | error |
| `no-real-person` | §5.3 | error |
| `stereotype-generalization` | `lexicons/generalizing.json` par langue (« الستات كلهم », « الرجالة دايماً », « all women », « les hommes sont »…) : permis seulement dans une réplique d'un personnage, jamais chez le narrateur, à l'à-retenir ni dans un texte d'écran, et seulement si le verdict n'est pas ✅ | error |
| `sensitive-gender` | épisode `gender` : verdict avec au moins une nuance `forWhom`, `roles-rotation` stricte, rappel « des moyennes, pas des personnes » dans le texte du verdict (clé obligatoire) | error |
| `sensitive-mental-health` | épisode `mental-health` : aucun mot de diagnostic dans l'à-retenir ; la description de plateforme porte la ligne « مش بديل عن مختص » | error |
| `digits` | chiffres 123, jamais ١٢٣ (règle du propriétaire dans ses deux dépôts ; à confirmer pour cette chaîne) | error |
| `glyphs` | chaque caractère de chaque texte existe dans une police de la langue (patron de `rules.py`) | error |

Ce que le code ne voit pas (en bas de `bvs check`, « à vérifier à l'œil ») : que la reformulation ne suive pas de
trop près le texte du livre (nous ne l'avons pas) ; que la scène ne caricature personne. Le titre d'un livre cité
pour le désigner est une référence, pas une reproduction (en France, un titre original est protégé comme l'œuvre :
la citation pour désigner le livre est à confirmer, pas un avis juridique).

## 11. Anti « inauthentic content »

Politique lue ce jour (support YouTube, presse du 2025-07) : « repetitious content » renommé « inauthentic content »,
qui vise ce qui « looks like it's made with a template with little to no variation across videos » ou est « easily
replicable at scale ». **La vraie défense est le fond** (une idée nouvelle, une scène écrite pour elle, une vérification
propre à chaque épisode) ; les axes tirés empêchent seulement l'effet gabarit à l'image. Personnages récurrents :
normal pour une série (comme un dessin animé), tant que chaque épisode a son histoire.

**Axes et contraintes** (`packages/pipeline/variation.ts`, sur `ledger.jsonl`) :

| Axe | Valeurs (pilote) | Contrainte |
|---|---|---|
| style | 3 | ≠ épisode précédent ; ≤ 40 % des 10 derniers |
| structure | `classic`, `verdict-tease` (badge masqué dès le hook), `rewind` (on voit la fin, on revient), `book-first` | ≠ précédent |
| hook (type) | 5+ | type ≠ 2 précédents |
| cadrage (plans de caméra) | `wide-to-close`, `close-first`, `two-shot`, `over-shoulder` | ≠ précédent pour un même style |
| palette | 3 par style | ≠ dernier épisode du même style |
| décor | `Setting` | ≠ 2 précédents |
| rôles | qui souffre / qui aide | `roles-rotation` |
| sous-titres | 2 préréglages permis par le style | libre |
| son | aucune musique tierce ; nappes et ponctuations générées (patron `sfx.py`), 4 jeux | ≠ précédent |
| rythme | longueur des plans (3 profils) | libre |

**Tirage** : `rng = mulberry32(sha256(id + tête du ledger))` ; pour chaque axe, candidats = valeurs permises par le
style moins celles que la contrainte exclut ; choix pondéré en faveur des moins récemment vues ; les `variation` de
l'épisode (choix du propriétaire) passent avant. Résultat figé dans `variation.lock.json` (commité) : même lock → même
rendu. **Traçabilité et contrôle** : à chaque rendu final, une ligne `ledger.jsonl` (axes, empreinte du MP4, dHash de
5 images clés). `bvs vary --check` refuse un épisode qui partage plus de la moitié de ses axes avec l'un des 5
derniers, ou dont le dHash moyen est trop proche d'un des 10 derniers (seuil à calibrer sur les 3 styles du pilote).

## 12. Rendu

- **Où** : GitHub Actions du nouveau dépôt (public → minutes gratuites), `render.yml` en matrice
  `style × aspect` (`fail-fast: false`), chaque job contrôlé par `bvs qc`, puis un seul job écrit la pré-release
  `<id>-candidate` (patron `film.yml` : `from_run`, ce qui a réussi est publié, le manquant listé). La session ne fait
  que des images fixes et des extraits de 4 s, un à la fois (règle de quran-themes-demo : rien de lourd à côté).
- **Socle** : `remotion`/`@remotion/*` à la même version épinglée partout (4.0.541 aujourd'hui dans
  quran-themes-demo), `REMOTION_BROWSER_EXECUTABLE` pour le Chromium préinstallé, JPEG, `yuv420p`, `bt709` ; ffmpeg
  statique d'`imageio-ffmpeg==0.8.1` sans apt, runners `ubuntu-24.04`.
- **Temps** (50 s = 1 500 images ; référence mesurée : ~4 images/s sur 4 cœurs pour des clips filmés + silhouettes ;
  à ce rythme, 1 500 images = 6 min 15 s ; nos styles sont du SVG plat sans vidéo décodée, sans doute plus
  rapides, **à mesurer par `bvs bench`**) :

| Style | Estimation | Pourquoi |
|---|---|---|
| `kinetic-type` | 2–4 min | texte + médaillons |
| `split-screen` | 3–5 min | deux panneaux, rig réduit |
| `cartoon-scene` | 4–7 min | décor + 2 rigs + loupe |
| + installation | ~3 min | npm ci, ffmpeg, cache |

  Trois styles en parallèle : ~10 min de mur. `bvs bench --style X` rend 60 images et écrit `bench.fps` dans le
  style ; `render.yml` s'en sert pour son `timeout-minutes`.
- **Contrôle sur planches** (port de `check.py`) : 16 images (première, milieu de chaque segment, image du badge,
  dernière) que la session ouvre et lit ; format 1080×1920 H.264 `yuv420p`, AAC 48 kHz ; durée 45–60 s ; −16 LUFS ± 1
  et crête vraie ≤ −1 dBTP ; **détecteur d'image statique** (écart moyen absolu < 0,5 sur 0,5 s : seuil de la liste
  de qualité Facebook relevé dans quran-reels) ; **bande sombre immobile** en bas (≥ 100 px) ; encodage final sans
  edit list (`-use_editlist 0 -bf 0 -movflags +faststart`, leçon Instagram de quran-reels).

## 13. Réutilisation

| Brique | Origine | Comment | Où ici |
|---|---|---|---|
| `Stick`, `reach`, `POSES`, `mix`, `walk`, `FaceMarks` | quran-themes-demo `video/src/trial/Sahib.tsx`, `Lens.tsx` | copie + généralisation (en-tête « derived from quran-themes-demo@<sha>, MIT ») | `packages/rig` |
| interface `StyleKit` + « ce qui ne change jamais » + `StyleLab` | `video/src/styles/kit.ts`, `docs/styles.md` | patron | `packages/video/contract.ts`, `Chrome` |
| bouche au volume (RMS, seuil) | `video/src/characters/Character.tsx` | patron | `lipsync/engines/volume` + `py/mouth_volume.py` |
| client Gemini et garde-fous | `tools/tts/gemini.py`, `voice-test.yml` | réécrit en TS (corps multi-voix), garde-fous repris | `packages/voice`, `voice.yml` |
| alignement Whisper (+ 3 correctifs) | `tools/audio/align.py`, `listen.py` | copie + langue en paramètre, normalisation par `LanguagePack` | `py/bvs_audio/align.py` |
| niveau −16 LUFS, un seul gain + limiteur | quran-reels `render/video.py` (`loudness`, `level`) | copie (préféré au `loudnorm` de quran-themes-demo, qui module le gain) | `py/bvs_audio/level.py` |
| `tighten` (silences raccourcis) | `tools/audio/build.py` | copie | `py/bvs_audio/level.py` |
| planches + mesures | `tools/trial/check.py` | copie, `moments()` adapté à `timeline.json` | `py/bvs_audio/qc.py` |
| sfx générés | `tools/trial/sfx.py` | copie des sons génériques | `py/bvs_audio/sfx.py` |
| raccord de correction | `tools/trial/splice.py` | plus tard (après le pilote) | — |
| test « copie et casse » | `tests/test_trial_rules.py` | patron | `packages/rules/*.test.ts` |
| registre + `--check` en CI | `content/sources/`, `tools/sources/fetch.py` | patron (DOI au lieu de versets) | `packages/sources` |
| `prepare → matrice → release brouillon`, `from_run` | `film.yml` | patron | `render.yml` |
| galerie privée + « je valide » | `tools/trial/gallery.py` | patron | `bvs gallery` (plus tard) |
| marques de sens | quran-reels `bidi.py` | port TS (+ copie Python pour la publication) | `packages/text/bidi.ts` |
| ffmpeg statique, `ubuntu-24.04`, contraintes, concurrence sans annulation | les deux dépôts | patron | `.github/workflows/` |
| `save-state.sh`, `gh_secrets.py`, `Issues` de `notify.py`, publishers | quran-reels | à la publication (§14), copie (option A de l'audit) | `publish/` (plus tard) |

**Plan d'extraction sans casser quran-reels** : rien ne change dans les deux dépôts. Phase 1 (pilote) : copies avec
provenance (`VENDORED.md` : fichier, sha d'origine, ce qui a été changé). Phase 2 (publication) : copie des
publishers derrière un `Post` (option A de l'audit). Phase 3, seulement sur décision du propriétaire et quand deux
consommateurs sont stables : les paquets TS (`@bvs/rig`, `@bvs/text`) publiés en **archive npm attachée à une release**
(`npm install https://github.com/<owner>/book-vs-science/releases/download/rig-v0.1.0/bvs-rig-0.1.0.tgz`, les
fichiers de release se téléchargent même quand l'API GitHub est refusée à la session) ; la roue Python des publishers
de même (option B de l'audit) ; l'adoption par quran-reels passe par ses PR, ses tests et un `publish-test` en
`dry-run`, jamais par une publication réelle.

## 14. Publication future (hors pilote)

- `bvs package` écrit `post.json` par plateforme (schéma zod → `schemas/post.schema.json`) : vidéo, titre,
  description, hashtags, langue, couverture, VTT exacts tirés du JSON (pas de Whisper), ligne de voix IA, crédits
  (livre : titre et auteur ; études : DOI), `episode_id` dans la description pour que les statistiques retrouvent la
  vidéo sans dépendre du titre (leçon de quran-reels).
- Publishers Python copiés de quran-reels (Meta avec vérification des droits activable — utile seulement si de la
  musique tierce entre un jour —, TikTok en brouillon, YouTube reprenable), qui lisent `post.json` validé par JSON
  Schema. État sur une branche `state` + `save-state.sh` ; alerte « créneau jamais tenté » dès le premier jour ;
  lancement par tâches planifiées ou cron hors du groupe de concurrence de publication.
- **Comptes à créer** (la plupart par le propriétaire) : compte Google de la chaîne (fait ou décidé) → chaîne YouTube
  de marque, projet Google Cloud (clé Gemini, YouTube Data + Analytics API, écran de consentement « En production »,
  3 refresh tokens séparés) ; Page Facebook + Instagram Créateur reliés, **nouvelle app Meta** passée en Live (budget
  d'appels séparé de la Page Quran) ; compte TikTok + nouvelle app Sandbox (préfixe d'URL du Pages du nouveau dépôt) ;
  `GH_SECRETS_TOKEN` propre au dépôt ; pages Confidentialité/CGU au nom de la chaîne. Aucun secret de la Page Quran
  dans ce dépôt ; secrets de la chaîne préfixés.

## 15. Plan du pilote

| # | Étape | Qui | Livré | Coût |
|---|---|---|---|---|
| 0 | Décisions par questions à choix : nom de chaîne, nom de dépôt, licences, narrateur-mascotte, pas de musique tierce | propriétaire | `CLAUDE.md` initial | — |
| 1 | Il crée le dépôt vide ; la session l'attache, pose le monorepo : `schema` (+ JSON Schema générés), `text`, `rules` (règles des §3 et §10 + tests « copie et casse »), `npm run registry`, `validate.yml` | session | PR 1 fusionnée sur checks verts | 1 j |
| 2 | Repérage des preuves pour l'idée pilote (`bvs idea scout`) ; si le verdict ne tient pas, les 2 idées de remplacement | session | `content/ideas/*.json` | 0,5 j |
| 3 | Script : agent rédacteur (5 hooks de 5 types, scènes, idée, verdict, à-retenir), agent challenger ; `bvs check` à 0 erreur | sous-agents + session | `episode.json`, `lang/ar-EG.json`, `review/…/script.ar-EG.md` | 0,5 j |
| 4 | **Porte 1** : script validé | propriétaire | `script_validated` | — |
| 5 | Sources : `packages/sources` + `bvs sources verify` (tests hors réseau sur les réponses réelles de ce jour, cas de la correction et de l'erratum) ; second agent revérifie chaque DOI à l'aveugle | session + relecteur | `.verify.json`, `review/…/sources.md` | 1 j |
| 6 | **Porte 2** : sources validées | propriétaire | `sources_validated` | — |
| 7 | Rig + Salma, Karim, Lens + planches | session | `Sheet` en images fixes | 1,5 j |
| 8 | **Porte 3** : personnages validés sur planche | propriétaire | `approval` des personnages | — |
| 9 | Voix : `voice plan` (2 requêtes), `voice.yml`, écoute | workflow + propriétaire | prises FLAC, MP3 en pré-release | 2–3 requêtes |
| 10 | Alignement, 3 moteurs de synchro, comparaison aveugle de 6 s | session + propriétaire | `mouth.json`, choix du moteur | 0,5 j |
| 11 | `packages/video` (Chrome, compositeur) + les 3 styles, images fixes de chaque segment d'abord | session | planches à regarder | 3 j |
| 12 | `render.yml` : 3 MP4 9:16 + 5 extraits de hook de 4 s ; `bvs qc` | Actions | pré-release `<id>-candidate` | ~10 min |
| 13 | Rapport des sources, `LIMITES.md`, `README.md` | session | fichiers | 0,5 j |
| 14 | **Porte 4** : vidéos validées (ou corrections, refaites en raccord plus tard) | propriétaire | — | — |

Total session : environ 9 à 10 jours de travail, plus les attentes de validation ; voix : 2 à 3 requêtes.

## 16. Risques et limites de cette proposition

1. **Plus lourde au départ** qu'un dossier unique : monorepo, génération du registre, frontière TS/Python. Environ 2
   jours de plus avant la première image ; le gain n'arrive qu'au 2ᵉ style, à la 2ᵉ langue, au 3ᵉ épisode. Si le
   propriétaire veut voir une vidéo vite, commencer par `schema` + un seul style, et monter le reste ensuite.
2. **Multi-voix Gemini en égyptien jamais essayé** : la doc dit oui, l'oreille peut dire non ; l'émotion par réplique
   peut être faible ; le plafond de 2 locuteurs impose 2 requêtes ; **le quota de 10/jour n'a pas pu être vérifié**
   pour `gemini-3.8-flash-tts` (absent de la page des limites lue ce jour).
3. **Rhubarb `phonetic` sur l'arabe** : « language-independent » selon son README, mais son modèle acoustique est
   anglais ; aucune mesure faite (pas d'exécution dans cette conception). Le moteur `text` est mon pari, non testé.
4. **Lisibilité de la bouche** à 1080×1920 sur un téléphone : non mesurée ; la tête agrandie change le dessin des
   bonshommes que le propriétaire a validés dans l'autre chaîne.
5. **zod 4 et Remotion** : je n'ai pas pu vérifier quelle version de zod attend la prop `schema` de `<Composition>`
   (à vérifier) ; la proposition ne s'en sert pas (on valide avant le rendu), donc sans blocage.
6. **Le contrôle « phrase d'appui »** dépend des résumés d'OpenAlex, absents pour une partie des éditeurs (à
   vérifier) ; il prouve qu'une phrase existe, pas qu'on l'a comprise : la revérification aveugle et le propriétaire
   restent nécessaires. Les seuils (0,92, 75 %) sont des choix, à calibrer sur 20 DOI réels.
7. **Les règles lexicales** (stéréotypes, causalité, citations) attrapent les formes connues, pas une scène qui
   caricature sans les mots ; elles donnent une fausse assurance si on les lit comme une preuve.
8. **Variation** : YouTube juge, pas nos axes ; aucune garantie de monétisation. Le dHash et le seuil de similarité
   sont à calibrer ; ils ne mesurent pas le fond. Les temps de rendu du §12 sont estimés, pas mesurés.
9. **Validation** : l'empreinte rend une validation périmée mécaniquement, mais rien ne prouve techniquement que
   c'est lui qui a parlé ; c'est une règle de conduite des sessions.
10. **Juridique** (pas un avis) : conditions Gemini pour un résident de l'UE, protection des titres en droit
   français, licence Remotion si la chaîne devient une société de plus de 3 salariés, CC0 des métadonnées Crossref.
11. **Noms** : disponibilité des noms de chaîne non vérifiée ; la double lecture de « كتاب ولا علم؟ » est un avis.

Sources consultées ce jour : [Remotion LICENSE.md](https://raw.githubusercontent.com/remotion-dev/remotion/main/LICENSE.md) ·
[Rhubarb](https://github.com/DanielSWolf/rhubarb-lip-sync) et [sa licence](https://raw.githubusercontent.com/DanielSWolf/rhubarb-lip-sync/master/LICENSE.md) ·
[Gemini TTS](https://aistudio.google.com/docs/speech-generation) · [conditions Gemini](https://aistudio.google.com/docs/terms) · [limites Gemini](https://aistudio.google.com/docs/rate-limits) · [zod JSON Schema](https://zod.dev/json-schema) ·
[YouTube monétisation](https://support.google.com/youtube/answer/1311392) · [YouTube contenu synthétique](https://support.google.com/youtube/answer/14328491) · [SEJ, juillet 2025](https://searchenginejournal.com/youtube-targets-mass-produced-content-in-monetization-update/550337/) ·
Crossref (`api.crossref.org/works/<doi>`) et OpenAlex (`api.openalex.org/works/doi:<doi>`) pour les 9 DOI cités.
