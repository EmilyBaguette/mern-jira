import { Collection, ObjectId } from 'mongodb';

import { projectInputApiToDb, projectUpdateApiToDb } from './project.mapper';

import type { ProjectDb } from './project.db.schema';
import type { ProjectInput, ProjectUpdate } from 'api-contracts/project';

export async function getAllProjectsRepo(projects: Collection<ProjectDb>): Promise<ProjectDb[]> {
  return projects.find({}).toArray();
}

export async function createProjectRepo(
  projects: Collection<ProjectDb>,
  input: ProjectInput
): Promise<ProjectDb> {
  const projectDb = projectInputApiToDb(input);
  await projects.insertOne(projectDb);
  return projectDb;
}

export async function getProjectByIdRepo(
  projects: Collection<ProjectDb>,
  id: string
): Promise<ProjectDb | null> {
  return projects.findOne({ _id: new ObjectId(id) });
}

export async function updateProjectRepo(
  projects: Collection<ProjectDb>,
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
