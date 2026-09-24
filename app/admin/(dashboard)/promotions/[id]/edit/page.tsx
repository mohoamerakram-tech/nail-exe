import { notFound } from 'next/navigation';
import PromotionForm from '../../../../components/PromotionForm';
import { getCatalogState } from '@/lib/catalog/server';
export const metadata = { title: 'Edit Promotion // NAIL.EXE Admin' };
export default async function EditPromotionPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const promotion = (await getCatalogState()).promotions.find((item) => item.id === id); if (!promotion) notFound(); return <main><div className="mb-7 border-b-2 border-[#57446d] pb-5"><p className="font-pixel text-[9px] text-[#db2777]">EDIT HOMEPAGE CAMPAIGN</p><h1 className="mt-2 font-pixel-title text-3xl">{promotion.title}</h1></div><PromotionForm promotion={promotion} /></main>; }
