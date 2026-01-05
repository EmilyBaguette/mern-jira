import { Collection } from 'mongodb';

export const DATABASES = {
  DATA: 'data',
} as const;

export const COLLECTIONS = {
  ISSUES: 'issues',
  PROJECTS: 'projects',
  USERS: 'users',
} as const;
