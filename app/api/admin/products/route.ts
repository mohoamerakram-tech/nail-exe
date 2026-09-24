import { revalidatePath } from 'next/cache';
import { assertSameOrigin, requireAdminApi } from '@/lib/admin/auth';
import { productFromForm } from '@/lib/admin/catalog-input';
import { getCatalogState, saveCatalogState } from '@/lib/catalog/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const product = await productFromForm(await request.formData());
    const catalog = await getCatalogState();
    if (catalog.products.some((item) => item.slug === product.slug)) return Response.json({ error: 'A product already uses this slug.' }, { status: 409 });
    if (product.sku && catalog.products.some((item) => item.sku?.toLowerCase() === product.sku?.toLowerCase())) return Response.json({ error: 'A product already uses this SKU.' }, { status: 409 });
    catalog.products.push(product);
    await saveCatalogState(catalog);
    revalidatePath('/', 'layout');
    return Response.json({ ok: true, id: product.id }, { status: 201 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Product could not be saved.' }, { status: 400 }); }
}
