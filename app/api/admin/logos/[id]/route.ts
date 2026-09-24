import { revalidatePath } from 'next/cache';
import { assertSameOrigin, requireAdminApi } from '@/lib/admin/auth';
import { logoFromForm } from '@/lib/admin/catalog-input';
import { getCatalogState, saveCatalogState } from '@/lib/catalog/server';

interface Context { params: Promise<{ id: string }> }
export const runtime = 'nodejs';
export async function PUT(request: Request, { params }: Context) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await params;
  try {
    const catalog = await getCatalogState(); const index = catalog.logos.findIndex((item) => item.id === id);
    if (index < 0) return Response.json({ error: 'Logo not found.' }, { status: 404 });
    catalog.logos[index] = await logoFromForm(await request.formData(), catalog.logos[index]);
    await saveCatalogState(catalog); revalidatePath('/custom-studio'); return Response.json({ ok: true });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Logo could not be saved.' }, { status: 400 }); }
}
export async function DELETE(_request: Request, { params }: Context) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await params; const catalog = await getCatalogState();
  if (!catalog.logos.some((item) => item.id === id)) return Response.json({ error: 'Logo not found.' }, { status: 404 });
  catalog.logos = catalog.logos.filter((item) => item.id !== id); await saveCatalogState(catalog); revalidatePath('/custom-studio'); return Response.json({ ok: true });
}
