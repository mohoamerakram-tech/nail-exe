import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import AdminLogoutButton from '../components/AdminLogoutButton';

export const dynamic = 'force-dynamic';
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <div className="min-h-screen bg-[#fff8fb] text-[#3b2b4e]"><header className="border-b-2 border-[#57446d] bg-[#57446d] px-4 py-4 text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4"><Link href="/admin" className="font-pixel-title text-lg">nail.exe // admin</Link><nav aria-label="Admin navigation" className="flex flex-wrap gap-2 font-pixel text-[9px]"><Link href="/admin" className="rounded-lg border-2 border-white px-3 py-2 hover:bg-white hover:text-[#57446d]">Overview</Link><Link href="/admin/products" className="rounded-lg border-2 border-white px-3 py-2 hover:bg-white hover:text-[#57446d]">Products</Link><Link href="/admin/logos" className="rounded-lg border-2 border-white px-3 py-2 hover:bg-white hover:text-[#57446d]">Studio logos</Link><Link href="/admin/promotions" className="rounded-lg border-2 border-white px-3 py-2 hover:bg-white hover:text-[#57446d]">Promotions</Link><Link href="/" target="_blank" className="rounded-lg border-2 border-[#f9a8d4] px-3 py-2">View shop ↗</Link><AdminLogoutButton /></nav></div></header><div className="mx-auto max-w-6xl px-4 py-8 sm:px-6"><p className="mb-5 font-pixel text-[8px] text-[#8e7ea8]">SIGNED IN AS {admin.email}</p>{children}</div></div>;
}
