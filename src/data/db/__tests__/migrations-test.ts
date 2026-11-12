import { migrations, pendingMigrations, type Migration } from '../migrations';

const three: Migration[] = [
  { version: 1, statements: ['A'] },
  { version: 2, statements: ['B'] },
  { version: 3, statements: ['C'] },
];

describe('pendingMigrations', () => {
  it('applique tout sur une base neuve', () => {
    expect(pendingMigrations(0, three).map((m) => m.version)).toEqual([1, 2, 3]);
  });

  it("n'applique que les migrations manquantes", () => {
    expect(pendingMigrations(2, three).map((m) => m.version)).toEqual([3]);
  });

  it("n'applique rien sur une base à jour", () => {
    expect(pendingMigrations(3, three)).toEqual([]);
  });

  it("refuse une base plus récente que l'app", () => {
    expect(() => pendingMigrations(4, three)).toThrow(/plus récente/);
  });

  it('refuse une liste mal numérotée', () => {
    const gap: Migration[] = [
      { version: 1, statements: [] },
      { version: 3, statements: [] },
    ];
    expect(() => pendingMigrations(0, gap)).toThrow(/mal numérotée/);
  });

  it('accepte la liste réelle des migrations', () => {
    expect(pendingMigrations(0)).toHaveLength(migrations.length);
  });
});
