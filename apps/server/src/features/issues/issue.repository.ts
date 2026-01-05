import { Collection, ObjectId } from 'mongodb';

import { issueInputApiToDb, issueUpdateApiToDb } from './issue.mapper';

import type { IssueDb } from './issue.db.schema';
import { type IssueInput, type IssueUpdate } from 'api-contracts/issue';

export async function createIssueRepo(
  issuesCollection: Collection<IssueDb>,
  input: IssueInput
): Promise<IssueDb> {
  const issueDb = issueInputApiToDb(input);
  await issuesCollection.insertOne(issueDb);
  return issueDb;
}

export async function getIssueByIdRepo(
  issuesCollection: Collection<IssueDb>,
  id: string
): Promise<IssueDb | null> {
  return issuesCollection.findOne({ _id: new ObjectId(id) });
}

export async function updateIssueRepo(
  issuesCollection: Collection<IssueDb>,
  id: string,
  update: IssueUpdate
): Promise<IssueDb | null> {
  const updateDoc = issueUpdateApiToDb(update);

  return await issuesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
