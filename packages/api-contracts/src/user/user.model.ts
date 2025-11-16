import { UserRole } from './user.fragments';
import { z } from 'zod';

export const UserBaseSchema = z.object({
  email: z.email(),
  name: z.string(),
  avatarUrl: z.url().optional(),
  role: UserRole.default('MEMBER'),
});
