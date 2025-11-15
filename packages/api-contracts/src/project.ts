import { z } from 'zod';
import { IdSchema } from './common';

export const ProjectInputSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  leadUserId: IdSchema.optional(),
});

export type ProjectInput = z.infer<typeof ProjectInputSchema>;

export const ProjectSchema = ProjectInputSchema.extend({
  id: IdSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectUpdateSchema = ProjectInputSchema.partial();
export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;
