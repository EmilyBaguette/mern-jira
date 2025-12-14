import { ISSUES_COLLECTION } from '../../db/db.config';
import { ObjectId } from 'mongodb';

import { getCollection } from '../../db/collections';
import { issueInputApiToDb, issueUpdateApiToDb } from './issue.mapper';

import type { IssueDb } from './issue.db.schema';
import { type IssueInput, type IssueUpdate } from 'api-contracts/issue';

const issues = getCollection<IssueDb>(ISSUES_COLLECTION);

export async function createIssueRepo(input: IssueInput): Promise<IssueDb> {
  const issueDb = issueInputApiToDb(input);
  await issues.insertOne(issueDb);
  return issueDb;
}

export async function getIssueByIdRepo(id: string): Promise<IssueDb | null> {
  return issues.findOne({ _id: new ObjectId(id) });
}

export async function updateIssueRepo(id: string, update: IssueUpdate): Promise<IssueDb | null> {
  const updateDoc = issueUpdateApiToDb(update);

  return await issues.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
