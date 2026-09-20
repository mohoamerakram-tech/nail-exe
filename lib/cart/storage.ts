import { CartItem } from '../types';

const STORAGE_KEY = 'nail_exe_cart_press_on_v1';

// Storage is untrusted across app versions; ignore entries the cart UI cannot render.
function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.productId === 'string'
    && typeof item.slug === 'string'
    && typeof item.name === 'string'
    && typeof item.image === 'string'
    && typeof item.shape === 'string'
    && typeof item.length === 'string'
    && typeof item.size === 'string'
    && typeof item.adhesive === 'string'
    && typeof item.priceDH === 'number' && Number.isFinite(item.priceDH)
    && typeof item.priceUSD === 'number' && Number.isFinite(item.priceUSD)
    && typeof item.quantity === 'number' && Number.isInteger(item.quantity) && item.quantity > 0;
}

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch (err) {
    console.error('Failed to load cart from localStorage', err);
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}
