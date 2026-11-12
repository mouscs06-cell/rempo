# Rempo

App mobile de coaching : musculation en salle, à la maison ou au parc, nutrition à deux cibles, et chaque recommandation sourcée.

Cadrage complet (décisions, études avec leurs liens, parcours) : https://claude.ai/artifact/WcnqsHPLRiaiiXLCo7Ez1j
Plan de construction : docs/PLAN.md

## Instructions Expo

@AGENTS.md

## Façon de travailler

- Répondre en français, en phrases simples. Être concis et direct.
- Avancer section par section, avec validation visuelle entre chaque étape.
- Avant tout gros changement, exposer le plan et attendre l'accord.
- Critique de design honnête, pas diplomatique.

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

## Objectifs proposés à l'utilisateur

Prendre du muscle, perdre du gras, les deux, gagner en force, rester en forme.
« Les deux » doit être présenté honnêtement : il fonctionne surtout chez les débutants et progresse plus lentement.

## Moteur par matériel

Trois inventaires pour un seul moteur :

- **Salle :** préréglage low-cost complet, ajustable machine par machine.
- **Maison :** tapis, haltères (poids max), barre et disques, kettlebell, élastiques, banc, barre de traction de porte.
- **Parc :** barre de traction, barres parallèles, barres basses, anneaux, ou poids du corps seul.

Règles :

1. Ne proposer que des exercices faisables avec le matériel déclaré.
2. Remplacer un exercice par son équivalent quand le lieu change.
3. Faire progresser la difficulté : plus de charge avec du matériel, variante plus dure au poids du corps.

Bibliothèque V1 : environ 120 exercices, chacun étiqueté par matériel requis, groupe musculaire, niveau, et lié à ses équivalents. Chaque exercice a au moins un équivalent dans chaque inventaire. Au poids du corps, V1 = fondamentaux seulement (tractions, dips, pompes, squats, fentes, gainage) avec régressions et progressions.

## Preuves

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

- La séance 1 (15 à 20 min) démarre aussitôt après le paywall.
- J4 : proposer la même séance dans un autre lieu.
- J5 : rappel que l'essai se termine dans 2 jours.
- J7 et J14 : bilans.
- Jour manqué : replanifier sans commentaire et proposer une version de 20 minutes.

## Paywall et modèle économique

- Paywall obligatoire à la fin de l'onboarding, juste après l'aperçu du plan.
- Essai gratuit de 7 jours. La date de fin d'essai est affichée.
- Abonnement : annuel mis en avant autour de 40 à 50 €, mensuel à 9,99 €.

## Périmètre

- **V1 :** onboarding, moteur par matériel sur trois lieux, bibliothèque d'exercices, substitutions, progression automatique, minuteur de repos, deux cibles nutrition, fiches « Pourquoi ? », semaine flexible, abonnement.
- **Hors V1 :** calories par photo, fil social, montres connectées, plans de repas complets, figures avancées de street workout.
- **V2 :** carte des parcs de street workout, figures (muscle-up, front lever, planche), module compléments.

## Stack

- **En place :** Expo SDK 58, React Native 0.88, TypeScript strict, Expo Router, expo-sqlite, ESLint, Prettier, Jest (jest-expo).
- **Retenu, pas encore installé :** Supabase pour les données et l'authentification, RevenueCat pour l'abonnement.
- N'installer aucune dépendance sans accord. Toujours avec `npx expo install`.
- Avant de déclarer une tâche finie : `npm run check` (types, lint, format, tests).

## Arborescence

Tout le code est dans `src/`, rangé par domaine.

- `app/` : les écrans. Ce sont les routes Expo Router. Ils affichent et appellent, sans logique métier.
- `app/(tabs)/` : les quatre onglets (séance, nutrition, semaine, profil). `app/onboarding/` : l'onboarding.
- `components/` : les composants d'interface partagés entre écrans.
- `theme/` : les tokens (couleurs, espacements, typographie). Aucune couleur en dur ailleurs.
- `engine/` : le moteur. TypeScript pur, sans React ni Expo ; ESLint refuse ces imports.
- `data/` : le stockage local SQLite (`data/db/`) et les contenus JSON (exercices, fiches, aliments).
- `lib/` : les services externes (Supabase, RevenueCat).
- Sens des dépendances : `app` importe tout ; `engine` n'importe que lui-même.
- Tests : dans un dossier `__tests__/` voisin du code, fichiers en `-test.ts`. Jamais dans `app/`.

## Décisions d'architecture

Prises par le fondateur le 12 novembre 2026. Le détail par étape est dans docs/PLAN.md.

- **Plateformes :** iOS et Android. Pas de web.
- **Compte :** session anonyme au lancement. Liaison Apple, Google ou e-mail après le paywall.
- **Hors ligne :** la séance marche sans réseau. Les données vivent d'abord sur le téléphone (SQLite), puis se synchronisent vers Supabase.
- **Moteur :** 100 % sur l'appareil, en TypeScript pur, utilisable hors ligne.
- **Contenu :** les exercices et les fiches « Pourquoi ? » sont dans le dépôt, en JSON, avec un champ « validé par le relecteur ».
- **Nutrition :** saisie par portions types. Une liste d'aliments courants est livrée avec l'app (100 à 200 entrées, protéines et fibres). Pas de base externe en V1.
- **Rappels :** notifications locales.
- **Mesure :** une table d'événements dans Supabase et les tableaux RevenueCat. Les événements se limitent à l'indicateur des 3 séances en 14 jours.
- **Paywall :** paywall dur, aucun accès sans abonnement. Écran fait maison avec la date de fin d'essai. RevenueCat sert à l'achat seulement.
- **Démonstrations :** illustrations fixes en 2 ou 3 poses, en commençant par les exercices les plus courants. Bundle ou hébergement : tranché au prompt 7.
- **Données :** Supabase en région Union européenne. Suppression de compte dans l'app dès la V1.
- **Thème :** un seul en V1, clair ou sombre, choisi avec la direction visuelle.
- **Tests :** Jest (jest-expo) pour le moteur dès l'étape 2. Tests d'écran plus tard.
- **Stockage local :** expo-sqlite seul, SQL et migrations écrits à la main dans `src/data/db/`. Pas d'ORM.
- **Onglets :** onglets JavaScript à fond plein. Pas d'onglets natifs : ils imposent le verre dépoli sur iOS 26 et plus.
- **Brief d'origine :** archivé dans docs/rempo-brief.md. Ce fichier-ci est la source de vérité.

## Design : rien de générique

Skills de design autorisés : frontend-design et impeccable uniquement. Ne jamais utiliser ui-ux-pro-max, design-taste-frontend, high-end-visual-design, image-to-code, ckm:design-system ni ckm:ui-styling. Pour le mobile : react-native-best-practices (Software Mansion) et le awesome-react-native-skills:react-native-expo.

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

## Points encore ouverts

- Nom « Rempo » : vérifier les marques (INPI, EUIPO), les stores et le nom de domaine avant tout investissement.
- Direction visuelle et logo.
- Démonstrations d'exercices : livrées dans l'app ou hébergées (tranché au prompt 7).
- Source des valeurs de protéines et de fibres de la liste d'aliments : à choisir et à faire valider par le relecteur.
- Référence française officielle pour les fibres (ANSES) à confirmer.
- Mention « ceci n'est pas un avis médical » à prévoir.
