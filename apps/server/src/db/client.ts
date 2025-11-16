import { MongoClient } from 'mongodb';

import type { Db} from 'mongodb';

let client: MongoClient;

export async function initClient(uri: string) {
  client = new MongoClient(uri);
  await client.connect();
  console.log('Mongo connected');
}

export function getClient() {
  if (!client) throw new Error('Mongo not initialized');
  return client;
}

export function getDb(name: string): Db {
  return getClient().db(name);
}
