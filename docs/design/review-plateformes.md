# Revue contradictoire : angle PLATEFORMES (YouTube, Facebook, Instagram, TikTok)

Relecteur indépendant, 2026-11-22. J'ai lu en entier `brief.md`, `proposal-A.md`, `proposal-B.md` et `proposal-C.md`, les
sections 11 et 12 de `audit-themes.md` et la section 2.8 de `audit-reels.md`, et dans quran-themes-demo (lecture seule)
`reference/stickman-shorts-analysis.md`, `reference/fb-metaphor-reels-analysis.md` et `docs/retention.md`. Les politiques
ont été relues **dans leur texte actuel le 2026-11-22**. Les URL sont en fin de document. Ce qui vient d'un guide tiers ou
d'un résultat de recherche que je n'ai pas pu ouvrir moi-même est marqué « (tiers) ». Je n'ai rien modifié dans les deux
dépôts (`git status --short` vide des deux côtés, vérifié avant et après).

**En une phrase** : les trois propositions sont solides sur les sources et le droit d'auteur, mais elles traitent la
politique « inauthentic content » comme **le** risque de monétisation. Elles ratent trois choses plus lourdes :
1. les seuils du Programme Partenaire, qui changent le 2027-02-01, rendent une chaîne de Shorts quasi impossible à
   monétiser sur YouTube ;
2. la politique « AI Personas Related to Sensitive Topics » vise un narrateur synthétique qui donne un conseil de
   bien-être, ce que fait exactement le pilote ;
3. Meta exige une étiquette IA pour une voix de synthèse réaliste.

Leur moteur de variation, enfin, va contre deux leçons mesurées du propriétaire : un style maison, un changement à la fois.

---

## (a) Tableau des objections

Gravité : **bloquant** (l'objectif visé ne peut pas être atteint tel quel), **majeur** (il faut le corriger avant le
pilote ou la publication), **mineur** (à corriger, sans urgence).

| # | Objection | Prop. | Gravité | Preuve (lue le 2026-11-22 sauf mention) | Correction proposée |
|---|---|---|---|---|---|
| 1 | **Une chaîne de Shorts ne sera pas monétisée sur YouTube avant longtemps.** Les vues du flux Shorts ne comptent pas dans les 4 000 h. **À partir du 2027-02-01**, une chaîne qui entre dans le Programme Partenaire (YPP) doit avoir **8 000 h** sur 365 jours ou **20 M de vues Shorts** sur 90 jours. La part des publicités Shorts est réservée aux chaînes qui font **≥ 10 M de vues Shorts sur 90 jours**. Une chaîne créée en décembre 2026 n'atteindra pas l'ancien seuil avant cette date. Aucune des trois propositions n'en parle. | A B C | **bloquant** pour l'objectif « monétisation YouTube » (pas pour le pilote) | answer/72851 : « 1,000 subscribers with 4,000 qualified watch hours… or 10 million qualified Shorts views », « watch hours from Shorts views in the Shorts Feed won't count ». Billet du blog YouTube du 2026-08-10 : 8 000 h ou 20 M, 10 M de vues sur 90 jours pour les publicités Shorts ; Tubefilter du 2026-08-10 | Prévoir dès le contrat un **film 16:9 écrit comme un film** (6 à 10 min), avec ses shorts découpés dedans. C'est le modèle film + shorts que le propriétaire a déjà validé, et YouTube y retient 56 % des spectateurs à 0:30. Les Shorts servent à la découverte et aux abonnés. Question à choix pour le propriétaire. |
| 2 | **La politique sur les « personas IA » est mal lue.** Elle vise d'abord les « channels that use AI-generated personas to deliver information on sensitive topics » ; le faux expert humain n'est qu'un deuxième cas. Exemple non monétisable : « An AI "doctor" providing… health advice, or wellness remedies ». La loupe à voix Gemini qui donne « une action concrète » sur un sujet de santé mentale (le pilote) est une persona IA qui livre un remède de bien-être. A en tire la conclusion inverse (§5, §16.5). | A (explicite), B, C (même narrateur) | **majeur** ; **bloquant** pour les sujets santé et argent | answer/1311392, section « AI Personas Related to Sensitive Topics » : santé, droit, **finances**, politique | 1) Un pilote hors santé mentale (§d). 2) Exclure `mental_health` et `money` tant que le narrateur est synthétique. 3) Formuler l'« à retenir » comme ce que les participants de l'étude ont fait, attribué à l'étude, pas comme un conseil. 4) Proposer au propriétaire l'essai d'un narrateur à voix humaine. |
| 3 | **« Same situation, same outcome »** : la politique cite mot pour mot « Videos where characters are put in the same situation over and over again with the same outcome (i.e., using a highly similar storyline template across multiple videos) ». Notre gabarit : les mêmes 3 personnages, le même ordre en 5 temps, le même narrateur qui tranche, et un ⚠️ prévu par les trois propositions pour le pilote (le verdict le plus fréquent en psychologie). Les moteurs de variation changent la peau (palette, police, cadrage), pas l'histoire. | A B C (B et C un peu moins : ordres variables) | **majeur** | answer/1311392. Permis : « a series following a set of characters across episodes » si chaque vidéo a « a distinct storyline, focus, or concept » | Faire varier le **récit**, et le suivre au registre : qui a raison (le personnage qui croit le livre gagne dans un ✅), l'issue de la scène, la relation et le lieu. Suivre la répartition ✅/⚠️/❌ par le **choix des idées**, jamais par un quota sur le verdict. Garder une identité visuelle stable (#4). |
| 4 | **Le moteur de variation aléatoire va contre les leçons du propriétaire.** retention.md, point 8 : « Une page se reconnaît en une seconde à son image » (un style maison). Sa doctrine : un changement à la fois, mesuré ; 12 à 14 points de bruit à 120 vues. Avec 3 styles en rotation et jusqu'à 13 axes tirés, aucun effet ne pourra être attribué. Les relecteurs YouTube regardent les vidéos, pas notre registre. | A (style ≠ précédent, Hamming), B (dHash, ≤ 40 %), C (13 axes, ≥ 7 différents) | **majeur** | retention.md l. 650-652 et 715-720 ; answer/1311392 (« reviewers may focus on… main theme, most viewed, newest… metadata ») ; CLAUDE.md, « amélioration continue » | Un **style maison** (cartoon). Les autres styles passent en **essais planifiés** (`trials`, un axe à la fois, comparés à 48 h). Le tirage se limite aux lieux, tenues et lumières. Le registre sert à mesurer, pas à « montrer à YouTube » (C §11.2). |
| 5 | **Meta exige l'étiquette IA** pour un son « réaliste » créé numériquement, et la voix Gemini en est un. Aucune proposition ne la pose (A écrit « à vérifier »). L'API Instagram la prend en charge depuis le 2026-06-22 (`is_ai_generated`) ; pour les reels de Page Facebook, non vérifié. TikTok : `is_aigc` existe en publication directe, pas dans un brouillon (le propriétaire coche à la main). | A B C | **majeur** (pénalités possibles, correction simple) | about.fb.com, 2024-02-06 : « realistic-sounding audio that was digitally created or altered… we may apply penalties ». Changelog Instagram Platform, 2026-06-22. Doc TikTok, publication directe. Aide Instagram (tiers) : exemple « reel narrated with a realistic AI-generated voiceover » | Un champ `ai_voice: true` dans `post.json`. Instagram : `is_ai_generated=true`. Facebook : à vérifier sur l'endpoint des reels. TikTok : un rappel dans le texte du brouillon. YouTube : pas requis (animation non réaliste, answer/14328491), mais l'audio Gemini porte un filigrane **SynthID** : YouTube peut poser l'étiquette lui-même. |
| 6 | **Une seule durée, 45 à 60 s, pour les quatre plateformes.** Sur Facebook et Instagram on part à 4-8 s quelle que soit la durée (mesuré : 5 à 9 % de la vidéo regardée pour 1:33-1:47, contre 16 à 39 % pour 19-36 s). Le verdict, vers 30 s, n'y sera vu que par une minorité. TikTok Creator Rewards exige plus d'1 min (tiers). Une vidéo de 45 à 60 s n'est donc la durée idéale nulle part. B et C refusent une vidéo hors 45-60 s. | A B C | **majeur** | retention.md, « Premières mesures » ; audit-themes §12 ; guides Creator Rewards 2026 (tiers : plus d'1 min, 10 000 abonnés, 100 000 vues sur 30 jours, compte personnel) | **Une timeline, trois coupes** : Facebook et Instagram 30-40 s, YouTube Shorts 50-75 s, TikTok 61-75 s si le Creator Rewards compte pour le propriétaire. Les segments de la coupe longue sont marqués `cut: long`, et la durée est contrôlée coupe par coupe. |
| 7 | **La structure imposée place la valeur (livre contre science) à 15-30 s.** Les spectateurs partent à trois endroits. (1) À 3-8 s, quand la scène repart d'une mise en place calme après le hook. (2) À la carte du livre dite par le narrateur : c'est le motif « carte de narration », 15 % de rétention locale chez le propriétaire contre 19,5 % pour un dessin. (3) Juste après le badge : l'« à retenir » vient après la récompense. | A B C (B et C ont un « verdict-tease », A non) | **majeur** | retention.md l. 590-616 (khidr-01 : 26,4 % passent 3 s) ; fb-metaphor : récompense unique, à la fin | Mettre le conflit dans la **première image** : le livre en ≤ 3 mots, et le badge caché ou un défi. La scène commence au pic. L'idée du livre est **jouée** par un personnage, pas posée sur une carte. L'« à retenir » est la dernière image du moment rejoué, qui boucle sur la première (§d). |
| 8 | **L'écran partagé en 9:16** met « la science » dans la moitié basse (A et B ; C haut/bas aussi). C'est la zone que couvrent la légende, le nom du compte, la barre de son et les boutons. Les personnages réduits de moitié n'ont plus de visage lisible. | A B C | **majeur** | Zones sûres Meta pour les Reels publicitaires : 14 % en haut, 35 % en bas, 6 % sur les côtés (tiers) ; quran-reels : 250 / 420 / 90 | En 9:16, partager **dans le temps** (le même moment rejoué deux fois) plutôt que dans l'espace. Si un écran partagé reste : la science en haut, et rien d'utile sous y = 1500. |
| 9 | **Les côtés de 90 px repris de quran-reels ne suffisent pas.** La colonne de boutons de TikTok, des Shorts et des Reels occupe environ 110 à 160 px à droite, de y ≈ 900 à 1600. Un sous-titre arabe aligné à droite **commence** sous ces boutons. Les reels coraniques ont un texte centré, mais ici les répliques sont le contenu même. | A B C | **majeur** | reap.video, 2026-09-07 (tiers : 10-15 % de marge à droite) ; géométrie du texte de droite à gauche | Sous-titres **centrés**, ≤ 800 px de large, dans la bande y = 1050-1450. Zone sûre asymétrique (droite 160) dans `formats.ts`, et un test « chaque boîte dans la zone » par format. |
| 10 | B autorise le badge en `lower-third` et la carte d'étude en `bottom`. Son test contrôle la zone de 420 px, pas les ~670 px que Meta recommande en bas d'un Reel. | B | **majeur** | B §4.1 ; Meta Reels 35 % en bas (tiers) | Badge toujours au centre-haut (y = 300-900) ; carte d'étude au-dessus de y = 1250. |
| 11 | **La typographie animée est un des trois styles en rotation.** C'est le texte sur aplat, que les mesures du propriétaire classent le plus bas : 15 % pour une carte de narration contre 19,5 % pour un dessin, et la règle « texte sur fond sombre < 15 % ». La politique YouTube cite aussi « scrolling text with minimal… narrative ». | A B C | **majeur** | retention.md l. 590-604, 693 ; answer/1311392 | La garder comme **essai mesuré**, pas comme un tiers des épisodes. En cartoon, ≤ 6 mots à l'écran à la fois. |
| 12 | **A met les personnages et les épisodes sous CC BY 4.0.** Une chaîne clone **monétisée** peut alors reprendre légalement nos personnages et nos scripts. Le dépôt public publie aussi les prises de voix (A, B) et le rig : re-rendre nos vidéos sous un autre nom tient en une commande. | A (CC BY) ; B (BY-NC-SA, moins grave) ; C (personnages réservés : bien) | **majeur** (A), mineur (B) | A §1, B §1, C §1 | Personnages, nom et logo « tous droits réservés » (`BRAND.md` de C). Prises de voix hors du dépôt public. |
| 13 | **Noms de chaîne.** « مكتوب ولا مُثبت؟ » : en égyptien, « المكتوب » est le destin, et le propriétaire a fait un film « مخيّر ولا مسيّر؟ ». « معمل » (A, B, C) : « usine » au Levant, en Irak et dans le Golfe ; le labo se dit « مختبر » en arabe standard. « كلام كتب؟ » (recommandé par A et C) : fort en Égypte, mais il **juge les livres d'avance** (« de la théorie ») alors que certains épisodes seront ✅ ; expression courante, donc introuvable ; le « ؟ » disparaît des identifiants ; translittération instable (Kotob / Kutub). | A B C | **majeur** : un identifiant se change mal (leçon TikTok du propriétaire, `@quran_words_daily` pris) | Lecture de la langue, à tester ; CLAUDE.md de quran-reels | Tester chaque nom auprès de 5 personnes de 3 pays. Vérifier les 4 identifiants latins le même jour. Préférer un nom neutre sur le verdict : « ميزان الكتب » (B), ou une forme « الكتاب قال… والعلم؟ ». |
| 14 | **Badge** : ⚠️ veut dire « attention, danger », pas « nuancé », et ce sera le badge le plus fréquent. Rouge et vert sans forme distincte : illisible pour les daltoniens. | A B C | mineur | Unicode : U+26A0 « WARNING SIGN » | ✅ « صح » / ⚖️ « مش بالظبط » / ❌ « غلط ». Badge ≥ 30 % de la largeur, avec forme, couleur et un mot. Validé à l'œil sur une planche réduite à 360 px de large. |
| 15 | **La carte d'étude est en latin** (« Ford et al., 2018 · JPSP · DOI ») : illisible en 1 à 3 s par un arabophone, et le DOI ne sert à rien sur un téléphone. | A, B (C donne la population en arabe : mieux) | mineur | — | Une ligne arabe d'abord (« تحليل لـ 40 دراسة · 2010 »), la référence latine en petit dessous. DOI et liens sur une page « المصادر » par épisode. |
| 16 | **La légende Facebook doit tenir en 400 caractères** (constat du propriétaire), ce qui exclut des crédits avec DOI. Sur Instagram et TikTok, les liens ne sont pas cliquables. | B (`post.json` avec DOI), A, C | mineur | audit-reels §2.8 | Une ligne « المصادر » et un lien court vers la page de l'épisode (Pages). Les DOI complets sur YouTube seulement. |
| 17 | **Risque « conçu pour les enfants »** : YouTube cite « animated characters or cartoon figures » parmi les facteurs. Des bonshommes plats en couleurs vives avec un langage simple peuvent être classés ainsi (commentaires et publicités personnalisées perdus). | A B C | mineur (probabilité faible, effet fort) | answer/9528076 | `selfDeclaredMadeForKids: false` à chaque envoi. Sujets et métadonnées d'adultes. Pas de palette « jouet ». |
| 18 | **Le rythme de production.** C vise « un épisode par jour sans humain », avec un tampon de 7 et une validation par lots ; A juge 3 par jour possibles. Une chaîne à voix IA, scripts IA, variation tirée et rythme quotidien est l'archétype de « AI-generated content… giving the impression of mass production… without adding the creator's original, authentic insights ». | C (surtout), A | **majeur** | answer/1311392 | Lancement à 2 ou 3 épisodes par semaine. Une page « méthode » liée dans « À propos » (C l'a), qui nomme l'humain qui choisit et valide. Une réplique de point de vue par épisode, écrite ou dictée par le propriétaire. |
| 19 | **Hooks** : exiger 5 types différents (A, B), ou 4 (C), oblige à écrire des hooks faibles ; A impose `number` sur un pilote sans chiffre frappant. Chez C, `firstFrame` est facultatif. Ce qui compte : l'image 1, son coupé, en 1 s. | A B C | mineur | retention.md : la question « miroir » de khidr-01 a fait partir 3 spectateurs sur 4 | 3 hooks par épisode, ≥ 2 types. `firstFrame` obligatoire (≤ 6 mots) et un personnage visible dans chacun. `HookLab` montre la première image à 360 px. |
| 20 | **A tire le cadrage au hasard, plan large compris.** Une première image en plan large rend les visages illisibles. | A (C : caméra tirée) | mineur | — | Le hook est toujours en plan serré ; le tirage du cadrage commence après 3 s. |
| 21 | **Le narrateur synthétique dit « مارك مانسون بيقول… »** (A, C). Une paraphrase inexacte attribuée par une voix IA à une personne réelle correspond à ce que YouTube décrit : « Making it appear as if someone gave advice that they did not actually give ». | A, C (B l'interdit : bien) | mineur | answer/14328491 | Reprendre la règle de B : « الكتاب بيقول », et le nom de l'auteur seulement sur la carte du livre. |
| 22 | **Le détecteur de « bordures » ne cherche que les bandes sombres.** Pour Facebook, les aplats immobiles des styles split et typographie (de toute couleur) sont la même chose. | A B C | mineur | audit-reels §2.8 (110 px presque noirs, 2026-11-13) | Détecter toute bande uniforme immobile ≥ 100 px, quelle que soit sa couleur, sur les quatre bords. |
| 23 | **Couverture** : la grille Instagram affiche les vignettes en 3:4 et coupe 240 px en haut et en bas d'une vidéo 9:16. Leçon du 2026-11-21 : « Instagram coupe parfois la couverture ». Aucune proposition ne fixe la zone de la couverture. | A B C | mineur | Guides 2026 (tiers : Buffer, Kapwing) ; CLAUDE.md de quran-reels | Titre et visage dans y = 240-1680 ; une couverture fournie explicitement. |
| 24 | **Musique** : A et B n'en mettent pas ; C propose une musique générée par code, sans risque Content ID. Point oublié : un Short de plus d'1 min avec une revendication Content ID **de n'importe quel type** est **bloqué partout**. Toute musique tierce est donc exclue des coupes longues. | A B C | mineur | answer/15424877 | Aucune musique tierce. La musique générée de C, en essai mesuré. |
| 25 | **Marques et couvertures** : « MARS VENUS » est déposé par John Gray Publications. La couverture orange de Manson est reconnaissable : un « livre générique » de la même couleur avec un gros titre noir la rappellerait. | A B C | mineur | trademarks.justia.com (MARS VENUS, n° 97819678, tiers) | Titre en texte neutre, usage de simple référence. Jamais un titre de livre dans le nom de chaîne, une série ou un logo. Pas de livre dessiné aux couleurs de sa couverture. |
| 26 | **Un personnage peut passer pour l'auteur** : un homme dessiné qui tient le livre pendant que la voix nomme l'auteur sera lu comme l'auteur. | A, C | mineur | — | Pendant la partie « livre », personne ne tient le livre en parlant : le livre est un objet posé sur la table. |

---

## (b) Détail par proposition

### Proposition A : « réutilisation maximale »

**Ce qui tient sous mon angle**
- Les meilleures règles de droit d'auteur des trois. Pas de suite de 8 mots reprise, au plus une citation de ≤ 12 mots,
  au plus 3 épisodes par livre, jamais deux épisodes de suite sur le même livre.
- Le livre n'a aucun champ image. Le `basis` interdit de prêter au livre ce qu'il ne dit pas.
- La coquille décide seule du badge, des cartes, des sous-titres et de la signature.
- `firstFrame`, « lisible sans le son », est obligatoire. Un hook de plus de 3,5 s est refusé.
- Les contrôles « image statique » et « bordures » reprennent les vrais constats de Facebook.
- La copie Instagram est encodée sans edit list.

**Ce qui ne tient pas**
1. **Sa lecture de la politique YouTube est fausse** (§5, §16.5). « Une loupe ne se fait passer pour aucun
   psychologue » ne répond qu'à la seconde moitié du texte. La première vise toute persona IA qui donne des
   informations sur un sujet sensible. Le choix de la mascotte reste bon pour d'autres raisons (pas de genre, une
   marque), mais il ne protège pas la monétisation d'un pilote de santé mentale (#2).
2. **La variation est la plus mécanique des trois.** Le style change à chaque épisode ; palette, cadrage et décor
   sont tirés à une distance de Hamming ≥ 0,5. Le cadrage peut tomber en plan large au hook (#4, #20). Et la phrase
   « un style par épisode en production » rend toute comparaison impossible.
3. **CC BY 4.0 sur les personnages** (#12). C'est la seule proposition qui autorise légalement une chaîne clone
   monétisée.
4. **Seulement du 9:16** au pilote et en production. Rien ne prépare le film 16:9 qui seul ouvre la monétisation
   YouTube (#1).
5. **Le hook `number` est obligatoire** sur un sujet sans chiffre frappant. Le narrateur nomme l'auteur (#19, #21).
6. **Noms** : « مكتوب ولا مُثبت؟ » se lit « destin ou prouvé ? », et « الكتاب والمعمل » « le livre et l'usine »
   hors d'Égypte (#13).
7. **Plateformes** : l'étiquette IA de Meta est « à vérifier ». Sur ce point, c'est la seule des trois qui l'a vue.

### Proposition B : « source de vérité typée »

**Ce qui tient sous mon angle**
- **La meilleure règle sur les personnes réelles** : le narrateur dit « الكتاب بيقول », jamais « مانسون بيقول »,
  pour la raison même que cite YouTube.
- **Les hooks les mieux pensés pour le son coupé** : `firstFrame` est une énumération (`text-over-scene`, `close-up`,
  `badge-tease`, `split`), `spokenBy: "none"` permet un hook muet, et `hookWords` limite à 9 mots en ar-EG.
- Des structures de récit variées (`verdict-tease`, `rewind`, `book-first`), qui répondent en partie à « same
  outcome ».
- La CI rend une image fixe 16:9 de chaque style : le contrat 16:9 reste tenu.
- `episode_id` est écrit dans la description pour les statistiques. Le brouillon porte un filigrane et n'est jamais
  publié.
- Son contre-avis sur « كتاب ولا علم؟ » est juste.

**Ce qui ne tient pas**
1. **Le badge peut être en `lower-third` et la carte d'étude en `bottom`** (#10). Le badge est la marque récurrente :
   il ne doit jamais pouvoir tomber sous la légende des Reels.
2. **Le contrôle de durée refuse tout ce qui sort de 45-60 s** (#6). Il interdit à la fois la coupe Facebook/Instagram
   et la coupe TikTok éligible au Creator Rewards.
3. **dHash et ≤ 40 % par style** cherchent à rendre les épisodes *différents à l'œil*. C'est l'inverse d'une
   identité visuelle, et c'est sans effet sur ce que la politique vise : le récit (#3, #4).
4. **BY-NC-SA** limite les clones commerciaux mais publie tout ce qu'il faut pour les faire. Les prises de voix
   sont commitées (#12).
5. **Rien sur l'étiquette IA de Meta ni sur les seuils YPP** (#1, #5). Le split met la science en bas (#8).
6. **« الكتاب في المعمل »** a le même problème : « معمل » se lit « usine » hors d'Égypte (#13).

### Proposition C : « automatisation et variation d'abord »

**Ce qui tient sous mon angle**
- **La seule qui a vu que le spectateur part à 4-8 s.** Elle envoie un hook par plateforme (le plus court pour
  Facebook et Instagram).
- **Un mode « mimé »** (bulles, sans voix ni synchro labiale). Elle cite STICK TO IT (2,6 M de vues sans un mot) :
  c'est exactement ce que demande un fil joué sans le son.
- **Le hook `challenge`** (un test de 3 s fait par le spectateur), le meilleur des types proposés (§d).
- **Un ordre « verdict d'abord » et un ordre « quiz »**, qui fait commenter.
- La population est écrite en arabe sur la carte d'étude.
- Personnages, nom et logo « tous droits réservés ».
- Une page `method.html` publique : la meilleure défense devant un relecteur humain.
- Une musique générée par code, sans risque Content ID.
- « Aucune image immobile plus de 6 s ».

**Ce qui ne tient pas**
1. **« Un épisode par jour sans humain »** (#18). Une file automatique, un tampon de 7 et une validation par lots
   donnent exactement l'« impression of mass production » que vise la politique. Les relecteurs regardent les vidéos
   **les plus récentes** : une semaine validée en lot, c'est sept vidéos jugées d'un coup.
2. **La variation la plus étendue** : 13 axes, ≥ 7 différents d'un épisode à l'autre, dont 12 palettes, 6 paires de
   polices, 3 styles de sous-titres et 4 mises en page de couverture. La chaîne n'a plus de visage, et aucune mesure
   n'est lisible (#4). « Pour montrer, si YouTube demandait » : YouTube ne demande pas ce registre.
3. **`firstFrame` facultatif** (#19). **« Scène ≥ 40 % de la durée »** allonge justement la mise en place qui fait
   partir le spectateur (#7).
4. **Le 16:9 ne sert qu'aux « compilations »** d'épisodes. Une compilation de Shorts retient mal en long format ;
   il faut un film écrit comme tel (#1).
5. **Rien sur l'étiquette IA de Meta.** Le narrateur nomme l'auteur. « كلام كتب؟ » est recommandé (#5, #13, #21).

---

## (c) Angles morts communs aux trois

1. **Le modèle économique de chaque plateforme n'est pas posé** (#1, #6).
   - **YouTube** : les Shorts n'ouvriront pas la monétisation après le 2027-02-01. Le long format le peut.
   - **Facebook** : la monétisation de contenu se fait **sur invitation**, sans seuil publié (about.fb.com, mars 2026 ;
     tiers pour le détail).
   - **Instagram** : il n'y a pas de partage général des revenus des Reels.
   - **TikTok** : le Creator Rewards demande > 1 min, 10 000 abonnés, 100 000 vues sur 30 jours et un compte
     personnel, dans quelques pays (tiers : US, UK, FR, DE, JP, KR, BR). Le propriétaire vit en France ; à vérifier
     dans l'application, et sans savoir si les vues d'un public arabe comptent.

   Conséquence : « éviter l'effet gabarit » n'est qu'une condition ; le levier, c'est le long format sur YouTube.
2. **Aucun plan d'étiquetage IA par plateforme** (#5). Fait voisin, hors du périmètre de cette conception mais à dire
   au propriétaire : quran-reels publie sur Instagram et Facebook les vidéos thématiques **narrées par Gemini** sans
   `is_ai_generated`. Une recherche dans `src/` ne trouve que `containsSyntheticMedia` pour YouTube. La règle de Meta
   vise ces vidéos-là aussi.
3. **Le sujet du pilote est le plus exposé aux politiques** : santé mentale + narrateur synthétique + « action
   concrète » (#2). Les idées de rechange que les trois proposent ont chacune un verdict plus net : « 21 jours » (B,
   C), « 10 000 heures » (A), la volonté qui s'épuise (C). Elles sont hors santé, et leur hook tient dans un chiffre
   lu en une seconde (« 21؟ … 66 »). Le livre à l'origine du « 21 jours » est à établir avec soin : la relecture
   science le fera.
4. **La recherche en arabe n'est pas pensée.**
   - On ne cherche pas le nom d'une chaîne. On cherche le **titre arabe publié** du livre : « فن اللامبالاة »,
     « الرجال من المريخ والنساء من الزهرة ». B prévoit `titles` par langue, mais personne n'en fait un titre de vidéo.
   - Ces recherches amènent aussi des gens qui veulent un **résumé** et repartiront.
   - La niche est tenue par du long format. أخضر compte 2,29 M d'abonnés et 467 vidéos en 2024 (tiers) ; ses
     épisodes durent environ 15 min. Langue de narration non vérifiée.
   - Recommandation : titres en arabe d'abord (la règle validée par le propriétaire sur l'autre chaîne), avec les mots
     de recherche en arabe standard (titre publié du livre) et l'accroche en égyptien ; à mesurer.
5. **Les sujets hommes/femmes sur le marché arabe** : beaucoup d'engagement, mais aussi des commentaires hostiles et
   un lien d'image avec la Page coranique du même propriétaire. Aucune proposition ne prévoit de modérer les
   commentaires (filtre de mots, commentaires épinglés), ni de décider à l'avance quels épisodes ne vont pas sur la
   Page.
6. **Le parcours TikTok réel** : l'application non auditée ne publie qu'en brouillon (5 par 24 h). Le propriétaire
   publie, coche l'étiquette IA, ajoute un son s'il le veut. Le pipeline doit lui préparer ce geste (texte, rappel),
   comme la page « À publier » de quran-reels.
7. **La rétention n'est pas mesurée par hook ni par coupe.** Avec 100 à 700 vues par vidéo, seul un écart de 12 à 14
   points dépasse le bruit (retention.md). Un essai de hooks doit cumuler plusieurs épisodes. Aucun plan ne dit
   lesquels comparer, ni dans quel ordre.
8. **La première image sert à tout**, et aucune proposition ne la dessine comme telle : couverture du flux Shorts,
   vignette 3:4 de la grille Instagram, image fixe du fil Facebook joué sans le son.

---

## (d) Classement sous l'angle plateformes, et ce que je recommande

**Classement : C, puis B, puis A**, sous réserve de corriger ce que chacune a de pire.
- **C** est la seule qui part du comportement mesuré (4-8 s, son coupé, mimé, partage, hook par plateforme). Mais
  son automatisation quotidienne et ses 13 axes tirés sont le plus gros risque « production de masse ».
- **B** a le meilleur contrat pour les hooks muets et la meilleure règle sur l'auteur. Mais son badge peut tomber
  en bas, et son contrôle de durée interdit les coupes par plateforme.
- **A** a le meilleur droit d'auteur, mais une lecture fausse de la politique sur les personas IA, des personnages
  sous CC BY et la variation la plus mécanique.

À prendre dans chacune : le mode mimé, `challenge`, l'ordre « verdict d'abord », les droits réservés et
`method.html` de C ; `firstFrame`/`spokenBy` et « الكتاب بيقول » de B ; les règles de droit d'auteur et les
détecteurs de qualité Facebook de A.

### Les hooks : ce qui tient 3 s en 9:16, son coupé, en égyptien, avec des personnages SVG simples

| Rang | Type (noms des propositions) | Image 1 sans le son | Limite | Verdict |
|---|---|---|---|---|
| 1 | **Défi de 3 s** (`challenge`, C) | Une consigne de ≤ 5 mots et un compte à rebours ; le personnage essaie, sourcils froncés | Il faut un défi tiré de l'étude (ex. « ما تفكرش في دبّة بيضا… 3، 2، 1 », suppression de pensée : à sourcer) | Le meilleur : on agit au lieu de lire |
| 2 | **Le chiffre contre la croyance** (`number`, `surprising_fact`) | Le chiffre est l'image (« 21 يوم؟ ❌ 66 ») | Seulement quand une étude donne un chiffre frappant : jamais imposé | Très fort quand il existe |
| 3 | **Ouverture à froid mimée** (`cold_open`, `in_medias_res`) | Gros plan, le geste raconte (tête dans les mains devant le téléphone), 3 à 5 mots | Faible si elle repose sur une réplique parlée | Fort en gros plan, faible en plan large |
| 4 | **La promesse du livre, badge caché** (`book_claim`, `book-vs-science`, `myth_vs_fact`, `verdict_teaser`) | Le titre arabe du livre en ≤ 3 mots + « ؟ » à la place du badge | Si on la met partout, elle devient le gabarit de toutes les premières images | Bon, à doser |
| 5 | **POV « لما… »** (`pov`) | Une ligne de texte, la situation jouée | Format natif de TikTok, plus faible sur Facebook | Correct |
| — | **À éviter** : `question` dite sur une carte, `paradox` énoncé, `confession` parlée | Une carte et une voix ; une idée abstraite plutôt qu'une relation ; le son nécessaire | La question « miroir » a fait partir 3 spectateurs sur 4 (khidr-01) | Seulement si un personnage la **montre** |

### La structure d'épisode recommandée : « rejouée »

Elle reprend la grammaire de STICK TO IT (une même situation rejouée, une seule chose change, une chute toutes les
~6 s), mais avec une morale sourcée. Elle est écrite pour une coupe Facebook/Instagram de 30 à 40 s, que la coupe
longue complète.

| Temps | Contenu | Pourquoi |
|---|---|---|
| 0:00-0:01 | **Image 1** : un personnage en gros plan dans le moment, le titre arabe du livre en ≤ 3 mots, le badge caché « ؟ » (ou le défi). Mouvement dès l'image 1 ; tout dans y = 240-1450 | Vignette, grille Instagram, fil joué sans le son ; le conflit est là tout de suite |
| 0:01-0:03 | Le hook (le défi, le chiffre, ou la promesse du livre jouée par un personnage, pas une carte) | 3 s sur Instagram |
| 0:03-0:15 | **Moment A** « comme dit le livre » (ou la croyance), mimé, 1 ou 2 répliques au plus, une chute visuelle | Une chute avant 6 s |
| 0:15-0:27 | **Le même moment rejoué** « comme dit l'étude », **une seule chose change**, code couleur dès son image 1 | La comparaison se voit sans explication |
| 0:27-0:33 | **Badge** au centre-haut, grand, un mot arabe ; carte d'étude en arabe (n, durée, type), référence latine en petit | La récompense, une seule fois |
| 0:33-0:38 | L'« à retenir » = la dernière image du moment rejoué ; « ابعتها لحد… » ; boucle sur l'image 1 | Le partage plutôt que l'abonnement, et la boucle (les deux analyses) |
| coupe longue (+20-35 s) | La nuance « pour qui », une 2ᵉ étude, l'idée du livre exposée honnêtement, un 2ᵉ moment rejoué | YouTube Shorts 50-75 s ; TikTok > 60 s |
| film 16:9 (mensuel) | Un livre, 3 à 5 idées, écrit comme un film ; ses shorts en sont découpés ; « vidéo associée » | Les heures de visionnage : la seule voie de monétisation YouTube |

**Contradiction franche avec le brief** : il impose 5 temps dans l'ordre scène → livre → verdict. Je recommande de
fondre la scène et le livre dans le moment rejoué, et de mettre le livre dans la première image. La raison : les
mesures du propriétaire montrent que le goulot est le début, que le texte sur carte retient le moins, et que la seule
vidéo de référence qui a explosé (2,6 M de vues) est une situation rejouée.

Les cinq éléments du brief restent tous présents. Les dialogues à plusieurs voix demandés par le propriétaire restent
possibles dans la coupe longue. La coupe courte gagne à être mimée, ce qui économise aussi la synchro labiale : il faut
la comparer à une coupe dialoguée sur plusieurs épisodes, pas la supposer meilleure. Le propriétaire tranche.

---

Sources lues le 2026-11-22 :
- YouTube :
  - [politiques de monétisation des chaînes : contenu inauthentique, personas IA, ce que regardent les relecteurs](https://support.google.com/youtube/answer/1311392)
  - [seuils du Programme Partenaire et changements au 2027-02-01](https://support.google.com/youtube/answer/72851)
  - [billet du blog YouTube, 2026-08-10](https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/)
  - [Tubefilter, 2026-08-10](https://www.tubefilter.com/2026/08/10/youtube-partner-program-ad-eligibility-requirements-shorts/)
  - [contenu modifié ou synthétique](https://support.google.com/youtube/answer/14328491)
  - [Shorts de 3 minutes et Content ID](https://support.google.com/youtube/answer/15424877)
  - [« conçu pour les enfants »](https://support.google.com/youtube/answer/9528076)
- Meta :
  - [étiquetage du son réaliste (newsroom, 2024-02-06)](https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/)
  - [changelog Instagram Platform, `is_ai_generated` (2026-06-22)](https://developers.facebook.com/documentation/instagram-platform/changelog)
  - [Creator Fast Track, monétisation sur invitation (via un résultat de recherche)](https://about.fb.com/news/2026/03/creator-fast-track-grow-your-audience-earn-money-on-facebook/)
- TikTok :
  - [règles de la communauté, intégrité et authenticité (publiées le 2026-08-25, en vigueur le 2026-09-24)](https://www.tiktok.com/community-guidelines/en/integrity-authenticity)
  - [API de publication directe, `is_aigc`](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post)
  - Creator Rewards, guides tiers :
    - [toptal](https://www.toptal.com/creator/post/how-to-join-the-tiktok-creator-rewards-program)
    - [ttcalculator](https://ttcalculator.net/learn/creator-rewards-program/)
- Google : [SynthID sur Gemini TTS (3.1)](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts)
- Zones sûres et grille 3:4 (tiers) :
  - [reap.video, 2026-09-07](https://reap.video/blog/short-form-video-safe-zones)
  - [socialync](https://www.socialync.io/tools/safe-zones/facebook-reels)
  - [Buffer](https://buffer.com/resources/instagram-grid/)
- Marché et marques (tiers) :
  - أخضر : article d'Al Khaleej du 2024-06-24 (via un résultat de recherche), [shbabbek.com](https://shbabbek.com/show/128432)
  - [marques de John Gray Publications (Justia)](https://trademarks.justia.com/owners/john-gray-publications-inc-5450636)
