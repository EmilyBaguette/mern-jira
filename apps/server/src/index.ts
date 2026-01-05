import { buildApp } from './app';
import { createAppContext } from './appContext';
import { config } from './config';

async function start() {
  const ctx = await createAppContext({ mongoUri: config.clientUri });
  const app = buildApp(ctx);

  process.on('SIGTERM', async () => {
    await ctx.db.client.close();
    process.exit(0);
  });

  try {
    await app.listen({
      port: config.port,
      host: '0.0.0.0',
    });
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Swagger docs on http://localhost:${config.port}/docs`);
  } catch (error) {
    app.log.error(error);
    throw error;
  }
}

start();
