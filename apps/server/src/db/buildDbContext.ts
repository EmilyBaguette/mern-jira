import { MongoClient } from 'mongodb';
import { IssueDb } from '../features/issues/issue.db.schema';
import { UserDb } from '../features/users/user.db.schema';
import { ProjectDb } from '../features/projects/project.db.schema';
import { COLLECTIONS, DATABASES } from './names';

export function buildMongoDeps(client: MongoClient) {
  const dataDb = client.db(DATABASES.DATA);

  return {
    client,
    dbs: {
      data: dataDb,
    },
    collections: {
      issues: dataDb.collection<IssueDb>(COLLECTIONS.ISSUES),
      projects: dataDb.collection<ProjectDb>(COLLECTIONS.PROJECTS),
      users: dataDb.collection<UserDb>(COLLECTIONS.USERS),
    },
  } as const;
}
