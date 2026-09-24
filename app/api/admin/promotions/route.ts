import { revalidatePath } from 'next/cache';
import { assertSameOrigin, requireAdminApi } from '@/lib/admin/auth';
import { promotionFromForm } from '@/lib/admin/catalog-input';
import { getCatalogState, saveCatalogState } from '@/lib/catalog/server';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const promotion = await promotionFromForm(await request.formData()); const catalog = await getCatalogState();
    if (catalog.promotions.some((item) => item.id === promotion.id)) return Response.json({ error: 'A promotion already uses this ID.' }, { status: 409 });
    catalog.promotions.push(promotion); await saveCatalogState(catalog); revalidatePath('/'); return Response.json({ ok: true, id: promotion.id }, { status: 201 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Promotion could not be saved.' }, { status: 400 }); }
}
