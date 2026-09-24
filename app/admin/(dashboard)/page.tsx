import Link from 'next/link';
import { getCatalogState } from '@/lib/catalog/server';
import { getProductStock } from '@/lib/types';

export const metadata = { title: 'Dashboard // NAIL.EXE Admin' };
export default async function AdminDashboard() {
  const catalog = await getCatalogState();
  const active = catalog.products.filter((product) => product.status !== 'draft');
  const cards = [
    { label: 'Live products', value: active.length, href: '/admin/products', note: 'Edit the customer catalogue' },
    { label: 'Sold out', value: active.filter((product) => getProductStock(product) <= 0).length, href: '/admin/products', note: 'Restock unavailable sets' },
    { label: 'Studio logos', value: catalog.logos.filter((logo) => logo.active).length, href: '/admin/logos', note: 'Manage custom motifs' },
    { label: 'Promotions', value: catalog.promotions.filter((promotion) => promotion.active).length, href: '/admin/promotions', note: 'Update the homepage hero' },
  ];
  return <main><div className="mb-8 border-b-2 border-[#57446d] pb-5"><p className="font-pixel text-[9px] text-[#db2777]">CONTROL PANEL ♡</p><h1 className="mt-2 font-pixel-title text-3xl">Store overview</h1><p className="mt-3 max-w-2xl text-sm text-[#6b5b82]">Changes here feed the homepage, shop, product pages, wishlist, checkout, and custom nail studio.</p></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <Link key={card.label} href={card.href} className="pixel-card rounded-2xl bg-white p-5 transition hover:-translate-y-1"><strong className="font-pixel-title text-4xl text-[#db2777]">{card.value}</strong><span className="mt-3 block font-pixel-title text-sm">{card.label}</span><span className="mt-5 block border-t-2 border-[#fbcfe8] pt-3 text-xs text-[#6b5b82]">{card.note} ➔</span></Link>)}</div><div className="mt-8 grid gap-4 sm:grid-cols-3"><Link href="/admin/products/new" className="pixel-btn-pink rounded-xl p-4 text-center text-xs">+ Add nail set</Link><Link href="/admin/logos/new" className="pixel-card rounded-xl bg-white p-4 text-center font-pixel text-xs">+ Add studio logo</Link><Link href="/admin/promotions/new" className="pixel-card rounded-xl bg-white p-4 text-center font-pixel text-xs">+ Add promotion</Link></div></main>;
}
