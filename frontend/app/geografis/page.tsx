import type { Metadata } from 'next';
import { GeografisContent } from '@/components/geografis/GeografisContent';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Geografis',
  description: `Data spasial dan geografis ${DESA_INFO.name}.`,
};

export default function GeografisPage() {
  return <GeografisContent />;
}
