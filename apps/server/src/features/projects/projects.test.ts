import request from 'supertest';
import { ObjectId } from 'mongodb';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';

import { AppInstance, buildApp } from '../../app';
import { createTestContext, destroyTestContext, resetMongo } from 'test/testContext';

import { createProjectRepo } from './projects.repository';

describe('projects feature', () => {
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

  it('GET /api/projects -> 200 and returns [] when none exist', async () => {
    const res = await request(app.server).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/projects -> 201 and returns created project', async () => {
    const input = {
      name: 'Project Alpha',
    };

    const res = await request(app.server).post('/api/projects').send(input);

    expect(res.status).toBe(201);

    console.log(res.body);

    expect(res.body).toMatchObject({
      name: 'Project Alpha',
    });

    expect(typeof res.body.id).toBe('string');
    expect(res.body.id).toMatch(/^[a-f\d]{24}$/i);
  });

  it('GET /api/projects/:id -> 404 when project does not exist', async () => {
    const missingId = new ObjectId().toHexString();

    const res = await request(app.server).get(`/api/projects/${missingId}`);

    expect(res.status).toBe(404);
  });

  it('GET /api/projects/:id -> 200 and returns the project when it exists', async () => {
    const created = await createProjectRepo(testCtx.ctx.db.collections.projects, {
      name: 'Project Beta',
    });

    const res = await request(app.server).get(`/api/projects/${created._id.toHexString()}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: created._id.toHexString(),
      name: 'Project Beta',
    });
  });

  it('PATCH /api/projects/:id -> 404 when project does not exist', async () => {
    const missingId = new ObjectId().toHexString();

    const res = await request(app.server)
      .patch(`/api/projects/${missingId}`)
      .send({ name: 'New Name' });

    expect(res.status).toBe(404);
  });

  it('PATCH /api/projects/:id -> 200 and returns updated project', async () => {
    const created = await createProjectRepo(testCtx.ctx.db.collections.projects, {
      name: 'Project Gamma',
    });

    const res = await request(app.server)
      .patch(`/api/projects/${created._id.toHexString()}`)
      .send({ name: 'Project Gamma (Renamed)' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: created._id.toHexString(),
      name: 'Project Gamma (Renamed)',
    });

    const inDb = await testCtx.ctx.db.collections.projects.findOne({ _id: created._id });
    expect(inDb?.name).toBe('Project Gamma (Renamed)');
  });

  it('GET /api/projects -> 200 and returns all projects', async () => {
    const p1 = await createProjectRepo(testCtx.ctx.db.collections.projects, { name: 'P1' });
    const p2 = await createProjectRepo(testCtx.ctx.db.collections.projects, { name: 'P2' });

    const res = await request(app.server).get('/api/projects');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const ids = res.body.map((p: any) => p.id);
    expect(ids).toEqual(expect.arrayContaining([p1._id.toHexString(), p2._id.toHexString()]));
  });
});
