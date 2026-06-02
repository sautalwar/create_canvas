import { Router, Request, Response } from 'express';
import { InventoryItem, ApiResponse } from '../types';
import { items } from './items';

const router = Router();

export interface SearchResult {
  items: InventoryItem[];
  total: number;
  page: number;
  limit: number;
}

// GET /api/inventory/search - Search inventory items with filtering and pagination
router.get('/search', (req: Request, res: Response) => {
  const { name, category, minQty, maxQty, page: pageParam, limit: limitParam } = req.query;

  // Validate numeric params
  const minQtyNum = minQty !== undefined ? Number(minQty) : undefined;
  const maxQtyNum = maxQty !== undefined ? Number(maxQty) : undefined;

  if (minQty !== undefined && (isNaN(minQtyNum as number) || minQtyNum! < 0)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'minQty must be a non-negative number',
    };
    res.status(400).json(response);
    return;
  }

  if (maxQty !== undefined && (isNaN(maxQtyNum as number) || maxQtyNum! < 0)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'maxQty must be a non-negative number',
    };
    res.status(400).json(response);
    return;
  }

  if (minQtyNum !== undefined && maxQtyNum !== undefined && minQtyNum > maxQtyNum) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'minQty must not be greater than maxQty',
    };
    res.status(400).json(response);
    return;
  }

  const page = Math.max(1, parseInt(String(pageParam ?? '1'), 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(String(limitParam ?? '10'), 10) || 10));

  let results = Array.from(items.values());

  if (name) {
    const nameLower = String(name).toLowerCase();
    results = results.filter((item) => item.name.toLowerCase().includes(nameLower));
  }

  if (category) {
    const categoryStr = String(category);
    results = results.filter((item) => item.category === categoryStr);
  }

  if (minQtyNum !== undefined) {
    results = results.filter((item) => item.quantity >= minQtyNum);
  }

  if (maxQtyNum !== undefined) {
    results = results.filter((item) => item.quantity <= maxQtyNum);
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const paginatedItems = results.slice(start, start + limit);

  const response: ApiResponse<SearchResult> = {
    success: true,
    data: {
      items: paginatedItems,
      total,
      page,
      limit,
    },
  };
  res.json(response);
});

export default router;
