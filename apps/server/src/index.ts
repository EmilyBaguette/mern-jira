import app from './app';
import { config } from './config';
import { initClient } from './db/client';
import { initCollections } from './db/collections';
import { initDbs } from './db/databases';

async function start() {
  await initClient(config.clientUri);
  initDbs();
  initCollections();

  app.listen(config.port, () => {
    console.log('Server running');
  });
}

start();
