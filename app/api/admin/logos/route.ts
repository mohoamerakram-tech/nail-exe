import { revalidatePath } from 'next/cache';
import { assertSameOrigin, requireAdminApi } from '@/lib/admin/auth';
import { logoFromForm } from '@/lib/admin/catalog-input';
import { getCatalogState, saveCatalogState } from '@/lib/catalog/server';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const logo = await logoFromForm(await request.formData());
    const catalog = await getCatalogState();
    if (catalog.logos.some((item) => item.id === logo.id)) return Response.json({ error: 'A logo already uses this ID.' }, { status: 409 });
    catalog.logos.push(logo); await saveCatalogState(catalog); revalidatePath('/custom-studio');
    return Response.json({ ok: true, id: logo.id }, { status: 201 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Logo could not be saved.' }, { status: 400 }); }
}
