import { z } from 'zod';

export const UserRole = z.enum(['ADMIN', 'MEMBER']);
export type UserRole = z.infer<typeof UserRole>;

export const UserSchema = z.object({
  email: z.email(),
  name: z.string(),
  avatarUrl: z.url().optional(),
  role: UserRole.default('MEMBER'),
});

export type User = z.infer<typeof UserSchema>;
