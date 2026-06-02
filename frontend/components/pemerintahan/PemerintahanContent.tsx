'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Download, Map, Home, Users, Building2, List } from 'lucide-react';
import { pemerintahanApi } from '@/lib/api/modul';
import { CardSkeleton, Skeleton } from '@/components/ui/Skeleton';

const JABATAN_COLORS: Record<string, string> = {
  'Kepala Desa': 'bg-accent-gold text-primary-900',
  'Sekretaris Desa': 'bg-primary-600 text-white',
};

function badgeClass(jabatan: string) {
  return JABATAN_COLORS[jabatan] ?? 'bg-primary-100 text-primary-800';
}

export function PemerintahanContent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pemerintahan'],
    queryFn: async () => (await pemerintahanApi.get()).data.data,
  });

  if (isLoading) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <Skeleton className="mb-4 h-10 w-2/3 max-w-md bg-primary-500" />
            <Skeleton className="h-5 w-full max-w-xl bg-primary-500" />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </section>
      </>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-24 text-center text-slate-600">
        Gagal memuat data pemerintahan. Pastikan backend berjalan.
      </div>
    );
  }

  const { wilayah, perangkat } = data;
  const overview = [
    { icon: Map, label: 'Luas Wilayah', value: wilayah.luasWilayah },
    { icon: Home, label: 'Jumlah Dusun', value: String(wilayah.jumlahDusun) },
    { icon: Building2, label: 'Total RW / RT', value: `${wilayah.totalRw} / ${wilayah.totalRt}` },
    { icon: Users, label: 'Perangkat Desa', value: String(perangkat.length) },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center md:text-left">
          <nav className="mb-4 flex items-center justify-center gap-1 text-sm text-primary-200 md:justify-start">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-white">
              <Home className="h-4 w-4" />
              Beranda
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">Pemerintahan</span>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">Pemerintahan Desa</h1>
          <p className="mt-4 max-w-2xl text-primary-100">
            Struktur organisasi, wilayah administrasi, dan perangkat desa yang melayani masyarakat
            Mindaka secara transparan dan profesional.
          </p>
          <a
            href="/dokumen/sotk-desa-mindaka.pdf"
            download
            className="btn-accent mt-8 inline-flex"
          >
            <Download className="mr-2 h-4 w-4" />
            Unduh Dokumen SOTK (PDF)
          </a>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-700">
              Ringkasan Pemerintahan
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Ringkasan Pemerintahan
            </h2>
            <p className="mt-2 text-slate-500">Parameter utama wilayah dan organisasi</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {overview.map((item) => (
              <div key={item.label} className="card text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary-600" />
                <p className="mt-3 text-2xl font-bold text-primary-800">{item.value}</p>
                <p className="text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-700">
              Pembagian Wilayah Desa
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Pembagian Wilayah Desa
            </h2>
            <p className="mt-2 text-slate-500">Luas, dusun, serta struktur RW/RT</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="card">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <Map className="h-5 w-5 text-primary-600" />
                Rincian Wilayah
              </h3>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Luas Wilayah</span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    {wilayah.luasWilayah}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Jumlah Dusun</span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    {wilayah.jumlahDusun} dusun
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">RW / RT</span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                    {wilayah.totalRw} RW / {wilayah.totalRt} RT
                  </span>
                </div>
              </div>
            </article>

            <article className="card">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <List className="h-5 w-5 text-primary-600" />
                Daftar Dusun
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {wilayah.daftarDusun.map((dusun) => (
                  <span
                    key={dusun}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {dusun}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="section-title text-center">Struktur Organisasi (SOTK)</h2>
          <p className="section-subtitle text-center">
            Perangkat desa terurut berdasarkan hierarki jabatan
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perangkat.map((p) => (
              <article key={p.id} className="card flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-3xl font-bold text-primary-700 ring-4 ring-primary-50">
                  {p.fotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.fotoUrl} alt={p.nama} className="h-full w-full object-cover" />
                  ) : (
                    p.nama.charAt(0)
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{p.nama}</h3>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(p.jabatan)}`}
                >
                  {p.jabatan}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
