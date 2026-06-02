import { Router, Request, Response } from 'express';
import { ApiResponse, ShoeProduct } from '../types';

const router = Router();

function createShoeImage(label: string, primary: string, secondary: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="540" viewBox="0 0 720 540">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="720" height="540" rx="48" fill="url(#bg)" />
      <path d="M138 332c54-4 97-40 141-90l57 15c42 11 88 18 137 18h78c26 0 45 19 45 43v11H138z" fill="rgba(255,255,255,0.92)" />
      <path d="M223 255c26-21 56-34 88-34 36 0 70 12 104 29l38 20-15 24-45-10c-16 23-47 43-82 43-43 0-73-20-88-51z" fill="rgba(17,24,39,0.22)" />
      <text x="54" y="92" fill="#ffffff" font-family="Arial, sans-serif" font-size="38" font-weight="700">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const seedData: ShoeProduct[] = [
  {
    id: 'shoe-stride-runner',
    name: 'Stride Runner Pro',
    brand: 'AeroStep',
    category: 'Running',
    price: 129.99,
    sizes: [7, 8, 9, 10, 11],
    imageUrl: createShoeImage('Stride Runner Pro', '#2563eb', '#06b6d4'),
    imageUrls: [
      createShoeImage('Stride Runner Pro', '#2563eb', '#06b6d4'),
      createShoeImage('Stride Runner Pro', '#1d4ed8', '#22c55e'),
    ],
    description: 'Lightweight running shoe with responsive foam cushioning for everyday training.',
    featured: true,
  },
  {
    id: 'shoe-city-classic',
    name: 'City Classic Leather',
    brand: 'Northline',
    category: 'Lifestyle',
    price: 109.99,
    sizes: [7, 8, 9, 10, 11, 12],
    imageUrl: createShoeImage('City Classic Leather', '#111827', '#4b5563'),
    imageUrls: [
      createShoeImage('City Classic Leather', '#111827', '#4b5563'),
      createShoeImage('City Classic Leather', '#7c3aed', '#111827'),
    ],
    description: 'Premium leather sneaker designed for all-day comfort and versatile street style.',
    featured: true,
  },
  {
    id: 'shoe-trail-peak',
    name: 'Trail Peak GTX',
    brand: 'Summit',
    category: 'Outdoor',
    price: 149.99,
    sizes: [8, 9, 10, 11, 12],
    imageUrl: createShoeImage('Trail Peak GTX', '#166534', '#84cc16'),
    imageUrls: [
      createShoeImage('Trail Peak GTX', '#166534', '#84cc16'),
      createShoeImage('Trail Peak GTX', '#14532d', '#16a34a'),
    ],
    description: 'Water-resistant trail shoe with aggressive tread for mixed terrain adventures.',
    featured: false,
  },
  {
    id: 'shoe-court-fusion',
    name: 'Court Fusion Mid',
    brand: 'Orbit',
    category: 'Basketball',
    price: 139.99,
    sizes: [8, 9, 10, 11, 12, 13],
    imageUrl: createShoeImage('Court Fusion Mid', '#ea580c', '#facc15'),
    imageUrls: [
      createShoeImage('Court Fusion Mid', '#ea580c', '#facc15'),
      createShoeImage('Court Fusion Mid', '#dc2626', '#fb923c'),
    ],
    description: 'Mid-top basketball silhouette with ankle support and grippy indoor traction.',
    featured: true,
  },
  {
    id: 'shoe-shore-slide',
    name: 'Shore Slide Knit',
    brand: 'AeroStep',
    category: 'Casual',
    price: 79.99,
    sizes: [6, 7, 8, 9, 10],
    imageUrl: createShoeImage('Shore Slide Knit', '#0f766e', '#14b8a6'),
    imageUrls: [
      createShoeImage('Shore Slide Knit', '#0f766e', '#14b8a6'),
      createShoeImage('Shore Slide Knit', '#0f172a', '#0ea5e9'),
    ],
    description: 'Breathable knit slip-on built for easy daily wear and weekend travel.',
    featured: false,
  },
  {
    id: 'shoe-luna-trainer',
    name: 'Luna Trainer X',
    brand: 'Pulse',
    category: 'Training',
    price: 119.99,
    sizes: [7, 8, 9, 10, 11, 12],
    imageUrl: createShoeImage('Luna Trainer X', '#be185d', '#f472b6'),
    imageUrls: [
      createShoeImage('Luna Trainer X', '#be185d', '#f472b6'),
      createShoeImage('Luna Trainer X', '#7e22ce', '#ec4899'),
    ],
    description: 'Stable cross-training shoe with lateral support for gym circuits and HIIT sessions.',
    featured: false,
  },
];

const shoes: Map<string, ShoeProduct> = new Map(seedData.map((shoe) => [shoe.id, shoe]));

// GET /api/shoes - List all shoes with optional filters
router.get('/', (req: Request, res: Response) => {
  const { brand, category, size, minPrice, maxPrice } = req.query;
  const sizeNumber = size !== undefined ? Number(size) : undefined;
  const minPriceNumber = minPrice !== undefined ? Number(minPrice) : undefined;
  const maxPriceNumber = maxPrice !== undefined ? Number(maxPrice) : undefined;

  if (size !== undefined && Number.isNaN(sizeNumber)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'size must be a valid number',
    };
    res.status(400).json(response);
    return;
  }

  if (minPrice !== undefined && Number.isNaN(minPriceNumber)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'minPrice must be a valid number',
    };
    res.status(400).json(response);
    return;
  }

  if (maxPrice !== undefined && Number.isNaN(maxPriceNumber)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'maxPrice must be a valid number',
    };
    res.status(400).json(response);
    return;
  }

  if (
    minPriceNumber !== undefined &&
    maxPriceNumber !== undefined &&
    minPriceNumber > maxPriceNumber
  ) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'minPrice must not be greater than maxPrice',
    };
    res.status(400).json(response);
    return;
  }

  let results = Array.from(shoes.values());

  if (brand) {
    const brandLower = String(brand).toLowerCase();
    results = results.filter((shoe) => shoe.brand.toLowerCase() === brandLower);
  }

  if (category) {
    const categoryLower = String(category).toLowerCase();
    results = results.filter((shoe) => shoe.category.toLowerCase() === categoryLower);
  }

  if (sizeNumber !== undefined) {
    results = results.filter((shoe) => shoe.sizes.includes(sizeNumber));
  }

  if (minPriceNumber !== undefined) {
    results = results.filter((shoe) => shoe.price >= minPriceNumber);
  }

  if (maxPriceNumber !== undefined) {
    results = results.filter((shoe) => shoe.price <= maxPriceNumber);
  }

  const response: ApiResponse<ShoeProduct[]> = {
    success: true,
    data: results,
  };
  res.json(response);
});

// GET /api/shoes/:id - Get a single shoe
router.get('/:id', (req: Request, res: Response) => {
  const shoe = shoes.get(req.params.id);
  if (!shoe) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Shoe not found',
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<ShoeProduct> = {
    success: true,
    data: shoe,
  };
  res.json(response);
});

export { shoes };
export default router;
