import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from 'fastify-type-provider-zod';

import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(err: FastifyError, req: FastifyRequest, reply: FastifyReply) {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      statusCode: 400,
      error: 'Request Validation Error',
      message: "Request doesn't match the schema",
      details: err.validation,
    });
  }

  if (isResponseSerializationError(err)) {
    const cause: any = err.cause;
    return reply.code(500).send({
      statusCode: 500,
      error: 'Response Validation Error',
      message: "Response doesn't match the schema",
      details: cause?.issues,
    });
  }

  if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
    return reply.code(err.statusCode).send({
      statusCode: err.statusCode,
      error: err.name,
      message: err.message,
    });
  }

  req.log.error(err);
  return reply.code(500).send({
    statusCode: 500,
    error: 'InternalServerError',
    message: err.message,
  });
}
