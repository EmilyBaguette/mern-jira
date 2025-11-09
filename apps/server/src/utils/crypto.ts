import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../config';

export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);
export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);
export const signJwt = (payload: object) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
export const verifyJwt = (token: string) => jwt.verify(token, config.jwtSecret);
