# Contre-preuve : « The Feedback Loop from Hell » (Manson), verdict ⚖️ modéré

Agent contre-preuve, 2026-11-22. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé. Je ne valide
rien. Lu : `docs/verdict.md` (grille). Aucun fichier du dépôt `book-vs-science` n'a été modifié.

Sources : Crossref (`query.bibliographic`, `filter=type:journal-article` ; `filter=updates:<doi>` ; `works/<doi>`),
Europe PMC (`search`, `resultType=core` ; citations `MED/<pmid>/citations`). Deux textes intégraux ouverts (Ford 2018,
manuscrit PMC5767148 via l'API BioC de NCBI ; Dejonckheere 2022, PMC8854619). OpenAlex : non utilisé. User-Agent
générique `book-vs-science-counter/0.1`, aucun nom ni e-mail. Réponses brutes : `raw/` à côté de ce fichier.

Limites de ma recherche : résumés surtout, pas les textes intégraux ; le tri de pertinence d'Europe PMC fait remonter
beaucoup de 2026, d'où des requêtes par titre pour quelques études anciennes que je soupçonnais (Butler 2007,
Hofmann 2009, Dunn 2009) : chacune a été retrouvée et vérifiée sur Crossref, rien n'est pris de mémoire.

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 11 DOI du verdict (pspp0000157, j.brat.2010.05.025, a0024755, emo0001381, emo0000488, a0027600, S0272-7358(00)00057-X, j.jbtep.2012.03.004, 000365764, j.cpr.2009.11.004, xge0000108) | 0 avis pour chacun |
| Crossref | `filter=updates:` sur 4 contre-preuves clés (sciadv.adh5292, j.brat.2009.05.007, s41598-026-59035-3, j.jad.2025.119490) | 0 avis |

### Requêtes de recherche (22)

| # | Base | Requête exacte | Résultats regardés (sur) |
|---|---|---|---|
| Q1 | Crossref | `meta-analysis thought suppression rebound ironic effects` | 20 |
| Q2 | Europe PMC | `"thought suppression" AND (meta-analysis OR replication) AND (rebound OR ironic)` | 25 (93) |
| Q3 | Europe PMC | `(Mamat AND Anderson AND suppression) OR ("suppression training" AND (replication OR "intrusive thoughts" OR anxiety))` | 25 (80) |
| Q3b | Europe PMC | citations de Mamat & Anderson 2023 (PMID 37729415) | toutes (35) |
| Q4 | Crossref | `suppression-induced forgetting think/no-think meta-analysis replication` | 20 |
| Q5 | Crossref | `expressive suppression culture moderator psychological functioning Asian European American` | 20 |
| Q6 | Europe PMC | `("emotion regulation" OR "expressive suppression" OR "emotional acceptance") AND (culture OR cultural) AND (meta-analysis OR moderator)` | 25 (9 955) |
| Q7 | Crossref | `relation between emotion regulation and mental health meta-analysis review culture suppression reappraisal` | 15 |
| Q8 | Europe PMC | `("accepting negative emotions" OR "acceptance of negative emotions" OR "emotional acceptance" OR "habitual acceptance") AND (culture OR cultural OR "cross-cultural" OR Asian OR Chinese OR Japanese OR Korean)` | 25 (973) |
| Q9 | Crossref | `acceptance of negative emotions cross-cultural psychological health East Asian replication` | 20 |
| Q10 | Crossref | `perceiving societal pressure to be happy poor well-being happy nations countries` | 10 |
| Q11 | Europe PMC | `("emotion regulation" OR "experiential avoidance" OR "expressive suppression" OR "emotional acceptance" OR "psychological flexibility") AND (Egypt OR Egyptian OR Arab OR Arabic OR "Saudi" OR Jordan OR Lebanon OR "Middle East")` | 25 (4 680) |
| Q12 | Europe PMC | `("expressive suppression" OR "Acceptance and Action Questionnaire" OR "AAQ-II" OR "emotion acceptance") AND (Arab OR Arabic OR Egypt OR Egyptian OR Saudi OR Emirati OR Qatar OR Kuwait OR Jordanian OR Lebanese OR Tunisia OR Morocco OR Algeria) AND (depression OR "well-being" OR anxiety)` | 25 (278) |
| Q13 | Crossref | `Acceptance and Action Questionnaire AAQ-II discriminant validity negative affect neuroticism what does it measure` | 15 |
| Q14 | Europe PMC | `(acceptance OR "experiential avoidance" OR "nonjudging" OR "non-judging") AND (depression OR "negative affect") AND ("cross-lagged" OR "reciprocal" OR "bidirectional") AND longitudinal` | 25 (12 008) |
| Q15 | Crossref | `Mind your words positive and negative items create method effects Five Facet Mindfulness Questionnaire` | 5 |
| Q16 | Europe PMC | `(acceptance) AND (suppression OR reappraisal) AND ("meta-analysis" OR "systematic review") AND ("emotion regulation") AND (experimental OR induced OR instructed)` | 25 (1 882) |
| Q17 | Crossref | `effects of suppression and acceptance on emotional responses anxiety mood disorders experiment` | 12 |
| Q18 | Crossref | `efficacy of acceptance and commitment therapy updated systematic review meta-analysis researcher allegiance study quality` | 12 |
| Q19 | Europe PMC | `("acceptance and commitment therapy" OR "acceptance-based") AND ("publication bias" OR "researcher allegiance" OR "allegiance") AND (meta-analysis)` | 25 (1 201) |
| Q20 | Europe PMC | `(nonjudging OR "non-judging" OR "nonjudgment" OR "emotional acceptance" OR "acceptance of emotions" OR "meta-emotion") AND (depress*) AND ("cross-lagged" OR "random intercept" OR "prospective" OR "temporal precedence")` | 25 (840) |
| Q21 | Europe PMC | `("accepting negative emotions" OR "acceptance of negative emotions" OR "habitual acceptance" OR "negative meta-emotions" OR "feeling bad about feeling bad" OR "judging emotions") AND (replication OR preregistered OR "pre-registered" OR "failed to replicate")` | 25 (98) |
| Q22 | Crossref | `Arab Muslim culture emotion regulation suppression acceptance well-being depression collectivism` | 15 |
| T1–T3 | Europe PMC | par titre : `TITLE:"Emotion regulation and culture" AND AUTH:"Butler"` ; `TITLE:"How to handle anxiety" AND AUTH:"Hofmann"` ; `TITLE:"consequences of effortful emotion regulation when processing distressing material"` | 1 chacune |

Obligatoires : « meta-analysis » (Q1, Q2, Q4, Q6, Q7, Q16, Q19), « replication » (Q2, Q3, Q4, Q9, Q21),
« culture » / « moderator » (Q5, Q6, Q8, Q9, Q22).

---

## (b) Contre-preuves retenues

Chaque DOI a été vérifié par moi sur Crossref (`works/<doi>` : titre, premier auteur, année concordent ; écart
d'année signalé quand Crossref donne la parution en ligne et Europe PMC le numéro). « Force » = poids de l'argument
contre le verdict, selon la grille (rang du plan, taille, indépendance).

### Contre c2 (essayer de chasser le sentiment ne le fait pas partir)

**1. Dunn, Billotti, Murphy & Dalgleish 2009** — 10.1016/j.brat.2009.05.007 — *Behaviour Research and Therapy*
- Plan : expérience, 3 groupes (suppression du ressenti et de l'expression / acceptation / sans consigne), suivi à 1 semaine.
- Population : 89 adultes en bonne santé (Royaume-Uni), vidéo d'accidents de la route.
- Résumé : « These findings suggest, contrary to the current clinical zeitgeist, that emotion suppression can successfully lead to an ongoing down-regulation of emotion and memory, whereas acceptance may elevate subsequent emotionality. » La suppression a réduit la peur ressentie pendant la vidéo et rendu plus probable zéro intrusion ; l'acceptation n'a rien changé pendant la vidéo et s'accompagnait de plus d'affect négatif à une semaine.
- Joue contre : **c2, contredit** (supprimer le ressenti l'a fait baisser) ; nuance c3 (l'acceptation n'a pas aidé).
- Force : moyenne-faible. Une seule expérience, n ≈ 30 par groupe, rang « expérience » (inférieur à la méta-analyse de Webb) : n'interdit pas « soutient », mais c'est une incohérence à compter.

**2. Mamat & Anderson 2023** — 10.1126/sciadv.adh5292 — *Science Advances*
- Plan : essai randomisé, 3 jours d'entraînement en ligne à supprimer des pensées craintives (contre pensées neutres), suivi à 3 mois.
- Population : 120 adultes de 16 pays.
- Résumé : « No paradoxical increases in fears occurred. Instead, suppression reduced memory for suppressed fears and rendered them less vivid and anxiety provoking. After training, participants reported less anxiety, negative affect, and depression with the latter benefit persisting at 3 months. »
- Joue contre : **c2, contredit** (pensées liées au sentiment ; la suppression entraînée a réduit l'anxiété et la dépression, sans rebond).
- Force : moyenne-faible. Rang « essai randomisé » ; petit, un seul laboratoire, celui qui a créé le paradigme think/no-think (allégeance) ; aucune réplication indépendante parmi ses 35 citations dans Europe PMC (les suites, Satish 2024, Lundsgaard 2026, incluent Anderson) ; et le paradigme sur lequel il repose a échoué à une réplication préenregistrée (carte 3).

**3. Wiechert et al. 2023** — 10.1080/09658211.2023.2208791 — *Memory* (affaiblit la carte 2)
- Plan : réplication préenregistrée et collaborative du paradigme think/no-think (en ligne, expérimentateur présent).
- Population : 150 adultes anglophones en bonne santé.
- Résumé : « Overall, we did not replicate the suppression-induced forgetting effect (same-probe: BF01 = 7.84; d = 0.03 [95% CI: -0.13; 0.20]; independent-probe: BF01 = 5.71; d = 0.06 [95% CI: -0.12; 0.24]). »
- Joue : contre la contre-preuve de Mamat & Anderson, donc **pour c2** indirectement. Wessel et al. 2020 (10.1080/09658211.2020.1797095) note aussi que la littérature think/no-think « contains predominantly positive findings and few null-results » (signe de biais de publication).
- Force : moyenne. Porte sur l'oubli de mots, pas sur l'émotion.

**4. Wang, Hagger & Chatzisarantis 2020** — 10.1177/1745691619898795 — *Perspectives on Psychological Science*
- Plan : méta-analyse, k = 31 études du paradigme de Wegner.
- Résumé : « Consistent with our predictions, rebound effects were observed regardless of cognitive load, whereas immediate enhancement effects were observed only in the presence of cognitive load. »
- Joue : **nuance c2**. Le rebond après la suppression se confirme (appui à « ça ne part pas pour de bon ») ; mais pendant l'effort, sans charge mentale, la pensée n'augmente pas. Le livre ne peut pas dire « dès que tu essaies de chasser une pensée, elle grossit ».
- Force : élevée pour la nuance (méta-analyse), nulle comme contradiction.

**5. Webb, Miles & Sheeran 2012** — 10.1037/a0027600 — l'appui de c2 lui-même
- Résumé : « Whereas distraction was an effective way to regulate emotions (d(+) = 0.27), concentration was not (d(+) = -0.26). Similarly, suppressing the expression of emotion proved effective (d(+) = 0.32), but suppressing the experience of emotion or suppressing thoughts of the emotion-eliciting event did not (d(+) = -0.04 and -0.12, respectively). »
- Joue : **nuance c2 par son propre appui**. « Chasser » ne doit pas inclure la distraction (penser à autre chose marche, d = 0,27) ; la méta-analyse porte sur l'effet immédiat en laboratoire, pas sur des semaines.
- Force : élevée sur le périmètre de l'affirmation.

**6. Niczyporuk 2025** — 10.3758/s13423-025-02763-w — *Psychonomic Bulletin & Review*
- Plan : revue narrative (white bear et think/no-think ; questionnaires, clinique, quasi-expériences).
- Résumé : « Findings suggest that, in healthy populations, suppression can be effective, while paradoxical effects have not been convincingly demonstrated. »
- Joue contre : **c2, contredit** (sur les pensées).
- Force : faible (revue narrative, rang bas, un seul auteur).

**7. Swisher & Newman 2026** — 10.1016/j.brat.2026.104961 — *Behaviour Research and Therapy*
- Plan : échantillonnage d'expériences, 7 jours × 7 relevés.
- Population : 49 personnes avec un TOC.
- Résumé : « Also, higher TS was associated with decreased obsessions and negative mood and increased positive mood 2 h later. »
- Joue : **nuance c2** (dans la vie quotidienne, pas de rebond visible à 2 h ; mais humeur pire au moment même).
- Force : faible (rang bas, petit échantillon clinique).

**8. Hofmann, Heering, Sawyer & Asnaani 2009** — 10.1016/j.brat.2009.02.010 — *Behaviour Research and Therapy*
- Plan : essai randomisé, 3 consignes (réévaluation, acceptation, suppression) avant un discours improvisé.
- Population : 202 volontaires.
- Résumé : « However, the Acceptance and Suppression groups did not differ in their subjective anxiety response. »
- Joue : **nuance c2 et c3** : sur l'anxiété ressentie, supprimer ne fait pas pire qu'accepter ; la réévaluation fait mieux que les deux. L'acceptation fait mieux que la suppression sur la fréquence cardiaque.
- Force : moyenne (essai randomisé, n correct, une situation).

**9. Campbell-Sills, Barlow, Brown & Hofmann 2006** — 10.1016/j.brat.2005.10.001 — *Behaviour Research and Therapy*
- Plan : expérience randomisée (suppression contre acceptation), film émouvant.
- Population : 60 personnes avec trouble anxieux ou de l'humeur.
- Résumé : « Although both groups reported similar levels of subjective distress during the film, the acceptance group displayed less negative affect during the post-film recovery period. »
- Joue : **nuance c2** (pendant l'émotion, pas de différence ressentie) ; appui partiel à l'acceptation après coup.
- Force : faible-moyenne.

### Contre c1 (juger ses émotions ↔ plus d'émotion négative et moins bonne santé avec le temps)

**10. Van Dam, Hobkirk, Danoff-Burg & Earleywine 2012** — 10.1177/1073191112438743 — *Assessment* (« Mind Your Words »)
- Contexte vérifié dans le texte de Ford 2018 (PMC5767148) : l'« acceptation » y est mesurée par la sous-échelle « nonjudgment » du FFMQ (études 1 et 3) ou du KIMS (étude 2), items du type « I tell myself I shouldn't be feeling the way that I'm feeling », tous formulés en négatif.
- Plan : analyse factorielle confirmatoire, grand échantillon d'étudiants.
- Résumé : « Results indicated that a correlated facets model better explained the data and that negative and positive wording constituted substantive method effects. »
- Joue : **affaiblit c1** (risque de biais de mesure) : un score bas d'« acceptation » est un score élevé d'auto-critique, proche de la détresse que l'on cherche à prédire ; Wolgast 2014 (10.1016/j.beth.2014.07.002) montre la même chose pour l'AAQ-II : « the analysis found the items of the AAQ-II to be more strongly related to items designed to measure distress than items designed to measure acceptance/nonacceptance ».
- Force : faible-moyenne, et **en partie réfutée** : Ford 2018 contrôle la réévaluation, la rumination et les autres facettes de pleine conscience ; Willroth et al. 2023 (10.1037/emo0001220, labo Mauss) trouve le lien « concurrently and prospectively, above and beyond … broader traits (i.e., extraversion, neuroticism, trait emotions) ». Je le dis : mon argument de mesure ne renverse pas c1, il justifie au plus un cran de risque de biais.

**11. Nickerson et al. 2025** — 10.1016/j.jad.2025.119490 — *Journal of Affective Disorders*
- Plan : longitudinal, 4 temps à 6 mois d'écart, modèle croisé à intercepts aléatoires (intra-personne).
- Population : 1 235 réfugiés en transit en Indonésie ; questionnaire en arabe, farsi, dari, somali ou anglais (part d'arabophones non donnée dans le résumé).
- Résumé : « Greater depression symptoms were associated with increased non-acceptance of positive emotions. Non-acceptance of negative emotions showed a bidirectional relationship with PTSD symptoms. »
- Joue : **nuance c1** : dans le seul échantillon trouvé qui comprend des arabophones, le résumé ne rapporte de lien temporel de la non-acceptation des émotions *négatives* qu'avec le TSPT, et dans les deux sens ; aucun avec la dépression ni la colère n'est rapporté (c'est la non-acceptation des émotions *positives* qui prédit les symptômes). Le sens inverse (symptômes → non-acceptation) existe : c1 reste une association.
- Force : moyenne (grand, intra-personne) ; mesure brève de la non-acceptation des émotions négatives (limite donnée par les auteurs) ; population très particulière.

**12. Roos et al. 2026** — 10.1038/s41598-026-59035-3 — *Scientific Reports*
- Plan : essai randomisé, une séance numérique (« Visitor Mindset ») visant les croyances sur les émotions négatives et leur acceptation, contre vidéos de nature ; suivi à 2 semaines.
- Population : 530 adultes en détresse (CloudResearch, États-Unis).
- Résumé : « There was not a significant difference in changes in emotional distress between treatment conditions (d=0.13, p>.05). »
- Joue : **affaiblit la lecture causale de c1 et le « à retenir »** : la seule manipulation récente de l'acceptation trouvée ne baisse pas la détresse, son critère principal (effet significatif seulement dans le sous-groupe le plus en détresse, d = 0,34, analyse secondaire ; baisse de la gêne fonctionnelle d = 0,21).
- Force : moyenne (essai randomisé, grand) ; une seule séance, plusieurs ingrédients mêlés.

### Contre c3 (accepter aide davantage que les autres façons) — renforce « pas davantage »

**13. Gower, Styler & Litz 2026** — 10.1016/j.cpr.2026.102786 — *Clinical Psychology Review*
- Plan : revue systématique et méta-analyse à trois niveaux, 34 essais randomisés, ACT complète contre psychothérapies reconnues.
- Résumé : « Random-effects three-level meta-analyses indicated that full-model ACT was not superior to bona fide psychotherapies on mental and behavioral health outcomes (g = -0.01, p = .86). »
- Joue : **c3, contredit le « davantage »** (avec A-Tjak 2015 et Öst 2014 : « When ACT was compared to various forms of cognitive or behavioral treatments a small and non-significant effect size of 0.16 was obtained », 10.1016/j.brat.2014.07.018). Gower relève aussi « lack of preregistration … inadequate statistical power … interpretive overreach » dans ces essais.
- Force : élevée (méta-analyse d'essais) ; indirecte (l'ACT n'est pas seulement « accepter le sentiment »).

### Le modérateur culturel (public égyptien)

**14. Hu et al. 2014** — 10.2466/03.20.pr0.114k22w4 — *Psychological Reports*
- Plan : méta-analyse, 48 études, 51 échantillons, 21 150 participants (réévaluation et suppression expressive ↔ santé mentale).
- Résumé : « Moreover, the correlation of expressive suppression and negative indicators of mental health was stronger in the Western cultural values category (r = .19) than in the Eastern cultural values category (r = .06). »
- Joue : **nuance l'applicabilité** (le coût de « cacher » dépend de la culture). Porte sur la suppression de l'expression, pas sur le jugement de ses émotions.
- Force : moyenne (méta-analyse de corrélations ; « Eastern » = surtout Asie de l'Est).

**15. Soto, Perez, Kim, Lee & Minnick 2011** — 10.1037/a0023340 — *Emotion*
- Plan : transversal, modération par la culture. Population : 71 Euro-Américains, 100 étudiants de Hong Kong.
- Résumé : « A moderation analysis revealed that expressive suppression was associated with adverse psychological functioning for European Americans, but not for Chinese participants. »
- Joue : nuance l'applicabilité. Force : faible (transversal, petit).

**16. Butler, Lee & Gross 2007** — 10.1037/1528-3542.7.1.30 — *Emotion*
- Plan : questionnaire + expérience de suppression en interaction face à face.
- Résumé : « These deleterious effects were reduced when individuals with more Asian values suppressed, and these reductions were mediated by cultural differences in the responsiveness of the suppressors. »
- Joue : nuance l'applicabilité (conséquences sociales de la suppression). Force : faible-moyenne.

**17. Schunk, Trommsdorff & König-Teshnizi 2021** — 10.1080/02699931.2021.1997924 — *Cognition and Emotion* (Crossref 2021, numéro 2022)
- Plan : transversal. Population : 524 étudiants japonais, 476 germanophones.
- Résumé : « Across cultures, distraction from negative emotions, savouring positive emotions, and reappraisal were related to better MH, whereas distraction from positive emotions and ruminating on negative experiences were related to worse MH. » et « Contrary to the German pattern, suppressing negative emotions out of empathic concern was associated with better MH among Japanese, which was mediated by interdependent self-construal. »
- Joue : **nuance c2 et c3** (se détourner d'une émotion négative va avec une meilleure santé dans les deux cultures ; cacher par égard pour les autres va avec une meilleure santé au Japon).
- Force : faible (transversal).

**18. Qiu, Lai, Koike, Sellbom, Liddell & Jobson 2026** — 10.1002/cpp.70276 — *Clinical Psychology & Psychotherapy*
- Plan : revue systématique, 54 articles, Asie de l'Est contre Occident.
- Résumé : « Third, associations between putatively maladaptive regulation strategies (e.g., suppression, avoidance and rumination) and mental health difficulties were less pronounced, absent or at times beneficial among East Asians. »
- Joue : nuance l'applicabilité de tout le cadre « éviter = nuisible » hors d'Occident. Force : moyenne (revue systématique), indirecte pour l'Égypte.

**19. Alfayez 2026** — 10.3389/fpsyg.2026.1738432 — *Frontiers in Psychology*
- Plan : transversal, équations structurelles. Population : 306 adultes en Arabie saoudite.
- Résumé : « Cognitive reappraisal predicted lower levels of depression and anxiety, whereas expressive suppression was associated with higher psychological distress. » et « Unexpectedly, mindfulness demonstrated small positive direct associations with depression and anxiety once emotion regulation variables were included, suggesting partial suppression effects. »
- Joue : **dans les deux sens, je le dis** : dans le seul échantillon arabe pertinent trouvé, la suppression va avec plus de détresse (le modérateur est-asiatique ne s'y voit pas : appui à l'applicabilité) ; la pleine conscience, une fois la régulation prise en compte, va un peu avec plus de symptômes (signal faible contre « accepter aide », artefact statistique possible).
- Force : faible (transversal).

**20. Dejonckheere et al. 2022** — 10.1038/s41598-021-04262-z — *Scientific Reports* (touche c4 et le cœur social de c1)
- Plan : transversal multinational, 40 pays, 7 443 participants (Europe 17, Asie 10, Afrique 4… ; liste des pays en annexe, non vérifiée : aucun pays arabe nommé dans le texte principal).
- Résumé : « People's felt societal pressure to be happy and not sad is particularly linked to poor well-being in countries with a higher World Happiness Index. »
- Joue : nuance l'applicabilité (le lien « on attend de moi que je ne sois pas triste » ↔ mal-être est plus fort dans les pays les plus heureux ; s'il s'applique, plus faible dans un pays moins haut au classement, à vérifier pour l'Égypte).
- Force : faible-moyenne (transversal, grand).

### Biais de publication et allégeance

**21. Saunders, Suzuki, Vafaie, Bloch & Kober 2025** — 10.1159/000548530 — *Psychotherapy and Psychosomatics* (Crossref 2025, Europe PMC 2026)
- Plan : méta-analyse, 107 essais de pleine conscience chez les jeunes ; pratique méditative des auteurs recueillie par enquête.
- Résumé : « We provide novel evidence that greater investigator MPH is significantly associated with better treatment outcomes. »
- Joue : signe d'**allégeance** dans la famille « pleine conscience / acceptation » (indirect pour nos études).
- Force : faible pour notre verdict (enfants, interventions, pas l'acceptation des émotions en soi).

Constats d'allégeance tirés des résumés et des listes d'auteurs (pas de nouvelle étude) :
- Lignée de c1 concentrée dans un laboratoire : Ford 2018, Shallcross 2010, Zerwas 2024 et Willroth 2023 ont tous Mauss pour autrice ; Ford 2018 appelle lui-même à « additional direct replications » et à des « experimental manipulations or intervention studies that manipulate acceptance » (limites, PMC5767148). Bastian 2012 et Bailen 2019 sont indépendants.
- Lignée « la suppression marche » : laboratoire d'Anderson (créateur du paradigme), réplication préenregistrée négative (carte 3).
- ACT : faiblesses de méthode répétées (Öst 2014 : « no significant improvement in methodological quality and deterioration in effect size » ; Gower 2026).

### Limites internes des appuis de c1 (lues dans leurs résumés)

- Shallcross 2010 : « Both studies examined female samples » ; l'acceptation ne prédit moins de symptômes dépressifs « after higher, but not lower, life stress ».
- Bastian 2012 : effets trouvés en Australie et au Japon, « although the effects of social expectancies are especially evident in the former » (plus faibles au Japon).
- Bailen 2019 : n = 79, 7 jours, association entre personnes.
- Ford 2018 : modération par l'ethnicité testée (Européens-Américains contre non-Européens, dont 22 à 53 % d'Américains d'origine asiatique selon l'échantillon) : non significative, sauf une fois (dépression, échantillon A), jugée due au hasard par les auteurs ; aucun échantillon hors des États-Unis.

---

## (c) Cherché et pas trouvé (notFound)

- Aucun avis Crossref (rétractation, correction, expression of concern) sur les 11 DOI du verdict ni sur 4 contre-preuves clés (2026-11-22).
- Aucune méta-analyse ni étude longitudinale qui **ne trouve pas** le lien de c1 (juger ses émotions négatives ↔ plus d'affect négatif) : je n'ai pas de contradiction de rang égal pour c1.
- Aucune réplication directe, préenregistrée ou indépendante, de Ford et al. 2018 ; aucune de Bastian et al. 2012 (Q21).
- Aucune réplication indépendante de Mamat & Anderson 2023 (35 citations regardées).
- Aucune réplication multi-laboratoires de l'effet rebond de Wegner (Q1, Q2) ; seules les méta-analyses (Abramowitz 2001, Wang 2020).
- Aucun test de biais de publication visible dans les résumés de Webb 2012 et d'Abramowitz 2001 (non vérifié dans les textes).
- **Aucun échantillon égyptien**, et aucun échantillon arabe en expérience ou en essai, sur l'acceptation des émotions, les méta-émotions ou le rebond de la suppression ; ce qui existe est transversal ou de validation d'échelle (Q11, Q12, Q22), plus Nickerson 2025 (réfugiés, en partie arabophones) et Alfayez 2026 (Arabie saoudite).
- Tyndall et al. 2019 (10.1016/j.jcbs.2018.09.005, validité discriminante de l'AAQ-II) : DOI vérifié, mais résumé absent de Crossref et d'Europe PMC : **non retenu** comme carte. Mamat, Levy & Bayley 2024 (10.3389/fpsyg.2024.1496134) : résumé vide : non retenu.

---

## (d) Conclusion

**Le badge ⚖️ tient.** Rien de ce que j'ai trouvé ne pousse vers ✅, et rien ne contredit c1 ou c2 depuis un rang égal
ou supérieur, donc rien n'interdit « soutient » ni n'ouvre ❌. Mais trois certitudes ou directions me semblent trop
généreuses, et une nuance manque.

1. **c1 : direction « soutient » tenable, certitude « modérée » à justifier ou à baisser à « basse ».** Le plafond est
   déjà « modérée » (meilleurs plans : longitudinaux et l'expérience de Bastian sur les attentes sociales). La garder
   suppose de ne descendre pour rien, alors qu'il y a : (i) le caractère indirect que la grille nomme elle-même (aucun
   échantillon arabe ; le seul proche, Nickerson 2025, ne lie la non-acceptation des émotions négatives qu'au TSPT ;
   effet plus faible au Japon chez Bastian) ; (ii) un risque de biais de mesure (items d'auto-critique, Van Dam 2012),
   en partie levé par Willroth 2023 ; (iii) une lignée concentrée dans un laboratoire, sans réplication indépendante.
   Ma recommandation : **c1 → basse**, ou écrire dans `verdict` pourquoi aucune de ces raisons ne suffit. Conséquence
   à voir : la certitude du verdict ne dépasse pas la plus basse des affirmations du champ (⚖️ basse reste permis), et
   le hook ne pourra plus s'appuyer sur c1.
2. **c2 : « soutient en partie », certitude « modérée » au plus.** Départ « haute » (Webb 2012), un cran pour
   l'incohérence (Dunn 2009, Mamat & Anderson 2023, Niczyporuk 2025 ; affaiblis par Wiechert 2023), et un second se
   défend pour le caractère indirect (effets immédiats de laboratoire, étudiants occidentaux) → « basse ». Surtout,
   **resserrer l'affirmation** : « essayer d'étouffer le sentiment ou d'en chasser les pensées ne le fait pas partir pour
   de bon (il revient après) », **sans** la distraction (Webb : d = 0,27, elle marche) et **sans** « ça empire tout de
   suite » (Wang 2020 : pas d'augmentation pendant l'effort sans charge mentale). Si le hook repose sur c2, il doit
   tenir dans ce périmètre.
3. **c3 : passer de « mêlée » à « contredit » pour le « davantage »**, ou la scinder (c3a « accepter plutôt que
   supprimer » : mêlée — mieux pour le cœur, pas toujours pour le ressenti, Hofmann 2009, Campbell-Sills 2006,
   Dunn 2009 ; c3b « accepter plus que les autres bonnes façons » : contredit, modérée — Gower 2026, A-Tjak 2015,
   Öst 2014, Kohl 2012 ; indirect car l'ACT n'est pas seulement l'acceptation). La nuance du verdict (« pas plus que
   d'autres bonnes façons ») le dit déjà : la direction doit suivre.
4. **« À retenir »** : aucune preuve causale ne porte sur l'action « accepte ton sentiment » avec un effet net sur la
   détresse (Roos 2026 nul au critère principal ; Kohl 2012 ; Dunn 2009 nul ou pire à une semaine). Donc « جرّب » /
   « ممكن يساعد », jamais `evidence`.
5. **Nuance à ajouter (page des preuves, ou dans la vidéo si place)** : « dans les cultures où l'on cache ses émotions
   par égard pour les autres, cacher n'est pas toujours nuisible » (Hu 2014, Soto 2011, Butler 2007, Schunk 2021,
   Qiu 2026) — avec honnêteté : c'est montré en Asie de l'Est, et le seul échantillon saoudien trouvé (Alfayez 2026)
   montre le schéma occidental. La phrase « معظم الدراسات من أمريكا وأوروبا » est obligatoire ici.
6. **Verbes** : c1 et le sens inverse (Nickerson 2025 : bidirectionnel) interdisent « بيخلّيك » / « بيسبب » sur le lien
   jugement ↔ mal-être ; « ارتباط » seulement.

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1016/j.brat.2009.05.007 — Dunn et al. 2009 (contredit c2, nuance c3)
2. 10.1126/sciadv.adh5292 — Mamat & Anderson 2023 (contredit c2)
3. 10.1080/09658211.2023.2208791 — Wiechert et al. 2023 (affaiblit 2 ; à mettre avec lui)
4. 10.1177/1745691619898795 — Wang, Hagger & Chatzisarantis 2020 (périmètre de c2 : rebond oui, aggravation immédiate non)
5. 10.1016/j.cpr.2026.102786 — Gower, Styler & Litz 2026 (c3 : pas davantage)
6. 10.1038/s41598-026-59035-3 — Roos et al. 2026 (« à retenir », lecture causale de c1)
7. 10.1016/j.jad.2025.119490 — Nickerson et al. 2025 (c1, sens inverse, seul échantillon en partie arabophone)
8. 10.2466/03.20.pr0.114k22w4 — Hu et al. 2014 (culture, méta-analyse)
9. 10.1016/j.brat.2009.02.010 — Hofmann et al. 2009 (c2/c3)
10. 10.1037/emo0001220 — Willroth et al. 2023 (**appui** de c1 contre le biais de mesure : à ajouter aussi)
11. 10.1002/cpp.70276 — Qiu et al. 2026 (culture, revue systématique)
12. 10.1080/02699931.2021.1997924 — Schunk et al. 2021 (distraction ; suppression par empathie)
13. 10.1177/1073191112438743 — Van Dam et al. 2012 (mesure de Ford 2018)
14. 10.1037/a0023340 — Soto et al. 2011 (culture)
15. 10.3758/s13423-025-02763-w — Niczyporuk 2025 (c2, revue narrative)
16. 10.1016/j.brat.2005.10.001 — Campbell-Sills et al. 2006 (c2/c3, échantillon clinique)
17. 10.3389/fpsyg.2026.1738432 — Alfayez 2026 (échantillon saoudien)
18. 10.1016/j.brat.2014.07.018 — Öst 2014 (c3, qualité des essais d'ACT)
19. 10.1038/s41598-021-04262-z — Dejonckheere et al. 2022 (c4, 40 pays)
20. 10.1037/1528-3542.7.1.30 — Butler, Lee & Gross 2007 (culture)
21. 10.1016/j.brat.2026.104961 — Swisher & Newman 2026 (c2, TOC)
22. 10.1016/j.beth.2014.07.002 — Wolgast 2014 (mesure de l'acceptation)
23. 10.1159/000548530 — Saunders et al. 2025 (allégeance, indirect)
