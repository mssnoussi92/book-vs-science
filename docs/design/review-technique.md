# Revue contradictoire : angle TECHNIQUE (propositions A, B, C)

Relecteur technique, 2026-11-22. Je n'ai pas participé à la conception. Dépôts `quran-themes-demo` et `quran-reels` lus
seulement (`git status --short` vide des deux côtés, avant et après). Essais faits dans
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/review-tech/` (sous-dossiers `zod/`, `rhubarb-dl/`,
`wav/`, `bench/`, `api/`).

## 0. Ce que j'ai mesuré (les preuves citées plus bas)

| Essai | Résultat |
|---|---|
| **zod 4.6.7** (la version que Remotion 4.0.541 épingle *exactement* : `video/package-lock.json` l. 1133-1336, `@remotion/cli`, `studio-server`, `media`… → `"zod": "4.6.7"`) | Le schéma de A compile tel quel ; `z.toJSONSchema` **par défaut en mode `output`** : les champs à `.default()` deviennent `required` (`pauseAfter`, `claimIds`) → un épisode écrit à la main sans eux : **37 erreurs** chez `jsonschema` (Python), **0** avec `{ io: "input" }`. Les `refine`/`superRefine` disparaissent sans avertissement : 5 hooks du **même** type passent le JSON Schema (0 erreur) alors que zod les refuse. Le drapeau `/i` d'une regex est perdu. `\d` en Python accepte `١٠٣٧` (chiffres arabo-indiens), pas en JS (`zod/py_check.py`). |
| zod, extraits de B et C | B : `z.record(LangCode, z.string())` (titres traduits d'un livre) est **exhaustif** en zod 4 : `{ "ar-EG": "…" }` seul est refusé (« expected string, received undefined » ×2) ; il faut `z.partialRecord`. C : `z.object` non strict **retire en silence** une clé mal tapée ; en mode `output`, le JSON Schema met `additionalProperties: false` (Python refuse ce que zod a accepté). |
| Node 22.23 (type stripping) | `import "./Seg.tsx"` depuis un `.ts` → **`ERR_UNKNOWN_FILE_EXTENSION ".tsx"`** ; un `enum` TS → erreur aussi (`zod/tsx/`). |
| **Rhubarb 1.13.0** Linux (zip 87 324 470 octets, sha256 `bd2609…9f71`, MIT + Boost/BSD, licence lue dans le zip) sur deux prises Gemini/Algieba en égyptien (`D-trial-abb.flac` 25,7 s, `D-trial-dua.flac` 64 s) | `-r phonetic --extendedShapes GHX -f json` : **3,4 s** et **4,2 s** (multi-fil), **5,6 s** pour 64 s avec `--threads 1`. 5,6 changements/s, 8-11 % de formes < 2 images. **Non déterministe en multi-fil** : 3 exécutions identiques → 3 sorties différentes (3 % des images à 30 i/s diffèrent) ; `--threads 1` → sorties identiques. Parts sur les images de parole : B 37-41 %, A 14-17 %, C 14-23 %, **D (« aa ») 3 %**, **F (lèvres arrondies) 11-20 %** : peu plausible pour l'arabe, où /a/ domine et /u/ est rare. Bouche au repos (X/A) au milieu des pauses ≥ 0,3 s : 9/11 (abb), **15/29 (dua)** : la moitié des longues pauses de la prise longue ont la bouche ouverte. `-d` (texte) change un peu la sortie même en phonétique. Coupes courtes (0,6-2,5 s) : sorties bien formées. |
| **Banc de rendu Remotion 4.0.541** (Chromium 1243 préinstallé, 4 onglets, 1080×1920, JPEG) : décor SVG de 40 formes + 2 rigs à double trait (cinématique inverse, clignement, 5 bouches, sourcils), sous-titre arabe avec `<bdi>`, poussée lente | Paquet 2,3 s ; **450 images en 14,2 s ≈ 32 i/s**, lancement compris ; même scène avec `feDropShadow` sur chaque forme (« papier découpé ») : 23,8 s ≈ **19 i/s**. `npm install` : 13 s, 250 Mo. Les ~4 i/s de quran-themes-demo viennent du décodage des clips, que ces styles n'ont pas. |
| Bidi dans Remotion (`bench/out/bidi.png`) | `<bdi dir="ltr">` dans un texte RTL : correct. **Mots en `display: inline-block`** (indispensable pour animer chaque mot par `transform`) dans un conteneur RTL : la suite anglaise est **inversée** : « Not of Art Subtle The » au lieu de « The Subtle Art of Not ». Spans `inline` sans espace réel entre eux : mise en forme arabe faite **à travers** les spans (glyphe parasite entre « الكتاب » et « اسمه ») et ligne sans point de coupure (débordement). Police arabe sans latin : le latin tombe sur une police système (serif ici), différente d'une machine à l'autre. |
| Crossref / OpenAlex | Crossref (`10.1037/pspp0000157`) porte des champs qui bougent sans que l'article change : `indexed` (2026-11-15), `is-referenced-by-count` (222), `reference-count`, `deposited`, `relation` ; OpenAlex : `cited_by_count`, `updated_date` (2026-11-21). OpenAlex **sans clé** : lecture par DOI acceptée (coût 0 $), **recherche refusée** (HTTP 429, « budget partagé par l'IP épuisé, $0 remaining »). Résumé OpenAlex reconstruit : « judging them-a process » (le tiret cadratin devient `-`) et se termine par « (PsycINFO Database Record (c) 2018 APA, all rights reserved). » |
| Gemini TTS (page lue ce jour) | Multi-locuteurs : `speech_config` est un **objet** `{speakers: [{speaker, voice}, …]}` (le client actuel envoie une **liste** `[{voice}]`, `tools/tts/gemini.py` l. 62), 2 locuteurs au plus, une réplique = un `content` avec `speech_metadata {speaker, style}`. **Aucun minutage par réplique dans la réponse** ; la page conseille de synthétiser chaque tour à part pour avoir des minutages. Sortie WAV 24 kHz mono. Aucune limite de requêtes publiée sur cette page. |
| Prises existantes | `content/trial/takes/` : 71 prises, **92 Mo** (≈ 1,3 Mo la prise). |
| `Sahib.tsx` (3 shorts joués) | **23 accessoires et décors** dessinés pour 3 shorts (`Fanoos`, `AhwaChair`, `Shisha`, `Smoke`, `TeaGlass`, `Phone`, `Musk`, `Misbaha`, `Tray`, `Sandwich`, `Coin`, `Sparkles`, `Fumes`, `Bubble`, `Burst`, `Heart`, `AhwaSet`, `BusStopSet`, `Poster`, `FoulCart`, `Bus`, `KioskSet`, `Waiter`) et **64 appels d'interpolation** (`lp`, `ramp`) avec des cibles de main en coordonnées. |

## (a) Tableau des objections

| # | Objection | Visée | Gravité | Preuve | Correction proposée |
|---|---|---|---|---|---|
| 1 | L'empreinte de la validation des sources inclut des données **volatiles** de vérification (date, empreinte des réponses brutes, compteurs) : une revérification sans aucun changement de fond rend la validation périmée et bloque le rendu. Chez C, la règle « rapport de plus de 30 jours : refait » et le `nightly.yml` qui revérifie tout le registre la cassent en continu sur toute la file. | C (bloquant), A, B (majeur) | **bloquant** (C) / majeur | A l. 254 + 283-290 (`verification.on`, `rawSha256`) ; B l. 306-307 + 677-678 (`.verify.json` : date, statut HTTP, sha256 des réponses brutes) ; C l. 264-265, 591, 668 ; Crossref `indexed`, `is-referenced-by-count`, OpenAlex `updated_date` mesurés | Empreinte de validation = **projection décisionnelle normalisée** seulement (DOI, titre/auteurs/année/type normalisés, statut de rétractation et liste des avis, empreinte du résumé normalisé, preuves) ; jamais dates, compteurs, octets bruts. Une revérification qui change un de ces champs-là, et seulement eux, ouvre « à revalider ». Test : revérifier deux fois à une semaine d'écart → même empreinte. |
| 2 | **Typographie animée mot à mot en RTL** : des mots en `inline-block` (nécessaires pour les `transform`) inversent l'ordre d'une suite latine (titre de livre, nom d'étude) ; des spans `inline` sans espace font des ligatures parasites et des lignes insécables. Les trois prévoient des mots qui « arrivent au temps de chaque mot ». | A, B, C | **majeur** | `bench/out/bidi.png` : « Not of Art Subtle The » ; A l. 357, B l. 394, C l. 324 | Découper le texte en **suites bidi** (algorithme Unicode, ex. `bidi-js`, MIT) avant de découper en mots : une suite LTR est un seul bloc `dir="ltr"` (animé en bloc, ou mots animés **dans** un conteneur `inline-block dir=ltr`) ; espaces réels entre les spans ; test d'image fixe en CI sur une ligne mêlée (arabe + titre anglais + année). |
| 3 | **zod → JSON Schema → Python** tel qu'écrit : mode `output` par défaut (les champs à valeur par défaut deviennent obligatoires pour les fichiers écrits à la main), refinements perdus (deux validateurs qui ne disent pas la même chose), drapeaux de regex perdus, `\d` Unicode en Python. | A, C (majeur), B (mineur : Python n'y lit que des sorties de TS) | **majeur** | `zod/py_check.py` : 37 erreurs vs 0 ; « 5 hooks même type » : 0 erreur ; A l. 105, 112 ; C l. 101 | `z.toJSONSchema(x, { io: "input" })` pour les fichiers d'auteur, `output` pour les fichiers produits ; **un seul validateur fait foi** : Python appelle `node schema/validate.ts` (ou les règles croisées vivent toutes dans `rules.py`, aucune dans `superRefine`) ; regex en `[0-9]` jamais `\d` ; zod épinglé **4.6.7** (celui de Remotion), test de non-dérive du JSON Schema. |
| 4 | **Les métadonnées d'un style** (paramètres tirables, palettes, axes) vivent dans le module TSX du style, mais le moteur de variation tourne ailleurs : en Python (A), en Node sans compilation (B : `style.params.parse`, `style.draw(rng)` → importe des `.tsx`), ou dans `core` « pur TS » appelé depuis une CLI Python (C). | B (bloquant tel qu'écrit), A, C (majeur) | **bloquant** (B) / majeur | Node : `ERR_UNKNOWN_FILE_EXTENSION ".tsx"` ; B l. 26, 346-347, 582, 749 ; A l. 337 vs l. 705 (`bvs vary` en Python) ; C l. 58, 302-307, 551 | Chaque style = `styles/<id>/style.json` (ou `meta.ts` sans JSX) : id, version, formats, axes tirables, décors dessinés ; validé par zod, lu par la variation **et** par Python ; le TSX importe ce fichier, jamais l'inverse. Ou bien `tsx`/esbuild comme chargeur (une dépendance de plus, à épingler). |
| 5 | Les **axes de variation de structure** (B : `verdict-tease`, `rewind`, `book-first` ; C : « verdict d'abord », « quiz ») réordonnent ou ajoutent des temps **après** une voix enregistrée dans l'ordre classique : la narration (« الكتاب بيقول… بس العلم… ») devient incohérente, ou il faut des répliques que le script validé n'a pas (l'invitation à parier du quiz). | B, C | **majeur** | B l. 203, 754 ; C l. 723 ; voix une prise par groupe (B l. 503-506, C l. 431-434) | La structure est un **choix d'écriture** (dans le script, validé, voisé dans son ordre) comme `scene.structure` de A, pas un tirage ; la variation ne tire que ce qui ne change ni le texte ni l'ordre dit (style, palette, cadrage, transitions, police). |
| 6 | **Séparer deux personnages dans une prise multi-locuteurs** : la réponse ne donne aucun minutage ; `align.py` ne rend que des **débuts** de phrase (la fin = le début suivant), découpe aux signes de ponctuation, et une réplique courte (« لأ. », « آه؟ ») souvent non entendue reçoit le début de la suivante ; la bouche du mauvais personnage bouge, ce qui se voit tout de suite. | A, B (majeur), C (mineur : contrôle F0) | **majeur** | doc Gemini (pas de minutage, « synthétiser chaque tour à part ») ; `tools/audio/align.py` l. 61-63, 95-99, 147-151 ; A l. 518, B l. 550-551, C l. 436-439 | Demander une pause marquée entre tours (`<long pause>`, balise documentée) ; découper par **silences + regroupement F0 en 2 classes** ; exiger nombre de tours détectés = nombre de répliques, sinon refus ; Whisper seulement pour recaler. Fin de réplique = fin de la dernière voix avant la pause, pas le début suivant. Repli propre : **une requête par personnage** (séparation triviale, +1 requête). |
| 7 | **Rhubarb non déterministe** en multi-fil : « même empreinte → même sortie » est faux pour l'étape synchro ; et sa sortie sur l'égyptien sous-ouvre (D 3 %), arrondit trop (F jusqu'à 20 %), laisse la bouche ouverte dans la moitié des longues pauses. | A, B, C | **majeur** | `wav/` : 3 md5 différents, `--threads 1` identique ; parts mesurées ; A l. 520, B l. 547, C l. 501 | `--threads 1` obligatoire (5,6 s pour 64 s : aucun coût réel) et dans l'empreinte ; forcer X dans les silences de l'alignement (le `hybrid` de B) ; remapper F→C hors des mots qui ont « و/ُ » ; la comparaison à l'aveugle reste nécessaire (rien n'est jugé ici sur l'image). |
| 8 | **Chorégraphie fermée** : 8 actions, 11 poses, 6 accessoires, 3 repères (A) ; 9 gestes et 8 lieux en dur (C) ; gestes extensibles mais ni accessoires, ni déplacement, ni changement d'état d'objet (B). Les 3 shorts joués réels ont demandé 23 accessoires/décors et 64 interpolations. Une scène qui « vit le problème » (pilote : une spirale « se sentir mal de se sentir mal ») retombera en TSX par épisode, ou en têtes parlantes. Aucune action ne s'ancre sur un **mot** (seulement le début d'une réplique). | A, C (majeur), B (mineur) | **majeur** | `Sahib.tsx` (inventaire ci-dessus) ; A l. 144-157 ; C l. 122-123, 145 ; B l. 149-156 | Un **registre d'accessoires et d'effets** extensible par fichier (chacun son schéma zod de paramètres, comme les gestes de B), une action `fx {id, params}` et `prop {id, state}`, un ancrage `at: {line, word}` ; une soupape typée et assumée : `custom: "<id>"` vers un composant de `scenes/<id>.tsx` relu, compté, plafonné (ex. 1 par épisode). |
| 9 | Multilingue de A : chaque feuille `L {arz, en, fr}` est dans la structure ; l'empreinte de `script_validated` couvre ces objets entiers → **ajouter le français périme la validation égyptienne** ; ajouter une langue = modifier `LANGS` dans le schéma. C : `Lang` en dur, `Episode.lang: z.literal("ar-EG")`. | A (majeur), C (mineur) | **majeur** | A l. 120-125, 253 ; C l. 111-112, 184 | Empreinte **par langue** (projection `arz` seulement) ; ou textes hors structure comme B (fichier par langue) ; liste des langues générée depuis un dossier. |
| 10 | Correction d'une réplique et quota : l'empreinte d'une requête de voix = tout son texte ; changer une virgule refait **toute** la prise du groupe (1 requête sur ~10, tous les minutages du groupe changent, le propriétaire réécoute tout). A annonce en même temps une « R3 de corrections » raccordée : les deux ne tiennent pas ensemble sans table réplique → segment de prise. | A (majeur, contradiction interne), B, C (mineur) | **majeur** | A l. 465 vs 474-477 ; B l. 508-509 ; C l. 434 | Prises adressées **par réplique** (`lineId → {prise, début, fin, empreinte du texte}`) ; une correction = une requête des seules répliques changées, raccordées (patron `splice.py`) ; la validation de la voix porte les empreintes des segments écoutés. |
| 11 | **Prises FLAC commitées** dans Git : 1,3 Mo/prise mesuré, 2 à 3 prises par épisode → ~1 Go d'historique par an à 1 épisode/jour (chaque clone de CI le paie). | A, B | **mineur** (pilote) / majeur (production) | 92 Mo / 71 prises ; A l. 76, B l. 89, 512 | Le schéma de C : prises en release nommées par empreinte, empreintes commitées ; ou Git LFS hors quota… payant : non. |
| 12 | **OpenAlex sans clé** : la recherche répond 429 (budget partagé par IP, et les runners GitHub partagent leurs IP) ; seule la lecture par DOI passe. Le repérage d'idées de B (`OpenAlex search`) et toute recherche de méta-analyses tombent. | B (majeur), A (mineur), C (couvert : `OPENALEX_API_KEY`) | **majeur** | `api/oas.json` : 429 « Insufficient budget… no API key » ; B l. 586, 647 (`mailto`, polite pool obsolète) | Clé OpenAlex gratuite du compte de la chaîne, en secret ; repli Crossref `query.bibliographic` + Europe PMC pour la recherche. |
| 13 | **C : aucune porte d'oreille** sur la voix après les 10 premiers épisodes (`render` facultatif ensuite, `advance` enchaîne voix → rendu) ; Whisper ne juge pas une voix (leçon écrite dans quran-themes-demo). | C | **majeur** | C l. 261-262, 554 ; brief l. 81 | Porte « voix » obligatoire (MP3 en release, question à choix), la validation portant l'empreinte des segments ; l'automatisation range le travail, ne le supprime pas. |
| 14 | Le **décor** tiré au sort contredit le lieu écrit dans le script (une réplique « في المترو » sur un décor de cuisine). | A (axe « décor » tiré), B (axe « décor » tiré alors que `Scene.setting` est du script) | **mineur** | A l. 699 ; B l. 158-159 vs 758 | Le lieu vient du script (comme C l. 728) ; la variation ne tire que l'heure, la lumière, l'angle. |
| 15 | Estimations de rendu **trop pessimistes** (2-8 min par style) : 32 i/s mesurés pour 2 rigs + 40 formes, 19 i/s avec ombres portées ; un épisode de 50 s ≈ 1 min, les 3 styles ≈ 3-4 min avec l'installation, dans **un seul job**. La matrice, le `costHint` réécrit par la CI (C) et le budget « 60 min de rendu » sont du poids sans objet. | A, B, C | **mineur** | `bench/` ; A l. 726-730, B l. 784-791, C l. 781-783, 311 | Un job, 3 rendus à la suite, `--concurrency=4` ; mesurer au premier épisode réel ; jamais de CI qui réécrit du code source (`costHint`). |
| 16 | **Polices** : une police arabe sans latin fait tomber les titres d'études sur une police système, différente entre la session et le runner ; l'empreinte du rendu n'inclut ni les polices (A, B) ni leur contenu. | A, B (mineur), C (inclut les polices) | **mineur** | `bench/out/still.png` (latin en serif) ; A l. 576, B l. 605 | Paires de polices couvrant arabe + latin chargées depuis des fichiers (`@remotion/fonts`, jamais système ni Google Fonts au rendu) ; règle `glyphs` sur le latin aussi ; empreinte des fichiers de police dans celle du rendu. |
| 17 | Faits faux ou non vérifiés sur zod/Remotion : A croit que Remotion 4 exige zod 3 ; B ne sait pas. Remotion 4.0.541 épingle **zod 4.6.7 exact** : un `zod@latest` dans `schema/` crée deux copies de zod. B : `z.record(LangCode, …)` refuse un livre traduit en une seule langue. | A, B | **mineur** | lockfile l. 1133-1336 ; `zod/b.ts` | `zod: "4.6.7"` exact dans tout le dépôt ; `z.partialRecord`. |
| 18 | C : `z.object` non strict partout → une clé mal tapée (`delivry`) disparaît sans erreur (la direction de voix est perdue) ; `hooks.length(5)` avec « au moins 4 types » contredit le livrable du brief (5 types). | C | **mineur** | `zod/c.ts` ; C l. 185, 199 ; brief l. 65 | `z.strictObject` partout ; 5 types distincts. |
| 19 | C : interdire `remotion` dans les styles prive les styles de `delayRender`, `staticFile`, `<Img>` : toute image matricielle ou police chargée par un style s'afficherait après l'image capturée (images vides). L'issue « rendu MIT en ~200 lignes » n'existe pas et ne garderait pas ce contrat. | C | **mineur** | C l. 275, 767-772 | Le shell fournit un petit `RenderKit` (`asset()`, `useFonts()`, `random()`), seul point d'appel à Remotion ; sinon lever l'interdiction. |
| 20 | La **couche commune** (badge, cartes) au dessin fixe jure avec tableau blanc et papier découpé ; aucun style ne peut l'accorder. | A, B, C | **mineur** | A l. 197, 374 ; B l. 382-387 ; C l. 342 | Géométrie, moment et texte fixes ; **thème** du chrome par style (trait, grain, police d'une liste fermée), validé une fois. |
| 21 | Empreintes sur du texte saisi au téléphone : marques invisibles (RLM, ZWJ, tatweel) changent l'empreinte sans changement visible, et partent dans la voix. | A, B, C | **mineur** | — (C seul parle de NFC) | Règle qui refuse les caractères de format (`Cf`) hors liste ; NFC ; diff lisible de ce qui a changé. |
| 22 | « Phrase d'appui » : correspondance mot pour mot fragile (OpenAlex transforme « — » en « - », ajoute la mention de copyright ; l'index de phrase de B bouge si OpenAlex réingère ou si le découpage change). | A, B (mineur), C (tolère tirets) | **mineur** | `api/oa.json` reconstruit ; A l. 639-640 ; B l. 181-184, 668-669 | Normaliser tirets/guillemets/espaces, comparer à la phrase **texte** (pas à un indice), garder l'empreinte du résumé normalisé. |

## (b) Détail par proposition

### Proposition A (réutilisation maximale, pilote rapide)

Ce qui tient : une frontière claire Node (zod + Remotion) / Python (son, sources, contrôles), le plus proche de ce qui
tourne déjà ; le schéma **compile tel quel** sous zod 4.6.7 (vérifié) ; la structure de scène (`single`,
`replay_twice`…) est un choix d'écriture, donc voisée dans le bon ordre (la seule des trois qui évite l'objection 5) ;
`StudyCard` composée depuis le registre ; détecteurs « image statique » et « bande sombre » repris des leçons de
quran-reels.

Ce qui casse :
- **Multilingue (obj. 9)** : la langue est une propriété de chaque feuille ; ajouter `fr` réécrit toutes les feuilles
  et périme `script_validated` (empreinte des objets entiers). Ajouter une 4ᵉ langue modifie `LANGS` et `L`.
- **Contradiction voix (obj. 10)** : « une prise dont l'empreinte existe n'est jamais redemandée » + empreinte = texte
  exact de toute la requête, et en même temps « R3 = toutes les corrections regroupées » : le planificateur demandera
  une R1 entière pour une virgule.
- **Variation en Python, paramètres en TSX (obj. 4)** ; le décor tiré au sort (obj. 14).
- **Vocabulaire scénique fermé dans le schéma (obj. 8)** : chaque accessoire nouveau (`Prop`) ou pose (`Pose`) est
  une modification du schéma, du JSON Schema, et de tous les styles qui doivent le dessiner.
- Faits : « Remotion 4 exige zod 3 » est faux pour 4.0.541 (obj. 17) ; OpenAlex sans clé (obj. 12, mineur ici : A lit
  par DOI) ; Rhubarb lancé sans `--threads 1` ni repos forcé dans les silences (obj. 7).
- Ajouter un style touche **3 fichiers** (dossier, `registry.ts`, `StyleId` du schéma + l'union `id` du contrat),
  pas « un dossier ». Acceptable, mais il faut le dire.

### Proposition B (contrats typés, dossiers qu'on ajoute)

Ce qui tient : la meilleure séparation structure / textes (un fichier par langue, empreinte par langue) ; la bouche
paramétrique (9 visèmes × 12 émotions sans 108 dessins) ; les trois moteurs de synchro dont `hybrid`, que mon essai
justifie (pauses ouvertes) ; `defineStyle` avec `params` zod et `anchors` testés contre les zones sûres ; ESLint
d'imports ; tests de contrat TS ↔ Python. C'est la plus extensible pour personnage, langue, geste.

Ce qui casse :
- **Pipeline TS « sans compilation » (obj. 4, bloquant tel qu'écrit)** : `bvs vary` appelle `style.params` et
  `style.draw` d'un module qui importe ses segments `.tsx` ; Node 22 refuse `.tsx` (mesuré). Il faut un fichier de
  métadonnées sans JSX par style ou un chargeur `tsx`.
- **Axes de structure tirés après la voix (obj. 5)** : `verdict-tease`, `rewind`, `book-first` ne peuvent pas
  réordonner une narration enregistrée « dans l'ordre » sans la rendre incohérente.
- **Empreinte croisée** : `script_validated` = `episode.json` sans `sources_validated` ni `variation`, donc **avec**
  `evidence` et `verdict` : corriger une source (ex. l'indice `support.sentence`) périme la validation du script de
  toutes les langues ; et `sources_validated` contient les `.verify.json` datés (obj. 1).
- **`ids.generated.ts`** : chaque `Setting` ou geste ajouté par un style change l'énumération du schéma d'épisode ; le
  « rien d'autre n'est édité » est vrai à la main, pas dans le diff (3 fichiers générés). Bien, à condition qu'une CI
  refuse un généré non à jour.
- `z.record(LangCode, …)` exhaustif (obj. 17) ; emphase `*mot*` dans le texte voisé (part au TTS, entre dans
  l'empreinte, doit être retirée des sous-titres : mieux vaut un champ `stress: [indices]`) ; `idea scout` par recherche
  OpenAlex sans clé (obj. 12) ; moteur `text` sans voyelles brèves (l'égyptien écrit ne note que ا و ي) : la bouche
  restera en B la plupart du temps ; il faut le moduler par l'énergie comme C.
- Coût : la réécriture en TS de ce qui existe et marche en Python (client Gemini, vérification, règles) est réelle ;
  B le reconnaît (« 2 jours de plus avant la première image »).

### Proposition C (automatisation et variation d'abord)

Ce qui tient : l'empreinte d'étape la plus complète (outils, navigateur, ffmpeg, polices, révision du modèle
Whisper) ; prises et rendus en releases adressées par contenu (obj. 11 résolue) ; `i18n/<lang>.json` avec `of` (une
traduction périmée se voit) ; grand livre du quota écrit **avant** l'envoi ; contrôle F0 par réplique (la seule
défense contre une réplique dite par la mauvaise voix) ; clé OpenAlex prévue ; `pin`/`avoid` en `partialRecord`
(un style nouveau ne touche pas le schéma) ; mode « mimé » comme repli et comme axe.

Ce qui casse :
- **Obj. 1 en bloquant** : `sources.hash` inclut `report.json` (empreinte des réponses brutes) ; le rapport est refait
  à 30 jours et chaque nuit ; Crossref réindexe (`indexed`) et recompte les citations chaque semaine : la file entière
  passe « à revalider » sans aucun changement de fond, et `advance` s'arrête.
- **Obj. 5** : « verdict d'abord » et « quiz » comme axes tirés : incohérence ou répliques non validées.
- **Obj. 13** : la voix n'est plus écoutée après 10 épisodes.
- **Extensibilité en dur** : `CastId`, `Place`, `Gesture`, `Lang` sont des énumérations du schéma ; ajouter un
  personnage = schéma + `cast.yaml` + composant. `z.object` non strict (fautes de frappe avalées), 4 types de hooks
  au lieu de 5 (obj. 18).
- **Variation à cheval** : moteur en TS (`packages/core/variation`), commande `bvs vary` en Python, axes déclarés dans
  le `StyleModule` (avec ses composants React) : il faut un manifeste.
- Interdiction de `remotion` dans les styles (obj. 19) ; `costHint` « réécrit par render.yml » = la CI qui modifie le
  code source hors PR.
- Le plus lourd à construire (C le dit) : file, `advance`, tableau, grand livre, deux branches de données ; pour un
  pilote dont le propriétaire valide tout à la main, c'est du code qui ne sert pas encore.

## (c) Angles morts communs aux trois

1. **Validations sur des projections stables** : les trois hachent du JSON « canonique » sans dire quoi exclure
   (dates, compteurs, marques invisibles, ordre des tableaux non significatifs). Une revalidation demandée sans
   changement visible depuis un téléphone usera la confiance du propriétaire plus vite que n'importe quelle panne.
2. **Le texte bidi est traité comme un problème de sous-titres** (`<bdi>` autour du titre d'étude), pas comme un
   problème de **découpage** : la typographie animée, les bulles, les cartes qui révèlent mot à mot ont toutes besoin
   des suites bidi calculées avant le découpage (obj. 2). Aucun ne prévoit de test d'image fixe sur une ligne mêlée.
3. **Les minutages par mot du script** : `align.py` ne rend que des débuts de phrase et les mots *entendus* par
   Whisper (orthographe standardisée, clitiques découpés autrement) ; il faut une fonction nouvelle « mot du script →
   (t0, t1) » avec interpolation des mots non entendus, et une fin de réplique ; aucune des trois ne la spécifie
   (C la nomme seulement, `word_times()`).
4. **La séparation des locuteurs** repose sur Whisper seul (A, B) ou presque (C) ; aucun ne demande au TTS des
   pauses marquées entre tours ni ne vérifie « nombre de tours détectés = nombre de répliques ».
5. **Déterminisme réel** : Rhubarb multi-fil (mesuré), Gemini (jamais la même prise deux fois), faster-whisper en
   int8 multi-fil (non mesuré, à vérifier) ; « idempotent » ne vaut que tant que le cache existe. Une prise validée
   perdue doit **bloquer**, pas être redemandée en silence : la validation doit porter l'empreinte des segments.
6. **Le contrat de style ne dit pas ce que la scène demande** : effets d'état intérieur (spirale, pensée, rétrécir),
   objets qui changent d'état, ancrage sur un mot, figurants. Sans soupape typée, le premier épisode réel réintroduira
   le TSX par scène que l'audit de quran-themes-demo désigne comme la dette à éviter.
7. **Écran partagé en 9:16** : 1920 − 250 − 420 = 1 250 px utiles, coupés en deux moitiés de ~625 px, moins les rectangles
   réservés (sous-titres, badge, carte) : les « petits rigs » auront une tête de ~40 px de rayon, la synchro labiale
   n'y sera pas lisible. Aucun ne l'a dessiné ; une image fixe avant d'écrire le style trancherait.
8. **Le rendu n'est pas le goulot** (32 i/s mesurés) : le goulot est le quota de voix et la validation humaine ; les
   trois dépensent de la conception sur la matrice de rendu et pas assez sur le raccord de prises.

### Ce qu'il faut vraiment toucher pour étendre (lu dans les extraits de code, pas dans les résumés)

| Extension | A | B | C |
|---|---|---|---|
| Un style | dossier + `registry.ts` + `StyleId` (schéma) + union `id` du contrat + JSON Schema régénéré | dossier + `npm run registry` (3 fichiers générés) ; un `Setting` nouveau change l'énumération du schéma | dossier copié de `_template/` + `registry.ts` (le schéma ne bouge pas : `pin` est une chaîne) |
| Une langue | `LANGS` + `L` du schéma + **chaque feuille de chaque épisode** + empreintes de validation périmées | dossier `languages/<code>/` + `lang/<code>.json` par épisode (+ normalisation de l'alignement côté Python : non portée) | `Lang` du schéma + `i18n/<lang>.json` (+ `Episode.lang` figé à `ar-EG`) |
| Un personnage | `content/cast/<id>.json` + dessin (cheveux, tenue) dans le rig ; ≤ 2 hors narrateur | dossier `characters/<id>/` + `casting/<lang>.json` ; ≤ 2 par scène | `CastId` du schéma + `cast.yaml` + `cast/<id>.tsx` |
| Un type de hook | `HookType` + `superRefine` + rendu par chaque style | `HookType` + règles ; un `firstFrame` nouveau = chaque style à reprendre | `HookType` + règles |
| Un accessoire / un geste | `Prop` / `Pose` du schéma + dessin + chaque style | geste : un fichier `rig/gestures/<id>.ts` ; accessoire : **pas de place** | `Gesture` du schéma ; accessoire : **pas de place** |
| Tableau blanc / infographie / papier | peau `ink`/`cutout` du rig : plausible ; infographie : un seul `effect` par source, métriques hétérogènes (g, r, OR) à convertir | idem ; le chrome ne peut pas s'accorder au style | idem ; `effect` par claim (mieux pour un « forest plot ») |
| Écran partagé, typographie animée | données suffisantes pour les cartes ; **manquent** : emphase par mot, suites bidi, minutage par mot du script | emphase par `*mot*` dans le texte voisé (mauvais endroit) ; mêmes manques | mêmes manques |

### Extraits de correction (à reprendre tels quels dans la synthèse)

```ts
// schema/scripts/emit.ts : deux sorties, jamais le défaut implicite
writeJson("schemas/episode.input.schema.json", z.toJSONSchema(Episode, { io: "input", target: "draft-2020-12" }));
writeJson("schemas/timeline.output.schema.json", z.toJSONSchema(Timeline, { io: "output" }));
// et aucune règle dans superRefine que Python doit aussi connaître : rules.py en est la seule source
```

```py
# empreinte de validation des sources : ce qui décide, jamais ce qui date
def decision(src, rep):
    return {"doi": norm_doi(src["doi"]), "title": norm(rep["title"]), "authors": [norm(a) for a in rep["authors"][:5]],
            "years": sorted(set(rep["years"])), "type": rep["type"], "updates": sorted((u["type"], u["doi"]) for u in rep["updated_by"]),
            "retracted": rep["is_retracted"], "abstract": sha256(norm_text(rep["abstract"] or "")), "quotes": src["support"]}
# exclus : indexed, deposited, is-referenced-by-count, cited_by_count, updated_date, date de la requête, octets bruts
```

```ts
// typographie animée : suites bidi d'abord, mots ensuite (bidi-js, MIT)
for (const run of bidiRuns(text, "rtl")) {          // [{dir: "rtl"|"ltr", text}], ordre logique
  run.dir === "ltr"
    ? out.push(<span dir="ltr" style={{ display: "inline-block" }}>{words(run.text).map(animWord)}</span>)
    : out.push(...words(run.text).map(animWord));      // espaces réels entre les spans, jamais de margin seule
}
```

```sh
# synchro : déterministe, par réplique, repos forcé ensuite dans les silences de l'alignement
rhubarb -q -r phonetic --threads 1 --extendedShapes GHX -f json -o line.json line.wav   # WAV seulement, garder res/
```

Séparation des locuteurs d'une prise R1 (algorithme proposé) : (1) chaque tour envoyé avec `<long pause>` à la fin ;
(2) silences ≥ 0,35 s (`silencedetect`) → segments de voix ; (3) F0 médiane par segment, 2 classes (k-moyennes),
étiquetées par la prise de casting ; (4) suite des classes = suite des locuteurs du script, sinon **refus** et liste des
écarts ; (5) Whisper sert seulement à recaler les bornes et à mesurer `heard`. Avec deux voix de même genre, (3) ne
discrimine plus : alors une requête par personnage.

## (d) Classement sous l'angle technique

1. **B** : les meilleurs contrats (textes par langue, registres générés, bouche paramétrique, `hybrid`), mais son
   pipeline « Node sans compilation » ne charge pas ses propres styles et ses axes de structure tirés ne tiennent pas :
   deux corrections nettes, pas une refonte.
2. **A** : le plus faisable vite et le plus proche de l'existant ; ses failles (multilingue inline, contradiction de la
   voix, vocabulaire fermé dans le schéma) sont plus profondes dans le modèle de données que celles de B.
3. **C** : les meilleures idées d'exploitation (CAS en releases, quota, F0, clé OpenAlex), à reprendre telles quelles,
   mais son empreinte de sources se périme seule chaque nuit, il retire l'oreille du propriétaire et il construit
   l'automatisation avant d'avoir un épisode.

Recommandation pour la synthèse : schéma et textes de B, structure de scène écrite et frontière Node/Python de A,
stockage adressé par contenu, grand livre de quota, F0 et clé OpenAlex de C ; plus les corrections 1, 2, 3, 4, 6, 7, 8
et 10 du tableau.
