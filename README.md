# book-vs-science

*A self-help book's idea, played out by characters, then checked against peer-reviewed research. In Egyptian Arabic.*

Une chaîne vidéo (YouTube, Facebook, Instagram, TikTok) : chaque épisode prend **une idée** d'un livre de développement
personnel connu, la fait **vivre en scène** à deux personnages, dit **ce que dit le livre** (reformulé, titre et auteur à
l'écran), puis **ce que dit la science** : un badge récurrent et l'étude citée à l'écran.

| Badge | Sens |
|---|---|
| ✅ صح | confirmé par les meilleures preuves disponibles |
| ⚖️ مش بالظبط | vrai en partie, pour certains, sous conditions |
| ❌ غلط | contredit |
| ❓ الأدلة مش كفاية | les preuves ne suffisent pas pour trancher |

## Comment un épisode est fait

```
idée sondée → script (un agent écrit, un autre contredit) → sources vérifiées par DOI (relecture à l'aveugle,
agent contre-preuve) → validation humaine des sources puis du script → voix → synchro labiale → rendu → contrôle
```

- **Un épisode = des données** : `content/episodes/<id>/episode.json` (la structure, validée par un schéma zod) et un
  fichier de textes par langue (`lang/ar-EG.json`, …).
- **Un style = un dossier** (`styles/<id>/`) qui dessine le même épisode ; ajouter un style ne touche aucun script.
- **Aucune étude sans DOI vérifié** sur Crossref et OpenAlex ; une source non vérifiée bloque le rendu.
- **Aucune personne réelle** dessinée ou imitée ; aucune couverture de livre ; aucune longue citation.

## Licences

- **Code** : MIT (`LICENSE`).
- **Registre des sources et rapports de vérification** : CC BY 4.0.
- **Personnages, scripts, voix, vidéos, nom et logo de la chaîne** : tous droits réservés.
- Le détail par chemin est dans `REUSE.toml`.
- **Remotion**, utilisé pour le rendu, n'est **pas** open source : sa licence est gratuite pour un particulier ou une
  structure de 3 personnes au plus, freelances compris ; au-delà, une licence entreprise est due
  (<https://www.remotion.dev/license>). Un fork par une organisation plus grande doit l'acheter.
- Voix de synthèse : Gemini TTS (Google), déclarée comme générée par IA dans chaque publication.

## Pour aller plus loin

- `docs/conception.md` : la conception (audit, trois architectures, cinq revues contradictoires, synthèse).
- `docs/verdict.md` : comment le badge est décidé.
- `LIMITES.md` : ce qui reste fragile.
