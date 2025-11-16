import { IdSchema } from '../common';
import { IssuePriority, IssueStatus, IssueType } from './issue.fragments';
import { z } from 'zod';

export const IssueBaseSchema = z.object({
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
