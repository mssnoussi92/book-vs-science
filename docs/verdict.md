# Comment le badge est décidé

Le badge n'est pas une impression : il suit cette grille, que les règles de `packages/rules` appliquent (elles gardent,
elles ne décident pas : le badge reste un choix écrit, défié par un agent contre-preuve et validé par le propriétaire).

| Badge | Sens à l'écran |
|---|---|
| ✅ صح | l'idée du livre, telle qu'on l'a testée, est confirmée par les meilleures preuves |
| ⚖️ مش بالظبط | vraie en partie, pour certains, sous conditions, ou plus faible que le livre ne le dit |
| ❌ غلط | contredite par les meilleures preuves |
| ❓ الأدلة مش كفاية | les preuves ne suffisent pas pour trancher |

## 1. Traduire l'idée en affirmations testables

L'idée du livre est découpée en 1 à 4 affirmations (`book.claims`) : **qui** (population), **quoi** (exposition),
**comparé à quoi**, **mesuré comment** (résultat), et si elle dit qu'une chose **cause ou aide** (`causal`). Une
affirmation hors du champ de l'épisode est nommée (`inScope: false`) : personne ne la teste en silence, personne ne la
dit comme un résultat.

## 2. Chercher, y compris ce qui contredit

- Le protocole est écrit (`verdict.searched`) : au moins trois requêtes, dont « meta-analysis », « replication » et
  « culture OR moderator », sur Crossref, OpenAlex ou Europe PMC, avec la date et ce qui n'a pas été trouvé.
- Un **agent contre-preuve**, distinct de l'écrivain et du relecteur, n'a qu'une tâche : trouver ce qui contredit le
  verdict (`verdict.counterEvidence`).
- `content/contested.json` liste les effets connus pour leurs échecs de réplication (épuisement de la volonté, power
  posing, amorçage social, rétroaction faciale…) : s'y appuyer exige une réplication multi-laboratoires au dossier.

## 3. La certitude de chaque affirmation (façon GRADE)

On part du meilleur plan d'étude qui va dans le sens de l'évaluation :

| Plan (fixé par le relecteur, pas par l'écrivain) | Plafond de départ |
|---|---|
| réplication multi-laboratoires préenregistrée, revue de méta-analyses, méta-analyse, revue systématique | haute |
| essai randomisé, expérience, étude longitudinale | modérée |
| transversale, échantillonnage d'expériences, revue narrative, prépublication | basse |

Puis on descend (jamais on ne monte au-dessus du plafond) pour : risque de biais, incohérence entre études, caractère
indirect (dont **l'applicabilité au public égyptien** : presque aucune étude n'a d'échantillon arabe), imprécision, biais
de publication, échec de réplication. Règles dures :
- une affirmation **causale** sans aucune preuve dont l'exposition a été manipulée (`kind: causal` ou `intervention`)
  est plafonnée à **basse**, même portée par une méta-analyse (de corrélations) ;
- une preuve qui **contredit** et vient d'un rang égal ou supérieur interdit la direction « soutient ».

## 4. Du tableau au badge

| Direction des affirmations du champ | Certitude | Badge |
|---|---|---|
| toutes soutiennent | haute ou modérée | ✅ |
| la principale est contredite | haute ou modérée | ❌ |
| mêlée, ou soutient en partie, ou pour certains seulement | modérée ou basse | ⚖️ |
| insuffisante | quelle qu'elle soit | ❓ |
| soutient ou contredit | basse ou très basse | ⚖️ ou ❓, **jamais ✅ ni ❌** |

La certitude du verdict ne dépasse pas la plus basse des affirmations du champ.

## 5. Ce que l'épisode a le droit de dire

- **Hook ≤ verdict** : un hook ne s'appuie que sur une affirmation de certitude au moins modérée et de direction nette ;
  sinon il devient une question. Un hook posé en question (chaque texte, dit et première image, finit par « ؟ ») peut
  s'appuyer sur une affirmation évaluée (pas « insuffisante ») de certitude au moins **basse** ; « très basse » reste
  refusée, même en question (décision du propriétaire, 2026-11-22, sur « argent » où toutes les affirmations sont
  basses). Une question qui présuppose sa réponse se refuse à l'œil.
- **Dénouement ≤ verdict** : ✅ « mieux » ; ⚖️ « un peu mieux » ou non résolu ; ❓ non résolu ; ❌ non résolu ou pire.
- **« À retenir » rattaché à une preuve** : `evidence` seulement si une preuve causale porte sur cette action-là ; sinon
  « ممكن يساعد / جرّب », suggestion à faible risque. Jamais : arrêter un traitement, « vider son sac » comme remède
  (se défouler augmente la colère : Bushman 2002), un auto-diagnostic.
- **Une nuance dite** dans la vidéo ; les autres sur la page des preuves de l'épisode.
- **Les mots d'intensité** viennent de la mesure : « ارتباط » pour une corrélation, « فرق في المتوسط » pour un d ; petit,
  moyen, grand selon les seuils de Cohen, mis en mots par le shell depuis le registre, jamais tapés.
- **Verbes causaux** (« بيسبب », « بيخلّي », « بيعالج »…) refusés sur une affirmation que seules des associations portent.
- **Applicabilité** : sans échantillon du Moyen-Orient ou d'Afrique du Nord, la phrase « معظم الدراسات من أمريكا وأوروبا »
  est dite ou écrite.

## 6. Après la publication

Les sources des épisodes publiés sont revérifiées chaque semaine. Une rétractation, ou une méta-analyse récente qui
renverse un verdict, ouvre un ticket avec une question à choix préparée : commentaire épinglé, description corrigée,
vidéo retirée, épisode refait. Nos propres erreurs vont sur la page publique « تصحيحات ».
