import { UserSchema } from 'api-contracts/user';

import { IdParamsSchema, getNotFoundMessageAndSchema } from './routes.common';
import { userDbToApi } from '../mappers/user.mapper';
import { getUserByIdRepo } from '../repositories/users.repository';

import type { AppInstance } from '../app';

const USER_TAG = 'Users' as const;

const { notFoundMessage, notFoundSchema } = getNotFoundMessageAndSchema('User');

export function registerUserRoutes(app: AppInstance) {
  app.get(
    '/api/users/:id',
    {
      schema: {
        tags: [USER_TAG],
        summary: 'Get user by ID',
        params: IdParamsSchema,
        response: {
          200: UserSchema,
          404: notFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const user = await getUserByIdRepo(id);
      if (!user) {
        return reply.status(404).send(notFoundMessage);
      }

      const apiUser = userDbToApi(user);
      return reply.send(apiUser);
    }
  );
}
