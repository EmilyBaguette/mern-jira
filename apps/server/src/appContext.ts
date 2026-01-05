import { MongoClient } from 'mongodb';
import { buildMongoDeps } from './db/buildDbContext';

export async function createAppContext({ mongoUri }: { mongoUri: string }) {
  const mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();

  return {
    mongoClient,
    db: buildMongoDeps(mongoClient),
  };
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>;
