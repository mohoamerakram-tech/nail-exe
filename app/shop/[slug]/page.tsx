import { notFound } from 'next/navigation';
import { getPublicProductBySlug } from '@/lib/catalog/server';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getPublicProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: 'PRODUCT NOT FOUND // NAIL.EXE' };
  }

  return {
    title: `${product.name} // NAIL.EXE Press On Nails`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getPublicProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
