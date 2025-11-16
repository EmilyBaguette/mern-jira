import { type Issue, IssueInputSchema, IssueSchema, IssueUpdateSchema } from 'api-contracts/issue';

import { IdParamsSchema, getNotFoundMessageAndSchema } from './routes.common';
import { issueDbToApi } from '../mappers/issue.mapper';
import {
  createIssueRepo,
  getIssueByIdRepo,
  updateIssueRepo,
} from '../repositories/issues.repository';

import type { AppInstance } from '../app';

const ISSUE_TAG = 'Issues' as const;

const { notFoundMessage, notFoundSchema } = getNotFoundMessageAndSchema('Issue');

export function registerIssueRoutes(app: AppInstance) {
  app.get(
    '/api/issues/:id',
    {
      schema: {
        tags: [ISSUE_TAG],
        summary: 'Get issue by ID',
        params: IdParamsSchema,
        response: {
          200: IssueSchema,
          404: notFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const issue = await getIssueByIdRepo(id);
      if (!issue) {
        return reply.status(404).send(notFoundMessage);
      }

      const apiIssue: Issue = issueDbToApi(issue);
      return reply.send(apiIssue);
    }
  );

  app.patch(
    '/api/issues/:id',
    {
      schema: {
        tags: [ISSUE_TAG],
        summary: 'Update issue',
        params: IdParamsSchema,
        body: IssueUpdateSchema,
        response: {
          200: IssueSchema,
          404: notFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const body = request.body;

      const updated = await updateIssueRepo(id, body);
      if (!updated) {
        return reply.status(404).send(notFoundMessage);
      }

      const apiIssue: Issue = issueDbToApi(updated);
      return reply.send(apiIssue);
    }
  );

  app.post(
    '/api/issues',
    {
      schema: {
        tags: [ISSUE_TAG],
        summary: 'Create issue',
        body: IssueInputSchema,
        response: {
          201: IssueSchema,
        },
      },
    },
    async (request, reply) => {
      const body = request.body;

      const created = await createIssueRepo(body);
      const apiIssue = issueDbToApi(created);

      return reply.status(201).send(apiIssue);
    }
  );
}
