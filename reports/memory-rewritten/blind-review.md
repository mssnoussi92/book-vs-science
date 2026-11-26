# Relecture aveugle des sources — « memory-rewritten » (Manson, ch. 6 : nos souvenirs sont reconstruits et faciles à changer, donc tenons moins fort à nos certitudes)

Relu le 2026-11-23. Données récupérées par la session de relecture elle-même : Crossref `/works/<doi>`, Crossref
`/works?filter=updates:<doi>` (avis qui pointent vers l'article), OpenAlex `/works/doi:<doi>`, Europe PMC `search …
resultType=core` (`abstractText`). Réponses brutes :
`/tmp/claude-0/-home-user/e9ab4a67-13a8-57d8-b23f-018c726a3402/scratchpad/blind-memory/raw/` ; textes entiers :
`…/scratchpad/blind-memory/full/`.

Textes entiers lus en plus du résumé (signalé « (texte entier) ») : Brewin 2017 et Arce 2023 (PMC, version publiée) ;
Scoboria 2017, Ito 2019 et Spearing 2022 (versions acceptées, dépôt WRAP de Warwick) ; Murphy 2023 (prépublication
PsyArXiv `nh3zq`, fichier Word) ; Anakwah 2024 (version soumise, dépôt de Birmingham City University) ; et le résumé de
Andrews & Brewin 2024 (`10.1002/acp.70012`), la réanalyse de Murphy 2023. **Résumé seul** : Blank 2014, Steblay 2014,
Wixted 2017, Wiechert 2026 (accès fermé) et Fitzgerald 2025 (accès libre chez l'éditeur, mais le PDF de Taylor & Francis
refuse notre client : 403 ; non contourné).

Ordre de lecture des fiches (`content/sources/`) : d'abord `id`, `doi`, `mena`, `population`, `findings[].text` ; les
`support.sentence`, `kind`, `design`, `n`/`k`, `effect` et `limits` seulement après avoir lu chaque résumé et choisi ma
phrase. `declared` et `acknowledged` non lus. Dossier de l'écrivain (`scratchpad/dossiers/`) : **non ouvert**. Un seul
écart à signaler : en cherchant comment l'outil traite l'avis de Murphy 2023, j'ai ouvert
`murphy-2023-mall.verify.json` avant la fiche ; il ne contient pas les phrases d'appui (seulement « whole sentence of the
abstract; cues: result »), mais il dit que l'avis est « acknowledged ».

Affirmations :
- **c1** (causale) : une information trompeuse reçue après un événement (le récit d'un autre, une question orientée)
  change ce que les gens disent ensuite s'en rappeler.
- **c2** (causale) : une suggestion répétée peut amener certaines personnes à se rappeler, comme le leur, un événement
  entier d'enfance qui n'a jamais eu lieu.
- **c3** : même les souvenirs dont on est sûr sont bien moins fiables qu'on le croit : se sentir certain dit peu de
  chose sur le fait d'avoir raison.

**Avant tout : deux mots des affirmations décident du verdict.**
- **c2, « un événement entier »** : les études ne comptent pas la même chose. Brewin & Andrews distinguent trois
  niveaux (toute expérience de souvenir, images comprises : 47 % ; sans les images : 25 % ; souvenir avec confiance :
  15 %) ; Scoboria et al. comptent comme « faux souvenir » le partiel, le complet et le robuste (30 %), dont complet +
  robuste ≈ 22 % ; Murphy et al. codent 35 %, dont 8 % de souvenirs complets, et 14 % des gens disent eux-mêmes se
  souvenir. « Entier » et « comme le leur » renvoient aux chiffres du bas (≈ 8 à 22 %), pas à 30-35 %.
- **c3** a deux moitiés : « moins fiables **qu'on le croit** » (ce que les gens croient de leur mémoire n'est mesuré
  dans aucune étude du dossier) et « la certitude **dit peu** » (contredit pour un premier test frais et propre, soutenu
  après un délai, une confirmation, une suggestion ou une procédure biaisée). Je note les deux.

Vérification d'identité commune aux 12 DOI : titres, premiers auteurs et années concordent avec les `id` des fiches
(écarts d'un an tolérés entre mise en ligne et numéro : Brewin, en ligne 2016-04, numéro 2017 ; Scoboria, en ligne
2016-11, numéro 2017 ; Ito, 2018 chez OpenAlex, 2019 chez Crossref). OpenAlex `is_retracted: false` pour les 12.
Crossref `updated-by` absent et `filter=updates:` à 0 pour 11 d'entre eux ; **une exception, Murphy 2023** (voir n° 7).
Blank 2014 et Ito 2019 (JARMAC, passé d'Elsevier à l'APA) ont aussi chez OpenAlex un DOI Elsevier
(`10.1016/j.jarmac.2014.03.005`, `10.1016/j.jarmac.2018.09.004`) que Crossref ne connaît pas : sans effet.

---

## 1. 10.1037/xlm0001529 (wiechert-2026-misinformation)

- **Identité** : confirmée. « The misinformation effect: A contemporary replication and extension of Loftus et al.
  (1978) to investigate its underlying mechanisms. » Wiechert, S. (premier auteur ; Verschueren, Ben-Shakhar, Pertzov,
  Loftus, Verschuere), 2026, *Journal of Experimental Psychology: Learning, Memory, and Cognition* 52(7), 1225-1241.
  Ni correction ni rétractation.
- **Plan (relecteur)** : **trois expériences** en ligne (réplication de Loftus, Miller & Burns 1978, exp. 3 ; puis
  test à quatre choix avec mise de points ; puis ordre inversé). Information trompeuse manipulée. Plafond : modérée.
- **Population** : adultes en ligne ; ni taille ni pays dans le résumé (texte non accessible). Auteurs aux Pays-Bas, en
  Belgique, en Israël et aux États-Unis : **à vérifier dans le texte entier** si l'échantillon est israélien (question
  `mena` alors à trancher : Moyen-Orient, pas arabe). MENA : inconnu, `false` par défaut.
- **Résultat principal** : les témoins trompés rapportent moins souvent le bon panneau ; avec quatre choix et des
  points misés, l'effet reste mais plus petit ; la complaisance envers l'expérimentateur n'explique pas tout ;
  l'ordre inversé ne donne pas d'effet (en faveur d'un remplacement ou d'un blocage de la trace, « not definitively »).
- **Phrases du résumé** : « Misled participants reported the correct sign less often than controls. » — « With an
  identical procedure but a four-option memory test and confidence-based point betting, we still found the effect,
  though smaller. » — « Hence, demand effects are not the sole driver of the misinformation effect. » — conclusion :
  « …our studies confirmed memory's susceptibility to misinformation, showing a robust effect partly driven by demand
  effects and largely, though not definitively, explained by single-trace or blocking mechanisms. »
- **Taille d'effet** : pas dans le résumé.
- **c1 : supports** — causal, l'information trompeuse vient d'« autres témoins » (le récit d'un autre). Nuance : une
  part de l'effet est stratégique (dire ce qu'on croit attendu), pas un souvenir changé.
- **c2 : irrelevant**. **c3 : irrelevant** (la confiance sert de mise, pas de mesure étudiée).
- **Fiche de l'écrivain** : f1 et f3 = mes phrases, même sens. **f2 glisse** : le texte « part of it is people going
  along, not memory changing » est la *conclusion* des auteurs, pas ce que dit la phrase citée (qui dit seulement
  « plus petit ») ; et le passage d'un test binaire à quatre choix **plus** une mise change deux choses à la fois :
  l'effet plus petit peut venir du format du test. Citer la phrase de conclusion pour « partly driven by demand
  effects », ou réduire le texte à « l'effet reste, plus petit ». `limits` justes.

## 2. 10.1037/h0101833 (ito-2019-cowitness)

- **Identité** : confirmée. « Eyewitness memory distortion following co-witness discussion: A replication of Garry,
  French, Kinzett, and Mori (2008) in ten countries. » Ito, H. (premier auteur ; 18 coauteurs dont Wade, Lindsay,
  Mori), *Journal of Applied Research in Memory and Cognition* 8(1), 68-77 ; en ligne 2018, numéro 2019. Ni correction
  ni rétractation.
- **Plan (relecteur)** : **expérience répliquée dans 10 laboratoires** (paires de témoins qui ont vu deux versions d'un
  même film ; discussion ; test de reconnaissance individuel ; items discutés contre non discutés, intra-sujet).
  (Texte entier : **la seconde vague, 5 échantillons, était préenregistrée** sur OSF, mais « we neglected to complete the
  formal registration process until July 25, 2018 », après la collecte ; la première vague, non.) Ce n'est donc pas
  pleinement une « réplication multi-laboratoires préenregistrée » : plafond **modérée** (je ne monte pas à haute) ; la
  réplication dans 10 pays lève en revanche le doute d'incohérence.
- **Population** (texte entier) : 486 étudiants : Brésil 40, Canada 42, Colombie 40, Inde 40, Japon 40, Malaisie 64
  (**étudiants sino-malaisiens** du campus de Nottingham), Pologne 62, Portugal 40, **Turquie 60 (Université Koç,
  Istanbul)**, Royaume-Uni 58. **Aucun pays arabe.** La Turquie est rangée au Moyen-Orient par certaines classifications
  (la région « Middle East/North Africa » de Gallup l'inclut), pas par d'autres (Banque mondiale : Europe et Asie
  centrale) ; `mena: false` défendable, mais voir la conséquence sur la phrase d'applicabilité plus bas.
- **Résultat principal** : dans chacun des 10 pays, on rapporte au test final des détails non vus que le partenaire
  avait dits, surtout quand on ne l'a pas contesté.
- **Phrases du résumé** : « Each of the 10 samples replicated the Garry et al. finding: Participants often reported on
  the final test a non-witnessed answer that their co-witness had stated during the collaboration phase. » — « Such
  co-witness suggestibility errors were especially likely when the witness had not disputed the co-witness's report
  during the collaboration phase. » — « The results demonstrate the replicability and generalizability of the co-witness
  suggestibility effect. »
- **Taille d'effet** : pas dans le résumé. (Texte entier : écart de bonnes réponses entre items non discutés et discutés
  de 34 % (Colombie) à 64 % (Japon) ; g de Hedges combiné 1,70 [1,40 ; 1,99] (1,67 avec l'étude originale) ; réponse du
  partenaire non contestée reprise au test final dans 626 cas sur 708 (88,4 %), contestée dans 1 cas sur 58 (1,8 %).)
  Texte entier aussi : les auteurs écartent une lecture « culture collectiviste » : la Colombie, la plus collectiviste de
  l'échantillon, a l'un des plus petits effets.
- **c1 : supports** — causal (items discutés contre non discutés), le récit d'un autre. Mesure : un test de
  reconnaissance le jour même, sur des détails d'un film.
- **c2 : irrelevant**. **c3 : irrelevant**.
- **Fiche de l'écrivain** : f1, f2, f3 = mes phrases, même sens ; textes fidèles. **Une limite est inexacte** : « not
  described as preregistered in the abstract » est vrai du résumé, mais le texte entier dit la seconde vague
  préenregistrée (enregistrement formel achevé après coup) ; le classement « experiment » reste le bon. Ajouter les
  chiffres ci-dessus (34-64 %, 88 %) si on veut un ordre de grandeur, et la remarque des auteurs sur la culture, qui
  tempère Anakwah 2024 (n° 3).

## 3. 10.1002/acp.4243 (anakwah-2024-culture)

- **Identité** : confirmée. « A Cross-Cultural and Intra-Cultural Investigation of the Misinformation Effect in
  Eyewitness Memory Reports. » Anakwah, N. (premier auteur ; Horselenberg, Hope, Amankwah-Poku, van Koppen), 2024,
  *Applied Cognitive Psychology* 38(5). Accès libre. Ni correction ni rétractation. (Texte lu : la version soumise.)
- **Plan (relecteur)** : **deux plans dans une étude**. L'effet de l'information trompeuse est une **expérience
  intra-sujet** (items trompés contre items contrôles ; texte entier) : modérée. La comparaison des deux cultures est une
  **comparaison de groupes non assignés** (transversale) : basse. Les deux phrases de la fiche portent sur la culture.
- **Population** : 127 étudiants, Ghana 65, Royaume-Uni 62. (Texte entier, note 5 : sur l'échelle de construal de soi,
  les deux groupes **ne diffèrent ni en individualisme ni en collectivisme** (d = 0,21 et 0,01) ; « collectiviste »
  repose sur l'indice de Hofstede des pays, pas sur une mesure des participants.) MENA : non.
- **Résultat principal** : pas de différence de culture en rappel libre ; en reconnaissance, les Ghanéens acceptent
  plus d'items trompeurs.
- **Phrases du résumé** : « Cultural differences in misinformation endorsement were not observed in free recall. » —
  « However, participants from the collectivistic culture endorsed more misleading items in the recognition task than
  those from the individualistic culture. » — « These findings provide preliminary insights… »
- **Taille d'effet** : pas dans le résumé. (Texte entier : effet de l'information trompeuse en reconnaissance,
  ηp² = 0,25 (détails centraux) et 0,32 (détails d'arrière-plan) ; effet de la culture ηp² = 0,04 ; l'interaction
  culture × information trompeuse n'est significative que pour l'arrière-plan (ηp² = 0,06 ; écart trompé − contrôle
  0,75 au Ghana, 0,34 au Royaume-Uni), **pas pour les détails centraux** (p = 0,074). **En rappel libre, 18 % seulement
  des participants rapportent au moins un détail trompeur** (Ghana 20 %, Royaume-Uni 16 %).)
- **c1 : supports** — mais par le texte entier (le résumé ne donne pas l'effet principal de l'information trompeuse) ;
  nuance d'ampleur utile : fort en reconnaissance (choix proposés), faible en rappel libre (avec ses propres mots).
- **c2 : irrelevant**. **c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; `kind: association` juste. Ajouter aux `limits` la
  note 5 (la mesure individuelle de la culture ne sépare pas les groupes), l'interaction non significative pour les
  détails centraux, et les 18 % en rappel libre. Pour un public arabe, cette étude ne permet pas de dire « chez nous ce
  serait plus fort » : un seul pays par culture, culture non mesurée chez les participants, et Ito 2019 ne trouve pas le
  motif collectiviste.

## 4. 10.1037/h0101798 (blank-2014-postwarning)

- **Identité** : confirmée. « How to protect eyewitness memory against the misinformation effect: A meta-analysis of
  post-warning studies. » Blank, H. (premier auteur ; Launay), 2014, *Journal of Applied Research in Memory and
  Cognition* 3(2), 77-88. Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse** de 25 expériences (155 tailles d'effet) où un avertissement est donné après
  l'information trompeuse. Plafond : haute **pour l'effet de l'avertissement** ; pour c1, indirect.
- **Population** : participants des 25 études ; pays non donnés. MENA : non connu.
- **Résultat principal** : l'avertissement réduit l'effet de l'information trompeuse à moins de la moitié, en relevant
  les réponses trompées sans coût pour les réponses contrôles.
- **Phrases du résumé** : « Key findings were that (1) post-warnings are surprisingly effective, reducing the
  misinformation effect to less than half of its size on average. » — « (3) The post-warning reduction in the
  misinformation effect reflects a specific increase in misled performance (relative to no warning), at negligible cost
  for control performance. » La phrase qui dit l'effet lui-même (« Four decades of research and hundreds of studies
  speak to the power of post-event misinformation… ») est une phrase de **contexte** : elle ne peut pas porter c1.
- **Taille d'effet** : « less than half » seulement.
- **c1 : supports (indirect)** — l'effet existe dans les conditions sans avertissement des 25 études (c'est ce que
  l'avertissement réduit), et il reste une part après avertissement ; mais l'ampleur de l'effet n'est pas estimée dans le
  résumé. Apport utile à c1 : la moitié de l'effet disparaît quand on prévient, signe que le souvenir d'origine reste
  souvent accessible ; « change ce qu'on rapporte » est juste, « efface le souvenir » serait trop dire.
- **c2 : irrelevant**. **c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; textes fidèles ; la première limite (l'effet est
  supposé, pas estimé) est **juste et importante**.

## 5. 10.1080/09658211.2016.1260747 (scoboria-2017-implantation)

- **Identité** : confirmée. « A mega-analysis of memory reports from eight peer-reviewed false memory implantation
  studies. » Scoboria, A. (premier auteur ; Wade, Lindsay, Azad, Strange, Ost, Hyman), *Memory* 25(2), 146-163 ; en
  ligne 2016-11-28. Ni correction ni rétractation.
- **Plan (relecteur)** : **méga-analyse** : les transcriptions individuelles de 8 études d'implantation recodées avec une
  même grille, par des paires de juges indépendants (accord initial 72 à 100 % selon l'item). Rangée avec les
  méta-analyses : plafond haute ; **risque de biais** : 8 études sur 12 publiées (transcriptions perdues pour 4), et
  plusieurs coauteurs sont les auteurs des études recodées.
- **Population** (texte entier) : 423 étudiants (Canada, Nouvelle-Zélande, États-Unis, Royaume-Uni), 71 % de femmes,
  âge moyen 20,7 ans. Événements suggérés : ennuis avec un enseignant, tour en montgolfière, bol de punch renversé à un
  mariage, et un parmi huit (Ost 2005). MENA : non.
- **Résultat principal et définition** (texte entier) : critère minimal d'un faux souvenir = acceptation **modérée** de
  l'événement **plus** un peu d'élaboration **et** un peu d'imagerie. Trois niveaux : partiel 8,5 %, **complet** 10,8 %
  (acceptation, élaboration et imagerie modérées), **robuste** 11,1 % (acceptation forte) ; total 30,5 % (30,4 % dans le
  résumé). Les auteurs écrivent : « Combining the full and robust categories would be similar to the full memories from
  earlier studies » → **≈ 22 %**. 23 % de plus acceptent l'événement sans souvenir ; 10,4 % ont une représentation forte
  mais disent ne pas se souvenir (comptés « rejetés ») ; 36,2 % rien. Le jugement est celui des codeurs ; 91 % des
  complets/robustes disent « je me souviens ».
- **Phrases du résumé** : « Using this scheme, 30.4% of cases were classified as false memories and another 23% were
  classified as having accepted the event to some degree. » — « When the suggestion included self-relevant information,
  an imagination procedure, and was not accompanied by a photo depicting the event, the memory formation rate was
  46.1%. »
- **Taille d'effet** : pourcentages. (Texte entier : 46,1 % [36 ; 56] sur **3 études, N = 89**, contre 26,3 % [22 ; 31]
  ailleurs.)
- **c1 : irrelevant**.
- **c2 : supports** — pour une minorité ; « événement entier » ≈ 22 % (complet + robuste), pas 30 %.
- **c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. **Texte de f1 à préciser** : « about 30% … developed a
  false memory » est fidèle au résumé, mais ce 30 % **inclut les souvenirs partiels** ; pour c2 (« entier »), dire « près
  d'un sur cinq » (complet + robuste) et citer la phrase du texte entier. f2 : préciser que 46 % vient de 3 études et
  89 personnes. `limits` : remplacer « countries … not given (full text not read) » par les quatre pays et « étudiants » ;
  la discussion attaque nommément Brewin & Andrews (« an example of what should not be done ») : les deux camps sont au
  dossier, c'est bien.

## 6. 10.1002/acp.3220 (brewin-2017-childhood)

- **Identité** : confirmée. « Creating Memories for False Autobiographical Events in Childhood: A Systematic Review. »
  Brewin, C. R. (premier auteur ; Andrews), *Applied Cognitive Psychology* 31(1), 2-23 ; en ligne 2016-04-08. Accès
  libre. Ni correction ni rétractation. Débat publié vérifié chez Crossref : Nash et al. « Misrepresentations and Flawed
  Logic About the Prevalence of False Memories » (`10.1002/acp.3265`), Otgaar et al. « The Potential for False Memories is
  Bigger than What Brewin and Andrews Suggest » (`10.1002/acp.3262`), McNally (`10.1002/acp.3268`), réponse d'Andrews &
  Brewin (`10.1002/acp.3285`).
- **Plan (relecteur)** : **revue systématique** (Web of Science, Current Contents, MEDLINE, puis recherche à la main ;
  extraction par les deux auteurs, recoupée) ; **pas de méta-analyse, par choix** (moyennes pondérées sur les mesures
  d'origine). Plafond : haute. Les auteurs sont d'un camp du débat.
- **Population** (texte entier) : 61 études au total ; pour l'implantation, **22 jeux de données dans 20 articles** ;
  « the vast majority … conducted with young adults in mainly college student populations ». Pays non comptés par moi.
  MENA : non.
- **Résultat principal et définition** (texte entier, tableau 4) : colonne 5, **toute** expérience de souvenir, images,
  souvenirs vagues, partiels et spéculations compris : moyenne pondérée 47,00 % (médiane 34 %) ; colonne 6, sans les
  images non vécues comme souvenirs : 25,45 % (médiane 16 %) ; colonne 7, la plus stricte, « some evidence for both
  recollective experience and confidence in memory » : **15,35 %** (médiane 12-15 %, de 3 à 26 % selon l'étude),
  calculée sur les seules études dont la grille le permet. Et : « the upper bound would seem to be about 15% … the actual
  figure may be lower », parce que les participants se jugent moins souvent porteurs d'un souvenir que les codeurs ne
  le font (Otgaar 2013 : 20 % contre 36 %).
- **Phrases du résumé** : « In memory implantation studies, some recollective experience for the suggested events is
  induced on average in 47% of participants, but only in 15% are these experiences likely to be rated as full
  memories. » — « We conclude that susceptibility to false memories of childhood events appears more limited than has
  been suggested. » — « Imagination inflation and false feedback studies increase the belief that a suggested event
  occurred by a small amount such that events are still thought unlikely to have happened. »
- **Taille d'effet** : pourcentages (ci-dessus).
- **c1 : irrelevant**.
- **c2 : supports (minorité) / nuances (ampleur)** — la direction n'est pas contredite (il y a bien des faux souvenirs
  complets) ; ce que la revue conteste, c'est l'ampleur : au plus ~15 % pour un souvenir « complet ».
- **c3 : irrelevant** (la confiance n'y est qu'un critère du souvenir).
- **Fiche de l'écrivain** : f1, f2, f3 = mes phrases, même sens ; textes fidèles. **Réponse à la question 30 % contre
  15 %** : ce n'est pas une contradiction de données mais de définition. Scoboria compte partiel + complet + robuste
  (30 %) et ses « complets » n'exigent pas de confiance déclarée ; Brewin n'appelle « complet » qu'un souvenir avec
  expérience de souvenir **et** signe de confiance (15 %). À définition proche (complet + robuste de Scoboria), l'écart
  tombe à ~22 % contre ~15 %, sur des ensembles d'études différents (8 contre ~22). Les deux camps sont d'accord sur le
  fait qu'une minorité forme un souvenir détaillé. `limits` : remplacer « number of studies … not read » par 22 jeux de
  données / 20 articles, étudiants surtout ; la limite « authors' own reading » est juste.

## 7. 10.1080/09658211.2023.2198327 (murphy-2023-mall)

- **Identité** : confirmée. « Lost in the mall again: a preregistered replication and extension of Loftus & Pickrell
  (1995). » Murphy, G. (premier auteur ; Dawson, Huston, Ballantyne, Barrett, Cowman, Fitzsimons, Maher, Ryan, Greene),
  *Memory* 31(6), 818-830 ; en ligne 2023-04-05. OpenAlex `is_retracted: false`.
- **Avis** : Crossref `updated-by` : **un avis de type « correction »**, `10.1080/09658211.2023.2226567`, « Notice of
  duplicate publication », *Memory* 31(8), p. 1111, 2023-06-26 (texte de l'avis non lisible au-delà du titre). Europe PMC
  éclaire : l'avis porte « Retraction of » le PMID 37312574, **une copie en double publiée le 2023-06-13 sous le DOI
  `10.1080/09658211.2023.2198263`**, que PubMed marque « Retracted Publication » et OpenAlex `is_retracted: true`. **Notre
  DOI est la version gardée**, non rétractée. Conséquence pour l'outil : la revérification hebdomadaire doit continuer à
  lire l'avis comme une erreur d'édition, et ne jamais citer `…2198263`.
- **Plan (relecteur)** : **réplication directe préenregistrée**, un seul groupe (pas de groupe contrôle ; comparaison
  intra-sujet avec trois vrais souvenirs ; la fausseté est garantie par un proche). L'exposition (la suggestion) est
  manipulée. Plafond : modérée.
- **Population** (texte entier) : 123 adultes recrutés par des étudiants de l'University College Cork et de
  l'University College Dublin, **Irlande**, surtout dans leurs réseaux personnels ; 18-57 ans (moyenne 25,5) ; 81 femmes ;
  entretiens par vidéo (COVID). MENA : non.
- **Résultat principal** (texte entier) : faux souvenir codé : 15 % au livret, 19 % au premier entretien, **35 % au
  second (33 partiels + 10 complets)**, soit **8 % de souvenirs complets** ; auto-déclaration finale : **14 %** disent se
  souvenir, 52 % de plus croient que c'est arrivé sans s'en souvenir. Accord entre codeurs κ = 0,60 ; entre auto-déclaration
  et codage κ = 0,46. Les auteurs : « most that did so only formed a ‘partial’ false memory » et « it could be argued that
  the false memory rate observed in this study may be closer to 14% ». 3 personnes ont peut-être un vrai souvenir ; sans
  elles, 33 %.
- **Phrases du résumé** : « We replicated the findings of the original study, coding 35% of participants as reporting a
  false memory for getting lost in a mall in childhood (compared to 25% in the original study). » — « In an extension,
  we found that participants self-reported high rates of memories and beliefs for the fabricated event. »
- **Réanalyse** (résumé de Andrews & Brewin 2024, `10.1002/acp.70012`, non au dossier) : en moyenne moins de 2 des 6
  détails centraux suggérés rappelés ; « 20% with full and 58% with partial false memories did not recall being lost » ;
  la moitié décrit des expériences peut-être vraies, distinctes de l'événement suggéré.
- **c1 : irrelevant**.
- **c2 : supports (minorité)** — et le seul appui direct sur « **répétée** » : le taux monte à chaque entretien
  (15 → 19 → 35 %). Pour « entier » et « comme le leur » : 8 % (complet codé), 14 % (auto-déclaré).
- **c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. **f1 : le texte est fidèle au résumé, mais 35 % ne doit
  pas porter « un événement entier »** : c'est 8 % (complet) ou 14 % (ce que les gens disent eux-mêmes). **f2 surdit
  « high rates of memories »** : c'est la phrase des auteurs, mais elle mêle souvenirs et croyances ; écrire « 14 % ont dit
  s'en souvenir, et 52 % de plus le croyaient sans s'en souvenir ». `limits` justes (réanalyse, Irlande, copie en double).

## 8. 10.1016/j.ijchp.2023.100386 (arce-2023-implanting)

- **Identité** : confirmée. « Implanting rich autobiographical false memories: Meta-analysis for forensic practice and
  judicial judgment making. » Arce, R. (premier auteur ; Selaya, Sanmarco, Fariña), 2023, *International Journal of
  Clinical and Health Psychology* 23(4), 100386. Accès libre (PMC10126919). Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse** (30 études, 35 à 38 tailles d'effet, N = 1 901 ; Web of Science, Scopus,
  PsycInfo jusqu'en décembre 2022 ; Hunter-Schmidt « bare-bones »). Plafond nominal haute ; **mais sa mesure ne compare
  pas deux groupes** (voir plus bas), et toutes les études primaires sont des simulations de laboratoire.
- **Population** : enfants et adultes ; pays non listés (auteurs en Espagne). MENA : non connu.
- **Ce que mesure le d** (texte entier) : « the effect sizes were calculated with Cohen's h … contrasting the observed
  probabilities of implanted memory with a constant ». **d = 1,43 compare la proportion de faux souvenirs à zéro** :
  c'est un test d'existence, pas une taille d'effet au sens habituel. Contre une proportion de 0,5 : h = −0,07
  [−0,16 ; 0,02], non significatif ; les auteurs : « In short, the probability of implanting false memories was 50% i.e.,
  a common effect », mais non généralisable (intervalle de crédibilité −0,48 à 0,34 : selon les études, nettement moins
  ou plus que 50 %). Calcul du relecteur (conversion inverse de h, approximative car moyenne de h et non de p) : taux
  moyen ≈ 43 à 47 %, soit **le même ordre que les 47 % « toute expérience de souvenir » de Brewin**. Les auteurs
  eux-mêmes : « the effect sizes observed were so extraordinarily high that it was highly probable they had been
  overestimated », et leurs plans ne distinguent pas un vrai souvenir d'une réponse sous pression sociale.
- **Phrases du résumé** : « The results revealed a significant, positive, generalizable (the lower limit for the 80%
  credibility value was d = 1.13), and more than large mean effect size (d = 1.43[1.33, 1.53]) for the implanting of
  false memory. » — « A similar effect for memory implantation was observed in both the underage (d = 1.44[1.29, 1.59]),
  and in adults (d = 1.36[1.22, 1.50]). »
- **c1 : irrelevant**.
- **c2 : supports (existence seulement)** — ne dit rien de « entier » : la proportion compte les souvenirs « riches »
  tels que chaque étude primaire les a codés, et l'ensemble mêle récits faux, photos truquées et vrais événements.
- **c3 : irrelevant**.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases. **Le texte de f1 surdit** : « succeeded with a large and
  generalizable average effect » laisse lire « l'implantation marche fort » ; ce qui est établi, c'est « des faux souvenirs
  apparaissent dans toutes les études, en moyenne chez environ la moitié des participants selon le codage de chaque
  étude, très variable ». **Danger mécanique** : `effect: {metric: "d", value: 1.43}` sera mis en mots par le shell avec
  les seuils de Cohen (« كبير ») alors que la limite écrite dit « never shown as « large » on screen » : la limite ne
  suffit pas, il faut retirer ce `effect` (ou lui donner une métrique qui n'est pas une différence de groupes). f2 : `kind:
  causal` est faux pour la comparaison enfants/adultes (l'âge n'est pas manipulé) : `association`. Les `limits` sont
  justes.

## 9. 10.1177/1529100616686966 (wixted-2017-confidence)

- **Identité** : confirmée. « The Relationship Between Eyewitness Confidence and Identification Accuracy: A New
  Synthesis. » Wixted, J. T. (premier auteur ; Wells), *Psychological Science in the Public Interest* 18(1), 10-65 ; en
  ligne 2017-03-22. Ni correction ni rétractation.
- **Plan (relecteur)** : **revue narrative** (synthèse de deux chercheurs, sans recherche systématique décrite dans le
  résumé). Plafond : basse.
- **Population** : témoins adultes, études de laboratoire (faux crimes) et études de terrain de polices ; cadre
  américain. MENA : non.
- **Résultat principal** : dans des conditions « pristine », confiance et exactitude sont fortement liées et une
  identification très confiante est remarquablement exacte ; hors de ces conditions, même une identification très
  confiante est sérieusement compromise.
- **Phrases du résumé** : « Under those conditions, mock-crime studies and police department field studies have
  consistently shown that, for adults, (a) confidence and accuracy are strongly related and (b) high-confidence suspect
  identifications are remarkably accurate. » — « However, when certain non-pristine testing conditions prevail (e.g.,
  when unfair lineups are used), the accuracy of even a high-confidence suspect ID is seriously compromised. » — et la
  réserve : « our conclusions about the reliability of high-confidence identifications cannot yet be applied to those
  jurisdictions ».
- **Réponse à la question posée** : **oui, seulement en conditions « pristine »**, et le résumé les définit : « initial,
  uncontaminated memory tests using fair lineups, with no lineup administrator influence, and with an immediate
  confidence statement » ; pour des **adultes** ; pour des **identifications du suspect** dans une parade (reconnaître
  un visage), pas pour le rappel d'un événement ni pour un souvenir de sa vie. Le résumé ajoute que la confiance informe
  dans les deux sens : « initial, low-confidence suspect identifications are error prone ». Il ne donne aucun chiffre
  (« remarkably accurate » est un adjectif) ; le texte entier n'a pas été lu.
- **c1 : irrelevant**.
- **c2 : irrelevant**.
- **c3 : contradicts (premier test propre) / supports (conditions non « pristine »)** — c'est la preuve qui interdit de
  dire « se sentir certain dit peu » en général.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens. Texte de f1 fidèle (« blind administrator » ≈ « no lineup
  administrator influence »). `design: narrative-review` juste. `limits` justes ; « contested » : Fitzgerald 2025 est au
  dossier, Berkowitz 2020 ne l'est pas (non vérifié ici).

## 10. 10.1080/09658211.2025.2546919 (fitzgerald-2025-errors)

- **Identité** : confirmée. « Error rates for high confidence eyewitness identifications. » Fitzgerald, R. J. (premier
  auteur ; Hyman, Wade), *Memory* 33(9), 1041-1053 ; en ligne 2025-08-19. Accès libre (CC BY-NC-ND). Ni correction ni
  rétractation.
- **Plan (relecteur)** : **article de synthèse avec une méta-analyse nouvelle de données de terrain** (observationnelles)
  et un rappel non systématique de données de laboratoire. Pour f1 (terrain) : méta-analyse, plafond haute ; pour f2
  (laboratoire) : revue narrative, basse. Nombre d'études non lu (texte entier refusé à notre client).
- **Population** : témoins de vraies enquêtes, parades menées en aveugle ; pays non donnés. MENA : non connu.
- **Résultat principal** : sur le terrain, en aveugle, 1 identification très confiante sur 8 désigne un figurant
  (erreur connue) ; au laboratoire, de 0 à 40 % d'erreurs selon le biais contre le suspect.
- **Phrases du résumé** : « This analysis shows that when eyewitnesses were tested in the field by a blind lineup
  administrator, 1/8 of the high confidence identifications were known errors, i.e., mistaken identifications of lineup
  fillers. » — « Our claim is also supported by lab data, which show that error rates for high-confidence identifications
  of the suspect can range from 0 to 40%, depending on the level of bias against the suspect. »
- **Taille d'effet** : 1/8 (12,5 %) est un **plancher** (les erreurs sur un suspect innocent ne se voient pas sur le
  terrain) ; 7 sur 8 ne sont pas des erreurs connues.
- **c1 : irrelevant**.
- **c2 : irrelevant**.
- **c3 : nuances** — soutient « une grande certitude n'est pas une garantie, même avec une parade en aveugle » ; ne
  soutient pas « la certitude dit peu ». Répond directement à Wixted & Wells : même champ, conclusion opposée sur les
  données de terrain (incohérence entre les deux camps).
- **Fiche de l'écrivain** : f1 = ma phrase, même sens, texte fidèle. **f2 : le texte perd « of the suspect »** (« error
  rates of high-confidence identifications ») : écrire « identifications du suspect », sinon on mélange avec le 1/8 qui
  compte les figurants. `limits` justes (plancher, visages d'inconnus).

## 11. 10.1037/mac0000014 (spearing-2022-retention)

- **Identité** : confirmée. « Long retention intervals impair the confidence–accuracy relationship for eyewitness
  recall. » Spearing, E. R. (premier auteur ; Wade), 2022, *Journal of Applied Research in Memory and Cognition* 11(3),
  384-391. Ni correction ni rétractation.
- **Plan (relecteur)** : **expérience préenregistrée** (texte entier : « This study was pre-registered », OSF `sgb4z`),
  délai assigné au hasard (immédiat, 1 semaine, 1 mois), rappel indicé de détails d'une vidéo de faux crime, confiance de
  0 à 100 %. Plafond : modérée.
- **Population** (texte entier) : 611 adultes recrutés sur MTurk (CloudResearch), 18-83 ans (moyenne 42,8) ; pays non
  précisé dans le texte lu. MENA : non.
- **Résultat principal** : après un mois, mémoire moins exacte, confiance plus basse et lien confiance-exactitude
  affaibli ; les très confiants sont trop confiants. (Texte entier : « when long-delay participants reported being
  80-100% confident, their memory reports were only accurate, on average, 60-70% of the time. Participants who completed
  the memory test immediately or after a short delay did not show this pattern » ; ailleurs, calibration semblable selon
  le délai, sous-confiance aux faibles niveaux.)
- **Phrases du résumé** : « Long (1 month) delays led to lower memory accuracy, lower confidence judgements, and
  impaired the confidence-accuracy relationship compared to shorter (immediate and 1 week) delays. » — « Long-delay
  participants who reported very high levels of confidence tended to be over-confident in the accuracy of their memories
  compared to other participants. »
- **c1 : irrelevant**.
- **c2 : irrelevant**.
- **c3 : supports (après un délai) / contradicts (frais)** — c'est la meilleure preuve du dossier pour c3 hors des
  parades : rappel de détails, adultes de tous âges ; elle dit aussi que, tout de suite ou à une semaine, la certitude
  élevée ne trompait pas ainsi.
- **Fiche de l'écrivain** : f1 et f2 = mes phrases, même sens ; textes fidèles ; `kind: causal` acceptable (le délai est
  manipulé). `limits` : remplacer « countries not given » par « MTurk, préenregistrée, assignation au hasard » ; ajouter
  le chiffre 80-100 % → 60-70 %, utilisable s'il est cité au texte entier.

## 12. 10.1037/law0000001 (steblay-2014-feedback)

- **Identité** : confirmée. « The eyewitness post identification feedback effect 15 years later: Theoretical and policy
  implications. » Steblay, N. K. (premier auteur ; Wells, Douglass), 2014, *Psychology, Public Policy, and Law* 20(1),
  1-18. Ni correction ni rétractation.
- **Plan (relecteur)** : **méta-analyse d'expériences** (la confirmation est manipulée). Plafond : haute pour « une
  confirmation gonfle les jugements rétrospectifs » ; indirect pour c3.
- **Population** : environ 7 000 participants, États-Unis, Canada, Europe, Australie. MENA : non.
- **Résultat principal** : une confirmation (« vous avez désigné le suspect ») gonfle les jugements rétrospectifs des
  témoins (certitude, qualité de la vue, attention…), avec de grands effets.
- **Phrase du résumé** : « The results show that confirming feedback robustly inflates eyewitnesses' retrospective
  judgments across experimental manipulations and laboratory settings with large effect sizes. » (Le résumé définit ces
  jugements : « retrospective reports of certainty, view, attention, and other judgments ».)
- **Taille d'effet** : « large » sans chiffre dans le résumé.
- **c1 : nuances (indirect)** — une information reçue après coup change ce que le témoin dit de son expérience (sa vue,
  son attention, sa certitude), pas le contenu de l'événement.
- **c2 : irrelevant**.
- **c3 : supports (sous condition)** — une certitude dite **après** une confirmation n'est plus un signal de mémoire ;
  c'est la condition « non pristine » de Wixted & Wells (Wells est coauteur des deux : pas de contradiction entre eux).
- **Fiche de l'écrivain** : ma phrase, même sens. **Léger rétrécissement** : le texte dit « how certain they later say
  they were, with large effects », alors que « large effect sizes » vaut pour l'ensemble des jugements rétrospectifs ; le
  résumé ne dit pas que l'effet sur la certitude seule est grand. Écrire « gonfle la certitude et les autres jugements
  rétrospectifs ». `limits` justes.

---

## Tableau final

| DOI | c1 information trompeuse (causal) | c2 faux souvenir d'enfance (causal) | c3 certitude ≠ exactitude |
|---|---|---|---|
| 10.1037/xlm0001529 (Wiechert 2026) | supports (en partie stratégique) | irrelevant | irrelevant |
| 10.1037/h0101833 (Ito 2019) | supports (10 pays) | irrelevant | irrelevant |
| 10.1002/acp.4243 (Anakwah 2024) | supports (texte entier ; faible en rappel libre) | irrelevant | irrelevant |
| 10.1037/h0101798 (Blank 2014) | supports (indirect) | irrelevant | irrelevant |
| 10.1080/09658211.2016.1260747 (Scoboria 2017) | irrelevant | supports (30 % avec partiels ; ~22 % complets) | irrelevant |
| 10.1002/acp.3220 (Brewin 2017) | irrelevant | supports (minorité) / nuances (≤ 15 % complets) | irrelevant |
| 10.1080/09658211.2023.2198327 (Murphy 2023) | irrelevant | supports (8 % complets, 14 % déclarés ; monte avec la répétition) | irrelevant |
| 10.1016/j.ijchp.2023.100386 (Arce 2023) | irrelevant | supports (existence ; « grand d » trompeur) | irrelevant |
| 10.1177/1529100616686966 (Wixted 2017) | irrelevant | irrelevant | contradicts (premier test propre) / supports (non pristine) |
| 10.1080/09658211.2025.2546919 (Fitzgerald 2025) | irrelevant | irrelevant | nuances (pas une garantie ; 1/8 plancher) |
| 10.1037/mac0000014 (Spearing 2022) | irrelevant | irrelevant | supports (après 1 mois) / contradicts (frais) |
| 10.1037/law0000001 (Steblay 2014) | nuances (indirect) | irrelevant | supports (après confirmation) |

## Lecture d'ensemble (direction et plafond de certitude par affirmation, `docs/verdict.md` §3)

**c1 — soutenue ; certitude modérée.** Quatre expériences où l'information trompeuse est manipulée vont dans le même
sens (Wiechert, Ito dans 10 pays, Anakwah au texte entier), plus la méta-analyse de Blank, qui suppose l'effet et
mesure qu'un avertissement le réduit de plus de moitié. Plafond : **modérée** en lecture stricte (Ito n'est
préenregistrée qu'à moitié et après coup ; Blank n'estime pas l'effet lui-même dans son résumé) ; un relecteur plus
large pourrait partir de haute avec Ito et Blank, et descendre d'un cran pour le caractère indirect : on arrive au même
point. Raisons de ne pas monter : tout est au laboratoire, sur des détails d'un film vu par des étudiants, testé le jour
même ou peu après ; l'effet est fort en reconnaissance (choix proposés) et faible en rappel libre (Anakwah : 18 % des
gens rapportent au moins un détail faux) ; une part est stratégique (Wiechert) et l'avertissement en efface la moitié
(Blank). La formulation de c1, « change ce que les gens **disent** se rappeler », est la bonne ; « change le souvenir
lui-même » serait trop dire. « Le récit d'un autre » est testé (Ito, Wiechert) ; **« une question orientée » ne l'est
dans aucun résumé du dossier** : ne pas la jouer en scène comme un résultat, ou ajouter une source qui la teste.

**c2 — soutenue pour une minorité ; certitude modérée pour « certains peuvent », basse pour tout chiffre d'« événement
entier ».** Plafond haute (revue systématique de Brewin, méga-analyse de Scoboria, méta-analyse d'Arce), descendu d'un
cran pour l'incohérence des taux (de 8 % à 46 % selon la définition et la procédure), le risque de biais (jugement des
codeurs contre celui des participants ; vrais souvenirs possibles, Murphy et la réanalyse d'Andrews & Brewin 2024 ;
sélection des études chez Scoboria) et le caractère indirect (étudiants de quatre ou cinq pays occidentaux, événements
bénins et plausibles). Personne ne contredit la direction : même les critiques (Brewin & Andrews) trouvent des faux
souvenirs complets ; le désaccord porte sur combien. **Chiffres honnêtes pour « un événement entier, comme le sien »** :
environ 1 sur 10 à 1 sur 5 (Murphy : 8 % complets codés, 14 % déclarés ; Brewin : ≤ 15 %, peut-être moins ; Scoboria :
~22 % complets + robustes). 30-35 % comptent les souvenirs partiels ; 47 % (et le « ~50 % » d'Arce) comptent toute
image ou spéculation. « Répétée » est appuyé par Murphy (15 → 19 → 35 % d'un entretien à l'autre) et par la procédure
même des études (deux ou trois entretiens, imagination guidée, autorité d'un parent). Arce ne doit pas servir à dire
« un effet énorme » (son d compare à zéro).

**c3 — mêlée (vraie sous conditions) ; certitude basse.** La règle de §3 interdit « soutient » pour la formulation
générale : Spearing (expérience, rang modéré) montre une certitude élevée qui ne trompe pas ainsi quand le test est
immédiat ou à une semaine, et Wixted & Wells (revue narrative) disent la certitude initiale fortement liée à
l'exactitude en conditions propres. Ce qui est soutenu : la certitude **perd sa valeur** après un délai (Spearing : 80-100 %
de confiance, 60-70 % d'exactitude après un mois), après une confirmation (Steblay, méta-analyse), avec une procédure
biaisée (Wixted & Wells, Fitzgerald : 0-40 % au laboratoire), et une grande certitude n'est **jamais une garantie**
(Fitzgerald : au moins 1 sur 8 sur le terrain, en aveugle). Plafond haute nominal (méta-analyses de Steblay et Fitzgerald),
descendu à basse : indirect (reconnaître le visage d'un inconnu ou des détails d'une vidéo, pas « les souvenirs dont on
est sûr » de sa propre vie) et incohérent (les deux camps lisent les mêmes données de terrain en sens opposé). **« Moins
fiables qu'on le croit » n'est mesuré par aucune étude du dossier** (ce que les gens croient de leur mémoire) ; et les
études les plus directes sur la certitude des souvenirs personnels (souvenirs « flash » d'un événement public, suivis
dans le temps) n'y sont pas : une lacune à signaler à l'écrivain et à l'agent contre-preuve, pas un jugement.
Formulation que le dossier permet : « une certitude née tard, après des récits, des confirmations ou beaucoup de temps,
mérite moins de confiance ; une première impression fraîche en mérite plus, sans jamais être une preuve ». C'est aussi la
leçon la plus honnête pour « tenir moins fort à nos certitudes ».

**Ce qui en découle pour le badge** (indication, la décision reste à l'écrivain et au propriétaire) : si c3 est dans le
champ, la certitude du verdict ne dépasse pas **basse** : ⚖️ ou ❓, jamais ✅ ni ❌ ; ⚖️ paraît le plus juste (c1 et c2 vont
dans le sens du livre, c3 seulement sous conditions). Un hook affirmatif peut s'appuyer sur c1 (modérée, direction
nette) ; sur c2 seulement pour « certains » (pas sur 30-35 % présenté comme « un souvenir entier ») ; sur c3, seulement
une question.

**Moyen-Orient / monde arabe.** Aucune des 12 fiches n'a d'échantillon arabe (`mena: false` partout, justifié). Ito
inclut la Turquie (Istanbul) et la Malaisie (étudiants d'origine chinoise) ; la Turquie est rangée au Moyen-Orient par
certaines classifications : à trancher par l'écrivain, mais pas de pays arabe dans tous les cas. Attention à la phrase
réglementaire : pour c1, « معظم الدراسات من أمريكا وأوروبا » serait **inexact** (Ito : Brésil, Colombie, Inde, Japon,
Malaisie, Turquie) ; dire plutôt qu'aucune étude ne vient d'un pays arabe. Anakwah (Ghana) ne permet pas de prédire un
effet plus fort dans une culture « collectiviste » (culture non mesurée chez les participants ; Ito ne trouve pas ce
motif). Wiechert : pays de l'échantillon à vérifier (coauteurs israéliens).

**Indépendance des preuves.** c2 : Scoboria recode 8 études dont plusieurs de ses coauteurs ; Brewin et Arce couvrent
en partie les mêmes études ; Murphy est indépendant des trois (et réanalysé par Brewin et Andrews). c3 : Wade est
coauteure de Fitzgerald, Spearing, Scoboria et Ito ; Wells de Wixted et Steblay : deux équipes, deux lectures. c1 : Ito,
Wiechert et Anakwah sont indépendants entre eux.

## Corrections demandées aux fiches

1. **arce-2023-implanting** : retirer `effect: {metric: "d", value: 1.43}` et `value: 1.36` (le shell les mettrait en
   mots « grand » malgré la limite écrite) ; reformuler f1 (« des faux souvenirs dans toutes les études, environ la moitié
   des participants en moyenne selon le codage de chaque étude, très variable », phrase du texte entier : « the
   probability of implanting false memories was 50% ») ; f2 `kind: association` ; ajouter la limite des auteurs
   (« highly probable they had been overestimated »).
2. **murphy-2023-mall** : f1 : ajouter 33 partiels + 10 complets (8 % complets) ; f2 : remplacer « high rates of
   memories » par 14 % de souvenirs déclarés et 52 % de croyances sans souvenir ; noter que le taux monte avec les
   entretiens (15 → 19 → 35 %). L'avis concerne la copie `…2198263` (rétractée), pas notre DOI.
3. **scoboria-2017-implantation** : f1 : 30 % comprend les souvenirs partiels ; complets + robustes ≈ 22 % ; f2 : 46 %
   sur 3 études et 89 personnes ; `limits` : Canada, Nouvelle-Zélande, États-Unis, Royaume-Uni, étudiants ; 4 études
   écartées faute de transcriptions.
4. **brewin-2017-childhood** : `limits` : 22 jeux de données d'implantation dans 20 articles, surtout des étudiants ;
   15 % = colonne la plus stricte (souvenir + confiance), calculée sur les études qui le permettent ; les auteurs le
   donnent comme borne haute.
5. **ito-2019-cowitness** : la limite « not described as preregistered » est à compléter : la seconde vague (5 pays)
   était préenregistrée, enregistrement formel achevé après la collecte ; ajouter 34-64 % et 88 % (texte entier).
6. **wiechert-2026-misinformation** : f2 : appuyer « part of it is people going along » sur la phrase de conclusion, pas
   sur la phrase de résultat ; noter que le test change de format en même temps ; vérifier le pays de l'échantillon.
7. **anakwah-2024-culture** : ajouter la note 5 (les groupes ne diffèrent pas sur l'échelle de culture), l'interaction
   non significative pour les détails centraux, et 18 % en rappel libre.
8. **fitzgerald-2025-errors** : f2 : rétablir « of the suspect ».
9. **steblay-2014-feedback** : f1 : « la certitude et les autres jugements rétrospectifs » ; « large » vaut pour
   l'ensemble.
10. **spearing-2022-retention** : `limits` : préenregistrée, délai assigné au hasard, MTurk ; ajouter 80-100 % → 60-70 %
    après un mois, et l'absence de ce motif à l'immédiat et à une semaine.
11. **wixted-2017-confidence** et **blank-2014-postwarning** : rien à corriger.

---

Fichiers interdits (`scratchpad/dossiers/`) : **non ouverts**. Champs des fiches lus seulement après chaque résumé :
`support`, `kind`, `design`, `n`/`k`, `effect`, `limits` ; `declared` et `acknowledged` non lus. Dépôt
`/home/user/book-vs-science` : seul ce fichier a été créé (`reports/memory-rewritten/blind-review.md`) ; rien d'autre
modifié, aucune commande git.
