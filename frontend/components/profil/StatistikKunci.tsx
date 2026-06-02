import { Users, UserRound, Briefcase, Heart } from 'lucide-react';
import type { Kependudukan } from '@/lib/api/profil-sosial';

interface StatistikKunciProps {
  data: Kependudukan;
}

export function StatistikKunci({ data }: StatistikKunciProps) {
  const rasio =
    data.jumlahPerempuan > 0
      ? (data.jumlahLakiLaki / data.jumlahPerempuan).toFixed(2)
      : '—';

  const cards = [
    {
      icon: Users,
      label: 'Penduduk Total',
      value: data.jumlahPendudukTotal.toLocaleString('id-ID'),
      sub: 'jiwa',
      color: 'text-primary-600 bg-primary-50',
    },
    {
      icon: UserRound,
      label: 'Rasio Gender',
      value: `♂ ${data.jumlahLakiLaki.toLocaleString('id-ID')}`,
      sub: `♀ ${data.jumlahPerempuan.toLocaleString('id-ID')} (rasio ${rasio})`,
      color: 'text-accent-red bg-red-50',
    },
    {
      icon: Briefcase,
      label: 'Usia Produktif',
      value: `${data.persenUsiaProduktif.toFixed(1)}%`,
      sub: 'penduduk usia 15–64 tahun',
      color: 'text-primary-700 bg-primary-50',
    },
    {
      icon: Heart,
      label: 'Lansia',
      value: `${data.persenLansia.toFixed(1)}%`,
      sub: 'penduduk usia 60+ tahun',
      color: 'text-amber-700 bg-amber-50',
    },
  ];

  return (
    <section id="statistik-desa" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="section-title">Statistik Kunci</h2>
          <p className="section-subtitle">Ringkasan data kependudukan desa terkini</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="card text-center">
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${card.color}`}
              >
                <card.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-3xl font-bold text-primary-800">{card.value}</p>
              <p className="mt-1 font-semibold text-slate-700">{card.label}</p>
              <p className="mt-1 text-sm text-slate-500">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
