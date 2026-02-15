import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import { AppInstance, buildApp } from 'app';
import { createTestContext, destroyTestContext, resetMongo } from 'test/testContext';
import { createUserRepo } from './users.repository';

describe('users feature', () => {
  let testCtx: Awaited<ReturnType<typeof createTestContext>>;
  let app: AppInstance;

  beforeAll(async () => {
    testCtx = await createTestContext();
    app = buildApp(testCtx.ctx);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await destroyTestContext(testCtx);
  });

  beforeEach(async () => {
    await resetMongo(testCtx);
  });

  it('GET /api/users/:id → 200 and returns the user when it exists', async () => {
    // Seed through the repo (so you exercise userInputApiToDb mapping)
    const created = await createUserRepo(testCtx.ctx.db.collections.users, {
      email: 'emily@example.com',
      name: 'Emily',
      role: 'ADMIN',
    });

    const res = await request(app.server).get(`/api/users/${created._id.toHexString()}`);

    expect(res.status).toBe(200);

    // Assert the API shape (depends on userDbToApi)
    expect(res.body).toMatchObject({
      id: created._id.toHexString(), // change if your API returns `_id`
      email: 'emily@example.com',
      name: 'Emily',
    });
  });
});
