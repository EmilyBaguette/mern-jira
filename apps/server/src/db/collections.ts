import { getDataDb } from './databases';

import type { IssueDb } from './schemas/issue.dbSchema';
import type { ProjectDb } from './schemas/project.dbSchema';
import type { UserDb } from './schemas/user.dbSchema';
import type { Collection } from 'mongodb';

let issuesCollection: Collection<IssueDb> | null = null;
let projectsCollection: Collection<ProjectDb> | null = null;
let usersCollection: Collection<UserDb> | null = null;

export function initCollections() {
  const dataDb = getDataDb();

  issuesCollection = dataDb.collection<IssueDb>('issues');
  projectsCollection = dataDb.collection<ProjectDb>('projects');
  usersCollection = dataDb.collection<UserDb>('users');
}

export function getIssuesCollection(): Collection<IssueDb> {
  if (!issuesCollection) {
    throw new Error('Issues collections not initialised');
  }
  return issuesCollection;
}

export function getProjectsCollection(): Collection<ProjectDb> {
  if (!projectsCollection) {
    throw new Error('Projects collections not initialised');
  }
  return projectsCollection;
}

export function getUsersCollection(): Collection<UserDb> {
  if (!usersCollection) {
    throw new Error('Users collections not initialised');
  }
  return usersCollection;
}
