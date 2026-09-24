import { getPublicLogos } from '@/lib/catalog/server';
import CustomStudioClient from './CustomStudioClient';

export const metadata = { title: 'CUSTOM NAIL STUDIO // NAIL.EXE', description: 'Choose artwork and plan a custom press-on nail set.' };
export const dynamic = 'force-dynamic';

export default async function CustomStudioPage() {
  return <CustomStudioClient logos={await getPublicLogos()} />;
}
