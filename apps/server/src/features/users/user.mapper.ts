import { ObjectId } from 'mongodb';

import { omitUndefined } from '../../utils/mapper.utils';

import type { UserDb } from './user.db.schema';
import type { User, UserInput, UserUpdate } from 'api-contracts/user';

export function userDbToApi(doc: UserDb): User {
  const { _id, ...user } = doc;

  return {
    ...user,
    id: _id.toHexString(),
  };
}

export function userInputApiToDb(json: UserInput): UserDb {
  return {
    ...json,
    _id: new ObjectId(),
  };
}

export function userUpdateApiToDb(json: UserUpdate): Partial<UserDb> {
  return omitUndefined(json);
}
