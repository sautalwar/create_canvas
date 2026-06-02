import request from 'supertest';
import { createTestApp } from './setup';

const app = createTestApp();

describe('Inventory Search API', () => {
  describe('GET /api/inventory/search', () => {
    it('should return 200 with all items when no filters are applied', async () => {
      const res = await request(app).get('/api/inventory/search');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('items');
      expect(res.body.data).toHaveProperty('total');
      expect(res.body.data).toHaveProperty('page');
      expect(res.body.data).toHaveProperty('limit');
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.total).toBeGreaterThan(0);
    });

    it('should return items matching name partial match', async () => {
      const res = await request(app).get('/api/inventory/search?name=scaffold');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items.length).toBeGreaterThan(0);
      res.body.data.items.forEach((item: { name: string }) => {
        expect(item.name.toLowerCase()).toContain('scaffold');
      });
    });

    it('should return items matching category exact match', async () => {
      const res = await request(app).get('/api/inventory/search?category=Scaffolding');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items.length).toBeGreaterThan(0);
      res.body.data.items.forEach((item: { category: string }) => {
        expect(item.category).toBe('Scaffolding');
      });
    });

    it('should not return items that do not match category exactly', async () => {
      const res = await request(app).get('/api/inventory/search?category=scaffolding');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      // 'scaffolding' (lowercase) does not match 'Scaffolding' (exact)
      expect(res.body.data.items.length).toBe(0);
      expect(res.body.data.total).toBe(0);
    });

    it('should filter by minQty', async () => {
      const res = await request(app).get('/api/inventory/search?minQty=200');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.items.forEach((item: { quantity: number }) => {
        expect(item.quantity).toBeGreaterThanOrEqual(200);
      });
    });

    it('should filter by maxQty', async () => {
      const res = await request(app).get('/api/inventory/search?maxQty=150');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.items.forEach((item: { quantity: number }) => {
        expect(item.quantity).toBeLessThanOrEqual(150);
      });
    });

    it('should filter by minQty and maxQty range', async () => {
      const res = await request(app).get('/api/inventory/search?minQty=100&maxQty=300');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.items.forEach((item: { quantity: number }) => {
        expect(item.quantity).toBeGreaterThanOrEqual(100);
        expect(item.quantity).toBeLessThanOrEqual(300);
      });
    });

    it('should return empty array when no items match filters', async () => {
      const res = await request(app).get('/api/inventory/search?name=nonexistentitem12345');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items).toEqual([]);
      expect(res.body.data.total).toBe(0);
    });

    it('should support pagination with page and limit', async () => {
      const res = await request(app).get('/api/inventory/search?page=1&limit=1');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items.length).toBe(1);
      expect(res.body.data.page).toBe(1);
      expect(res.body.data.limit).toBe(1);
    });

    it('should return empty items array for out-of-range page', async () => {
      const res = await request(app).get('/api/inventory/search?page=999&limit=10');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items).toEqual([]);
    });

    it('should return 400 for invalid minQty', async () => {
      const res = await request(app).get('/api/inventory/search?minQty=abc');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('minQty');
    });

    it('should return 400 for invalid maxQty', async () => {
      const res = await request(app).get('/api/inventory/search?maxQty=abc');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('maxQty');
    });

    it('should return 400 when minQty is greater than maxQty', async () => {
      const res = await request(app).get('/api/inventory/search?minQty=500&maxQty=100');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('minQty');
    });

    it('should combine name and category filters', async () => {
      const res = await request(app).get('/api/inventory/search?name=frame&category=Scaffolding');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.items.forEach((item: { name: string; category: string }) => {
        expect(item.name.toLowerCase()).toContain('frame');
        expect(item.category).toBe('Scaffolding');
      });
    });
  });
});
