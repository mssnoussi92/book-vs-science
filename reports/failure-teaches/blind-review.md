# Relecture aveugle des sources — « failure-teaches » (Manson, ch. 7 : on ne progresse que par l'échec ; le chercher et en apprendre)

Relu le 2026-11-23. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis de correction ou de rétractation qui pointent vers l'article), OpenAlex
`/works/doi:<doi>`, Europe PMC `search … resultType=core` (`abstractText`). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-failure/raw/` ; textes entiers :
`…/scratchpad/blind-failure/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : Wang 2019 (PMC6773762), Sinha 2021 (dépôt de l'ETH
Zurich, version publiée), Nachtigall 2020 (dépôt de la Ruhr-Universität Bochum), Ezzeldin 2022 (PDF de l'éditeur, accès
libre), Gök 2024 dans sa **version soumise** (préprint PsyArXiv bw42v : les chiffres peuvent différer de la version
publiée). Résumé seul (accès fermé ou refusé) : Eskreis-Winkler 2019, Heine 2001, KC 2013, Keith 2008, Keith 2022, Lee 2024
(PDF Wiley et dépôt de Clark refusés, 403), Madsen 2010 (pas de résumé chez Crossref ; OpenAlex seulement).

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `mena`, `population`, `findings[].text` ; les
`support.sentence`, `kind`, `design`, `n`/`k`, `effect`, `limits` et `allegiance` seulement après avoir lu chaque résumé et
choisi ma phrase. `declared` et `acknowledged` non lus. Dossier de l'écrivain (`scratchpad/dossiers/`) : **non ouvert**.

Affirmations :
- **c1** (causale) : après son propre échec (on lui dit que sa réponse est fausse), on apprend autant qu'après un succès.
- **c2** (causale) : chercher l'erreur en apprenant (formation qui encourage l'erreur, essayer un problème avant d'être
  enseigné) donne de meilleures performances ensuite qu'éviter l'erreur ou être enseigné d'abord.
- **c3** (causale) : on apprend des échecs des autres autant que de leurs succès.
- **c4** (causale) : plus on échoue, plus on a de chances de réussir ; un revers mène à de meilleurs résultats plus tard.

**Avant tout : deux choses que la vidéo doit savoir.**
1. **Le livre et c4 disent « plus on échoue… » ; aucune étude du dossier ne teste un effet qui monte avec le nombre
   d'échecs**, et la seule qui suit l'accumulation (Lee 2024) trouve une courbe en U inversé. Aucune ne teste non plus
   « on ne progresse *que* par l'échec ».
2. **Le paradigme qui porte c1 et c3 est contesté** : un commentaire publié en 2025 dans *Psychological Science* (Spiller,
   hors des 12 fiches, voir « Travaux trouvés en vérifiant ») montre que la notation de la tâche peut produire l'écart
   « on apprend moins après un échec » sans aucune différence d'apprentissage. Les auteurs ont répondu la même année. Cela
   touche Eskreis-Winkler 2019 et les études 1-2 de ses deux réplications (Keith 2022, Gök 2024).

Vérification d'identité commune aux 12 DOI : Crossref `updated-by` et `update-to` absents, aucun document Crossref ne
déclare mettre à jour l'un d'eux (`filter=updates:` : 0 résultat pour chacun), OpenAlex `is_retracted: false` pour
tous. **Aucun avis de correction ni de rétractation trouvé.** Titres, premiers auteurs et années concordent avec les `id`
des fiches.

---

## 1. 10.1177/0956797619881133 (eskreis-winkler-2019-failure)

- **Identité** : confirmée. « Not Learning From Failure—the Greatest Failure of All. » Eskreis-Winkler, L. (premier
  auteur ; Fishbach), 2019, *Psychological Science* 30(12), 1733-1744. Ni correction ni rétractation ; un commentaire
  critique et une réponse en 2025 (voir plus bas).
- **Plan (relecteur)** : **expériences** randomisées (5 études), retour « juste / faux » tiré au sort sur des questions à
  deux choix, test quelques minutes plus tard. Plafond : modérée.
- **Population** : 1 674 adultes au total ; pays non donnés par le résumé. (Gök 2024, texte du préprint : « the EW-F study
  recruited participants from Amazon Mechanical Turk ».) MENA : non.
- **Résultat principal** : après un retour d'échec, on apprend moins qu'après un retour de succès, alors que les deux
  donnent la bonne réponse ; on retient aussi moins ses propres choix. Explication avancée : la menace pour l'ego fait
  décrocher. Des échecs *des autres*, on apprend autant que de leurs succès.
- **Phrases du résumé** : « However, on a follow-up test, participants learned less from failure feedback than from
  success feedback. » — « Participants learned less from personal failure than from personal success, yet they learned
  just as much from other people's failure as from others' success. » — Conclusion : « Thus, when ego concerns are
  muted, people tune in and learn from failure. »
- **Taille d'effet** : pas dans le résumé.
- **c1 : contradicts** (dans ce paradigme ; voir Spiller 2025).
- **c2 : irrelevant** (personne ne cherche l'erreur ; l'échec est attribué).
- **c3 : supports** — « just as much » est une **absence de différence**, pas un test d'équivalence ; une partie de
  l'article, taille non donnée. **Prudence** : si, dans cette étude, les participants ne répondaient pas eux-mêmes avant de
  voir la réponse d'autrui (à vérifier dans le texte entier), l'explication de Spiller (répondre de façon cohérente avec sa
  propre première réponse) prédit **aussi** l'absence d'écart pour les autres : le contraste « soi / autrui » ne prouve
  alors pas l'ego.
- **c4 : contradicts** (indirect : l'échec fait moins bien réussir le test suivant, à quelques minutes, au laboratoire).
- **Fiche de l'écrivain** : f1 et f3 = mes phrases, même sens. f2 (« ego threat … tune out ») : c'est l'interprétation des
  auteurs (`role: conclusion`, juste) ; **Gök 2024 n'a pas retrouvé la différence de menace pour l'ego** (études 1b et 2,
  texte du préprint) : ne pas dire le mécanisme comme un fait. **Une limite est inexacte** : « Spiller 2025 … no reply
  found » — la réponse existe (Eskreis-Winkler & Fishbach 2025, *Psychological Science*, 10.1177/09567976251391180 ; ils
  soutiennent que la cohérence n'explique pas leur paradigme d'origine). La limite « samples and countries not given » peut
  devenir « MTurk (d'après Gök 2024) ».

## 2. 10.18844/cjes.v17i2.6822 (ezzeldin-2022-saudi)

- **Identité** : confirmée. « The effect of productive failure in a digital inquiry environment on developing deep
  understanding and achievement of organic chemistry among secondary school students. » Ezzeldin, S. M. Y. (seule
  autrice ; Université Prince Sattam, Wadi Al-Dawasir, et Université de Benha, Égypte), 2022, *Cypriot Journal of
  Educational Sciences* 17(2), 396-409 (éditeur : Birlesik Dunya Yenilik Arastirma ve Yayincilik Merkezi). Reçu le
  10 novembre 2021, accepté le 22 février 2022. Ni correction ni rétractation.
- **Plan (relecteur)** : **quasi-expérience** (texte entier : « the semi-experimental approach of the experimental and
  control group design with the pre- and post-application ») avec **une école par groupe** : « The two schools assigned
  for the application were randomly selected to choose the study groups » (Al-Khamaseen First High School et Al-Khamaseen
  Second Secondary School). Les écoles sont tirées, pas les élèves ; condition, école et enseignant se confondent.
  Plafond théorique : modérée ; en pratique **très basse** (voir les défauts).
- **Population (la réponse demandée)** : **66 élèves saoudiens** de dernière année du secondaire (« third-grade
  secondary », filière sciences naturelles), gouvernorat de Wadi Al-Dawasir, région de Riyad ; **32 dans le groupe « échec
  productif »** (une école), **34 témoins** (l'autre école) ; chimie organique, unité 5 (« Derivatives of hydrocarbon
  compounds »), année 2020-2021, **enseignement à distance sur Microsoft Teams**. MENA : oui (Arabie saoudite).
- **Résultat principal** : le groupe « échec productif » fait mieux au test de compréhension profonde et au test de
  connaissances.
- **Phrase du résumé** : « The results revealed that there were statistically significant differences at α = 0.05
  between the means of the scores of the experimental and control groups in the deep understanding level and the
  achievement test of organic chemistry in favour of the experimental group. »
- **Taille d'effet** (texte entier, tableaux 4 et 5) : η² = 0,78 (compréhension profonde : 24,18 contre 13,42 sur 32) et
  0,80 (connaissances : 33,23 contre 21,46 sur 41), soit un d d'environ 3,7 : **dix fois** la moyenne de la méta-analyse de
  Sinha (g = 0,36). Invraisemblable pour une intervention scolaire.
- **Défauts relevés (texte entier)** : (1) les résultats du **prétest ne sont pas donnés**, alors que le plan est dit
  « pre- and post- » : rien ne montre que les deux écoles partaient du même niveau ; (2) l'**enseignement du groupe témoin
  n'est pas décrit** : on ne sait pas si c'est « enseigné d'abord puis exercices » (la comparaison de c2) ou un cours
  ordinaire ; l'intervention mêle aussi l'échec productif et un « environnement d'enquête numérique » ; (3) **incohérences
  internes** : le texte dit significatifs les sept sous-scores de compréhension, mais « Asking questions » a t = 1,17,
  η² = 0,03 ; il dit non significatifs le rappel (t = 2,35) et la compréhension (t = 2,28), qui le sont à 64 degrés de
  liberté ; (4) une autrice, aucun préenregistrement, aucune analyse par grappes.
- **c1 : irrelevant**. **c2 : supports (très faible)**. **c3 : irrelevant**. **c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens. **`design: experiment` à corriger en quasi-expérience** (mots de
  l'autrice), une école par groupe. Limites justes dans l'esprit (« high risk of bias »), à compléter : pas de prétest
  rapporté, η² ≈ 0,8, incohérences du tableau, enseignement à distance 2020-2021. « the only sample from the Arab world » :
  vrai parmi les fiches, mais Sinha 2021 compte des comparaisons saoudiennes (n° 11). **Elle ne peut pas porter, seule,
  « ça marche aussi chez les Arabes » ; au plus « une petite étude saoudienne va dans le même sens ».**

## 3. 10.1037/xge0001632 (gok-2024-failure)

- **Identité** : confirmée. « Learning from failure: The roles of self-focused feedback, task expectations, and subsequent
  instruction. » Gök (Gok), S. (premier auteur ; Fyfe), 2024, *Journal of Experimental Psychology: General* 153(9),
  2328-2344. Ni correction ni rétractation. Préprint lu : PsyArXiv bw42v (version soumise).
- **Plan (relecteur)** : **6 expériences préenregistrées**, un seul laboratoire (Indiana University), réplication proche
  puis extensions. Plafond : modérée (ce n'est pas une réplication multi-laboratoires). **Étude 3 : le retour d'échec ou de
  succès n'est pas tiré au sort** (texte du préprint : les participants sont « post-hoc categorized » selon leur score réel
  au premier tour, 0-1 bonne réponse → message d'échec, 2-3 → succès ; score au hasard, donc presque aléatoire, mais pas
  manipulé).
- **Population** : 1 306 adultes ; texte du préprint : « All our experiments were conducted online with two groups:
  undergraduate students and MTurk workers, all of whom were participants from the US population », et les auteurs
  écrivent n'avoir « no evidence » d'une extension à d'autres cultures (ils citent Heine 2001). MENA : non.
- **Résultat principal** : l'écart « échec < succès » se reproduit (études 1a, 1b, 1c, 2), que le message dise « votre
  réponse » ou « la réponse », que la tâche soit annoncée facile ou difficile ; mais avec une tâche à règle suivie d'une
  brève explication, l'échec ne nuit plus, et fait parfois mieux sur une matière nouvelle.
- **Phrases du résumé** : « The detriments of failure feedback were replicated in Studies 1a, 1b, and 1c… » — « When it was
  a rule-based task and brief instructions on the rule were provided after feedback, there was no evidence of a
  detrimental effect of failure, and failure feedback, in some conditions, resulted in even better learning than success
  feedback for learning new material. » — « We conclude that the tune-out reactions to failure during feedback disappear
  and may even be reversed when subsequent learning opportunities are provided. »
- **Taille d'effet** (texte du préprint) : étude 1a, d = 0,97 (69 % contre 93 %) ; **étude 1b (MTurk), la comparaison
  exacte de l'original n'est pas significative** : d = 0,19, p = 0,22 ; effet principal de la valence η² = 0,01 ; étude 2,
  η² = 0,05. Étude 3a, règle nouvelle : échec 78 %, succès 67 %, η² = 0,03 ; **étude 3b : seulement dans la condition
  « annoncée difficile »** (71 % contre 55 %, d = 0,5), effet principal non significatif (p = 0,08). La menace pour l'ego ne
  diffère pas entre échec et succès (études 1b et 2).
- **c1 : nuances** — contredite dans les études 1-2 (même tâche que l'original, donc même critique de Spiller) ; pas
  d'écart quand une explication suit (étude 3, valence non tirée au sort).
- **c2 : nuances (indirect)** — l'étude 3 ressemble à « essayer, échouer, puis être enseigné » ; le gain sur la règle
  suivante est petit et pas constant.
- **c3 : irrelevant**.
- **c4 : nuances** — un échec initial puis une explication font un peu mieux sur la tâche suivante (petit, une condition sur
  deux en 3b) ; rien sur le long terme.
- **Fiche de l'écrivain** : les trois `support.sentence` sont mes phrases, même sens. **f1 surestime la constance** :
  « Failure feedback again led to less learning … whether the message said « your answer » or « the answer » » est le
  résumé des auteurs, mais la comparaison exacte de l'original échoue en 1b (d = 0,19, n.s.) et l'effet global y est très
  petit (η² = 0,01) ; écrire « répliqué dans la plupart des études, petit dans une ». f2 « in some conditions it taught
  more » : juste, ajouter que la valence n'y est pas tirée au sort. `kind: causal` juste pour 1-2, à nuancer pour 3. Limites
  justes ; ajouter : participants des États-Unis seulement (texte), menace pour l'ego non retrouvée.

## 4. 10.1037/0022-3514.81.4.599 (heine-2001-culture)

- **Identité** : confirmée. « Divergent consequences of success and failure in Japan and North America: An investigation
  of self-improving motivations and malleable selves. » Heine, S. J. (premier auteur ; Kitayama, Lehman, Takata, Ide,
  Leung, Matsumoto), 2001, *Journal of Personality and Social Psychology* 81(4), 599-615. Ni correction ni rétractation.
- **Plan (relecteur)** : **expériences** (succès / échec sur une tâche) **croisées avec la culture**, qui n'est pas
  assignée ; 4 études. Plafond : modérée pour l'effet de l'échec dans chaque culture ; la différence entre cultures est une
  association.
- **Population** : participants japonais et nord-américains ; tailles non données par le résumé. MENA : non.
- **Résultat principal** : après un échec, les Nord-Américains persévèrent moins sur la tâche suivante, les Japonais
  plus ; la différence vient en partie de croyances différentes sur l'utilité de l'effort.
- **Phrases du résumé** : « Replicating past research, North Americans who failed on a task persisted less on a follow-up
  task than those who succeeded. » — « In contrast, Japanese who failed persisted more than those who succeeded. » —
  « Study 3 unpackaged the cultural differences by demonstrating that they are due, at least in part, to divergent lay
  theories regarding the utility of effort. »
- **Taille d'effet** : pas dans le résumé.
- **c1 : nuances (indirect)** — mesure la persévérance, pas l'apprentissage ; montre que la réaction à l'échec **dépend de
  la culture**.
- **c2 : irrelevant**. **c3 : irrelevant**.
- **c4 : nuances (indirect)** — l'échec pousse à l'effort chez les uns, au retrait chez les autres.
- **Fiche de l'écrivain** : les trois `support.sentence` sont mes phrases, même sens. f1 et f2 disent « who were told they
  failed » : le résumé dit « who failed on a task » ; si la fiche affirme un faux retour, il faut l'avoir lu dans le texte
  (non lu par moi). Limites justes. C'est la source de la requête « culture OR moderator » : elle interdit de supposer que
  la réaction américaine (décrocher) vaut pour le public arabe, dans un sens ou dans l'autre.

## 5. 10.1287/mnsc.2013.1720 (kc-2013-surgery)

- **Identité** : confirmée. « Learning from My Success and from Others' Failure: Evidence from Minimally Invasive Cardiac
  Surgery. » KC, D. (premier auteur ; Staats, Gino), 2013, *Management Science* 59(11), 2435-2449. Ni correction ni
  rétractation (Crossref, OpenAlex).
- **Plan (relecteur)** : **panel observationnel** (dossiers de 10 ans) ; personne n'est assigné à un échec. Plafond pour une
  affirmation causale : basse.
- **Population** : 71 chirurgiens cardio-thoraciques, plus de 6 500 interventions avec une technologie nouvelle ; pays et
  hôpitaux non donnés par le résumé. MENA : non.
- **Résultat principal** : chacun apprend plus de ses propres succès que de ses propres échecs, mais plus des échecs de ses
  collègues que de leurs succès ; ses succès passés et les échecs des autres aident à surmonter l'incapacité à apprendre de
  ses propres échecs.
- **Phrases du résumé** : « We find that individuals learn more from their own successes than from their own failures,
  but they learn more from the failures of others than from others' successes. » — « We also find that individuals' prior
  successes and others' failures can help individuals overcome their inability to learn from their own failures. »
- **Taille d'effet** : pas dans le résumé ; définition exacte de l'« échec » non lue (texte entier refusé, DASH 429).
- **c1 : contradicts** (observationnel ; chirurgiens).
- **c2 : irrelevant**.
- **c3 : supports** — **oui, ce sont des « échecs des autres » au sens de l'affirmation** : des collègues qui font la même
  opération, et l'apprentissage est individuel (pas une organisation). L'étude trouve même **plus** que « autant ».
- **c4 : contradicts** — ses propres échecs aident moins que ses succès (« inability to learn from their own failures »).
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `kind: association` juste. Limites justes, dont la mention
  sur Francesca Gino (d'autres articles rétractés depuis 2023 ; celui-ci repose sur des données hospitalières et n'a aucun
  avis : vérifié aussi). `design: longitudinal` : je l'écris « panel observationnel » pour qu'on ne le lise pas comme une
  cohorte suivie après une intervention.

## 6. 10.1037/0021-9010.93.1.59 (keith-2008-error-management)

- **Identité** : confirmée. « Effectiveness of error management training: A meta-analysis. » Keith, N. (premier auteur ;
  Frese), 2008, *Journal of Applied Psychology* 93(1), 59-69. Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse** de 24 études d'entraînement (plans des études primaires non donnés par le
  résumé). Plafond : haute.
- **Population** : 24 études, N = 2 183 ; tâches et pays non donnés par le résumé. MENA : non.
- **Résultat principal** : l'entraînement qui encourage l'erreur et l'exploration fait mieux en moyenne (d = 0,44) que
  l'entraînement qui évite l'erreur ou l'exploration sans erreur encouragée ; plus pour le transfert après l'entraînement
  (d = 0,56) et pour des tâches différentes de l'entraînement (d = 0,80) ; exploration active et encouragement à l'erreur
  sont tous deux efficaces.
- **Phrases du résumé** : « Although the mean effect of EMT across all 24 identified studies (N = 2,183) was positive and
  significant (Cohen's d = 0.44), there were several moderators. » — « Moderator analyses showed effect sizes to be larger
  (a) for posttraining transfer (d = 0.56) than for within-training performance and (b) for performance tasks that were
  structurally distinct (adaptive transfer; d = 0.80) than for tasks that were similar to training (analogical
  transfer). » — « Results suggest that EMT may be better suited than error-avoidant training methods for promotion of
  transfer to novel tasks. »
- **Taille d'effet** : d = 0,44 (moyen-petit) ; 0,56 ; 0,80 ; pas d'intervalle ni de correction du biais de publication
  dans le résumé ; « considerable variation in effect sizes ».
- **c1 : irrelevant**. **c2 : supports** (surtout pour le transfert ; moins pendant l'entraînement). **c3 : irrelevant**.
  **c4 : irrelevant** (erreurs faites exprès pendant une formation guidée, pas des revers).
- **Fiche de l'écrivain** : les quatre `support.sentence` sont mes phrases, même sens ; `effect` justes ;
  `allegiance` juste et importante (les deux auteurs ont développé et promeuvent la méthode). f1 « did better on average
  than the other trainings » : préciser que le comparateur est *soit* l'entraînement qui évite l'erreur, *soit*
  l'exploration sans encouragement à l'erreur. La limite « no later meta-analysis … found » est celle de l'écrivain : je ne
  l'ai pas vérifiée.

## 7. 10.1037/xge0001170 (keith-2022-tune-out)

- **Identité** : confirmée. « Failure to learn from failure is mitigated by loss-framing and corrective feedback: A
  replication and test of the boundary conditions of the tune-out effect. » Keith, N. (premier auteur ; Horvath, Klamar,
  Frese), 2022, *Journal of Experimental Psychology: General* 151(8), e19-e25. Ni correction ni rétractation.
- **Plan (relecteur)** : **2 expériences préenregistrées**, un laboratoire (Darmstadt), réplication proche et deux
  conditions limites. Plafond : modérée. Pas indépendant de Keith 2008 (mêmes auteurs, même école de pensée « apprendre de
  l'erreur ») — ce qui rend la réplication réussie d'autant plus crédible.
- **Population** : N = 520 ; pays non donnés par le résumé (auteurs en Allemagne). MENA : non.
- **Résultat principal** : l'effet « décrocher après l'échec » se reproduit entièrement en réplication proche, mais
  disparaît quand le même enjeu d'argent est présenté comme une perte, et quand une correction s'ajoute après l'échec.
- **Phrases du résumé** : « The tune-out effect fully replicated in those experimental conditions that represented close
  replications of the original study, underscoring the reliability of the original effect. » — « However, the effect
  disappeared when the same monetary incentives for participation were expressed in terms of a loss … » — « The effect
  also disappeared when additional corrective feedback was given (Experiment 2). » — Conclusion : « …suggest that in many
  applied settings, tuning out upon failure might not be an option. »
- **Taille d'effet** : pas dans le résumé.
- **c1 : nuances** — contredite en réplication proche, **soutenue (pas d'écart)** avec un cadrage en perte ou une
  correction : la meilleure source du dossier pour la nuance « l'échec n'apprend que s'il est expliqué ».
- **c2 : irrelevant**. **c3 : irrelevant**. **c4 : irrelevant**.
- **Fiche de l'écrivain** : les trois `support.sentence` sont mes phrases, même sens. Limites justes (la critique de Spiller
  vaut pour les conditions de réplication proche ; chaque condition limite testée une seule fois).

## 8. 10.1002/smj.3609 (lee-2024-surgeons)

- **Identité** : confirmée. « Giving up learning from failures? An examination of learning from one's own failures in the
  context of heart surgeons. » Lee, S. (premier auteur ; Park), 2024, *Strategic Management Journal* 45(10), 2063-2094.
  Ni correction ni rétractation. Résumé lu chez Crossref et OpenAlex.
- **Plan (relecteur)** : **panel observationnel** (pontages coronariens, 2003-2018). Plafond pour une affirmation
  causale : basse.
- **Population** : 307 chirurgiens cardio-thoraciques de Californie, 133 hôpitaux. MENA : non.
- **Résultat principal** : relation en U inversé entre échecs accumulés et performance : elle monte, plafonne, **puis
  baisse** ; le point de bascule vient plus tard chez les chirurgiens qui semblent mieux capables d'apprendre (formation
  d'élite, certification, spécialisation).
- **Phrases du résumé** : « …we find compelling evidence that individuals reach a threshold at which they discontinue
  learning from their own failures. » — Résumé pour les managers : « as a function of failures, an individual's
  performance will initially increase, then taper off, and finally decrease. Analyzing data on 307 cardiothoracic
  surgeons operating coronary artery bypass graft surgeries, we find such an inverted‐U‐shaped pattern. » — « Our findings
  imply that repeated failures can have both beneficial and harmful impacts on individuals' learning processes… »
- **Taille d'effet** : pas dans le résumé.
- **c1 : irrelevant** (pas de comparaison avec le succès dans le résumé).
- **c2 : irrelevant**. **c3 : irrelevant** (ses propres échecs seulement).
- **c4 : nuances → contradicts pour « plus on échoue »** — vrai jusqu'à un seuil, faux au-delà, où la performance baisse.
- **Fiche de l'écrivain** : f1, f2, f3 = mes phrases (f3 = conclusion), même sens. **f1 adoucit** : « they stopped learning
  from them » ; le résumé pour les managers dit que la performance **finit par baisser** (« finally decrease ») ; écrire
  « au-delà d'un seuil, plus d'échecs va avec moins bien réussir ». Limites justes ; « abstract read from Crossref only » :
  aussi chez OpenAlex.

## 9. 10.5465/amj.2010.51467631 (madsen-2010-launch)

- **Identité** : confirmée. « Failing to Learn? The Effects of Failure and Success on Organizational Learning in the Global
  Orbital Launch Vehicle Industry. » Madsen, P. M. (premier auteur ; Desai), 2010, *Academy of Management Journal* 53(3),
  451-476. Ni correction ni rétractation. Résumé chez OpenAlex seulement.
- **Plan (relecteur)** : **panel observationnel d'organisations** (historiques de lancements). Plafond pour une
  affirmation causale : basse ; indirect pour des personnes.
- **Population** : organisations qui lancent des lanceurs orbitaux, dans le monde ; nombre non donné par le résumé.
  MENA : non (pas de pays dans le résumé).
- **Résultat principal** : les organisations apprennent plus efficacement de leurs échecs que de leurs succès ; ce
  qu'apprend un échec se perd plus lentement ; l'expérience accumulée et la gravité de l'échec modulent l'apprentissage.
- **Phrase du résumé** : « We find that organizations learn more effectively from failures than successes, that knowledge
  from failure depreciates more slowly than knowledge from success, and that prior stocks of experience and the magnitude
  of failure influence how effectively organizations can learn from various forms of experience. »
- **Taille d'effet** : pas dans le résumé.
- **c1 : supports (indirect)** — des organisations, pas des personnes ; un échec de lancement donne lieu à une enquête
  formelle.
- **c2 : irrelevant**.
- **c3 : irrelevant** — **ce n'est pas « les échecs des autres » au sens de l'affirmation** : le résumé ne parle que de
  l'expérience propre de chaque organisation ; s'il y a une variable « échecs des autres organisations », elle n'est pas
  dans le résumé (texte non lu).
- **c4 : supports (indirect)** — pour des organisations, observationnel.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; limites justes. Aucune fiche ne l'emploie pour c3, j'espère :
  elle ne le doit pas.

## 10. 10.1007/s11251-020-09525-2 (nachtigall-2020-non-stem)

- **Identité** : confirmée. « When failure fails to be productive: probing the effectiveness of productive failure for
  learning beyond STEM domains. » Nachtigall, V. (premier auteur ; Serova, Rummel), 2020, *Instructional Science* 48(6),
  651-697. Ni correction ni rétractation.
- **Plan (relecteur)** : **2 quasi-expériences** (texte entier, étude 1 : onze classes entières tirées au sort, six en
  « échec productif », n = 121, cinq en enseignement d'abord, n = 91 ; l'analyse est faite par élève). Plafond : modérée au
  plus, à descendre pour l'assignation par classes.
- **Population** (texte entier) : élèves de 10e année (seconde) de huit écoles de Rhénanie-du-Nord-Westphalie,
  **Allemagne**, dans un laboratoire extrascolaire de sciences sociales d'une université ; 212 et 152 élèves ; méthodes de
  recherche en sciences sociales. MENA : non.
- **Résultat principal** : l'échec productif ne fait pas mieux que l'enseignement d'abord ; **dans l'étude 1, il fait
  moins bien**.
- **Phrases du résumé** : « In contrast to several studies demonstrating beneficial effects of PF on learning mathematics
  and science, in the present two studies, PF students did not outperform DI students on learning social science research
  methods. » — « Thus, the findings did not replicate the PF effect on learning in a non-STEM domain. »
- **Taille d'effet** (texte entier) : étude 1, apprentissage total **en faveur de l'enseignement d'abord**, ηp² = 0,12 ;
  items d'application et de transfert, ηp² = 0,13 (« PF students achieved a significantly lower score than DI
  students ») ; étude 2 : pas de différence significative.
- **c1 : irrelevant**. **c2 : contradicts** (hors des sciences et des mathématiques). **c3 : irrelevant**. **c4 :
  irrelevant**.
- **Fiche de l'écrivain** : support = la conclusion du résumé, même sens. **f1 et une limite sous-estiment le résultat** :
  « did not learn … better » et « a null result in 2 studies does not show the method harms » — dans l'étude 1, la méthode
  **fait moins bien** (effet moyen). **`design: experiment` → quasi-expérience** (classes entières ; l'écrivain le dit déjà
  dans ses limites). « country not given in the abstract » : Allemagne (texte entier).

## 11. 10.3102/00346543211019105 (sinha-2021-productive-failure)

- **Identité** : confirmée. « When Problem Solving Followed by Instruction Works: Evidence for Productive Failure. » Sinha,
  T. (premier auteur ; Kapur), 2021, *Review of Educational Research* 91(5), 761-798. Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse** (modèle à trois niveaux), 53 études, 166 comparaisons ; texte entier : **81
  comparaisons expérimentales et 85 quasi-expérimentales**. Plafond : haute ; à descendre (moitié de quasi-expériences,
  allégeance).
- **Population** (texte entier, tableau 1) : élèves et étudiants ; Amérique du Nord 43,4 % des comparaisons, Asie 27,7 %
  (**dont l'Arabie saoudite**, avec Singapour, Taïwan, l'Inde, Hong Kong, le Japon), Europe 25,9 %, Australie 3 % ; surtout
  des mathématiques, de la 6e à la 10e année et à l'université. MENA : **en partie** (des comparaisons saoudiennes, sans
  estimation propre).
- **Résultat principal** : essayer un problème avant l'enseignement fait mieux qu'être enseigné d'abord, effet modéré
  (g = 0,36), plus fort quand le dispositif suit les principes de l'échec productif ; tendance inverse chez les jeunes
  élèves (2e à 5e année) et pour les compétences générales.
- **Phrases du résumé** : « Our results showed a significant, moderate effect in favor of PS-I (Hedge's g 0.36 [95%
  confidence interval 0.20; 0.51]). » — « Contrasting trends were, however, observed for younger age learners (second to
  fifth graders) and for the learning of domain-general skills, for which effect sizes favored I-PS. »
- **Taille d'effet** : g = 0,36 [0,20 ; 0,51] pour les connaissances conceptuelles et le transfert. Texte entier : **pour les
  connaissances procédurales, g = −0,03 [−0,20 ; 0,15], aucun gain** ; comparaisons expérimentales g = 0,25, quasi
  expérimentales 0,46 (différence non significative) ; Asie 0,64, Europe 0,19, Amérique du Nord 0,24 ; hétérogénéité
  I² = 42 %. **Le « g = 0,87 » du résumé n'est pas une correction du biais de publication au sens ordinaire** : le test
  d'Egger n'est pas significatif et aucune étude n'est imputée ; 0,87 est une estimation par la courbe des p (« p-curve »),
  calculée sur les seuls résultats significatifs. Ne jamais le citer. Les intervalles des tableaux 4 et 5 sont parfois
  incohérents avec leur estimation (ex. Europe 0,19 [−0,59 ; 0,15]) : ne pas les recopier.
- **c1 : irrelevant**. **c2 : supports sous conditions** (conceptuel et transfert, pas procédural ; pas chez les jeunes
  élèves ; pas pour les compétences générales). **c3 : irrelevant**. **c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `effect` juste ; `allegiance` juste (Kapur a créé la
  méthode). Limite sur 0,87 **juste** (bien vu de ne pas l'employer) ; préciser pourquoi (courbe des p, Egger non
  significatif). Ajouter : g ≈ 0 pour le procédural ; moitié de quasi-expériences ; des comparaisons saoudiennes (pays
  donnés dans le texte entier, pas « not given »).

## 12. 10.1038/s41467-019-12189-3 (wang-2019-setback)

- **Identité** : confirmée. « Early-career setback and future career impact. » Wang, Y. (premier auteur ; Jones, Wang, D.),
  2019, *Nature Communications* 10, 4331. Ni correction ni rétractation. **Une réplication publiée en 2025 (Traag et al.,
  eLife, voir plus bas) contredit la lecture causale.**
- **Plan (relecteur)** : **quasi-expérience** (discontinuité de régression floue autour du seuil de financement, plus
  appariement exact) : causale **pour le départ** (tout l'échantillon) ; **pour la performance, l'estimation est faite
  « conditional on remaining active in the NIH system »** (texte entier), c'est-à-dire après une sélection que le revers
  lui-même provoque : la discontinuité ne protège plus de la sélection, et les auteurs le traitent par une procédure de
  borne (retirer artificiellement les gagnants les moins cités), pas par le plan. Plafond : modérée ; à descendre pour la
  performance.
- **Population** (texte entier) : jeunes chercheurs (première demande aux NIH dans les trois ans), demandes R01 de 1990 à
  2005 ; **561 gagnants de justesse, 623 perdants de justesse** ; États-Unis, biomédecine. MENA : non.
- **Résultat principal** : un revers de justesse fait partir plus de chercheurs, mais ceux qui restent publient ensuite des
  articles plus cités que les gagnants de justesse ; les auteurs jugent que le tri ne suffit pas à l'expliquer.
- **Phrases du résumé** : « On the one hand, it significantly increases attrition, predicting more than a 10% chance of
  disappearing permanently from the NIH system. » — « Yet, despite an early setback, individuals with near misses
  systematically outperform those with narrow wins in the longer run. » — « Moreover, this performance advantage seems to
  go beyond a screening mechanism, suggesting early-career setback appears to cause a performance improvement among those
  who persevere. »
- **Taille d'effet** (texte entier) : départ, **+12,6 points** de probabilité de disparaître des NIH en dix ans (RD) ;
  articles « hits » (5 % les plus cités) dans les cinq ans, 16,1 % contre 13,3 % (rapport des cotes 1,25) ; RD ±5 points,
  +6,1 % de probabilité d'un hit en dix ans (p < 0,05), nombre de hits p = 0,098 ; après appariement, citations moyennes
  30,8 contre 27,7, **d = 0,05** (très petit) ; après la procédure de borne, hits par personne non significatifs
  (« suggestive »). Les auteurs écrivent eux-mêmes : « our results do not imply that one should strategically put
  roadblocks in the way of junior scientists, as the precondition of becoming stronger is to not be killed in the first
  place ».
- **c1 : irrelevant**. **c2 : irrelevant**. **c3 : irrelevant**.
- **c4 : nuances** — **un seul** revers, **de justesse**, chez **ceux qui restent** ; le même revers fait partir environ
  un sur huit de plus. La lecture causale de l'avantage est **contestée** : Traag et al. 2025 retrouvent l'effet, mais pas
  de façon robuste selon les financeurs et les modèles, ni hors de la zone du seuil, et l'attribuent à une sélection (les
  perdants très cités redemandent plus souvent).
- **Fiche de l'écrivain** : f1, f2, f3 = mes phrases, même sens ; f3 garde les verbes prudents des auteurs (« seems »,
  « appears »), bien. **`design: longitudinal` → quasi-expérience (RD floue)** ; `kind: causal` juste pour f1, **trop fort
  pour f2 et f3** (la performance est mesurée après sélection) : écrire « causal pour le départ, disputé pour la
  performance ». Limites justes (« the gain is measured among those who stayed ») ; **ajouter Traag et al. 2025** et
  d = 0,05 sur les citations. « more than a 10% » : 12,6 % dans le texte.

---

## Travaux trouvés en vérifiant (hors des 12 fiches, signalés à l'écrivain et à l'agent contre-preuve)

- **Spiller, S. A. (2025)**, « Commentary on Eskreis-Winkler and Fishbach (2019): A Tendency to Answer Consistently Can
  Generate Apparent Failures to Learn From Failure », *Psychological Science*, 10.1177/09567976251333666. Résumé :
  « The Script Task's scoring guidelines mark consistent answers as correct following success but incorrect following
  failure. As a result, differences in performance between conditions may result from equivalent learning combined with
  consistent responding when people do not learn. » ; une expérience (MTurk, États-Unis) reproduit l'effet par une
  manipulation rétroactive **sans aucun retour**. Conclusion : la tâche « is not diagnostic regarding whether people learn
  less from failure unless consistency is ruled out ».
- **Eskreis-Winkler, L. & Fishbach, A. (2025)**, réponse, *Psychological Science*, 10.1177/09567976251391180 : la
  cohérence explique l'échec à apprendre « in some paradigms », mais « does not explain the results of the original
  paradigm ». Débat ouvert ; la fiche d'Eskreis-Winkler doit le dire ainsi (critique **et** réponse).
- **Traag, V. et al. (2025)**, « The Matthew effect and early-career setbacks in research funding—a replication study »,
  *eLife* (prépublication évaluée), 10.7554/eLife.109042. Quatorze programmes de six financeurs d'Europe et d'Amérique du
  Nord. Résumé : « The early-career setback effect also replicates, but is not robust across funders and model
  specifications, and does not generalise to the whole population. We suggest that the early-career setback observation
  is due to a selection effect of unfunded applicants being particularly more likely to reapply later if they have a high
  citation impact. » Plan : observationnel / discontinuité, prépublication → plafond bas, mais c'est la seule réplication
  indépendante de Wang 2019.
- Pour mémoire, non indépendants : Maity et al. 2025 (*Scientific Reports*, 10.1038/s41598-025-17271-z ; même groupe que
  Wang : des « presque gagnants » en athlétisme et au tennis dépassent parfois les gagnants) ; Eskreis-Winkler & Fishbach
  2022 (*Perspectives on Psychological Science*, 10.1177/17456916211059817 ; revue des mêmes auteurs : apprendre de l'échec
  est difficile).

## Tableau final

| DOI | c1 propre échec = succès | c2 chercher l'erreur > l'éviter | c3 échecs des autres = succès des autres | c4 plus d'échecs → plus de réussite |
|---|---|---|---|---|
| 10.1177/0956797619881133 (Eskreis-Winkler 2019) | contradicts (tâche contestée) | irrelevant | supports (faible, absence de différence) | contradicts (indirect, minutes) |
| 10.18844/cjes.v17i2.6822 (Ezzeldin 2022) | irrelevant | supports (très faible) | irrelevant | irrelevant |
| 10.1037/xge0001632 (Gök 2024) | nuances (contredit sans explication ; pas d'écart avec) | nuances (indirect) | irrelevant | nuances (petit, court terme) |
| 10.1037/0022-3514.81.4.599 (Heine 2001) | nuances (persévérance ; selon la culture) | irrelevant | irrelevant | nuances (selon la culture) |
| 10.1287/mnsc.2013.1720 (KC 2013) | contradicts (observationnel) | irrelevant | supports (plus qu'autant ; observationnel) | contradicts |
| 10.1037/0021-9010.93.1.59 (Keith 2008) | irrelevant | supports (transfert) | irrelevant | irrelevant |
| 10.1037/xge0001170 (Keith 2022) | nuances (contredit en réplication ; pas d'écart avec correction ou perte) | irrelevant | irrelevant | irrelevant |
| 10.1002/smj.3609 (Lee 2024) | irrelevant | irrelevant | irrelevant | nuances (U inversé : contredit au-delà du seuil) |
| 10.5465/amj.2010.51467631 (Madsen 2010) | supports (organisations) | irrelevant | irrelevant | supports (organisations) |
| 10.1007/s11251-020-09525-2 (Nachtigall 2020) | irrelevant | contradicts (étude 1 : moins bien) | irrelevant | irrelevant |
| 10.3102/00346543211019105 (Sinha 2021) | irrelevant | supports sous conditions | irrelevant | irrelevant |
| 10.1038/s41467-019-12189-3 (Wang 2019) | irrelevant | irrelevant | irrelevant | nuances (un revers de justesse, survivants ; causalité disputée) |

## Lecture d'ensemble (direction et plafond de certitude par affirmation, `docs/verdict.md` §3)

**c1 — contredite telle quelle, l'écart disparaît quand l'échec est expliqué ; mêlée ; certitude basse.** Les meilleures
preuves sont des expériences préenregistrées de deux équipes indépendantes (Keith 2022, Gök 2024) qui reproduisent
l'écart d'Eskreis-Winkler 2019 : on apprend moins d'un simple « faux » que d'un « juste ». Une preuve de ce rang contredit
c1, donc **la direction « soutient » est interdite** pour c1 dans sa forme générale. Mais (1) l'écart disparaît avec une
correction, un cadrage en perte (Keith 2022) ou une explication qui suit (Gök 2024, étude 3, valence non tirée au sort) ;
(2) toute la famille de preuves repose sur une seule tâche dont la notation peut produire l'écart sans différence
d'apprentissage (Spiller 2025, réponse des auteurs la même année) ; (3) Gök ne retrouve ni la menace pour l'ego ni, en
1b, l'écart lui-même. Plafond modéré (expériences), moins un pour la mesure contestée, moins un pour le caractère indirect
(symboles arbitraires, quelques minutes, États-Unis seulement) : **basse**. KC 2013 (chirurgiens, observationnel) va dans le
sens de l'écart, Madsen 2010 (organisations) en sens inverse. Heine 2001 montre que la réaction à l'échec change avec la
culture : rien ne dit ce qu'il en est dans le monde arabe. Ce que le dossier permet de dire honnêtement : « un échec sec,
sans explication, apprend moins qu'un succès ; un échec suivi d'une correction apprend autant » (certitude basse).

**c2 — soutenue en partie, sous conditions ; certitude modérée pour la forme étroite, basse pour la forme large.** Deux
méta-analyses vont dans le même sens : l'entraînement qui encourage l'erreur (Keith 2008, d = 0,44, surtout pour le
transfert) et essayer avant d'être enseigné (Sinha 2021, g = 0,36). Plafond haut, moins un pour le risque de biais (les
deux méta-analyses sont signées par les créateurs des méthodes ; la moitié des comparaisons de Sinha sont
quasi-expérimentales ; l'expérimental seul donne g = 0,25) : **modérée**, pour la forme étroite seulement :
**connaissances conceptuelles et transfert, élèves à partir du collège et adultes, domaines structurés comme les
mathématiques et les sciences**. Les limites sont dans les mêmes sources : rien pour le procédural (g ≈ 0), l'inverse chez
les jeunes élèves et pour les compétences générales, et Nachtigall 2020 trouve **moins bien** en sciences sociales.
Ezzeldin 2022 (seul échantillon arabe) ne pèse rien : quasi-expérience à une école par bras, sans prétest rapporté, effet
d'environ d = 3,7, tableau incohérent. **Indirection pour le livre** : ce qu'on teste, ce sont des erreurs prévues,
encadrées et toujours suivies d'un enseignement, pas « chercher l'échec » dans la vie ; la vidéo doit le dire.

**c3 — soutenue, faiblement ; certitude basse.** Eskreis-Winkler 2019 (expérience) trouve « just as much » : une absence
de différence dans une partie de l'article, sans taille, sans test d'équivalence, et que l'explication de Spiller pourrait
aussi produire. KC 2013 (observationnel, chirurgiens) trouve qu'on apprend **plus** des échecs des collègues que de leurs
succès. Deux plans différents qui vont dans le même sens : direction « soutient » ; plafond modéré, moins l'imprécision et
le caractère indirect : **basse**. Madsen 2010 et Lee 2024 ne portent pas sur les échecs des autres.

**c4 — mêlée ; contredite pour « plus on échoue », soutenue en partie pour « un revers peut précéder de meilleurs
résultats » ; certitude basse (très basse pour la lecture causale).** Aucune source ne montre un effet qui croît avec le
nombre d'échecs ; Lee 2024 trouve le contraire au-delà d'un seuil (U inversé), KC 2013 que ses propres échecs aident moins
que ses succès, Eskreis-Winkler 2019 qu'un échec fait moins bien au test suivant. Wang 2019, le meilleur plan (quasi
expérience), montre deux choses : **un revers de justesse fait partir environ un chercheur sur huit de plus**, et ceux qui
restent font ensuite un peu mieux (hits 16,1 % contre 13,3 % ; citations d = 0,05). La seconde est mesurée après une
sélection que le revers provoque, et la seule réplication indépendante (Traag et al. 2025) la juge non robuste et
l'attribue à la sélection. Madsen 2010 (organisations) va dans le sens de c4. Plafond modéré, moins le risque de biais
(sélection des survivants), moins l'incohérence (réplication) : **basse**, et le verbe causal (« بيخلّي ») est à refuser
sur « un revers rend meilleur ». Nuance obligatoire si l'on cite Wang : **le revers fait aussi abandonner**.

**Ce qui en découle pour le badge** (indication, la décision reste à l'écrivain et au propriétaire) : la certitude du
verdict ne dépasse pas la plus basse des affirmations du champ, soit **basse** : ⚖️ ou ❓, jamais ✅ ni ❌. Un hook affirmatif
ne peut s'appuyer que sur la forme étroite de c2 (modérée) ; tout autre hook doit être une question (c1, c3, c4 sont
basses, pas « insuffisantes »). « Ce qui ne tue pas rend plus fort » ne peut pas être dit comme un résultat.

**Égypte / MENA.** Une seule fiche a `mena: true`, à juste titre (Ezzeldin, 66 élèves saoudiens), mais elle est
inutilisable comme preuve. Sinha 2021 compte des comparaisons saoudiennes dans son groupe « Asie » (texte entier), sans
estimation propre. Aucun échantillon égyptien. Heine 2001 et Gök 2024 (qui le cite) rappellent que la réaction à l'échec
dépend de la culture : « معظم الدراسات من أمريكا وأوروبا » doit être dit ou écrit.

**Indépendance des preuves.** Eskreis-Winkler 2019, Keith 2022 et Gök 2024 = **la même tâche** (Script Task) : la
critique de Spiller vaut pour les trois (sauf l'étude 3 de Gök, autre tâche). Keith 2008 et Keith 2022 = Keith et Frese.
Wang 2019 et Maity 2025 = le même groupe ; Traag 2025 est indépendant. Sinha 2021 = le créateur de la méthode (Kapur).
KC 2013 et Lee 2024 = deux jeux de données différents de chirurgiens cardiaques américains.

## Corrections demandées aux fiches

1. **eskreis-winkler-2019-failure** : la limite « no reply found » est inexacte : réponse d'Eskreis-Winkler & Fishbach
   2025 (10.1177/09567976251391180) ; écrire « critique et réponse, débat ouvert ». Le mécanisme de l'ego (f2) n'a pas été
   retrouvé par Gök 2024 (études 1b, 2). Échantillon : MTurk (d'après Gök).
2. **ezzeldin-2022-saudi** : `design` → quasi-expérience (« semi-experimental », une école par groupe) ; ajouter aux
   limites : prétest non rapporté, enseignement témoin non décrit, η² ≈ 0,8 (d ≈ 3,7), incohérences entre texte et
   tableaux, enseignement à distance 2020-2021.
3. **gok-2024-failure** : f1 trop régulier : la comparaison exacte de l'original n'est pas significative en 1b (d = 0,19)
   et l'effet y est très petit ; étude 3 : valence classée d'après le score réel, pas tirée au sort ; participants des
   États-Unis seulement (texte).
4. **nachtigall-2020-non-stem** : f1 et la limite « does not show the method harms » sous-estiment : étude 1, l'échec
   productif fait **moins bien** (ηp² = 0,12) ; `design` → quasi-expérience ; pays : Allemagne.
5. **sinha-2021-productive-failure** : ajouter g = −0,03 pour le procédural, 85 comparaisons quasi-expérimentales sur 166
   (expérimental seul g = 0,25), les pays (dont l'Arabie saoudite) ; expliquer que 0,87 vient de la courbe des p
   (Egger non significatif) ; `mena` : à discuter (comparaisons saoudiennes poolées, comme Jebb dans money-happiness).
6. **wang-2019-setback** : `design` → quasi-expérience (RD floue) ; `kind` causal pour f1 seulement, disputé pour f2 et
   f3 (performance conditionnée à la survie) ; ajouter Traag et al. 2025 (réplication non robuste, sélection) et d = 0,05 sur
   les citations ; « more than 10% » = 12,6 %.
7. **lee-2024-surgeons** : f1 « stopped learning » → « au-delà d'un seuil, la performance baisse » (résumé pour les
   managers).
8. **heine-2001-culture** : « who were told they failed » n'est pas dans le résumé (« who failed on a task ») ; ne le garder
   que si le texte entier le dit.
9. **madsen-2010-launch** : ne pas l'employer pour c3 (expérience propre des organisations, d'après le résumé).
10. **keith-2008-error-management**, **keith-2022-tune-out**, **kc-2013-surgery** : rien à corriger au fond (préciser le
    double comparateur de Keith 2008).

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `design`, `designSetBy`, `n`/`k`, `effect`, `limits`, `allegiance` ; `declared` et `acknowledged` non
lus. Dépôt `/home/user/book-vs-science` : seul ce fichier a été créé (`reports/failure-teaches/blind-review.md`) ; rien
d'autre modifié, aucune commande git.
