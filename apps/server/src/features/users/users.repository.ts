import { Collection, ObjectId } from 'mongodb';

import { userInputApiToDb, userUpdateApiToDb } from './user.mapper';

import type { UserDb } from './user.db.schema';
import type { UserInput, UserUpdate } from 'api-contracts/user';

export async function createUserRepo(
  usersCollection: Collection<UserDb>,
  input: UserInput
): Promise<UserDb> {
  const userDb = userInputApiToDb(input);
  await usersCollection.insertOne(userDb);
  return userDb;
}

export async function getUserByIdRepo(
  usersCollection: Collection<UserDb>,
  id: string
): Promise<UserDb | null> {
  return usersCollection.findOne({ _id: new ObjectId(id) });
}

export async function updateUserRepo(
  usersCollection: Collection<UserDb>,
  id: string,
  update: UserUpdate
): Promise<UserDb | null> {
  const updateDoc = userUpdateApiToDb(update);

  return await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
