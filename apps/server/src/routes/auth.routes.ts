import { AuthLoginSchema } from '@acme/shared';
import { Router } from 'express';
import { z } from 'zod';

import { User } from '../models/User.model';
import { hashPassword, signJwt, verifyPassword } from '../utils/crypto';

const router: ExpressRouter = Router();

router.post('/register', async (req, res) => {
  const schema = AuthLoginSchema.extend({ name: z.string().min(1) });
  const data = schema.parse(req.body);
  const exists = await User.findOne({ email: data.email });
  if (exists) return res.status(409).json({ message: 'Email in use' });
  const passwordHash = await hashPassword(data.password);
  const user = await User.create({
    email: data.email,
    name: data.name,
    passwordHash,
  });
  const token = signJwt({ userId: String(user._id) });
  res.json({
    token,
    user: { _id: user._id, email: user.email, name: user.name },
  });
});

router.post('/login', async (req, res) => {
  const data = AuthLoginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await verifyPassword(data.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signJwt({ userId: String(user._id) });
  res.json({
    token,
    user: { _id: user._id, email: user.email, name: user.name },
  });
});

export default router;
