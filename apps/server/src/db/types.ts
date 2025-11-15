import type { Issue, Project, User } from 'api-contracts';
import { ObjectId } from 'mongodb';

/**
 * Turn an API type into a Mongo DB document type.
 *
 * - `id` -> `_id: ObjectId`
 * - `IdKeys` -> ObjectId (e.g. projectId, reporterId, assigneeId)
 * - `TimeKeys` -> Date (e.g. createdAt, updatedAt)
 */

type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

export type DbDoc<T, IdKeys extends keyof T = never, TimeKeys extends keyof T = never> = Omit<
  T,
  'id' | IdKeys | TimeKeys
> & {
  _id: ObjectId;
} & {
  [K in Exclude<IdKeys, OptionalKeys<T>>]: ObjectId;
} & {
  [K in Extract<IdKeys, OptionalKeys<T>>]?: ObjectId;
} & {
  [K in Exclude<TimeKeys, OptionalKeys<T>>]: Date;
} & {
  [K in Extract<TimeKeys, OptionalKeys<T>>]?: Date;
};

export type IssueDb = DbDoc<
  Issue,
  'projectId' | 'reporterId' | 'assigneeId',
  'createdAt' | 'updatedAt'
>;

export type ProjectDb = DbDoc<Project, 'leadUserId', 'createdAt' | 'updatedAt'>;

export type UserDb = DbDoc<User>;
