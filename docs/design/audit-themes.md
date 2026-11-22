# Audit de réutilisation : `quran-themes-demo` (lecture seule, 2026-11-22)

Méthode : code lu (pas seulement les noms), docs/history.md, docs/retention.md, docs/model.md, CLAUDE.md. Rien exécuté de lourd, rien modifié.
Chemins relatifs à `/home/user/quran-themes-demo`. « Effort » = pour la nouvelle chaîne (livres vs science, 9:16 45-60 s, 2 personnages + 1 narrateur).

## Vue d'ensemble (à lire d'abord)

1. **Le dépôt est très couplé à son domaine** (versets, récitations, hadiths, arabe RTL, règles « jamais de personnage pour un prophète »), mais **les trois choses les plus chères à reconstruire sont génériques en esprit** : l'alignement texte-prise (Whisper + difflib), le nivelage −16 LUFS, et le rendu GitHub Actions en matrice avec release brouillon. Le reste est « le patron, pas le code ».
2. **Gemini TTS est appelé en mono-locuteur uniquement** (une voix, un style global par prise). Aucun code multi-speaker, aucune émotion par réplique. C'est le plus gros écart avec le besoin « dialogues à plusieurs voix avec émotion ».
3. **Pas de synchro labiale d'aucune sorte** (zéro occurrence de Rhubarb/viseme). Seul patron existant : bouche ouverte/fermée par le volume RMS (ancien circuit, `react-peeps`), ~10 changements/s.
4. **Les personnages « bonshommes » existent** (`Sahib.tsx` `Stick` : bras/jambes à 2 segments, cinématique inverse pour les mains, 12 visages SVG) mais **chaque scène est chorégraphiée à la main en TSX** (`Played.tsx` 1 206 lignes, `Sahib.tsx` 1 285 lignes). Rien n'est piloté par un JSON de script : c'est l'inverse de « un style lit le même JSON ». Le bon patron d'architecture pour « style = module » est dans l'**ancien circuit** (`video/src/styles/kit.ts`, interface `StyleKit`).
5. **Le contenu du modèle actuel (`content/trial/*.yaml`) n'a pas de schéma** : validation par `tools/trial/rules.py` (849 lignes Python procédural) + tests « copie et casse une chose ». Les schémas JSON ne couvrent que l'ancien circuit (`episode.schema.json`) et le registre (`source.schema.json`).
6. **Le registre de sources contient déjà un type `science`** (`content/sources/science.yaml`), mais avec `claim` en texte libre et `checked` = pages lues par la session : **aucune vérification automatique par DOI**. Le patron « texte copié d'une API, `--check` en CI » est transposable à Crossref/OpenAlex ; le code de `fetch.py` ne l'est pas tel quel.
7. **Licences** : dépôt MIT ; Remotion « gratuit pour un particulier » seulement (à revérifier pour une chaîne monétisée, voir risques) ; polices OFL ; Open Peeps CC0 ; ambiances CC0 ; clips Pixabay (licence Pixabay, pas OSI). Voix : conditions Gemini UE et licence VoiceTut (NC héritée) à lever.

## Tableau récapitulatif

| Brique | Chemin(s) | Verdict | Effort | Risque |
|---|---|---|---|---|
| Voix Gemini (mono-locuteur, style global) | `tools/tts/gemini.py`, `.github/workflows/voice-test.yml` | À extraire et généraliser (ajouter multi-voix/émotion) | 1-2 j + 1-3 requêtes d'essai | Quota 10/jour partagé avec la chaîne arabe ; conditions UE/commercial non tranchées |
| Voix locales (VoiceTut, SILMA) | `tools/tts/say.py`, `requirements/` | Rien (pas d'émotion, CPU lent, licence NC héritée) | - | Licence ; qualité |
| Skills voix | `.claude/skills/narration-takes`, `voice-spelling` | Seulement le patron (budget, une requête par texte, prises gardées) | 0,5 j | Spécifique à l'arabe (vocalisation) |
| Alignement phrase/mot | `tools/audio/align.py`, `listen.py` | **À extraire et généraliser** (langue en paramètre, normalisation non arabe) | 1 j | Whisper CPU lent ; normalisation arabe codée en dur |
| Nivelage / durées | `tools/audio/build.py` (`level`, `loudness`, `tighten`) | À extraire (50 lignes utiles dans un fichier de 771) | 0,5 j | Couplé au circuit épisodes |
| Remotion : socle (Root, fonts, formats, calculateMetadata) | `video/src/Root.tsx`, `data.ts`, `formats.ts`, `fonts.ts`, `video/package.json` | Seulement le patron (copier la structure) | 0,5 j | Remotion licence |
| Remotion : bonshommes articulés | `video/src/trial/Sahib.tsx` (`Stick`, `FaceMarks`, `reach`), `Lens.tsx` (`Figure`, `walk`, `mix`) | **À extraire et généraliser** (le composant, pas les scènes) | 2-3 j pour 2 personnages + bouche | Le style actuel est « sans visage animé » ; pas de bouche visème |
| Remotion : personnage à bouche pilotée par le volume | `video/src/characters/Character.tsx`, `peeps.ts` | À extraire (le patron RMS ; Open Peeps trop figé) | 0,5 j | Dépend de `react-peeps` (CC0/MIT) ; 2 visages seulement |
| Remotion : choréographie de scène | `video/src/trial/Played.tsx`, `AyahPlayed.tsx` | Seulement le patron (`u`, `ramp`, `at(n)`) | - | Dette : une fonction TSX par scène |
| Remotion : mécanisme de style interchangeable | `video/src/styles/kit.ts`, `kits.ts`, `context.ts`, `Chalk/Paper/Illumination/Watercolor` | **Seulement le patron** (interface `StyleKit`) ; archivé par le propriétaire | 2 j pour la nouvelle interface | Dette ; mêlé à Open Peeps |
| 9:16 et 16:9 du même script | `video/src/trial/Film.tsx` (`wideTall`, `WIDE`), `Trial.tsx` | Seulement le patron (hors périmètre pilote 9:16) | - | Table à la main par scène |
| Couvertures / vignettes | `Cover.tsx`, `ThumbFrame.tsx`, `ThumbArt.tsx`, `Thumbnail.tsx` | Seulement le patron (Still au frame 45, zone sûre) | 0,5 j | - |
| Schémas | `schemas/episode.schema.json`, `source.schema.json` | Seulement le patron (le contenu actuel n'a pas de schéma) | - | Remplacer par zod |
| Règles sur fichiers | `tools/trial/rules.py`, `content/wording.yaml`, `tests/test_trial_rules.py`, `scripts/validate.py` | **Seulement le patron** + test « copie et casse » | 1 j pour le squelette | Dette énorme si copié |
| Registre de sources | `content/sources/*.yaml`, `tools/sources/fetch.py`, `tools/trial/sources.py`, `content/policy.yaml` | À extraire et généraliser vers DOI (Crossref/OpenAlex) | 2-3 j | Qualité du match auteurs/titre ; pas de `--check` DOI aujourd'hui |
| Ambiances / bruitages | `tools/trial/ambience.py`, `sfx.py` | À extraire (sfx générés par code : rien à créditer) | 1 j | Règle « jamais sous un verset » à remplacer |
| Contrôle de rendu | `tools/trial/check.py` | **Réutilisable presque tel quel** (planches d'images, format, LUFS) | 0,5 j | `--data` attend le JSON du modèle |
| Raccord de correction | `tools/trial/splice.py` | À extraire (utile dès qu'on corrige un rendu validé) | 0,5 j | Dépend du bundle Remotion |
| Textes de publication | `tools/trial/publish.py`, `content/publish.yaml`, `content/wording.yaml` | Seulement le patron (limites par plateforme, mots refusés) | 1 j | Hors pilote |
| Rendu GitHub Actions | `.github/workflows/film.yml`, `validate.yml`, `page-files.yml`, `render.yml` | **À extraire et généraliser** (prepare → matrice de rendu → release brouillon) | 1-2 j | Gros fichier (584 lignes), très spécifique |
| Galerie + « je valide » | `tools/trial/gallery.py`, champs `script_validated`/`validated` | Seulement le patron | 0,5 j | Artefact privé limité à 256 Mio |
| Analyses de rétention | `reference/*.md`, `docs/retention.md` | Leçons transposables (chiffres plus bas) | 0 | Échantillons minuscules |

---

## 1. Voix

### `tools/tts/gemini.py` (142 lignes, bibliothèque standard seule)
- **Ce que ça fait vraiment** : un `POST` sur `https://generativelanguage.googleapis.com/v1beta/interactions` (et non `generateContent`), modèle par défaut `gemini-3.8-flash-tts`. Corps :
  ```python
  body = {"model": model,
          "input": [{"type": "user_input", "content": [content]}],
          "response_format": {"type": "audio"},
          "generation_config": {"speech_config": [{"voice": voice}]}}
  # style : content["annotations"] = [{"type": "speech_metadata", "style": style}]
  ```
- **Mono-locuteur** : `speech_config` ne contient qu'**une** entrée `{"voice": "Algieba"}`. Le script boucle `voices × textes`, **une requête par couple**. Aucune notion de locuteurs, de balises `[Speaker A]`, ni de `multiSpeakerVoiceConfig`. La forme en **liste** de `speech_config` laisse penser que l'API accepte plusieurs entrées (un locuteur chacune) : **non vérifié, non codé**. À tester par une requête d'essai avant de bâtir dessus. Si ça marche : un dialogue entier en **une** requête (le quota s'en trouve ménagé).
- **Émotion** : seulement la première ligne `# style: …` du fichier texte, transmise comme annotation `speech_metadata.style` (direction globale, jamais lue à voix haute). **Une prise = un style.** Pas de contrôle par réplique. Pour de l'émotion par personnage il faut soit une requête par personnage/émotion (coûteux), soit des indications inline dans le texte, soit du multi-speaker avec style par locuteur : tout ça est à essayer.
- **Clé** : `os.environ["GEMINI_API_KEY"]`, envoyée dans l'en-tête `x-goog-api-key`, jamais imprimée ; c'est un **secret du dépôt GitHub** lu seulement par le workflow `voice-test` (le formulaire de clé des sessions Claude n'envoie pas cet en-tête, noté dans docs/retention.md). Un test du workflow distingue secret et variable de dépôt (`Is the key there?`).
- **Quota / garde-fous** : palier gratuit **10 requêtes par jour et par projet Google** (compteur par modèle, remise à zéro minuit heure du Pacifique ; « pas strict en pratique », ne pas compter dessus). `--max-requests` (4 par défaut) refuse de partir avant d'envoyer ; `--pause 35` s entre requêtes ; reprise sur 429/5xx après 30 puis 60 s, **pas d'attente si le message dit « per day »** ; une prise refusée ne perd pas les prises déjà faites (le run échoue à la fin).
- **Sorties** : WAV 24 kHz mono 16 bits (enveloppe RIFF ajoutée si PCM brut). Le workflow convertit en **MP3** (écoute sur téléphone) et **FLAC** (prise sans perte gardée dans `content/trial/takes/`, « jamais redemandée »), puis attache le tout à la pré-release `voice-test-latest`.
- **Couplage domaine** : faible dans le script (c'est de l'arabe seulement dans le texte et le style de `content/voice-test/20-trial-*.txt`). Le workflow porte en revanche l'ancien comparatif VoiceTut/SILMA.
- **Verdict** : *à extraire et généraliser*. Ajouter : sortie JSON horodatée par réplique (voir 2), un fichier d'entrée à plusieurs locuteurs (`SPEAKER: texte` + style par locuteur), un essai multi-speaker, une résolution de la langue. **Garder** `--max-requests`, le `per day`, le secret côté workflow.
- **Risques** : (a) **le quota de 10/jour est déjà consommé par quran-themes-demo** (le brief le dit) ; la règle « jamais plusieurs projets ou comptes pour multiplier un quota » interdit de contourner → un épisode d'essai = 1 à 3 requêtes, et il faut les compter ; (b) conditions Gemini lues le 2026-11-11 (docs/retention.md) : Google ne revendique pas la propriété des sorties ; rien d'explicite sur la publication ; contenu du palier gratuit utilisé pour améliorer les produits, **mais** pour l'EEE/Suisse/UK ce sont les règles du palier payant qui s'appliquent même au quota gratuit (à revérifier, pas un avis juridique) ; (c) « la voix est signalée comme générée par IA dans chaque description » est une règle du dépôt, à garder ; (d) la voix `Algieba` a été choisie **pour l'égyptien** à l'oreille ; l'anglais/français/arabe standard sont à écouter séparément (le test de comparaison du 2026-11-11 a donné « tous les mots » en arabe standard pour C/D/E).

### `tools/tts/say.py` (117 lignes) + `requirements/silma.txt`, `voicetut.txt`
- Moteurs **locaux CPU** : SILMA (arabe standard + anglais, clonage depuis un clip) et VoiceTut (égyptien + anglais, **19 voix intégrées**, dont 7 voix de femmes : Hadeer, Hanan, Mariam, Rana, Sarah, Yasmin, Yara ; seul réglage : vitesse, **pas d'émotion**). VoiceTut sur CPU de runner : « des minutes par phrase », 90 min de timeout par job voix.
- **Verdict : rien** pour la nouvelle chaîne (ni émotion, ni langue française, lent). Seul intérêt : un repli à plusieurs voix **sans quota**, en anglais.
- **Risque licence** : VoiceTut est publié en Apache 2.0 mais **affiné d'OmniVoice dont les poids sont CC-BY-NC** : usage monétisé incertain (docs/retention.md, « Les voix »). SILMA : Apache 2.0.
- Recherche du 2026-11-11 (à revérifier) : aucun modèle libre n'est à la fois proche des meilleurs payants, utilisable commercialement et rapide sur CPU ; Supertonic 3 (OpenRAIL-M, exige de dire que la voix est générée) jugé « très mauvais » à l'oreille pour l'arabe ; Chatterbox Multilingual (MIT) trop rapide/mécanique et lent sur CPU.

### Skills `narration-takes`, `voice-spelling`
- `narration-takes` : le **patron de budget** est le bon : une requête = un texte entier (13-15 lignes ≈ 65 s), prise FLAC **commitée** et jamais redemandée, texte validé par le propriétaire avant toute requête, une correction = **une** nouvelle requête qui regroupe tout. À reprendre tel quel dans l'esprit ; les détails (arabe, `# style:` Algieba) sont à réécrire.
- `voice-spelling` : vocalisation/orthographe pour faire bien dire un mot (arabe, VoiceTut `say_ar`, `content/pronunciation.yaml`). **Rien** pour un français/anglais, sauf l'idée d'un fichier de prononciations corrigées.

### `.github/workflows/voice-test.yml` (222 lignes)
- Patron utile : `workflow_dispatch` avec entrées `gemini_voices` (`label=Voice`), `gemini_texts` (liste restreinte à `content/voice-test/*.txt`), `gemini_max_requests` ; `concurrency: group: voice-test, cancel-in-progress: false` (une annulation perd des prises déjà comptées, incident du 2026-11-19) ; ffmpeg statique d'`imageio-ffmpeg==0.8.1` **sans apt** (le miroir Ubuntu a bloqué 1 h) ; upload en pré-release.
- **Verdict** : le job `gemini` est à reprendre (≈ 60 lignes), le reste (matrice VoiceTut) à jeter.

---

## 2. Alignement et temps

### `tools/audio/align.py` (185 lignes) + `listen.py` (344)
- `listen.transcribe` : **faster-whisper `mobiuslabsgmbh/faster-whisper-large-v3-turbo`, CPU int8**, `word_timestamps=True`, **`language="ar"` codé en dur**, ~temps réel sur 4 vCPU. `align.words_of` renvoie `(mot, début, fin)` pour chaque mot entendu.
- `align.align()` : aligne **lettre à lettre** (`difflib.SequenceMatcher`) le texte voulu (normalisé par `listen.plain`) sur les lettres entendues, ce qui rend l'alignement robuste aux mots mal transcrits. Chaque phrase commence à **la fin de la pause qui précède son premier mot** (silences `ffmpeg silencedetect` à −38 dB, puis −34/−30/−26 dB si la respiration a été relevée par le nivelage). Sortie : `Phrase(text, start, pause, heard, said)` ; `heard < 0,6` = phrase mal dite (`!!`) → retake.
- **Utile pour nous ?** Oui, en deux emplois :
  1. **Sous-titrage mot à mot / minutage des répliques** : les mots avec temps existent déjà (`words_of`) ; le code ne s'en sert que pour trouver le début des **phrases**. Réécrire une fonction `word_times(take, text) -> [(mot, t0, t1)]` est trivial (15 lignes) à partir des mêmes briques.
  2. **Synchro labiale de repli (Rhubarb absent)** : les temps de mots ne donnent pas de visèmes, mais permettent un pilotage « bouche ouverte pendant un mot, fermée dans les pauses » plus propre que le RMS pur.
- **Couplage arabe** : `PHRASE_CUT` (ponctuation arabe `،`, `؟`), `listen.plain()` (retire harakat, unifie ا/ى/ة/ؤ/ئ), `language="ar"`. Pour le français/anglais : remplacer `plain` par une normalisation (casse, ponctuation, accents optionnels) et passer `language`.
- **Problèmes connus (dans les commentaires)** : début de mot Whisper = souvent le début de la **pause** avant ; mot court ou deux phrases dans un souffle → deux phrases au même instant ; clips < 3 s → hallucinations de Whisper. Ils ont des tests (`tests/test_align.py`).
- **Verdict** : **à extraire et généraliser** (langue en paramètre, normalisation par langue), ~1 jour ; garder les 3 correctifs `LOUDER_FLOORS`, `holder`, `before_its_word`, ils ont été payés cher.
- **Risque** : modèle ~1,5 Go téléchargé depuis Hugging Face (cache Actions) ; **un mode multi-locuteurs n'existe pas** : si la voix produit un dialogue, il faut soit une prise par locuteur, soit découper la prise unique par les répliques (l'alignement phrase-à-phrase fait déjà ça sur un texte à plusieurs « phrases » ; chaque réplique est une phrase de plus, le locuteur est connu du script).

### `tools/audio/build.py` (771 lignes)
- À prendre : `loudness()` (EBU R128 via `ffmpeg ebur128`), `level()` (un gain pour amener la partie à **−16 LUFS** intégrés + `alimiter limit=0.8`), `tighten()` (silences raccourcis : ≤ 0,5 s dans une ligne, ≤ 0,7 s entre lignes), `phrase_times`. Chiffres de justification dans le fichier : avant, de −19,4 à −10,7 LUFS sur 8 reels, 3 avec crêtes à 0 dB.
- Le reste (recitation, hadith, `surah_cut`, synthèse VoiceTut, manifestes d'épisodes) est **domaine/ancien circuit** : rien.
- **Verdict** : extraire ~120 lignes (`level`, `loudness`, `tighten`) en module audio ; 0,5 j.

### `tools/audio/recitation.py` (289 lignes)
- Coupe d'une sourate par verset, temps des mots d'un verset par alignement Whisper. **Rien** pour nous (domaine), sauf le patron « temps de chaque mot ».

---

## 3. Remotion (`video/`)

### Socle
- Versions épinglées : `remotion 4.0.541`, `@remotion/cli`, `@remotion/fonts`, `@remotion/media-utils`, `react 19.2.0`, `yaml 2.8.1`, Node ≥ 22.18 (exécute `.ts` tel quel : `node scripts/prepare.ts`). `remotion.config.ts` : JPEG, `yuv420p`, `bt709`, `REMOTION_BROWSER_EXECUTABLE` pour le Chromium préinstallé de la session.
- **Données → rendu** : les compositions lisent un JSON via `calculateMetadata` + `fetch(staticFile(...))` (`data.ts` ancien circuit ; `trialMetadata` dans `Trial.tsx`). `durationInFrames = ceil(data.seconds * 30)`. Le JSON est produit en amont par Python (`tools/trial/prepare.py` → `video/public/trial/<id>-<voix>.json` + audio copié) ou Node (`video/scripts/prepare.ts`). **C'est le bon patron « contenu séparé du rendu »**, mais le JSON est un *minutage* déjà résolu (segments, `start`, `seconds`, `file`, phrases avec `start`), pas le script lui-même.
- `formats.ts` : zones sûres reel `{top 250, right 90, bottom 420, left 90}` (mêmes que quran-reels), `FPS = 30`, `STAGE.reel.floorY 1360`.
- `fonts.ts` : `loadFont` de `@remotion/fonts`, polices dans `video/public/fonts/` (Amiri, Amiri Quran, Lora, Aref Ruqaa) **toutes OFL**, licences copiées à côté.
- `Root.tsx` : une `<Composition>` par format/objet (`Trial916`, `TrialFilm169`, `TrialFilm916`, `TrialCover916`, `TrialThumb169`, `Trailer169`…) ; `Still` pour les fiches.
- **Verdict** : seulement le patron. Réécrire propre : `Composition` unique par style, props `{episode, style, lang, data}`.

### Les bonshommes : `video/src/trial/Sahib.tsx` (1 285 lignes), `Lens.tsx` (667), `AyahPlayed.tsx` (294), `Played.tsx` (1 206)
Ce qui existe réellement (code lu) :
- **`Stick`** (`Sahib.tsx` l.167) : un SVG articulé. Paramètres : `pose: {torso, head, armF[a,b], armB, legF, legB}` (angles en degrés, **deux segments par membre** : `SEG = {torso 122, neck 8, head 52, upper 64, fore 60, thigh 78, shin 76}`), `facing ±1`, `tone white|grey`, `face`, `handF/handB` (point du monde que la main doit atteindre → **cinématique inverse à deux segments** `reach()` avec côté du coude `bendF/B`), `heldF/heldB` (objet tenu dans la main), accessoires (`scarf`, `beard`, `cap`, `burn`), `look` (la tête se retourne). Silhouette : corps tracé deux fois (trait noir large + remplissage) pour le contour.
- **Poses** : `POSES = {stand, seat, stride, bent}` ; `Lens.tsx` ajoute `POSES` (Record), `mix(a, b, k)` (interpolation de poses) et `walk(phase)` (cycle de marche).
- **Visages** : `FaceMarks` = **12 visages statiques** (`neutral, smile, happy, shock, smirk, kind, puff, angry, worried, laugh, calm, cross`), faits d'ellipses (yeux), de traits (sourcils) et de chemins (bouche). **Pas de clignement animé, pas de bouche à visèmes.** Pour qu'un personnage « parle », il faudrait ajouter 2-3 variantes de bouche (fermée / mi-ouverte / ouverte) indépendantes de l'expression, et les piloter dans le temps. Dans ce style actuel, les personnages jouent **sans narration** (« sans voix » dans « الصاحب ساحب ») : le problème de la parole n'a jamais été traité.
- **Animation** : une fonction par scène (`WorkPlayed`, `PrayPlayed`…) reçoit `{u, t, at, variant}` : `u` = secondes depuis le début de la scène, `at(n)` = instant où la n-ième phrase de la narration est dite (calculé par `align.py`), et compose avec `ramp(u, a, b)` (easing cubique), `lp`, `walking`. **Aucun DSL de timeline** : la chorégraphie est du code. Coût : 20-30 lignes par scène, mais **aucune réutilisation sans modifier du TSX** → à l'opposé de l'exigence « ajouter un style ne touche jamais aux scripts ».
- **Qualité observée** : propre, expressif, validé par le propriétaire (« les bonshommes à visage simple »). Les rétentions mesurées dans `reference/stickman-shorts-analysis.md` sont pour une chaîne **externe**, pas pour la nôtre.
- **Couplage domaine** : le code est neutre (corps, décor, objets) ; ce sont les **scènes** qui sont coraniques (musc, prière, ahwa). `Played` impose « personnes anonymes d'une scène type » (règle du propriétaire).
- **Verdict** : **à extraire et généraliser** : `Stick` + `FaceMarks` + `reach` + `POSES/mix/walk` → un package `characters/` (≈ 400 lignes) avec : couleurs/accessoires par personnage (2 personnages + narrateur), bouche pilotée (voir plus bas), pose et expression **issues du JSON** (`{t, pose, face, look}` en keyframes). **Ne pas reprendre** les 70 scènes `*Played`. Effort : **2-3 j** (incluant des essais de lisibilité de la bouche à 1080×1920).
- **Risques** : qualité de la bouche (le visage est petit : 52-px de rayon de tête × 1,3 d'échelle) ; le rendu SVG animé coûte du CPU (Paper « 4× le style plat », mais SVG plat ≈ 0,04 s/image).

### `video/src/characters/Character.tsx` (105 lignes) + `peeps.ts` (ancien circuit)
- Personnage **Open Peeps** (`react-peeps` 0.1.10) : `body`, `face`, `hair`, `accessory` ; `CharacterView` avec **respiration** (`scaleY(1 + 0.006 sin)`). **Bouche pilotée par le volume** : `useAudioData(staticFile(audio))`, fenêtre 0,1 s, RMS `> 0.08` → visage ouvert (`face_open`) sinon fermé ; `MOOD_FACES` = `calm→Calm/Explaining`, `worried→Concerned/ConcernedFear`, `smiling→Smile/SmileBig`. Mesuré sur VoiceTut : RMS 0,03-0,26 en parole, < 0,003 en silence ; ~10 changements/s.
- **C'est le patron de repli demandé** (« bouche pilotée par le volume ») en 20 lignes, et il marche déjà. **Verdict** : reprendre la fonction `loudness()` et le seuillage ; abandonner Open Peeps (figures figées, 10 corps mesurés à la main `BODY_BOX`, ancien circuit archivé par le propriétaire).
- **Licences** : Open Peeps (Pablo Stanley) **CC0** ; `react-peeps` MIT.
- **Mieux que le RMS brut** (à faire pour nous) : lire le volume sur une prise **par locuteur** (ou découper la prise commune par répliques via `align`), lisser (hystérésis), 3 niveaux de bouche au lieu de 2 ; tester Rhubarb (87 Mo, release GitHub OK d'après le brief) ensuite.

### Mécanisme de « style » interchangeable
- **Dans le modèle actuel (trial)** : non. Un seul « aspect » (clip filmé + silhouettes) ; les variantes par série sont des **tables d'objets** par id : `PICTURES`, `OVERLAYS`, `LAYOUTS` dans `Trial.tsx` (l.462, 549, 612), qui importent `*_PICTURES` de chaque fichier de série ; `Film.tsx` répète le même schéma avec `WIDE`. Ajouter une vidéo = écrire un composant TSX et l'inscrire dans ces tables : **c'est ce que le nouveau projet doit éviter**.
- **Dans l'ancien circuit (archivé « styles deviennent de l'archive », 2026-11-11)** : **oui, c'est le bon patron.** `video/src/styles/kit.ts` définit :
  ```ts
  export type StyleKit = {
    Backdrop: React.FC<KitProps>;  Scene: React.FC<KitProps>;
    Panel: React.FC<{kind: PanelKind; format: Format; children}>;
    ink: {text; muted; accent; highlight};
    Title: React.FC<KitProps & {phrases: TitlePhrase[]}>;
    Thumb: React.FC<{t: ThumbnailData; c: Character | null}>;
  };
  ```
  `KITS` (`kits.ts`) mappe `VisualStyle → StyleKit` ; `StyleContext` fournit le style ; `docs/styles.md` documente « Ce qui ne change jamais » (texte, références, signature, sous-titres, zones sûres) : exactement la discipline voulue. Quatre styles existaient (`paper` 269 l., `chalk` 212, `illumination` 260, `watercolor` 201) + une `StyleLab` pour comparer sur un même plan. **Mesure** (docs/styles.md) : style papier ≈ **4×** le coût de rendu du plat.
- **Verdict** : *seulement le patron*. Reprendre l'interface `StyleKit` (adaptée : `Scene`, `Typography`, `SplitScreen`), le principe de « ce qui ne change jamais », le `StyleLab` (un plan, N styles, une planche), **pas** le code des styles (liés à Open Peeps et au décor de la caverne).

### 9:16 et 16:9 d'un même script
- `Film.tsx` (539 l.) : même timeline JSON, mise en page 16:9 (`WIDE`, côté dessin/côté texte), version 9:16 `FilmTall` (même minutage, images des shorts) ; `wideTall(name, {scale, top, track})` recadre un dessin 9:16 dans un cadre 16:9 ; `Hayyin` a un `HAYYIN_WIDE` dessiné à part (« le 16:9 redessiné »). **À la main par scène.** Pour nous (pilote en 9:16) : hors périmètre, à garder comme idée (zone sûre 16:9 `{80,160,120,160}`).

### Couvertures et vignettes
- `Cover.tsx` (125), `ThumbFrame.tsx` (135), `ThumbArt.tsx` (403), `Thumbnail.tsx` (278) : `Still` pris au **frame 45** de compositions de 60 images (le clip a le temps de démarrer) ; couverture 9:16 avec titre et titre-tag **dans le carré central** (ce que la grille de profil montre) ; vignette YouTube 16:9 lisible à 170 px, rien en bas à droite (durée). **Patron à reprendre** (règles + frame 45), pas le code.

### Dette / qualité
- `Trial.tsx` 922 lignes, import de 14 fichiers de séries, un seul registre global : couplage fort. Les chiffres sont écrits `123`, jamais `١٢٣` (règle du propriétaire) ; `<div dir="rtl" lang="ar">` partout pour l'arabe ; `English` gère le repli de police pour les signes arabes dans l'anglais : **tout ça est à repenser pour une chaîne qui ne serait pas arabe**.

---

## 4. Schémas, validation, tests

- `schemas/episode.schema.json` (184 l.) : épisodes de l'**ancien circuit** (scènes, reels, `visual.template`, personnages). `schemas/source.schema.json` (244 l.) : entrée du registre, `additionalProperties: false`, types `ayah|hadith|athar|tafsir|fiqh|science`, `origin` (URLs exactes d'où le texte a été copié), `grade`/`graded_by`, `excerpt_*`, `en_corrections` (coquilles corrigées à l'écran seulement, avec `why`). **Les fichiers `content/trial/*.yaml` (le modèle courant, 14+ séries) n'ont aucun schéma JSON.**
- `scripts/validate.py` (688 l.) : jsonschema + règles éditoriales de l'ancien circuit ; `--release` exige que toute source citée soit **validée** (donc un rendu final est refusé sinon).
- `tools/trial/rules.py` (849 l.) : **c'est lui qui bloque un rendu** (le job `prepare` de `film.yml` l'exécute en premier, `validate.yml` à chaque PR). Erreurs : citation absente/exclue/hors politique, lecture sans enregistrement, **voix de synthèse qui dirait une citation (4 mots de suite)**, texte de voix ≠ répliques, `reuse` cassé, champ manquant, réplique vide, titre YouTube > 100, signe sans glyphe dans la police. Avertissements : mots refusés (`content/wording.yaml`, `dialect.yaml`), 1ʳᵉ phrase d'un mot, ligne anglaise > 125 car., short > 2:05, source non validée. « À vérifier à l'œil » en bas : ce qu'aucun code ne voit.
- `tests/test_trial_rules.py` : **patron à reprendre tel quel** : copie du contenu dans un répertoire temporaire, **casse une chose**, vérifie que `rules.py --root` refuse. Passer en CI ne prouve pas que la règle mord encore ; ce test le prouve.
- **Verdict** : seulement le patron. Nouveau projet : **zod** pour la forme (épisode, scène, réplique, source, verdict), puis un fichier `rules` pour les contraintes croisées (DOI vérifié, durée estimée 45-60 s, badge présent, aucune réplique sans locuteur, aucune citation > N mots, aucun nom réel). Un `--root` pour tester sur une copie cassée. Effort squelette : 1 j.
- **Dette** : `rules.py` mélange 849 lignes de règles de contenu propres au Coran et des règles génériques ; ne pas copier, réécrire.

---

## 5. Sources : « une citation n'existe que par son id »

- **Patron** (`CLAUDE.md`, règles obligatoires) : aucun texte de verset/hadith tapé à la main. Le texte vient du **registre** (`content/sources/*.yaml`), lui-même **rempli par `tools/sources/fetch.py` depuis une API** (quran.com v4, hadith-api via jsDelivr, turath.io), avec l'**`origin`** (URL exacte, date de récupération) ; **`fetch.py --check` en CI** échoue si un texte du dépôt diffère de l'API ; une source **validée** dont le texte a changé repasse à `proposed` ; le statut `validated` est celui du propriétaire (jamais écrit par l'IA). `rules.py` refuse un id absent, exclu, hors politique.
- **`content/policy.yaml`** : ce qu'on a le droit de citer (recueils, tafsirs, jugement d'al-Albani pour Tirmidhi, fiqh par quatre écoles), avec la règle « tout autre : demander au propriétaire ».
- **`science.yaml` existe déjà** (type `science`) mais ses entrées sont : `ref {author, title, publication, year}`, `url` (Wikipedia, PNAS…), `label {ar,en}` écrit à l'écran, `claim` (texte libre), **`checked {on, sources[]}` = pages que la session a lues**, `status: validated`, `validated_by`. **Pas de DOI, pas de vérification par API.** C'est donc le **cadre** (registre + statut + validation + libellé à l'écran + `claim`) qui est réutilisable ; la vérification est à construire.
- **Transposition aux DOI (patron applicable)** :
  - `fetch.py` pour DOI : `GET api.crossref.org/works/<doi>` (titre, auteurs, année, type, `container-title`, `is-referenced-by-count`) + OpenAlex en recoupement ; copier titre/auteurs/année/venue dans `origin`, **comparer** au titre/auteurs/année déclarés dans l'épisode ; `--check` en CI. La session a Crossref et OpenAlex joignables (brief).
  - Comme pour les versets : l'épisode ne cite que `source: paper.<id>` ; l'affichage « étude citée à l'écran » est composé depuis le registre (auteurs, année, journal, type d'étude, n), jamais saisi.
  - Étendre `claim` en **`claims[] {id, text, finding, population, effect_size?}`** avec la **relation** (« confirme », « nuance », « contredit ») et la **justification** du badge ✅/⚠️/❌ : c'est de l'ajout, pas un patch.
  - Statut `proposed → verified (machine) → validated (propriétaire)`; un rendu final refuse tout ce qui n'est pas `verified`.
- **Limites** (à écrire dans LIMITES.md) : le DOI prouve que l'article existe et que titre/auteurs/année concordent, **pas** que la phrase de l'épisode résume bien ses résultats : d'où le relecteur humain/IA qui relit l'abstract (Crossref n'a pas toujours l'abstract ; OpenAlex fournit `abstract_inverted_index`).
- **Verdict** : *à extraire et généraliser* (le patron + 80 lignes du client HTTP avec `User-Agent`, cache, reprise), 2-3 j. **Ne pas copier** `tools/trial/sources.py` (336 l.) : il prépare l'audio du verset/hadith.
- **Risque** : correspondance de titres Crossref/OpenAlex (casse, sous-titres, traductions) ; faux positifs de mêmes auteurs ; livres (pas de DOI : ISBN/Open Library, séparer « livre » et « étude »).

---

## 6. Son : ambiances, bruitages, nivelage

- `tools/trial/ambience.py` (187 l.) : une nappe par vidéo de la **durée de la vidéo**, boucle sans couture (`LOOP_FADE 4 s`), niveau en **LUFS** (`LEVEL = −36`, voix à −16 : 20 LU en dessous), s'éteint **0,8 s avant** une récitation/un hadith et revient après (`BEFORE`, `AFTER`, `APART`), changement d'enregistrement par image (`EDGE 0,7 s`) ; `--mix` pose la nappe sous une vidéo **déjà rendue** sans réencoder l'image. Sources : **BigSoundBank (Joseph Sardin), CC0** (téléchargées dans `build/trial/ambience/`, jamais commitées). **Couplage domaine** : la règle « jamais sous un verset » ; l'idée est générique (ducking sous un segment).
- `tools/trial/sfx.py` (278 l.) : **effets générés par code** (numpy : bruit + sinus descendant) : `scan, impact, whoosh, pops, click, lock, sizzle, shimmer, puff, pop, buzz, engine, coins, count` ; **rien à télécharger, rien à créditer, rien de musical** ; piste jouée sous la vidéo comme l'ambiance ; événements `[son, secondes]` par segment. **Verdict : à extraire** (les sons génériques : whoosh, pop, impact, click, count, buzz) ; 1 j.
- **Licences/risques** : ambiances CC0 (aucun risque de droits) ; la chaîne analysée (`STICK TO IT`) met de la **musique** : les règles du propriétaire interdisent la musique dans ce dépôt ; pour la nouvelle chaîne c'est une **décision à poser** (musique libre = risque Content ID / `inauthentic content` moindre avec variation). Aucune musique n'est dans ce code.
- **Nivelage** : voir `build.level` (−16 LUFS, limiteur −1,9 dBFS via `loudnorm=I=-16:TP=-1.9:LRA=11` dans `prepare.py`). `check.py` vérifie −17,5 ≤ LUFS ≤ −15.

---

## 7. Contrôle d'un rendu

- `tools/trial/check.py` (114 l.) : `ffprobe` (format, durée, codec, pix_fmt), comparaison de la durée à la timeline du JSON, **loudness EBU R128 + crête**, puis **planches de 16 images** (première image, milieu de chaque segment, dernière phrase, dernière seconde) en JPEG que la session **ouvre et lit** (« un texte qui sort du cadre, une ligne sur le dessin, la mauvaise signature, une image qui n'a pas changé ne se voient que là »). Ne juge ni la voix ni l'ambiance (l'oreille du propriétaire).
- **Verdict : réutilisable presque tel quel** : adapter `moments(data)` au nouveau JSON (segments → temps) ; 0,5 j. Précondition : `ffprobe` (le workflow utilise celui qui **vient avec Remotion** `compositor-linux-x64-gnu`, `imageio-ffmpeg` n'en livre pas).
- `tools/trial/splice.py` (188 l.) : re-rendre quelques secondes (bornées sur les images clés) et **raccorder sans réencoder le reste**, avec **preuve image par image** (hash des images décodées hors zone, PSNR < 40 dB = vraie différence) ; pour un correctif de dessin/texte sans changement de son. Précieux dès le deuxième épisode (corriger un détail d'un rendu validé), à extraire en 0,5 j. Dépend du bundle Remotion (`--bundle`, `--composition`, `--props`).

---

## 8. Textes de publication

- `tools/trial/publish.py` (538 l.) : pour chaque vidéo et plateforme, textes à coller (YouTube : titre, description, crédits, hashtags ; FB/IG/TikTok : légende courte = titre, accroche + ligne « voix générée par IA », 3 à 5 hashtags) ; limites dans `content/publish.yaml` (YouTube titre 100, description 5 000 ; Instagram/TikTok 5 hashtags, 2 200 car. ; Facebook 8 hashtags) ; ordre des hashtags documenté ; chapitres YouTube calculés depuis la timeline ; **l'arabe d'abord partout** (décision du propriétaire pour la chaîne arabe) ; mots refusés par le propriétaire dans `content/wording.yaml` (patterns normalisés, `instead`, `why`, `where`) avec avertissements par `rules.py`.
- **Verdict** : *seulement le patron* (limites par plateforme en données ; mots refusés en données ; description générée depuis le registre de sources ; ligne de divulgation IA ; hors du périmètre du pilote). 1 j le moment venu. Pour le nouveau projet les crédits sont **les études (DOI) et le livre (titre/auteur)**, pas des citations.
- **Risque** : la règle `inauthentic content` de YouTube n'est pas traitée ici (la chaîne arabe varie les formats par série) ; à traiter côté nouveau projet.

---

## 9. Rendu dans GitHub Actions

- `.github/workflows/film.yml` (584 l.) : **prepare** (règles, clips Pixabay, prépare chaque short avec les prises gardées, matrice produite par `tools/trial/videos.py --matrix` **lue depuis les fichiers, jamais d'une table**) → **render** (une job par vidéo en parallèle, `fail-fast: false`, `npx remotion render … --concurrency=100% --crf=21 --props="$PROPS"`, chaque vidéo contrôlée par `check.py`, artefact 7 jours, props via variable d'environnement pour éviter les guillemets) → **stills** (couvertures, vignette en JPEG) → **release** (le **seul** job qui écrit : pré-release brouillon `<files>-candidate`, ce qui a réussi est publié même si un rendu a échoué, notes listent le manquant). `from_run` : refaire la release depuis les artefacts d'un run précédent sans rendre. `concurrency: group: film-<film>` sans annulation. Un push qui touche le workflow l'essaie sur un seul short.
- **Temps mesurés** (docs/history.md, `film.yml` commentaire) : **~4 images/s sur 4 vCPU** ; **13 à 20 min par short** (1:30 à 2:00), **~65-70 min un film 7:47**, 29 min pour 4 shorts en parallèle, 7 vidéos en 70 min. Pour un épisode 9:16 de 50 s (1 500 images) : **≈ 6-8 min de rendu** + ~3 min d'installation (npm ci, ffmpeg statique, ffprobe de Remotion) ; 3 styles en parallèle → ≈ 10 min.
- **Pas d'apt** (le miroir Ubuntu a bloqué 40 min à installer ffmpeg) : ffmpeg = build statique d'`imageio-ffmpeg==0.8.1` pip ; ffprobe emprunté à Remotion ; mêmes choix que quran-reels (cohérent avec le brief).
- `validate.yml` (81 l.) : jobs `content` (schémas, `pytest`, `rules.py --all`, `py_compile`, `fetch.py --check`, shellcheck) et `video` (`npm ci`, `npm run data`, `tsc --noEmit`, textes de publication) ; **sur PR et main** (le push d'une branche avec PR tournait deux fois).
- `page-files.yml` (88 l.) : copie des fichiers **validés** d'une release brouillon vers une pré-release **publique** `page-<doc>` (copie atomique : si un fichier nommé manque, rien n'est copié) ; sert la publication automatique de quran-reels. **Pas pour le pilote** (publication hors périmètre), mais c'est le patron pour la suite.
- `render.yml` (400 l.), `promote.yml` (104 l.) : **ancien circuit**, rien.
- **Verdict** : *à extraire et généraliser* : le squelette prepare → matrice → release brouillon ; ≈ 150 lignes utiles sur 584. 1-2 j. **Risque** : dépôt **public requis** pour des minutes Actions gratuites illimitées ; si le nouveau dépôt est privé, 2 000 min/mois seulement (à vérifier). Les releases brouillon ne sont visibles que du propriétaire (OK pour valider depuis un téléphone).

---

## 10. Galerie et « je valide »

- `tools/trial/gallery.py` (610 l.) : écrit un dossier (`build/gallery`) publié en **artefact claude.ai privé** : aperçus allégés (limite **20 Mio** par fichier, **256 Mio** l'artefact ; 243 Mio atteints en novembre), couvertures, textes avec bouton **Copier**, calendrier lu dans `docs/retention/calendar.md`, état « validé » lu depuis les fichiers (jamais marqué à la main).
- **Inscription du « je valide »** : champs dans chaque YAML : `script_validated` (le script) puis `validated: {by, on, what: [voice, montage, publish, …]}` ; `hook.validated` (accroche) ; `tall.validated`, `cut.validated` ; **écrits par la session sur la parole du propriétaire, jamais de son propre chef** (skill `release-render` §9) ; `gallery.py` ne montre « validé » que si `what` couvre voix + montage + textes. Une réplique changée après validation **redevient à valider** ; un « je valide » qui ne nomme pas son objet **se confirme avant toute requête de voix** (incident du 2026-11-11).
- **Verdict** : seulement le patron : deux niveaux de validation (script avant la voix, rendu à la fin) + nouvelle exigence « sources validées avant le rendu » ; une galerie simple (une page HTML statique avec des `<video>` d'aperçu 540p) suffit pour le pilote.
- **Risque** : la taille d'artefact (256 Mio) ; les aperçus longs. 45-60 s en 540p ≈ 3-5 Mio chacun : sans problème pour 3 styles.

---

## 11. `reference/stickman-shorts-analysis.md` et `reference/fb-metaphor-reels-analysis.md`

Matériau directement utile (hypothèses, pas des preuves : chaînes externes, enregistrements d'écran) :
- **STICK TO IT** (19 700 abonnés ; A = 62 s, **2,6 M vues en 9 jours, 86 000 j'aime, 501 commentaires** ; B et C = 19 et 25 s, 2 000 et 1 000 j'aime). **A fait 40 à 80 fois mieux que B/C** : deux personnes et une **relation** (pas une idée abstraite), des **visages** (le sourire en coin fait la chute de chaque moment), de l'**humour**, **5 petits moments du quotidien avec une chute toutes les ~6 s** ; **la même situation rejouée deux fois, une seule chose change** (code couleur gris/blanc dès la première image) ; aucun mot sauf étiquettes et morale d'une ligne ; description qui demande d'**envoyer la vidéo à quelqu'un** ; boucle.
- **Reels « une image, puis le verset »** (24 et 33 s) : une **question sur ce que ressent le spectateur**, lisible en une seconde, **montrée** par un personnage (et non dite sur une carte immobile) ; une métaphore compréhensible **sans le son** (3 à 6 mots par carte, une carte toutes les 2-3 s, 7 s sans texte) ; la récompense arrive une seule fois à la fin ; **appel au partage, pas à l'abonnement** ; boucle (dernière image = première).
- **Pour nous** : calquer la structure (hook en mouvement, scène rejouée avec visages simples, verdict, partage « envoie-la à quelqu'un qui… »), mais **la morale est sourcée** (étude DOI) ; la musique et la « morale sans source » sont leurs points faibles selon notre propre règle.
- **Verdict** : leçons à reprendre ; **ne rien copier** (moments, décors) : la note du dépôt le dit.

---

## 12. `docs/retention.md` : chiffres transposables

(Chaîne arabe, **échantillons minuscules**, 100-700 vues par vidéo ; à citer comme « directions ».)
- Avant le modèle (khidr-01 : 118 vues, 112 non-abonnés) : **26,4 % passent l'accroche de 3 s, 7 % de la durée regardée** (départ à battre).
- **71 % d'un film = du texte sur fond sombre** ; une carte de verset sur fond noir 51 % de rétention locale, une carte de narration 15 %, un hadith/nom 5 %, **un dessin 19,5 %**, une personne dessinée **7 %**, silence de transition 9 % → leçon : **jamais la même image immobile > 6 s ; premier fait en < 5 s ; texte sur fond sombre < 15 % ; silence < 3 % ; une relance toutes les 60-90 s** (budget vérifiable noté dans « Le modèle proposé »).
- **Premières mesures du modèle (2026-11-15)** : sur Facebook et Instagram **on part à 4-8 s** quel que soit le format (5-9 % regardés pour un short de 1:33-1:47 contre 16-39 % pour un reel de 19-36 s) ; **28 % et 14 % passent 3 s sur Instagram contre 38 %** pour un reel court ; **YouTube est l'exception** : le short du garçon y est regardé à **64 % (68 s sur 107)**, le film garde 56 % à 0:30 et 1:48 de visionnage moyen ; TikTok : autant de vues que les reels, moins de j'aime (8-10 % des vues contre 13-28 %) ; **un film posté sur Instagram n'est pas vu (9 vues)**. Conséquence adoptée : **débuts en mouvement compris en une seconde**, versions courtes de 60-75 s pour FB/IG.
- **Pays/langue** : 42,6 % des vues viennent de pays arabes (Algérie 11,6 %, Maroc 8,8 %, Égypte 6,5 %…), 0 % anglophone : **la langue de narration devait être choisie d'après les pays réels** ; pour la nouvelle chaîne il n'existe encore aucune donnée.
- **Voix** : à l'écoute du propriétaire, **la transcription automatique ne mesure pas la qualité d'une voix** (A « très mauvais » transcrit sans faute). Toujours l'oreille.

---

## Ce qui manque complètement pour le nouveau projet

1. **Schéma d'épisode** (zod) : variantes de hook, scènes, répliques par locuteur avec émotion, idée du livre, verdict (badge + justification + études), « à retenir », textes multilingues. Rien d'équivalent n'existe (le modèle trial est un YAML sans schéma).
2. **Vérification de sources par DOI** (Crossref/OpenAlex) avec `--check` en CI, statuts `proposed/verified/validated`, relation étude→affirmation (confirme/nuance/contredit), distinction livre/étude (ISBN). Seul le cadre de registre existe.
3. **TTS multi-locuteurs avec émotion** : aucun code ; à essayer (une requête d'essai, voir plus haut) et à chiffrer en quota (10/jour déjà partagés).
4. **Synchro labiale** : Rhubarb jamais intégré (aucune trace) ; la bouche à 3 niveaux sur un visage à bouche séparée de l'expression n'existe pas. Repli RMS existant (Open Peeps seulement).
5. **Chorégraphie pilotée par données** : un petit langage de scène (`{t, who, action: walk|point|react, to, face, line}`) interprété par un moteur générique, pour que le script JSON décide et que le style ne fasse que dessiner.
6. **Interface de style** qui lit le même JSON (3 styles : cartoon, typographie animée, écran partagé « Livre vs Science ») et place pour tableau blanc, infographie, papier découpé ; badge de verdict (✅/⚠️/❌) et carte d'étude : **aucun composant**.
7. **Multilingue** : tout est arabe (RTL, harakat, police Amiri, `dir="rtl"` partout, `language="ar"` dans Whisper, vocalisation, `PHRASE_CUT` arabe) ; il faut un modèle de textes `{lang: ...}` et des choix de police, de découpage en phrases, de normalisation d'alignement et de voix par langue. Aucun test dans une autre langue que l'arabe et l'anglais (sous-titres Lora).
8. **Anti « inauthentic content »** : variation de style/cadrage/musique/structure entre épisodes ; rien dans le dépôt (la chaîne arabe varie par série avec des dessins faits à la main).
9. **Droit d'auteur du livre** : aucune règle (le dépôt cite des textes du domaine public ou des jugements de recueil) ; à écrire (reformuler, aucune longue citation, pas de couverture).
10. **Dépôt neuf, README, licence** : le dépôt actuel est MIT, Remotion garde la sienne.

## Risques de licence (récapitulatif, à revérifier avant monétisation ; pas un avis juridique)

- **Remotion** : « gratuit pour un particulier » (README/CLAUDE.md). La licence Remotion est **« company license » payante au-delà de 3 employés** selon le brief ; l'usage par un particulier ou une très petite structure reste gratuit, mais **une chaîne monétisée gérée par une société pourrait tomber sous la licence entreprise** : à relire sur remotion.dev/license avant lancement. Non OSI : « open source » du nouveau dépôt devra le dire (le code du dépôt MIT, Remotion sous sa licence propre).
- **react-peeps** MIT, **Open Peeps** CC0 : pas de souci ; mais le style Open Peeps est connu (effet « template »).
- **Polices** : Amiri, Amiri Quran, Lora, Aref Ruqaa : **SIL OFL**, licences copiées dans `video/public/fonts/`. Pour français/anglais choisir d'autres OFL (Inter, Lora…).
- **Clips Pixabay** (`tools/trial/clip.py`) : licence Pixabay (usage commercial permis, **non OSI**, ne pas redistribuer tel quel) ; le filtre exclut ce que Pixabay marque généré par IA, le propriétaire valide chaque clip ; les clips ne sont **jamais commités** (`clip.py` télécharge ; clé `PIXABAY_API_KEY`). Pour des personnages SVG animés, aucun clip n'est nécessaire.
- **Ambiances** : BigSoundBank **CC0** ; **sfx** : générés par code, rien à créditer.
- **Voix** : Gemini (conditions à confirmer pour UE/commercial/publication ; « voix générée par IA » déclarée) ; VoiceTut **NC héritée** ; SILMA Apache 2.0.
- **Whisper large-v3-turbo** (MIT, via faster-whisper MIT) : ok.
- **Rhubarb Lip Sync** : MIT (à confirmer sur le dépôt ; téléchargeable en release : 87 Mo d'après le brief) ; **modèle phonétique anglais d'origine** (CMU/PocketSphinx), qualité faible hors anglais.
