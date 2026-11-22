# Revue contradictoire : angle AUTOMATISATION (un épisode par jour, pendant des mois)

Relecteur indépendant, 2026-11-22. Lu en entier : `brief.md`, `proposal-A.md`, `proposal-B.md`, `proposal-C.md` ;
`audit-reels.md` §0, 2.4, 2.5, 2.8 ; `audit-themes.md` §1, 9, 10. Lu en lecture seule dans les deux dépôts :
`CLAUDE.md`, `docs/history.md`, `docs/retention.md`, `docs/calendrier.md`, `.github/workflows/daily.yml`, `film.yml`,
`tools/audio/listen.py`. Vérifié en direct aujourd'hui (détail en bas) : API GitHub des runs de `daily.yml` et
`film.yml`, origine des commentaires (`performed_via_github_app`), en-têtes de limites de Crossref et d'OpenAlex,
disponibilité des résumés de 10 DOI, documentation GitHub (cron, concurrence, releases, `GITHUB_TOKEN`, limites
Actions), OpenAlex (limites et coûts), Gemini (limites, cycle de vie des modèles TTS). Les dépôts sont intacts
(`git status` propre des deux côtés, avant et après).

**Verdict en une phrase** : aucune des trois ne tient « 1 épisode par jour pendant des mois » telle quelle. Le premier
mur n'est pas technique : c'est le temps du propriétaire (20 à 35 min par jour, pas 5) et le **stock d'idées
réellement vérifiables** (quelques mois au rythme d'une par jour). Les murs techniques suivants sont précis et
corrigeables : validations qui se périment toutes seules, stockage qui casse en silence vers le 6ᵉ mois, PR ouvertes par
un workflow qui ne lancent aucun check, quota de voix lu par deux runs en même temps, modèle de voix qui change sous les
personnages. C est la seule qui a été pensée pour ce rythme ; A et B n'ont pas d'orchestration de production du tout.

---

## (a) Tableau des objections

Gravité : **bloquant** (le régime quotidien ne tient pas), **majeur** (casse ou coûte cher en quelques semaines),
**mineur** (gêne, contournable).

| # | Objection | Prop. | Gravité | Preuve | Correction proposée |
|---|---|---|---|---|---|
| 1 | **Temps humain sous-estimé ou absent.** Par épisode : lire le script (~300 mots arabes, 5 hooks) 5-8 min, le dossier de sources (6-8 cartes en anglais) 6-10 min, écouter la voix 3-5 min, regarder le rendu 2-4 min, + une reprise sur ~1 épisode sur 3. Soit **20-35 min/jour**, chaque jour, sur téléphone, en plus de Quran Words Daily. C écrit « ~5 min par épisode, en lot » ; A et B ne chiffrent rien. | A B C | **bloquant** | C §8.5 tableau « Propriétaire ~5 min » ; brief §2 (téléphone seul) ; CLAUDE.md quran-reels : revue du dimanche, captures TikTok, brouillons TikTok publiés à la main chaque jour | Cadence de lancement **3 épisodes/semaine** ; 1/jour seulement après 4 semaines mesurées sous 20 min/jour (temps noté à chaque porte dans l'état) ; une seule page par épisode qui porte script + sources + aperçu, deux décisions dessus |
| 2 | **Validation par lot du dimanche (C)** : 7 scripts + 7 dossiers ≈ 2 à 3 h d'un coup, le même matin que la revue automatique de 09:23. Un dimanche manqué vide le tampon de 7 → **7 jours sans épisode**. | C | majeur | C §8.3 point 3, §16.7 ; CLAUDE.md quran-reels (skill `weekly-review`, dimanche 09:23) | Deux lots courts (mercredi, dimanche, 3-4 épisodes chacun) ; tampon cible = 2 × intervalle des lots + latence machine (§19) ≈ **10-12** ; alerte à 8, pas à 7 |
| 3 | **Personne ne lance la production chaque jour (A, B).** Pas de file, pas d'état machine, pas de déclencheur : écriture, voix, alignement, rendu supposent qu'une session y pense chaque jour. | A B | **bloquant** | A §8, §14 (« planification : le cron GitHub suffit ») ; B §8, §14 ; rien de comparable à `advance`/`status` | Reprendre la file de C (`queue`, statut calculé, `advance`), corrigée par #6, #15, #19 |
| 4 | **L'écriture des scripts exige une session Claude** (l'API coûte : contraire à zéro dépense). Une tâche planifiée qui crée une session neuve n'avait pas accès au dépôt ; les tâches d'une même session passent **l'une après l'autre** : si l'atelier de la chaîne partage la session « planificateur », un tour d'écriture de 30-60 min retarde la publication de 07:12 de Quran Words Daily. Une session persistante grossit (compactage, règles oubliées). Personne ne chiffre les jetons. | A B C | majeur | `docs/calendrier.md` quran-reels l. 94-100 (essai du 2026-11-05) ; CLAUDE.md quran-reels (« les tâches d'une même session passent l'une après l'autre ») ; C §8.5 (« tâche planifiée Claude seulement pour les étapes d'écriture ») sans dire laquelle | Une **session « atelier » dédiée** au nouveau dépôt, jamais celle du planificateur ; une tâche par jour hors 06-09 h Pacifique ; renouvelée chaque semaine (nouvelle session, tâche re-ciblée) ; jetons mesurés sur 5 épisodes avant de fixer la cadence (#27) |
| 5 | **Une validation n'a aucune preuve d'origine.** Les outils d'une session agissent sous le compte du propriétaire ; `gate.yml` (C) ne vérifie que l'auteur ; A et B s'en remettent au `CLAUDE.md`. **Or la preuve existe** : un commentaire posté par une session porte `performed_via_github_app.slug = "claude"`, ceux tapés par lui depuis son téléphone portent `null`. Aucun garde-fou des deux dépôts ne s'en sert. | A B C | majeur | API GitHub, lue aujourd'hui : PR #115 de quran-reels (session) → `claude` ; ticket #39, `/apercu` et `/publier` du propriétaire (2026-11-06 13:29 et 13:48) → `null`, commentaire de session du même ticket (15:58) → `claude` ; `grep performed_via` vide dans les deux dépôts | La validation **est** un commentaire `/valide script <empreinte>` du propriétaire sur le ticket de l'épisode ; le statut ne l'accepte que si `user.login` = propriétaire **et** `performed_via_github_app` est nul **et** l'empreinte est la courante ; l'URL du commentaire est la preuve. La question à choix reste pour la conversation, mais ne fait plus foi seule |
| 6 | **`gate.yml` de C ouvre une PR avec `GITHUB_TOKEN`** : sur un dépôt personnel neuf, les workflows **ne peuvent pas** créer de PR (réglage désactivé par défaut) et `GITHUB_TOKEN` est en lecture seule ; même autorisée, une PR ouverte par `GITHUB_TOKEN` **ne lance aucun workflow** (pas de `validate.yml`) → règle de fusion « aucun check en 10 min : ne pas fusionner » → la validation reste bloquée hors de `main`, `advance` ne la voit jamais. | C | **bloquant** (pour le chemin « sans session ») | docs GitHub : « workflows are not allowed to create or approve pull requests » (dépôt personnel neuf) ; « other `GITHUB_TOKEN`-triggered events do not create workflow runs » ; CLAUDE.md quran-reels, règle de fusion point 1 | Ne rien écrire sur `main` : `status` lit les commentaires de validation par l'API (#5) et les met en cache sur `state` ; `main` ne garde que le contenu |
| 7 | **Les validations se périment toutes seules.** L'empreinte validée inclut des données de vérification volatiles : date et empreinte des réponses brutes (A : `verification.on`, `rawSha256` dans la fiche ; B : `.verify.json` ; C : `report.json` + rapport refait à 30 jours + `nightly.yml`). Crossref change ses réponses sans cesse (`indexed`, compteur de citations). Une source partagée par 10 épisodes revérifiée pour l'un **annule la validation des 10**, et le relecteur « `--fresh` » de A annule P2 de l'épisode qu'il vérifie. | A B C | majeur | A §3 (`sources_validated` = claims + fiches + vérification), §9 (`--fresh`, `sources-recheck` hebdo) ; B §3.4 ; C §3.2 et §8.4 (« plus vieux que 30 jours : refait ») | Empreinte d'une **projection de décision** : statut, titre/auteurs/année/type retenus, drapeaux rétractation/correction. Une revérification qui ne change pas cette projection ne touche pas la validation ; une qui la change l'annule **et** ouvre une alerte |
| 8 | **Prises de voix commitées dans Git (A, B)** : ~1,3 Mo par prise (mesuré), 2-3 prises/jour → **0,7-1,4 Go/an** ; `checkout` en profondeur 1 télécharge quand même tout l'arbre courant à chaque job ; Git LFS gratuit ne suffit pas. Le commit lui-même doit être fait par une session (le workflow ne pousse pas sur `main`) : une tâche manuelle de plus par jour. | A B | majeur | quran-themes-demo : `content/trial/takes` = 71 FLAC, **92 Mo** en 11 jours, `.git` 144 Mio ; A §2 `content/takes/`, B §8.2 | Prises en releases adressées par empreinte, index sur `state` (C), avec #9 |
| 9 | **Une release `takes-2026` unique (C) casse vers le 6ᵉ-11ᵉ mois** : une release porte **au plus 1 000 fichiers**. FLAC seul à ~3/jour : plafond vers le jour 330 ; FLAC + MP3 d'écoute : vers le jour 165. L'échec arrivera à l'envoi, en pleine production. | C | majeur | docs GitHub releases : « Up to 1000 release assets may be associated with a single release », fichiers < 2 Gio, taille totale libre ; C §2 (`takes-2026`) | Une release par mois (`takes-2026-11`) ; test qui échoue au-delà de 900 fichiers ; MP3 d'écoute dans la release de l'épisode, pas dans celle des prises |
| 10 | **Prolifération des releases et aucun nettoyage** : A `<ep>-candidate` + `sources-<ep>` ; B `voice-<id>` + `<id>-candidate` + `sources-<id>` ; C `ep-<id>` → 365 à 1 100 releases/an. Dans les deux dépôts du propriétaire, **supprimer une release est réservé au propriétaire** : recopiée, la règle rend tout nettoyage automatique impossible. | A B C | mineur | CLAUDE.md quran-reels l. 93 (« supprimer un reel, un ticket, une release ») ; release orpheline restée à supprimer à la main (history.md qtd l. 264) | Une décision écrite une fois par lui : un workflow `prune` supprime les brouillons 30 jours après la publication (comme les aperçus de quran-reels) ; preuves de sources en release mensuelle |
| 11 | **Registre de variation sur `main` (A `ledger.json`, B `ledger.jsonl`) écrit « au rendu final »** : un workflow ne pousse pas sur `main` (règle du propriétaire, `GITHUB_TOKEN` en lecture par défaut, PR sans checks : #6) ; deux branches qui ajoutent une ligne en fin du même fichier **se contredisent à chaque fusion**. | A B | majeur | A §11 (« ajoutés à `ledger.json` au moment du rendu final (commit) ») ; B §11 (`ledger.jsonl` à chaque rendu final) ; CLAUDE.md quran-reels (« pousser sur main : tout passe par une PR ») | Registre sur `state`, écrit par `save-state.sh` (C) |
| 12 | **La variation se calcule dans l'ordre des rendus, pas des publications** ; avec un tampon, un épisode refusé ou déplacé met deux fois de suite le même style. Pire : les axes de **structure** sont dans le script validé (A `scene.structure` « rejetée par `vary` si répétée » ; C `Scene.shape` listée comme axe) → le rejet arrive **après** la validation → réécriture → revalidation. B tire avec la « tête du ledger » : relancer un tirage après d'autres rendus donne un autre résultat. | A B C | majeur | A §11 ; B §11 (`mulberry32(sha256(id + tête du ledger))`) ; C §3.1 `SceneShape`, §11.1 | Axes de structure contrôlés **à l'idée**, contre la case de calendrier prévue ; axes de surface tirés au rendu ; au placement, un contrôle sur la **séquence publiée** échange l'ordre plutôt que de re-rendre |
| 13 | **Le stock d'idées s'épuise en quelques mois.** Plafond par livre (A : 3 au total ; B : 3, refus à 5 ; C : 3 par 30 jours) → 1/jour exige ≥ 120 livres/an ; les livres de développement personnel connus du public arabe sont quelques dizaines ; les idées testables avec une méta-analyse, de l'ordre de 60-120 (estimation, à vérifier par un inventaire). Les idées de livres différents tombent sur les mêmes méta-analyses (habitudes → Lally ; émotions → Aldao) et la plupart finiront ⚠️ : la **répétition du fond** est le vrai « gabarit », que le moteur de variation ne voit pas. | A B C | **bloquant** (au-delà de 3-6 mois à 1/jour) | A §10 (≤ 3 épisodes par livre), B §10, C §10 ; C §3.2 (« ✅ ou ❌ avec `low` refusé ») ; politique YouTube citée par A §11 | Inventaire avant lancement : ≥ 60 idées « sondées » (DOI de méta-analyse vérifié) ; mesures suivies : profondeur du stock, DOI distincts par 30 épisodes, part de ⚠️ ; élargir la source des idées (affirmations virales, proverbes) si le stock baisse |
| 14 | **Quota de voix : moyenne tenable, variance non** : 10 req/jour **non publié** pour les TTS, « not guaranteed », compteur non strict (passé à 04:40 « épuisé », refusé à d'autres moments), ~3 req/min, 10 000 jetons d'entrée/min. Un épisode raté (3-4 reprises), un casting ou un re-casting font dépasser. A et B n'ont aucun registre de quota d'un jour à l'autre. | A B (C mieux) | mineur | docs Gemini : « Rate limits are applied per project », « not guaranteed and actual capacity may vary », RPD remis à minuit (Pacifique) ; `docs/retention.md` qtd l. 285-291, 456-459 ; history.md qtd l. 605 (quota du 17 épuisé), l. 664 | Registre de C (inscrit **avant** l'envoi), plafond quotidien 7, réserve 3 ; le tampon absorbe les jours perdus |
| 15 | **Course sur le quota (C)** : `concurrency: kk-<étape>-<id>` = un groupe **par épisode** → deux voix d'épisodes différents tournent en même temps, lisent le même registre (6 utilisées), décident chacune « 3 de plus, ça passe » → 12 ; ou l'une échoue au push **après** avoir envoyé. | C | majeur | C §8.5 (« `concurrency: group: kk-<étape>-<id>` ») et §6.2 (registre sur `state`) | Un groupe **unique** `voice` avec `queue: max` (jusqu'à 100 en attente, docs GitHub) et sans annulation |
| 16 | **Le modèle de voix change sous les personnages.** En un an : 2.5 preview → 3.1 preview (« legacy ») → 3.8 (« New ») ; « l'accès aux modèles 2.5 est limité aux utilisateurs existants » (un projet neuf n'a déjà plus de repli) ; preview retiré avec 2 semaines de préavis ; des modèles texte 2.5 seront **redirigés** vers d'autres le 2026-12-01. Nour et Karim changeront de timbre ; une reprise après migration mélange deux modèles dans un épisode. | A B C | majeur | page des modèles Gemini lue aujourd'hui (citations ci-dessus) | Modèle épinglé dans l'empreinte et le casting ; un extrait de référence par personnage ; contrôle de dérive à chaque prise (F0 + distance d'empreinte vocale à la référence) ; changement de modèle = **re-casting**, décision du propriétaire, jamais deux modèles dans un même épisode (toutes les requêtes refaites) |
| 17 | **Défauts silencieux d'une prise à deux voix** (locuteurs inversés, réplique sautée ou inventée) : seul C a un contrôle par réplique (F0 dans la plage du personnage) ; A et B n'ont que `heard ≥ 0,6`, qui ne voit pas une inversion. | A B | mineur | A §6, B §6.2, C §6.1 (`pitch.py`) | Le contrôle F0 de C + bornes de durée par réplique dans les trois |
| 18 | **Cron GitHub : ni ponctuel, ni témoin indépendant.** `daily.yml` (`17 5,6,7 * * *` UTC) tourne encore, du 16 au 21 novembre, à **13:29-14:28 et 22:11-00:48 UTC** : 7 à 9 h de retard, 2 passages sur 3. La doc : des runs « may be dropped » ; en dépôt public, les crons sont **désactivés après 60 jours sans activité**. C fait du cron nocturne le moteur **et** le témoin (« jamais tenté » vu par `advance` lui-même) : s'il se tait, personne ne le voit. | C (A B : « le cron suffit ») | majeur | API GitHub, runs `schedule` de daily.yml lus aujourd'hui ; `daily.yml` l. 9-12 ; docs GitHub `schedule` ; C §8.5 | Deux déclencheurs indépendants (cron à une minute impaire + tâche planifiée de la session atelier) ; `board.html` affiche « dernier `advance` il y a N h » ; tout run (même la vérif de PR) ouvre l'alerte si le dernier `advance` a plus de 36 h |
| 19 | **« `advance` fait l'étape machine suivante » (C)** : lu à la lettre, une étape par nuit → sources, voix, alignement, synchro, variation, minutage, rendu, contrôle = **6-8 nuits** par épisode, davantage avec les crons perdus ; le tampon de 7 ne couvre alors pas la latence. | C | majeur | C §1 point 9, §8.5 | Un run va jusqu'à la porte suivante (jobs enchaînés dans un même workflow, budgets voix et minutes) ; latence cible < 24 h après validation |
| 20 | **Rétractation ou démenti après publication** : A le voit chaque semaine, C chaque nuit, **B jamais** ; aucun ne dit **quoi faire** (le jeton d'envoi YouTube de quran-reels ne peut ni modifier ni supprimer) ; Crossref ne signale que les avis formels : une nouvelle méta-analyse contraire (le cas courant en psychologie) n'est vue par personne. | A B C | majeur | A §9 (`sources-recheck.yml`), C §9.2 (`nightly.yml`), B §9 (rien) ; CLAUDE.md quran-reels (`YOUTUBE_UPLOAD_REFRESH_TOKEN` : « ni modifier ni supprimer ») | Ticket assigné + @mention, **question à choix** préparée (commentaire épinglé, description corrigée, vidéo retirée, épisode refait) ; chaque trimestre, recherche OpenAlex des revues récentes qui citent les sources des épisodes publiés |
| 21 | **OpenAlex : la vérification passe sans clé, la recherche non.** Ici, budget sans clé **0 sur 0,10 $** à 10:25 UTC, mais une lecture par DOI coûte 0 $ et répond 200. La recherche (`idea scout` de B, sondage d'idées de C) coûte 0,001 $ : il faut la clé gratuite (1 $/jour, e-mail vérifié, compte neuf limité à 0,10 $ par 5 min depuis le 2026-11-03). La politique a déjà changé en 2026 (« until 27 June 2026, 100 requests per second ») : elle changera encore. | B C (A : idée à la main) | mineur | en-têtes `x-ratelimit-limit-usd: 0.1`, `remaining-usd: 0`, `cost-usd: 0` lus aujourd'hui ; help.openalex.org (rate limits) | Vérification : DOI seulement (gratuit), Crossref en premier ; clé OpenAlex en secret (adresse de la chaîne, jamais celle du propriétaire) pour le sondage ; tests qui simulent un 429 |
| 22 | **Les méta-analyses sont souvent sans résumé** : sur 10 DOI des propositions, 8 ont un résumé chez OpenAlex ou Crossref ; les 2 sans résumé sont **les deux méta-analyses Elsevier du pilote** (Aldao 2010, Abramowitz 2001), Europe PMC en a un des deux. Alors « besoin d'un humain » (C bloque) : le propriétaire ne lira pas un article payant sur son téléphone → blocage ou validation de complaisance. | A B C | majeur | requêtes OpenAlex, Crossref, Europe PMC faites aujourd'hui (liste en bas) ; C §9.1 point 9 ; B §9.1 point 8 (OpenAlex seul) | Chaîne de résumés : OpenAlex → Crossref → Europe PMC (B ne l'a pas) → copie libre (`best_oa_location`) lue par le relecteur ; une source dont personne ne peut lire le passage ne porte pas le verdict ; jamais « au propriétaire de lire le texte intégral » |
| 23 | **Ce que personne ne regarde.** C retire la porte « vidéo » après 10 épisodes ; les planches « que la session ouvre et lit » n'ont pas de session dans un run de nuit. Passent alors : bouche décalée, sous-titre qui ne suit pas la prononciation égyptienne, titre anglais d'étude mal ordonné dans une ligne arabe, voix qui a dérivé. | C (A B : session supposée présente) | majeur | C §8.4, §12.3, §16.6 | Garder un coup d'œil de 30 s sur l'aperçu 540p dans la page du lot ; contrôle de planche par la session atelier chaque jour (une image, ~2 k jetons) ; contrôle machine du sens du texte (`bidi`) sur les images fixes |
| 24 | **Rendus qui échouent** : `film.yml` de quran-themes-demo, 100 derniers runs : 95 réussis, 3 échecs, 2 annulés → à 1/jour, 1 à 2 par mois ; la reprise y est manuelle (« Re-run failed jobs »). | A B C | mineur | API GitHub, runs de `film.yml` lus aujourd'hui ; `film.yml` l. 25 | `advance` relance une fois un rendu échoué, puis alerte |
| 25 | **Cache Actions qui tourne en rond** : modèle Whisper large-v3-turbo (~1,6 Go, dépôt tiers non épinglé), `node_modules` Remotion, Rhubarb ; avec des clés à `run_id` (patron quran-reels), chaque run enregistre plusieurs Go → 10 Go/dépôt vite pleins → le modèle est évincé et retéléchargé. | A B C | mineur | docs GitHub (10 Go par dépôt) ; `listen.py` l. 54 (`mobiuslabsgmbh/faster-whisper-large-v3-turbo`, sans révision) ; audit-reels §2.5 | Caches immuables à clé de contenu (`modèle@révision`, `rhubarb@sha`), sauvés seulement s'ils manquent ; copie du modèle (MIT) dans une release |
| 26 | **Alertes : presque rien n'est surveillé.** A : rétractation seulement ; B : rien ; C : tampon < 7 et rétractation. Silencieux : tâche planifiée suspendue (abonnement en pause), atelier qui n'écrit plus, quota épuisé 3 jours de suite, dérive de voix, rendu en échec répété, Crossref en panne, PR qui attend sa validation depuis 48 h. | A B C | majeur | patron quran-reels : ticket assigné + @mention = notification sur le téléphone (`docs/calendrier.md`) ; outil de tâches planifiées : `suspension_reason` (`subscription_paused`) | Un ticket « ⚠️ Atelier » unique, ouvert/commenté par n'importe quel run selon une liste de conditions testées, assigné et @mentionné ; fermé seul quand tout est vert |
| 27 | **Jetons de session non estimés** : écrivain + contradicteur + relecteur qui revérifie chaque DOI + contrôle des planches ≈ **0,35-0,6 M jetons traités par jour** (estimation, surtout en cache), sur l'abonnement qu'utilisent déjà quran-themes-demo et le planificateur. Une réponse brute de Crossref (références comprises) pèse 10-30 k jetons si on la lit telle quelle. | A B C | majeur (non vérifiable ici) | C §8.5 (« abonnement existant, pas de dépense nouvelle ») ; A, B : rien | Mesurer sur 5 épisodes ; les sous-agents lisent des sorties de `bvs` résumées, jamais du JSON brut ; Sonnet pour le mécanique ; `CLAUDE.md` court (règle de quran-themes-demo) |
| 28 | **B valide le script avant les sources** : si la vérification renverse le verdict, le script validé est à réécrire et à revalider ; à 1/jour, une validation sur 5 ou 6 perdue (estimation). B a aussi **4 portes par épisode** (script, sources, voix, rendu). | B | majeur | B §15 (étapes 3-4 puis 5-6), §8.3 | Sources d'abord (A, C) ; voix et rendu jugés ensemble, sur l'aperçu |
| 29 | **Page de relecture en artefact claude.ai (A)** : republiée chaque jour par une session, limite de 256 Mio déjà touchée par la page de quran-themes-demo (243 Mio). | A | mineur | history.md qtd l. 264, 884 ; A §8 (P1) | Page statique sur Pages (le `board.html` de C), aperçus en release |
| 30 | **Preuves brutes datées commitées (C)** : `evidence/<doi>/crossref-<date>.json.gz` + revérification nocturne de tout le registre : si chaque passage écrit un fichier daté, ~500 DOI × 365 nuits × 10-20 Ko ≈ 2-4 Go/an dans Git. | C | majeur (si appliqué à la lettre) | C §9.2 | Ne commiter que quand la projection de décision change (#7) ; réponses brutes en release mensuelle |
| 31 | **La leçon « un seul run en attente par groupe » est datée** : GitHub propose `queue: max` (jusqu'à 100 en attente). Les trois propositions recopient le contournement de quran-reels sans l'option qui le règle. | A B C | mineur | docs GitHub « control workflow concurrency » (`queue: max`, incompatible avec `cancel-in-progress: true`) | `queue: max` pour la voix (#15), la publication et `advance` |

---

## (b) Détail par proposition

### Proposition A (réutilisation maximale, pilote rapide)

**Ce qui tient** : sources cherchées avant le script et les deux portes avant la voix (A §8 : « un verdict changé après
la voix coûte des requêtes ») ; empreinte de validation ; planificateur de voix qui refuse avant d'envoyer ;
revérification hebdomadaire des sources avec ticket ; Europe PMC et Semantic Scholar dans la chaîne des résumés.

**Ce qui casse à 1/jour** :
- **Aucune production** : pas de file, pas d'état machine, pas de déclencheur (#3). Tout suppose une session qui pense à
  faire chaque étape chaque jour, et le §14 renvoie la planification au « cron GitHub qui suffit » (#18).
- **Trois portes par épisode** (P1 script, P2 sources, P3 vidéos) dans la conversation : 20-30 min par jour ; trois jours
  sans réponse = trois jours sans épisode, rien en réserve (#1).
- **Prises dans `content/takes/`** commitées par une session après chaque `voice.yml` (#8) ; **`ledger.json` sur `main`**
  écrit « au rendu final » par qui ? (#11).
- **Le relecteur lance `bvs sources verify --fresh`** et réécrit `verification.on` dans la fiche qui entre dans
  l'empreinte de P2 : sa propre vérification invalide la validation qu'il prépare (#7).
- Release `sources-<ep>` par épisode + `<ep>-candidate` : 730 releases/an sans nettoyage (#10) ; page de relecture en
  artefact (#29).
- `scene.structure` rejetée par `vary` **après** P1 (#12).

### Proposition B (contrats typés, dossiers)

**Ce qui tient** : empreinte par étape avec versions d'outils (`runner.ts`), `MouthTrack` unique, contrat TS/Python
testé, détecteur dHash de ressemblance (une vraie mesure, à calibrer), aveu honnête que l'empreinte ne prouve pas que
c'est lui.

**Ce qui casse à 1/jour** :
- **Le pire bilan humain** : quatre portes par épisode, dont la voix seule (#28), et le script validé **avant** les
  sources (#28) : chaque renversement de verdict coûte une validation de plus.
- **Aucune revérification après publication** (#20), aucune alerte (#26), aucune orchestration (#3).
- `idea scout` repose sur la **recherche** OpenAlex, payante à l'unité et sans budget sans clé ici (#21) ; résumés
  d'OpenAlex seulement, sans Europe PMC : les méta-analyses Elsevier passent toutes en `review` (#22).
- Prises dans `content/episodes/<id>/takes/` « release `voice-<id>` puis commit » (#8) ; `ledger.jsonl` sur `main` (#11) ;
  tirage lié à la « tête du ledger » : non reproductible si l'ordre des rendus change (#12).
- `.verify.json` dans l'empreinte de `sources_validated` (#7).

### Proposition C (automatisation et variation d'abord)

**Ce qui tient, et qu'il faut garder** : la seule à viser le régime quotidien ; statut **calculé** (jamais écrit) ;
`main` = l'humain, `state` = la machine ; prises et rendus en releases adressées par empreinte ; registre du quota
inscrit **avant** l'envoi ; tampon d'épisodes prêts avec alerte ; contrôle F0 des prises à deux voix ; revérification
nocturne des sources publiées ; mode « mimé » comme repli de voix ; aveu du goulot humain (§16.7).

**Ce qui casse** :
- **Le chemin « sans session »** de la validation ne marche pas tel qu'écrit (#6) et ne prouve pas l'origine (#5).
- **Validations annulées par la machine** : rapport refait à 30 jours et nuitamment, inclus dans l'empreinte (#7) ;
  à 7-12 épisodes en tampon, un passage de `nightly.yml` peut renvoyer tout le lot à la revalidation.
- **Stockage** : release unique `takes-2026` (#9) ; preuves datées commitées chaque nuit (#30).
- **Voix** : un groupe de concurrence par épisode autour d'un quota global (#15).
- **Latence** : « l'étape suivante » par nuit (#19) ; cron comme moteur et comme témoin (#18).
- **Regard** : porte vidéo retirée après 10 épisodes, planches sans lecteur (#23).
- **Chiffres** : « ~5 min par épisode » (#1) ; lot du dimanche de 2-3 h (#2).
- `SceneShape` est un champ du script mais un axe de variation (#12).

---

## (c) Angles morts communs aux trois

1. **La cadence elle-même.** Aucune ne remet en cause « 1 par jour ». Les trois contraintes qui la fixent ne sont pas
   techniques : temps du propriétaire (#1), idées vérifiables (#13), et règle de YouTube qui juge le **fond**
   répétitif plus que la palette (#13). Ma recommandation : **3 par semaine** au lancement, avec un critère chiffré pour
   passer à 1/jour (stock ≥ 60 idées sondées, 4 semaines sous 20 min/jour, moins de 1 reprise de voix sur 3).
2. **Les validations sont une donnée de production, pas une formalité.** Il faut : la preuve d'origine (#5), une
   empreinte qui ne bouge pas toute seule (#7), un canal qui marche sans session (#6), et le temps de chaque porte noté
   pour savoir où l'effort part.
3. **Les modèles bougent.** Voix (#16), Whisper (dépôt tiers non épinglé, #25), API de sources (OpenAlex a changé de
   politique en 2026, #21), Remotion. Toutes empreintent les versions pour savoir quoi refaire ; aucune ne dit comment
   garder **les mêmes personnages** quand l'outil change.
4. **La publication quotidienne a un coût humain que le pilote cache** (hors pilote, mais c'est le régime visé) : dans
   quran-reels, TikTok se publie à la main (brouillons), et **15 des 55 lancements manuels de `daily.yml` ont échoué**
   (27 %), chacun avec son ticket. Une chaîne de plus double ces alertes sur le même téléphone.
5. **Les droits de suppression.** Les règles « seul le propriétaire supprime une release » et « jamais pousser sur
   `main` », reprises telles quelles, interdisent le nettoyage et l'écriture machine sur `main` que A et B supposent
   (#10, #11). Il faut écrire, dans le `CLAUDE.md` du nouveau dépôt, ce qu'un workflow a le droit de faire seul.
6. **Ce qui est vu par personne** : la dérive lente. Un épisode sur dix un peu moins bon ne déclenche aucune alerte ;
   seules les statistiques le diront, et aucune proposition ne relie un essai (`trials` de quran-reels) au moteur de
   variation : on fait varier sans mesurer ce qui marche (C §11.2 point 5 est un tableau, pas une mesure).
7. **La sécurité de la clé de voix et du quota** est bien pensée (secret, workflow seul) ; mais si la session atelier
   peut lancer `voice.yml`, rien n'empêche un lancement en boucle par erreur : plafond quotidien côté workflow (registre
   de C), pas seulement `--max-requests` par run.

---

## (d) Une journée type à 1 épisode/jour (C corrigée par #5-#7, #9, #15, #18, #19, #23)

Hypothèses : régime établi, 1 style rendu par épisode, 9:16 seul, 2 lots de validation par semaine (mercredi et
dimanche, 3-4 épisodes chacun), tampon de 10-12. Tout est **estimé** sauf ce qui est marqué mesuré.

| Poste | Par jour (moyenne) | Détail |
|---|---|---|
| **Minutes du propriétaire** | **≈ 22-30 min** (lissé ; en vrai : 2 séances de 75-100 min + 3-5 min/jour) | par épisode : script 6, sources 8, aperçu 2, reprise 1 fois sur 3 × 10 ; chaque jour : alertes et brouillon TikTok 3-5 min (quand la publication viendra) |
| **Requêtes de voix** | **≈ 2,7** (plafond 7, réserve 3) | 2 nominales (dialogue + narrateur) + 0,5-1 reprise ; casting ou re-casting : 4-6 un jour donné ; mesuré ailleurs : ~3 req/min, 10 k jetons d'entrée/min, 10/jour (qtd) |
| **Minutes de CI** | **≈ 35-45 min** (gratuites, dépôt public) | sources 2-3 ; voix 4-5 (deux requêtes + 35 s d'attente) ; alignement 4-6 (Whisper large-v3-turbo ≈ temps réel sur 4 vCPU, `listen.py` l. 39) ; synchro 1-2 ; minutage et variation 2 ; rendu 1 style 8-12 + 3 d'installation ; contrôle 2 ; `advance` 2 ; revérification nocturne 3-8 (Crossref 5 req/s par DOI, 1 req/s pour `filter=updates:`, mesuré dans les en-têtes) |
| **Jetons de session** | **≈ 0,35-0,6 M traités** (surtout en cache), 20-40 k produits | écrivain 150-250 k ; contradicteur 60-100 k ; relecteur des DOI 100-200 k ; contrôle de planche et rapport 30-60 k ; **à mesurer sur 5 épisodes avant de décider la cadence** |
| **Stockage** | ≈ 2-4 Mo de prises, 40-60 Mo de vidéos | prises ~0,7-1,4 Go/an en releases mensuelles ; vidéos 15-20 Go/an en releases (sans plafond total, 2 Gio par fichier) ; `state` : ~5 commits |
| **Échecs attendus** | ~1 rendu/mois, ~2-4 jours/mois de quota insuffisant, ~1 inversion de locuteurs/mois (à mesurer) | absorbés par le tampon si `advance` relance et alerte |

Lecture : la machine tient 1/jour sans effort (CI gratuite, quota à 27 %). **Le propriétaire et le stock d'idées ne le
tiennent pas des mois.** À 3/semaine : ~10 min/jour lissées, ~1,2 requête/jour, stock d'idées pour ~1 an.

---

## (e) Classement sous l'angle automatisation

1. **C**, nettement. La seule qui a une file, un statut calculé, un état machine séparé, un stockage hors Git, un
   registre de quota, un tampon et une revérification après publication. Ses défauts sont précis et corrigibles en
   quelques jours : #6 (bloquant), #7, #9, #15, #19, #23, #30, #2, #1. À prendre comme base de la production.
2. **A**. Bonne discipline par épisode (sources d'abord, deux portes avant la voix, revérification hebdomadaire avec
   ticket) mais rien pour faire tourner la production : à 1/jour elle dépend d'une session et du propriétaire chaque
   jour, et ses prises gonflent le dépôt.
3. **B**. La plus soignée en contrats, la plus coûteuse en humain (4 portes, script avant sources), sans orchestration,
   sans revérification après publication ni alerte.

**À retenir pour la synthèse** : prendre l'architecture de production de C, la discipline de portes de A (sources avant
script), les contrats de B ; corriger les 9 points ci-dessus ; lancer à 3 épisodes par semaine avec un critère chiffré
pour monter.

---

## Vérifications faites aujourd'hui (2026-11-22)

- **Runs GitHub** (API publique, dépôts du propriétaire, lecture seule) : `daily.yml` de quran-reels, 88 runs : 33
  `schedule` (du 16 au 21 novembre à 13:29-14:28 et 22:11-00:48 UTC pour un cron `17 5,6,7 * * *`) ; 55
  `workflow_dispatch` dont 15 en échec, 1 annulé. `film.yml` de quran-themes-demo : 100 derniers runs, 95 réussis,
  3 échecs, 2 annulés.
- **Origine des écritures** : PR #115 de quran-reels → `performed_via_github_app.slug = "claude"` ; ticket #39 :
  `/apercu` (2026-11-06 13:29:38Z) et `/publier` (13:48:37Z) du propriétaire → `null` ; commentaire de session
  (15:58:44Z) → `claude`. Le `gh` de la session n'est pas authentifié (jeton invalide) : elle n'écrit que par l'app.
- **Crossref** (en-têtes) : `/works/{doi}` → `public-single`, 5 req/s, concurrence 1 ; `/works?filter=updates:` →
  `public-array`, 1 req/s, concurrence 1 ; doc : poli 10/s et 3/s, concurrence 3 ; 429 au-delà, 403 si bloqué.
- **OpenAlex** (en-têtes à 10:25 UTC, sans clé) : `x-ratelimit-limit-usd: 0.1`, `x-ratelimit-remaining-usd: 0`,
  `x-ratelimit-cost-usd: 0` pour une lecture par DOI, réponse 200 ; doc (help.openalex.org) : sans clé 10 req/s par IP,
  clé gratuite 1 $/jour, lecture par id 0 $, liste 0,0001 $, recherche 0,001 $, remise à zéro à minuit UTC, « Until
  27 June 2026 every caller could send 100 requests per second », comptes neufs à 0,10 $ par 5 min depuis le 3 novembre 2026.
- **Résumés** (OpenAlex / Crossref) : avec résumé quelque part : 10.1037/pspp0000157, 10.1037/a0022010,
  10.1037/a0024755, 10.1038/s41598-021-04262-z, 10.1002/ejsp.674, 10.1177/1745691616652873, 10.1037/pspp0000102,
  10.1177/0956797614535810 ; **sans** : 10.1016/j.cpr.2009.11.004 (Europe PMC : oui), 10.1016/S0272-7358(00)00057-X
  (Europe PMC : requête en échec, non conclu).
- **Docs GitHub** : `schedule` retardé aux heures de charge, « some queued jobs may be dropped », désactivé après
  60 jours sans activité en dépôt public ; `GITHUB_TOKEN` ne crée pas de runs (sauf `workflow_dispatch`,
  `repository_dispatch`) ; dépôt personnel neuf : workflows sans droit de créer des PR, `GITHUB_TOKEN` en lecture ;
  releases : < 2 Gio par fichier, ≤ 1 000 fichiers par release, taille totale libre ; Actions : 6 h par job,
  20 jobs simultanés (Free), cache 10 Go par dépôt ; concurrence : un seul run en attente par défaut, `queue: max`
  jusqu'à 100.
- **Gemini** (aistudio.google.com/docs) : limites « per project, not per API key », RPD remis à minuit (Pacifique),
  « not guaranteed and actual capacity may vary », plus strictes pour les previews, **aucune ligne TTS du palier
  gratuit publiée** ; modèles : `gemini-3.8-flash-tts` et `-lite-tts` « New », `gemini-3.1-flash-tts-preview`
  « legacy », « API access to the 2.5 models is limited to existing users », previews retirés avec au moins 2 semaines
  de préavis, modèles texte 2.5 redirigés le 2026-12-01.
- **Non vérifié** (dit comme tel ci-dessus) : jetons réels d'une production quotidienne, limites de l'abonnement du
  propriétaire, accès au dépôt d'une session neuve lancée par une tâche planifiée aujourd'hui, nombre réel d'idées
  vérifiables (estimation), durée d'un rendu de ces styles (aucun n'existe).
