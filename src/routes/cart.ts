import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AddToCartRequest, ApiResponse, CartItem, CartSummary } from '../types';
import { shoes } from './shoes';

const router = Router();
const cartItems: Map<string, CartItem> = new Map();

function getCartSummary(): CartSummary {
  const items = Array.from(cartItems.values());
  return {
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: Number(items.reduce((total, item) => total + item.lineTotal, 0).toFixed(2)),
  };
}

function createCartResponse(res: Response, status = 200) {
  const response: ApiResponse<CartSummary> = {
    success: true,
    data: getCartSummary(),
  };
  res.status(status).json(response);
}

// GET /api/cart - View cart contents
router.get('/', (_req: Request, res: Response) => {
  createCartResponse(res);
});

// POST /api/cart - Add item to cart
router.post('/', (req: Request, res: Response) => {
  const { shoeId, size, quantity } = req.body as AddToCartRequest;

  if (!shoeId || size === undefined || quantity === undefined) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Missing required fields: shoeId, size, quantity',
    };
    res.status(400).json(response);
    return;
  }

  const parsedSize = Number(size);
  const parsedQuantity = Number(quantity);

  if (Number.isNaN(parsedSize)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'size must be a valid number',
    };
    res.status(400).json(response);
    return;
  }

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'quantity must be a positive integer',
    };
    res.status(400).json(response);
    return;
  }

  const shoe = shoes.get(shoeId);
  if (!shoe) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Shoe not found',
    };
    res.status(404).json(response);
    return;
  }

  if (!shoe.sizes.includes(parsedSize)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Selected size is unavailable for this shoe',
    };
    res.status(400).json(response);
    return;
  }

  const existingItem = Array.from(cartItems.values()).find(
    (item) => item.shoeId === shoeId && item.size === parsedSize,
  );

  if (existingItem) {
    existingItem.quantity += parsedQuantity;
    existingItem.lineTotal = Number((existingItem.quantity * existingItem.price).toFixed(2));
    cartItems.set(existingItem.id, existingItem);
    createCartResponse(res, 201);
    return;
  }

  const cartItem: CartItem = {
    id: uuidv4(),
    shoeId: shoe.id,
    name: shoe.name,
    brand: shoe.brand,
    size: parsedSize,
    quantity: parsedQuantity,
    price: shoe.price,
    imageUrl: shoe.imageUrl,
    lineTotal: Number((shoe.price * parsedQuantity).toFixed(2)),
  };

  cartItems.set(cartItem.id, cartItem);
  createCartResponse(res, 201);
});

// DELETE /api/cart/:itemId - Remove item from cart
router.delete('/:itemId', (req: Request, res: Response) => {
  if (!cartItems.has(req.params.itemId)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Cart item not found',
    };
    res.status(404).json(response);
    return;
  }

  cartItems.delete(req.params.itemId);
  createCartResponse(res);
});

export function resetCart() {
  cartItems.clear();
}

export default router;
