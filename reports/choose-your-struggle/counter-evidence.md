# Contre-preuve : « choisis ta lutte » (Manson, ch. 2), verdict ⚖️ basse

Agent contre-preuve, 2026-11-23. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé (dossier brouillon
`choose-your-struggle`, ⚖️, certitude basse). Je ne valide rien. Lu : `docs/verdict.md` (grille), le dossier (`.json` et
`.md`), les 12 fiches de `content/sources/` qu'il cite, `content/contested.json`, la page de l'auteur
(`markmanson.net/question`, notes comprises). Seul ce fichier est écrit ; `blind-review.md` n'a pas été touché.

Sources : Crossref (`query.bibliographic` ; `filter=updates:<doi>` ; `works/<doi>`), Europe PMC (`search`,
`resultType=core` pour `commentCorrectionList` ; `fullTextXML`), OpenAlex (`works?search=`, `filter=cites:`,
`title.search`, résumés). Textes intégraux lus : Wang 2021 (PMC8149892, Europe PMC), Kizilcec & Cohen 2017
(PMC5410783, page PMC : Europe PMC répondait 500), Kizilcec 2020 (PMC7334459), Cole 2021 (PMC8500882). User-Agent
générique `book-vs-science-counter/0.1`, aucun nom ni e-mail. Réponses brutes : scratchpad de la session
(`ce-struggle/raw/`), pas dans le dépôt.

Limites de ma recherche : résumés surtout, sauf les quatre textes ci-dessus ; le texte d'Alghazo 2020 reste illisible
(vérification anti-robot sur ijcrsee.com, pas de connexion vers le miroir Dialnet) ; les scores de Hofstede des pays
arabes n'ont pas été lus. Tout DOI cité ici a été trouvé par une requête, puis vérifié sur Crossref (`works/<doi>` :
titre, premier auteur, année) ; aucun n'est pris de mémoire.

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 12 DOI du verdict (0022-3514.83.5.1198, j.jesp.2011.02.003, s13423-021-01880-6, 0022-3514.80.5.736, 0146167299025002010, 2334-8496-2020-8-si-37-47, fpsyg.2021.565202, 17437199.2019.1594332, pnas.1611898114, pnas.1921417117, a0035661, jcr/ucv098) | 0 avis pour chacun ; `updated-by` et `relation` vides dans `works/<doi>` |
| Crossref | `query.bibliographic` « correction erratum corrigendum + titre », pour les 12 | 0 avis (seul un « dataset » PsycEXTRA homonyme de Kappes 2011, sans rapport) |
| Europe PMC | `commentCorrectionList` des 8 qui y sont indexés (Oettingen 2002, Cole, Oettingen 2001, Wang, Cross, Kizilcec ×2, Cerasoli) | aucun lien ; Kappes 2011, Pham 1999 et Woolley 2016 ne sont pas indexés |
| Crossref | `filter=updates:` sur les 33 DOI de contre-preuve vérifiés ci-dessous (prépublication SSRN de Woolley 2025 comprise) | 0 avis |

### Requêtes de recherche (2026-11-23)

| # | Base | Requête exacte | Regardés (sur) |
|---|---|---|---|
| Q1 | Europe PMC | `"positive fantasies" OR "positive fantasy" OR "idealized fantasies"` | 40 (63) |
| Q2 | OpenAlex | `positive fantasies replication` | 25 (48 620) |
| Q3 | OpenAlex | œuvres qui citent Kappes 2011 (`cites:W2155048797`) + `replication OR replicate OR preregistered OR registered` | toutes (30 sur 131 citations) |
| Q4 | OpenAlex | œuvres qui citent Oettingen & Mayer 2002 (`cites:W2156231772`) + `replication OR replicate OR preregistered OR failed` | 50 (182 sur 673) |
| Q5 | OpenAlex | `positive fantasies effort goal attainment expectations versus fantasies` (2012-2026) ; `imagining success reduces effort motivation experiment` (2005-2026) | 25 ; 15 |
| Q6 | Europe PMC | `("mental contrasting" OR WOOP) AND (randomized OR randomised OR trial) AND PUB_YEAR:[2017 TO 2026]` | 60 (159) |
| Q7 | OpenAlex ; Europe PMC | `mental contrasting meta-analysis` (2019-2026) ; `("mental contrasting" OR "WOOP" OR "fantasy realization") AND ("meta-analysis" OR "systematic review")` | 25 ; 40 (142) |
| Q8 | OpenAlex | `title.search:implementation intentions meta-analysis` (2007-2026) ; `title.search:implementation intention meta-analytic` | toutes (15) ; 1 |
| Q9 | Europe PMC | `("implementation intention*" OR "mental contrasting" OR "process simulation" OR "positive fantas*") AND ("registered report" OR "preregistered replication" OR "pre-registered replication" OR "replication attempt" OR "failed to replicate" OR "Many Labs")` | toutes (22) |
| Q10 | OpenAlex | `process simulation replication Pham Taylor exam studying preregistered` | 13 |
| Q11 | Europe PMC | `("process simulation" OR "process-based simulation" OR "process-focused" OR "process focus") AND ("outcome simulation" OR "outcome focus" OR "outcome-based")` | 40 (109) |
| Q12 | Crossref ; OpenAlex | `Eyes on the prize or nose to the grindstone…` ; `Imagery interventions in health behavior meta-analysis Conroy Hagger` ; `mental imagery intervention meta-analysis behaviour change process outcome imagery` (2015-2026) | 3 ; 4 ; 15 |
| Q13 | Crossref ; OpenAlex | `L2 motivational self system meta-analysis Al-Hoorie` ; `Reexamining the Role of Vision… preregistered conceptual replication` | 8 ; 4 |
| Q14 | Crossref ; OpenAlex | `Motivating personal growth by seeking discomfort Woolley Fishbach` ; `The effort paradox…` ; `Much ado about grit…` ; `Adherence to Personal Resolutions…` ; citations de Woolley 2022 (`cites:W4220778456` + `replication OR replicate OR preregistered OR discomfort`) | 4 ; 3 ; 3 ; 5 ; toutes (39 sur 68) |
| Q15 | Europe PMC | `"implementation intentions" AND (Iran OR Iranian OR Saudi OR Egypt OR Jordan OR Lebanon OR Kuwait OR Qatar OR Oman OR Tunisia OR Morocco)` (avant : deux formes plus larges, noyées sous « action planning » et « Arab », et une forme `ABSTRACT:` qui rend 0) | 50 (148) |
| Q16 | Europe PMC | `"intrinsic motivation" AND ("academic achievement" OR "academic performance" OR persistence OR adherence) AND (Saudi OR Egypt OR Egyptian OR Jordan OR Jordanian OR Lebanon OR Emirati OR Kuwait OR Qatar OR Oman OR Arab) AND PUB_YEAR:[2010 TO 2026]` | 40 (1 423) |
| Q17 | OpenAlex ; Crossref | `Pilotti mental simulation outcome process students` ; `Pilotti process simulation outcome simulation college students Saudi` (autres travaux de l'équipe d'Alghazo 2020) | 15 (66) ; 10 |
| Q18 | OpenAlex | `Hofstede individualism score Arab countries Egypt Saudi collectivist` | 10 (337) |
| T1 | texte | Wang 2021, Kizilcec 2017, Kizilcec 2020, Cole 2021 (lus) ; Alghazo 2020 (ijcrsee.com : anti-robot ; Dialnet : pas de connexion) | 4 lus, 1 non |
| T2 | web | `markmanson.net/question`, texte et notes | page lue |

Obligatoires : « meta-analysis » (Q7, Q8, Q12, Q13), « replication » (Q2-Q4, Q9, Q10, Q14), « culture » / « moderator »
(Q15-Q18 et le texte de Kizilcec 2017).

---

## (b) Ce que j'ai trouvé

« Force » = poids de l'argument contre le verdict, selon la grille (rang du plan, taille, indépendance). Les phrases
citées sont des phrases de résultat du résumé, sauf mention contraire.

### 0. Ce que dit vraiment l'auteur (touche c1 et c4)

- La page (extrait mis à jour du livre) oppose en toutes lettres le plaisir et la douleur : « What determines your
  success isn't “What do you want to enjoy?” The question is, “What pain do you want to sustain?” ». Et plus loin :
  « This is not a call for willpower or “grit.” » ; et : « we are all capable of […] ascribing meaning to our pain ».
- La phrase sur la salle de sport (« People who enjoy the struggles of a gym… ») parle d'aimer **la lutte**, pas
  l'activité agréable. **c4 teste une lecture douce de cette phrase (aimer l'activité), pas l'idée centrale** (choisir
  la douleur qu'on accepte, lui donner un sens). Voir le point (d) plus bas : cette idée centrale a été testée, et le dossier dit le contraire.
- Pour c1, la page dit : « maybe what you actually want is a fantasy, an idealization […] you just enjoy wanting ».
  Elle ne dit nulle part qu'**imaginer** le résultat nuit. La phrase du dossier « Elle le contredit […] : imaginer le
  résultat n'est pas l'ennemi en soi » répond à quelque chose que l'auteur n'écrit pas.

### Contre c1 (rêver du résultat idéalisé diminue l'effort) — le dossier dit « mêlée, basse »

**1. Cole et al. 2021**, relu (texte intégral) — 10.3758/s13423-021-01880-6
- Texte : « an omnibus test of moderators shows that the effects are not statistically significantly different between
  subtypes of mental simulation, QM( df = 7) = 10.47, p = .1636. »
- Joue : l'appui « contre » de c1 (g = .23 pour les « superior outcomes », 15 effets) est une **estimation de sous-groupe
  exploratoire**, d'un test global non significatif, et elle compare à **un groupe sans simulation**, pas à des pensées
  qui questionnent ou réalistes (le comparateur de c1). Ce n'est pas une contradiction de c1, c'est une nuance. Le
  dossier l'a mise en « contradicts » ; avec la grille, cette étiquette décide la direction « mêlée ». Force : élevée
  pour l'étiquette, faible pour la direction.

**2. Hallford et al. 2026** — 10.1080/00049530.2026.2762616 — *Australian Journal of Psychology*
- Plan : expérience randomisée **préenregistrée**, 134 adultes en ligne ; penser au résultat contre penser aux étapes.
- Résumé : « Outcome-focused thinking increased anticipatory pleasure, motivation and personal significance. In
  contrast, process-focused thinking reduced perceived control and was associated with reductions in both anticipated
  and anticipatory pleasure. »
- Joue : contredit le volet « motivation » de c1 (et c2, voir carte 6). Indirect : motivation déclarée, aucun effort ni
  comportement mesuré. Force : faible-moyenne.

**3. Al-Hoorie 2018** — 10.14746/ssllt.2018.8.4.2 — méta-analyse, 39 échantillons, 32 078 apprenants de langues ; **Kim
2026** — 10.3390/educsci16060892 — méta-analyse, 25 études, 9 810 personnes
- Al-Hoorie : « the three components of the L2 motivational self system (the ideal L2 self, …) were significant
  predictors of subjective intended effort (rs = .61, .38, and .41, respectively), though weaker predictors of objective
  measures of achievement (rs = .20, -.05, and .17). » Kim : « the Ideal L2 Self was significantly correlated with L2
  learning (r = 0.348, 95% CI [0.260, 0.430]) ».
- Joue : un grand champ où **se voir réussir** (la « vision ») va avec plus d'effort et un peu plus de réussite :
  contredit c1 en direction, mais par corrélation, et la mesure se confond avec la confiance en soi (Al-Hoorie 2023,
  10.1017/s0272263123000487 : « the ideal L2 self was not discriminant from linguistic self-confidence »), c'est-à-dire
  avec les **attentes** qu'Oettingen distingue des fantasmes. Force : faible.

**4. Absence de réplication indépendante** (Q1-Q5)
- Les 30 œuvres qui citent Kappes 2011 avec un mot de réplication, les 182 de même pour Oettingen 2002 : **aucune
  réplication** de l'effet des fantasmes positifs sur l'énergie ou la réussite ; tout ce qui le reteste (Kappes & Oettingen 2012,
  10.1177/0146167212446163, sur l'information ; Kappes, Sharma & Oettingen 2012, 10.1016/j.jcps.2012.02.001, sur les
  dons ; Oettingen, Mayer & Portnow 2016, 10.1177/0956797615620783, sur la dépression) vient du même laboratoire. Force : élevée pour la certitude (un seul labo, n de 40 à 164, la seule mesure de réussite à p = .05).

Bilan c1 : sans Cole en « contredit », c1 devient « soutient, basse » (un labo, petits n) ; avec, « mêlée, basse ». Les
deux mènent au même badge. Mais **la nuance dite du dossier (c1) repose sur deux appuis faibles** : un sous-groupe
exploratoire (Cole) et un résultat d'un seul labo jamais répliqué (Kappes). Voir la conclusion.

### Contre c2 (le processus mieux que le résultat) — le dossier dit « mêlée, basse », « très basse » défendable

Le dossier n'a que Pham 1999, Alghazo 2020 et Cole 2021 (sans comparaison directe). Il manque quatre comparaisons
directes indépendantes, et elles ne vont pas toutes dans le même sens :

**5. Pour le livre** (comparaisons directes, petits échantillons, Pologne)
- **Marszał-Wiśniewska & Jarczewska-Gerc 2016** (Crossref : en ligne 2014) — 10.1080/00223980.2014.987102 — deux
  expériences (40 et 106 femmes) : « Students from the mixed and process simulation groups lost significantly more
  weight after five weeks than participants from the outcome simulation and control groups. »
- **Styk, Zmorzyński & Klinkosz 2021** — 10.1186/s13690-021-00524-4 — 252 adultes, tâche de labyrinthe : « Process
  simulation subjects completed more tasks and spent more time solving the test than outcome simulation subjects. »
- **Prokopowicz & Byrka 2021** — 10.1038/s41598-021-02036-1 — essai randomisé enregistré, 150 femmes après césarienne :
  « Percentages of mobilized patients were: 39.4% the process-simulation group; 32.8% in the outcome-simulation group;
  27.7% controls (p = 0.073). » (durée : processus > contrôle, p < .01).
- En plus, indirects : **Houser-Marko & Sheldon 2008** — 10.1177/0146167208322618 — « it is optimal to evaluate goal
  progress at the lower, subgoal level, particularly after failure feedback » (8 semaines) ; **Freund & Hennecke 2015**
  — 10.1177/0963721414559774 — revue narrative : le focus sur le processus serait plus adapté aux buts exigeants.

**6. Contre le livre** : **Hallford 2026** (carte 2) : préenregistrée, la plus récente, et c'est le **processus** qui
fait baisser le sentiment de contrôle et le plaisir anticipé, le **résultat** qui motive (motivation déclarée seulement).

**7. Alghazo et al. 2020**, ce qu'on peut en dire (point e de la demande)
- Auteurs : Prince Mohammad Bin Fahd University, Al Khobar (Crossref). Revue en accès libre de petite taille, citée 2
  fois (OpenAlex) ; texte inaccessible pour moi aussi : ni n, ni mode d'attribution, ni pays des étudiants (« from the
  Middle East »). Pas de groupe contrôle : processus contre résultat seulement. Son résumé n'est pas un nul net : « Type
  of simulation impacted students' performance on assignments, but differently depending on the timing of the
  assessment. » Force comme preuve : faible ; comme seul échantillon arabe : il ne peut porter seul la phrase
  d'applicabilité.

Bilan c2 : « mêlée » tient, mais pour de meilleures raisons que celles du dossier. Si les cartes 5 et 6 entrent,
« basse » se défend (plusieurs comparaisons directes, cohérentes en majorité sur le comportement, petites) ; sans elles,
c'est **très basse**, et la grille fait alors tomber la certitude de tout le verdict (voir la conclusion).

### Contre c3 (opposer le but à l'obstacle et faire des plans « si… alors » aide plus que rêver) — le dossier dit « soutient, basse »

**8. Wang, Wang & Gai 2021**, relu (texte intégral) — l'étude à l'écran
- Texte : « we decided to exclude two independent studies with a large sample size (13,909 participants in total,
  accounting for 87.44% of the whole sample in the current meta-analysis) by Kizilcec and Cohen ( 2017 ) ». **Les
  « 15907 participants » de la carte sont à 87 % une seule étude en ligne**, celle dont l'effet n'existe que dans les pays
  individualistes et ne s'est pas répliqué (cartes 9 et 10). Hors elle : 22 études, 1 998 participants (tableau 2 :
  1 456 + 542).
- Biais de publication : « The funnel plot … showed strong asymmetry » ; « Egger's regression test ( t = 5.46, p < 0.01) » ;
  « the adjusted values were 0.242, 95% CI (0.143, 0.342) » (trim-and-fill, méthode qui corrige souvent trop peu).
- Allégeance : sur les 21 articles inclus, **au moins 13 ont Oettingen ou Gollwitzer comme coauteurs** (Adriaanse,
  Christiansen, Duckworth, Fritzsche, Gawrilow, Gollwitzer 2018, Houssais, Loy, Marquardt, Oettingen 2015,
  Saddawi-Konefka, Stadler, Wittleder) ; et l'article indique « Reviewed by: … Gabriele Oettingen ». Les méta-analystes
  sont indépendants, le corpus ne l'est pas : la fiche dit « auteurs indépendants du labo d'Oettingen » sans cette
  réserve.
- Modérateurs : « document » g = 0.277 contre « experimenter » g = 0.465 ; contexte scolaire g = 0.255. Un spectateur
  qui fait WOOP seul devant une vidéo est dans le cas le plus faible.

**9. Kizilcec & Cohen 2017**, relu (texte intégral)
- Texte : « In contrast, MCII did not raise course completion in collectivist and culturally balanced countries » ; et
  « MC and II alone caused no statistically significant improvement in course completion for participants in any
  cultural context in the second experiment ». Les catégories viennent de l'index de Hofstede : collectiviste [0, 33]
  (« Mexico, China, Romania »), équilibré [34, 66] (« India, Brazil, Russia »), individualiste [67, 100] (« United States,
  Australia, France »).
- Joue : l'effet n'existe **que** pour les pays à 67 ou plus. L'effet absolu y est petit : de 5,5 à 7,3 % et de 26 à
  30 % de cours terminés (chiffres rappelés par Kizilcec 2020). Aucun pays arabe n'est nommé.

**10. Kizilcec et al. 2020**, relu (texte intégral) — au dossier
- Texte : « The MCII intervention did not improve course completion for students in individualistic countries (year 2:
  β = 0.25 pp, 95% CI = [−0.87, 1.37] … ) », sur **12 879** étudiants de ces pays (tableau 1), contre 1,8 et 3,9 points
  à l'origine : **l'intervalle exclut les effets d'origine**. Et : « We hypothesized that the interventions would produce
  medium-to-large effects as in prior studies, but this is not supported by our results. » L'activité monte la 1re
  semaine (β = 0.0603) et plus la 2e (β = 0.0099, IC [−0.0451, 0.0649]).
- Joue : c'est la réplication préenregistrée, à grande échelle, **dans le sous-groupe même où l'effet avait été
  trouvé**, et plus grande que tout le reste de Wang réuni (12 879 contre 1 998). Question de rang pour le relecteur :
  préenregistrée et multi-sites (247 cours, trois universités) mais une seule équipe. Si on la classe au rang de
  « réplication préenregistrée » (haute), la grille interdit « soutient » (« une preuve qui contredit et vient d'un
  rang égal ou supérieur »). Force : élevée.

**11. Essais indépendants nuls** (absents du dossier)
- **Kudrna et al. 2025** — 10.3390/ijerph22030398 — essai randomisé par grappes, 28 lieux de travail, 225 salariés
  (Royaume-Uni). Le groupe contrôle **formule ses souhaits sans plus** : c'est exactement le comparateur « seulement
  rêver » de c3. Résumé : « The results showed no substantive effect of the intervention on average self-reported
  progress towards what they wished to do for their health and wellbeing four weeks later (mean difference on a 1-7
  scale: -0.19; 95% credible interval: -1.08-0.71). Unexpectedly, anxiety increased ». Force : moyenne (le comparateur
  le plus juste trouvé, petit, autodéclaré).
- **Kędra & Łaguna 2026** — 10.5114/cipp/225999 — deux essais randomisés en ligne (59 et 112 personnes, Pologne) :
  « No statistically significant effects of the MCII online intervention were observed in either Study 1 or Study 2. »
- **Riddell et al. 2023** — 10.1080/00224545.2022.2163610 — 111 cyclistes : « Although MCII did not support goal
  attainment in the current study, its ability to minimize the influence of obstacles may still be useful ».
- **Cooke, McEwan & Norman 2022** — 10.1111/dar.13553 — méta-analyse des plans « si… alors » sur l'alcool (16 études) :
  « university (d+ = −0.04, CI [−0.13; 0.05]) » et « online (d+ = −0.04, CI [−0.14; 0.06]) », « effects diminished over
  time », et rien sur les excès (« null effect on HED »). Le format de l'épisode (en ligne, jeunes) est celui où l'effet
  disparaît.
- Un « registered report » existe (**Sezer et al. 2025**, 10.1080/08870446.2025.2491593) mais compare MCII quotidien et
  MCII unique, sans groupe contrôle : il ne teste pas c3.

**12. Ce qui va dans le sens du dossier**, pour être juste
- **Sheeran et al. 2024** — 10.1080/10463283.2024.2334563 — 642 tests des plans « si… alors » : « forming
  implementation intentions proved effective for cognitive, affective, and behavioural outcomes (.27 ≤ d ≤ .66) »
  (Gollwitzer coauteur ; écartée par le dossier pour cette raison).
- **Breitwieser & Reinelt 2026** — 10.1111/bjop.70065 — méta-analyse en **registered report**, enfants, 42 études,
  N = 12 957 : « Hedge's g = 0.31, 95% CI [0.21; 0.41] », hétérogénéité forte (I² = 65 %). Indirect (enfants).
- **Melum & Martiny-Huenger 2026** — 10.1186/s12966-026-01915-y — essais à groupe contrôle actif : « approximately a
  quarter of a portion of fruit and vegetable per day more » (MD = 0.29) ; petit, autodéclaré.
- **Wittleder et al. 2025** — 10.1177/10901981241310216 — WOOP contre un « Sham WOOP (Wish, Outcome, "Outcome", and
  Plan) », c'est-à-dire **rêver deux fois au lieu de regarder l'obstacle** : « the WOOP intervention group reported fewer
  heavy drinking days … at the 1-month and 2-month follow-ups ». Le meilleur comparateur pour c3, mais du labo d'origine.
- **Silva et al. 2018** — 10.1371/journal.pone.0206294 — activité physique, essais randomisés : 0.25 [0.05 ; 0.45]
  avec renforcement.
- Échantillons du Moyen-Orient : point (e).

Bilan c3 : les plans « si… alors » seuls ont des preuves larges et petites ; **le paquet WOOP/MCII**, celui de l'épisode,
a pour lui un corpus surtout du labo d'origine, avec biais de publication, et contre lui une réplication préenregistrée
précise et trois essais indépendants nuls, dont le seul qui compare à « seulement rêver ». « Soutient » ne se défend pas
sans dire pourquoi Kizilcec 2020 n'est pas de rang égal ; « mêlée, basse » est plus juste.

### c4 et l'idée du livre (point d de la demande)

**13. Woolley & Fishbach 2022** — 10.1177/09567976211044685 — *Psychological Science* — **le test direct de « choisis ta
lutte »**
- Plan : 5 expériences, 2 163 adultes ; amélioration de soi (théâtre d'improvisation, écriture expressive, s'informer
  sur la COVID-19, opinions politiques opposées, violence par armes).
- Résumé : « Across these areas of personal development, seeking discomfort as a signal of self-growth motivated
  engagement and increased perceived goal achievement relative to standard instructions. » Et : « these effects
  occurred only in areas of personal growth that cause immediate discomfort. »
- Joue : **soutient le livre** sur son idée centrale (chercher l'inconfort, lui donner le sens d'un progrès), que le
  dossier dit « pas mesurée ». Limites : un seul labo (celui de Woolley 2016), effets à court terme, réussite
  **perçue** ; aucune réplication trouvée dans les 39 œuvres citantes filtrées (Q14). Force (contre le dossier) :
  élevée ; la phrase du dossier « « choisis ta douleur » n'est pas ce qui est mesuré » est fausse.

**14. David et al. 2024** — 10.1037/bul0000443 — *Psychological Bulletin*
- Plan : méta-analyse, 170 études, 4 670 personnes, 29 pays (NASA-TLX).
- Résumé : « As expected, we found a strong positive association between mental effort and negative affect.
  Surprisingly, just one of our 15 moderators had a significant effect (effort felt somewhat less aversive in studies
  from Asia vs. Europe and North America). »
- Joue : soutient la **prémisse** du livre (« You can't have a pain-free life » : l'effort coûte, partout) ; corrélation,
  effort mental seulement. Force : moyenne, en faveur du livre.

**15. Woolley, Giurge & Fishbach 2025** — 10.1177/09567976251350960 — *Psychological Science* (prépublication SSRN
10.2139/ssrn.5263734)
- Résumé : « In a year-long longitudinal study, U.S. adults set extrinsic New Year's resolutions, but intrinsic
  motivation predicted adherence to these goals more than extrinsic motivation (Study 1). These findings emerged among
  adults in China (Study 2) … Overall, intrinsic motivation both predicted and causally increased goal adherence. »
- Joue : renforce c4 là où le dossier est faible : **la persistance sur un an**, un échantillon non occidental, et une
  expérience causale. Car Cerasoli 2014 ne montre pas la persistance : « intrinsic motivation predicted more unique
  variance in quality of performance, whereas incentives were a better predictor of quantity of performance » (la
  quantité est plus proche de « persister » que la qualité) ; et Woolley 2016 mesure une séance.

**16. La vraie tension avec le livre** (lecture des fiches au dossier)
- Woolley 2016 : « having participants choose the most enjoyable rather than the most useful exercise » augmente la
  persistance. C'est un conseil pour **réduire** la lutte, à l'opposé de « What pain do you want to sustain? » lu à la
  lettre. Et l'auteur exclut lui-même la volonté et le grit.
- Conclusion (d) : c4 teste la phrase sur la salle de sport (aimer l'activité) et la soutient ; elle ne teste pas
  « choisir la douleur qu'on accepte ». Ce qui teste cette idée (carte 13) **soutient** le livre, faiblement. Le
  « contredire » honnête n'est pas « la douleur n'est pas mesurée » mais : **ce qui fait tenir, c'est de trouver du
  plaisir dans le chemin, ou de lire l'inconfort comme un signe de progrès ; serrer les dents seul n'a pas de preuve**.

### Le public arabe (point e de la demande)

**17. Kizilcec 2017 : quelles cultures ?** Index de Hofstede, seuil individualiste à 67 (carte 9). L'article ne nomme
aucun pays arabe. Les scores arabes n'ont pas été lus ici (et l'estimation d'origine de Hofstede pour les « pays
arabes » en bloc est contestée : Alkailani et al. 2012, 10.5539/ibr.v5n4p71, « scores … obtained by Hofstede in his
previous studies conducted in Arab countries and then generalized to Jordanian culture are not scientifically valid »).
À vérifier avant de l'écrire, mais un pays arabe à 67 ou plus serait une surprise : **le public de la chaîne est très
probablement dans les groupes où MCII n'a rien changé**.

**18. Armitage, Alganem & Norman 2017** — 10.1007/s11121-017-0807-z — *Prevention Science* — **Koweït**
- Plan : essai randomisé, 216 personnes en surpoids dans un programme d'amaigrissement, suivi à 6 mois, poids mesuré.
  Le contrôle réfléchit aux situations critiques et aux réponses **sans** former de plans.
- Résumé : « Participants in the intervention condition lost significantly more weight (6.15 kg; −6.58% initial body
  weight) than those in the control condition (3.66 kg; −4.04% initial body weight), … d = .38. » Et : « The present
  study is the first to show that implementation intentions work beyond a Western context ».
- Joue : **le dossier dit « aucun échantillon arabe »** : il y en a un, positif, pour la moitié « si… alors » du geste
  (pas pour le contraste mental). Limite : Armitage a conçu la « volitional help sheet » (allégeance). Force : moyenne,
  plutôt **pour** c3 en partie, et contre le pessimisme culturel tiré de Kizilcec.

**19. Pakpour et al. 2016** — 10.1007/s12160-015-9767-3 — **Iran** (Moyen-Orient, pas arabe) — essai par grappes,
1 158 élèves, 48 écoles : « adolescents who received the implementation intention intervention had significantly greater
improvement in the frequency of self-reported brushing … than those in planning condition ». Même lecture que la
carte 18.

**20. c4 dans des échantillons saoudiens** (transversaux)
- **Alshammari & Alrashidi 2026** — 10.1038/s41598-026-44548-8 — 218 étudiants d'anglais (Ha'il) : « IDLE and intrinsic
  motivation had significant positive effects on OLER, while grit did not … For English achievement, grit had a
  significant positive effect, while IDLE and intrinsic motivation had insignificant effects. » Ici, le plaisir va avec
  l'effort, pas avec la réussite ; c'est la persévérance qui va avec la réussite.
- **Frikha 2025** — 10.3389/fpsyg.2025.1420286 — 471 étudiantes saoudiennes : « a significant indirect effect of
  enjoyment, intrinsic motivation, and BMI accounted for 20.04% of the total effect ».
- Joue : le « aucun échantillon arabe sur le plaisir et la persistance » du dossier est à corriger : deux échantillons
  saoudiens existent, transversaux, mêlés. Force : faible.

---

## (c) Cherché et pas trouvé (notFound)

- Aucun avis Crossref ni Europe PMC sur les 12 DOI du verdict ni sur mes 33 DOI de contre-preuve (filtre `updates:`,
  recherche par titre, `commentCorrectionList`).
- Aucune réplication indépendante de l'effet des fantasmes positifs (Kappes 2011, Oettingen 2002), aucune méta-analyse
  fantasmes contre attentes.
- Aucune réplication multi-laboratoires de MCII/WOOP ; aucune estimation de Wang 2021 corrigée autrement que par
  trim-and-fill (ni PET-PEESE ni sélection) ; aucune méta-analyse de MCII postérieure à 2021.
- Aucune réplication de Pham & Taylor 1999 ; aucune méta-analyse qui compare processus et résultat face à face.
- Aucune réplication de Woolley & Fishbach 2022 (chercher l'inconfort).
- Aucun échantillon arabe pour les fantasmes positifs ni pour MCII/WOOP en paquet ; aucun échantillon égyptien pour quoi
  que ce soit de cet épisode.
- Les scores de Hofstede des pays arabes ; le texte d'Alghazo 2020 (n, attribution, pays).
- Gollwitzer & Sheeran 2006 : non relu (le dossier le dit sans résumé) ; je ne l'ai pas cherché à nouveau.

---

## (d) Conclusion

**Le badge ⚖️ tient ; ✅ et ❌ sont exclus (certitude basse partout). Mais deux affirmations sont mal étiquetées, l'étude
à l'écran affiche un chiffre trompeur, et la phrase « choisis ta douleur n'est pas mesurée » est fausse.**

1. **c1 : la direction dépend d'une étiquette discutable.** Cole 2021 ne contredit pas c1 (autre comparateur, sous-groupe
   exploratoire d'un test global non significatif, p = .16) : c'est une nuance. Sans lui, c1 = « soutient, basse » (un
   seul labo, jamais répliqué) ; « très basse » se défend. Le badge ne bouge pas. **La nuance dite (c1) est fragile sur
   ses deux jambes** ; je recommande de dire plutôt la nuance de c3 (point 3), la mieux établie du dossier.

2. **c2 : « mêlée » tient, mais la certitude dépend de ce qui entre au dossier.** Ajouter Marszał-Wiśniewska 2016,
   Styk 2021, Prokopowicz 2021 (pour le processus) et Hallford 2026 (contre, préenregistrée). Sans elles, c2 est **très
   basse**, et la grille (« la certitude du verdict ne dépasse pas la plus basse ») fait tomber tout le verdict à très
   basse : ⚖️ reste possible, ❓ devient défendable, et aucun hook ne pourrait s'appuyer sur c2.

3. **c3 : de « soutient, basse » à « mêlée, basse ».** Le paquet WOOP a contre lui la réplication préenregistrée de
   Kizilcec 2020 (12 879 étudiants, intervalle qui exclut l'effet d'origine), trois essais indépendants nuls (Kudrna
   2025, le seul comparé à « seulement rêver » ; Kędra 2026 ; Riddell 2023) et la méta-analyse de Cooke 2022 (nul en
   ligne et chez les étudiants) ; pour lui, un corpus à 13 articles sur 21 du labo d'origine, avec biais de publication
   (Egger t = 5.46 ; 0.24 après trim-and-fill). Si le relecteur classe Kizilcec 2020 au rang « réplication
   préenregistrée », « soutient » est interdit par la grille ; sinon, il faut écrire pourquoi. Option propre : scinder
   **c3a « plans si… alors »** (soutient, basse ; Sheeran 2024, Breitwieser 2026, et un essai arabe, Armitage 2017) et
   **c3b « WOOP/MCII »** (mêlée, basse). Nuance que je recommande de dire : « اتجربت على ربع مليون طالب أونلاين، وما
   فرقتش في اللي كمّلوا » (Kizilcec 2020), qui est aussi la limite du geste proposé.

4. **c4 : « soutient, modérée » tient**, mieux avec Woolley, Giurge & Fishbach 2025 (un an, Chine, expérience causale) qu'avec
   Cerasoli (qualité, pas persistance). Mais **c4 ne teste pas l'idée centrale**. Ajouter une affirmation c5 (causale) :
   « lire l'inconfort de l'effort comme un signe de progrès augmente la motivation » : soutient, basse (Woolley &
   Fishbach 2022 : un labo, court terme, réussite perçue ; prémisse appuyée par David 2024). Le paragraphe « Le
   contredire » du dossier est à réécrire : la science donne plutôt raison au livre sur la douleur choisie (faiblement),
   et le nuance sur la manière : trouver du plaisir dans le chemin fait mieux tenir que serrer les dents.

5. **L'étude à l'écran.** La ligne « 21 دراسة، 15907 مشارك » est **trompeuse** : 13 909 de ces 15 907 personnes viennent
   d'une seule étude en ligne dont l'effet n'existe que dans les pays individualistes et ne s'est pas répliqué. Trois
   options :
   - (recommandée) garder **Wang 2021** sans le nombre de participants, ou avec le bon (« 21 دراسة » ; la taille dite
     par le shell, petite) et la réserve du biais de publication sur la page des preuves ;
   - **Armitage 2017** pour le geste « prévois ta réponse » : essai randomisé, Koweït, poids mesuré à 6 mois (d = .38) ;
     c'est le seul appui arabe du dossier, mais une seule étude, et le plan « si… alors » seul ;
   - **Kizilcec 2020** si la carte doit porter la nuance plutôt que le geste.

6. **« À retenir ».** Le geste WOOP fait seul devant un écran est le cas le plus faible des preuves (Wang : document 0.277
   contre 0.465 avec quelqu'un ; Cooke : en ligne −0.04 ; Kizilcec 2020 : nul ; Kędra : en ligne, nul). Il ne peut pas
   être `evidence` : « جرّب » / « ممكن يساعد » seulement.

7. **Applicabilité.** La phrase « معظم الدراسات من أمريكا وأوروبا » reste due : c1, c2 (Alghazo ne porte rien seul) et c4
   (deux transversales saoudiennes) n'ont pas d'échantillon arabe solide. Mais le dossier doit corriger « aucun échantillon
   arabe sur la MCII » : Armitage 2017 (Koweït) et Pakpour 2016 (Iran) existent pour les plans « si… alors ». Et la
   lecture culturelle de Kizilcec 2017 est plus forte que le dossier ne le dit : l'effet manque aussi dans les pays
   « équilibrés », pas seulement collectivistes.

8. **À discuter pour `content/contested.json`** (je ne le modifie pas) : MCII/WOOP en ligne a désormais un échec de
   réplication préenregistrée à grande échelle (Kizilcec 2020) ; la grille exigerait alors une réplication
   multi-laboratoires pour s'appuyer dessus, et il n'y en a pas. Les fantasmes positifs n'ont pas d'échec publié, mais
   aucune réplication indépendante.

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1177/09567976211044685 — Woolley & Fishbach 2022 (c5 proposée : le test direct de l'idée du livre)
2. 10.3390/ijerph22030398 — Kudrna et al. 2025 (c3 : nul contre « seulement rêver »)
3. 10.1007/s11121-017-0807-z — Armitage, Alganem & Norman 2017 (c3a, Koweït ; candidat pour l'écran)
4. 10.1177/09567976251350960 — Woolley, Giurge & Fishbach 2025 (c4 : persistance sur un an, Chine, causal)
5. 10.1080/00049530.2026.2762616 — Hallford et al. 2026 (c1 et c2 : préenregistrée, le résultat motive)
6. 10.1111/dar.13553 — Cooke, McEwan & Norman 2022 (c3 : nul en ligne et chez les étudiants)
7. 10.5114/cipp/225999 — Kędra & Łaguna 2026 (c3 : deux essais en ligne nuls)
8. 10.1080/00223980.2014.987102 — Marszał-Wiśniewska & Jarczewska-Gerc 2016 (c2 : processus > résultat, poids)
9. 10.1186/s13690-021-00524-4 — Styk et al. 2021 (c2 : processus > résultat, persévérance)
10. 10.1038/s41598-021-02036-1 — Prokopowicz & Byrka 2021 (c2 : essai randomisé, tendance)
11. 10.1037/bul0000443 — David et al. 2024 (prémisse de c5 : l'effort coûte, 29 pays)
12. 10.1080/00224545.2022.2163610 — Riddell et al. 2023 (c3 : MCII sans effet sur le but)
13. 10.1080/10463283.2024.2334563 — Sheeran, Listrom & Gollwitzer 2024 (c3a ; allégeance à noter)
14. 10.1111/bjop.70065 — Breitwieser & Reinelt 2026 (c3a : registered report, enfants)
15. 10.1177/10901981241310216 — Wittleder et al. 2025 (c3 : WOOP contre « Sham WOOP »)
16. 10.1007/s12160-015-9767-3 — Pakpour et al. 2016 (c3a, Iran)
17. 10.1186/s12966-026-01915-y — Melum & Martiny-Huenger 2026 (c3a : petit effet, contrôle actif)
18. 10.1371/journal.pone.0206294 — Silva et al. 2018 (c3a : activité physique)
19. 10.14746/ssllt.2018.8.4.2 — Al-Hoorie 2018 et 10.3390/educsci16060892 — Kim 2026 (c1 : la « vision » va avec
    l'effort ; corrélations) ; 10.1017/s0272263123000487 — Al-Hoorie et al. 2023 (la mesure se confond avec la confiance)
20. 10.1038/s41598-026-44548-8 — Alshammari & Alrashidi 2026 et 10.3389/fpsyg.2025.1420286 — Frikha 2025 (c4,
    échantillons saoudiens, transversaux)
21. 10.1177/0146167208322618 — Houser-Marko & Sheldon 2008 et 10.1177/0963721414559774 — Freund & Hennecke 2015 (c2,
    indirects)
22. 10.5539/ibr.v5n4p71 — Alkailani et al. 2012 (scores de Hofstede contestés pour le monde arabe ; page des preuves)
23. Pour mémoire, sans valeur de test pour c3 : 10.1080/08870446.2025.2491593 (Sezer 2025, registered report sans
    contrôle), 10.4300/jgme-d-16-00703.1 (Saddawi-Konefka 2017, 34 internes, déjà dans Wang), 10.1037/hea0000625
    (Conroy & Hagger 2018, imagerie et santé, positif).

Fiches existantes à compléter : `wang-2021-mcii` (87 % de N = Kizilcec 2017 ; ≥ 13/21 articles du labo d'origine ;
Oettingen parmi les relecteurs ; Egger t = 5.46 ; trim-and-fill 0.242), `kizilcec-2017-culture` (« équilibrés » aussi
sans effet ; MC et II seuls sans effet ; effets absolus 1,8 et 3,9 points), `kizilcec-2020-scale` (n = 12 879 ; IC qui
exclut l'effet d'origine), `cole-2021-simulation` (test global des sous-types p = .16 ; comparateur = contrôle),
`alghazo-2020-simulation` (résumé non nul sur les devoirs ; cité 2 fois), `cerasoli-2014-intrinsic` (qualité, pas
quantité).
