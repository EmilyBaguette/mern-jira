import { IdSchema } from '../common';
import { ProjectBaseSchema } from './project.model';
import { z } from 'zod';

export const ProjectSchema = ProjectBaseSchema.extend({
  id: IdSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectInputSchema = ProjectBaseSchema;
export type ProjectInput = z.infer<typeof ProjectInputSchema>;

export const ProjectUpdateSchema = ProjectBaseSchema.partial();
export type ProjectUpdate = z.infer<typeof ProjectUpdateSchema>;
