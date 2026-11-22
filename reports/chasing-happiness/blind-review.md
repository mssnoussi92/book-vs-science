# Relecture aveugle des sources — « chasing-happiness » (Manson : vouloir plus d'expériences positives est en soi une expérience négative)

Relu le 2026-11-22. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis qui pointent vers l'article), OpenAlex `/works/doi:<doi>` (dont `is_retracted`),
Europe PMC `search … resultType=core` (`abstractText`, liste des errata). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-chasing/raw/` (et `raw2/`, `pdf/`).
Le texte entier a été lu en plus, pour la population, la mesure et les contrôles, quand il était en accès libre :
PMC/BioC (Mauss 2011, manuscrit d'auteur ; Ford 2014 ; Luhmann 2016 ; Ford 2015), Europe PMC XML (Hansenne 2021),
PDF de l'éditeur ou du dépôt (Mahmoodi Kahriz 2019, Kim 2018, Rohrer 2018) et la prépublication OSF de Huang 2024.
C'est signalé « (texte entier) » ; tout le reste vient du résumé seul. Zerwas 2024 et Ferguson 2012 : résumé seul
(eScholarship et OSF refusés, Taylor & Francis fermé).

Affirmations :
- **c1** : accorder beaucoup de valeur au bonheur / le vouloir beaucoup va avec un moindre bien-être (association).
- **c2** : chercher le bonheur rend les gens moins heureux (causale).
- **c3** : c'est le fait même de vouloir qui pèse, pas seulement le souci de ne pas être heureux.

**Contamination à déclarer.** Par erreur, la fiche entière de `mauss-2011-seeking` a été affichée avant la lecture du
résumé (une commande `cat` au lieu de l'extraction prévue) : sa `support.sentence`, son plan, ses limites et son avis
sur la correction ont donc été vus avant mon propre jugement pour cet article seulement. Pour les dix autres, seuls
`id`, `doi` et `findings[].text` ont été lus d'abord ; `support.sentence`, `kind`, `design`, `n` et `population` ensuite,
une fois chaque phrase d'appui trouvée dans le résumé. Le dossier de l'écrivain (`scratchpad/dossiers/`) n'a pas été
ouvert.

Vérification d'identité commune : les 11 DOI existent chez Crossref, titre, premier auteur et année conformes (à ± 1 an) ;
OpenAlex `is_retracted: false` pour tous ; **aucun avis de rétractation**. Un seul avis de correction : Mauss 2011 (voir
§1). `filter=updates:` : 0 résultat pour les 10 autres. `content/contested.json` n'existe pas encore dans le dépôt : aucun
de ces effets n'a pu y être confronté.

Plans fixés par le relecteur (`docs/verdict.md` §3) et plafond de départ :

| Source | Plan | Plafond |
|---|---|---|
| Mauss 2011 | étude 1 transversale ; étude 2 **expérience** randomisée | modérée (étude 2) / basse (étude 1) |
| Ford 2014 | transversal (étude 2 : cas-témoins) | basse |
| Mahmoodi Kahriz 2019 | transversal (deux échantillons) | basse |
| Hansenne 2021 | transversal, « réplication » d'un seul site, non multi-laboratoires | basse |
| Huang 2024 | **longitudinal** (panel, 5 vagues, RI-CLPM), observationnel | modérée (association) |
| Luhmann 2016 | transversal : analyse secondaire de 6 échantillons regroupés (méta-analyse des données individuelles, pas une revue systématique) | basse |
| Ferguson 2012 | deux **expériences** | modérée |
| Kim 2018 | étude 1 transversale ; études 2-4 **expériences** (étude 4 préenregistrée) | modérée |
| Rohrer 2018 | **longitudinal** (panel, 1 an), observationnel, analyse préenregistrée | modérée (association) |
| Ford 2015 | transversal, quatre régions | basse |
| Zerwas 2024 | transversal + journal quotidien + **longitudinal** (étude 2) | modérée (étude 2) / basse (étude 3) |

---

## 1. 10.1037/a0022010 (mauss-2011-seeking)

- **Identité** : confirmée. « Can seeking happiness make people unhappy? Paradoxical effects of valuing happiness. »
  Mauss, I. B. (premier auteur ; Tamir, Anderson, Savino), 2011, *Emotion* 11(4), 807-815. Article de recherche.
- **Avis** : **une correction**, 10.1037/a0024986, « "Can seeking happiness make people unhappy? …": Correction to Mauss,
  Tamir, Anderson, and Savino (2011) », *Emotion* 11(4), p. 767 (même numéro que l'article), datée du 2011-08-22 chez
  Crossref (`updated-by` de l'article et `update-to` de l'avis concordent). **Le texte de l'avis reste illisible** :
  doi.apa.org et psycnet répondent 403, Semantic Scholar indique « abstract elided by the publisher », Europe PMC n'a pas
  de notice pour l'erratum, PubMed non plus (recherche *Emotion* 2011 p. 767 : 0). **Ce qu'il corrige, par recoupement** :
  PubMed (21517168) écrit le titre « Can seeking happiness make people unhappy? **[corrected]** Paradoxical effects… » ;
  la notice PubMed a été créée le 2011-04-27 (version en ligne anticipée) ; le manuscrit d'auteur déposé dans PMC
  (PMC3160511, NIHMS311483) s'intitule « Can Seeking Happiness Make People **Happy**? Paradoxical Effects of Valuing
  Happiness ». La correction porte donc très probablement sur **le titre** (« happy » → « unhappy »). Le résumé du
  manuscrit et celui de l'éditeur sont identiques (une virgule près) : les phrases de résultat citées ci-dessous ne sont
  pas touchées. Aucune trace d'une correction de données ; on ne peut cependant pas l'exclure sans lire l'avis.
- **Plan** : étude 1 **transversale** (valeur accordée au bonheur × stress de vie) ; étude 2 **expérience** 2 × 2
  (induction « valoriser le bonheur » vs contrôle, film joyeux vs triste), médiation par la déception mesurée.
  (Texte entier : l'induction est un faux article de journal vantant le bonheur ; le contrôle lit le même texte avec
  « faire des jugements exacts » ; humeur mesurée juste après un film de 2 minutes.)
- **Population** : femmes seulement, États-Unis. (Texte entier : étude 1, 59 femmes de la région de Denver, âge moyen
  37,6, recrutées pour avoir vécu un événement stressant dans les 6 mois ; étude 2, 70 étudiantes, âge moyen 21,1,
  69 analysées.) Aucun échantillon arabe.
- **Résultat principal** : valoriser le bonheur va avec moins de bonheur quand le stress est faible (pas quand il est
  élevé) ; induit expérimentalement, il fait moins bien réagir à un film joyeux (pas à un film triste), via la déception
  envers ses propres sentiments.
- **Taille d'effet** : pas dans le résumé. (Texte entier : étude 2, interaction F(1,65) = 5,65, η²p = 0,08 ; film joyeux
  t(33) = 2,46, η²p = 0,15 ; étude 1, β de la valeur du bonheur de −0,33 à −0,43 sur le bien-être, −0,60 à −0,76 sous
  stress faible, ≈ 0 sous stress élevé.)
- **Constats de la fiche** :
  - `low-stress-only` — phrase de résultat : « In Study 1, female participants who valued happiness more (vs. less)
    reported lower happiness when under conditions of low, but not high, life stress. » Même phrase que l'écrivain, même
    sens, ni exagération ni contexte. `association` : juste.
  - `induced` — phrase de résultat : « In Study 2, compared to a control group, female participants who were
    experimentally induced to value happiness reacted less positively to a happy, but not a sad, emotion induction. »
    Même phrase que l'écrivain. Le texte du constat ajoute « by reading an article praising it » : vrai, mais pris du
    texte entier, pas du résumé. `causal` : juste (exposition manipulée).
  - `disappointment` — phrase de résultat : « This effect was mediated by participants' disappointment at their own
    feelings. » Même phrase. **Mais `kind: causal` est trop fort** : le médiateur est mesuré, pas manipulé ; seul le
    lien induction → déception est expérimental. Les auteurs écrivent eux-mêmes (texte entier) que « the mediation
    findings can only hint at mechanism », et la médiation n'apparaît qu'avec la mesure explicite de l'humeur, pas avec
    la mesure implicite. À classer `association`.
- **c1 : supports** (faible, conditionnel) — seulement sous stress faible, 59 femmes, transversal.
- **c2 : supports** — seule expérience du dossier qui va dans ce sens avec « valoriser » ; limites : 69 femmes réparties
  en quatre groupes, une induction d'un texte, un effet mesuré quelques minutes plus tard, pendant un film joyeux.
- **c3 : nuances (penche contre)** — l'induction augmente bien le « vouloir », mais son effet passe par la déception
  (juger ses sentiments), ce qui ressemble au souci plus qu'au désir. Texte entier, discussion des auteurs : « our
  findings suggest that the paradoxical effects of valuing happiness are not due to pursuing happiness as a goal or
  awareness of it, but rather, to how people evaluate their progress toward this goal ».

## 2. 10.1521/jscp.2014.33.10.890 (ford-2014-depression)

- **Identité** : confirmée. « Desperately Seeking Happiness: Valuing Happiness is Associated With Symptoms and
  Diagnosis of Depression. » Ford, B. Q. (premier auteur ; Shallcross, Mauss, Floerke, Gruber), 2014, *Journal of Social
  and Clinical Psychology* 33(10), 890-905. Ni correction ni rétractation.
- **Plan** : **transversal** ; étude 1 corrélationnelle, étude 2 comparaison de groupes (dépression en rémission vs
  témoins sains).
- **Population** : deux échantillons américains. (Texte entier : étude 1, N = 98, adultes de la région de Denver en
  rémission d'une dépression récurrente, au moins 3 épisodes, recrutés pour un essai de prévention des rechutes, mesures
  prises avant la randomisation ; étude 2, 31 personnes en rémission et 30 témoins, New Haven.) Aucun échantillon arabe.
- **Résultat principal** : chez des personnes en rémission d'une dépression, valoriser le bonheur va avec plus de
  symptômes dépressifs ; les personnes en rémission valorisent davantage le bonheur que des témoins sains.
- **Taille d'effet** : pas dans le résumé. (Texte entier : étude 1, r = 0,27 ; étude 2, r = 0,28 avec les symptômes ;
  différence de groupes η²p = 0,15.)
- **Constats de la fiche** :
  - `depressive-symptoms` — phrase de résultat : « As hypothesized, valuing happiness was associated with increased
    depressive symptoms in a community sample with remitted major depressive disorder (MDD), even when controlling for
    social desirability and neuroticism (Study 1). » Même phrase que l'écrivain ; même sens. `association` : juste.
  - `remitted-vs-healthy` — phrase de résultat : « Furthermore, valuing happiness was elevated in a remitted MDD sample
    (vs. healthy controls), even when controlling for current depressive symptoms, general affect valuation, and extreme
    goal pursuit (Study 2). » Même phrase ; même sens. Attention : une différence de groupe ne dit pas le sens (avoir été
    déprimé peut faire valoriser le bonheur) ; la phrase « can represent a risk factor » du résumé est une conclusion
    spéculative, pas un résultat, et l'écrivain ne s'en sert pas.
- **Écart de fiche** : `n: null` ; le texte entier donne 98 + 61.
- **c1 : supports** (faible) — population clinique particulière, transversal, échelle VHS qui mêle désir et souci.
- **c2 : irrelevant** — aucune manipulation ; le « risk factor » n'est pas testé.
- **c3 : irrelevant** — l'échelle totale ne sépare pas vouloir et souci (le contrôle de « extreme goal pursuit » ne le
  fait pas non plus).

## 3. 10.1007/s10902-019-00193-9 (mahmoodi-kahriz-2019-uk)

- **Identité** : confirmée. « Wanting to Be Happy but Not Knowing How: Poor Attentional Control and Emotion-Regulation
  Abilities Mediate the Association Between Valuing Happiness and Depression. » Mahmoodi Kahriz, B. (premier auteur ;
  Bower, Glover, Vogt), *Journal of Happiness Studies* 21(7), 2583-2601 ; en ligne le 2019-10-26, numéro de 2020. Ni
  correction ni rétractation (`filter=updates:` : 0).
- **Plan** : **transversal**, deux études ; médiations statistiques transversales.
- **Population** : étudiants d'une université britannique (Reading), N = 151 puis 299 (résumé). (Texte entier : surtout
  des femmes, 23 et 28 hommes ; étude 2 : 73,2 % de Britanniques, 7 % de double nationalité ; parmi les autres, 40 %
  d'Asie « mainly Malaysia and **Middle Eastern countries** » et 7 % d'Afrique « predominantly **Mauritanians** ».)
  **Quelques participants du Moyen-Orient et de Mauritanie** sont donc là, fondus dans le groupe « non-British » (≈ 59
  personnes en tout), jamais analysés à part : aucun résultat propre à un échantillon arabe.
- **Résultat principal** : dans les deux études, valoriser le bonheur va avec plus de dépression, surtout chez les
  Britanniques ; le lien passe statistiquement par un moindre contrôle attentionnel et une moindre capacité à savourer.
- **Taille d'effet** : pas dans le résumé. (Texte entier : r = 0,54 puis 0,38 avec le BDI ; modération par la nationalité
  ΔR² = 0,014 ; pente B = 4,91 chez les Britanniques, 4,08 chez les non-Britanniques, 2,59 en double nationalité, toutes
  significatives.)
- **Constats de la fiche** :
  - `replicated-uk` — phrase de résultat : « In both studies, we found that valuing happiness was related to increased
    depression, confirming the link between valuing happiness and depression in a Western country outside of the USA. »
    Même phrase que l'écrivain ; même sens. « Independent team » n'est pas dans le résumé, mais exact (aucun auteur du
    réseau Mauss/Ford).
  - `strongest-british` — phrase de résultat : « Moreover, our findings indicated that the relationship between valuing
    happiness and depression was strongest in British, rather than non-British participants or participants of dual
    nationality. » Même phrase ; même sens. Nuance (texte entier) : l'écart est petit (ΔR² = 0,014) et le lien reste net
    chez les non-Britanniques.
- **Écart de fiche** : `declared.venue: null` (c'est *Journal of Happiness Studies*). `mena: false` défendable, mais la
  présence de quelques participants du Moyen-Orient et de Mauritanie mérite une ligne dans les limites.
- **c1 : supports** (faible) — transversal ; les auteurs écrivent (texte entier) que le lien « may be bidirectional ».
- **c2 : irrelevant**.
- **c3 : irrelevant** — échelle totale.

## 4. 10.5334/pb.1036 (hansenne-2021-replication)

- **Identité** : confirmée. « Valuing Happiness is Not a Good Way of Pursuing Happiness, but Prioritizing Positivity is:
  A Replication Study. » Hansenne, M. (seul auteur), 2021, *Psychologica Belgica* 61(1), 306-314. Ni correction ni
  rétractation.
- **Plan** : **transversal** (régressions), un seul site ; le mot « replication » du titre ne désigne pas une
  réplication multi-laboratoires préenregistrée (pas d'analyse de puissance a priori, écrit l'auteur).
- **Population** : N = 683, 75 % de femmes (résumé). (Texte entier : partie francophone de la Belgique, étudiants,
  personnel universitaire et réseaux sociaux ; échelles traduites en français ; α de la VHS = 0,65.) Aucun échantillon
  arabe.
- **Résultat principal** : donner la priorité aux moments positifs dans l'organisation de ses journées va avec plus de
  bien-être et moins de dépression ; valoriser le bonheur va « en partie » dans l'autre sens.
- **Taille d'effet** : pas dans le résumé. (Texte entier : avec les deux échelles ensemble, β de la VHS = −0,30 sur la
  satisfaction, +0,39 sur la dépression ; corrélation VHS-PPS r = 0,39.)
- **Constats de la fiche** :
  - `prioritizing-positivity` — phrase de résultat : « Regression analyses showed that prioritizing positivity was
    positively associated with subjective happiness, life satisfaction and psychological well-being, but that it was
    negatively linked to depression. » Même phrase que l'écrivain ; même sens.
  - `valuing-partly-worse` — phrase de résultat : « Opposite results partly emerged for valuing happiness. » Même phrase.
    **Le texte du constat sur-interprète « partly »** : « with lower well-being on some measures ». D'après le texte
    entier, la VHS va dans le sens attendu sur **les quatre** mesures (moins de satisfaction, de bonheur subjectif, de
    bien-être psychologique ; plus de dépression), avec des liens « slight » pour trois d'entre elles. « Partly » parle
    plutôt de la force que du nombre de mesures. Proposer : « valuing happiness went the other way, more weakly ».
- **Écart de fiche** : population « country not given » : le texte entier dit Belgique francophone.
- **c1 : supports** (faible) — transversal, mesure peu fiable (α = 0,65).
- **c2 : irrelevant**.
- **c3 : nuances (penche contre)** — une autre façon de vouloir le bonheur (le prioriser dans ses choix d'activités)
  va avec plus de bien-être : ce n'est pas le désir en soi, c'est la manière.

## 5. 10.1177/09567976241263784 (huang-2024-valuing)

- **Identité** : confirmée. « Does Valuing Happiness Lead to Well-Being? » Huang, K.-J. (seul auteur), *Psychological
  Science* 35(10), 1155-1163 ; en ligne le 2024-08-20. Ni correction ni rétractation.
- **D'où viennent les chiffres** : le résumé **publié** est disponible chez Crossref, OpenAlex et Europe PMC (PubMed
  39163533), identique dans les trois : N = 8 331, 2019 à 2023. La prépublication OSF (10.31219/osf.io/3vksb, déposée le
  2024-07-27) porte **les mêmes chiffres**, à des mots près (« one year later » / « 1 year later » ; « but not
  necessarily » / « but may not necessarily »). La phrase de l'écrivain dit « 1 year later » : **elle vient du résumé
  publié**, pas de la prépublication. Les β cités plus bas viennent, eux, du texte entier de la prépublication (le texte
  publié n'a pas été lu). Une reproduction computationnelle de l'Institute for Replication (Brodeur, OSF
  10.17605/osf.io/9yve3, 2026) existe ; la réponse de l'auteur indique que les résultats ont été reproduits.
- **Plan** : **longitudinal** (panel LISS, cinq vagues annuelles, modèles RI-CLPM et effets fixes), observationnel.
  (Texte entier : analyse préenregistrée = satisfaction de vie ; les modèles d'affect positif et négatif sont
  **exploratoires**.)
- **Mesure** (texte entier) : **un seul item** : « Which values act as a guiding principle in your life…? Happiness. »
  (1-7, importance). Aucun item de souci : c'est le « vouloir » à l'état pur.
- **Population** : adultes néerlandais d'un panel de population, N = 8 331. Aucun échantillon arabe.
- **Résultat principal** : ceux qui valorisent le bonheur ont en général **plus** de bien-être ; quand une personne se
  met à le valoriser davantage, sa satisfaction de vie ne change pas un an plus tard, et son affect positif comme négatif
  augmentent un peu ; au même moment, valoriser le bonheur va avec plus de bien-être.
- **Taille d'effet** : pas dans le résumé. (Prépublication : corrélations de départ r = 0,15 avec la satisfaction,
  0,20 avec l'affect positif, −0,16 avec l'affect négatif ; effets décalés minuscules, β = 0,04 vers l'affect positif et
  0,02 vers l'affect négatif ; effets fixes β = 0,05, 0,09, −0,05.)
- **Constats de la fiche** :
  - `higher-well-being` — phrase de résultat : « Random-intercept cross-lagged panel models indicated that those who
    valued happiness generally exhibited higher well-being as manifested by life satisfaction, more positive affect, and
    less negative affect. » Même phrase que l'écrivain ; même sens (différence entre personnes). `association` : juste.
  - `no-later-change` — phrase de résultat : « However, increases in valuing happiness did not result in changes in life
    satisfaction 1 year later and had mixed emotional consequences (i.e., increasing both positive and negative
    affect). » Même phrase ; même sens. Nuance : la partie affect est exploratoire et minuscule (β ≤ 0,04) ; « result in »
    reste un langage causal sur des données d'observation, à ne pas reprendre comme une cause.
- **c1 : contradicts** — sur un grand panel, avec une mesure du seul « vouloir », le lien est **positif**.
- **c2 : contradicts (indirect)** — valoriser davantage n'est suivi d'aucune baisse de satisfaction un an après ;
  observationnel, et l'exposition est la valeur accordée, pas la recherche active.
- **c3 : contradicts** — l'item d'importance seul ne va pas avec moins de bien-être ; l'auteur attribue lui-même les
  liens négatifs antérieurs aux items de souci (texte entier, en citant Luhmann 2016 et Zerwas & Ford 2021).

## 6. 10.1016/j.jrp.2015.11.003 (luhmann-2016-factors)

- **Identité** : confirmée. « Is valuing happiness associated with lower well-being? A factor-level analysis using the
  Valuing Happiness Scale. » Luhmann, M. (premier auteur ; Necka, Schönbrodt, Hawkley), *Journal of Research in
  Personality* 60, 46-50 ; en ligne en novembre 2015 (d'où 2015 chez OpenAlex), numéro de février 2016. Ni correction ni
  rétractation. Prépublication liée (10.31219/osf.io/wcgk9).
- **Plan** : **transversal** ; analyse factorielle et méta-analyse des données individuelles de six échantillons
  regroupés (recueillis pour d'autres buts). Pas une revue systématique.
- **Population** : N = 938 (résumé). (Texte entier : quatre échantillons américains d'Amazon MTurk, un échantillon
  allemand, des étudiants d'une université américaine.) Aucun échantillon arabe.
- **Résultat principal** : l'échelle VHS a trois facteurs ; un seul va avec moins de bien-être ; les deux autres vont
  avec rien ou avec plus. (Texte entier : le facteur négatif, ce sont **deux items de souci** : « If I don't feel happy,
  maybe there is something wrong with me » et « I am concerned about my happiness even when I feel happy » ; le facteur
  d'**importance** (« Feeling happy is extremely important to me », « To have a meaningful life, I need to feel happy most
  of the time ») va avec un peu plus d'affect positif, r = 0,11, et rien d'autre ; l'item 4, « I would like to be happier
  than I generally am », est écarté parce qu'il mesure le malheur présent.)
- **Taille d'effet** : pas dans le résumé. (Texte entier : facteur de souci r = −0,21 avec l'affect positif, +0,29 avec
  l'affect négatif, −0,15 avec la satisfaction, +0,34 avec la solitude.)
- **Constats de la fiche** :
  - `one-factor-of-three` — phrase de résultat : « Exploratory and confirmatory factor analysis showed that the Valuing
    Happiness Scale is not unidimensional and that only one of its three factors correlates negatively with various
    indicators of well-being, whereas non-significant or positive correlations were found for the other factors. » Même
    phrase que l'écrivain ; même sens.
  - `not-necessarily-bad` — phrase de **conclusion** : « These findings indicate that valuing happiness may not
    necessarily be bad for one's well-being, and call for a better definition, theoretical foundation, and
    operationalization of this construct. » Même phrase, rôle `conclusion` bien déclaré. Le texte du constat perd la
    réserve « may » (« is not necessarily bad ») : légère surenchère, à rétablir.
- **Écart de fiche** : population « countries not given » : le texte entier dit États-Unis (5) et Allemagne (1). Les
  auteurs préviennent (texte entier) que leurs facteurs à deux items ne sont pas des dimensions validées.
- **c1 : nuances** — le lien négatif de c1 ne tient que pour le facteur de souci.
- **c2 : irrelevant**.
- **c3 : contradicts** — c'est le test le plus direct au niveau des items : l'importance accordée au bonheur ne pèse pas ;
  le souci, si. Transversal ; les auteurs envisagent aussi le sens inverse (le mal-être fait s'inquiéter).

## 7. 10.1080/17439760.2012.747000 (ferguson-2012-trying)

- **Identité** : confirmée. « Trying to be happier really can work: Two experimental studies. » Ferguson, Y. L. (premier
  auteur ; Sheldon), *The Journal of Positive Psychology* 8(1), 23-33 ; en ligne le 2012-12-19, numéro de janvier 2013
  (année 2012 de la fiche : dans la tolérance ± 1). Ni correction ni rétractation.
- **Résumé** : absent de Crossref et d'Europe PMC (non indexé) ; lu chez OpenAlex seulement.
- **Plan** : deux **expériences** (consigne d'essayer d'être plus heureux vs simple écoute) ; étude 2 sur cinq visites
  en deux semaines.
- **Population** : effectifs et pays absents du résumé ; affiliations américaines (Knox College, University of Missouri).
  Texte entier non lu. Aucun échantillon arabe connu.
- **Résultat principal** : essayer de se rendre plus heureux en écoutant de la musique positive augmente l'humeur
  positive et, sur deux semaines, le bonheur subjectif, plus que la seule écoute ; pas avec une musique non positive.
- **Taille d'effet** : non donnée.
- **Constats de la fiche** :
  - `trying-helps` — phrase de résultat : « Study 1 showed that participants assigned to try to boost their mood while
    listening to 12 min of music reported higher positive mood compared to participants who simply listened to music
    without attempting to alter mood. » Même phrase que l'écrivain ; même sens.
  - `only-positive-music` — phrase de résultat : « However, this effect was qualified by the predicted interaction: the
    music had to be positively valenced (i.e. Copland, not Stravinsky). » Même phrase ; même sens (« unsettling » pour
    Stravinsky ne vient pas du résumé).
  - `two-weeks` — phrase de résultat : « In Study 2, participants who were instructed to intentionally try to become
    happier (vs. not trying) reported higher increases in subjective happiness after listening to positively valenced
    music during five separate lab visits over a two-week period. » Même phrase ; même sens.
- **Écart de fiche** : `n: null` (non donné dans le résumé ; le texte entier n'a pas été lu).
- **c1 : irrelevant**.
- **c2 : contradicts** — deux expériences où chercher activement le bonheur, avec une activité positive, rend plus
  heureux. Limites : effet de demande possible (on dit aux gens d'essayer d'être heureux, puis on leur demande s'ils le
  sont), effectifs inconnus, étudiants américains.
- **c3 : nuances (penche contre)** — l'effort pour être heureux n'est pas nuisible en soi quand il passe par une activité
  ; mais « essayer » n'est pas « valoriser ».

## 8. 10.3758/s13423-018-1436-7 (kim-2018-time)

- **Identité** : confirmée. « Vanishing time in the pursuit of happiness. » Kim, A. (premier auteur ; Maglio),
  *Psychonomic Bulletin & Review* 25(4), 1337-1342 ; en ligne le 2018-03-09. Ni correction ni rétractation.
- **Résumé** : absent de Crossref et d'OpenAlex ; lu chez Europe PMC (PubMed 29524087).
- **Plan** : étude 1 transversale (trait) ; études 2, 3, 4 **expériences** ; étude 4 préenregistrée (AsPredicted).
  (Texte entier : l'étude 4 compare « écrire 10 choses qui pourraient me rendre plus heureux » à « écrire 10 choses qui
  montrent que je suis heureux » : le contrôle n'est pas neutre, il fait se sentir déjà arrivé.)
- **Population** : non donnée dans le résumé. (Texte entier : MTurk, N = 113, 319 et 96 ; étudiants, N = 117 ; pays non
  précisé, auteurs aux États-Unis et au Canada.) Aucun échantillon arabe.
- **Résultat principal** : chercher le bonheur, mesuré ou induit, donne le sentiment d'avoir moins de temps ; dans
  l'étude 4, chercher le bonheur baisse le bonheur, en partie par ce manque de temps.
- **Taille d'effet** : pas dans le résumé. (Texte entier, étude 4 : bonheur 4,38 vs 5,10, d = 0,56 ; effet indirect par
  le temps b = −0,12, IC 95 % [−0,27 ; −0,01].)
- **Constats de la fiche** :
  - `less-time` — phrase de résultat : « Four studies demonstrated that trait-level happiness seeking (Study 1) as well
    as direct manipulation of happiness seeking (Studies 2, 3, and 4) consistently reveal the same pattern: reduced
    feelings of time availability while pursuing happiness. » Même phrase que l'écrivain ; sens proche, mais le constat
    dit « made people feel… measured or induced » : « made » est causal, ce qui n'est vrai que pour les trois études
    induites, pas pour l'étude 1 mesurée.
  - `less-happiness` — phrase de résultat : « In addition, pursuing happiness can ultimately decrease happiness, in
    part, by reducing perceptions of time availability (Study 4)… » Même phrase. Le résumé dit « can » ; le constat dit
    « lowered » (c'est exact pour l'étude 4, mais une seule expérience de 96 personnes, contre un contrôle actif).
- **Écart de fiche** : `n: null` ; texte entier : 113, 117, 319 réponses, 96.
- **c1 : irrelevant** — l'étude 1 relie la recherche du bonheur au temps, pas au bien-être.
- **c2 : supports** (faible) — une expérience préenregistrée, petite, contre un contrôle qui fait se sentir heureux.
- **c3 : nuances (léger appui)** — un chemin autre que le souci (le manque de temps) ; mais le souci n'est pas mesuré,
  on ne peut donc pas dire que ce n'est « pas seulement » le souci.

## 9. 10.1177/0956797618761660 (rohrer-2018-social)

- **Identité** : confirmée. « Successfully Striving for Happiness: Socially Engaged Pursuits Predict Increases in Life
  Satisfaction. » Rohrer, J. M. (premier auteur ; Richter, Brümmer, Wagner, Schmukle), *Psychological Science* 29(8),
  1291-1298 ; en ligne le 2018-05-18. Ni correction ni rétractation.
- **Plan** : **longitudinal** observationnel, un an, hypothèse préenregistrée (texte entier : enregistrée après la
  collecte 2014-2015, avant l'analyse).
- **Population** : échantillon représentatif allemand (résumé). (Texte entier : SOEP Innovation Sample, 2014 → 2015.)
  n = 1 178, puis 582. Aucun échantillon arabe.
- **Résultat principal** : avoir des projets actifs pour être plus satisfait ne change rien en soi un an plus tard ;
  parmi eux, les projets sociaux (plus de temps avec amis et famille) vont avec une hausse de satisfaction, en partie via
  plus de vie sociale.
- **Taille d'effet** : non donnée dans le résumé.
- **Constats de la fiche** :
  - `per-se-neutral` — phrase de résultat : « Active pursuits per se—as opposed to statements about external
    circumstances or fortune—were not associated with changes in life satisfaction (n = 1,178). » Même phrase que
    l'écrivain ; même sens.
  - `social-pursuits` — phrase de résultat : « However, in line with our preregistered hypothesis, among individuals who
    described active pursuits (n = 582), those who described social ideas (e.g., spending more time with friends and
    family) ended up being more satisfied, and this effect was partly mediated by increased socializing. » Même phrase ;
    même sens. `association` : juste.
- **c1 : irrelevant** — l'exposition est le contenu d'un projet, pas la valeur accordée au bonheur.
- **c2 : contradicts (indirect)** — chercher activement n'est suivi d'aucune baisse ; chercher par les autres est suivi
  d'une hausse. Observationnel.
- **c3 : nuances (penche contre)** — la manière compte, pas le fait de chercher.

## 10. 10.1037/xge0000108 (ford-2015-culture)

- **Identité** : confirmée. « Culture shapes whether the pursuit of happiness predicts higher or lower well-being. »
  Ford, B. Q. (premier auteur ; 12 auteurs dont Tamir et Mauss), 2015, *Journal of Experimental Psychology: General*
  144(6), 1053-1062. Ni correction ni rétractation.
- **Plan** : **transversal**, quatre régions ; aucune manipulation.
- **Population** : États-Unis, Allemagne, Russie, Asie de l'Est (résumé). (Texte entier : N = 786, surtout des
  étudiants : 307 Denver, 91 Tübingen, 184 Moscou et Tomsk, 204 Kyoto et Taïwan.) Deux auteurs à Tel-Aviv et à
  Jérusalem, mais aucun échantillon israélien ni arabe.
- **Mesure** (texte entier) : la VHS **sans** les items 4 (« I would like to be happier… ») et 5 (« Feeling happy is
  extremely important to me »), retirés faute d'invariance : la mesure la plus pure du « vouloir » est absente.
- **Résultat principal** : la motivation à rechercher le bonheur va avec moins de bien-être aux États-Unis, sans lien
  en Allemagne, avec plus de bien-être en Russie et en Asie de l'Est, ce qu'explique une définition plus sociale du
  bonheur dans ces deux régions.
- **Taille d'effet** : pas dans le résumé. (Texte entier : r = −0,26 États-Unis, −0,11 n.s. Allemagne, +0,31 Russie,
  +0,25 Asie de l'Est.)
- **Constat de la fiche** :
  - `depends-on-culture` — phrase de résultat : « Motivation to pursue happiness predicted lower well-being in the United
    States, did not predict well-being in Germany, and predicted higher well-being in Russia and in East Asia. » Même
    phrase que l'écrivain ; même sens. « Wanting to be happy » paraphrase « motivation to pursue happiness » : acceptable,
    mais l'item d'importance a été retiré de la mesure. La première phrase du résumé (« Pursuing happiness can
    paradoxically impair well-being ») est un rappel de contexte, pas un résultat : l'écrivain ne s'en sert pas.
- **Écart de fiche** : `n: null` ; texte entier : 786.
- **c1 : nuances** — c1 ne vaut qu'aux États-Unis ; contredit en Russie et en Asie de l'Est. **Pour un public égyptien,
  c'est la source la plus parlante** : si l'explication par le collectivisme tient, le sens pourrait même s'inverser ;
  non testé dans un pays arabe.
- **c2 : irrelevant**.
- **c3 : nuances (penche contre)** — la différence tient à la manière (sociale ou non) de chercher le bonheur.

## 11. 10.1037/emo0001381 (zerwas-2024-concern)

- **Identité** : confirmée. « Unpacking the pursuit of happiness: Being concerned about happiness but not aspiring to
  happiness is linked with negative meta-emotions and worse well-being. » Zerwas, F. K. (premier auteur ; Ford, John,
  Mauss), 2024, *Emotion* 24(8), 1789-1802. Ni correction ni rétractation.
- **Plan** : transversal (études 1a, 1b), **longitudinal** (étude 2), journal quotidien (étude 3) ; aucune manipulation.
- **Population** : étudiants et adultes de la communauté, 2009-2020, divers en genre, ethnie, âge et lieu, N = 1 815 ;
  pays non précisés dans le résumé (texte entier non accessible). Aucun échantillon arabe signalé.
- **Résultat principal** : aspirer au bonheur et s'en soucier sont deux différences distinctes ; seul le souci va avec
  moins de bien-être, transversalement et dans le temps, en partie via des méta-émotions négatives pendant les bons
  moments.
- **Taille d'effet** : non donnée.
- **Constats de la fiche** :
  - `concern` — phrase de résultat : « In Study 2, concern about happiness (but not aspiring to happiness) was associated
    with lower well-being cross-sectionally and longitudinally. » Même phrase que l'écrivain ; même sens. Attention à ne
    pas s'appuyer sur « This model predicts that aspiring to happiness is relatively innocuous » ni sur « being concerned
    about happiness leads people to judge… » : ce sont des hypothèses du modèle, pas des résultats.
  - `meta-emotions` — phrase de résultat : « In Study 3, these links between concern about happiness and worse well-being
    were partially accounted for by experiencing greater negative meta-emotions during daily positive events. » Même
    phrase ; même sens. `association` : juste.
- **c1 : nuances** — le « vouloir » (aspirer) n'est pas lié ; seul le souci l'est.
- **c2 : irrelevant**.
- **c3 : contradicts** — le test qui sépare le mieux vouloir et souci, avec un suivi dans le temps : le vouloir ne pèse
  pas. Limite : même réseau que Mauss 2011, Ford 2014 et Ford 2015.

---

## Tableau final

| DOI | c1 vouloir ↔ moins de bien-être | c2 chercher → moins heureux | c3 le vouloir lui-même pèse |
|---|---|---|---|
| 10.1037/a0022010 (Mauss 2011) | supports (faible) | supports | nuances (penche contre) |
| 10.1521/jscp.2014.33.10.890 (Ford 2014) | supports (faible) | irrelevant | irrelevant |
| 10.1007/s10902-019-00193-9 (Mahmoodi Kahriz 2019) | supports (faible) | irrelevant | irrelevant |
| 10.5334/pb.1036 (Hansenne 2021) | supports (faible) | irrelevant | nuances (penche contre) |
| 10.1177/09567976241263784 (Huang 2024) | contradicts | contradicts (indirect) | contradicts |
| 10.1016/j.jrp.2015.11.003 (Luhmann 2016) | nuances | irrelevant | contradicts |
| 10.1080/17439760.2012.747000 (Ferguson 2012) | irrelevant | contradicts | nuances (penche contre) |
| 10.3758/s13423-018-1436-7 (Kim 2018) | irrelevant | supports (faible) | nuances (léger appui) |
| 10.1177/0956797618761660 (Rohrer 2018) | irrelevant | contradicts (indirect) | nuances (penche contre) |
| 10.1037/xge0000108 (Ford 2015) | nuances | irrelevant | nuances (penche contre) |
| 10.1037/emo0001381 (Zerwas 2024) | nuances | irrelevant | contradicts |

## Écarts avec les fiches, à corriger

1. `mauss-2011-seeking` / `disappointment` : `kind: causal` → `association` (médiateur mesuré ; les auteurs : « can only
   hint at mechanism » ; médiation absente avec la mesure implicite).
2. `hansenne-2021-replication` / `valuing-partly-worse` : « on some measures » ne suit pas « partly » ; le texte entier
   donne les quatre mesures dans le même sens, plus faiblement. Population : Belgique francophone.
3. `luhmann-2016-factors` / `not-necessarily-bad` : rendre le « may » du résumé. Population : États-Unis (5), Allemagne (1).
4. `kim-2018-time` / `less-time` : « made people feel » ne vaut que pour les études induites.
5. `n` manquants (texte entier) : Ford 2014, 98 + 61 ; Kim 2018, 113 + 117 + 319 + 96 ; Ford 2015, 786 ; Ferguson 2012,
   non connu. `mahmoodi-kahriz-2019-uk` : `declared.venue` vide (*Journal of Happiness Studies*) ; ajouter aux limites la
   présence de quelques participants du Moyen-Orient et de Mauritanie, non analysés à part.
6. Aucune phrase de contexte utilisée comme résultat dans les 23 `support.sentence` ; les 22 phrases de résultat et la
   phrase de conclusion de Luhmann sont recopiées mot pour mot du résumé publié.

## Lecture d'ensemble (mon avis indépendant, sans le verdict de l'écrivain)

**c1 — mêlée ; certitude basse.** Les études qui soutiennent c1 utilisent toutes l'échelle VHS de Mauss et sont
transversales (Mauss 2011 étude 1, seulement sous stress faible ; Ford 2014 ; Mahmoodi Kahriz 2019 ; Hansenne 2021 ;
Ford 2015 aux États-Unis seulement). Or cette échelle mêle trois choses : l'importance du bonheur, le souci de ne pas
l'être, et un item (« I would like to be happier than I generally am ») qui mesure le malheur présent (Luhmann 2016).
Dès que le « vouloir » est mesuré seul, le lien disparaît ou s'inverse : Huang 2024 (panel longitudinal, N = 8 331,
plus de bien-être), Luhmann 2016 (facteur d'importance nul ou positif), Zerwas 2024 (aspirer : aucun lien). La preuve
contraire de Huang vient d'un rang supérieur (longitudinal) à celles qui soutiennent (transversales) : la direction
« soutient » est interdite (§3). Ford 2015 ajoute que le sens dépend de la culture (positif en Russie et en Asie de
l'Est). Ce qui tient, faiblement : « se soucier de son bonheur va avec moins de bien-être, surtout dans des pays
individualistes ».

**c2 — mêlée ; certitude basse.** Deux expériences vont dans le sens de c2 : Mauss 2011 étude 2 (69 femmes, une
induction d'un texte, un film joyeux) et Kim 2018 étude 4 (96 personnes, contre un contrôle qui fait se sentir déjà
heureux). Deux expériences vont contre : Ferguson 2012 (essayer d'être plus heureux en écoutant une musique positive
rend plus heureux, y compris sur deux semaines). Une preuve contraire de même rang interdit « soutient » (§3). Les suivis
d'observation ne montrent aucun tort : Huang 2024 (valoriser davantage, aucune baisse un an après), Rohrer 2018
(chercher en soi, aucun changement ; chercher par les autres, une hausse). Tout est petit, en laboratoire ou indirect,
sans réplication directe au dossier, et occidental. Lecture la plus juste : chercher le bonheur peut se retourner contre
soi dans certaines conditions (surveiller ses sentiments pendant un bon moment), et aider dans d'autres (une activité
positive, une recherche tournée vers les autres). Plafond causal possible : modéré par le plan, ramené à **basse** pour
incohérence, imprécision et caractère indirect.

**c3 — contredite ; certitude basse (modérée défendable).** Les trois sources qui séparent vraiment « vouloir » et
« s'inquiéter » disent la même chose, et elles viennent de trois groupes différents : Zerwas 2024 (aspirer : pas de
lien ; souci : lien, aussi dans le temps), Luhmann 2016 (seuls les deux items de souci portent le lien négatif), Huang
2024 (l'importance seule va avec plus de bien-être). Les auteurs de Mauss 2011 le disent eux-mêmes dans leur discussion :
le problème vient de la façon d'évaluer ses progrès, pas du but. Le seul léger appui à c3 est Kim 2018 (un chemin par le
manque de temps), qui n'a pas mesuré le souci. Je descends à basse parce que la séparation repose surtout sur des
corrélations, des mesures neuves ou à un seul item, et Zerwas appartient au même réseau que la thèse d'origine ; un
relecteur pourrait garder modérée vu la convergence de groupes indépendants. Dans les deux cas, l'idée du livre telle que
c3 la formule (« le vouloir lui-même ») n'est pas soutenue ; sa version restreinte (« le souci et le jugement de son
propre bonheur pèsent ») l'est, faiblement.

**Ce qui en découle selon `docs/verdict.md`** : aucune affirmation n'atteint une certitude modérée avec une direction
nette ; le verdict ne peut pas être ✅ ni ❌ (§4, certitude basse) ; un hook ne peut pas affirmer que « vouloir le bonheur
rend malheureux » (§5) ; il peut le poser en question. Les verbes causaux (« بيخلّي », « بيسبب ») sont à refuser sur c1.

**Applicabilité** : aucun échantillon arabe analysé ; seuls quelques étudiants du Moyen-Orient et de Mauritanie sont
fondus dans le groupe « non-British » de Mahmoodi Kahriz 2019 (où le lien restait positif). Ford 2015 montre que le sens
peut s'inverser hors des cultures individualistes : la phrase « معظم الدراسات من أمريكا وأوروبا » est obligatoire, et
c'est ici plus qu'une formalité.

**Indépendance des preuves** : 4 sources sur 11 viennent du réseau Mauss/Ford (Mauss 2011, Ford 2014, Ford 2015, Zerwas
2024). Une revue narrative récente des mêmes auteurs existe (Mauss & Ford, « The pursuit of happiness: pitfalls and
promises », *Trends in Cognitive Sciences*, 2026, 10.1016/j.tics.2026.03.001), trouvée en passant, non lue : à signaler
à l'agent contre-preuve, qui jugera si elle change quelque chose.

---

Fichiers lus dans le dépôt : `CLAUDE.md`, `docs/verdict.md`, `reports/feeling-bad-about-feeling-bad/blind-review.md` (le
modèle), et les 11 fiches `content/sources/*.json` dans l'ordre décrit plus haut (la fiche de Mauss 2011 entière, par
erreur, avant mon jugement). Non lus : `*.verify.json`, le dossier de l'écrivain dans le scratchpad, `docs/conception.md`.
Dépôt : un seul fichier créé, ce rapport ; rien d'autre de modifié, aucune commande git.
