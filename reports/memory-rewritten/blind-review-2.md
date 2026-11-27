# Relecture aveugle des sources, deuxième passe — « memory-rewritten » (Manson, ch. 6 : nos souvenirs sont reconstruits et faciles à changer, donc tenons moins fort à nos certitudes)

Relu le 2026-11-26. Seulement les **cinq fiches ajoutées après la première relecture** (`blind-review.md`, 2026-11-23) :
`andrews-2024-mall`, `bilgin-2024-central`, `lindsay-2025-consensus`, `oeberst-2012-undoing`, `talarico-2003-flashbulb`.

Données récupérées par la session de relecture elle-même (client générique, sans nom ni adresse) : Crossref
`/works/<doi>`, Crossref `/works?filter=updates:<doi>`, OpenAlex `/works/doi:<doi>`, Europe PMC `search … resultType=core`.
Réponses brutes : `/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-r2/raw/` ; textes
entiers : `/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-r2/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : **Andrews & Brewin 2024** (version publiée, accès
libre, dépôt UCL Discovery) ; **Lindsay et al. 2025** (version publiée, accès libre, dépôt WRAP de Warwick). Résumé seul :
**Bilgin 2024** et **Oeberst 2012** (accès fermé, aucun dépôt ouvert chez OpenAlex ni Semantic Scholar) ; **Talarico 2003**
(le dépôt de Duke répond par une page anti-robots ; non contourné). J'ai aussi vérifié chez Crossref la réponse de Murphy &
Greene 2025 (`10.1002/acp.70044`) citée dans une limite.

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `design`, `mena`, `population`,
`findings[].text` ; les `support.sentence`, `kind`, `effect`, `n` et `limits` seulement après avoir lu chaque résumé et
choisi ma phrase. `declared` et `acknowledged` non lus. Dossier de l'écrivain (`scratchpad/dossiers/`) : **non ouvert**.
Un écart à signaler, sans effet ici : une recherche du mot « quasi » dans `content/sources/*.json` (pour savoir si le
schéma a une valeur « quasi-expérience ») m'a montré des lignes de `limits` de fiches de l'autre épisode (Bol, Machin) ;
aucune des cinq fiches de cet épisode.

Affirmations (telles que données pour cette passe) :
- **c1** (causale) : des détails trompeurs donnés par une autre personne après un événement (le récit d'un co-témoin, ses
  déclarations) changent ce que les gens disent ensuite s'en rappeler.
- **c2** (causale) : une suggestion répétée peut amener certaines personnes à se rappeler, comme le leur, un événement
  entier d'enfance qui n'a jamais eu lieu.
- **c3** : même les souvenirs dont on est sûr sont souvent faux : se sentir certain dit peu de chose sur le fait d'avoir
  raison.
- **c4** (hors champ) : donc nous devrions faire moins confiance à notre mémoire et à nos certitudes. Non notée comme
  résultat ; je signale seulement les fiches qui la tempèrent.

**Avant tout : ce que ces cinq fiches changent.**
1. **c3 a enfin une preuve sur des souvenirs de sa propre vie** (Talarico 2003, la lacune signalée par la première
   relecture) : sur 32 semaines, le souvenir d'un événement choquant change autant qu'un souvenir ordinaire, mais la
   certitude, elle, ne baisse pas. **Et une preuve en sens contraire pour la forme générale** (Lindsay 2025) : six
   chercheurs des deux camps disent ensemble que la confiance d'un témoin renseigne sur son exactitude, de façon
   prévisible selon les conditions. c3 reste « vraie sous conditions ».
2. **c2, « un événement entier, comme le sien »** : la réanalyse d'Andrews & Brewin descend, par étapes, de 35 % à **4 %**
   dans la réplication de Murphy 2023 (texte entier). C'est le chiffre le plus strict ; les auteurs de la réplication le
   contestent, mais disent que même 4 % compterait. La direction (« certaines personnes ») tient ; aucun chiffre du tiers
   ne peut porter « un souvenir entier ».

Vérification d'identité commune aux 5 DOI : titres, premiers auteurs et années concordent avec les `id` des fiches
(Andrews : numéro 2024 (38(6)), mis en ligne le 2024-12-12). OpenAlex `is_retracted: false` pour les 5 ; Crossref
`updated-by` et `update-to` absents, `filter=updates:` à 0 résultat pour chacun : **aucun avis de correction ni de
rétractation.**

---

## 1. 10.1002/acp.70012 (andrews-2024-mall)

- **Identité** : confirmée. « Lost in the Mall? Interrogating Judgements of False Memory. » Andrews, B. (premier auteur ;
  Brewin), *Applied Cognitive Psychology* 38(6), e70012 ; numéro de novembre 2024, en ligne le 2024-12-12. Accès libre.
  Ni correction ni rétractation. Réponse publiée vérifiée : Murphy & Greene 2025, « Who Got Lost in the Mall? Challenges in
  Counting and Classifying False Memories » (`10.1002/acp.70044`) : « We disagree with this narrow reanalysis… even if the
  false memory rate was just 4%, that would still have significant theoretical and legal implications. »
- **Plan (relecteur)** : **réanalyse secondaire** (analyse de contenu qualitative) des transcriptions d'une seule étude,
  Murphy et al. 2023 (déjà au dossier). Pas de données nouvelles, rien de manipulé. (Texte entier : les six détails
  centraux codés par **les deux auteurs ensemble jusqu'à accord complet**, puis un juge indépendant, aveugle au but, sur 55
  transcriptions : κ de 0,49 (« la vieille dame ») à 0,91 ; les « expériences peut-être vraies » codées par un juge, un
  second aveugle sur 55 : κ = 0,89.) Le schéma n'a pas de valeur « réanalyse » : **`cross-sectional` (basse) me convient**.
  Risque de biais à écrire : les auteurs sont un camp du débat (Brewin & Andrews 2017), et ils ont codé eux-mêmes.
- **Population** (texte entier) : les 123 participants de Murphy 2023 (Irlande) ; codage des détails pour les **43** que
  Murphy avait jugés porteurs d'un faux souvenir (10 complets, 33 partiels) ; recherche d'expériences vraies dans les 123.
  MENA : non.
- **Résultat principal** : les souvenirs jugés « faux » par les chercheurs contiennent peu des détails suggérés (moins de
  2 sur 6 en moyenne) ; beaucoup ne contiennent même pas le fait d'être perdu ; la moitié des « faux souvenirs » racontent
  une expérience peut-être vraie, distincte de l'histoire inventée.
- **Phrases du résumé** : « On average, fewer than two details in the fake event were explicitly recalled; 20% with full
  and 58% with partial false memories did not recall being lost. » — « Half the participants described potentially true
  experiences, distinguishable from the fake event; this group recalled more suggested details but tended to remember them
  differently. » — conclusion : « The data suggested investigator ratings reflect individual comments made when
  participants are considering whether they remember different elements of the fake event but may not capture the way
  these comments are integrated in participants' own recall decisions. » La phrase « In this new study standard
  investigator judgements indicated many more false memories than did participants themselves, consistent with similar
  studies. » est une phrase de **contexte** : elle rappelle les chiffres de Murphy 2023 (35 % codés, 14 % déclarés), pas
  un résultat de la réanalyse.
- **Chiffres** (texte entier) : 1,47 détail rappelé explicitement en moyenne (ET 1,32) sur 6 ; 80 % des « complets » et
  42,4 % des « partiels » se rappellent explicitement être perdus ; parmi les 43, **17 (40 %) disent eux-mêmes s'en
  souvenir** (8 complets, 9 partiels). « Half the participants » = **22 des 43 jugés porteurs d'un faux souvenir** (5/10
  complets, 17/33 partiels), contre 19/80 (23,8 %) chez les autres ; sur les 123, 38 (30,9 %) décrivent une expérience
  proche mais distincte, 3 (2,4 %) un souvenir ancien qui ressemble à l'histoire. **Taux par étapes** (Discussion) :
  35 % → 17 % sans les 22 expériences peut-être vraies → 11 % sans les 7 qui ne se rappellent pas être perdus → **4 %**
  sans les 9 qui ne disent pas s'en souvenir.
- **c1 : irrelevant**.
- **c2 : nuances (ampleur)** — ne contredit pas qu'une minorité forme un faux souvenir (4 % reste plus que zéro, et le
  débat est ouvert : réponse de Murphy & Greene), mais rend intenable un chiffre du tiers pour « un événement entier,
  comme le sien » ; et une partie des « faux souvenirs » codés pourrait être de vrais souvenirs voisins.
- **c3 : irrelevant**. **c4 (hors champ)** : rien.
- **Fiche de l'écrivain** :
  - `coders-more` : **la phrase d'appui est une phrase de contexte**, pas de résultat (`role: result` à revoir). Le fait
    est vrai, mais sa source première est Murphy 2023 (35 % contre 14 %), déjà au dossier. Soit porter ce constat par
    murphy-2023-mall, soit citer le résultat propre à la réanalyse (texte entier : « 17 (40%) of the 43 with judged false
    memories self-reported they remembered it »). « consistent with similar studies » n'est pas montré ici.
  - `few-details` : ma phrase, même sens, texte fidèle.
  - `possibly-true` : ma phrase, **le texte surdit par ambiguïté** : « Half the participants » se lit « la moitié de tous » ;
    c'est la moitié **de ceux jugés porteurs d'un faux souvenir** (22 sur 43 ; 31 % de tous). Écrire « la moitié de ceux
    qu'on avait comptés comme faux souvenirs racontaient une expérience peut-être vraie ».
  - `limits` justes (camp du débat, réponse de 2025, pas de données nouvelles). Ajouter : codage des détails fait par les
    deux auteurs ensemble, juge aveugle sur 55 transcriptions seulement (κ jusqu'à 0,49) ; les taux par étapes (35 → 17 →
    11 → 4 %) sont dans la Discussion, à citer au texte entier si on les montre.

## 2. 10.1080/09658211.2024.2323935 (bilgin-2024-central)

- **Identité** : confirmée. « The mnemonic effect of central and peripheral misinformation on social media. » Bilgin, E.
  (premier auteur ; Wang, Q.), *Memory* 32(3), 369-382, 2024 (en ligne le 2024-03-11). Accès fermé. Ni correction ni
  rétractation.
- **Plan (relecteur)** : **deux expériences**. L'information trompeuse est manipulée (détails faux lus dans des tweets
  contre détails faux non lus ; détails centraux contre périphériques), test de reconnaissance vrai/faux avec confiance.
  Plafond : modérée. La comparaison des groupes culturels n'est pas manipulée (association). **`experiment` : d'accord.**
- **Population** : 425 étudiants (étude 1 : 200 ; étude 2 : 225), « European American and Asian/Asian American »,
  États-Unis (auteurs à Cornell d'après OpenAlex). Le résumé dit « in a simulated online context », **pas** que les études
  se faisaient en ligne : « two online studies » de la fiche n'est pas vérifiable au résumé. MENA : non.
- **Résultat principal** : dans les deux études et les deux groupes, on reconnaît à tort plus de faux détails lus dans des
  tweets que de faux détails non lus ; on est plus facilement trompé sur les détails périphériques que centraux ; dans
  l'étude 2, les participants asiatiques sont **moins** influencés.
- **Phrases du résumé** : « Regardless of cultural background, participants in both studies demonstrated the
  misinformation effect, whereby they falsely recognised more and resisted less tweeted than untweeted false information. »
  — « Furthermore, they showed higher susceptibility to peripheral than central false information exposed via tweets. » —
  « Asian participants were less influenced by misinformation than European Americans in Study 2. »
- **Taille d'effet** : pas dans le résumé.
- **c1 : supports** — causal ; les tweets sont des déclarations d'autres personnes (« their statements »), et l'effet se
  retrouve dans deux études. Nuances utiles : reconnaissance vrai/faux (choix proposés), pas rappel libre ; les détails
  centraux résistent mieux.
- **c2 : irrelevant**. **c3 : irrelevant** (la confiance est recueillie, mais le résumé n'en dit rien).
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens, textes fidèles. `kind: causal` juste pour les deux.
  `limits` justes et utiles (la troisième phrase va contre la lecture « collectiviste » d'Anakwah 2024, comme Ito 2019).
  Seule correction : `population` « two online studies » → « a simulated online setting » (sauf si le texte entier, non
  lu, le dit).

## 3. 10.1080/09658211.2025.2551222 (lindsay-2025-consensus)

- **Identité** : confirmée. « Eyewitness suspect identification: six claims regarding the state of the science. »
  Lindsay, D. S. (premier auteur ; Wixted, Fitzgerald, Hyman, Mickes, Wade), *Memory* 33(7), 757-764 ; en ligne le
  2025-08-28. Accès libre (CC BY-NC-ND). Ni correction ni rétractation.
- **Plan (relecteur)** : **discussion invitée / déclaration de consensus d'experts**, sans recherche systématique (texte
  entier : « We do not provide a comprehensive review of the literature supporting each claim »). **`narrative-review`
  (basse) : d'accord** ; c'est même une opinion argumentée plus qu'une revue.
- **Population** : la recherche sur l'identification d'un suspect dans une parade (laboratoire et terrain), lue par six
  chercheurs. (Texte entier : « Some of us are associated primarily with research highlighting vulnerabilities of human
  memory. Others of us have championed evidence of eyewitness reliability » ; Wixted, et Fitzgerald avec Wade, sont les
  deux camps des fiches wixted-2017-confidence et fitzgerald-2025-errors.) MENA : non.
- **Résultat principal** : le lien entre confiance et exactitude d'un témoin varie de façon prévisible selon la façon dont
  le suspect a été choisi, le test conçu et mené, et le moment où la confiance est demandée ; un « consensus émergent »,
  pas établi pour chaque point.
- **Phrases du résumé** : conclusion : « The authors of this invited Contemporary Discussion agree that current science
  compels a more nuanced perspective in which the relationship between eyewitnesses' confidence and their accuracy varies
  predictably depending on specifics of how the suspect was selected, how the identification test was designed, when and
  how it was administered, and when confidence was assessed. » — réserve : « We do not assert that every claim is firmly
  established, but we advance arguments for believing they are true. » Le résumé n'a pas de phrase de résultat au sens
  strict (ce n'est pas une étude).
- **Texte entier, la phrase la plus directe pour c3** (affirmation 4) : « On first tests under favourable conditions,
  suspect IDs made with high confidence are more likely to be accurate than suspect IDs made with low confidence. » Et
  l'affirmation 3 : un suspect trouvé par ressemblance du visage peut mener à « a high-confidence misidentification ».
- **c1 : irrelevant** (l'affirmation 1, la mémoire contaminée avant la parade, en est proche mais sans données).
- **c2 : irrelevant**.
- **c3 : contradicts (forme générale, premier test dans de bonnes conditions) / supports (conditions contaminées)** — c'est
  l'abandon commun, par les deux camps, de l'idée que la confiance n'informe presque pas ; rang bas (opinion d'experts),
  et indirect (le visage d'un inconnu dans une parade, pas un souvenir de sa vie).
- **c4 (hors champ)** : tempère « faire moins confiance à nos certitudes » : une certitude première, recueillie tout de
  suite, sans influence, a de la valeur.
- **Fiche de l'écrivain** : ma phrase, même sens ; `role: conclusion` juste. « from both sides of the debate » est
  confirmé par le texte entier (pas par le résumé : préciser `where` ou le dire en limite). « now agree » doit garder la
  réserve des auteurs ; elle est dans les `limits` (« emerging scientific consensus »), c'est bien. Ajouter l'affirmation 4
  (texte entier) : c'est elle qui touche c3.

## 4. 10.1016/j.cognition.2012.07.009 (oeberst-2012-undoing)

- **Identité** : confirmée. « Undoing suggestive influence on memory: The reversibility of the eyewitness misinformation
  effect. » Oeberst, A. (premier auteur ; Blank, H.), *Cognition* 125(2), 141-159, 2012. Accès fermé ; résumé lu chez
  Europe PMC (ni Crossref ni OpenAlex ne l'ont). Ni correction ni rétractation.
- **Plan (relecteur)** : **trois expériences** ; information trompeuse manipulée contre contrôle non trompé, puis une
  procédure (explication que la tâche cherche peut-être deux détails contradictoires, et test qui sépare la mémoire du
  détail de celle de sa source). **`experiment` (modérée) : d'accord.** Tailles d'échantillon et pays inconnus (résumé).
- **Population** : participants des trois expériences ; ni nombre ni pays dans le résumé (auteurs à Tübingen, Allemagne, et Portsmouth, Royaume-Uni, d'après OpenAlex). Blank est le second auteur de
  blank-2014-postwarning : pas indépendant de cette fiche. MENA : non connu, `false` par défaut.
- **Résultat principal** : un effet de l'information trompeuse d'abord bien établi disparaît entièrement, même après
  5 semaines (exp. 3), avec cette procédure ; le détail d'origine revient au niveau des non-trompés, et au-delà (exp. 3).
- **Phrases du résumé** : « Initially established misinformation effects were eliminated - even after a period of 5 weeks
  (Exp. 3) - through (a) an enlightenment procedure ensuring an adequate representation of the memory task as a search for
  potentially two contradictory items (instead of "the" single "correct" answer) and (b) using a memory state test that
  unconfounds the performance contributions of item and source memory by assessing them separately. » — « Specifically,
  memory for original event details that were the target of misinformation was restored to the level of non-misled
  control performance, and even beyond (Exp. 3). » — conclusion : « This remarkable reversibility of misinformation
  influence highlights the central role of memory conversion processes in the misinformation effect (but does not
  principally exclude the contribution of traditional interference processes). »
- **Taille d'effet** : pas dans le résumé.
- **c1 : nuances** — confirme que l'information trompeuse change d'abord ce que les gens rapportent (« initially
  established misinformation effects »), mais montre que ce changement porte sur le rapport et l'attribution de la
  source, pas sur un souvenir effacé : le détail d'origine est encore là. Indirect pour « une autre personne » : la source
  de l'information trompeuse n'est pas dite dans le résumé.
- **c2 : irrelevant**. **c3 : irrelevant**.
- **c4 (hors champ)** : la tempère : le souvenir d'origine survit souvent sous le récit changé.
- **Fiche de l'écrivain** : la phrase choisie (« …we report three experiments to demonstrate that suggestive influence can
  be completely undone ») est une phrase de **but et de conclusion** (`role: conclusion` acceptable) ; la phrase de
  résultat est meilleure, et la limite explique pourquoi l'outil la coupe à « (Exp. 3) » : soit, mais alors la phrase
  « Initially established misinformation effects were eliminated… » a le même défaut. **Le texte surdit par omission** :
  « can be completely undone: the original detail can come back » se lit comme un retour spontané ; il faut **dans le
  texte** (pas seulement en limite) « avec une procédure particulière (expliquer qu'il peut y avoir deux versions, et
  demander séparément le détail et sa source) ». `limits` justes.

## 5. 10.1111/1467-9280.02453 (talarico-2003-flashbulb)

- **Identité** : confirmée. « Confidence, Not Consistency, Characterizes Flashbulb Memories. » Talarico, J. M. (premier
  auteur ; Rubin, D. C.), *Psychological Science* 14(5), 455-461, 2003. Ni correction ni rétractation. (Europe PMC le range
  en « Randomized Controlled Trial » : l'assignation au délai de retest, sans doute.)
- **Plan (relecteur)** : **étude longitudinale** (mesures répétées : récit écrit le 12 septembre 2001, retest à 1, 6 ou
  32 semaines selon le groupe). Le type de souvenir (choquant contre ordinaire) est comparé chez les mêmes personnes, pas
  manipulé. **`longitudinal` (modérée) : d'accord**, à descendre pour l'imprécision (54 personnes en trois groupes de
  délai, soit environ 18 par groupe) et le caractère indirect (l'exactitude est mesurée par la **cohérence avec son propre
  premier récit**, pas par ce qui s'est passé).
- **Population** : 54 étudiants de l'université Duke (États-Unis). MENA : non.
- **Résultat principal** : la cohérence baisse avec le temps, autant pour le souvenir choquant que pour l'ordinaire ;
  vivacité, impression de revivre et certitude d'avoir raison ne baissent que pour l'ordinaire ; l'émotion du premier jour
  prédit la certitude ultérieure, pas la cohérence.
- **Phrases du résumé** : « Consistency for the flashbulb and everyday memories did not differ, in both cases declining
  over time. » — « However, ratings of vividness, recollection, and belief in the accuracy of memory declined only for
  everyday memories. » — « Initial visceral emotion ratings correlated with later belief in accuracy, but not consistency,
  for flashbulb memories. » — conclusion : « Flashbulb memories are not special in their accuracy, as previously claimed,
  but only in their perceived accuracy. »
- **Taille d'effet** : pas dans le résumé (combien la cohérence baisse, et combien de souvenirs deviennent « faux », n'y
  sont pas ; texte entier non lu).
- **c1 : irrelevant**. **c2 : irrelevant**.
- **c3 : supports (souvenirs vifs d'un événement choquant ; niveau du groupe)** — c'est la première preuve du dossier sur
  des souvenirs de sa propre vie : la certitude reste quand le souvenir change. Deux bornes : « **souvent** faux » n'est
  pas chiffré dans le résumé ; et, pour le souvenir ordinaire, la certitude **a suivi** la baisse (la limite de l'écrivain
  le dit). Le résumé ne donne pas non plus la corrélation, personne par personne, entre certitude et cohérence.
- **c4 (hors champ)** : la soutient pour les souvenirs « flash ».
- **Fiche de l'écrivain** : f1, f2, f3 = mes phrases, même sens. **f1 surdit un peu** : « declined as much for the
  emotional memory as for the everyday one » transforme « did not differ » (absence de différence, sur environ 18 personnes
  par délai, sans test d'équivalence) en égalité ; écrire « declined for both, with no difference found ». f2 : « people
  stayed sure » = la certitude n'a pas baissé (le résumé ne dit pas qu'elle était haute) : acceptable. f3 fidèle ; rappeler
  que « accuracy » y veut dire cohérence. `limits` justes et bien choisies (dont la dernière, honnête pour c3).

---

## Travaux trouvés en vérifiant

- **Murphy, G. & Greene, C. M. (2025)**, « Who Got Lost in the Mall? Challenges in Counting and Classifying False
  Memories », *Applied Cognitive Psychology*, `10.1002/acp.70044` (réponse à Andrews & Brewin 2024, déjà citée dans les
  `limits` de la fiche ; vérifiée chez Crossref) : « two-thirds of our participants self-reported remembering (14%) or
  believing (52%) the fake event occurred » ; « even if the false memory rate was just 4%, that would still have
  significant theoretical and legal implications ». Débat ouvert, les deux côtés sont au dossier.

## Tableau final

| DOI | c1 détails trompeurs d'autrui (causal) | c2 faux souvenir d'enfance (causal) | c3 certitude ≠ exactitude |
|---|---|---|---|
| 10.1002/acp.70012 (Andrews 2024) | irrelevant | nuances (ampleur : jusqu'à 4 % au plus strict ; souvenirs peut-être vrais) | irrelevant |
| 10.1080/09658211.2024.2323935 (Bilgin 2024) | supports (tweets d'autrui ; 2 études ; reconnaissance) | irrelevant | irrelevant |
| 10.1080/09658211.2025.2551222 (Lindsay 2025) | irrelevant | irrelevant | contradicts (premier test propre, consensus des deux camps) / supports (conditions contaminées) ; rang bas |
| 10.1016/j.cognition.2012.07.009 (Oeberst 2012) | nuances (le rapport change, réversible ; le souvenir d'origine reste) | irrelevant | irrelevant |
| 10.1111/1467-9280.02453 (Talarico 2003) | irrelevant | irrelevant | supports (souvenirs « flash » de sa vie ; n = 54 ; cohérence, pas exactitude) |

## Lecture d'ensemble : ce que ces fiches changent (direction et plafond, `docs/verdict.md` §3)

**c1 — toujours soutenue ; certitude modérée.** Bilgin ajoute deux expériences indépendantes des précédentes, avec des
déclarations d'autres personnes (des tweets), dans deux groupes culturels : la direction se confirme. Deux nuances à
garder dans le dossier : l'effet porte plus sur les détails périphériques que centraux (Bilgin), et ce qui change est ce
que les gens **rapportent** : avec une procédure qui sépare le détail et sa source, l'effet peut disparaître même après
5 semaines (Oeberst). La formulation de c1 (« ce que les gens **disent** se rappeler ») est exactement la bonne ; « le
souvenir est remplacé » serait contredit par Oeberst. Bilgin (asiatiques **moins** trompés dans l'étude 2) s'ajoute à
Ito 2019 contre l'idée qu'une culture « collectiviste » serait plus facile à tromper : rien à en dire pour le public
arabe, sinon qu'aucun échantillon n'en vient.

**c2 — direction intacte (« certaines personnes ») ; l'ampleur baisse encore ; certitude basse pour tout chiffre d'un
« événement entier ».** Andrews & Brewin, d'un camp du débat, réanalysent la seule réplication préenregistrée : selon ce
qu'on exige, 35 %, 17 %, 11 % ou **4 %** ; et la moitié des « faux souvenirs » codés racontent peut-être une expérience
vraie, voisine. Les auteurs de la réplication répondent que la réanalyse est étroite et que même 4 % compte. Pour la
vidéo : « certains, une minorité » est défendable ; « un tiers » ne l'est pas pour « un souvenir entier, comme le sien » ;
une fourchette honnête va de quelques-uns sur cent (Andrews, le plus strict) à environ un sur dix (Murphy : 8 % complets
codés, 14 % déclarés), jusqu'à un sur cinq au plus large (Scoboria, complets + robustes).

**c3 — mêlée, vraie sous conditions ; certitude basse (inchangée), mais mieux appuyée.** Talarico comble la lacune de la
première relecture : pour un souvenir vif d'un événement choquant, la certitude reste alors que le souvenir change autant
qu'un souvenir ordinaire (au niveau du groupe, sur 54 étudiants, l'exactitude mesurée comme cohérence avec son propre
premier récit). Lindsay va dans l'autre sens pour la forme générale : les deux camps disent maintenant que la confiance
d'un premier test, dans de bonnes conditions, renseigne. Rien dans ces fiches ne chiffre « **souvent** faux ». Formulation
que le dossier permet : « un souvenir très vif d'un grand moment peut changer sans qu'on perde la certitude ; une
certitude fraîche, dans de bonnes conditions, vaut plus ; aucune n'est une preuve ». Les deux preuves les plus directes
pour c3 (Talarico, Spearing 2022) sont de rang modéré et vont dans le même sens **sous condition** (le temps qui passe) ;
la contradiction vient de rangs bas ou modérés sur un autre objet (Wixted & Wells, Lindsay : identifier un visage).

**c4 (hors champ)** : Oeberst et Lindsay la tempèrent (le souvenir d'origine survit souvent ; une certitude première a de
la valeur), Talarico la soutient pour les souvenirs « flash ». Elle ne peut pas être dite comme un résultat.

**Badge** (indication, la décision reste à l'écrivain et au propriétaire) : rien ne change : c3 dans le champ plafonne le
verdict à **basse** : ⚖️ (ou ❓), jamais ✅ ni ❌. Talarico permet maintenant une scène honnête sur un souvenir « flash »
(un grand moment, sans montrer la tragédie, comme le dit la limite), posée en question si elle sert de hook.

**Moyen-Orient / monde arabe.** Aucune des 5 fiches n'a d'échantillon arabe (`mena: false` partout, justifié ; Oeberst :
pays inconnu). « معظم الدراسات من أمريكا وأوروبا » est exact pour ces cinq (États-Unis, Irlande, chercheurs du Canada, des
États-Unis et du Royaume-Uni).

**Indépendance des preuves.** Andrews & Brewin = les auteurs de brewin-2017-childhood, et leur réanalyse porte sur les
données de murphy-2023-mall : trois fiches, deux camps, une seule étude source pour deux d'entre elles. Oeberst et
blank-2014-postwarning ont Blank en commun. Lindsay réunit les auteurs de wixted-2017-confidence et de
fitzgerald-2025-errors (et Wade, coauteure de Spearing, Scoboria et Ito) : ce n'est pas une preuve de plus, c'est leur
accord. Bilgin et Talarico sont indépendants du reste du dossier.

## Corrections demandées aux fiches

1. **andrews-2024-mall** : `coders-more` : la phrase d'appui est une phrase de contexte ; porter ce constat par
   murphy-2023-mall, ou citer au texte entier « 17 (40%) of the 43 with judged false memories self-reported they
   remembered it ». `possibly-true` : « la moitié **de ceux jugés porteurs d'un faux souvenir** » (22 sur 43 ; 31 % des 123).
   `limits` : codage des détails par les deux auteurs ensemble, juge aveugle sur 55 transcriptions (κ 0,49 à 0,91) ; taux
   par étapes 35 → 17 → 11 → 4 % (Discussion, texte entier).
2. **oeberst-2012-undoing** : mettre la procédure dans le **texte** de la constatation (« avec une explication et un test
   qui sépare le détail et sa source »), pas seulement dans les `limits`.
3. **talarico-2003-flashbulb** : f1 « declined as much » → « declined for both, with no difference found » (environ
   18 personnes par délai).
4. **lindsay-2025-consensus** : ajouter l'affirmation 4 (texte entier : « On first tests under favourable conditions,
   suspect IDs made with high confidence are more likely to be accurate… ») ; dire que « both sides » vient du texte
   entier.
5. **bilgin-2024-central** : `population` « two online studies » → « a simulated online setting » (sauf preuve au texte
   entier).

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `effect`, `n`, `designSetBy`, `limits` ; `declared` et `acknowledged` non lus. Dépôt
`/home/user/book-vs-science` : seul ce fichier a été créé (`reports/memory-rewritten/blind-review-2.md`) ; rien d'autre
modifié, aucune commande git.
