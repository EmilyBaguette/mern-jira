import { getDatabase } from './databases';
import { DATA_DB, dataCollectionLabels } from './db.config';
import type { Collection, Db, Document } from 'mongodb';

const collections = new Map<string, Collection>();

export function initCollections() {
  function appendCollections(names: string[], db: Db) {
    for (const name of names) {
      collections.set(name, db.collection(name));
    }
  }

  appendCollections(dataCollectionLabels, getDatabase(DATA_DB));
}

export function getCollection<T extends Document>(name: string): Collection<T> {
  const collection = collections.get(name);
  if (!collection) throw new Error(name + ' collection not initialised');
  return collection as unknown as Collection<T>;
}
