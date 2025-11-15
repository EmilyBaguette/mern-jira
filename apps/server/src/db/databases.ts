import { Db } from 'mongodb';
import { getDb } from './client';

export const dbs: {
  data: Db;
  settings: Db;
} = {
  data: null as unknown as Db,
  settings: null as unknown as Db,
};

export function initDbs() {
  dbs.data = getDb(process.env.MONGO_DATA_DB ?? 'data');
  dbs.settings = getDb(process.env.MONGO_SETTINGS_DB ?? 'settings');
}
