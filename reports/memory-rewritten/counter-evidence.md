# Contre-preuve : « nos souvenirs se reconstruisent et changent facilement » (Manson, ch. 6), verdict ⚖️ modérée

Agent contre-preuve, 2026-11-23. Une seule tâche : ce qui contredit ou affaiblit le verdict préparé (dossier brouillon
`memory-rewritten`, ⚖️, certitude modérée). Je ne valide rien. Lu : `CLAUDE.md`, `docs/verdict.md` (grille), le
dossier (`.json` et `.md` du scratchpad du coordinateur), les 12 fiches de `content/sources/` qu'il cite,
`content/contested.json`. Je n'ai rien modifié d'autre que ce fichier ; `blind-review.md`, écrit par un autre agent, n'a
pas été ouvert.

Sources : Crossref (`query.bibliographic` ; `query.author` ; `filter=updates:<doi>` ; `works/<doi>`), Europe PMC
(`search`, `resultType=core`, liens `commentCorrectionList`), OpenAlex (`works?search=`, `works/doi:`, résumés et
affiliations). User-Agent générique `book-vs-science-counter/0.1`, aucun nom ni e-mail. Crossref a répondu 429 à quelques
requêtes (attente, puis reprise réussie). Réponses brutes : dans le scratchpad de la session (`ce-memory/raw/`), pas dans le dépôt.

**Texte intégral lu** : Ito et al. 2019 (l'étude à l'écran), manuscrit accepté en libre accès (dépôt WRAP de
l'université de Warwick, lien donné par OpenAlex). **Non lus** : Hassan et al. 2018 (page de l'éditeur protégée contre
les robots), Edelson et al. 2011 (Europe PMC a répondu 500 cinq fois sur le texte intégral). Ailleurs : résumés
seulement.

Tout DOI cité ici a été trouvé par une requête, puis vérifié sur Crossref (`works/<doi>` : titre, premier auteur,
année, type) ; aucun n'est pris de mémoire. Deux sont des prépublications (`posted-content`), signalées à chaque fois.

---

## (a) Protocole

### Avis sur les études du verdict (rétractation, correction, expression of concern)

| Base | Requête | Résultat |
|---|---|---|
| Crossref | `filter=updates:` sur les 12 DOI du verdict (h0101833, xlm0001529, h0101798, acp.4243, 09658211.2016.1260747, j.ijchp.2023.100386, 09658211.2023.2198327, acp.3220, 1529100616686966, 09658211.2025.2546919, law0000001, mac0000014) | 1 avis : la notice de publication en double de Murphy 2023 (10.1080/09658211.2023.2226567), déjà lue et reconnue dans la fiche ; 0 pour les 11 autres |
| Crossref | `works/<doi>` : champs `updated-by` et `relation` des 12 | même résultat (seul Murphy 2023 a un `updated-by`) |
| Crossref | recherche par titre « correction erratum corrigendum + titre » (5 premiers résultats) pour les 12 | 0 avis lié ; 5 faux positifs sans rapport écartés (corrections d'autres articles, dont un erratum groupé de *Memory Studies*, vérifié : il corrige 4 autres articles) |
| Europe PMC | `commentCorrectionList` des 7 qui y sont indexés (Wiechert, Scoboria, Arce, Murphy, Brewin, Wixted & Wells, Fitzgerald) | aucun avis ; Wixted & Wells 2017 a 3 commentaires dans le même numéro de *PSPI* (10.1177/1529100617699240, …699241, …699229), sans résumé : non lus |
| Crossref | `filter=updates:` sur les 57 DOI cités ci-dessous qui ne sont pas des fiches du dossier (dont 3 prépublications et les 3 commentaires de *PSPI*) | 0 avis |

### Requêtes de recherche (2026-11-23)

| # | Base | Requête exacte | Regardés (sur) |
|---|---|---|---|
| Q1 | Crossref | `fifty years of research on the misinformation effect meta-analysis Edmar` | 10 |
| Q2 | Crossref | `query.author=Edmar`, depuis 2024 (une version publiée de la méta-analyse ?) | 30 |
| Q3 | OpenAlex | `misinformation effect meta-analysis` (2015-2026) | 15 (57 376) |
| Q4 | Crossref | `memory conformity co-witness discussion meta-analysis` | 15 |
| Q5 | Europe PMC | `("memory conformity" OR "co-witness" OR "social contagion of memory" OR "collaborative recall") AND ("meta-analysis" OR "meta-analytic")` | 25 (29) |
| Q6 | Crossref ; OpenAlex | `social suggestibility central and peripheral misinformation details` ; `misinformation effect central versus peripheral details susceptibility` | 10 ; 10 (1 613) |
| Q7 | Crossref | titres de McCloskey & Zaragoza 1985 et d'Oeberst & Blank 2012 (critiques de l'« altération » du souvenir) | 5 ; 5 |
| Q8 | Europe PMC | `("misinformation effect" OR "misleading information" OR "post-event information") AND ("real-life" OR naturalistic OR "real event" OR "real-world" OR "field study" OR "ecologically valid") AND (eyewitness OR memory)` | 25 (742) |
| Q9 | Crossref | `Deconstructing rich false memories of committing crime Wade Garry Pezdek` ; `rich false memory implantation coding criteria demand characteristics compliance critique` (depuis 2010) ; `Otgaar blind implantation false memories without interviewer` | 5 ; 15 ; 5 |
| Q10 | Crossref ; Europe PMC | titres de Talarico & Rubin 2003 et de Hirst et al. 2015 ; `("flashbulb memor*") AND (confidence) AND (consistency OR accuracy) AND ("meta-analysis" OR "systematic review" OR longitudinal OR "follow-up")` | 5 + 5 ; 0 |
| Q11 | Europe PMC | `(confidence) AND (accuracy) AND (eyewitness OR "episodic memory" OR "recognition memory" OR "memory reports") AND ("meta-analysis" OR "meta-analytic") AND PUB_YEAR:[2014 TO 2026]` | 25 (2 283) |
| Q12 | Crossref | `high-confidence eyewitness identification errors reply Fitzgerald error rates` (depuis 2025) ; revue *Memory* depuis 2025-06, `high confidence eyewitness identification initial test pristine reply commentary` (le débat de 2025-2026) | 10 ; 15 |
| Q13 | OpenAlex ; OpenAlex ; Crossref | `confidence-accuracy relationship eyewitness meta-analysis` (2012-2026) ; `calibration confidence eyewitness identification meta-analysis high confidence accuracy lineup` (2010-2026) ; titre de Sporer 1995 | 15 (2 648) ; 12 (206) ; 3 |
| Q14 | Crossref ; Europe PMC | `estimator variables can matter even for high-confidence eyewitness identification responses` ; `Rethinking the reliability of eyewitness memory Wixted Mickes Fisher` ; commentaires liés à Wixted et al. 2018 | 5 ; 5 ; 3 |
| Q15 | Crossref ; Europe PMC | titre d'Odinot 2009 ; `("autobiographical memory" OR "everyday memory" OR "diary") AND (confidence) AND (accuracy OR consistency) AND (adults) AND ("high confidence" OR "confidence-accuracy" OR overconfidence)` | 5 ; 25 (343), rien d'utile |
| Q16 | Europe PMC | `("false memory" OR "false memories" OR misinformation OR suggestibility OR "memory conformity" OR "eyewitness" OR "DRM" OR "Deese-Roediger-McDermott") AND (Arab OR Arabic OR Egypt OR Egyptian OR Saudi OR Jordan OR Jordanian OR Lebanon OR Lebanese OR Kuwait OR Qatar OR Emirates OR Oman OR Bahrain OR Iraq OR Syria OR Palestin* OR Morocco OR Algeria OR Tunisia OR Libya OR Sudan) AND (memory)` | 25 (1 839) |
| Q17 | OpenAlex ; OpenAlex ; Crossref ; Crossref ; OpenAlex ; OpenAlex | `false memory Arabic DRM paradigm` ; `eyewitness memory misinformation Saudi Arabia` ; `query.author=Megreya` + `eyewitness memory identification confidence` ; titre d'Edelson 2011 ; `misinformation effect eyewitness Iranian participants` ; `memory conformity Turkey Turkish participants eyewitness suggestibility` | 15 (78) ; 10 (89) ; 10 ; 3 ; 8 (240) ; 8 (25) |
| Q18 | Europe PMC ; Crossref | `("Self-Administered Interview" OR "initial recall" OR "immediate recall" OR "early recall" OR "written statement") AND (misinformation OR "post-event information" OR suggestibility) AND (protect* OR inocula* OR reduc*)` ; `Self-Administered Interview meta-analysis eyewitness` ; titres de Horry 2020 et de Chan 2017 ; `retrieval-enhanced suggestibility meta-analysis Barea Vera` | 25 (153) ; 8 ; 5 + 5 ; 5 |
| Q19 | Crossref | `memory distrust suggestibility acceptance of misinformation` | 12 |
| Q20 | Crossref | titres de French 2008, de Garry et al. (l'original répliqué par Ito), de Paterson & Kemp | 3 ; 3 ; 3 |
| Q21 | Europe PMC | `("Deese-Roediger-McDermott" OR "DRM") AND ("false memory" OR "false recall" OR "false recognition") AND (replication OR "multi-lab" OR "many labs" OR "registered report")` | 15 (82) |
| Q22 | Crossref | `Yuille Cutshall 1986 a case study of eyewitness memory of a crime` | 3 (trouvé, aucun résumé nulle part : non retenu) |
| T1 | texte intégral | Ito et al. 2019, manuscrit accepté (WRAP) : méthode, résultats, tableaux 1-2, discussion | lu |

Obligatoires : « meta-analysis » (Q1, Q3, Q4, Q5, Q11, Q13, Q18), « replication » (Q9, Q12, Q19 pour le *Registered
Report*, Q21 ; et la réplication d'Ito lue en entier), « culture » / « moderator » (Q6, Q16, Q17 ; Petterson 2012,
Bilgin & Wang 2024, Anakwah 2024 et le passage d'Ito sur la culture).

---

## (b) Ce que j'ai trouvé

« Force » = poids de l'argument contre le verdict, selon la grille (rang du plan, taille, indépendance). Les phrases
citées sont des phrases de résultat du résumé, sauf mention contraire.

### 0. L'étude à l'écran, lue en entier : trois choses que le dossier ne dit pas

**Ito et al. 2019** — 10.1037/h0101833 — texte intégral (manuscrit accepté).

1. **La moitié est préenregistrée, mais tard.** « This second batch of studies was preregistered », avec cette note :
   « The details of the procedure were specified on the Open Science Framework in advance of the second wave of data
   collection, but we neglected to complete the formal registration process until July 25, 2018. » Les auteurs
   parlent de « multi-lab samples ». Le classement « experiment » (pas « réplication multi-laboratoires
   préenregistrée ») reste juste ; la limite de la fiche (« not described as preregistered ») est à réécrire avec ce
   détail.
2. **Les chiffres.** Effet combiné g = 1,70 (IC 95 % 1,40-1,99) sans l'échantillon néo-zélandais ; l'effet (correct
   sur les détails non discutés moins correct sur les détails discutés) va de **34 % (Colombie) à 64 % (Japon)**. Mais
   chaque personne n'a été exposée qu'à **1,6 détail** en moyenne (sur 8 détails critiques), et l'a repris dans 80 %
   des cas : environ **1,3 erreur par personne**. Les détails sont **périphériques** (un tableau au mur, la couleur
   d'une casquette), le test est une **reconnaissance à deux choix le jour même**. 486 personnes testées ; celles qui
   n'ont été exposées à aucun détail du partenaire (de 1 au Canada à 13 en Malaisie) sont sorties de l'analyse
   (F(9, 405) : ≈ 415 analysées). Certains partenaires se connaissaient, d'autres non.
3. **Quand on conteste, l'effet disparaît.** Analyse exploratoire (« unplanned ») : quand la version du partenaire
   n'avait pas été contestée pendant la discussion, elle a été reprise dans 626 cas sur 708 (88,4 %) ; quand les deux
   avaient dit leur version, **1 cas sur 58 (1,8 %)**.

Ce que cela change :
- **La scène.** Le dossier écrit que c'est « le mécanisme même de la scène (deux collègues qui en parlent, chacun prend
  la version de l'autre) ». Si les deux collègues **se disputent** sur qui devait envoyer le fichier, Ito prédit
  l'inverse : on ne reprend presque jamais une version qu'on a contestée. La scène qui colle à l'étude : l'un dit sa
  version, l'autre ne la conteste pas (occupé, il hoche la tête), et plus tard il la raconte comme la sienne.
- **La carte.** « اتبنّوا رواية زميلهم » dit plus que l'étude : on a repris **une ou deux tailles de détail**, pas
  « la version » du partenaire. Proposition, sans autre chiffre que ceux de la fiche :
  « 10 دول · 486 شخص · كتير منهم افتكروا تفصيلة قالها زميلهم كأنهم شافوها ».
- **La culture.** Ito écrit que les écarts de contestation entre pays « do not fit an interpretation that the
  co-witness suggestibility effect would be larger in collectivistic cultures » (la Colombie, la plus collectiviste,
  contestait le plus ; le Japon jamais).

### Contre c1 (une information trompeuse change ce qu'on rapporte) — « change le récit » tient ; « réécrit le souvenir » ne tient pas

La direction de c1, telle qu'écrite (« changes what people later **report** »), n'est contredite par rien. Mais le
titre de l'épisode, l'idée du livre (« easily altered ») et toute réplique du type « ذاكرتك اتكتبت من جديد » disent
plus : que le souvenir d'origine est remplacé. Là-dessus, la contre-preuve est sérieuse et ancienne.

**1. McCloskey & Zaragoza 1985** — 10.1037/0096-3445.114.1.1 — *JEP: General* (806 citations)
- Plan : six expériences avec un test modifié (le choix ne propose plus l'information trompeuse).
- Résumé : « We conclude from the results that misleading postevent information has no effect on memory for the
  original event. »
- Joue : l'effet classique peut venir de ce qu'on répond, pas d'un souvenir effacé. Force : moyenne (ancien, discuté
  depuis ; mais jamais réfuté sur ce point par un test qui le tranche).

**2. Oeberst & Blank 2012** — 10.1016/j.cognition.2012.07.009 — *Cognition*
- Plan : trois expériences.
- Résumé : « …we report three experiments to demonstrate that suggestive influence can be completely undone. » et
  « …memory for original event details that were the target of misinformation was restored to the level of non-misled
  control performance, and even beyond (Exp. 3). » (même après 5 semaines).
- Joue : le souvenir d'origine **était encore là**. Avec Blank 2014 (au dossier : un avertissement coupe l'effet de
  plus de moitié), c'est l'argument le plus net contre « réécrit ». Force : moyenne-élevée (même auteur que Blank 2014 :
  pas indépendant).

**3. Edmar, Enquist & Luke 2026** — 10.31234/osf.io/m68kf_v6 — **prépublication** PsyArXiv (v6, 2026-10-01 ; aucune
version publiée au 2026-11-23, Q2)
- Résumé : 480 études, g = 0,694, mais **IC 95 % [0,259 ; 1,128]**, I² = 92 % ; « …it reflects a combination of
  memory-related and strategic processes » ; « …the misinformation effect may be better conceptualized as a
  constellation of related phenomena rather than a single unified effect ».
- Joue : la seule synthèse de l'effet lui-même dit « robuste » mais aussi « en partie stratégique » et d'une taille
  très variable. Refusée par le vérificateur (prépublication) : page des preuves seulement. Force : faible pour le
  registre, utile pour la formulation.

**4. Skagerberg & Wright 2008** — 10.1080/09658210802019696 — *Memory*
- Plan : 92 personnes, technique proche de MORI (versions différentes, discussion en paire).
- Résumé : « …their responses showed that some of the distorted memories were blends of the original information and
  the post-event information. »
- Joue : une partie est un vrai mélange en mémoire, une partie de la complaisance : ni « tout réécrit » ni « rien ».
  Force : faible-moyenne.

**5. Odinot, Wolters & van Koppen 2009** — 10.1007/s10979-008-9152-x — *Law and Human Behavior*
- Plan : étude de cas, **14 témoins d'un vrai braquage**, interrogés 3 mois après, comparés aux images de la caméra.
- Résumé : « Of all information that could be remembered about 84% was correct. » et « A potential source of
  (mis)information, a reconstruction of the robbery broadcasted on TV, did not alter the original memories of the
  witnesses. »
- Joue : sur un événement réel, le souvenir est **surtout juste** et une source de désinformation n'a rien changé.
  Contre « easily », pas contre c1. Force : faible (14 personnes, une source de désinformation non contrôlée), mais
  c'est la seule donnée de terrain trouvée.

**6. Dalton & Daneman 2006** — 10.1080/09658210500495073 — *Memory* ; **Bilgin & Wang 2024** —
10.1080/09658211.2024.2323935 — *Memory*
- Dalton : « …participants were susceptible to misleading suggestions about central features of the witnessed event,
  although to a lesser extent than they were susceptible to misleading suggestions about peripheral features. »
- Bilgin & Wang (425 étudiants, deux études) : « …they showed higher susceptibility to peripheral than central false
  information exposed via tweets. »
- Joue : les détails d'Ito sont périphériques ; « qui devait envoyer le fichier » est **central** pour les deux
  collègues : l'effet attendu est plus petit que celui de la carte. Force : moyenne pour l'applicabilité à la scène.

**7. O'Donnell & Chan 2023** — 10.1111/lcrp.12242 — *Legal and Criminological Psychology* (*Registered Report*)
- Résumé : « In two high-powered experiments, we failed to replicate both the inoculation effect and the boundary
  condition effect. »
- Joue : repérer une erreur grossière ne protège pas des autres. Rien contre c1 ; utile pour le script (ne pas dire
  « une fois que tu as repéré une erreur, tu es à l'abri »). Le dossier l'a vu (keptOut).

**8. Torrance et al. 2025** — 10.1038/s41598-025-17377-4 — *Scientific Reports*
- Résumé : avertir avant ou après « similarly decreased the negative impact of misinformation on memory » ; mais avec
  deux avertissements : « …these benefits of repeated warning came at the cost of metacognitive assessments of memory
  for information that had not been contaminated by misleading post-event information. »
- Joue : nuance c1 (l'effet se coupe) et surtout la **consigne du livre** (voir plus bas) : à trop douter, on doute
  aussi de ce qu'on a bien retenu. Force : faible-moyenne.

Ce qui **va dans le sens du dossier** (c1 et la scène), trouvé en plus, pour être juste :
- **Edelson et al. 2011** — 10.1126/science.1203557 — *Science* : « Participants exhibited a strong tendency to conform
  to erroneous recollections of the group, producing both long-lasting and temporary errors, even when their initial
  memory was strong and accurate. » (petite étude d'imagerie ; Institut Weizmann d'après les affiliations ; taille non
  lue). Contre la nuance de c3 aussi : un premier souvenir fort et juste peut céder au groupe.
- **French, Garry & Mori 2008** — 10.1080/09658210701801491 — *Memory* : « …subjects who discussed the event with their
  romantic partner (rather than with a stranger) were even more likely to report false memories. » Entre proches,
  plus de conformité : des collègues qui se connaissent sont plus exposés que les paires d'Ito.
- **Paterson & Kemp 2006** (Crossref ; 2005 pour OpenAlex) — 10.1080/10683160512331316334 — *Psychology, Crime & Law* :
  « …when there is a co-witness present, most people (86%) report discussing the event with the co-witness. »
  (questionnaire d'étudiants) : la situation de la scène est courante.
- **Wagner & Echterhoff 2025** — 10.1080/09658211.2025.2534147 — *Memory*, 3 études, 1 070 personnes : adapter son
  récit à son public biaise ensuite son propre souvenir, et « …the audience-congruent memory bias persisted regardless
  of communicators' own initial judgments. » Un mécanisme de la vie ordinaire (raconter), plus proche du livre que les
  vidéos de vol.
- **Goodwin et al. 2017** — 10.1002/acp.3320 — *ACP* : « …participants exhibited a confidence conformity effect, in which
  participants' confidence in their own memories mimicked the confidence of their co-witnesses. » (sert aussi c3).

**Culture comme modérateur** : rien de constant. Anakwah 2024 (au dossier) : le Ghana accepte plus en reconnaissance,
pas en rappel libre ; Ito 2019 : aucun motif collectiviste ; Bilgin & Wang 2024 : « Asian participants were less
influenced by misinformation than European Americans in Study 2 » ; **Petterson & Paterson 2012** —
10.1080/13218719.2011.615821 — 54 personnes : « …higher independence was associated with less memory conformity for
misinformation. No significant relationship was found between memory conformity and interdependence. » **Ne pas dire**
que le public arabe, « collectiviste », serait plus influençable : ce n'est ni testé ni constant.

### Contre c2 (implanter un souvenir d'enfance chez certains) — la direction tient, le chiffre non

« Une partie des gens » tient même chez les critiques. Ce qui est contesté, c'est **combien**, et selon quel codage.
La fourchette publiée va de quelques % à près de la moitié.

**9. Andrews & Brewin 2024** — 10.1002/acp.70012 — *ACP* (réanalyse des transcriptions de Murphy 2023)
- Résumé : « …standard investigator judgements indicated many more false memories than did participants themselves » ;
  « On average, fewer than two details in the fake event were explicitly recalled; 20% with full and 58% with partial
  false memories did not recall being lost. » ; « Half the participants described potentially true experiences… »
- Joue : contredit la lecture de la trouvaille « self-reported » de Murphy que le dossier compte comme appui (les
  participants rapportent **moins** de faux souvenirs que les codeurs). Force : moyenne.

**10. Wade, Riesthuis, Bücken & Otgaar 2025** — 10.1002/acp.70028 (réponse) ; **Brewin & Andrews 2025** —
10.1002/acp.70108 (réplique)
- Wade : Andrews & Brewin « posited that only **4%** of Murphy et al.'s participants developed false memories » ; leur
  réponse : « …even low false memory rates can be practically important. »
- Brewin & Andrews 2025 : « …we discuss persistent concerns about the reliability, validity and generalisability of
  the paradigm and about the tendency for the results of false memory research to be exaggerated. »
- Joue : le débat est **ouvert en 2025** ; le même jeu de données donne 35 % ou 4 % selon le codage. Pour c2, cela
  touche le risque de biais (codage par les chercheurs) en plus de l'incohérence.

**11. Wade, Garry & Pezdek 2018** — 10.1177/0956797617703667 — *Psychological Science*
- Résumé (recodage de Shaw & Porter 2015) : « Using Shaw and Porter's approach, we replicated their 70%. Using
  alternative approaches that distinguish between false beliefs and memories, we found 26-30% of subjects met the
  criteria for false memories. »
- Joue : même les auteurs « pour » montrent que le **codage fait le chiffre** (70 % → 26-30 %). Force : moyenne.

**12. Otgaar et al. 2022** — 10.1037/mac0000028 — *JARMAC* ; **Gewehr et al. 2026** — 10.31234/osf.io/2587c_v1 —
**prépublication**
- Otgaar (méthode en ligne, sans intervieweur) : « …false memory implantation ranged between 9% and 30%. »
- Gewehr (réplication conceptuelle, N = 348) : « …induction rates (12–15% for beliefs; 8.5% for memories) were
  substantially lower than in the original study. »
- Joue : les taux baissent quand on réplique avec plus de monde et moins d'interaction. Force : faible-moyenne.

Pour mémoire : Nash, Wade, Garry & Loftus 2016 (10.1002/acp.3265) répondent à Brewin & Andrews 2017 : « …the figure is
higher than 15%. » Le dossier les a vus.

### c3 (être sûr dit peu de chose) — « mêlée » est juste ; la certitude « modérée » ne l'est pas

**Ce qui contredit le livre.**

**13. Lindsay, Wixted, Fitzgerald & Hyman 2025** — 10.1080/09658211.2025.2551222 — *Memory* (« Contemporary
Discussion » signée par les **deux camps** : Wixted d'un côté, Fitzgerald et Hyman de l'autre)
- Résumé : « A few decades ago, modal expert opinion emphasised eyewitnesses' fallibility, and it was widely held that
  identifications made with high confidence are only slightly more likely to be accurate than those made with low
  confidence. The authors … agree that current science compels a more nuanced perspective in which the relationship
  between eyewitnesses' confidence and their accuracy varies predictably depending on specifics of how the suspect was
  selected, how the identification test was designed, when and how it was administered, and when confidence was
  assessed. »
- Joue : c'est la pièce la plus importante pour c3. La phrase du dossier « feeling certain says little about being
  right » est **l'ancienne opinion que le consensus abandonne**. Mais le consensus ne dit pas non plus « être sûr, c'est
  avoir raison » : il dit « cela dépend, de façon prévisible ». C'est la définition de « mêlée ». Force : élevée pour la
  formulation (rang : revue narrative).

**14. Mickes & Wixted 2025** — 10.1080/09658211.2025.2546905 — *Memory* ; **Wixted, Mickes & Fisher 2018** —
10.1177/1745691617734878 — *Perspectives on Psychological Science*
- Mickes & Wixted : « First, laboratory studies show that initial confidence strongly predicts accuracy. Second, field
  studies using pristine lineups report few high-confidence misidentifications of innocent suspects. »
- Wixted et al. 2018 : « This conclusion applies to eyewitness memory broadly conceived, whether the test involves
  recognition (from a police lineup) or recall (during a police interview). »
- Joue : étend la nuance du dossier au **rappel** (pas seulement aux visages). Mais ce sont des synthèses du même
  groupe, sans recherche systématique.

**15. Jin, Verhaeghen & Rahnev 2022** — 10.3758/s13423-022-02063-7 — *Psychonomic Bulletin & Review* (méta-analyse de
213 jeux de données)
- Résumé : « We find an across-subject correlation between average accuracy and average confidence of R = .22.
  Importantly, this relationship is much stronger for memory than for perception tasks… »
- Joue : les plus sûrs d'eux sont un peu plus souvent justes, surtout en mémoire. Indirect (entre personnes, pas entre
  souvenirs d'une même personne). Force : faible.

**Ce qui soutient le livre**, et que le dossier n'a pas :

**16. Talarico & Rubin 2003** — 10.1111/1467-9280.02453 — *Psychological Science* (54 étudiants, souvenir noté le
lendemain d'un événement marquant, puis 1, 6 ou 32 semaines après)
- Résumé : « Consistency for the flashbulb and everyday memories did not differ, in both cases declining over time.
  However, ratings of vividness, recollection, and belief in the accuracy of memory declined only for everyday
  memories. » et « Flashbulb memories are not special in their accuracy, as previously claimed, but only in their
  perceived accuracy. »
- Joue : **la seule preuve sur des souvenirs de sa propre vie**, et elle va dans le sens du livre pour les souvenirs
  chargés d'émotion : la certitude reste, l'exactitude part. À l'inverse, pour les souvenirs ordinaires, la certitude
  baisse avec l'exactitude (elle « dit » quelque chose). Une dispute au bureau est ordinaire par son objet, chargée
  par son enjeu : les deux lectures sont possibles. Force : moyenne (longitudinal, petit).

**17. Hirst et al. 2015** — 10.1037/xge0000055 — *JEP: General* (suivi sur 10 ans)
- Résumé : « Despite the initial rapid forgetting, confidence remained high throughout the 10-year period. » et
  « Inconsistent flashbulb memories were more likely to be repeated rather than corrected over the 10-year period… »
- Joue : soutient « même les souvenirs dont on est sûr ». L'événement est un attentat : page des preuves seulement,
  jamais dans la scène (règle du dossier sur les traumatismes). Force : moyenne.

**18. Eisen & Ying 2026** — 10.1080/09658211.2026.2680933 — *Memory* ; **Pennekamp et al. 2026** —
10.1080/09658211.2026.2729472 — *Memory* ; **Giacona et al. 2021** — 10.1037/lhb0000381 — *Law and Human Behavior* ;
**Moore et al. 2025** — 10.1186/s41235-025-00692-9 — *Cognitive Research*
- Eisen & Ying (revue d'expériences de terrain simulées) : « …a positive correlation between confidence and accuracy
  exists, but at the same time, nearly half of all false-identifications are made with 90–100% confidence. »
  (procédures suggestives).
- Pennekamp : « The model predicts that, as memory weakens, high-confidence accuracy declines. »
- Giacona (2 191 étudiants) : « Estimator variables can be important for evaluating even high-confidence suspect
  identifications and establish some important boundary conditions for the pristine conditions hypothesis. »
- Moore (1 055 personnes) : « Importantly, we found that the pristine conditions hypothesis does not hold regardless
  of the state of the witnessing condition. »
- Joue : la nuance « le premier souvenir sûr est le plus souvent juste » a des **limites publiées** (mauvaises
  conditions de vision, mémoire faible). Force : moyenne (deux expériences larges, deux revues).

**19. Berkowitz & Frenda 2018** — 10.1177/1745691617751883 ; **Wade, Nash & Lindsay 2018** — 10.1177/1745691618758261 —
*Perspectives on Psychological Science* (commentaires de Wixted et al. 2018)
- Berkowitz & Frenda : « The potential for memory contamination is commonplace and can likely be outside the control
  of investigators. »
- Wade et al. : « Wixted et al.'s reasoning implies that near-pristine conditions or uncontaminated memories are
  normative, but there are at least two good reasons to doubt this. »
- Joue : les conditions « pures » sont l'exception dans la vie (c'est aussi l'exception dans la scène : les collègues
  ont déjà parlé). Commentaires d'experts, rang bas.

**Relectures de deux fiches du dossier** :
- **Spearing 2022** est compté « supports » ; son propre résultat dit que la relation confiance-exactitude **tient à une
  semaine** (« …compared to shorter (immediate and 1 week) delays »). C'est une nuance autant qu'un appui.
- **Odinot 2009** (carte 5) : « …the mean accuracy-confidence correlation was rather modest (0.38). These findings
  indicate that confidence is not a reliable predictor of accuracy. » Sur un vrai événement, 3 mois après : appui de c3
  (et l'exactitude moyenne, 84 %, va contre « easily »).

### Le « À retenir » et la consigne du livre (« fais-toi moins confiance »)

Le dossier propose « écrire tout de suite ce qu'on a vu ou décidé, avant d'en parler », en suggestion à faible risque.
C'est défendable, avec une réserve sur **ce que l'écriture fait**.

- **Horry et al. 2020** — 10.1002/acp.3753 — *ACP* (méta-analyse, 15 à 19 comparaisons, N = 722 à 977) : « Subsequent
  accounts were more detailed and accurate for witnesses who had completed an initial SAI© than for those who had
  not. » Appui (l'outil, pas une simple note).
- **Vredeveldt et al. 2018** — 10.1177/0093854818771721 — *Criminal Justice and Behavior* (86 policiers, scénario réel
  d'entraînement) : « Police officers who recorded their own memories prior to collaboration included less incorrect
  information in the collaborative report… » Le plus proche de la scène : **écrire seul avant de mettre en commun**.
- **Contre** : **Bird et al. 2024** — 10.1002/acp.4179 — *ACP* : « Surprisingly, neither the SAI nor the WFR reduced
  susceptibility to misinformation. » ; **Chan, Manley & Lang 2017** — 10.1016/j.jarmac.2017.07.003 — *JARMAC* :
  « Taking a memory test before being exposed to misinformation can ironically increase the likelihood that an
  eyewitness would fall prey to the misinformation effect… » ; en face, **Pereverseff et al. 2019/2020** —
  10.1177/1747021819881948 — *QJEP* : « …initial testing can protect against suggestibility, but can also precipitate
  memory errors when intrusions emerge on an initial test. » (Barea Vera 2026, 10.11144/javeriana.upsy25.resf, au
  dossier, va dans le sens de Chan.)
- Conséquence pour le script : la note écrite vaut comme **trace à relire**, pas comme vaccin de la mémoire. Dire
  « اكتبها وارجع للورقة » plutôt que « اكتبها عشان ذاكرتك ما تتغيرش ». Et garder « جرّب ».

La consigne du livre, « trust yourself less », a un **coût possible** qui n'est pas au dossier :
- **van Bergen et al. 2009** — 10.1002/acp.1595 — *ACP* (80 personnes, corrélationnel) : « …people suffering from memory
  distrust accepted more misinformation than those with optimistic beliefs about their memory. »
- **Dudek & Polczyk 2023** — 10.1111/lcrp.12249 — *LCP* (*Registered Report*, N = 306 et 316, méfiance **induite**) :
  « …the hypotheses regarding the relationship between memory distrust and suggestibility were not confirmed. » mais,
  pour la suggestibilité en interrogatoire, ceux qu'on a fait douter étaient plus influençables quand ils voyaient
  l'incohérence. **Gudjonsson et al. 2026** — 10.3389/fpsyg.2026.1774327 — 229 personnes : la méfiance envers sa
  mémoire (erreurs de commission) va avec plus de suggestibilité (corrélations).
- Avec Torrance 2025 (carte 8 : trop d'avertissements font douter de souvenirs justes), cela donne une règle de
  script : **vérifier**, pas **douter de soi**. « Tiens tes certitudes moins serré » passe ; « ما تثقش في ذاكرتك »
  non : la meilleure preuve (le *Registered Report*) ne montre pas que douter protège, et deux corrélations disent
  l'inverse.

### Échantillons arabes et Moyen-Orient (point d de la demande)

Le dossier n'en a trouvé aucun. J'en ai trouvé trois arabes, tous faibles ou à côté du sujet, et trois du Moyen-Orient
non arabe.

**20. Hassan et al. 2018** — 10.30958/ajl.4-4-3 — *Athens Journal of Law* (ATINER) — **Arabie saoudite** (six auteurs
de l'université Prince Mohammad bin Fahd, d'après OpenAlex)
- Plan : étudiants en droit, vol mis en scène en classe, rappel immédiat avec désinformation ; taille non lue (texte
  intégral inaccessible).
- Résumé : « Witnesses who rejected misinformation recollected more accurately the perpetrator's behaviour as well as
  broad static details, and were more confident in their memories than those who failed to reject misinformation. »
- Joue : dans un échantillon saoudien, une partie accepte la désinformation (c1, sans comparaison manipulée) et ceux
  qui la rejettent sont **plus sûrs et plus justes** (contre c3). Force : faible (corrélationnel, revue peu citée : 0
  citation dans OpenAlex, taille inconnue). **Ne suffit pas** à rendre la phrase d'applicabilité inutile.

**21. Al-Zoubi et al. 2026** — 10.3389/feduc.2026.1917207 — *Frontiers in Education* — **Jordanie** (universités Jadara
et Yarmouk) : 165 lycéennes, paradigme DRM sur un contenu de cours : « …the auditory lecture condition yielded lower
sensitivity and a more liberal response bias compared to both written text and multimedia conditions… » Faux souvenirs
de mots, pas désinformation ni confiance : à côté de c1-c3.

**22. Megreya, Memon & Havard 2011** — 10.1002/acp.1826 — *ACP* — **Égypte** et Royaume-Uni : identification d'une
voleuse dans un alignement ; « Egyptian observers showed an advantage when the culprit wore a headscarf. » Seule étude
de témoin oculaire trouvée avec des Égyptiens ; montre que la culture change la mémoire des témoins, mais ne teste ni
désinformation ni confiance.

Moyen-Orient non arabe : **Edelson et al. 2011** (Israël, conformité de mémoire, ci-dessus), **Shabani et al. 2022** —
10.32598/bcn.2021.2275.2 (Iran, 30 étudiants, DRM avec des images de marques), **Bozkurt & Ziyalar 2026** —
10.1186/s40359-026-04737-6 (Turquie, 104 étudiants, questions suggestives : « …memory accuracy showed a strong negative
relationship with suggestibility »). Revue utile pour la phrase d'applicabilité : **Hope et al. 2021** —
10.1111/lcrp.12202 (culture et entretiens de témoins : « …the role of cultural context has largely been ignored by
researchers… »).

Conclusion d'applicabilité : la phrase « معظم الدراسات من أمريكا وأوروبا » reste due. Une fiche `mena: true` pour
Hassan 2018 (ou Edelson, Israël) ne doit pas servir à la retirer.

### L'étude à l'écran : Ito 2019 est-elle la bonne ? (point e de la demande)

- **Aucune méta-analyse publiée de l'effet de désinformation lui-même** (Q1-Q5, Q11) : la seule est Edmar 2026,
  prépublication refusée. Il n'existe pas non plus de méta-analyse publiée de la conformité entre témoins (Q4, Q5) : la
  plus proche, O'Donnell et al. 2023 (10.3389/fpsyg.2023.1201674, *Frontiers*), ne porte que sur la variété des
  sources de la désinformation. Les méta-analyses publiées du dossier portent sur autre chose : les avertissements
  (Blank 2014), l'implantation (Scoboria, Arce : c2, chiffre contesté), la rétroaction (Steblay : c3).
- Ito contient sa propre méta-analyse de 11 échantillons (g = 1,67), dix laboratoires, la moitié préenregistrée (tard) :
  c'est **la meilleure pièce disponible pour c1**, et la plus proche de la scène. L'avertissement de `bvs check` est
  justifié, mais je ne vois pas mieux. Je **déconseille Scoboria** à l'écran : rang plus haut, mais sur c2, au chiffre
  le plus disputé du dossier (30 % ou 4 % selon le codage).
- À corriger avant l'écran : « رواية » → « تفصيلة » (on reprend un détail, pas la version) ; la scène sans dispute
  (1 reprise sur 58 quand on conteste) ; la fiche (préenregistrement partiel, taux 34-64 %, détails périphériques,
  reconnaissance le jour même, ≈ 415 analysés).

---

## (c) Cherché et pas trouvé (notFound)

- Aucun avis nouveau sur les 12 DOI du verdict (seule la notice de Murphy 2023, connue) ni sur mes 57 DOI ; aucune
  correction non liée trouvée par la recherche par titre.
- Aucune version publiée de la méta-analyse d'Edmar et al. (6 versions PsyArXiv, la dernière le 2026-10-01).
- Aucune méta-analyse publiée de la conformité de mémoire entre témoins ; aucune réplication multi-laboratoires
  préenregistrée **avant** la collecte de l'effet de désinformation ou de l'implantation.
- Aucune comparaison directe de la taille de l'effet en laboratoire et sur le terrain ; une seule étude de cas réelle
  avec une source de désinformation (Odinot 2009 : sans effet). Yuille & Cutshall 1986 (10.1037/0021-9010.71.2.291,
  vrai crime) : aucun résumé dans Crossref, OpenAlex ni Europe PMC : non retenu.
- Aucune étude de la relation confiance-exactitude pour des souvenirs ordinaires de conversations (qui a dit quoi, qui
  devait faire quoi) ; les seules preuves autobiographiques sont celles des souvenirs « flash » (Talarico, Hirst), qui
  soutiennent le livre.
- Sporer et al. 1995 (10.1037/0033-2909.118.3.315) : DOI vérifié, toujours sans résumé : pas plus utilisable que pour le
  dossier.
- Aucun échantillon égyptien sur la désinformation, l'implantation ou la confiance ; un seul échantillon arabe sur la
  désinformation (Arabie saoudite, revue faible, texte non lu).
- Texte intégral d'Edelson 2011 (Europe PMC en erreur 500) et de Hassan 2018 (page protégée) : non lus.

---

## (d) Conclusion

**Le badge ⚖️ tient ; ❌ ne se défend pas ; ✅ ne se défend que sur une lecture plus étroite de c3. La certitude
« modérée » du verdict est fragile : je recommande « basse », à cause de c3.**

1. **c1 : « soutient, modérée » tient**, pour ce qu'elle dit : ce qu'on **raconte** change. Deux limites à écrire :
   (i) **« réécrit » est trop fort** : le souvenir d'origine survit souvent (McCloskey & Zaragoza 1985 ; Oeberst & Blank
   2012 : effet entièrement annulé, même à 5 semaines ; Blank 2014 ; Wiechert 2026 et Edmar 2026 : en partie
   stratégique ; Skagerberg 2008 : en partie un mélange). Ni le titre ni le hook ne disent « ذاكرتك اتمسحت / اتكتبت من
   جديد » ; « اللي بتحكيه بيتغيّر » oui. (ii) **« facilement » est conditionnel** : détails périphériques, sans
   contestation, juste après (Ito : 88 % sans contestation, 1,8 % avec ; Dalton 2006 et Bilgin 2024 : moins pour
   l'essentiel ; Odinot 2009 : rien sur un vrai braquage). La modérée reste défendable (10 pays, partiellement
   préenregistrée, réplication récente de Wiechert) ; elle est à la limite si l'on applique la baisse pour
   l'applicabilité (étudiants, films, aucun échantillon arabe solide) que la grille prévoit.

2. **c2 : « soutient » tient pour « une minorité », pas pour un chiffre.** La fourchette publiée va de 4 % (Andrews &
   Brewin sur les données de Murphy, d'après Wade et al. 2025) à 46 % (Scoboria, meilleures conditions), en passant par
   8,5 % (Gewehr 2026, prépublication), 9-30 % (Otgaar 2022), 15 % (Brewin & Andrews 2017), 26-30 % (Wade et al. 2018),
   35 % (Murphy). Le dossier ne descend que pour l'incohérence ; le **risque de biais** (le codage des chercheurs fait
   le chiffre : 70 % → 26-30 % chez Wade et al. 2018 ; Brewin & Andrews 2025 : « persistent concerns ») est une seconde
   raison. Depuis le plafond haut (méga-analyse), deux baisses donnent **basse** pour toute taille ; « modérée » pour la
   seule direction (« certains ») reste défendable. Conséquence : aucun hook ni carte avec « 30 % » ; un hook affirmatif
   sur c2 seulement s'il dit « بعض الناس », sans chiffre. Et la trouvaille « self-reported » de Murphy n'est pas un
   appui simple : Andrews & Brewin 2024 montrent que les participants s'attribuent **moins** de faux souvenirs que les
   codeurs.

3. **c3 : « mêlée » est la bonne direction ; « contredit » n'est pas permis.**
   - Sur le fond : le consensus signé par les deux camps (Lindsay, Wixted, Fitzgerald & Hyman 2025) dit que la relation
     confiance-exactitude « varies predictably » selon les conditions : ni « être sûr dit peu » (l'ancienne opinion,
     abandonnée), ni « être sûr, c'est avoir raison ». C'est « vraie sous conditions », donc ⚖️.
   - Selon la grille : les preuves qui contredisent (Wixted & Wells 2017, Wixted et al. 2018, Mickes & Wixted 2025,
     Lindsay et al. 2025) sont des **revues narratives**, rang bas ; du côté du livre il y a deux méta-analyses
     (Steblay 2014, Fitzgerald 2025). La règle « une preuve qui contredit de rang égal ou supérieur interdit
     « soutient » » ne joue donc pas contre le livre, et rien ne permet « contredit ». La grille permettrait même
     « soutient » à la lettre ; je ne le recommande pas, parce que Steblay est indirect (elle montre qu'une
     rétroaction gonfle la certitude, pas que la certitude initiale ne dit rien).
   - **La certitude « modérée » n'est pas tenue.** Toute la preuve « contre » et presque toute la preuve « pour » porte
     sur **le visage d'un inconnu dans un alignement de police** ou les détails d'une vidéo de vol ; aucune ne porte sur
     « qui devait envoyer le fichier ». La seule preuve sur des souvenirs de sa propre vie (Talarico 2003, Hirst 2015)
     va **dans le sens du livre**. La nuance que le dossier veut dire à l'écran repose sur une revue narrative, avec des
     limites publiées (Giacona 2021, Moore 2025, Pennekamp 2026, Edelson 2011). Caractère indirect majeur et
     imprécision (Fitzgerald : le vrai taux d'erreur est inconnu, seuls les choix de figurants se voient) : **basse**.
     Et donc, par la règle de la grille, **le verdict devient ⚖️ basse**. Ce ne serait pas « la première modérée de la
     chaîne ».

4. **✅ s'argumente, et le coordinateur doit le savoir.** Si c3 est testée dans les mots de l'auteur (« not reliable,
   even the ones we think we know are right »), et non « feeling certain says little », elle est soutenue : erreurs
   très sûres réelles (Fitzgerald : 1 sur 8 au moins sur le terrain ; Eisen 2026 : près de la moitié des fausses
   identifications à 90-100 % sous suggestion), certitude qui reste quand l'exactitude part (Talarico, Hirst),
   certitude qui gonfle (Steblay, Goodwin 2017), conditions pures rares dans la vie (Berkowitz & Frenda 2018 ; Wade,
   Nash & Lindsay 2018). Les trois affirmations soutiendraient alors, et ✅ serait permis si toutes restaient modérées.
   Ce qui le retient, à mon avis : (i) « quite easily » est faux pour les détails centraux, contestés ou réels (Ito,
   Dalton, Odinot) ; (ii) le premier souvenir sûr, non contaminé, est le plus souvent juste d'après le consensus de
   2025 ; (iii) la **consigne** du livre (« trust yourself less ») n'est pas testée et a un coût possible (Torrance
   2025 ; van Bergen 2009 ; *Registered Report* de Dudek & Polczyk 2023 nul). Le choix entre les deux lectures de c3
   est une décision de formulation ; il doit être écrit dans le dossier, pas laissé implicite.

5. **La nuance dite (c3)** : « غالبًا صح » pour le premier souvenir sûr étend aux souvenirs ordinaires ce qui a été
   montré pour des visages ; « تأكيدك ما بقاش دليل » après la discussion va trop loin (la corrélation reste positive,
   Eisen 2026 ; à une semaine elle tient, Spearing 2022). Formulation mieux appuyée, que je propose : **« أول تأكيد،
   قبل ما تتكلم مع حد، ليه وزن. بعد الكلام والوقت، تأكيدك بيكبر من غير ما تبقى أدق. »** (Steblay 2014, Goodwin
   2017, Spearing 2022, Talarico 2003, Hirst 2015.)

6. **La scène et l'écran** : garder Ito 2019 à l'écran (pas de méta-analyse publiée de c1 ; Scoboria porte le chiffre le
   plus disputé). Corriger la carte (« تفصيلة », pas « رواية ») et **la scène : sans dispute**. Une dispute est
   justement le cas où l'étude ne trouve presque rien.

7. **« À retenir »** : « écris-le avant d'en parler » reste une suggestion (« جرّب »), appuyée par Horry 2020 et
   Vredeveldt 2018, contredite pour la désinformation par Bird 2024 et Chan 2017. Dire ce que fait la note (« ارجع
   للورقة »), pas qu'elle protège la mémoire. **Ne jamais dire « ما تثقش في ذاكرتك »** : vérifier, pas douter.

8. **Applicabilité** : phrase due. Aucune preuve constante que les cultures collectivistes soient plus influençables
   (Ito, Bilgin & Wang, Petterson, Anakwah) : ne pas le suggérer pour le public arabe.

---

## (e) DOI à ajouter au registre, par ordre d'importance

1. 10.1080/09658211.2025.2551222 — Lindsay, Wixted, Fitzgerald & Hyman 2025 (c3 : consensus des deux camps, « varies
   predictably » ; la formulation de c3)
2. 10.1016/j.cognition.2012.07.009 — Oeberst & Blank 2012 (c1 : effet entièrement annulé ; contre « réécrit »)
3. 10.1111/1467-9280.02453 — Talarico & Rubin 2003 (c3 pour le livre : souvenirs de sa propre vie)
4. 10.1037/xge0000055 — Hirst et al. 2015 (c3 pour le livre ; page des preuves seulement)
5. 10.1002/acp.70012 — Andrews & Brewin 2024 (c2 : réanalyse de Murphy)
6. 10.1177/0956797617703667 — Wade, Garry & Pezdek 2018 (c2 : le codage fait le chiffre)
7. 10.1002/acp.70108 — Brewin & Andrews 2025 et 10.1002/acp.70028 — Wade et al. 2025 (c2 : le débat de 2025)
8. 10.1037/0096-3445.114.1.1 — McCloskey & Zaragoza 1985 (c1 : souvenir d'origine intact au test modifié)
9. 10.1080/09658211.2025.2546905 — Mickes & Wixted 2025 (c3 contre le livre : confiance initiale)
10. 10.1080/09658211.2026.2680933 — Eisen & Ying 2026 (c3 pour le livre : moitié des fausses identifications très sûres
    sous suggestion)
11. 10.1037/lhb0000381 — Giacona et al. 2021 et 10.1186/s41235-025-00692-9 — Moore et al. 2025 (limites de la nuance)
12. 10.1080/09658210500495073 — Dalton & Daneman 2006 et 10.1080/09658211.2024.2323935 — Bilgin & Wang 2024 (c1 : moins
    pour l'essentiel ; et la culture)
13. 10.1007/s10979-008-9152-x — Odinot et al. 2009 (c1 contre « easily », c3 pour le livre : vrai braquage)
14. 10.1177/0093854818771721 — Vredeveldt et al. 2018 et 10.1002/acp.3753 — Horry et al. 2020 (« À retenir »)
15. 10.1002/acp.4179 — Bird et al. 2024 et 10.1016/j.jarmac.2017.07.003 — Chan et al. 2017 (« À retenir » : limites)
16. 10.1111/lcrp.12249 — Dudek & Polczyk 2023 (*Registered Report*) et 10.1002/acp.1595 — van Bergen et al. 2009 (la
    consigne du livre)
17. 10.1038/s41598-025-17377-4 — Torrance et al. 2025 (avertissements : utiles, coût de l'excès)
18. 10.1126/science.1203557 — Edelson et al. 2011 (c1 pour le livre ; contre la nuance de c3)
19. 10.1080/09658210701801491 — French et al. 2008 (entre proches, plus de conformité)
20. 10.1080/09658211.2025.2534147 — Wagner & Echterhoff 2025 (raconter biaise son souvenir)
21. 10.1002/acp.3320 — Goodwin et al. 2017 (conformité de la certitude)
22. 10.1080/09658210802019696 — Skagerberg & Wright 2008 (mélange ou complaisance)
23. 10.1080/13218719.2011.615821 — Petterson & Paterson 2012 (culture : indépendance)
24. 10.1080/10683160512331316334 — Paterson & Kemp 2006 (86 % en parlent)
25. 10.1037/mac0000028 — Otgaar et al. 2022 (c2 : 9-30 %)
26. 10.1177/1745691617751883 — Berkowitz & Frenda 2018 et 10.1177/1745691618758261 — Wade, Nash & Lindsay 2018 (c3 :
    conditions pures rares)
27. 10.1177/1745691617734878 — Wixted, Mickes & Fisher 2018 (c3 : la nuance étendue au rappel)
28. 10.3758/s13423-022-02063-7 — Jin et al. 2022 (confiance moyenne et exactitude, R = .22)
29. 10.1177/1747021819881948 — Pereverseff et al. 2019 (rappel initial protecteur, avec un coût)
30. 10.3389/fpsyg.2026.1774327 — Gudjonsson et al. 2026 (méfiance et suggestibilité, corrélations)
31. 10.30958/ajl.4-4-3 — Hassan et al. 2018 (Arabie saoudite ; faible ; texte intégral à lire avant tout usage)
32. 10.1002/acp.1826 — Megreya et al. 2011 (Égypte, à côté du sujet) ; 10.3389/feduc.2026.1917207 — Al-Zoubi et al.
    2026 (Jordanie, DRM) ; 10.1111/lcrp.12202 — Hope et al. 2021 (culture et témoins)
33. 10.1111/lcrp.12242 — O'Donnell & Chan 2023 (déjà vu par le dossier : repérer une erreur ne protège pas)
34. Pour la page des preuves seulement (refusés par le vérificateur) : 10.31234/osf.io/m68kf_v6 (Edmar et al. 2026,
    prépublication), 10.31234/osf.io/2587c_v1 (Gewehr et al. 2026, prépublication) ; et la prépublication d'Ito,
    10.31234/osf.io/smp9a (même texte que l'article).
35. À corriger dans la fiche `ito-2019-cowitness` (pas un nouveau DOI) : préenregistrement partiel et tardif (note 1 du
    texte), taux 34-64 %, ≈ 1,6 détail exposé par personne, détails périphériques, reconnaissance le jour même, ≈ 415
    analysés sur 486, 88,4 % de reprises sans contestation contre 1,8 % avec (analyse exploratoire).
