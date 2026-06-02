import request from 'supertest';
import { createTestApp } from './setup';

const app = createTestApp();

describe('Inventory Items API', () => {
  let createdItemId: string;

  describe('GET /api/items', () => {
    it('should return all inventory items', async () => {
      const res = await request(app).get('/api/items');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return items with correct structure', async () => {
      const res = await request(app).get('/api/items');
      const item = res.body.data[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('quantity');
      expect(item).toHaveProperty('location');
      expect(item).toHaveProperty('lastUpdated');
    });
  });

  describe('POST /api/items', () => {
    it('should create a new inventory item', async () => {
      const newItem = {
        name: 'Guardrail Post',
        category: 'Scaffolding',
        quantity: 75,
        location: 'Warehouse C',
      };

      const res = await request(app).post('/api/items').send(newItem);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Guardrail Post');
      expect(res.body.data.id).toBeDefined();
      createdItemId = res.body.data.id;
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/api/items').send({ name: 'Incomplete' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Missing required fields');
    });
  });

  describe('GET /api/items/:id', () => {
    it('should return a single item by ID', async () => {
      const res = await request(app).get(`/api/items/${createdItemId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(createdItemId);
    });

    it('should return 404 for non-existent item', async () => {
      const res = await request(app).get('/api/items/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/items/:id', () => {
    it('should update an existing item', async () => {
      const res = await request(app)
        .put(`/api/items/${createdItemId}`)
        .send({ quantity: 150 });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quantity).toBe(150);
    });

    it('should return 404 when updating non-existent item', async () => {
      const res = await request(app)
        .put('/api/items/non-existent-id')
        .send({ quantity: 10 });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an existing item', async () => {
      const res = await request(app).delete(`/api/items/${createdItemId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 404 when deleting non-existent item', async () => {
      const res = await request(app).delete('/api/items/non-existent-id');
      expect(res.status).toBe(404);
    });
  });
});
