// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Animal {
  id: number;
  name: string;
}

const db = new Dexie('WordyWordsDB') as Dexie & {
  animals: EntityTable<
    Animal,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  animals: '++id, name' // primary key "id" (for the runtime!)
});

export type { Animal as Friend };
export { db };