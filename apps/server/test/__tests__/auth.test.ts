import request from 'supertest';

import app from '../../src/app';
import '../setup';

it('registers then logs in', async () => {
  const reg = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'a@b.com',
      password: 'password123',
      name: 'A',
    })
    .expect(200);
  if (!reg.body.token) throw new Error('no token');

  const login = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'a@b.com',
      password: 'password123',
    })
    .expect(200);
  if (login.body.user.email !== 'a@b.com') throw new Error('bad email');
});
