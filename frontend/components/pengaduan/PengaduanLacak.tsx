'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { pengaduanApi, type PengaduanItem } from '@/lib/api/modul';

const STATUS_LABEL: Record<PengaduanItem['status'], string> = {
  PENDING: 'Menunggu',
  DIPROSES: 'Diproses',
  SELESAI: 'Selesai',
  DITOLAK: 'Ditolak',
};

const STATUS_CLASS: Record<PengaduanItem['status'], string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  DIPROSES: 'bg-blue-100 text-blue-800',
  SELESAI: 'bg-emerald-100 text-emerald-800',
  DITOLAK: 'bg-rose-100 text-rose-800',
};

export function PengaduanLacak() {
  const searchParams = useSearchParams();
  const [kode, setKode] = useState('');
  const [queryKode, setQueryKode] = useState('');

  useEffect(() => {
    const fromUrl = searchParams.get('kode')?.trim();
    if (fromUrl) {
      setKode(fromUrl);
      setQueryKode(fromUrl);
    }
  }, [searchParams]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['pengaduan-ticket', queryKode],
    queryFn: async () => (await pengaduanApi.getByTicket(queryKode)).data.data,
    enabled: queryKode.length >= 4,
    retry: false,
  });

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setQueryKode(kode.trim().toUpperCase());
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <form onSubmit={onSearch} className="card flex gap-3">
        <input
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 uppercase focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Masukkan kode tiket (contoh: PGD-XXXX)"
          value={kode}
          onChange={(e) => setKode(e.target.value.toUpperCase())}
          required
        />
        <button type="submit" className="btn-primary shrink-0">
          <Search className="mr-2 inline h-4 w-4" />
          Lacak
        </button>
      </form>

      {queryKode && isLoading && (
        <div className="card py-10 text-center text-slate-500">Memuat data tiket...</div>
      )}

      {queryKode && !isLoading && (isError || !data) && (
        <div className="card py-10 text-center text-slate-600">
          Tiket tidak ditemukan. Periksa kembali kode Anda.
          <button type="button" className="btn-outline mt-4" onClick={() => void refetch()}>
            Coba lagi
          </button>
        </div>
      )}

      {data && (
        <div className="card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-lg font-bold text-primary-800">{data.ticketCode}</p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[data.status]}`}
            >
              {STATUS_LABEL[data.status]}
            </span>
          </div>
          <div>
            <p className="text-sm text-slate-500">Subjek</p>
            <p className="font-semibold text-slate-900">{data.subject}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Pesan Anda</p>
            <p className="whitespace-pre-wrap text-slate-700">{data.message}</p>
          </div>
          {data.response && (
            <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
              <p className="text-sm font-semibold text-primary-800">Tanggapan pemerintah desa</p>
              <p className="mt-2 whitespace-pre-wrap text-slate-700">{data.response}</p>
            </div>
          )}
          <p className="text-xs text-slate-500">
            Dikirim:{' '}
            {new Date(data.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      )}
    </div>
  );
}
