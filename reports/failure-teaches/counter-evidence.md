# Contre-preuve : « l'échec est la voie » (Manson, ch. 7), verdict ⚖️ basse

Agent contre-preuve, 2026-11-23. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé (brouillon
`dossiers/failure-teaches.json` et `.md`, ⚖️, certitude basse). Je ne valide rien. Lu : `docs/verdict.md` (grille), le
dossier, les 12 fiches de `content/sources/` qu'il cite, `content/contested.json`. Aucun autre fichier du dépôt n'a été
modifié ; `blind-review.md` n'a pas été touché.

Sources : Crossref (`query.bibliographic`, `filter=updates:<doi>`, `filter=from-pub-date:`, `works/<doi>`), Europe PMC
(`search`, `resultType=core` ; citations `MED/31702452/citations`), OpenAlex (`works?search=`, `works/doi:` pour les
résumés, `sources/` pour une revue). Textes intégraux lus : **Spiller 2025** (prépublication PsyArXiv
10.31234/osf.io/93pcn, version « in press » avec son supplément, téléchargée d'OSF) ; **Gök & Fyfe 2024** (manuscrit
accepté, PsyArXiv 10.31234/osf.io/bw42v, « Manuscript accepted at JEP: General, Jun 4, 2024 ») ; l'évaluation eLife de
Traag 2025 (API d'eLife) ; la page de la correction de Yin 2019 (nature.com). User-Agent générique
`book-vs-science-counter/0.1`, aucun nom ni e-mail. Réponses brutes : scratchpad de la session (`ce-failure/raw/`), pas
dans le dépôt.

Chaque DOI cité ici a été trouvé par une requête, puis vérifié sur Crossref (`works/<doi>` : titre, premier auteur,
année ; l'année retenue est celle de Crossref). Rien n'est pris de mémoire. « Force » = poids de l'argument contre le
verdict, selon la grille (rang du plan, taille, indépendance). Les phrases citées sont des phrases de résultat du résumé,
sauf mention contraire (« texte intégral », « conclusion », « contexte »).

Limites de ma recherche : résumés surtout ; deux textes intégraux d'articles ; quatre résumés introuvables (Darabi 2018,
Ashman 2019, King-Shepard 2025, Yan 2025 : éditeurs qui les retirent des API) ; une fois Crossref a répondu 429 (relancé).

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 12 DOI du verdict (0956797619881133, xge0001170, xge0001632, mnsc.2013.1720, smj.3609, amj.2010.51467631, 0021-9010.93.1.59, 00346543211019105, cjes.v17i2.6822, s11251-020-09525-2, s41467-019-12189-3, 0022-3514.81.4.599) | 0 avis pour chacun |
| Crossref | `works/<doi>` des 12 (`updated-by`, `relation`) | aucun `updated-by` |
| Crossref | `query.bibliographic` = « correction erratum corrigendum + titre » pour les 12 (avis non reliés, défaut signalé dans `reports/money-happiness/counter-evidence.md`) | 0 avis (seulement les articles eux-mêmes et des homonymes) |
| Crossref | `filter=updates:` sur 46 DOI de contre-preuve (ceux de (b) et quelques non retenus) | 0 avis, sauf Yin 2019 : correction 10.1038/s41586-020-2325-6, lue (voir carte 14) |

### Requêtes de recherche (2026-11-23)

| # | Base | Requête exacte | Regardés (sur) |
|---|---|---|---|
| Q1 | Crossref | `Eskreis-Winkler Fishbach reply Spiller learning from failure consistency`, `from-pub-date:2024` | 10 |
| Q2 | OpenAlex | `learning from failure tune out`, `from_publication_date:2023-01-01` | 25 (223 436) |
| Q3 | OpenAlex | `Script Task failure feedback consistency` | 10 (52 625) |
| Q4 | Europe PMC | `("failure feedback" OR "learning from failure" OR "learn from failure" OR "tune-out" OR "tune out") AND (learning OR memory) AND PUB_YEAR:[2019 TO 2026] AND (replication OR replicate OR "failed to replicate" OR commentary OR reanalysis OR preregistered)` | 30 (187) |
| Q5 | Europe PMC | citations de Eskreis-Winkler & Fishbach 2019 (PMID 31702452) | toutes (46) |
| Q6 | Crossref ; OpenAlex | `The exaggerated benefits of failure Eskreis-Winkler Woolley` ; `exaggerated benefits of failure` | 5 ; 5 |
| Q7 | Crossref | `pretesting effect meta-analysis errors prequestions learning` (depuis 2018) ; `errorful learning errorless learning meta-analysis memory` | 12 ; 12 |
| Q8 | Europe PMC | `("errorful generation" OR "pretesting effect" OR "errorful learning" OR "learning from errors") AND (meta-analysis OR review) AND PUB_YEAR:[2015 TO 2026]` | 20 (871) |
| Q9 | Crossref ; Europe PMC | `implicit learning in memory rehabilitation meta-analysis errorless learning vanishing cues` ; `"errorless learning" AND ("meta-analysis" OR "systematic review") AND (memory OR dementia OR amnesia OR "brain injury")` | 5 ; 10 (307) |
| Q10 | OpenAlex ; Crossref | `productive failure meta-analysis` (depuis 2018) ; `problem solving or explicit instruction which should go first element interactivity` ; `problem solving before instruction meta-analysis` (depuis 2020) | 15 (103 622) ; 5 ; 10 |
| Q11 | Crossref ; OpenAlex | `comment Sinha Kapur productive failure meta-analysis critique` (depuis 2021) ; `productive failure instruction first replication null` (depuis 2021) | 8 ; 10 (2 623) |
| Q12 | OpenAlex ; Europe PMC | `error management training` (depuis 2012) ; `("error management training" OR "error-management training" OR "error encouragement" OR "error framing") AND PUB_YEAR:[2009 TO 2026]` | 20 ; 25 (83) |
| Q13 | Crossref | `Does discovery-based instruction enhance learning meta-analysis` ; `Why minimal guidance during instruction does not work` ; `expertise reversal effect` | 3 ; 3 ; 4 |
| Q14 | OpenAlex ; Crossref | `near miss grant funding early career setback later performance` (depuis 2019-06) ; `near misses narrow wins grant applicants regression discontinuity later career` (depuis 2019) | 15 (1 159) ; 10 |
| Q15 | Crossref ; OpenAlex | `The Matthew effect in science funding` ; `The Matthew effect and early-career setbacks in research funding a replication study` ; `Bol de Vaan van de Rijt Matthew effect science funding PNAS` | 5 ; 8 + 5 ; 5 |
| Q16 | Crossref | `Can losing lead to winning halftime basketball` ; `Does losing lead to winning? An empirical analysis for four sports` | 5 ; 5 |
| Q17 | Crossref ; OpenAlex | `performance persistence in entrepreneurship` ; `Skill vs luck in entrepreneurship and venture capital evidence from serial entrepreneurs` ; `prior business failure subsequent venture performance serial entrepreneurs` (depuis 2012) ; `entrepreneurial failure learning subsequent venture performance meta-analysis` ; titres d'Eggers & Song 2015 et d'Ucbasaran 2013 | 5 ; 5 ; 12 (3 431) ; 8 ; 3 + 3 |
| Q18 | Crossref ; OpenAlex | `barely failing exam regression discontinuity effect on later outcomes students` (depuis 2008) ; `barely failing exit exam regression discontinuity` | 10 ; 8 (131) |
| Q19 | Crossref | `Author Correction: Quantifying the dynamics of failure across science, startups and security` ; page nature.com de la correction | 3 ; lue |
| Q20 | Europe PMC | `("learning from errors" OR "learning from mistakes" OR "error orientation" OR "error climate" OR "fear of failure" OR "failure feedback" OR "productive failure" OR "error management" OR "errorful") AND (Egypt OR Egyptian OR Saudi OR Jordan OR Jordanian OR Lebanon OR Lebanese OR Emirates OR UAE OR Qatar OR Kuwait OR Oman OR Morocco OR Tunisia OR Algeria OR Arab OR Arabic)` | 30 (1 209) |
| Q21 | OpenAlex | `productive failure Jordan` ; `productive failure Egypt` ; `learning from errors Egyptian students experiment` ; `error management training Arab` ; `failure feedback Arab students learning` | 6 chacune, rien de pertinent |
| Q22 | OpenAlex | `works/doi:10.18844/cjes.v17i2.6822` et `sources/S2739369835` (la revue d'Ezzeldin 2022) | lus |
| Q23 | OpenAlex ; Crossref | `culture persistence after failure East Asian replication self-improvement` (depuis 2010) ; `cross-cultural differences learning from failure feedback countries` (depuis 2015) | 10 ; 8 |
| Q24 | Crossref ; OpenAlex | `Even Einstein struggled …` ; `scientists struggle stories students science learning replication` (depuis 2016-06) ; `learning from others failures vicarious learning meta-analysis` | 3 ; 8 ; 8 |

Obligatoires : « meta-analysis » (Q7-Q10, Q12, Q13, Q17), « replication » (Q4, Q11, Q14-Q16), « culture » / « moderator »
(Q20-Q23 ; modérateurs lus dans Loh 2012, Sinha 2021, Wong 2026, Thiel 2022).

---

## (b) Ce que j'ai trouvé

### 0. Le cadrage : c1 teste une comparaison que l'auteur ne fait pas

Manson dit « improvement comes from failure » et « the more you fail, the more likely you are to succeed » : échouer
(puis apprendre) **plutôt que ne pas échouer**. c1 compare autre chose : un retour « faux » contre un retour « juste »,
à information égale. Même si c1 était solidement contredite, le livre ne serait pas réfuté sur ce point : il ne dit pas
qu'on apprend autant d'un échec que d'un succès. La comparaison du livre (essayer, se tromper, recevoir la réponse,
contre étudier sans se tromper) a sa littérature (« errorful learning », « pretesting », « derring ») : voir les cartes
9-11. Je recommande de réécrire c1 ou de la sortir du champ (`inScope: false`), et de toute façon de ne pas en faire le
retournement de l'épisode (raisons en 1-3).

### Contre c1 (« on apprend moins de son propre échec ») : la direction repose sur une tâche contestée

**1. Spiller 2025** — 10.1177/09567976251333666 — *Psychological Science* (commentaire avec données ; prépublication
10.31234/osf.io/93pcn, texte intégral lu)
- Plan : modèle mathématique + expérience préenregistrée (MTurk, 401 personnes, 395 analysées), un post-test préenregistré
  (403), deux expériences du supplément (498 ; 387 analysées), réanalyse des données originales. Reproductibilité des
  calculs « independently confirmed by the journal's STAR Team » (texte intégral).
- Résumé : « An experiment with U.S. Amazon Mechanical Turk workers demonstrates that a retroactive manipulation without
  feedback replicates the effect. » et « Because the effect of failure on performance is confounded with consistency,
  the Script Task is not diagnostic regarding whether people learn less from failure unless consistency is ruled out. »
- Texte intégral : sans aucun retour et avec la condition tirée **après** les réponses, « succès » 86 % contre « échec »
  11 % (d = 3,29) ; inverser les étiquettes des données originales redonne le même écart ; avec des symboles qui
  poussent à répéter sa réponse plutôt qu'à rester cohérent (S1), l'effet **s'inverse** : « apparent failure to learn
  from success ». Le supplément explique aussi l'étude 5 (« autrui ») par la disparition du biais, pas par l'ego.
- Joue : **le pilier de c1 est une tâche dont le score mélange l'apprentissage et la tendance à répondre de façon
  cohérente**. Et ce n'est pas qu'une limite d'une fiche : Spiller nomme Keith 2022 et Gök & Fyfe parmi les travaux qui
  reproduisent l'effet « using the core paradigm (the Script Task) ». Les deux réplications reproduisent donc le biais
  autant que l'effet ; elles n'ajoutent pas d'indépendance sur la question posée. Force : **élevée** (même revue que
  l'original, préenregistré, calculs vérifiés par la revue).
- Le vérificateur l'a refusé parce qu'OpenAlex le classe « editorial » ; **Crossref le classe `journal-article`**, avec
  cinq tours de relecture publiés (`has-review`, v1 à v5). C'est un défaut de `verify` (le type d'OpenAlex l'emporte),
  pas un défaut de l'article : à corriger ou à écrire dans `LIMITES.md`.

**2. Eskreis-Winkler & Fishbach 2025** — 10.1177/09567976251391180 — *Psychological Science* (réponse ; **le dossier dit
« aucune réponse trouvée » : elle existe**)
- Résumé : « Although a consistent response pattern explains why people struggle to learn from failure in some
  paradigms, we argue that it does not explain the results of the original paradigm. »
- Joue : la controverse est **ouverte**, pas tranchée : les auteurs contestent, sans nouvelle donnée dans le résumé, et
  concèdent que la cohérence explique l'effet « in some paradigms ». Pour la grille : incohérence + risque de biais non
  levé.

**3. Gök & Fyfe 2024** — au dossier (manuscrit accepté lu en entier) : trois points que la fiche ne dit pas
- Études 1a-1c et 2 : la tâche est celle d'Eskreis-Winkler (symboles d'une « ancient script » sans bonne réponse, test
  de l'étude 2 inversé : « Which … is INCORRECT? ») : le biais de Spiller s'y applique en entier.
- Étude 1b (MTurk, 324) : la réplication proche **n'est pas significative** : « self-focused failure feedback led to
  descriptively lower learning (M = 69%…) than self-focused success feedback (M = 76%…), but this difference was not
  statistically significant… d = .19 » ; effet principal η² = .01 (contre d = .97 dans l'étude 1a, étudiants).
- **Étude 3 (la nuance à l'écran) n'est pas randomisée** : « they were post-hoc categorized as low-performers who received
  failure feedback (n = 104) or high-performers who received success feedback (n = 114) ». Le groupe « échec » est celui
  qui a raté les 3 premières questions : sélection et retour vers la moyenne (3 items, mesure très bruitée) peuvent
  produire à eux seuls « l'échec fait aussi bien, voire mieux ». La fiche marque `with-instruction` en `kind: causal` :
  c'est une **association**.
- Étude 1 : un retour centré sur la tâche (« The answer was incorrect ») au lieu de la personne ne réduit pas l'écart
  (« did not significantly reduce the discrepancy »). C'est un résultat **contre l'explication par l'ego** que le
  dossier veut dire (« son propre échec, on le fuit, menace pour l'ego ») : à ne pas dire comme un résultat.

**4. La nuance « avec une explication, l'écart disparaît » ne départage pas** (mon raisonnement, à partir du modèle de
Spiller, texte intégral) : l'écart produit par la seule cohérence vaut (2ρ − 1)(1 − λ), où λ est la part de ce qui est
appris ; donner la réponse corrigée ou la règle fait monter λ, donc **l'écart artificiel fond aussi**. Keith 2022 (exp. 2,
même tâche) et Gök 2024 (étude 3, non randomisée) sont compatibles avec les deux lectures. La nuance reste vraie comme
conseil (cartes 9-12), pas comme preuve que l'échec seul « apprend moins ».

**5. Sur le terrain, la direction est elle-même mêlée** (au dossier, relu) : KC 2013 (chirurgiens, observationnel ; une
coauteure dont d'autres articles sont rétractés) dit « succès propre > échec propre » ; Madsen 2010 (lanceurs orbitaux)
dit l'inverse : « organizations learn more effectively from failures than successes » ; Lee 2024 : on apprend de ses
échecs jusqu'à un seuil. Keith 2022 lui-même écrit en contexte que « research in educational and work settings indicates
that failure can lead to more learning than can success », et conclut « in many applied settings, tuning out upon
failure might not be an option ». Pas de quoi soutenir le livre ; pas de quoi le contredire non plus.

### Ce qui soutient la vraie comparaison du livre (se tromper puis corriger, contre ne pas se tromper), avec ses limites

**6. Fishbach 2026** — 10.1016/j.copsyc.2025.102245 — *Current Opinion in Psychology* (revue courte de l'autrice
originale ; rang bas)
- Résumé : « People learn less from failure than from success. Yet, they learn more from failure than from instruction
  alone, especially when they are confident in their ability to learn. »
- Joue : la co-autrice de l'effet dit elle-même que l'échec apprend **plus que l'instruction seule** : c'est la
  comparaison du livre, et elle va dans son sens. Force : faible (revue narrative), mais elle déplace le débat.

**7. Wong 2023** — 10.1007/s10648-023-09739-z — *Educational Psychology Review* (3 expériences, 120 étudiants)
- Résumé : « Deliberate erring improved not only retention (Experiment 1), but also far transfer on inferential test
  questions… (Experiment 2). This advantage held even over a control that further involved spotting and correcting the
  same errors that one's peers had deliberately made (Experiment 3). »
- Joue : **soutient c2** (chercher l'erreur, puis la corriger) et touche c3 : corriger ses propres erreurs volontaires a
  fait mieux que corriger celles des autres. Force : faible-moyenne (petits échantillons, un seul labo).

**8. Mera, Dianova & Marin-Garcia 2025** — 10.5334/joc.455 — *Journal of Cognition* ; **Mera et al. 2022** —
10.3758/s13423-021-02022-8 — *Psychonomic Bulletin & Review* (revue)
- 2025 : « The results showed that pretesting consistently yielded higher recall accuracy than the read-only condition. »
- 2022 (phrase de contexte d'une revue narrative) : « Experimental evidence has shown that generating errors can enhance
  learning when these are followed by corrective feedback. »
- Joue : se tromper **puis** recevoir la réponse bat la lecture sans erreur ; la condition est la même que la nuance du
  dossier, mais sur une base plus large que la tâche contestée. Force : moyenne pour la direction.

**9. Butowska-Buczyńska, Hanczakowski & Zawadzka 2024** — 10.3758/s13421-024-01608-6 — *Memory & Cognition*
- Résumé : « …we obtained evidence for the superiority of errorful learning over reading when additional time was given
  to formulate guesses, but this superiority was abolished when the overall time to study was equated between the two
  learning strategies. » et « incorrect guessing produced no benefit for learning regardless of whether the to-be-learned
  concepts were familiar or not. »
- Joue : avec du matériel plus réaliste (questions de culture générale), l'avantage de l'erreur tient au **temps passé**,
  pas à l'erreur. Affaiblit « l'erreur elle-même apprend ». Force : moyenne-faible (5 expériences, un labo).

### Contre c2 (« chercher l'erreur en apprenant fait mieux ») : le dossier dit « soutient, modérée » ; c'est haut

**10. Alfieri, Brooks, Aldrich & Tenenbaum 2011** — 10.1037/a0021017 — *Journal of Educational Psychology*
- Plan : deux méta-analyses, 164 études.
- Résumé : « Random effects analyses of 580 comparisons revealed that outcomes were favorable for explicit instruction
  when compared to unassisted discovery under most conditions, d = -.38 (95% CI = -.44/-.31). » et « …analyses of 360
  comparisons revealed that outcomes were favorable for enhanced discovery when compared to other forms of instruction,
  d = .30 (95% CI = .23/.36). »
- Joue : **les deux moitiés du ⚖️ en une méta-analyse de rang égal** : chercher seul, sans retour, fait **moins bien**
  qu'être instruit ; chercher avec retour, exemples, échafaudage ou explications fait mieux. Indirect (la découverte
  n'est pas l'échec, mais seul, on y échoue souvent). Contredit c2 telle qu'écrite (« chercher l'erreur » sans
  condition), soutient la nuance. Force : **élevée**.

**11. Loh, Andrews, Hesketh & Griffin 2012** — 10.1177/0018720812451856 — *Human Factors* (essai randomisé, 164)
- Résumé : « Error encouragement yielded better transfer performance than did error avoidance but was no better than the
  control training. » Conclusion : « The significant benefits of error-encouragement training reported in previous
  research were probably attributable to confounding factors, such as active exploration and differential task
  information. »
- Joue : **l'ingrédient actif n'est peut-être pas l'erreur** : encourager l'erreur bat surtout une formation qui la
  punit, pas une formation neutre. Or Keith & Frese 2008 comparent souvent à l'« error-avoidant training ». Ajoute :
  « Higher- rather than lower-ability trainees benefited from training with an error orientation ». Force : moyenne.

**12. Davenport & Beier 2024** — 10.1027/1866-5888/a000333 — *Journal of Personnel Psychology* (153 adultes, 18-70 ans)
- Résumé : « The results showed no significant differences in post-training performance by condition nor age
  interactions with condition. »
- Avec les nuls de **Meritet et al. 2021** (10.3138/jvme.2019-0012, 42 étudiants vétérinaires : « An adaptive transfer
  test found no significant differences between EMT and EAT at 48 hours » ; 10.3138/jvme.2019-0055, 26 : « There were no
  significant differences between EAT and EMT… ») et l'équivalence de **Schmidt et al. 2024** (10.1080/07853890.2024.2408458,
  430 étudiants en réanimation : équivalence sur la fréquence et la confiance, tendance favorable à l'EMT sur la
  profondeur).
- Joue : depuis 2008, **pas de nouvelle méta-analyse, et des essais mêlés**. Force : faible-moyenne (petits essais).

Pour être juste, ce qui **soutient** c2 depuis 2008 :
- **Aliaga et al. 2024** — 10.1001/jamanetworkopen.2024.31600 — *JAMA Network Open*, essai randomisé, 212 internes
  (150 au post-test) : « The difficult EMT cohort outperformed both the easy EMT and EAT cohorts on adaptive expertise
  cases (60.6%… vs 45.2%… vs 40.9%…) » et « Mediation analysis showed that the number of errors during training explained
  87.2% of the difficult EMT learning strategy's effect ». Le meilleur appui récent : ici, ce sont bien les erreurs.
  (Attrition 29 %.)
- **Dyre et al. 2016** — 10.1111/medu.13208 — *Medical Education*, 60 étudiants : sur de vraies patientes, « EMT group
  participants attained higher performance scores… (Cohen's d = 1.1…) ».

**13. Productive failure : réplications nulles récentes**
- **Braas et al. 2025** — 10.1007/s11251-025-09706-x — *Instructional Science*, 152 élèves, randomisé : « Surprisingly,
  the PF effect found in previous studies was not replicated » ; conclusion : « students' activation of prior knowledge
  is more critical than whether they experience failure first hand. »
- **Loibl & Leuders 2024** — 10.1007/s11251-024-09670-y — *Instructional Science*, 75 élèves : « we did neither find a
  main effect for PS-I vs. I-PS, nor for building on typical student solutions. »
- **Trninić, Sinha & Kapur 2022** — 10.1016/j.learninstruc.2022.101688 — *Learning and Instruction* (le labo du
  créateur) : productive failure contre étudier un exemple résolu, etc. : « participants on average performed nearly
  identically on most of the process and outcome measures. »
- Avec Nachtigall 2020 (au dossier). Joue : l'effet de Sinha & Kapur est **incohérent** d'une étude à l'autre, et
  l'échec vécu n'est peut-être pas nécessaire (activer ce qu'on sait suffit). Sinha & Kapur 2021 eux-mêmes : la nature
  (quasi-)expérimentale modère l'effet, et l'estimation corrigée du biais de publication (g 0,87) **dépasse** l'estimation
  brute (0,36), signe d'un modèle de correction peu fiable. Force : moyenne.

**14. Quand l'erreur nuit : novices, faibles, personnes atteintes**
- **Kirschner, Sweller & Clark 2006** — 10.1207/s15326985ep4102_1 — *Educational Psychologist* (revue narrative) :
  « minimally guided instruction is less effective and less efficient… The advantage of guidance begins to recede only
  when learners have sufficiently high prior knowledge ».
- **Kessels & de Haan 2003** — 10.1076/jcen.25.6.805.16474 — méta-analyse : chez les patients amnésiques, « A "large" and
  statistically significant ES was found for errorless learning treatment ».
- **Wong et al. 2026** — 10.3389/fpsyg.2026.1722743 — revue systématique préenregistrée, 29 études, 1 509 personnes
  (motricité) : pas de différence globale (« g = 0.0506 »), mais « a significant large effect was observed among those
  with impairments (g = 0.804…) » en faveur de l'apprentissage **sans** erreur ; GRADE « very low to low ».
- Avec Sinha & Kapur (CE1-CM2 : instruire d'abord) et Loh 2012 (les moins habiles profitent moins). Joue : la nuance
  « pour qui » manque au dossier : **chercher l'erreur aide surtout ceux qui savent déjà un peu** ; pour les débutants
  et les plus fragiles, être guidé d'abord vaut mieux. Force : moyenne.

**15. Allégeance des deux méta-analyses** (déjà notée par les fiches) : Frese a créé l'EMT, Kapur la productive
failure ; le seul essai indépendant cité par le dossier (Nachtigall) est nul ; les réplications nulles de la carte 13
viennent pour deux sur trois d'autres labos. Sans méta-analyse indépendante (Darabi 2018 : pas de résumé ; Chen &
Kalyuga 2019 : résumé sans résultat), le « modérée » repose sur des promoteurs.

### c3 (« on apprend des échecs des autres ») : « soutient, basse » tient, mais ses piliers changent

- Eskreis-Winkler 2019 (étude 5) : « just as much » est **une différence non significative** (réanalyse des données
  originales par Spiller, tables S8-S9 : t(199) = 0,86, p = 0,39), pas un test d'équivalence ; et Spiller l'explique par
  l'absence du biais de cohérence (on n'a pas de première réponse à soi). Ne pas la présenter comme « autant ».
- **Lin-Siegler et al. 2016** — 10.1037/edu0000092 — *Journal of Educational Psychology*, 402 lycéens, randomisé :
  « Results showed that participation in either of the struggle story conditions improved science learning
  postintervention, relative to that of students in the control condition. » Lire les échecs et les efforts de grands
  scientifiques plutôt que leurs seules découvertes : **meilleures notes**. Le meilleur appui trouvé pour c3 (récits
  d'échecs d'autrui contre récits de succès), et pour le message de l'épisode. Force (pour le livre) : moyenne.
- **Braas 2025** (carte 13) : observer des tentatives ratées variées d'un autre élève a fait **aussi bien** que rater
  soi-même. **Kim & Miner 2007** — 10.5465/amj.2007.25529755 — banques : les quasi-faillites d'autres banques locales ont
  une « survival-enhancing learning value » (organisations).
- En sens inverse : **Wong 2023** (carte 7) : ses propres erreurs corrigées > corriger celles des autres.

### Contre c4 (« plus on échoue, plus on réussit ») : de « mêlée » vers « contredit »

**16. Traag et al. 2025** — 10.7554/elife.109042.1 — *eLife* (prépublication relue, `posted-content` ; évaluation
eLife : « important », preuves « convincing »)
- Plan : 14 programmes de financement, 6 financeurs (Europe, Amérique du Nord) ; réplication de Wang 2019 et de Bol 2018.
- Résumé : « The early-career setback effect also replicates, but is not robust across funders and model
  specifications, and does not generalise to the whole population. » et « We suggest that the early-career setback
  observation is due to a selection effect of unfunded applicants being particularly more likely to reapply later if
  they have a high citation impact. »
- Joue : **le seul appui de c4 au dossier ne tient pas hors de son échantillon**, et l'explication la plus probable est
  une sélection (ceux qui reviennent après un refus étaient déjà forts) : un **biais du survivant** au sens propre. Le
  vérificateur refusera le type `posted-content` : à garder sur la page des preuves comme « prépublication relue par
  eLife ». Force : **élevée** pour affaiblir Wang 2019.

**17. Bol, de Vaan & van de Rijt 2018** — 10.1073/pnas.1719557115 — *PNAS* (discontinuité, bourse néerlandaise)
- Résumé : « …winners just above the funding threshold accumulating more than twice as much research funding (€180,000)
  during the following eight years as nonwinners just below it. » et « …the emergent funding gap is partly created by
  applicants, who, after failing to win one grant, apply for another grant less often. »
- Joue : même plan que Wang, résultat inverse pour la carrière : **un échec de peu fait perdre du terrain**, en partie
  parce qu'on renonce. Traag 2025 trouve cet effet « robust across funders ». Force : élevée.

**18. Machin, McNally & Ruiz-Valenzuela 2020** — 10.1016/j.jpubeco.2020.104224 — *Journal of Public Economics*
(discontinuité, Angleterre, examen de fin de scolarité)
- Résumé : « Three years later, students who just fail to achieve the required threshold have a lower probability of
  entering an upper-secondary high-level academic or vocational track and of starting tertiary education. » et « Those
  who fail to pass the threshold are also more likely to drop out of education by age 18… »
- Joue : **contredit c4** pour des adolescents, avec un plan quasi expérimental de même rang que Wang. Le cas le plus
  proche du public de la chaîne (examens à enjeu, comme la thanaweya). Force : élevée.

**19. Klein Teeselink, van den Assem & van Dolder 2023** — 10.1287/mnsc.2022.4372 — *Management Science* (contre Berger
& Pope 2011, 10.1287/mnsc.1110.1328)
- Résumé : « High-powered meta-analyses across the different sports and competitions do not reject the null hypothesis of
  no effect of being slightly behind on winning. » et Berger & Pope ne se retrouvent que « for NBA matches from the period
  analyzed in Berger and Pope (2011) ».
- Joue : l'exemple sportif classique de « perdre fait gagner » **ne se réplique pas**. Force : moyenne (sport, mi-temps).

**20. Gompers, Kovner, Lerner & Scharfstein** — 10.3386/w12592 (NBER 2006 ; publié 10.1016/j.jfineco.2009.11.001,
*Journal of Financial Economics* 2010, sans résumé dans les API)
- Résumé (document de travail) : « We show that entrepreneurs with a track record of success are more likely to succeed
  than first time entrepreneurs and those who have previously failed. »
- Contrepoids : **Paik 2013** — 10.1002/sej.1161 — « ventures founded by serial entrepreneurs perform better than those
  founded by novice entrepreneurs regardless of whether entrepreneurs had prior success or failure. »
- Et **Eggers & Song 2015** — 10.5465/amj.2014.0050 — *AMJ* (Chine, États-Unis) : après un échec, les fondateurs accusent
  l'environnement et changent de secteur, ce qui leur coûte ; « we find support for our theory » (phrase de résultat
  faible : la théorie est dans le résumé, les chiffres non).
- Joue : chez les entrepreneurs, **l'échec passé ne prédit pas mieux que le succès** ; c'est l'expérience, pas l'échec,
  qui aide (Paik), et l'échec pousse souvent à mal en tirer la leçon (Eggers & Song). Force : moyenne.

**21. Eskreis-Winkler, Woolley, Erensoy & Kim 2024** — 10.1037/xge0001610 — *JEP: General* (11 études, dont une sur des
professionnels de santé)
- Résumé : « Predictors overestimated the likelihood that professionals who fail a professional exam (e.g., the bar exam,
  the medical boards) pass a retest (Studies 1a, 1b, and 2a), the likelihood that patients improve their health after a
  crisis… and the probability, more generally, of learning from one's mistakes (Studies 3-5). »
- Avec **Eskreis-Winkler et al. 2026** — 10.1037/pspa0000468 — *JPSP* : « Failure is underreported relative to success
  (Studies 2-5). »
- Joue : **la croyance du livre est elle-même un biais mesuré** : on surestime la part des échecs suivis d'un succès,
  parce que les échecs sans suite ne se racontent pas. C'est l'argument du biais du survivant, avec des données.
  Indirect (croyances, pas résultats), même équipe que l'effet contesté de c1. Force : moyenne.

**22. Pour être juste, ce qui va dans le sens du livre ou le nuance** :
- **Yin, Wang, Evans & Wang 2019** — 10.1038/s41586-019-1725-y — *Nature* : ceux qui finissent par réussir et les autres
  « may initially appear similar, but can be characterized by fundamentally distinct failure dynamics » (subventions NIH,
  start-up, attaques) ; « We find broadly consistent empirical support across all three domains ». **La correction
  (10.1038/s41586-020-2325-6) ne touche que les axes de la figure 3d-f** (« the "10⁰" markers on the y axes… were
  inadvertently misplaced, and the y axis labels were omitted ») : la raison du dossier pour l'écarter ne tient pas.
  Elle dit la vraie nuance de c4 : **échouer ne mène au succès que si chaque essai réutilise le précédent** ; sinon on
  stagne.
- **Ucbasaran et al. 2013** — 10.1177/0149206312457823 — revue : « the aftermath of failure is often fraught with
  psychological, social, and financial turmoil » (contexte) ; utile pour la phrase d'orientation, pas pour la direction.

### Égypte et monde arabe (point e)

**23. Ezzeldin 2022** (au dossier) : ce que pèse l'échantillon saoudien
- 66 élèves en **deux groupes (32 et 34)**, très probablement deux classes ; « experimental design of control and
  experimental groups with pre- and post-measurements » : **aucun tirage au sort dit** ; résultat « at α = 0.05 », **sans
  taille d'effet** ; une seule autrice (affiliations OpenAlex : Prince Sattam Bin Abdulaziz University et Benha
  University, Égypte). Avec deux classes, l'unité réelle est la classe : n effectif proche de 2.
- La revue (*Cypriot Journal of Educational Sciences*, OpenAlex S2739369835) : **hors DOAJ** ; 268 articles en 2021,
  **381 en 2022**, puis 59 (2023), 37 (2024), 24 (2025) : une courbe qu'on voit souvent après une perte d'indexation (à
  vérifier, je ne l'ai pas établi). Cité 3 fois.
- Joue : risque de biais **élevé** ; il ne devrait pas suffire à `mena: true`. J'appuie la proposition du dossier de
  corriger la règle `applicability`, et la phrase « معظم الدراسات من أمريكا وأوروبا » doit être dite ou écrite.

**24. Ce qui existe d'autre, et ne teste pas l'apprentissage**
- **Taha et al. 2025** — 10.1177/23779608251398129 — *Sage Open*, 370 étudiants infirmiers de deux universités
  égyptiennes, transversal : la maîtrise de soi agit « by mitigating negative failure appraisal…, which in turn predicts
  helplessness ». Le seul échantillon égyptien trouvé sur la réaction à l'échec : **l'échec mal vécu va avec
  l'impuissance apprise**, pas avec le progrès. Force : faible (transversal).
- **Gedeon et al. 2026** — 10.3389/fpsyg.2026.1890383 — 1 963 femmes (Liban, Égypte, Oman, Palestine, Maroc),
  transversal, peur de l'échec et estime de soi : rien sur l'apprentissage.
- Sharabi & Roth 2024 (10.1111/bjep.12696) : adolescents en Israël, origine non dite : pas un échantillon arabe déclaré.
- Aucune donnée arabe sur la culture comme modérateur (Heine 2001 reste seul, Japon/Amérique du Nord).

---

## (c) Cherché et pas trouvé (notFound)

- Aucun avis Crossref sur les 12 DOI du verdict (filtre `updates:` et recherche par titre), ni sur les 46 DOI de
  contre-preuve, sauf la correction de Yin 2019 (axes d'une figure).
- Aucune réplication de l'effet « moins d'apprentissage après un échec » **hors de la tâche contestée** (Script Task et
  ses variantes) ; aucune réplication multi-laboratoires ; aucune nouvelle donnée dans la réponse d'Eskreis-Winkler &
  Fishbach 2025 (résumé).
- Aucune méta-analyse de l'EMT après Keith & Frese 2008 ; aucune méta-analyse indépendante de la productive failure
  (Darabi 2018 : pas de résumé, éditeur qui le retire ; Chen & Kalyuga 2019, 10.1007/s10212-019-00445-5 : résumé sans
  résultat ; Ashman, Kalyuga & Sweller 2019, 10.1007/s10648-019-09500-5 : pas de résumé).
- Méta-analyses du pretesting (King-Shepard et al. 2025, 10.1007/s10648-025-10075-7 ; Yan, Rea & Sana 2025,
  10.1016/j.lindif.2025.102683, dont le titre dit « robust throughout adulthood ») : **résumés introuvables** (Crossref,
  OpenAlex, Europe PMC, Semantic Scholar ; page Springer bloquée) : non retenues, à lire avant usage.
- Aucune version publiée de Traag 2025 hors de la prépublication relue eLife.
- Aucun échantillon égyptien ou arabe qui teste l'apprentissage après un échec, l'EMT ou la productive failure, à part
  Ezzeldin 2022 ; aucune donnée arabe sur la culture comme modérateur.
- Le chiffre réel des « reprises après échec » d'Eskreis-Winkler 2024 (taux de réussite au second passage du barreau,
  etc.) n'est pas dans le résumé.

---

## (d) Conclusion

**Le badge ⚖️ tient ; ❌ ne se défend pas ; la certitude basse est la bonne pour le verdict.** Mais deux affirmations
sont tenues plus nettement que leurs preuves, et le retournement que l'épisode voulait garder (« on apprend moins de ses
échecs ») est celui qui tient le moins.

1. **c1 : de « contredit, basse » à « insuffisante »** (au mieux « contredit, très basse »). Tout le poids expérimental
   repose sur une seule tâche, dont le score confond apprentissage et cohérence des réponses : une expérience
   préenregistrée sans retour reproduit l'effet (Spiller 2025) ; les deux réplications utilisent la même tâche ; la
   réplication MTurk de Gök (1b) n'est pas significative ; la réponse des auteurs conteste sans données nouvelles. Le
   terrain est mêlé (KC 2013 contre Madsen 2010). Et c1 ne teste pas ce que dit le livre (carte 0). Conséquences pour
   l'épisode, par la grille (§5) : **aucun hook sur c1, même en question** (« très basse » et « insuffisante » sont
   refusées) ; la première moitié de la carte de Gök (« اللي اتقالهم «غلط» اتعلموا أقل ») affirme un résultat disputé :
   à retirer ; l'explication par l'ego ne se dit pas (Gök 2024 étude 1 va contre). Je propose aussi d'inscrire
   `eskreis-winkler-2019-failure` dans `content/contested.json` (raison : tâche confondue, Spiller 2025 ; réponse des
   auteurs ; aucune réplication multi-laboratoires) ; je ne l'ai pas fait.

2. **c2 : de « soutient, modérée » à « soutient en partie, basse »**, sauf si elle est réécrite. Les deux méta-analyses
   viennent des créateurs des méthodes ; depuis, les essais sont mêlés (nuls : Loibl 2024, Braas 2025, Trninić 2022,
   Davenport 2024, Meritet 2021 ; positifs : Aliaga 2024, Dyre 2016, Wong 2023) ; l'ingrédient actif n'est peut-être pas
   l'erreur (Loh 2012, Braas 2025, Butowska 2024) ; et une méta-analyse de rang égal (Alfieri 2011) montre que chercher
   **seul** fait moins bien qu'être instruit (d = −0,38). Pour la grille : risque de biais (allégeance, quasi-expériences),
   incohérence, caractère indirect : deux crans, pas un. « Modérée » ne se défend que pour la forme **« essayer d'abord,
   puis recevoir l'explication », chez des élèves du secondaire et des adultes qui savent déjà un peu** (Sinha & Kapur,
   Alfieri pour la moitié « guidée »). Dans tous les cas, ajouter le « pour qui » : pas pour les débutants complets ni
   les plus jeunes (Sinha CE1-CM2, Kirschner 2006, Kessels 2003, Wong 2026). Conséquence : si c2 descend à basse,
   **aucun hook affirmatif** ne reste possible ; seulement une question.

3. **c3 : « soutient, basse » tient**, mais avec d'autres piliers : Lin-Siegler 2016 (essai randomisé, 402 lycéens :
   récits d'échecs de scientifiques → meilleures notes) et Braas 2025 plutôt que l'étude 5 d'Eskreis-Winkler (une
   différence non significative, expliquée autrement par Spiller) et KC 2013 (observationnel). Wong 2023 rappelle que ses
   propres erreurs corrigées peuvent apprendre plus que celles des autres : « autant » est le mauvais mot.

4. **c4 : de « mêlée » à « contredit, basse »** pour le paradoxe tel qu'écrit (« plus on échoue, plus on réussit »).
   L'appui de Wang 2019 ne résiste pas à 14 programmes (Traag 2025 : sélection de ceux qui reviennent) ; à plan égal,
   rater de peu fait perdre du terrain (Bol 2018 : financement, et on renonce ; Machin 2020 : examen de fin de
   scolarité) ; « perdre fait gagner » ne se réplique pas en sport (Klein Teeselink 2023) ; les entrepreneurs qui ont
   échoué ne font pas mieux que les novices (Gompers) ; et la croyance elle-même est un biais mesuré (Eskreis-Winkler
   2024 et 2026 : on surestime les rebonds, on n'entend pas les échecs sans suite). Ce qui reste pour le livre : ceux qui
   **restent** et **réutilisent** chaque essai progressent (Wang, Yin 2019). Le **biais du survivant** mérite une phrase
   sur la page des preuves, voire dans la vidéo : c'est la nuance la plus solide de c4. Si l'épisode garde c4 dans le
   champ, le hook « كل ما تفشل أكتر تنجح أكتر » ne peut être qu'une question, et le dénouement pas mieux que « un peu
   mieux » (et seulement pour « qui reste et corrige »).

5. **La nuance dite.** « L'échec n'apprend que si l'explication suit » reste la bonne nuance, mais **pas sur la preuve
   choisie** : Keith 2022 (exp. 2) et Gök 2024 (étude 3) ne départagent pas l'artefact et l'apprentissage (carte 4), et
   l'étude 3 de Gök n'est pas randomisée. Elle repose mieux sur Alfieri 2011 (seul : −0,38 ; guidé : +0,30), Mera 2022 et
   2025 (se tromper puis recevoir la réponse bat la lecture seule) et Sinha & Kapur 2021 (essayer, puis l'enseignement).
   Le « pour qui » (carte 14) mérite la page des preuves.

6. **L'étude à l'écran.** Gök & Fyfe 2024 n'est pas un bon choix : sa première moitié repose sur la tâche contestée,
   sa seconde n'est pas randomisée, et sa fiche dit `causal` pour une association. Deux options :
   - (recommandée) **Alfieri et al. 2011** : rang le plus haut, 580 + 360 comparaisons, montre les deux moitiés du ⚖️ et
     la nuance en une carte (chercher seul : moins bien ; avec retour et explications : mieux) ; à écrire avec son
     caractère indirect (découverte ≠ échec) ;
   - **Sinha & Kapur 2021** : la forme « essayer d'abord puis l'explication » (g = 0,36), avec son exception (petits
     élèves) et l'allégeance dite sur la page des preuves.
   Dans les deux cas : aucun échantillon arabe solide ; la phrase d'applicabilité est due.

7. **« À retenir ».** « Après un échec, cherche l'explication de ce qui n'a pas marché » peut garder `evidence` sur la
   base d'Alfieri 2011 (« feedback, worked examples, scaffolding, and elicited explanations do ») et des études de
   retour correctif ; Tulis & Dresel 2024 (10.1111/bjep.12686, 195 et 67 étudiants) montrent qu'insister sur le mal des
   erreurs réduit les réactions utiles et que des consignes après l'erreur augmentent persistance et contrôle
   métacognitif (pas l'apprentissage mesuré). « Cherche à échouer » n'a pas ce droit : « جرّب ».

8. **Défauts d'outils à corriger** : (i) `verify` refuse Spiller 2025 sur le type d'OpenAlex (« editorial ») alors que
   Crossref dit `journal-article` relu en cinq tours ; même défaut probable pour la réponse des auteurs ; (ii) les
   prépublications relues d'eLife (Traag 2025) sont refusées comme des prépublications ordinaires ; (iii) le dossier
   classe Gök 2024 `with-instruction` en `kind: causal` : non randomisé, c'est une association.

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1177/09567976251333666 — Spiller 2025 (c1 : la tâche confondue ; à faire accepter par `verify`)
2. 10.1177/09567976251391180 — Eskreis-Winkler & Fishbach 2025 (c1 : réponse, controverse ouverte)
3. 10.7554/elife.109042.1 — Traag et al. 2025 (c4 : l'effet de Wang ne se généralise pas ; prépublication relue)
4. 10.1037/a0021017 — Alfieri et al. 2011 (c2 et la nuance ; candidat pour l'écran)
5. 10.1073/pnas.1719557115 — Bol et al. 2018 (c4 : rater de peu fait perdre du terrain)
6. 10.1016/j.jpubeco.2020.104224 — Machin et al. 2020 (c4 : rater de peu un examen, trajectoire plus basse)
7. 10.1177/0018720812451856 — Loh et al. 2012 (c2 : l'erreur encouragée ne bat pas le contrôle)
8. 10.1037/xge0001610 — Eskreis-Winkler et al. 2024 (c4 : on surestime les rebonds après un échec)
9. 10.1287/mnsc.2022.4372 — Klein Teeselink et al. 2023 (c4 : « perdre fait gagner » ne se réplique pas)
10. 10.1037/edu0000092 — Lin-Siegler et al. 2016 (c3 : récits d'échecs → meilleures notes ; appui du livre)
11. 10.1007/s11251-025-09706-x — Braas et al. 2025 (c2 : PF non répliqué ; c3 : l'échec observé vaut l'échec vécu)
12. 10.1001/jamanetworkopen.2024.31600 — Aliaga et al. 2024 (c2 : appui randomisé récent, erreurs médiatrices)
13. 10.1038/s41586-019-1725-y — Yin et al. 2019 (c4 : la nuance « réutiliser chaque essai » ; correction lue, sans effet)
14. 10.1007/s10648-023-09739-z — Wong 2023 (c2 appui ; c3 nuance)
15. 10.5334/joc.455 — Mera et al. 2025 et 10.3758/s13423-021-02022-8 — Mera et al. 2022 (se tromper puis corriger)
16. 10.3758/s13421-024-01608-6 — Butowska-Buczyńska et al. 2024 (l'avantage tient au temps, pas à l'erreur)
17. 10.1016/j.learninstruc.2022.101688 — Trninić et al. 2022 (PF = exemple résolu, étudiants)
18. 10.1007/s11251-024-09670-y — Loibl & Leuders 2024 (PF non répliqué)
19. 10.3386/w12592 — Gompers et al. 2006 (document de travail ; publié 10.1016/j.jfineco.2009.11.001, sans résumé) et
    10.1002/sej.1161 — Paik 2013 (contrepoids)
20. 10.5465/amj.2014.0050 — Eggers & Song 2015 (après un échec, mauvaise leçon et changement de secteur)
21. 10.1037/pspa0000468 — Eskreis-Winkler et al. 2026 (les échecs sont sous-déclarés : biais du survivant)
22. 10.1016/j.copsyc.2025.102245 — Fishbach 2026 (l'échec apprend plus que l'instruction seule ; revue)
23. 10.1076/jcen.25.6.805.16474 — Kessels & de Haan 2003 et 10.3389/fpsyg.2026.1722743 — Wong et al. 2026 (quand
    l'apprentissage sans erreur vaut mieux)
24. 10.1207/s15326985ep4102_1 — Kirschner et al. 2006 (novices ; revue narrative)
25. 10.1027/1866-5888/a000333 — Davenport & Beier 2024 ; 10.3138/jvme.2019-0012 et 10.3138/jvme.2019-0055 — Meritet et
    al. 2021 ; 10.1080/07853890.2024.2408458 — Schmidt et al. 2024 ; 10.1111/medu.13208 — Dyre et al. 2016 (essais EMT)
26. 10.1111/bjep.12686 — Tulis & Dresel 2024 (« à retenir »)
27. 10.1177/23779608251398129 — Taha et al. 2025 (Égypte, transversal : échec mal vécu et impuissance apprise)
28. 10.5465/amj.2007.25529755 — Kim & Miner 2007 (c3, organisations)
29. 10.1177/0149206312457823 — Ucbasaran et al. 2013 (coûts de l'échec ; revue)
