# Contre-preuve : « Freedom Through Commitment » (Manson), verdict ⚖️ basse

Agent contre-preuve, 2026-11-22. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé (brouillon
`dossiers/too-many-choices.json` et `.md`, fiches `content/sources/` qu'il cite). Je ne valide rien. Lu :
`docs/verdict.md` (grille). Aucun autre fichier du dépôt `book-vs-science` n'a été modifié.

Sources : Crossref (`query.bibliographic`, `filter=updates:<doi>`, `filter=from-pub-date:`, `works/<doi>`), Europe PMC
(`search`, `resultType=core`), OpenAlex (`search`, `filter=cites:<id>`, `works/doi:<doi>` pour les résumés). Deux textes
intégraux lus (Yeung 2025, PMC12705060 ; Lindkvist & Luke 2022, PMC8972165 ; API BioC de NCBI, l'API plein texte
d'Europe PMC répondait 500). User-Agent générique `book-vs-science-counter/0.1`, aucun nom ni e-mail. Réponses brutes :
dans le scratchpad de la session (`ce/raw/`), pas dans le dépôt.

Chaque DOI cité ci-dessous a été trouvé par une requête, puis vérifié par moi sur Crossref (`works/<doi>` : titre,
premier auteur, année ; écart d'année signalé). Rien n'est pris de mémoire : quand je soupçonnais une étude, je l'ai
cherchée par son titre et je ne la cite que si Crossref la connaît. « Force » = poids de l'argument contre le verdict,
selon la grille (rang du plan, taille, indépendance).

Limites de ma recherche : résumés surtout ; deux textes intégraux seulement ; le texte de Chernev 2015 et de son
corrigendum n'est pas lu (accès fermé) ; Hu 2026 n'est pas en accès libre.

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 12 DOI du verdict (651235, j.jcps.2014.08.002, 0022-3514.79.6.995, mar.20269, 15213269.2015.1121827, s1930297500005234, mar.20271, 0022-3514.82.4.503, prbm.s364548, 1948550615595271, j.1745-6924.2008.00078.x, 651242) | 0 avis pour chacun |
| Crossref | `works/10.1016/j.jcps.2015.07.001` (corrigendum de Chernev, déjà noté par le brouillon) | existe (Crossref 2016, OpenAlex 2015), **non relié** à l'article par Crossref : `filter=updates:` ne le voit pas |
| Crossref | `filter=updates:` sur 15 contre-preuves clés (1069031x211073821, fpsyg.2022.800528, 71165, 09567976251400333, a0023663, s1930297500003247, 670252, 598969, s11336-017-9571-z, jmkr.47.2.312, qjec.2010.125.1.263, 0033-2909.134.2.270, mar.20268, bs16101826, xap0000481) | 0 avis |

### Requêtes de recherche

| # | Base | Requête exacte | Résultats regardés (sur) |
|---|---|---|---|
| Q1 | Europe PMC | `("choice overload" OR "too much choice" OR "too-much-choice" OR "assortment size" OR "number of options") AND ("meta-analysis" OR "meta-analytic" OR "systematic review") AND PUB_YEAR:[2016 TO 2026]` | 25 (870) |
| Q2 | Crossref | `choice overload meta-analysis`, `from-pub-date:2016-01-01` | 25 |
| Q3 | Crossref | `assortment size choice deferral meta-analysis`, `from-pub-date:2016-01-01` | 20 |
| Q4 | Europe PMC | `("choice overload" OR "too much choice" OR "too-much-choice" OR "choice set size" OR "assortment size" OR "number of options") AND (preregistered OR "pre-registered" OR "registered report" OR replication OR "failed to replicate" OR "many labs")` | 30 (666) |
| Q5 | Crossref | `replication when choice is demotivating Iyengar Lepper jam` | 20 |
| Q6 | Crossref | `registered report replication choice overload extensive limited array`, `from-pub-date:2012-01-01` | 20 |
| Q7 | OpenAlex | travaux citant Iyengar & Lepper 2000 (W2126311339) depuis 2016, recherche `preregistered` / `registered report` / `failed to replicate` / `meta-analysis`, triés par citations | 56 (56) · 25 (203) · 25 (258) · 25 (700) |
| Q8 | OpenAlex | travaux citant Gilbert & Ebert 2002 (W2115909997), recherche `preregistered` / `registered report` / `replication` / `failed` | 10 (10) · 17 (17) · 25 (59) · 25 (84) |
| Q9 | Europe PMC | `("reversible decision" OR "reversible decisions" OR "decision reversibility" OR "irreversible decision" OR "irreversible decisions" OR "choice reversibility" OR "return policy") AND (satisfaction OR regret OR liking OR happiness) AND PUB_YEAR:[2014 TO 2026]` | 30 (142) |
| Q10 | Crossref | `reversible decisions lower satisfaction irreversible choice experiment`, `from-pub-date:2014-01-01,type:journal-article` | 25 |
| Q11 | Europe PMC | `("Gilbert and Ebert" OR "Gilbert & Ebert" OR "changeable outcomes" OR "reversible decisions" OR "decision reversibility") AND (replicat* OR preregist* OR "registered report")` | 19 (19) |
| Q12 | OpenAlex | `decision reversibility replication registered report satisfaction` | 15 |
| Q13 | Crossref | `Revisiting decisions and revisions affective forecasting changeable outcomes replication extension Gilbert Ebert`, depuis 2016 | 8 |
| Q14 | Crossref | par titre : choix « refermé » (Gu 2013), « Keeping doors open » (Shin 2004), « Tragic choices » (Botti 2009) | 3 chacune |
| Q15 | Crossref, Europe PMC, OpenAlex | `maximization well-being meta-analysis maximizing satisficing life satisfaction` ; `(maximizing OR maximization OR maximizers) AND (satisficing OR satisficers) AND ("meta-analysis" OR "meta-analytic")` ; `maximizing satisficing meta-analysis well-being regret` | 10 · 15 (36) · 10 |
| Q16 | OpenAlex | `choice overload cross-cultural` | 20 (bruit) |
| Q17 | Crossref | `culture choice overload number of options East Asian Indian American satisfaction`, `type:journal-article` | 15 |
| Q18 | Europe PMC | `("freedom of choice" OR "freedom to make life choices" OR "perceived control" OR "autonomy") AND ("life satisfaction" OR happiness OR "subjective well-being") AND (Arab OR "Middle East" OR MENA OR Egypt OR Egyptian OR Saudi OR Jordan OR Lebanon OR Tunisia OR Morocco OR Algeria OR Iraq OR "Gulf")` | 30 (2 890) |
| Q19 | Crossref | par titre : Fischer & Boer 2011 (63 sociétés), Chirkov 2003, Welzel & Inglehart 2010 | 3 chacune |
| Q20 | Crossref | par titre : courbe en U inversé (Reutskaja & Hogarth 2009, Shah & Wolford 2007, Reutskaja 2018) ; attentes (Diehl & Poynor 2010) | 3 chacune |
| Q21 | Crossref | par titre : terrain (Bertrand 2010, Iyengar & Kamenica 2010, Sethi-Iyengar 2004) ; Patall 2008 | 3 · 5 |
| Q22 | OpenAlex | `choice overload` + `Jordan` / `Saudi Arabia` / `Egypt` / `Iran` / `Turkey consumers` / `Pakistan` | 8 chacune |
| Q23 | Crossref | `FORRT replication database reversals social sciences` ; `replications and reversals list of psychological effects that failed to replicate` | 10 · 10 |
| Q24 | Crossref | `choice overload multi-site multi-lab replication too many options`, depuis 2016 | 15 |
| Q25 | Europe PMC | `("choice overload" OR "too many options" OR "too much choice" OR "number of options" OR "choice set size") AND (culture OR cultural OR "cross-cultural" OR "cross-national" OR nations OR countries) AND (satisfaction OR deferral OR "well-being")` | 25 (910) |
| Q26 | OpenAlex | `choice overload preregistered experiment`, depuis 2018 | 25 (985, bruit) |
| S1 | boule de neige | bibliographie de Yeung 2025 (texte intégral) → « Choice deprivation, choice overload, and satisfaction with choices across six nations », retrouvé par titre sur Crossref | 1 |

Obligatoires : « meta-analysis » (Q1, Q2, Q3, Q7, Q15), « replication » (Q4–Q8, Q11–Q13, Q24), « culture » /
« moderator » (Q16–Q18, Q22, Q25).

---

## (b) Contre-preuves retenues

### Sur les deux méta-analyses elles-mêmes (c1, c2) : moins une contradiction qu'une hétérogénéité

**1. Chernev, Böckenholt & Goodman, corrigendum** — 10.1016/j.jcps.2015.07.001 — *Journal of Consumer Psychology* (Crossref 2016)
- Texte (résumé OpenAlex) : « The authors wish to make the following corrections to page 348 in the section “The mean effect of assortment size on choice overload”: t(39) = .17, p < .001 should read b = .17, t(39) = 4.5, p < .001; t(39) = .04, p = .41 should read b = .04, t(39) = .9, p > .4; t(39) = .41, p < .001 should read b = .41, t(39) = 5.3, p < .001. »
- Joue : **corrige la fiche `chernev-2015-overload`**, dont la limite ne retient que « b = .41 ». La section « effet moyen » contient aussi un coefficient **non significatif** (b = .04, p > .4). Sans le texte intégral, je ne sais pas lequel des trois est l'effet sans modérateurs ; si c'est .04, Chernev rejoint Scheibehenne sur la moyenne (≈ 0) et ne trouve un effet qu'aux niveaux élevés des modérateurs.
- Force : moyenne, conditionnelle à la lecture de la p. 348. À lire avant de garder « les deux méta-analyses se contredisent ».

**2. McShane & Böckenholt 2018** — 10.1007/s11336-017-9571-z — *Psychometrika*
- Plan : nouvelle méta-analyse (multiniveau, multivariée) des données des deux méta-analyses précédentes ; Böckenholt est coauteur de Chernev 2015.
- Résumé : « In particular, it shows that choice overload varies substantially as a function of the six dependent measures and four moderators examined in the domain and that there are potentially interesting and theoretically important interactions among them. »
- Joue : **contre une phrase de Chernev 2015** (« four of the measures of choice overload used in prior research—satisfaction/confidence, regret, choice deferral, and switching likelihood—are equally powerful measures of choice overload and can be used interchangeably ») et donc contre l'usage du même résultat poolé pour c1 (satisfaction) **et** c2 (report). L'effet dépend de la mesure : c1 et c2 ne peuvent pas reposer sur le même chiffre global.
- Force : élevée sur la méthode (méta-analyse, rang haut) ; aucun chiffre par mesure dans le résumé.

**3. Scheibehenne, Greifeneder & Todd 2010** — 10.1086/651235 — la carte à l'écran elle-même
- Résumé, phrase de contexte : « The choice overload hypothesis states that an increase in the number of options to choose from may lead to adverse consequences such as a decrease in the motivation to choose or the satisfaction with the finally chosen option. » ; et : « A number of studies found strong instances of choice overload in the lab and in the field, but others found no such effects or found that more choices may instead facilitate choice and increase satisfaction. »
- Joue : **la ligne de carte prévue est trop étroite**. La moyenne « virtually zero » porte sur la satisfaction **et** la motivation à choisir, poolées ; « ما قلّلتش الرضا » seul attribue au résultat une mesure qu'il ne sépare pas. La fiche dit d'ailleurs « satisfaction with the choice or the wish to choose ».
- Force : élevée (c'est la formulation de l'écran).

### Contre c1 (plus d'options → moins satisfait de l'option choisie)

**4. Yeung et al. 2025** — 10.2196/71165 — *JMIR Human Factors*
- Plan : expérience randomisée, 1, 4 ou 16 exercices d'auto-soin au choix.
- Population : 652 adultes recrutés par l'Université chinoise de Hong Kong (e-mails, réseaux sociaux) ; **hors Occident**.
- Texte intégral : « The difference between the 16-choice condition and the 4-choice condition did not reach significance, t430.87=1.36, P=.37, d=0.13, 95% CI (−0.06 to 0.32). » (satisfaction de la décision, moyennes 4,80 contre 4,66 : en faveur de 16) ; « However, we found no significant differences in practice likelihood between participants in the 16-choice condition (121/216, 55.8%) and the 4-choice condition (113/220, 50.7%), OR 1.23, 95% CI (0.84-1.79), P=.29. » ; et, chez les plus anxieux, 16 choix donnaient plus de satisfaction pour l'exercice choisi (modération « tentative » selon les auteurs).
- Joue contre : **c1 et c2** (le passage de 4 à 16 options ne baisse ni la satisfaction ni le passage à l'acte ; la tendance va dans l'autre sens).
- Force : moyenne (randomisé, n correct, préenregistrement non dit) ; 16 options seulement, choix de peu d'enjeu.

**5. Hu, Moon & VanEpps 2026** — 10.1177/09567976251400333 — *Psychological Science*
- Plan : six expériences **préenregistrées**, 10 092 adultes des États-Unis.
- Résumé : « Nevertheless, in six preregistered experiments with 10,092 U.S. adults, we demonstrated that people consistently underestimated the effect of set size when predicting others' liking for a chosen option. »
- Joue contre : **c1, indirectement**. La question de l'étude est la prédiction, mais son prémisse mesurée est que l'option choisie dans un grand ensemble est **plus** aimée (« Larger sets are more likely to contain an option matching one's preferences », phrase d'introduction). Je ne l'ai pas lu en texte intégral (accès fermé) : **non utilisable** avant de vérifier que les choisisseurs eux-mêmes aiment plus leur choix quand l'ensemble est grand.
- Force : potentiellement élevée (préenregistré, très grand) ; aujourd'hui, une piste à lire.

**6. Reutskaja, Cheek, Iyengar & Schwartz 2022** — 10.1177/1069031x211073821 — *Journal of International Marketing*
- Plan : enquête transversale, six domaines de choix, six pays.
- Population : Brésil, Chine, Inde, Japon, Russie, États-Unis, N = 7 436.
- Résumé : « In most domains in most countries, choice deprivation was the norm—only in the United States was choice overload commonly reported. Deprivation was also more strongly related to decreased satisfaction with choices than was overload, suggesting that choice deprivation can be both more common and more consequential than overload. »
- Joue contre : **c1 hors des États-Unis, c4, et l'applicabilité** ; c'est aussi **contre l'allégeance** de ses auteurs (Iyengar, l'étude des confitures ; Schwartz, « The Paradox of Choice »), ce qui le rend plus crédible sur ce point.
- Force : moyenne pour l'applicabilité (grand, multinational), faible pour la causalité (transversal, choix déclarés). Aucun pays arabe.

**7. Le U inversé, ce que Manson dit lui-même (« Beyond a certain point »)** — nuance de c1
- Reutskaja & Hogarth 2009 — 10.1002/mar.20268 — *Psychology & Marketing* : « By considering the perceived benefits and costs of choice, it is proposed that satisfaction from choice is an inverted U‐shaped function of the number of alternatives. This proposition is verified experimentally. » (taille non dite).
- Reutskaja et al. 2018 — 10.1038/s41562-018-0440-2 — *Nature Human Behaviour* (Europe PMC) : « Activity was highest for 12-item sets, which were perceived as having 'the right amount' of options and was lower for 6-item and 24-item sets, which were perceived as 'too small' and 'too large', respectively. »
- Cai & Mo 2026 — 10.3390/bs16101826 — *Behavioral Sciences* : 1 036 jeunes adultes chinois, 3 vagues, choix de métier : « The data provided evidence of a U shape (quadratic b = 0.089, p < 0.001; Lind–Mehlum test p = 0.004). » et « the rise beyond it was less precisely estimated and sensitive to trimming and to the test used ».
- Shah & Wolford 2007 — 10.1111/j.1467-9280.2007.01906.x — *Psychological Science* : prédit un U inversé de l'achat (2 à 20 stylos), mais le résumé s'arrête à « METHOD » : **aucune phrase de résultat, non retenu**.
- Joue : **c1 telle qu'écrite (monotone) est plus forte que l'idée du livre**. L'affirmation testable fidèle à Manson est « au-delà d'un certain nombre, et quand choisir est difficile » ; la formulation « plus d'options → moins satisfait » est contredite à petit nombre (passer de 1 à 4 ou de 6 à 12 aide).
- Force : moyenne (plusieurs plans, petites études, une chinoise longitudinale mais corrélationnelle).

**8. Fasolo, Misuraca & Reutskaja 2024** — 10.1037/xap0000481 — *Journal of Experimental Psychology: Applied* (contre c3 et c4, voir plus bas)

### Pour c1 (ce que le brouillon sous-compte, à mettre au dossier pour l'équité)

- **Diehl & Poynor 2010** — 10.1509/jmkr.47.2.312 — *Journal of Marketing Research*, 3 études : « The current research demonstrates that even when consumers make a purchase, the same item may generate lower satisfaction when chosen from a larger rather than a smaller assortment. » Mécanisme : des attentes plus hautes. Appui expérimental de c1 indépendant de l'école Iyengar.
- **Thomas, Binder & Matthes 2022** — 10.1016/j.chb.2021.106977 — *Computers in Human Behavior* (Crossref 2022, OpenAlex 2021), Autriche, étude 2 expérimentale (n = 248 ; 11, 31 ou 91 profils) : « High (compared to low) partner availability increased fear of being single, decreased participants’ state self-esteem, and increased partner choice overload. » Proche de la scène probable (applis de rencontre), mais ne mesure pas la satisfaction envers le partenaire choisi.

### Contre c2 (plus d'options → on remet à plus tard ou on ne choisit rien)

**9. Lindkvist & Luke 2022** — 10.3389/fpsyg.2022.800528 — *Frontiers in Psychology*
- Plan : expérience en ligne **préenregistrée**, 16 tailles d'ensemble de 2 à 80 associations caritatives.
- Population : 501 participants Prolific, à 92,2 % résidant en Europe (texte intégral).
- Résumé : « The results indicate that there were no meaningful differences in donation likelihood between the 16 organization assortment sizes, neither for individuals with high preference certainty nor for individuals with uncertain preferences among charitable causes. » Texte intégral : odds ratio par option ajoutée 1,001 [0,993 ; 1,008].
- Joue contre : **c2, contredit** (et contre le modérateur « préférences incertaines » de Chernev, ici sans effet).
- Force : moyenne (préenregistré, effet estimé avec précision) ; ≈ 31 personnes par taille, un seul domaine (don).

**10. Altinger et al. 2025** — 10.1001/jamanetworkopen.2025.42949 — *JAMA Network Open*
- Plan : essai randomisé enregistré (ACTRN12625001025426), 402 médecins généralistes des États-Unis, 2 cas cliniques.
- Résumé : « Physicians in the intervention group had significantly higher odds of choosing an appropriate alternative (251 of 404 treatment decisions [62.1%]) compared with those in the control group (176 of 400 treatment decisions [44.0%]) (adjusted OR, 1.90; 95% CI, 1.09-3.30; P = .02). » et « Increasing the number of alternatives beyond 2 did not increase the effect. »
- Joue contre : **c2 dans une décision à enjeu** (plus d'alternatives → moins de statu quo, pas plus) ; mais 1 contre 2 à 4 options seulement.
- Force : moyenne-faible (randomisé, n correct, petites tailles d'ensemble, décisions sur scénario).

**11. Yeung et al. 2025** (carte 4) : 4 contre 16 options, pas de différence de passage à l'acte (55,8 % contre 50,7 %, p = .29).

### Pour c2 (le brouillon dit « une seule expérience primaire » : c'est trop peu, et cela change la raison du « −1 indirect »)

- **Bertrand, Karlan, Mullainathan, Shafir & Zinman 2010** — 10.1162/qjec.2010.125.1.263 — *Quarterly Journal of Economics* : essai randomisé de terrain par courrier, **Afrique du Sud** (crédit à la consommation) : « Showing fewer example loans, not suggesting a particular use for the loan, or including a photo of an attractive woman increases loan demand by about as much as a 25% reduction in the interest rate. » Enjeu réel, hors Occident ; mais « exemples de prêts » dans une publicité, pas des options à choisir.
- **Sethi-Iyengar, Huberman & Jiang 2004** — 10.1093/0199273391.003.0005 — chapitre (*Pension Design and Structure*) : « It was found that 401(k) plans that offered more funds had lower probability of employee participation. » Observationnel (entre plans), même laboratoire que l'étude des confitures.
- **Carroll, White & Pahl 2011** — 10.1017/s1930297500002667 — *Judgment and Decision Making*, Royaume-Uni, bénévolat (10 contre 30 associations) : « In both studies the more options considered, the greater the likelihood to defer. »
- Joue : c2 a des appuis **à enjeu** (retraite, crédit, bénévolat) et des contradictions **à enjeu** (dons, médecins). Le « −1 indirect » ne peut plus reposer sur « choix de peu d'enjeu » ; il repose sur l'applicabilité (aucun échantillon arabe).
- Hors carte : Su et al. 2026 (10.31234/osf.io/kp6jv_v1, **prépublication**) : « the strongest predictor of choice deferral is the overall value of a given set of options, with relative value (i.e., how hard it is to identify the best option) counterintuitively playing a smaller role » : on remet surtout quand **aucune** option ne plaît, pas parce qu'il y en a trop. Rang bas.

### Contre c3 (un choix définitif satisfait plus qu'un choix réversible)

**12. Aucune réplication de Gilbert & Ebert 2002.** Q8 : 0 réplication parmi les 10 travaux citants « preregistered », les 17 « registered report », les 59 « replication » et 25 des 84 « failed » ; Q11–Q13 : rien. Le seul nouveau travail sur la réversibilité (Bao et al. 2026, 10.1038/s44271-026-00496-7) mesure la performance (« ultimately achieved better final performance » quand on pouvait revenir en arrière), pas la satisfaction : non retenu pour c3, mais il rappelle que la réversibilité a aussi un bénéfice.

**13. Fasolo, Misuraca & Reutskaja 2024** — 10.1037/xap0000481 — *Journal of Experimental Psychology: Applied*
- Plan : expérience de terrain de 4 semaines (magasin de sport) + expérience **préenregistrée** (N = 669, panel et site marchand mondial).
- Résumé (Europe PMC) : « A 4-week field experiment in a sporting gear store establishes that FCs lead to greater consumer satisfaction compared to when the store displays no FC. » et « A large (N = 669) preregistered process-tracing experiment run with a consumer panel and a global e-commerce company shows that FCs at point-of-sale improve consumer satisfaction and customer experience compared to an equivalent message that does not make freedom to choose any amount salient. »
- Joue : **nuance c3 et c4** : rendre la liberté de choisir **visible** augmente la satisfaction envers ce qu'on choisit. Ce n'est pas la réversibilité, mais c'est l'inverse de « la liberté décourage » sur le même critère (satisfaction).
- Force : moyenne (préenregistré + terrain) ; message « choisis autant que tu veux », pas un engagement.

**14. Botti, Orfali & Iyengar 2009** — 10.1086/598969 — *Journal of Consumer Research* (nuance, dans les deux sens)
- Plan : entretiens + trois expériences de laboratoire ; décisions d'arrêt de réanimation d'un nourrisson, réelles ou imaginées.
- Résumé : « Findings from a multidisciplinary approach consisting of a qualitative analysis of in-depth interviews and three laboratory studies reveal that perceived personal causality for making tragic decisions generates more negative feelings than having the same choices externally made. » et « Consequently, participants disliked making decisions but also resented relinquishing their option to choose. »
- Joue : appui à Manson dans un cas extrême (choisir soi-même fait plus mal), mais montre aussi qu'on refuse de céder ce choix. Hors du champ de c3 (pas la réversibilité). Force : faible pour notre verdict.

### Pour c3 (sous-compté par le brouillon)

- **Gu, Botti & Faro 2013** — 10.1086/670252 — *Journal of Consumer Research*, 4 études : « Four studies show that performing acts of closure inhibits consumers’ propensity to reconsider their decision process and to engage in unfavorable comparisons between the chosen and the forgone options, resulting in greater satisfaction with the outcome of choices made from large sets. » C'est l'appui expérimental le plus proche de « s'engager, fermer la porte, rend plus satisfait » ; c'est une clôture psychologique (couvrir les options écartées), pas un choix irréversible, et des choix de consommation.
- **Bullens & van Harreveld 2016** — 10.1111/spc3.12268 — revue narrative : « However, previous research has unequivocally shown that reversible decisions actually yield lower levels of post‐choice satisfaction and higher levels of regret than irreversible decisions. » Phrase de **contexte / conclusion** d'une revue écrite par l'équipe des études qu'elle résume (allégeance) ; contredite dans les faits par D'Angelo 2016 (aucun effet principal) : « unequivocally » est trop fort.
- **Shin & Ariely 2004** — 10.1287/mnsc.1030.0148 — *Management Science* : « we demonstrate that options that threaten to disappear cause decision makers to invest more effort and money in keeping these options open, even when the options themselves seem to be of little interest. » Garder les portes ouvertes coûte (en argent, en effort), ce qui va dans le sens du chapitre ; mais ne mesure pas le bonheur.

### Contre c4 (plus de liberté de choix dans la vie → moins heureux) : la direction est « contredit », pas « mêlée »

**15. Fischer & Boer 2011** — 10.1037/a0023663 — *Journal of Personality and Social Psychology*
- Plan : **méta-analyse** à trois niveaux, 63 pays, 420 599 personnes (mal-être, anxiété, stress).
- Résumé : « Using a 3-level variance-known model, the authors found that individualism was a consistently better predictor than wealth, after controlling for measurement, sample, and temporal variations. » et « Despite some emerging nonlinear trends and interactions between wealth and individualism, the overall pattern strongly suggests that greater individualism is consistently associated with more well-being. »
- Joue contre : **c4, contredit**, d'un rang supérieur à la seule preuve « pour » (Markus & Schwartz 2010, revue narrative). La grille interdit alors « soutient » et, à mon avis, « mêlée » : il ne reste qu'une revue narrative contre une méta-analyse et des enquêtes répétées.
- Force : élevée pour la direction ; association entre pays (la certitude reste plafonnée à basse pour une affirmation causale) ; « individualisme / autonomie », pas « nombre d'options ».

**16. Welzel & Inglehart 2010** — 10.1007/s11205-009-9557-z — *Social Indicators Research*
- Plan : World Values Surveys, environ 80 sociétés, régressions écologiques et multiniveaux.
- Résumé : « Empirically, we demonstrate evidence for the following sequence: (1) in response to widening opportunities of life, people place stronger emphasis on emancipative values, (2) in response to a stronger emphasis on emancipative values, feelings of agency gain greater weight in shaping people's life satisfaction, (3) in response to a greater impact of agency feelings on life satisfaction, the level of life satisfaction itself rises. »
- Joue : **contre c4** (le sentiment de choisir sa vie va avec plus de satisfaction) et **nuance l'applicabilité** : ce lien pèse moins là où les valeurs d'émancipation sont moins fortes. Mêmes auteurs qu'Inglehart 2008 (allégeance au modèle) : n'ajoute pas une voix indépendante.
- Force : moyenne-faible (écologique).

**17. Chirkov, Ryan, Kim & Kaplan 2003** — 10.1037/0022-3514.84.1.97 — *JPSP*
- Population : 559 personnes, Corée du Sud, Russie, **Turquie**, États-Unis.
- Résumé : « Results supported the hypothesized relations between autonomy and well-being across cultures and gender. »
- Joue contre : c4 (autonomie de la motivation ↔ bien-être dans quatre cultures, dont un pays musulman voisin du monde arabe). Force : faible (transversal ; « autonomie » au sens de la théorie de l'autodétermination, pas le nombre d'options).

**18. Zayed, Alshammari & Suleiman 2026** — 10.1038/s41598-026-49279-4 — *Scientific Reports* — **le seul échantillon arabe trouvé**
- Plan : transversal, PLS-SEM. Population : 328 adultes arabophones de 18 à 65 ans (auteurs en Égypte et en Arabie saoudite).
- Résumé : « Autonomy mediated self-efficacy's protective effect against distress (indirect β = -0.17, p < .001), while health priorities unexpectedly increased distress (β = 0.35, p < .001). »
- Joue contre : **c4, dans un échantillon arabe** : plus d'autonomie personnelle va avec moins de détresse. Force : faible (transversal, petit, « autonomie personnelle » et non liberté de choix ; PLS-SEM).
- Même direction, plus loin du sujet : Saaidia et al. 2026 (10.3390/healthcare14091171, 1 238 enseignants tunisiens, besoins psychologiques dont l'autonomie) : « The satisfaction of these needs is closely linked to a high level of well-being, whereas their dissatisfaction is associated with adverse consequences. » Non retenu comme carte (l'autonomie n'y est pas séparée des autres besoins dans le résumé).

**19. Reutskaja et al. 2022** (carte 6) : dans 5 des 6 pays, on manque de choix plus qu'on n'en a trop, et le manque pèse plus sur la satisfaction.

### Pour c4 (ce qui existe, et ses limites)

- **Roets, Schwartz & Guan 2012** — 10.1017/s1930297500003247 — *Judgment and Decision Making*, États-Unis (307), Europe de l'Ouest (263), Chine (218) : « The results showed that, in societies where choice is abundant (i.e., U.S. and Western Europe), maximizers reported less well-being than satisficers, and this difference was mediated by experienced regret. However, in the non-western society (China), maximizing was unrelated to well-being. » Appui à un « coût du choix » **seulement** chez ceux qui cherchent le meilleur, **seulement** dans les sociétés d'abondance ; coauteur Schwartz (allégeance). Transversal.
- **Apostolou et al. 2024** — 10.3390/bs14080703 — *Behavioral Sciences*, 804 participants hellénophones (Chypre, Grèce) : « Moreover, more perceived mate choices were associated with more regrets about being in the current relationship. These regrets were linked to lower relationship satisfaction and ultimately contributed to a decreased willingness to stay in the relationship. Notably, this indirect effect was significant only for male participants. » Mais aussi : plus d'options perçues allait avec **moins** de célibat. Transversal, et des questionnaires « developed using AI » (résumé) : force faible.

### Le modérateur culturel (public égyptien)

- **Iyengar & Lepper 1999** — 10.1037/0022-3514.76.3.349 — *JPSP* : « In 2 studies, personal choice generally enhanced motivation more for American independent selves than for Asian interdependent selves. » et « In contrast, Asian American children proved most intrinsically motivated when choices were made for them by trusted authority figures or peers. » La valeur du choix personnel dépend de la culture (même autrice que l'étude des confitures).
- **Roets, Soetens, Au & Yanjun 2013** — 10.1002/ijop.12027 — *International Journal of Psychology* : « The results showed that in Western cultures, people perceived choice in a linear way as either a burden or a blessing, whereas in Chinese culture, such opposition between perspectives did not appear, and individuals generally saw choice as both burden and blessing simultaneously. »
- **Patall, Cooper & Robinson 2008** — 10.1037/0033-2909.134.2.270 — *Psychological Bulletin*, méta-analyse de 41 études : « Results indicated that providing choice enhanced intrinsic motivation, effort, task performance, and perceived competence, among other outcomes. » (effet plus fort « when 2 to 4 successive choices were given ») ; **Carlisle et al. 2022** — 10.1080/17437199.2021.1962386 — *Health Psychology Review* (Crossref 2022, OpenAlex 2021), 44 essais : « Choice-based interventions resulted in significantly less participant drop-out and increased adherence compared to interventions not offering choice. Results for the behaviour change and mood analyses were mixed. » Avoir le choix aide en moyenne ; ce n'est pas « beaucoup d'options », mais cela borne c4.
- MENA, ce qui s'approche le plus de « trop d'options » : deux enquêtes turques (Ocak 2026, 10.4314/jfecs.v54i1.314711, 350 acheteurs en ligne ; Özer Canarslan 2025, 10.26466/opusjsr.1743550, 321 participants) : « perceived overload is positively associated with regret » ; « decision fatigue plays a significant mediating role in the relationship between choice overload and cart abandonment behavior ». **Non retenues** : la surcharge y est **ressentie et déclarée** (une échelle de « trop de choix » qui prédit le regret est presque circulaire), PLS-SEM, transversal.

### Le contesté : l'étude des confitures dans `content/contested.json`

- Contre l'effet comme règle générale : Scheibehenne 2010 (moyenne ≈ 0 sur 50 expériences), Scheibehenne 2009 (« calling the extent of the too-much-choice effect into question »), Lindkvist & Luke 2022 (préenregistré, nul de 2 à 80 options), Yeung 2025 (nul de 4 à 16), McShane & Böckenholt 2018 (l'effet dépend de la mesure).
- Pour un effet sous conditions : Chernev 2015 (quatre modérateurs), Diehl & Poynor 2010, terrain (Bertrand 2010, Sethi-Iyengar 2004).
- Aucune réplication multi-laboratoires (Q4, Q6, Q24, Q26), aucune réplication directe de l'expérience des confitures trouvée (Q5, Q7) ; aucune liste publiée d'effets contestés avec DOI trouvée (Q23 : rien d'utile).

---

## (c) Cherché et pas trouvé (notFound)

- Aucun avis Crossref (rétractation, correction, expression of concern) sur les 12 DOI du verdict ni sur 15 contre-preuves clés (2026-11-22). Le corrigendum de Chernev existe mais Crossref ne le relie pas à l'article : la vérification automatique (`filter=updates:`) ne le verra jamais.
- Aucune réplication **multi-laboratoires** de la surcharge de choix ; une expérience préenregistrée d'un seul laboratoire (Lindkvist & Luke 2022, nulle) et six préenregistrées sur une question voisine (Hu 2026, non lues en texte intégral).
- Aucune méta-analyse de la surcharge de choix publiée depuis Chernev 2015, hors la réanalyse de McShane & Böckenholt 2018 ; une revue qualitative (Misuraca et al. 2024, 10.3389/fpsyg.2024.1290359, « systematic qualitative review » des modérateurs, sans chiffre) ; deux revues sans résumé lisible (Sethuraman et al. 2022, 10.1016/j.jretai.2022.01.001 ; Mejía 2025, 10.1007/s11747-024-01075-0) : non retenues.
- Aucune réplication de Gilbert & Ebert 2002 (Q8, Q11–Q13) ; aucune méta-analyse sur la réversibilité.
- Aucune réplication directe d'Iyengar & Lepper 2000 (Q5, Q7) parmi les travaux citants regardés.
- **Aucun échantillon égyptien ni arabe** dans une étude du nombre d'options, du report du choix ou de la réversibilité (Q18, Q22, Q25). Arabe : seulement sur l'autonomie (Zayed 2026 ; Tunisie, Saaidia 2026). Voisins : Turquie (enquêtes de surcharge ressentie ; Chirkov 2003), Chypre et Grèce (Apostolou 2024).
- Texte intégral non lu : Chernev 2015 p. 348 (lequel des trois coefficients est l'effet moyen sans modérateurs), Hu 2026 (direction de l'effet chez les choisisseurs).
- Non retenus faute de phrase de résultat dans le résumé : Shah & Wolford 2007 ; Iyengar & Kamenica 2010 (10.1016/j.jpubeco.2010.03.006, résumé absent) ; Verme 2009 (déjà écarté par le brouillon).

---

## (d) Conclusion

**Le badge ⚖️ tient.** Aucune affirmation n'atteint « modérée » dans un sens net : rien n'ouvre ✅ ni ❌. Mais quatre
choses du brouillon me semblent fausses ou trop généreuses, et deux corrections touchent l'écran.

1. **c1 : « mêlée, basse » tient, la raison doit changer.** Ce n'est pas d'abord « deux méta-analyses de même rang se
   contredisent » : le corrigendum montre un coefficient non significatif (b = .04, p > .4) dans la section « effet
   moyen » de Chernev, et la réanalyse de McShane & Böckenholt (Böckenholt est coauteur de Chernev) montre que l'effet
   change selon la mesure. Lecture la plus défendable : **en moyenne ≈ 0, présent sous conditions** (hétérogénéité,
   pas contradiction). Le « −1 incohérence » reste juste, mais le mot est « ça dépend », ce qui est exactement ⚖️
   « pour certains, sous conditions ». Deux corrections au dossier :
   - **réécrire c1 avec les mots de Manson** (« au-delà d'un certain nombre ») : la version monotone « plus d'options →
     moins satisfait » est contredite à petit nombre (U inversé : Reutskaja & Hogarth 2009, Reutskaja 2018, Cai &
     Mo 2026 ; 4 → 16 sans perte chez Yeung 2025). Sinon on teste une idée plus forte que celle du livre ;
   - le « −1 indirect » ne peut plus dire « choix de peu d'enjeu » seulement (Diehl & Poynor, Thomas 2022 pour ;
     Yeung 2025 pour la santé mentale, contre) : il tient par **l'applicabilité** (aucun échantillon arabe ;
     Reutskaja 2022 : hors des États-Unis, on manque de choix plus qu'on n'en a trop).
2. **c2 : « mêlée, basse » tient, mais « une seule expérience primaire » sous-estime les deux côtés.** Pour, à enjeu
   réel : Bertrand 2010 (Afrique du Sud, terrain, randomisé), Sethi-Iyengar 2004 (retraite, observationnel),
   Carroll 2011 (bénévolat). Contre : Lindkvist & Luke 2022 (préenregistré, OR 1,001 par option de 2 à 80), Yeung 2025
   (4 contre 16, p = .29), Altinger 2025 (médecins : plus d'alternatives, moins de statu quo). À mettre au dossier au
   moins Lindkvist (contre) et Bertrand (pour), et ne pas appuyer c2 sur le chiffre global de Chernev (McShane : la
   mesure « report » ne vaut pas la mesure « satisfaction »).
3. **c3 : « basse » tient ; « très basse » se défend si la scène parle de couple ou de travail.** Aucune réplication de
   Gilbert & Ebert ; D'Angelo nul, Shiner inversé chez les « maximiseurs », Fasolo 2024 (préenregistré) : rendre la
   liberté visible **augmente** la satisfaction. L'appui le plus proche est Gu, Botti & Faro 2013 (clôture → plus de
   satisfaction, 4 études), que le brouillon ne cite pas. Surtout : **aucune étude ne teste un engagement de vie**
   (tirage photo, poster, décision RH imaginaire, profils) ; si la scène montre Nour ou Karim qui s'engagent dans une
   relation ou un emploi, écrire le « −1 indirect » pour cette raison.
4. **c4 : la direction doit être « contredit » (basse), pas « mêlée ».** Contre : une méta-analyse (Fischer & Boer 2011,
   63 pays, 420 599 personnes), Inglehart 2008, Welzel & Inglehart 2010 (≈ 80 sociétés), Chirkov 2003 (dont la
   Turquie), le seul échantillon arabe (Zayed 2026), Reutskaja 2022 (six pays). Pour : une revue narrative écrite par
   l'auteur du « paradoxe du choix » (Markus & Schwartz 2010) et un effet limité aux « maximiseurs » des sociétés
   d'abondance (Roets 2012, Schwartz coauteur). La grille interdit « soutient » ; un contre unique de rang supérieur
   face à une revue narrative, c'est « contredit ». Certitude basse (associations, « autonomie » et non nombre
   d'options) : ⚖️ reste permis, jamais ❌. **Je recommande de garder c4 dans le champ** : la sortir ferait taire le
   point le plus solide contre la généralisation de Manson, et la grille dit que personne ne la teste en silence. Ni le
   hook ni le dénouement ne peuvent s'appuyer sur elle.
5. **La carte à l'écran : garder `scheibehenne-2010-overload`, corriger la ligne.** C'est le meilleur rang, sans avis,
   avec une vraie phrase de résultat ; aucune contre-preuve ne la détrône (Chernev a son corrigendum non relié et une
   conclusion conditionnelle ; McShane n'a pas de chiffre ; Reutskaja 2022 est transversal). Mais :
   - « في المتوسط، كترة الاختيارات ما قلّلتش الرضا » attribue la moyenne à la seule satisfaction ; la méta-analyse
     poole satisfaction **et** motivation à choisir : dire « ما قلّلتش الرضا ولا الرغبة إنك تختار » ;
   - seule, une carte « moyenne ≈ 0 » se lit comme ❌ sous un badge ⚖️ : la ligne écrite dessous doit porter la
     condition (« بس بتفرق لما الاختيار صعب », Chernev 2015, avec son nom) en plus de « معظم الدراسات من أمريكا
     وأوروبا » ;
   - si c4 est dite, la meilleure seconde carte pour un public égyptien est Reutskaja 2022 (« ارتباط », jamais un verbe
     causal).
6. **L'étude des confitures doit entrer dans `content/contested.json`, et cela change plus que le plafond.** Étiquette
   juste : « hétérogène, pas une règle générale » (moyenne ≈ 0, nuls préenregistrés, effet dépendant de la mesure ;
   mais effet sous conditions et sur le terrain). Le brouillon dit « le plafond ne bougerait pas » : vrai, mais
   `docs/verdict.md` §2 dit que **s'appuyer** sur un effet contesté exige une réplication multi-laboratoires au dossier,
   et il n'y en a pas. Conséquence : Iyengar 2000 ne peut pas être montré comme une preuve (pas de « 30 % contre 3 % »
   à l'écran, pas de scène qui le joue comme un fait) ; seulement comme « l'expérience célèbre que la suite n'a pas
   confirmée en moyenne ».
7. **« À retenir »** : « جرّب تقلل الاختيارات لما القرار صعب » reste une suggestion à faible risque, mais pour un public
   où le manque de choix est plus fréquent et plus coûteux que l'excès (Reutskaja 2022), elle doit garder sa condition
   (« لما القرار صعب ») et ne jamais devenir « قلّل اختياراتك ». Une suggestion plus proche de l'idée du chapitre
   (s'engager) existe : « لما تختار، اقفل الباب وما ترجعش تقارن » (Gu 2013, causal mais sur des achats, non répliqué) :
   « جرّب », jamais `evidence`.
8. **Corrections de fiches** : `chernev-2015-overload` (limite du corrigendum : trois coefficients, dont b = .04 non
   significatif) ; `iyengar-2000-demotivating` (ajouter : même laboratoire que Sethi-Iyengar 2004 et Botti 2009) ;
   le brouillon dit « aucune réplication préenregistrée » : il en existe une, nulle (Lindkvist 2022), à écrire.

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1177/1069031x211073821 — Reutskaja, Cheek, Iyengar & Schwartz 2022 (six pays : manque > excès ; c1, c4, applicabilité)
2. 10.1037/a0023663 — Fischer & Boer 2011 (c4 contredit, méta-analyse 63 pays)
3. 10.1007/s11336-017-9571-z — McShane & Böckenholt 2018 (c1/c2 : l'effet dépend de la mesure)
4. 10.3389/fpsyg.2022.800528 — Lindkvist & Luke 2022 (c2 contredit, préenregistré)
5. 10.2196/71165 — Yeung et al. 2025 (c1/c2, Hong Kong, 4 contre 16)
6. 10.1016/j.jcps.2015.07.001 — corrigendum de Chernev 2015 (à joindre à sa fiche)
7. 10.1086/670252 — Gu, Botti & Faro 2013 (**appui** de c3 : clôture → satisfaction)
8. 10.1509/jmkr.47.2.312 — Diehl & Poynor 2010 (**appui** de c1)
9. 10.1162/qjec.2010.125.1.263 — Bertrand et al. 2010 (**appui** de c2, terrain, Afrique du Sud)
10. 10.1037/xap0000481 — Fasolo, Misuraca & Reutskaja 2024 (c3/c4 : la liberté visible augmente la satisfaction)
11. 10.1002/mar.20268 — Reutskaja & Hogarth 2009 (U inversé, c1)
12. 10.1038/s41562-018-0440-2 — Reutskaja et al. 2018 (U inversé, déjà repéré par le brouillon)
13. 10.1038/s41598-026-49279-4 — Zayed et al. 2026 (c4, seul échantillon arabe)
14. 10.1007/s11205-009-9557-z — Welzel & Inglehart 2010 (c4, applicabilité)
15. 10.1017/s1930297500003247 — Roets, Schwartz & Guan 2012 (**appui** limité de c4 ; culture)
16. 10.1001/jamanetworkopen.2025.42949 — Altinger et al. 2025 (c2, médecins)
17. 10.1017/s1930297500002667 — Carroll, White & Pahl 2011 (**appui** de c2)
18. 10.1093/0199273391.003.0005 — Sethi-Iyengar, Huberman & Jiang 2004 (**appui** de c2, observationnel ; chapitre, pas article)
19. 10.3390/bs16101826 — Cai & Mo 2026 (U, Chine, longitudinal)
20. 10.1037/0022-3514.76.3.349 — Iyengar & Lepper 1999 (culture)
21. 10.1037/0022-3514.84.1.97 — Chirkov et al. 2003 (c4, dont la Turquie)
22. 10.1016/j.chb.2021.106977 — Thomas, Binder & Matthes 2022 (rencontres, **appui** proche de la scène)
23. 10.1111/spc3.12268 — Bullens & van Harreveld 2016 (revue, appui de c3, allégeance)
24. 10.1086/598969 — Botti, Orfali & Iyengar 2009 (choix tragiques, nuance)
25. 10.1037/0033-2909.134.2.270 — Patall, Cooper & Robinson 2008 (avoir le choix aide, méta-analyse)
26. 10.1177/09567976251400333 — Hu, Moon & VanEpps 2026 (**à lire en texte intégral avant tout usage**)
