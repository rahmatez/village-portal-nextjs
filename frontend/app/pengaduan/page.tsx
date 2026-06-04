import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { PengaduanForm } from '@/components/pengaduan/PengaduanForm';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pengaduan Warga',
  description: `Ajukan pengaduan resmi ke ${DESA_INFO.name} dan lacak status tiket Anda.`,
};

export default function PengaduanPage() {
  return (
    <>
      <PageHeader
        title="Pengaduan Warga"
        description="Sampaikan aspirasi, keluhan, atau laporan kepada pemerintah desa secara resmi."
        breadcrumbs={[{ label: 'Pengaduan' }]}
      />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <PengaduanForm />
        </div>
      </section>
    </>
  );
}
