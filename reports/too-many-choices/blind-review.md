# Relecture aveugle des sources — « too-many-choices » (Manson : plus d'options rendent moins satisfait ; s'engager rend plus heureux)

Relu le 2026-11-22. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis de correction ou de rétractation qui pointent vers l'article), OpenAlex
`/works/doi:<doi>` (`abstract_inverted_index` reconstitué), Europe PMC `search … resultType=core` (`abstractText` ; seuls
Gilbert 2002, Li 2022 et Inglehart 2008 y sont indexés, avec le même résumé). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind2/raw/`. Trois textes entiers en accès
libre ont été lus en plus, pour la population, le plan et les contrôles : Li 2022 (BioC, NCBI, PMC9384371), Szrek 2017
(PDF de Cambridge, accès libre) et Scheibehenne 2010 (version publiée, archive ouverte de l'université de Genève) ;
c'est signalé « (texte entier) ». Tout le reste vient du résumé seul (Chernev 2015, Iyengar 2000, Haynes 2009, D'Angelo
2016, Gilbert 2002, Shiner 2015, Inglehart 2008, Markus 2010 : fermés).

Affirmations :
- **c1** : plus d'options parmi lesquelles choisir → moins de satisfaction pour ce qu'on a choisi (adultes, grand
  assortiment contre petit).
- **c2** : plus d'options → on choisit moins souvent, on remet le choix à plus tard.
- **c3** : s'engager (un choix irréversible, moins d'alternatives gardées ouvertes) → plus de satisfaction pour ce choix.
- **c4** : plus de liberté de choix dans sa vie → moins de bonheur.

Vérification d'identité commune aux 12 DOI : Crossref `updated-by`, `update-to` et `relation` absents ; aucun document
Crossref ne déclare mettre à jour l'un d'eux (`filter=updates:` : 0 résultat pour chacun) ; OpenAlex `is_retracted:
false` pour tous. **Aucun avis de correction ni de rétractation trouvé.** Titre, premier auteur et année concordent entre
Crossref et OpenAlex pour les 12 (année de mise en ligne et année du numéro à ± 1 : Chernev, en ligne 2014-08-29,
numéro 25(2) de 2015 ; D'Angelo, en ligne 2016-02-16, numéro 20(1) de 2017).

Méthode : pour chaque fiche, seuls `id`, `doi` et `findings[].text` ont été lus avant le résumé ; `support.sentence`
(avec `role` et `where`) seulement après avoir choisi soi-même la phrase du résumé. Les autres champs des fiches
(`design`, `population`, `mena`, `limits`, `allegiance`…) n'ont pas été ouverts (leurs noms seuls ont été vus en listant
les clés).

---

## 1. 10.1037/0022-3514.79.6.995 (iyengar-2000-demotivating)

- **Identité** : confirmée. « When choice is demotivating: Can one desire too much of a good thing? » Iyengar, S. S.
  (premier auteur ; Lepper), 2000, *Journal of Personality and Social Psychology* 79(6), 995-1006. Article de recherche.
  Ni correction ni rétractation.
- **Plan** : **trois expériences**, terrain et laboratoire (6 options contre 24 ou 30). Plafond : modéré.
- **Population** : États-Unis (OpenAlex ; codées « United States » dans le tableau 1 de Scheibehenne 2010, texte entier :
  clients d'un supermarché haut de gamme pour les confitures, étudiants pour les dissertations et les chocolats). Effectifs
  absents du résumé (Scheibehenne 2010, texte entier : N = 249 pour les confitures, 67 pour les chocolats). Aucun
  échantillon arabe.
- **Résultat principal** : avec 6 options plutôt que 24 ou 30, on achète plus souvent (confitures, chocolats), on fait
  plus souvent le devoir facultatif, et on est plus satisfait ensuite de ce qu'on a choisi.
- **Taille d'effet** : absente du résumé. (Scheibehenne 2010, texte entier : 30 % d'achats contre 3 % pour les
  confitures ; d = 0,77 et 0,88, parmi les plus grands effets de toute la méta-analyse.)
- **Réplication** (Scheibehenne 2010, texte entier) : la réplication directe des confitures dans un supermarché haut de
  gamme en Allemagne ne trouve rien (Scheibehenne 2008, d = 0,02, N = 504) ; chocolats (Greifeneder 2008, d = −0,20) et
  bonbons (Scheibehenne 2008, d = −0,27) non plus.
- **Finding `fewer-options-buy`** — phrase du résumé : « These experiments, which were conducted in both field and
  laboratory settings, show that people are more likely to purchase gourmet jams or chocolates or to undertake optional
  class essay assignments when offered a limited array of 6 choices rather than a more extensive array of 24 or 30
  choices. » Phrase de résultat. **Écrivain : même phrase, même sens. Rien à redire.**
- **Finding `more-satisfied`** — phrase du résumé : « Moreover, participants actually reported greater subsequent
  satisfaction with their selections and wrote better essays when their original set of options had been limited. »
  Phrase de résultat. **Écrivain : même phrase, même sens.** (Le résumé ne dit pas dans quelle étude la satisfaction est
  mesurée ni sur combien de personnes : le texte de la fiche ne l'affirme pas non plus.)
- **c1 : supports** — expérience, satisfaction plus haute avec le petit choix. Limites : effet le plus fort du domaine,
  non répliqué tel quel ; produits exotiques choisis pour éviter les préférences établies.
- **c2 : supports** — c'est le résultat d'origine de c2 (on achète moins quand il y a 24 confitures). Limite : échec de
  la réplication directe en Allemagne.
- **c3 : irrelevant**. **c4 : irrelevant**.

## 2. 10.1086/651235 (scheibehenne-2010-overload)

- **Identité** : confirmée. « Can There Ever Be Too Many Options? A Meta-Analytic Review of Choice Overload »
  Scheibehenne, B. (premier auteur ; Greifeneder, Todd), 2010, *Journal of Consumer Research* 37(3), 409-425.
  Méta-analyse. Ni correction ni rétractation.
- **Plan** : **méta-analyse** (effets aléatoires + méta-régression) de 63 conditions issues de 50 expériences publiées et
  non publiées, N = 5 036 (texte entier : seulement des expériences randomisées où le nombre d'options est manipulé).
  Plafond : haut.
- **Population** (texte entier) : expériences menées aux États-Unis, en Europe, en Asie et en Australie ; aucune au
  Moyen-Orient ou en Afrique du Nord n'est nommée. Pas de différence entre études faites aux États-Unis et ailleurs
  (b = −0,08, p = 0,54).
- **Résultat principal** : effet moyen nul, forte hétérogénéité ; des préconditions possibles mais aucune condition
  suffisante.
- **Taille d'effet** (texte entier) : D = 0,02 (IC 95 % −0,09 à 0,12) ; I² = 68 % ; après retrait des 20 % extrêmes,
  D = 0,001 (I² = 22 %). Méta-régression : les personnes qui ont des préférences établies ou de l'expertise profitent de
  plus d'options (b = −0,50, p = 0,013) ; satisfaction ou choix comme mesure : pas de différence (b = 0,06, p = 0,58) ;
  léger biais de publication (articles publiés plus favorables à l'effet, b = 0,27 ; effet qui baisse avec l'année).
- **Finding `virtually-zero`** — phrase du résumé : « In a meta-analysis of 63 conditions from 50 published and
  unpublished experiments (N = 5,036), we found a mean effect size of virtually zero but considerable variance between
  studies. » Phrase de résultat. **Écrivain : même phrase.** **Légère extension** : le texte de la fiche découpe l'effet
  en deux (« did not lower satisfaction with the choice or the wish to choose ») ; la phrase ne donne qu'un effet moyen
  regroupé (satisfaction, probabilité de choisir, consommation, force de préférence). C'est défendable par le texte entier
  (la mesure ne modère pas l'effet), pas par la phrase seule.
- **Finding `no-sufficient-condition`** — phrase du résumé : « While further analyses indicated several potentially
  important preconditions for choice overload, no sufficient conditions could be identified. » Phrase de résultat.
  **Écrivain : même phrase.** **Sens légèrement déplacé** : « Some conditions seemed to make too many options harmful »
  lit « preconditions » comme des conditions qui produisent l'effet ; le texte entier les décrit comme nécessaires mais
  pas suffisantes (pas de préférence établie, pas d'option dominante). Formulation plus juste : « some conditions seemed
  necessary for too many options to hurt, but none was found that reliably produces the effect ».
- **Indépendance** (texte entier, tableau 1) : Iyengar 2000, Haynes 2009 et Scheibehenne 2009 font partie des 63
  conditions. Les compter à côté de cette méta-analyse, c'est compter deux fois les mêmes données.
- **c1 : contradicts** (en moyenne) — pas d'effet moyen sur la satisfaction ; seulement sous des conditions qu'on ne sait
  pas prédire.
- **c2 : contradicts** (en moyenne) — même résultat pour la probabilité de choisir (même méta-analyse, même absence de
  différence entre mesures).
- **c3 : irrelevant**. **c4 : irrelevant**.

## 3. 10.1016/j.jcps.2014.08.002 (chernev-2015-overload)

- **Identité** : confirmée. « Choice overload: A conceptual review and meta-analysis » Chernev, A. (premier auteur ;
  Böckenholt, Goodman), *Journal of Consumer Psychology* 25(2), 333-358 ; en ligne le 2014-08-29, numéro de 2015.
  Méta-analyse. Ni correction ni rétractation.
- **Plan** : **méta-analyse** de 99 observations (N = 7 202) avec méta-régression sur quatre modérateurs codés au niveau
  des études. Plafond : haut. (Les modérateurs ne sont pas manipulés : ce sont des caractéristiques d'études comparées
  entre elles.)
- **Population** : non précisée dans le résumé (auteurs aux États-Unis). Aucun échantillon arabe signalé.
- **Résultat principal** : la complexité de l'assortiment, la difficulté de la tâche, l'incertitude sur ses préférences
  et le but de décider avec peu d'effort augmentent l'effet ; quatre mesures (satisfaction/confiance, regret, report du
  choix, envie de changer) sont équivalentes ; une fois ces modérateurs dans le modèle, l'effet global est significatif.
- **Taille d'effet** : absente du résumé (ni l'effet global, ni celui des modérateurs).
- **Finding `four-moderators`** — phrase du résumé : « We further show that each of these four factors has a reliable and
  significant impact on choice overload, whereby higher levels of decision task difficulty, greater choice set
  complexity, higher preference uncertainty, and a more prominent, effort-minimizing goal facilitate choice overload. »
  Phrase de résultat. **Écrivain : même phrase, même sens.**
- **Finding `overall-significant`** — phrase du résumé : « Finally, we document that when moderating variables are taken
  into account the overall effect of assortment size on choice overload is significant—a finding counter to the data
  reported by prior meta-analytic research. » Phrase de résultat. **Écrivain : même phrase (tiret cadratin remplacé
  par un trait d'union).** **Surinterprétation** : « a larger assortment does lower satisfaction or the wish to choose
  overall » dit plus que « significant when moderating variables are taken into account » : c'est une estimation tirée
  d'un modèle à modérateurs, sans taille donnée, qui ne dit pas que l'effet moyen brut n'est pas nul ni qu'un grand
  assortiment de la vie courante fait baisser la satisfaction. Formulation plus juste : « once the four factors are in the
  model, the overall effect of assortment size is statistically significant (no size given in the abstract) ».
- **Indépendance** : les 99 observations viennent de « prior research » ; elles recouvrent très probablement Iyengar 2000
  et les études de Scheibehenne 2010 (non vérifiable sans le texte entier).
- **c1 : nuances** — soutient l'effet sous conditions (tâche difficile, préférences floues…), pas en général.
- **c2 : nuances** — le report du choix fait partie des quatre mesures équivalentes ; même réserve.
- **c3 : irrelevant**. **c4 : irrelevant**.

## 4. 10.1002/mar.20271 (scheibehenne-2009-moderators)

- **Identité** : confirmée. « What moderates the too-much-choice effect? » Scheibehenne, B. (premier auteur ;
  Greifeneder, Todd), *Psychology & Marketing* 26(3), 229-253 ; 2009. Ni correction ni rétractation.
- **Plan** : **trois expériences** (598 participants) qui manipulent la taille de l'assortiment, l'attrait des options et
  l'obligation de justifier son choix ; recherche d'information, expertise et tendance à maximiser mesurées (intra-sujets).
  Plafond : modéré.
- **Population** : non précisée dans le résumé (auteurs en Allemagne et aux États-Unis). (Scheibehenne 2010, texte entier,
  tableau 1 : dons à des associations, musique classique, restaurants ; études en Allemagne et aux États-Unis.)
- **Résultat principal** : seule l'obligation de justifier son choix modère l'effet ; les auteurs en concluent que
  l'étendue de l'effet est douteuse.
- **Taille d'effet** : absente du résumé. (Scheibehenne 2010, texte entier : les sept conditions de ces études vont de
  d = −0,31 à 0,39, cinq négatives, c'est-à-dire pas de surcharge ou un léger « plus, c'est mieux ».)
- **Finding `only-justification`** — phrase du résumé : « Overall, only choice justification proved to be an effective
  moderator, calling the extent of the too-much-choice effect into question. » Phrase de résultat (avec la conclusion
  des auteurs). **Écrivain : même phrase, même sens.**
- **c1 : nuances** (contre la généralité) — l'effet est rare et dépend surtout du fait d'avoir à se justifier.
- **c2 : nuances** — même raison (motivation à choisir comprise dans l'effet étudié).
- **c3 : irrelevant**. **c4 : irrelevant**.

## 5. 10.1002/mar.20269 (haynes-2009-boundaries)

- **Identité** : confirmée. « Testing the boundaries of the choice overload phenomenon: The effect of number of options
  and time pressure on decision difficulty and satisfaction » Haynes, G. A. (seul auteur), *Psychology & Marketing*
  26(3), 204-212 ; 2009. Ni correction ni rétractation.
- **Plan** : **une expérience** 2 × 2 (3 ou 10 lots × temps limité ou large), choix d'un lot pour un tirage. Plafond :
  modéré.
- **Population** : non précisée dans le résumé (auteur aux États-Unis). (Scheibehenne 2010, texte entier : N = 69,
  États-Unis, choix codé hypothétique, d = 0,48.)
- **Résultat principal** : avec 10 lots et peu de temps, la décision paraît plus difficile et frustrante ; 10 lots
  donnent moins de satisfaction (pas d'effet sur le regret).
- **Taille d'effet** : absente du résumé (d = 0,48 selon Scheibehenne 2010).
- **Finding `less-satisfied`** — phrase du résumé : « The larger set of alternatives led to less satisfaction, but not
  less regret, with people's decisions. » Phrase de résultat. **Écrivain : même phrase.** **Le texte de la fiche dit
  autre chose que la lettre** : « but not more regretful », alors que la phrase dit « but not *less* regret ». C'est
  probablement une coquille du résumé (le sens attendu est « pas plus de regret »), mais c'est une interprétation : à
  vérifier dans le texte entier, ou écrire « no difference in regret » sans trancher le sens.
- **Finding `time-pressure`** — phrase du résumé : « Participants given a limited amount of time to choose with a larger
  set of alternatives found their decisions to be more difficult and frustrating than did participants in the other
  conditions. » Phrase de résultat. **Écrivain : même phrase, même sens.**
- **c1 : supports** — expérience, moins de satisfaction avec 10 lots qu'avec 3. Limites : une étude, N ≈ 69, déjà dans
  Scheibehenne 2010.
- **c2 : irrelevant** — choix forcé, rien sur le report.
- **c3 : irrelevant**. **c4 : irrelevant**.

## 6. 10.1017/s1930297500005234 (szrek-2017-variety)

- **Identité** : confirmée. « How the number of options and perceived variety influence choice satisfaction: An
  experiment with prescription drug plans » Szrek, H. (seule autrice), 2017, *Judgment and Decision Making* 12(1),
  42-59. Ni correction ni rétractation.
- **Plan** : **expérience** (nombre de plans tiré au sort : 2, 5, 10 ou 16 ; deux scénarios par personne), choix
  hypothétiques ; l'analyse principale est une **régression** qui ajoute la variété perçue, mesurée après le choix.
  Plafond : modéré pour l'effet du nombre d'options ; l'effet « une fois la variété perçue prise en compte » n'est pas un
  effet randomisé (on contrôle une variable mesurée après la manipulation, sans doute un médiateur).
- **Population** (texte entier) : adultes de 65 ans et plus, panel internet Knowledge Networks, États-Unis, décembre
  2007 ; 294 répondants (taux de réponse 55 %), 545 observations. Aucun échantillon arabe.
- **Résultat principal** : une fois la variété perçue dans le modèle, le nombre d'options ne change pas la satisfaction
  pour le plan choisi, rend le choix plus difficile et le rend moins agréable.
- **Taille d'effet** (texte entier) : corrélation nombre de plans × satisfaction pour le plan choisi r = 0,07 (n.s.) ;
  **sans** la variété perçue, relation concave **positive** (de 5 à 10 plans : +3 % de satisfaction) ; difficulté perçue
  r = 0,15 ; l'effet sur le plaisir de choisir n'est significatif **qu'avec** la variété perçue dans le modèle.
- **Finding `process-not-outcome`** — phrase du résumé : « I find that once perceived variety is included in the model,
  the number of options (i) has no effect on perceived benefits and choice outcome satisfaction, (ii) increases perceived
  costs, and (iii) decreases choice process satisfaction. » Phrase de résultat. **Écrivain : même phrase, même sens.**
  Deux réserves : (1) « made choosing costlier » : les « perceived costs » sont la difficulté ressentie (« Did you find it
  difficult to make your decision? »), pas un coût ; « harder » est plus juste ; (2) « the process less satisfying » ne
  vaut que conditionnellement à la variété perçue (texte entier).
- **c1 : contradicts** — plus de plans ne baissent pas la satisfaction pour le plan choisi (effet brut nul à légèrement
  positif). Limites : choix hypothétiques, personnes âgées, assurance santé.
- **c2 : irrelevant** — choix forcé.
- **c3 : irrelevant**. **c4 : irrelevant**.

## 7. 10.1080/15213269.2015.1121827 (dangelo-2016-dating)

- **Identité** : confirmée. « There Are Plenty of Fish in the Sea: The Effects of Choice Overload and Reversibility on
  Online Daters' Satisfaction With Selected Partners » D'Angelo, J. D. (premier auteur ; Toma), *Media Psychology* 20(1),
  1-27 ; en ligne le 2016-02-16. Ni correction ni rétractation.
- **Plan** : **expérience** 2 × 2 (6 ou 24 profils × choix réversible ou non), satisfaction mesurée une semaine après.
  Plafond : modéré.
- **Population** : « online daters » ; effectif et recrutement absents du résumé (auteurs aux États-Unis). Aucun
  échantillon arabe signalé.
- **Résultat principal** : une semaine après, choisir parmi 24 profils plutôt que 6 donne moins de satisfaction et plus
  d'envie de changer ; la réversibilité seule ne change rien ; grand choix + réversible = les moins satisfaits.
- **Taille d'effet** : absente du résumé.
- **Finding `large-pool`** — phrase du résumé : « Drawing on the choice overload and decision reversibility theoretical
  frameworks, we show that, a week after making their selection, online daters who chose from a large set of potential
  partners (i.e., 24) were less satisfied with their choice than those who selected from a small set (i.e., 6), and were
  more likely to change their selection. » Phrase de résultat. **Écrivain : même phrase, même sens.**
- **Finding `reversibility-no-effect`** — phrase du résumé : « While choice reversibility did not affect daters'
  satisfaction, those who selected from a large pool and had the ability to reverse their choice were the least
  satisfied with their selected partner after one week. » Phrase de résultat. **Écrivain : même phrase (apostrophe
  droite).** **Légère surinterprétation** : « only daters with a large pool and a reversible choice were the least
  satisfied » — le « only » laisse entendre une interaction démontrée ; le résumé dit seulement que cette cellule est la
  plus basse.
- **c1 : supports** — expérience, une semaine de recul, domaine qui compte (un partenaire). Limites : effectif inconnu,
  une étude.
- **c2 : irrelevant** — « plus enclins à changer » n'est pas « choisir moins ou reporter ».
- **c3 : nuances** (penche contre) — la réversibilité n'a pas d'effet principal sur la satisfaction ; elle ne pèse
  qu'avec un grand choix.
- **c4 : irrelevant**.

## 8. 10.1037/0022-3514.82.4.503 (gilbert-2002-revisions)

- **Identité** : confirmée. « Decisions and revisions: The affective forecasting of changeable outcomes. » Gilbert, D. T.
  (premier auteur ; Ebert), 2002, *Journal of Personality and Social Psychology* 82(4), 503-514. Ni correction ni
  rétractation.
- **Plan** : **expériences** (étude 1 ; étude 2a, processus après la décision ; étude 2b, préférence pour la
  réversibilité). Plafond : modéré.
- **Population** : étudiants en photographie (étude 1) ; autres participants non décrits ; États-Unis (OpenAlex).
  Effectifs absents du résumé.
- **Résultat principal** : pouvoir changer d'avis fait moins aimer la photo choisie, freine les processus qui font aimer
  son choix, et pourtant la plupart veulent pouvoir changer d'avis.
- **Taille d'effet** : absente du résumé.
- **Finding `liked-less`** — phrase du résumé : « However, those who had the opportunity to change their minds liked
  their prints less than those who did not (Study 1). » Phrase de résultat. **Écrivain : même phrase, même sens.**
- **Finding `wanted-option`** — phrase du résumé : « Although the opportunity to change their minds impaired the
  postdecisional processes that normally promote satisfaction (Study 2a), most participants wanted to have that
  opportunity (Study 2b). » Phrase de résultat. **Écrivain : même phrase.** **Surinterprétation** : « blocked » dit plus
  que « impaired » (gêné, affaibli). Écrire « hindered » ou « weakened ».
- **c3 : supports** — expérience, le choix définitif est mieux aimé. Limites : choix de faible enjeu (une photo), petits
  effectifs probables, étude d'origine ; aucune réplication au dossier.
- **c1, c2, c4 : irrelevant**.

## 9. 10.2147/prbm.s364548 (li-2022-reversibility)

- **Identité** : confirmée. « Decision Reversibility and Satisfaction: The Mediating Role of Counterfactual Thinking and
  Anticipated Regret » Li, X. (premier auteur ; Ye, Deng, Zhao, Shi), 2022, *Psychology Research and Behavior
  Management* 15, 2193-2203. Ni correction ni rétractation.
- **Plan** : **expérience** randomisée à deux groupes (décision réversible ou non), médiation testée par questionnaires.
  Plafond : modéré.
- **Population** (texte entier) : 130 étudiants de master en gestion des ressources humaines, Shanghai, Chine ; décision
  d'embauche fictive entre trois CV. Échantillon non occidental, mais pas arabe.
- **Résultat principal** : la décision réversible donne moins de satisfaction, en passant par plus de pensées
  contrefactuelles et de regret anticipé.
- **Taille d'effet** (texte entier) : interaction condition × temps F(1, 128) = 117,06, η² = 0,49 ; d = 1,68 et 2,14 dans
  chaque groupe ; seuls 3 participants sur 64 ont changé d'avis.
- **Risque de biais** (texte entier) : incohérences de rapport — le contrôle de manipulation donne t(128) = 61,26 avec
  « d = 0,98 » (les moyennes et écarts-types publiés, 7,97 ± 0,75 contre 1,32 ± 0,47, donnent d ≈ 10,7) ; le codage de
  la variable muette est écrit dans les deux sens (méthodes : réversible = 0 ; résultats : 1 = réversible) ; effets
  très grands pour ce paradigme. À descendre d'un cran pour risque de biais.
- **Finding `lower-satisfaction`** — phrase du résumé : « The results show that (1) Compared to irreversible decisions,
  reversible decisions have a significant negative impact on satisfaction. » Phrase de résultat. **Écrivain : même
  phrase, même sens.** (L'écrivain n'a pas pris la première phrase du résumé, « Extensive research has shown… », qui est
  du contexte : bien.)
- **c3 : supports** — avec un risque de biais.
- **c1, c2, c4 : irrelevant**.

## 10. 10.1177/1948550615595271 (shiner-2015-maximizers)

- **Identité** : confirmée. « Maximizers, Satisficers, and Their Satisfaction With and Preferences for Reversible Versus
  Irreversible Decisions » Shiner, R. L. (seule autrice), 2015, *Social Psychological and Personality Science* 6(8),
  896-903. Ni correction ni rétractation.
- **Plan** : étude 1, **expérience** (choix d'affiche réversible ou non) croisée avec un trait **mesuré** (maximiser ou se
  contenter) : la modération est corrélationnelle ; étude 2, préférences déclarées. Plafond : modéré pour l'effet de la
  réversibilité.
- **Population** : non précisée dans le résumé (autrice aux États-Unis). Effectifs absents.
- **Résultat principal** : ceux qui se contentent sont plus satisfaits d'un choix définitif ; les maximiseurs, d'un
  choix réversible ; chacun préfère la version qui lui convient, sauf quelques maximiseurs extrêmes qui choisissent
  l'irréversible pour ne pas ruminer.
- **Taille d'effet** : absente du résumé.
- **Finding `maximizers-reverse`** — phrase du résumé : « Study 1 found that satisficers were more satisfied following an
  irreversible decision about a poster choice, whereas maximizers were more satisfied following a reversible
  decision. » Phrase de résultat. **Écrivain : même phrase, même sens.** (La première phrase du résumé, « irreversible
  decisions yield the most satisfaction », est un rappel de travaux antérieurs, pas un résultat de cette étude.)
- **c3 : nuances** — vrai pour les personnes qui se contentent, inversé pour les maximiseurs.
- **c1, c2, c4 : irrelevant**.

## 11. 10.1111/j.1745-6924.2008.00078.x (inglehart-2008-freedom)

- **Identité** : confirmée. « Development, Freedom, and Rising Happiness: A Global Perspective (1981–2007) » Inglehart, R.
  (premier auteur ; Foa, Peterson, Welzel), 2008, *Perspectives on Psychological Science* 3(4), 264-285. Ni correction ni
  rétractation.
- **Plan** : **enquêtes nationales représentatives répétées** (1981-2007, 52 pays avec séries temporelles) et
  **régressions** au niveau des sociétés ; observationnel, écologique, aucune manipulation. Plafond : bas (transversal
  répété ; le classer « longitudinal » serait généreux : pas de panel de personnes, et la lecture causale vient du
  modèle).
- **Population** : 52 pays ; la liste n'est pas dans le résumé, on ne sait donc pas si des pays arabes en font partie.
- **Résultat principal** : le bonheur a monté dans 45 des 52 pays ; selon les régressions, la liberté de choix qu'une
  société laisse (perçue par les gens) a un effet majeur sur le bonheur.
- **Taille d'effet** : absente du résumé.
- **Finding `free-choice-happiness`** — phrase du résumé : « Regression analyses suggest that that the extent to which a
  society allows free choice has a major impact on happiness. » Phrase de conclusion appuyée sur une analyse. Autre
  phrase utile : « Since 1981, economic development, democratization, and increasing social tolerance have increased the
  extent to which people perceive that they have free choice, which in turn has led to higher levels of happiness around
  the world, as the human development model suggests. » **Écrivain : même première phrase, même sens** ; la fiche dit
  bien que « major effect » est la lecture des auteurs. Petit ajout : « how to live » n'est pas dans le résumé. À noter :
  la variable est la liberté de choix **perçue** (autonomie, contrôle), pas le nombre d'options ; et les auteurs testent
  leur propre modèle du développement humain.
- **c4 : contradicts** — plus de liberté de choix va avec plus de bonheur, pas moins (association, niveau des pays).
- **c1, c2, c3 : irrelevant**.

## 12. 10.1086/651242 (markus-2010-choice)

- **Identité** : confirmée. « Does Choice Mean Freedom and Well-Being? » Markus, H. R. (première autrice ; Schwartz),
  2010, *Journal of Consumer Research* 37(2), 344-355. Ni correction ni rétractation.
- **Plan** : **revue narrative** (aucune donnée regroupée). Plafond : bas.
- **Population** : sans objet ; la revue dit elle-même que presque toute la recherche porte sur des Occidentaux diplômés.
- **Résultat principal** : le sens et le poids du choix sont culturels ; le choix n'est pas un bien sans mélange ; trop
  de choix peut produire incertitude paralysante, dépression et égoïsme.
- **Finding `culture`** — phrase du résumé : « However, this article reviews research that shows that in non-Western
  cultures and among working-class Westerners, freedom and choice do not have the meaning or importance they do for the
  university-educated people who have been the subjects of almost all research on this topic. » Conclusion d'une revue.
  **Écrivain : même phrase, même sens.** Petite généralisation : « working-class people » au lieu de « working-class
  Westerners ».
- **Finding `too-much`** — phrase du résumé : « Too much choice can produce a paralyzing uncertainty, depression, and
  selfishness. » Affirmation d'une revue narrative, sans données dans le résumé. **Écrivain : même phrase, même sens**,
  avec la bonne réserve (« claim of a narrative review, no pooled data »). À noter : Barry Schwartz est l'auteur du
  *Paradox of Choice*, la thèse que l'épisode teste (allégeance).
- **c2 : supports** (très faible) — « incertitude paralysante », affirmée, non mesurée.
- **c4 : nuances** — soutient au plus une forme restreinte (« trop » de choix), pas « plus de liberté » ; et dit que le
  sens du choix dépend de la culture, ce qui touche directement l'applicabilité au public égyptien.
- **c1 : irrelevant**. **c3 : irrelevant**.

---

## Tableau final

| DOI | c1 plus d'options → moins satisfait | c2 plus d'options → on choisit moins | c3 s'engager → plus satisfait | c4 plus de liberté → moins heureux |
|---|---|---|---|---|
| 10.1037/0022-3514.79.6.995 (Iyengar 2000) | supports | supports | irrelevant | irrelevant |
| 10.1086/651235 (Scheibehenne 2010) | contradicts (en moyenne) | contradicts (en moyenne) | irrelevant | irrelevant |
| 10.1016/j.jcps.2014.08.002 (Chernev 2015) | nuances (sous conditions) | nuances (sous conditions) | irrelevant | irrelevant |
| 10.1002/mar.20271 (Scheibehenne 2009) | nuances | nuances | irrelevant | irrelevant |
| 10.1002/mar.20269 (Haynes 2009) | supports | irrelevant | irrelevant | irrelevant |
| 10.1017/s1930297500005234 (Szrek 2017) | contradicts | irrelevant | irrelevant | irrelevant |
| 10.1080/15213269.2015.1121827 (D'Angelo 2016) | supports | irrelevant | nuances (penche contre) | irrelevant |
| 10.1037/0022-3514.82.4.503 (Gilbert 2002) | irrelevant | irrelevant | supports | irrelevant |
| 10.2147/prbm.s364548 (Li 2022) | irrelevant | irrelevant | supports (risque de biais) | irrelevant |
| 10.1177/1948550615595271 (Shiner 2015) | irrelevant | irrelevant | nuances | irrelevant |
| 10.1111/j.1745-6924.2008.00078.x (Inglehart 2008) | irrelevant | irrelevant | irrelevant | contradicts |
| 10.1086/651242 (Markus 2010) | irrelevant | supports (très faible) | irrelevant | nuances |

## Findings dont le texte dit plus que la phrase

| Fiche · finding | Problème | Gravité |
|---|---|---|
| chernev-2015-overload · `overall-significant` | « does lower … overall » pour une significativité tirée d'un modèle à modérateurs, sans taille | à corriger |
| gilbert-2002-revisions · `wanted-option` | « blocked » pour « impaired » | à corriger |
| haynes-2009-boundaries · `less-satisfied` | « not more regretful » alors que la phrase dit « not less regret » | à vérifier (texte entier) ou neutraliser |
| scheibehenne-2010-overload · `no-sufficient-condition` | « preconditions » (nécessaires) lues comme des conditions qui rendent le choix nuisible | à reformuler |
| scheibehenne-2010-overload · `virtually-zero` | découpe en deux mesures que la phrase ne donne pas (le texte entier l'autorise) | mineur |
| dangelo-2016-dating · `reversibility-no-effect` | « only » suggère une interaction démontrée | mineur |
| szrek-2017-variety · `process-not-outcome` | « costlier » pour une difficulté ressentie ; effet sur le plaisir de choisir conditionnel | mineur |
| inglehart-2008-freedom · `free-choice-happiness` | « how to live » ajouté | mineur |
| markus-2010-choice · `culture` | « working-class people » pour « working-class Westerners » | mineur |

Toutes les phrases d'appui sont des phrases de résultat ou de conclusion du résumé (aucune phrase de contexte) et toutes
s'y retrouvent ; trois ne sont pas identiques à l'octet près (Chernev : tiret cadratin remplacé par un trait d'union ;
Scheibehenne 2009 : traits d'union U+2010 ; D'Angelo : apostrophe droite), identiques après normalisation de la
ponctuation.

## Lecture d'ensemble

**c1 — mêlée (sous conditions) ; plafond haut, certitude modérée.** Les deux méta-analyses d'expériences ne disent pas
la même chose : effet moyen nul avec forte hétérogénéité (Scheibehenne 2010, 50 expériences, D = 0,02) ; effet
significatif une fois quatre conditions prises en compte (Chernev 2015, sans taille dans le résumé). Une preuve de rang
égal contredit : la direction « soutient » est interdite (docs/verdict.md §3). Les expériences qui soutiennent (Iyengar
2000, Haynes 2009) sont déjà dans la méta-analyse de 2010 : ce ne sont pas des preuves en plus ; des deux plus récentes,
l'une soutient (D'Angelo 2016, rencontres, une semaine après), l'autre non (Szrek 2017, assurance santé). Descendue d'un
cran pour le caractère indirect (produits exotiques, laboratoire, États-Unis et Europe, aucun échantillon arabe) ; le biais
de publication noté par Scheibehenne 2010 joue contre la forme forte. Ce qui tient : « plus d'options ne rend pas moins
satisfait en général ; ça arrive quand le choix est difficile et qu'on ne sait pas ce qu'on veut ; avec des préférences
claires, plus d'options aide ».

**c2 — mêlée (sous conditions) ; plafond haut, certitude modérée.** Le résultat d'origine (confitures, 30 % contre 3 %,
Iyengar 2000) a échoué en réplication directe (Allemagne, d = 0,02, N = 504, d'après Scheibehenne 2010), comme les
chocolats et les bonbons ; la méta-analyse de 2010 ne trouve pas de différence entre satisfaction et probabilité de
choisir, et un effet moyen nul ; Chernev 2015 compte le report du choix parmi quatre mesures équivalentes, significatives
sous conditions. Markus 2010 ne fait qu'affirmer. Même lecture que c1 ; « échec de réplication » pèse sur le côté qui
soutient.

**c3 — soutient en partie, pour certains ; plafond modéré, certitude basse.** Trois expériences vont dans le sens de c3
(Gilbert 2002, Li 2022, Shiner 2015 pour ceux qui se contentent), une ne trouve pas d'effet principal de la réversibilité
(D'Angelo 2016) et une l'inverse chez les maximiseurs (Shiner 2015). Aucune méta-analyse ni réplication au dossier.
Descendue pour imprécision (peu d'études, petits effectifs probables), incohérence (D'Angelo, maximiseurs), risque de
biais (Li 2022 : statistiques incohérentes) et caractère indirect : une photo, une affiche, une embauche fictive ne sont
pas « s'engager » dans sa vie (couple, métier, projet) au sens de Manson ; États-Unis et Chine, aucun échantillon arabe.

**c4 — contredit ; plafond bas, certitude basse (au plus).** La seule source qui apporte des données (Inglehart 2008,
enquêtes de 52 pays) trouve l'inverse : plus de liberté de choix perçue va avec plus de bonheur ; c'est observationnel et
au niveau des sociétés, et c4 est causale sans aucune manipulation (plafond bas de toute façon). Markus 2010, revue
narrative co-écrite par l'auteur du *Paradox of Choice*, n'affirme qu'une forme restreinte (« trop » de choix) sans
données. Problème de construit : c4 mêle la liberté (autonomie, contrôle sur sa vie, qui va avec le bien-être) et le
nombre d'options (le sujet de c1-c2). Je la reformulerais en « trop d'options dans sa vie → moins heureux », ou je la
mettrais hors champ (`inScope: false`) : aucune source du dossier ne la teste.

## Autres points relevés

- **Indépendance** : Iyengar 2000, Haynes 2009 et Scheibehenne 2009 sont dans les 63 conditions de Scheibehenne 2010
  (tableau 1, texte entier) ; Chernev 2015 recouvre très probablement les mêmes études. Scheibehenne est auteur de la
  méta-analyse de 2010, de l'étude de 2009 et des réplications ratées de 2008 qu'elle inclut.
- **Allégeance** : Schwartz (Markus 2010) est l'auteur de la thèse testée ; Inglehart et Welzel testent leur propre
  modèle ; Iyengar est à l'origine de l'effet.
- **Applicabilité** : aucun échantillon du Moyen-Orient ou d'Afrique du Nord confirmé dans les 12 sources (Inglehart 2008
  peut-être, liste des pays non donnée dans le résumé) ; la phrase « معظم الدراسات من أمريكا وأوروبا » s'impose. Markus
  2010 ajoute que le sens même du choix change selon la culture et la classe sociale.
- **`content/contested.json`**, que docs/verdict.md §2 cite, n'existe pas dans le dépôt : l'effet de surcharge de choix,
  dont la réplication de l'étude des confitures a échoué, y aurait sa place.

---

Fichiers non lus : le dossier de l'écrivain (`…/scratchpad/dossiers/`), et dans les fiches `content/sources/*.json` tout
sauf `id`, `doi`, `findings[].id`, `findings[].text` et, après la lecture des résumés, `findings[].support` (`sentence`,
`role`, `where`). Lus : CLAUDE.md, docs/verdict.md, reports/feeling-bad-about-feeling-bad/blind-review.md (le modèle).
Dépôt : seul ce fichier a été écrit.
