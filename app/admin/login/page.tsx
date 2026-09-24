import { redirect } from 'next/navigation';
import { getAdminSession, getConfiguredAdminEmail } from '@/lib/admin/auth';
import AdminLoginForm from './AdminLoginForm';

export const metadata = { title: 'Admin Login // NAIL.EXE' };
export const dynamic = 'force-dynamic';
export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect('/admin');
  return <main className="min-h-[75vh] px-4 py-16"><section className="retro-pixel-window mx-auto max-w-md bg-white p-7 sm:p-9"><p className="font-pixel text-[9px] text-[#db2777]">♡ RESTRICTED // STORE OWNER</p><h1 className="mt-3 font-pixel-title text-2xl text-[#3b2b4e]">Admin login</h1><p className="mb-7 mt-4 font-pixel-body text-sm text-[#6b5b82]">Manage the nail catalogue, stock, studio logos, and homepage campaigns.</p><AdminLoginForm email={getConfiguredAdminEmail()} /></section></main>;
}
