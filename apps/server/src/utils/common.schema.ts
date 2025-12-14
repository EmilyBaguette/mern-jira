import { IdSchema } from 'api-contracts/common';
import { z } from 'zod';

export const IdParamsSchema = z.object({
  id: IdSchema,
});

export function getNotFoundMessageAndSchema(type: string) {
  const messageString = `${type} not found`;

  return {
    notFoundMessage: { message: messageString },
    notFoundSchema: z.object({
      message: z.literal(messageString),
    }),
  };
}
