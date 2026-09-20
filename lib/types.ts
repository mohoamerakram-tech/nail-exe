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
