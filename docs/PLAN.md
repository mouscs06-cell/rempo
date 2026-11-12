# Plan de construction de Rempo

Écrit le 12 novembre 2026. Le produit, les règles et les interdits de design sont dans `CLAUDE.md`. Ce document dit dans quel ordre on construit.

## Comment lire ce plan

- Chaque étape livre quelque chose qu'on peut ouvrir et tester sur simulateur.
- Une étape n'est finie que si son critère « c'est fini quand » est rempli.
- La ligne **Décidé** d'une étape rappelle les décisions sur lesquelles elle s'appuie, avec le numéro de la question.
- La ligne **À trancher** signale un point encore ouvert qui bloque l'étape.

## Déroulé de chaque étape

1. Plan en 10 lignes maximum, puis accord du fondateur.
2. Construction, avec les états chargement, vide, erreur et hors ligne.
3. Lancement sur simulateur et capture de chaque état.
4. Lint (`npx expo lint`), typecheck (`npx tsc --noEmit`) et tests.
5. Critique Impeccable de l'écran, puis corrections.
6. Liste des tests à faire à la main, et liste de ce qui n'a pas pu être vérifié.
7. Proposition de commit.

## Décisions prises

Les 14 questions d'architecture sont tranchées par le fondateur, le 12 novembre 2026.

| N°  | Question                                                | Décision                                                                                                                            |
| --- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Quelles plateformes en V1 ?                             | iOS et Android, pas de web                                                                                                          |
| 2   | Quand l'utilisateur crée-t-il un compte, et avec quoi ? | Session anonyme au lancement, liaison Apple, Google ou e-mail après le paywall                                                      |
| 3   | La séance doit-elle marcher sans réseau ?               | Oui : données d'abord sur le téléphone (SQLite), puis synchronisation vers Supabase                                                 |
| 4   | Où tourne le moteur de séance ?                         | 100 % sur l'appareil, en TypeScript pur, hors ligne                                                                                 |
| 5   | Où vivent les exercices et les fiches « Pourquoi ? » ?  | Dans le dépôt, en JSON, avec un champ « validé par le relecteur »                                                                   |
| 6   | Comment saisit-on un repas ?                            | Par portions types. Liste d'aliments courants livrée avec l'app (100 à 200 entrées, protéines et fibres). Pas de base externe en V1 |
| 7   | Rappels : locaux ou envoyés par un serveur ?            | Notifications locales                                                                                                               |
| 8   | Comment mesure-t-on les indicateurs ?                   | Table d'événements Supabase et tableaux RevenueCat. Événements limités à l'indicateur des 3 séances en 14 jours                     |
| 9   | Quel paywall ?                                          | Paywall dur : aucun accès sans abonnement. Écran fait maison avec la date de fin d'essai. RevenueCat pour l'achat seulement         |
| 10  | Quelles démonstrations d'exercices ?                    | Illustrations fixes en 2 ou 3 poses, en commençant par les exercices les plus courants. Bundle ou hébergement : tranché au prompt 7 |
| 11  | Où sont hébergées les données ?                         | Supabase en région Union européenne. Suppression de compte dans l'app dès la V1                                                     |
| 12  | Thème clair, sombre, ou les deux ?                      | Un seul en V1, choisi à l'étape 1                                                                                                   |
| 13  | Que devient le brief d'origine ?                        | Gardé dans `docs/rempo-brief.md`, avec en tête « ARCHIVE — source de vérité : CLAUDE.md »                                           |
| 14  | Quels tests automatiques ?                              | Jest (jest-expo) pour le moteur dès l'étape 2, tests d'écran plus tard                                                              |

## Points encore ouverts

- **Objectifs :** 5 dans le brief (dont « les deux »), 4 sur l'écran 1 du doc de cadrage. Bloque l'étape 4.
- **Calories :** décidé dans le brief, « à trancher » dans le doc de cadrage. Bloque l'étape 8.
- **Démonstrations :** livrées dans l'app ou hébergées (question 10, tranché au prompt 7).
- **Liste d'aliments :** la source des valeurs de protéines et de fibres reste à choisir et à faire valider par le relecteur. Aucune valeur ne doit être inventée. Bloque l'étape 8.

## Stack : ce qui a changé et ce qu'il faut respecter

Vérifié le 12 novembre 2026 dans les docs officielles. Installé : Expo SDK 58, React Native 0.88.1, React 19.3, Expo Router 58, TypeScript 6. Node 22.13 minimum.

### Expo SDK 58

- **Build de développement obligatoire.** RevenueCat a du code natif, donc Expo Go ne suffit pas. Les scripts utilisent déjà `expo run:ios`.
- **Supprimé dans React Native 0.88 :** `InteractionManager`, les `Touchable*` exportés à la racine, les props `backgroundColor` et `translucent` de `StatusBar`, la prop `animated` de `Modal`. `ImageBackground` est déprécié. Utiliser `Pressable`.
- **Expo Router 58 :**
  - `initialRouteName` est remplacé par `export const unstable_settings = { anchor }`.
  - Les props `redirect` et `initialParams` de `Screen` sont supprimées. `Stack.Protected` les remplace.
  - `useRouter()` est préféré au `router` importé directement.
  - Les tests d'écran demandent `@testing-library/react-native` version 14 ou plus.
- **En-têtes iOS 26 :** transparents par défaut (effet « Liquid Glass »). Le brief interdit le verre dépoli : mettre `headerTransparent: false`.
- **`web.output: "server"`** dans `app.json` a changé de comportement. Sans objet : la cible web est retirée à l'étape 0.
- **`expo-notifications` :** les notifications s'affichent par défaut quand l'app est ouverte.
- **Android :** R8 est actif par défaut en production. Certaines bibliothèques demandent des règles de conservation.

### Supabase

- **Clés :** `anon` et `service_role` sont dépréciées d'ici fin 2026. Utiliser la clé « publishable » (`sb_publishable_…`) dans `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Jamais de clé secrète dans l'app.
- **Stockage de session :** suivre le guide Expo, qui recommande `expo-sqlite/localStorage`. Le guide Supabase cite encore AsyncStorage et `react-native-url-polyfill`, que le guide Expo dit inutile.
- **Réglages du client :** `detectSessionInUrl: false`, et le rafraîchissement du jeton branché sur `AppState`.

### RevenueCat

- **Paquets :** `react-native-purchases` et `expo-dev-client`. Pas de `react-native-purchases-ui` : le paywall est fait maison (question 9).
- **Version :** la doc demande Expo SDK 54 ou plus.
- **Expo Go :** mode aperçu avec de faux achats seulement.

### Non vérifié

- La doc RevenueCat ne cite pas React Native 0.88 par son nom. À confirmer à l'installation avec `npx expo install`, puis `npx expo-doctor`.
- Les pages Supabase sur la connexion anonyme, la liaison de compte et « Sign in with Apple » n'ont pas été lues. À lire avant l'étape 9.
- La compatibilité de jest-expo avec le SDK 58 n'a pas été vérifiée. À lire avant l'étape 2.
- La sortie d'Expo Go pour le SDK 58 n'a pas été vérifiée.

### Sources

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- [Changelog SDK 58](https://expo.dev/changelog/sdk-58)
- [Migration Expo Router 57 vers 58](https://docs.expo.dev/router/migrate/sdk-57-to-58.md)
- [Supabase avec Expo](https://docs.expo.dev/guides/using-supabase.md)
- [Clés Supabase](https://supabase.com/docs/guides/api/api-keys)
- [RevenueCat pour Expo](https://www.revenuecat.com/docs/getting-started/installation/expo)

## Les étapes

L'abonnement arrive à l'étape 10 alors que le paywall est au début du parcours utilisateur. C'est voulu : on teste le cœur du produit sans compte ni achat, puis on pose la garde.

### Étape 0. Socle technique (fait le 12 novembre 2026, sauf Android)

- **Objectif :** partir d'une app vide, sans rien du gabarit ni cible web, avec l'outillage en place.
- **Livré :** gabarit et cible web retirés ; `npm run check` (types, lint, format, tests) ; arborescence par domaine ; routes vides `src/app/(tabs)/` et `src/app/onboarding/` ; Jest avec un premier test ; base SQLite et migrations dans `src/data/db/` ; `.env.example`.
- **Décidé :** pas de web (question 1), un seul thème (question 12), expo-sqlite seul, onglets JavaScript à fond plein.
- **Reste à faire :** lancer l'app sur un émulateur Android. Aucun outil Android n'était installé sur le Mac.

### Étape 1. Arrêter la direction visuelle

- **Objectif :** choisir la typographie, la palette, l'idée visuelle et le thème unique (clair ou sombre), puis les fixer en tokens.
- **Fichiers :** `src/theme/index.ts` (tokens provisoires à remplacer), polices dans `assets/`, icônes des onglets dans `src/app/(tabs)/_layout.tsx`, un écran témoin provisoire.
- **Décidé :** un seul thème (question 12).
- **C'est fini quand :** le fondateur a validé sur simulateur une typographie, un fond, une couleur de texte et un accent, et chaque contraste mesuré dépasse 4,5:1.

### Étape 2. Poser la bibliothèque d'exercices

- **Objectif :** décrire les exercices et leurs équivalents, d'abord les plus courants, puis les 120.
- **Fichiers :** `src/engine/types.ts`, `src/data/exercises.json`, tests, un écran de contrôle interne.
- **Décidé :** contenu en JSON dans le dépôt (question 5), Jest avec jest-expo (question 14), exercices les plus courants d'abord (question 10).
- **C'est fini quand :** l'écran de contrôle liste les exercices par lieu, et un test Jest prouve que chacun a un équivalent dans chaque inventaire.

### Étape 3. Moteur : séance, substitution, progression

- **Objectif :** générer une séance selon le lieu, le matériel, le temps et l'objectif, et la faire progresser.
- **Fichiers :** `src/engine/*`, tests.
- **Décidé :** moteur 100 % sur l'appareil, en TypeScript pur, sans import de React ni d'Expo (question 4).
- **C'est fini quand :** sur l'écran de contrôle en mode avion, changer de lieu ou de matériel redonne une séance faisable, et les tests du moteur passent.

### Étape 4. Onboarding, écrans 1 à 6

- **Objectif :** recueillir objectif, niveau, lieux, matériel, disponibilité et poids.
- **Fichiers :** `src/app/onboarding/*`, nouvelle migration dans `src/data/db/migrations.ts`.
- **Décidé :** données d'abord sur le téléphone (question 3).
- **À trancher :** 5 ou 4 objectifs.
- **C'est fini quand :** le parcours se fait en moins de 3 minutes sur simulateur, et les réponses survivent à un redémarrage.

### Étape 5. Fiches « Pourquoi ? » et aperçu du plan (écran 7)

- **Objectif :** afficher une fiche de preuve au format du brief, et montrer le plan avec une fiche ouverte.
- **Fichiers :** `src/data/evidence.json`, composant de fiche, `src/app/onboarding/plan.tsx`.
- **Décidé :** fiches en JSON dans le dépôt (question 5).
- **C'est fini quand :** les 9 règles ont une fiche complète, chacune marquée validée ou non par le relecteur, et aucune étude ni aucun chiffre n'a été inventé.

### Étape 6. Séance du jour guidée

- **Objectif :** dérouler une séance : démonstration, minuteur de repos, saisie d'une série.
- **Fichiers :** `src/app/(tabs)/session.tsx`, `src/app/session/*` (déroulé plein écran), minuteur de repos, illustrations des exercices.
- **Décidé :** illustrations fixes en 2 ou 3 poses, exercices les plus courants d'abord (question 10).
- **À trancher :** illustrations livrées dans l'app ou hébergées (prompt 7).
- **C'est fini quand :** une séance de 15 à 20 min se fait de bout en bout sans réseau, le repos se prolonge, la saisie d'une série prend un geste, et chaque exercice de la séance a son illustration validée ou un état « illustration à venir ».

### Étape 7. Semaine flexible

- **Objectif :** déplacer une séance et recalculer le plan après un jour manqué.
- **Fichiers :** `src/app/(tabs)/week.tsx`, `src/engine/schedule.ts`.
- **C'est fini quand :** déplacer une séance et manquer un jour recalculent le plan, sans message de reproche, avec la version de 20 minutes proposée.

### Étape 8. Nutrition à deux cibles

- **Objectif :** suivre protéines et fibres par jour, à partir d'une liste d'aliments courants.
- **Fichiers :** `src/app/(tabs)/nutrition.tsx`, `src/data/foods.json` (100 à 200 entrées : portion type, protéines, fibres, source, validation du relecteur).
- **Décidé :** saisie par portions types, liste livrée avec l'app, pas de base externe (question 6).
- **À trancher :** la source des valeurs de la liste, et le statut des calories.
- **C'est fini quand :** un repas se saisit en quelques secondes sans réseau, les cibles se calculent depuis le poids, aucun signal rouge n'apparaît, et chaque aliment cite sa source.

### Étape 9. Compte et synchronisation Supabase

- **Objectif :** sauvegarder les données, les retrouver sur un autre téléphone, et lier un compte.
- **Fichiers :** `src/lib/supabase.ts`, schéma et règles d'accès, écran de liaison de compte, `app.json`.
- **Décidé :** session anonyme au lancement puis liaison Apple, Google ou e-mail (question 2), synchronisation depuis le téléphone (question 3), projet en région Union européenne (question 11).
- **C'est fini quand :** une session anonyme se crée au premier lancement, la liaison garde les données déjà saisies, elles se retrouvent après réinstallation, et un compte ne lit pas les données d'un autre.

### Étape 10. Abonnement et paywall (écran 8)

- **Objectif :** proposer l'essai de 7 jours à la fin de l'onboarding, bloquer tout accès sans abonnement, puis proposer la liaison de compte.
- **Fichiers :** `src/lib/purchases.ts`, `src/app/onboarding/paywall.tsx`, garde `Stack.Protected` dans `src/app/_layout.tsx`.
- **Décidé :** paywall dur, écran fait maison, RevenueCat pour l'achat seulement (question 9), liaison de compte après le paywall (question 2).
- **C'est fini quand :** un achat de test démarre l'essai, la date de fin s'affiche, la séance 1 s'ouvre aussitôt après, et aucun écran de l'app n'est joignable sans abonnement actif, y compris après un redémarrage et après l'expiration de l'essai.

### Étape 11. Rappels et bilans (J4, J5, J7, J14)

- **Objectif :** proposer le changement de lieu à J4, rappeler la fin d'essai à J5, afficher les bilans à J7 et J14.
- **Fichiers :** `src/lib/notifications.ts`, `src/app/review/*`.
- **Décidé :** notifications locales (question 7).
- **C'est fini quand :** en avançant la date du simulateur, chaque rappel et chaque bilan arrive au bon jour, et l'app reste utilisable si l'utilisateur refuse les notifications.

### Étape 12. Finitions avant bêta

- **Objectif :** rendre l'app distribuable à des testeurs.
- **Fichiers :** réglages, mention « ceci n'est pas un avis médical », suppression de compte, événements de mesure, configuration EAS.
- **Décidé :** événements limités à l'indicateur des 3 séances en 14 jours, dans une table Supabase (question 8), suppression de compte dans l'app (question 11).
- **C'est fini quand :** la suppression de compte efface les données côté Supabase, l'indicateur des 3 séances en 14 jours se lit dans la table d'événements, un build de test est installé sur un vrai téléphone, et la liste de tests manuels est passée en entier.
