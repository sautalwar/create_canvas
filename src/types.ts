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

export interface ShoeProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  sizes: number[];
  imageUrl: string;
  imageUrls: string[];
  description: string;
  featured: boolean;
}

export interface AddToCartRequest {
  shoeId: string;
  size: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  shoeId: string;
  name: string;
  brand: string;
  size: number;
  quantity: number;
  price: number;
  imageUrl: string;
  lineTotal: number;
}

export interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}
