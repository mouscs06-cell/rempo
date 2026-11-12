ARCHIVE — source de vérité : CLAUDE.md

# Rempo

Ajoute en haut de la section design de CLAUDE.md cette règle, sans rien modifier d'autre :

« Skills de design autorisés dans ce projet : frontend-design et impeccable uniquement. N'utilise jamais ui-ux-pro-max, design-taste-frontend, high-end-visual-design, image-to-code, ckm:design-system ni ckm:ui-styling, même s'ils semblent pertinents. Pour le mobile : react-native-best-practices (Software Mansion) et le skill Expo. »

Montre-moi le résultat.
App mobile de coaching : musculation en salle, à la maison ou au parc, nutrition à deux cibles, et chaque recommandation sourcée.

Cadrage complet (décisions, études, parcours) : https://claude.ai/artifact/WcnqsHPLRiaiiXLCo7Ez1j

## Produit

- **Cible :** 18-30 ans en France, débutants et intermédiaires.
- **Promesse :** « Tu sais quoi faire et quoi manger aujourd'hui, et pourquoi. »
- **Différenciateur 1 :** un seul programme qui suit l'utilisateur d'un lieu à l'autre, en remplaçant chaque exercice par son équivalent selon le matériel disponible.
- **Différenciateur 2 :** chaque recommandation affiche son étude, son niveau de preuve et sa limite.
- **Langue de l'interface :** français.

## Les quatre piliers

1. **Séance du jour.** Générée selon le lieu, le matériel et le temps disponible, avec progression automatique.
2. **Nutrition à deux cibles.** Protéines et fibres par jour. Calories en option pour tous, proposées à l'activation quand l'objectif est « perdre du gras ». Aucun signal rouge, aucun message culpabilisant.
3. **Preuves.** Bouton « Pourquoi ? » sur chaque recommandation.
4. **Semaine flexible.** Séances déplaçables, plan recalculé après un jour manqué, aucune série punitive.

## Moteur par matériel

Trois inventaires pour un seul moteur :

- **Salle :** préréglage low-cost complet, ajustable machine par machine.
- **Maison :** tapis, haltères (poids max), barre et disques, kettlebell, élastiques, banc, barre de traction de porte.
- **Parc :** barre de traction, barres parallèles, barres basses, anneaux, ou poids du corps seul.

Règles :

1. Ne proposer que des exercices faisables avec le matériel déclaré.
2. Remplacer un exercice par son équivalent quand le lieu change.
3. Faire progresser la difficulté : plus de charge avec du matériel, variante plus dure au poids du corps.

Bibliothèque V1 : environ 120 exercices, chacun étiqueté par matériel requis, groupe musculaire, niveau, et lié à ses équivalents. Chaque exercice doit avoir au moins un équivalent dans chaque inventaire. Au poids du corps, V1 = fondamentaux seulement (tractions, dips, pompes, squats, fentes, gainage) avec régressions et progressions.

## Objectifs proposés à l'utilisateur

Prendre du muscle, perdre du gras, les deux, gagner en force, rester en forme. L'objectif « les deux » doit être présenté honnêtement : il fonctionne surtout chez les débutants et progresse plus lentement.

## Règles du moteur et leurs sources

| Règle                                             | Source                                           | Solidité |
| ------------------------------------------------- | ------------------------------------------------ | -------- |
| Repos pour le muscle : 60 à 90 s minimum          | Singer et al., 2024                              | Moyenne  |
| Repos pour la force, débutant : 1 à 2 min         | Grgic et al., 2018                               | Bonne    |
| Repos pour la force, entraîné : plus de 2 min     | Grgic et al., 2018                               | Bonne    |
| Plus de séries par semaine, rendement décroissant | Pelland et al., 2026                             | Bonne    |
| Charge libre pour le muscle, lourde pour la force | Schoenfeld et al., 2017 ; Lopez et al., 2021     | Bonne    |
| Finir les séries à 0-5 répétitions de l'échec     | Robinson et al., 2024                            | Moyenne  |
| Pompes équivalentes au développé couché           | Kikuchi & Nakazato, 2017 ; Kotarsky et al., 2018 | Limitée  |
| Protéines : environ 1,6 g/kg/jour                 | Morton et al., 2018                              | Bonne    |
| Fibres : 25 à 30 g/jour                           | Reynolds et al., 2019                            | Bonne    |

Contraintes :

- Le repos est une valeur par défaut que l'utilisateur peut prolonger, jamais une loi.
- Les équivalences poids du corps ne sont prouvées directement que pour les pompes : la fiche doit le dire.
- Pas de chiffre « prouvé » pour le repos en endurance musculaire.
- Ne jamais inventer une étude, un chiffre ou une citation. Si une source manque, le signaler.
- Toutes les fiches et toutes les démonstrations d'exercices sont validées par le relecteur avant publication.

Format d'une fiche « Pourquoi ? » : la règle en une phrase, l'étude (auteurs, année, taille, lien), le niveau de preuve (solide, moyen, limité), la limite, la date de mise à jour.

## Parcours des 14 premiers jours

Indicateur principal : 3 séances faites dans les 14 premiers jours. Cible interne : séance 1 le jour de l'installation, séance 2 avant J3, séance 3 avant J7.

Onboarding en moins de 3 minutes, 8 écrans : objectif, niveau, lieux, matériel, disponibilité, poids, aperçu du plan avec une fiche « Pourquoi ? » ouverte, puis essai gratuit.

- **Paywall :** obligatoire à la fin de l'onboarding, juste après l'aperçu du plan, essai gratuit de 7 jours. La date de fin d'essai est affichée.
- La séance 1 (15 à 20 min) démarre aussitôt après le paywall.
- J4 : proposer la même séance dans un autre lieu.
- J5 : rappel que l'essai se termine dans 2 jours.
- J7 et J14 : bilans.
- Jour manqué : replanifier sans commentaire et proposer une version de 20 minutes.

## Modèle économique

Abonnement : annuel mis en avant autour de 40 à 50 €, mensuel à 9,99 €.

## Périmètre

- **V1 :** onboarding, moteur par matériel sur trois lieux, bibliothèque d'exercices, substitutions, progression automatique, minuteur de repos, deux cibles nutrition, fiches « Pourquoi ? », semaine flexible, abonnement.
- **Hors V1 :** calories par photo, fil social, montres connectées, plans de repas complets, figures avancées de street workout.
- **V2 :** carte des parcs de street workout, figures (muscle-up, front lever, planche), module compléments.

## Stack (proposée, à confirmer avant de coder)

Expo (React Native) et TypeScript, Supabase pour les données et l'authentification, RevenueCat pour l'abonnement. Ne pas initialiser le projet tant que la stack n'est pas confirmée.

## Design : rien de générique

Le fondateur refuse tout rendu « généré par IA ». Direction : simple et premium. La direction visuelle n'est pas encore arrêtée : proposer, montrer, faire valider avant de généraliser.

Interdits :

- Polices par défaut des outils IA (Inter, Space Grotesk, Roboto, system-ui) comme identité de marque.
- Dégradés violets ou bleus, effets de verre dépoli, halos lumineux.
- Cartes arrondies avec bordure colorée à gauche, ombres portées diffuses partout.
- Emojis dans l'interface.
- Grilles de trois cartes identiques avec icône, titre, texte.
- Textes de remplissage, statistiques inventées, slogans interchangeables.
- Animations décoratives sans fonction.

Exigé :

- Une typographie de caractère choisie pour Rempo, avec une raison.
- Une palette courte : un fond, une couleur de texte, un seul accent.
- Une idée visuelle propre au produit (le tempo, le rythme des répétitions, la preuve) qui se retrouve partout.
- Des zones tactiles d'au moins 44 px et des contrastes de texte d'au moins 4,5:1.
- De vrais composants natifs accessibles.
- Utiliser le plugin frontend-design s'il est installé.

## Façon de travailler

- Avancer section par section, avec validation visuelle entre chaque étape.
- Être concis et direct. Critique de design honnête, pas diplomatique.
- Répondre en français.
- Avant tout gros changement, exposer le plan et attendre l'accord.

## Points encore ouverts

- Nom « Rempo » : vérifier les marques (INPI, EUIPO), les stores et le nom de domaine avant tout investissement.
- Direction visuelle et logo.
- Format des démonstrations d'exercices (animations schématiques ou illustrations).
- Référence française officielle pour les fibres (ANSES) à confirmer.
- Mention « ceci n'est pas un avis médical » à prévoir.
