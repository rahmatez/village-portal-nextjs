'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { geografisApi } from '@/lib/api/modul';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

type FormState = {
  koordinat: string;
  ketinggian: string;
  kodepos: string;
  kodeKemendagri: string;
  batasUtara: string;
  batasTimur: string;
  batasSelatan: string;
  batasBarat: string;
  googleMapsEmbedUrl: string;
};

type DusunFormItem = {
  namaDusun: string;
  deskripsiZona: string;
  koordinatDusun: string;
  titikPentingText: string;
  urutan: string;
};

type JarakFormItem = {
  destinasi: string;
  jarakKm: string;
  urutan: string;
};

const EMPTY_FORM: FormState = {
  koordinat: '',
  ketinggian: '',
  kodepos: '',
  kodeKemendagri: '',
  batasUtara: '',
  batasTimur: '',
  batasSelatan: '',
  batasBarat: '',
  googleMapsEmbedUrl: '',
};

export function GeografisManager() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-geografis'],
    queryFn: async () => (await geografisApi.get()).data.data,
  });
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [dusunItems, setDusunItems] = useState<DusunFormItem[]>([]);
  const [jarakItems, setJarakItems] = useState<JarakFormItem[]>([]);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  useEffect(() => {
    if (!data) return;
    setForm({
      koordinat: data.koordinat ?? '',
      ketinggian: data.ketinggian ?? '',
      kodepos: data.kodepos ?? '',
      kodeKemendagri: data.kodeKemendagri ?? '',
      batasUtara: data.batasUtara ?? '',
      batasTimur: data.batasTimur ?? '',
      batasSelatan: data.batasSelatan ?? '',
      batasBarat: data.batasBarat ?? '',
      googleMapsEmbedUrl: data.googleMapsEmbedUrl ?? '',
    });
    setDusunItems(
      data.dusun.map((d, i) => ({
        namaDusun: d.namaDusun,
        deskripsiZona: d.deskripsiZona ?? '',
        koordinatDusun: d.koordinatDusun ?? '',
        titikPentingText: (d.titikPenting ?? []).join(', '),
        urutan: String(i + 1),
      }))
    );
    setJarakItems(
      data.jarakAkses.map((j, i) => ({
        destinasi: j.destinasi,
        jarakKm: String(j.jarakKm),
        urutan: String(i + 1),
      }))
    );
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      return geografisApi.update({
        koordinat: form.koordinat,
        ketinggian: form.ketinggian,
        kodepos: form.kodepos,
        kodeKemendagri: form.kodeKemendagri,
        batasUtara: form.batasUtara,
        batasTimur: form.batasTimur,
        batasSelatan: form.batasSelatan,
        batasBarat: form.batasBarat,
        googleMapsEmbedUrl: form.googleMapsEmbedUrl || undefined,
        dusun: dusunItems
          .filter((item) => item.namaDusun.trim())
          .map((item) => ({
            namaDusun: item.namaDusun.trim(),
            deskripsiZona: item.deskripsiZona.trim() || undefined,
            koordinatDusun: item.koordinatDusun.trim() || undefined,
            titikPenting: item.titikPentingText
              .split(',')
              .map((x) => x.trim())
              .filter(Boolean),
            urutan: Number(item.urutan) || 0,
          })),
        jarakAkses: jarakItems
          .filter((item) => item.destinasi.trim())
          .map((item) => ({
            destinasi: item.destinasi.trim(),
            jarakKm: Number(item.jarakKm) || 0,
            urutan: Number(item.urutan) || 0,
          })),
      });
    },
    onSuccess: async () => {
      setError('');
      await qc.invalidateQueries({ queryKey: ['admin-geografis'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan data geografis'),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave('Simpan perubahan data geografis?'))) return;
    saveMutation.mutate();
  }

  function updateDusun(index: number, key: keyof DusunFormItem, value: string) {
    setDusunItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function updateJarak(index: number, key: keyof JarakFormItem, value: string) {
    setJarakItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Geografis"
        description="Perbarui batas wilayah, dusun, dan jarak akses."
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        {isLoading ? <p className="text-slate-500">Memuat data...</p> : null}
        <div className="grid gap-3 md:grid-cols-2">
          <input className="admin-input" placeholder="Koordinat" value={form.koordinat} onChange={(e) => setForm((s) => ({ ...s, koordinat: e.target.value }))} />
          <input className="admin-input" placeholder="Ketinggian" value={form.ketinggian} onChange={(e) => setForm((s) => ({ ...s, ketinggian: e.target.value }))} />
          <input className="admin-input" placeholder="Kode Pos" value={form.kodepos} onChange={(e) => setForm((s) => ({ ...s, kodepos: e.target.value }))} />
          <input className="admin-input" placeholder="Kode Kemendagri" value={form.kodeKemendagri} onChange={(e) => setForm((s) => ({ ...s, kodeKemendagri: e.target.value }))} />
          <input className="admin-input" placeholder="Batas Utara" value={form.batasUtara} onChange={(e) => setForm((s) => ({ ...s, batasUtara: e.target.value }))} />
          <input className="admin-input" placeholder="Batas Timur" value={form.batasTimur} onChange={(e) => setForm((s) => ({ ...s, batasTimur: e.target.value }))} />
          <input className="admin-input" placeholder="Batas Selatan" value={form.batasSelatan} onChange={(e) => setForm((s) => ({ ...s, batasSelatan: e.target.value }))} />
          <input className="admin-input" placeholder="Batas Barat" value={form.batasBarat} onChange={(e) => setForm((s) => ({ ...s, batasBarat: e.target.value }))} />
          <input className="admin-input md:col-span-2" placeholder="Google Maps Embed URL" value={form.googleMapsEmbedUrl} onChange={(e) => setForm((s) => ({ ...s, googleMapsEmbedUrl: e.target.value }))} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Data Dusun</label>
            <button
              type="button"
              onClick={() =>
                setDusunItems((prev) => [
                  ...prev,
                  { namaDusun: '', deskripsiZona: '', koordinatDusun: '', titikPentingText: '', urutan: String(prev.length + 1) },
                ])
              }
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="mr-1 inline h-3.5 w-3.5" />
              Tambah Dusun
            </button>
          </div>
          <div className="space-y-3">
            {dusunItems.map((item, idx) => (
              <div key={`${idx}-${item.namaDusun}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-2">
                <input className="admin-input" placeholder="Nama Dusun" value={item.namaDusun} onChange={(e) => updateDusun(idx, 'namaDusun', e.target.value)} />
                <input className="admin-input" placeholder="Urutan" type="number" value={item.urutan} onChange={(e) => updateDusun(idx, 'urutan', e.target.value)} />
                <input className="admin-input" placeholder="Deskripsi Zona" value={item.deskripsiZona} onChange={(e) => updateDusun(idx, 'deskripsiZona', e.target.value)} />
                <input className="admin-input" placeholder="Koordinat Dusun" value={item.koordinatDusun} onChange={(e) => updateDusun(idx, 'koordinatDusun', e.target.value)} />
                <input className="admin-input md:col-span-2" placeholder="Titik penting (pisahkan koma)" value={item.titikPentingText} onChange={(e) => updateDusun(idx, 'titikPentingText', e.target.value)} />
                <div className="md:col-span-2 flex justify-end">
                  <button type="button" onClick={() => setDusunItems((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                    <Trash2 className="mr-1 inline h-3.5 w-3.5" />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Jarak Akses</label>
            <button
              type="button"
              onClick={() =>
                setJarakItems((prev) => [
                  ...prev,
                  { destinasi: '', jarakKm: '', urutan: String(prev.length + 1) },
                ])
              }
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="mr-1 inline h-3.5 w-3.5" />
              Tambah Akses
            </button>
          </div>
          <div className="space-y-3">
            {jarakItems.map((item, idx) => (
              <div key={`${idx}-${item.destinasi}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-3">
                <input className="admin-input" placeholder="Destinasi" value={item.destinasi} onChange={(e) => updateJarak(idx, 'destinasi', e.target.value)} />
                <input className="admin-input" placeholder="Jarak (KM)" type="number" step="0.1" value={item.jarakKm} onChange={(e) => updateJarak(idx, 'jarakKm', e.target.value)} />
                <div className="flex gap-2">
                  <input className="admin-input w-full" placeholder="Urutan" type="number" value={item.urutan} onChange={(e) => updateJarak(idx, 'urutan', e.target.value)} />
                  <button type="button" onClick={() => setJarakItems((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="btn-admin" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Geografis'}
        </button>
      </form>
    </div>
  );
}
