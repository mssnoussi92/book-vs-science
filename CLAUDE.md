# book-vs-science : instructions pour Claude Code

Une chaîne (YouTube, Facebook, Instagram, TikTok) qui prend **une idée d'un livre de développement personnel connu**,
la fait **jouer en scène** par des personnages, puis la **confronte à la recherche scientifique** (badge ✅ ⚖️ ❌ ❓, étude
citée à l'écran). Narration en **arabe égyptien**. Ce n'est pas une chaîne de résumés : une vidéo = une idée.

Le propriétaire est développeur, il échange en français et travaille **depuis son téléphone** (pas de PC) : tout tourne
dans le cloud (sessions Claude, GitHub Actions). Réponds en français ; code, noms de fichiers et commits en anglais.

**Ce fichier reste court** : il dit ce qu'une session doit savoir avant d'agir. Le pourquoi est dans
`docs/conception.md` (la conception par subagents du 2026-11-22, ses 128 objections et leur sort) ; ce qui reste fragile
dans `LIMITES.md`.

## Ses règles de travail (les mêmes que dans ses deux autres dépôts)

- **Le contredire, toujours** : quand une idée (la sienne ou la tienne) est fausse ou plus faible qu'une autre, dis-le
  franchement, avec la raison et ce que tu ferais à la place. Il tranche ; ne suis jamais en silence.
- **Les questions, toujours à choix** (`AskUserQuestion`) : chaque question tient seule, 2 à 4 options, ta
  recommandation en premier marquée « (Recommandé) ». Une validation par un choix vaut sa parole si l'option nomme
  exactement ce qui est validé. Sans l'outil (session planifiée) : la question va dans le rapport, options numérotées.
- **L'amélioration continue** : outils, gabarits, styles, titres évoluent d'après les mesures ; propose ce que tu vois,
  avec les chiffres ; ce qui touche une décision de lui lui est demandé, le reste se fait (PR, checks, fusion).
- **Zéro dépense** : paliers gratuits seulement. La clé Gemini doit vivre dans un projet Google **qui n'a jamais de
  facturation** (sinon chaque requête de voix devient payante, sans alerte). Aucune clé n'est jamais tapée dans la
  conversation : c'est le secret `GEMINI_API_KEY` du dépôt, posé par lui.
- **Clé de voix provisoire** (sa décision, 2026-11-22) : en attendant le compte Google de la chaîne, le secret
  `GEMINI_API_KEY` de ce dépôt est **la même clé que quran-themes-demo**, donc le **même quota** (10 requêtes par jour,
  non garanti) que ses vidéos en production. Tant que c'est le cas : **3 requêtes par jour au plus** pour cette chaîne,
  jamais de casting un jour où quran-themes-demo fait sa voix. Quand il crée la clé du projet `voice` de la chaîne, il
  remplace la valeur du secret ; rien d'autre ne change, et cette règle tombe.
- **Les nombres s'écrivent 123, jamais ١٢٣**, à l'écran, dans les titres et les textes.

## Règles non négociables du contenu

1. **Aucune étude n'existe sans son DOI vérifié** (`bvs sources verify` : Crossref + OpenAlex, titre, premier auteur,
   année ± 1, type, rétractations, avis de correction refusés). Une source non vérifiée **bloque le rendu**. Les champs
   déclarés d'une source sont recopiés de l'endroit où l'affirmation a été trouvée **avant** toute requête.
2. **Une affirmation repose sur une phrase de résultat** du résumé (jamais une phrase de contexte), relue à l'aveugle
   par un autre agent ; un **agent contre-preuve** cherche ce qui contredit le verdict ; le protocole de recherche est
   écrit dans le rapport. Le badge suit `docs/verdict.md`. **Hook ≤ verdict, dénouement ≤ verdict, « à retenir »
   rattaché à une preuve.** Aucun résumé d'éditeur n'est gardé (droits) : seulement son empreinte et la phrase d'appui.
3. **Droit d'auteur** : l'idée du livre est reformulée (« الكتاب بيقول… »), jamais de suite de 8 mots reprise, au plus
   une citation de 12 mots, **aucune couverture**, une idée par épisode ; **plus de 3 épisodes par livre quand il a plus de bonnes idées** (sa décision du 2026-11-22, contre l'avis de la session : risque d'œuvre dérivée), jamais un résumé en série.
4. **Aucune personne réelle** n'est dessinée ni imitée, l'auteur compris ; son nom n'apparaît que sur la carte du livre.
5. **Sujets sensibles** : hommes/femmes, jamais un stéréotype (ni son inverse) présenté comme un fait (taille d'effet et
   recouvrement dits, position contraire au dossier) ; émotions et santé mentale : phrase d'orientation dans la vidéo,
   aucun diagnostic ni traitement.
6. **La voix de synthèse est déclarée** (description, étiquettes IA de chaque plateforme).

## La validation est sa parole, jamais l'IA

- Deux validations par épisode, **avant toute requête de voix** : les **sources** (le dossier et la formulation du
  verdict), puis le **script** (par langue). Elles portent l'empreinte d'une projection de décision : une réplique ou
  une preuve décisive changée les périme d'elle-même ; une revérification sans changement de fond ne périme rien.
- Inscrites par `bvs approve` avec ses mots recopiés, seulement après sa réponse ; un « je valide » qui ne nomme pas son
  objet se confirme avant toute requête de voix.
- Une session ne poste **jamais** de commande de validation (`/valide`) sur un ticket : ses commentaires portent
  `performed_via_github_app = claude` et seront refusés ; ceux qu'il tape portent un champ vide.

## Seul le propriétaire

Les outils GitHub d'une session agissent sous son compte. Une session ne fait donc jamais de son propre chef : poster une
commande de validation ou de publication, pousser sur `main`, supprimer une release, un ticket ou une vidéo.
**Une PR, la session la suit et la fusionne elle-même** quand ses checks sont verts (méthode `merge`) ; `main` a bougé :
fusionner `main` dans la branche, jamais de force push ; checks rouges : corriger, jamais sauter un test. **Sauf une PR qui
porte une décision de lui pas encore donnée** (un script, une source, un verdict, un personnage, un style maison, un
texte de publication) : elle attend son « je valide » par une question à choix qui nomme la PR.

## Décisions validées (2026-11-22)

| Sujet | Choix |
|---|---|
| Langue | arabe égyptien ; textes par langue (`lang/<code>.json`), anglais et français prévus |
| Pilote | « se sentir mal de se sentir mal » (Manson), **67-69 s avec sa voix, gardé ainsi** (son choix, 2026-11-22 ; les épisodes suivants s'écrivent au débit mesuré, 2,1 mots/s), ⚖️ sur deux affirmations : se juger d'être mal aggrave ; accepter vaut mieux que lutter (pas mieux que d'autres bonnes stratégies) ; **sources (387a76) et script (ar-EG 34e847, en 2b69d5) validés le 2026-11-22**, après la relecture du contradicteur : nuance écrite « تقبل الإحساس… مش الموقف », Wang 2020 à l'écran ; **scène réécrite le même jour à sa demande et validée (ar-EG 30285f, en 2ff76a)** : seul, Karim pense ; avec Nour, il parle ; la phrase d'applicabilité écrite sous la carte de l'étude, plus dite (`verdict.applicability: written`) ; **hook retenu : h1** (« ما تفكرش في دب أبيض », le défi), son choix : les quatre autres n'accrochent pas, réécrits et validés (h2 paradoxe, h3 aveu, h4 chiffre, h5 question) ; **montage validé le 2026-11-22** (« Super je valide cette version » : narrateur aux deux charnières de la scène, étiquettes des prises, teintes, bruitages ; 78 s) ; deux autres shorts du même livre en préparation, puis le film du livre (vidéos longues + shorts) (`reports/feeling-bad-about-feeling-bad/challenge.md`) |
| Shorts 2 et 3 | **« trop de choix »** (Nour, ⚖️) : sources e97635 et script (ar-EG 51a5e3, en 8350bd) **validés le 2026-11-22** (h1 « في 3 ثواني » avec compte à rebours, téléphones différents, Nour et la batterie) ; **« argent »** (Karim, ⚖️, toutes les affirmations basses) : sources c1d243 et script (ar-EG 502284, en 1c4e5b) **validés le 2026-11-23**, version compacte de **68 s** (son choix : le livre avec son propre exemple, les études avec Thomson) ; « رقم » une fois, pas de répétition (sa remarque) ; **le public est tout le monde arabe**, pas l'Égypte seule (sa décision : l'égyptien est compris partout ; une comparaison avec les États-Unis plutôt qu'un chiffre en dollars) ; **un hook posé en question peut reposer sur une affirmation de certitude basse** (sa décision, `docs/verdict.md` §5) ; voix des deux : 6 requêtes le lundi 23 (autorisées par lui) ; **vidéos validées le 2026-11-23** (hook h1 : « trop de choix » 60,8 s, fichier 27c8f2 ; « argent » 64,7 s, fichier 9fa404) : les trois shorts du pilote sont faits |
| Idées 4 à 7 | 7 idées pour ce livre (son choix, 2026-11-23) ; **« courir après le bonheur »** (Nour, plage avec les collègues, Karim s'inclut, ⚖️) : sources e085ea et script (ar-EG 0c2f95, en 01ac6a) **validés le 2026-11-26** après sa reprise (le livre avec son exemple, deux études racontées, accroches et fin refaites, aucun mot répété) ; **vidéo validée le 2026-11-27** (hook h1, 67,8 s, fichier ed8377) ; **la mémoire, l'échec, choisis ta difficulté** : dossiers révisés après relecture aveugle et contre-preuve (tous ⚖️, certitude basse) ; **6 requêtes de voix autorisées le samedi 28** (sa parole du 2026-11-27 : « Je t'autorise 6 voix demain »), pour les épisodes validés d'ici là |
| Narrateur | la loupe « عدسة » ; **voix Gemini au pilote, voix humaine avant la première publication** (règle YouTube « AI personas » sur la santé et le bien-être) ; qui la fait : **plus tard** (son choix, 2026-11-23) : rien n'est publié avant |
| Film du livre | **attend 4 à 5 idées** ; **shorts d'abord, film ensuite** (ses choix, 2026-11-23 ; `docs/film.md`) |
| Personnages | Nour et Karim, amis et collègues (ni couple, ni frère et sœur), rig SVG tiré des bonshommes `Stick` de quran-themes-demo ; **apparence des trois validée sur planche le 2026-11-22** (`npx remotion still Sheet-<qui>`), **Nour cheveux attachés** (son choix, pas le hijab) |
| Voix | Gemini 3.8 Flash TTS, **une voix par requête** (une requête par personnage et une pour le narrateur, soit 3 au pilote ; son choix du 2026-11-22 : depuis le 5-6 novembre, Gemini mélange les deux voix d'une requête à deux locuteurs, forum Google sans correctif ; `bvs voice plan`, mode `dialogue` gardé pour quand ce sera réparé), une réplique dite deux fois avec les mêmes mots demandée une fois ; **voix validées à l'oreille le 2026-11-22 : Iapetus (narrateur), Achird (Karim), Leda (Nour)** (`characters/*/character.json`), modèle épinglé, grand livre du quota ; **clé provisoire partagée avec quran-themes-demo** (3 requêtes par jour au plus), clé propre à la chaîne plus tard |
| Styles | 3 au pilote (cartoon, typographie animée, écran partagé) ; **style maison : le cartoon** (son choix, 2026-11-22, après les vidéos du pilote) ; l'écran partagé et la typographie animée restent des essais mesurés |
| Badge | ✅ « صح » · ⚖️ « مش بالظبط » · ❌ « غلط » · ❓ « الأدلة مش كفاية » |
| YouTube | **vidéos longues + shorts**, chaque short relié à sa vidéo longue (« vidéo associée », à la main dans Studio : absent de l'API) ; forme de la vidéo longue décidée après le pilote |
| Licences | code MIT ; registre de sources et rapports CC BY 4.0 ; personnages, scripts, prises, vidéos, nom, logo réservés (`REUSE.toml`) |
| Dépôt | public |
| Rendu | Remotion 4.0.x épinglé (licence propre, gratuite pour lui seul ou une structure de 3 personnes au plus) |

## Où sont les choses

```
packages/schema   zod 4.6.7 (la version de Remotion) : épisode, langue, source, livre, distribution, validation, timeline
packages/core     pur TS : JSON canonique, empreintes, suites bidi, chiffres
packages/rules    une règle = un fichier + son test « copie et casse une chose »
packages/sources  Crossref, OpenAlex, Europe PMC, vérification, rapport
packages/pipeline la CLI `bvs`
packages/rig      squelette, IK, visage, gestes, accessoires (repris de quran-themes-demo : VENDORED.md)
packages/video    Remotion : le shell (badge, cartes, sous-titres, signature) et les compositions
styles/<id>/      un style = un dossier (style.json + index.tsx)
characters/<id>/  un personnage = un dossier
languages/<code>/ débit, polices, lexiques, lettres → visèmes
py/bvs_audio      alignement Whisper, niveau −16 LUFS, synchro labiale, F0, bruitages, planches
content/          books/, sources/, ideas/, episodes/<id>/ (episode.json + lang/*.json)
docs/             conception.md, verdict.md (la grille du badge)
```

## Environnement cloud

- Navigateur pour Remotion : `REMOTION_BROWSER_EXECUTABLE=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
- Rien de lourd en parallèle d'un rendu (4 cœurs) ; un rendu de 50 s prend environ une minute.
- Le pipeline Node n'importe jamais de `.tsx` (Node ne sait pas les charger) : les métadonnées d'un style sont dans `style.json`.
