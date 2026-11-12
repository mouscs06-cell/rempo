export type Migration = {
  /** Numéro de version atteint une fois la migration appliquée. Commence à 1, sans trou. */
  version: number;
  statements: readonly string[];
};

/**
 * Historique du schéma local. On n'édite jamais une migration déjà livrée :
 * on en ajoute une nouvelle à la fin.
 */
export const migrations: readonly Migration[] = [
  {
    version: 1,
    statements: [
      `CREATE TABLE settings (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    ],
  },
];

/**
 * Renvoie les migrations à appliquer à une base qui est à la version `currentVersion`,
 * dans l'ordre.
 */
export function pendingMigrations(
  currentVersion: number,
  all: readonly Migration[] = migrations,
): Migration[] {
  all.forEach((migration, index) => {
    if (migration.version !== index + 1) {
      throw new Error(
        `Migration mal numérotée : attendu ${index + 1}, trouvé ${migration.version}.`,
      );
    }
  });

  if (currentVersion > all.length) {
    throw new Error(
      `La base locale est en version ${currentVersion}, plus récente que l'app (${all.length}).`,
    );
  }

  return all.slice(Math.max(currentVersion, 0));
}
