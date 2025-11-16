import { z } from 'zod';

export const UserRole = z.enum(['ADMIN', 'MEMBER']);
export type UserRole = z.infer<typeof UserRole>;
