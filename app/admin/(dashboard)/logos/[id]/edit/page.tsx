import { notFound } from 'next/navigation';
import LogoForm from '../../../../components/LogoForm';
import { getCatalogState } from '@/lib/catalog/server';
export const metadata = { title: 'Edit Logo // NAIL.EXE Admin' };
export default async function EditLogoPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const logo = (await getCatalogState()).logos.find((item) => item.id === id); if (!logo) notFound(); return <main><div className="mb-7 border-b-2 border-[#57446d] pb-5"><p className="font-pixel text-[9px] text-[#db2777]">EDIT STUDIO ARTWORK</p><h1 className="mt-2 font-pixel-title text-3xl">{logo.label}</h1></div><LogoForm logo={logo} /></main>; }
