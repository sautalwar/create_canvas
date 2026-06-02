import request from 'supertest';
import { createTestApp } from './setup';

const app = createTestApp();

describe('DELETE /api/inventory/:id', () => {
  let validItemId: string;

  beforeAll(async () => {
    // Create an item to use in delete tests
    const res = await request(app).post('/api/items').send({
      name: 'Test Delete Item',
      category: 'Test',
      quantity: 10,
      location: 'Warehouse X',
    });
    validItemId = res.body.data.id;
  });

  describe('success cases', () => {
    it('should delete an existing item and return it', async () => {
      const res = await request(app).delete(`/api/inventory/${validItemId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.id).toBe(validItemId);
      expect(res.body.data.name).toBe('Test Delete Item');
      expect(res.body.data.category).toBe('Test');
      expect(res.body.data.quantity).toBe(10);
      expect(res.body.data.location).toBe('Warehouse X');
    });

    it('should no longer return the deleted item via GET', async () => {
      const res = await request(app).get(`/api/items/${validItemId}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('error cases - 404', () => {
    it('should return 404 for a valid UUID that does not exist', async () => {
      const nonExistentId = '00000000-0000-4000-a000-000000000000';
      const res = await request(app).delete(`/api/inventory/${nonExistentId}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Item not found');
    });

    it('should return 404 when deleting the same item twice', async () => {
      // Create and delete an item
      const createRes = await request(app).post('/api/items').send({
        name: 'Double Delete',
        category: 'Test',
        quantity: 1,
        location: 'Warehouse Y',
      });
      const id = createRes.body.data.id;

      await request(app).delete(`/api/inventory/${id}`);
      const res = await request(app).delete(`/api/inventory/${id}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('error cases - 400', () => {
    it('should return 400 for an invalid ID format', async () => {
      const res = await request(app).delete('/api/inventory/not-a-uuid');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid ID format');
    });

    it('should return 400 for a numeric ID', async () => {
      const res = await request(app).delete('/api/inventory/12345');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid ID format');
    });

    it('should return 400 for an empty-ish ID', async () => {
      const res = await request(app).delete('/api/inventory/abc');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
