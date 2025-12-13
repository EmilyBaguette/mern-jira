import { ObjectId } from 'mongodb';

import { getProjectsCollection } from '../db/collections';
import { projectInputApiToDb, projectUpdateApiToDb } from '../mappers/project.mapper';

import type { ProjectDb } from '../features/projects/project.db.schema';
import type { ProjectInput, ProjectUpdate } from 'api-contracts/project';

export async function getAllProjectsRepo(): Promise<ProjectDb[]> {
  return getProjectsCollection().find({}).toArray();
}

export async function createProjectRepo(input: ProjectInput): Promise<ProjectDb> {
  const projectDb = projectInputApiToDb(input);
  await getProjectsCollection().insertOne(projectDb);
  return projectDb;
}

export async function getProjectByIdRepo(id: string): Promise<ProjectDb | null> {
  return getProjectsCollection().findOne({ _id: new ObjectId(id) });
}

export async function updateProjectRepo(
  id: string,
  update: ProjectUpdate
): Promise<ProjectDb | null> {
  const updateDoc = projectUpdateApiToDb(update);

  return await getProjectsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
