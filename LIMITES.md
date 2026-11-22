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

- Le multi-locuteurs de Gemini en égyptien n'a jamais été essayé ; la limite gratuite des modèles TTS n'est pas publiée
  (« not guaranteed ») ; Google change de modèle tous les quelques mois (un changement = un nouveau casting).
- **Rhubarb Lip Sync** est mal adapté à l'arabe (mesuré sur deux prises égyptiennes : « aa » 3 % des images, lèvres
  arrondies jusqu'à 20 %) ; d'autres moteurs sont comparés à l'aveugle.
- La lisibilité d'une bouche dessinée sur un téléphone n'est vérifiée que sur planche.

## Coût et dépendances

- Le vrai coût est l'**abonnement Claude** du propriétaire, partagé avec ses deux autres dépôts : mesuré au pilote.
- **Remotion** n'est pas open source ; aucune sortie vers un moteur libre n'est construite.
- **GitHub Actions** : rendre chaque jour les vidéos d'une chaîne monétisée est une zone grise de ses conditions ; une
  image Docker pour un serveur personnel reste le plan B.
- **Validation** : `performed_via_github_app` distingue une session du propriétaire, mais ce n'est pas une preuve
  cryptographique.
- **Juridique** (pas un avis) : clause EEE des conditions Gemini lue comme visant une application offerte à d'autres ;
  titres de livres cités comme simple référence ; protection incertaine de textes écrits avec une IA.
