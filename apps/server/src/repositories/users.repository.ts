import { ObjectId } from 'mongodb';

import { getUsersCollection } from '../db/collections';
import { userInputApiToDb, userUpdateApiToDb } from '../mappers/user.mapper';

import type { UserDb } from '../features/users/user.db.schema';
import type { UserInput, UserUpdate } from 'api-contracts/user';

export async function createUserRepo(input: UserInput): Promise<UserDb> {
  const userDb = userInputApiToDb(input);
  await getUsersCollection().insertOne(userDb);
  return userDb;
}

export async function getUserByIdRepo(id: string): Promise<UserDb | null> {
  return getUsersCollection().findOne({ _id: new ObjectId(id) });
}

export async function updateUserRepo(id: string, update: UserUpdate): Promise<UserDb | null> {
  const updateDoc = userUpdateApiToDb(update);

  return await getUsersCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
