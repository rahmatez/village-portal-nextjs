'use client';

import { useQuery } from '@tanstack/react-query';
import { Target } from 'lucide-react';
import { statistikApi } from '@/lib/api';

const defaultVisi =
  'Terwujudnya masyarakat Desa Mindaka yang sejahtera, mandiri, dan berkeadilan melalui pembangunan berkelanjutan.';

const defaultMisi = [
  'Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel.',
  'Mengembangkan potensi ekonomi lokal berbasis UMKM dan pertanian.',
  'Memperkuat tata kelola pemerintahan desa yang partisipatif.',
  'Meningkatkan akses pendidikan dan kesehatan bagi seluruh warga.',
  'Memelihara kelestarian lingkungan hidup dan budaya lokal.',
  'Memperluas infrastruktur desa yang mendukung produktivitas warga.',
  'Mendorong pemberdayaan perempuan dan kelompok rentan.',
  'Meningkatkan kemandirian pangan dan ketahanan sosial desa.',
  'Memperkuat sinergi dengan pemangku kepentingan pembangunan.',
];

export function VisiMisi() {
  const { data } = useQuery({
    queryKey: ['statistik'],
    queryFn: async () => {
      const res = await statistikApi.get();
      return res.data.data;
    },
  });

  const visi = data?.visi ?? defaultVisi;
  const misi = data?.misi?.length ? data.misi : defaultMisi;

  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="section-title">Visi & Misi Desa</h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="card border-l-4 border-l-accent-gold">
            <h3 className="text-lg font-bold text-primary-800">Visi</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{visi}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-primary-800">Misi Pembangunan (9 Poin)</h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-600">
              {misi.map((point, i) => (
                <li key={i} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
