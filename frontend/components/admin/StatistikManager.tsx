'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { statistikApi, type DataStatistik } from '@/lib/api';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminFormActions } from '@/components/admin/ui/AdminFormActions';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

type FormState = {
  jumlahPenduduk: string;
  jumlahKK: string;
  jumlahDusun: string;
  statusIDM: string;
  skorIKS: string;
  skorIKE: string;
  skorIKL: string;
  jumlahTokoUMKM: string;
  ppidResponHari: string;
  ppidKepuasan: string;
  ppidEmail: string;
  visi: string;
  misiText: string;
  sejarahDesa: string;
};

function toForm(data: DataStatistik): FormState {
  return {
    jumlahPenduduk: String(data.jumlahPenduduk),
    jumlahKK: String(data.jumlahKK),
    jumlahDusun: String(data.jumlahDusun),
    statusIDM: data.statusIDM,
    skorIKS: String(data.skorIKS),
    skorIKE: String(data.skorIKE),
    skorIKL: String(data.skorIKL),
    jumlahTokoUMKM: String(data.jumlahTokoUMKM),
    ppidResponHari: String(data.ppidResponHari),
    ppidKepuasan: String(data.ppidKepuasan),
    ppidEmail: data.ppidEmail ?? '',
    visi: data.visi ?? '',
    misiText: (data.misi ?? []).join('\n'),
    sejarahDesa: data.sejarahDesa ?? '',
  };
}

export function StatistikManager() {
  const qc = useQueryClient();
  const { confirmSave } = useConfirmSave();
  const [form, setForm] = useState<FormState | null>(null);
  const [error, setError] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-statistik'],
    queryFn: async () => (await statistikApi.get()).data.data,
  });

  useEffect(() => {
    if (data) setForm(toForm(data));
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => {
      if (!form) throw new Error('Form belum siap');
      const misi = form.misiText
        .split('\n')
        .map((m) => m.trim())
        .filter(Boolean);
      return statistikApi.update({
        jumlahPenduduk: Number(form.jumlahPenduduk),
        jumlahKK: Number(form.jumlahKK),
        jumlahDusun: Number(form.jumlahDusun),
        statusIDM: form.statusIDM,
        skorIKS: Number(form.skorIKS),
        skorIKE: Number(form.skorIKE),
        skorIKL: Number(form.skorIKL),
        jumlahTokoUMKM: Number(form.jumlahTokoUMKM),
        ppidResponHari: Number(form.ppidResponHari),
        ppidKepuasan: Number(form.ppidKepuasan),
        ppidEmail: form.ppidEmail,
        visi: form.visi,
        misi,
        sejarahDesa: form.sejarahDesa,
      });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-statistik'] });
      await qc.invalidateQueries({ queryKey: ['statistik'] });
      setError('');
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan'),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!(await confirmSave('Simpan perubahan data beranda & profil?'))) return;
    mutation.mutate();
  }

  if (isLoading || !form) {
    return <div className="admin-panel py-10 text-center text-slate-500">Memuat data...</div>;
  }

  const field = (key: keyof FormState, label: string, type = 'text') => (
    <div key={key}>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        className="admin-input"
        value={form[key]}
        onChange={(e) => setForm((s) => (s ? { ...s, [key]: e.target.value } : s))}
      />
    </div>
  );

  return (
    <div>
      <AdminPageHeader
        title="Data Beranda & Profil"
        description="Kelola statistik desa, IDM, visi-misi, PPID, dan sejarah desa."
      />
      <form onSubmit={onSubmit} className="admin-panel mt-6 space-y-6">
        <div>
          <h3 className="font-semibold text-slate-900">Statistik & IDM</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {field('jumlahPenduduk', 'Jumlah Penduduk', 'number')}
            {field('jumlahKK', 'Jumlah KK', 'number')}
            {field('jumlahDusun', 'Jumlah Dusun', 'number')}
            {field('jumlahTokoUMKM', 'Jumlah Toko UMKM', 'number')}
            {field('statusIDM', 'Status IDM')}
            {field('skorIKS', 'Skor IKS (0–1)', 'number')}
            {field('skorIKE', 'Skor IKE (0–1)', 'number')}
            {field('skorIKL', 'Skor IKL (0–1)', 'number')}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">PPID</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {field('ppidResponHari', 'Respons (hari)', 'number')}
            {field('ppidKepuasan', 'Kepuasan (%)', 'number')}
            {field('ppidEmail', 'Email PPID', 'email')}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Visi</label>
          <textarea
            className="admin-input min-h-[80px]"
            value={form.visi}
            onChange={(e) => setForm((s) => (s ? { ...s, visi: e.target.value } : s))}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Misi (satu baris per poin)
          </label>
          <textarea
            className="admin-input min-h-[160px]"
            value={form.misiText}
            onChange={(e) => setForm((s) => (s ? { ...s, misiText: e.target.value } : s))}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Sejarah desa (pisahkan paragraf dengan baris kosong)
          </label>
          <textarea
            className="admin-input min-h-[200px]"
            value={form.sejarahDesa}
            onChange={(e) => setForm((s) => (s ? { ...s, sejarahDesa: e.target.value } : s))}
          />
        </div>
        <AdminErrorAlert message={error} />
        <AdminFormActions
          onCancel={() => data && setForm(toForm(data))}
          submitting={mutation.isPending}
          submitLabel="Simpan perubahan"
        />
      </form>
    </div>
  );
}
