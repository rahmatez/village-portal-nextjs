import type { Metadata } from 'next';
import { PemerintahanContent } from '@/components/pemerintahan/PemerintahanContent';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pemerintahan',
  description: `Struktur pemerintahan dan perangkat ${DESA_INFO.name}.`,
};

export default function PemerintahanPage() {
  return <PemerintahanContent />;
}
