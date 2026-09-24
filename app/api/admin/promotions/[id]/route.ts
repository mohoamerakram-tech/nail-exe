import { revalidatePath } from 'next/cache';
import { assertSameOrigin, requireAdminApi } from '@/lib/admin/auth';
import { promotionFromForm } from '@/lib/admin/catalog-input';
import { getCatalogState, saveCatalogState } from '@/lib/catalog/server';

interface Context { params: Promise<{ id: string }> }
export const runtime = 'nodejs';
export async function PUT(request: Request, { params }: Context) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await params;
  try {
    const catalog = await getCatalogState(); const index = catalog.promotions.findIndex((item) => item.id === id);
    if (index < 0) return Response.json({ error: 'Promotion not found.' }, { status: 404 });
    catalog.promotions[index] = await promotionFromForm(await request.formData(), catalog.promotions[index]);
    await saveCatalogState(catalog); revalidatePath('/'); return Response.json({ ok: true });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Promotion could not be saved.' }, { status: 400 }); }
}
export async function DELETE(_request: Request, { params }: Context) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await params; const catalog = await getCatalogState();
  if (!catalog.promotions.some((item) => item.id === id)) return Response.json({ error: 'Promotion not found.' }, { status: 404 });
  catalog.promotions = catalog.promotions.filter((item) => item.id !== id); await saveCatalogState(catalog); revalidatePath('/'); return Response.json({ ok: true });
}
