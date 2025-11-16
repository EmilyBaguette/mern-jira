import { ObjectId } from 'mongodb';

import { getIssuesCollection } from '../db/collections';
import { issueInputApiToDb, issueUpdateApiToDb } from '../mappers/issue.mapper';

import type { IssueDb } from '../db/schemas/issue.dbSchema';
import type { IssueInput, IssueUpdate } from 'api-contracts/issue';

export async function createIssueRepo(input: IssueInput): Promise<IssueDb> {
  const issueDb = issueInputApiToDb(input);
  await getIssuesCollection().insertOne(issueDb);
  return issueDb;
}

export async function getIssueByIdRepo(id: string): Promise<IssueDb | null> {
  return getIssuesCollection().findOne({ _id: new ObjectId(id) });
}

export async function updateIssueRepo(id: string, update: IssueUpdate): Promise<IssueDb | null> {
  const updateDoc = issueUpdateApiToDb(update);

  return await getIssuesCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
