# Limites

Ce qui reste fragile, dit franchement. Premier jet (2026-11-22, conception) ; complété à chaque étape du pilote.

## Monétisation et plateformes

- **YouTube** : à partir du 2027-02-01, une chaîne nouvelle n'entre au Programme Partenaire qu'avec 8 000 h de
  visionnage sur 365 jours ou 20 M de vues Shorts sur 90 jours ; les heures des Shorts ne comptent pas. D'où les vidéos
  longues + shorts. Le lien « vidéo associée » d'un short ne s'écrit pas par l'API : il se pose à la main dans Studio.
- **Narrateur synthétique** : YouTube ne monétise pas les chaînes qui « use AI-generated personas to deliver information
  on sensitive topics » (santé, finances…). Le narrateur passera à une voix humaine avant la première publication ;
  d'ici là, le risque est entier.
- **Facebook** monétise sur invitation ; **Instagram** ne partage pas les revenus des Reels ; **TikTok** Creator Rewards
  exige plus d'une minute et des conditions de pays (sources secondaires).
- **Étiquettes IA** : Instagram (`is_ai_generated`), TikTok (à cocher à la main sur un brouillon), description partout.

## Science

- Une machine prouve qu'un article existe et qu'une phrase y figure ; **elle ne prouve pas qu'on l'a compris**. Le
  relecteur aveugle et l'agent contre-preuve sont des IA qui peuvent partager les a priori de l'écrivain.
- Pour hommes/femmes et santé mentale, un relecteur humain compétent serait le vrai garde-fou ; il n'y en a pas.
- **Presque aucune étude n'a d'échantillon arabe** : chaque épisode le dit quand c'est le cas.
- Beaucoup de méta-analyses (Elsevier) n'ont pas de résumé accessible par API : leur lecture est humaine et inscrite.
- Le livre n'est lu qu'à travers les textes publics de son auteur ; la reformulation peut rester trop proche ou le
  caricaturer : le propriétaire valide la formulation.

## Voix et image

- Le multi-locuteurs de Gemini mélange les deux voix aux changements de locuteur depuis le 5-6 novembre 2026 (forum Google, sans correctif) : une voix par requête, ce qui coûte une requête de plus par personnage (3 au pilote, tout le budget d'un jour de la clé partagée) et perd l'enchaînement naturel d'un dialogue (les répliques sont dites séparément puis montées) ; la limite gratuite des modèles TTS n'est pas publiée
  (« not guaranteed ») ; Google change de modèle tous les quelques mois (un changement = un nouveau casting).
- **Rhubarb Lip Sync** est mal adapté à l'arabe (mesuré sur deux prises égyptiennes : « aa » 3 % des images, lèvres
  arrondies jusqu'à 20 %) ; d'autres moteurs sont comparés à l'aveugle.
- La lisibilité d'une bouche dessinée sur un téléphone n'est vérifiée que sur planche.
- **Bouches du pilote** : moteur « hybride » (formes tirées des lettres, réparties sur la durée réelle de chaque
  réplique, bouche fermée là où la voix se tait) ; ni Rhubarb ni moteur au volume pur n'ont encore été comparés à
  l'aveugle, et les mots des sous-titres sont répartis selon leurs lettres, pas sur les temps de Whisper.
- **Durée** : le pilote, écrit pour 58-60 s au débit estimé (2,6 mots/s), dure 67-69 s avec sa voix (2,1 mots/s mesurés,
  après des pauses ramenées à 0,35 s et une voix 1,1 fois plus rapide) ; le script validé n'a pas été raccourci (une
  réplique changée périme sa validation). Le débit de l'égyptien est recalé et la règle `duration` avertit avant la voix.
- **Découpe des prises** : une prise se coupe aux silences ; quand une pause voulue par le script dure presque autant
  qu'une coupe (pilote : 0,84 s contre 0,92 s), Whisper (small) vérifie que chaque morceau est bien sa réplique ; une
  réplique très courte se reconnaît mal (« بطّل زعل بقى! » à 0,48). Shorts 2 et 3 (2026-11-23) : **4 prises sur 6
  refusées** par leurs silences (Gemini garde jusqu'à 1,7 s de silence dans une réplique : « والعلم؟ … مش بالظبط ») ;
  bornes posées à la main d'après les silences et les mots horodatés de Whisper (`--bounds`), puis acceptées par Whisper
  (0,66 à 0,99). À outiller : proposer les bornes depuis l'alignement Whisper, la personne ne faisant que vérifier.
- **Ce qui tient à l'écran** : compter les mots ou les caractères ne suffit pas (deux textes « conformes » sortaient sur
  trois lignes, coupés). `bvs fit` mesure chaque carte, légende et écran de sous-titres dans Chromium, police et tailles
  réelles (9:16) ; à lancer avant de présenter un script. Il signale aujourd'hui 5 textes **anglais** trop longs (cartes
  d'étude, une première image, un sous-titre) : à reprendre avant toute voix anglaise (les changer maintenant périmerait
  les validations anglaises).
- **Durée mesurée** : « trop de choix » estimé à 58,5 s, 60,5 à 62,8 s avec sa voix ; « argent » estimé à 68 s, 63,4 à
  64,7 s : l'estimation (2,1 mots/s) se trompe de ±4 s dans les deux sens.

## Écriture

- **Hooks** : sur les cinq types écrits pour le pilote, le propriétaire n'en retient qu'un, le défi (« ما تفكرش في دب أبيض »),
  qui fait faire quelque chose au spectateur ; l'ouverture à froid, la promesse du livre, la question montrée et le POV
  « n'accrochent pas ». Les prochains épisodes gardent cinq hooks (la règle `hooks`), mais leur écrivain part du défi
  et le contradicteur juge chaque hook contre lui.
- **Scène** : ce qui ne se comprenait pas au pilote, c'était la mise en scène plus que les répliques (un personnage qui
  pense, bouche qui bouge face à l'autre) : seul, un personnage pense ; avec l'autre, il parle.

## Coût et dépendances

- Le vrai coût est l'**abonnement Claude** du propriétaire, partagé avec ses deux autres dépôts : mesuré au pilote.
- **Remotion** n'est pas open source ; aucune sortie vers un moteur libre n'est construite.
- **GitHub Actions** : rendre chaque jour les vidéos d'une chaîne monétisée est une zone grise de ses conditions ; une
  image Docker pour un serveur personnel reste le plan B.
- **Validation** : `performed_via_github_app` distingue une session du propriétaire, mais ce n'est pas une preuve
  cryptographique.
- **Juridique** (pas un avis) : clause EEE des conditions Gemini lue comme visant une application offerte à d'autres ;
  titres de livres cités comme simple référence ; protection incertaine de textes écrits avec une IA.
