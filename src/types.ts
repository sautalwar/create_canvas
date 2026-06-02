export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  lastUpdated: string;
}

export interface CreateItemRequest {
  name: string;
  category: string;
  quantity: number;
  location: string;
}

export interface UpdateItemRequest {
  name?: string;
  category?: string;
  quantity?: number;
  location?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
