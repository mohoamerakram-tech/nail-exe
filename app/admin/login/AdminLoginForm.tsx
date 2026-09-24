'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm({ email }: { email: string }) {
  const router = useRouter(); const [error, setError] = useState(''); const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setPending(true); const data = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: data.get('email'), password: data.get('password') }) });
    const result = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) { setError(result.error || 'Login failed.'); setPending(false); return; }
    router.replace('/admin'); router.refresh();
  }
  const input = 'w-full rounded-xl border-2 border-[#57446d] bg-white px-4 py-3 font-pixel-body text-sm outline-none focus:shadow-[3px_3px_0_#f472b6]';
  return <form onSubmit={submit} className="space-y-5"><label className="block font-pixel-title text-[10px]">ADMIN EMAIL<input name="email" type="email" defaultValue={email} autoComplete="username" required className={`${input} mt-2`} /></label><label className="block font-pixel-title text-[10px]">PASSWORD<input name="password" type="password" autoComplete="current-password" required className={`${input} mt-2`} /></label>{error && <p role="alert" className="rounded-lg border-2 border-red-500 bg-red-50 p-3 text-xs text-red-800">{error}</p>}<button disabled={pending} className="pixel-btn-pink w-full rounded-xl px-5 py-3 text-xs disabled:opacity-50">{pending ? 'CHECKING…' : '[ ENTER ADMIN PANEL ➔ ]'}</button></form>;
}
