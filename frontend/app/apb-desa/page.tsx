import type { Metadata } from 'next';
import { ApbDesaContent } from '@/components/apb-desa/ApbDesaContent';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'APB Desa',
  description: `Anggaran pendapatan dan belanja ${DESA_INFO.name}.`,
};

export default function ApbDesaPage() {
  return <ApbDesaContent />;
}
