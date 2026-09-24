import CheckoutClient from './CheckoutClient';
import { getPublicProducts } from '@/lib/catalog/server';

export const metadata = {
  title: 'SECURE CHECKOUT & DISPATCH // NAIL.EXE',
  description: 'Review your handmade press-on nail sets and delivery details.',
};

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  return <CheckoutClient products={await getPublicProducts()} />;
}
