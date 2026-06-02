'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { apbDesaApi } from '@/lib/api/modul';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

type ApbForm = {
  tahun: string;
  totalPendapatan: string;
  totalBelanja: string;
  pembiayaan: string;
  silpa: string;
};

const EMPTY_FORM: ApbForm = {
  tahun: '',
  totalPendapatan: '',
  totalBelanja: '',
  pembiayaan: '',
  silpa: '',
};

type PendapatanItemForm = {
  namaPos: string;
  nominal: string;
};

type BelanjaItemForm = {
  namaBidang: string;
  nominal: string;
  persentase: string;
};

export function ApbDesaManager() {
  const qc = useQueryClient();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [form, setForm] = useState<ApbForm>(EMPTY_FORM);
  const [pendapatanItems, setPendapatanItems] = useState<PendapatanItemForm[]>([]);
  const [belanjaItems, setBelanjaItems] = useState<BelanjaItemForm[]>([]);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  const yearsQuery = useQuery({
    queryKey: ['admin-apb-years'],
    queryFn: async () => (await apbDesaApi.listTahun()).data.data,
  });

  useEffect(() => {
    if (!selectedYear && yearsQuery.data?.length) {
      setSelectedYear(yearsQuery.data[0].tahun);
    }
  }, [yearsQuery.data, selectedYear]);

  const detailQuery = useQuery({
    queryKey: ['admin-apb-detail', selectedYear],
    queryFn: async () => (await apbDesaApi.getByTahun(selectedYear!)).data.data,
    enabled: !!selectedYear,
  });

  useEffect(() => {
    if (!detailQuery.data) return;
    const d = detailQuery.data;
    setForm({
      tahun: String(d.tahun),
      totalPendapatan: String(d.totalPendapatan),
      totalBelanja: String(d.totalBelanja),
      pembiayaan: String(d.pembiayaan),
      silpa: String(d.silpa),
    });
    setPendapatanItems(
      d.pendapatan.map((p) => ({
        namaPos: p.namaPos,
        nominal: String(Number(p.nominal)),
      }))
    );
    setBelanjaItems(
      d.belanja.map((b) => ({
        namaBidang: b.namaBidang,
        nominal: String(Number(b.nominal)),
        persentase: String(b.persentase),
      }))
    );
  }, [detailQuery.data]);

  const createMutation = useMutation({
    mutationFn: async () =>
      apbDesaApi.create({
        tahun: Number(form.tahun),
        totalPendapatan: Number(form.totalPendapatan),
        totalBelanja: Number(form.totalBelanja),
        pembiayaan: Number(form.pembiayaan),
        silpa: Number(form.silpa),
        pendapatan: pendapatanItems
          .filter((item) => item.namaPos.trim())
          .map((item) => ({
            namaPos: item.namaPos.trim(),
            nominal: Number(item.nominal) || 0,
          })),
        belanja: belanjaItems
          .filter((item) => item.namaBidang.trim())
          .map((item) => ({
            namaBidang: item.namaBidang.trim(),
            nominal: Number(item.nominal) || 0,
            persentase: Number(item.persentase) || 0,
          })),
      }),
    onSuccess: async () => {
      setError('');
      await qc.invalidateQueries({ queryKey: ['admin-apb-years'] });
      await qc.invalidateQueries({ queryKey: ['admin-apb-detail'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal membuat APB'),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!detailQuery.data?.id) throw new Error('Data tahun belum dipilih');
      return apbDesaApi.update(detailQuery.data.id, {
        tahun: Number(form.tahun),
        totalPendapatan: Number(form.totalPendapatan),
        totalBelanja: Number(form.totalBelanja),
        pembiayaan: Number(form.pembiayaan),
        silpa: Number(form.silpa),
        pendapatan: pendapatanItems
          .filter((item) => item.namaPos.trim())
          .map((item) => ({
            namaPos: item.namaPos.trim(),
            nominal: Number(item.nominal) || 0,
          })),
        belanja: belanjaItems
          .filter((item) => item.namaBidang.trim())
          .map((item) => ({
            namaBidang: item.namaBidang.trim(),
            nominal: Number(item.nominal) || 0,
            persentase: Number(item.persentase) || 0,
          })),
      });
    },
    onSuccess: async () => {
      setError('');
      await qc.invalidateQueries({ queryKey: ['admin-apb-years'] });
      await qc.invalidateQueries({ queryKey: ['admin-apb-detail'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan APB'),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!detailQuery.data?.id) throw new Error('Data tahun belum dipilih');
      return apbDesaApi.remove(detailQuery.data.id);
    },
    onSuccess: async () => {
      setForm(EMPTY_FORM);
      setPendapatanItems([]);
      setBelanjaItems([]);
      setSelectedYear(null);
      setError('');
      await qc.invalidateQueries({ queryKey: ['admin-apb-years'] });
      await qc.invalidateQueries({ queryKey: ['admin-apb-detail'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menghapus APB'),
  });

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave('Simpan APB baru ini?'))) return;
    createMutation.mutate();
  }

  async function onUpdate(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave('Simpan perubahan APB ini?'))) return;
    updateMutation.mutate();
  }

  function updatePendapatan(index: number, key: keyof PendapatanItemForm, value: string) {
    setPendapatanItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function updateBelanja(index: number, key: keyof BelanjaItemForm, value: string) {
    setBelanjaItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola APB Desa"
        description="Pilih tahun yang tersedia atau buat data APB baru."
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Daftar Tahun</h2>
          <div className="mt-3 space-y-2">
            {yearsQuery.data?.map((y) => (
              <button
                key={y.tahun}
                type="button"
                onClick={() => setSelectedYear(y.tahun)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                  selectedYear === y.tahun ? 'border-primary-300 bg-primary-50 text-primary-700' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                APB {y.tahun}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={onUpdate} className="lg:col-span-2 space-y-3 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Edit Tahun Terpilih</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input type="number" className="admin-input" placeholder="Tahun" value={form.tahun} onChange={(e) => setForm((s) => ({ ...s, tahun: e.target.value }))} />
            <input type="number" className="admin-input" placeholder="Total Pendapatan" value={form.totalPendapatan} onChange={(e) => setForm((s) => ({ ...s, totalPendapatan: e.target.value }))} />
            <input type="number" className="admin-input" placeholder="Total Belanja" value={form.totalBelanja} onChange={(e) => setForm((s) => ({ ...s, totalBelanja: e.target.value }))} />
            <input type="number" className="admin-input" placeholder="Pembiayaan" value={form.pembiayaan} onChange={(e) => setForm((s) => ({ ...s, pembiayaan: e.target.value }))} />
            <input type="number" className="admin-input md:col-span-2" placeholder="SILPA" value={form.silpa} onChange={(e) => setForm((s) => ({ ...s, silpa: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Rincian Pendapatan</label>
              <button
                type="button"
                onClick={() => setPendapatanItems((prev) => [...prev, { namaPos: '', nominal: '' }])}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Plus className="mr-1 inline h-3.5 w-3.5" />
                Tambah Pos
              </button>
            </div>
            <div className="space-y-2">
              {pendapatanItems.map((item, idx) => (
                <div key={`${idx}-${item.namaPos}`} className="grid gap-2 md:grid-cols-[1fr,220px,auto]">
                  <input
                    className="admin-input"
                    placeholder="Nama Pos Pendapatan"
                    value={item.namaPos}
                    onChange={(e) => updatePendapatan(idx, 'namaPos', e.target.value)}
                  />
                  <input
                    type="number"
                    className="admin-input"
                    placeholder="Nominal"
                    value={item.nominal}
                    onChange={(e) => updatePendapatan(idx, 'nominal', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setPendapatanItems((prev) => prev.filter((_, i) => i !== idx))}
                    className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Rincian Belanja</label>
              <button
                type="button"
                onClick={() =>
                  setBelanjaItems((prev) => [...prev, { namaBidang: '', nominal: '', persentase: '' }])
                }
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Plus className="mr-1 inline h-3.5 w-3.5" />
                Tambah Bidang
              </button>
            </div>
            <div className="space-y-2">
              {belanjaItems.map((item, idx) => (
                <div key={`${idx}-${item.namaBidang}`} className="grid gap-2 md:grid-cols-[1fr,180px,140px,auto]">
                  <input
                    className="admin-input"
                    placeholder="Nama Bidang Belanja"
                    value={item.namaBidang}
                    onChange={(e) => updateBelanja(idx, 'namaBidang', e.target.value)}
                  />
                  <input
                    type="number"
                    className="admin-input"
                    placeholder="Nominal"
                    value={item.nominal}
                    onChange={(e) => updateBelanja(idx, 'nominal', e.target.value)}
                  />
                  <input
                    type="number"
                    className="admin-input"
                    placeholder="%"
                    value={item.persentase}
                    onChange={(e) => updateBelanja(idx, 'persentase', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setBelanjaItems((prev) => prev.filter((_, i) => i !== idx))}
                    className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <AdminErrorAlert message={error} />
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="btn-admin" disabled={updateMutation.isPending || !detailQuery.data}>
              {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <button
              type="button"
              onClick={() => confirm('Hapus data APB tahun ini?') && deleteMutation.mutate()}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              disabled={!detailQuery.data || deleteMutation.isPending}
            >
              Hapus Data
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={onCreate} className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Tambah APB Baru</h2>
        <p className="text-sm text-slate-600">Isi data di atas lalu klik tambah jika ingin tahun baru.</p>
        <button type="submit" className="btn-admin" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Menyimpan...' : 'Tambah Sebagai Data Baru'}
        </button>
      </form>
    </div>
  );
}
