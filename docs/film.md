# Le film d'un livre (vidéo longue YouTube)

Proposition de la session (2026-11-22), à la demande du propriétaire : « une idée qui peut être une vidéo longue ».
Décision déjà prise : **vidéos longues + shorts**, chaque short relié à sa vidéo longue (« vidéo associée », à la main
dans Studio). Ce document dit ce qu'est le film d'un livre ; rien n'en est produit avant ses validations.

## L'idée : « فن اللامبالاة قدام العلم »

Un livre, toutes ses idées testables, un verdict chacune : le film assemble les shorts du livre (le pilote « زعلان إنك
زعلان؟ », puis « courir après le bonheur », « trop de choix »… et les suivantes, sa décision du 2026-11-22 : plus de trois
épisodes quand le livre a plus de bonnes idées) et leur ajoute ce qu'un short n'a pas la place de dire.

| Moment | Durée | Contenu | Nouveau ou repris |
|---|---|---|---|
| Ouverture | 30-45 s | le livre (carte, jamais la couverture), sa promesse reformulée, la question du film : « كام فكرة من الكتاب ده العلم بيوافق عليها؟ » ; le tableau des verdicts, cases vides | nouveau (narrateur) |
| Idée 1…n | 1 min 15 à 1 min 45 chacune | la scène, ce que dit le livre, le verdict : le short sans son hook ni son appel au partage ; plus une réplique du narrateur sur ce que le short n'a pas pu dire (la nuance restée sur la page des preuves, l'étude qui contredit) | repris + 1 réplique |
| Liaisons | 5-10 s | la case du tableau qui se remplit (✅ ⚖️ ❌ ❓), une phrase vers l'idée suivante | nouveau |
| Conclusion | 45-60 s | le tableau complet ; ce que le livre a de juste, ce qu'il exagère ; ce qui reste vrai pour un spectateur égyptien (applicabilité) ; l'orientation santé mentale ; l'appel à s'abonner | nouveau |

Avec trois idées : 6 à 8 minutes ; avec cinq : 9 à 11 minutes. Au-delà de 8 minutes, YouTube permet des coupures
publicitaires au milieu (après l'entrée au Programme Partenaire).

## Format

- **16:9**, 1920×1080 : le cartoon (style maison) recadré en large ; les zones du shell existent déjà pour 16:9
  (`packages/video/layout.ts`) ; la scène gagne de la place pour les deux personnages côte à côte.
- **Chapitres YouTube** : un par idée (« 0:00 المقدمة », « 0:40 زعلان إنك زعلان؟ »…), écrits depuis la timeline.
- **Vignette** : le tableau des verdicts à moitié rempli, Karim et Nour, jamais la couverture du livre ni l'auteur.

## Ce que le pipeline doit gagner

- Un épisode « film » (`content/films/<livre>.json`) : la liste ordonnée des épisodes, l'ouverture, les liaisons et la
  conclusion (leurs répliques, validées comme un script), le tableau des verdicts tiré des épisodes eux-mêmes (aucun
  badge tapé à la main).
- `bvs film timeline` : enchaîne les timelines des épisodes (sans hooks ni appels au partage), insère ce qui est nouveau.
- La voix : les répliques nouvelles seulement (le reste est déjà enregistré) : 1 à 2 requêtes par film.
- Les règles : chaque épisode du film validé (sources, script, vidéo) avant le film ; le tableau égal aux badges.

## Ses décisions (2026-11-23)

1. **Le film attend 4 à 5 idées** (9 à 11 min), pas trois : après le pilote, « trop de choix » et « argent », viennent
   « courir après le bonheur » et une cinquième idée du livre.
2. **Les shorts d'abord, le film ensuite** : les shorts mesurent l'intérêt ; le film les rassemble, puis chaque short
   est relié au film (« vidéo associée », à la main dans Studio).
