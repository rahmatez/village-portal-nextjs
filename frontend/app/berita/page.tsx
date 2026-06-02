import type { Metadata } from 'next';
import { BeritaFeed } from '@/components/berita/BeritaFeed';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Berita',
  description: `Berita dan informasi ${DESA_INFO.name}.`,
};

export default function BeritaPage() {
  return <BeritaFeed />;
}
