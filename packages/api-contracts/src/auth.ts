import { z } from 'zod';

export const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
