import { ProjectSchema } from 'api-contracts/project';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const ProjectDbSchema = ProjectSchema.omit({ id: true }).extend({
  _id: z.instanceof(ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ProjectDb = z.infer<typeof ProjectDbSchema>;
