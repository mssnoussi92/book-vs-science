# Code repris d'autres dépôts

Rien n'est importé d'un autre dépôt : ce qui sert est **copié**, avec son origine en tête du fichier
(`vendored from <dépôt>@<sha>:<chemin>`) et une ligne ici. Les deux dépôts d'origine sont sous licence MIT
(© 2026 mssnoussi92) et ne sont jamais modifiés depuis celui-ci. Un correctif de production fait là-bas ne passe pas
seul ici : cette liste sert à le reporter à la main.

| Fichier ici | Origine | Ce qui a changé |
|---|---|---|
| `packages/rig/skeleton.ts` | quran-themes-demo@c20d118 `video/src/trial/Sahib.tsx` (`Pose`, `SEG`, `reach`, géométrie des membres) et `video/src/trial/Lens.tsx` (`mix`, `walk`, poses) | tête 1,25× plus grande ; poses de gestes ajoutées ; `joints()` sépare le calcul du dessin |
| `packages/rig/Rig.tsx` (`Part`, contour à double trait, mains) | quran-themes-demo@c20d118 `video/src/trial/Sahib.tsx` (`Stick`) | habits (couleurs), cheveux ou hijab, visage paramétrique (sourcils, paupières, bouche à visèmes) au lieu des 12 visages figés ; mains au bout des bras par cinématique inverse (`handsTo`) |
| `remotion.config.ts` | quran-themes-demo@c20d118 `video/remotion.config.ts` | point d'entrée et dossier public |

Origines : `mssnoussi92/quran-themes-demo@c20d118`, `mssnoussi92/quran-reels@61b651d` (2026-11-22).
