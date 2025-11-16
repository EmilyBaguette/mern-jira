import { getDb } from './client';

import type { Db } from 'mongodb';

let dataDb: Db | null = null;
let settingsDb: Db | null = null;

export function initDbs() {
  dataDb = getDb(process.env.MONGO_DATA_DB ?? 'data');
  settingsDb = getDb(process.env.MONGO_SETTINGS_DB ?? 'settings');
}

export function getDataDb(): Db {
  if (!dataDb) throw new Error('Data DB not initialised');
  return dataDb;
}

export function getSettingsDb(): Db {
  if (!settingsDb) throw new Error('Settings DB not initialised');
  return settingsDb;
}
