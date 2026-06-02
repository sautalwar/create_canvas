import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'Brandsafway Inventory API',
    version: '1.0.0',
    endpoints: [
      'GET    /api/items',
      'GET    /api/items/:id',
      'POST   /api/items',
      'PUT    /api/items/:id',
      'DELETE /api/items/:id',
    'GET    /api/inventory/search',
    ],
  });
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
