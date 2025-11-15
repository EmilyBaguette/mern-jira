import type { IssueDb } from '../db/types';
import { omitUndefined } from './utils';
import type { Issue, IssueInput, IssueUpdate } from 'api-contracts';
import { ObjectId } from 'mongodb';

export function issueDbToApi(doc: IssueDb): Issue {
  return {
    ...doc,
    id: doc._id.toHexString(),
    projectId: doc.projectId.toHexString(),
    reporterId: doc.reporterId.toHexString(),
    assigneeId: doc.assigneeId?.toHexString(),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export function issueInputApiToDb(json: IssueInput): IssueDb {
  const now = new Date();
  const { projectId, reporterId, assigneeId, ...rest } = json;

  return {
    ...rest,
    _id: new ObjectId(),
    projectId: new ObjectId(projectId),
    reporterId: new ObjectId(reporterId),
    ...(assigneeId ? { assigneeId: new ObjectId(assigneeId) } : {}),
    createdAt: now,
    updatedAt: now,
  };
}

export function issueUpdateApiToDb(json: IssueUpdate): Partial<IssueDb> {
  const now = new Date();

  const { projectId, reporterId, assigneeId, ...rest } = json;

  const update = {
    ...rest,
    updatedAt: now,
  };

  if ('projectId' in update) {
    update.projectId = new ObjectId(projectId);
  }

  if ('reporterId' in update) {
    update.reporterId = new ObjectId(reporterId);
  }

  if ('assigneeId' in update) {
    update.assigneeId = new ObjectId(assigneeId);
  }

  return omitUndefined(update);
}
