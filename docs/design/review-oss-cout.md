# Revue contradictoire : angle « open source et coût »

Relecteur OSS/coût, 2026-11-22. Lu en entier : `brief.md` (dont §2 : compte Google propre à la chaîne, un seul compte,
jamais pour compléter le quota de quran-themes-demo), `proposal-A.md`, `proposal-B.md`, `proposal-C.md` ; dans les
audits, les sections licences (`audit-themes.md` « Risques de licence », `audit-reels.md` comptes et options).
**Vérifié ce jour sur le texte actuel** (pages officielles, fichiers LICENSE, npm, PyPI, API Hugging Face, en-têtes réels
de Crossref et OpenAlex), pas de mémoire. Ce n'est pas un avis juridique : je dis ce que le texte dit, et « incertain »
quand il ne tranche pas. Dépôts `quran-reels` et `quran-themes-demo` : lus seulement, `git status --short` vide des deux
côtés avant et après.

## Verdict court

1. **Aucun bloquant de licence.** Remotion 4.0.541 reste gratuit pour lui (particulier, ou société de 3 personnes au
   plus, freelances compris), même monétisé et automatisé ; Gemini 3.8 Flash TTS n'interdit pas la publication monétisée
   des sorties ; Rhubarb, faster-whisper et ses poids, zod, les polices proposées sont libres pour cet usage.
2. **Quatre failles majeures, communes ou presque** : (i) **piège de facturation Google** : Gemini devient payant dès
   que son projet Cloud a une facturation active, et B et C mettent Gemini et YouTube dans le même projet ; (ii) **le
   coût de l'abonnement Claude n'est compté par personne** (C écrit même « pas de dépense nouvelle ») ; (iii) **les
   licences du contenu ne protègent pas la monétisation** (A : CC BY sur épisodes et personnages ; B et C : personnages
   écrits en TSX, donc couverts par la licence MIT du code faute d'exception) ; (iv) **les conditions de GitHub Actions**
   (zone grise pour un rendu quotidien de vidéos monétisées), que personne ne cite alors que tout le « 0 € » en dépend.
3. **Propre à C** : résumés d'éditeurs commités dans l'historique public (purge = force push, interdit par ses règles).
   **Propre à A** : un clone monétisé de la chaîne serait légal. **Propre à B** : `mailto` dans l'en-tête sans son accord,
   Flash-Lite en secours sans poser sa règle « multiplier un quota ».
4. Classement sous cet angle : **C > B > A** (§e), C à condition de corriger les résumés et le chiffre « pas de dépense ».

## (a) Objections

Gravité : bloquant = empêche le pilote ou viole une condition ; majeur = coût, perte de droits ou risque réel à corriger
avant le code ; mineur = à corriger en passant. Toutes les pages citées ont été lues le 2026-11-22.

| # | Objection | Prop. | Gravité | Preuve (URL, citation courte) | Correction proposée |
|---|---|---|---|---|---|
| 1 | **Piège de facturation** : Gemini n'est gratuit que sur un projet sans compte de facturation. B (« projet Google Cloud (clé Gemini, YouTube Data + Analytics API…) ») et C (« projet Google Cloud (Gemini TTS, YouTube Data et Analytics) ») les mettent ensemble ; A ne dit pas. Activer un jour la facturation pour YouTube, ou accepter l'essai Cloud à carte, rend chaque requête TTS payante sans alerte. | B, C ; A flou | **majeur** | aistudio.google.com/docs/terms (effet 2026-03-23) : « Your access to Gemini API is a "Paid Service" only when accessing the API through a Cloud Project associated with an active billing account » ; aistudio.google.com/docs/pricing : 3.8 Flash TTS payant 0,50 $/M texte, 9 $/M audio, **doublés au 2027-01-01** | Deux projets dans le compte de la chaîne : `voice` (la seule clé Gemini, **jamais** de facturation, jamais l'essai Cloud) et `platform` (YouTube, OAuth). Règle écrite dans le CLAUDE.md du dépôt ; au casting, capture par le propriétaire de la page des quotas qui montre le palier gratuit. |
| 2 | **Abonnement Claude non chiffré.** Écriture, contradiction, revérification des DOI, relecture des planches : des sessions Opus chaque jour, en plus de quran-reels (planificateur, revue) et de quran-themes-demo. C : « abonnement existant, pas de dépense nouvelle » ; A et B : rien. | A, B, C (C le plus exposé : 1 épisode/jour, tampon de 7, 3 sous-agents) | **majeur** | support.claude.com/en/articles/12429409 : « a session limit that resets every five hours and a weekly limit » ; usage partagé entre claude.ai et Claude Code ; au-delà, blocage ou « Usage credits are charged separately from your paid Claude subscription » | Mesurer au pilote l'usage d'un épisode (avant/après, écran d'usage), l'écrire dans LIMITES.md ; fixer le rythme de production à ce que l'abonnement absorbe **avec** les deux autres dépôts (sa décision : quelle chaîne passe d'abord) ; Sonnet pour code spécifié et recherche mécanique (règle de quran-themes-demo) ; jamais de crédits d'usage sans son mot. |
| 3 | **Contenu en CC BY 4.0** : A met épisodes JSON, dessins SVG des personnages et décors sous CC BY. Le dépôt public contient aussi le code (MIT), les prises de voix et la recette de rendu ; Remotion est gratuit pour tout particulier : n'importe qui peut re-rendre les épisodes, garder Nour, Karim et la loupe, et **monétiser légalement** avec une ligne d'attribution. C : scripts et rapports CC BY (re-rendu possible avec d'autres visages). | A (majeur), C (mineur) | **majeur** (A) | CC BY 4.0 permet l'usage commercial ; remotion LICENSE.md : permission « to use the software non-commercially or commercially » pour tout particulier | Schéma par chemin : code MIT ; registre de sources et rapports (des faits) CC0 ou CC BY ; **scripts, prises, vidéos, personnages, nom, logo : tous droits réservés, ou CC BY-NC-ND 4.0** (question à choix au propriétaire). |
| 4 | **Les personnages sont du code** (`video/src/rig/parts/` A, `characters/<id>/parts.tsx` B, `packages/characters/cast/` C). Sans exception par chemin, la licence MIT racine les couvre : la réserve de C (`BRAND.md`) et le NC-SA de B se contredisent avec le LICENSE du code. | B, C (majeur), A (mineur : ça reste ouvert) | **majeur** | LICENSE MIT : « to deal in the Software without restriction » ; aucune des trois arborescences n'exclut ces fichiers | `REUSE.toml` (spécification REUSE) ou en-tête SPDX `LicenseRef-AllRightsReserved` sur chaque fichier de personnage et de décor ; README : « code open source, sauf personnages, nom et épisodes ». |
| 5 | **NC-SA de B** : (a) des scripts écrits par une IA ont une protection incertaine en droit d'auteur de l'UE (originalité humaine ; incertain, pas vérifié sur un texte) ; (b) une contribution reçue sous NC-SA empêcherait le propriétaire **lui-même** de l'exploiter commercialement sans l'accord du contributeur. | B | mineur | raisonnement, à confirmer | Pas de contributions de contenu, ou accord de cession écrit ; la protection réelle vient des personnages et du nom réservés (n° 4). |
| 6 | **Remotion, ce que personne ne dit** : (a) les freelances comptent dans l'effectif ; or les trois prévoient des « voix humaines » en secours ; (b) Remotion 5.0 annonce « Contractors also count towards team size » et un contrat lié à la licence entreprise ; (c) au-delà de 3, un pipeline **automatisé** relève d'« Automators » (0,01 $/rendu, **minimum 100 $/mois**), pas seulement des 25 $/siège cités par C. | A, B, C | mineur (majeur si l'équipe grandit) | LICENSE.md de `remotion@4.0.541` (tarball npm) et de `main` : « Individuals and small companies are allowed to use Remotion to create videos for free (even commercial) » ; remotion.dev/docs/license/faq : « their headcount aggregates with yours for the 4-person threshold », « If you are eligible for the Free License, you can also run an automation », « Even if you are incorporated, you can operate under the Free License, as long as your total headcount is 3 or less » ; remotion.dev/docs/license/pricing ; github.com/remotion-dev/remotion/pull/3750 | README « Licences » : ce qu'un fork d'une organisation de plus de 3 personnes doit acheter ; Remotion épinglé en 4.x, passage en 5.x seulement après lecture de la nouvelle licence et son « oui » ; tout prestataire (voix, montage) compté. |
| 7 | **Sortie MIT** : A et B n'en ont aucune. C en a une bonne (aucun style n'importe `remotion`), mais son tableau est faux : Revideo à « ~3 000 téléchargements/semaine », Motion Canvas « plus grande ». | A, B (pas de sortie), C (chiffres) | mineur | npm, 2026-11-22 : `@revideo/core` 0.11.0 du 2026-07-10 après 15 mois sans version, **259 919** téléchargements du 15 au 21 nov. ; `@motion-canvas/core` dernière stable 3.17.2 du **2024-12-14**, alpha du 2025-02-16, 12 013/semaine : à l'arrêt ; FAQ Remotion : « source-available software, but it is not open source software » | Retenir la sortie de C : règle ESLint + repli Playwright → PNG → ffmpeg (patron `render/frames.py` de quran-reels, Playwright Apache-2.0) ; ne pas planifier Revideo ni Motion Canvas. |
| 8 | **Résumés d'éditeurs republiés.** C commite les réponses brutes Crossref/OpenAlex (`abstract`, `abstract_inverted_index`) et sa feuille `sources.md` montre « la phrase d'appui surlignée dans le résumé », donc tout le résumé ; A range les réponses brutes OpenAlex/Europe PMC/Semantic Scholar dans une release publique, contre sa propre règle (« le résumé n'est pas commité ») ; A et C disent « métadonnées CC0 ». | C (majeur : historique Git), A (mineur : asset supprimable) ; B correct | **majeur** (C) | crossref.org/documentation/retrieve-metadata : « Almost all of the metadata we hold is reusable without restriction », résumés : « Copyright held by publisher or author » ; OpenAlex sert les résumés en index inversé pour raisons juridiques (sa doc, via recherche) ; mesuré : `works/doi:10.1037/pspp0000157` renvoie l'index (176 mots) | Retirer `abstract` et `abstract_inverted_index` **avant toute écriture** ; garder l'empreinte du résumé et la seule phrase d'appui (courte citation) ; test qui refuse un fichier d'`evidence/` contenant ces clés. |
| 9 | **Citations de tiers placées sous CC BY** : `evidence.quote` de A (≤ 320 caractères, dans l'épisode CC BY), `support.quote` de C (≤ 40 mots, dans le registre CC BY). On ne licencie pas le texte d'un éditeur. | A, C ; B correct (indice + sha256) | mineur | même page Crossref | Exception écrite dans LICENSE-CONTENT (« extraits cités, à leurs titulaires ») ou forme de B. |
| 10 | **Semantic Scholar** en repli de résumé (A) : licence d'API non sous-licenciable, sans redistribution, attribution obligatoire ; données « governed by licenses such as CC BY-NC ». Ses réponses dans une release publique = redistribution. | A | mineur | semanticscholar.org/product/api/license (mise à jour 2023-05-17) | Retirer S2 ; Europe PMC puis lecture humaine. |
| 11 | **OpenAlex** : (a) une lecture par DOI coûte 0 $ même sans clé : A et C n'ont pas besoin de clé pour vérifier ; (b) la recherche coûte 0,001 $ sur un budget sans clé de ~0,10 $/jour **par IP**, partagée sur les runners : le `bvs idea scout` de B échouera ; (c) une clé « free » exige un e-mail vérifié : une donnée du propriétaire, que C prévoit sans le dire. | B (b), C (c) | mineur | help.openalex.org/how-to-use-the-api/rate-limits-and-authentication : clé gratuite, « 10× the keyless budget », coûts singleton 0 / list 0,0001 / search 0,001 ; mesuré : `x-ratelimit-cost-usd: 0` sur `works/doi:` alors que `x-ratelimit-remaining-usd: 0` | Vérification par DOI sans clé ; repérage par Crossref `query` ; clé OpenAlex (adresse de la chaîne) seulement après sa réponse à une question à choix. |
| 12 | **Donnée personnelle dans un en-tête** : B fixe « User-Agent générique avec `mailto` de la chaîne ». Rien ne l'exige. | B ; A et C corrects | mineur | Crossref : « We recommend that you identify yourself by providing an email address » (recommandation) ; mesuré sans e-mail : `x-api-pool: public-single`, 5 requêtes/s, concurrence 1, assez pour 5 à 15 DOI | User-Agent générique sans adresse par défaut ; l'adresse seulement sur son accord. |
| 13 | **Clause EEE de Gemini** : « You may use only Paid Services when making API Clients available to users in the European Economic Area… ». A l'ignore ; B et C la lisent « une app offerte à des tiers » : plausible, pas certain ; le dépôt public est lui-même un client d'API que d'autres lanceront. | A (omise), B, C | mineur (incertain) | aistudio.google.com/docs/terms ; même texte : dans l'EEE, les conditions de données payantes s'appliquent « to all Services, including Google AI Studio and unpaid quota » (donc palier gratuit utilisable en France, données non réutilisées) ; « for professional or business purposes, not for consumer use » ; 18 ans | LIMITES.md le dit ; jamais un service hébergé qui fait parler la clé de la chaîne pour d'autres ; README : « chacun sa clé ». |
| 14 | **Quota** : limites TTS gratuites non publiées et « not guaranteed » (A, B, C le disent). B met `flash-lite-tts` en secours n°1 **sans poser** la question de sa règle ; A la pose. Un compte par chaîne : rien dans les textes lus ne l'interdit tant que le quota ne sert qu'à elle. | B | mineur | aistudio.google.com/docs/rate-limits : « Rate limits are applied per project », aucune ligne TTS gratuite, « Specified rate limits are not guaranteed », remise à zéro « midnight Pacific time » ; developers.google.com/terms §2(d) : « will not attempt to circumvent, such limitations » | Flash-Lite seulement après son « oui » ; un seul grand livre pour les deux modèles ; règle écrite dans les deux CLAUDE.md. |
| 15 | **Prises commitées** (A, B) : mesuré dans quran-themes-demo : 71 prises, 1,35 Mo en moyenne, 92 Mo, `.git` à 144 Mo en ~11 jours. À 2-3 prises par épisode et par langue, 1 épisode/jour : **~1 à 1,5 Go par an**. C les met en releases, mais une seule `takes-2026` dépasserait la limite d'assets (~1 100 prises/an). | A, B (majeur à 1/jour), C (mineur) | mineur → majeur | docs.github.com about-large-files : « ideally less than 1 GB, and less than 5 GB is strongly recommended » ; about-releases : « Up to 1000 release assets may be associated with a single release », « no limit on the total size of a release, nor bandwidth usage » | Prises en releases (une par mois ou par épisode), empreinte commitée : le patron de C, corrigé. |
| 16 | **Public dès le jour 0, sans son choix** : concept, scripts non validés et personnages visibles avant le lancement. Or un pilote privé tient à 0 €. | A (« vide et public »), B, C | mineur (décision) | docs.github.com, facturation Actions : privé sur GitHub Free = 12 $ inclus (Linux 2 cœurs à 0,006 $/min, soit ≈ 2 000 min), 500 Mo d'artefacts, « usage is blocked once you consume the included compute usage » sans moyen de paiement (aucune facture surprise) ; runners : privé 2 CPU / 8 Go, public 4 CPU / 16 Go ; Pages : « If the account … uses GitHub Free …, the repository must be public » | Question à choix : pilote privé (rendus ~2× plus lents, pas de Pages, ~25 tours des 3 styles inclus) puis public au lancement, ou public tout de suite. |
| 17 | **Conditions de GitHub Actions** : sur runners hébergés, pas d'« any other activity unrelated to the production, testing, deployment, or publication of the software project », ni de charge « disproportionate ». Rendre chaque jour les vidéos d'une chaîne monétisée est une zone grise ; aucune ne le dit (les deux dépôts existants non plus). | A, B, C | **majeur** (probabilité faible, impact : fin du « 0 € ») | docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features | LIMITES.md ; un style par épisode en production (A) ; image Docker du rendu prête pour le homelab que cite quran-reels ; pas de release servie comme CDN au-delà du besoin. |
| 18 | **Divulgation IA** : la ligne « voix générée par IA » est gardée (bien) ; personne ne cite l'**AI Act, art. 50** (son exception pour le texte, revue humaine et responsabilité éditoriale, est sa validation : à écrire), ni l'étiquette de Meta qu'une voix off IA réaliste semble demander. | A, B, C | mineur | artificialintelligenceact.eu/article/50 : « …undergone a process of human review or editorial control », application 2026-08-02 d'après le site (reports possibles, à revérifier) ; YouTube answer/14328491 : animation non réaliste sans déclaration, « AI generated music » à déclarer ; Meta, aide 1783222608822690 : exemple « reel narrated with a realistic AI-generated voiceover » (lu par résumé de recherche, page non chargée) | LIMITES.md ; à la publication : étiquette IA de Meta et de TikTok, pas seulement la description ; jamais de musique générée par IA (la musique « par code » de C n'en est pas). |
| 19 | **Secours de voix irréalistes** : Azure F0 (0,5 M caractères/mois, vérifié) exige carte et téléphone, et le compte gratuit doit passer en paiement à l'usage pour durer : contraire au « 0 € ». B garde VoiceTut « pour une animatique » : poids OmniVoice CC-BY-NC, usage interne d'une production monétisée douteux. | A, C (Azure), B (VoiceTut) | mineur | azure.microsoft.com/…/speech-services : « 0.5 million characters free per month » ; offre gratuite Azure (via recherche) : « a phone number, a credit card or a debit card » ; huggingface.co/k2-fsa/OmniVoice : « The pre-trained model is licensed under the CC-BY-NC » | Retirer Azure sauf décision explicite ; retirer VoiceTut ; seul secours libre et commercial : voix humaines (qui comptent alors pour Remotion, n° 6). |
| 20 | **Modèle Whisper déplacé** : `mobiuslabsgmbh/faster-whisper-large-v3-turbo`, repris par les trois via `listen.py`, répond 307 vers `dropbox-dash/faster-whisper-large-v3-turbo` (MIT). | A, B, C | mineur | API Hugging Face, 2026-11-22 | Épingler le nouvel identifiant et sa révision (sha), cache Actions. |
| 21 | **Musique, pour plus tard** : aucune n'emploie l'Audio Library ni Pixabay Music (bien). Le texte officiel de l'Audio Library ne dit rien d'un usage hors YouTube ; la licence Pixabay ne promet rien sur Content ID. | préventif | mineur | support.google.com/youtube/answer/3376882 : « Copyright-safe music … won't be claimed » (sur YouTube) ; pixabay.com/service/license-summary : rien sur Content ID ; bigsoundbank.com/droit.html : CC0 | Règle de C : CC0 avec preuve, ou son généré par code ; jamais l'Audio Library pour Facebook, Instagram, TikTok. |
| 22 | **Contradiction franche, pour information** : la règle « zéro dépense » coûte de la complexité (grand livre de quota, tampon de 7 épisodes de C, voix étalée sur 2-3 jours) pour éviter quelques centimes par épisode. | A, B, C | info | pricing : 9 $/M jetons audio en sortie (18 $ en 2027) ; aistudio.google.com/docs/tokens : « Audio: 32 tokens per second » (dit pour l'audio sans préciser la sortie) → 60 s ≈ 1 920 jetons ≈ 0,017 $ (≈ 0,035 $ en 2027), si la sortie se compte pareil | Garder sa règle ; lui donner ce chiffre une fois, et seulement s'il le faut (quota gratuit réel < 4/jour), en question à choix. |

## (b) Licences vérifiées

| Dépendance | Licence (code / poids / données) | Usage monétisé permis ? | Source (lue le 2026-11-22) |
|---|---|---|---|
| `remotion`, `@remotion/cli`, `renderer`, `bundler`, `compositor-*` 4.0.541 | Remotion License (source-available, non OSI) | Oui : particulier, société ≤ 3 personnes (freelances compris), association ; sinon licence entreprise (Creators 25 $/siège/mois ; Automators min 100 $/mois). Interdit : revendre un dérivé de Remotion. | LICENSE.md du tarball npm 4.0.541 = `main` ; FAQ et pricing remotion.dev ; PR #3750 (5.0) |
| `@remotion/media-utils`, `zod-types`, `layout-utils`, `fonts` | MIT (champ `license` npm) | Oui | npm |
| `react`, `react-dom` 19 | MIT | Oui | npm |
| `typescript` / `yaml` | Apache-2.0 / ISC | Oui | npm |
| `zod` 4.6.7 | MIT | Oui | npm |
| Revideo 0.11.0 / Motion Canvas 3.17.2 | MIT / MIT | Oui (mais maintenance faible, n° 7) | npm (dates, téléchargements) ; github.com/redotvideo/revideo |
| Playwright (Python) 1.65.2 | Apache-2.0 | Oui | PyPI |
| Rhubarb Lip Sync 1.13.0 | MIT ; Boost (BSL-1.0), PocketSphinx et modèle acoustique CMU US English (BSD-2 variante), Flite, libogg (BSD) | Oui ; « the resulting lip sync data belongs to you alone » | raw.githubusercontent.com/DanielSWolf/rhubarb-lip-sync/master/LICENSE.md |
| faster-whisper 1.2.1 / CTranslate2 4.9.1 | MIT / MIT | Oui | PyPI |
| Poids `openai/whisper-large-v3-turbo` ; conversion `dropbox-dash/faster-whisper-large-v3-turbo` | MIT / MIT | Oui | API Hugging Face |
| RapidFuzz 3.14.6, jsonschema 4.26.0 | MIT | Oui | PyPI |
| imageio-ffmpeg 0.8.1 | BSD-2 (le binaire ffmpeg embarqué a sa propre licence, non relue ; non redistribué) | Oui pour produire des vidéos | PyPI |
| **Gemini 3.8 Flash TTS** (et Flash-Lite TTS) | Gemini API Additional Terms (effet 2026-03-23) + Google APIs ToS (2021-11-09) + règles d'usage IA (2024-12-17) | Oui à la lecture : aucune interdiction ; « Google won't claim ownership » ; « professional or business purposes » ; interdits : pratique clinique et conseil médical, contourner les limites, se faire passer pour humain « in order to deceive » | aistudio.google.com/docs/terms ; developers.google.com/terms ; policies.google.com/terms/generative-ai/use-policy |
| Gemini palier gratuit | Gratuit (« Free of charge ») ; non Preview ; « Used to improve our products: Yes » hors EEE ; EEE : règles payantes | Oui | aistudio.google.com/docs/pricing, /rate-limits, /speech-generation (2 locuteurs, égyptien coché) |
| Azure Speech F0 | 0,5 M caractères neuronaux/mois ; conditions produit non relues | Non vérifié ; carte et téléphone exigés | azure.microsoft.com (prix) ; offre gratuite Azure (via recherche) |
| Chatterbox (`ResembleAI/chatterbox`) | poids MIT | Oui (écarté à l'oreille) | API Hugging Face |
| Supertonic 3 | code MIT, poids OpenRAIL-M | Oui sous conditions d'usage (écarté à l'oreille) | carte HF `Supertone/supertonic-3` |
| XTTS-v2 | Coqui Public Model License | Non (non commerciale) | carte HF `coqui/XTTS-v2` |
| MMS-TTS arabe (`facebook/mms-tts-ara`) | CC-BY-NC-4.0 (`mms-tts-arz` : aucune licence sur la carte) | Non | API Hugging Face |
| F5-TTS / Fish Speech 1.5, OpenAudio S1-mini | CC-BY-NC-4.0 / CC-BY-NC-SA-4.0 | Non | API Hugging Face |
| OmniVoice (base de VoiceTut) | code Apache-2.0, poids CC-BY-NC | Non | README `k2-fsa/OmniVoice` |
| Polices Cairo, Tajawal, Readex Pro, El Messiri, Changa, Baloo Bhaijaan 2, Noto Kufi Arabic, Amiri, Inter, Lora | SIL OFL (sous-ensemble arabe pour les 8 premières et Amiri) | Oui pour les vidéos ; ne pas vendre la police seule ; garder OFL.txt | METADATA.pb de github.com/google/fonts |
| BigSoundBank (ambiances) | CC0 1.0 | Oui, sans attribution | bigsoundbank.com/droit.html |
| YouTube Audio Library | par piste ; CC BY : crédit dans la description | Oui sur YouTube ; hors YouTube : le texte officiel ne dit rien | support.google.com/youtube/answer/3376882 |
| Pixabay (vidéo, musique) | Licence Pixabay (non OSI) | Oui, pas d'attribution ; pas de redistribution seule ; aucune promesse Content ID | pixabay.com/service/license-summary |
| Crossref (métadonnées) | faits / CC0, **sauf résumés** (éditeur ou auteur) ; pool public 5 req/s, concurrence 1 | Oui (métadonnées) ; résumés : non redistribuables | crossref.org/documentation/retrieve-metadata ; en-têtes mesurés |
| OpenAlex | lecture par DOI 0 $ ; recherche 0,001 $ ; sans clé ~0,10 $/jour par IP ; clé gratuite (e-mail vérifié) 1 $/jour ; résumés en index inversé ; licence des données non relue ici | Oui pour vérifier ; résumés : ne pas republier | help.openalex.org (limites) ; en-têtes mesurés |
| Semantic Scholar API | licence non exclusive, non sous-licenciable ; données « such as CC BY-NC » ; attribution | Douteux pour la redistribution | semanticscholar.org/product/api/license |
| Europe PMC | joignable (HTTP 200) ; conditions non lues (page 403) | Non vérifié | ebi.ac.uk (requête de test) |
| GitHub Actions / Releases / Pages | public : gratuit, 4 CPU / 16 Go ; privé Free : 12 $ inclus, 2 CPU / 8 Go, 500 Mo d'artefacts ; cache 10 Go ; assets ≤ 2 Gio, ≤ 1 000 par release ; Pages : public sur Free, 1 Go, 100 Go/mois indicatifs, pas pour « run your online business » | Oui, sous les conditions d'usage d'Actions (n° 17) | docs.github.com (facturation, runners, releases, gros fichiers, Pages, conditions) |
| Abonnement Claude | limites par 5 h et par semaine, partagées ; crédits d'usage facturés à part | n/a (coût) | support.claude.com, article 12429409 |
| Code repris de quran-themes-demo et quran-reels | MIT, © 2026 mssnoussi92 | Oui (garder l'avis de copyright dans les copies, `VENDORED.md`) | LICENSE des deux dépôts |

## (c) Détail par proposition

**A (réutilisation maximale)**
- Juste : Remotion dit « source-available, pas open source » au README ; User-Agent sans adresse ; question au propriétaire
  sur Flash-Lite ; Azure noté contraire au « 0 € » ; un seul style par épisode en production (divise par 3 le rendu) ;
  musique absente au pilote ; ambiances CC0.
- Faux ou manquant : **CC BY 4.0 sur épisodes, personnages et décors** (n° 3) : la chaîne serait clonable et monétisable
  légalement, personnages compris ; réponses brutes avec résumés et données Semantic Scholar dans une release publique
  (n° 8, 10), contre sa propre règle ; `evidence.quote` d'éditeurs sous CC BY (n° 9) ; prises commitées (n° 15) ; projet
  Google non séparé (n° 1) ; clause EEE ignorée (n° 13) ; aucune sortie de Remotion (n° 7) ; abonnement Claude non compté
  (n° 2) ; « dépôt vide et public » imposé à l'étape 0 (n° 16).
- Licences marquées « à vérifier » que je confirme : Rhubarb MIT ; runners publics 4 vCPU ; XTTS, MMS, F5 non
  commerciaux (bien écartés).

**B (contrats typés)**
- Juste : **le seul à retirer le résumé** des réponses brutes et à ne garder qu'un indice et une empreinte pour la phrase
  d'appui (n° 8, 9) ; LICENSE de Remotion et de Rhubarb lus à la source ; NC-SA qui ferme la réutilisation commerciale ;
  polices OFL listées (confirmées) ; dit que la clause EEE vise une application, avec « à confirmer ».
- Faux ou manquant : personnages en TSX sous MIT, en contradiction avec le NC-SA annoncé (n° 4) ; NC-SA sans politique de
  contribution (n° 5) ; **`mailto` de la chaîne fixé sans accord** (n° 12) ; Flash-Lite en secours n°1 sans sa règle
  (n° 14) ; VoiceTut gardé pour une animatique (n° 19) ; `idea scout` par recherche OpenAlex, qui échouera sans clé
  (n° 11) ; Gemini et YouTube dans le même projet, écrit noir sur blanc (n° 1) ; prises commitées, multipliées par les
  langues (n° 15) ; aucune sortie de Remotion ; abonnement Claude non compté.

**C (automatisation et variation)**
- Juste : **marque et personnages réservés** (`BRAND.md`) ; **sortie de Remotion réelle** (styles sans `import remotion`,
  repli Chromium → ffmpeg) ; prises et rendus en releases, empreinte au dépôt ; grand livre du quota, jour du Pacifique
  (confirmé) ; aucune voix de repli de plus quand le quota est épuisé ; Edge-TTS écarté ; règle musicale (CC0 avec
  preuve, ou son par code) ; `mailto` seulement « si le propriétaire le veut ».
- Faux ou manquant : **réponses brutes avec résumés commitées dans l'historique public** et résumé entier dans
  `sources.md` (n° 8) : à corriger avant tout code, la purge demanderait un force push ; « métadonnées CC0 » faux pour
  les résumés ; `support.quote` sous CC BY (n° 9) ; **« abonnement existant, pas de dépense nouvelle »** (n° 2) : c'est la
  proposition la plus gourmande en sessions ; personnages réservés mais logés dans du code MIT sans exception (n° 4) ;
  `takes-2026` au-delà de 1 000 assets (n° 15) ; clé OpenAlex qui suppose son e-mail (n° 11) ; Gemini et YouTube dans le
  même projet (n° 1) ; chiffres Revideo / Motion Canvas faux (n° 7) ; « Remotion for Creators 25 $ » alors que son
  pipeline automatisé relèverait d'« Automators », minimum 100 $/mois (n° 6).

## (d) Angles morts communs

1. **Le piège de facturation Google** (n° 1) : le seul chemin par lequel une ligne de code ou un clic fait payer sans
   alerte. Aucune des trois ne l'écrit.
2. **Le vrai coût est l'abonnement Claude** (n° 2), partagé avec deux chaînes en production. Le pilote doit le mesurer
   comme il mesure le quota de voix et le temps de rendu.
3. **Un schéma de licences par chemin** (n° 3, 4, 9) : code MIT ; faits (registre, rapports sans résumé) CC0/CC BY ;
   épisodes, prises, vidéos, personnages, nom : réservés ou CC BY-NC-ND ; extraits de tiers exclus. `REUSE.toml` le rend
   lisible par une machine et vérifiable en CI. À présenter au propriétaire en question à choix.
4. **Les conditions de GitHub Actions** (n° 17) : le « 0 € » des trois dépôts repose sur une lecture favorable ; plan B
   (homelab, image Docker) à garder prêt.
5. **Remotion 5.0 et l'effectif** (n° 6) : ne pas monter de version majeure sans relire ; toute voix humaine payée compte.
6. **Divulgation** (n° 18) : AI Act art. 50 (exception de revue humaine, à documenter), étiquettes de Meta et TikTok.
7. **Monétisation réelle, hors coût mais qui conditionne l'investissement** : le format de 45 à 60 s n'est pas éligible au
   Creator Rewards Program de TikTok, qui exige plus d'une minute d'après des sources secondaires de 2026 (pages TikTok
   non lues) ; YouTube refuse de monétiser « Videos where characters are put in the same situation over and over again
   with the same outcome » (answer/1311392) : des personnages fixes passent si l'issue change (le badge varie, bien),
   pas si chaque épisode rejoue le même schéma.
8. **Un seul point de panne d'identité** : le propriétaire a désormais deux comptes Google qui font du TTS gratuit. Aucun
   texte lu ne l'interdit ; mais une mesure de Google qui relierait les deux comptes toucherait les deux chaînes à la fois
   (risque faible, non documenté). Raison de plus pour ne rien partager entre eux.
9. **Le badge** ✅ ⚠️ ❌ : le dessiner en SVG (comme le disent A et B) et non avec une police d'emoji du système, dont le
   rendu et la licence varient d'un runner à l'autre.

## (e) Classement sous l'angle open source et coût

1. **C** : la seule à protéger la marque, à prévoir une sortie de Remotion qui existe, et à ne pas gonfler le dépôt.
   Deux corrections obligatoires : ne jamais écrire de résumé d'éditeur (n° 8) et compter l'abonnement Claude (n° 2).
2. **B** : la plus propre sur les sources (résumés retirés, phrase d'appui par empreinte) et la plus protectrice du
   contenu (NC-SA), mais sa protection fuit par les personnages en code MIT, et elle fixe seule un e-mail dans les
   en-têtes et un secours Flash-Lite que le propriétaire n'a pas autorisé.
3. **A** : la plus économe en rendu (un style par épisode) et la plus prudente sur les en-têtes, mais sa licence CC BY
   sur les épisodes et les personnages rend la chaîne clonable et monétisable par n'importe qui, et elle republie des
   résumés dans une release publique.

À reprendre dans la synthèse, quelle que soit la proposition retenue : n° 1 (deux projets Google, `voice` sans
facturation), n° 2 (mesure de l'abonnement), n° 3-4 (licences par chemin, question au propriétaire), n° 8 (aucun
résumé écrit), n° 15 (prises en releases mensuelles), n° 16 (pilote privé ou public : question au propriétaire).

## Annexe 1 : questions pour le propriétaire (à poser en questions à choix, recommandation en premier)

1. **Licence des épisodes, des personnages et du nom** (n° 3, 4, 5)
   1. (Recommandé) Code MIT ; registre de sources et rapports CC BY 4.0 ; scripts, prises, vidéos, personnages, nom et
      logo « tous droits réservés » ; fichiers marqués par `REUSE.toml`.
   2. Même chose, mais épisodes et vidéos en CC BY-NC-ND 4.0 (partage sans modification ni usage commercial).
   3. Tout le contenu en CC BY 4.0 (proposition A) : n'importe qui peut monétiser un clone, personnages compris.
2. **Visibilité du dépôt pendant le pilote** (n° 16)
   1. (Recommandé) Privé pendant le pilote (0 € : 12 $ de calcul inclus, usage bloqué au-delà, rendus ~2× plus lents,
      pas de Pages), public au lancement.
   2. Public tout de suite (runners 4 cœurs, Pages, mais concept et personnages visibles avant la chaîne).
3. **Place de la nouvelle chaîne dans l'abonnement Claude** (n° 2)
   1. (Recommandé) Mesurer un épisode au pilote, puis fixer un rythme qui laisse passer d'abord quran-reels et
      quran-themes-demo ; jamais de crédits d'usage.
   2. Même rythme que mesuré, sans priorité entre chaînes.
   3. Accepter des crédits d'usage payants (contraire à sa règle « zéro dépense »).
4. **Adresse e-mail de la chaîne dans les requêtes aux bases scientifiques** (n° 11, 12)
   1. (Recommandé) Non : User-Agent générique, Crossref en pool public, OpenAlex lu par DOI sans clé.
   2. Oui pour une clé OpenAlex gratuite seulement (adresse de la chaîne, pas la sienne).
5. **Flash-Lite TTS en secours sur le même projet** (n° 14)
   1. (Recommandé) Non : quota épuisé = on attend (proposition C) ; c'est l'esprit de sa règle.
   2. Oui, compté dans le même grand livre que Flash TTS.

## Annexe 2 : journal de vérification (2026-11-22, depuis la session)

- `npm view remotion@4.0.541 license` → `SEE LICENSE IN LICENSE.md` ; tarball téléchargé : son LICENSE.md ne diffère de
  celui de `main` que par deux liens (remotion.pro contre remotion.dev) ; dernière version `4.0.545`.
- `npm view` : `@remotion/media-utils`, `@remotion/zod-types`, `@remotion/layout-utils`, `@remotion/fonts` = MIT ;
  `@remotion/cli`, `renderer`, `bundler`, `player`, `compositor-linux-x64-gnu` = licence Remotion.
- api.npmjs.org (15-21 nov.) : `remotion` 4 689 475, `@revideo/core` 259 919, `@motion-canvas/core` 12 013 téléchargements.
- Crossref `GET /works/10.1037/pspp0000157` sans e-mail : `x-api-pool: public-single`, `x-rate-limit-limit: 5`,
  `x-concurrency-limit: 1` ; pas de champ `abstract` pour cet article (d'autres en ont).
- OpenAlex `GET /works/doi:10.1037/pspp0000157` sans clé : HTTP 200, `x-ratelimit-cost-usd: 0`,
  `x-ratelimit-limit-usd: 0.1`, `x-ratelimit-remaining-usd: 0` ; `abstract_inverted_index` présent (176 mots) ;
  `/rate-limit` sans clé : « Authentication required ».
- Hugging Face : `mobiuslabsgmbh/faster-whisper-large-v3-turbo` → 307 vers `dropbox-dash/…` (licence `mit`) ;
  `openai/whisper-large-v3-turbo` `mit` ; licences des modèles TTS lues dans `cardData` et les README.
- github.com/google/fonts `METADATA.pb` : `license: "OFL"` pour les 10 polices ; sous-ensemble `arabic` sauf Inter et Lora.
- quran-themes-demo (lecture) : `content/trial/takes` 71 fichiers, 92 Mo, 1,35 Mo en moyenne ; `.git` 144 Mo ;
  `tools/audio/listen.py` : `MODEL = "mobiuslabsgmbh/faster-whisper-large-v3-turbo"`.
- quran-reels (lecture) : `src/quran_reels/render/frames.py` dessine par Playwright/Chromium (base du repli de C).
- Pages non lisibles : Europe PMC (403), aide de Meta sur l'étiquette IA (corps vide), pages TikTok (non tentées) ;
  ce qui en est dit ici vient de résumés de recherche et le dit.
