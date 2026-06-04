import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PengaduanLacak } from '@/components/pengaduan/PengaduanLacak';

export const metadata: Metadata = {
  title: 'Lacak Pengaduan',
  description: 'Periksa status pengaduan warga dengan kode tiket.',
};

export default function LacakPengaduanPage() {
  return (
    <>
      <PageHeader
        title="Lacak Pengaduan"
        description="Masukkan kode tiket yang Anda terima setelah mengirim pengaduan."
        breadcrumbs={[
          { label: 'Pengaduan', href: '/pengaduan' },
          { label: 'Lacak' },
        ]}
      />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Suspense fallback={<div className="text-center text-slate-500">Memuat...</div>}>
            <PengaduanLacak />
          </Suspense>
        </div>
      </section>
    </>
  );
}
