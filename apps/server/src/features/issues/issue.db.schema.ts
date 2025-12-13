import { IssueSchema } from 'api-contracts/issue';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const IssueDbSchema = IssueSchema.omit({ id: true }).extend({
  _id: z.instanceof(ObjectId),
  assigneeId: z.instanceof(ObjectId).optional(),
  projectId: z.instanceof(ObjectId),
  reporterId: z.instanceof(ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type IssueDb = z.infer<typeof IssueDbSchema>;
