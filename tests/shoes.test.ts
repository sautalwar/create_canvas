import request from 'supertest';
import { createTestApp } from './setup';

const app = createTestApp();

describe('Shoe Store API', () => {
  describe('GET /', () => {
    it('should serve the storefront homepage', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/html');
      expect(res.text).toContain('Best Shoes on Earth');
      expect(res.text).toContain('Shop performance footwear');
    });
  });

  describe('GET /api/shoes', () => {
    it('should return all shoes with the expected product fields', async () => {
      const res = await request(app).get('/api/shoes');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          brand: expect.any(String),
          price: expect.any(Number),
          sizes: expect.any(Array),
          imageUrl: expect.any(String),
        }),
      );
    });

    it('should support brand, size, and price filtering', async () => {
      const res = await request(app).get('/api/shoes?brand=AeroStep&size=8&minPrice=80&maxPrice=140');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      res.body.data.forEach((shoe: { brand: string; sizes: number[]; price: number }) => {
        expect(shoe.brand).toBe('AeroStep');
        expect(shoe.sizes).toContain(8);
        expect(shoe.price).toBeGreaterThanOrEqual(80);
        expect(shoe.price).toBeLessThanOrEqual(140);
      });
    });

    it('should return 400 for an invalid price range', async () => {
      const res = await request(app).get('/api/shoes?minPrice=200&maxPrice=100');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('minPrice');
    });

    it('should include Nike shoes in the catalog', async () => {
      const res = await request(app).get('/api/shoes?brand=Nike');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
      res.body.data.forEach((shoe: { brand: string }) => {
        expect(shoe.brand).toBe('Nike');
      });
    });
  });

  describe('GET /api/shoes/:id', () => {
    it('should return a single shoe detail', async () => {
      const shoesRes = await request(app).get('/api/shoes');
      const shoeId = shoesRes.body.data[0].id;

      const res = await request(app).get(`/api/shoes/${shoeId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(shoeId);
      expect(res.body.data.imageUrls.length).toBeGreaterThan(1);
      expect(res.body.data.description).toBeTruthy();
    });

    it('should return 404 for an unknown shoe', async () => {
      const res = await request(app).get('/api/shoes/unknown-shoe');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
