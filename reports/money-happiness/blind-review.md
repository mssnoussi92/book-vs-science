# Relecture aveugle des sources — « money-happiness » (Manson : au-delà d'un point, l'argent n'ajoute plus de bonheur)

Relu le 2026-11-22. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis de correction ou de rétractation qui pointent vers l'article), OpenAlex
`/works/doi:<doi>`, Europe PMC `search … resultType=core` (`abstractText`). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-money/raw/` ; textes entiers :
`…/scratchpad/blind-money/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : Kahneman 2010, Killingsworth 2021, Killingsworth 2023
et Dwyer 2022 (PMC) ; Stevenson 2013 dans sa version NBER w18992 ; Lindqvist 2020 dans sa version NBER w24667 ; Rock 2025
(article publié, accès libre) ; Gardner 2006 (version auteur, dépôt de Warwick) ; Jebb 2018 : **informations
complémentaires seulement** (fichier ESM de Springer), pas l'article. Brickman 1978, Howell 2008 et Silver 2016 : résumé
seul (accès fermé).

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `mena`, `population`, `findings[].text` ; les
`support.sentence`, `kind`, `design`, `n`/`k`, `effect` et `limits` seulement après avoir lu chaque résumé et choisi ma
phrase. `declared` et `acknowledged` non lus. Dossier de l'écrivain (`scratchpad/dossiers/`) : **non ouvert**.

Affirmations :
- **c1** : la satisfaction de vie (évaluation) cesse de monter avec le revenu au-delà d'un seuil.
- **c2** : le bien-être ressenti au quotidien (émotions) plafonne au-dessus d'environ 75 000 $.
- **c3** : recevoir plus d'argent (loterie, transfert) n'élève pas durablement le bien-être (causal).
- **c4** : chaque montant supplémentaire de revenu ajoute moins de bien-être (rendements décroissants).

**Avant tout : c4 est ambigu et doit être fixé.** « Chaque montant supplémentaire ajoute moins » peut vouloir dire
*par dollar* (vrai dès que la relation est linéaire en log du revenu, ce que trouvent presque toutes les études ci-dessous)
ou *par doublement* (« chaque doublement rapporte moins », ce que Stevenson 2013 et Killingsworth 2021 contredisent). Je
note les deux lectures séparément.

Vérification d'identité commune aux 12 DOI : Crossref `updated-by` et `update-to` absents, aucun document Crossref ne
déclare mettre à jour l'un d'eux (`filter=updates:` : 0 résultat pour chacun), OpenAlex `is_retracted: false` pour
tous. **Aucun avis de correction ni de rétractation trouvé.** Titres, premiers auteurs et années concordent avec les `id`
des fiches (écarts d'un an seulement entre mise en ligne et numéro : Gardner, Rock, Silver ; tolérés).

---

## 1. 10.1073/pnas.1011492107 (kahneman-2010-income)

- **Identité** : confirmée. « High income improves evaluation of life but not emotional well-being. » Kahneman, D.
  (premier auteur ; Deaton), 2010, *PNAS* 107(38), 16489-16493. Article de recherche. Ni correction ni rétractation.
- **Plan (relecteur)** : **transversal** (sondage quotidien Gallup-Healthways 2008-2009) ; émotions de la veille en
  oui/non, revenu du ménage déclaré par tranches. Plafond : basse.
- **Population** : plus de 450 000 réponses, résidents des États-Unis. (Texte entier : 28,4 % de l'échantillon écarté,
  revenus manquants ou invraisemblables.) MENA : non.
- **Résultat principal** : l'évaluation de vie monte régulièrement avec le log du revenu ; les émotions montent aussi,
  puis plus aucun progrès au-delà de ~75 000 $ (le stress dès ~60 000 $, texte entier).
- **Phrases du résumé** : « When plotted against log income, life evaluation rises steadily. » — « Emotional well-being
  also rises with log income, but there is no further progress beyond an annual income of ~$75,000. »
  (Texte entier : « the effects of income on individuals' life evaluations show no satiation, at least to an amount well
  over $120,000. »)
- **Taille d'effet** : pas dans le résumé. (Texte entier, tableau 2, tranche du haut vs la suivante : échelle de vie
  +0,23, t = 19,4 ; affect positif t = 1,9 ; tristesse t = 0,6 ; stress t = 1,5.)
- **c1 : contradicts** — c'est l'étude d'où vient le chiffre de 75 000 $, et elle dit l'inverse pour la satisfaction :
  pas de satiété « au moins jusqu'à bien plus de 120 000 $ ». La phrase du livre (« la satisfaction ne monte que
  jusqu'à environ 75 000 $ ») **attribue à la satisfaction un seuil que l'étude a trouvé pour les émotions**.
- **c2 : supports** — avec des questions oui/non sur la veille ; Kahneman lui-même relit en 2023 ce plateau comme un effet
  plafond de la mesure (voir n° 3).
- **c3 : irrelevant** (transversal, rien n'est donné à personne).
- **c4 : supports par dollar** (linéaire en log = chaque dollar rapporte moins ; texte entier : « Plots of subjective
  well-being against income in dollars invariably yield a strongly concave function. ») ; **contradicts par doublement**
  pour l'évaluation de vie (montée régulière).
- **Fiche de l'écrivain** : les trois `support.sentence` sont mes phrases (f1, f2) ou la conclusion du résumé (f3) :
  même sens. f1 « by the same step for each doubling, with no plateau in sight » : fidèle (« rises steadily » en log ;
  « no plateau » vaut jusqu'à « well over $120,000 », pas à l'infini). f3 : « buys » est un verbe causal des auteurs sur
  des données transversales ; `kind: association` est juste, à ne pas traduire par « بيشتري ». `design` et `limits`
  justes ; préciser que la réanalyse de 2023 situe le coude vers 100 000 $, dans un autre jeu de données.

## 2. 10.1073/pnas.2016976118 (killingsworth-2021-experienced)

- **Identité** : confirmée. « Experienced well-being rises with income, even above $75,000 per year. » Killingsworth,
  M. A. (seul auteur), 2021, *PNAS* 118(4), e2016976118. Ni correction ni rétractation.
- **Plan (relecteur)** : **échantillonnage d'expériences** (application *Track Your Happiness*) ; le lien au revenu est
  entre personnes, donc transversal. Plafond : basse.
- **Population** : 33 391 adultes **en emploi** aux États-Unis, 1 725 994 rapports. (Texte entier : âge médian 33 ans,
  revenu médian du ménage 85 000 $, 36 % d'hommes ; l'auteur écrit qu'aucun échantillonnage d'expériences n'est
  représentatif, celui-ci non plus.) MENA : non.
- **Résultat principal** : émotions du moment et satisfaction de vie montent linéairement avec log(revenu), avec la même
  pente au-dessus et au-dessous de 80 000 $ ; aucun plateau.
- **Phrases du résumé** : « Drawing on 1,725,994 experience-sampling reports from 33,391 employed US adults, the present
  results show that both experienced and evaluative well-being increased linearly with log(income), with an equally
  steep slope for higher earners as for lower earners. » — « There was no evidence for an experienced well-being
  plateau above $75,000/y, contrary to some influential past research. »
- **Taille d'effet** : pas dans le résumé. (Texte entier : pente b = 0,109 jusqu'à 80 000 $, 0,110 au-delà ; r = 0,17
  pour la satisfaction, 0,09 pour le ressenti : liens **faibles**.)
- **c1 : contradicts** (satisfaction linéaire en log, aucun seuil).
- **c2 : contradicts** (en moyenne).
- **c3 : irrelevant**.
- **c4 : supports par dollar, contradicts par doublement** — texte entier, phrase de l'auteur : « The logarithmic
  relationship implies that marginal dollars do matter less the more one earns, while proportional differences in
  income have a constant association with well-being regardless of income. »
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; textes fidèles. `limits` justes.

## 3. 10.1073/pnas.2208661120 (killingsworth-2023-conflict)

- **Identité** : confirmée. « Income and emotional well-being: A conflict resolved. » Killingsworth, M. A. (premier
  auteur ; Kahneman, Mellers), 2023, *PNAS* 120(10), e2208661120. Ni correction ni rétractation.
- **Plan (relecteur)** : collaboration adversariale ; **réanalyse** des données de 2021 par régressions quantiles ;
  transversal pour le revenu. Plafond : basse. Pas indépendant du n° 2 (mêmes données) ni du n° 1 (même auteur).
- **Population** : celle du n° 2 (adultes en emploi, États-Unis). MENA : non.
- **Résultat principal** : le plateau n'existe **que chez les moins heureux** ; chez les autres, le bonheur continue de
  monter avec log(revenu), et accélère chez les plus heureux ; Kahneman et Deaton avaient surestimé le plateau (leurs
  questions oui/non mesuraient le malheur, effet plafond).
- **Phrases du résumé** : « A reanalysis of Killingsworth's experienced sampling data confirmed the flattening pattern
  only for the least happy people. » — « Happiness increases steadily with log(income) among happier people, and even
  accelerates in the happiest group. »
  Déclaration « Significance », publiée par PNAS avec le résumé (présente dans PMC, absente chez Crossref et OpenAlex) :
  « …the flattening pattern exists but is restricted to the least happy 20% of the population… »
- **Taille d'effet** : pas dans le résumé. (Texte entier : « The happiness of the least happy 15% rises quickly in the
  lower range of income, leveling off abruptly at $100,000 » ; pentes au-delà de 100 000 $ non significatives aux 5e,
  10e, 15e centiles (0,25 ; 0,52 ; 0,34), à la limite au 20e (0,62 ; p = 0,08) ; aplatissement au 15e p = 0,0002 ;
  accélération au 85e p = 0,023 ; pas de différence aux 30e, 50e, 70e.)
- **c1 : irrelevant** (émotions seulement).
- **c2 : nuances** — vrai seulement pour les ~15-20 % les moins heureux, et le coude est vers **100 000 $** dans ces
  données (pas 75 000 $) ; en moyenne, pas de plateau. Kahneman cosigne cette lecture : c'est la meilleure preuve du
  dossier sur c2.
- **c3 : irrelevant**.
- **c4 : nuances** — par doublement : décroissant chez les moins heureux, croissant chez les plus heureux, constant en
  moyenne.
- **Fiche de l'écrivain** : f1 « The plateau of day-to-day happiness exists, but only for the least happy people » :
  **bien lu**, même sens (à ne pas raconter comme « Kahneman avait raison » : c'est « il avait raison pour les plus
  malheureux seulement »). f2 « For everyone else … rises even faster for the happiest » : même sens que le résumé ;
  l'accélération n'est significative qu'au 85e centile. **Une limite est inexacte** : « the abstract gives neither the
  income of the plateau nor the share of « least happy » people » — la déclaration *Significance* publiée avec le
  résumé donne « 20 % », et le texte entier donne le coude à ~100 000 $. Ces deux chiffres sont citables (avec leur
  source) ; « 75 000 $ » ne l'est pas pour ce plateau.

## 4. 10.1038/s41562-017-0277-0 (jebb-2018-satiation)

- **Identité** : confirmée. « Happiness, income satiation and turning points around the world. » Jebb, A. T. (premier
  auteur ; Tay, Diener, Oishi), 2018, *Nature Human Behaviour* 2(1), 33-38. Résumé trouvé chez Europe PMC seulement
  (Crossref et OpenAlex n'en ont pas). Ni correction ni rétractation.
- **Plan (relecteur)** : **transversal** (Gallup World Poll 2005-2016), régressions par splines pour situer le point où
  la pente devient nulle. Plafond : basse. (Informations complémentaires : le revenu est un **revenu du ménage
  équivalent**, divisé par la racine de la taille du ménage, en dollars internationaux PPA ; l'affect est la part de
  oui à des questions sur la veille, la même famille de mesures que Kahneman 2010.)
- **Population et MENA** (informations complémentaires) : 1 709 734 personnes ; région « Middle East/North Africa »
  246 998 (tableau S1), **dont l'Égypte 20 924** (tableau S3, le plus grand échantillon de la région ; aussi Maroc,
  Algérie, Tunisie, Libye, Liban, Jordanie, Syrie, Irak, Territoires palestiniens, Arabie saoudite, Golfe, Turquie,
  Iran, Israël, Chypre). Revenu équivalent médian de la région : 17 058 $. **Aucune estimation pour l'Égypte seule.**
  Estimations pour la région (tableau S2) : satiété de l'évaluation de vie à **115 000 $**, de l'affect positif à
  110 000 $, de l'affect négatif à 125 000 $ ; **1,14 % seulement** de l'échantillon régional au-delà (N = 2 236) ;
  **aucune baisse au-delà** (facteur de Bayes 33,9, p = 0,51 : en faveur de l'absence de différence) ; selon les
  revenus imputés, 115 000 à 135 000 $ (tableau S4). Je n'ai pas recompté le nombre de pays (164 dans la fiche).
- **Résultat principal** : dans le monde, satiété à ~95 000 $ pour l'évaluation de vie et 60 000-75 000 $ pour les
  émotions ; grande variation entre régions, plus tard dans les régions riches ; dans certaines régions, plus de revenu
  au-delà va avec une évaluation plus basse.
- **Phrases du résumé** : « Globally, we find that satiation occurs at $95,000 for life evaluation and $60,000 to
  $75,000 for emotional well-being. » — « However, there is substantial variation across world regions, with
  satiation occurring later in wealthier regions. » — « We also find that in certain parts of the world, incomes beyond
  satiation are associated with lower life evaluations. »
- **Taille d'effet** : seuils seulement.
- **c1 : supports** — un seuil existe statistiquement, mais **haut** (95 000 $ par personne-équivalent, soit environ le
  double pour un ménage de quatre), avec ~1 % des répondants au-delà ; Stevenson 2013, sur le même sondage, ne trouve pas
  de rupture (mais teste des seuils bas, voir n° 5).
- **c2 : supports** — 60 000-75 000 $ au niveau mondial, avec des mesures oui/non que la réanalyse de 2023 lit comme
  des mesures du malheur ; en MENA, 110 000-125 000 $.
- **c3 : irrelevant**.
- **c4 : supports** (la satiété est un rendement qui tombe à zéro ; transversal).
- **Fiche de l'écrivain** : les trois `support.sentence` sont mes phrases, même sens. f1 « about $95,000 a year » :
  **ajouter « par personne-équivalent, PPA »**, sinon on le compare à tort aux 75 000 $ *par ménage* de Kahneman. f3 :
  juste, mais la MENA **n'est pas** une des régions à « turning point » ; la vidéo ne doit pas laisser entendre « chez
  nous, trop d'argent rend moins satisfait ». `mena: true` justifié (l'Égypte est dans l'échantillon poolé) ; ajouter aux
  limites les chiffres MENA ci-dessus.

## 5. 10.1257/aer.103.3.598 (stevenson-2013-satiation)

- **Identité** : confirmée. « Subjective Well-Being and Income: Is There Any Evidence of Satiation? » Stevenson, B.
  (premier auteur ; Wolfers), 2013, *American Economic Review* 103(3), 598-604 (Papers & Proceedings). Texte lu : NBER
  w18992, pas la version publiée. Ni correction ni rétractation.
- **Plan (relecteur)** : **transversal**, plusieurs jeux de données : entre pays (Gallup World Poll 2008-2012, 155 pays ;
  WVS, Pew, ISSP en annexe) et dans les pays (Gallup États-Unis de décembre 2007, N = 1 014 ; Gallup World Poll : les
  25 pays les plus peuplés, puis 98 pays avec une rupture testée à 15 000 $ de revenu du ménage, aussi 8 000 et
  25 000 $). Plafond : basse. Mesures **évaluatives seulement** (les auteurs le disent).
- **Population et Égypte** (texte entier) : l'Égypte (EGY) apparaît trois fois. Fig. 1 : un **point national** (moyenne
  du pays contre PIB par habitant), ce n'est pas un test chez les Égyptiens. Fig. 2 : la courbe **à l'intérieur de
  l'Égypte**, échelle de Cantril contre revenu du ménage, pour les répondants entre les 10e et 90e centiles du revenu
  national (donc des revenus bas sur l'axe, loin de 75 000 $). Fig. 3 : la pente au-dessus de 15 000 $ contre la pente
  au-dessous, pour 98 pays dont l'Égypte (lecture approximative du graphique : environ 0,2 des deux côtés) ; aussi
  Maroc, Algérie, Tunisie, Jordanie, Liban, Syrie, Arabie saoudite, Koweït, Oman, Bahreïn, Qatar, Émirats, Territoires
  palestiniens, Soudan, Mauritanie. **Ce qui est mesuré en Égypte : l'évaluation de vie, pas les émotions.**
- **Résultat principal** : aucune preuve d'un point de satiété ; relation à peu près log-linéaire qui ne s'affaiblit pas
  avec le revenu, entre pays comme dans les pays ; aux États-Unis, aucune rupture jusqu'à 500 000 $ (8 répondants
  au-delà).
- **Phrases du résumé** : « Analyzing multiple datasets, multiple definitions of "basic needs" and multiple questions
  about well-being, we find no support for this claim. » — « The relationship between well-being and income is roughly
  log-linear and does not diminish as incomes rise. »
- **Taille d'effet** : pas dans le résumé. (Texte NBER : pente 0,33 (échelle) et 0,44 (satisfaction) par unité de log du
  PIB ; 61 pays où la pente « riche » dépasse la pente « pauvre », 37 l'inverse.)
- **c1 : contradicts** — limite importante : entre pays et dans les 98 pays, les seuils testés sont des seuils de
  « besoins de base » (8 000-25 000 $), pas 75 000-95 000 $ ; seul l'échantillon américain (1 014 personnes) teste les
  hauts revenus. Ne réfute donc pas directement le seuil haut de Jebb.
- **c2 : irrelevant** (évaluatif seulement ; les auteurs écrivent que Kahneman 2010 sur les émotions n'est « pas
  nécessairement en tension » avec eux).
- **c3 : irrelevant**.
- **c4 : supports par dollar, contradicts par doublement** (le texte rejette le « rendement proportionnel décroissant »
  de Frey et Stutzer : « we could not reject the null that proportional increases in income continue to yield the same
  increase in happiness at higher income levels »).
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. Limite « « log-linear » means each extra dollar still adds
  less: it contradicts a plateau, not diminishing returns » : **juste et importante**. Limite « Egypt's presence read on
  the country labels of figure 1 » : **incomplète** — la fig. 1 n'est qu'une moyenne nationale ; les données égyptiennes
  qui comptent sont les fig. 2 et 3 (gradient à l'intérieur de l'Égypte).

## 6. 10.1002/jae.70013 (rock-2025-europe)

- **Identité** : confirmée. « Econometric Evidence for Satiation of Subjective Well-Being With Income at the Aggregate
  Level in Europe. » Röck, S. (premier auteur ; Tappeiner, Walde), *Journal of Applied Econometrics* 41(1), 56-76 ; en
  ligne le 2025-10-05, numéro de 2026. Accès libre. Ni correction ni rétractation.
- **Plan (relecteur)** : **transversal agrégé (écologique)** : une observation par pays (moyennes nationales),
  régressions à coude et modèles additifs ; EU-SILC 2013 et 2018, EVS 2017 en contrôle. Plafond : basse, et indirect
  pour des individus.
- **Population** : pays de l'UE, Islande, Norvège, Suisse (Luxembourg exclu comme valeur aberrante) ; revenu =
  **moyenne nationale** du revenu disponible équivalent (échelle OCDE modifiée). MENA : non.
- **Résultat principal** : au-delà d'environ 30 000 € de revenu moyen national, la satisfaction et le « bonheur »
  moyens n'augmentent plus ; peu de pays ont passé ce seuil. (Texte entier : le « happiness » d'EU-SILC est la part du
  temps où l'on s'est senti heureux sur 4 semaines, une mesure d'affect, seuil ~26 000-27 000 € ; avec les prix
  corrigés (PPA), pour la satisfaction « the picture is not so clear ».)
- **Phrases du résumé** : « At least for European countries, life satisfaction and happiness, two facets of SWB, show
  no further increase above 30,000 € net annual income (EDHI) both in 2013 and 2018. » — « Only a few countries have
  crossed the threshold and reached satiation. »
- **Taille d'effet** : pente après le coude non distincte de zéro (texte entier, 2018 : satisfaction 0,0059, IC 90 % [−0,0062 ; 0,0180] ;
  bonheur 0,0036 [−0,0029 ; 0,0090]).
- **c1 : nuances** — soutient c1 au niveau des **pays** seulement ; ne dit rien d'une personne qui gagne plus de
  30 000 €.
- **c2 : nuances** — même chose pour la fréquence des moments heureux, au niveau des pays.
- **c3 : irrelevant**.
- **c4 : supports** (faible ; agrégé).
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. Texte de f1 « stop rising above about 30,000 euros of net
  household income a year » : **glissement** — c'est la moyenne nationale du revenu *équivalent* (par adulte-équivalent),
  pas le revenu d'un ménage ; écrire « dans les pays européens dont le revenu moyen dépasse… ». Limite « aggregate
  level » juste ; ajouter que la robustesse en PPA n'est pas nette pour la satisfaction.

## 7. 10.1093/restud/rdaa006 (lindqvist-2020-lottery)

- **Identité** : confirmée. « Long-Run Effects of Lottery Wealth on Psychological Well-Being. » Lindqvist, E. (premier
  auteur ; Östling, Cesarini), *Review of Economic Studies* 87(6), 2703-2726 ; en ligne le 2020-02-12. Ni correction ni
  rétractation.
- **Plan (relecteur)** : **expérience naturelle préenregistrée** (montant du lot aléatoire au sein de groupes de joueurs
  aux chances identiques), mesure 5 à 22 ans après le gain. Causal. Plafond : modérée.
- **Population** : joueurs de loterie suédois. (Texte NBER : 3 362 répondants, taux de réponse 69 % ; variation
  identifiante surtout entre 100 000 et 800 000 $ ; revenu disponible médian du ménage avant le gain 47 000 $.)
  MENA : non.
- **Résultat principal** : hausse durable de la satisfaction de vie, plus de dix ans, sans signe d'atténuation ; effets
  sur le bonheur et la santé mentale nettement plus petits.
- **Phrases du résumé** : « Relative to matched controls, large-prize winners experience sustained increases in overall
  life satisfaction that persist for over a decade and show no evidence of dissipating over time. » — « The estimated
  treatment effects on happiness and mental health are significantly smaller. »
- **Taille d'effet** : pas dans le résumé publié. (Texte NBER : +0,037 écart-type de satisfaction par 100 000 $ nets ;
  satisfaction financière 0,067 ; bonheur 0,016 et santé mentale 0,013, non distincts de zéro, mais l'égalité avec la
  satisfaction est rejetée, p < 0,001. Effet causal implicite de log(revenu) sur la satisfaction 0,377, « similar to the
  log income gradient ».)
- **c1 : irrelevant** (pas de seuil testé).
- **c2 : irrelevant**.
- **c3 : contradicts** — pour la satisfaction de vie : effet causal, préenregistré, durable plus de dix ans. Nuance :
  pour le bonheur et la santé mentale, l'effet à long terme est petit et non distinct de zéro ; « plus d'argent ne rend
  pas durablement plus joyeux au quotidien » n'est ni démontré ni réfuté par cette étude.
- **c4 : supports** (faible, texte entier) — l'effet causal a la taille que prédit une relation en log, donc décroissant
  par dollar.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. `design: experiment` et `kind: causal` acceptables
  (expérience naturelle). `limits` justes (3 362 et 0,037 vérifiés dans w24667).

## 8. 10.1073/pnas.2211123119 (dwyer-2022-cash)

- **Identité** : confirmée. « Wealth redistribution promotes happiness. » Dwyer, R. J. (premier auteur ; Dunn), 2022,
  *PNAS* 119(46), e2211123119. Ni correction ni rétractation.
- **Plan (relecteur)** : **essai randomisé préenregistré** (200 reçoivent 10 000 $, 100 témoins), mesures mensuelles
  pendant 3 mois (préenregistré), puis à 6 mois (exploratoire). Plafond : modérée.
- **Population** (texte entier) : recrutés par Twitter (TED) ; Indonésie 74, Kenya 58, Brésil 13, États-Unis 83,
  Royaume-Uni 37, Canada 18, Australie 17 ; 82 % diplômés du supérieur ; revenu médian du ménage 27 580 $. MENA : non.
- **Résultat principal** : le don augmente satisfaction (b = 0,36) et affect positif (0,29), baisse l'affect négatif
  (−0,28) sur 3 mois ; gains maintenus à 6 mois (b = 0,20, p = 0,019, exploratoire) ; gains plus grands dans les pays à
  plus bas revenu ; encore détectables jusqu'à 123 000 $ de revenu du ménage.
- **Phrases du résumé** : « Our preregistered analyses offer causal evidence that cash transfers substantially increase
  happiness among economically diverse individuals around the world. » — « Recipients in lower-income countries
  exhibited happiness gains three times larger than those in higher-income countries. » — « Still, the cash provided
  detectable benefits for people with household incomes up to $123,000. »
- **Taille d'effet** : voir ci-dessus. (Texte entier : comparaison par pays **exploratoire**, interaction p = 0,022 ;
  effet dans les pays riches b = 0,19, p = 0,05 ; interaction avec le revenu du ménage p = 0,027 ; 123 000 $ par
  Johnson-Neyman, p = 0,05.)
- **c1 : irrelevant** (un don, pas un niveau de revenu ; indice composite).
- **c2 : nuances** (faible) — l'affect s'améliore avec un don, et l'indice composite jusqu'à 123 000 $ : peu
  compatible avec un plafond strict à 75 000 $, mais exploratoire et composite.
- **c3 : contradicts** — causal, sur 3 à 6 mois ; ne dit rien des années.
- **c4 : supports** — la même somme rapporte environ trois fois plus aux bénéficiaires des pays plus pauvres ; mais la
  modération par le revenu est **exploratoire** et observée (le revenu n'est pas tiré au sort).
- **Fiche de l'écrivain** : f1 (rôle « conclusion ») : phrase du résumé qui énonce le résultat, même sens ; « in poorer
  and richer countries alike » est un peu fort : dans les pays riches, l'effet est de justesse (p = 0,05). f2 « three
  times » : **exploratoire, à ajouter aux limites**. f3 : juste, limite p = 0,05 déjà notée. `design: rct` juste.

## 9. 10.1016/j.jhealeco.2006.08.004 (gardner-2006-lottery)

- **Identité** : confirmée. « Money and mental wellbeing: A longitudinal study of medium-sized lottery wins. » Gardner,
  J. (premier auteur ; Oswald), *Journal of Health Economics* 26(1), 49-60 ; Crossref 2007 (numéro de janvier),
  OpenAlex 2006 (en ligne). Résumé chez Europe PMC seulement. Ni correction ni rétractation.
- **Plan (relecteur)** : **panel longitudinal** (British Household Panel Survey), quasi-expérience : gagnants de 1 000 à
  120 000 £ contre non-gagnants et petits gagnants ; le nombre de billets joués est inconnu (les auteurs le disent).
  Plafond : modérée, à descendre pour risque de biais et imprécision.
- **Population** : Britanniques du panel. (Texte entier : **137** gains moyens, 33 605 personnes-années.) MENA : non.
- **Résultat principal** : meilleure santé psychologique (GHQ-12) deux ans après un gain moyen.
- **Phrases du résumé** : « When compared to two control groups -- one with no wins and the other with small wins --
  these individuals go on eventually to exhibit significantly better psychological health. » — « Two years after a
  lottery win, the average measured improvement in mental wellbeing is 1.4 GHQ points. »
- **Taille d'effet** : 1,4 point de GHQ (échelle 0-36, moyenne 11,19). (Lindqvist, texte NBER : des études de cette
  taille avaient 5 à 6,5 % de puissance pour l'effet qu'ils estiment ; l'effet de Gardner est probablement surestimé.)
  Les auteurs écrivent seulement « consistent with a causal link ».
- **c1 : irrelevant**. **c2 : irrelevant**.
- **c3 : contradicts** (faible : quasi-expérience, 137 gagnants, effet probablement gonflé).
- **c4 : irrelevant** (texte entier : aucune relation significative entre la taille du gain et le changement chez les
  137).
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. Limite « number of winners not given » : c'est **137**
  (version auteur). `kind: causal` acceptable si l'on écrit « quasi-expérience » ; ajouter la critique de puissance.

## 10. 10.1037/0022-3514.36.8.917 (brickman-1978-lottery)

- **Identité** : confirmée. « Lottery winners and accident victims: Is happiness relative? » Brickman, P. (premier
  auteur ; Coates, Janoff-Bulman), 1978, *JPSP* 36(8), 917-927. Résumé chez OpenAlex seulement (Crossref n'en a pas,
  Europe PMC ne trouve pas le DOI). Texte entier non accessible. Ni correction ni rétractation.
- **Plan (relecteur)** : **transversal** : une interview, comparaison de groupes, aucune mesure avant le gain, témoins
  non joueurs ; l'étude 2 vérifie l'achat de billets et la saillance de la loterie. Plafond : basse ; rien n'est
  manipulé, donc aucune valeur causale.
- **Population** : étude 1, 22 grands gagnants, 22 témoins, 29 accidentés paralysés (l'Illinois vient de Lindqvist, pas
  du résumé). MENA : non.
- **Résultat principal** : les gagnants ne sont pas plus heureux que les témoins et prennent moins de plaisir aux
  petits événements du quotidien.
- **Phrase du résumé** : « As predicted, lottery winners were not happier than controls and took significantly less
  pleasure from a series of mundane events. »
- **Taille d'effet** : non donnée. (Lindqvist, texte NBER, tableau 4 : réestimé à 0,014 écart-type par 100 000 $,
  erreur type 0,025, pour un lot moyen de 1,18 M$ : l'intervalle couvre l'effet de Lindqvist sur le bonheur et bien
  plus. « Pas plus heureux » est une **absence de preuve** avec 22 contre 22, pas une preuve d'absence.)
- **c1 : irrelevant**. **c2 : irrelevant**.
- **c3 : supports (très faible)** — va dans le sens de c3 mais : non causal, sous-puissant, pas de suivi (rien sur
  « durablement »), et une preuve de rang supérieur (Lindqvist 2020) le contredit, ce qui interdit de s'en servir pour
  la direction « soutient ».
- **c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; texte fidèle. `design: cross-sectional`, `kind:
  association`, et des `limits` honnêtes (« 22 winners: far too small », « no measure before the win », « contradicted
  by … Lindqvist 2020 ») : **la fiche ne surinterprète pas**. Deux retouches : `n: 73` compte les paralysés, la
  comparaison utile est 22 contre 22 ; ajouter la réestimation de Lindqvist. Le risque est dans l'usage : cette étude ne
  peut ni porter c3, ni passer à l'écran comme « les gagnants du loto ne sont pas plus heureux » sans « petite étude de
  1978, démentie depuis ».

## 11. 10.1037/0033-2909.134.4.536 (howell-2008-developing)

- **Identité** : confirmée. « The relation of economic status to subjective well-being in developing countries: A
  meta-analysis. » Howell, R. T. (premier auteur ; Howell, C. J.), 2008, *Psychological Bulletin* 134(4), 536-560.
  Méta-analyse. Résumé : OpenAlex et Europe PMC. Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse de corrélations** (111 échantillons, 54 pays en développement ; répliquée sur le
  WVS). Plafond haute pour une association, mais indirect pour c4 (une corrélation n'est pas une pente).
- **Population** : pays en développement, non listés dans le résumé ; présence de pays MENA **non vérifiable** sans le
  texte entier (`mena: false` veut dire « inconnu », pas « absent »).
- **Résultat principal** : lien statut économique-bien-être plus fort dans les économies en développement pauvres et chez
  les moins instruits, plus faible dans les économies en développement plus riches et chez les plus instruits ; plus
  fort pour la richesse que pour le revenu, pour la satisfaction que pour le bonheur.
- **Phrases du résumé** : « The average economic status-SWB effect size was strongest among low-income developing
  economies (r = .28) and for samples that were least educated (r = .36). » — « The relation was weakest among
  high-income developing economies (r = .10) and for highly educated samples (r = .13). »
- **Taille d'effet** : r = 0,28 / 0,36 / 0,10 / 0,13 ; r partiel 0,18 chez les moins instruits.
- **c1 : irrelevant** (pas de seuil). **c2 : irrelevant**. **c3 : irrelevant**.
- **c4 : nuances** — compatible avec des rendements décroissants (lien plus lâche là où l'on est plus riche), mais r
  mesure le resserrement du lien, pas ce qu'ajoute un dollar, et la restriction de variance peut l'expliquer.
- **Fiche de l'écrivain** : les trois `support.sentence` = mes phrases, même sens ; `effect` juste ; `limits` justes
  (dont « a correlation measures how tight the link is, not how much each extra dollar adds »).

## 12. 10.1111/ecot.12116 (silver-2016-egypt)

- **Identité** : confirmée. « Human capital and life satisfaction in economic transition » (sous-titre chez OpenAlex :
  « Econometric evidence from pre- and post-Arab Spring Egypt »). Silver, H. C. (premier auteur ; Caudill, Mixon),
  *Economics of Transition* 25(2), 165-184 ; en ligne le 2016-12-26, numéro de 2017. Accès fermé ; 9 citations. Ni
  correction ni rétractation.
- **Plan (relecteur)** : **transversal** (logit ordonné, avant et après 2011 ; deux coupes d'après le résumé). Plafond :
  basse. Enquête, effectif et définition du revenu non donnés dans le résumé.
- **Population** : Égyptiens adultes. MENA : **oui**, la seule étude du dossier entièrement égyptienne.
- **Résultat principal** : la satisfaction de vie est liée positivement au revenu **perçu** élevé et à la bonne santé,
  avant et après le Printemps arabe ; l'éducation secondaire, positive avant, devient négative après.
- **Phrase du résumé** : « Ordered logit results point to positive and significant relationships between life
  satisfaction and both perceived high incomes and the human capital variable, good health, for the pre- and
  post-Arab Spring periods in Egypt, thus confirming prior studies of transition economies. »
- **Taille d'effet** : non donnée.
- **c1 : irrelevant** pour le seuil (revenu perçu, aucune forme testée) ; contexte : en Égypte, plus de revenu (perçu) va
  avec plus de satisfaction. **c2 : irrelevant** (satisfaction, pas émotions). **c3 : irrelevant**. **c4 :
  irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; `limits` justes (« perceived income, not measured income:
  says nothing of a threshold or a plateau »).

---

## Tableau final

| DOI | c1 seuil de satisfaction | c2 plateau des émotions ~75 000 $ | c3 pas d'effet durable (causal) | c4 rendements décroissants |
|---|---|---|---|---|
| 10.1073/pnas.1011492107 (Kahneman 2010) | contradicts | supports | irrelevant | supports par dollar / contradicts par doublement |
| 10.1073/pnas.2016976118 (Killingsworth 2021) | contradicts | contradicts | irrelevant | supports par dollar / contradicts par doublement |
| 10.1073/pnas.2208661120 (Killingsworth 2023) | irrelevant | nuances (moins heureux seulement, ~100 000 $) | irrelevant | nuances |
| 10.1038/s41562-017-0277-0 (Jebb 2018) | supports (seuil haut) | supports | irrelevant | supports |
| 10.1257/aer.103.3.598 (Stevenson 2013) | contradicts (seuils bas testés) | irrelevant | irrelevant | supports par dollar / contradicts par doublement |
| 10.1002/jae.70013 (Rock 2025) | nuances (pays seulement) | nuances (pays seulement) | irrelevant | supports (faible) |
| 10.1093/restud/rdaa006 (Lindqvist 2020) | irrelevant | irrelevant | contradicts (satisfaction) | supports (faible) |
| 10.1073/pnas.2211123119 (Dwyer 2022) | irrelevant | nuances (faible) | contradicts (3-6 mois) | supports (exploratoire) |
| 10.1016/j.jhealeco.2006.08.004 (Gardner 2006) | irrelevant | irrelevant | contradicts (faible) | irrelevant |
| 10.1037/0022-3514.36.8.917 (Brickman 1978) | irrelevant | irrelevant | supports (très faible) | irrelevant |
| 10.1037/0033-2909.134.4.536 (Howell 2008) | irrelevant | irrelevant | irrelevant | nuances |
| 10.1111/ecot.12116 (Silver 2016) | irrelevant | irrelevant | irrelevant | irrelevant |

## Lecture d'ensemble (direction et plafond de certitude par affirmation, `docs/verdict.md` §3)

**c1 — contredite telle que le livre la dit ; mêlée pour « un seuil existe quelque part » ; certitude basse.** Tout ce
qui porte sur c1 est transversal (Lindqvist, causal, ne teste aucun seuil) : plafond basse. La version du livre, « la
satisfaction ne monte que jusqu'à environ 75 000 $ », est contredite par l'étude même d'où vient le chiffre (Kahneman
2010 : pas de satiété de l'évaluation de vie « at least to an amount well over $120,000 ») et par Killingsworth 2021 et
Stevenson 2013. Pour un seuil plus haut, c'est mêlé : Jebb 2018 en trouve un à ~95 000 $ par personne-équivalent (MENA
~115 000 $), avec environ 1 % des répondants au-delà ; Rock 2025 en trouve un au niveau des pays européens (~30 000 € de
revenu moyen). Stevenson, sur le même sondage que Jebb, ne trouve pas de rupture, mais ses tests entre pays portent sur
des seuils de 8 000 à 25 000 $ : ce n'est pas une contradiction directe du seuil haut. Note pour l'écrivain : la phrase
du livre est une **erreur d'attribution** (75 000 $ = émotions, pas satisfaction) ; c'est sans doute le cœur honnête de
l'épisode.

**c2 — soutenue pour certains seulement ; certitude basse.** Le résultat dépend de la mesure. Questions oui/non sur la
veille (Kahneman 2010 ; l'affect de Jebb 2018) : plateau vers 60 000-75 000 $. Échantillonnage d'expériences sur une
échelle continue (Killingsworth 2021) : pas de plateau en moyenne. La collaboration adversariale, que Kahneman cosigne
(Killingsworth 2023), tranche : le plateau existe **seulement chez les ~15-20 % les moins heureux**, et le coude y est
vers **100 000 $** ; chez les autres, le bonheur continue de monter, et accélère chez les plus heureux. Rock (pays) et
Dwyer (exploratoire) n'y changent rien. « Au-dessus de 75 000 $, les émotions plafonnent » n'est plus défendable comme
règle générale ; tout au plus « pour les plus malheureux, au-delà d'environ 100 000 $, aux États-Unis ». Les seuils de
Jebb pour la région MENA sont de 110 000 à 125 000 $ par personne-équivalent.

**c3 — contredite ; certitude modérée (pour la satisfaction de vie).** Les meilleures preuves sont causales et vont
contre c3 : Lindqvist 2020 (expérience naturelle préenregistrée, hausse de satisfaction de plus de dix ans, sans
atténuation), Dwyer 2022 (essai randomisé, gains à 3 et 6 mois, plus grands au Kenya, en Indonésie, au Brésil), Gardner
2006 (quasi-expérience, 2 ans, faible). Seul Brickman 1978 va dans le sens de c3 : 22 gagnants, transversal, non causal,
sous-puissant ; une preuve de rang supérieur le contredit, donc la direction « soutient » est interdite. Nuance à dire :
sur le bonheur et la santé mentale, l'effet à long terme est petit et non distinct de zéro (Lindqvist) ; « durablement
plus joyeux au quotidien » n'est pas démontré. Les effets sont petits par dollar (0,037 écart-type par 100 000 $). Aucun
échantillon MENA dans ces trois études.

**c4 — dépend de la définition.** *Par dollar* : **soutenue**, aucune étude ne la contredit (toute relation linéaire en
log est décroissante par dollar ; Dwyer : la même somme rapporte environ trois fois plus aux plus pauvres) ; certitude
**basse** si l'on est strict, parce que le seul test où l'argent est manipulé (Dwyer) est une analyse de modération
exploratoire et observée, et que tout le reste est transversal ; Lindqvist n'apporte qu'une concordance avec la forme en
log (texte entier). *Par doublement* : **contredite en moyenne** (Stevenson, Killingsworth 2021, Kahneman 2010 pour la
satisfaction), sauf chez les moins heureux (Killingsworth 2023) ; certitude basse. L'écrivain doit choisir et écrire la
lecture « par dollar », la seule que le dossier soutient.

**Ce qui en découle pour le badge** (indication, la décision reste à l'écrivain et au propriétaire) : la certitude du
verdict ne dépasse pas la plus basse des affirmations du champ, soit **basse** : ⚖️ ou ❓, jamais ✅ ni ❌. Un hook ne peut
s'appuyer que sur c3 (modérée, direction nette, et contre le livre) ; « 75 000 $ » ne peut pas servir de hook affirmatif.

**Égypte / MENA.** Trois fiches ont `mena: true`, à juste titre, mais aucune ne teste un seuil chez les Égyptiens : Jebb
poole l'Égypte (20 924 répondants) dans une région dont le seuil (~115 000 $) dépend des 1 % les plus riches ;
Stevenson montre, à l'intérieur de l'Égypte, une évaluation de vie qui monte avec le revenu du ménage, aux revenus bas et
moyens ; Silver montre en Égypte un lien positif entre revenu perçu et satisfaction. Pour presque tout le public égyptien,
on est sur la partie montante de la courbe : la nuance honnête est que « au-delà d'un point » ne concerne qu'une très
petite minorité. Pour c2 et c3, aucun échantillon MENA : « معظم الدراسات من أمريكا وأوروبا » doit être dit ou écrit.

**Indépendance des preuves.** Killingsworth 2021 et 2023 = les mêmes données ; Kahneman coauteur de 2010 et 2023 ; Jebb
et Stevenson = le même sondage (Gallup World Poll), deux méthodes. Les trois études causales (Lindqvist, Dwyer, Gardner)
sont indépendantes entre elles.

## Corrections demandées aux fiches

1. **killingsworth-2023-conflict** : la limite « the abstract gives neither the income of the plateau nor the share »
   est inexacte ; la déclaration *Significance* publiée avec le résumé dit « least happy 20% », le texte entier situe le
   coude à ~100 000 $.
2. **stevenson-2013-satiation** : l'Égypte n'est pas seulement un point de la fig. 1 (moyenne nationale) ; ses données
   internes sont dans les fig. 2 et 3 (évaluation de vie seulement).
3. **jebb-2018-satiation** : préciser « revenu par personne-équivalent, PPA » ; ajouter les seuils MENA (115 000 /
   110 000 / 125 000 $), 1,14 % au-delà, pas de baisse au-delà en MENA.
4. **rock-2025-europe** : texte de f1 à reformuler (moyenne nationale du revenu équivalent, pas « le revenu d'un
   ménage ») ; robustesse PPA non nette pour la satisfaction.
5. **dwyer-2022-cash** : « three times » et « $123,000 » sont exploratoires ; dans les pays riches l'effet est de justesse
   (p = 0,05).
6. **gardner-2006-lottery** : 137 gagnants (version auteur) ; ajouter la critique de puissance de Lindqvist.
7. **brickman-1978-lottery** : fiche honnête ; comparaison utile 22 contre 22 (pas 73) ; ajouter la réestimation de
   Lindqvist (0,014 ± 0,025 écart-type par 100 000 $).
8. **kahneman-2010-income** : rien à corriger dans la fiche ; c'est le livre qui attribue à la satisfaction le seuil des
   émotions.

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `design`, `n`/`k`, `effect`, `limits` ; `declared` et `acknowledged` non lus. Dépôt
`/home/user/book-vs-science` : seul ce fichier a été créé (`reports/money-happiness/blind-review.md`) ; rien d'autre
modifié, aucune commande git.
