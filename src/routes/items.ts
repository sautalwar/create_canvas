import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { InventoryItem, CreateItemRequest, UpdateItemRequest, ApiResponse } from '../types';

const router = Router();

// In-memory store (replaced by DB in production)
const items: Map<string, InventoryItem> = new Map();

// Seed some demo data
const seedData: InventoryItem[] = [
  {
    id: uuidv4(),
    name: 'Scaffold Frame 5ft',
    category: 'Scaffolding',
    quantity: 250,
    location: 'Warehouse A',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Safety Harness',
    category: 'Safety Equipment',
    quantity: 100,
    location: 'Warehouse B',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Cross Brace 7ft',
    category: 'Scaffolding',
    quantity: 500,
    location: 'Warehouse A',
    lastUpdated: new Date().toISOString(),
  },
];

seedData.forEach((item) => items.set(item.id, item));

// GET /api/items - List all inventory items
router.get('/', (_req: Request, res: Response) => {
  const allItems = Array.from(items.values());
  const response: ApiResponse<InventoryItem[]> = {
    success: true,
    data: allItems,
  };
  res.json(response);
});

// GET /api/items/:id - Get a single item
router.get('/:id', (req: Request, res: Response) => {
  const item = items.get(req.params.id);
  if (!item) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found',
    };
    res.status(404).json(response);
    return;
  }
  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: item,
  };
  res.json(response);
});

// POST /api/items - Create a new item
router.post('/', (req: Request, res: Response) => {
  const { name, category, quantity, location } = req.body as CreateItemRequest;

  if (!name || !category || quantity === undefined || !location) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Missing required fields: name, category, quantity, location',
    };
    res.status(400).json(response);
    return;
  }

  const newItem: InventoryItem = {
    id: uuidv4(),
    name,
    category,
    quantity,
    location,
    lastUpdated: new Date().toISOString(),
  };

  items.set(newItem.id, newItem);

  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: newItem,
  };
  res.status(201).json(response);
});

// PUT /api/items/:id - Update an item
router.put('/:id', (req: Request, res: Response) => {
  const item = items.get(req.params.id);
  if (!item) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found',
    };
    res.status(404).json(response);
    return;
  }

  const updates = req.body as UpdateItemRequest;
  const updatedItem: InventoryItem = {
    ...item,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };

  items.set(req.params.id, updatedItem);

  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: updatedItem,
  };
  res.json(response);
});

// DELETE /api/items/:id - Delete an item
router.delete('/:id', (req: Request, res: Response) => {
  if (!items.has(req.params.id)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found',
    };
    res.status(404).json(response);
    return;
  }

  items.delete(req.params.id);

  const response: ApiResponse<null> = {
    success: true,
  };
  res.json(response);
});

export { items }; // Export for testing
export default router;
