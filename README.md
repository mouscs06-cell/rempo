# Rempo

App mobile de coaching : musculation en salle, à la maison ou au parc, nutrition à deux cibles, et chaque recommandation sourcée. iOS et Android, construite avec Expo.

## Lancer l'app

```bash
npm install
cp .env.example .env
npm run ios
```

L'app a du code natif : elle se lance avec un build de développement, pas avec Expo Go.

## Vérifier le code

```bash
npm run check
```

Cette commande lance les types, le lint, le format et les tests. Elle doit passer avant chaque commit.

## Documentation

- `CLAUDE.md` : le produit, les règles, les décisions et l'arborescence.
- `docs/PLAN.md` : les étapes de construction.
