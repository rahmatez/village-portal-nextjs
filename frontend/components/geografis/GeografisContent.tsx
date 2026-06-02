'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { MapPin, Navigation, LocateFixed, Landmark, Hash, Compass, Home } from 'lucide-react';
import { geografisApi } from '@/lib/api/modul';
import { Skeleton } from '@/components/ui/Skeleton';

export function GeografisContent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['geografis'],
    queryFn: async () => (await geografisApi.get()).data.data,
  });

  const scrollToMap = () => {
    document.getElementById('peta-desa')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12">
        <Skeleton className="h-40" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <div className="py-24 text-center text-slate-600">Gagal memuat data geografis.</div>;
  }

  const batas = [
    { arah: 'Utara', nilai: data.batasUtara, pos: 'top-0 left-1/2 -translate-x-1/2' },
    { arah: 'Timur', nilai: data.batasTimur, pos: 'right-0 top-1/2 -translate-y-1/2' },
    { arah: 'Selatan', nilai: data.batasSelatan, pos: 'bottom-0 left-1/2 -translate-x-1/2' },
    { arah: 'Barat', nilai: data.batasBarat, pos: 'left-0 top-1/2 -translate-y-1/2' },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-4 flex items-center gap-1 text-sm text-primary-200">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-white">
              <Home className="h-4 w-4" />
              Beranda
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">Geografis</span>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">Geografis & Spasial Desa</h1>
          <p className="mt-3 max-w-2xl text-primary-100">
            Data koordinat, batas administratif, profil dusun, dan jarak akses infrastruktur publik
          </p>
          <button type="button" onClick={scrollToMap} className="btn-accent mt-8">
            <MapPin className="mr-2 h-4 w-4" />
            Lihat Peta Desa
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="section-title">Overview Spasial</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Koordinat', value: data.koordinat },
              { label: 'Ketinggian', value: data.ketinggian },
              { label: 'Kode Pos', value: data.kodepos },
              { label: 'Kode Kemendagri', value: data.kodeKemendagri },
            ].map((item) => (
              <div key={item.label} className="card">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 font-semibold text-primary-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-700">
              Batas Wilayah
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">Batas Wilayah</h2>
            <p className="mt-2 text-slate-500">Batas administratif Desa Mindaka (arah mata angin)</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {batas.map((b) => (
              <article key={b.arah} className="relative card min-h-[170px]">
                <span className="absolute -right-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white shadow">
                  {b.arah.charAt(0)}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <LocateFixed className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{b.arah}</h3>
                <p className="mt-1 text-slate-600">Berbatasan dengan</p>
                <p className="mt-2 font-semibold text-slate-800">{b.nilai}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="section-title">Pembagian Dusun</h2>
            <p className="section-subtitle">Profil ringkas dusun/dukuh di Desa Mindaka</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.dusun.map((d, index) => {
              const headerGradients = [
                'from-primary-500 to-primary-700',
                'from-primary-600 to-primary-800',
                'from-primary-500 to-primary-900',
                'from-primary-400 to-primary-700',
              ];
              const gradient = headerGradients[index % headerGradients.length];
              const chips = d.titikPenting.slice(0, 3);
              const remaining = Math.max(0, d.titikPenting.length - chips.length);
              return (
              <article key={d.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={`h-16 bg-gradient-to-r ${gradient}`} />
                <div className="px-4 pb-4 pt-3">
                  <div className="-mt-7 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-800 shadow-sm">
                    <Landmark className="h-4 w-4 text-primary-600" />
                    {d.namaDusun}
                  </div>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">Alias:</span> {d.namaDusun.replace(/^Dusun\s+/i, '')}
                </p>
                <p className="mt-2 min-h-[56px] text-sm text-slate-600">{d.deskripsiZona}</p>
                {chips.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chips.map((t) => (
                      <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {t}
                      </span>
                    ))}
                    {remaining > 0 && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        +{remaining} lainnya
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary-600" />
                    <span>
                      {d.titikPenting.length} titik penting
                    </span>
                  </p>
                {d.koordinatDusun && (
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Compass className="h-4 w-4 text-primary-600" />
                    {d.koordinatDusun}
                  </p>
                )}
                </div>
                <a
                  href={d.koordinatDusun ? `https://www.google.com/maps?q=${encodeURIComponent(d.koordinatDusun)}` : '#peta-desa'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <MapPin className="mr-1.5 h-4 w-4" />
                  Lihat di Peta
                </a>
                </div>
              </article>
            );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary-600" />
                <h2 className="text-lg font-bold text-primary-800">Jarak Akses Infrastruktur</h2>
              </div>
              <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
                <thead className="bg-primary-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Destinasi</th>
                    <th className="px-4 py-3 text-right">Jarak (km)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.jarakAkses.map((j, i) => (
                    <tr key={j.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 text-slate-700">{j.destinasi}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary-700">
                        {j.jarakKm.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div id="peta-desa" className="scroll-mt-24">
              <h2 className="mb-4 text-lg font-bold text-primary-800">Peta Lokasi</h2>
              <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                {data.googleMapsEmbedUrl ? (
                  <iframe
                    title="Peta Desa Mindaka"
                    src={data.googleMapsEmbedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-200 text-slate-500">
                    Peta belum dikonfigurasi
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
