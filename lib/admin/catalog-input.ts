import 'server-only';

import { uploadCatalogImage } from '@/lib/catalog/server';
import type { NailLength, NailShape, NailSizePreset, NailVibe, Product, Promotion, StudioLogo } from '@/lib/types';

const SHAPES: NailShape[] = ['almond', 'coffin', 'stiletto', 'square', 'oval', 'round'];
const LENGTHS: NailLength[] = ['short', 'medium', 'long'];
const VIBES: NailVibe[] = ['coquette', 'alt-girl', 'minimal', 'custom-sets'];
const SIZES: NailSizePreset[] = ['XS', 'S', 'M', 'L', 'Custom'];

function text(form: FormData, key: string, max = 5000): string {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function number(form: FormData, key: string, optional = false): number | undefined {
  const raw = text(form, key, 30);
  if (!raw && optional) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : undefined;
}

function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100);
}

function safeImageUrl(value: string): string | null {
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.toString() : null; } catch { return null; }
}

function list(form: FormData, key: string, maxItems = 30): string[] {
  return text(form, key, 4000).split(/[\n,]+/).map((item) => item.trim()).filter(Boolean).slice(0, maxItems);
}

function checkedValues<T extends string>(form: FormData, key: string, allowed: readonly T[]): T[] {
  return form.getAll(key).filter((value): value is string => typeof value === 'string').filter((value): value is T => allowed.includes(value as T));
}

function parseInventory(form: FormData): Partial<Record<NailSizePreset, number>> {
  return Object.fromEntries(SIZES.map((size) => [size, Math.min(100000, Math.floor(number(form, `stock-${size}`, true) ?? 0))]));
}

async function productImages(form: FormData, existing?: Product): Promise<string[]> {
  const retained = form.getAll('keepImage').filter((item): item is string => typeof item === 'string');
  let images = retained.map(safeImageUrl).filter((item): item is string => Boolean(item));
  if (!retained.length && !form.has('imageSelection')) images = existing?.images ?? [];
  const files = form.getAll('images').filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length > 8) throw new Error('Upload no more than eight images at once.');
  for (const file of files) images.push(await uploadCatalogImage(file, 'products'));
  images = [...new Set(images)].slice(0, 12);
  if (!images.length) throw new Error('Add at least one product image.');
  return images;
}

export async function productFromForm(form: FormData, existing?: Product): Promise<Product> {
  const name = text(form, 'name', 160);
  const slug = slugify(text(form, 'slug', 120) || name);
  const priceDH = number(form, 'priceDH');
  const priceUSD = number(form, 'priceUSD');
  const vibe = text(form, 'vibe', 30) as NailVibe;
  const shapes = checkedValues(form, 'shapes', SHAPES);
  const lengths = checkedValues(form, 'lengths', LENGTHS);
  const description = text(form, 'description');
  if (!name || !slug || priceDH === undefined || priceUSD === undefined || !VIBES.includes(vibe) || !description) {
    throw new Error('Name, prices, vibe, slug, and description are required.');
  }
  if (!shapes.length || !lengths.length) throw new Error('Choose at least one nail shape and length.');
  const inventoryBySize = parseInventory(form);
  const stockQuantity = Object.values(inventoryBySize).reduce((total, quantity) => total + (quantity ?? 0), 0);
  const now = new Date().toISOString();
  return {
    id: existing?.id || `nail-${crypto.randomUUID()}`,
    slug, name, priceDH, priceUSD, vibe, shapes, lengths,
    images: await productImages(form, existing),
    tagline: text(form, 'tagline', 500),
    description,
    details: list(form, 'details'),
    inStock: stockQuantity > 0,
    inventoryBySize,
    stockQuantity,
    rating: Math.min(5, number(form, 'rating', true) ?? existing?.rating ?? 5),
    reviewsCount: Math.floor(number(form, 'reviewsCount', true) ?? existing?.reviewsCount ?? 0),
    isBestSeller: form.get('isBestSeller') === 'on',
    isNew: form.get('isNew') === 'on',
    featured: form.get('featured') === 'on',
    status: text(form, 'status', 20) === 'draft' ? 'draft' : 'active',
    sku: text(form, 'sku', 80) || undefined,
    compareAtPriceDH: number(form, 'compareAtPriceDH', true),
    costPriceDH: number(form, 'costPriceDH', true),
    tags: list(form, 'tags'),
    materials: text(form, 'materials', 1500) || undefined,
    careInstructions: text(form, 'careInstructions', 1500) || undefined,
    shippingNote: text(form, 'shippingNote', 1500) || undefined,
    weightGrams: number(form, 'weightGrams', true),
    seoTitle: text(form, 'seoTitle', 180) || undefined,
    seoDescription: text(form, 'seoDescription', 320) || undefined,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

export async function logoFromForm(form: FormData, existing?: StudioLogo): Promise<StudioLogo> {
  const label = text(form, 'label', 100);
  const id = existing?.id || slugify(text(form, 'id', 120) || label);
  if (!label || !id) throw new Error('Logo name and ID are required.');
  const file = form.get('image');
  let image = existing?.image || '';
  if (file instanceof File && file.size) image = await uploadCatalogImage(file, 'logos');
  if (!image) throw new Error('Choose a logo image.');
  const now = new Date().toISOString();
  return { id, label, image, description: text(form, 'description', 500) || undefined, active: form.get('active') === 'on', sortOrder: Math.floor(number(form, 'sortOrder', true) ?? 0), createdAt: existing?.createdAt || now, updatedAt: now };
}

export async function promotionFromForm(form: FormData, existing?: Promotion): Promise<Promotion> {
  const title = text(form, 'title', 160);
  const id = existing?.id || slugify(text(form, 'id', 120) || title);
  if (!title || !id) throw new Error('Promotion title and ID are required.');
  const file = form.get('image');
  let image = existing?.image || '';
  if (file instanceof File && file.size) image = await uploadCatalogImage(file, 'promotions');
  if (!image) throw new Error('Choose a promotion image.');
  const href = text(form, 'href', 500) || '/shop';
  if (!href.startsWith('/') || href.startsWith('//')) throw new Error('Promotion link must be an internal path beginning with /.');
  const now = new Date().toISOString();
  return {
    id, title, image, href,
    eyebrow: text(form, 'eyebrow', 100),
    description: text(form, 'description', 500),
    imageAlt: text(form, 'imageAlt', 200) || title,
    action: text(form, 'action', 80) || 'Shop now',
    theme: text(form, 'theme', 300) || 'from-[#fecdd3]/90 via-[#fce7f3]/75 to-white/30',
    active: form.get('active') === 'on',
    sortOrder: Math.floor(number(form, 'sortOrder', true) ?? 0),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}
