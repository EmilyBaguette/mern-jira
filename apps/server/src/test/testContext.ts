import { MongoMemoryServer } from 'mongodb-memory-server';
import { createAppContext, AppContext } from '../appContext';

export async function createTestContext() {
  const mongod = await MongoMemoryServer.create();

  const ctx = await createAppContext({
    mongoUri: mongod.getUri(),
  });

  return { mongod, ctx };
}

export type TestCtx = Awaited<ReturnType<typeof createTestContext>>;

export async function destroyTestContext(testCtx: TestCtx) {
  await testCtx.ctx.mongoClient.close();
  await testCtx.mongod.stop();
}

export async function resetMongo(testCtx: TestCtx) {
  const collections = await testCtx.ctx.db.dbs.data.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
}
