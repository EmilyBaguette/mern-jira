import { z } from 'zod';

export const IssueStatus = z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE']);
export type IssueStatus = z.infer<typeof IssueStatus>;

export const IssueType = z.enum(['BUG', 'TASK', 'STORY']);
export type IssueType = z.infer<typeof IssueType>;

export const IssuePriority = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export type IssuePriority = z.infer<typeof IssuePriority>;
