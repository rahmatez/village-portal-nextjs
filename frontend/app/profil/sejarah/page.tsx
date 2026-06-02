import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { DESA_INFO } from '@/lib/constants';
import { SEJARAH_DESA } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sejarah Desa',
  description: `Sejarah dan perkembangan ${DESA_INFO.name}.`,
};

export default function SejarahPage() {
  const paragraphs = SEJARAH_DESA.split('\n\n');

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
