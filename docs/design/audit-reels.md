# Audit de réutilisation : `quran-reels` pour la nouvelle chaîne (livres de développement personnel vs science)

Date : 2026-11-22. Lecture seule : rien n'a été modifié dans `/home/user/quran-reels` ni `/home/user/quran-themes-demo`
(`git status --short` vide, vérifié à la fin). Aucune API Meta / TikTok / YouTube appelée, aucun workflow lancé.
Taille du dépôt : 18 300 lignes de Python dans `src/`, 10 300 lignes de tests (38 fichiers), 14 workflows.

Échelle d'effort : **S** = moins d'une demi-journée de session ; **M** = 1 à 2 jours ; **L** = 3 jours et plus.
Verdicts : **tel quel** (copiable sans changement de logique) ; **extraire + généraliser** (bonne brique, couplée par ses
entrées) ; **patron** (reprendre l'idée, réécrire) ; **rien** (propre au Coran ou à la Page Quran Words Daily).

## 0. Constat d'ensemble (à lire avant le tableau)

1. **Le gros de la valeur est dans les plateformes et l'exploitation, pas dans le rendu.** Le rendu de quran-reels
   (Chromium → PNG → ffmpeg, audio coupé par ayah) ne sert pas à une chaîne Remotion. Ce qui sert : les publishers Meta,
   TikTok et YouTube (années de pièges de production déjà payés), la vérification des droits, l'état sur branche `state`,
   `save-state.sh`, les workflows épinglés, la normalisation du son, l'ré-encodage Instagram.
2. **Le couplage au Coran est faible dans `publishers/` et fort partout ailleurs.** Les publishers ne lisent du `Reel`
   que : `video`, `text_for(platform, n)`, `hashtags`, `cover_ms`, `cover_image`/`cover_url`, `title`, `video_url`
   (comptage `grep` : 9 `reel.video`, 7 `reel.cover_ms`, 3 `reel.text_for`, 2 `reel.hashtags`). Un `Protocol` « Post »
   à 6 champs suffit : le travail est une **injection de dépendance**, pas une réécriture.
3. **Trois couplages à lever dans tout paquet extrait** : (a) le `Config` de quran-reels (`cfg.project["platforms"]…`,
   `cfg.root`), (b) l'identité du dépôt en dur (`mssnoussi92/quran-reels` dans 9 fichiers de `src/` : User-Agent, `REPO`,
   `PAGE` de feed.py, `GitHub.__init__`, `playlists.py`…), (c) le vocabulaire (passage, créneau, récitateur, série) dans
   l'état, les alertes (`notify.py`, en français, titres de tickets fixes) et les statistiques.
4. **Le propriétaire n'a pas de PC, et la session ne peut écrire que dans deux dépôts** : tout plan d'extraction doit
   passer par des PR dans le nouveau dépôt (création par le propriétaire) et par des fichiers de release téléchargeables.
5. **Ce que la nouvelle chaîne n'a pas besoin de publier dans le pilote** : la publication est hors pilote. Donc
   la bonne stratégie est de **ne rien extraire maintenant**, de prévoir l'architecture (interface `Publisher` + `Post`
   + état + dossier `publish/`), et de copier-généraliser les publishers quand le pilote est validé.

## 1. Tableau récapitulatif

| Brique | Chemin(s) | Verdict | Effort | Risque |
|---|---|---|---|---|
| Interface `Publisher`, `PublisherError`, `wait()` | `publishers/base.py` (55 l.) | **tel quel** (retirer `Reel` → `Post`) | S | faible |
| Client Graph Meta (jeton en en-tête, erreurs sans jeton, `X-App-Usage`, `check_token`, `MetaEnv`) | `publishers/meta.py` (277 l.) | **extraire + généraliser** | S-M | faible (User-Agent, ids en dur) |
| Facebook : reel via `video_reels`, brouillon puis publication, couverture, retrait | `publishers/facebook.py` (165 l.) | **extraire + généraliser** | M | moyen (comportement API non documenté, voir §2.1) |
| Instagram : conteneur reprenable, budget d'appels, quota, abandon de conteneurs | `publishers/instagram.py` (208 l.) | **extraire + généraliser** | M | moyen (nombreux modes d'échec constatés) |
| Vérification des droits Meta avant publication (+ après) | `publishers/rights.py` (152 l.), `publish.check_rights`, `publish.set_aside` | **extraire + généraliser** (mais voir pertinence §2.1) | S | faible code, **pertinence incertaine** (musique ≠ récitation) |
| TikTok : OAuth, refresh token rotatif, `MEDIA_UPLOAD` brouillon, morceaux, reprise | `publishers/tiktok.py` (243 l.) + `gh_secrets.py` | **extraire + généraliser** | M | moyen (rotation du jeton, `GH_SECRETS_TOKEN`) |
| YouTube : envoi reprenable, langue, miniature, `dedupe`, jamais deux fois | `publishers/youtube.py` (391 l.), client dans `insights/youtube.py` | **extraire + généraliser** | M | moyen (`video_for` importe `publish`) |
| Orchestration de publication (préparer partout → droits → publier → reprise) | `publish.py` (529 l.), `daily.to_youtube` | **patron** (réécrire sur l'interface) | M-L | moyen |
| Secrets Actions réécrits (jeton rotatif), masquage, échéance du PAT | `gh_secrets.py` (65 l.) | **tel quel** | S | faible |
| Alertes par tickets GitHub (échec, « jamais tenté », notes) | `notify.py` (334 l.) | **patron** + `Issues` tel quel | S-M | faible |
| Page « À publier » (copier-coller TikTok, MP4 YouTube) | `feed.py` (82 l.), `docs/publier.html`, `docs/reel.html` | **patron** | M | faible |
| Statistiques Meta (collecte nocturne, budget, points à 48 h/7 j/28 j) | `insights/collect.py`, `metrics.py` | **extraire + généraliser** (cœur) ; `classify.py`, `themes.py` : **rien** | M-L | moyen |
| Statistiques YouTube (Data + Analytics) | `insights/youtube.py` (575 l.), `youtube_detail.py`, `youtube_import.py` | **extraire + généraliser** | M | faible |
| Playlists YouTube, sous-titres, description de chaîne | `playlists.py`, `captions.py`, `channel.py` | **patron** (client `Channel` : tel quel) | S-M | faible |
| Marques de sens bidirectionnel | `bidi.py` (74 l.) | **tel quel** (utile si arabe + français/anglais) | S | faible |
| Minutage audio, niveau −16 LUFS + limiteur, encodage Reels | `render/video.py` (229 l.) | `level`, `loudness`, `_fit` : **extraire** ; reste : **rien** ; options ffmpeg Instagram : **tel quel** | S | faible |
| Rendu Chromium/Playwright (PNG transparents) | `render/frames.py` (92 l.), `render/__init__.py` | **rien** (Remotion remplace) ; le patron de test, oui | — | — |
| État sur branche `state` + `save-state.sh` | `.github/scripts/save-state.sh`, `tests/test_save_state.py` | **tel quel** | S | faible |
| Calendrier : créneaux, files, `days`, pause, fuseau, `missed_slots`, `reopen`, `record_by_hand` | `selector/calendar.py` (653 l.), `config/schedule.yaml` | **extraire + généraliser** (le moteur) ; séries/plan : **rien** | M-L | moyen |
| `daily` : créneau dû → rendu → publication → état → reprise | `daily.py` (606 l.) | **patron** | M-L | moyen |
| Workflows (concurrence, épinglage, ffmpeg statique, secrets par étape) | `.github/workflows/*.yml`, `constraints.txt` | **patron** (copier le squelette) | S | faible |
| Catalogue public + tableau de bord + `dataset.json` | `catalog/` (≈ 3 000 l.) | **patron** pour `dashboard.py`/`stats.py`/`charts.py` ; reste : **rien** | L | faible |
| Pages GitHub Pages (CGU, confidentialité, login TikTok/YouTube, callbacks, signature TikTok) | `docs/*.html` | **tel quel après renommage** (obligatoires pour les apps) | S | moyen (délais de validation) |
| Tests : faux Graph, dépôt Git local, Chromium réel, sans réseau | `tests/` | **patron** | S | faible |
| Publication de vidéos d'un autre dépôt (release `page-<doc>`, textes validés, jours, plusieurs vidéos/jour) | `themepub/` (run.py 692 l.) | **patron** (c'est le cas du nouveau projet : contenu dans un dépôt, publication dans un autre) | M | faible |
| Sources Coran, récitateurs, fonds Pexels/Pixabay, scènes GLSL, plan, images, à la demande | `sources/`, `passage.py`, `reciters.py`, `images/`, `ondemand/`… | **rien** (voir §2.9 pour `ondemand` comme patron d'approbation) | — | — |

## 2. Détail par brique

### 2.1 `publishers/` (Meta, TikTok, YouTube)

**`base.py`** : `Publisher` (Protocol : `name`, `mode` auto|draft|manual, `publish(reel, dry_run)`), `PublisherError(transient)`,
`StillProcessing`, `wait(check, what, timeout, interval)` (jusqu'à 3 erreurs transitoires de suite tolérées : l'envoi est
fait, la plateforme continue). *Couplage* : seul l'import de `Reel`/`PublishResult` de `models.py`. *Verdict* : tel quel ;
déplacer `PublishResult`, `PublishStatus` (PUBLISHED/DRAFT/READY/MANUAL/CANCELLED/BLOCKED/REMOVED/FAILED) et `ASIDE` dans
le paquet. `PublishStatus.BLOCKED/REMOVED` portent la logique droits ; les garder.

**`meta.py`** : classe `Graph` (jeton dans l'en-tête `Authorization`, jamais dans l'URL ; messages d'erreur reconstruits
depuis le JSON Graph, extrait de corps avec jeton blanchi ; `X-App-Usage` → `Graph.usage` ; `upload` vers `rupload`),
`check_token` (`GET /debug_token` : type PAGE, bonne Page, permissions requises, `data_access_expires_at` ; échoue à moins de
14 jours), `MetaEnv.from_environ` (variables `META_PAGE_ID/TOKEN`, `IG_USER_ID`, ou `META_IDS_FROM_TOKEN=1` : la Page et le compte
Instagram sont lus depuis le seul jeton, cas de la page test `META_PAGE_TOKEN_5`). *Couplage* : `USER_AGENT` avec l'URL du dépôt ;
`REQUIRED_SCOPES` ; `RENEW` (texte de marche à suivre). *Verdict* : extraire + généraliser (S-M). **Le mode
`META_IDS_FROM_TOKEN` est exactement ce qu'il faut pour une nouvelle Page** : un seul secret, zéro identifiant en clair dans les logs
publics. À garder tel quel.

**`facebook.py`** : reel en 3 phases (`video_reels` start → upload rupload → `finish` avec `video_state=DRAFT` toujours depuis le
2026-11-05), attente du traitement, **vérification des droits sur le brouillon**, puis re-`finish` en `PUBLISHED` (en fait : le fichier est
renvoyé tel quel en PUBLISHED, brouillon supprimé : « un brouillon de reel ne se publie pas par l'API », code 6000/1363130),
couverture (`/{video}/thumbnails`, permissions `pages_manage_engagement` + `pages_read_user_content`, n'échoue jamais la
publication), retrait (`delete`). *Couplage* : `reel.cover_ms` (milieu de la première ayah glosée), `reel.text_for("facebook", n)`.
*Verdict* : extraire + généraliser (M) via `Post(video, caption_for(platform), hashtags, cover_image|cover_ms)`.
*Risque* : le second `finish` publié n'est pas documenté par Meta ; limite 30 reels API / 24 h ; reels Facebook 3 à 90 s (doc Reels Publishing).

**`instagram.py`** : conteneur `REELS` + upload reprenable (`rupload.../ig-api-upload`), polling toutes les 30 s (et **arrêt à 75 % du budget
d'appels Meta**), `_first_ready` : plusieurs conteneurs gardés vivants, le premier prêt est publié ; `OutOfCalls` ; quota
`content_publishing_limit` (50/24 h) ; `prepare → rights → commit` ; `thumb_offset`. *Piège central constaté* : l'upload répond presque toujours
`400 ProcessingFailedError` puis le conteneur est quand même parfois prêt, parfois `IN_PROGRESS` pour de bon. D'où 3 essais × attente de 4 min.
*Verdict* : extraire + généraliser (M). *Risque* : comportement très dépendant de l'API ; garder les 4 tests de comportement
(`tests/test_publishers.py` avec faux Graph) comme filet. Pour des vidéos Remotion, voir §2.3 (`for_instagram`, ou `video_url`).

**`rights.py`** : lit `copyright_check_information` (Facebook, sur le brouillon) / `copyright_check_status` (Instagram, sur le conteneur)
jusqu'à `complete`, 10 min max ; `clear` = complete + `matches_found false` ; `failed` = `error` sans correspondance (cas particulier
Instagram du 2026-11-20 : un nouvel envoi une fois, puis « laissé de côté » si Facebook est propre) ; version « après publication »
(`AFTER`, désactivée en prod : `rights_after_timeout: 0`) avec retrait. *Constat de production important* : **ce contrôle a un angle mort**
(le témoin Alafasy passait « complete, aucune correspondance » alors que Rights Manager l'avait coupé le matin même ; Ar-Rifai et Al-Ghamdi
revendiqués après publication). Il n'a aidé qu'une fois en pratique (`error`) ; la vraie protection est le choix d'un enregistrement licencié.
*Pour la nouvelle chaîne* : la musique d'ambiance est le seul risque Rights Manager/Content ID (la voix de synthèse et les dessins ne sont pas
des œuvres du catalogue). Le contrôle reste utile à 1 minute près **si** de la musique est utilisée ; sinon il coûte du temps et des appels
Meta pour rien. *Verdict* : extraire (S), mais **activable par réglage** ; ne pas en faire une règle non négociable sans musique tierce.

**`tiktok.py`** : `TikTok` (échange de code, `refresh` : le nouveau refresh token **remplace aussitôt** le secret Actions avant l'envoi
de la vidéo — `gh_secrets.save_secret` —, masqué dans les logs), `api()`, envoi `FILE_UPLOAD` en un morceau jusqu'à 64 Mo sinon morceaux de 10 Mo,
`Content-Range`, 3 essais sur 5xx/réseau, statut jusqu'à `SEND_TO_USER_INBOX`. Mode **brouillon** (`MEDIA_UPLOAD`) : sans audit, la
publication directe est forcée en `SELF_ONLY`. *Couplage* : `TikTokEnv` (variables), signature propre à TikTok côté rendu (spécifique Quran).
*Verdict* : extraire + généraliser (M). *Risque* : l'audit TikTok refuse les apps « à usage privé » ; le brouillon (5 max / 24 h) demande
l'action du propriétaire.

**`youtube.py`** : `Uploader` : envoi **reprenable** (métadonnées d'abord, adresse de session, `PUT` du fichier, en cas d'erreur on demande
combien d'octets sont arrivés, `UPLOAD_TRIES=3`), attente du traitement (300 s), `language` déclarée, `selfDeclaredMadeForKids`, `containsSyntheticMedia`
(champ `synthetic_media`), miniature (`thumbnails.set`, 2 Mo max, Shorts acceptés depuis le 2026-11-03), `dedupe` (même titre parmi les 50
derniers envois), **identifiant gardé pour ne jamais renvoyer deux fois** (un rejet ou un privé = échec avec identifiant = alerte, pas de nouvel
envoi). Limites codées : titre 100, description 5 000 octets, tags 450 caractères. *Couplage* : `video_for(reel, conf)` importe `quran_reels.publish.youtube_texts`
(titre tiré de la légende, arabe d'abord) ; client OAuth dans `insights/youtube.py` (`YouTube`, `YouTubeEnv`, `auth_url`). *Verdict* :
extraire + généraliser (M) : `Uploader` et `Video` sont propres ; réécrire `video_for`.
*Point stratégique pour la nouvelle chaîne* : **`containsSyntheticMedia` doit être `True` pour des personnages animés avec voix de
synthèse** si la politique de YouTube l'exige (à vérifier ; dans quran-reels : « non » car récitation humaine et dessins non réalistes). Ne pas copier ce
réglage aveuglément.

**`Publisher` / `dry_run`** : `dry_run` signifie « aller aussi loin que la plateforme le permet sans rien rendre public » : Facebook = brouillon
supprimé ensuite, Instagram = conteneur non publié (expire en 24 h), TikTok = **le brouillon arrive vraiment dans la boîte** (rien de public mais
visible du propriétaire : `themes` ne l'envoie jamais en dry run), YouTube = jamais d'envoi en dry run. C'est un bon contrat, à copier tel quel.

### 2.2 `publish.py`, `gh_secrets.py`, `notify.py`, `feed.py`, `insights/`, `playlists.py`, `captions.py`, `bidi.py`

- **`publish.py`** : `publish_reel` = (1) Meta : envoi non publié partout, (2) lecture de toutes les vérifications, (3) publication seulement si tout est propre,
  TikTok compris, (4) contrôle après publication, (5) `publish.json` + résumé du run. `to_retry` (une plateforme qui n'a rien reçu est réessayée une fois, seule, 180 s plus tard ;
  jamais après un refus des droits ni un échec pendant la publication). *Couplage* : `Config`, `load_reel` (manifeste Quran), légendes arabes, `youtube_texts`.
  *Verdict* : **patron** : réécrire sur les interfaces. La logique « préparer partout → décider → publier ; reprise des seuls échecs sans identifiant » est la partie à garder.
- **`gh_secrets.py`** : `mask` (`::add-mask::`), `save_secret` (via `gh secret set`, valeur par stdin, `GH_SECRETS_TOKEN` = PAT fin limité aux secrets du dépôt), `token_expiry` (en-tête
  `github-authentication-token-expiration`, alerte 14 jours avant). *Verdict* : tel quel (S). *Risque* : un PAT fin **expire** (échéance maximale proposée) et coupe la rotation TikTok.
- **`notify.py`** : tickets GitHub : « échec » ouvert/commenté/fermé par le run suivant qui réussit, ticket « légendes à copier » épinglé, **un ticket d'alerte par workflow**
  (`ALERTS`) car un workflow qui réussit fermait l'alerte d'un autre (15 novembre), `notes` (créneau jamais tenté, échéance du PAT), assigné au propriétaire (notification push de l'appli GitHub),
  `Issues` avec runner injectable. *Verdict* : `Issues` tel quel ; textes : patron (en français, vocabulaire reels). Effort S-M. *Risque* : un dépôt public → rien de secret dans les tickets.
- **`feed.py` + `docs/publier.html`** : `feed.json` sur la branche `previews`, page statique à lien fixe qui lit le JSON, boutons « Copier », liens MP4 de la release `reels`. Né d'un besoin
  précis : **publier à la main depuis un téléphone** (TikTok en brouillon, YouTube avant l'API). *Verdict* : patron ; très utile tant que TikTok reste en brouillon. M.
- **`insights/collect.py` + `metrics.py`** : lecture seule ; `Budget` (arrêt à `max_usage` 75 % du budget horaire Meta ou `max_calls` 150, pagination par curseur sans suivre l'URL `next` qui contient un jeton),
  relevés à 48 h / 7 j / 28 j gardés pour de bon la première nuit après l'âge (jamais rattrapés au-delà de 48 h, pour comparer à âge égal), « dernier relevé » jusqu'à 8 jours, normalisation des métriques
  (vues `views`/`blue_reels_play_count`/`total_video_views`, accroche à 3 s = 100 − `reels_skip_rate`, durée regardée, partages…). *Couplage* : `classify.py` (créneau, Word of the day, vidéo thématique par titre) et `themes.py`
  (lit `calendar.md` et `publication-*.md` de quran-themes-demo) : **rien**. *Verdict* : extraire `Budget`, `metrics`, relevés par âge ; réécrire la classification autour de l'`episode_id` de la nouvelle chaîne
  (le titre ne doit pas être le lien ; mettre l'identifiant dans la description ou le dériver de l'état). M-L.
  *Piège de production* : le 2026-11-13 un run a consommé tout le budget Meta (≈ 200 appels/h par app pour une app à un seul utilisateur) et le run de publication suivant a échoué dès `debug_token` — **les statistiques et la publication partagent le budget de l'app** ; à planifier la nuit.
- **`insights/youtube.py`** (575 l.) : `YouTube` (OAuth : échange de code, `access`, `get` avec erreurs propres), Data API + Analytics API, relevés comptés sur les jours de YouTube Analytics (fuseau Pacifique), `video_key`
  (titre → vidéo), `engaged`, `search_pct` ; `youtube_detail.py` ; `youtube_import.py` (exports de Studio, CSV/zip). *Verdict* : extraire le client et les relevés (M) ; le rattachement à la vidéo est à refaire.
- **`playlists.py` / `captions.py` / `channel.py`** : `Channel` (playlists, `playlistItems`, `captions`, `channels.update` qui efface ce qu'on ne renvoie pas : **lire puis renvoyer tout le reste**), sous-titres exacts tirés d'un manifeste,
  **jeton à part** (`youtube.force-ssl` est le seul scope qui écrit une playlist ; il permet aussi de modifier/supprimer), description de chaîne limitée à 1 000 caractères, mots-clés à 500. *Verdict* : client `Channel` tel quel ; la
  logique « série → playlist » est un patron ; **sous-titres** : très pertinents pour la nouvelle chaîne (dialogues multilingues, accessibilité, indexation) : les générer depuis le JSON d'épisode, pas depuis Whisper.
- **`bidi.py`** : une marque RLE/LRE au début des lignes qui en ont besoin, « un seul caractère par ligne » car YouTube compte les marques ; ne touche pas aux lignes de hashtags, mentions, chapitres, liens. *Verdict* : tel quel (S) **si** la chaîne mélange
  arabe et latin (une langue arabe ou un titre arabe + anglais) ; inutile sinon. Les mêmes marques servent aux sous-titres et aux textes à l'écran dans Remotion.

### 2.3 `render/video.py` et `render/frames.py`

- **`render/video.py`** : `decode` (MP3 → PCM 48 kHz), `Timeline` (durée par ayah en échantillons, **durées de frame entières, audio calé sur la dernière image**), `write_audio`, `loudness` (ffmpeg `ebur128`, intégré, silences exclus),
  `level` (**un seul gain pour toute la piste** d'après sa mesure EBU R128 — pas de `loudnorm`, qui module le gain dans le temps —, puis `alimiter` plafond 0,8 de l'échelle = −1,9 dBFS, latence compensée, nombre d'échantillons identique ± `LEVEL_SLACK`, gain borné à ±12 dB car au-delà « le fichier est cassé »),
  `compose` (couches PNG, `-use_editlist 0 -bf 0 -movflags +faststart -profile:v high -pix_fmt yuv420p -maxrate 6M -bufsize 12M`, AAC 48 kHz 128 k, `-g fps*2`). *Verdict* : **`loudness` + `level` : extraire (S)** — c'est exactement le contrôle que
  la nouvelle chaîne devrait appliquer après le mixage multi-voix (cible −16 LUFS alignée sur les vidéos thématiques de quran-themes-demo ; **vérifier le plafond −1 dBTP/crête vrai** : ici c'est un plafond d'échantillon, pas un vrai-peak) ; **`compose` : rien**
  (Remotion encode lui-même) mais **la ligne d'options Instagram est à reprendre** (§2.8). `Timeline`/`write_audio` : rien (pas d'ayah).
- **`render/frames.py`** : Jinja2 → HTML → PNG transparent par Chromium/Playwright (un navigateur partagé, contexte manager). **Rien** pour Remotion, qui a son propre navigateur ; en revanche **le test Chromium** (§2.7) et l'idée d'épingler `playwright` dans `constraints.txt`
  (un nouveau Chromium déplace le texte arabe) valent pour l'épinglage de `@remotion/*` et du navigateur.
- **Leçon pour Remotion** (de quran-themes-demo/CLAUDE.md et du code) : `for_instagram` de `themepub/run.py` **ré-encode** une vidéo Remotion (« les vidéos thématiques (Remotion) portent des edit lists ; Instagram ne finissait jamais le traitement d'un short de 2 min ») :
  `ffmpeg -c:v libx264 -preset medium -crf 20 -maxrate 6M -bufsize 12M -profile:v high -pix_fmt yuv420p -bf 0 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -use_editlist 0`. À intégrer en dernière étape de rendu de la nouvelle chaîne (ou au moment de publier).

### 2.4 État et ordonnancement

- **Branche `state`** : orphelin Git, monté en `git worktree` dans chaque workflow (`git worktree add state-branch state` ou `--orphan -b state`), fichiers JSON (`published.json`, `themes.json`, `insights.json`, `images.json`, `youtube-playlists.json`, `youtube-captions/`).
  Avantage : les commits de données restent hors de `main`, l'historique est le journal d'audit, public donc consultable par les pages. Inconvénient : écrivains multiples.
- **`.github/scripts/save-state.sh`** (62 l.) : commit puis `git push origin HEAD:state` ; si refusé ou réseau coupé : `fetch --depth=1`, **rejoue le commit sur la nouvelle tête** (`rebase --onto FETCH_HEAD HEAD~1`, ou `--root` pour la toute première), 5 essais avec attente doublée ; seul un vrai conflit ou 5 échecs → `::error::` (ou `::warning::` via `SAVE_STATE_LEVEL`). Pourquoi : « une publication non enregistrée serait refaite ». **Tel quel (S)**, couvert par `tests/test_save_state.py`
  (dépôt distant local, deuxième écrivain). C'est la brique la plus petite et la plus précieuse à copier dès le premier jour.
- **`selector/calendar.py`** : `Schedule` (créneaux avec `time`, `queue`, `days` = périodes `from/until/weekdays`, `pause`, `fridays`, `fallback`, `published_by_hand`, `early_minutes`, `window_hours`), `State`, `next_item`, `mark_done`, `reopen(key, why, claimed)`,
  `missed_slots` (**un créneau des 2 derniers jours sans entrée dans l'état est « jamais tenté »**), `record_by_hand`, `preview`. *Couplage* : `PlanEntry`/`Series` (passages du Coran), vendredi Al-Kahf. *Verdict* : extraire le moteur (créneaux + files + jours + pause + `missed_slots` + `reopen`) avec des « items » opaques (L? plutôt M-L) ; **le piège
  réutilisable** : une file ne bouge que quand une plateforme a publié ; un créneau supprimé ne suffit pas à republier (il faut aussi remettre l'élément en tête de file).
- **`config/schedule.yaml`** : créneaux avec fuseau `Europe/Paris` (heure d'été comprise), `window_hours: 3`, `early_minutes: 20`. Bon format de configuration éditorial (modifiable par PR depuis un téléphone).
- **`daily.py`** : `pending` → rendu → publication → **état écrit dès que le reel est sorti** (avant la version YouTube, avant une autre tentative) → reprise du seul échec sans identifiant → alerte. Même moteur que `themepub/run.py` (« plusieurs vidéos le même jour, chacune sur ses plateformes, jamais deux sur la même »).
  Patron à réécrire (couplé au récitateur, à la basmala, à la version YouTube par Tawfiq).
- **Alertes « créneau jamais tenté »** : voir ci-dessus + `notify.missed_text` : c'est **un témoin indépendant** : `daily.yml` garde son cron GitHub *uniquement* pour que tout run tardif voie un créneau manqué et ouvre le ticket.
- **Pourquoi le cron GitHub a été remplacé par des tâches planifiées Claude** (CLAUDE.md, 2026-11-05 à 11-09) : sur ce dépôt le `schedule:` a lancé des runs **6 à 8 h en retard et pas à chaque fois** (8 passages sur 24 le 2026-11-09, tous hors fenêtre) ; le premier cron n'avait jamais tiré (cron modifié pour se réenregistrer) ; **un run tardif et inutile occupait l'unique place en attente d'un groupe de concurrence** et annulait un `prepare` (22:40 UTC) — et une publication en attente aurait été annulée de même, sans job donc sans alerte.
  Solution : des tâches planifiées d'une session Claude « planificateur » (Sonnet, outils GitHub) lancent `workflow_dispatch` sur `main`, attendent la fin, relancent une fois en cas d'échec (sauf `prepare`), résument (skill `check-publication`). *Risques* : couplé à l'infrastructure Claude (si les tâches s'arrêtent, tout s'arrête — le témoin « jamais tenté » est là pour ça) ; chaque tâche est liée à une session et à l'heure ; coût en jetons. **Alternatives gratuites à étudier pour la nouvelle chaîne** : (a) un service de cron externe (ex. cron-job.org, gratuit) appelant `workflow_dispatch` avec un PAT fin limité à Actions, (b) un petit hôte à soi (homelab) ; (c) garder le cron GitHub mais **jamais dans un groupe de concurrence partagé avec la publication** et l'alerte « jamais tenté » comme filet — acceptable si l'heure exacte importe peu (rythme de vidéos pas « à 07:30 pile »). Pour une chaîne où l'heure n'est pas critique, (c) suffit au pilote.

### 2.5 Workflows

Patrons à copier tels quels (S) :
- **`PIP_CONSTRAINT: constraints.txt`** dans chaque workflow : versions de ce qui change la sortie sans commit (playwright + son Chromium, numpy, torch, transformers, tokenizers) ; changées exprès, test de rendu réel pour les valider.
  *Pour Remotion* : épingler `remotion` et `@remotion/*` (même version partout), `package-lock.json`, le navigateur (`REMOTION_BROWSER_EXECUTABLE`) ; l'équivalent côté npm.
- **ffmpeg statique sans apt** : `pip install imageio-ffmpeg==0.8.1` + lien symbolique `~/bin/ffmpeg` + `$GITHUB_PATH` ; **pas de ffprobe** (durées lues par ffmpeg). Raison : le 2026-11-05 le miroir Ubuntu a mis 39 min à installer ffmpeg et a bloqué le run du soir. Remotion embarque son propre ffmpeg (`@remotion/compositor`) ; pour le mixage/niveau, garder l'astuce.
- **`concurrency: group: accounts; cancel-in-progress: false`** pour tout ce qui publie ; `insights`, `prepare`, `playlists`, `catalog`, `tests` ont leurs propres groupes. **Limite à connaître** : GitHub garde **une seule exécution en attente par groupe** ; la suivante remplace la précédente. Ne jamais mettre dans `accounts` un workflow qui ne publie pas.
- **Secrets par étape** : les secrets sont dans `env:` de l'étape `Publish…` seulement, pas dans celles qui installent ; **deux jeux de secrets disjoints** pour deux pages (`themes.yml` : l'étape de la page test ne voit jamais les secrets de la Page et inversement : « un jeton manquant fait échouer le run, il ne peut jamais poster la vidéo de la page test sur la Page »). **À reprendre à la lettre** pour isoler la nouvelle chaîne de la Page Quran.
- **Runners épinglés `ubuntu-24.04`** (ubuntu-latest passe à 26.04), actions en versions Node 24 ; `.github/dependabot.yml` : une PR par mois pour les versions d'actions.
- **Cache `.cache`** restauré/sauvé même en cas d'échec (`actions/cache/restore` + `save` avec `if: always()`, clé avec `run_id` + `restore-keys`) : un run qui échoue sans sauver recommençait 9 min de téléchargements.
- Les logs d'un dépôt public sont publics : jamais d'identifiant ; `::add-mask::` pour les jetons obtenus en route ; erreurs reconstruites.
- **`workflow_dispatch` avec `dry_run`, `now` simulé, `without: plateforme`** : permet des essais sans rien publier et d'exclure une plateforme pour un run (utile quand Instagram est en panne).

### 2.6 `catalog/` et `docs/`

- **`catalog/`** (≈ 3 000 lignes) : site public en lecture seule construit par `catalog.yml` et déployé sur GitHub Pages (source « GitHub Actions ») : calendrier, publications, récitateurs, fonds, **« Statistiques »** (`stats.py`, `dashboard.py`, `charts.py` : graphiques SVG sans bibliothèque ?), `dataset.json` (une ligne par vidéo et par plateforme, pour que **n'importe quelle session puisse auditer** les chiffres sans lire les pages).
  *Verdict* : **ne rien extraire**. Reprendre le patron : (1) données de statistiques en JSON sur `state`, (2) une page de tableau de bord qui n'affirme rien sous 3 vidéos ou 12 points d'écart (`compare: min_videos: 3, min_points: 12`), (3) `dataset.json` plat pour les audits, (4) `trials` = « essais en cours » avec avant/après à 48 h. À démarrer **simple** pour la nouvelle chaîne (une page + `dataset.json`).
- **`docs/`** (Pages) : `privacy.html` et `terms.html` (**nécessaires** aux apps Meta, TikTok, Google : la page Confidentialité mentionne les « YouTube API Services », donne la politique de confidentialité de Google et la page où retirer l'accès ; les Conditions renvoient aux conditions de YouTube), `tiktok-login.html` + `tiktok-callback.html`
  (l'OAuth sans serveur : la page redirige vers TikTok avec la *client key* collée, le callback **affiche le code**, le propriétaire le colle dans un workflow `tiktok-auth` qui l'échange, car les logs d'un dépôt public sont publics et le code est lu dans le fichier d'événement, jamais affiché), `youtube-login.html` + `youtube-callback.html` (trois boutons : statistiques lecture seule, envois, playlists),
  `tiktokL9p6….txt` (fichier de signature de l'URL vérifiée par TikTok), `style.css`. **À copier après renommage (S)** ; *piège* : le préfixe d'URL est vérifié **par app TikTok** (`https://<user>.github.io/<repo>/`) → une nouvelle app TikTok = un nouveau dépôt/Pages = nouvelle vérification ; les pages doivent nommer l'app et le projet de la nouvelle chaîne (pas « Quran Words Daily Publisher »).

### 2.7 Tests

38 fichiers, **sans réseau**. Patrons réutilisables :
- Faux `requests.Session` qui route `(méthode, suffixe de chemin)` vers des réponses prédéfinies et **enregistre chaque appel** (`tests/test_publishers.py`) ; on y vérifie aussi que le jeton n'apparaît dans aucun message.
- `test_save_state.py` : vrai dépôt Git local en remote, deuxième écrivain qui pousse entre-temps.
- `test_render_chromium.py` : dessine le gabarit **pour de bon**, vérifie ce qui doit rester vrai (polices chargées, texte entre les marges de la zone sûre même réduit), **saute en local si le navigateur manque mais échoue en CI** (`GITHUB_ACTIONS=true`) ; aucune image n'est comparée pixel à pixel. *Équivalent Remotion* : rendre une image fixe (`remotion still`) du gabarit de chaque style et vérifier la zone sûre.
- `test_loudness.py`, `test_timeline.py` : mesures réelles par ffmpeg sur des signaux synthétiques ; `test_youtube_upload.py`, `test_tiktok.py`, `test_rights.py`, `test_calendar.py`, `test_notify.py` (runner `gh` injectable).
- `tests.yml` : pytest + ruff à chaque PR ; ruff `line-length = 100` ; `pytest testpaths = ["tests"]`.

### 2.8 Leçons de production (extraites de CLAUDE.md et docs/, datées)

Voir aussi §5. Les points qui concernent directement une chaîne vidéo 9:16 de 45-60 s :
- **Droits** : Rights Manager (Meta) a coupé/rendu muette une récitation après publication (Alafasy, 2026-11-05 ; Ar-Rifai 24 territoires ; Al-Ghamdi UMG) ; la vérification avant publication ne les voyait pas. Content ID (YouTube) : un Short de plus d'une minute avec **n'importe quelle** revendication est **bloqué partout** (Budair, 2026-11-06) ; en dessous d'une minute la politique du titulaire s'applique. Ne pas contester ; la seule garde est le choix de la source audio. **Pour la nouvelle chaîne : aucune musique tierce**, ou musique libre de droits avec preuve (licence consignée dans le JSON d'épisode : `audio_credits`).
- **Facebook, liste de qualité** : « image statique » (6:17, 2026-11-09 : écart moyen absolu < ≈ 0,5 sur 0,5 s d'intervalle ; le seuil constaté est entre 0,44 qui était signalé et 2,90 qui ne l'était pas) ; « vidéo avec bordures » (une bande de 110 px presque noire immobile en bas, 2026-11-13) ; « légende de qualité » (10 à 400 caractères hashtags compris). *Conséquences pour des scènes cartoon* : un fond fixe avec peu de mouvement + sous-titres statiques risque « image statique » ; prévoir un mouvement continu léger (zoom lent `push_in` 8 %/min, 12 % max, via `perspective` de ffmpeg pour éviter le tremblement d'un `crop`/`zoompan` à pixels entiers ; en Remotion : `scale`/`translate` interpolés en sous-pixel), pas de bande uniforme sombre en bas, légende Facebook courte ≤ 400 caractères.
- **Instagram** : upload `ProcessingFailedError` quasi systématique, conteneur parfois bloqué `IN_PROGRESS` ; refuse les **edit lists** par défaut de ffmpeg (`-use_editlist 0 -bf 0`) ; copie Facebook du brouillon (720×1280 à 201 kb/s) refusée (code 2207076) ; budget d'appels de l'app ≈ 200/h : sondage toutes les 30 s + arrêt à 75 % ; **Instagram « coupe parfois la couverture à cause des mots dans les versets »** (2026-11-21 : le texte à l'écran dans le cadre de la couverture) → pour la nouvelle chaîne : **titre/zone sûre de la première image** : zone sûre haut 250 px, bas 420 px, côtés 90 px ; fournir `thumb_offset` ou une image de couverture explicite ; légende ≤ 2 200 caractères, **5 hashtags** maximum (leur limite), 50 publications API/24 h.
- **TikTok** : app non auditée = publication directe forcée en `SELF_ONLY` → **brouillon** (`MEDIA_UPLOAD`, 5 brouillons/24 h) ; l'audit refuse les apps privées ; refresh token rotatif à réécrire dans un secret ; `@compte` de signature différent de celui des autres plateformes (le nom voulu appartenait à quelqu'un d'autre) → rendre une version signée par plateforme ; 5 hashtags ; HTTP 500 en cours d'envoi → renvoyer le même morceau 3 fois.
- **YouTube** : le **verrouillage en privé des envois d'API de projets non audités a été levé le 2026-11-02** (historique de l'API) ; 100 mises en ligne/jour, 1 unité chacune ; un projet OAuth en statut « Test » donne des refresh tokens qui **expirent en 7 jours** → passer l'écran de consentement « En production » (app non validée acceptée pour un usage personnel) ; langue déclarée (`defaultAudioLanguage` + `defaultLanguage`) ; tags : rôle minime ; « non répertorié 24 h » : aucun effet ; scopes séparés (statistiques lecture seule / envois / playlists `force-ssl`) avec **un refresh token par usage** ; `channels.update` efface ce qu'on ne renvoie pas.
- **Hashtags** (déterministes) : ordre fixe (marque, `#Quran`→ thème principal, série, etc.) ; Instagram et TikTok : 5 premiers ; Facebook 8 (3 pour les vidéos thématiques) ; YouTube : description + tags ; **un hashtag en début de ligne est lu par YouTube** (les 3 premiers sont affichés au-dessus du titre).
- **Titres** : **arabe d'abord partout** (décision du propriétaire, 2026-11-21 : 74 % des vues de la chaîne arabe viennent de pays arabophones et les recherches qui amènent des vues sont en arabe) ; une session avait compris l'inverse (PR #100) → **ne pas inverser une décision de langue sans lui**. Pour la nouvelle chaîne : le même raisonnement « langue de recherche d'abord » est à tester par les statistiques (voir §6, `trials`).
- **Chiffres 123, pas ١٢٣** ; titres bilingues ; compteur de série en dernier ; légende courte (≤ 400 car. Facebook) sans le texte long.
- **Planificateur** : cron GitHub en retard de 6-8 h ; un run tardif annule l'unique run en attente d'un groupe (§2.4).
- **Budget Meta** : un run de statistiques a épuisé les appels de l'app et fait échouer la publication suivante au contrôle du jeton (2026-11-13).
- **Jeton de Page Meta** : « expiration jamais » mais **l'accès aux données expire à 90 jours** ; un changement de mot de passe Facebook ou « déconnecter toutes les sessions » le coupe (codes 190/460) ; renouvellement manuel pas à pas (docs/plateformes.md) ; `meta-check` échoue à moins de 14 jours.
- **App Meta en mode développement = posts invisibles pour le public** (reel 114 « non disponible » pour un autre compte) → passer l'app **en Live** (2026-11-05) même pour des comptes du seul propriétaire.
- **Ajouter des permissions** (`read_insights`, `instagram_manage_insights`, `instagram_manage_contents`, `pages_read_user_content`, `pages_manage_engagement`) = refaire le jeton utilisateur → `me/accounts` → nouveau jeton de Page ; les prévoir toutes d'un coup à la première génération.
- **Ne pas dupliquer l'état en deux endroits** : le créneau seul ne suffit pas à republier (la file doit reculer) → exposer une commande `reopen` / `record` ; ne jamais éditer `published.json` à la main.
- **`workflow_dispatch` n'est visible qu'une fois le workflow présent sur `main`** (« le bouton Run workflow n'apparaît que pour un workflow présent sur main »).
- **Gestes réservés au propriétaire** : les outils GitHub d'une session agissent **sous le compte du propriétaire** ; les contrôles « propriétaire seulement » des workflows ne distinguent pas une session du propriétaire : une session ne poste jamais `/publier`, ne lance pas un `publish` réel, ne pousse pas sur `main`. **À reproduire dans le CLAUDE.md du nouveau dépôt** (garde-fou humain après script et après sources).

### 2.9 À la demande, `themepub/`, sources

- **`ondemand/`** : demande par ticket → aperçu 540p en commentaire → publication seulement après `/publier` du propriétaire (`commands.py`) ; **modèle d'approbation à distance depuis le téléphone**, utile pour « validation humaine après le script et après les sources » : rien d'automatique ne publie sans la parole du propriétaire. *Verdict* : patron (L si repris en entier ; non nécessaire au pilote).
- **`themepub/`** (≈ 1 100 lignes) : le même flux appliqué à des vidéos **produites dans un autre dépôt** : calendrier (un tableau Markdown), textes validés mot pour mot (`publication-<doc>.md`), fichiers téléchargés d'une **pré-release publique** (`page-<doc>`), état `themes.json`, jours/heures configurables (`times`), plusieurs vidéos par jour sur plateformes distinctes, **une page secondaire (`page: ma3ak`) avec son propre jeton** `META_PAGE_TOKEN_5`, son propre état, son propre ticket d'alerte. C'est le **modèle le plus proche du futur dépôt** (contenu → rendu dans un dépôt/Actions → publication dans un autre ou le même avec garde-fous). *Verdict* : patron (M), à reprendre en s'inspirant de `fetch`, `due_rows`, `publish_row`, `page_files`, `for_instagram`.
- **Rien à reprendre** : `sources/` (Quran.com, tafsir, EveryAyah, surah_audio.py 812 l., recognition.py Whisper), `passage.py`, `selector/plan.py`, `reciters.py`, `images/`, `arabic.py`, `catalog/reciters.py`, `catalog/backgrounds.py`. `sources/backgrounds.py` (Pexels/Pixabay, clips en boucle, 351 l.) et `sources/scenes/*.frag` (scènes GLSL animées) sont des **patrons possibles** pour des fonds, mais la nouvelle chaîne utilise des SVG articulés → inutile. `sources/http.py` (86 l., session + reprises) : **tel quel** si besoin d'un client HTTP avec reprise ; vérifier son contenu avant copie.

## 3. Comptes et secrets à recréer pour la nouvelle chaîne (jamais mélanger)

| Plateforme | Ce qu'il faut | Partageable avec Quran Words Daily ? | Recommandation |
|---|---|---|---|
| Meta | Page Facebook + compte Instagram Créateur reliés (nouveaux) ; jeton de Page avec toutes les permissions d'un coup ; app Meta en mode **Live** | L'app **peut** servir plusieurs Pages du même propriétaire (la page test « معاك 5 ثواني » utilise un jeton `META_PAGE_TOKEN_5` avec les mêmes workflows) ; mais les pages Confidentialité/CGU, le nom d'app et l'URL de politique sont ceux de « Quran Words Daily Publisher » ; **le budget d'appels (≈ 200/h) est par app** : partagé avec la publication de la Page Quran → risque de blocage croisé | **Nouvelle app Meta** (nom, politique, budget d'appels séparés) ; sinon partager l'app mais jamais le jeton ni le secret ; `META_IDS_FROM_TOKEN=1` (un seul secret) |
| TikTok | Nouvelle app (Sandbox), URL préfixe vérifiée sur le Pages du **nouveau** dépôt, utilisateur test = le nouveau compte, scopes `user.info.basic` + `video.upload`, `TIKTOK_CLIENT_KEY/SECRET/REFRESH_TOKEN` | Non : l'app Sandbox est liée à un préfixe d'URL et à un utilisateur test ; le refresh token appartient à un compte | **Nouvelle app TikTok** ; compte TikTok neuf ; accepter le mode brouillon |
| Google/YouTube | Projet Google Cloud (YouTube Data API v3 + YouTube Analytics API), écran de consentement « En production », client OAuth Web avec redirect vers le Pages du nouveau dépôt, **3 refresh tokens** (statistiques, envois, playlists) | Le client peut être partagé techniquement, mais le **nom de l'écran de consentement** (« Quran Words Daily ») s'afficherait ; et la règle du propriétaire « jamais plusieurs projets ou comptes pour multiplier un quota » s'applique aux quotas, pas à deux marques : **à lui demander** (question à choix) | Nouveau projet Google au nom de la chaîne ; **chaîne YouTube = nouveau compte de marque** ; choisir la bonne chaîne à la connexion |
| GitHub | `GH_SECRETS_TOKEN` (PAT fin, Secrets lecture/écriture sur le seul nouveau dépôt, échéance notée), secrets Actions du nouveau dépôt | Non : un PAT fin est par dépôt | Un jeton par dépôt, alerte 14 jours avant l'échéance |
| Voix | `GEMINI_API_KEY` (palier gratuit 10 requêtes/jour, **déjà utilisé par quran-themes-demo**) | Même clé = **même quota** | Ne pas partager sans décision ; chaque dépôt a son projet/clé *si* les conditions le permettent (règle du propriétaire sur les quotas : à lui demander) |
| Fonds / médias | `PIXABAY_API_KEY` (si utile) | Oui, clé gratuite sans quota critique | Facultatif |

**Règle d'isolation** (à reprendre de `themes.yml`) : chaque workflow de la nouvelle chaîne ne reçoit que ses propres secrets, dans l'étape qui publie ; les noms de secrets de la nouvelle chaîne sont **préfixés** (ex. `NEWCHAN_META_PAGE_TOKEN`) ; les identifiants de comptes ne sont jamais imprimés (dépôt public). **Aucun jeton de la Page Quran Words Daily** (`META_PAGE_TOKEN`, `META_PAGE_TOKEN_5`, `TIKTOK_*`, `YOUTUBE_*`) ne doit exister dans le nouveau dépôt, ni être lu par lui.

Corvées récurrentes à prévoir (notées dans CLAUDE.md) : jeton de Page Meta (accès aux données, **90 jours**), refresh token TikTok (≈ 1 an), échéance du PAT, mot de passe changé = tout recoupé.

## 4. Plan d'extraction : options comparées

Contrainte absolue : **quran-reels ne change rien** tant que le propriétaire ne le décide pas (il publie chaque jour ; un changement
de `publishers/` sans le filet de tests de production = risque de reels manqués).

| Option | Comment | Avantages | Risques / coûts |
|---|---|---|---|
| **A. Copier-vendoriser** | Copier les fichiers choisis dans le nouveau dépôt (`src/<pkg>/publishers/…`), généraliser dans la copie ; garder l'origine dans un en-tête (`# vendored from quran-reels@<sha>`) et une page `VENDORED.md` | Zéro risque pour quran-reels ; zéro dépendance ; le nouveau dépôt évolue librement ; marche depuis un téléphone | **Dérive** : un correctif de production (ex. nouveau cas d'Instagram) doit être reporté à la main des deux côtés ; duplication |
| **B. Paquet Python sur une release GitHub (roue + hash) adopté plus tard** | Créer un dépôt `shortform-publish` (ou un sous-dossier), publier `pip install https://github.com/<user>/<repo>/releases/download/vX/xxx.whl` (sha256 épinglé dans `constraints.txt`) ; quran-reels l'adopte **plus tard, par PR du propriétaire** | Source unique ; compatible avec `PIP_CONSTRAINT` ; zéro compte PyPI ; les sessions voient les fichiers de release (téléchargeables même quand l'API GitHub est bloquée) | Il faut une 3ᵉ dépôt (création par le propriétaire) ; adoption par quran-reels = **chirurgie sur `publish.py`, `daily.py`, `themepub/run.py`** (fort couplage) ; versions à synchroniser ; chaque publication réelle devient un test de la bibliothèque |
| **C. Paquet PyPI** | Idem B mais sur PyPI | Installation simple ; versions sémantiques | Nom public, compte PyPI (jeton de publication), politique de confidentialité ; pas plus utile que B pour 2 consommateurs ; les noms de secrets/identifiants ne doivent pas fuir |
| **D. Sous-module git** | `git submodule add` du dépôt partagé | Source unique, sans registre | **Mauvais ici** : `actions/checkout` sans `submodules: recursive` oublie ; le propriétaire (téléphone) ne gère pas les mises à jour de sous-module ; accès restreint des sessions (écriture dans 2 dépôts) ; PR en deux temps |
| **E. Monorepo** | Un seul dépôt avec `packages/` | Changements atomiques | **Écarté** : toucherait quran-reels (production), mélangerait les groupes de concurrence, la branche `state`, les secrets, et les droits d'écriture des sessions ; les deux projets ont des cycles différents |

**Recommandation (étapes)** :

1. **Maintenant (pilote)** : **ne rien extraire.** La publication est hors pilote. Le nouveau dépôt contient seulement un dossier `publish/` vide avec l'**interface** (`Publisher`, `Post`, `PublishResult`/`PublishStatus`, état `published.json` sur la branche `state`, `save-state.sh` copié tel quel) pour que l'architecture la prévoie. Copier tout de suite : `save-state.sh` + son test, `gh_secrets.py`, `notify.py`/`Issues`, le squelette de workflows (concurrence, épinglage, ffmpeg statique), `constraints.txt` adapté, pages Pages (CGU/confidentialité) renommées. Tout est S et sans dépendance.
2. **Au moment de publier** (après validation du pilote) : **option A (vendoriser) en généralisant à la copie** : `Graph/meta`, `facebook`, `instagram`, `rights` (désactivable), `tiktok`, `youtube`, `Channel`. Écrire les tests à partir de `tests/test_publishers.py`, `test_youtube_upload.py`, `test_tiktok.py`, `test_rights.py` (copiés puis adaptés). La copie est le brouillon de la future bibliothèque : elle n'importe **jamais** `quran_reels`.
3. **Si deux consommateurs sont réels et stables** (décision du propriétaire, pas de la session) : promouvoir la copie en **option B** (roue publiée en release avec hash), puis proposer à quran-reels une **PR d'adoption** en trois temps : (i) remplacer l'import de `publishers/base.py`, `meta.py`, `rights.py` seulement, tests de production inchangés au vert ; (ii) idem `tiktok.py` + `gh_secrets.py` ; (iii) `youtube.py` + `Uploader` en dernier. Chaque PR attend ses checks (`tests.yml`) et un dry-run (`publish-test.yml` en mode `dry-run`) **avant** fusion, jamais de publication réelle pour un test ; adoption soumise à son « je valide » (touche la production).
4. **Ne pas extraire** : calendrier (`selector/calendar.py`) tant que la nouvelle chaîne n'a pas de calendrier ; si elle en a un, **copier le moteur** (A) puis généraliser ; `catalog/` jamais.

**Filet de non-régression pour quran-reels** (si adoption un jour) : `tests/` (10 300 lignes) est le filet, déjà sans réseau ; ajouter un « test de contrat » dans le paquet partagé (faux Graph/TikTok/YouTube), puis dans quran-reels un `publish-test.yml` en `dry-run` sur un passage connu (`93`) avant la fusion. **Un seul changement de comportement observable est interdit** : texte des erreurs (lu par `notify.py` et `publish.to_retry` — ex. la chaîne « laissé de côté », `ASIDE`), noms de champs de `publish.json`, `published.json`.

## 5. Ce qui est généralisable, couplage par couplage (liste de travail pour la copie)

1. `models.Reel` → `Post` : `video: Path`, `caption`, `hashtags`, `cover_ms | cover_image | cover_url`, `title`, `text_for(platform, max_hashtags)`, `for_platform(platform)` (variante signée TikTok). `reel.passage.key` (identifiant) → `post.key`.
2. `cfg.project["platforms"][name]` → un dataclass `PlatformSettings` (enabled, mode, caption limits, hashtag counts, retry, rights timeouts) lu d'un YAML du nouveau dépôt.
3. Constantes : `USER_AGENT`, `REPO`, `PAGE`, `SITE`, `GitHub.__init__` → paramètres/variables d'environnement `GITHUB_REPOSITORY`.
4. `PublishStatus`/`PublishResult` : déplacer tels quels ; garder `blocked`/`removed`.
5. Langue des messages d'erreur : les messages de `notify.py` sont en français ; les messages d'exception des publishers sont en anglais ; **garder les deux** (journaux en anglais, tickets pour le propriétaire en français).
6. `insights` : déplacer les formules de `metrics.py` dans un module sans `Config` ; garder `config/insights.yaml` (checkpoints, `max_usage`, `compare`).

## 6. Recommandations pour la nouvelle chaîne (issues de l'audit)

- **Mesurer les langues et les titres dès le début** : `trials` (avant/après à 48 h) et `dataset.json` plat ; l'« arabe d'abord » de la chaîne arabe vient des statistiques (74 % de vues d'un pays arabophone) ; à la nouvelle chaîne de trouver son propre ordre par les chiffres et jamais par principe.
- **Concevoir le JSON d'épisode pour la publication** : `title`, `description`, `hashtags`, `thumbnail`, `youtube.language`, `captions` (sous-titres exacts par langue), `audio_credits`, `ai_voice_disclosure` (ligne de la voix de synthèse déclarée dans chaque description, règle de quran-themes-demo : « voix déclarée »), `platforms` — les textes validés mot pour mot par le propriétaire (`validated: true` sur sa seule parole), publiés tels quels.
- **Prévoir une version courte par plateforme** (quran-reels a une `-cut.mp4` sur Facebook/Instagram/YouTube : « on y part en 4 à 8 s ») et la signature propre à TikTok.
- **Déclarer le contenu synthétique** : à vérifier dans la politique de YouTube pour des personnages animés + voix de synthèse (quran-reels met « non » pour les vidéos thématiques ; pas la même situation) ; ajouter la mention IA dans la description (déjà la règle de quran-themes-demo).
- **Plateformes dans l'ordre de risque** : YouTube (API ouverte, sans audit depuis le 2026-11-02), Facebook (Live, Reels API), Instagram (le plus fragile : conteneurs, budget, couverture), TikTok (brouillon seulement, à la main).
- **Alerte « créneau jamais tenté » dès le jour 1**, même sans calendrier élaboré.
- **Gardiens d'humain** : les commandes de publication réelle réservées au propriétaire (texte du CLAUDE.md « Seul le propriétaire »), `dry_run` par défaut, `publish-test` manuel.

## 7. Ce que je n'ai pas lu en détail (limites de l'audit)

`catalog/*` (survolé par la table des fichiers et la doc), `ondemand/*` (lu en tête de fichier), `images/*`, `sources/*` (non pertinent), le corps de `insights/classify.py`, `insights/youtube_detail.py`, `catalog/dashboard.py`. Les verdicts sur ces briques reposent sur la documentation du dépôt (CLAUDE.md, docs/insights.md, docs/catalog.md) et sur l'en-tête des modules. Les chiffres de budget Meta (≈ 200 appels/h), de seuils de « liste de qualité » et de politiques de YouTube/TikTok/Meta sont ceux **notés dans les docs du dépôt** à la date de novembre 2026 : à revérifier dans la documentation officielle avant de s'y appuyer.
