import { IdSchema } from './common';
import { z } from 'zod';

export const IssueStatus = z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE']);
export type IssueStatus = z.infer<typeof IssueStatus>;

export const IssueType = z.enum(['BUG', 'TASK', 'STORY']);
export type IssueType = z.infer<typeof IssueType>;

export const IssuePriority = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export type IssuePriority = z.infer<typeof IssuePriority>;

export const IssueInputSchema = z.object({
  projectId: IdSchema,
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),

  status: IssueStatus.default('BACKLOG'),
  type: IssueType.default('TASK'),
  priority: IssuePriority.default('MEDIUM'),

  reporterId: IdSchema,
  assigneeId: IdSchema.optional(),

  storyPoints: z.number().int().positive().optional(),
});
export type IssueInput = z.infer<typeof IssueInputSchema>;

export const IssueSchema = IssueInputSchema.extend({
  id: IdSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Issue = z.infer<typeof IssueSchema>;

export const IssueUpdateSchema = IssueInputSchema.partial();
export type IssueUpdate = z.infer<typeof IssueUpdateSchema>;
