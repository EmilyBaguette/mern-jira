import { UserSchema } from 'api-contracts/user';

import { IdParamsSchema, getNotFoundMessageAndSchema } from '../../utils/common.schema';
import { userDbToApi } from './user.mapper';
import { getUserByIdRepo } from './users.repository';

import type { AppInstance } from '../../app';
import { AppContext } from 'appContext';

const USER_TAG = 'Users' as const;

const { notFoundMessage, notFoundSchema } = getNotFoundMessageAndSchema('User');

export function registerUserRoutes(app: AppInstance, ctx: AppContext) {
  const usersCollection = ctx.db.collections.users;

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

      const user = await getUserByIdRepo(usersCollection, id);
      if (!user) return reply.status(404).send(notFoundMessage);

      return userDbToApi(user);
    }
  );
}
