'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ endpoint, label }: { endpoint: string; label: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  return <div><button type="button" disabled={pending} onClick={async () => {
    if (!window.confirm(`Remove “${label}”? This cannot be undone.`)) return;
    setPending(true); setError('');
    const response = await fetch(endpoint, { method: 'DELETE' });
    if (!response.ok) { const result = await response.json().catch(() => ({})) as { error?: string }; setError(result.error || 'Could not remove item.'); setPending(false); return; }
    router.refresh();
  }} className="rounded-lg border-2 border-[#be185d] bg-white px-3 py-2 font-pixel text-[9px] text-[#be185d] hover:bg-[#be185d] hover:text-white disabled:opacity-50">{pending ? 'Removing…' : 'Remove'}</button>{error && <p className="mt-1 max-w-40 text-[10px] text-red-700">{error}</p>}</div>;
}
