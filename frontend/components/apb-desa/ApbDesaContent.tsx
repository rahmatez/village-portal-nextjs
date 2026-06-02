'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Download, Wallet, Home } from 'lucide-react';
import { apbDesaApi, formatRupiahShort } from '@/lib/api/modul';
import { Skeleton } from '@/components/ui/Skeleton';

export function ApbDesaContent() {
  const [tahun, setTahun] = useState(2025);

  const { data: tahunList } = useQuery({
    queryKey: ['apb-tahun'],
    queryFn: async () => (await apbDesaApi.listTahun()).data.data,
  });

  const years = tahunList?.length
    ? Array.from(new Set(tahunList.map((t) => t.tahun))).sort((a, b) => b - a)
    : [2025, 2024];

  const { data, isLoading } = useQuery({
    queryKey: ['apb-desa', tahun],
    queryFn: async () => (await apbDesaApi.getByTahun(tahun)).data.data,
  });

  const maxPendapatan = data
    ? Math.max(...data.pendapatan.map((p) => Number(p.nominal)), 1)
    : 1;
  const maxBelanja = data ? Math.max(...data.belanja.map((b) => b.persentase), 1) : 1;

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
            <span className="font-semibold text-white">APB Desa</span>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">APB Desa</h1>
              <p className="mt-3 max-w-xl text-primary-100">
                Transparansi Anggaran Pendapatan dan Belanja Desa untuk akuntabilitas publik
              </p>
            </div>
            <a
              href={`/dokumen/apbd-desa-mindaka-${tahun}.pdf`}
              download
              className="btn-accent shrink-0"
            >
              <Download className="mr-2 h-4 w-4" />
              Unduh APBD {tahun}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setTahun(y)}
                className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  tahun === y
                    ? 'bg-accent-gold text-primary-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading || !data ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <Skeleton className="h-80" />
              <Skeleton className="h-80" />
            </div>
          ) : (
            <>
              <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total Pendapatan', value: formatRupiahShort(data.totalPendapatan) },
                  { label: 'Total Belanja', value: formatRupiahShort(data.totalBelanja) },
                  { label: 'Pembiayaan', value: formatRupiahShort(data.pembiayaan) },
                  { label: 'SILPA', value: formatRupiahShort(data.silpa) },
                ].map((s) => (
                  <div key={s.label} className="card text-center">
                    <Wallet className="mx-auto h-6 w-6 text-primary-600" />
                    <p className="mt-2 text-lg font-bold text-primary-800">{s.value}</p>
                    <p className="text-sm text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="card">
                  <h2 className="text-lg font-bold text-primary-800">Pos Pendapatan Desa</h2>
                  <div className="mt-6 space-y-4">
                    {data.pendapatan.map((p) => {
                      const nominal = Number(p.nominal);
                      const pct = (nominal / maxPendapatan) * 100;
                      return (
                        <div key={p.id}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="font-medium text-slate-700">{p.namaPos}</span>
                            <span className="text-slate-500">{formatRupiahShort(nominal)}</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-primary-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-lg font-bold text-primary-800">Bidang Belanja Desa</h2>
                  <div className="mt-6 space-y-4">
                    {data.belanja.map((b) => (
                      <div key={b.id}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-medium text-slate-700">{b.namaBidang}</span>
                          <span className="font-semibold text-accent-red">
                            {b.persentase.toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-accent-gold"
                            style={{ width: `${(b.persentase / maxBelanja) * 100}%` }}
                          />
                        </div>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {formatRupiahShort(b.nominal)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
