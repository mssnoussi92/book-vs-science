# Relecture aveugle des sources, deuxième passe — « failure-teaches » (Manson, ch. 7 : on ne progresse que par l'échec ; le chercher et en apprendre)

Relu le 2026-11-26. Seulement les **cinq fiches ajoutées après la première relecture** (`blind-review.md`, 2026-11-23) :
`alfieri-2011-discovery`, `bol-2018-matthew`, `lin-siegler-2016-struggle`, `loh-2012-error-training`, `machin-2020-exam`.

Données récupérées par la session de relecture elle-même (client générique, sans nom ni adresse) : Crossref
`/works/<doi>`, Crossref `/works?filter=updates:<doi>`, OpenAlex `/works/doi:<doi>`, Europe PMC `search … resultType=core`.
Réponses brutes : `/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-r2/raw/` ; textes
entiers : `/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-r2/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : **Alfieri 2011** (manuscrit soumis, dépôt de
l'université de Surrey : ses intervalles de confiance diffèrent un peu de ceux du résumé publié) ; **Bol 2018** (PMC5948972,
version publiée) ; **Machin 2020** (version publiée, CC BY, dépôts de Surrey et de la LSE). Résumé seul : **Lin-Siegler
2016** (PsycNet et le dépôt de Columbia répondent par une application ou une page anti-robots ; non contourné) et **Loh
2012** (accès fermé, aucun dépôt ouvert). J'ai aussi relu le résumé de Traag et al. 2025 (`10.7554/eLife.109042`, déjà
signalé par la première relecture) pour ce qu'il dit de l'effet Matthieu.

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `design`, `mena`, `population`,
`findings[].text` ; les `support.sentence`, `kind`, `effect`, `n`/`k`, `designSetBy` et `limits` seulement après avoir lu
chaque résumé et choisi ma phrase. `declared` et `acknowledged` non lus. Dossier de l'écrivain (`scratchpad/dossiers/`) :
**non ouvert**. **Un écart à signaler** : en cherchant si le schéma a une valeur « quasi-expérience », une recherche du mot
« quasi » dans `content/sources/*.json` m'a montré, avant mes lectures, une ligne de `limits` de `bol-2018-matthew` et une
de `machin-2020-exam` (toutes deux : « quasi-experiment … not random assignment »). J'avais déjà lu dans les deux résumés
qu'il s'agit de comparaisons autour d'un seuil ; mes phrases d'appui ont été choisies ensuite, sur les résumés.

Affirmations (telles que données pour cette passe) :
- **c1** (causale) : après son propre échec (on lui dit que sa réponse est fausse), on apprend autant qu'après un succès.
- **c2** (causale) : faire des erreurs en apprenant, quand une explication ou une correction suit (formation qui encourage
  l'erreur, essayer un problème avant d'être enseigné), donne une meilleure compréhension et un meilleur transfert
  qu'éviter l'erreur ou être enseigné d'abord.
- **c3** (causale) : on apprend des échecs des autres au moins autant que de leurs succès.
- **c4** (causale) : plus on échoue, plus on a de chances de réussir : un revers mène à de meilleurs résultats plus tard.

**Avant tout : trois choses que la vidéo doit savoir.**
1. **c4 est maintenant contredite par deux plans du même rang que Wang 2019** (comparaisons autour d'un seuil) : un échec
   de justesse mène en moyenne à **moins** de financement et de carrière (Bol 2018, Pays-Bas) et à de moins bons parcours
   scolaires (Machin 2020, Angleterre). Une part du coût vient de portes qui se ferment, une autre de gens qui **cessent
   d'essayer** (Bol : on redemande moins). Et Bol ne trouve **aucune** différence de publications ni de citations au seuil :
   le revers n'a ni amélioré ni dégradé le travail lui-même.
2. **c2 perd son mécanisme le plus simple** : dans un essai randomisé qui contrôle l'exploration active et l'information
   donnée (Loh 2012), encourager l'erreur fait mieux qu'interdire l'erreur, **mais pas mieux qu'une formation neutre** ; les
   auteurs attribuent les bénéfices antérieurs à des facteurs confondus. Ce qui tient : « éviter l'erreur nuit ».
3. **Deux fiches ne testent pas l'échec** : la découverte (Alfieri) n'est pas l'échec, et lire les difficultés de grands
   scientifiques (Lin-Siegler) n'est pas apprendre des échecs des autres ; dans Lin-Siegler, des difficultés de vie
   **sans aucun échec** font le même effet.

Vérification d'identité commune aux 5 DOI : titres, premiers auteurs et années concordent avec les `id` des fiches (Loh :
en ligne le 2012-07-09, numéro 2013, 55(2) ; titre complet chez OpenAlex : « … Who Learns From Mistakes? »). OpenAlex
`is_retracted: false` pour les 5 ; Crossref `updated-by` et `update-to` absents, `filter=updates:` à 0 résultat pour
chacun : **aucun avis de correction ni de rétractation.** (Europe PMC signale pour Bol un « Comment in » de *Nature*, 2018,
un article d'actualité ; Crossref lie Bol à sa prépublication SocArXiv `nur8p`.)

---

## 1. 10.1037/a0021017 (alfieri-2011-discovery)

- **Identité** : confirmée. « Does discovery-based instruction enhance learning? » Alfieri, L. (premier auteur ; Brooks,
  Aldrich, Tenenbaum), *Journal of Educational Psychology* 103(1), 1-18, 2011. Ni correction ni rétractation. Résumé :
  OpenAlex seulement (Crossref et Europe PMC n'en ont pas).
- **Plan (relecteur)** : **deux méta-analyses** (effets aléatoires) : découverte sans aide contre enseignement explicite ;
  découverte « enrichie » (générer, s'expliquer, découverte guidée) contre d'autres enseignements. **`meta-analysis` :
  d'accord** ; plafond haute pour ce qu'elle teste, **indirect** pour toutes les affirmations de l'épisode.
- **Population** (texte entier) : 164 études, enfants, adolescents et adultes ; 108 études (580 comparaisons) dans la
  première, 56 (360) dans la seconde. Pays non donnés. MENA : non connu.
- **Résultat principal** : la découverte sans aide fait moins bien que l'enseignement explicite ; la découverte enrichie
  fait mieux que les autres méthodes, en moyenne, avec une forte hétérogénéité.
- **Phrases du résumé** : « Random effects analyses of 580 comparisons revealed that outcomes were favorable for explicit
  instruction when compared to unassisted discovery under most conditions, d = -.38 (95% CI = -.44/-.31). » — « In
  contrast, analyses of 360 comparisons revealed that outcomes were favorable for enhanced discovery when compared to other
  forms of instruction, d = .30(95% CI = .23/.36). » — conclusion : « The findings suggest that unassisted discovery does not
  benefit learners, whereas feedback, worked examples, scaffolding, and elicited explanations do. »
- **Chiffres** (texte entier) : au niveau des études, d = −0,38 [−0,50 ; −0,25] et d = 0,30 [0,15 ; 0,44] ; hétérogénéité
  forte (Q(55) = 260) ; biais de publication testé par le seul « fail-safe N ». **Par type de découverte enrichie** :
  découverte guidée d = 0,50, s'expliquer d = 0,36, **générer d = −0,15** (fait moins bien). **Par comparaison** (tableau
  14) : contre l'enseignement direct d = 0,26 [0,15 ; 0,37] ; contre des exemples résolus d = 0,06 (non significatif) ;
  contre la découverte sans aide d = 0,33. Les travaux non publiés (surtout des « générer ») vont dans l'autre sens.
  Mesures : post-tests, acquisition, temps, auto-évaluations ; **pas de mesure de transfert à part**. Dans la conclusion,
  « feedback » et « worked examples » sont des conditions **d'enseignement explicite** de la première méta-analyse, pas de
  la découverte.
- **c1 : irrelevant**.
- **c2 : nuances (indirect)** — la découverte n'est pas l'erreur ; ce que la méta-analyse dit de proche : sans explication,
  découvrir seul fait **moins** bien qu'être enseigné (ce qui va avec la condition de c2, « quand une explication suit ») ;
  avec guidage ou auto-explication, mieux que l'enseignement direct (d = 0,26) ; mais « générer la réponse » (le plus
  proche d'« essayer avant d'être enseigné ») ne fait pas mieux (d = −0,15), et rien ne mesure le transfert à part.
- **c3 : irrelevant**. **c4 : irrelevant**.
- **Fiche de l'écrivain** : l'écrivain cite le texte entier, au niveau des études : légitime (`where: fulltext`, `readBy`
  rempli). f1 = ma phrase (niveau des études), même sens. **f2 surdit** : le texte compte « generating answers » parmi ce
  qui « did better », alors que la génération fait **moins** bien (d = −0,15, texte entier) ; et l'`effect` d = 0,30
  compare à un mélange (la limite le dit) : si un chiffre doit passer par le shell, prendre la comparaison à l'enseignement
  direct (d = 0,26 [0,15 ; 0,37], tableau 14), et écrire « guided discovery and being asked to explain did better than
  direct teaching; generating answers did not ». f3 = la conclusion du résumé, fidèle. `limits` justes ; ajouter « no
  separate transfer measure » et « generation d = −.15 ».

## 2. 10.1073/pnas.1719557115 (bol-2018-matthew)

- **Identité** : confirmée. « The Matthew effect in science funding. » Bol, T. (premier auteur ; de Vaan, van de Rijt),
  *PNAS* 115(19), 4887-4890, 2018. Accès libre (PMC5948972). Ni correction ni rétractation.
- **Plan (relecteur)** : **quasi-expérience par discontinuité** (texte entier : « we address the causal inference problem
  using a regression-discontinuity approach ») : candidats juste au-dessus contre juste au-dessous du seuil de financement,
  surtout les rangs ±1/±2. Le schéma n'a pas de valeur « quasi-expérience » ; **`longitudinal` (modérée) me convient**, comme
  pour wang-2019-setback (même famille de plan). Pas d'assignation au hasard ; la limite le dit.
- **Population** (texte entier) : **Pays-Bas**, programme « Veni » de la NWO pour les jeunes docteurs (le programme a
  réparti 2,4 milliards d'euros entre 3 660 lauréats depuis 2000) ; suivi 8 ans (financements NWO Vidi/Vici, ERC Starting et
  Consolidator) et poste de professeur 10 à 16 ans plus tard. Nombre de candidats près du seuil non relevé par moi. MENA :
  non.
- **Résultat principal** : les gagnants de justesse obtiennent ensuite plus de deux fois plus de financement que les
  perdants de justesse ; une partie de l'écart vient de ce que les perdants redemandent moins.
- **Phrases du résumé** : « Analyses of review scores reveal that early funding success introduces a growing rift, with
  winners just above the funding threshold accumulating more than twice as much research funding (€180,000) during the
  following eight years as nonwinners just below it. » — « We find no evidence that winners' improved funding chances in
  subsequent competitions are due to achievements enabled by the preceding grant, which suggests that early funding itself
  is an asset for acquiring later funding. » — « Surprisingly, however, the emergent funding gap is partly created by
  applicants, who, after failing to win one grant, apply for another grant less often. »
- **Chiffres** (texte entier) : écart de 180 000 € à 8 ans, **hors** la bourse Veni elle-même (250 000 €) ; chances de
  gagner la bourse suivante 10 % → 26 %, de la demander 40 % → 59 %, l'écart de candidature n'étant pas dû à des départs de
  l'université ou du pays ; professeur 10-16 ans plus tard : 19 % → 28 %. **Publications, citations et indice h : aucune
  discontinuité au seuil**, ni avant ni après (« the early career grant does not raise measurable dimensions of scientific
  output »).
- **c1 : irrelevant**. **c2 : irrelevant**. **c3 : irrelevant**.
- **c4 : contradicts (indirect)** — un échec de justesse mène en moyenne à de moins bons résultats ensuite (financement,
  carrière), et non à de meilleurs ; mécanisme en partie institutionnel (le jury préfère les anciens lauréats), en partie
  personnel (on cesse d'essayer). Le travail lui-même ne change pas au seuil : pas de trace d'un échec qui « rend
  meilleur ». Indirect : le résultat mesuré est une récompense, pas un apprentissage. Converge avec Traag et al. 2025
  (l'effet Matthieu se réplique dans 14 programmes de 6 financeurs).
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; textes fidèles (« less than half » = « more than twice »,
  hors la bourse elle-même : à préciser). `kind: causal` acceptable pour une discontinuité. `limits` justes ; remplacer
  « numbers of applicants not given in the abstract » par « Netherlands, NWO Veni ; no discontinuity in publications or
  citations ; professorship 19 % → 28 % ; reapplying 59 % → 40 % » (texte entier), et ajouter Traag 2025 (réplication de
  l'effet Matthieu, robuste).

## 3. 10.1037/edu0000092 (lin-siegler-2016-struggle)

- **Identité** : confirmée. « Even Einstein struggled: Effects of learning about great scientists' struggles on high school
  students' motivation to learn science. » Lin-Siegler, X. (premier auteur ; Ahn, Chen, Fang, Luna-Lucero), *Journal of
  Educational Psychology* 108(3), 314-328, 2016. Résumé : OpenAlex seulement. Ni correction ni rétractation.
- **Plan (relecteur)** : **expérience à trois bras** (lutte intellectuelle, lutte dans la vie, découvertes seules) ;
  **l'assignation au hasard, et son niveau (élève ou classe), ne sont pas dits dans le résumé** (texte entier non lu).
  `experiment` (modérée) **provisoire** : si des classes entières ont reçu une condition, c'est une quasi-expérience (comme
  nachtigall-2020-non-stem), à descendre.
- **Population** : 402 élèves de 9e et 10e année (environ 14-16 ans), « demographically diverse » ; pays non dit (auteurs
  à Columbia et à l'université de Washington, États-Unis). MENA : non.
- **Résultat principal** : lire les luttes de grands scientifiques, intellectuelles **ou personnelles**, améliore
  l'apprentissage des sciences ensuite, plus que lire leurs seules découvertes ; plus encore chez les élèves faibles ; les
  élèves se sentent plus proches des scientifiques.
- **Phrases du résumé** : « Results showed that participation in either of the struggle story conditions improved science
  learning postintervention, relative to that of students in the control condition. » — « Additionally, the effect of our
  intervention was more pronounced for low-performing students. » — « Moreover, far more students in either of the struggle
  story conditions felt connected to the stories and scientists than did students in the control condition. »
- **Taille d'effet** : pas dans le résumé ; la mesure de « science learning » non plus.
- **c1 : irrelevant**. **c2 : irrelevant** (les erreurs sont celles des scientifiques, lues, pas celles de l'élève).
- **c3 : nuances (indirect) — ne peut pas porter c3** : on ne mesure pas ce que les élèves apprennent **des** échecs
  racontés, mais leur apprentissage des sciences, par la motivation ; les histoires de lutte finissent par un succès ; et la
  condition « lutte dans la vie » (pauvreté, manque de soutien), **sans échec**, fait le même effet : l'ingrédient actif
  n'est pas l'échec mais la difficulté surmontée, ou le sentiment de proximité.
- **c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. **Le texte de f1 surdit** : « how great scientists
  struggled and failed before succeeding » met l'échec dans les deux conditions ; écrire « read about scientists' struggles,
  intellectual (mistakes) or personal (hardship), before their success ». `limits` justes et honnêtes (les trois disent
  l'essentiel) ; ajouter « measure of science learning not given in the abstract ».

## 4. 10.1177/0018720812451856 (loh-2012-error-training)

- **Identité** : confirmée. « The Moderating Effect of Individual Differences in Error-Management Training » (OpenAlex :
  « …: Who Learns From Mistakes? »). Loh, V. (premier auteur ; Andrews, Hesketh, Griffin), *Human Factors* 55(2), 435-448 ;
  en ligne le 2012-07-09. Accès fermé. Ni correction ni rétractation.
- **Plan (relecteur)** : **essai randomisé** (« We randomly allocated 164 participants »), trois consignes de formation
  (encourager l'erreur, éviter l'erreur, aucune consigne), exploration active et information sur la tâche contrôlées.
  **`rct` (modérée) : d'accord** (`experiment` irait aussi).
- **Population** : 164 personnes en formation sur ATC-lab, une simulation de contrôle aérien ; pays non dit (auteurs à
  Sydney et Macquarie, Australie). MENA : non.
- **Résultat principal** : encourager l'erreur donne un meilleur transfert qu'interdire l'erreur, mais pas meilleur que la
  formation neutre ; les plus capables profitent plus d'une consigne tournée vers l'erreur (positive ou négative) ;
  interdire l'erreur nuit.
- **Phrases du résumé** : « Error encouragement yielded better transfer performance than did error avoidance but was no
  better than the control training. » — « Higher- rather than lower-ability trainees benefited from training with an error
  orientation (positive or negative), suggesting that learning from errors in training requires greater cognitive
  resources. » — « Trainees higher in openness to experience and agreeableness performed more poorly with error-avoidance
  training than with error-encouragement and control training. » — conclusion : « Error-avoidance training had a
  detrimental effect especially for those less open to experience, lower in agreeableness, and of lower ability. » — et :
  « The significant benefits of error-encouragement training reported in previous research were probably attributable to
  confounding factors, such as active exploration and differential task information. »
- **Le résumé se contredit** : la phrase de résultat dit que les **plus** ouverts et les **plus** agréables font moins bien
  avec la consigne d'éviter l'erreur ; la conclusion dit que la consigne nuit surtout aux **moins** ouverts et **moins**
  agréables. Sans le texte entier (fermé), on ne peut pas savoir laquelle est juste. Pour la capacité, les deux phrases vont
  dans le même sens (les moins capables profitent moins de toute consigne tournée vers l'erreur, et la consigne d'éviter
  leur nuit).
- **Taille d'effet** : pas dans le résumé.
- **c1 : irrelevant**.
- **c2 : nuances** — soutient la moitié « mieux qu'**éviter** l'erreur » (transfert, essai randomisé) ; mais la formation
  qui encourage l'erreur ne fait **pas mieux qu'une formation neutre**, et les auteurs attribuent les gains antérieurs
  (méta-analyse keith-2008-error-management) à des facteurs confondus : le gain vient de ce qu'interdire l'erreur nuit, pas
  de ce que l'erreur enseigne. Et ce n'est pas pour tout le monde (moins capables). Le résumé ne dit pas qu'une explication
  suivait les erreurs.
- **c3 : irrelevant**. **c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 = ma phrase, même sens, texte fidèle. f2 : ma phrase ; préciser dans le texte « (whether
  errors were encouraged or to be avoided) », sinon « training focused on errors » se lit « encourager l'erreur ». **f3 :
  la phrase d'appui (la conclusion) contredit la phrase de résultat pour l'ouverture et l'amabilité** ; garder seulement
  « telling trainees to avoid errors harmed them, especially the lower-ability ones », ou lire le texte entier avant de
  dire autre chose. `limits` justes ; ajouter la contradiction du résumé.

## 5. 10.1016/j.jpubeco.2020.104224 (machin-2020-exam)

- **Identité** : confirmée. « Entry through the narrow door: The costs of just failing high stakes exams. » Machin, S.
  (premier auteur ; McNally, Ruiz-Valenzuela), *Journal of Public Economics* 190, 104224, 2020. Accès libre (CC BY). Ni
  correction ni rétractation. Résumé : OpenAlex et texte publié.
- **Plan (relecteur)** : **quasi-expérience par discontinuité « floue »** (texte entier : la note C est instrumentée par la
  note d'origine, avant toute révision ; données administratives avec notes d'origine et notes révisées). **`longitudinal`
  (modérée) : d'accord**, faute de valeur « quasi-expérience » ; pas d'assignation au hasard (la limite le dit).
- **Population** (texte entier) : **Angleterre**, l'épreuve d'anglais du GCSE (« English Language », niveau supérieur, jury
  AQA, juin 2013), à 16 ans ; **49 231 élèves** dans l'échantillon principal ; suivis jusqu'à 18-19 ans. MENA : non.
- **Résultat principal** : trois ans après, ceux qui ont échoué de justesse à la note C entrent moins souvent dans une
  filière supérieure du secondaire et dans le supérieur, et quittent plus souvent l'école à 18 ans sans emploi.
- **Phrases du résumé** : « Three years later, students who just fail to achieve the required threshold have a lower
  probability of entering an upper-secondary high-level academic or vocational track and of starting tertiary education. »
  — « Those who fail to pass the threshold are also more likely to drop out of education by age 18, without some form of
  employment. »
- **Chiffres** (texte entier) : filière supérieure dans les 3 ans : −6,4 à −9 points (environ 75 % des élèves à D y
  entrent) ; supérieur : −2,5 à −4 points (sur environ 13 %) ; décrochage à 18 ans : +4 points (moyenne nationale 12 %) ;
  ni études ni emploi (NEET) : +2 points. 29,3 % de ceux qui n'ont pas eu C repassent l'épreuve dans les deux ans, 45 %
  d'entre eux l'obtiennent. Mécanisme montré : des portes qui se ferment (cours, établissements, camarades plus faibles) ;
  un effet psychologique n'est **pas** mesurable dans leurs données (les auteurs le disent).
- **c1 : irrelevant**. **c2 : irrelevant**. **c3 : irrelevant**.
- **c4 : contradicts (indirect)** — un échec de justesse mène en moyenne à de moins bons résultats ensuite, pas meilleurs ;
  mécanisme surtout institutionnel (la note ouvre des portes), pas ce que l'échec a appris. Un pays, une épreuve.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; textes fidèles (« without a job » ≈ « without some form
  of employment »). `kind: causal` acceptable (discontinuité). `limits` justes ; remplacer « sample size not given … abstract
  read from OpenAlex only » par « 49,231 students, AQA English Language higher tier, June 2013 (full text) » et ajouter les
  ordres de grandeur (−9 points pour la filière, +4 pour le décrochage).

---

## Travaux trouvés en vérifiant

- **Traag, V. et al. (2025)**, « The Matthew effect and early-career setbacks in research funding—a replication study »,
  *eLife* (prépublication évaluée), `10.7554/eLife.109042` (déjà signalé par la première relecture pour Wang 2019). Pour
  Bol : « We find that the Matthew effect replicates, is robust across funders and model specifications, and generalises
  to the whole population. » Pour Wang : l'effet du revers « is not robust … and does not generalise », attribué à une
  sélection. Plan : observationnel, prépublication : plafond bas, mais c'est la réplication indépendante des deux.

## Tableau final

| DOI | c1 propre échec = succès | c2 erreurs + explication > éviter / enseigné d'abord | c3 échecs des autres ≥ succès des autres | c4 un revers mène à mieux |
|---|---|---|---|---|
| 10.1037/a0021017 (Alfieri 2011) | irrelevant | nuances (indirect : découverte ≠ erreur ; « générer » d = −0,15) | irrelevant | irrelevant |
| 10.1073/pnas.1719557115 (Bol 2018) | irrelevant | irrelevant | irrelevant | contradicts (indirect : financement, carrière ; on redemande moins ; travail inchangé) |
| 10.1037/edu0000092 (Lin-Siegler 2016) | irrelevant | irrelevant | nuances (indirect ; ne porte pas c3 : motivation, lutte sans échec aussi efficace) | irrelevant |
| 10.1177/0018720812451856 (Loh 2012) | irrelevant | nuances (mieux qu'éviter l'erreur, pas mieux que neutre ; résumé contradictoire sur la personnalité) | irrelevant | irrelevant |
| 10.1016/j.jpubeco.2020.104224 (Machin 2020) | irrelevant | irrelevant | irrelevant | contradicts (indirect : portes fermées ; un pays) |

## Lecture d'ensemble : ce que ces fiches changent (direction et plafond, `docs/verdict.md` §3)

**c1 — inchangée** (contredite telle quelle, l'écart disparaît quand l'échec est expliqué ; certitude basse). Aucune des
cinq fiches ne la touche.

**c2 — soutenue en partie ; la forme « mieux qu'éviter l'erreur » tient, la forme « l'erreur enseigne en soi » faiblit.**
Loh, essai randomisé qui contrôle ce que les études antérieures laissaient varier, trouve l'encouragement à l'erreur
meilleur qu'interdire l'erreur, **égal** à une formation neutre, et seulement pour les plus capables ; il vise directement
la méta-analyse keith-2008-error-management (même famille de méthode : formation à la gestion des erreurs). Une preuve de
rang inférieur ne retire pas la direction « soutient » à une méta-analyse, mais elle ajoute de l'**incohérence** et un
doute sur le mécanisme : pour la moitié « formation à l'erreur », je descendrais de modérée à **basse** ; pour « essayer
avant d'être enseigné » (sinha-2021-productive-failure), rien de nouveau, sauf l'avertissement d'Alfieri : découvrir seul,
sans explication, fait moins bien qu'être enseigné (d = −0,38), et « générer » ne fait pas mieux (d = −0,15). Ce que la
vidéo peut dire honnêtement : « s'interdire l'erreur en apprenant nuit ; essayer, puis recevoir l'explication, aide
souvent, surtout pour comprendre ». Pas : « faire des erreurs fait apprendre plus ».

**c3 — inchangée** (soutenue faiblement ; certitude basse). Lin-Siegler ne la porte pas : elle montre que des histoires de
difficultés surmontées motivent, pas qu'on apprend des échecs des autres ; à ne pas citer pour c3, éventuellement pour un
« à retenir » de motivation (« ممكن يساعد »), avec sa limite.

**c4 — maintenant contredite en moyenne ; certitude basse.** Deux discontinuités du même rang que wang-2019-setback, dans
deux pays et deux domaines, trouvent qu'un échec de justesse mène à **moins** ensuite (Bol : financement, poste ; Machin :
filière, études, décrochage) ; la réplication indépendante (Traag 2025) confirme l'effet Matthieu et ne trouve pas robuste
l'effet du revers de Wang, qu'elle attribue à la sélection des survivants. Règle du §3 : une preuve qui contredit, de rang
égal, **interdit « soutient »** pour c4. Indirect à dire : les deux mesurent des portes (bourses, notes), pas ce que
l'échec a appris, et Bol montre que le travail lui-même ne change pas au seuil. Certitude basse (indirect, un pays chacune),
donc pas de ❌ sur c4 seule. Ce que la vidéo peut dire : « un échec, même de justesse, coûte souvent cher ensuite, en
partie parce qu'on arrête d'essayer » ; la nuance la plus utile pour le livre est celle de Bol : **le coût vient en partie
de ceux qui cessent de se présenter** (59 % → 40 % de candidatures), ce qui rejoint le conseil du livre de ne pas fuir
l'échec, sans dire qu'il rend meilleur.

**Badge** (indication, la décision reste à l'écrivain et au propriétaire) : inchangé : certitude du verdict **basse** :
⚖️ (ou ❓), jamais ✅ ni ❌. « Plus on échoue, plus on réussit » ne peut être dit ni comme un résultat ni comme un hook
affirmatif ; posé en question, le hook doit laisser la réponse ouverte (la réponse du dossier penche vers « non »).

**Égypte / MENA.** Aucune des 5 fiches n'a d'échantillon arabe (`mena: false` partout, justifié ; Alfieri : pays des 164
études non donnés). Pays connus : Pays-Bas (Bol), Angleterre (Machin), États-Unis (Lin-Siegler, d'après les auteurs),
Australie (Loh, d'après les auteurs). « معظم الدراسات من أمريكا وأوروبا » est exact. Machin et Bol décrivent des systèmes
(bourses, examen à seuil) dont l'équivalent existe dans le monde arabe (le baccalauréat, la « ثانوية عامة »), mais rien ne
dit que l'effet y serait le même.

**Indépendance des preuves.** Bol, Machin et Wang : trois jeux de données et trois équipes ; Traag est indépendant des
deux études de financement. Loh (Australie) est indépendant de Keith et Frese (keith-2008, keith-2022) et les contredit en
partie. Alfieri est indépendant de Kapur (sinha-2021). Lin-Siegler est l'équipe qui a conçu les histoires.

## Corrections demandées aux fiches

1. **alfieri-2011-discovery** : f2 : retirer « generating answers » de ce qui « did better » (génération d = −0,15, texte
   entier) ; si un chiffre passe par le shell, prendre d = 0,26 [0,15 ; 0,37] contre l'enseignement direct (tableau 14) au
   lieu de 0,30 contre un mélange ; `limits` : pas de mesure de transfert à part ; dans la conclusion, « feedback » et
   « worked examples » sont des conditions d'enseignement explicite.
2. **loh-2012-error-training** : f3 : le résumé se contredit sur l'ouverture et l'amabilité (résultat : les **plus**
   ouverts et agréables pâtissent ; conclusion : les **moins**) ; garder seulement la capacité, ou lire le texte entier. f2 :
   préciser « encouraged or to be avoided ». Ajouter en limite que les auteurs attribuent les bénéfices antérieurs (Keith
   2008) à des facteurs confondus.
3. **lin-siegler-2016-struggle** : f1 : « struggled and failed » → « struggles, intellectual (mistakes) or personal
   (hardship) » ; `design` : provisoire tant que l'assignation (élève ou classe) n'est pas lue au texte entier ; ne pas
   l'employer pour c3.
4. **bol-2018-matthew** : `limits` : Pays-Bas, NWO Veni ; aucune discontinuité dans les publications et citations ; poste
   de professeur 19 % → 28 % ; candidatures 59 % → 40 % ; 180 000 € hors la bourse elle-même ; Traag 2025 (effet Matthieu
   répliqué).
5. **machin-2020-exam** : `limits` : 49 231 élèves, anglais du GCSE, AQA, juin 2013 ; −6,4 à −9 points pour la filière,
   +4 points de décrochage ; effet psychologique non mesuré.

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `effect`, `n`/`k`, `designSetBy`, `limits` (sauf les deux lignes de `limits` vues par la recherche
« quasi », signalées plus haut) ; `declared` et `acknowledged` non lus. Dépôt `/home/user/book-vs-science` : seul ce
fichier a été créé (`reports/failure-teaches/blind-review-2.md`) ; rien d'autre modifié, aucune commande git.
