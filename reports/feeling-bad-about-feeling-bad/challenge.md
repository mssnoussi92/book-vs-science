# Contradiction du script pilote « feeling-bad-about-feeling-bad » (ar-EG)

Relu le 2026-11-22, script à l'empreinte `e8d549`, avec les deux changements faits après l'écriture (c2 resserré, Wang 2020
à l'écran). Lu : `episode.json`, `lang/ar-EG.json`, `lang/en.json`, `review/…/script.ar-EG.md` et `sources.md` (régénérés
par `npm run -s bvs -- review`, comme demandé), `CLAUDE.md`, `docs/verdict.md`, `languages/ar-EG/language.json`,
`packages/rules/*.ts` (ce que les règles voient et ne voient pas), `content/sources/*.json`, `blind-review.md`,
`counter-evidence.md`, `review-plateformes.md` §(d), `review-science.md` §(d), et l'extrait publié par l'auteur
(`markmanson.net/feedback-loop-from-hell`, relu en entier ; aucune suite de 4 mots anglais commune avec `en.json`).
**Aucun fichier du dépôt modifié** (hors les trois fichiers de `review/` que la commande `bvs review` régénère).

## 1. Les objections

Gravité : **bloquant** = faux ou contraire à `docs/verdict.md` ; **majeur** = la vidéo dit plus que le dossier, se
contredit, ou perd le spectateur ; **mineur** = langue, confort, détail.

| # | Clé ou champ | Objection | Gravité | Réécriture proposée (prête à coller) |
|---|---|---|---|---|
| B1 | `verdict.card` | Périmée : « 3 دراسات · 1,381 شخص · ارتباط، مش تجربة » décrit Ford 2018, pas Wang 2020. Le registre de Wang donne k = 31, **aucun N**, des tâches de labo de quelques minutes, sur des **pensées**. La règle `numbers` ne le verra pas (1,381 est le n de Ford, toujours cité) : la carte passerait fausse. | **bloquant** | `تحليل لـ 31 دراسة · تجارب في المعمل · على الأفكار، مش المشاعر` (court : `تحليل لـ 31 دراسة · تجارب معمل لدقايق`). en : `Analysis of 31 studies · lab experiments · about thoughts, not feelings` |
| B2 | `verdict.l2` (c1) | Avec Wang à l'écran, **« ارتباط » disparaît de la vidéo**, alors que c1 (l'idée centrale du livre) est de certitude basse et ne repose que sur des associations (`verdict.md` §5 : « ارتباط » pour une corrélation). « بيبقوا زعلانين أكتر… أسوأ مع الوقت » raconte une cause dans le temps sans verbe causal (la règle `causal-verbs` ne le voit pas) : « بيبقوا » = « deviennent ». Or Ford mesure la santé à 6 mois sans niveau de départ, Nickerson trouve le lien **dans les deux sens**, Bailen ne connaît pas la direction. La version anglaise dit déjà « tend to » : la source est plus forte que sa traduction. | **bloquant** | `اللي بيلوموا نفسهم على زعلهم، نفسيتهم غالبًا أوحش. بس ده ارتباط… ومش واضح مين بيجيب مين.` (6.2 s) ; à l'image, une flèche dans les deux sens `لوم ⇄ تعب` (la chute qui manque entre 22 et 28 s). en : `People who blame themselves for being upset tend to feel worse. But it's a link… and it's unclear which comes first.` |
| M1 | carte d'étude (minutage) | Si la carte de Wang (31 études **expérimentales**) s'affiche avec le badge ou pendant `verdict.l2`, le spectateur croit que c1 repose sur des expériences. | majeur | La carte d'étude apparaît **sur `verdict.l3`** (c2), jamais avant ; à écrire dans l'épisode (ou une règle : la carte suit la réplique dont l'affirmation porte `onScreen`). |
| M2 | Wang à l'écran (choix) | Seule étude que voit le spectateur : des pensées neutres en labo, dans un épisode sur les sentiments ; dans 4 versions sur 5 (h2 à h5), la carte appuie l'affirmation **secondaire** et l'ours n'existe pas. Défendable (meilleure preuve, causale, certitude modérée) **seulement** avec B2, M1 et « على الأفكار، مش المشاعر » sur la carte. | majeur | Sinon, Ford 2018 revient à l'écran (`3 دراسات · 1,381 شخص · ارتباط، مش تجربة`, pays à écrire : États-Unis). Au propriétaire de trancher. |
| M3 | `hook.h1`, `hook.h1.frame` | « دبّة بيضا » : en égyptien, « دبّة » se dit aussi d'une femme grosse (insulte), et « بيضا » de la peau claire d'une femme : « ne pense pas à une grosse blonde ». Commentaires assurés, sujet corps et genre. | majeur | frame : `ما تفكرش في دب أبيض` (le « الدب الأبيض » de Wegner) |
| M4 | `hook.h1` (sens) | « 3، 2، 1… » puis rien : le gain implicite est « tu as échoué tout de suite », c'est-à-dire l'augmentation **immédiate**, que Wang 2020 (la carte même) ne trouve **que sous charge mentale** ; l'effet solide est le rebond **après**. Et le hook promet un jeu, puis coupe sur un bureau triste. | majeur | `جرّب: ما تفكرش في دب أبيض… لحد آخر الفيديو.` (3.5 s ; le compte à rebours reste à l'image) ; le jeu dure toute la vidéo, son gain arrive en `verdict.l3` (« بترجعلك أكتر بعدين »). |
| M5 | `verdict.a1` (bulle « white-bear ») | La bulle de l'ours passe dans les 5 versions, mais l'ours n'est introduit que par h1 : non-sens pour h2 à h5. | majeur | Bulle = le téléphone ❌ (le refus), sur le Karim de la 1ʳᵉ prise ; l'ours seulement avec h1 (il faut un temps lié à un hook, ex. `onlyWith: ["h1"]` dans le schéma). Avec la nouvelle `l3`, `at.word` = 10 (« بترجعلك »). |
| M6 | `verdict.l3` (c2 resserré) | Ne dit que la 2ᵉ moitié du nouveau c2 ; la 1ʳᵉ (« supprimer un sentiment ne le diminue pas », Webb d = −0,04) est justement ce que fait Karim (« بطّل زعل ») et n'est pas dite. « الفكرة اللي مزعلاه » étend Wang (pensées surtout neutres ; Abramowitz : selon la pensée ; Mamat contredit pour des pensées craintives). Certitude modérée : un « غالبًا ». Ne jamais dire « يكتم » : cacher l'**expression** fait baisser l'émotion (Webb d = 0,32). | majeur | `و«بطّل زعل» دي؟ غالبًا ما بتقلّلش الزعل، والفكرة اللي بتطردها بترجعلك أكتر بعدين.` (5 s, rappel de la réplique de Karim) |
| M7 | `verdict.nuance` + badge | « مش بالظبط » n'a **aucune raison dite** : les deux répliques de science disent oui. La carte porte **deux** nuances (`verdict.md` §5 : une seule), et « مش أحسن من طرق تانية كويسة » ne nomme aucune autre façon (cul-de-sac). Avec B2, la raison dite du ⚖️ devient « ارتباط ». | majeur | Carte, une nuance : `تقبل الإحساس… مش الموقف` (Ford, `feelings-not-situations`), montrée sur l'image de `s1.l8` (« هعدّل الاقتراح »). Elle corrige au passage l'extrait du livre (« accepting that the world is totally f…ed and that's all right »). Dite si le temps le permet : `وإنك تقبل زعلك غير إنك تستسلم: كريم هيعدّل الاقتراح.` (3.5 s). « Pas mieux que d'autres bonnes façons » (que sa décision du pilote nomme) : page des preuves, **question pour lui**. |
| M8 | scène, `a3`/`a5` (spirale 3 → 1) | L'image dit : accepter divise le sentiment par trois. c3 est **mêlée, basse** : Hofmann (accepter = supprimer sur l'anxiété ressentie), Kohl (pas mieux sur l'affect négatif), Dunn, Roos (RCT nul). Ce que dit le livre, c'est la **deuxième couche**. | majeur | Deux calques : un nuage de pluie (le chagrin) **de même taille** dans les deux prises ; la spirale (« زعل فوق زعل ») seulement dans la 1ʳᵉ, **absente** de la 2ᵉ. Le dénouement « a-bit-better » = la boucle partie, le nuage resté, ce que dit « زعلان شوية ». |
| M9 | `takeaway.l1` | « وما تلومش نفسك » est une consigne « ne pense pas à X » 8 s après « la pensée qu'on chasse revient » : l'épisode se contredit (un spectateur attentif le relèvera). 15 mots, 6 s, et c'est la persona IA qui prescrit. | majeur | `اللي عمله كريم، جرّبه النهارده لما تزعل: «آه زعلان، وطبيعي أزعل». ممكن يساعد.` (5 s ; l'action est l'exemple de la scène, la voix ne fait que suggérer) |
| M10 | `book.l1` | Ne dit pas c2, que le verdict juge ensuite (verdict sur une affirmation jamais prêtée au livre). « سيبه » s'entend « laisse tomber / ignore-le » (« سيبك منه ») : de la suppression, que le verdict dit inefficace : fausse contradiction. Les deux idées sont dans l'extrait (« quash it or silence it, only backfires » ; « the acceptance of one's negative experience »). | majeur | `الكتاب بيقول: لما تلوم نفسك على زعلك بيكبر، ولما تطرده بيرجع. الحل؟ اقبله من غير لوم.` (6.2 s, +0.6 s) |
| M11 | structure (rétention) | La scène se résout à ~15 s, puis 25 s de narrateur et de cartes ; avec h2, h4, h5, rien ne dit qu'un verdict arrive. La revue plateformes demandait le livre et le badge caché dès l'image 1, et la 2ᵉ prise « comme dit le livre ». Son coupé, le retour en arrière (`a4`) n'a pas de raison lisible. | majeur | Minimum (sans toucher l'ordre des 5 parties) : une pastille du début au badge `📖 فن اللامبالاة · ⚖️؟` ; pendant `a4`, en texte seul : `الكتاب بيقول: اقبله من غير لوم… نعيدها؟`. Maximum : le livre entre les deux prises (change l'ordre du brief : sa décision). |
| M12 | `hook.h4`, `hook.h4.frame` | Le plus faible : la question « miroir » dite (3 spectateurs sur 4 partis sur khidr-01), et « آخر مرة زعلت من زعلك؟ » se relit deux fois. Garder le **type question** (la règle `hooks` exige 5 types différents) mais **montrée**. | majeur | frame : `زعل فوق زعل… إنت كمان؟` ; image : Karim, nuage + spirale, Nour qui le montre en regardant l'objectif ; `spokenBy: none`. |
| m1 | `s1.l6` (et `takeaway.l1`) | « أنا زعلان. وده طبيعي. » sonne traduit (« I'm upset, and that's okay ») ; au Caire on laisse tomber « أنا ». | mineur | `آه زعلان… وطبيعي أزعل.` |
| m2 | `s1.l2` | « زعلان عشان حاجة تافهة؟ » : correct, mais l'auto-reproche se dit « على… زي دي ». | mineur | `زعلان على حاجة تافهة زي دي؟` |
| m3 | `verdict.l2`, `verdict.nuance` | « صحتهم النفسية » (registre des journaux) et « القبول » (nom abstrait, fousha). | mineur | « نفسيتهم » et « إنك تقبل » (repris dans B2, M7) |
| m4 | chaddas | Aucune inutile pour la voix : جرّب (sinon جرب, la gale), بطّل، هعدّل، أقدّمه، بيكبّره، مكمّل، مأثّر، كلّم lèvent une ambiguïté. **Une manque** : « مزعلاه » → « مزعّلاه » si la réplique reste. À l'écran, des chaddas éparses font désordre : les garder pour la voix, les ôter des sous-titres (les règles les ignorent déjà, `fold`). | mineur | `مزعّلاه` |
| m5 | `s1.l2`, `l3`, `l6` | Monologue intérieur : son coupé, rien ne dit que Karim se parle à lui-même et non à Nour. | mineur | Style de sous-titre « voix intérieure » (bulle grise) pour l2, l3, l6 ; bulle parlée pour l4, l5, l7, l8. |
| m6 | `s1.l5` / `s1.l8` | La 2ᵉ prise ajoute aussi « dire qu'on est triste » à Nour, que le dossier ne teste pas (Webb : cacher l'expression fait baisser l'émotion ; Hu 2014 : cacher coûte moins dans certaines cultures). À garder (c'est le signe honnête « encore triste », et l'illustration du « sentiment, pas situation ») ; le narrateur ne doit jamais en faire un conseil. | mineur | (inchangé) |
| m7 | `takeaway.orientation` | « متخصص » : spécialiste de quoi ? | mineur | `لو الإحساس ده مكمّل أسابيع ومأثّر على حياتك، كلّم أخصائي نفسي.` |
| m8 | `share` | Correct ; un rappel de la scène partage mieux. | mineur | `ابعته لحد بيقول لنفسه «بطّل زعل».` |
| m9 | `hook.h3` | « ما تلومش نفسك على زعلك » : tout le monde est d'accord, pas de tension. L'image « فن اللامبالاة… صح؟ » est bonne (« صح » = l'étiquette ✅). | mineur | `الكتاب ده بيقول: زعلان؟ وإيه يعني! صح؟` (l'esprit de « who gives a f*ck », sans citation) |
| m10 | `hook.h2.frame` | 3ᵉ personne, alors que le titre parle au spectateur. Image fixe (tête dans les mains) : faire tourner la spirale dès l'image 1. | mineur | `زعلان… وزعلان إنك زعلان؟` |
| m11 | `en.json` | À refaire après l'arabe (empreintes `of`) ; aujourd'hui `en` l2 est plus prudent que la source. | mineur | — |
| m12 | durée | B2, M6, M10 ajoutent ~3 s, la nuance dite (M7) 3.5 s de plus, M9 en retire 1 : ~58 à 61 s. Les départs probables : 15-21 s (le livre après la résolution) et 22-28 s (`l2` sans image). | mineur | Au-delà de 60 s : `verdict.l4` passe **écrit** au bas de la carte d'étude (la règle accepte « dite ou écrite ») ou la nuance reste sur la carte seule. Ne pas couper `l4` à l'oral si la nuance n'est pas dite : « مش من مصر » fera parler. |
| m13 | distribution | Karim qui vit le problème : **bon** (contre « الراجل ما بيزعلش » ; Nour à sa place nourrirait « الست عاطفية »), et Nour identique dans les deux prises respecte « une seule chose change ». Mais elle n'est qu'un accessoire (deux « مالك؟ ») et l'aidante bienveillante : alterner qui vit le problème d'un épisode à l'autre. | mineur | (inchangé ici) |
| m14 | persona IA (YouTube) | Le narrateur ne se dit jamais expert, ne dit ni « أنا » ni « بنصحك » : bien. M9 fait de l'action l'exemple de Karim. La voix humaine avant la première publication reste nécessaire. | mineur | — |

## 2. Les 5 hooks, du plus fort au plus faible

1. **h1, défi** (après M3 et M4) : le seul où le spectateur **fait** quelque chose ; « لحد آخر الفيديو » fait durer le jeu
   pendant la scène, le gain arrive en `l3`. Tel qu'écrit : le pire risque de commentaires (« دبّة ») et une promesse
   que la carte même contredit.
2. **h5, POV** : la phrase que tout le monde s'est dite, un geste (poing serré) dès l'image 1, muet, sans voix à
   payer. Plus faible sur Facebook (format TikTok).
3. **h2, ouverture à froid** : la thèse dans l'image, fort en gros plan ; mais image immobile si la spirale ne
   tourne pas. Sur Facebook, je le mettrais devant h5.
4. **h3, promesse du livre** : le titre arabe est très connu en Égypte et « صح؟ » taquine le badge ; mais l'image est
   une carte sans personnage, et la phrase dite (« ما تلومش نفسك ») n'a pas de tension (m9).
5. **h4, question** : la question miroir dite, à relire deux fois. À remplacer par M12.

## 3. Ce que je garderais tel quel

`title` (« زعلان إنك زعلان؟ ») ; `s1.l1`, `s1.l3` (« بطّل زعل بقى! », naturel et repris dans `l3` et `share`), `s1.l4`
et `s1.l7` (la même question, seule la réponse change), `s1.l5`, `s1.l8` ; la forme rejouée, Karim qui vit le
problème, le dénouement « a-bit-better » ; `book.card` (9 mots, fidèle à l'extrait) ; `verdict.l1` ; `verdict.l4` ;
les images de h2, h3 et h5 ; les cinq types de hooks ; la phrase d'orientation (sauf « متخصص ») ; `share`.

## 4. Le script avec ces réécritures (ordre de lecture, ~2.6 mots/s)

| Clé | Texte | ≈ s |
|---|---|---|
| hook.h1 | `جرّب: ما تفكرش في دب أبيض… لحد آخر الفيديو.` (image : `ما تفكرش في دب أبيض` + 3، 2، 1) | 3.5 |
| s1.l1 | `الاقتراح اترفض.` | 1.0 |
| s1.l2 | `زعلان على حاجة تافهة زي دي؟` (voix intérieure) | 2.3 |
| s1.l3 | `بطّل زعل بقى!` (voix intérieure ; spirale qui grossit, nuage constant) | 1.4 |
| s1.l4 / l5 | `مالك؟` / `ولا حاجة.` | 1.6 |
| a4 | retour en arrière + texte seul `الكتاب بيقول: اقبله من غير لوم… نعيدها؟` | 0.8 |
| s1.l6 | `آه زعلان… وطبيعي أزعل.` (voix intérieure ; nuage constant, pas de spirale) | 1.5 |
| s1.l7 / l8 | `مالك؟` / `زعلان شوية. هعدّل الاقتراح وأقدّمه تاني.` | 3.2 |
| book.l1 | `الكتاب بيقول: لما تلوم نفسك على زعلك بيكبر، ولما تطرده بيرجع. الحل؟ اقبله من غير لوم.` | 6.2 |
| verdict.l1 | `والعلم؟ مش بالظبط.` | 1.4 |
| verdict.l2 | `اللي بيلوموا نفسهم على زعلهم، نفسيتهم غالبًا أوحش. بس ده ارتباط… ومش واضح مين بيجيب مين.` (image : `لوم ⇄ تعب`) | 6.2 |
| verdict.l3 | `و«بطّل زعل» دي؟ غالبًا ما بتقلّلش الزعل، والفكرة اللي بتطردها بترجعلك أكتر بعدين.` (carte d'étude ici ; bulle ❌, l'ours avec h1 seulement) | 5.0 |
| verdict.nuance (carte) | `تقبل الإحساس… مش الموقف` (sur l'image de « هعدّل الاقتراح ») | — |
| verdict.l4 | `ومعظم الدراسات من أمريكا وأوروبا، مش من مصر.` | 3.3 |
| takeaway.l1 | `اللي عمله كريم، جرّبه النهارده لما تزعل: «آه زعلان، وطبيعي أزعل». ممكن يساعد.` | 5.0 |
| takeaway.orientation | `لو الإحساس ده مكمّل أسابيع ومأثّر على حياتك، كلّم أخصائي نفسي.` | 4.2 |
| share | `ابعته لحد بيقول لنفسه «بطّل زعل».` | 2.3 |

Total ≈ 55 à 57 s avec les actions muettes (nuance sur la carte seule) ; ≈ 59 à 61 s si la nuance est aussi dite.

Carte d'étude : **`تحليل لـ 31 دراسة · تجارب في المعمل · على الأفكار، مش المشاعر`** (31 = k du registre ; aucun nombre
de personnes, le registre n'en a pas ; « تجارب في المعمل » et « على الأفكار » sont les deux `limits` de la fiche).

## 5. Suite donnée (session, 2026-11-22)

Prises telles quelles : B1, B2, M1, M3, M4, M5, M6, M8, M9, M10, M12, m1, m2, m3, m5, m7, m8, m9, m10, m11. Ce qu'elles ont
demandé aux outils : une action liée à des hooks (`hooks`), un effet tenu jusqu'au suivant ou à la fin de la partie
(`holds`), une légende muette (`caption`), la voix intérieure (`voice: inner`), des actions sur la première image d'un hook
(`beats` d'un hook), une nuance écrite seulement (`nuanceSpoken: false`), la carte d'étude qui arrive avec la première
réplique qu'elle appuie, la pastille « livre · badge caché » du début au livre (`tease`), le nuage de pluie et la flèche
dans les deux sens (`packages/rig/fx.tsx`).

- M7 : la nuance écrite est « تقبل الإحساس… مش الموقف » (Ford 2018) ; « pas mieux que d'autres bonnes façons » (Kohl 2012,
  Gower 2026) reste sur la page des preuves. La décision du pilote la nommait : question posée au propriétaire.
- M2 : Wang 2020 reste à l'écran, avec B2, M1 et « على الأفكار، مش المشاعر » ; question posée au propriétaire.
- M11 : le minimum (pastille, légende du retour en arrière) ; le livre entre les deux prises changerait l'ordre du brief.
- m4 : sans objet (« مزعلاه » n'est plus dans le script). m6, m13, m14 : inchangés, comme proposé.
