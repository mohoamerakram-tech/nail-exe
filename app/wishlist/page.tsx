import WishlistClient from './WishlistClient';
import { getPublicProducts } from '@/lib/catalog/server';

export const metadata = {
  title: 'MY WISHLIST // NAIL.EXE',
  description: 'Your saved press-on nail sets.',
};

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  return <WishlistClient products={await getPublicProducts()} />;
}
