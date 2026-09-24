import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '@/lib/products';
import { PROMOTIONS } from '@/lib/promotions';
import type { NailSizePreset, Product, Promotion, StudioLogo } from '@/lib/types';
import { getProductStock } from '@/lib/types';
import type { CatalogState } from './types';

const LOCAL_STATE_PATH = path.join(process.cwd(), 'data', 'admin-catalog.json');
const LOCAL_UPLOAD_PATH = path.join(process.cwd(), 'public', 'uploads', 'catalog');
const SUPABASE_ROW_ID = 'main';
const DEFAULT_SIZES: NailSizePreset[] = ['XS', 'S', 'M', 'L', 'Custom'];

const DEFAULT_LOGOS: StudioLogo[] = [
  { id: 'pink-heart', label: 'Pink Heart', image: '/images/icons/cat-calico.png', description: 'A sweet accent for romantic custom sets.', active: true, sortOrder: 0 },
  { id: 'moon-cat', label: 'Moon Cat', image: '/images/icons/cat-grey.png', description: 'A tiny dreamy mascot for darker nail sets.', active: true, sortOrder: 1 },
];

function normalizeProduct(product: Product): Product {
  const inventoryBySize = product.inventoryBySize ?? Object.fromEntries(DEFAULT_SIZES.map((size) => [size, product.inStock ? 10 : 0]));
  const stockQuantity = Object.values(inventoryBySize).reduce((total, quantity) => total + (quantity ?? 0), 0);
  return { ...product, status: product.status ?? 'active', inventoryBySize, stockQuantity, inStock: stockQuantity > 0 };
}

function defaultState(): CatalogState {
  return {
    products: structuredClone(PRODUCTS).map(normalizeProduct),
    logos: structuredClone(DEFAULT_LOGOS),
    promotions: structuredClone(PROMOTIONS),
    updatedAt: new Date(0).toISOString(),
  };
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

function supabaseHeaders(key: string): HeadersInit {
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}

function normalizeState(value: unknown): CatalogState | null {
  if (!value || typeof value !== 'object') return null;
  const state = value as Partial<CatalogState>;
  if (!Array.isArray(state.products)) return null;
  return {
    products: (state.products as Product[]).map(normalizeProduct),
    logos: Array.isArray(state.logos) ? state.logos as StudioLogo[] : structuredClone(DEFAULT_LOGOS),
    promotions: Array.isArray(state.promotions) ? state.promotions as Promotion[] : structuredClone(PROMOTIONS),
    updatedAt: typeof state.updatedAt === 'string' ? state.updatedAt : new Date().toISOString(),
  };
}

/** Reads the whole single-admin catalogue from Supabase or a local development file. */
export async function getCatalogState(): Promise<CatalogState> {
  const supabase = supabaseConfig();
  if (supabase) {
    const response = await fetch(`${supabase.url}/rest/v1/catalog_state?id=eq.${SUPABASE_ROW_ID}&select=products,logos,promotions,updated_at`, {
      headers: supabaseHeaders(supabase.key), cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Catalogue database read failed (${response.status}).`);
    const rows = await response.json() as Array<{ products: Product[]; logos: StudioLogo[]; promotions: Promotion[]; updated_at: string }>;
    return rows[0] ? normalizeState({ ...rows[0], updatedAt: rows[0].updated_at }) ?? defaultState() : defaultState();
  }
  try {
    return normalizeState(JSON.parse(await fs.readFile(LOCAL_STATE_PATH, 'utf8'))) ?? defaultState();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return defaultState();
    throw error;
  }
}

/** Persists one atomic catalogue snapshot. Production requires Supabase. */
export async function saveCatalogState(state: CatalogState): Promise<void> {
  const nextState = { ...state, updatedAt: new Date().toISOString() };
  const supabase = supabaseConfig();
  if (supabase) {
    const response = await fetch(`${supabase.url}/rest/v1/catalog_state?on_conflict=id`, {
      method: 'POST',
      headers: { ...supabaseHeaders(supabase.key), Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ id: SUPABASE_ROW_ID, products: nextState.products, logos: nextState.logos, promotions: nextState.promotions, updated_at: nextState.updatedAt }),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Catalogue database write failed (${response.status}).`);
    return;
  }
  if (process.env.NODE_ENV === 'production') throw new Error('Production catalogue storage is not configured.');
  await fs.mkdir(path.dirname(LOCAL_STATE_PATH), { recursive: true });
  await fs.writeFile(LOCAL_STATE_PATH, `${JSON.stringify(nextState, null, 2)}\n`, 'utf8');
}

export async function getPublicProducts(): Promise<Product[]> {
  return (await getCatalogState()).products.filter((product) => product.status !== 'draft');
}

export async function getPublicProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getPublicProducts()).find((product) => product.slug === slug);
}

export async function getPublicLogos(): Promise<StudioLogo[]> {
  return (await getCatalogState()).logos.filter((logo) => logo.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getPublicPromotions(): Promise<Promotion[]> {
  return (await getCatalogState()).promotions.filter((promotion) => promotion.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function productIsSoldOut(product: Product): boolean {
  return getProductStock(product) <= 0;
}

function imageSignatureIsValid(bytes: Uint8Array, mime: string): boolean {
  const png = bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((value, index) => bytes[index] === value);
  const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const webp = bytes.length >= 12 && new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP';
  return (mime === 'image/png' && png) || (mime === 'image/jpeg' && jpg) || (mime === 'image/webp' && webp);
}

export async function uploadCatalogImage(file: File, kind: 'products' | 'logos' | 'promotions'): Promise<string> {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw new Error('Only PNG, JPG, and WebP images are supported.');
  if (!file.size || file.size > 10 * 1024 * 1024) throw new Error('Images must be smaller than 10 MB.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!imageSignatureIsValid(bytes.slice(0, 16), file.type)) throw new Error('The uploaded image is invalid.');
  const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const objectName = `${kind}/${crypto.randomUUID()}.${extension}`;
  const supabase = supabaseConfig();
  if (supabase) {
    const response = await fetch(`${supabase.url}/storage/v1/object/catalog-media/${objectName}`, {
      method: 'POST', headers: { apikey: supabase.key, Authorization: `Bearer ${supabase.key}`, 'Content-Type': file.type, 'x-upsert': 'false' }, body: bytes,
    });
    if (!response.ok) throw new Error(`Image upload failed (${response.status}).`);
    return `${supabase.url}/storage/v1/object/public/catalog-media/${objectName}`;
  }
  if (process.env.NODE_ENV === 'production') throw new Error('Production media storage is not configured.');
  const fileName = `${kind}-${crypto.randomUUID()}.${extension}`;
  await fs.mkdir(LOCAL_UPLOAD_PATH, { recursive: true });
  await fs.writeFile(path.join(LOCAL_UPLOAD_PATH, fileName), bytes);
  return `/uploads/catalog/${fileName}`;
}
