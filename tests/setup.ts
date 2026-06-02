import express from 'express';
import routes from '../src/routes';

// Create a fresh app instance for testing
export function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', routes);
  return app;
}
