import { IdSchema } from '../common';
import { IssueBaseSchema } from './issue.model';
import { z } from 'zod';

export const IssueSchema = IssueBaseSchema.extend({
  id: IdSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Issue = z.infer<typeof IssueSchema>;

export const IssueInputSchema = IssueBaseSchema;
export type IssueInput = z.infer<typeof IssueInputSchema>;

export const IssueUpdateSchema = IssueBaseSchema.partial();
export type IssueUpdate = z.infer<typeof IssueUpdateSchema>;
