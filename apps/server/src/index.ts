import { buildApp } from './app';
import { config } from './config';
// import { initClient } from './db/client';
// import { initCollections } from './db/collections';
// import { initDbs } from './db/databases';

async function start() {
  const app = buildApp();

  // await initClient(config.clientUri);
  // initDbs();
  // initCollections();

  try {
    await app.listen({
      port: config.port,
      host: '0.0.0.0', // good for Docker
    });
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Swagger docs on http://localhost:${config.port}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
