import { Collection } from 'mongodb';
import { dbs } from './databases';
import type { IssueDb, ProjectDb } from './types';

export const dataCollections = {
  issues: null as unknown as Collection<IssueDb>,
  projects: null as unknown as Collection<ProjectDb>,
};

export function initCollections() {
  dataCollections.issues = dbs.data.collection<IssueDb>('issues');
  dataCollections.projects = dbs.data.collection<ProjectDb>('projects');
}
