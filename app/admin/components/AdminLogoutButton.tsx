'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  return <button type="button" disabled={pending} onClick={async () => { setPending(true); await fetch('/api/admin/login', { method: 'DELETE' }); router.replace('/admin/login'); router.refresh(); }} className="rounded-lg border-2 border-white px-3 py-2 hover:bg-white hover:text-[#57446d] disabled:opacity-50">{pending ? 'Leaving…' : 'Sign out'}</button>;
}
