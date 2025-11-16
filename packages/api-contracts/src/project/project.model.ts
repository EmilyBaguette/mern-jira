import { IdSchema } from '../common';
import { z } from 'zod';

export const ProjectBaseSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  leadUserId: IdSchema.optional(),
});
