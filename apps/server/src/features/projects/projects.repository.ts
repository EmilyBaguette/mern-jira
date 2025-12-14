import { ObjectId } from 'mongodb';

import { projectInputApiToDb, projectUpdateApiToDb } from './project.mapper';

import type { ProjectDb } from './project.db.schema';
import type { ProjectInput, ProjectUpdate } from 'api-contracts/project';
import { getCollection } from '../../db/collections';
import { PROJECTS_COLLECTION } from '../../db/db.config';

const projects = getCollection<ProjectDb>(PROJECTS_COLLECTION);

export async function getAllProjectsRepo(): Promise<ProjectDb[]> {
  return projects.find({}).toArray();
}

export async function createProjectRepo(input: ProjectInput): Promise<ProjectDb> {
  const projectDb = projectInputApiToDb(input);
  await projects.insertOne(projectDb);
  return projectDb;
}

export async function getProjectByIdRepo(id: string): Promise<ProjectDb | null> {
  return projects.findOne({ _id: new ObjectId(id) });
}

export async function updateProjectRepo(
  id: string,
  update: ProjectUpdate
): Promise<ProjectDb | null> {
  const updateDoc = projectUpdateApiToDb(update);

  return await projects.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateDoc },
    { returnDocument: 'after' }
  );
}
