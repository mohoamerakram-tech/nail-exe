import { notFound } from 'next/navigation';
import ProductForm from '../../../../components/ProductForm';
import { getCatalogState } from '@/lib/catalog/server';

export const metadata = { title: 'Edit Product // NAIL.EXE Admin' };
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const product = (await getCatalogState()).products.find((item) => item.id === id); if (!product) notFound(); return <main><div className="mb-7 border-b-2 border-[#57446d] pb-5"><p className="font-pixel text-[9px] text-[#db2777]">EDIT PRODUCT</p><h1 className="mt-2 font-pixel-title text-3xl">{product.name}</h1></div><ProductForm product={product} /></main>; }
