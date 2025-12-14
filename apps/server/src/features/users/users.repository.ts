import { ObjectId } from 'mongodb';

import { getCollection } from '../../db/collections';
import { userInputApiToDb, userUpdateApiToDb } from './user.mapper';

import type { UserDb } from './user.db.schema';
import type { UserInput, UserUpdate } from 'api-contracts/user';
import { USERS_COLLECTION } from '../../db/db.config';

const users = getCollection<UserDb>(USERS_COLLECTION);

export async function createUserRepo(input: UserInput): Promise<UserDb> {
  const userDb = userInputApiToDb(input);
  await users.insertOne(userDb);
  return userDb;
}

export async function getUserByIdRepo(id: string): Promise<UserDb | null> {
  return users.findOne({ _id: new ObjectId(id) });
}

export async function updateUserRepo(id: string, update: UserUpdate): Promise<UserDb | null> {
  const updateDoc = userUpdateApiToDb(update);

  return await users.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
