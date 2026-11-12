import type { SQLiteDatabase } from 'expo-sqlite';

import { pendingMigrations } from './migrations';

export const DATABASE_NAME = 'rempo.db';

/** Amène la base locale à la dernière version du schéma. Appelée à l'ouverture de l'app. */
export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('PRAGMA journal_mode = WAL');

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  for (const migration of pendingMigrations(currentVersion)) {
    await db.withTransactionAsync(async () => {
      for (const statement of migration.statements) {
        await db.execAsync(statement);
      }
      await db.execAsync(`PRAGMA user_version = ${migration.version}`);
    });
  }
}
