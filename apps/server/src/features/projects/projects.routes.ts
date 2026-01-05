import { ProjectInputSchema, ProjectSchema, ProjectUpdateSchema } from 'api-contracts/project';

import { IdParamsSchema, getNotFoundMessageAndSchema } from '../../utils/common.schema';
import { projectDbToApi } from './project.mapper';
import {
  createProjectRepo,
  getProjectByIdRepo,
  updateProjectRepo,
  getAllProjectsRepo,
} from './projects.repository';

import type { AppInstance } from '../../app';
import type { AppContext } from 'appContext';

const PROJECT_TAG = 'Projects' as const;

const { notFoundMessage, notFoundSchema } = getNotFoundMessageAndSchema('Project');

export function registerProjectRoutes(app: AppInstance, ctx: AppContext) {
  const projectsCollection = ctx.db.collections.projects;

  app.get(
    '/api/projects',
    {
      schema: {
        tags: [PROJECT_TAG],
        summary: 'Get projects',
        response: {
          200: ProjectSchema.array(),
        },
      },
    },
    async (_request, reply) => {
      const projects = await getAllProjectsRepo(projectsCollection);

      return projects.map(projectDbToApi);
    }
  );

  app.get(
    '/api/projects/:id',
    {
      schema: {
        tags: [PROJECT_TAG],
        summary: 'Get project by ID',
        params: IdParamsSchema,
        response: {
          200: ProjectSchema,
          404: notFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const project = await getProjectByIdRepo(projectsCollection, id);
      if (!project) return reply.status(404).send(notFoundMessage);

      return projectDbToApi(project);
    }
  );

  app.patch(
    '/api/projects/:id',
    {
      schema: {
        tags: [PROJECT_TAG],
        summary: 'Update project',
        params: IdParamsSchema,
        body: ProjectUpdateSchema,
        response: {
          200: ProjectSchema,
          404: notFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const body = request.body;

      const updated = await updateProjectRepo(projectsCollection, id, body);
      if (!updated) return reply.status(404).send(notFoundMessage);

      return projectDbToApi(updated);
    }
  );

  app.post(
    '/api/projects',
    {
      schema: {
        tags: [PROJECT_TAG],
        summary: 'Create project',
        body: ProjectInputSchema,
        response: {
          201: ProjectSchema,
        },
      },
    },
    async (request, reply) => {
      const body = request.body;

      const created = await createProjectRepo(projectsCollection, body);
      const apiProject = projectDbToApi(created);

      return reply.code(201).send(apiProject);
    }
  );
}
