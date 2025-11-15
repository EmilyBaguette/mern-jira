import type { IssueDb } from '../db/types';
import type { Issue } from 'api-contracts';

export function mapIssue(db: IssueDb): Issue {
  return {
    id: db._id.toHexString(),
    projectId: db.projectId.toHexString(),
    title: db.title,
    description: db.description,
    status: db.status,
    type: db.type,
    priority: db.priority,
    reporterId: db.reporterId.toHexString(),
    assigneeId: db.assigneeId?.toHexString(),
    storyPoints: db.storyPoints,
    createdAt: db.createdAt.toISOString(),
    updatedAt: db.updatedAt.toISOString(),
  };
}
