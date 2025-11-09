import type { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '../utils/crypto';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing auth header' });
  const token = header.replace('Bearer ', '');
  try {
    const payload = verifyJwt(token) as { userId: string };
    (req as any).userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
