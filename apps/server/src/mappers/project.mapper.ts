import { ObjectId } from 'mongodb';

import { omitUndefined } from './mapper.utils';

import type { ProjectDb } from '../db/schemas/project.dbSchema';
import type { Project, ProjectInput, ProjectUpdate } from 'api-contracts/project';


export function projectDbToApi(doc: ProjectDb): Project {
  const { _id, createdAt, updatedAt, ...project } = doc;

  return {
    ...project,
    id: _id.toHexString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

export function projectInputApiToDb(json: ProjectInput): ProjectDb {
  const now = new Date();
  const { leadUserId, ...rest } = json;

  return {
    ...rest,
    _id: new ObjectId(),
    ...(leadUserId ? { assigneeId: new ObjectId(leadUserId) } : {}),
    createdAt: now,
    updatedAt: now,
  };
}

export function projectUpdateApiToDb(json: ProjectUpdate): Partial<ProjectDb> {
  const now = new Date();

  const { leadUserId, ...rest } = json;

  const update = {
    ...rest,
    updatedAt: now,
  };

  if ('leadUserId' in update) {
    update.leadUserId = new ObjectId(leadUserId);
  }

  return omitUndefined(update);
}
