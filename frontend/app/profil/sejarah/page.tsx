import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { DESA_INFO } from '@/lib/constants';
import { SEJARAH_DESA } from '@/lib/content';
import { fetchStatistik } from '@/lib/fetch-statistik';

export const metadata: Metadata = {
  title: 'Sejarah Desa',
  description: `Sejarah dan perkembangan ${DESA_INFO.name}.`,
};

export default async function SejarahPage() {
  const statistik = await fetchStatistik();
  const raw = statistik?.sejarahDesa?.trim() || SEJARAH_DESA;
  const paragraphs = raw.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHeader
        title="Sejarah Desa"
        description={`Perjalanan sejarah ${DESA_INFO.name}`}
        breadcrumbs={[
          { label: 'Profil Desa', href: '/profil' },
          { label: 'Sejarah' },
        ]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <article className="prose prose-slate max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-6 leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
