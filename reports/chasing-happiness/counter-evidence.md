# Contre-preuve : « la loi à rebours » (Manson, *The Subtle Art*, ch. 1), verdict ⚖️ basse

Agent contre-preuve, 2026-11-22. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé
(`dossiers/chasing-happiness.json` et `.md` du brouillon, fiches de `content/sources/` qu'il cite). Je ne valide rien.
Lu : `docs/verdict.md` (grille). Aucun autre fichier du dépôt n'a été modifié.

Sources : Crossref (`query.bibliographic` ; `filter=updates:<doi>` ; `works/<doi>`), Europe PMC (`search`,
`resultType=core`), OpenAlex (`works?filter=cites:…,title_and_abstract.search:…` ; `works/doi:…`). Textes intégraux
ouverts : manuscrit d'auteur de Mauss 2011 (PMC3160511, via E-utilities de NCBI), prépublication de Huang 2024 (OSF,
fichier `Valuing_happiness_and_well-being_final.pdf`), Ford 2015 (PMC4658246), Krys 2024 (PMC12408936, recherche de
pays seulement). Deux résumés absents des trois bases lus à la source : Pavani 2025 (notice HAL hal-05462372),
Ludwigs 2017 (dépôt de l'université Erasmus). User-Agent générique `book-vs-science-counter/0.1`, aucun nom ni e-mail.
Réponses brutes : dans le scratchpad de la session (`ch-raw/`), pas dans le dépôt.

Chaque DOI cité ici a été retrouvé et vérifié par moi sur Crossref (`works/<doi>` : titre, premier auteur, année) ;
écart d'année signalé quand Crossref donne la parution en ligne et Europe PMC le numéro. Rien n'est pris de mémoire.

Limites de ma recherche : résumés surtout ; quatre résumés introuvables (Wong 2019, Liang 2026, Ford 2025 dans *Nature
Reviews Psychology*, Ludwigs 2017 en partie) ; les chiffres tirés de manuscrits ou de prépublications peuvent différer
des versions publiées.

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 11 DOI du verdict (a0022010, jscp.2014.33.10.890, s10902-019-00193-9, pb.1036, 09567976241263784, xge0000108, j.jrp.2015.11.003, s13423-018-1436-7, 17439760.2012.747000, emo0001381, 0956797618761660) | 1 avis : correction 10.1037/a0024986 sur Mauss 2011 ; 0 pour les 10 autres |
| Crossref | `works/10.1037/a0024986` | titre de l'avis : « "Can seeking happiness make people unhappy? Paradoxical effects of valuing happiness": Correction to Mauss, Tamir, Anderson, and Savino (2011) » ; *Emotion* 11(4), p. 767, août 2011 ; pas de résumé |
| Crossref | `works/10.1037/a0022010` | l'article : *Emotion* 11(4), p. 807-815, août 2011 (même numéro que l'avis) |
| doi.org, psycnet | texte de l'avis | 403 (APA) |
| OpenAlex | `works/doi:10.1037/a0024986` | type `erratum`, sans résumé |
| PubMed | efetch 21517168 ; esearch « Mauss[au] AND Savino[au] AND 2011[dp] », « "Correction to Mauss" » | titre « Can seeking happiness make people unhappy? [corrected] … » ; « Erratum in: Emotion. 2011 Aug;11(4):767 » ; aucun enregistrement séparé de l'avis (contrairement à ceux de Catalino 2014, voir plus bas) |
| Europe PMC | `DOI:"10.1037/a0024986"` ; « "Correction to Mauss, Tamir" » | 0 |
| PMC | manuscrit d'auteur PMC3160511 | titre « Can Seeking Happiness Make People **Happy**? Paradoxical Effects of Valuing Happiness » |
| Crossref | `filter=updates:` sur chacune des contre-preuves citées ci-dessous | 0 avis, sauf Catalino 2014 (10.1037/a0038029 : 2 corrections) et Joshanloo 2013, revue (10.1007/s10902-013-9489-9 : 1 correction) ; aucune des deux n'est retenue comme carte |

**Ce que change la correction de Mauss 2011.** Je n'ai pas pu lire l'avis. Trois indices concordent : le manuscrit
d'auteur dit « make people happy? », PubMed corrige en « unhappy? [corrected] », et l'avis cite le titre avec
« unhappy ». L'avis est imprimé dans le même numéro que l'article (p. 767 contre p. 807-815), ce qui va avec une
erreur de la version parue en ligne d'abord. La lecture du brouillon (le titre) est **plausible mais indirecte** ;
rien ne permet de dire que les résultats sont touchés, rien ne permet de l'exclure. Les chiffres que je cite de l'étude 2
viennent du manuscrit d'auteur, pas de la version imprimée.

### Requêtes de recherche (30)

| # | Base | Requête exacte | Regardés (sur) |
|---|---|---|---|
| Q1 | Crossref | `meta-analysis valuing happiness pursuit of happiness well-being` | 20 |
| Q2 | Crossref | `replication paradoxical effects of valuing happiness preregistered` | 20 |
| Q3 | Crossref | `Ironic processes in the mental control of mood and mood-related thought` (par titre) | 5 |
| Q4 | Crossref | `pursuit and assessment of happiness can be self-defeating` (par titre) | 5 |
| Q5 | Crossref | `ironic effects trying to be happy mood control cognitive load paradoxical` | 15 |
| Q6 | Crossref | `systematic review strength of evidence most commonly recommended happiness strategies` | 5 |
| Q7 | Crossref | `valuing happiness culture interdependence well-being cross-cultural` | 20 |
| Q8 | Crossref | `Becoming happier takes both a will and a proper way experimental longitudinal intervention boost well-being` (par titre) | 5 |
| Q9 | Crossref | `Meta-analyses of positive psychology interventions the effects are much smaller than previously reported` (par titre) | 5 |
| Q10 | Crossref | `Effectiveness of positive psychology interventions systematic review and meta-analysis` | 8 |
| Q11 | Crossref | `aversion to happiness across cultures review` | 5 |
| Q12 | Crossref | `cross-cultural validation fear of happiness scale across 14 national groups` | 5 |
| Q13 | Crossref | `valuing happiness Arab Egypt Muslim well-being depression` | 15 |
| Q14 | Crossref | `character strengths intervention happiness depression Saudi Arabia replication Seligman 2005` | 5 |
| Q15 | Crossref | `Prioritizing positivity: an effective approach to pursuing happiness` (par titre) | 3 |
| Q16 | Crossref | `experimentally induced to value happiness reacted less positively happy film` | 10 |
| E1 | Europe PMC | `("valuing happiness" OR "value happiness" OR "pursuit of happiness" OR "pursuing happiness" OR "happiness seeking" OR "seeking happiness") AND ("meta-analysis" OR "meta-analytic" OR "systematic review" OR "multi-lab" OR "many labs" OR "registered report")` | 25 (159) |
| E2 | Europe PMC | `("valuing happiness" OR "happiness values" OR "motivation to pursue happiness") AND (replication OR replicate OR "failed to replicate" OR "did not replicate" OR preregistered OR "pre-registered")` | 23 (23) |
| E3 | Europe PMC | `("ironic process" OR "ironic processes" OR "ironic effect" OR "ironic effects") AND (mood OR happiness OR happy OR "positive affect") AND (replication OR "meta-analysis" OR "cognitive load")` | 25 (51) |
| E4 | Europe PMC | `("valuing happiness" OR "pursuit of happiness" OR "pursuing happiness" OR "happiness goal" OR "fear of happiness" OR "aversion to happiness" OR "ideal affect" OR "prioritizing positivity" OR "happiness beliefs" OR "lay beliefs about happiness" OR "interdependent happiness") AND (Egypt OR Egyptian OR Arab OR Arabic OR Saudi OR Emirati OR Kuwait OR Qatar OR Jordan OR Lebanon OR Tunisia OR Morocco OR Algeria OR Muslim OR Islam OR Iran OR Turkey)` | 40 (391) |
| E5 | Europe PMC | `("positive psychology intervention" OR "positive psychology interventions" OR "happiness intervention" OR "gratitude intervention" OR "well-being intervention") AND (Egypt OR Egyptian OR Arab OR Saudi OR Emirati OR Jordan OR Lebanon OR Kuwait OR Qatar OR Oman OR Tunisia OR Morocco OR Algeria) AND (randomized OR randomised OR controlled OR experiment OR "meta-analysis")` | 25 (173) |
| E6 | Europe PMC | `("pursuit of happiness" OR "pursuing happiness" OR "seeking happiness" OR "happiness seeking" OR "valuing happiness" OR "trying to be happy" OR "try to be happy" OR "trying to feel happy" OR "happiness goal" OR "happiness goals") AND ("randomly assigned" OR randomized OR experiment OR experimental OR manipulation OR manipulated) AND PUB_YEAR:[2012 TO 2026]` | 40 (377) |
| O1 | OpenAlex | citant Mauss 2011 (W2108766910) + `title_and_abstract.search:replication\|replicate\|preregistered\|pre-registered\|registered report\|failed to replicate` | 22 (22) |
| O2 | OpenAlex | citant Mauss 2011 + `experiment\|experimentally\|induced\|induction\|manipulated\|randomly assigned` | 60 (76) |
| O3 | OpenAlex | citant Wegner 1993 (W2012854502) + `replication\|replicate\|failed to replicate\|preregistered\|meta-analysis` | 20 (20) |
| O4 | OpenAlex | `"valuing happiness"\|"value happiness"\|"pursuit of happiness"\|"pursuing happiness"\|"happiness seeking"\|"motivation to pursue happiness"` + `meta-analysis\|meta-analytic\|systematic review\|scoping review` | 40 (60) |
| O5 | OpenAlex | citant Mauss 2011, parus depuis le 2024-06-01 | 93 (93) |
| O6 | OpenAlex | titre `replication\|replicating\|replicate\|registered report` + titre `happiness\|happy` | 50 (73) |
| O7 | OpenAlex | `"induced to value happiness"\|"valuing happiness manipulation"\|"manipulation of valuing happiness"\|"value happiness" experiment\|"emphasizing the importance of happiness"` | 7 (7) |
| O8 | OpenAlex | citant Huang 2024 (W4401729363) | 16 (16) |

Obligatoires : « meta-analysis » (Q1, Q9, Q10, E1, E3, E5, O3, O4), « replication » (Q2, Q14, E2, E3, O1, O3, O6, O7),
« culture » / « moderator » (Q7, Q11, Q12, Q13, E4).

---

## (b) Contre-preuves retenues

« Force » = poids de l'argument contre le verdict ou contre une de ses phrases, selon la grille (rang du plan, taille,
indépendance). Je donne les deux sens : ce qui affaiblit le livre et que le brouillon n'a pas, et ce qui le soutient et
que le brouillon a écarté.

### Contre c2 (se mettre à chercher le bonheur rend moins heureux) : ce que le brouillon n'a pas

**1. Wegner, Erber & Zanakos 1993** — 10.1037/0022-3514.65.6.1093 — *Journal of Personality and Social Psychology*
(Crossref connaît aussi le doublon ancien 10.1037//0022-3514.65.6.1093)
- Plan : expériences ; consigne de rendre son humeur positive ou négative, avec ou sans charge mentale (retenir un
  nombre de 9 chiffres).
- Résumé : « Ss attempting mood control without an imposed cognitive load were successful, whereas those who attempted
  control while rehearsing a 9-digit number not only failed to control their moods but also showed self-reported mood
  change opposite the mood they intended to create. »
- Joue : **c'est le test le plus direct de la « loi à rebours »** (question (e)), et il la limite : essayer de se rendre
  plus joyeux **marche** sans charge mentale ; l'effet inverse n'apparaît que sous charge. Contredit c2 dans sa forme
  générale, la soutient sous condition.
- Force : moyenne. Expérience (même rang que Mauss 2011), petits échantillons de 1993 ; aucune réplication trouvée parmi
  ses citations qui parlent de réplication ou de méta-analyse (O3) ; la méta-analyse de Wang 2020 (pilote) porte sur
  les pensées, pas sur l'humeur.

**2. Lyubomirsky, Dickerhoof, Boehm & Sheldon 2011** — 10.1037/a0022575 — *Emotion*
- Plan : expérience de 8 mois (activité assignée au hasard : optimisme, gratitude ou contrôle) ; on compare ceux qui se
  sont inscrits en sachant que l'étude visait à les rendre plus heureux et les autres (cette partie n'est pas tirée au
  sort).
- Résumé : « Our results indicate that initial self-selection makes a difference, but only in the two positive activity
  conditions, not the control, and that continued effort also makes a difference, but, again, only in the treatment
  conditions. »
- Joue : **contre c2** : vouloir devenir plus heureux, avec une activité, va avec plus de gain, pas moins. Le titre
  même : « takes both a will and a proper way ».
- Force : moyenne-faible. Étudiants ; effets petits (« our rs spanned the low to mid .10s », texte, PMC4380267) ;
  l'auto-sélection n'est pas randomisée ; allégeance (Lyubomirsky et Sheldon conçoivent ces activités, comme dans
  Ferguson 2012).

**3. White, Uttl & Holder 2019** — 10.1371/journal.pone.0216588 — *PLOS ONE*
- Plan : réanalyse des deux méta-analyses classiques des interventions de psychologie positive.
- Résumé : « when small sample size bias was taken into account, the effect of PPIs on well-being were small but
  significant (approximately r = .10), whereas the effect of PPIs on depression were variable, dependent on outliers,
  and generally not statistically significant. »
- Joue : **contre c2, de façon indirecte** : des gens qui entreprennent de se rendre plus heureux y gagnent un peu, en
  moyenne. Indirect : on y manipule une activité, pas l'envie elle-même.
- Force : moyenne (rang méta-analyse, mais indirect, et l'effet est petit).

**4. Carr et al. 2020** — 10.1080/17439760.2020.1818807 — *The Journal of Positive Psychology* (résumé lu sur OpenAlex)
- Plan : méta-analyse, 347 études, plus de 72 000 participants, 41 pays.
- Résumé : « At post-test, PPIs had a significant small to medium effect on wellbeing (g = 0.39) » et « Individuals in
  non-western countries with clinical problems, who engaged in longer individual or group therapy programs containing
  multiple PPIs benefited most. »
- Joue : contre c2, indirect, et nuance l'applicabilité (hors Occident, pas moins de gain).
- Force : faible-moyenne : White 2019 montre que ces méta-analyses surestiment sans correction des petits échantillons ;
  Folk & Dunn 2023 (10.1038/s41562-023-01651-4) : « Our review suggests that a strong scientific foundation is lacking
  for some of the most commonly recommended happiness strategies » (commenté par Puterman 2024, 10.1038/s41562-024-01954-0,
  réponse 10.1038/s41562-024-01955-z).

**5. Lambert, Warren, Schwam & Warren 2021** — 10.1007/s12144-021-02080-0 — *Current Psychology* (Crossref 2021,
Europe PMC 2023)
- Plan : essai contrôlé, 6 semaines. Population : 120 étudiants émiriens (Émirats arabes unis).
- Résumé : « The 6-week PPI program was conducted in the United Arab Emirates on Emirati university students (n = 120)
  who reported more positive emotion and overall balance of feelings that favored positivity over time relative to a
  control group. Yet, there was no effect found on negative emotions, life satisfaction, perceived stress, fear of
  happiness, locus of control, or somatic symptoms, and no effect on levels of collectivism or individualism. »
- Joue : **le seul essai arabe trouvé où des gens cherchent délibérément à aller mieux** : un peu plus d'émotions
  positives, aucun retour de bâton. Contre c2, indirect.
- Force : faible (petit, un seul site, résultats nuls sur la satisfaction).

**6. Basurrah, Di Blasi, Lambert, Murphy et al. 2022** — 10.1111/aphw.12391 — *Applied Psychology: Health and
Well-Being* (Crossref 2022, Europe PMC 2023)
- Plan : revue systématique, 44 études dans 10 pays arabes (n = 3 598), 12 essais randomisés, 32 quasi-expériences.
- Résumé : « PPIs appear to be effective for promoting well-being and reducing mental health issues. However, there were
  some risks of bias concerns. »
- Joue : applicabilité au public arabe des efforts délibérés pour aller mieux ; indirect pour c2. Liste des pays non
  lue (je ne sais pas si l'Égypte en est).
- Force : faible-moyenne (revue systématique, mais pas de méta-analyse, biais signalés).

**7. Conner & Reid 2011** — 10.1177/1948550611419677 — *Social Psychological and Personality Science*
- Plan : expérience de 2 semaines, 162 jeunes adultes, noter son bonheur 1, 3 ou 6 fois par jour (assigné).
- Résumé : « Examination of temporal changes in momentary happiness over time showed no group differences, suggesting
  little evidence for reactivity overall. » et « Individuals higher in depressive symptoms or neuroticism showed
  decreased momentary happiness over time with more frequent reporting, whereas individuals lower in depressive
  symptoms or neuroticism showed the opposite pattern with increased momentary happiness over time with more frequent
  reporting. »
- Joue : **nuance c2 et (e)** : surveiller son bonheur ne le baisse pas en moyenne ; ça le baisse chez les plus
  déprimés et le monte chez les autres. La « loi à rebours » vaudrait pour certains.
- Force : faible-moyenne (expérience, n correct ; « surveiller » n'est pas « vouloir »).

**8. Pavani, Larmanou, Holtzer & Colombo 2025** — 10.1007/s10902-025-00878-4 — *Journal of Happiness Studies*
(résumé absent de Crossref, Europe PMC et OpenAlex ; lu sur la notice HAL hal-05462372)
- Plan : journal quotidien d'un mois. Population : 100 participants français.
- Résumé : « First, as expected, at the between-individual level, individuals with higher happiness goals were more
  likely to experience intense happiness, partly because they engaged more in savoring. Second, as expected, at the
  within-individual level, when an individual displayed higher happiness goals for tomorrow than usual, the individual
  was more likely to experience intense happiness during the next day than usual, partly due to stronger engagement in
  savoring. »
- Joue : **contre c1 et c2** : le test naturel le plus proche de « vouloir plus de bonheur demain » donne plus de
  bonheur le lendemain, pas moins. Laboratoire indépendant du réseau Mauss-Ford.
- Force : faible-moyenne (échantillonnage d'expériences, rang bas ; association dans le temps, pas une manipulation ;
  100 personnes). Pour une fiche, le résumé devra être lu par `bvs sources verify` : il ne l'est sur aucune des trois
  bases.

### Pour c2 (le livre) : ce que le brouillon a écarté

**9. Mauss, Savino, Anderson, Weisbuch, Tamir & Laudenslager 2012** — 10.1037/a0025299 — *Emotion*
- Résumé : « Study 2 provides an experimental manipulation of valuing happiness and demonstrates that inducing people to
  value happiness leads to relatively greater loneliness, as measured by self-reports and a hormonal index
  (progesterone). »
- **McGuirk, Kuppens, Kingston & Bastian 2018** — 10.1037/emo0000322 — *Emotion* : « In Study 1, we used an
  experimental design to show that emphasizing the importance of happiness increased rumination in response to
  failure. »
- Joue : **pour le livre**. Le brouillon les écarte comme « autres résultats que le bonheur ». Mais Manson ne dit pas
  « moins heureux » : il dit que l'envie est « elle-même une expérience négative ». La solitude et la rumination en sont.
  En limitant c2 au bonheur ressenti, le brouillon retire au livre deux expériences de même rang qui vont dans son sens.
- Force : moyenne (expériences ; mêmes réseaux d'auteurs, petits échantillons, aucune réplication trouvée).
- Kim 2025 (10.1111/aphw.70000) reste écarté à bon droit (cadre de l'épuisement de la volonté, `content/contested.json`).

### Fragilité de l'appui principal de c2 (Mauss 2011, étude 2, manuscrit PMC3160511)

- 70 femmes, une exclue, 69 réparties en 2 × 2 groupes (environ 17 par case) ; interaction « F(1,65)=5.65, p =.02 » ;
  écart sur le film joyeux « t(33)=2.46, p =.02 » ; effet sur la déception « t(33)=−2.06, p =.05 » ; effet indirect
  « 95% CI (bias corrected)=−.83 to −.02 ». Tout est juste sous le seuil : c'est le profil d'un effet fragile.
- Seule tentative trouvée de reprendre la manipulation : Coles 2015, mémoire de licence (STARS, University of Central
  Florida, sans DOI), 19 participants, électromyographie du visage : « Results indicated that participants manipulated
  to value happiness did not experience significant differences in facial electromyography activation compared to
  controls. » Tâche différente, échantillon minuscule : ni une réplication ni une carte, un signal.

### Contre « c3 contredite » (ce n'est que l'inquiétude qui pèse) : d'autres formes de l'envie coûtent aussi

**10. Sahdra, Shin, Fraser, Levin et al. 2025** — 10.1007/s10902-025-00933-0 — *Journal of Happiness Studies*
- Plan : échantillonnage d'expériences, 167 participants, 2 251 relevés, analyses intra-personne.
- Résumé : « Multilevel vector autoregressive models showed that EA consistently dampened happiness within-person,
  despite no between-person association. In contrast, PP was linked to higher happiness in one group, but in the other,
  it had no direct benefit and indirectly reduced happiness via its connection to EA. »
- Joue : **affaiblit « c3 contredite »** : l'attachement à l'agrément (EA, s'accrocher aux bons moments), qui n'est pas
  de l'inquiétude, fait baisser le bonheur du moment chez la même personne ; donner la priorité au positif (PP) aide
  certains, pas d'autres. Laboratoire indépendant du réseau Mauss.
- Force : faible-moyenne (rang bas, mais intra-personne et indépendant).

**11. Huang 2024 lui-même** (prépublication OSF, 10.31219/osf.io/3vksb, Table 2) — la carte à l'écran
- « Valuing happiness → Negative affect .023 [.003, .043] p = .022 » : y tenir plus une année va avec un peu plus
  d'émotions négatives l'année suivante (et un peu plus d'émotions positives : β = .039). Le résumé publié le dit :
  « had mixed emotional consequences (i.e., increasing both positive and negative affect) ».
- Huang écrit que sa mesure n'a **pas** de composante d'inquiétude (« this component was not included in the current
  measure »). Donc une envie sans inquiétude a, dans ses données, un petit coût émotionnel. Le brouillon range Huang
  dans « contredit c3 » ; ce résultat-là va dans l'autre sens.
- Force : faible (effet minuscule, analyse exploratoire : seule la satisfaction était préenregistrée).

**12. Autres, plus faibles** : Kim & Maglio 2018 (déjà au dossier pour c2 : la poursuite induite réduit le temps
ressenti, puis le bonheur, sans inquiétude) ; Mauss 2012 (solitude, carte 9) ; Valdivia-Salas, Lombas et al. 2022 —
10.3389/fpsyg.2022.949615 — *Frontiers in Psychology*, 168 Espagnoles, transversal : « Valuing happiness only showed
positive total effects on negative affect and strong direct effects on both cognitive fusion and experiential
avoidance. »

**13. Mauss & Ford 2026** — 10.1016/j.tics.2026.03.001 — *Trends in Cognitive Sciences* (revue narrative)
- Résumé : « This review aims to resolve when and why pursuing happiness is successful or self-defeating by showing that
  its consequences depend on how people pursue happiness. » … « we consider five aspects of pursuing happiness: the
  happiness goals people have, affect regulation, monitoring of one's happiness, responses to one's happiness, and the
  broader context. » … « While there are pitfalls, attaining greater happiness is possible. »
- Joue : Mauss et Ford, coauteurs de Zerwas 2024, ne réduisent pas eux-mêmes le problème à l'inquiétude : cinq aspects, dont les buts
  et la surveillance. Appui à ⚖️, contre une nuance trop nette sur c3.
- Force : faible (revue narrative, même laboratoire), mais c'est le dernier mot de ce laboratoire.

À noter sur Zerwas 2024 (appui principal de « c3 contredite ») : même réseau que Mauss 2011, Ford 2014 et Ford 2015 ;
données « collected between 2009 and 2020 » : des échantillons pourraient être ceux d'articles antérieurs du même
laboratoire (non vérifié, texte intégral non lu) ; et « aspiring » y est sans lien avec un moindre bien-être, pas lié à
un meilleur.

### Contre c1 (valoriser le bonheur ↔ moins heureux) : ce que le brouillon n'a pas

**14. Catalino, Tov & Hoorn 2026** — 10.1080/17439760.2026.2651079 — *The Journal of Positive Psychology* (résumé lu sur
OpenAlex)
- Plan : cinq études préenregistrées (n = 388, 214, 301, 290, 453).
- Résumé : « we found that prioritizing positivity was associated with more well-being (positive emotions,
  satisfaction, meaning), less ill-being (negative emotions, depressive symptoms, anxiety), and more hypomania, a mixed
  construct. »
- Joue : contre c1 et c3 (organiser ses jours autour des bons moments, une forme de poursuite, va avec plus de
  bien-être) ; réplique préenregistrée de ce que Hansenne 2021 trouve. « More hypomania » est un coût possible.
- Force : faible-moyenne (transversal, préenregistré, cinq échantillons ; laboratoire de Fredrickson, allégeance
  au concept). Si le rédacteur ajoute l'étude d'origine (Catalino 2014, 10.1037/a0038029) : elle a **deux corrections**
  (2015 : un signe en trop devant .51 dans la table 2 ; 2016 : la transformation des items), lues dans PubMed.

**15. Takai, Hasegawa, Shigematsu et al. 2023** — 10.1007/s12144-022-04131-6 — *Current Psychology* (**pour le livre,
contre le modérateur culturel**)
- Plan : transversal (n = 350) et longitudinal de 4 semaines (n = 329). Population : étudiants japonais.
- Résumé : « Consistent with our hypothesis, valuing happiness was concurrently and longitudinally associated with
  increased rumination after controlling for depressive symptoms. » et « Furthermore, Study 1, but not Study 2,
  indicated that the association between valuing happiness and rumination was stronger among students with highly
  interdependent self-construal than those with less interdependent self-construal. »
- Joue : **affaiblit la lecture culturelle du brouillon** : en Asie de l'Est, valoriser le bonheur va quand même avec
  plus de rumination, et l'interdépendance a renforcé le lien une fois, au lieu de l'adoucir. Ford 2015 ne peut pas
  devenir « dans les cultures collectivistes, c'est l'inverse ».
- Force : faible-moyenne (longitudinal court ; la rumination n'est pas le bonheur).

**16. Zhang et al. 2024** — 10.1007/s12144-024-07007-z — *Current Psychology*
- Plan : enquêtes en ligne, Chine continentale (721, puis 308) et Royaume-Uni, États-Unis, Canada (349, puis 185).
- Résumé : « Indeed, in study 1, a socially engaged definition of happiness mediated the relationship between valuing
  happiness and well-being in a Chinese sample. » et « We found the association holds in times of emotional stress and
  social restrictions in both samples ».
- Joue : contre c1 hors Occident, et nuance : ce qui compte est la façon (sociale, faisable). Le sens du lien dans
  l'échantillon occidental n'est pas net dans le résumé.
- Force : faible (transversal).

Ford 2015, l'appui culturel du brouillon (texte PMC4658246) : étudiants seulement, 307 Américains, **91 Allemands**,
184 Russes, 204 Japonais et Taïwanais ; transversal ; les auteurs écrivent eux-mêmes : « these studies were all
conducted in the U.S and until additional research is conducted in collectivistic cultures, the alternative direction
of effects cannot be ruled out in those cultures. »

### Le public égyptien (applicabilité)

**17. Lou et al. 2025** — 10.1007/s11482-025-10462-w — *Applied Research in Quality of Life*
- Plan : 11 170 participants, 43 pays, indicateurs de société (forêts aléatoires).
- Résumé : « We found robust and consistent evidence that greater cultural religiosity was associated with reduced
  idealization of happiness across four different types of happiness, including life satisfaction and interdependent
  happiness. »
- **Krys et al. 2024** — 10.1177/17456916231208367 — *Perspectives on Psychological Science* (Crossref 2024, Europe
  PMC 2025), 61 pays : « We conclude that societies whose members seek to maximize happiness tend to be characterized as
  WEIRD ». Aucun pays arabe nommé dans le texte (recherche « Egypt », « Arab », « Saudi », « Morocco »… : 0) ; liste
  complète non lue.
- Joue : **affaiblit l'applicabilité de la prémisse même** : dans une société religieuse et non occidentale comme
  l'Égypte, vouloir toujours plus de bonheur serait moins courant. L'épisode ne peut pas supposer que le spectateur égyptien
  « veut toujours plus ».
- Force : faible-moyenne (indirect, niveau des pays ; présence de l'Égypte non vérifiée).

Pour le reste : cartes 5 et 6 (Émirats, pays arabes : chercher à aller mieux y marche un peu) ; l'échelle de peur du
bonheur existe en arabe (validation au Liban, 2026, trouvée par E4, non retenue) : pour une partie du public, le problème
serait plutôt la crainte d'être heureux.

---

## (c) Cherché et pas trouvé (notFound)

- **Aucune méta-analyse ni revue systématique** du lien entre valoriser ou chercher le bonheur et le bien-être (Q1,
  E1, O4) : le brouillon a raison. Les revues trouvées sont narratives (Mauss 2026) ou sans résumé (Ford 2025,
  10.1038/s44159-025-00476-4, *Nature Reviews Psychology* : rien sur Crossref, Europe PMC, OpenAlex ni Semantic Scholar).
- **Aucune réplication directe, préenregistrée ou multi-laboratoires de Mauss 2011 étude 2** (Q2, Q16, E2, O1, O2, O6,
  O7) ; seul un mémoire de licence de 19 personnes, tâche différente, nul (Coles 2015, sans DOI).
- Aucune réplication de Wegner 1993 sur l'humeur (O3).
- **Aucun échantillon égyptien, ni arabe, ni du Moyen-Orient ou d'Afrique du Nord**, sur valoriser ou chercher le
  bonheur (Q13, E4) ; seulement des interventions dans des pays arabes (cartes 5 et 6) et des échelles de peur du
  bonheur.
- Aucun avis Crossref sur les 10 autres DOI du verdict ni sur les contre-preuves citées ; le texte de la correction de
  Mauss 2011 reste illisible (APA 403, aucun enregistrement PubMed de l'avis).
- Aucun commentaire ni réponse publiés sur Huang 2024 (16 citations, O8). Version de revue non lue (SAGE, payant) : les
  chiffres de la prépublication ne sont pas vérifiés contre elle.
- Résumé introuvable, non retenus : Wong, Gong & Fung 2019 (10.1007/s10902-018-00068-5, « Does Valuing Happiness
  Enhance Subjective Well-Being? The Age-Differential Effect of Interdependence ») ; Liang & Wan 2026
  (10.1007/s10902-026-01100-9, « Interdependent Self-Construal Longitudinally Moderates the Relationship Between Valuing
  Happiness, but Not Fragility of Happiness, and Subjective Happiness ») : deux titres qui parlent de modération par
  l'interdépendance, à lire en texte intégral si le rédacteur garde la piste culturelle.
- Ludwigs et al. 2017 (10.1007/s11482-017-9575-y, « How Does More Attention to Subjective Well-Being Affect Subjective
  Well-Being? », deux études, 129 et 120 personnes) : le résumé (dépôt Erasmus) se termine par « Both studies show
  higher SWB scores at later measurements compared to the first ones », sans dire si le groupe qui suivait son bonheur
  de près diffère du contrôle : ambigu, non retenu.
- Schooler et al. 2003 (10.1093/oso/9780199251063.003.0003) : chapitre, le résumé n'a aucun résultat
  (comme l'a vu le brouillon).

---

## (d) Conclusion

**Le badge ⚖️ et la certitude basse tiennent.** Rien ne pousse vers ✅ ni vers ❌ ; aucune affirmation n'atteint
« modérée », donc aucun hook ne peut affirmer, et la phrase d'applicabilité reste obligatoire. Mais trois phrases du
brouillon sont mal calibrées, une dans chaque sens, et la carte à l'écran a trois défauts.

1. **c1 (mêlée, basse) : d'accord, à compléter dans les deux sens.** Contre le livre : Pavani 2025 (France,
   indépendant, intra-personne), Catalino 2026 (cinq études préenregistrées). Pour le livre : Takai 2023 (Japon) et
   Valdivia-Salas 2022 (Espagne). Surtout, **ne pas présenter la culture comme un interrupteur** : Ford 2015 repose sur
   des étudiants (91 Allemands), et Takai 2023 trouve le lien du côté du livre en Asie de l'Est, plus fort une fois chez
   les plus interdépendants. La phrase « le sens du lien change même d'une culture à l'autre » est juste ; « en Asie
   c'est l'inverse » ne le serait pas.
2. **c2 (mêlée, basse) : direction juste, dossier déséquilibré des deux côtés.**
   - Il manque ce qui la contredit : Wegner 1993 (essayer d'être plus joyeux marche sans charge mentale ; l'inverse
     seulement sous charge), Lyubomirsky 2011, les méta-analyses d'interventions (White 2019 : r ≈ .10 corrigé ; indirect),
     Conner 2011 (surveiller son bonheur : aucun effet moyen), Pavani 2025.
   - Il manque ce qui la soutient : Mauss 2012 (solitude) et McGuirk 2018 (rumination après un échec), deux
     expériences écartées comme « autres résultats ». Le livre parle d'**expérience négative**, pas seulement de moins
     de bonheur. Ou bien c2 s'élargit à « moins heureux, plus seul, plus ruminant » et les inclut (la direction reste
     mêlée), ou bien `verdict` écrit que c2 se limite au bonheur ressenti et les nomme hors du champ. Pas en silence.
   - L'appui principal est fragile (environ 17 personnes par case, p = .02 à .05, aucune réplication) : la certitude
     « basse » est un plafond, pas une marge.
   - Ce que les preuves disent vraiment : **ça dépend des conditions** (charge mentale, contexte, façon de chercher),
     c'est-à-dire un ⚖️ honnête, pas une « loi ».
3. **c3 (contredite, basse) : trop fort, je recommande « mêlée ».** L'aspiration calme ne baisse pas la satisfaction
   (Zerwas 2024, Huang 2024, Catalino 2026) ; mais d'autres formes de l'envie que l'inquiétude ont un coût :
   s'accrocher aux bons moments (Sahdra 2025, indépendant), l'importance du bonheur induite (Mauss 2012, McGuirk 2018),
   la poursuite induite (Kim 2018), et même la mesure sans inquiétude de Huang (un peu plus d'émotions négatives un an
   après). L'appui de « contredite » (Zerwas) vient du laboratoire qui, en 2026, décrit cinq aspects et non un seul.
   - Conséquence pour **la nuance dite** : « ce n'est pas l'envie d'être heureux qui pèse, c'est l'inquiétude à son
     sujet » est plus net que les preuves. Plus juste : **ce n'est pas l'envie elle-même, c'est la façon de la
     poursuivre** (s'inquiéter de son bonheur, s'y accrocher, le chercher seul), avec Zerwas 2024, Sahdra 2025 et
     Rohrer 2018 comme preuves.
   - La certitude du verdict ne change pas (toutes basses) ; le badge reste ⚖️.
4. **Huang 2024 à l'écran : défendable (la plus grande, indépendante, plan d'analyse préenregistré), mais la ligne de
   carte est à corriger.**
   - **r = .24 n'est pas la corrélation simple** : c'est la corrélation entre interceptes aléatoires du modèle (la part
     stable entre personnes, Table 2 de la prépublication). La corrélation simple de 2019 est r = .15. Les deux sont
     « petites » ; aucune n'est vérifiée contre la version de revue. Je recommande une carte sans chiffre (« ارتباط
     صغير ») ou, si le chiffre reste, de dire ce qu'il mesure.
   - **La carte n'a gardé que le côté favorable** : y tenir plus ne change pas la satisfaction un an après, mais monte
     un peu les émotions positives *et* négatives (β = .039 et .023). Le résumé publié dit « mixed emotional
     consequences » ; la carte doit au moins ne pas laisser croire qu'il n'y a aucun coût.
   - **La mesure frôle le plafond** : un item, « le bonheur comme valeur qui me guide », moyenne 6,1 sur 7 (écart-type
     1,0, Table 1) : presque tout le monde y tient beaucoup ; elle sépare mal « vouloir toujours plus ». Huang teste une
     idée plus douce que celle de Manson ; c'est une limite à écrire sur la page des preuves.
   - Détails : seule l'analyse de la satisfaction était préenregistrée (émotions positives et négatives :
     exploratoires) ; 8 331 personnes sur cinq vagues, environ 5 000 à 5 900 par an : « suivis de 2019 à 2023 » ne doit
     pas devenir « chacun suivi 5 ans ».
   - Autre choix possible : Zerwas 2024 porte exactement la nuance dite, mais vient du laboratoire Mauss ; je garderais
     Huang pour l'indépendance, ligne corrigée.
5. **La « loi à rebours » de Watts (e)** : le test le plus proche (Wegner 1993) dit qu'essayer de se sentir mieux
   marche, sauf sous charge mentale, où l'humeur va à l'inverse (Wegner 1997 : se forcer à se détendre sous stress
   augmente l'activation). Ce n'est pas une loi, c'est une condition ; et ce n'est pas répliqué. Bonne matière pour la
   page des preuves, pas pour un hook.
6. **« À retenir »** : aucune preuve causale ne porte sur une action précise avec un effet net (Rohrer 2018 est
   observationnel ; Folk & Dunn 2023 : base solide absente pour plusieurs stratégies courantes, dont la sociabilité ;
   les interventions donnent r ≈ .10). Donc « جرّب » / « ممكن يساعد », jamais `evidence`. Attention à tout conseil du
   type « surveille ton bonheur » : Conner 2011 le trouve nuisible chez les plus déprimés. Ford 2014 porte sur la
   dépression : la phrase d'orientation (règle 5) s'applique.
7. **Correction de Mauss 2011** : garder `acknowledged`, avec la mention que le texte de l'avis n'est pas lu et que la
   lecture « titre » repose sur trois indices concordants (manuscrit « happy? », PubMed « unhappy? [corrected] », titre
   de l'avis ; avis dans le même numéro que l'article). Ne citer aucun chiffre de l'étude 2 comme imprimé : ils viennent
   du manuscrit.
8. **Verbes** : c1 et c3 ne reposent que sur des associations, dans les deux sens (Ford 2014 : la dépression peut faire
   valoriser le bonheur) : « ارتباط » seulement, aucun « بيخلّي ».

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1037/0022-3514.65.6.1093 — Wegner, Erber & Zanakos 1993 (c2 et (e) : la loi à rebours sous condition)
2. 10.1007/s10902-025-00933-0 — Sahdra et al. 2025 (c3 : l'attachement, pas l'inquiétude)
3. 10.1037/a0025299 — Mauss et al. 2012 (**pour** le livre, c2 : solitude ; à inclure ou à nommer hors champ)
4. 10.1037/emo0000322 — McGuirk et al. 2018 (**pour** le livre, c2 : rumination ; idem)
5. 10.1007/s10902-025-00878-4 — Pavani et al. 2025 (c1, c2 ; résumé seulement sur HAL)
6. 10.1037/a0022575 — Lyubomirsky et al. 2011 (c2)
7. 10.1007/s12144-022-04131-6 — Takai et al. 2023 (**pour** le livre en Asie de l'Est ; contre le modérateur culturel)
8. 10.1080/17439760.2026.2651079 — Catalino, Tov & Hoorn 2026 (c1, c3 ; préenregistré)
9. 10.1016/j.tics.2026.03.001 — Mauss & Ford 2026 (ça dépend de la façon ; revue)
10. 10.1177/1948550611419677 — Conner & Reid 2011 (surveiller son bonheur ; « à retenir »)
11. 10.1371/journal.pone.0216588 — White, Uttl & Holder 2019 (taille réelle des interventions)
12. 10.1007/s12144-021-02080-0 — Lambert et al. 2021 (seul essai arabe trouvé)
13. 10.1111/aphw.12391 — Basurrah et al. 2022 (interventions dans 10 pays arabes)
14. 10.1007/s11482-025-10462-w — Lou et al. 2025 (religiosité et idéal de bonheur, 43 pays)
15. 10.1177/17456916231208367 — Krys et al. 2024 (maximiser le bonheur : un trait WEIRD)
16. 10.1038/s41562-023-01651-4 — Folk & Dunn 2023 (« à retenir »)
17. 10.1080/17439760.2020.1818807 — Carr et al. 2020 (interventions ; hors Occident)
18. 10.1007/s12144-024-07007-z — Zhang et al. 2024 (Chine et Occident)
19. 10.3389/fpsyg.2022.949615 — Valdivia-Salas et al. 2022 (pour le livre, faible)
20. 10.1016/s0005-7967(96)00078-2 — Wegner, Broome & Blumberg 1997 (se détendre sous stress)
