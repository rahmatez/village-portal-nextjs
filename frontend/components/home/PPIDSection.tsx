'use client';

import { useQuery } from '@tanstack/react-query';
import { FileText, Clock, ThumbsUp, Mail } from 'lucide-react';
import { statistikApi } from '@/lib/api';
import { DESA_INFO } from '@/lib/constants';

export function PPIDSection() {
  const { data } = useQuery({
    queryKey: ['statistik'],
    queryFn: async () => {
      const res = await statistikApi.get();
      return res.data.data;
    },
  });

  const responHari = data?.ppidResponHari ?? 3;
  const kepuasan = data?.ppidKepuasan ?? 87.5;
  const email = data?.ppidEmail ?? DESA_INFO.ppidEmail;

  return (
    <section className="bg-primary-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="section-title">Pejabat Pengelola Informasi & Dokumentasi (PPID)</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Komitmen keterbukaan informasi publik untuk mewujudkan pemerintahan yang transparan
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="card text-center">
            <Clock className="mx-auto h-10 w-10 text-primary-600" />
            <p className="mt-4 text-3xl font-bold text-primary-800">{responHari} Hari</p>
            <p className="mt-2 text-sm text-slate-600">Rata-rata waktu respons permohonan informasi</p>
          </div>
          <div className="card text-center">
            <ThumbsUp className="mx-auto h-10 w-10 text-primary-600" />
            <p className="mt-4 text-3xl font-bold text-primary-800">{kepuasan}%</p>
            <p className="mt-2 text-sm text-slate-600">Tingkat kepuasan layanan informasi publik</p>
          </div>
          <div className="card text-center">
            <Mail className="mx-auto h-10 w-10 text-primary-600" />
            <p className="mt-4 text-lg font-bold text-primary-800 break-all">{email}</p>
            <p className="mt-2 text-sm text-slate-600">Kontak email resmi PPID Desa</p>
            <a href={`mailto:${email}`} className="btn-accent mt-4 text-sm">
              Hubungi PPID
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
