# « Le livre face à la science » : conception par subagents, synthèse

2026-11-22. Document de la session principale, pour validation par le propriétaire avant tout code.
Matériaux (`docs/design/`) : `brief.md`, `audit-themes.md`, `audit-reels.md`,
`proposal-A.md` (réutilisation maximale), `proposal-B.md` (contrats typés), `proposal-C.md` (automatisation d'abord),
`review-technique.md`, `review-science.md`, `review-plateformes.md`, `review-oss-cout.md`, `review-automatisation.md`.
Les deux dépôts existants n'ont pas été modifiés (vérifié à chaque étape : `git status --short` vide).

---

## 0. En bref

1. **10 subagents** : 2 audits, 3 architectes indépendants (A, B, C), 5 relecteurs contradictoires (technique, science,
   plateformes, open source et coût, automatisation) qui ont soulevé **128 objections** ; plus mes propres vérifications
   des affirmations décisives.
2. Les trois architectes sont arrivés **seuls** aux mêmes choix de fond : Remotion, zod comme source de vérité, un
   « shell » qui dessine badge/cartes/sous-titres par-dessus le style, rig tiré des bonshommes `Stick` de
   quran-themes-demo, Gemini 3.8 Flash TTS en 2 requêtes par épisode (dialogue à 2 voix + narrateur), narrateur-mascotte
   « عدسة » (une loupe), vérification Crossref + OpenAlex, validations liées à une empreinte, **sources sondées avant
   d'écrire le script**, pilote probablement ⚠️.
3. **Trois faits vérifiés que les trois architectes avaient manqués, et qui changent le cadre** (§3) :
   - YouTube : à partir du **1er février 2027**, une chaîne nouvelle n'entre au Programme Partenaire qu'avec **8 000 h**
     de visionnage sur 365 jours **ou 20 M de vues Shorts** sur 90 jours, et les heures des Shorts ne comptent pas :
     **une chaîne de Shorts seule ne sera pas monétisée sur YouTube**. Il faut du format long.
   - YouTube refuse de monétiser les chaînes qui « use AI-generated personas to deliver information on sensitive topics »
     (santé, droit, finances, politique) : un narrateur à voix de synthèse qui donne un conseil de bien-être est exposé.
     **Le pilote proposé (émotions) est le sujet le plus exposé.**
   - Meta exige l'étiquette IA pour un son réaliste généré ; l'API Instagram a un champ `is_ai_generated` depuis le
     2026-06-22. (Fait voisin : quran-reels publie des vidéos narrées par Gemini sans cette étiquette, §9.)
4. **L'architecture retenue** (§4) prend le modèle de données de B, la discipline de pipeline de A, l'exploitation de C,
   et corrige 9 défauts communs relevés par les relecteurs (validations qui se périment seules, texte arabe/anglais
   inversé en typographie animée, Rhubarb non déterministe, prises de voix dans Git…).
5. **Contradictions franches avec le brief** (chacune est une question pour toi, §10) : sources sondées avant le script ;
   un style maison en production plutôt qu'une rotation tirée au sort ; un pilote hors santé mentale ou un narrateur à
   voix humaine ; du format long pour YouTube ; 3 épisodes par semaine au lancement, pas 1 par jour.

---

## 1. Méthode

| Phase | Qui | Sortie |
|---|---|---|
| Audit | 2 subagents (Sonnet), lecture seule | `audit-themes.md`, `audit-reels.md` |
| Conception | 3 subagents (Opus), chacun seul, avec un accent différent : A réutilisation et pilote rapide ; B extensibilité typée ; C automatisation et variation | `proposal-A/B/C.md` (~900 lignes chacune) |
| Revue contradictoire | 5 subagents neufs, un angle chacun, consigne « trouver les failles » ; ils ont vérifié eux-mêmes (API GitHub, Crossref, OpenAlex, pages officielles, essais de zod, Rhubarb, rendu Remotion) | 5 revues, ~125 objections |
| Synthèse | la session ; affirmations décisives revérifiées à la main (seuils YouTube 2027, politique « AI personas », `is_ai_generated` d'Instagram, origine des commentaires GitHub) | ce document |

---

## 2. Audit des deux dépôts : ce qui se réutilise

### 2.1 quran-themes-demo (vidéos Remotion, voix, personnages)

| Brique | Verdict | Ce qu'on en fait |
|---|---|---|
| Bonshommes `Stick` (`video/src/trial/Sahib.tsx`) : membres à 2 segments, cinématique inverse `reach()`, contour à double trait, 12 visages ; `mix`/`walk`/`POSES` (`Lens.tsx`) | **extraire et généraliser** | base du rig ; on ajoute bouche paramétrique (visèmes), clignement, sourcils, tête 1,6× plus grande |
| Bouche au volume (`video/src/characters/Character.tsx`) | patron | moteur de synchro « volume », calculé hors ligne |
| Interface `StyleKit` de l'ancien circuit (`video/src/styles/kit.ts`) + « ce qui ne change jamais » | patron | contrat de style + couche commune |
| Scènes `*Played` chorégraphiées à la main en TSX | **rien** | c'est la dette à éviter |
| Client Gemini (`tools/tts/gemini.py`) : mono-locuteur, garde-fous de quota | extraire, réécrire le corps (le multi-locuteurs est un objet `speakers`, pas la liste actuelle) | client de voix |
| Alignement Whisper (`tools/audio/align.py`, `listen.py`) + ses 3 correctifs payés cher | **extraire** (langue en paramètre) | minutage des répliques et des mots |
| Nivelage −16 LUFS (`build.py`), `check.py` (planches), `splice.py`, `sfx.py`, ambiances CC0 | extraire | son, contrôle, correction d'un rendu |
| `film.yml` (préparation → rendu → release brouillon, `from_run`) | squelette (~150 lignes sur 584) | `render.yml` |
| Registre « une citation n'existe que par son id », test « copie et casse une chose » | patron | registre des études, règles |
| Contenu, schémas, `rules.py` (849 lignes propres au Coran) | rien | — |

### 2.2 quran-reels (pipeline Python, publication en production)

| Brique | Verdict | Quand |
|---|---|---|
| `publishers/` (Meta, Instagram, TikTok, YouTube) : couplage faible, 6 champs lus du `Reel` | extraire et généraliser derrière un `Post` | à la publication, après le pilote |
| `save-state.sh` + test, `gh_secrets.py`, `Issues` de `notify.py` | **tel quel** | dès le pilote (`save-state.sh`) |
| `level`/`loudness` (un seul gain, limiteur), options d'encodage Instagram | tel quel | pilote |
| `bidi.py`, pages Pages (confidentialité, CGU, connexions TikTok/YouTube) | tel quel après renommage | publication |
| Patrons de workflows : `constraints.txt`, ffmpeg statique sans apt, runners épinglés, secrets par étape, cache `if: always()` | patron | pilote |
| `themepub/` (contenu produit ailleurs, publié depuis une release) | patron | publication |
| Rendu Chromium, sources coraniques, récitateurs, catalogue | rien | — |

### 2.3 Plan d'extraction sans casser quran-reels

1. **Pilote : rien n'est extrait.** On copie avec l'origine (`# vendored from <dépôt>@<sha>:<chemin>`, liste dans
   `VENDORED.md`). quran-reels et quran-themes-demo ne changent pas.
2. **Publication** : copie généralisée des publishers dans le nouveau dépôt, derrière une interface `Post` à 6 champs,
   avec leurs tests à faux Graph/TikTok/YouTube copiés.
3. **Seulement si tu le décides**, quand deux dépôts utilisent la même brique depuis deux mois sans dérive : la promouvoir
   en paquet (roue Python ou archive npm attachée à une release, empreinte épinglée), puis l'adopter dans quran-reels **par
   trois PR** (base + Meta + droits ; TikTok + secrets ; YouTube), chacune verte sur ses 10 300 lignes de tests et un
   `publish-test` à blanc, jamais une publication réelle pour tester ; aucun texte d'erreur ni champ d'état modifié.
4. Écartés : sous-module git (le téléphone ne gère pas ses mises à jour, `checkout` l'oublie), monorepo (toucherait la
   production, mélangerait états, secrets et groupes de concurrence), PyPI (rien de plus qu'une release, un compte de plus).

---

## 3. Trois faits qui changent le cadre (vérifiés par la session le 2026-11-22)

| Fait | Source lue | Conséquence |
|---|---|---|
| **Seuils YouTube au 2027-02-01** : « New creators applying for YPP will need 8,000 qualified watch hours in the last 365 days, or 20 million qualified Shorts views in the last 90 days » ; les publicités des Shorts réservées aux chaînes à ≥ 10 M de vues Shorts sur 90 jours ; aujourd'hui déjà, « watch hours from Shorts views in the Shorts Feed won't count » | blog.youtube (2026-08-10), support.google.com/youtube/answer/72851 | les Shorts servent à la découverte ; **la monétisation YouTube passe par du format long** (16:9, plusieurs minutes). Le contrat prévoit le 16:9 dès le pilote ; la forme du format long est ta décision (§10) |
| **« AI Personas Related to Sensitive Topics »** : « channels that use AI-generated personas to deliver information on sensitive topics… health, legal issues, finances, or politics » ; exemple : « An AI "doctor" providing … health advice, or wellness remedies » | support.google.com/youtube/answer/1311392 | un narrateur à voix Gemini qui conseille sur les émotions est exposé, mascotte ou pas (A pensait la loupe protégée : elle ne l'est pas). Parades : pilote hors santé, « à retenir » attribué à l'étude et non conseillé, ou **narrateur à voix humaine** |
| **Étiquette IA de Meta** : son réaliste généré à déclarer ; « Content Publishing API now supports self-disclosure of AI-generated content at publish time… `is_ai_generated` » | developers.facebook.com, changelog Instagram Platform | `ai_voice: true` dans la fiche de publication ; Instagram `is_ai_generated=true` ; TikTok coché à la main sur le brouillon ; YouTube : ligne « voix générée par IA » (animation non réaliste : pas de déclaration exigée) |

Deux autres faits vérifiés par les relecteurs, qui pèsent sur le coût :
- **Piège de facturation Google** : l'API Gemini devient payante dès que son projet Cloud a un compte de facturation actif
  (conditions du 2026-03-23 ; prix TTS doublés au 2027-01-01). La clé Gemini doit vivre dans un projet `voice` qui
  n'aura **jamais** de facturation, séparé du projet YouTube.
- **L'abonnement Claude** est le vrai coût de la production (écriture, contradiction, revérification), partagé avec tes
  deux autres dépôts ; personne ne l'avait chiffré. Le pilote le mesure.

---

## 4. L'architecture retenue

### 4.1 Le dépôt

`book-vs-science` (nom neutre : il survit à un changement de nom de chaîne), CLI `bvs`. Deux langages, frontière nette :
**TypeScript** pour tout ce qui partage les types (schéma, règles, sources, pipeline, rendu) ; **Python** seulement pour
l'audio, déjà éprouvé (Whisper, niveau, synchro, F0, bruitages, planches).

```
book-vs-science/
├── README.md  LICENSE (MIT)  LICENSES/  REUSE.toml  LIMITES.md  VENDORED.md  CLAUDE.md
├── packages/                  npm workspaces, rien publié sur npm ; zod 4.6.7 exact (celui de Remotion 4.0.541)
│   ├── schema/    episode, lang, source, book, cast, timeline, approval, post ; JSON Schema émis (io: input / output)
│   ├── core/      pur TS sans React : JSON canonique, empreintes de décision, suites bidi, chiffres, variation, statut
│   ├── rules/     une règle = un fichier + son test « copie et casse une chose »
│   ├── sources/   crossref, openalex, europepmc, match, verify, report
│   ├── voice/     plan (≤ 2 locuteurs, adressage par réplique), gemini, ledger (quota)
│   ├── pipeline/  bin `bvs`, une étape = un fichier ; n'importe jamais de .tsx
│   ├── rig/       squelette, IK, visage (émotions, visèmes paramétriques), gestures/<id>.ts, props/<id>.tsx, Sheet
│   └── video/     Remotion : Root, EpisodeVideo (le shell), chrome/ (Badge, StudyCard, BookCard, Subtitles, Signature,
│                  Disclaimer), formats (zones sûres par plateforme), fonts
├── styles/<id>/        style.json (métadonnées lues par le pipeline) + index.tsx (dessin) ; cartoon, kinetic, split, _template
├── characters/<id>/    character.json + parts.tsx : nour, karim, adasa
├── languages/<code>/   language.json : débit, polices, lexiques (causalité, généralisations), lettres → visèmes
├── py/bvs_audio/       align, level, lipsync (rhubarb, text, volume), f0, sfx, qc
├── content/
│   ├── books/<slug>.json      titre, auteur, année, ISBN, titres publiés en arabe ; aucun champ image
│   ├── sources/<id>.json      DOI, déclaré, type, n/k, effet, limites ; jamais de résumé d'éditeur
│   ├── ideas/backlog.json     idées sondées (méta-analyse trouvée ou non)
│   └── episodes/<id>/         episode.json (structure, aucune phrase) · lang/ar-EG.json · lang/en.json
├── review/<id>/               script.md, sources.md : générés, lisibles au téléphone
├── .github/workflows/         validate, sources, voice, render ; scripts/save-state.sh (copié tel quel)
└── .claude/skills/            write-episode, challenge-episode, verify-sources, voice-takes, render-check
```

Trois lieux de données, jamais mêlés : **`main`** = ce qu'un humain écrit ou valide (par PR) ; **branche `state`** = ce que
la machine décide et constate (grand livre du quota, registre de variation, index des prises, statut, preuves de
vérification), écrit par `save-state.sh` ; **releases** = le lourd, adressé par empreinte (prises `takes-AAAA-MM`, une
par mois pour rester sous 1 000 fichiers ; rendus `ep-<id>-candidate`).

### 4.2 Le modèle de données

- **`episode.json` = la structure seule** (de B) : hooks, scènes, répliques (locuteur, émotion, intensité, geste, regard,
  direction de voix), idée du livre, preuves, verdict, à retenir, variation imposée. Aucune phrase : chaque nœud porteur
  de texte a une clé (`hook.h2`, `s1.l4`, `verdict.why`…).
- **`lang/<code>.json` = les textes**, par clé. L'égyptien est la langue source ; une traduction porte l'empreinte du
  texte source qu'elle traduit (`of`, de C) : une phrase source changée rend la traduction « périmée », visible et
  bloquante pour cette langue seulement. Ajouter le français = un fichier ; la validation égyptienne ne bouge pas.
- **Registre des études** (`content/sources/`), cité par identifiant (le patron « une citation n'existe que par son id »
  de quran-themes-demo). La carte d'étude à l'écran est composée depuis le registre vérifié, jamais saisie.
- **Validations** `script` (par langue) et `sources` : `{on, words (tes mots recopiés), scope, hash}`. Le `hash` est celui
  d'une **projection de décision** (correction des relecteurs technique et automatisation) : DOI, titre/auteurs/année/type
  normalisés, statut de rétractation et avis, empreinte du résumé normalisé, phrases d'appui, verdict, textes. **Jamais**
  dates, compteurs de citations, octets bruts : une revérification qui ne change rien de décisif ne périme rien ; une qui
  change quelque chose de décisif périme la validation **et** ouvre une alerte.
- zod en mode strict partout ; JSON Schema émis en `io: "input"` pour les fichiers écrits à la main et `"output"` pour les
  fichiers produits ; **une seule source de règles** (`packages/rules`), aucune règle cachée dans un `superRefine` que
  Python ne verrait pas.

### 4.3 Le pipeline

| # | Étape | Commande | Où | Porte |
|---|---|---|---|---|
| 0 | Idée sondée : une idée n'entre en écriture que si ≥ 1 méta-analyse ou revue vérifiée existe | `bvs idea probe <slug>` | session | — |
| 1 | Script : un subagent écrit (5 hooks de types différents, scène, idée, verdict, à retenir), un autre le contredit | `bvs new`, `bvs check` | session | — |
| 2 | Sources : vérification complète + relecteur qui revérifie chaque DOI **à l'aveugle** (sans voir l'affirmation) | `bvs sources verify` | session ou Actions | — |
| 3 | **Une page par épisode** (script + dossier de sources + durée estimée), deux choix nommés : sources, puis script | `bvs review` | toi | **P1 sources, P2 script** |
| 4 | Voix : plan de requêtes, grand livre, prises adressées par réplique | `bvs voice plan / take` | Actions `voice.yml` (secret) | — |
| 5 | Alignement, séparation des locuteurs, niveau −16 LUFS | `bvs align`, `bvs level` | Actions | **P3 voix** (écoute ; pilote et premiers épisodes) |
| 6 | Synchro labiale | `bvs lipsync` | Actions | — |
| 7 | Minutage + verrou de variation | `bvs timeline` | Actions | — |
| 8 | Rendu (un job, styles à la suite) + copie Instagram sans edit list | `bvs render` | Actions `render.yml` | — |
| 9 | Contrôle : planches de 16 images, image statique, bandes immobiles, zones sûres, sens du texte | `bvs qc` | Actions + session | **P4 vidéo** |

Écart assumé avec l'ordre du brief (idée → script → sources) : **les preuves sont sondées avant d'écrire**, sinon on écrit
un verdict puis on cherche ce qui l'arrange ; et les deux validations précèdent la voix, pour ne pas dépenser de requêtes
sur un verdict qui changera. Les deux validations humaines du brief restent, sur une seule page.

**Idempotence** : chaque étape range sa sortie sous l'empreinte de ses entrées (fichiers, paramètres, versions des outils :
Node, Remotion, navigateur, polices, Rhubarb, révision du modèle Whisper, modèle de voix). Même empreinte → rien n'est
refait, et la commande le dit. Ce qui coûte ou prouve (prises, preuves) n'est jamais refait en silence : une prise validée
perdue **bloque**, elle n'est pas redemandée.

**Comment tu valides, depuis le téléphone** : dans la conversation, une question à choix qui nomme l'épisode et
l'empreinte courte (« Je valide les sources de `<id>` (a1b2c3) ») ; la session inscrit tes mots. En production, sans
session : un commentaire `/valide sources a1b2c3` de toi sur le ticket de l'épisode. Un workflow l'accepte seulement si
l'auteur est toi, si l'empreinte est la courante **et si `performed_via_github_app` est vide**. J'ai vérifié sur le ticket
#39 de quran-reels : tes `/apercu` et `/publier` y ont ce champ vide, le commentaire d'une session y vaut `claude`. C'est
la première preuve technique qu'une validation vient de toi. Les deux dépôts existants ne s'en servent pas encore.

**Ce qui bloque le rendu final** : schéma ou règle en erreur ; validation absente ou périmée ; une source non vérifiée ;
une réplique sans prise ou mal entendue ; une piste de bouche manquante ; une traduction périmée pour la langue rendue. Le
brouillon (`--draft`) passe sans tout cela, avec un filigrane « مسودة · DRAFT », et la publication refusera tout brouillon.

### 4.4 Vérification des sources

Pour chaque DOI cité :
1. DOI normalisé ; **Crossref** `/works/{doi}` (User-Agent générique, aucune adresse personnelle) ; 404 → bloque.
2. **OpenAlex** `/works/doi:{doi}` : lecture par DOI gratuite, sans clé (mesuré : coût 0 $) ; second avis, `is_retracted`,
   type. La recherche OpenAlex, elle, demande une clé : seulement si tu l'acceptes (§10).
3. **Titre** : normalisé (balises, accents, ponctuation), comparé à tous les titres candidats ; ≥ 0,92 concorde, 0,80-0,92
   à revoir (bloque), < 0,80 bloque.
4. **Premier auteur** identique, ≥ 75 % des autres présents ; **année** à ± 1 d'une des dates (`issued`, en ligne,
   imprimée, OpenAlex : cas réels Aldao 2009/2010, Lally 2009/2010).
5. **Type** : un niveau déclaré au-dessus du niveau détecté (méta-analyse déclarée pour une étude unique) bloque ;
   prépublication jamais seule pour un ✅/❌.
6. **Rétractation, retrait, avis d'inquiétude** (`updated-by` de Crossref, données Retraction Watch ; vérifié sur
   Wakefield 1998) → bloque ; **correction, erratum** → à lire et noter avant de passer (Mauss 2011 en a une).
7. **Phrase d'appui** : chaque affirmation pointe une phrase retrouvée mot pour mot (tirets et guillemets normalisés) dans
   le résumé, cherché chez OpenAlex, Crossref puis Europe PMC. Sans résumé lisible (les deux méta-analyses Elsevier du
   pilote n'en ont ni chez OpenAlex ni chez Crossref) : le relecteur lit une copie libre ; **une source dont personne ne
   peut lire le passage ne porte pas le verdict**, et on ne te demande jamais de lire un article payant au téléphone.
8. **On ne garde aucun résumé d'éditeur** (droits) : seulement son empreinte et la phrase d'appui courte.
9. **Plafond de confiance calculé**, que l'auteur peut baisser, jamais dépasser ; **✅ ou ❌ en confiance faible est
   refusé** (on dit ⚠️) ; corrélation → verbes causaux refusés (lexique égyptien) ; tailles d'effet mises en mots par
   la couche commune (petit / moyen / grand), jamais par le texte libre ; population écrite sous la carte d'étude.
10. **Après publication** : revérification hebdomadaire des sources des épisodes publiés ; une rétractation ouvre un
    ticket avec une question à choix préparée (commentaire épinglé, description corrigée, vidéo retirée, épisode refait).

**Ce que la revue science ajoute** (les trois propositions laissaient passer ces cas, testés sur de vrais DOI) :
11. **Les avis ne passent jamais pour l'article** : le DOI de la correction de Mauss 2011 (`10.1037/a0024986`) a le même
    titre, le même premier auteur, la même année et le type `journal-article` ; il passait les trois algorithmes (vérifié
    par la session). Refus si Crossref `update-to` n'est pas vide, si OpenAlex dit `erratum`/`retraction`/`editorial`/
    `letter`, ou si le titre commence par « Correction », « Erratum », « Reply to »… ; test sur 3 DOI réels.
12. **Contre la sélection d'études** : un **agent « contre-preuve »** dont la seule tâche est de trouver ce qui contredit
    le verdict ; un **protocole de recherche tracé** dans le rapport (requêtes, bases, date ; « meta-analysis »,
    « replication », « culture », articles qui citent la source avec « replication » ou « comment » dans le titre) ; une
    section « cherché, pas trouvé » ; une liste `contested.yaml` des effets connus pour leurs échecs de réplication
    (épuisement de la volonté, power posing, amorçage social…). Cas réel : la méta-analyse Hagger 2010 (épuisement de la
    volonté) passe toutes les vérifications et autoriserait « ✅ confiance haute », alors que deux réplications à 23 et 36
    laboratoires l'ont renversée.
13. **La phrase d'appui doit être un résultat** : chaque phrase du résumé reçoit son rôle (contexte, but, méthode,
    résultat, conclusion) ; seuls résultat et conclusion comptent ; phrase entière ; la condition (population, modérateur)
    doit y être. Cas réel : Kohl 2012 contient « acceptance strategies were superior… for negative affect » (ce que
    d'autres avaient rapporté), alors que sa méta-analyse ne trouve **aucune différence** sur l'affect négatif. Le
    relecteur aveugle lit le résumé entier.
14. **Les champs déclarés sont gelés avant toute requête** (titre, premier auteur, année, revue, recopiés de la source de
    l'affirmation) : sinon le contrôle d'identité est tautologique. Mesure du relecteur : 3 DOI sur 15 tapés de mémoire
    étaient faux, dont 2 menaient à un vrai autre article de la même revue et de la même année. **Le plan d'étude est fixé
    par le relecteur**, pas par l'écrivain ; un claim causal exige que son exposition ait été manipulée.
15. **Une grille écrite du badge** (`docs/verdict.md`) : l'idée du livre traduite en affirmations testables (qui, quoi,
    comparé à quoi, mesuré comment) ; certitude façon GRADE (plan, biais, incohérence, applicabilité au public égyptien,
    imprécision, biais de publication, réplication) ; plafond par type de claim (une méta-analyse de corrélations ne fonde
    pas une causalité) ; réplications multi-laboratoires au rang le plus haut ; table certitude × direction → badge.
16. **« À retenir » rattaché à une preuve** capable de causalité pour cette action, sinon « ممكن يساعد / جرّب » marqué
    suggestion à faible risque ; actions interdites (arrêter un traitement, « vider son sac », auto-diagnostic : Bushman
    2002 montre que se défouler augmente la colère). **Hook ≤ verdict** (un hook n'affirme pas plus que le verdict) et
    **dénouement ≤ verdict** (une scène ne finit pas en guérison sur un ⚠️). **Applicabilité** : sans échantillon du
    Moyen-Orient, la phrase « معظم الدراسات من أمريكا وأوروبا » est obligatoire. Mots d'intensité selon la mesure
    (« ارتباط » pour une corrélation, jamais « أثر »). Une nuance dite, les autres sur la page des preuves de l'épisode.
17. **Ce que dit le livre se vérifie** : `basis.url` obligatoire quand l'auteur a publié le passage (vrai pour le pilote :
    extrait du livre sur le site de Mark Manson, 2016), et la règle des 8 mots s'applique à ce texte.
18. **Page publique « تصحيحات »** pour nos propres erreurs, et un champ `corrections[]` par épisode.
19. **Hommes/femmes, règle symétrique** : toute affirmation de différence **ou** de ressemblance donne taille d'effet et
    recouvrement ; la position contraire principale est obligatoire au dossier (Del Giudice 2012, Carothers & Reis 2013
    face à Hyde 2005, Zell 2015) ; la scène joue les deux sens du cliché. **Santé mentale** : étiquette calculée par
    lexique (tout sujet d'émotions par défaut), phrase d'orientation **dans la vidéo** avec un critère (« لو مكمّل أسابيع
    ومأثر على حياتك، كلّم متخصص »), sujets exclus du format court (suicide, automutilation, troubles alimentaires,
    médicaments, traumatismes).

**Franchement** : ta validation des sources porte sur la présentation du dossier et la formulation du verdict. Le fond
est tenu par le relecteur aveugle et l'agent contre-preuve, avec leurs désaccords visibles sur la page ; tu ne peux pas
relire 20 études au téléphone chaque semaine, et personne ne te le demandera.

### 4.5 La voix

- **Gemini 3.8 Flash TTS** sur le compte Google de la chaîne (ta décision), **projet `voice` sans facturation, jamais**.
  L'égyptien est dans la liste du modèle ; **2 locuteurs au plus par requête** ; une émotion par réplique
  (`speech_metadata.style`) ; balises `<sigh>`, `<laugh>`, `<long pause>`.
- **2 requêtes par épisode** : R1 = Nour + Karim (une `<long pause>` entre les tours), R2 = le narrateur. Les 5 hooks sont
  tous dits dans ces requêtes : aucun surcoût.
- **Séparation des locuteurs d'une prise à deux voix** (aucun minutage par réplique dans la réponse de l'API) : silences,
  hauteur de voix (F0) en deux classes, **nombre de tours détectés = nombre de répliques, sinon refus** ; Whisper seulement
  pour recaler. Deux voix trop proches : une requête par personnage (+1).
- **Prises adressées par réplique** : corriger une virgule refait une requête des seules répliques changées, raccordées
  (patron `splice.py`), pas toute la scène.
- **Grand livre du quota** sur `state`, chaque requête inscrite *avant* l'envoi ; plafond 7/jour + réserve 3 ; un seul
  groupe de concurrence `voice` (`queue: max`). Les limites gratuites des modèles TTS ne sont **pas publiées** : le chiffre
  de 10/jour vient de quran-themes-demo, à confirmer sur la console du projet.
- **Le modèle est épinglé** ; un changement de modèle (2.5 → 3.1 → 3.8 en un an) change le timbre des personnages : c'est
  un **re-casting**, ta décision, jamais deux modèles dans un même épisode.
- **Casting à l'oreille** : 2 couples de voix pour Nour et Karim, 2 narrateurs. Avis unanime des trois architectes : ne
  pas reprendre `Algieba` (la voix de tes vidéos coraniques) pour cette chaîne. Tu tranches à l'écoute.
- **Replis** : attendre (réserve d'épisodes prêts) ; une voix par requête ; scènes **mimées** (bulles, sans voix ni
  synchro : STICK TO IT a fait 2,6 M de vues sans un mot) ; voix humaine. **Écartés** : Chatterbox et Supertonic (ton
  oreille, 2026-11-11), XTTS, F5, Fish, MMS, OmniVoice/VoiceTut (poids non commerciaux), Azure (carte bancaire exigée),
  Flash-Lite (seulement si tu dis oui : est-ce « multiplier un quota » ?).
- **La qualité ne suffit pas si** : tu entends de la fousha ou un accent non égyptien ; tu ne distingues pas Nour de Karim
  les yeux fermés ; tu ne reconnais pas l'émotion de 2 répliques sur 3 écoutées sans le script. La transcription
  automatique ne juge pas une voix (leçon de quran-themes-demo).

### 4.6 La synchro labiale

Trois moteurs, une seule sortie (`MouthTrack` : formes A-H, X par image) :
1. **Rhubarb 1.13.0** `-r phonetic`, **`--threads 1`** (essai du relecteur : 3 sorties différentes en multi-fil, identiques
   avec un fil, 5,6 s pour 64 s d'audio), repos forcé dans les silences, F (lèvres arrondies) ramené à C hors des mots qui
   ont « و ». Sur deux prises égyptiennes réelles, sa sortie brute était peu plausible (« aa » 3 % des images,
   lèvres arrondies jusqu'à 20 %, bouche ouverte dans la moitié des longues pauses).
2. **Texte → visèmes** : on connaît le texte et le temps de chaque mot ; chaque lettre a sa forme (ب م → fermée, ف → G,
   و → F, ا → grande ouverture…), modulée par le volume réel (l'égyptien écrit ne note pas les voyelles brèves).
3. **Volume** (repli demandé) : 4 niveaux, hystérésis, calculé en Python, pas dans le navigateur.

Choix : mesures automatiques (fermeture sur ب/م, repos dans les pauses, 4 à 12 changements par seconde) puis **ton œil, à
l'aveugle** : le même gros plan de 6 s dans les 3 moteurs, étiquettes cachées. Mon pronostic : 2 gagne, mais on mesure.

### 4.7 Les personnages

- **Nour** et **Karim** : amis et collègues trentenaires du Caire, **ni couple ni frère et sœur** (pour que le sujet
  hommes/femmes ne devienne pas un sketch de couple) ; **le narrateur « عدسة » (Adasa)**, une loupe à yeux et à bras :
  pas d'« expert en blouse », pas de genre à choisir, le symbole de la vérification. Les trois architectes l'ont proposée
  chacun de leur côté.
- **Rig SVG** : squelette, IK et poses de `Stick` ; tête 1,6× plus grande (sinon la bouche ne se lit pas à 1080 px) ;
  bouche **paramétrique** (ouverture, largeur, arrondi, dents, langue) × coins d'émotion : 9 visèmes × 12 émotions sans
  108 dessins ; clignement déterministe ; sourcils et posture par émotion ; celui qui écoute regarde, cligne, hoche.
- **Dessinés en code par la session, jamais générés par IA**, validés **une fois** par toi sur une planche (émotions ×
  visèmes, poses, tenues).
- **Accessoires et effets** dans un registre extensible (un fichier chacun, ses paramètres en zod), actions
  `prop {id, state}` et `fx {id, params}` ancrées sur un **mot** ; une soupape typée `custom` vers un composant relu,
  **au plus 1 par épisode** (les 3 shorts de `Sahib.tsx` ont demandé 23 accessoires : un vocabulaire fermé ne suffira pas).
- **Aucune personne réelle** : le narrateur dit « الكتاب بيقول », jamais « مانسون بيقول » ; le nom de l'auteur n'existe
  que sur la carte du livre ; personne ne tient le livre pendant qu'il est nommé (on y verrait l'auteur) ; le livre
  dessiné n'a jamais les couleurs de sa couverture.

### 4.8 Les styles et la couche commune

```ts
export interface StyleModule<P> {
  id: string; version: number; aspects: readonly ("9x16" | "16x9")[];
  params: z.ZodType<P>;                          // ce que la variation peut tirer dans ce style
  Background: React.FC<StyleProps<P>>;
  parts: { [K in "hook" | "scene" | "book" | "verdict" | "takeaway"]: React.FC<PartProps<K, P>> };
  Transition?: React.FC<TransitionProps<P>>;
  chromeTheme: ChromeTheme;                      // trait, grain, police dans une liste fermée
}
```

- Un style lit la **timeline résolue** (images, répliques minutées, pistes de bouche), jamais l'épisode brut. Ses
  métadonnées vivent dans `style.json` (le pipeline Node ne peut pas importer de `.tsx` : essai du relecteur).
- **La couche commune** (le « chrome ») est posée **après** le style, qui ne peut ni la masquer ni la déplacer : badge,
  carte d'étude, carte du livre, sous-titres, signature, avertissement « مش نصيحة طبية ». Le style ne lui donne qu'un thème
  (trait, grain) pour que le tableau blanc ou le papier découpé ne jurent pas.
- **Géométrie fixée par les plateformes** : badge toujours au centre-haut (jamais sous la légende des Reels) ; carte
  d'étude au-dessus de y = 1 250 ; sous-titres **centrés**, ≤ 800 px de large, bande y = 1 050-1 450 (la colonne de
  boutons à droite couvre ~110-160 px, où un sous-titre arabe aligné à droite commencerait) ; zone sûre asymétrique
  (droite 160) ; un test vérifie chaque boîte dans chaque format.
- **Texte bidirectionnel** : découper en suites bidi (algorithme Unicode, `bidi-js`, MIT) **avant** de découper en mots
  (essai du relecteur : animer chaque mot inversait le titre « The Subtle Art of Not » en « Not of Art Subtle The ») ;
  test d'image fixe en CI sur une ligne mêlée arabe + titre anglais + année.
- **Les 3 styles du pilote** : `cartoon` (décor SVG, rigs, caméra lente continue) ; `kinetic` (typographie animée,
  médaillons qui parlent) ; `split` « Livre vs Science » (la science **en haut**, rien d'utile sous y = 1 500, petits rigs
  mimés car une tête de 40 px ne se lit pas). Futurs : tableau blanc (peau « encre » du rig, tracé révélé), infographie
  (forêt d'effets tirée du registre), papier découpé (peau « papier », parallaxe) : un dossier `styles/<id>/` chacun, aucun
  script touché.
- **16:9** : le format est un paramètre ; la CI rend une image fixe 16:9 de chaque style pour que le contrat reste tenu.

### 4.9 Rendu et contrôle

- Mesuré par le relecteur technique (Remotion 4.0.541, Chromium préinstallé, 1080×1920) : **32 images/s** pour un décor et
  deux rigs, 19 avec ombres portées. Un épisode de 50 s ≈ 1 min ; les 3 styles ≈ 3-4 min avec l'installation, **dans un
  seul job**. Le rendu n'est pas le goulot ; le goulot est ta validation et le quota de voix.
- Contrôle : planches de 16 images (`check.py` repris), durée, −16 LUFS ± 1 et crête vraie ≤ −1 dBTP, **détecteur d'image
  statique** (seuil constaté par Facebook entre 0,44 et 2,90), bandes uniformes immobiles ≥ 100 px **de toute couleur**
  sur les quatre bords, encodage sans edit list (Instagram).

### 4.10 Droit d'auteur et sujets sensibles (vérifié par le code)

| Règle | Contrôle |
|---|---|
| Reformuler | aucune suite de 8 mots reprise d'une source connue de l'idée ; « الكتاب بيقول » + nos mots |
| Citation | au plus une, ≤ 12 mots, avec page ; le pilote n'en a pas |
| Pas de couverture | aucun champ image dans le schéma du livre ; carte typographique, livre générique sans ses couleurs |
| Pas de résumé par chapitre | une idée par épisode ; ≤ 3 épisodes par livre, jamais deux de suite ; avertissement si 3 épisodes suivent l'ordre des chapitres |
| Marques | un titre de livre n'entre jamais dans le nom de la chaîne, d'une série ou d'un logo (« MARS VENUS » est une marque déposée) |
| Hommes/femmes | sujet `gender` : ≥ 1 méta-analyse ; nuance obligatoire sur le recouvrement des distributions (« الفروق متوسطات، مش قاعدة لكل واحد ») ; généralisations (« الستات كلهم »…) seulement dans une réplique de personnage, contredite dans l'épisode ; le rôle de celui qui porte le cliché alterne entre Nour et Karim |
| Santé mentale | « مش نصيحة طبية » à l'écran et en description ; aucun diagnostic ni traitement ; l'« à retenir » dit ce que les participants de l'étude ont fait, attribué à l'étude |
| Chiffres | tout nombre dit ou écrit vient du registre ; 123 jamais ١٢٣ (ta règle des deux autres dépôts : à confirmer pour cette chaîne) |

### 4.11 Variation et « inauthentic content »

Ce que dit la politique (lue) : elle vise le contenu « made with a template with little to no variation », et cite mot pour
mot « characters put in the same situation over and over again with the same outcome ». Elle permet « a series following a
set of characters across episodes » si chaque vidéo a son histoire.

**Correction des trois propositions** : leurs moteurs tiraient au sort des palettes, des polices, des styles (jusqu'à 13
axes chez C). Les relecteurs plateformes et technique l'ont démonté : ça change la peau, pas l'histoire que vise YouTube ;
ça efface l'identité visuelle (« une page se reconnaît en une seconde à son image », tes propres mesures) ; ça rend toute
mesure impossible (avec 100 à 700 vues, seul un écart de 12 à 14 points dépasse le bruit) ; et des axes de structure tirés
**après** la voix rendent la narration incohérente.

Retenu :
- **Le récit varie, choisi à l'écriture** et contrôlé contre les derniers épisodes publiés : structure de scène (même moment
  rejoué deux fois, trois moments, dispute, avant/après, une seule scène), issue, qui a raison, lieu, relation ; la
  répartition ✅/⚠️/❌ suivie par le **choix des idées**, jamais par un quota sur le verdict.
- **La surface varie un peu, tirée de façon déterministe** au rendu (lumière, heure, tenues, cadrage après les 3 premières
  secondes, palette dans la charte du style), verrou sur `state`.
- **Les styles** : les 3 au pilote, comme demandé ; en production, **un style maison** que tu choisis après avoir vu les
  trois, et les autres en essais mesurés (un changement à la fois, comparé à 48 h, comme les `trials` de quran-reels).
  C'est une contradiction avec ton brief : question §10.
- Une page « méthode » publique qui nomme l'humain qui choisit et valide ; une réplique de point de vue par épisode.
- Musique : aucune au pilote (bruitages générés par code, ambiances CC0) ; musique générée par code plus tard en essai.

### 4.12 Production (après le pilote)

- **Cadence de lancement : 3 épisodes par semaine**, pas 1 par jour. À 1/jour : 20 à 35 min de ton temps chaque jour
  (script, sources, voix, vidéo), et le stock d'idées vérifiables s'épuise en quelques mois (≤ 3 épisodes par livre →
  ≥ 120 livres par an). Passage à 1/jour sur critère chiffré : ≥ 60 idées sondées en stock, 4 semaines sous 20 min/jour,
  moins d'une reprise de voix sur 3.
- File d'épisodes, statut calculé (jamais écrit), `advance` qui va jusqu'à la porte suivante dans un même run, réserve
  d'épisodes prêts avec alerte, deux déclencheurs indépendants (cron GitHub à minute impaire + tâche planifiée) : repris
  de C, corrigés. **Construit après le pilote**, pas avant.
- Une session « atelier » dédiée à ce dépôt, jamais celle du planificateur de quran-reels (ses tâches passent l'une après
  l'autre : un tour d'écriture retarderait la publication de 07:12).
- Un ticket « ⚠️ Atelier » unique qui réunit les alertes (quota épuisé 3 jours, rendu en échec, validation en attente
  depuis 48 h, voix qui dérive, rétractation), assigné et mentionné pour la notification sur ton téléphone.

### 4.13 Licences

- Code **MIT**. Remotion reste sous sa licence propre (« source-available », gratuit pour un particulier ou une
  structure de 3 personnes au plus, freelances compris, même monétisé et automatisé) : le README le dit. Remotion épinglé
  en 4.x ; la 5.0 se lira avant de monter.
- Contenu : **par chemin** (`REUSE.toml`) ; registre de sources et rapports (des faits, sans résumé) en CC BY 4.0 ;
  **scripts, prises, vidéos, personnages, nom et logo réservés**, parce qu'un CC BY (proposition A) permettrait à n'importe
  qui de monétiser un clone avec Nour, Karim et la loupe. Question §10.

### 4.14 Publication (hors pilote)

Publishers de quran-reels copiés derrière un `Post` à 6 champs ; une fiche `post.json` par plateforme : titre arabe d'abord
avec le **titre arabe publié du livre** (ce que les gens cherchent), étiquettes IA par plateforme, `selfDeclaredMadeForKids:
false` (des personnages dessinés peuvent être classés « pour enfants »), identifiant d'épisode dans la description, une page
« المصادر » par épisode (les DOI ne se lisent pas sur un téléphone ; Facebook limite à 400 caractères). Comptes neufs :
nouvelle app Meta (budget d'appels séparé de la Page coranique), nouvelle app TikTok, projet Google `platform` séparé de
`voice`. Aucun secret de Quran Words Daily dans ce dépôt.

---

## 5. Ce que la synthèse prend à chaque proposition

| De | Pris |
|---|---|
| **A** | frontière « Node valide et rend / Python fait le son » ; structure de scène choisie à l'écriture ; règles de droit d'auteur (8 mots, 12 mots, 3 épisodes par livre) ; détecteurs « image statique » et « bandes » ; plafond de confiance ; chaîne de résumés avec Europe PMC |
| **B** | modèle de données (structure sans texte + un fichier par langue) ; bouche paramétrique ; trois moteurs de synchro dont le mixte ; « الكتاب بيقول » ; `firstFrame` et hooks muets (`spokenBy: none`) ; contrat de style typé ; tests de zones sûres ; image fixe 16:9 en CI ; résumés jamais gardés |
| **C** | stockage adressé par empreinte en releases, `main` / `state` séparés ; grand livre du quota ; contrôle F0 ; empreinte qui inclut les versions des outils ; mode mimé ; hook `challenge` ; personnages et nom réservés ; page « méthode » ; Nour et Karim « ni couple » ; file et statut calculé (après le pilote) ; traductions périmées visibles (`of`) |

## 6. Alternatives écartées et pourquoi

| Alternative | Raison |
|---|---|
| Revideo ou Motion Canvas (MIT) au lieu de Remotion | tout ce qui est réutilisable est en Remotion ; Motion Canvas est à l'arrêt (dernière version stable en décembre 2024) ; le modèle à générateurs de Revideo sert la chorégraphie écrite à la main, l'inverse du besoin ; la licence de Remotion couvre un particulier qui monétise |
| Pipeline tout en Python (A) | les règles et le schéma vivraient en double (zod + JSON Schema lu par Python) ; deux validateurs qui ne disent pas la même chose (essai : 37 erreurs d'un côté, 0 de l'autre) |
| Pipeline tout en TypeScript (B) sans Python | perdrait l'alignement Whisper et ses correctifs, `level`, `check.py`, éprouvés |
| Textes dans la structure (`{arz, en, fr}` sur chaque feuille, A) | ajouter une langue réécrit chaque feuille et périme la validation égyptienne |
| Prises de voix commitées dans Git (A, B) | ~1 Go d'historique par an à 1 épisode/jour |
| Rotation tirée des styles, 13 axes de surface (A, B, C) | voir §4.11 |
| Validation par lot du dimanche (C) | 2-3 h d'un coup le matin de la revue ; un dimanche manqué = 7 jours sans épisode |
| Retrait de l'écoute de la voix et du regard sur la vidéo après 10 épisodes (C) | la dérive d'une voix ou une bouche décalée ne se voit qu'à l'œil et à l'oreille |
| PR ouverte par un workflow pour inscrire une validation (C) | un dépôt neuf l'interdit, et cette PR ne lancerait aucun check |
| Narrateur humain en blouse | figure d'« expert » visée par YouTube, genre à choisir, cliché |
| Azure, VoiceTut, Flash-Lite en secours automatique | carte bancaire ; poids non commerciaux ; ta règle sur les quotas |
| Semantic Scholar en repli de résumé (A) | licence d'API sans redistribution |
| Sortie de secours de Remotion construite d'avance (C) | interdit des fonctions de Remotion aux styles (images vides) ; coût sans usage ; la dépendance reste une limite écrite |
| 1 épisode par jour au lancement | §4.12 |

---

## 7. Les objections et leur sort

Légende : **R** = résolue (comment), **L** = acceptée comme limite (écrite dans LIMITES.md), **X** = rejetée (pourquoi).
Identifiants : T = technique, S = science, P = plateformes, O = open source et coût, A = automatisation.

### Technique (22)
| # | Objection | Sort |
|---|---|---|
| T1 | validation des sources périmée par une revérification sans changement de fond | **R** empreinte de projection de décision (§4.2) |
| T2 | typographie mot à mot qui inverse un titre anglais dans l'arabe | **R** suites bidi avant les mots, test d'image fixe (§4.8) |
| T3 | zod → JSON Schema → Python : champs par défaut obligatoires, règles perdues | **R** `io: input/output`, une seule source de règles, zod 4.6.7 exact |
| T4 | le pipeline Node ne peut pas importer les `.tsx` des styles (B) | **R** `style.json` lu par le pipeline |
| T5 | axes de structure tirés après la voix : narration incohérente | **R** structure choisie à l'écriture (§4.11) |
| T6 | séparer deux personnages dans une prise à deux voix | **R** pauses demandées, F0, compte des tours, sinon une requête par personnage (§4.5) |
| T7 | Rhubarb non déterministe ; sortie peu plausible en égyptien | **R** `--threads 1`, repos forcé ; **L** sa qualité en arabe, tranchée à l'aveugle (§4.6) |
| T8 | chorégraphie fermée : retour du TSX par scène | **R** registres d'accessoires et d'effets, ancrage sur un mot, soupape `custom` ≤ 1 par épisode |
| T9 | ajouter une langue périme la validation égyptienne (A) | **R** un fichier par langue (§4.2) |
| T10 | une virgule refait toute une prise | **R** prises adressées par réplique, raccord |
| T11 | prises dans Git | **R** releases mensuelles adressées par empreinte |
| T12 | recherche OpenAlex sans clé : 429 | **R** vérification par DOI sans clé ; recherche avec clé si tu l'acceptes, sinon Crossref `query` |
| T13 | plus d'écoute après 10 épisodes (C) | **R** porte voix gardée au pilote et aux premiers épisodes, puis 30 s d'écoute sur l'aperçu |
| T14 | décor tiré au sort contre le lieu écrit | **R** le lieu vient du script |
| T15 | estimations de rendu trop pessimistes | **R** un seul job, mesure au premier épisode |
| T16 | polices : latin en police système | **R** paires arabe + latin chargées depuis des fichiers, empreinte des polices |
| T17 | « Remotion exige zod 3 » faux ; `z.record` exhaustif | **R** zod 4.6.7, `partialRecord` |
| T18 | `z.object` non strict ; 4 types de hooks au lieu de 5 (C) | **R** strict partout, 5 types (ton brief) |
| T19 | interdire `remotion` dans les styles casse le chargement d'images | **R** pas d'interdiction ; **L** la dépendance à Remotion |
| T20 | le chrome fixe jure avec tableau blanc et papier | **R** thème de chrome par style |
| T21 | marques invisibles saisies au téléphone changent l'empreinte | **R** NFC, refus des caractères de format, diff lisible |
| T22 | phrase d'appui mot pour mot fragile | **R** normalisation des tirets et guillemets, comparaison au texte |

### Plateformes (26)
| # | Objection | Sort |
|---|---|---|
| P1 | Shorts non monétisables sur YouTube pour une chaîne nouvelle après le 2027-02-01 | **R** contrat 16:9 dès le pilote ; la forme du format long est **ta décision** (§10) |
| P2 | « AI personas » : narrateur synthétique + bien-être | **R** en partie (« à retenir » attribué à l'étude, « مش نصيحة طبية ») ; **ta décision** sur le pilote et la voix du narrateur (§10) |
| P3 | « same situation, same outcome » | **R** le récit varie à l'écriture (§4.11) |
| P4 | variation aléatoire contre tes mesures (style maison, un changement à la fois) | **R** style maison + essais mesurés, **ta décision** |
| P5 | étiquette IA de Meta | **R** `ai_voice` → `is_ai_generated`, TikTok à la main |
| P6 | 45-60 s n'est la bonne durée nulle part | **R** dans le schéma : segments marqués pour une coupe courte (Facebook/Instagram 30-40 s) et une longue (50-75 s) ; **L** le pilote rend la version 45-60 s que tu as demandée |
| P7 | la valeur (livre contre science) arrive à 15-30 s | **R** le conflit dans la première image (`firstFrame` obligatoire, ≤ 6 mots) ; scène qui commence au pic ; l'« à retenir » peut être le moment rejoué |
| P8 | écran partagé : la science sous l'interface | **R** science en haut, rien d'utile sous y = 1 500 |
| P9 | colonne de boutons à droite sur les sous-titres arabes | **R** sous-titres centrés ≤ 800 px, zone sûre droite 160 |
| P10 | badge et carte d'étude en bas (B) | **R** badge centre-haut, carte au-dessus de y = 1 250 |
| P11 | typographie animée = texte sur aplat, ce qui retient le moins chez toi | **R** gardée au pilote, puis essai mesuré |
| P12 | CC BY : clone monétisé légal | **R** contenu réservé par chemin, **ta décision** |
| P13 | noms de chaîne ambigus | **R** test auprès de quelques personnes de 3 pays, **ta décision** plus tard |
| P14 | ⚠️ veut dire « danger » ; badges illisibles aux daltoniens | **R** forme + couleur + un mot ; ⚠️ ou ⚖️ « مش بالظبط » : **ta décision** |
| P15 | carte d'étude en latin illisible en 1 s | **R** une ligne arabe d'abord (« تحليل لـ 40 دراسة · 2010 »), la référence en petit |
| P16 | légende Facebook ≤ 400 caractères, liens non cliquables | **R** page « المصادر » par épisode, DOI complets sur YouTube |
| P17 | risque « conçu pour les enfants » | **R** `selfDeclaredMadeForKids: false`, sujets et palette d'adultes |
| P18 | rythme quotidien = « production de masse » | **R** 3 par semaine au lancement, page méthode |
| P19 | 5 hooks de 5 types obligent à en écrire des faibles | **X** pour le pilote : c'est ton livrable ; **R** en production : 3 hooks, 2 types |
| P20 | cadrage large tiré au hook | **R** hook toujours en plan serré |
| P21 | le narrateur dit « مانسون بيقول » | **R** « الكتاب بيقول » |
| P22 | « bordures » de toute couleur | **R** détecteur sur toute bande uniforme immobile |
| P23 | couverture coupée par la grille 3:4 d'Instagram | **R** titre et visage dans y = 240-1 680, couverture fournie |
| P24 | musique et Content ID | **R** aucune musique tierce |
| P25 | marques déposées, couverture reconnaissable | **R** §4.10 |
| P26 | un personnage qui tient le livre passe pour l'auteur | **R** livre posé, personne ne le tient quand il est nommé |

### Open source et coût (22)
| # | Objection | Sort |
|---|---|---|
| O1 | Gemini payant si son projet a une facturation | **R** projet `voice` sans facturation, jamais |
| O2 | abonnement Claude non compté | **L** mesuré au pilote, rythme fixé dessus, Sonnet pour le mécanique |
| O3 | CC BY sur épisodes et personnages | **R** licences par chemin, **ta décision** |
| O4 | personnages en code MIT | **R** `REUSE.toml` : fichiers de personnages et décors exclus du MIT |
| O5 | NC-SA : contributions et textes écrits par IA | **R** pas de contributions de contenu ; protection par personnages et nom réservés |
| O6 | Remotion : freelances, version 5, « Automators » | **L** écrit au README ; 4.x épinglé |
| O7 | pas de sortie MIT ; chiffres faux sur Revideo/Motion Canvas | **L** dépendance à Remotion assumée ; tableau corrigé (§6) |
| O8 | résumés d'éditeurs republiés | **R** aucun résumé écrit, test qui refuse ces clés |
| O9 | citations de tiers placées sous CC BY | **R** exception écrite (« extraits cités, à leurs titulaires ») |
| O10 | Semantic Scholar | **R** retiré |
| O11 | clé OpenAlex = une adresse e-mail | **R** pas de clé sans ton accord |
| O12 | e-mail dans l'en-tête sans accord (B) | **R** User-Agent générique |
| O13 | clause EEE de Gemini | **L** lecture probable : elle vise une application offerte à d'autres ; « chacun sa clé » au README |
| O14 | Flash-Lite en secours sans ta règle | **R** seulement sur ton « oui » |
| O15 | prises commitées | **R** T11 |
| O16 | public dès le jour 0 sans ton choix | **R** **ta décision** (§10) |
| O17 | conditions de GitHub Actions : rendu quotidien de vidéos monétisées en zone grise | **L** écrit ; un style par épisode ; image Docker prête pour ton homelab |
| O18 | AI Act art. 50 et étiquettes | **R** validation humaine documentée, étiquettes par plateforme |
| O19 | Azure exige une carte ; VoiceTut non commercial | **R** retirés |
| O20 | modèle Whisper déplacé | **R** nouvel identifiant `dropbox-dash/…` épinglé avec sa révision |
| O21 | musique : Audio Library hors YouTube, Pixabay et Content ID | **R** CC0 avec preuve ou son généré |
| O22 | « zéro dépense » coûte de la complexité pour quelques centimes | **X** ta règle tient ; le chiffre (≈ 0,02 $ par minute de voix, 0,04 $ en 2027) te sera donné une fois si le quota réel tombe sous 4 requêtes par jour |

### Automatisation (31)
| # | Objection | Sort |
|---|---|---|
| A1 | ton temps : 20-35 min par jour à 1 épisode/jour | **R** 3 par semaine, une page par épisode, temps de chaque porte mesuré |
| A2 | lot du dimanche (C) | **R** pas de lot imposé |
| A3 | personne ne lance la production (A, B) | **R** file et `advance` de C, après le pilote |
| A4 | les scripts exigent une session ; partage avec le planificateur | **R** session « atelier » dédiée ; **L** jetons mesurés au pilote |
| A5 | aucune preuve qu'une validation vient de toi | **R** `performed_via_github_app` vide (vérifié par la session) |
| A6 | PR ouverte par `GITHUB_TOKEN` (C) | **R** rien n'est écrit sur `main` par un workflow |
| A7 | validations qui se périment seules | **R** T1 |
| A8 | prises dans Git | **R** T11 |
| A9 | une release `takes-2026` dépasse 1 000 fichiers | **R** une release par mois, test à 900 |
| A10 | prolifération des releases, nettoyage réservé | **R** règle à écrire avec toi : un workflow supprime les brouillons 30 jours après publication |
| A11 | registre de variation sur `main` | **R** sur `state` |
| A12 | variation calculée dans l'ordre des rendus | **R** structure contrôlée à l'idée contre la case du calendrier ; surface tirée au rendu |
| A13 | stock d'idées vérifiables épuisé en quelques mois à 1/jour | **L** + **R** inventaire de ≥ 60 idées sondées avant le rythme quotidien |
| A14 | quota : la moyenne tient, la variance non | **R** grand livre, plafond 7, réserve 3, réserve d'épisodes |
| A15 | deux runs de voix lisent le quota en même temps | **R** un seul groupe `voice`, `queue: max` |
| A16 | le modèle de voix change sous les personnages | **R** modèle épinglé, re-casting = ta décision |
| A17 | locuteurs inversés non détectés (A, B) | **R** contrôle F0 + compte des tours |
| A18 | cron GitHub ni ponctuel ni témoin | **R** deux déclencheurs indépendants, « dernier `advance` il y a N h » |
| A19 | une étape par nuit = 6-8 nuits par épisode | **R** un run va jusqu'à la porte suivante |
| A20 | rétractation après publication : que faire ? | **R** ticket + question à choix préparée ; recherche trimestrielle des revues récentes |
| A21 | OpenAlex sans clé | **R** T12 |
| A22 | méta-analyses sans résumé | **R** chaîne de résumés + copie libre ; jamais toi |
| A23 | ce que personne ne regarde | **R** 30 s sur l'aperçu, planches lues par la session atelier |
| A24 | rendus qui échouent | **R** une relance, puis alerte |
| A25 | cache Actions qui tourne | **R** caches immuables à clé de contenu |
| A26 | presque rien n'est surveillé | **R** ticket « ⚠️ Atelier » unique |
| A27 | jetons de session non estimés | **L** O2 |
| A28 | script validé avant les sources (B), 4 portes | **R** sources d'abord, une page |
| A29 | page de relecture en artefact (256 Mio) | **R** page générée dans le dépôt (`review/`) ; l'artefact seulement pour les vidéos |
| A30 | preuves brutes datées commitées | **R** commit seulement quand la projection change |
| A31 | `queue: max` ignoré | **R** utilisé |

### Science et contenu (27)
| # | Objection | Sort |
|---|---|---|
| S1 | un avis de correction passe pour l'article | **R** §4.4 point 11 (vérifié par la session sur `10.1037/a0024986`) |
| S2 | rien contre la sélection d'études (Hagger 2010 passerait en ✅ haute) | **R** agent contre-preuve, protocole tracé, « cherché, pas trouvé », `contested.yaml` |
| S3 | la phrase d'appui prouve une présence, pas un sens (Kohl 2012) | **R** rôle des phrases, phrase entière avec sa condition, lecture aveugle ; **L** aucune machine ne prouve le sens |
| S4 | « à retenir » rattaché à aucune preuve | **R** `takeaway.claimIds` obligatoire, preuve causale ou « ممكن يساعد », actions interdites |
| S5 | badge sans grille écrite, pas d'état « on ne sait pas » | **R** `docs/verdict.md` ; l'état ❓ : **ta décision** (§10) |
| S6 | « méta-analyse » = confiance haute quelle que soit sa nature | **R** plafond par type de claim, biais de publication, allégeance |
| S7 | réplications multi-laboratoires non représentables (A, B) | **R** catégorie au rang le plus haut |
| S8 | plan d'étude déclaré par l'écrivain | **R** fixé par le relecteur ; causalité = exposition manipulée |
| S9 | contrôle d'identité tautologique si les champs viennent de Crossref | **R** champs gelés avant toute requête |
| S10 | résumés manquants ou tronqués (10 méta-analyses Elsevier sans résumé chez OpenAlex) | **R** Europe PMC → Crossref → OpenAlex, lecture humaine inscrite |
| S11 | étiquettes sensibles déclarées par l'écrivain | **R** calculées par lexique |
| S12 | avertissement au lieu d'orientation | **R** phrase d'orientation dans la vidéo, sujets exclus |
| S13 | hommes/femmes : règles asymétriques, un seul camp cité | **R** règle symétrique, position contraire obligatoire |
| S14 | hook « paradoxe » sur une seule étude fragile | **R** hook ≤ verdict ; retiré du pilote |
| S15 | la scène raconte une causalité plus forte que le badge | **R** dénouement ≤ verdict |
| S16 | C cite Kohl 2012 à contresens dans son propre dossier | **R** devient un cas de test |
| S17 | modérateur culturel absent (Ford 2015 : inversé en Russie et en Asie de l'Est) | **R** champ `applicability`, phrase obligatoire |
| S18 | 1 épisode par jour ne laisse pas le temps de vérifier | **R** 3 par semaine ; porte scientifique tenue par les agents, ta validation porte sur la présentation |
| S19 | aucune politique publique de correction | **R** page « تصحيحات », `corrections[]` |
| S20 | `token_set_ratio` trop permissif (C) | **R** `token_sort` + règle de préfixe |
| S21 | titre coupé seulement au « : » | **R** coupe aussi à « ? » et « . » |
| S22 | les types de Crossref/OpenAlex ne disent pas le plan | **R** jamais une preuve de méta-analyse ; types PubMed via Europe PMC en appoint |
| S23 | mots de Cohen appliqués à une corrélation | **R** « ارتباط » pour r, « فرق في المتوسط » pour d |
| S24 | trois nuances en 10 s | **R** une nuance dite, les autres sur la page des preuves |
| S25 | ce que dit le livre n'est pas vérifiable | **R** `basis.url` obligatoire quand un texte de l'auteur existe |
| S26 | erratum groupé lu comme une correction de contenu | **R** `acknowledged.why` dit ce que l'avis change |
| S27 | titre du livre avec un juron à l'écran | **R** titre de l'édition arabe (« فن اللامبالاة », à vérifier) ou titre abrégé |

---

## 7 bis. Limites qui restent (LIMITES.md, premier jet)

1. **Monétisation** : YouTube exige du format long pour une chaîne nouvelle après le 2027-02-01 ; Facebook monétise sur
   invitation ; Instagram ne partage pas les revenus des Reels ; TikTok Creator Rewards (> 1 min, 10 000 abonnés, pays
   éligibles : sources secondaires) ne dit rien d'un public arabe vu depuis la France. Rien ne garantit la monétisation.
2. **Narrateur synthétique et sujets de bien-être** : risque de démonétisation (« AI personas »), réduit par la
   formulation, supprimé seulement par une voix humaine du narrateur (§10).
3. **La voix** : le multi-locuteurs de Gemini en égyptien n'a jamais été essayé ; la limite gratuite n'est pas publiée
   (10/jour « non garanti ») ; Google change de modèle tous les quelques mois.
4. **Synchro labiale** : Rhubarb est mal adapté à l'arabe (mesuré) ; le moteur « texte » n'est pas encore mesuré ; la
   lisibilité d'une bouche sur un téléphone n'est pas vérifiée.
5. **Science** : une machine prouve qu'un article existe et qu'une phrase y est, pas qu'on l'a compris ; deux agents IA
   partagent des a priori (l'indépendance vient de leurs tâches, pas de leur nombre) ; pour hommes/femmes et santé
   mentale, un relecteur humain compétent serait le vrai garde-fou (bénévole, sinon écarté et dit) ; presque aucune
   étude n'a d'échantillon arabe ; le livre n'est lu qu'à travers les textes publics de l'auteur.
6. **Preuve de validation** : `performed_via_github_app` distingue une session de toi, mais ce n'est pas cryptographique
   (une session munie d'un autre jeton passerait) ; la règle du CLAUDE.md reste nécessaire.
7. **Coût caché** : l'abonnement Claude, partagé avec tes deux dépôts en production ; mesuré au pilote.
8. **Remotion** n'est pas open source (gratuit pour toi seul ou une structure de 3 personnes au plus) ; aucune sortie
   construite. **GitHub Actions** : rendre chaque jour les vidéos d'une chaîne monétisée est une zone grise de ses
   conditions ; image Docker prête pour ton homelab.
9. **Stock d'idées** : quelques mois à 1 épisode par jour ; ≥ 60 idées sondées avant de passer au rythme quotidien.
10. **Juridique** (pas un avis) : clause EEE de Gemini lue comme visant une application offerte à d'autres ; titres de
    livres comme simple référence ; protection incertaine de scripts écrits par une IA.

---

## 8. Le pilote : le dossier scientifique (revue science, 21 sources vérifiées le 2026-11-22)

**Ce que dit le livre** (vérifié sur un extrait publié par l'auteur, markmanson.net, 2016) : se sentir mal d'aller mal
crée une boucle ; ne pas se soucier de se sentir mal la coupe ; et, plus général, « le désir d'expériences positives est
lui-même une expérience négative ». Trois affirmations de solidité inégale :

| | Affirmation | Ce que disent les preuves | Verdict |
|---|---|---|---|
| C1 | Se juger d'avoir une émotion négative l'aggrave | lignées convergentes : Ford 2018 (*JPSP*, N = 1 381 sur 3 études), Shallcross 2010, Bailen 2019, Zerwas 2024 ; deux expériences sur l'attente sociale (Bastian 2012) ; surtout corrélationnel | ✅/⚠️, confiance modérée pour une **association** |
| C2 | Accepter plutôt que combattre aide | supprimer l'émotion ne marche pas (Webb 2012 : 306 comparaisons ; Abramowitz 2001) ; l'acceptation habituelle prédit une meilleure santé à 6 mois (Ford 2018) ; les thérapies d'acceptation valent la TCC, pas mieux (A-Tjak 2015, Gloster 2020) ; **en expérience, accepter ne fait pas mieux que d'autres bonnes stratégies sur l'affect négatif** (Kohl 2012) | ⚠️ : « mieux que lutter », pas « la meilleure façon » ; accepter **le sentiment**, pas la situation |
| C3 | Vouloir le bonheur rend malheureux | vrai aux États-Unis, nul en Allemagne, **inversé en Russie et en Asie de l'Est** (Ford 2015, vérifié par la session) ; un facteur sur trois de l'échelle seulement (Luhmann 2016) ; c'est **s'inquiéter** de son bonheur, pas y aspirer, qui est lié au mal-être (Zerwas 2024) ; aucune donnée arabe | ❌ ou ❓ dans sa forme générale |

**Verdict du pilote : ⚠️, confiance modérée, sur C1 + C2.** C'est un bon pilote pour montrer un ⚠️ honnête, à trois
conditions : l'épisode ne porte que sur C1 + C2 (C3 au plus une phrase de nuance, **jamais en hook** : le hook « chercher
le bonheur le fait fuir » des propositions est retiré) ; une seule nuance dite (« قبول الإحساس مش معناه تقبل المشكلة ») ;
l'« à retenir » ne promet rien (« ممكن يساعد », jamais « هيعدّي » ; jamais « طلّع اللي جواك »). Pour qui : adultes, surtout
d'Amérique du Nord, d'Europe, d'Australie et du Japon, parfois femmes seulement, aucun arabe ; pas un traitement de la
dépression.

**Si tu préfères un premier verdict net** (sources vérifiées) :
- **« La volonté est un muscle qui s'épuise »** → ❌, confiance haute : réplications préenregistrées à 23 laboratoires
  (Hagger 2016, d = 0,04) et 36 laboratoires (Vohs 2021, d = 0,06), Carter 2015 ; et l'histoire de la méta-analyse de 2010
  qui disait l'inverse : la crise de la réplication racontée au spectateur. Hors santé.
- **« Quand ça va mal, l'homme se retire et la femme veut parler »** (Gray) → ❌ sur « c'est le sexe qui décide » :
  Papp 2009 (116 couples, les deux sens aussi fréquents), méta-analyse de Schrodt 2013 (74 études, N = 14 255 : le schéma
  nuit quel que soit le sens). Sensible, mais il casse le cliché sans en créer un inverse.

Idées des propositions jugées : « 21 jours pour une habitude » → ❌ (mais « 66 jours » serait un nouveau mythe : dire « des
semaines à des mois ») ; « 10 000 heures » → ⚠️ (correction de 2018 à lire) ; « grit » → ⚠️ ; « visualiser la réussite » →
trop mince (aucun résumé récupérable).

---

## 9. Hors périmètre, à te signaler

- **quran-reels et quran-themes-demo** : les vidéos thématiques narrées par Gemini partent sur Instagram et Facebook sans
  l'étiquette IA de Meta (`is_ai_generated` existe depuis le 2026-06-22). Je n'y touche pas ; si tu veux, une PR à part dans
  quran-reels.
- **quran-themes-demo** : le modèle Whisper `mobiuslabsgmbh/faster-whisper-large-v3-turbo` redirige désormais vers
  `dropbox-dash/faster-whisper-large-v3-turbo` ; à épingler un jour (rien de cassé aujourd'hui).
- **Validations dans les deux dépôts** : `performed_via_github_app` permettrait aux workflows de quran-reels de refuser un
  `/publier` posté par une session ; aujourd'hui seule la règle du CLAUDE.md l'empêche.

---

## 10 bis. Décisions du propriétaire (2026-11-22, par questions à choix)

| # | Décision | Sa réponse |
|---|---|---|
| 0 | Langue de narration | **arabe égyptien** |
| 0b | Quota de voix | **un compte Google propre à la chaîne** (son quota Gemini, jamais pour compléter celui de quran-themes-demo) |
| 1 | Idée du pilote | **« se sentir mal de se sentir mal », en ⚖️ sur C1 + C2** (les conditions du §8) |
| 2 | Voix du narrateur | **Gemini au pilote, voix humaine avant la première publication** |
| 3 | YouTube | **vidéos longues + shorts, chaque short relié à sa vidéo longue (« vidéo associée »)** ; la forme exacte de la vidéo longue se décide après le pilote ; le lien « vidéo associée » n'existe pas dans l'API YouTube : il se pose à la main dans Studio |
| 4 | Styles en production | **un style maison choisi après le pilote, les autres en essais mesurés** |
| 5 | Badge | **✅ « صح » / ⚖️ « مش بالظبط » / ❌ « غلط » + ❓ « الأدلة مش كفاية »** |
| 6 | Licence | **code MIT ; registre de sources et rapports en CC BY 4.0 ; scripts, prises, vidéos, personnages, nom et logo réservés** (`REUSE.toml`) |
| 7 | Dépôt | **`book-vs-science`, public dès le départ** |
| 8 | Architecture | **« Je valide l'architecture »** : le §4 de ce document avec les réponses ci-dessus |

---

## 10. Les questions posées (ma recommandation en premier)

| # | Décision | Ma recommandation | Pourquoi |
|---|---|---|---|
| 1 | Idée du pilote | garder « se sentir mal de se sentir mal », en ⚠️ sur C1 + C2 | ton idée tient avec ses conditions ; « فن اللامبالاة » est très connu en arabe ; un ⚠️ honnête montre la méthode |
| 2 | Voix du narrateur | Gemini au pilote, voix humaine (toi ou un proche, au téléphone) avant de publier | seule parade complète à la règle « AI personas » ; authenticité ; une requête de voix de moins par épisode |
| 3 | YouTube et le format long | Shorts pour la découverte + un film 16:9 par mois sur un livre (ses shorts découpés dedans) | 8 000 h exigées en 2027 ; ton modèle film + shorts, déjà validé ailleurs |
| 4 | Styles en production | un style maison choisi après le pilote, les autres en essais mesurés | tes mesures ; la politique vise l'histoire, pas la palette |
| 5 | Badge | ✅ / ⚖️ « مش بالظبط » / ❌, plus ❓ « الأدلة مش كفاية » | ⚠️ se lit « danger » et sera le plus fréquent ; il faut un état « on ne sait pas » |
| 6 | Licence du contenu | code MIT, faits CC BY, épisodes, personnages et nom réservés | sinon un clone monétisé est légal ; on peut ouvrir plus tard, jamais refermer |
| 7 | Nom et visibilité du dépôt | `book-vs-science`, privé pendant le pilote, public au lancement | 0 € (2 000 min incluses), concept et personnages cachés avant la chaîne |
| 8 | Validation de l'architecture | §4 de ce document, avec tes réponses | — |

Plus tard (pas bloquant pour le pilote) : nom de la chaîne (« ميزان الكتب » semble le plus sûr : « كلام كتب؟ » juge les
livres d'avance, « معمل » se lit « usine » hors d'Égypte ; à tester auprès de quelques personnes de 3 pays) ; Algieba ou
non (à l'oreille, au casting) ; chiffres 123 pour cette chaîne ; clé OpenAlex (une adresse e-mail) ; Flash-Lite en
secours ; cadence de lancement (3 par semaine recommandé).
