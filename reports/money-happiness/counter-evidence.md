# Contre-preuve : « l'argent, rendements décroissants et plateau vers 75 000 $ » (Manson), verdict ⚖️ basse

Agent contre-preuve, 2026-11-22. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé (dossier brouillon
`money-happiness`, ⚖️, certitude basse). Je ne valide rien. Lu : `docs/verdict.md` (grille), le dossier (`.json` et
`.md`), les 12 fiches de `content/sources/` qu'il cite, la page de l'auteur (`markmanson.net/the-backwards-law`, note 4).
Aucun autre fichier du dépôt n'a été modifié.

Sources : Crossref (`query.bibliographic` ; `filter=updates:<doi>` ; `works/<doi>`), Europe PMC (`search`,
`resultType=core` ; citations `MED/<pmid>/citations`), OpenAlex (`works?search=`, `works/doi`, auteurs). Textes
intégraux ouverts : les trois lettres PNAS de 2024 sur Killingsworth, Kahneman & Mellers 2023 (Arslan, PMC11572980 et
réponse des auteurs, PMC11572976, par Europe PMC ; Rohrer & Wenz, PMC11572929, par l'API BioC de NCBI). User-Agent
générique `book-vs-science-counter/0.1`, aucun nom ni e-mail. Réponses brutes : dans le scratchpad de la session
(`ce-money/raw/`), pas dans le dépôt.

Limites de ma recherche : résumés surtout ; Jebb 2018 est payant (le chiffre de la région Moyen-Orient/Afrique du Nord
n'a pas pu être lu) ; plusieurs résultats clés n'existent que dans des documents de travail (NBER) ou des
prépublications, je le signale à chaque fois. Tout DOI cité ici a été trouvé par une requête, puis vérifié sur Crossref
(`works/<doi>` : titre, premier auteur, année) ; aucun n'est pris de mémoire. Exception signalée : la thèse de Tamberg
(2023) a un DOI DataCite, inconnu de Crossref.

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 12 DOI du verdict (restud/rdaa006, aer.103.3.598, pnas.1011492107, pnas.2016976118, s41562-017-0277-0, jae.70013, ecot.12116, pnas.2208661120, 0033-2909.134.4.536, pnas.2211123119, j.jhealeco.2006.08.004, 0022-3514.36.8.917) | 0 avis pour chacun |
| Europe PMC | `commentCorrectionList` des 7 qui y sont indexés (PNAS ×4, Jebb, Howell, Tan) | aucun lien d'avis ; les 3 lettres PNAS de 2024 ne sont pas liées comme commentaires (trouvées par les citations, Q14) |
| Crossref | recherche par titre « correction / erratum + titre » sur les 12 DOI + Thomson 2022 + Diener 2010 | 0 avis (un faux positif sans rapport écarté) |
| Crossref | `filter=updates:` sur les 43 DOI de contre-preuve vérifiés (ceux ci-dessous et quelques non retenus) | 0 avis |

**Défaut de la vérification à corriger** (`packages/sources/verify.ts`, `correctionsCheck`) : elle ne lit que
`updated-by` de Crossref. Or deux corrections trouvées ce soir ne sont **pas liées** à leur article dans Crossref (ni
`update-to` ni `relation`) : 10.1093/pnasnexus/pgad473 (« Correction to: Money and happiness… », Oishi 2022) et
10.1093/qje/qjx039 (« Erratum to “The Short-Term Impact of Unconditional Cash Transfers…” », Haushofer & Shapiro 2016).
`filter=updates:` les rate aussi. Contrôle : une recherche Crossref `query.bibliographic` = « correction erratum +
titre » remonte la correction d'Oishi en premier. À ajouter à la vérification (ou à `LIMITES.md`).

### Requêtes de recherche (2026-11-22)

| # | Base | Requête exacte | Regardés (sur) |
|---|---|---|---|
| Q1 | Crossref | `meta-analysis income subjective well-being socioeconomic status` (depuis 2018) | 20 |
| Q2 | Europe PMC | `(income OR "socioeconomic status" OR wealth) AND ("subjective well-being" OR "life satisfaction" OR happiness) AND ("meta-analysis" OR "meta-analytic") AND PUB_YEAR:[2018 TO 2026]` | 25 (8 760) |
| Q3 | OpenAlex | `income happiness satiation` (2018-2026) | 25 (1 624) |
| Q4 | Crossref | `money happiness satiation evidence against plateau` (depuis 2020) | 20 |
| Q5 | OpenAlex, Crossref, Europe PMC | Tamberg : `Tamberg income well-being basic needs` ; `Tamberg income satiation basic needs Gallup World Poll` ; œuvres de l'auteur OpenAlex A5062771822 ; `need satisfaction decoupling well-being income Steinberger Tamberg` ; `AUTH:"Tamberg L"` ; titre exact de la prépublication ; `works/…/v2`, `v3` | toutes (7 œuvres de l'auteur) |
| Q6 | OpenAlex ; Crossref | `lottery prize happiness winners` (2005-2026) ; `lottery winners happiness life satisfaction effect of lottery prizes` | 20 (1 167) ; 20 |
| Q7 | Crossref ; Europe PMC | `cash transfers subjective well-being mental health low- and middle-income countries systematic review meta-analysis` (depuis 2018) ; `("cash transfer" OR "cash transfers") AND ("subjective well-being" OR "life satisfaction" OR happiness OR "psychological well-being") AND ("meta-analysis" OR "systematic review")` | 15 ; 25 (233) |
| Q8 | Crossref | `how effective is (more) money randomizing unconditional cash transfer amounts` ; `long-term impact of unconditional cash transfers experimental evidence Kenya psychological well-being` ; `guaranteed income health effects randomized unconditional income study stress mental health` (depuis 2023) | 8 ; 10 ; 10 |
| Q9 | Crossref ; OpenAlex | `happiness adaptation to income and to status in an individual panel` ; `adaptation to income increases life satisfaction panel hedonic` | 6 ; 15 |
| Q10 | Crossref | `The happiness-income paradox revisited` ; `Easterlin paradox long-term economic growth happiness time series` (depuis 2016) | 5 ; 10 |
| Q11 | Crossref | `Money and happiness rank of income not income affects life satisfaction` ; `Neighbors as negatives relative earnings and well-being` | 4 ; 3 |
| Q12 | OpenAlex ; Crossref | `Bennedsen income emotional well-being`, `Killingsworth money happiness extended evidence`, `Akkiraju Rao income stress` (2023-2026) ; `Bennedsen income satiation emotional well-being reanalysis` | 8, 8, 5 ; 8 |
| Q13 | Europe PMC | `(income OR wealth OR money) AND ("emotional well-being" OR "experienced well-being" OR "positive affect" OR "life evaluation") AND (satiation OR plateau OR threshold OR "turning point" OR "diminishing returns") AND PUB_YEAR:[2019 TO 2026]` | 25 (5 759) |
| Q14 | Europe PMC | citations de Killingsworth, Kahneman & Mellers 2023 (PMID 36857342) | toutes (44) |
| Q15 | Crossref ; OpenAlex | `Arab Barometer life satisfaction income happiness` ; `Arab world happiness income life satisfaction MENA` | 15 ; 15 |
| Q16 | Europe PMC | `(income OR wealth OR "household income" OR money) AND ("life satisfaction" OR happiness OR "subjective well-being") AND (Egypt OR Egyptian OR Arab OR "Saudi Arabia" OR Qatar OR Kuwait OR "United Arab Emirates" OR Jordan OR Lebanon OR Tunisia OR Morocco OR Algeria OR MENA) NOT (cancer OR HIV OR diabetes)` | 25 (3 922) |
| Q17 | OpenAlex ; Crossref | `Egypt subjective well-being household income life satisfaction` (2010-2026) ; `Arab Barometer well-being economic satisfaction` ; `Egypt happiness` (titre) ; `Egypt Egyptians life satisfaction income World Values Survey Gallup happiness determinants` | 20 ; 10 ; 20 ; 12 |
| Q18 | OpenAlex | `meta-analysis income happiness life satisfaction` (titre « meta-analysis », 2018-2026) ; `windfall wealth shock well-being lottery` (2018-2026) | 20 ; 15 |
| Q19 | Europe PMC | `TITLE:(income OR wealth OR money OR "socioeconomic") AND TITLE:("well-being" OR wellbeing OR happiness OR "life satisfaction") AND TITLE:("meta-analysis" OR "meta-analytic" OR "systematic review")` | toutes (34) |
| Q20 | Europe PMC | `(income OR money OR wealth) AND (happiness OR "life satisfaction" OR "emotional well-being" OR "subjective well-being") AND (replication OR preregistered OR "pre-registered" OR "registered report")` | 25 (6 671) |
| Q21 | OpenAlex ; Crossref | `multi-lab replication Diener 2010 wealth and happiness across the world…` ; titre de Diener 2010 ; `CREP replication Does money buy happiness Diener` | 10 ; 3 ; 8 |
| Q22 | Crossref | `income happiness association culture moderator collectivism materialism countries` (depuis 2015) | 15 |
| Q23 | Crossref ; Europe PMC | `lottery winnings life satisfaction mental health panel Germany windfall` (depuis 2015) ; `(lottery OR "lottery winners" OR "lottery wins") AND ("life satisfaction" OR happiness OR "mental health" OR "well-being")` | 12 ; 25 (8 560) |
| Q24 | OpenAlex ; Crossref | `long-term impact of unconditional cash transfers Kenya Haushofer Shapiro` ; `Income shocks and adolescent mental health` ; `Your gain is my pain negative psychological externalities of cash transfers` | 6 ; 4 ; 4 |
| T1 | web | `markmanson.net/the-backwards-law`, note 4 et son lien | page lue |

Obligatoires : « meta-analysis » (Q1, Q2, Q7, Q18, Q19), « replication » (Q20, Q21 ; Q12, Q14 pour les réanalyses),
« culture » / « moderator » (Q22, et les modérateurs de Q2/Q14 : Tan 2020, Oishi 2022, Quispe-Torreblanca 2026).

---

## (b) Ce que j'ai trouvé

« Force » = poids de l'argument contre le verdict, selon la grille (rang du plan, taille, indépendance). Les phrases
citées sont des phrases de résultat du résumé, sauf mention contraire.

### 0. Ce que dit vraiment l'auteur (affaiblit le cadrage de c1 et c2)

- La page de l'auteur (2018, pas le livre) a pour affirmation principale les **rendements décroissants** : passer de
  20 000 à 40 000 $ change la vie, de 120 000 à 140 000 $ presque rien. C'est **c4**, et c'est compatible avec la
  relation log-linéaire que trouvent presque toutes les études (doubler le revenu ajoute toujours autant ; +17 % ajoute
  environ un quart de ce pas).
- Le plateau n'est que dans la **note 4**, qui renvoie à un **article de magazine** (The Atlantic, 2012), pas à une
  étude, et dit textuellement : « satisfaction rises with income only until about $75,000 (or perhaps as high as
  $120,000) ». Le dossier coupe la parenthèse : c2 doit tester « 75 000 à 120 000 $ », pas 75 000 $ seulement (sinon
  l'épisode réfute plus que ce que l'auteur a écrit).
- Le chiffre de 75 000 $ vient de Kahneman & Deaton 2010, dont le résumé dit l'inverse pour la satisfaction : « When
  plotted against log income, life evaluation rises steadily. » La note confond les deux mesures.
- Le dossier dit lui-même que la place au ch. 4 du livre n'est pas vérifiée : tant qu'elle ne l'est pas, le script ne
  peut pas dire « الكتاب بيقول » pour le plateau ; « مانسون كتب » seulement.

### Contre c1 (plateau de la satisfaction de vie) — renforce « contredit », mais affaiblit sa portée causale

**1. Akkiraju & Rao 2025** — 10.1038/s44271-025-00210-z — *Communications Psychology*
- Plan : transversal, 2,05 millions d'Américains (Gallup Daily Poll 2008-2017). Titre : « Higher income is associated
  with greater life satisfaction, and more stress ».
- Résumé : « …we find that with household income above ~$63,000 respondents are more likely to experience stress. »
- Joue : **contredit c1** (satisfaction toujours plus haute) et **soutient en partie c2** (un coût émotionnel au-delà
  d'environ 63 000 $). Le dossier l'a écarté avec Tamberg, alors que c'est un **article publié** : le vérificateur
  doit l'accepter. Force : moyenne (énorme, mais transversal, États-Unis).

**2. Lomas 2024** — 10.1080/17439760.2023.2248963 — *Journal of Positive Psychology* (en ligne 2023)
- Plan : transversal, Gallup World Poll 2020-2022, 386 654 personnes, 142 pays, 31 mesures de bien-être.
- Résumé : « Significantly, on every single variable, participants with higher incomes fare better than those with
  lower incomes. »
- Joue : contredit c1 et c2 à l'échelle mondiale (pays arabes probablement inclus, liste non lue). Force : moyenne-faible
  (transversal, pas de test de seuil).

**3. Diener, Ng, Harter & Arora 2010** — 10.1037/a0018066 — *JPSP*
- Plan : transversal, Gallup World Poll.
- Résumé : « Although the meeting of basic and psychological needs mediated the effects of income on life evaluation to
  some degree, the strongest mediation was provided by standard of living and ownership of conveniences. »
- Joue : **contredit l'explication par les besoins** (celle de la note et de Tamberg) : au-delà des besoins, le niveau
  de vie et les biens de confort portent encore le lien. Voir aussi c2 et c4. Une réplication multi-laboratoires (CREP)
  existe, mais seules ses **données** sont publiées (10.5334/jopd.156) : aucun résultat. Force : moyenne.

**4. Fors Connolly, Hjerm & Gärling 2026** — 10.1038/s41598-026-59695-1 — *Scientific Reports* (contre Röck 2025)
- Plan : agrégé et longitudinal, European Social Survey 2006-2023, 33 pays, 177 948 répondants.
- Résumé : « We found strong positive associations between GDP and both emotional well-being and life satisfaction
  across countries. Longitudinal mixed models showed positive associations between GDP and both well-being components
  over time. »
- Joue : **contredit l'appui européen de c1 et c2** (Röck 2025, même niveau agrégé, mêmes pays, autre enquête ; le
  résumé dit que des spécifications quadratiques soutiennent aussi ce schéma). Force : moyenne-faible (agrégé).

**5. Ye, Zhang & Li 2023** — 10.1073/pnas.2221884120 — *PNAS*
- Plan : jumeaux chinois (effets fixes de paire). Résumé : « …a doubling of income resulting in an increase of 0.26
  scales or 0.37 SDs in the four-scale happiness measure. »
- Joue : contredit c1/c3 hors d'Occident, avec un contrôle des gènes et de la famille. Force : faible-moyenne (pas de
  test de seuil ; transversal).

En face, ce qui **affaiblit la lecture « plus d'argent → plus satisfait »** sans ramener de plateau individuel :

**6. Nilsson et al. 2024** — 10.1038/s41598-024-52939-y — *Scientific Reports*
- Plan : expérience de formulation, 1 581 adultes britanniques.
- Résumé : « …we found that the Cantril Ladder framing emphasizes power and wealth over broader well-being and
  relationship concepts in comparison to the other study conditions. »
- Joue : **risque de biais de mesure** pour c1 : l'échelle de Cantril (Kahneman & Deaton, Jebb, Stevenson & Wolfers via
  Gallup) fait penser à l'argent, ce qui peut gonfler son lien avec le revenu. Force : faible-moyenne (une étude, mais
  sur la mesure même de la plupart des preuves de c1).

**7. Quispe-Torreblanca et al. 2026** — 10.1038/s41467-026-69729-x — *Nature Communications* ; **8. Boyce, Brown &
Moore 2010** — 10.1177/0956797610362671 — *Psychological Science*
- Quispe-Torreblanca (Gallup, 109 pays, > 90 000 personnes) : « In 80% of countries, subjective well-being is more
  strongly associated with within-nation rank of income than with absolute income or relative income deprivation. »
  Et : « Income rank coefficients are over three times larger in the most materialistic countries ».
- Boyce (panel britannique) : « …the ranked position of an individual's income predicts general life satisfaction,
  whereas absolute income and reference income have no effect. »
- Joue : nuance c1 et c3 : ce qui va avec la satisfaction serait **le rang**, pas la somme ; plus d'argent pour tous
  n'ajouterait rien (proche de l'esprit du livre, pas de sa lettre : pour une personne, gagner plus fait monter le
  rang, donc pas de plateau individuel). Force : moyenne (Quispe-Torreblanca : grand, multinational, modérateur
  culturel), transversal.

**9. Easterlin et al. 2010** — 10.1073/pnas.1015962107 — *PNAS* ; **10. Proto & Rustichini 2013** —
10.1371/journal.pone.0079358 — *PLoS ONE*
- Easterlin : « …the long term nil relationship between happiness and income holds also for a number of developing
  countries… » (séries de 10 ans et plus, pays).
- Proto & Rustichini (pays, effets fixes) : « …this relation clearly increases in country with a per capita GDP below
  15,000 USD (2005 in Purchasing Power Parity), then it flattens for richer countries. » et « …life satisfaction seems to
  peak at around 30,000 USD and then slightly but significantly decline among the richest countries. »
- Joue : **soutient un plateau au niveau des pays** (et Easterlin : rien à long terme, même chez les pauvres, ce qui
  contredit au passage le « seuil des besoins »). Indirect pour c1, qui parle de personnes. **Cohérence demandée** :
  le dossier compte Röck 2025 (agrégé) comme appui de c1 ; alors Proto, Easterlin et Fors Connolly comptent aussi, ou
  tous les agrégés sortent du tableau comme indirects. Force : moyenne pour la nuance, faible pour c1.

### Contre c2 (plateau des émotions vers 75 000 $) — le dossier dit « mêlée » ; je pousse vers « contredit »

**11. Killingsworth, Kahneman & Mellers 2023** — 10.1073/pnas.2208661120 (au dossier), relu
- Résumé : « We then explain why Kahneman and Deaton overstated the flattening pattern… » et « …their measures could not
  discriminate among degrees of happiness because of a ceiling effect. »
- Joue : le principal appui de c2 (Kahneman & Deaton 2010) est **jugé exagéré par son propre auteur** : un effet
  plafond. Jebb 2018 utilise les émotions du Gallup World Poll ; si ce sont les mêmes questions oui/non sur la veille
  (à vérifier dans ses méthodes, payantes), il a le même défaut. Fors Connolly 2026 note en résumé que les études
  internationales ont souvent reposé sur « brief dichotomous affect measures ».

**12. Arslan 2024** — 10.1073/pnas.2314207121 — *PNAS* (lettre, réanalyse ; pas de résumé : texte intégral
PMC11572980)
- Texte : « So, the evidence for a flattening is not strong. If anything, the spline may flatten only after $200,000,
  where data are sparse. » Il note aussi que le seuil n'a pas été estimé dans les données de Killingsworth mais importé
  de Kahneman & Deaton.
- Joue : **contredit la nuance du dossier** (« plateau seulement chez les moins heureux ») : une réanalyse
  indépendante des mêmes données ne trouve pas clairement ce plateau. Force : moyenne (réanalyse, données agrégées, pas
  de résumé : à traiter selon la règle du registre).

**13. Rohrer & Wenz 2024** — 10.1073/pnas.2313712121 — *PNAS* (lettre ; texte intégral PMC11572929)
- Texte : « What quantile regression does not do is simply estimate regressions in particular subgroups of people—such
  as the 15% least happy. » Et l'absence de covariables interdit toute lecture causale.
- Joue : la phrase « le plateau n'existe que **chez** les moins heureux » décrit le 15e centile d'une distribution
  conditionnelle, pas un **groupe de personnes**. La dire ainsi à l'écran est une erreur d'interprétation. Force :
  élevée pour la formulation, nulle pour la direction.

**14. Killingsworth, Kahneman & Mellers 2024** — 10.1073/pnas.2322160121 — *PNAS* (réponse ; PMC11572976)
- Texte : le seuil testé est « $100K », pas 75 000 : « the upper bound of that income category ($90K) was a more
  accurate estimate than its midpoint ($75K). Adjusting for inflation, the predicted threshold … was $100K. » Et :
  « In the handful of studies that can draw causal inferences between income and happiness, evidence suggests that
  having more money does, on average, lead to greater happiness ».
- Joue : **le chiffre de 75 000 $ n'est plus soutenu par personne**, pas même par ses auteurs. Si l'épisode garde un
  plateau, c'est « vers 100 000 $, au bas de la distribution, discuté ».

**15. Bennedsen 2024** — 10.1016/j.econlet.2024.111730 — *Economics Letters*
- Résumé : « …we find a flat relationship between household income and emotional well-being above a threshold around
  $200,000 per year. » Et lui-même : « more research is needed before any definite conclusions… »
- Joue : **ramène un plateau émotionnel**, mais à 200 000 $, pas 75 000. Le dossier l'a écarté : il faut le garder,
  c'est la seule estimation libre du seuil publiée (soutient « un plateau existe peut-être », contredit « 75 000 $ »).
  Force : faible-moyenne (une réanalyse, hypothèses discutées par l'auteur).

**16. Newman, Gordon & Mendes 2025** — 10.1038/s41562-025-02264-9 — *Nature Human Behaviour*
- Plan : 71 385 adultes, dont 29 567 en échantillonnage d'expériences sur 3 semaines (329 543 relevés).
- Résumé : « …higher levels of income were associated with higher levels of well-being. »
- Joue : contredit c2 dans la vie quotidienne (pas de test de seuil dans le résumé). Force : faible-moyenne.

Pour mémoire, Akkiraju 2025 (carte 1) **soutient** c2 sous une autre forme : plus de stress au-delà d'environ 63 000 $.

### Contre c3 (recevoir plus, une fois les besoins couverts, ne rend pas durablement plus heureux) — le dossier dit « contredit, modérée » ; c'est trop

Le dossier écrit : « seul Brickman 1978 (22 gagnants) soutient le livre ». **C'est faux.** Voici ce qui soutient le
livre, ou dit que l'effet s'efface :

**17. Thomson et al. 2022** — 10.1016/s2468-2667(22)00058-5 — *Lancet Public Health* — **la pièce la plus lourde**
- Plan : revue systématique et méta-analyse à trois niveaux (préenregistrée, PROSPERO), 136 études dont 12,5 % d'essais
  randomisés, 86 méta-analysées ; adultes de 16 à 64 ans ; changements de revenu.
- Résumé : « A binary income increase lifting individuals out of poverty was associated with 0·13 SD improvement in
  mental health measures (95% CI 0·07 to 0·20; n=42 128; 18 studies), considerably larger than other income increases
  (0·01 SD improvement, 0·002 to 0·019; n=216 509, 14 studies). For wellbeing, increases out of poverty were associated
  with 0·38 SD improvement (0·09 to 0·66; n=101 350, 8 studies) versus 0·16 for other income increases (0·07 to 0·25;
  n=62 619, 11 studies). » Et : « GRADE certainty was low or very low. »
- Joue : **c3 mêlée** : hors sortie de la pauvreté, santé mentale +0,01 écart-type (presque rien : soutient le livre),
  bien-être +0,16 (contredit le livre). **c4 soutenue** (0,38 contre 0,16 ; 0,13 contre 0,01). Et la certitude causale,
  jugée par les auteurs eux-mêmes avec GRADE : **basse ou très basse**. Indirect : « autres hausses » ≠ « besoins
  couverts ». Force : élevée (rang le plus haut du dossier sur la question causale).

**18. Lindqvist, Östling & Cesarini 2020** — au dossier, sa seconde moitié
- Résumé : « The estimated treatment effects on happiness and mental health are significantly smaller. » (version NBER :
  « …suggesting that wealth has greater long-run effects on evaluative measures of well-being than on affective
  ones. »)
- Joue : l'étude à l'écran **soutient à moitié le livre** pour le bonheur au quotidien. Le dossier la classe
  « nuance » ; pour c3, qui dit « happier or more satisfied », c'est un appui partiel.

**19. Kuhn, Kooreman, Soetevent & Kapteyn 2008** — 10.3386/w14035 — NBER (document de travail ; publié dans l'AER
2011, 10.1257/aer.101.5.2226, dont le résumé ne parle pas du bonheur)
- Plan : expérience naturelle, un code postal **tiré au sort** chaque semaine (Pays-Bas).
- Résumé du document de travail : « Six months after the fact, winning the lottery does not make households happier,
  nor do neighbors' winnings reduce happiness. »
- Joue : **soutient c3** (bonheur, 6 mois, gain d'environ 8 mois de revenu). Force : moyenne (bon plan ; mais
  la phrase n'existe que dans le document de travail : le vérificateur refusera probablement le type « report » ; la
  version publiée devrait être lue dans son texte intégral).

**20. Raschke 2019** — 10.1080/00036846.2018.1494813 — *Applied Economics*
- Plan : panel allemand de gagnants, avant et après le gain.
- Résumé : « Mental health declines immediately after winning a large lottery prize for individuals with low education
  and low levels of financial literacy. » et « Unexpected windfalls have no impact on the mental health of individuals
  with high education or high financial literacy. » (Ils se disent pourtant « happier ».)
- Joue : soutient c3 pour la santé mentale (nul ou pire), contredit pour le bonheur déclaré ; **contredit Gardner 2006**
  (meilleure santé mentale au Royaume-Uni). Force : moyenne-faible.

**21. Oh 2025** — 10.1037/pspp0000552 — *JPSP*
- Plan : longitudinal (MIDUS, Understanding America Study, panel coréen KLoSA), 22 mesures de bien-être, méta-analyse
  intégrée.
- Résumé : « …starting income was unrelated to starting well-being, and changes in income were unrelated to changes in
  well-being, but starting income significantly predicted more positive trajectories of change in well-being with a
  medium effect size (d = .40). »
- Joue : **soutient c3** (gagner plus ne va pas avec aller mieux, intra-personne) et le contredit en partie (revenu de
  départ → meilleure trajectoire). Force : moyenne (longitudinal, 3 jeux de données, deux cultures).

**22. Di Tella, Haisken-De New & MacCulloch 2007** — 10.3386/w13159 — NBER (publié : 10.1016/j.jebo.2010.09.016,
*JEBO* 2010, sans résumé dans Crossref ni OpenAlex)
- Plan : panel allemand (SOEP), 7 812 personnes, 1984-2000.
- Résumé du document de travail : « We can (cannot) reject the hypothesis of no adaptation to income (status) during the
  four years following an income (status) change. »
- Joue : **soutient « pas durablement »** (adaptation au revenu en 4 ans). Force : moyenne-faible (observationnel ;
  phrase seulement dans le document de travail).

**23. Effets qui s'effacent après les transferts d'argent** (populations pauvres : indirect pour « besoins couverts »,
direct pour « durablement ») :
- **Wollburg et al. 2023** — 10.1371/journal.pone.0281283 — méta-analyse de 17 essais randomisés, 26 794 personnes :
  « However, improvements may not be sustained 2-9 years after program cessation (dpooled = -0.05; 95%-CI: -0.14, 0.04;
  ns). »
- **Baird, de Hoop & Özler 2013** — 10.3368/jhr.48.2.370 — essai randomisé, Malawi : « All of these effects dissipated
  soon after the program ended. » (et plus de détresse chez les non-bénéficiaires des zones traitées).
- **Pignatti 2024** — 10.1002/hec.4867 — crédit d'impôt enfant 2021 (États-Unis) : « The effect materializes after the
  third monthly payment and disappears when the benefits are withdrawn. »
- **Miller et al. 2024** — 10.3386/w32711 — NBER (non publié trouvé) ; essai randomisé, 1 000 $ par mois pendant 3 ans :
  « The cash transfer resulted in large but short-lived improvements in stress and food security » et « …the transfer
  did not improve mental health after the first year and by year 2 we can again reject very small improvements. »
- **Magnuson et al. 2025** — 10.1038/s41467-025-62438-x — essai randomisé, 1 000 mères pauvres, 333 $ par mois :
  « …no statistically significant improvements in subjective economic hardship reports … and small, mostly
  statistically non-significant, increases in parental psychological distress… »
- **Jaroszewicz et al. 2022** — 10.2139/ssrn.4154000 — prépublication (refusée par le vérificateur), 5 243 personnes :
  « …we find no evidence that (more) cash had positive impacts on our pre-specified survey outcomes… »
- Force : élevée pour « les effets ne durent pas après la fin du versement » ; mais un transfert temporaire n'est pas
  une richesse permanente (Lindqvist), et ces gens n'ont pas leurs besoins couverts.

Ce qui **va dans le sens du dossier** (contredit le livre), trouvé en plus, pour être juste :
- **Kim & Oswald 2021** — 10.1111/roiw.12469 — Singapour, 5 626 personnes : « …once we correct for LT bias, a lottery
  windfall is predictive of a substantial improvement in happiness and well-being. » (transversal ; leur phrase de
  contexte reconnaît que « it has proved difficult for social scientists to show that lottery windfalls actually make
  people happier »).
- **McGuire, Kaiser & Bach-Mortensen 2022** — 10.1038/s41562-021-01252-z — méta-analyse, 45 études, 116 999 personnes,
  pays à revenu faible et moyen : « After an average follow-up time of two years, we find that CTs have a small but
  statistically significant positive effect on both SWB (Cohen's d = 0.13…) and MH (d = 0.07…) ».
- **Haushofer & Shapiro 2016** — 10.1093/qje/qjw025 — Kenya : « Transfer recipients experience large increases in
  psychological well-being. » **Erratum non lié** dans Crossref : 10.1093/qje/qjx039 (à lire avant tout usage).
- **West & Castro 2023** — 10.1007/s11524-023-00723-0 — Stockton, 500 $ par mois : « lower mental distress ».
- **Apouey & Clark 2015** — 10.1002/hec.3035 — « …a significant positive effect on mental health. » Panel britannique
  comme Gardner 2006 (le BHPS chez Gardner) : s'il s'agit du même panel (probable, non vérifié dans le texte), ce ne
  sont **pas deux preuves indépendantes**.

### c4 (rendements décroissants) — la direction tient, l'appui principal du dossier est le mauvais

**24. Tan, Kraus, Carpenter & Adler 2020** — 10.1037/bul0000258 — *Psychological Bulletin*
- Plan : méta-analyse, 357 études, 2 352 095 participants (revenu ↔ bien-être : r = .23).
- Résumé : « In moderation analyses, the objective SES-SWB associations strengthened as samples increased in wealth and
  population density. »
- Joue : **contredit la lecture de Howell 2008** que le dossier prend pour c4 (lien « plus fort dans les économies
  pauvres ») depuis un **rang égal** (méta-analyse) et un corpus trois fois plus grand. Oishi et al. 2022
  (10.1093/pnasnexus/pgac224, **avec une correction non liée**, pgad473) va dans le même sens : « Over the last 5
  decades, the income-happiness correlation has increased, not decreased, in the USA and several European countries. »
- Mais une corrélation dit la netteté du lien, pas ce qu'ajoute chaque dollar (la fiche de Howell le dit elle-même).
  Conclusion : **Howell et Tan sont tous deux indirects pour c4** ; c4 doit reposer sur ce qui mesure l'ajout : Thomson
  2022 (carte 17), Dwyer 2022 (« three times larger »), Diener 2010 (« the association of log income with subjective
  well-being was linear but convex with raw income, indicating the declining marginal effects of income »), et la forme
  log-linéaire (Stevenson, Killingsworth, Kahneman & Deaton). Avec eux, « soutient » tient sans conteste.

### Tamberg 2024 (point c de la demande)

- **10.21203/rs.3.rs-5355955/v1** — Tamberg, Steinberger, Cologna, Fisch-Romito, Millward-Hopkins, Calvo, Oreskes —
  Research Square, déposé le 2024-12-03, Crossref `posted-content`, sous-type `preprint`.
- Ce qu'elle trouve (résumé) : Gallup World Poll, plus de 1,3 million de réponses ; en contrôlant la satisfaction des
  besoins (individuelle et nationale) et la qualité de la gouvernance : « We find that a hypothetical country achieving
  population-wide need satisfaction would, even at a GDP per capita of $10,000, match today's happiest countries in
  terms of life evaluation. Beyond this income level, the remaining effects of absolute income are marginal. »
- **Version publiée : aucune trouvée** au 2026-11-22 (Crossref, titre exact et mots des auteurs ; les 7 œuvres de
  l'autrice dans OpenAlex ; Europe PMC `AUTH:"Tamberg L"` ; aucune relation `is-preprint-of` ; pas de v2/v3 chez
  Crossref). L'article de la même autrice dans *Social Indicators Research* 2026 (10.1007/s11205-026-03816-w) est un
  **cadre conceptuel**, pas ce résultat. Sa thèse de master (ETH, 2023, DOI DataCite 10.3929/ethz-c-000800868, inconnu
  de Crossref) disait l'inverse pour la satisfaction : « …in the case of life satisfaction, other factors than need
  satisfiers might need to be included to explain its strong correlation with GDP per capita. »
- Soutient-elle le livre ? **Moins que le dossier ne le dit** : (1) c'est un effet **direct**, une fois contrôlés les
  besoins que l'argent achète en partie : la réponse à « l'argent compte-t-il en plus des besoins ? », pas à « les
  gens plus riches sont-ils plus satisfaits ? » (contrôler un médiateur fait disparaître l'effet par construction) ;
  (2) le seuil est un PIB par habitant de pays « hypothétique », pas un revenu de ménage ; (3) Diener 2010 (carte 3)
  trouve au contraire que les besoins ne médiatisent le lien « to some degree » seulement ; (4) le résumé pose le but
  (« sustainability strategies that limit affluence ») : orientation à noter, sans conclure. Refus du vérificateur :
  justifié ; elle peut figurer sur la page des preuves comme « prépublication, non relue », pas plus.

### L'Égypte et les pays arabes (point d de la demande)

**25. Sameer & Eid 2024** — 10.1504/ijhd.2024.144453 — *International Journal of Happiness and Development* (résumé lu
dans OpenAlex ; Crossref n'en a pas)
- Résumé : « Average happiness in Egypt is 4.8 on scale 0-10… » et « Although Egyptians are discontented with their
  lives cognitively, they feel pretty well affectively, a pattern which is also observed in other African nations. »
- Joue : **appuie la nuance « jugement ≠ humeur »** pour le public égyptien lui-même ; ne dit rien d'un seuil de revenu.
  Force : faible (descriptif), mais c'est le seul texte trouvé sur l'Égypte qui touche la distinction du verdict.

**26. Arampatzi et al. 2018** — 10.1111/roiw.12388 — *Review of Income and Wealth* (trouvé, non gardé par le dossier)
- Résumé : « The increased prevalence of dissatisfaction with the standard of living contributed the most to the
  decline in subjective well‐being during this period… » (Moyen-Orient et Afrique du Nord, 2009-2010).
- Joue : dans la région, c'est **le niveau de vie** qui pèse le plus sur la satisfaction : l'argent compte pour ce
  public. Avec la croissance sans hausse de satisfaction (« unhappy development »), c'est aussi un paradoxe
  d'Easterlin arabe. Force : faible-moyenne (transversal, perçu).

**27. Mitchell & Gengler 2019** — 10.1177/1065912918776128 — *Political Research Quarterly*
- Qatar (le pays arabe le plus riche), enquête représentative : « Results show that perceptions of both group- and
  individual-based inequality dampen satisfaction with state-distributed benefits, irrespective of objective
  socioeconomic well-being. »
- Joue : le seul échantillon arabe riche trouvé : au sommet, la **justice perçue** pèse au-delà de la richesse objective
  (proche de l'esprit du livre). Mesure : satisfaction économique, pas satisfaction de vie. Force : faible.

Barsoum & Majbouri 2025 (10.1038/s41598-024-84452-7, vérifié, sans avis) est déjà dans les « trouvés » du dossier.
**Point d'applicabilité majeur** : tous les seuils discutés (63 000, 75 000, 100 000, 200 000 $ ; même le PIB de
10 000 $ de Tamberg ou les 15 000 $ de Proto) sont des dollars américains ou en parité de pouvoir d'achat ; presque
toutes les études, y compris celles qui trouvent un plateau, disent que **sous** le seuil l'argent compte beaucoup ; et
Jebb 2018 dit que la satiété « occurs later in wealthier regions ». Pour la majorité du public égyptien, le message
« au-delà d'un point l'argent ne change plus rien » ne s'applique pas. Le chiffre de Jebb pour la région
Moyen-Orient/Afrique du Nord est dans son tableau (article payant, non lu par moi) : à lire avant toute phrase
d'applicabilité qui dirait mieux que « معظم الدراسات من أمريكا وأوروبا ». Ne jamais convertir 75 000 $ en livres au
taux de change.

---

## (c) Cherché et pas trouvé (notFound)

- Aucun avis Crossref sur les 12 DOI du verdict ni sur mes 43 DOI de contre-preuve (filtre `updates:` et recherche par
  titre). Mais deux corrections non liées existent ailleurs dans ce champ (Oishi 2022, Haushofer & Shapiro 2016) : le
  filtre seul ne suffit pas.
- Aucune méta-analyse, aucune réplication multi-laboratoires d'un **plateau individuel** (satisfaction ou émotions) ;
  les plateaux viennent de modèles transversaux (Jebb, Bennedsen) ou agrégés (Röck, Proto, Easterlin).
- La réplication multi-laboratoires de Diener 2010 (CREP) n'a publié que ses données (10.5334/jopd.156), aucun résultat.
- Aucune réplication indépendante sur **nouvelles données** de Killingsworth, Kahneman & Mellers 2023 ; seulement deux
  lettres critiques sur les mêmes données (Arslan, Rohrer & Wenz).
- Aucune version publiée de Tamberg 2024 ; aucune version publiée trouvée de Miller 2024 (NBER) ni de Jaroszewicz 2022
  (SSRN) ; aucune version publiée de l'étude à long terme des transferts GiveDirectly au Kenya (Q24).
- Aucun échantillon égyptien ni arabe dans une loterie, un transfert d'argent ou un essai ; aucune étude égyptienne
  avec un revenu mesuré qui teste un seuil.
- Le chiffre de satiété de Jebb 2018 pour la région Moyen-Orient/Afrique du Nord : article payant, non lu.
- Sherman et al. 2020 (10.1007/s10902-019-00079-w, gagnants de loterie) : DOI vérifié, résumé absent de Crossref et
  d'OpenAlex : non retenu.

---

## (d) Conclusion

**Le badge ⚖️ tient ; ❌ ne se défend pas, et la certitude basse est la bonne.** Mais le dossier dit plusieurs choses
plus nettes que ses preuves, dans les deux sens.

1. **Le cadrage.** L'affirmation principale de l'auteur est c4 (rendements décroissants), et elle est vraie ; le
   plateau n'est que dans une note qui cite un magazine, avec « 75 000 $ (ou peut-être 120 000 $) ». L'épisode doit
   (i) tester la note telle qu'écrite, parenthèse comprise ; (ii) dire « مانسون كتب » tant que le chapitre du livre
   n'est pas vérifié ; (iii) être juste avec l'auteur : son exemple principal est confirmé. C'est aussi ce qui rend ❌
   intenable : la grille exige que **la principale** soit contredite avec une certitude au moins modérée, et c1 (la
   plus contredite) est transversale, donc basse par construction.

2. **c1 : « contredit, basse » tient**, avec deux preuves de plus (Akkiraju 2025, Lomas 2024) et Diener 2010 contre
   l'explication par les besoins. Deux réserves à écrire : (i) mesure : l'échelle de Cantril pousse à penser argent
   (Nilsson 2024) ; (ii) le lien suit peut-être le rang plus que la somme (Quispe-Torreblanca 2026, 80 % des 109 pays ;
   Boyce 2010). Et de la cohérence : Röck 2025 (agrégé) ne peut compter comme appui sans Proto & Rustichini 2013 et
   Easterlin 2010 d'un côté, Fors Connolly 2026 de l'autre (qui contredit Röck sur l'Europe même).

3. **c2 : de « mêlée » à « contredit », basse**, pour « 75 000 à 120 000 $, pour tout le monde ». Les auteurs du chiffre
   l'abandonnent (Kahneman & Deaton « overstated », effet plafond ; seuil recalculé à 100 000 $) ; ce qui reste est un
   aplatissement au 15e centile, au-delà de 100 000 $, contesté par une réanalyse (Arslan 2024 : rien de net avant
   200 000 $) ; Bennedsen 2024 met le plateau à 200 000 $. **La nuance dite du dossier est à refaire** : « le plateau
   n'existe que chez les moins heureux » décrit un centile comme un groupe de personnes (Rohrer & Wenz 2024) et un
   résultat discuté. Je recommande de dire une autre nuance, solide et répétée : **l'argent pèse plus sur le jugement
   qu'on porte sur sa vie que sur l'humeur du jour** (Diener 2010 : « a much weaker predictor of positive and negative
   feelings » ; Lindqvist 2020 ; Howell 2008 ; Kahneman & Deaton 2010 ; et, pour l'Égypte, Sameer & Eid 2024). Le
   centile des moins heureux va sur la page des preuves, avec sa controverse. Si l'épisode veut un chiffre de plateau,
   ce n'est pas 75 000.

4. **c3 : « contredit, modérée » est trop fort ; « mêlée, basse »**, ou scinder :
   - c3a, **satisfaction de vie** : contredit (Lindqvist 2020, Kim & Oswald 2021, Thomson 2022 : +0,16 écart-type) ;
     modérée au mieux, basse si l'on suit le GRADE de Thomson ;
   - c3b, **bonheur au quotidien et santé mentale** : mêlée, penche vers le livre (Lindqvist « significantly smaller »,
     Kuhn 2008 nul à 6 mois, Thomson +0,01 pour la santé mentale, Raschke 2019 nul ou pire, Oh 2025 nul intra-personne,
     Di Tella : adaptation en 4 ans ; et partout les effets des transferts s'éteignent avec eux : Wollburg 2023,
     Baird 2013, Miller 2024, Pignatti 2024) ; basse.
   Gardner 2006 et Apouey & Clark 2015 ne comptent qu'une fois s'ils partagent le panel britannique. La phrase du
   dossier « seul Brickman 1978 soutient le livre » est à retirer. Conséquence : **aucun hook ne peut s'appuyer sur
   c3b** ; un hook « les gagnants du loto sont plus satisfaits, même 20 ans après » ne tient que sur c3a et seulement si
   elle reste modérée.

5. **c4 : « soutient, modérée » tient**, mais pas sur Howell 2008 : une corrélation plus forte chez les pauvres ne mesure
   pas l'ajout de chaque dollar, et Tan 2020 (méta-analyse trois fois plus grande) trouve l'inverse sur ce même point.
   Remplacer par Thomson 2022, Dwyer 2022, Diener 2010 et la forme log-linéaire. Point utile au script : en
   log-linéaire, l'augmentation ne s'éteint pas, elle **demande de doubler** (passer de 120 000 à 240 000 $ ajoute
   autant que de 20 000 à 40 000) ; « des sièges un peu plus chauffants » sous-estime un peu, sans fausser l'idée.

6. **L'étude à l'écran.** Lindqvist 2020 est une bonne étude (préenregistrée, causale, au-delà des besoins), mais telle
   que la carte est écrite (« الرضا عن الحياة أعلى ») elle montre **la moitié qui contredit le livre et tait la moitié
   qui le soutient** (bonheur et santé mentale : effets nettement plus petits), et sans la taille (0,037 écart-type
   pour 100 000 $ après impôt, version NBER : petit). Deux options :
   - (recommandée) **Thomson 2022** : rang le plus haut, porte sur le revenu (pas la richesse), contient les deux moitiés
     du ⚖️ (grand effet en sortant de la pauvreté, petit au-delà ; 0,38 contre 0,16 écart-type sur le bien-être) ; à
     écrire avec sa certitude « basse » et son caractère indirect (« autres hausses » ≠ « besoins couverts ») ;
   - garder **Lindqvist**, mais avec ses deux résultats sur la carte et un mot d'intensité tiré de la mesure.
   Dans les deux cas : aucun échantillon du Moyen-Orient ; la phrase d'applicabilité est due.

7. **Verbes.** c1 et c2 : associations seulement (« ارتباط ») ; pas de « الفلوس بتخليك أسعد » : même le seul énoncé
   causal (c3a) porte sur la satisfaction, pas sur le bonheur.

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1016/s2468-2667(22)00058-5 — Thomson et al. 2022 (c3, c4 ; candidat pour l'écran)
2. 10.1073/pnas.2314207121 — Arslan 2024 (c2 : la nuance « moins heureux » contestée ; lettre sans résumé)
3. 10.1073/pnas.2313712121 — Rohrer & Wenz 2024 (c2 : un centile n'est pas un groupe ; lettre sans résumé)
4. 10.1073/pnas.2322160121 — Killingsworth, Kahneman & Mellers 2024 (c2 : seuil de 100 000 $, pas 75 000)
5. 10.1037/a0018066 — Diener et al. 2010 (c1 contre l'explication par les besoins, c2 nuance, c4)
6. 10.1037/bul0000258 — Tan et al. 2020 (c4 : contre l'appui de Howell ; corriger le faux positif de `roles.ts`)
7. 10.1038/s44271-025-00210-z — Akkiraju & Rao 2025 (c1 contredit, c2 soutenu par le stress ; publié, à ne pas écarter)
8. 10.1016/j.econlet.2024.111730 — Bennedsen 2024 (c2 : plateau à 200 000 $)
9. 10.1037/pspp0000552 — Oh 2025 (c3 : changements de revenu ↔ bien-être nuls)
10. 10.3386/w14035 — Kuhn et al. 2008 (c3 : pas plus heureux à 6 mois ; document de travail) et 10.1257/aer.101.5.2226
    (version publiée, texte intégral à lire)
11. 10.1371/journal.pone.0281283 — Wollburg et al. 2023 (c3 : effets non durables après le programme)
12. 10.1111/roiw.12469 — Kim & Oswald 2021 (c3a, appui du dossier)
13. 10.1080/00036846.2018.1494813 — Raschke 2019 (c3b ; contre Gardner)
14. 10.1038/s41598-024-52939-y — Nilsson et al. 2024 (c1 : biais de l'échelle de Cantril)
15. 10.1038/s41467-026-69729-x — Quispe-Torreblanca et al. 2026 (c1 : le rang, 109 pays, modérateur culturel)
16. 10.1504/ijhd.2024.144453 — Sameer & Eid 2024 (Égypte : jugement bas, humeur correcte)
17. 10.1038/s41598-026-59695-1 — Fors Connolly et al. 2026 (contre Röck 2025)
18. 10.1371/journal.pone.0079358 — Proto & Rustichini 2013 (plateau au niveau des pays)
19. 10.1073/pnas.1015962107 — Easterlin et al. 2010 (rien à long terme au niveau des pays)
20. 10.1111/roiw.12388 — Arampatzi et al. 2018 (Moyen-Orient : le niveau de vie pèse le plus)
21. 10.3386/w13159 — Di Tella et al. 2007 (adaptation au revenu ; publié 10.1016/j.jebo.2010.09.016, sans résumé)
22. 10.1038/s41562-021-01252-z — McGuire et al. 2022 (transferts, pays pauvres, d = 0,13 à 2 ans)
23. 10.3368/jhr.48.2.370 — Baird et al. 2013 (effets dissipés à la fin du programme)
24. 10.1002/hec.4867 — Pignatti 2024 (effet qui disparaît avec le versement)
25. 10.1038/s41467-025-62438-x — Magnuson et al. 2025 (transferts sans effet sur le bien-être des mères)
26. 10.1080/17439760.2023.2248963 — Lomas 2024 (142 pays)
27. 10.1177/0956797610362671 — Boyce et al. 2010 (le rang, pas la somme)
28. 10.1038/s41562-025-02264-9 — Newman et al. 2025 (vie quotidienne)
29. 10.1073/pnas.2221884120 — Ye et al. 2023 (jumeaux chinois)
30. 10.1177/1065912918776128 — Mitchell & Gengler 2019 (Qatar)
31. 10.1002/hec.3035 — Apouey & Clark 2015 (à fusionner avec Gardner 2006 si même panel)
32. 10.1093/qje/qjw025 — Haushofer & Shapiro 2016 (lire d'abord l'erratum non lié 10.1093/qje/qjx039)
33. 10.1007/s11524-023-00723-0 — West & Castro 2023 (Stockton)
34. 10.3386/w32711 — Miller et al. 2024 (document de travail : effets de courte durée)
35. Pour la page des preuves seulement (refusés par le vérificateur) : 10.21203/rs.3.rs-5355955/v1 (Tamberg 2024,
    prépublication), 10.2139/ssrn.4154000 (Jaroszewicz 2022, prépublication), 10.3929/ethz-c-000800868 (thèse de
    Tamberg, DataCite).
