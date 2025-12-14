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

const PROJECT_TAG = 'Projects' as const;

const { notFoundMessage, notFoundSchema } = getNotFoundMessageAndSchema('Project');

export function registerProjectRoutes(app: AppInstance) {
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
      const projects = await getAllProjectsRepo();

      const apiProjects = projects.map(projectDbToApi);
      return reply.send(apiProjects);
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

      const project = await getProjectByIdRepo(id);
      if (!project) {
        return reply.status(404).send(notFoundMessage);
      }

      const apiProject = projectDbToApi(project);
      return reply.send(apiProject);
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

      const updated = await updateProjectRepo(id, body);
      if (!updated) {
        return reply.status(404).send(notFoundMessage);
      }

      const apiProject = projectDbToApi(updated);
      return reply.send(apiProject);
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

      const created = await createProjectRepo(body);
      const apiProject = projectDbToApi(created);

      return reply.status(201).send(apiProject);
    }
  );
}
