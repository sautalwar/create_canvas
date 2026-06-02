import request from 'supertest';
import { createTestApp } from './setup';
import { resetCart } from '../src/routes/cart';

const app = createTestApp();

describe('Shopping Cart API', () => {
  beforeEach(() => {
    resetCart();
  });

  describe('POST /api/cart', () => {
    it('should add an item to the cart and return the updated cart', async () => {
      const res = await request(app).post('/api/cart').send({
        shoeId: 'shoe-stride-runner',
        size: 9,
        quantity: 2,
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.itemCount).toBe(2);
      expect(res.body.data.subtotal).toBeCloseTo(259.98, 2);
      expect(res.body.data.items[0]).toEqual(
        expect.objectContaining({
          shoeId: 'shoe-stride-runner',
          size: 9,
          quantity: 2,
        }),
      );
    });

    it('should merge duplicate shoe and size combinations', async () => {
      await request(app).post('/api/cart').send({
        shoeId: 'shoe-stride-runner',
        size: 9,
        quantity: 1,
      });

      const res = await request(app).post('/api/cart').send({
        shoeId: 'shoe-stride-runner',
        size: 9,
        quantity: 3,
      });

      expect(res.status).toBe(201);
      expect(res.body.data.items).toHaveLength(1);
      expect(res.body.data.items[0].quantity).toBe(4);
      expect(res.body.data.itemCount).toBe(4);
    });

    it('should reject unavailable sizes', async () => {
      const res = await request(app).post('/api/cart').send({
        shoeId: 'shoe-stride-runner',
        size: 15,
        quantity: 1,
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('unavailable');
    });
  });

  describe('GET /api/cart', () => {
    it('should return the current cart contents', async () => {
      await request(app).post('/api/cart').send({
        shoeId: 'shoe-city-classic',
        size: 10,
        quantity: 1,
      });

      const res = await request(app).get('/api/cart');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.itemCount).toBe(1);
      expect(res.body.data.items[0].name).toBe('City Classic Leather');
    });
  });

  describe('DELETE /api/cart/:itemId', () => {
    it('should remove an item from the cart', async () => {
      const addRes = await request(app).post('/api/cart').send({
        shoeId: 'shoe-city-classic',
        size: 10,
        quantity: 1,
      });
      const cartItemId = addRes.body.data.items[0].id;

      const res = await request(app).delete(`/api/cart/${cartItemId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items).toEqual([]);
      expect(res.body.data.itemCount).toBe(0);
      expect(res.body.data.subtotal).toBe(0);
    });

    it('should return 404 for an unknown cart item', async () => {
      const res = await request(app).delete('/api/cart/unknown-item');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
