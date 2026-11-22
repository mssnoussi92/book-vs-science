# Brief commun à tous les subagents (phase de conception)

Date : 2026-11-22. Écris en français (le propriétaire est francophone ; code, chemins et noms en anglais).

## 1. La demande du propriétaire (verbatim, résumé fidèle)

Il lance une **nouvelle chaîne** (YouTube, Facebook, Instagram, TikTok), distincte de « Quran Words Daily » : elle
prend les idées de livres de développement personnel connus (ex. « L'art subtil de s'en foutre » de Mark Manson,
« Les hommes viennent de Mars, les femmes viennent de Vénus » de John Gray) et **les confronte à la recherche
scientifique**. Pas des résumés comme la chaîne arabe « أخضر » : **une vidéo = une idée** qui concerne beaucoup de
monde, **jouée en scène par des personnages**, puis **vérifiée par la science**.

Objectif : un épisode pilote complet + l'architecture qui permettra d'en produire beaucoup, dans des styles de
montage variés, puis d'automatiser plus tard.

**Langue de narration : ARABE ÉGYPTIEN** (choix du propriétaire, 2026-11-22, parmi égyptien / anglais / français /
fusha) : scènes, narrateur et textes à l'écran en égyptien (RTL) ; titres d'études et références scientifiques
souvent en anglais (LTR) à l'écran : prévoir le texte bidirectionnel. L'architecture reste multilingue (le JSON
porte d'autres langues, anglais et français d'abord) sans rien coder de plus pour le pilote.

**Existant à réutiliser, NE PAS MODIFIER** : `/home/user/quran-reels` (pipeline vidéo Python + publication automatique
FB/IG/TikTok/YouTube, en production) et `/home/user/quran-themes-demo` (vidéos animées Remotion, voix de synthèse,
personnages). Ne touche à aucun fichier de ces dépôts (lecture seule). Pour quran-reels : seulement un plan pour
extraire les briques communes en paquets partagés, sans le casser.

**Format d'un épisode court (9:16, 45 à 60 s)** :
1. Hook (0 à 3 s)
2. Scène : les personnages vivent le problème au quotidien
3. Ce que dit le livre : l'idée reformulée, titre et auteur à l'écran
4. Verdict de la science : badge récurrent (✅ confirmé / ⚠️ nuancé / ❌ contredit) et étude citée à l'écran
5. À retenir : une action concrète
Pilote proposé : « se sentir mal de se sentir mal » (accepter ses émotions négatives plutôt que courir après le
bonheur ; Manson, *The Subtle Art of Not Giving a F\*ck*, « the Feedback Loop from Hell »). Si la recherche ne permet
pas un verdict solide : proposer 2 autres idées.

**Architecture attendue** :
- Nouveau dépôt (nom à proposer), prêt à être public (README, licence). Open source et gratuit en priorité.
- Contenu séparé du rendu : un épisode = un fichier JSON validé par un schéma (ex. zod) : variantes de hook, scènes,
  répliques par personnage, idée du livre, verdict + justification, sources (DOI), « à retenir », textes multilingues.
- Un style = un module (Remotion) qui lit ce même JSON. Ajouter un style ne touche jamais aux scripts. Pilote : au
  moins 3 styles : **scène cartoon**, **typographie animée**, **écran partagé « Livre vs Science »**. Place prévue pour
  tableau blanc, infographie, papier découpé.
- Personnages fixes : 2 personnages + 1 narrateur, **SVG articulés** (yeux, bouche, bras) animés dans Remotion,
  réutilisables d'un épisode à l'autre. Pas de génération d'images par IA à chaque épisode.
- Pipeline en étapes indépendantes, idempotentes, en ligne de commande : idée → script → vérification des sources →
  voix → synchro labiale → rendu. Publication hors pilote. Validation humaine après le script et après les sources.

**Limites à traiter explicitement** :
- Sources inventées : vérifier chaque étude par DOI (Crossref ou OpenAlex : titre, auteurs, année concordent).
  Méta-analyses et revues d'abord. Une source non vérifiée bloque le rendu.
- Droit d'auteur : reformuler, aucune longue citation, pas de couverture, pas de résumé chapitre par chapitre.
- Monétisation YouTube (politique « inauthentic content », ex-« repetitious content ») : éviter l'effet template,
  variation entre épisodes (style, cadrage, musique, structure des scènes).
- Voix : dialogues à plusieurs voix, avec émotion. Réutiliser la voix existante si possible, sinon comparer les
  options open source dont la licence autorise un usage monétisé. Tester la langue choisie.
- Synchro labiale : Rhubarb Lip Sync (mode phonétique) sur la langue choisie, repli : bouche pilotée par le volume.
- Aucun personnage ne représente une personne réelle, l'auteur compris.
- Sujets sensibles : nuance sur hommes/femmes, jamais un stéréotype présenté comme un fait.

**Méthode** : conception par 2-3 subagents indépendants → revue contradictoire par angle (technique ; science et
contenu ; plateformes ; open source et coût ; automatisation) → synthèse → présentation au propriétaire, qui valide
avant tout code. Ensuite en production : un subagent écrit script et hooks, un autre les challenge ; pour les
sources, le relecteur revérifie lui-même chaque DOI.

**Livrables après validation** : le dépôt ; le JSON du pilote avec 5 hooks de types différents ; le rapport des
sources vérifiées ; les MP4 du pilote dans les 3 styles ; LIMITES.md.

## 2. Ce que la session sait du propriétaire et de l'environnement (faits vérifiés)

- Il travaille **depuis son téléphone, sans PC** : tout tourne dans le cloud (sessions Claude Code, GitHub Actions).
  Il valide sur sa parole (« je valide »), jamais l'IA ; il veut être contredit franchement quand une idée est faible.
- **Zéro dépense** : paliers gratuits seulement ; « jamais plusieurs projets ou comptes pour multiplier un quota »
  (règle de quran-themes-demo).
- La voix actuelle de quran-themes-demo : **Gemini TTS (Flash, voix `Algieba`), palier gratuit de 10 requêtes/jour**,
  une requête par texte, en arabe égyptien ; secours VoiceTut. Ce quota est déjà utilisé par quran-themes-demo.
  **Décision du propriétaire (2026-11-22)** : la nouvelle chaîne aura **son propre compte Google** (il le crée de toute
  façon pour la chaîne YouTube) → son propre projet et sa propre clé Gemini, donc son propre palier gratuit (10
  requêtes/jour, chiffre à revérifier pour le modèle choisi). Un seul compte pour cette chaîne, jamais utilisé pour
  compléter le quota de quran-themes-demo. Le budget de voix de la nouvelle chaîne est donc ~10 requêtes/jour à elle.
  Les essais Arabic du 2026-11-11 (quran-themes-demo) : Chatterbox Multilingual (MIT) jugé « trop rapide/mécanique »
  et lent sur CPU, Supertonic 3 « très mauvais » à l'oreille du propriétaire.
- **Nouveau dépôt** : le propriétaire autorise sa création ; les outils de la session ne peuvent pas créer un dépôt
  hors de leur périmètre, donc il le créera (vide) sous le nom retenu, puis la session l'attache.
  Le propriétaire est en France (UE) : les conditions du palier gratuit de l'API Gemini pour l'UE et l'usage
  commercial des sorties sont à vérifier, pas à supposer.
- Machine de la session : 4 cœurs, 15 Go de RAM, pas de GPU, ~22 Go de disque libre. Node 22, Python 3, uv, ffmpeg,
  Chromium (Playwright) préinstallés. Un rendu Remotion fait ~4 images/s sur 4 cœurs (mesuré dans quran-themes-demo).
- Réseau de la session : api.crossref.org, api.openalex.org, huggingface.co, npm, PyPI joignables ; github.com hors des
  deux dépôts : API refusée (403) mais les fichiers de release se téléchargent (Rhubarb 1.13.0 Linux : 87 Mo, OK).
- GitHub : la session ne peut écrire que dans les deux dépôts existants ; créer le nouveau dépôt demandera une action
  du propriétaire (ou son accord explicite). GitHub Actions est gratuit pour un dépôt public.
- quran-themes-demo a déjà : silhouettes / bonshommes à visage simple animés (`video/src/trial/Played.tsx`,
  `AyahPlayed.tsx`, `Sahib.tsx`), personnages `react-peeps` de l'ancien circuit (`video/src/characters/`), voix,
  alignement (`tools/audio/align.py`, faster-whisper), ambiances et bruitages (`tools/trial/ambience.py`, `sfx.py`),
  contrôle d'un rendu sur planches d'images (`tools/trial/check.py`), règles sur les fichiers (`tools/trial/rules.py`),
  textes à coller par plateforme (`tools/trial/publish.py`), rendu dans GitHub Actions (workflow `film.yml`).
- quran-reels a déjà : publication Facebook/Instagram (API Graph, vérification des droits Meta avant publication),
  TikTok (brouillon), YouTube (mise en ligne par l'API), état sur une branche `state`, statistiques nocturnes,
  normalisation à −16 LUFS, ffmpeg statique épinglé, workflows lancés par des tâches planifiées Claude (le cron GitHub
  n'est pas fiable sur ce dépôt).

## 3. Fichiers de la conception (scratchpad)

Dossier : `/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/design/`
- `brief.md` (ce fichier), `audit-themes.md`, `audit-reels.md` (audits), `proposal-A.md`, `proposal-B.md`,
  `proposal-C.md` (propositions), `review-<angle>.md` (revues).
