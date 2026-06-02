import { Router, Request, Response } from 'express';
import { InventoryItem, ApiResponse } from '../types';
import { items } from './items';

const router = Router();

// UUID v4 format regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// DELETE /api/inventory/:id - Remove an inventory item
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  if (!UUID_REGEX.test(id)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Invalid ID format. Expected a valid UUID.',
    };
    res.status(400).json(response);
    return;
  }

  const item = items.get(id);
  if (!item) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Item not found',
    };
    res.status(404).json(response);
    return;
  }

  items.delete(id);

  const response: ApiResponse<InventoryItem> = {
    success: true,
    data: item,
  };
  res.json(response);
});

export default router;
