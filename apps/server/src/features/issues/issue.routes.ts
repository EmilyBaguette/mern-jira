import { type Issue, IssueInputSchema, IssueSchema, IssueUpdateSchema } from 'api-contracts/issue';

import { IdParamsSchema, getNotFoundMessageAndSchema } from 'utils/common.schema';
import { issueDbToApi } from './issue.mapper';
import { createIssueRepo, getIssueByIdRepo, updateIssueRepo } from './issue.repository';

import type { AppInstance } from 'app';
import type { AppContext } from 'appContext';

const ISSUE_TAG = 'Issues' as const;

const { notFoundMessage, notFoundSchema } = getNotFoundMessageAndSchema('Issue');

export function registerIssueRoutes(app: AppInstance, ctx: AppContext) {
  const issuesCollection = ctx.db.collections.issues;

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

      const issue = await getIssueByIdRepo(issuesCollection, id);
      if (!issue) {
        return reply.code(404).send(notFoundMessage);
      }

      return issueDbToApi(issue);
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

      const updated = await updateIssueRepo(issuesCollection, id, body);
      if (!updated) return reply.code(404).send(notFoundMessage);

      return issueDbToApi(updated);
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

      const created = await createIssueRepo(issuesCollection, body);
      const apiIssue = issueDbToApi(created);

      return reply.code(201).send(apiIssue);
    }
  );
}
