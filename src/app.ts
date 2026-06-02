import express from 'express';
import path from 'path';
import routes from './routes';

export function createApp() {
  const app = express();
  const publicDir = path.join(__dirname, '..', 'public');

  app.use(express.json());
  app.use(express.static(publicDir));
  app.use('/api', routes);

  return app;
}

const app = createApp();

export default app;
