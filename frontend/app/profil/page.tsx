import type { Metadata } from 'next';
import { ProfilDesaContent } from '@/components/profil/ProfilDesaContent';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Profil Desa & Kondisi Sosial Ekonomi',
  description: `Data kependudukan, demografi, kesehatan, pendidikan, dan ekonomi ${DESA_INFO.name}.`,
};

export default function ProfilPage() {
  return <ProfilDesaContent />;
}
