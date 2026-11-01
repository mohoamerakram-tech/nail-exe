import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminCookieOptions, assertSameOrigin, createAdminToken, verifyAdminCredentials } from '@/lib/admin/auth';

const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimitKey(request: Request): string {
  const configuredHeader = process.env.ADMIN_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (configuredHeader && /^[a-z0-9-]+$/.test(configuredHeader)) {
    return request.headers.get(configuredHeader)?.split(',')[0]?.trim().slice(0, 100) || 'unknown-client';
  }
  // Netlify overwrites this header at its edge. Other hosts use one shared
  // bucket until a trusted proxy header is explicitly configured.
  if (process.env.NETLIFY === 'true') return request.headers.get('x-nf-client-connection-ip') || 'unknown-client';
  return 'global';
}

export async function POST(request: Request) {
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4096) return Response.json({ error: 'Request is too large.' }, { status: 413 });
  const key = rateLimitKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= 5) return Response.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  if (!body?.email || !body.password || body.email.length > 320 || body.password.length > 1024) {
    return Response.json({ error: 'Enter the administrator email and password.' }, { status: 400 });
  }
  if (!verifyAdminCredentials(body.email, body.password)) {
    const attempt = current && current.resetAt > now ? current : { count: 0, resetAt: now + 15 * 60_000 };
    attempt.count += 1; attempts.set(key, attempt);
    return Response.json({ error: 'The email or password is incorrect.' }, { status: 401 });
  }
  attempts.delete(key);
  (await cookies()).set(ADMIN_COOKIE, createAdminToken(body.email), adminCookieOptions());
  return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function DELETE() {
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  (await cookies()).delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
