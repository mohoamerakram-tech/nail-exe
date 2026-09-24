import type { Product, Promotion, StudioLogo } from '@/lib/types';

export interface CatalogState {
  products: Product[];
  logos: StudioLogo[];
  promotions: Promotion[];
  updatedAt: string;
}
