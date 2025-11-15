import { dataCollections } from '../db/collections';
import type { IssueDb } from '../db/types';
import { issueInputApiToDb, issueUpdateApiToDb } from '../mappers/issueMapper';
import { createTimestamps } from './utils';
import type { IssueInput, IssueUpdate } from 'api-contracts';
import { ObjectId } from 'mongodb';

export async function createIssueRepo(input: IssueInput): Promise<IssueDb> {
  const issueDb = issueInputApiToDb(input);
  const issueDbWithTimestamp = createTimestamps(issueDb);
  await dataCollections.issues.insertOne(issueDbWithTimestamp);
  return issueDbWithTimestamp;
}

export async function getIssueByIdRepo(id: string): Promise<IssueDb | null> {
  return dataCollections.issues.findOne({ _id: new ObjectId(id) });
}

export async function updateIssueRepo(id: string, update: IssueUpdate): Promise<IssueDb | null> {
  const updateDoc = issueUpdateApiToDb(update);

  return await dataCollections.issues.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
