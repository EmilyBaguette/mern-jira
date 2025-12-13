import { getDb } from './client';
import type { Db } from 'mongodb';
import { databaseLabels } from './db.config';

const databases = new Map<string, Db>();

export function initDbs() {
  for (const databaseLabel of databaseLabels) {
    databases.set(databaseLabel, getDb(databaseLabel));
  }
}

export function getDatabase(name: string): Db {
  const database = databases.get(name);
  if (!database) throw new Error(name + ' database not initialised');
  return database;
}
