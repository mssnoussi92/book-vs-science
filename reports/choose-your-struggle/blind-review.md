# Relecture aveugle des sources — « choose-your-struggle » (Manson, ch. 2 : rêver du résultat sans vouloir l'effort ne mène nulle part ; ce qui compte, c'est le chemin qu'on accepte)

Relu le 2026-11-23. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis de correction ou de rétractation qui pointent vers l'article), OpenAlex
`/works/doi:<doi>`, Europe PMC `search … resultType=core` (`abstractText`). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-struggle/raw/` ; textes entiers :
`…/scratchpad/blind-struggle/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : Cole 2021, Wang 2021 et Kizilcec 2020 (Europe PMC,
XML) ; **Cole 2021 : aussi son fichier de données ESM 2** (une ligne par effet, type de simulation, délai, domaine) ;
Alghazo 2020 (PDF de l'éditeur, ijcrsee.com, **accessible** : téléchargé sans difficulté) ; Kappes 2011 (manuscrit
accepté, dépôt de la LSE). Résumé seul : Cerasoli 2014, Cross 2019, Kizilcec 2017 (Europe PMC refuse le texte entier,
PNAS et PMC renvoient un captcha), Oettingen 2001, Oettingen 2002, Pham 1999, Woolley 2016 (accès fermé). Kappes 2011 n'a
de résumé ni chez Crossref, ni chez OpenAlex, ni chez Europe PMC : lu dans le manuscrit accepté.

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `mena`, `population`, `findings[].text` ; les
`support.sentence`, `kind`, `design`, `n`/`k`, `effect`, `limits` et `allegiance` seulement après avoir lu chaque résumé et
choisi ma phrase. `declared` et `acknowledged` non lus. Dossier de l'écrivain (`scratchpad/dossiers/`) : **non ouvert**.

Affirmations :
- **c1** (causale) : rêver du résultat voulu en termes idéalisés et positifs fait baisser l'effort et la réussite qui
  suivent, comparé à des pensées qui le questionnent, neutres ou réalistes.
- **c2** (causale) : répéter mentalement les étapes vers un but (simulation du processus) améliore la performance plus
  que se représenter le résultat (simulation du résultat).
- **c3** (causale) : confronter le résultat souhaité aux obstacles, puis prévoir des réponses « si… alors… » (MCII / WOOP),
  aide plus à atteindre ses buts que seulement rêver du résultat.
- **c4** : les gens qui aiment l'activité elle-même persistent plus longtemps et réussissent mieux dans des buts à long
  terme que ceux qui n'en valorisent que le résultat futur.

**Avant tout : deux affirmations sont mal posées par rapport au livre ou aux preuves.**
- **c4 ne teste pas l'idée du livre.** Manson parle de **choisir la douleur qu'on accepte** (« what pain do you want ? »),
  pas d'aimer l'activité. Les deux études de c4 mesurent l'intérêt et le plaisir (motivation intrinsèque, récompenses
  immédiates). Le dossier peut dire « le plaisir du chemin aide à persister », pas « accepter la lutte aide ». L'écrivain le
  note déjà dans les `limits` (Cerasoli, Woolley) ; il faut le dire aussi dans la formulation de c4.
- **c1 a deux lectures.** *Étroite* : un rêve idéalisé, sans obstacles, comparé à une pensée qui questionne ou qui est
  neutre (le paradigme d'Oettingen). *Large* : « imaginer le résultat qu'on veut nuit à l'effort ». La lecture large est
  **contredite** par la méta-analyse du dossier (Cole 2021, voir n° 3). Je note les deux.

Vérification d'identité commune aux 12 DOI : Crossref `updated-by` et `update-to` absents, aucun document Crossref ne
déclare mettre à jour l'un d'eux (`filter=updates:` : 0 résultat pour chacun), OpenAlex `is_retracted: false` pour
tous. **Aucun avis de correction ni de rétractation trouvé.** Titres, premiers auteurs et années concordent avec les `id`
des fiches.

---

## 1. 10.23947/2334-8496-2020-8-si-37-47 (alghazo-2020-simulation)

- **Identité** : confirmée. « Mental Simulation Effects on Performance: Benefits of Outcome Versus Process Simulations in
  Online Courses. » Alghazo, R. (Crossref ; « Al Ghazo » sur le PDF ; Daqqa, Abdelsalam, Pilotti, Al Mulhem), 2020,
  *International Journal of Cognitive Research in Science, Engineering and Education* 8 (numéro spécial), 37-47. Article
  de recherche, revue en accès libre. Ni correction ni rétractation. (Le DOI s'écrit « SI » en capitales sur le PDF ; un DOI
  ne distingue pas la casse.)
- **Plan (relecteur)** : **expérience de terrain randomisée** pour la comparaison qui nous intéresse : processus contre
  résultat, attribution aléatoire entre sujets (texte entier). S'y ajoute un groupe de base **non randomisé** : 269
  étudiantes du semestre précédent, mêmes cours, mêmes enseignantes, appariées sur les crédits et la note finale. Deux
  séances d'exercice (début du semestre, avant le partiel), cinq questions écrites. Plafond : modérée.
- **Population (texte entier)** : **269 étudiantes** de licence (18-25 ans), Prince Mohammad Bin Fahd University, Al
  Khobar, Province orientale d'**Arabie saoudite** ; **arabe langue maternelle**, enseignement en anglais ; consignes en
  arabe et en anglais ; **processus n = 139, résultat n = 130** ; 16 exclues (consignes non suivies ou cours abandonné) ;
  aucune étudiante masculine (séparation des sexes). Cours en ligne synchrones, été 2020 (COVID). MENA : **oui**, le seul
  échantillon arabe du dossier.
- **Résultat principal** : pas de différence sur le partiel, l'engagement (note de participation) ni les prédictions de
  note ; sur les devoirs, une interaction avec le moment : **la simulation du résultat fait mieux sur la 1re moitié du
  semestre, celle du processus sur la 2e** ; le processus rend plus sûre de sa prédiction.
- **Phrases du résumé** : « Type of simulation impacted students' performance on assignments, but differently depending
  on the timing of the assessment. » — « It did not influence behavioral engagement, midterm test performance, or
  predictions of performance before or after the test. »
- **Taille d'effet** (texte entier) : interaction ηp² = 0,049 ; 1re moitié, résultat > processus, t(267) = 2,74,
  p = 0,006 ; 2e moitié, processus > résultat, t(267) = 2,50, p = 0,013. **Contre le groupe de base** : résultat > base en
  1re moitié (t(397) = 3,47, p = 0,001), processus > base en 2e moitié (t(406) = 2,84, p = 0,005). Partiel et
  participation : F < 1,54, ns. Au débriefing, rien n'indique que le groupe « résultat » ait moins ou autrement étudié.
- **c1 : contradicts (faible, indirect)** — dans cet échantillon arabe, imaginer le bon résultat n'a pas fait baisser
  l'effort déclaré et a même fait mieux que la base au début (base non randomisée). Ce n'est pas le « rêve idéalisé »
  d'Oettingen : les étudiantes décrivaient cinq actions faites *après* avoir appris leur bonne note.
- **c2 : nuances** — la seule comparaison tête-à-tête randomisée du dossier avec un échantillon correct ne trouve pas
  l'avantage du processus sur l'examen (le critère de Pham 1999), et trouve l'inverse au début du semestre.
- **c3 : irrelevant**. **c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. **Deux limites sont fausses** : « sample size and how
  students were assigned are not in the abstract; full text not reachable (site behind a bot check) » — le PDF de
  l'éditeur s'ouvre (`ijcrsee.com/index.php/ijcrsee/article/download/326/521`) : n = 269, attribution aléatoire,
  139/130 ; et « no control group without simulation: process against outcome only » — il y a un groupe de base (269,
  apparié, non randomisé). Remplir `n` (269). Ajouter aux limites : femmes seulement, une université, deux courtes
  séances, résultats multiples (correction séquentielle appliquée par les auteurs), base historique non randomisée.

## 2. 10.1037/a0035661 (cerasoli-2014-intrinsic)

- **Identité** : confirmée. « Intrinsic motivation and extrinsic incentives jointly predict performance: A 40-year
  meta-analysis. » Cerasoli, C. P. (premier auteur ; Nicklin, Ford), 2014, *Psychological Bulletin* 140(4), 980-1008.
  Europe PMC : « Meta-Analysis ». Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse de corrélations** (effets aléatoires, k = 183, N = 212 468) ; la motivation
  intrinsèque n'est pas manipulée. Plafond de départ : haute pour une association ; **toute lecture causale exclue**.
- **Population** : école, travail, activité physique ; pays non donnés dans le résumé. MENA : non connu.
- **Résultat principal** : la motivation intrinsèque prédit la performance de façon moyenne à forte (ρ = 0,21-0,45), avec
  ou sans incitations ; elle prédit mieux la **qualité**, les incitations prédisent mieux la **quantité** ; « crowding
  out » : elle compte moins quand l'incitation est directement liée à la performance.
- **Phrases du résumé** : « …intrinsic motivation is a medium to strong predictor of performance (ρ = .21-45). » — « The
  importance of intrinsic motivation to performance remained in place whether incentives were presented. » —
  « Considered simultaneously through meta-analytic regression, intrinsic motivation predicted more unique variance in
  quality of performance, whereas incentives were a better predictor of quantity of performance. »
- **Taille d'effet** : ρ = 0,21 à 0,45 selon les sous-groupes.
- **c4 : supports en partie (association)** — « aimer l'activité » ≈ motivation intrinsèque, oui ; mais **le comparateur
  n'est pas celui de c4** : ce sont les *incitations* externes (primes, récompenses), pas des gens qui « ne valorisent que
  le résultat futur » ; le critère est la **performance**, pas la **persistance** ; pas de « buts à long terme » isolés.
  Et pour la quantité de travail, ce sont les incitations qui prédisent le mieux.
- **c1, c2, c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. **Texte de f1 à reformuler** : « predicted the quality of
  performance better than incentives did » est juste, mais ajouter « …while incentives predicted the quantity better » ;
  sans cette moitié, f1 penche du côté du livre. `kind: association` juste. Limites justes ; ajouter « compared with
  incentives, not with people who value only the result ».

## 3. 10.3758/s13423-021-01880-6 (cole-2021-simulation)

- **Identité** : confirmée. « Synthesizing the effects of mental simulation on behavior change: Systematic review and
  multilevel meta-analysis. » Cole, S. N. (premier auteur ; Smith, Ragan, Suurmond, Armitage), 2021, *Psychonomic Bulletin
  & Review* 28(5), 1514-1537. Ni correction ni rétractation.
- **Plan (relecteur)** : **revue systématique et méta-analyse multiniveau d'essais randomisés** (critère d'inclusion :
  attribution aléatoire, contrôle passif ou actif sans simulation, comportement mesuré). Plafond : haute.
- **Population** (texte entier) : 123 effets, 94 études, N = 5 685 ; âge moyen 25 ans ; 78 % d'étudiants ; pays non
  donnés. MENA : non connu.
- **Résultat principal** : simulation mentale contre contrôle, g = 0,49 ; les simulations « supérieures » (positives)
  font mieux que les « inférieures » ; publication : pas d'asymétrie (entonnoir, test « à la Egger » sur N, p = 0,23).
- **Phrases du résumé** : « After applying a multilevel random effects model, a statistically-reliable positive effect of
  Hedges' g = 0.49, 95% CI [0.37; 0.62] was found, which was significantly different than zero. » — « …it was found that
  superior simulations garnered more reliable beneficial effects than inferior simulations. »
  **Le résumé ne donne aucun chiffre par sous-type** (résultat seul, processus seul) : f2 et f3 reposent sur le texte
  entier (tableau 3 et discussion).
- **Taille d'effet** (texte entier, tableau 3) : résultat « supérieur » **g = 0,23 [0,13 ; 0,34], k = 15 effets
  (15 études)** ; processus **g = 0,17 [−0,09 ; 0,43], k = 5, p = 0,20** ; résultat supérieur + processus (surtout le
  contraste mental) g = 0,61 [0,40 ; 0,81], k = 8 ; test d'ensemble des sous-types **non significatif** (QM(7) = 10,47,
  p = 0,16). Sans incitation, l'effet global tombe à g = 0,06 (ns).
- **Ce que disent les données (ESM 2, mon décompte)** : les 15 effets « résultat supérieur » sont **12 en santé** (alcool,
  activité physique : Hagger 2011, 2012a, 2012b ; Conroy 2015 ; Strachan 2017 ; Andersson 2011…), avec **10 sur 15
  incités** ; leur délai de mesure va surtout de **7 à 133 jours** (2 seulement le jour même). **Aucun ne vient du paradigme
  « fantasme idéalisé contre fantasme qui questionne »** d'Oettingen (Kappes 2011 n'y est pas). Pham 1999 y est codé
  **g = 0** pour ses trois bras contre le contrôle (processus, résultat, les deux ; N = 42 par comparaison) : l'effet sur
  la note contre le contrôle n'était pas significatif (p < 0,09, texte entier). Les 5 effets « processus » : Conroy 2015
  (0,37), Knäuper 2011 (0,02), Marszał-Wiśniewska 2016 (0), Meslot 2016 (0,33), Pham 1999 (0). Dans les études qui ont
  les deux bras, le processus ne fait pas mieux que le résultat (Conroy 0,37 contre 0,39 ; Knäuper 0,02 contre 0,17 ;
  Marszał-Wiśniewska 0 contre 0 ; Pham 0 contre 0) — ce n'est pas un test tête-à-tête, chaque bras est comparé au contrôle.
- **Une incohérence interne** : le texte des résultats range « Process » parmi les simulations « significantly different
  than controls », alors que le tableau 3 (p = 0,20) et la discussion disent l'inverse. Je suis le tableau et la
  discussion.
- **c1 — combien d'effets, et contredit-elle ?** **La lecture large de c1 est contredite** : sur 15 effets, imaginer un
  résultat réussi **améliore un peu** le comportement, mesuré surtout des semaines plus tard, contre des contrôles sans
  simulation (passifs ou actifs, environ moitié-moitié). C'est une preuve de rang supérieur (méta-analyse d'ECR) : la
  direction « soutient » est interdite pour la lecture large (`docs/verdict.md` §3). **La lecture étroite n'est pas
  testée** : aucun de ces effets n'oppose un rêve idéalisé à une pensée qui questionne ; le comparateur et l'exposition
  diffèrent. Les auteurs eux-mêmes citent Oettingen sans trancher (« if the simulation involves fantasizing, motivation
  may decrease… »).
- **c2 — contredit-elle ?** **Non, pas directement** : aucune comparaison tête-à-tête processus contre résultat ; elle
  **ne soutient pas** c2 non plus (processus ns sur 5 effets, résultat significatif sur 15, différence entre sous-types non
  significative). Écrire « contredit » serait trop fort ; écrire « la méta-analyse confirme Pham » serait faux.
- **c3 : supports (indirect)** — le composite « résultat supérieur + processus » (contraste mental surtout), g = 0,61,
  k = 8, contre contrôle ; ce n'est pas MCII contre « seulement rêver ».
- **c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 = ma phrase, même sens. f2 : phrase de conclusion du texte entier (« …simulation of
  superior outcomes … is among several beneficial mental simulation subtypes… ») : **même sens** que le tableau, mais ce
  n'est **pas une phrase de résultat du résumé** (règle 2) ; garder le chiffre du tableau 3 (k = 15, g = 0,23) comme
  appui et le dire. f3 : même remarque ; même sens. Limites justes, sauf une à préciser : « behaviour mostly measured
  within a day » est vrai pour l'ensemble (66 sur 112 le jour même) mais **faux pour les simulations de résultat**, mesurées
  surtout 1 à 19 semaines après : c'est ce qui rend f2 pertinent contre c1. Ajouter : 10 sur 15 incités ; aucun effet du
  paradigme d'Oettingen ; Pham 1999 codé g = 0.

## 4. 10.1080/17437199.2019.1594332 (cross-2019-contrasting)

- **Identité** : confirmée. « Mental contrasting for health behaviour change: a systematic review and meta-analysis of
  effects and moderator variables. » Cross, A. (premier auteur ; Sheffield), 2019, *Health Psychology Review* 13(2),
  209-225. Ni correction ni rétractation.
- **Plan (relecteur)** : **revue systématique et méta-analyse** (effets aléatoires) d'interventions ; plafond haute.
- **Population** : N = 1 528, comportements de santé ; pays non donnés. MENA : non connu.
- **Résultat principal** : contraste mental contre contrôle, g ajusté = 0,28 jusqu'à 4 semaines, 0,38 jusqu'à 3 mois
  (k = 5) ; MCII (k = 7) g = 0,28 ; ajouter les plans « si… alors… » ne renforce pas l'effet (petit sous-ensemble).
- **Phrases du résumé** : « A meta-analysis (N = 1528) using random effects modelling found a main effect of mental
  contrasting on health outcomes, adjusted Hedges' g = 0.28 (SE = .07), 95% CI [0.13-0.43], p < .001 at up to four weeks… »
  — « Mental contrasting shows promise as a brief behaviour change strategy with a significant small to moderate-sized
  effect on changing health behaviour in the short-term. » — « Analysis on a small subset of studies suggested that the
  addition of implementation intentions (MCII) did not further strengthen the effects of mental contrasting on health
  behaviours, although additional studies are needed. »
- **Taille d'effet** : g = 0,28 [0,13 ; 0,43] ; 0,38 [0,20 ; 0,55] à 3 mois ; MCII 0,28 [0,14 ; 0,42]. Le résumé ne dit pas
  **ajusté sur quoi** (biais de publication ? valeurs extrêmes ?) ; « SE = 0.6 » à 3 mois est une coquille du résumé
  (l'intervalle [0,20 ; 0,55] implique une erreur type d'environ 0,09).
- **c3 : supports (petit, court terme, santé)** — contre des contrôles non précisés dans le résumé, pas contre « seulement
  rêver ». Le second résultat dit que la partie « si… alors… » de c3 n'ajoute rien de démontré.
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. `k` vide : juste, le résumé ne donne pas k total. Limites
  justes ; ajouter « « adjusted » non expliqué dans le résumé » et « chevauche probablement Wang 2021 et Cole 2021 (mêmes
  études MCII) ».

## 5. 10.1016/j.jesp.2011.02.003 (kappes-2011-energy)

- **Identité** : confirmée. « Positive fantasies about idealized futures sap energy. » Kappes, H. B. (premier auteur ;
  Oettingen), 2011, *Journal of Experimental Social Psychology* 47(4), 719-729. Ni correction ni rétractation. Pas de
  résumé dans les trois bases : lu dans le manuscrit accepté (LSE, eprints 46284).
- **Plan (relecteur)** : **quatre expériences** (attribution aléatoire), un seul laboratoire. Plafond : modérée.
- **Population** (texte entier) : étudiants américains de licence ; étude 1 : 164 **femmes** ; étude 2 : 50 ; étude 3 :
  49 randomisés, **40 analysés** (9 ne sont pas revenus, 18 %) ; étude 4 : 80. MENA : non.
- **Résultat principal** : un fantasme positif induit donne **moins d'énergie** (tension artérielle systolique, énergie
  ressentie) qu'un fantasme qui questionne (é. 1), négatif (é. 2) ou neutre (é. 3) ; l'étude 3 mesure aussi une
  **réussite déclarée** une semaine plus tard, plus basse après le fantasme positif, par la baisse d'énergie.
- **Phrase du résumé** (manuscrit) : « Induced positive fantasies resulted in less energy than fantasies that questioned
  the desired future (Study 1), negative fantasies (Study 2), or neutral fantasies (Study 3). » Le résumé n'a **aucun
  résultat de réussite** : la seule phrase sur la réussite (« a mechanism by which positive fantasies translate into poor
  achievement ») est un cadrage, appuyé sur la littérature corrélationnelle.
- **Taille d'effet** (texte entier) : é. 1 η² = 0,024 (petit, p < 0,05) ; é. 3 énergie η² = 0,16 ; réussite t(38) = 2,00,
  **p = 0,05**, η² = 0,10 (5,74 contre 6,57 sur 7). La « réussite » est une échelle de 7 items **déclarés** (« How well did
  the past week go for you? », se sentir « on top of it »…), pas un effort ni une performance observés. Contrôle de
  manipulation : 44 % du groupe « fantasme positif » mentionnaient quand même des obstacles.
- **c1 : supports (lecture étroite)** — expérimental, mais sur l'**énergie** juste après l'induction ; un seul petit test
  de la réussite, déclarée, au seuil.
- **c2, c3, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 = ma phrase, même sens (`where: fulltext` alors que c'est le résumé du manuscrit : à
  corriger en « abstract (accepted manuscript) »). f2 : phrase du texte entier, citée exactement, **même sens** ; mais elle
  porte seule le volet « réussite » de c1 et ce n'est pas une phrase du résumé : le dire. `n: 334` = 164+50+40+80 :
  juste (analysés). Limites et `allegiance` justes ; ajouter l'attrition de 18 % de l'étude 3 et l'effet très petit de
  l'étude 1.

## 6. 10.1073/pnas.1611898114 (kizilcec-2017-culture)

- **Identité** : confirmée. « Eight-minute self-regulation intervention raises educational attainment at scale in
  individualist but not collectivist cultures. » Kizilcec, R. F. (premier auteur ; Cohen), 2017, *PNAS* 114(17),
  4348-4353. Ni correction ni rétractation. Texte entier inaccessible (refus Europe PMC, captcha PMC et PNAS).
- **Plan (relecteur)** : **deux essais randomisés** en ligne (MOOC), n = 17 963. Plafond : modérée.
- **Population** : apprenants de MOOC, pays groupés en individualistes / collectivistes (« such as India or China »).
  MENA : **non rapporté** ; je n'ai pas pu vérifier dans le texte entier où tombent les pays arabes (l'indice
  d'individualisme de Hofstede, d'usage courant dans ces études, classe le monde arabe parmi les collectivistes — **à
  vérifier**, pas lu dans l'article).
- **Résultat principal** : MCII (8 min d'écriture) augmente l'achèvement du cours chez les individualistes, pas chez les
  collectivistes ; efficace quand l'obstacle principal est prévisible et surmontable (obligations de travail, de famille),
  pas pour un manque de temps ou une contrainte pratique.
- **Phrases du résumé** : « Learners in individualist cultures were 32% (first experiment) and 15% (second experiment)
  more likely to complete the course following the MCII intervention than a control activity. » — « In contrast, learners
  in collectivist cultures were unaffected by MCII. »
- **Taille d'effet** : **relative** dans le résumé. En points (Kizilcec 2020, texte entier, tableau 1) : **+1,8 point**
  (de 5,5 à 7,3 %, n = 4 628) et **+3,9 points** (de 26 à 30 %, n = 3 248). Sur tout l'échantillon, Wang 2021 code
  **g = 0,09 [−0,01 ; 0,19] et 0,06 [−0,02 ; 0,13]** : pas d'effet net toutes cultures confondues. Le « up to 78% » de la
  déclaration *Significance* est un sous-groupe (obstacles d'obligations quotidiennes).
- **c3 : nuances** — aide un peu, pour certains (individualistes), pas pour d'autres ; **pas répliqué à grande échelle**
  (n° 7).
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. **Attention à la narration** : « 32 % plus de chances » est
  relatif ; en absolu, c'est 1,8 point. Limites justes (dont le renvoi à Kizilcec 2020).

## 7. 10.1073/pnas.1921417117 (kizilcec-2020-scale)

- **Identité** : confirmée. « Scaling up behavioral science interventions in online education. » Kizilcec, R. F.
  (premier auteur ; Reich, Yeomans, Dann, Brunskill, Lopez, Turkay, Williams), 2020, *PNAS* 117(26), 14900-14905. Ni
  correction ni rétractation.
- **Plan (relecteur)** : **essai randomisé à très grande échelle, préenregistré** par vagues (OSF), 2,5 ans, 247 cours
  (Harvard, MIT, Stanford) ; hypothèses raffinées entre vagues (les analyses post hoc sont signalées comme telles).
  Plafond : modérée (un seul essai, pas une réplication multi-laboratoires).
- **Population** (texte entier) : **n = 269 169** étudiants, « nearly every country » ; MCII testé en 2e année (94
  cours) ; sous-groupe individualiste : **n = 12 879**. MENA : pas de résultat par région arabe.
- **Résultat principal** : effets « medium-to-large » attendus, **non retrouvés** ; les interventions d'autorégulation
  (plans, MCII) augmentent l'activité des premières semaines mais pas l'achèvement.
- **Phrases du résumé** : « We hypothesized that the interventions would produce medium-to-large effects as in prior
  studies, but this is not supported by our results. » — « Self-regulation interventions raised student engagement in the
  first few weeks but not final completion rates. » — « Scaling behavioral science interventions across various online
  learning contexts can reduce their average effectiveness by an order-of-magnitude. » Le résumé ne nomme pas MCII.
- **Taille d'effet** (texte entier) : MCII, individualistes, achèvement **+0,25 point [−0,87 ; 1,37], p = 0,66** (contre
  +1,8 et +3,9 points en 2017) ; activité de la semaine 1 β = 0,060 (log des actions), p = 0,036 ; semaine 2 : disparu
  (β = 0,0099, ns). Post hoc, non préenregistré : +2,76 points (p = 0,025) chez les étudiants des pays moins développés
  dans les cours où ils réussissent moins.
- **c3 : contradicts (dans ce contexte)** — la meilleure preuve du dossier sur MCII hors laboratoire (préenregistrée,
  grande, objective) ne retrouve pas l'effet sur l'atteinte du but. Ce n'est pas un comparateur « seulement rêver » (le
  contrôle : aucune activité).
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 = ma phrase, même sens. f2 : phrase du texte entier, citée exactement, même sens ; c'est
  la phrase qui porte le résultat MCII, absent du résumé : le dire. **Remplir `n`** (269 169 ; MCII individualistes
  12 879). Limites justes.

## 8. 10.1037/0022-3514.80.5.736 (oettingen-2001-contrasting)

- **Identité** : confirmée. « Self-regulation of goal-setting: Turning free fantasies about the future into binding
  goals. » Oettingen, G. (premier auteur ; Pak, Schnetter), 2001, *Journal of Personality and Social Psychology* 80(5),
  736-753. Ni correction ni rétractation.
- **Plan (relecteur)** : **quatre expériences** ; un laboratoire (celui qui a créé la méthode). Plafond : modérée.
- **Population** : non décrite dans le résumé (« various life domains »). MENA : non connu.
- **Résultat principal** : contraster le futur rêvé avec la réalité présente donne un engagement fort si les attentes de
  réussite sont hautes, faible si elles sont basses ; **seulement rêver** (ou seulement penser à la réalité) donne un
  engagement moyen, quelles que soient les attentes.
- **Phrases du résumé** : la phrase de résultat est « Four experiments pertaining to various life domains supported these
  hypotheses. », qui renvoie aux hypothèses énoncées juste avant (« Strong goal commitment arises in light of favorable
  expectations, and weak goal commitment arises in light of unfavorable expectations. To the contrary, when people only
  fantasize about a desired future or only reflect on present reality, expectancy-independent moderate goal commitment
  emerges. »).
- **Taille d'effet** : aucune dans le résumé.
- **c3 : nuances** — c'est **la seule étude du dossier qui teste le comparateur exact de c3** (« seulement rêver »), et elle
  dit « mieux **si** on s'attend à réussir ; moins bien sinon ». Le critère est l'engagement (plans, attachement, effort,
  qualité de performance), pas l'atteinte du but. Pas de plans « si… alors… » ici (contraste mental seul).
- **c1 : nuances (indirect)** — seulement rêver donne un engagement *moyen*, pas faible : ce n'est pas « rêver fait
  baisser l'effort » au sens absolu.
- **c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase ; la limite qui dit qu'elle renvoie aux hypothèses est honnête et
  nécessaire. Texte de f1 fidèle. Limites et `allegiance` justes.

## 9. 10.1037/0022-3514.83.5.1198 (oettingen-2002-fantasies)

- **Identité** : confirmée. « The motivating function of thinking about the future: Expectations versus fantasies. »
  Oettingen, G. (premier auteur ; Mayer), 2002, *Journal of Personality and Social Psychology* 83(5), 1198-1212. Ni
  correction ni rétractation.
- **Plan (relecteur)** : **prospectif corrélationnel** (fantasmes mesurés, pas manipulés ; effort et performance mesurés
  des semaines à 2 ans plus tard). Le classement « longitudinal » de la fiche donne un plafond modéré, mais **c1 est
  causale et rien n'est manipulé ici** : pour c1, plafond basse (règle dure du §3).
- **Population** : quatre échantillons : diplômés qui cherchent un emploi, étudiants amoureux d'un camarade, étudiants
  avant un examen, patients opérés de la hanche ; tailles et pays non donnés. MENA : non.
- **Résultat principal** : les **attentes** positives (juger le futur probable) prédisent plus d'effort et de réussite ;
  les **fantasmes** positifs (vivre positivement ses images du futur) prédisent l'inverse.
- **Phrase du résumé** : « Positive expectations (judging a desired future as likely) predicted high effort and
  successful performance, but the reverse was true for positive fantasies (experiencing one's thoughts and mental images
  about a desired future positively). »
- **Taille d'effet** : aucune dans le résumé.
- **c1 : supports (association seulement)** — et une nuance précieuse pour la vidéo : **croire qu'on peut y arriver aide**,
  c'est le rêve idéalisé qui va avec moins d'effort. Ne pas raconter « penser positif nuit ».
- **c2, c3, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; `kind: association` juste ; limites et `allegiance` justes.

## 10. 10.1177/0146167299025002010 (pham-1999-process)

- **Identité** : confirmée. « From Thought to Action: Effects of Process-Versus Outcome-Based Mental Simulations on
  Performance. » Pham, L. B. (premier auteur ; Taylor), 1999, *Personality and Social Psychology Bulletin* 25(2), 250-260.
  Ni correction ni rétractation. Résumé seul (fermé).
- **Plan (relecteur)** : **expérience** (quatre conditions : processus, résultat, les deux, contrôle d'auto-observation ;
  5 à 7 jours avant un partiel). Plafond : modérée.
- **Population** : étudiants de première année (États-Unis) ; taille non donnée dans le résumé (Cole 2021 la code à
  N = 42 par comparaison avec le contrôle). MENA : non.
- **Résultat principal** : la simulation du processus a augmenté le temps d'étude et amélioré les notes, par une meilleure
  planification et moins d'anxiété.
- **Phrase du résumé** : « Results indicated that process simulation enhanced studying and improved grades; the latter
  effect was mediated by enhanced planning and reduced anxiety. »
- **Taille d'effet** : aucune dans le résumé. **Le résumé ne dit pas par rapport à quoi** (contrôle ? simulation du
  résultat ?). Cole 2021 (texte entier) code l'effet du processus sur la note contre le contrôle comme **non significatif
  (p < 0,09, g = 0)**, et de même les bras « résultat » et « les deux ». Alghazo 2020 (introduction) résume les travaux de
  Pham et Taylor ainsi : une tendance d'abord, puis une différence significative dans une réplication — je n'ai pas pu
  vérifier laquelle est celle de 1999.
- **c2 : supports (faible)** — un seul petit essai, résultat non chiffré dans le résumé, et contesté par le codage de Cole ;
  la réplication arabe la plus grande (Alghazo, n = 269) ne retrouve pas l'effet sur l'examen.
- **c1 : nuances (indirect)** — rien dans le résumé ne dit que la simulation du résultat a *fait baisser* l'effort par
  rapport au contrôle.
- **c3, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase. Le texte de f1 (« increased studying and improved grades ») reprend le
  résumé, mais sans comparateur ; **le finding doit dire « compared with … » ou rester flou comme le résumé**. Les deux
  limites sur Cole et sur le comparateur sont justes et importantes ; ajouter que Cole code aussi le bras « résultat » à
  g = 0 contre le contrôle.

## 11. 10.3389/fpsyg.2021.565202 (wang-2021-mcii)

- **Identité** : confirmée. « A Meta-Analysis of the Effects of Mental Contrasting With Implementation Intentions on Goal
  Attainment. » Wang, G. (premier auteur ; Wang, Gai), 2021, *Frontiers in Psychology* 12, 565202. Ni correction ni
  rétractation.
- **Plan (relecteur)** : **méta-analyse** (effets aléatoires) d'**interventions de terrain** MCII contre contrôle (le seul
  écart entre groupes : MCII ou non ; études de laboratoire exclues). Plafond : haute.
- **Population** (texte entier, tableau 1) : 24 effets, 21 articles, N = 15 907 ; enfants, étudiants, adultes, patients ;
  bases anglaises et chinoises. **87 % des participants (13 909) viennent d'un seul article, Kizilcec 2017** (n° 6). MENA :
  non connu.
- **Résultat principal** : g = 0,336 ; plus fort avec un expérimentateur (0,465) que sur papier ou écran (0,277) ; « un
  certain biais de publication ».
- **Phrases du résumé** : « Results showed that MCII to be effective for goal attainment with a small to medium effect size
  (g = 0.336). » — « Specifically, studies with interventions based on interactions between participants and experimenters
  (g = 0.465) had stronger effects than studies with interventions based on interactions between participants and
  documents (g = 0.277). » — « …however, because of some publication bias, the actual effect sizes may be smaller. »
- **Taille d'effet et biais de publication** (texte entier) — **le problème est plus grand que « some »** :
  - entonnoir « strong asymmetry » ; **test d'Egger t = 5,46, p < 0,01** ; trim-and-fill : 8 études, **g ajusté = 0,242
    [0,143 ; 0,342]** (−28 %) ;
  - **les deux plus grands essais, ceux de Kizilcec 2017, donnent g = 0,09 et 0,06, intervalles qui touchent zéro** ; les
    petites études avec un expérimentateur donnent 0,4 à 1,1 ;
  - **mon recalcul** à partir des intervalles du tableau 1 (indicatif, valeurs arrondies) : effet fixe pondéré par la
    précision **g ≈ 0,18** ; régression de g sur l'erreur type (type PET) : **ordonnée ≈ 0,02**, c'est-à-dire un effet
    proche de zéro pour une étude infiniment précise ;
  - les arguments rassurants des auteurs sont faibles : le « fail-safe N » ne teste pas le biais ; publié 0,404 contre non
    publié 0,271 (non significatif sur 5 thèses, mais dans le sens du biais) ; mesure déclarée 0,403 contre objective 0,272.
  Hétérogénéité I² = 59 %.
- **c3 : supports, mais petit et fragile** — contre des contrôles variés (rarement « seulement rêver ») ; l'effet se réduit
  à mesure que la preuve devient grande, objective et sans expérimentateur, et le seul test préenregistré à grande échelle
  (Kizilcec 2020, postérieur et non inclus) est nul.
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f3 = mes phrases, même sens. f2 : même sens que le résumé, **mais le résumé minimise** ;
  le texte de f2 (« Some publication bias was found: the real effect of MCII may be smaller ») doit dire au moins « strong
  funnel asymmetry; adjusted g = 0.24; the two largest trials near zero ». `k: 21` = articles ; préciser 24 effets.
  Limites justes ; ajouter : 87 % des participants viennent de Kizilcec 2017 (donc **pas indépendant** de la fiche n° 6) ;
  15 études sur 20 avec une mesure déclarée ; études du laboratoire d'Oettingen et Gollwitzer nombreuses (allégeance).

## 12. 10.1093/jcr/ucv098 (woolley-2016-fun)

- **Identité** : confirmée. « For the Fun of It: Harnessing Immediate Rewards to Increase Persistence in Long-Term
  Goals. » Woolley, K. (premier auteur ; Fishbach), 2016 (en ligne le 5 janvier 2016 ; numéro d'avril 2016), *Journal of
  Consumer Research* 42(6), 952-966. Ni correction ni rétractation. Résumé seul.
- **Plan (relecteur)** : **expériences** (plusieurs études ; nombre et tailles non donnés dans le résumé), plus une
  comparaison corrélationnelle (récompenses immédiates contre différées comme prédicteurs). Plafond : modérée.
- **Population** : activités de santé et d'étude (choix d'exercice, sachet de carottes, musique dans une classe de
  lycée) ; tailles et pays non donnés. MENA : non connu.
- **Résultat principal** : se concentrer sur les récompenses **immédiates** d'une activité (son plaisir maintenant)
  augmente la persistance plus que se concentrer sur ses bénéfices différés ; choisir l'exercice le plus agréable plutôt
  que le plus utile augmente la persistance ; ajouter une récompense externe immédiate (musique) aussi.
- **Phrases du résumé** : « With regard to health and academic goals, we find that attending to the immediate rewards of
  health and academic activities increases persistence in these activities to a greater extent than attending to delayed
  rewards, even though these activities are selected for the delayed rewards they provide. » — « Specifically, bringing
  immediate rewards into activity choice—for example, having participants choose the most enjoyable rather than the most
  useful exercise or the tastier rather than healthier bag of carrots—increases persistence and consumption. » — « Across
  these studies, immediate rewards are stronger predictors of activity persistence than delayed rewards. »
- **Taille d'effet** : aucune dans le résumé.
- **c4 : supports en partie** — **persistance oui, réussite non mesurée** ; persistance sur une séance, pas sur un but à
  long terme atteint ; une partie des « récompenses immédiates » est **ajoutée de l'extérieur** (musique), ce n'est pas
  « aimer l'activité elle-même ». Et ce n'est pas l'idée du livre (accepter la douleur du chemin).
- **c1, c2, c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. Limites justes (dont « enjoyment of the activity, not
  acceptance of pain »). Ajouter : pas de mesure de performance ; la musique est une récompense externe.

---

## Tableau final

| DOI | c1 rêve idéalisé → moins d'effort (causal) | c2 processus > résultat (causal) | c3 MCII > seulement rêver (causal) | c4 aimer l'activité → persister, réussir |
|---|---|---|---|---|
| 10.23947/2334-8496-2020-8-si-37-47 (Alghazo 2020) | contradicts (faible, indirect) | nuances (examen nul, devoirs mêlés) | irrelevant | irrelevant |
| 10.1037/a0035661 (Cerasoli 2014) | irrelevant | irrelevant | irrelevant | supports en partie (association, comparateur = incitations) |
| 10.3758/s13423-021-01880-6 (Cole 2021) | contradicts la lecture large (15 effets, g = 0,23) ; n'a pas testé la lecture étroite | ne soutient pas, ne contredit pas directement (5 effets, ns ; aucun tête-à-tête) | supports (indirect, composite k = 8) | irrelevant |
| 10.1080/17437199.2019.1594332 (Cross 2019) | irrelevant | irrelevant | supports (petit, santé, court terme ; les plans n'ajoutent rien) | irrelevant |
| 10.1016/j.jesp.2011.02.003 (Kappes 2011) | supports (lecture étroite ; énergie ; réussite déclarée p = 0,05) | irrelevant | irrelevant | irrelevant |
| 10.1073/pnas.1611898114 (Kizilcec 2017) | irrelevant | irrelevant | nuances (individualistes +1,8 et +3,9 points ; collectivistes nul) | irrelevant |
| 10.1073/pnas.1921417117 (Kizilcec 2020) | irrelevant | irrelevant | contradicts (achèvement, à grande échelle, préenregistré) | irrelevant |
| 10.1037/0022-3514.80.5.736 (Oettingen 2001) | nuances (rêver seul = engagement moyen) | irrelevant | nuances (mieux seulement si on s'attend à réussir) | irrelevant |
| 10.1037/0022-3514.83.5.1198 (Oettingen 2002) | supports (association seulement) | irrelevant | irrelevant | irrelevant |
| 10.1177/0146167299025002010 (Pham 1999) | nuances (indirect) | supports (faible ; Cole le code nul contre contrôle) | irrelevant | irrelevant |
| 10.3389/fpsyg.2021.565202 (Wang 2021) | irrelevant | irrelevant | supports (g 0,34 → 0,24 ajusté ; grands essais ≈ 0) | irrelevant |
| 10.1093/jcr/ucv098 (Woolley 2016) | irrelevant | irrelevant | irrelevant | supports en partie (persistance courte, pas la réussite) |

## Lecture d'ensemble (direction et plafond de certitude par affirmation, `docs/verdict.md` §3)

**c1 — mêlée : soutenue seulement dans sa lecture étroite, contredite dans sa lecture large ; certitude basse.** La seule
preuve où l'exposition est manipulée et qui va dans le sens de c1 est Kappes 2011 : quatre petites expériences d'un même
laboratoire (allégeance), qui mesurent surtout l'**énergie** juste après l'induction ; la **réussite** n'est testée qu'une
fois, déclarée, sur 40 personnes, à p = 0,05, avec 18 % d'attrition. Oettingen 2002 ajoute quatre échantillons
prospectifs, mais corrélationnels (non causal). Contre : Cole 2021, méta-analyse d'essais randomisés, trouve qu'imaginer un
résultat réussi **améliore un peu** le comportement (g = 0,23, 15 effets, mesuré surtout des semaines plus tard) contre des
contrôles sans simulation ; Alghazo 2020, dans un échantillon saoudien, ne voit pas le groupe « résultat » étudier moins,
et le voit même faire mieux au début. Cole est de rang supérieur : **la direction « soutient » est interdite pour la lecture
large** (« imaginer le résultat nuit »). Pour la lecture étroite (rêve idéalisé, sans obstacles, contre une pensée qui
questionne ou neutre), Cole est indirect. Plafond : modérée (Kappes), −1 risque de biais (petits échantillons, un
laboratoire, réussite déclarée au seuil), −1 caractère indirect et incohérence → **basse**. Nuance à dire : ce sont les
**attentes** positives (« je peux y arriver ») qui vont avec plus d'effort (Oettingen 2002) ; le problème serait le rêve
idéalisé qui fait vivre la réussite d'avance, pas « penser positif ». Les mots « بيسبب » ou « بيخلّي » ne tiennent que pour
l'énergie ressentie, pas pour l'échec.

**c2 — mêlée, penche vers « non démontrée » ; certitude très basse.** Pour : Pham 1999, un petit essai dont le résumé ne
dit pas contre quoi la note s'est améliorée, et que Cole 2021 code **nul contre le contrôle** (p < 0,09) ; la médiation par
la planification et l'anxiété est intéressante mais repose sur le même petit essai. Contre ou nul : Alghazo 2020, seul
tête-à-tête randomisé d'une taille correcte (269, arabe), **pas de différence à l'examen** ni sur l'engagement, et sur les
devoirs le résultat gagne au début, le processus à la fin. Cole 2021 **ne contredit pas directement** (aucune comparaison
tête-à-tête) mais **ne soutient pas** : processus contre contrôle g = 0,17, ns, 5 effets ; résultat contre contrôle
g = 0,23, significatif, 15 effets ; différence entre sous-types non significative ; dans les quatre études qui ont les deux
bras, le processus ne fait pas mieux. Plafond : modérée (expériences), −1 incohérence, −1 imprécision et risque de biais →
**très basse** : c2 ne peut pas servir de hook, même en question (§5). C'est pourtant le cœur pratique du livre (« le
chemin ») : la vidéo doit dire que **la preuve que répéter les étapes vaut mieux que voir le résultat est faible**.

**c3 — soutient en partie (un petit effet, pour certains, dans certains contextes) ; certitude basse.** Pour : deux
méta-analyses (Wang 2021 g = 0,34, Cross 2019 g = 0,28 sur la santé) et le composite de Cole (g = 0,61, k = 8). Mais :
(1) **biais de publication sérieux** chez Wang : Egger p < 0,01, g ajusté 0,24, et les deux plus grands essais (87 % des
participants) sont proches de zéro ; mon recalcul indicatif place l'effet d'une étude très précise près de 0 ; (2) le seul
**essai préenregistré à grande échelle** (Kizilcec 2020, 12 879 individualistes) ne retrouve pas l'effet sur l'achèvement,
seulement un surcroît d'activité la première semaine ; (3) **rien chez les collectivistes** (Kizilcec 2017) ; (4) Cross dit
que les plans « si… alors… » n'ajoutent rien de démontré au contraste seul ; (5) **le comparateur de c3, « seulement
rêver », n'est testé que par Oettingen 2001**, qui dit « mieux si l'on s'attend à réussir, moins bien sinon » (et mesure
l'engagement, pas l'atteinte). Plafond : haute (méta-analyses), −1 biais de publication, −1 incohérence (préenregistré nul,
cultures) → **basse** ; tenue strictement au comparateur « seulement rêver », elle descend encore (caractère indirect). Le
« à retenir » sur WOOP doit rester « جرّب / ممكن يساعد », pas `evidence`. Interventions et contrôles : beaucoup d'études du
laboratoire qui a créé et promeut la méthode.

**c4 — soutient en partie, sur autre chose que le livre ; certitude basse.** Cerasoli 2014 (méta-analyse de corrélations,
183 échantillons) : la motivation intrinsèque va avec une meilleure performance, surtout en qualité ; mais le comparateur
est la présence d'**incitations**, pas des gens qui ne valorisent que le résultat, et pour la **quantité** ce sont les
incitations qui prédisent le mieux. Woolley 2016 (expériences) : se concentrer sur le plaisir immédiat augmente la
**persistance** sur une séance ; pas de mesure de réussite, pas de but à long terme atteint, une partie des récompenses
est externe (musique). Plafond : haute (méta-analyse, affirmation non causale), −1 caractère indirect (comparateur,
critère), −1 risque de biais (mesures transversales, souvent de même source) → **basse**. Surtout : **ni l'une ni l'autre
ne teste l'idée de Manson** (choisir la lutte qu'on accepte) ; elles testent « que ce soit agréable ». Si c4 reste dans le
champ, il faut l'écrire « le plaisir du chemin » et dire que ce n'est pas la même chose qu'« accepter la douleur ».

**Ce qui en découle pour le badge** (indication, la décision reste à l'écrivain et au propriétaire) : la certitude du
verdict ne dépasse pas la plus basse des affirmations du champ : **très basse si c2 est dans le champ, basse sinon** ;
⚖️ ou ❓, jamais ✅ ni ❌. Aucun hook affirmatif possible ; un hook en question peut s'appuyer sur c1 (lecture étroite),
c3 ou c4 (basses), **pas sur c2** (très basse). Le seul énoncé solide du dossier est négatif pour les promesses de la
littérature de développement personnel : les méthodes testées à grande échelle (MCII) perdent l'essentiel de leur effet.

**Égypte / MENA.** Une seule fiche a `mena: true`, à juste titre : **Alghazo 2020, 269 étudiantes saoudiennes
arabophones** (une université privée d'Al Khobar, femmes seulement, cours en ligne pendant le COVID). C'est aussi l'étude
qui va **contre** c2 à l'examen et contre la lecture large de c1. Kizilcec 2017 et 2020 ont des apprenants de presque
tous les pays mais **aucun résultat pour le monde arabe** ; le « rien chez les collectivistes » de 2017 est le résultat
le plus proche de notre public (à vérifier dans le texte entier où l'article range les pays arabes). Pour c1, c3 et c4 :
« معظم الدراسات من أمريكا وأوروبا » doit être dit ou écrit.

**Indépendance des preuves.** Kappes 2011, Oettingen 2001 et Oettingen 2002 : **le même laboratoire** (Oettingen), qui a
créé la méthode WOOP et la promeut ; Wang 2021 et Cross 2019 en contiennent de nombreuses études, et se chevauchent
probablement ; **Wang 2021 contient Kizilcec 2017** (87 % de ses participants) ; Kizilcec 2017 et 2020 : la même équipe ;
Cole 2021 contient Pham 1999 (codé nul) et des études MCII d'Oettingen et Gollwitzer. Alghazo 2020, Cerasoli 2014 et
Woolley 2016 sont indépendants des autres.

## Corrections demandées aux fiches

1. **alghazo-2020-simulation** : le texte entier est accessible (PDF de l'éditeur) ; `n` = 269 (139 processus, 130
   résultat, attribution aléatoire) ; femmes, Arabie saoudite, arabe langue maternelle ; **un groupe de base existe**
   (269, apparié, non randomisé) : la limite « no control group without simulation » est fausse ; ajouter « résultat >
   base au 1er semestre ».
2. **cole-2021-simulation** : f2 et f3 ne reposent pas sur le résumé (texte entier, tableau 3) : le dire ; la limite
   « behaviour mostly measured within a day » ne vaut pas pour les 15 effets « résultat » (surtout 1 à 19 semaines) ;
   ajouter : 12 sur 15 en santé, 10 sur 15 incités, aucun du paradigme d'Oettingen, Pham 1999 codé g = 0 ; signaler
   l'incohérence entre le texte des résultats (« Process » significatif) et le tableau 3 (p = 0,20).
3. **wang-2021-mcii** : f2 minimise le biais de publication ; écrire Egger p < 0,01, g ajusté 0,242 [0,143 ; 0,342],
   les deux plus grands essais (Kizilcec 2017, 87 % des participants) à g = 0,09 et 0,06 ; ajouter la non-indépendance
   avec kizilcec-2017-culture ; `k` : 21 articles, 24 effets.
4. **kizilcec-2017-culture** : ajouter les effets en points (+1,8 et +3,9) et le g ≈ 0,06-0,09 toutes cultures
   confondues ; ne pas dire « 32 % » sans « de 5,5 à 7,3 % ».
5. **kizilcec-2020-scale** : `n` = 269 169 (MCII, individualistes : 12 879) ; dire que le résultat MCII est dans le texte
   entier, pas dans le résumé.
6. **kappes-2011-energy** : f1 vient du résumé du manuscrit (`where` à corriger) ; ajouter l'attrition de l'étude 3
   (9 sur 49), la réussite déclarée (« how well did the week go »), l'effet très petit de l'étude 1 (η² = 0,024, femmes,
   chaussures à talons).
7. **pham-1999-process** : le texte de f1 doit nommer le comparateur ou rester aussi vague que le résumé ; ajouter que
   Cole code aussi le bras « résultat » nul contre le contrôle.
8. **cerasoli-2014-intrinsic** : compléter f1 par « …while incentives better predicted quantity » ; dire que le
   comparateur est la présence d'incitations.
9. **cross-2019-contrasting** : « adjusted » non expliqué par le résumé ; chevauchement probable avec Wang et Cole.
10. **woolley-2016-fun** : pas de mesure de réussite ; la musique est une récompense externe.
11. **oettingen-2001-contrasting**, **oettingen-2002-fantasies** : rien à corriger ; pour c1, Oettingen 2002 ne compte pas
    comme preuve causale.

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `design`, `n`/`k`, `effect`, `limits`, `allegiance` ; `declared` et `acknowledged` non lus. Dépôt
`/home/user/book-vs-science` : seul ce fichier a été créé (`reports/choose-your-struggle/blind-review.md`, avec son
dossier) ; rien d'autre modifié, aucune commande git.
