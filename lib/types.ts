export type NailShape = 'almond' | 'coffin' | 'stiletto' | 'square' | 'oval' | 'round';

export type NailLength = 'short' | 'medium' | 'long';

export type NailSizePreset = 'XS' | 'S' | 'M' | 'L' | 'Custom';

export type AdhesiveChoice = 'sticky-tabs' | 'liquid-glue' | 'both';

export type NailVibe = 'coquette' | 'alt-girl' | 'minimal' | 'custom-sets';
export type ShopVibe = NailVibe | 'all';

export interface CustomFingerSizes {
  thumb: string;
  index: string;
  middle: string;
  ring: string;
  pinky: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  priceDH: number;
  priceUSD: number;
  vibe: NailVibe;
  shapes: NailShape[];
  lengths: NailLength[];
  images: string[];
  tagline: string;
  description: string;
  details: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  /** Admin-managed publishing and stock fields. Older seed products are normalized on read. */
  status?: 'active' | 'draft';
  sku?: string;
  inventoryBySize?: Partial<Record<NailSizePreset, number>>;
  stockQuantity?: number;
  compareAtPriceDH?: number;
  costPriceDH?: number;
  tags?: string[];
  materials?: string;
  careInstructions?: string;
  shippingNote?: string;
  weightGrams?: number;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudioLogo {
  id: string;
  label: string;
  image: string;
  description?: string;
  active: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Promotion {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  action: string;
  theme: string;
  active: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export function getProductStock(product: Product): number {
  if (product.inventoryBySize) {
    return Object.values(product.inventoryBySize).reduce((total, quantity) => total + (quantity ?? 0), 0);
  }
  if (typeof product.stockQuantity === 'number') return product.stockQuantity;
  return product.inStock ? Number.MAX_SAFE_INTEGER : 0;
}

export function getSizeStock(product: Product, size: NailSizePreset): number {
  if (!product.inventoryBySize) return product.inStock ? Number.MAX_SAFE_INTEGER : 0;
  return product.inventoryBySize[size] ?? 0;
}

export interface CartItem {
  id: string; // unique item id: `${productId}-${shape}-${length}-${size}`
  productId: string;
  slug: string;
  name: string;
  priceDH: number;
  priceUSD: number;
  image: string;
  shape: NailShape;
  length: NailLength;
  size: NailSizePreset;
  customSizes?: CustomFingerSizes;
  adhesive: AdhesiveChoice;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
