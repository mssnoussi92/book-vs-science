# Revue contradictoire, angle SCIENCE ET CONTENU

Relecteur indépendant, 2026-11-22. Lu en entier : `brief.md`, `proposal-A.md`, `proposal-B.md`, `proposal-C.md`.
Je n'ai fait confiance à aucun DOI ni résumé des propositions : **45 DOI interrogés aujourd'hui** sur Crossref
(`api.crossref.org/works/<doi>`), OpenAlex (`api.openalex.org/works/doi:<doi>`) et Europe PMC, réponses brutes
gardées. Travaux reproductibles dans `/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/review-science/` :
`fetch.py` (les trois API, User-Agent générique, ni nom ni e-mail), `raw/` (135 réponses JSON), `out1.txt`…`out6.txt`
(sorties lisibles), `matchers.py` (les algorithmes d'identité de A, B et C réécrits tels qu'écrits et passés sur des
cas pièges), `quotes.py` (le contrôle « phrase d'appui » passé sur des citations trompeuses), `search.py`, `epmc.py`.

**OpenAlex demande une clé** : la recherche (`/works?search=`) a répondu 429 aujourd'hui (« Insufficient budget. This
request has no API key, so it counts against the free daily budget shared by everyone on your network's IP address…
$0 remaining »), et propose une clé gratuite contre un e-mail ; je n'en ai pas créé. Les lectures par DOI sont passées
sans clé. Les runners GitHub partagent leurs IP : C prévoit une clé, A et B non.

Dépôts `/home/user/quran-reels` et `/home/user/quran-themes-demo` : lus seulement, `git status` vide et HEAD inchangés
avant et après (`61b651d…`, `c20d118…`).

---

## (a) Tableau des objections

| # | Objection | Prop. | Gravité | Preuve (vérifiée le 2026-11-22) | Correction proposée |
|---|---|---|---|---|---|
| 1 | **Un avis de correction passe pour l'article.** Le DOI de la correction de Mauss 2011 (`10.1037/a0024986`), déclaré avec le titre, les auteurs et l'année de l'article, passe les trois algorithmes : titre 1,000 chez A (SequenceMatcher, titre avant « : »), B (token_sort, idem) et C (token_set) ; premier auteur Mauss ; 2011 ; Crossref `type: journal-article`. Le titre Crossref est `"Can seeking happiness…": Correction to Mauss, Tamir, Anderson, and Savino (2011).` | A B C | **bloquant** | `matchers.py`, cas T1. Crossref de la notice : `update-to: [correction → 10.1037/a0022010]` ; OpenAlex `type: erratum`. Aucun des trois ne lit `update-to` ni le type OpenAlex | Refuser si Crossref `update-to` non vide, OpenAlex `type ∈ {erratum, retraction, editorial, letter, paratext, peer-review}`, ou titre commençant par correction, corrigendum, erratum, retraction, expression of concern, comment on, reply to, ou contenant « : correction to ». Test avec ces 3 DOI réels (`a0024986`, `10.1177/0956797618769891`, `10.1016/j.jcbs.2021.03.005`) |
| 2 | **Rien ne protège contre la sélection d'études.** Les plafonds de confiance ne se calculent que sur les sources que l'écrivain a choisies, et la règle de A récompense l'omission (✅ interdit seulement si un claim `contradicts` est listé). Une méta-analyse réelle, non corrigée, dont la conclusion a été renversée passe tout | A B C | **bloquant** | `matchers.py`, cas T4 : Hagger et al. 2010, *Psych. Bull.* (`10.1037/a0019486`, méta-analyse de 83 études, « significant effect of ego depletion ») passe A, B et C, sans `updated-by` ; elle autoriserait « ✅ confiance haute » pour l'épuisement de la volonté. Renversée par Carter et al. 2015 (`10.1037/xge0000083`), Hagger et al. 2016 (23 labos, d = 0,04 [−0,07 ; 0,15]) et Vohs et al. 2021 (36 labos, d = 0,06) | Protocole de recherche écrit et tracé dans le rapport (requêtes, bases, date ; obligatoirement « meta-analysis », « replication », « moderator OR culture », et les articles qui citent la source avec « replication », « reanalysis », « comment » ou « reply » dans le titre) ; **un agent « contre-preuve »** dont la seule tâche est de trouver ce qui contredit le verdict (distinct du relecteur des DOI) ; section « cherché, pas trouvé » ; liste `contested.yaml` des effets connus pour leurs échecs de réplication (épuisement de l'ego, power posing, amorçage social, rétroaction faciale, état d'esprit de croissance…), qui force ⚠️/❌ tant qu'elle n'est pas traitée |
| 3 | **La « phrase d'appui » prouve une présence, pas un sens.** Une phrase recopiée mot pour mot peut dire le contraire du résultat de l'étude, être une phrase de contexte (travaux antérieurs, hypothèse) ou un fragment qui perd sa condition | A B C | **bloquant** | `quotes.py` : Kohl et al. 2012 (`10.1016/j.jbtep.2012.03.004`) contient « Many studies reported that acceptance strategies were superior … for … negative affect » alors que sa méta-analyse ne trouve **aucune différence pour l'affect négatif** : passe A/C (sous-chaîne) **et** B (phrase entière). Ford 2014 : phrase de contexte causale (« highly valuing happiness, leads to decreased well-being ») dans une étude transversale : passe A/C. Mauss 2011 tronquée avant « under conditions of low, but not high, life stress » : passe A/C, bloquée par B | Étiqueter le rôle de chaque phrase du résumé (contexte / but / méthode / résultat / conclusion) et n'accepter que résultat ou conclusion ; phrase entière (règle de B) ; la condition (population, modérateur) doit être dans la phrase ; le relecteur aveugle de B lit le résumé entier et donne la relation sans voir le claim |
| 4 | **« À retenir » n'est rattaché à aucune preuve**, alors que c'est la seule partie qui dit quoi faire : A (`Takeaway` sans `claimIds`), B (`evidence` facultatif), C (aucun lien) | A B C | **bloquant** (santé mentale) | Schémas zod des trois propositions. Le format (scène → livre → verdict → action) présente l'action comme efficace. Contre-exemple de ce qu'un « à retenir » plausible peut faire : Bushman 2002 (`10.1177/0146167202289002`) : défouler sa colère en y repensant **augmente** colère et agressivité | `takeaway.claimIds` obligatoire ; l'action doit reposer sur une preuve capable de causalité **pour cette action** (expérience ou ECR, ou méta-analyse d'expériences), sinon formulation « ممكن يساعد / جرّب » marquée « suggestion à faible risque » et vue par le relecteur ; liste d'actions interdites (arrêter un traitement, « vider son sac » comme remède, auto-diagnostic) |
| 5 | **Le badge n'a pas de définition écrite.** Aucune proposition ne traduit l'idée du livre en affirmation testable (qui, quoi, comparé à quoi, mesuré comment) ; une idée composée reçoit un seul badge ; ⚠️ mélange « vrai en partie » et « on ne sait pas » | A B C | majeur | L'idée du pilote est composée de trois affirmations de solidité très différente (§d) ; B le dit lui-même : « La règle garde, elle ne décide pas » | Grille écrite (`docs/verdict.md`) : claim opérationnalisé (population, exposition, comparaison, résultat) ; certitude façon GRADE (plan, biais, incohérence, caractère indirect — dont **l'applicabilité au public égyptien** —, imprécision, biais de publication, statut de réplication) ; table certitude × direction → badge ; un 4ᵉ état « ❓ الأدلة مش كفاية » ou un ⚠️ à deux libellés ; la certitude **affichée** sur le badge |
| 6 | **La hiérarchie des preuves s'arrête à l'étiquette « méta-analyse »** : « haute » dès qu'une méta-analyse soutient, quelle que soit la nature des études agrégées (corrélationnelles), leur biais, ou l'allégeance des auteurs ; le type de claim (association, causalité, intervention) n'est pas relié au type de preuve | A B C | majeur | Aldao 2010 et Akbari 2022 sont des méta-analyses d'associations ; A-Tjak 2015 inclut des données « provided by the ACBS community » (l'association de l'ACT) ; Singh 2024 : 11 études sur 20 à risque de biais élevé ; Hagger 2010 (cas T4) | Plafond par type de claim : un claim causal ou « fais X » exige des preuves expérimentales ; une méta-analyse de corrélations plafonne une causalité à « basse » ; estimation corrigée du biais de publication quand elle existe ; champ `allegiance` |
| 7 | **Les réplications multi-laboratoires préenregistrées ne sont pas représentables** chez A (`Design`) et B (`StudyKind`) ; la règle ❌ de B exige « méta-analyse ou ECR » | A B | majeur | Hagger 2016 et Vohs 2021, les preuves les plus fortes de la crise de la réplication, tombent dans `experiment` ; C a `multilab_replication` | Ajouter `registered-replication` / `multisite-replication` au rang le plus haut avec les méta-analyses corrigées |
| 8 | **Le plan d'étude est déclaré par l'écrivain** et seul « méta-analyse » est recoupé (A, B) ; chez C, rien ne détecte « experiment ». Déclarer « experiment » pour une étude corrélationnelle ouvre les verbes causaux | A B C | majeur | Ford 2018 : l'étude « de laboratoire » est une différence individuelle (acceptation habituelle) qui prédit la réaction à un stresseur : aucune manipulation (résumé). Le titre dit « Laboratory » | Le plan est fixé par le relecteur indépendant ; la règle causale exige que **l'exposition du claim** ait été manipulée, pas « une expérience quelque part » |
| 9 | **Contrôle d'identité tautologique** si les champs déclarés sont recopiés de Crossref (A : `bvs sources add <doi>`, B : `idea scout` par recherche OpenAlex) | A B | majeur | Il ne protège que si `declared` vient de l'origine du claim. Mesure de ce jour : 3 des 15 DOI que j'ai tapés de mémoire étaient faux (20 %) ; **2 menaient à un vrai autre article de la même revue et de la même année** (Shallcross 2010 → Flaxman & Bond `10.1016/j.brat.2010.05.004` ; Papp 2009 → Hirschberger `10.1111/j.1475-6811.2009.01230.x`), 1 à un 404. Le titre les attrape tous (cas T3, T3b) | Geler `declared` (titre, premier auteur, année, revue) **avant** toute requête, depuis la source du claim ; garder le contrôle du titre et du premier auteur |
| 10 | **Résumés manquants ou abîmés** : B ne lit que l'index inversé d'OpenAlex | B (A, C en partie) | majeur | Sur les 41 articles (hors avis) obtenus : **10 sans résumé chez OpenAlex, les 10 chez Elsevier** (dont Aldao, Abramowitz, Kohl, Shallcross : le cœur du pilote) ; **3 sans résumé nulle part** (Akbari 2022, Zerwas & Ford 2021, Kappes & Oettingen 2011) ; **2 tronqués** chez OpenAlex (Zerwas 2024 commence par « = 1,815) », Bailen 2019 par « = 79) ») : un sha256 de phrase (B) y est fragile | Chaîne Europe PMC → Crossref `abstract` → OpenAlex (celle de A), origine notée ; texte intégral libre (PMC) quand il existe ; « aucun résumé » = lecture humaine **inscrite** (qui, quoi, page) |
| 11 | **Les étiquettes sensibles sont déclarées par l'écrivain** (`topics`, `sensitive`, `sensitivity`, vides par défaut) | A B C | majeur | Le pilote, étiqueté `emotions` chez A, échappe à `mental_health` et donc à la `safetyLine` | Étiquetage calculé (lexique : اكتئاب، قلق، حزن، زعل، توتر، depression, anxiety…) et par défaut pour tout sujet d'émotions |
| 12 | **Avertissement au lieu d'orientation.** B : « مش بديل عن مختص » dans la description seulement ; C : carte « مش نصيحة طبية ». A seul met une phrase d'orientation dans la vidéo | B C | majeur | Schémas ; une mention dans la description n'est pas vue sur un reel | Phrase d'orientation dans la vidéo, avec un critère (« أسابيع ومأثر على حياتك ») ; ressource locale vérifiée avant usage ; sujets exclus du format court (suicide, automutilation, troubles alimentaires, médicaments, techniques de traitement des traumatismes) |
| 13 | **Hommes/femmes : règles asymétriques et sources d'un seul côté.** A et B ne citent que Hyde 2005 / Zell 2015 ; C ne surveille que les affirmations de **différence**. On peut remplacer un stéréotype par un « fait » inverse (« aucune différence ») ; et la scène jouée met en image le stéréotype que le lexique ne voit pas | A B C | majeur | Del Giudice et al. 2012 (`10.1371/journal.pone.0029265`, N = 10 261, D multivarié = 2,71, 10 % de recouvrement) et Carothers & Reis 2013 (`10.1037/a0030437` : dimensions, pas catégories ; « Average differences … are not under dispute ») sont absents ; Zell 2015 lui-même : « has remained controversial » | Règle symétrique : toute affirmation de différence **ou** de ressemblance donne la taille d'effet et le recouvrement ; la position contraire principale est obligatoire au dossier ; pour Gray, tester une sous-affirmation précise (§d : Papp 2009, Schrodt 2013) ; la scène joue les deux sens du schéma |
| 14 | **Le hook « paradoxe » du pilote** (« chercher le bonheur le fait fuir ») repose sur Mauss 2011 seule, et la règle l'accepte | A B | majeur | Mauss 2011 : participantes femmes, lien seulement sous faible stress, induction brève. Contredit dans sa forme générale par Ford 2015 (plus de bien-être en Russie et en Asie de l'Est), Luhmann 2016 (1 facteur sur 3), Zerwas 2024 (« aspiring … innocuous ») | Règle « hook ≤ verdict » : un hook ne peut affirmer un claim de certitude < modérée ni un claim `nuances` ; question au lieu d'affirmation |
| 15 | **La scène et sa fin racontent une causalité** (le personnage accepte, va mieux) plus forte que le verdict ⚠️ | A B C | majeur | Le format du brief (scène → livre → verdict → action) ; aucune règle sur le dénouement | Champ `scene.outcome` contraint par le badge : ⚠️ → mieux « un peu » ou incertain, ❓ → pas de dénouement |
| 16 | **Le dossier provisoire de C cite Kohl 2012 pour ce qu'il ne dit pas** (« pour l'acceptation face à l'évitement ») et lit Aldao comme un soutien | C | majeur | Kohl : comparé à d'autres stratégies (suppression, distraction, réappraisal), l'acceptation ne fait **pas mieux pour l'affect négatif** ; mieux seulement pour la tolérance à la douleur (g = 0,43). Aldao : acceptation « small to medium », dite « surprising » | Exemple vivant de l'objection 3 : à corriger dans le dossier, et à garder comme cas de test |
| 17 | **Le modérateur culturel manque** au dossier de A et B, pour un public égyptien | A B | majeur | Ford 2015 (`10.1037/xge0000108`) : la motivation à chercher le bonheur prédit un bien-être **plus bas aux États-Unis, nul en Allemagne, plus haut en Russie et en Asie de l'Est**. Dejonckheere 2022 : 87,6 % d'étudiants en psychologie ; aucun pays arabe (ni l'Iran, ni Israël) cité sur la page de l'article, affiliations comprises (liste des pays en SI 2, non lue) | Champ `applicability` : échantillons MENA ou non ; sinon la phrase « معظم الدراسات من أمريكا وأوروبا » est obligatoire |
| 18 | **Un épisode par jour, validé par lot le dimanche sur téléphone** : le propriétaire n'est pas un relecteur de science ; la profondeur de lecture ne suit pas ce débit | C | majeur | §8.3, §8.5 de C ; un dossier honnête demande des heures de lecture (ce seul pilote : 25 sources lues ici) | Rythme scientifique plafonné (≤ 3 par semaine au début) ; la porte « sources » tenue par le relecteur + l'agent contre-preuve ; le propriétaire valide la présentation |
| 19 | **Aucune politique publique de correction** de nos propres erreurs (seules les rétractations sont revérifiées) | A B C | majeur | Aucun champ `corrections` ; aucun canal pour qu'un spectateur signale une erreur | Page « تصحيحات » publique, commentaire épinglé corrigé, champ `corrections[]`, critère de retrait |
| 20 | **token_set_ratio est trop permissif** : tout titre déclaré inclus dans un titre plus long vaut 1,0 (corrigenda, « Reply to », « Comment on ») | C | mineur | T1 (1,000) ; T2 sauvé seulement par l'absence d'auteurs dans le corrigendum de Macnamara | token_sort + règle de préfixe ; contrôle de l'objection 1 |
| 21 | **Titre principal coupé seulement au « : »** : un titre déclaré sans sous-titre après « ? » échoue | A B | mineur | T5 : « Can seeking happiness make people unhappy? » → 0,667, `mismatch` chez A et B (faux négatif qui pousse vers la revue manuelle, et vers l'habitude de lever les alertes) | Couper aussi à « ? » et « . » ; règle de préfixe (C) |
| 22 | **Les types ne disent pas le plan** : Crossref met errata et commentaires en `journal-article` ; OpenAlex classe mal (Vohs 2021 `review`, Hagger 2010 méta-analyse `article`, Webb 2012 `review`) | A (B C) | mineur | `out5.txt`, `out1.txt` | Ne pas utiliser le type OpenAlex comme preuve de méta-analyse (A) ; types de publication PubMed via Europe PMC en appoint |
| 23 | **Les mots d'intensité de Cohen** appliqués à un r de corrélation (« أثر متوسط ») invitent une lecture causale ; estimations non corrigées | A B | mineur | Tables de A (§9) et B (§9.3) | « ارتباط » pour r, « فرق في المتوسط » pour d ; estimation corrigée quand elle existe |
| 24 | **Trois nuances dites en ~10 s** de verdict : impossible à dire, ou dit trop vite | B C | mineur | `nuances ≤ 3` | Une nuance dite ; les autres sur une page publique des preuves par épisode, liée dans la description |
| 25 | **Ce que dit le livre n'est pas vérifiable** chez B (`concept` ≤ 6 mots) et C (`locus` jamais montré) ; A a `basis` mais l'URL est facultative | B C (A) | mineur | Vérifié aujourd'hui : l'auteur a publié le passage comme extrait du livre (`markmanson.net/feedback-loop-from-hell`, « Published 2016 », « This is an excerpt from my new book ») | `basis.url` obligatoire quand un texte public de l'auteur existe, récupéré, avec une phrase de contrôle interne jamais affichée ; la règle « 8 mots » de A contre ce texte |
| 26 | **Erratum groupé lu comme une correction de contenu** | B | mineur | L'« erratum » de Gloster 2020 (`10.1016/j.jcbs.2021.03.005`) couvre **41 articles** des volumes 15 à 18 (`update-to`) | `acknowledged.why` doit dire ce que change l'avis ; « avis groupé sans effet sur les résultats » est une valeur |
| 27 | **Titre du livre avec un juron** à l'écran et dans les métadonnées | A B C | mineur | « The Subtle Art of Not Giving a F*ck » ; règles publicitaires de YouTube sur les grossièretés dans le titre (à vérifier, angle plateformes) | Titre de l'édition arabe (à vérifier) ou titre abrégé sur la carte et dans le titre |

---

## (b) Détail par proposition

### Proposition A

**Ce qui tient** : la seule qui relie chaque réplique qui énonce un résultat à un `claimId` et exige que **tout
chiffre dit ou écrit** figure dans une preuve ; `causal` faux sans source expérimentale, avec lexique des verbes
causaux égyptiens ; `population` sous la carte et nuance « pour qui » exigée quand la population est restreinte ;
plafond de confiance calculé ; `basis` (où le livre dit l'idée : `book`, `author_article`, `publisher_summary`,
locator, URL) : le meilleur garde-fou contre le livre caricaturé ; chaîne de résumés OpenAlex → Europe PMC → Semantic
Scholar ; `human_checked` pour ce qui n'est pas dans le résumé ; relecteur indépendant qui revérifie **sans cache** ;
revérification hebdomadaire ; **phrase d'orientation dans la vidéo** (`safetyLine`) pour `mental_health` ; ordre
« preuves avant verdict » assumé contre le brief, à juste titre.

**Ce qui casse** :
- Objection 1 (la notice de correction passe), objection 21 (coupe au « : » seulement).
- `Takeaway` sans `claimIds` (objection 4) : la règle « tout chiffre dans une preuve » ne couvre pas l'action.
- La `superRefine` du verdict récompense l'omission : ✅ est interdit seulement si un claim `contradicts` est **listé**.
- `causal` dépend du `design` déclaré ; « experiment » n'est jamais recoupé (objection 8).
- Le pilote : hook `paradox` sur Mauss 2011 (objection 14) ; Ford 2015 absent (objection 17) ; Kohl 2012 et Webb
  2012 absents, alors qu'ils sont les deux méta-analyses **expérimentales** du dossier et qu'ils nuancent le verdict.
- Le sujet `gender` exige « une méta-analyse » et donne Hyde et Zell en exemple : une seule école (objection 13).
- `topics` déclarés (objection 11) : le pilote, `emotions`, n'aurait pas sa `safetyLine`.
- Remplacements proposés : Kappes & Oettingen 2011 n'a **aucun résumé récupérable** (ni OpenAlex, ni Europe PMC, ni
  Crossref) : sous les règles mêmes de A, il ne peut porter un verdict sans lecture humaine ; Macnamara 2014 :
  correction de 2018 sur la méthode d'ajustement des tailles d'effet, à lire avant de citer ses pourcentages.

### Proposition B

**Ce qui tient** : la **revérification aveugle** (le second agent reçoit le DOI et le résumé sans le claim, écrit sa
propre phrase et la relation) est la meilleure défense des trois contre « l'étude citée pour ce qu'elle ne dit pas » ;
la phrase d'appui est une **phrase entière** désignée par son rang (bloque les fragments qui perdent leur condition :
Mauss tronquée échoue chez B) ; taille d'effet relevée au registre et mise en mots par le Chrome, jamais tapée dans
une phrase ; aucun champ de citation du livre (le plus sûr en droit d'auteur) ; le narrateur dit « الكتاب بيقول », pas
le nom de l'auteur ; rappel obligatoire « des moyennes, pas des personnes » pour `gender` ; relevés réels de ce jour
justes (correction de Mauss, erratum de Gloster, années de Ford et de Lally).

**Ce qui casse** :
- Objection 1 (notice) et 21 (coupe au « : »).
- La phrase d'appui ne vient **que** d'OpenAlex : les 4 méta-analyses Elsevier du pilote n'y ont pas de résumé, deux
  sources clés ont un résumé tronqué ; le sha256 d'une phrase d'un index abîmé change quand OpenAlex le répare
  (objection 10). Une grande part du dossier partirait en revue humaine.
- Une phrase entière de contexte ou de « résultats rapportés par d'autres » passe encore (Kohl, objection 3).
- `StudyKind` sans réplication multi-laboratoires ; règle ❌ « méta-analyse ou ECR » (objection 7).
- `Takeaway.evidence` facultatif ; le brouillon d'« à retenir » (« سمّي إحساسك بصوت واطي، وسيبه يعدّي ») promet que
  le sentiment « passe » et repose sur l'étiquetage affectif, absent du registre ; or Kircanski et al. 2012 ne trouvent
  **pas de différence de peur rapportée** (seulement la conductance cutanée).
- Aucune vérification de ce que dit le livre (`concept` seul) ; avertissement santé dans la description seulement.
- Pilote : hook h2 « كل ما تجري ورا السعادة… ممكن تبعد عنك » appuyé sur Mauss seule (objection 14) ; Ford 2015 absent.
- Licence de contenu NC : hors de mon angle, sans objection.

### Proposition C

**Ce qui tient** : la hiérarchie la plus nette : plafond calculé, **✅ ou ❌ avec « low » refusés**, catégorie
`multilab_replication`, plan **détecté** et « déclaré au-dessus du détecté → bloque » ; sondage des preuves **avant**
d'écrire, avec l'exigence qu'une méta-analyse ou revue existe ; recoupement `filter=updates:{doi}` et revérification
nocturne **y compris des épisodes publiés** ; chiffres à l'écran tirés du registre seulement ; `population` et
`limits` obligatoires ; seule à nommer le modérateur culturel (Ford 2015) ; règle « une généralisation d'un
personnage reçoit une réponse du narrateur dans le même épisode ».

**Ce qui casse** :
- token_set_ratio (objection 20) ; notice de correction (objection 1).
- Le dossier provisoire cite Kohl 2012 à contresens (objection 16) : la preuve que le risque principal n'est pas
  théorique, même chez un architecte prudent.
- Détection du plan par regex : `/randomi[sz]ed/` classe ECR toute expérience de laboratoire qui « randomise » 40
  étudiants ; `/meta-?analy/` classe méta-analyse une étude primaire qui cite une méta-analyse ; Vohs 2021 (« Bayesian
  meta-analyses ») serait « méta-analyse ».
- Règle `gender` asymétrique (seules les différences sont surveillées, objection 13).
- Santé mentale : carte « مش نصيحة طبية », sans orientation (objection 12).
- **Le débit visé (1 épisode par jour, validation par lot de 7 scripts et 7 dossiers)** est l'objection la plus
  lourde sous mon angle (objection 18) : l'automatisation déplace le goulot vers une validation que le propriétaire
  ne peut pas faire sur le fond.
- Remplacements : « 21 jours » (bien choisi, voir §d) et l'épuisement de l'ego (le meilleur des trois dossiers).

---

## (c) Angles morts communs aux trois

1. **La sélection.** Toutes vérifient ce qu'on leur donne ; aucune ne cherche ce qu'on ne leur donne pas. La revue
   d'un verdict doit commencer par « qu'est-ce qui le contredirait, et l'a-t-on cherché ? ».
2. **Le claim n'est jamais opérationnalisé.** « Accepter ses émotions » : de quelle acceptation parle-t-on (habituelle,
   induite en laboratoire, une thérapie entière comme l'ACT) ? Comparée à quoi (rien, suppression, réappraisal) ?
   Mesurée comment (humeur du moment, symptômes à 6 mois) ? Sans cela, le badge se choisit en prenant la sous-question
   la plus facile.
3. **Pas d'état « on ne sait pas ».** Beaucoup d'idées de développement personnel n'ont pas de preuve directe ; ⚠️
   ne doit pas servir de fourre-tout.
4. **L'applicabilité au public.** La chaîne parle égyptien ; la quasi-totalité des preuves vient des États-Unis,
   d'Europe, d'Australie, du Japon, souvent d'étudiants et parfois de femmes seulement. Pour ce pilote, le
   modérateur culturel est **documenté** (Ford 2015).
5. **Le format raconte une causalité** : la scène montre le problème puis sa solution, l'« à retenir » dit quoi faire.
   Un ⚠️ dans le badge ne corrige pas une fin heureuse dans la scène.
6. **Deux agents ne font pas deux regards** : un relecteur IA partage les a priori de l'écrivain (le « 66 jours »
   populaire, la lecture favorable d'Aldao). L'indépendance se crée par la tâche (contre-preuve, lecture aveugle),
   pas par le nombre d'agents ; pour `gender` et `mental_health`, un relecteur humain compétent avant publication
   serait le vrai garde-fou (à proposer au propriétaire, coût zéro si bénévole, sinon à écarter et le dire).
7. **L'allégeance** : ACT évaluée par des chercheurs de l'ACT, étiquetage affectif revu par son propre laboratoire,
   « valoriser le bonheur » étudié surtout par un réseau d'auteurs (Mauss, Ford, Tamir, Zerwas). Ce n'est pas une
   faute, c'est une limite à écrire.
8. **Le propriétaire n'est pas la porte scientifique** : sa validation porte sur la présentation ; la porte « sources »
   doit être tenue par le relecteur et l'agent contre-preuve, avec leurs désaccords visibles.
9. **Aucune politique de correction publique** de nos propres erreurs.
10. **Le droit d'auteur vu du contenu** : l'idée n'est pas protégée, l'expression oui ; les règles de reformulation
    (8 mots, ≤ 12 mots de citation) sont raisonnables mais ne s'appliquent qu'au texte anglais ; l'édition arabe
    traduite est une œuvre à part, que la session n'a pas : ne pas reprendre ses tournures. Le risque concret est
    moins la contrefaçon que **l'attribution fausse** à un auteur vivant et nommé ; d'où `basis.url` (objection 25).

---

## (d) Dossier du pilote : « se sentir mal de se sentir mal »

### Ce que dit le livre (vérifié aujourd'hui sur un texte public de l'auteur)

`https://markmanson.net/feedback-loop-from-hell` (« Published 2016 », « This is an excerpt from my new book, The
Subtle Art of Not Giving a F*ck ») : l'anxiété d'être anxieux, la colère d'être en colère ; « By not giving a fuck
that you feel bad, you short-circuit the Feedback Loop from Hell » ; et la thèse générale : « The desire for more
positive experience is itself a negative experience. And, paradoxically, the acceptance of one's negative experience
is itself a positive experience. » Trois affirmations testables, de solidité inégale :

- **C1** Se juger d'avoir une émotion négative l'aggrave (méta-émotion négative).
- **C2** Accepter ses émotions négatives, plutôt que les combattre, aide.
- **C3** Vouloir plus d'expériences positives est en soi négatif (chercher le bonheur rend malheureux).

### Sources vérifiées

Statut commun, sauf mention : **Crossref et OpenAlex concordent le 2026-11-22** (titre, auteurs, année, revue),
aucun `updated-by` de rétractation ni d'expression of concern, OpenAlex `is_retracted: false` ; « résumé » = ce que
j'ai lu (Europe PMC ou OpenAlex), réponses brutes dans `raw/`.

| DOI | Auteurs, année, revue | Type | Ce qu'elle montre (résumé) | Effet | Limites | Statut |
|---|---|---|---|---|---|---|
| 10.1037/pspp0000157 | Ford, Lam, John, Mauss 2018, *JPSP* 115(6) | 3 études : transversale, labo, longitudinale | L'acceptation **habituelle** prédit la santé psychologique (N = 1 003) même en contrôlant réappraisal et rumination ; moins d'émotion négative face à un stresseur (N = 156) ; à 6 mois, via moins d'émotion négative aux stresseurs quotidiens (N = 222) ; **accepter ses états mentaux, pas les situations** | non donné | Différences individuelles, aucune manipulation ; pays des échantillons non dit par le résumé (à lire) ; auto-déclaré | OK (Crossref `created` 2017) |
| 10.1016/j.brat.2010.05.025 | Shallcross, Troy, Boland, Mauss 2010, *BRAT* 48(9) | 2 études, dont 1 prospective | Acceptance ↔ moins d'affect négatif pendant une induction négative ; prédit moins de symptômes dépressifs **après un stress élevé**, pas faible | non donné | Échantillons **féminins** ; corrélationnel | OK (résumé Europe PMC) |
| 10.1037/emo0000488 | Bailen, Wu, Thompson 2019, *Emotion* 19(5) | échantillonnage d'expériences, 7 jours | ~53 % ont au moins une méta-émotion ; « négatif sur négatif » la plus fréquente, associée à la sévérité dépressive | non donné | **n = 79** ; corrélationnel | OK ; résumé OpenAlex tronqué, Europe PMC complet |
| 10.1037/emo0001381 | Zerwas, Ford, John, Mauss 2024, *Emotion* 24(8) | transversal, journal, longitudinal | « Aspirer » au bonheur est anodin ; **s'inquiéter / se juger** sur son bonheur ↔ moins de bien-être, en partie via des méta-émotions négatives | non donné | Corrélationnel ; même réseau d'auteurs ; N = 1 815 | OK ; OpenAlex tronqué |
| 10.1037/a0024755 | Bastian, Kuppens, Hornsey, Park, Koval, Uchida 2012, *Emotion* 12(1) | 4 études, dont 2 expériences | Croire que **les autres** attendent qu'on ne soit pas triste → plus d'émotion négative, moins de bien-être, via l'auto-évaluation négative ; causalité en études 3-4 | non donné | Australie, Japon (effet plus net en Australie) | OK |
| 10.1038/s41598-021-04262-z | Dejonckheere et al. 2022, *Sci. Rep.* 12 (44 auteurs) | transversale, 40 pays | Pression sociétale perçue à être heureux ↔ moins de bien-être, surtout dans les pays « heureux » ; les auteurs excluent toute conclusion causale | non donné | 7 443 participants, **87,6 % étudiants en psychologie** ; aucun pays arabe cité sur la page de l'article (liste des pays en SI 2 non lue) | OK (page de l'article lue) |
| 10.1016/j.cpr.2009.11.004 | Aldao, Nolen-Hoeksema, Schweizer 2010, *Clin. Psychol. Rev.* 30(2) | méta-analyse, 114 études, 241 effets | Rumination : lien fort à la psychopathologie ; évitement, résolution, suppression : moyen à fort ; **réappraisal et acceptation : petit à moyen**, « surprising » | catégories seulement | Dispositions, corrélationnel | OK (OpenAlex 2009, Crossref 2010) ; résumé Europe PMC |
| 10.1016/j.jcbs.2022.03.007 | Akbari, Seydavi, Hosseini, Krafft, Levin 2022, *J. Context. Behav. Sci.* 24 | revue systématique + méta-analyse | Évitement expérientiel dans dépression, anxiété, TOC et apparentés, TSPT (titre) | **non vérifié** | **Aucun résumé récupérable** (OpenAlex, Europe PMC, Crossref) | identité OK ; **contenu à lire** |
| 10.1016/j.jbtep.2012.03.004 | Kohl, Rief, Glombiewski 2012, *J. Behav. Ther. Exp. Psychiatry* 43(4) | méta-analyse de 30 expériences | Acceptation > autres stratégies pour la **tolérance à la douleur** ; **aucune différence** pour l'intensité de la douleur et **l'affect négatif** | g = 0,43 [0,12 ; 0,73] (douleur) | Labo, court terme ; 30 études | OK ; résumé Europe PMC |
| 10.1037/a0027600 | Webb, Miles, Sheeran 2012, *Psych. Bull.* 138(4) | méta-analyse, 306 comparaisons expérimentales | Supprimer l'**expérience** d'une émotion : inefficace ; supprimer les pensées : inefficace ; réappraisal efficace | d = −0,04 ; −0,12 ; réappraisal 0,23 à 0,45 | L'acceptation n'est pas une catégorie (résumé) ; labo, court terme | OK |
| 10.1016/S0272-7358(00)00057-X | Abramowitz, Tolin, Street 2001, *Clin. Psychol. Rev.* 21(5) | méta-analyse, études contrôlées | Effet rebond de la suppression de pensée **petit à moyen**, variable selon la pensée et la mesure ; pas plus fort en clinique (peu d'études) | « small to moderate » | Ancienne ; labo | OK ; résumé Europe PMC |
| 10.1159/000365764 | A-Tjak et al. 2015, *Psychother. Psychosom.* 84(1) | méta-analyse, 39 ECR, 1 821 patients | L'ACT bat les contrôles ; **pas de différence avec la TCC** (p = 0,140) | g = 0,57 (liste d'attente 0,82) | ACT = un programme, pas l'acceptation seule ; données de la communauté ACBS | OK (en ligne 2014, papier 2015) |
| 10.1016/j.jcbs.2020.09.009 | Gloster, Walder, Levin, Twohig, Karekla 2020, *J. Context. Behav. Sci.* 18 | revue de 20 méta-analyses, n = 12 477 | ACT efficace ; supérieure aux contrôles inactifs et à la plupart des actifs, **sauf la TCC** | 100 effets | Auteurs chercheurs de l'ACT (à ma connaissance) ; erratum **groupé** de 41 articles | OK, `updated-by: erratum` |
| 10.1037/a0022010 | Mauss, Tamir, Anderson, Savino 2011, *Emotion* 11(4) | 2 études, dont 1 expérience | Valoriser le bonheur ↔ moins de bonheur **sous faible stress seulement** ; valorisation induite → moins de réaction positive à un film gai, via la déception | non donné | **Participantes femmes** ; induction brève ; correction `10.1037/a0024986` (contenu non lu ; Europe PMC marque le titre « [corrected] ») | OK, `updated-by: correction` |
| 10.1037/xge0000108 | Ford, Dmitrieva, Heller, Chentsova-Dutton, Grossmann, Tamir, Uchida, Koopmann-Holm et al. 2015, *J. Exp. Psychol. Gen.* 144(6) | transversale, 4 régions | Chercher le bonheur prédit un bien-être **plus bas aux États-Unis, nul en Allemagne, plus haut en Russie et en Asie de l'Est**, selon une poursuite plus sociale | non donné | Corrélationnel ; aucun pays arabe | OK |
| 10.1016/j.jrp.2015.11.003 | Luhmann, Necka, Schönbrodt, Hawkley 2016, *J. Res. Pers.* 60 | 6 échantillons, N = 938 | L'échelle de Mauss n'est pas unidimensionnelle ; **1 facteur sur 3** seulement corrèle négativement au bien-être | non donné | Corrélationnel ; prépublication liée (`has-preprint`) | OK ; résumé Europe PMC |
| 10.5334/pb.1036 | Hansenne 2021, *Psychologica Belgica* 61(1) | réplication transversale, N = 683 | « Prioriser le positif » ↔ plus de bien-être ; valoriser le bonheur : l'inverse « en partie » | non donné | 75 % de femmes ; Belgique ; un auteur | OK |
| 10.1521/jscp.2014.33.10.890 | Ford, Shallcross, Mauss, Floerke, Gruber 2014, *J. Soc. Clin. Psychol.* 33(10) | 2 échantillons américains | Valoriser le bonheur ↔ symptômes dépressifs (dépression en rémission) | non donné | Corrélationnel ; **phrase causale de contexte** dans le résumé (objection 3) | OK |
| 10.1177/0956797612443830 | Kircanski, Lieberman, Craske 2012, *Psych. Sci.* 23(10) | expérience, exposition à une araignée | Nommer sa peur : moins de conductance cutanée à 1 semaine ; **peur rapportée inchangée** | non donné | Phobie spécifique ; petit essai | OK |
| 10.1177/1754073917742706 | Torre, Lieberman 2018, *Emotion Review* 10(2) | revue narrative | L'étiquetage affectif agit comme une régulation implicite | — | Revue du laboratoire qui l'a lancé | OK |
| 10.1177/0146167202289002 | Bushman 2002, *Pers. Soc. Psychol. Bull.* 28(6) | expérience | Défouler sa colère en y repensant : plus de colère et d'agressivité ; « ne rien faire » faisait mieux | non donné | Un labo, étudiants | OK ; garde-fou : **accepter n'est pas défouler** |

### Verdict

**⚠️ vrai en partie, confiance modérée pour C1 + C2 sous leur forme étroite ; ❌ ou ❓ pour C3 sous sa forme générale.**

- **C1** (se juger aggrave) : soutenu par plusieurs lignées convergentes (Ford 2018, Shallcross 2010, Bailen 2019,
  Zerwas 2024), dont deux expériences sur l'attente sociale (Bastian 2012) ; surtout corrélationnel. Confiance
  modérée pour une **association**, basse pour la causalité individuelle.
- **C2** (accepter plutôt que combattre) : « combattre » au sens de supprimer l'expérience ou les pensées ne marche
  pas en laboratoire (Webb 2012, Abramowitz 2001) ; l'acceptation habituelle est associée à une meilleure santé à 6
  mois (Ford 2018) ; les thérapies fondées sur l'acceptation marchent **autant que la TCC, pas mieux** (A-Tjak 2015,
  Gloster 2020) ; en expérience, l'acceptation **ne fait pas mieux que d'autres stratégies sur l'affect négatif**
  (Kohl 2012). Donc : « accepter vaut mieux que lutter contre », oui ; « accepter est la meilleure façon », non.
- **C3** (vouloir le bonheur rend malheureux) : la forme générale ne tient pas : l'effet dépend de la culture (Ford
  2015, inversé en Russie et en Asie de l'Est), d'un facteur sur trois de l'échelle (Luhmann 2016), et c'est
  **l'inquiétude** sur son bonheur, pas l'aspiration, qui est liée au mal-être (Zerwas 2024). Aucune donnée arabe.

**Le pilote tient**, et c'est même un bon pilote pour montrer ce qu'est un ⚠️ honnête, **à trois conditions** :
(1) l'épisode porte sur C1 + C2 seulement (C3 au plus en une phrase de nuance, jamais en hook) ; (2) la nuance dite
est « accepter le sentiment, pas la situation » (Ford 2018) ou « pas mieux que d'autres bonnes façons » (Kohl 2012),
une seule ; (3) l'« à retenir » ne promet rien. Pour qui : adultes, échantillons surtout d'Amérique du Nord, d'Europe,
d'Australie et du Japon, parfois femmes seulement, aucun arabe ; **pas un traitement de la dépression**.

Formulation honnête (pistes pour l'écrivain, à défier et valider ; ~10 s) :
- Verdict : « اللي بيحكموا على زعلهم بقسوة، حالتهم بتبقى أسوأ مع الوقت. واللي بيقبلوه، أحسن. بس القبول مش سحر،
  وقبول الإحساس مش معناه تقبل المشكلة. »
- Carte : « Ford et al., 2018 · JPSP · 1,381 شخص · ارتباط، مش تجربة » (pays à lire dans le texte intégral avant de l'écrire).
- À retenir : « المرة الجاية اللي تلاقي نفسك زعلان إنك زعلان: قول "أنا زعلان، وده طبيعي"، من غير ما تحكم على
  نفسك. لو الإحساس مكمّل أسابيع ومأثر على حياتك، كلّم متخصص. » Appui : Ford 2018 et Shallcross 2010
  (association) ; nommer l'émotion : Kircanski 2012 (effet physiologique, pas sur la peur rapportée) : donc « ممكن
  يساعد », jamais « هيعدّي ». Ne jamais dire « طلّع اللي جواك » (Bushman 2002).
- Hooks possibles sans affirmer plus que le verdict : question (« إمتى آخر مرة زعلت إنك زعلان؟ »), `cold_open`,
  `book_claim`. Le hook « chercher le bonheur le fait fuir » est à retirer ; s'il revient, c'est en question avec la
  culture en réponse (« في أمريكا آه… في روسيا وشرق آسيا العكس »), ce qui ferait un bon second épisode.

### Si le propriétaire veut un premier verdict net : deux autres idées (sources vérifiées aujourd'hui)

1. **« La volonté est un muscle qui s'épuise »** (*Willpower*, Baumeister et Tierney ; titre et ISBN à vérifier) →
   **❌, confiance haute pour l'effet de laboratoire classique.**
   - Hagger et al. 2016, *Perspect. Psychol. Sci.* 11(4), `10.1177/1745691616652873` : réplication préenregistrée,
     23 laboratoires, N = 2 141, d = 0,04 [−0,07 ; 0,15].
   - Vohs et al. 2021, *Psych. Sci.* 32(10), `10.1177/0956797621989733` : 36 laboratoires, N = 3 531, d = 0,06,
     données 4 fois plus probables sous l'hypothèse nulle ; exploratoire : effet plus grand chez les plus fatigués.
   - Carter, Kofler, Forster, McCullough 2015, *J. Exp. Psychol. Gen.* 144(4), `10.1037/xge0000083` : « very little
     evidence that the depletion effect is a real phenomenon ».
   - Bonus pédagogique : Hagger et al. 2010 (méta-analyse qui disait l'inverse) montre au spectateur la crise de la
     réplication. Nuance : la fatigue existe ; l'idée réfutée est « un acte de volonté vide un réservoir ».
2. **« Quand ça va mal, l'homme se retire, la femme veut parler »** (Gray) → **❌ sur « c'est le sexe qui décide »,
   ⚠️ sur le reste.** Sensible, mais la preuve teste directement l'affirmation et va contre le stéréotype sans en créer
   un inverse.
   - Papp, Kouros, Cummings 2009, *Pers. Relationships* 16(2), `10.1111/j.1475-6811.2009.01223.x` : 116 couples
     américains, journaux à domicile : « mari exige / femme se retire » et l'inverse **aussi fréquents** ; celui qui
     ouvre le conflit tend à être celui qui exige.
   - Schrodt, Witt, Shimkowski 2013 (papier 2014), *Commun. Monogr.* 81(1), `10.1080/03637751.2013.813632` :
     méta-analyse de 74 études, N = 14 255 : le schéma « exiger / se retirer » est lié à de moins bons résultats
     (r = 0,36), **quel que soit le sens** (r = 0,38 et 0,39).
   - Carothers & Reis 2013, *JPSP* 104(2), `10.1037/a0030437` : les différences psychologiques entre sexes sont des
     dimensions, pas des catégories. Contre-position à citer : Del Giudice et al. 2012 (différences multivariées de
     personnalité importantes). Limites : couples hétérosexuels mariés, américains.

### Les idées de remplacement des propositions, jugées

| Idée (proposée par) | Verdict tenable | Jugement |
|---|---|---|
| « 21 jours pour une habitude » (B, C) | ❌, confiance modérée | Lally et al. 2010 (`10.1002/ejsp.674`, Crossref `issued` 2009) : 96 volontaires, 82 analysés, modèle ajusté pour 62, **bon ajustement pour 39** ; 18 à 254 jours. Singh et al. 2024 (`10.3390/healthcare12232488`) : 20 études, 2 601 participants, **11 à risque de biais élevé**, 4 donnent un temps : médianes 59-66 j, moyennes 106-154 j, 4 à 335 j. Le ❌ sur « 21 jours » tient ; **remplacer par « 66 jours » serait un nouveau mythe** (le « 66 » vient du texte intégral, non lu ici, sur une quarantaine de personnes). Dire « des semaines à des mois, très variable » |
| Volonté qui s'épuise (C) | ❌, haute | Le meilleur dossier des propositions (ci-dessus) |
| Grit (B) | ⚠️ | Credé, Tynan, Harms 2017 (`10.1037/pspp0000102`) : 88 échantillons, 66 807 personnes : grit « only moderately correlated » avec la performance, « very strongly » avec la conscience ; structure non confirmée. Bon sujet ⚠️ |
| 10 000 heures (A) | ⚠️ | Macnamara et al. 2014 (`10.1177/0956797614535810`) : la pratique délibérée explique 26 % (jeux), 21 % (musique), 18 % (sport), 4 % (éducation), < 1 % (professions) ; **corrigendum 2018** (`10.1177/0956797618769891`, méthode d'ajustement) à lire avant de citer un pourcentage ; Gladwell n'est pas un livre de développement personnel au sens strict |
| Visualiser la réussite (A) | non jugeable | Kappes & Oettingen 2011 (`10.1016/j.jesp.2011.02.003`) : aucun résumé récupérable par API ; un seul laboratoire au dossier. Trop mince en l'état |
| Mars / Vénus (B, en 3ᵉ) | ⚠️ / ❌ selon la sous-affirmation | Hyde 2005 (46 méta-analyses, « similar on most, but not all ») et Zell 2015 (106 méta-analyses, d absolu moyen 0,21 ; 46 % petits, 39 % très petits) ; mais Del Giudice 2012 et Carothers & Reis 2013 doivent être au dossier (objection 13). Mieux : la sous-affirmation « exiger / se retirer » ci-dessus |

---

## (e) Classement sous l'angle science et contenu

1. **A** : le plus de liens mécaniques entre ce qui est dit et ce qui est prouvé (claim par réplique, chiffre dans une
   preuve, `basis` du livre, chaîne de résumés, `human_checked`, relecteur sans cache, phrase d'orientation dans la
   vidéo). Ses failles se corrigent sans changer son architecture : objections 1, 2, 3, 4, 8, 11, 14, 17, 21.
2. **C** : la meilleure grille de preuves (✅/❌ interdits en « low », réplications multi-laboratoires, plan détecté,
   preuves sondées avant le script, revérification des épisodes publiés, modérateur culturel vu). Mais un matcher trop
   permissif, un contresens déjà présent dans son propre dossier (Kohl), une santé mentale réduite à un avertissement,
   et surtout un débit de 1 épisode par jour validé par lot qui met la science sous la pression de l'automatisation.
3. **B** : la meilleure défense contre le contresens (relecteur aveugle, phrase entière) et la plus sûre en droit
   d'auteur, mais elle repose sur les résumés d'OpenAlex (absents pour les méta-analyses Elsevier du pilote, tronqués
   ailleurs), ne vérifie pas ce que dit le livre, ne sait pas représenter une réplication multi-laboratoires, et laisse
   l'avertissement santé dans la description.

**Recommandation de synthèse** : partir de A ; y greffer le relecteur aveugle et la phrase entière de B, la grille de
C (✅/❌ interdits en « low », `multilab_replication`, plan détecté, revérification des publiés) ; ajouter ce qu'aucune
n'a : l'agent contre-preuve et le protocole de recherche tracé (objection 2), le rejet des notices (1), le rôle des
phrases d'appui (3), l'« à retenir » rattaché à une preuve causale (4), la grille écrite du badge avec un état « ❓ »
(5), l'applicabilité au public égyptien (17), la règle « hook ≤ verdict » et « dénouement ≤ verdict » (14, 15), la page
publique des preuves et des corrections (19, 24). Et un rythme que la vérification peut suivre.
