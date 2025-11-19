import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { z } from 'zod';

import { config } from './config';
import { errorHandler } from './middleware/error-handler';
import { registerIssueRoutes } from './routes/issues.routes';
import { registerProjectRoutes } from './routes/projects.routes';
import { registerUserRoutes } from './routes/users.routes';

import type { ZodTypeProvider } from 'fastify-type-provider-zod';

export function buildApp() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Tiny Tickets API',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${config.port}` }],
    },
    transform: jsonSchemaTransform,
  });

  app.register(swaggerUi, {
    routePrefix: '/docs',
  });

  app.register(helmet);
  app.register(cors, {
    origin: config.corsOrigin,
    credentials: true,
  });

  app.setErrorHandler(errorHandler);

  app.after(() => {
    app.get('/api/health', {
      schema: {
        tags: ['Meta'],
        summary: 'Health check',
        response: {
          200: z.object({ ok: z.boolean() }),
        },
      },
      handler: async () => ({ ok: true }),
    });

    registerIssueRoutes(app);
    registerProjectRoutes(app);
    registerUserRoutes(app);
  });

  return app;
}

export type AppInstance = ReturnType<typeof buildApp>;
