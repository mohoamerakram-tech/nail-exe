import { revalidatePath } from 'next/cache';
import { assertSameOrigin, requireAdminApi } from '@/lib/admin/auth';
import { productFromForm } from '@/lib/admin/catalog-input';
import { getCatalogState, saveCatalogState } from '@/lib/catalog/server';

interface Context { params: Promise<{ id: string }> }
export const runtime = 'nodejs';

export async function PUT(request: Request, { params }: Context) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await params;
  try {
    const catalog = await getCatalogState();
    const index = catalog.products.findIndex((item) => item.id === id);
    if (index < 0) return Response.json({ error: 'Product not found.' }, { status: 404 });
    const product = await productFromForm(await request.formData(), catalog.products[index]);
    if (catalog.products.some((item, i) => i !== index && item.slug === product.slug)) return Response.json({ error: 'A product already uses this slug.' }, { status: 409 });
    if (product.sku && catalog.products.some((item, i) => i !== index && item.sku?.toLowerCase() === product.sku?.toLowerCase())) return Response.json({ error: 'A product already uses this SKU.' }, { status: 409 });
    catalog.products[index] = product;
    await saveCatalogState(catalog);
    revalidatePath('/', 'layout');
    return Response.json({ ok: true });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Product could not be saved.' }, { status: 400 }); }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await requireAdminApi())) return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  if (!(await assertSameOrigin())) return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await params;
  const catalog = await getCatalogState();
  if (!catalog.products.some((item) => item.id === id)) return Response.json({ error: 'Product not found.' }, { status: 404 });
  catalog.products = catalog.products.filter((item) => item.id !== id);
  await saveCatalogState(catalog);
  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}
