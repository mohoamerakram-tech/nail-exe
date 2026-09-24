import 'server-only';

import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const ADMIN_COOKIE = 'nail-exe-admin';
const SESSION_SECONDS = 8 * 60 * 60;

interface AdminSession { email: string; expiresAt: number }

function config() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  return { email, passwordHash, secret, ready: Boolean(email && passwordHash && secret.length >= 32) };
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createAdminToken(email: string): string {
  const settings = config();
  if (!settings.ready) throw new Error('Admin authentication is not configured.');
  const encoded = Buffer.from(JSON.stringify({ email: email.toLowerCase(), expiresAt: Date.now() + SESSION_SECONDS * 1000 })).toString('base64url');
  return `${encoded}.${sign(encoded, settings.secret)}`;
}

export function verifyAdminToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const settings = config();
  const [payload, signature] = token.split('.');
  if (!settings.ready || !payload || !signature) return null;
  const expected = Buffer.from(sign(payload, settings.secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as AdminSession;
    return session.email === settings.email && session.expiresAt > Date.now() ? session : null;
  } catch { return null; }
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const settings = config();
  if (!settings.ready || email.trim().toLowerCase() !== settings.email) return false;
  const [algorithm, salt, stored] = settings.passwordHash.split('$');
  if (algorithm !== 'scrypt' || !salt || !stored) return false;
  const expected = Buffer.from(stored, 'hex');
  const received = scryptSync(password, salt, 64);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function getAdminSession() { return verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value); }
export async function requireAdmin() { const session = await getAdminSession(); if (!session) redirect('/admin/login'); return session; }
export async function requireAdminApi() { return getAdminSession(); }

export async function assertSameOrigin(): Promise<boolean> {
  const requestHeaders = await headers();
  const origin = requestHeaders.get('origin');
  const host = requestHeaders.get('host');
  if (!origin || !host) return process.env.NODE_ENV !== 'production';
  try { return new URL(origin).host === host; } catch { return false; }
}

export function adminCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge: SESSION_SECONDS };
}

export function getConfiguredAdminEmail() { return config().email; }
