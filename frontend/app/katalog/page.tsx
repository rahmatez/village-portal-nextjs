import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { KatalogList } from '@/components/katalog/KatalogList';
import { DESA_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Katalog UMKM',
  description: `Katalog produk UMKM ${DESA_INFO.name}.`,
};

export default function KatalogPage() {
  return (
    <>
      <PageHeader
        title="Katalog UMKM"
        description="Produk unggulan warga dan pelaku usaha mikro desa"
        breadcrumbs={[{ label: 'Katalog' }]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <KatalogList />
        </div>
      </section>
    </>
  );
}
