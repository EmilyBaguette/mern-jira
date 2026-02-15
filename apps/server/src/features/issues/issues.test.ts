import request from 'supertest';
import { ObjectId } from 'mongodb';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import { AppInstance, buildApp } from 'app';
import { createTestContext, destroyTestContext, resetMongo } from 'test/testContext';

import { createIssueRepo } from './issue.repository';

describe('issues feature', () => {
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

  it('GET /api/issues/:id -> 404 when issue does not exist', async () => {
    const missingId = new ObjectId().toHexString();

    const res = await request(app.server).get(`/api/issues/${missingId}`);

    expect(res.status).toBe(404);
  });

  it('POST /api/issues -> 201 and returns created issue', async () => {
    const input = {
      title: 'Login button misaligned',
      description: 'On the settings page the login button overlaps the footer.',
    };

    const res = await request(app.server).post('/api/issues').send(input);

    expect(res.status).toBe(201);

    expect(res.body).toMatchObject({
      title: input.title,
      description: input.description,
    });

    expect(res.body.id).toMatch(/^[a-f\d]{24}$/i);
  });

  it('GET /api/issues/:id -> 200 and returns issue when it exists', async () => {
    const created = await createIssueRepo(testCtx.ctx.db.collections.issues, {
      title: 'API returns 500',
      description: 'Happens when saving a project without a name.',
    } as any);

    const res = await request(app.server).get(`/api/issues/${created._id.toHexString()}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: created._id.toHexString(),
      title: 'API returns 500',
      description: 'Happens when saving a project without a name.',
    });
  });

  it('PATCH /api/issues/:id -> 404 when issue does not exist', async () => {
    const missingId = new ObjectId().toHexString();

    const res = await request(app.server)
      .patch(`/api/issues/${missingId}`)
      .send({ title: 'New title' });

    expect(res.status).toBe(404);
  });

  it('PATCH /api/issues/:id -> 200 and returns updated issue', async () => {
    const created = await createIssueRepo(testCtx.ctx.db.collections.issues, {
      title: 'Settings page slow',
      description: 'Takes 8s to load.',
    } as any);

    const update = {
      title: 'Settings page very slow',
    };

    const res = await request(app.server)
      .patch(`/api/issues/${created._id.toHexString()}`)
      .send(update);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: created._id.toHexString(),
      title: 'Settings page very slow',
      description: 'Takes 8s to load.',
    });

    const inDb = await testCtx.ctx.db.collections.issues.findOne({ _id: created._id });
    expect(inDb?.title).toBe('Settings page very slow');
  });
});
