import type { Metadata } from 'next';
import { GaleriContent } from '@/components/galeri/GaleriContent';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Galeri Desa',
  description: `Galeri foto ${DESA_INFO.name}.`,
};

export default function GaleriPage() {
  return <GaleriContent />;
}
