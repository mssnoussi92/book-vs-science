# Relecture aveugle des sources — « The Feedback Loop from Hell » (Manson)

Relu le 2026-11-22. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis de correction ou de rétractation qui pointent vers l'article), OpenAlex
`/works/doi:<doi>`, Europe PMC `search … resultType=core` (`abstractText`). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind/raw/`. Pour trois articles en accès
libre (PMC), le texte entier a été lu en plus (BioC, NCBI) pour la population et les contrôles : c'est signalé
« (texte entier) » ; tout le reste vient du résumé seul.

Affirmations :
- **c1** : se juger d'avoir une émotion négative (au lieu d'accepter le sentiment) → plus d'émotion négative et moins
  bonne santé psychologique avec le temps.
- **c2** : essayer de chasser un sentiment négatif, ou les pensées qui vont avec, ne le fait pas partir.
- **c3** : accepter un sentiment négatif aide davantage que les autres façons d'y faire face.
- **c4** : vouloir être heureux rend malheureux.

Vérification d'identité commune aux 11 DOI : Crossref `updated-by` et `update-to` absents, aucun document Crossref ne
déclare mettre à jour l'un d'eux (`filter=updates:` : 0 résultat pour chacun), OpenAlex `is_retracted: false` pour
tous. **Aucun avis de correction ni de rétractation trouvé.**

---

## 1. 10.1037/pspp0000157

- **Identité** : confirmée. « The psychological health benefits of accepting negative emotions and thoughts:
  Laboratory, diary, and longitudinal evidence. » Ford, B. Q. (premier auteur ; Lam, John, Mauss), 2018, *Journal of
  Personality and Social Psychology* 115(6), 1075-1092. Article de recherche. Ni correction ni rétractation.
- **Plan** : trois études, toutes **corrélationnelles** pour l'acceptation (mesurée, jamais manipulée) : étude 1
  transversale ; étude 2 en laboratoire (stresseur standardisé, l'acceptation habituelle mesurée avant) ; étude 3
  journal de 14 jours puis suivi à 6 mois. (Texte entier : la santé psychologique de l'étude 3 n'est mesurée **qu'au
  suivi**, pas au départ ; le lien « 6 mois plus tard » est donc un lien décalé, pas un changement contrôlé sur le
  niveau de départ. Les auteurs écrivent eux-mêmes que des manipulations expérimentales restent à faire pour vérifier
  la causalité.)
- **Mesure** (texte entier) : sous-échelle « nonjudgment » de la FFMQ / KIMS (ex. « I tell myself I shouldn’t be
  feeling the way that I’m feeling ») : c'est bien « juger vs accepter ses émotions et pensées », le construit de c1.
- **Population** : étude 1 N = 1 003, étude 2 N = 156, étude 3 N = 222. (Texte entier : étudiants de UC Berkeley ;
  femmes de la baie de San Francisco ; échantillon communautaire de Denver ; États-Unis.)
- **Résultat principal** : les personnes qui acceptent habituellement leurs émotions et pensées (au lieu de les
  juger) ont une meilleure santé psychologique, ressentent moins d'émotion négative face aux stresseurs, et cette
  moindre émotion négative quotidienne rend compte du lien avec la santé mesurée 6 mois plus tard ; accepter les
  *situations* ne montre pas ce lien.
- **Phrase du résumé** : « Finally, in a longitudinal design (Study 3, N = 222), acceptance predicted lower negative
  (but not positive) emotion experienced during daily stressors that, in turn, accounted for the link between
  acceptance and psychological health 6 months later. »
  Autre phrase utile : « This link between acceptance and psychological health was unique to accepting mental
  experiences and was not observed for accepting situations. »
- **Taille d'effet** : pas dans le résumé. (Texte entier, étude 2 : r = −0,20 entre acceptation et émotion négative
  pendant le stresseur ; r partiel −0,18 en contrôlant l'émotion de départ.)
- **c1 : supports** — le construit est exactement « juger vs accepter ses états mentaux » ; plus d'émotion négative
  face au stress et moins bonne santé, y compris 6 mois après. Limites : association, pas cause ; « avec le temps »
  = lien décalé sans santé de départ contrôlée.
- **c2 : irrelevant** — aucune tentative de chasser un sentiment n'est mesurée ni manipulée.
- **c3 : irrelevant** — l'acceptation prédit la santé au-delà de la réévaluation et de la rumination (contrôles), mais
  une variance propre n'est pas une supériorité sur d'autres façons de faire face ; aucune comparaison d'efficacité.
- **c4 : irrelevant**.

## 2. 10.1016/j.brat.2010.05.025

- **Identité** : confirmée. « Let it be: Accepting negative emotional experiences predicts decreased negative affect
  and depressive symptoms. » Shallcross, A. J. (premier auteur ; Troy, Boland, Mauss), 2010, *Behaviour Research and
  Therapy* 48(9), 921-929. Ni correction ni rétractation.
- **Plan** : étude 1 en laboratoire, corrélationnelle (acceptation habituelle mesurée, puis film négatif vs film
  neutre) ; étude 2 **prospective** (acceptation mesurée avant le stress ; texte entier : environ 4 mois, symptômes
  dépressifs de départ contrôlés).
- **Mesure** (texte entier) : Acceptance and Action Questionnaire (AAQ-16), qui mesure l'acceptation contre
  l'**évitement expérientiel** (« I try hard to avoid feeling depressed or anxious »), pas le jugement de soi.
- **Population** : femmes seulement (résumé) ; échantillon communautaire pour l'étude 2. (Texte entier : étude 1,
  99 étudiantes de l'université de Denver ; étude 2, 55 femmes de la région de Denver ayant vécu un événement de vie
  stressant ; États-Unis.)
- **Résultat principal** : l'acceptation va avec moins d'affect négatif pendant un film négatif (pas pendant un film
  neutre), et prédit moins de symptômes dépressifs 4 mois plus tard **seulement chez les femmes qui ont vécu beaucoup
  de stress** entre-temps.
- **Phrase du résumé** : « In Study 2, acceptance interacted with life stress such that acceptance predicted lower
  levels of depressive symptoms after higher, but not lower, life stress. »
- **Taille d'effet** : pas dans le résumé. (Texte entier : étude 1, η² partiel = 0,057 pour l'effet de l'acceptation ;
  étude 2, effet principal de l'acceptation **non significatif** (β = 0,06, p = 0,64), interaction acceptation × stress
  β = 0,20, p = 0,05, N = 55.)
- **c1 : nuances** — va dans le sens de c1 (moins d'émotion négative, moins de symptômes) mais seulement sous stress
  élevé, effet principal nul, petits échantillons féminins, et la mesure porte sur l'évitement, pas sur le fait de se
  juger.
- **c2 : irrelevant** — l'AAQ contient des items d'évitement, mais l'étude ne teste pas si chasser un sentiment le fait
  partir.
- **c3 : irrelevant** — aucune comparaison avec d'autres stratégies.
- **c4 : irrelevant**.

## 3. 10.1037/a0024755

- **Identité** : confirmée. « Feeling bad about being sad: The role of social expectancies in amplifying negative
  mood. » Bastian, B. (premier auteur ; Kuppens, Hornsey, Park, Koval, Uchida), 2012, *Emotion* 12(1), 69-80. Ni
  correction ni rétractation.
- **Plan** : quatre études ; études 1 et 2 corrélationnelles (Australie, Japon) ; études 3 et 4 **expériences** qui
  manipulent les attentes sociales perçues (l'auto-évaluation négative est un médiateur mesuré, pas manipulé).
- **Population** : Australie (études 1 et 2) et Japon (étude 2) ; effectifs non donnés dans le résumé.
- **Résultat principal** : quand on croit que les autres attendent qu'on ne soit pas triste, on ressent plus
  d'émotion négative et moins de bien-être, parce qu'on s'évalue négativement quand on ressent l'émotion négative ;
  l'effet est surtout net en Australie, et causal pour les attentes sociales (études 3-4).
- **Phrase du résumé** : « Across 4 studies the authors demonstrate that when people think others expect them not to
  feel negative emotions (i.e., sadness) they experience more negative emotion and reduced well-being. »
  Autre phrase utile : « The authors show that perceived social expectancies predict these differences in emotion and
  well-being both more consistently than-and independently of-personal expectancies and that they do so by promoting
  negative self-evaluation when experiencing negative emotion. »
- **Taille d'effet** : non donnée.
- **c1 : supports** — le mécanisme mis en avant est l'auto-évaluation négative quand on ressent une émotion négative,
  associée à plus d'émotion négative et moins de bien-être. Limites : ce qui est manipulé, ce sont les attentes
  *sociales*, pas le jugement de soi ; pas de suivi « avec le temps » dans le résumé ; effet plus faible au Japon.
- **c2 : irrelevant**.
- **c3 : irrelevant**.
- **c4 : nuances** — la pression perçue *des autres* à être heureux (pas triste) accroît la tristesse ; les attentes
  *personnelles* prédisent moins régulièrement. Cela situe le problème dans la pression sociale plutôt que dans le
  simple désir d'être heureux.

## 4. 10.1037/emo0001381

- **Identité** : confirmée. « Unpacking the pursuit of happiness: Being concerned about happiness but not aspiring to
  happiness is linked with negative meta-emotions and worse well-being. » Zerwas, F. K. (premier auteur ; Ford, John,
  Mauss), 2024, *Emotion* 24(8), 1789-1802. Ni correction ni rétractation.
- **Plan** : transversal, journal quotidien et longitudinal (plusieurs études) ; aucune manipulation.
- **Population** : échantillons étudiants et communautaires, recueillis de 2009 à 2020, divers en genre, ethnie, âge
  et lieu ; N total = 1 815 (pays non précisés dans le résumé).
- **Résultat principal** : *aspirer* au bonheur (le tenir pour un but important) n'est pas lié à un moindre bien-être ;
  être *préoccupé* par son bonheur (juger son niveau de bonheur) l'est, de façon transversale et longitudinale, en
  partie via des méta-émotions négatives pendant les moments positifs.
- **Phrase du résumé** : « In Study 2, concern about happiness (but not aspiring to happiness) was associated with
  lower well-being cross-sectionally and longitudinally. »
  Conclusion : « These findings suggest that highly valuing happiness is not inherently problematic; however, concern
  and judgment about one's happiness can undermine it. »
- **Taille d'effet** : non donnée.
- **c1 : irrelevant** — le jugement étudié porte sur son niveau de bonheur pendant des événements positifs, pas sur le
  fait d'avoir une émotion négative (mécanisme voisin, pas l'objet de c1).
- **c2 : irrelevant**.
- **c3 : irrelevant**.
- **c4 : nuances** — contredit la forme littérale (« vouloir » = aspirer au bonheur est « relatively innocuous » selon le résumé) ; ne
  soutient qu'une version restreinte : se préoccuper de son bonheur et le juger va avec un moindre bien-être
  (association, pas cause).

## 5. 10.1037/emo0000488

- **Identité** : confirmée. « Meta-emotions in daily life: Associations with emotional awareness and depression. »
  Bailen, N. H. (premier auteur ; Wu, Thompson), 2019, *Emotion* 19(5), 776-787. Ni correction ni rétractation.
- **Plan** : échantillonnage d'expériences (7 jours) + une mesure auto-rapportée de la sévérité dépressive ; le lien
  avec la dépression est **transversal** (entre personnes), sans manipulation ni suivi.
- **Population** : adultes d'un échantillon communautaire divers, n = 79 (pays non précisé dans le résumé).
- **Résultat principal** : la plupart des adultes ont des méta-émotions, surtout négatives sur des émotions négatives
  (ex. culpabilité d'être en colère), et les personnes plus déprimées en ont davantage.
- **Phrase du résumé** : « Higher depressive severity was associated with higher likelihood of meta-emotional
  experiences and specifically negative-negative experiences. »
- **Taille d'effet** : non donnée (environ 53 % des participants rapportent au moins une méta-émotion).
- **c1 : supports** (faible) — se sentir mal d'avoir une émotion négative va avec plus de dépression ; mais petit
  échantillon, association transversale, direction inconnue (la dépression peut produire ces méta-émotions), rien
  « avec le temps ».
- **c2 : irrelevant**.
- **c3 : irrelevant**.
- **c4 : irrelevant**.

## 6. 10.1037/a0027600

- **Identité** : confirmée. « Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the
  process model of emotion regulation. » Webb, T. L. (premier auteur ; Miles, Sheeran), 2012, *Psychological
  Bulletin* 138(4), 775-808. Méta-analyse. Ni correction ni rétractation.
- **Plan** : méta-analyse de **306 comparaisons expérimentales** de stratégies de régulation émotionnelle données en
  consigne (laboratoire, effets à court terme), mesures subjectives, comportementales et physiologiques.
- **Population** : participants des études primaires ; effectifs et pays non donnés dans le résumé.
- **Résultat principal** : supprimer l'expérience de l'émotion ou les pensées de l'événement ne réduit pas l'émotion
  (d ≈ 0), alors que la distraction, la réévaluation et la prise de perspective la réduisent ; se concentrer sur
  l'émotion l'aggrave.
- **Phrase du résumé** : « Similarly, suppressing the expression of emotion proved effective (d(+) = 0.32), but
  suppressing the experience of emotion or suppressing thoughts of the emotion-eliciting event did not (d(+) = -0.04
  and -0.12, respectively). »
  Autre phrase utile : « Whereas distraction was an effective way to regulate emotions (d(+) = 0.27), concentration was
  not (d(+) = -0.26). »
- **Taille d'effet** : d+ = −0,04 (supprimer l'expérience), −0,12 (supprimer les pensées), 0,32 (supprimer
  l'expression), 0,27 (distraction), 0,36 (réévaluer le stimulus), 0,23 (réévaluer la réponse), 0,45 (prise de
  perspective), −0,26 (concentration) ; par processus : 0,00 / 0,16 / 0,36.
- **c1 : irrelevant**.
- **c2 : nuances** — soutient c2 pour la suppression directe du ressenti et des pensées (aucun effet), mais une autre
  façon de « s'en détourner », la distraction, réduit bel et bien l'émotion à court terme ; c2 n'est vrai que pour la
  suppression.
- **c3 : irrelevant** — l'acceptation n'apparaît pas parmi les stratégies du résumé ; on ne peut pas la comparer. (Le
  résumé montre seulement que d'autres stratégies, réévaluation et distraction, marchent.)
- **c4 : irrelevant**.

## 7. 10.1016/S0272-7358(00)00057-X

- **Identité** : confirmée. « Paradoxical effects of thought suppression: a meta-analysis of controlled studies. »
  Abramowitz, J. S. (premier auteur ; Tolin, Street), 2001, *Clinical Psychology Review* 21(5), 683-703.
  Méta-analyse. Ni correction ni rétractation.
- **Plan** : méta-analyse d'études **contrôlées** (expériences de suppression de pensée) ; nombre d'études non donné
  dans le résumé.
- **Population** : participants non cliniques, analogues et quelques échantillons cliniques (peu nombreux).
- **Résultat principal** : essayer de supprimer une pensée produit ensuite un petit à moyen effet rebond (la pensée
  revient plus), d'ampleur variable selon la pensée visée et la façon de compter.
- **Phrase du résumé** : « Results indicated a small to moderate rebound effect of thought suppression that varied in
  magnitude depending on the nature of the target thought and the method by which thought frequency was measured. »
- **Taille d'effet** : « small to moderate », sans chiffre dans le résumé.
- **c1 : irrelevant**.
- **c2 : supports** — pour les **pensées** : les supprimer ne les fait pas partir, elles reviennent davantage.
  Limites : pensées, pas sentiments ; effet petit à moyen et hétérogène ; laboratoire ; méta-analyse ancienne (2001).
- **c3 : irrelevant**.
- **c4 : irrelevant**.

## 8. 10.1016/j.jbtep.2012.03.004

- **Identité** : confirmée. « How effective are acceptance strategies? A meta-analytic review of experimental
  results. » Kohl, A. (premier auteur ; Rief, Glombiewski), 2012, *Journal of Behavior Therapy and Experimental
  Psychiatry* 43(4), 988-1001. Méta-analyse. Ni correction ni rétractation.
- **Plan** : méta-analyse de **30 études expérimentales** comparant une stratégie d'acceptation à d'autres stratégies
  de régulation (suppression, distraction, réévaluation…).
- **Population** : participants des études primaires ; non détaillée dans le résumé.
- **Résultat principal** : l'acceptation fait mieux que les autres stratégies pour la tolérance à la douleur, mais
  **pas** pour l'intensité de la douleur ni pour l'affect négatif (aucune différence significative).
- **Phrase du résumé** : « In sum, acceptance strategies proved to be superior to other emotion regulation strategies
  with respect to pain tolerance but not for pain intensity and negative affect. »
  Autre phrase utile : « With respect to pain intensity and negative affect, meta-analysis did not show any significant
  differences between acceptance and other emotion regulation strategies. »
- **Taille d'effet** : tolérance à la douleur g = 0,43 (IC 95 % [0,12 ; 0,73]) ; affect négatif : pas de différence
  significative (chiffre non donné).
- **c1 : irrelevant**.
- **c2 : irrelevant** — pas de résultat propre à la suppression dans le résumé.
- **c3 : contradicts** — c'est le test le plus direct de c3 : pour l'affect négatif, accepter ne fait pas mieux que
  les autres stratégies. Seule exception, la tolérance à la douleur. (La conclusion des auteurs, « at least as
  useful », dit « aussi utile », pas « plus utile ».)
- **c4 : irrelevant**.

## 9. 10.1159/000365764

- **Identité** : confirmée. « A Meta-Analysis of the Efficacy of Acceptance and Commitment Therapy for Clinically
  Relevant Mental and Physical Health Problems. » A-Tjak, J. G. L. (premier auteur ; Davis, Morina, Powers, Smits,
  Emmelkamp), *Psychotherapy and Psychosomatics* 84(1), 30-36 ; en ligne le 2014-12-24, numéro de 2015. Méta-analyse.
  Ni correction ni rétractation.
- **Plan** : méta-analyse de **39 essais randomisés** d'une **thérapie entière** (ACT), pas de l'acceptation seule.
- **Population** : 1 821 patients avec des troubles mentaux ou des problèmes de santé somatique.
- **Résultat principal** : l'ACT fait mieux que la liste d'attente, le placebo psychologique et les soins habituels,
  mais pas significativement mieux que la thérapie cognitivo-comportementale.
- **Phrase du résumé** : « The comparison between ACT and established treatments (cognitive behavioral therapy) did not
  reveal any significant differences between these treatments (p = 0.140). »
  Autre phrase utile : « ACT outperformed control conditions (Hedges' g = 0.57) at posttreatment and follow-up
  assessments in completer and intent-to-treat analyses for primary outcomes. »
- **Taille d'effet** : g = 0,57 contre conditions de contrôle ; 0,82 liste d'attente ; 0,51 placebo psychologique ;
  0,64 soins habituels ; 0,30 critères secondaires ; contre TCC : différence non significative (p = 0,140).
- **c1 : irrelevant**.
- **c2 : irrelevant**.
- **c3 : nuances** — indirect : une thérapie entière (acceptation + valeurs, engagement, défusion…) n'isole pas
  l'acceptation ; le seul face-à-face avec une autre approche établie (TCC) ne montre pas de supériorité, ce qui ne
  soutient pas « mieux que les autres façons » ; une absence de différence significative n'est pas pour autant une
  preuve d'équivalence.
- **c4 : irrelevant**.

## 10. 10.1016/j.cpr.2009.11.004

- **Identité** : confirmée. « Emotion-regulation strategies across psychopathology: A meta-analytic review. » Aldao, A.
  (premier auteur ; Nolen-Hoeksema, Schweizer), *Clinical Psychology Review* 30(2), 217-237 ; numéro de 2010 (en ligne
  fin 2009, d'où 2009 chez OpenAlex). Méta-analyse. Ni correction ni rétractation.
- **Plan** : méta-analyse de **241 tailles d'effet issues de 114 études** sur la régulation émotionnelle
  *dispositionnelle* (habitudes) et les symptômes ; associations, non expérimentales.
- **Population** : échantillons cliniques et « normatifs » ; anxiété, dépression, troubles alimentaires et liés aux
  substances.
- **Résultat principal** : l'acceptation (comme la réévaluation) n'a qu'un lien petit à moyen avec moins de symptômes,
  plus faible que les liens de la rumination, de l'évitement, de la suppression (avec plus de symptômes) et de la
  résolution de problèmes ; les auteurs le jugent surprenant vu la place de l'acceptation dans les traitements.
- **Phrase du résumé** : « We found a large effect size for rumination, medium to large for avoidance, problem solving,
  and suppression, and small to medium for reappraisal and acceptance. »
  Autre phrase utile : « These results are surprising, given the prominence of reappraisal and acceptance in treatment
  models, such as cognitive-behavioral therapy and acceptance-based treatments, respectively. »
- **Taille d'effet** : qualitative dans le résumé (grande / moyenne à grande / petite à moyenne).
- **c1 : supports** (faible) — l'acceptation habituelle va avec moins de symptômes, mais le lien est petit à moyen,
  transversal pour l'essentiel, sans rien « avec le temps ».
- **c2 : irrelevant** — compatible (supprimer et éviter par habitude vont avec plus de symptômes) mais non probant :
  association d'habitudes, direction inconnue, et rien ne dit si le sentiment part.
- **c3 : contradicts** — à l'échelle des habitudes, l'acceptation est un des liens les plus faibles avec la santé
  mentale, plus faible que la résolution de problèmes ; cela ne soutient pas « aide davantage que les autres façons »
  (association, pas efficacité comparée).
- **c4 : irrelevant**.

## 11. 10.1037/xge0000108

- **Identité** : confirmée. « Culture shapes whether the pursuit of happiness predicts higher or lower well-being. »
  Ford, B. Q. (premier auteur ; 12 auteurs dont Mauss), 2015, *Journal of Experimental Psychology: General* 144(6),
  1053-1062. Ni correction ni rétractation.
- **Plan** : **transversal**, comparaison de quatre régions culturelles ; aucune manipulation.
- **Population** : États-Unis, Allemagne, Russie, Asie de l'Est (résumé). (Texte entier : N ≈ 786, surtout des
  étudiants : 307 aux États-Unis, 91 en Allemagne, 184 en Russie, 204 au Japon et à Taïwan.)
- **Résultat principal** : la motivation à rechercher le bonheur va avec moins de bien-être aux États-Unis, sans lien en
  Allemagne, et avec **plus** de bien-être en Russie et en Asie de l'Est ; la différence tient à une recherche du
  bonheur plus tournée vers les autres dans ces cultures.
- **Phrase du résumé** : « Motivation to pursue happiness predicted lower well-being in the United States, did not
  predict well-being in Germany, and predicted higher well-being in Russia and in East Asia. »
- **Taille d'effet** : non donnée.
- **c1 : irrelevant**.
- **c2 : irrelevant**.
- **c3 : irrelevant**.
- **c4 : nuances** — c4 ne vaut (en association) qu'aux États-Unis ; nul en Allemagne, inverse en Russie et en Asie de
  l'Est. Contredit c4 comme loi générale. (La phrase d'ouverture du résumé, « Pursuing happiness can paradoxically
  impair well-being », est un rappel de travaux antérieurs, pas un résultat de cette étude.)

---

## Tableau final

| DOI | c1 juger son émotion | c2 chasser ne marche pas | c3 accepter > autres | c4 vouloir le bonheur |
|---|---|---|---|---|
| 10.1037/pspp0000157 (Ford 2018) | supports | irrelevant | irrelevant | irrelevant |
| 10.1016/j.brat.2010.05.025 (Shallcross 2010) | nuances | irrelevant | irrelevant | irrelevant |
| 10.1037/a0024755 (Bastian 2012) | supports | irrelevant | irrelevant | nuances |
| 10.1037/emo0001381 (Zerwas 2024) | irrelevant | irrelevant | irrelevant | nuances |
| 10.1037/emo0000488 (Bailen 2019) | supports (faible) | irrelevant | irrelevant | irrelevant |
| 10.1037/a0027600 (Webb 2012) | irrelevant | nuances | irrelevant | irrelevant |
| 10.1016/S0272-7358(00)00057-X (Abramowitz 2001) | irrelevant | supports | irrelevant | irrelevant |
| 10.1016/j.jbtep.2012.03.004 (Kohl 2012) | irrelevant | irrelevant | contradicts | irrelevant |
| 10.1159/000365764 (A-Tjak 2015) | irrelevant | irrelevant | nuances | irrelevant |
| 10.1016/j.cpr.2009.11.004 (Aldao 2010) | supports (faible) | irrelevant | contradicts | irrelevant |
| 10.1037/xge0000108 (Ford 2015) | irrelevant | irrelevant | irrelevant | nuances |

## Lecture d'ensemble

**c1 — soutient ; certitude basse.** Cinq sources vont dans le même sens (Ford 2018, Bastian 2012, Bailen 2019, Aldao
2010 ; Shallcross 2010 en nuance) et la mesure de Ford 2018 est exactement « juger vs accepter ses émotions ». Mais tout
ce qui porte sur le jugement de soi est **observationnel** : les seules expériences (Bastian 3-4) manipulent les
attentes *sociales*, pas le jugement de soi. « Avec le temps » repose sur deux suivis : Ford 2018 étude 3 (santé mesurée
seulement à 6 mois, sans niveau de départ) et Shallcross 2010 (N = 55, effet seulement sous stress élevé, effet
principal nul). Association : assez solide ; effet causal dans le temps : non établi. À noter : quatre des
onze sources ont la même co-autrice, Iris Mauss (Ford 2018, Shallcross 2010 pour c1 ; Zerwas 2024, Ford 2015 pour c4),
ce qui réduit l'indépendance des preuves.

**c2 — soutient pour la suppression directe, avec une nuance ; certitude modérée.** Deux méta-analyses d'expériences :
supprimer une pensée la fait revenir davantage (Abramowitz 2001, effet petit à moyen, hétérogène), supprimer le
ressenti ou les pensées ne réduit pas l'émotion (Webb 2012, d ≈ −0,04 et −0,12). Nuance : la distraction (d = 0,27) et
la réévaluation réduisent l'émotion à court terme ; c2 est donc vrai pour « supprimer », pas pour toute façon de se
détourner. Laboratoire, court terme, méta-analyses anciennes.

**c3 — contredit (pas de supériorité démontrée) ; certitude modérée.** Le test le plus direct (Kohl 2012, 30
expériences) ne trouve aucune différence significative entre l'acceptation et les autres stratégies pour l'affect
négatif (supériorité seulement pour la tolérance à la douleur). Aldao 2010 trouve un lien de l'acceptation avec la santé
plus faible que d'autres stratégies. A-Tjak 2015 : l'ACT (thérapie entière, pas l'acceptation seule) ne fait pas mieux
que la TCC. Ce qui est soutenu, c'est « accepter aide, au moins autant que d'autres stratégies » ; « davantage » ne
l'est pas. Une absence de différence n'est pas une preuve d'équivalence, d'où modérée et non haute.

**c4 — mêlée ; certitude basse.** Vouloir (aspirer à) être heureux n'est pas lié à moins de bien-être (Zerwas 2024) ;
le lien négatif n'apparaît qu'avec la préoccupation et le jugement de son bonheur (Zerwas 2024), avec la pression
sociale perçue à ne pas être triste (Bastian 2012), et seulement dans certaines cultures (Ford 2015 : États-Unis
négatif, Russie et Asie de l'Est positif). Presque tout est corrélationnel. La forme littérale « vouloir être heureux
rend malheureux » n'est pas soutenue ; une forme restreinte (« se surveiller et se juger dans sa quête du bonheur, dans
un contexte individualiste, va avec moins de bien-être ») l'est faiblement.

---

Fichiers interdits (`content/sources/*.json`, `*.verify.json`, `verify-report.md`, `docs/design/review-science.md`,
`docs/conception.md`) : **non lus**. Dépôt `/home/user/book-vs-science` : **non modifié** (aucun fichier ouvert).
