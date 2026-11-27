# Relecture aveugle des sources, 2e tour — « choose-your-struggle » (Manson, ch. 2 « Choose Your Struggle »)

Relu le 2026-11-26. Dix fiches ajoutées après la première relecture aveugle (`blind-review.md`) ; seules elles sont relues
ici. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis de correction ou de rétractation qui pointent vers l'article), OpenAlex
`/works/doi:<doi>`, Europe PMC `search … resultType=core` (`abstractText`). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-struggle-2/raw/` ; textes entiers :
`…/scratchpad/blind-struggle-2/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : Alshammari 2026, Armitage 2017, Hallford 2026,
Kędra 2026, Kudrna 2025, Styk 2021, Woolley 2025 (Europe PMC, XML, accès libre) ; **Wittleder 2025** (version de
l'éditeur déposée en accès libre dans KOPS, dépôt de l'université de Constance). **Woolley 2022** : texte entier fermé
(le lien libre d'OpenAlex, osf.io/6zdn8, est l'enregistrement des matériaux, pas l'article) ; lus à sa place sur l'OSF du
projet (osf.io/2avtu) : les protocoles de l'expérience 1 et les préenregistrements AsPredicted des expériences 2 à 5.
**Marszał-Wiśniewska 2014** : résumé seul (fermé partout) ; son codage dans le fichier de données de Cole 2021 (ESM 2,
téléchargé par la première relecture) vérifié.

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `design`, `mena`, `population`,
`findings[].text` ; les `support`, `kind`, `designSetBy`, `n`, `effect`, `limits` et `allegiance` seulement après avoir lu
chaque résumé et choisi ma phrase. `declared` non lu. Dossier de l'écrivain (`scratchpad/dossiers/`) : **non ouvert**.
`counter-evidence.md` non lu (pour rester indépendant).

Affirmations (telles que données pour ce tour ; elles ont changé depuis le premier) :
- **c1** (causale) : se livrer à des rêves positifs idéalisés du résultat voulu (le vivre comme déjà atteint, sans
  obstacles) fait baisser l'énergie, l'effort et la réussite qui suivent, comparé à des pensées qui le questionnent,
  négatives ou neutres.
- **c2** (causale) : répéter mentalement les étapes vers un but (simulation du processus) améliore l'effort et la
  performance plus que se représenter le résultat (simulation du résultat).
- **c3** (causale) : confronter le résultat souhaité aux obstacles, puis prévoir des réponses « si… alors… » (MCII,
  WOOP), aide plus à atteindre ses buts que seulement rêver ou ne rien faire.
- **c4** (causale) : embrasser le chemin lui-même, en l'aimant ou en lisant son inconfort comme un signe de progrès, fait
  s'engager et persister plus que se concentrer seulement sur le résultat futur.

**Avant tout : trois remarques qui valent pour plusieurs fiches.**
- **c4 est désormais causale** : la règle dure du §3 de `docs/verdict.md` plafonne à **basse** tout ce qui ne repose que
  sur des associations (Cerasoli 2014, Alshammari 2026, études 1 à 3 de Woolley 2025). Les seules preuves où l'exposition
  est manipulée sont Woolley 2016, Woolley 2022 et l'étude 4 de Woolley 2025 : **un seul laboratoire** (Woolley et
  Fishbach), des effets de court terme (une séance, 24 h).
- **c3 : un volet n'est pas MCII.** Armitage 2017 teste les plans « si… alors… » seuls, sans contraste mental, sans
  souhait ni image du résultat. Il ne compte pour c3 que de façon indirecte.
- **c3 : un motif d'allégeance apparaît.** Les résultats positifs du dossier viennent des équipes qui ont créé la méthode
  ou l'outil (Oettingen et Gollwitzer pour WOOP : Wittleder 2025 ; Armitage pour la feuille d'aide) ; les essais menés par
  des équipes indépendantes ne trouvent rien (Kudrna 2025, préenregistré ; Kędra 2026 ; et, au premier tour, Kizilcec
  2020). C'est une raison de baisser la certitude, pas seulement une remarque.

Vérification d'identité commune aux 10 DOI : Crossref `updated-by` et `update-to` absents, aucun document Crossref ne
déclare mettre à jour l'un d'eux (`filter=updates:` : 0 résultat pour chacun), OpenAlex `is_retracted: false` pour tous.
**Aucun avis de correction ni de rétractation trouvé.** Titres, premiers auteurs et années concordent avec les `id` des
fiches (Marszał-Wiśniewska : en ligne en 2014, numéro de 2016 ; Woolley 2025 : Crossref y lie seulement sa relecture
publiée, `has-review`). Les dix fiches portent `designSetBy: reviewer` : je confirme le plan de neuf d'entre elles ; deux
remarques (Styk, Woolley 2025) ci-dessous.

---

## 1. 10.1038/s41598-026-44548-8 (alshammari-2026-saudi)

- **Identité** : confirmée. « The effects of informal digital learning, intrinsic motivation, and grit on online
  learning effort regulation and English achievement. » Alshammari, S. H. (premier auteur ; Alrashidi), 2026,
  *Scientific Reports* 16, article 13828 (en ligne le 17 mars 2026). Article de recherche, accès libre (PMC13128827).
  Ni correction ni rétractation.
- **Plan (relecteur)** : **transversal, corrélationnel** : un questionnaire en ligne, un seul temps, modèle d'équations
  structurelles. Les « effets » du résumé sont des chemins d'un modèle ; les auteurs écrivent eux-mêmes « cross-sectional
  data do not allow for causal interpretations ». **La fiche (`cross-sectional`) est juste.** Plafond : basse.
- **Population (texte entier)** : **218 étudiants saoudiens** d'anglais langue étrangère, **université de Ha'il** (nord de
  l'Arabie saoudite), échantillon de convenance, sept facultés (informatique 36 %, lettres 19 %, médecine 11 %…),
  **56 % d'hommes, 44 % de femmes** ; questionnaires traduits en arabe (traduction et rétrotraduction, trois experts,
  prétest sur 30). MENA : **oui**.
- **Mesures (texte entier)** : motivation intrinsèque (10 items), grit (9 items), régulation de l'effort en ligne (OLER,
  4 items) : échelles déclarées de 1 à 5 ; « English achievement » : notes du cours et score d'un test standardisé,
  convertis sur une échelle commune (le texte ne dit pas nettement s'ils sont relevés ou déclarés).
- **Résultat principal** : motivation intrinsèque → effort (β non standardisé = 1,047, p < 0,001) ; grit → effort ns
  (−0,167, p = 0,106) ; grit → réussite (0,453, p = 0,003) ; motivation intrinsèque → réussite ns (0,046, p = 0,699).
  R² : effort 0,80, réussite 0,23.
- **Phrases du résumé** : « The results indicated that IDLE and intrinsic motivation had significant positive effects
  on OLER, while grit did not significantly influence OLER. » — « For English achievement, grit had a significant
  positive effect, while IDLE and intrinsic motivation had insignificant effects. »
- **Ce que le résumé ne dit pas (texte entier, tableau 4)** : les corrélations entre construits sont toutes positives :
  motivation intrinsèque–effort **r = 0,883** (plus haut que les racines des AVE : la validité discriminante échoue, les
  auteurs le reconnaissent) ; **motivation intrinsèque–réussite r = 0,34** ; **grit–effort r = 0,57** ; motivation
  intrinsèque–grit 0,65 ; grit–apprentissage informel 0,71. Les « pas d'effet » sont donc des **absences de chemin propre
  une fois les autres prédicteurs dans le modèle** (colinéarité), pas des absences de lien. Et le lien motivation
  intrinsèque → effort est presque la même mesure prise deux fois, déclarée par la même personne le même jour.
- **c4 : nuances** — association seulement (plafond basse) ; aimer apprendre va avec plus d'effort *déclaré* (quasi
  tautologique, r = 0,88), mais **n'a pas de lien propre avec la réussite**, que porte le grit (la persévérance) ; aucun
  comparateur « se concentrer sur le résultat ». C'est le **seul échantillon arabe** sur c4, et il ne montre pas que le
  plaisir du chemin mène plus loin.
- **c1, c2, c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens que le résumé ; `kind: association` et `design` justes.
  **Mais les textes des deux findings exagèrent leur partie négative** : « while grit did not » (f1) et « not with
  intrinsic motivation » (f2) se lisent « aucun lien », alors que les corrélations simples sont positives (0,57 et 0,34) :
  écrire « no unique path once the other predictors are in the model ». La limite « how achievement was measured is not
  in the abstract (full text not read) » : le texte entier est libre (PMC) ; écrire « course grades and a standardized
  proficiency test, converted to one scale ». Ajouter : r = 0,88 entre motivation intrinsèque et effort déclaré
  (validité discriminante non atteinte) ; une université, convenance ; 56 % d'hommes.

## 2. 10.1007/s11121-017-0807-z (armitage-2017-kuwait)

- **Identité** : confirmée. « Randomized Controlled Trial of a Volitional Help Sheet to Encourage Weight Loss in the
  Middle East. » Armitage, C. J. (premier auteur ; Alganem, Norman), 2017, *Prevention Science* 18(8), 976-983 (en ligne
  le 23 juin 2017). Europe PMC : « Randomized Controlled Trial ». Ni correction ni rétractation.
- **Plan (relecteur)** : **essai randomisé** à deux bras parallèles, une seule séance (une feuille à la fin d'un
  questionnaire), poids à 6 mois relevé dans les dossiers par un personnel en aveugle. Randomisation simple à pile ou face
  (d'où 119 contre 97) ; **ni protocole ni plan d'analyse publiés avant** (limite reconnue par les auteurs). **La fiche
  (`rct`) est juste.** Plafond : modérée.
- **Population (texte entier)** : **216 adultes en surpoids ou obèses** (IMC ≥ 25, moyen 33,9) s'inscrivant pour la
  première fois à un **programme commercial d'amaigrissement au Koweït** (8 $ par semaine, 2010) ; 127 femmes, 61 hommes,
  28 sans réponse ; 30 ans en moyenne ; questionnaires traduits en arabe et rétrotraduits ; **nationalité et langue des
  participants non rapportées** ; 23 % des personnes sollicitées ont accepté. MENA : **oui** (le pays) ; « échantillon
  arabe » probable mais **non dit par l'article**.
- **Intervention et contrôle (texte entier)** : les deux bras reçoivent la même feuille (12 situations critiques,
  12 réponses) et l'information que repérer ses tentations et les moyens d'y résister aide à maigrir ; le bras
  intervention **relie** situations et réponses (« si… alors… ») ; le contrôle **coche** celles qui le concernent sans
  les relier. **Aucun contraste mental, aucun souhait, aucune image du résultat** : un volet de MCII, pas MCII.
- **Résultat principal** : à 6 mois, −6,58 % du poids initial contre −4,04 % ; différence 2,55 points, d = 0,38.
- **Phrase du résumé** : « Participants in the intervention condition lost significantly more weight (6.15 kg; -6.58%
  initial body weight) than those in the control condition (3.66 kg; -4.04% initial body weight), M diff = 2.55% initial
  body weight, SE diff = .92, t(214) = 2.76, p = .006, 95%CI = .73, 4.36, d = .38. »
- **Taille d'effet et biais (texte entier)** : interaction groupe × temps d = 0,29 (p = 0,022) ; différence de perte en %
  d = 0,38. **Abandons inégaux : 25 dans le contrôle contre 14** (p = 0,01), analysés en intention de traiter **en
  reportant le poids initial** (une personne partie compte « 0 kg perdu ») : ce choix favorise le bras qui perd moins de
  monde, ici l'intervention ; l'analyse « per protocol » « ne change rien de substantiel », sans chiffres. Perte d'au
  moins 10 % : 22,7 % contre 14,4 %, χ²(1) = 2,37, « p = .062 » : **c'est un p unilatéral** (bilatéral : 0,12, mon
  calcul). Coquille : 3,66 kg dans le résumé, 3,86 kg dans le texte.
- **c3 : supports en partie (indirect)** — soutient le **volet « si… alors… »** contre le simple repérage des mêmes
  situations, sur un poids mesuré à 6 mois, dans un pays du Golfe ; **ne teste ni le contraste mental ni le comparateur
  « seulement rêver » ou « ne rien faire »**. Rappel du premier tour : Cross 2019 trouve que les plans n'ajoutent rien de
  démontré au contraste seul.
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; `kind: intervention`, `effect: d 0.38`, `n: 216` justes ;
  limites justes (« if-then plans alone… one half of WOOP » : exact). **À corriger** : « an Arab sample (Kuwait) » →
  « a sample in Kuwait, questionnaires in Arabic; nationality not reported ». Ajouter : abandons inégaux (25 contre 14)
  avec report du poids initial ; pas de préenregistrement ; randomisation simple ; le « p = .062 » des 10 % est
  unilatéral ; 23 % d'acceptation ; programme payant (gens déjà décidés). `allegiance` juste ; ajouter qu'Armitage est
  aussi co-auteur de cole-2021-simulation.

## 3. 10.1080/00049530.2026.2762616 (hallford-2026-future)

- **Identité** : confirmée. « Outcome versus process focused future thinking: results from a randomised experiment. »
  Hallford, D. J. (premier auteur ; Thomas, Simpson, Matsumoto), 2026, *Australian Journal of Psychology* 78(1), 2762616
  (en ligne le 18 novembre 2026). Ni correction ni rétractation.
- **Plan (relecteur)** : **expérience randomisée préenregistrée** (AsPredicted), 2 (résultat / processus, entre sujets)
  × 2 (avant / après), en ligne, une séance de 15 à 20 min. **La fiche (`experiment`) est juste.** Plafond : modérée.
- **Population (texte entier)** : **134 adultes vivant en Australie** (190 commencent, 136 finissent), recrutés sur les
  réseaux sociaux et SurveyCircle ; **72 % de femmes** ; 35 ans en moyenne (19-78) ; 83 % diplômés du supérieur ; 68
  « résultat », 66 « processus ». MENA : non.
- **Tâche (texte entier)** : quatre scènes **agréables et ordinaires** (un après-midi au parc, un dîner avec un ami, une
  séance de sport réussie, réussir quelque chose dont on est fier), 2 min chacune ; mesures : un seul item de 1 à 9 par
  scène (plaisir anticipé, plaisir à y penser, contrôle perçu, probabilité, importance, motivation), juste avant et juste
  après.
- **Résultat principal** : penser au résultat fait monter le plaisir à y penser, l'importance et la motivation déclarée ;
  penser aux étapes fait baisser le contrôle perçu et le plaisir anticipé ; après la tâche, les groupes diffèrent de
  d ≈ 0,4.
- **Phrases du résumé** : « Outcome-focused thinking increased anticipatory pleasure, motivation and personal
  significance. » — « In contrast, process-focused thinking reduced perceived control and was associated with
  reductions in both anticipated and anticipatory pleasure. »
- **Taille d'effet (texte entier)** : motivation : interaction ηp² = 0,06 ; hausse dans le groupe « résultat »
  dz = 0,53, aucune dans le groupe « processus » ; écart après la tâche d = 0,41. Contrôle perçu : baisse dans le groupe
  « processus » dz = 0,60 ; écart d = 0,49. **Contrôle de manipulation** : le groupe « processus » ne pensait pas plus aux
  étapes qu'au résultat (dz = 0,07) : la manipulation **n'a pas isolé** la simulation du processus (les auteurs le
  disent). L'hypothèse préenregistrée « plus de contrôle perçu après le processus » est **contredite** (moins).
- **c1 : nuances (indirect)** — imaginer le résultat d'un événement plausible fait **monter** la motivation déclarée
  juste après. Ce n'est ni le « rêve idéalisé » d'Oettingen ni son comparateur (pensée qui questionne, neutre) ; et la
  théorie d'Oettingen prédit justement qu'un rêve fait du bien sur le moment tout en vidant l'énergie : une motivation
  déclarée n'est ni une énergie mesurée, ni un effort, ni une réussite. Interdit, en revanche, de dire « imaginer le
  résultat tue la motivation ».
- **c2 : nuances (va contre, sur des sentiments déclarés)** — penser aux étapes ne fait pas monter la motivation et fait
  baisser le contrôle perçu ; mais **aucun effort ni performance mesuré**, des scènes de loisir plus que des buts
  difficiles, et une manipulation du processus qui a mal pris : ne peut pas contredire c2 sur son critère.
- **c3, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `kind: causal` juste (sentiments mesurés juste après une
  manipulation). Limites justes ; « country not given in the abstract » : c'est l'**Australie** (texte libre,
  PMC13784222). Ajouter : la manipulation n'a pas isolé le processus ; scènes agréables (parc, dîner) ; items uniques ;
  hypothèse préenregistrée sur le contrôle perçu contredite ; 72 % de femmes.

## 4. 10.5114/cipp/225999 (kedra-2026-online)

- **Identité** : confirmée. « Does mental contrasting with implementation intentions (MCII) help to increase physical
  activity? » Kędra, M. (premier auteur ; Łaguna), 2026, *Current Issues in Personality Psychology* 14(3), 164-173. Ni
  correction ni rétractation.
- **Plan (relecteur)** : **deux petits essais randomisés** en ligne, trois mesures (avant, 1 semaine, 2 semaines après).
  **La fiche (`rct`) est juste.** Plafond : modérée. Puissance calculée pour un effet **moyen** (f = 0,25 ; 36 personnes
  au minimum) : un effet de la taille de ceux des méta-analyses (g ≈ 0,25-0,35) n'est pas exclu.
- **Population (texte entier)** : **Pologne**, en polonais. Étude 1 : **59** élèves et étudiants (17-35 ans, 66 % de
  femmes ; 33 MCII, 26 contrôle) voulant marcher plus ; 60 des 242 éligibles ont rempli le premier questionnaire.
  Étude 2 : **112** personnes s'entraînant en salle sans entraîneur (16-55 ans, 58 % d'hommes ; 51 contre 61) voulant
  faire plus de cardio. Sans contre-indication (PAR-Q). MENA : non.
- **Contrôle (texte entier)** : un court texte sur l'importance de l'activité physique (que reçoivent aussi les MCII) ;
  **pas de souhait, pas d'image du résultat** : comparateur ≈ « ne rien faire ».
- **Mesures** : pas recopiés par les participants depuis une application de téléphone (étude 1) ; minutes de cardio
  déclarées dans un calendrier (étude 2) ; sentiment d'efficacité, engagement, affects.
- **Résultat principal** : aucun effet significatif, aucune interaction groupe × temps, dans les deux études. Étude 2 :
  effet principal du groupe sur l'engagement et l'affect positif (plus hauts dans le groupe MCII sur l'ensemble des
  temps, sans interaction) : un écart déjà là, pas un effet.
- **Phrases du résumé** : « No statistically significant effects of the MCII online intervention were observed in
  either Study 1 or Study 2. » — « The results revealed no statistically significant differences between groups, nor
  any pre- to post-intervention changes in the experimental group across any of the measured variables. »
- **Taille d'effet** : non donnée dans l'article (tableau S3 en annexe, non lu).
- **c3 : contradicts (faible)** — contre « ne rien faire », MCII en ligne n'a rien changé en deux semaines ; mais deux
  petits essais, puissance pour un effet moyen seulement, mesures recopiées ou déclarées, gens déjà actifs. Équipe
  indépendante des créateurs de la méthode.
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; `n: 171` juste. Texte de f1 un peu fort : « did not
  change » → « no significant effect (power for a medium effect only) ». Limites justes ; « the control group's task and
  the country are not given in the abstract » : texte libre (PMC13717682) : **Pologne**, contrôle = un texte sur
  l'importance de l'activité. Ajouter : activité recopiée ou déclarée par les participants ; puissance pour f = 0,25 ;
  un quart des éligibles seulement est entré (étude 1).

## 5. 10.3390/ijerph22030398 (kudrna-2025-workplace)

- **Identité** : confirmée. « A Mixed-Methods Cluster Randomised Waitlist-Controlled Trial of a Goal-Based Behaviour
  Change Intervention Implemented in Workplaces. » Kudrna, L. (première auteure ; 14 co-auteurs, dont Lilford), 2025,
  *International Journal of Environmental Research and Public Health* 22(3), 398. Europe PMC : « Randomized Controlled
  Trial ». Ni correction ni rétractation.
- **Plan (relecteur)** : **essai randomisé en grappes** (lieux de travail), liste d'attente, **protocole publié et
  préenregistré** (ISRCTN, OSF), randomisation par un statisticien extérieur, stratifiée sur la taille, analyse bayésienne
  en intention de traiter. **La fiche (`rct`) est juste.** Plafond : modérée.
- **Population (texte entier)** : **225 salariés de 28 lieux de travail des West Midlands (Royaume-Uni)** inscrits à un
  programme public de santé au travail (124 MCII, 101 contrôle) ; environ 72 % de femmes ; majorité blanche ; déséquilibres
  de départ (Asiatiques 6 % contre 18 %, 41 ans contre 36). **60 lieux prévus, 28 obtenus** ; perdus de vue 30 et 35
  (29 %), un lieu de travail du contrôle sorti. MENA : non.
- **Intervention et contrôle (texte entier)** : tous formulent un souhait de santé ou de bien-être, en séance de groupe
  animée par les chercheurs ; le bras MCII y ajoute le meilleur résultat, l'obstacle intérieur, un plan « si… alors… » ;
  le contrôle garde les « soins habituels » du programme. Comparateur = **un souhait seul**, sans contraste.
- **Résultat principal** : progrès déclaré à 4 semaines (1-7) : 3,87 contre 4,12, différence −0,19 [−1,08 ; 0,71] ;
  probabilité a posteriori d'un bénéfice cliniquement important (+0,5) : 5 %. Progrès « de comportement » (secondaire) :
  +0,37 [−0,42 ; 1,18]. Anxiété de la veille : +1,20 [0,22 ; 2,18].
- **Phrases du résumé** : « The results showed no substantive effect of the intervention on average self-reported
  progress towards what they wished to do for their health and wellbeing four weeks later (mean difference on a 1-7
  scale: -0.19; 95% credible interval: -1.08-0.71). » — « Unexpectedly, anxiety increased, and we found evidence that
  might suggest people identifying as men or of Asian ethnicity made less progress in the intervention group. »
- **Taille d'effet** : ci-dessus. Sous-groupes : hommes −1,27 [−2,57 ; 0,05], Asiatiques −2,24 [−4,50 ; 0,02] :
  **intervalles qui touchent zéro**, analyses de sous-groupes parmi d'autres ; l'anxiété est un critère secondaire parmi
  une dizaine.
- **c3 : contradicts (dans ce contexte)** — essai préenregistré, indépendant des créateurs de la méthode, contre un
  comparateur proche de « seulement souhaiter » : pas d'effet sur le progrès déclaré à 4 semaines. Limites : 28 grappes
  au lieu de 60 (imprécis : l'intervalle va jusqu'à +0,71), 29 % de perdus, un item déclaré.
- **c1, c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `n: 225` juste ; limites justes. Préciser « the control
  arm only wrote down wishes » → « made a wish, plus the workplace programme's usual care » ; l'anxiété est un critère
  secondaire parmi beaucoup, et les sous-groupes ont des intervalles qui touchent zéro (le texte de f2 dit « may », c'est
  juste). Ajouter : préenregistré ; 60 grappes prévues, 28 obtenues ; 29 % de perdus.

## 6. 10.1080/00223980.2014.987102 (marszal-wisniewska-2014-weight)

- **Identité** : confirmée. « Role of Mental Simulations in the Weight Loss Process. » Marszał-Wiśniewska, M. (première
  auteure ; Jarczewska-Gerc), en ligne le 13 décembre 2014, *The Journal of Psychology* 150(1), 1-14 (numéro de janvier
  2016). Ni correction ni rétractation. Résumé seul (fermé ; ni OpenAlex ni Semantic Scholar n'ont de version libre).
- **Plan (relecteur)** : **deux expériences** à attribution aléatoire, très petites. **La fiche (`experiment`) est
  juste.** Plafond : modérée.
- **Population** : étude 1 : 40 étudiantes (19-27 ans) voulant maigrir, quatre groupes (≈ 10 par groupe) ; étude 2 :
  106 femmes (19-45 ans), cinq groupes simulés plus un contrôle (Cole code 17-18 par bras simulé et 36 au contrôle). Pays
  non donné (auteures polonaises). MENA : non.
- **Résultat principal** : étude 1 : processus, et processus puis résultat négatif, > résultat positif et contrôle, en
  poids perdu à 5 semaines ; étude 2 : « processus puis résultat positif » = la plus grande persistance, « processus puis
  résultat négatif » = la plus grande perte.
- **Phrases du résumé** : « Students from the mixed and process simulation groups lost significantly more weight after
  five weeks than participants from the outcome simulation and control groups. » — « Results showed that process
  followed by positive outcome simulations lead to the highest persistence in the weight loss process, while process
  followed by negative outcome simulations induced the greatest reduction in weight. »
- **Taille d'effet** : aucune dans le résumé ; ni la mesure du poids (pesée ou déclarée ?) ni celle de la persistance ne
  sont décrites. **Le résumé ne compare pas processus seul et résultat seul dans l'étude 2.** **Cole 2021 (ESM 2, vérifié)**
  ne code que l'étude 2, contre le contrôle : processus seul g = 0, résultat positif g = 0, résultat négatif g = 0,
  processus + résultat négatif g = 0, **processus + résultat positif g = 0,60**. Sa règle : « Hedges's g = 0.00 » **imputé**
  quand l'article ne rapporte pas de différence significative. Donc, dans l'étude 2, ni le processus seul ni le résultat
  seul ne se distinguent du contrôle d'après l'article.
- **c2 : supports (faible)** — l'étude 1 va dans le sens de c2 sur un vrai critère (poids à 5 semaines), avec ≈ 10
  personnes par groupe ; l'étude 2, deux fois et demie plus grande, ne montre pas l'avantage du processus seul (0 chez
  Cole), seulement celui des combinaisons.
- **c1 : nuances (indirect)** — rien ne montre que le résultat positif imaginé fasse moins bien que ne rien imaginer
  (groupé avec le contrôle dans l'étude 1 ; g = 0 contre le contrôle dans l'étude 2).
- **c3, c4 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `n: 146` juste. La limite sur Cole est **exacte** ;
  préciser que ce 0 est **imputé** par Cole faute de différence significative rapportée, et que l'étude 1 n'est pas dans
  Cole. Ajouter : mesures du poids et de la persistance non décrites ; processus seul contre résultat seul non rapporté
  pour l'étude 2.

## 7. 10.1186/s13690-021-00524-4 (styk-2021-maze)

- **Identité** : confirmée. « Effectiveness of different types of mental simulation in the weight loss process based on
  a perseverance study among people with different BMI. » Styk, W. (premier auteur ; Zmorzyński, Klinkosz), 2021,
  *Archives of Public Health* 79, article 10. Ni correction ni rétractation.
- **Plan (relecteur)** : **expérience à attribution alternée** : le texte dit « randomly assigned », puis « assigned …
  alternately to ensure that the groups were as equal in size as possible » ; quasi aléatoire, non masquée ; **pas de
  groupe sans simulation** ; en ligne, sans surveillance. La fiche (`experiment`) est acceptable, **avec −1 pour le
  risque de biais**. Plafond : modérée.
- **Population (texte entier)** : **252 adultes** (56 % de femmes), 18-58 ans (35 en moyenne), 82 % diplômés du
  supérieur, recrutés en ligne (forums, courriels, boule de neige) par une équipe polonaise ; IMC déclaré : 7 % sous la
  normale, 65 % normal, 28 % au-dessus. MENA : non.
- **Tâche (texte entier)** : une consigne lue juste avant (résultat : « imagine que tu obtiens le meilleur résultat… tu
  es le meilleur… tes amis te féliciteront » ; processus : « imagine chaque mouvement un par un ») ; puis des labyrinthes
  **faciles**, sans limite, qu'on peut quitter à tout moment. Rien sur le poids, malgré le titre.
- **Résultat principal** : processus > résultat sur le nombre de labyrinthes (90 contre 63) et le temps passé (687 s
  contre 474 s) ; pas d'effet sur le temps par labyrinthe, sauf chez les personnes en surpoids (interaction).
- **Phrase du résumé** : « Process simulation subjects completed more tasks and spent more time solving the test than
  outcome simulation subjects. »
- **Taille d'effet (texte entier)** : η² = 0,03 pour les deux indicateurs (petit). Écarts types aussi grands que les
  moyennes (89 pour 90 ; 611 pour 687), alors que les auteurs disent les distributions normales ; « F(1) = 8,32 ;
  p < 0,001 » : un F(1, ≈ 246) de 8,32 donne p ≈ 0,004 (erreur de rapport, sans changer la conclusion).
- **c2 : supports (faible)** — persistance immédiate sur une tâche facile, juste après une consigne ; pas de but réel,
  pas de performance au sens de c2 (le nombre de labyrinthes mêle persistance et vitesse) ; attribution alternée.
- **c1 : irrelevant au sens strict** — la consigne « résultat » est un rêve idéalisé typique, et elle donne moins de
  persistance que le processus ; mais sans groupe neutre, on ne sait pas si le rêve a fait baisser ou si le processus a
  fait monter. Cohérent, pas probant.
- **c3, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; `n: 252` juste. Limites justes et précises (alternance,
  η² = 0,03, pas de groupe sans simulation, IMC déclaré). Ajouter : labyrinthes faciles, qu'on quitte quand on veut ;
  distributions très asymétriques ; p mal rapporté.

## 8. 10.1177/10901981241310216 (wittleder-2025-sham)

- **Identité** : confirmée. « WOOP as a Brief Alcohol Intervention Led by Lay Coaches in College Settings. »
  Wittleder, S. (première auteure ; Bhoopsingh, Gollwitzer, Jay, Mutter, Valshtein, Angelotti, Oettingen), 2025, *Health
  Education & Behavior* 52(3), 299-308 (en ligne le 24 janvier 2025). Europe PMC : « Randomized Controlled Trial ». Ni
  correction ni rétractation.
- **Plan (relecteur)** : **petit essai randomisé de faisabilité** (pilote), participants en aveugle, intervenants
  (étudiants formés 10 à 15 h) non aveugles ; **aucun enregistrement d'essai ni préenregistrement mentionné**. La fiche
  (`rct`) est juste ; préciser « feasibility pilot ». Plafond : modérée.
- **Population (texte entier)** : **86 adultes** recrutés sur un campus new-yorkais (NYU) par affiche (« Worried about
  your drinking? »), sans dépistage de consommation à risque ; 54 femmes, 31 hommes ; 24,9 ans en moyenne ; AUDIT moyen
  11,4 ; 41 WOOP, 45 sham. **Perdus de vue : 34,5 %**, **44 % dans le sham contre 24 % dans WOOP** (p = 0,051) ;
  **analysés : 47 à 1 mois (28 contre 19), 43 à 2 mois (24 contre 19)**, sans imputation. MENA : non.
- **Sham (texte entier)** : même durée (≈ 57 min), mêmes 14 rappels quotidiens ; étapes : souhait, meilleur résultat,
  **deuxième meilleur résultat**, plan « si [résultat], alors [sentiment] ». C'est bien **« seulement rêver » (deux fois),
  avec la même forme de plan** : le comparateur exact de c3, et un contrôle d'attention.
- **Résultat principal** : jours de forte consommation (sur 14) : −1,25 contre +0,50 à 1 mois (p = 0,027), −1,12 contre
  +0,21 à 2 mois (p = 0,023) ; toujours significatif après ajustement (p = 0,042 et 0,045). **Les deux autres critères de
  consommation ne diffèrent pas** (jours de consommation p = 0,12 et 0,14 ; verres par jour de consommation p = 0,46 et
  0,37). Part de ceux qui réduisent : ns à 1 mois (p = 0,13), significative à 2 mois (58 % contre 26 %, p = 0,036).
- **Phrase du résumé** : « We found that the WOOP intervention group reported fewer heavy drinking days (≥ 5 drinks for
  men or ≥ 4 drinks for women, measured using the Alcohol Timeline Follow-Back Method) compared to the Sham group at the
  1-month and 2-month follow-ups. »
- **Taille d'effet** : non donnée par les auteurs ; d'après t(45) = 2,28 et t(41) = 2,36, **d ≈ 0,7** (mon calcul,
  indicatif) : grand, imprécis, sur les seuls restants.
- **c3 : supports (faible)** — le seul essai du dossier qui oppose WOOP au comparateur exact « seulement rêver », avec
  un contrôle d'attention, et dans le bon sens ; mais pilote de 86, à peine plus de la moitié analysée, plus d'abandons
  dans le sham, consommation déclarée, un critère sur trois, non enregistré, co-signé par les créateurs de WOOP.
- **c1 : irrelevant** — le sham rêve deux fois, mais aucun groupe neutre ; ses jours de forte consommation montent un peu,
  sans test contre rien.
- **c2, c4 : irrelevant**.
- **Fiche de l'écrivain** : support = ma phrase, même sens ; texte de f1 fidèle ; `kind: intervention` juste. **Limite
  fausse** : « sample size and effect size not in the abstract (full text closed) » : la version de l'éditeur est en accès
  libre (KOPS : `kops.uni-konstanz.de/bitstreams/3e44bc9a-63df-48dc-bb76-12f0330184f1/download`). **Remplir `n`** : 86
  randomisés (47 et 43 analysés). Ajouter : 34,5 % de perdus, inégaux (44 % contre 24 %), analyse des seuls restants ;
  les deux autres critères de consommation nuls ; pas d'enregistrement ; pilote de faisabilité ; intervenants non
  aveugles. La limite « the closest test of WOOP against only dreaming » est juste. `allegiance` juste.

## 9. 10.1177/09567976211044685 (woolley-2022-discomfort)

- **Identité** : confirmée. « Motivating Personal Growth by Seeking Discomfort. » Woolley, K. (première auteure ;
  Fishbach), 2022, *Psychological Science* 33(4), 510-523. Ni correction ni rétractation. Texte entier fermé ; lus sur
  l'OSF du projet les protocoles de l'expérience 1 et les préenregistrements des expériences 2 à 5.
- **Plan (relecteur)** : **cinq expériences** ; la 1 dans des cours d'improvisation (la classe se compte en deux moitiés,
  chaque moitié reçoit sa consigne en privé et joue à son tour : attribution par demi-classe, pas individuelle, non
  préenregistrée) ; les 2 à 5 préenregistrées, en ligne. **La fiche (`experiment`) est juste.** Plafond : modérée.
- **Population** : 2 163 adultes au total (résumé) ; tailles par expérience non lues (prévues : 300, 300, 600 et 400 pour
  les expériences 2 à 5) ; pays non donnés (Prolific pour la 4). MENA : non connu.
- **Consignes et mesures (OSF)** : « ton but est de te sentir gêné et mal à l'aise ; c'est le signe que l'exercice
  marche » contre « ton but est d'écrire », « d'apprendre ce qui est nouveau », « de sentir que tu développes de nouvelles
  compétences ». Mesures **dans la même séance** : motivation déclarée à lire ou à recommencer, réussite **perçue** (« did
  you feel that you were achieving your goal… »), choix d'articles à lire. **Expérience 2 : la persistance (mots écrits,
  secondes) était préenregistrée avec la prédiction « pas d'effet »** ; je n'ai pas pu lire le résultat.
- **Résultat principal** : chercher l'inconfort comme signe de progrès augmente l'engagement et la réussite perçue, et
  seulement dans les domaines qui causent un inconfort immédiat.
- **Phrases du résumé** : « Across these areas of personal development, seeking discomfort as a signal of self-growth
  motivated engagement and increased perceived goal achievement relative to standard instructions. » — « Consistent with
  our theorizing, results showed that these effects occurred only in areas of personal growth that cause immediate
  discomfort. »
- **Taille d'effet** : aucune dans le résumé (pilotes cités dans les préenregistrements : d = 0,40 pour la 3,
  ηp² = 0,016 pour l'interaction de la 4).
- **c4 : supports en partie** — **l'étude la plus proche de l'idée de Manson** (lire l'inconfort comme le signe qu'on
  avance) ; mais l'engagement est **immédiat**, dans la séance ; la réussite est **perçue** ; **la persistance dans le
  temps n'est pas montrée** (et n'était pas prédite pour l'écriture) ; le comparateur est une consigne standard ou
  « apprendre », pas « se concentrer seulement sur le résultat futur ».
- **c1, c2, c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `n: 2163` juste. Limites justes ; préciser « follow-up
  length not given » → **aucun suivi : tout est mesuré dans la séance** (préenregistrements) ; ajouter que l'expérience 1
  attribue par demi-classe et n'est pas préenregistrée, et que la persistance de l'expérience 2 était prédite nulle.

## 10. 10.1177/09567976251350960 (woolley-2025-resolutions)

- **Identité** : confirmée. « Adherence to Personal Resolutions Across Time, Culture, and Goal Domains. » Woolley, K.
  (première auteure ; Giurge, Fishbach), 2025, *Psychological Science* 36(8), 607-621. Ni correction ni rétractation.
- **Plan (relecteur)** : **quatre études de plans différents** : 1, longitudinale sur un an (panel à décalages croisés,
  non préenregistrée) ; 2, prospective sur **un mois** (Chine, non préenregistrée) ; 3, **transversale** (préenregistrée ;
  les pas sont ceux des 14 jours **avant** le questionnaire, la motivation est mesurée après) ; 4, **expérience**
  préenregistrée. La fiche (`longitudinal`) convient à f1 ; **pour c4, causale, seule l'étude 4 compte** (expérience,
  plafond modérée).
- **Population (texte entier)** : 1 : 2 000 adultes américains (MTurk) au départ, **577 au bout de l'an** (71 % perdus,
  données manquantes par FIML) ; 2 : 500 adultes chinois (Credamo), 267 un mois plus tard ; 3 : 439 adultes (Prolific) ;
  4 : 763 adultes (CloudResearch Connect). MENA : non ; un échantillon chinois.
- **Mesures (texte entier)** : motivation intrinsèque = la poursuite est agréable, positive, prenante ; extrinsèque =
  utile, importante, va changer ma vie (la valeur du résultat) ; observance **déclarée** (1-7) dans les études 1 et 2 ;
  pas **recopiés par les participants** depuis leur application, deux captures d'écran vérifiant une partie (étude 3) ;
  étude 4 : nombre de produits scannés en **24 h** dans une application de santé présentée comme « un jeu amusant » ou
  comme « des informations utiles », déclaré avec capture.
- **Résultat principal** : la motivation intrinsèque prédit l'observance mieux que l'extrinsèque, sur un an, en Chine,
  sur les pas ; la rendre saillante augmente l'usage d'une application sur 24 h.
- **Phrases du résumé** : « In a year-long longitudinal study, U.S. adults set extrinsic New Year's resolutions, but
  intrinsic motivation predicted adherence to these goals more than extrinsic motivation (Study 1). » — « These findings
  emerged among adults in China (Study 2) and when measuring goal adherence objectively using the number of steps U.S.
  adults walked over 2 weeks (Study 3). » — « Indeed, increasing intrinsic (vs. extrinsic) motivation increased U.S.
  adults' goal adherence (Study 4). »
- **Taille d'effet (texte entier)** : étude 1 : β = 0,22, 0,10, 0,08 aux trois intervalles (l'effet décroît) ;
  extrinsèque ≈ 0 ; achèvement OR = 1,60 ; étude 2 : β = 0,31 (alpha de l'échelle extrinsèque 0,41 : mesure peu fiable,
  comparaison faible) ; étude 3 : β = 0,34 (≈ 1 250 pas de plus pour +1 écart type) ; **étude 4 : d = 0,21
  [0,07 ; 0,36]**, 11,6 contre 9,2 produits (échantillon agrandi après un premier résultat plus petit que prévu ;
  extension préenregistrée, seuil 0,025).
- **c4 : supports en partie** — le comparateur colle à c4 (le plaisir du chemin contre la valeur du résultat) ;
  l'association tient sur un an (observance déclarée, 71 % de perdus) ; la seule preuve causale est **petite (d = 0,21)
  et courte (24 h, une application)** : persister dans un but à long terme n'est pas testé expérimentalement. Et c'est
  « aimer le chemin », pas « accepter la douleur ».
- **c1, c2, c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f3 = mes phrases, même sens que le résumé. **f2 exagère en reprenant le résumé** :
  « measured objectively » → des pas **recopiés** par les participants, une partie vérifiée par captures ; « over 2
  weeks » → les **2 semaines avant** le questionnaire, donc transversal (la motivation peut suivre la marche) ; et la
  Chine, c'est un mois, pas un an. **f3** doit dire ce qu'est l'« adherence » : des produits scannés en 24 h, d = 0,21.
  **Remplir `n`** (2 000 → 577 / 500 → 267 / 439 / 763) ; « sample sizes not given … (full text not read) » : texte
  libre (PMC13428958). Ajouter : études 1 et 2 non préenregistrées ; 71 % perdus dans l'étude 1. `kind` justes
  (association, association, causal).

---

## Tableau final (ces dix fiches)

| DOI | c1 rêve idéalisé → moins d'énergie, d'effort, de réussite (causal) | c2 processus > résultat, effort et performance (causal) | c3 MCII > seulement rêver ou rien (causal) | c4 embrasser le chemin → s'engager, persister (causal) |
|---|---|---|---|---|
| 10.1038/s41598-026-44548-8 (Alshammari 2026) | irrelevant | irrelevant | irrelevant | nuances (transversal ; motivation ≈ effort déclaré, r = 0,88 ; pas de lien propre avec la réussite, portée par le grit) |
| 10.1007/s11121-017-0807-z (Armitage 2017) | irrelevant | irrelevant | supports en partie (indirect : plans « si… alors… » seuls, contre repérage ; pas MCII) | irrelevant |
| 10.1080/00049530.2026.2762616 (Hallford 2026) | nuances (indirect : imaginer le résultat fait monter la motivation déclarée) | nuances (va contre sur motivation et contrôle déclarés ; aucun effort ni performance) | irrelevant | irrelevant |
| 10.5114/cipp/225999 (Kędra 2026) | irrelevant | irrelevant | contradicts (faible : deux petits essais, contre « rien », 2 semaines) | irrelevant |
| 10.3390/ijerph22030398 (Kudrna 2025) | irrelevant | irrelevant | contradicts (préenregistré, indépendant, contre « souhait seul » ; imprécis) | irrelevant |
| 10.1080/00223980.2014.987102 (Marszał-Wiśniewska 2014) | nuances (indirect : résultat positif pas pire que le contrôle) | supports (faible : étude 1, ≈ 10 par groupe ; étude 2 codée 0 par Cole) | irrelevant | irrelevant |
| 10.1186/s13690-021-00524-4 (Styk 2021) | irrelevant au sens strict (pas de groupe neutre) | supports (faible : labyrinthes, attribution alternée, η² = 0,03) | irrelevant | irrelevant |
| 10.1177/10901981241310216 (Wittleder 2025) | irrelevant | irrelevant | supports (faible : pilote de 86, comparateur exact, labo des créateurs) | irrelevant |
| 10.1177/09567976211044685 (Woolley 2022) | irrelevant | irrelevant | irrelevant | supports en partie (engagement dans la séance, réussite perçue ; persistance non montrée) |
| 10.1177/09567976251350960 (Woolley 2025) | irrelevant | irrelevant | irrelevant | supports en partie (association sur un an ; expérience 24 h, d = 0,21) |

## Lecture d'ensemble (ce que ces dix fiches changent, avec celles du premier tour)

**c1 — inchangée : mêlée, soutenue seulement dans sa lecture étroite ; certitude basse.** Aucune nouvelle fiche ne
manipule un rêve idéalisé contre une pensée neutre ou qui questionne. Elles ajoutent des nuances : Hallford 2026
(préenregistré) montre qu'imaginer le résultat **fait monter** la motivation déclarée juste après ; Marszał-Wiśniewska
2014 ne voit pas le groupe « résultat positif » faire moins bien que le contrôle (g = 0 chez Cole pour l'étude 2) ; Styk
2021 voit un rêve idéalisé faire moins persister que le processus, sans groupe neutre. Rien de cela ne contredit Kappes
2011 (le rêve fait du bien maintenant et vide l'énergie ensuite), mais rien ne le renforce. La phrase prudente reste : le
problème serait le rêve qui fait vivre la réussite d'avance, pas « penser au résultat ».

**c2 — mêlée ; certitude très basse (je ne la monte pas).** Pour : trois petites expériences à haut risque de biais :
Pham 1999 (codé nul par Cole), Marszał-Wiśniewska 2014 (étude 1 : ≈ 10 par groupe ; l'étude 2, plus grande, ne montre pas
le processus seul au-dessus du contrôle), Styk 2021 (persistance juste après, sur des labyrinthes faciles, attribution
alternée). Contre ou nul : Alghazo 2020 (le plus grand tête-à-tête randomisé, 269 Saoudiennes : rien à l'examen, le
résultat gagne au début du semestre), Hallford 2026 (motivation et contrôle déclarés plus bas après le processus, sans
comportement), Cole 2021 (processus ns, aucun tête-à-tête). Plafond modérée (expériences), −1 risque de biais, −1
incohérence, −1 imprécision → **très basse**. La monter à basse demanderait de compter Styk comme une expérience sans
réserve et d'ignorer le 0 de Cole sur l'étude 2 de Marszał-Wiśniewska. Au mieux, « répéter les étapes fait persister un
peu plus, juste après, sur une tâche simple » ; jamais « améliore la performance ». Toujours aucun hook possible sur c2.

**c3 — soutient en partie ; certitude basse, très basse si on la tient au comparateur « seulement rêver ».** Nouveau pour :
Wittleder 2025 (le seul essai contre le comparateur exact, mais pilote de 86, 47 analysés, abandons inégaux, un critère sur
trois, laboratoire des créateurs) ; Armitage 2017 (le volet « si… alors… » seul, poids objectif à 6 mois au Koweït ; abandons
inégaux et report du poids initial). Nouveau contre : Kudrna 2025 (préenregistré, indépendant, contre un souhait seul : rien
à 4 semaines, anxiété en hausse) ; Kędra 2026 (indépendant, rien en 2 semaines, mais trop petit pour exclure un petit
effet). **Les résultats positifs viennent des équipes qui ont créé l'outil ; les essais indépendants, dont les deux
préenregistrés (Kizilcec 2020, Kudrna 2025), sont nuls** : avec le biais de publication de Wang 2021 (premier tour), c'est
un argument fort pour ne pas monter. Plafond haute (méta-analyses), −1 biais de publication et allégeance, −1 incohérence
→ **basse** ; tenue au comparateur « seulement rêver » : un pilote pour, un essai préenregistré à comparateur proche contre,
Oettingen 2001 conditionnel → **très basse**. Le « à retenir » sur WOOP reste « جرّب / ممكن يساعد ».

**c4 — soutient en partie, sur un effet de court terme et d'un seul laboratoire ; certitude basse.** c4 étant causale,
seules comptent les expériences : Woolley 2016 (persistance dans une séance), Woolley 2022 (engagement dans la séance et
réussite perçue, en lisant l'inconfort comme un progrès : **la plus proche de l'idée de Manson**), Woolley 2025 étude 4
(d = 0,21 sur 24 h). Les associations vont dans le même sens sur la durée (Woolley 2025 étude 1 sur un an ; Cerasoli 2014),
sauf **le seul échantillon arabe** : chez Alshammari 2026, le plaisir d'apprendre va avec l'effort déclaré mais pas avec la
réussite, que porte le grit (la persévérance). Plafond modérée (expériences), −1 caractère indirect (court terme, consignes
d'une séance, comparateurs « consigne standard » ou « utilité » plutôt que « le résultat seulement »), −1 un seul laboratoire
sans réplication indépendante → **basse**. À dire : « aimer le chemin, ou voir l'inconfort comme un signe qu'on avance,
aide à s'y mettre sur le moment » ; pas « fait tenir des années ».

**Ce qui en découle pour le badge** (indication, la décision reste à l'écrivain et au propriétaire) : la certitude du
verdict ne dépasse pas la plus basse des affirmations du champ : **très basse si c2 est dans le champ, basse sinon** ; ⚖️
ou ❓, jamais ✅ ni ❌. Un hook en question peut s'appuyer sur c1 (lecture étroite), c3 ou c4 (basses), **pas sur c2**.

**Égypte / MENA.** Trois fiches ont un échantillon d'un pays arabe : **Alghazo 2020** (269 étudiantes saoudiennes, essai
processus contre résultat ; premier tour), **Alshammari 2026** (218 étudiants saoudiens de Ha'il, 56 % d'hommes,
transversal) et **Armitage 2017** (216 adultes au Koweït, essai sur les plans « si… alors… », questionnaires en arabe,
nationalité non rapportée). **Aucune ne teste c1, ni MCII complet, ni une expérience de c4.** Pour c1, c3 (WOOP) et c4, « معظم
الدراسات من أمريكا وأوروبا » doit être dit ou écrit ; pour c2, Alghazo (arabe) va contre.

**Indépendance des preuves.** Woolley 2016, 2022 et 2025 : **le même laboratoire** (Woolley et Fishbach) ; toute la preuve
causale de c4 en vient. Wittleder 2025 : co-signé par Oettingen et Gollwitzer, comme Kappes 2011 et Oettingen 2001 et 2002.
Armitage 2017 : l'auteur de la feuille d'aide, aussi co-auteur de Cole 2021. Cole 2021 contient l'étude 2 de
Marszał-Wiśniewska (codée 0 pour le processus seul). Kudrna 2025, Kędra 2026, Hallford 2026, Styk 2021, Alshammari 2026 :
indépendants des autres fiches.

## Corrections demandées aux fiches

1. **alshammari-2026-saudi** : réécrire la partie négative de f1 et f2 : « no unique path once the other predictors are in
   the model » (corrélations simples positives : grit–effort 0,57, motivation intrinsèque–réussite 0,34) ; ajouter
   r = 0,88 entre motivation intrinsèque et effort déclaré (validité discriminante non atteinte) ; la réussite = notes et
   test standardisé (texte entier libre) ; 56 % d'hommes.
2. **armitage-2017-kuwait** : « an Arab sample » → « a sample in Kuwait, questionnaires in Arabic, nationality not
   reported » ; ajouter les abandons inégaux (25 contre 14) avec report du poids initial, l'absence de préenregistrement,
   le « p = .062 » unilatéral, 23 % d'acceptation ; Armitage co-auteur de Cole 2021.
3. **hallford-2026-future** : pays = Australie ; la manipulation n'a pas isolé le processus (dz = 0,07) ; scènes de loisir ;
   hypothèse préenregistrée sur le contrôle perçu contredite.
4. **kedra-2026-online** : f1 « did not change » → « no significant effect (power for a medium effect only) » ; Pologne ;
   contrôle = un texte sur l'importance de l'activité ; activité recopiée ou déclarée.
5. **kudrna-2025-workplace** : contrôle = un souhait plus les soins habituels du programme ; préenregistré ; 28 grappes sur
   60 prévues ; 29 % de perdus ; anxiété = critère secondaire parmi beaucoup.
6. **marszal-wisniewska-2014-weight** : le 0 de Cole est **imputé** (pas de différence significative rapportée) et ne
   concerne que l'étude 2 ; mesures du poids et de la persistance non décrites ; processus seul contre résultat seul non
   rapporté pour l'étude 2.
7. **styk-2021-maze** : ajouter labyrinthes faciles, abandon libre ; distributions très asymétriques ; p mal rapporté
   (F = 8,32 → p ≈ 0,004).
8. **wittleder-2025-sham** : le texte entier est libre (KOPS) ; **remplir `n`** (86 ; 47 et 43 analysés) ; 34,5 % de perdus,
   44 % contre 24 % ; analyse des seuls restants ; les deux autres critères de consommation nuls ; pas d'enregistrement ;
   pilote de faisabilité.
9. **woolley-2022-discomfort** : aucun suivi, tout est mesuré dans la séance ; expérience 1 attribuée par demi-classe, non
   préenregistrée ; persistance de l'expérience 2 prédite nulle.
10. **woolley-2025-resolutions** : f2 : « measured objectively » et « over 2 weeks » sont à corriger (pas recopiés des
    2 semaines **avant** le questionnaire ; transversal) ; Chine = 1 mois ; f3 : préciser « products scanned in a health
    app over 24 h, d = 0.21 » ; **remplir `n`** ; études 1 et 2 non préenregistrées ; 71 % perdus dans l'étude 1.

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `designSetBy`, `n`, `effect`, `limits`, `allegiance` ; `declared` non lu ; `counter-evidence.md` non lu.
Dépôt `/home/user/book-vs-science` : seul ce fichier a été créé (`reports/choose-your-struggle/blind-review-2.md`) ; rien
d'autre modifié, aucune commande git.
