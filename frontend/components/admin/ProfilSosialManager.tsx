'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { profilSosialApi } from '@/lib/api/profil-sosial';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

type KependudukanForm = {
  jumlahPendudukTotal: string;
  jumlahLakiLaki: string;
  jumlahPerempuan: string;
  persenUsiaProduktif: string;
  persenLansia: string;
  sumberPendapatan: string;
  asetDesa: string;
};

const EMPTY_KEP: KependudukanForm = {
  jumlahPendudukTotal: '',
  jumlahLakiLaki: '',
  jumlahPerempuan: '',
  persenUsiaProduktif: '',
  persenLansia: '',
  sumberPendapatan: '',
  asetDesa: '',
};

type DemografiFormItem = {
  jenis: 'UMUR' | 'JENIS_KELAMIN' | 'PENDIDIKAN';
  kelompok: string;
  persentase: string;
  jumlah: string;
  urutan: string;
};

type FasilitasFormItem = {
  tipe: 'KESEHATAN' | 'PENDIDIKAN' | 'UMUM';
  nama: string;
  jumlah: string;
  keterangan: string;
  urutan: string;
};

type PekerjaanFormItem = {
  namaProfesi: string;
  jumlah: string;
  persentase: string;
  urutan: string;
};

export function ProfilSosialManager() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-profil-sosial'],
    queryFn: async () => (await profilSosialApi.getAll()).data.data,
  });

  const [kepForm, setKepForm] = useState<KependudukanForm>(EMPTY_KEP);
  const [demografiItems, setDemografiItems] = useState<DemografiFormItem[]>([]);
  const [fasilitasItems, setFasilitasItems] = useState<FasilitasFormItem[]>([]);
  const [pekerjaanItems, setPekerjaanItems] = useState<PekerjaanFormItem[]>([]);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  useEffect(() => {
    if (!data) return;
    setKepForm({
      jumlahPendudukTotal: String(data.kependudukan.jumlahPendudukTotal),
      jumlahLakiLaki: String(data.kependudukan.jumlahLakiLaki),
      jumlahPerempuan: String(data.kependudukan.jumlahPerempuan),
      persenUsiaProduktif: String(data.kependudukan.persenUsiaProduktif),
      persenLansia: String(data.kependudukan.persenLansia),
      sumberPendapatan: data.kependudukan.sumberPendapatan.join(', '),
      asetDesa: data.kependudukan.asetDesa.join(', '),
    });
    setDemografiItems(
      [...data.demografi.jenisKelamin, ...data.demografi.umur, ...data.demografi.pendidikan].map(
        (d) => ({
          jenis: d.jenis,
          kelompok: d.kelompok,
          persentase: String(d.persentase),
          jumlah: String(d.jumlah ?? 0),
          urutan: String(d.urutan),
        })
      )
    );
    setFasilitasItems(
      [...data.fasilitas.kesehatan, ...data.fasilitas.pendidikan, ...data.fasilitas.umum].map(
        (f) => ({
          tipe: f.tipe,
          nama: f.nama,
          jumlah: String(f.jumlah),
          keterangan: f.keterangan ?? '',
          urutan: String(f.urutan),
        })
      )
    );
    setPekerjaanItems(
      data.mataPencaharian.map((p) => ({
          namaProfesi: p.namaProfesi,
          jumlah: String(p.jumlah),
          persentase: String(p.persentase),
          urutan: String(p.urutan),
        }))
    );
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      await Promise.all([
        profilSosialApi.updateKependudukan({
          jumlahPendudukTotal: Number(kepForm.jumlahPendudukTotal),
          jumlahLakiLaki: Number(kepForm.jumlahLakiLaki),
          jumlahPerempuan: Number(kepForm.jumlahPerempuan),
          persenUsiaProduktif: Number(kepForm.persenUsiaProduktif),
          persenLansia: Number(kepForm.persenLansia),
          sumberPendapatan: kepForm.sumberPendapatan
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
          asetDesa: kepForm.asetDesa
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
        }),
        profilSosialApi.replaceDemografi(
          demografiItems
            .filter((x) => x.kelompok.trim())
            .map((x) => ({
              jenis: x.jenis,
              kelompok: x.kelompok.trim(),
              persentase: Number(x.persentase) || 0,
              jumlah: Number(x.jumlah) || 0,
              urutan: Number(x.urutan) || 0,
            }))
        ),
        profilSosialApi.replaceFasilitas(
          fasilitasItems
            .filter((x) => x.nama.trim())
            .map((x) => ({
              tipe: x.tipe,
              nama: x.nama.trim(),
              jumlah: Number(x.jumlah) || 0,
              keterangan: x.keterangan.trim() || undefined,
              urutan: Number(x.urutan) || 0,
            }))
        ),
        profilSosialApi.replaceMataPencaharian(
          pekerjaanItems
            .filter((x) => x.namaProfesi.trim())
            .map((x) => ({
              namaProfesi: x.namaProfesi.trim(),
              jumlah: Number(x.jumlah) || 0,
              persentase: Number(x.persentase) || 0,
              urutan: Number(x.urutan) || 0,
            }))
        ),
      ]);
    },
    onSuccess: async () => {
      setError('');
      await qc.invalidateQueries({ queryKey: ['admin-profil-sosial'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan profil sosial'),
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave('Simpan perubahan profil sosial ini?'))) return;
    saveMutation.mutate();
  }

  function updateDemografi(index: number, key: keyof DemografiFormItem, value: string) {
    setDemografiItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function updateFasilitas(index: number, key: keyof FasilitasFormItem, value: string) {
    setFasilitasItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function updatePekerjaan(index: number, key: keyof PekerjaanFormItem, value: string) {
    setPekerjaanItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Profil Sosial"
        description="Kelola kependudukan, demografi, fasilitas, dan mata pencaharian."
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-5">
        {isLoading ? <p className="text-slate-500">Memuat data...</p> : null}

        <div className="grid gap-3 md:grid-cols-2">
          <input type="number" className="admin-input" placeholder="Jumlah Penduduk Total" value={kepForm.jumlahPendudukTotal} onChange={(e) => setKepForm((s) => ({ ...s, jumlahPendudukTotal: e.target.value }))} />
          <input type="number" className="admin-input" placeholder="Jumlah Laki-laki" value={kepForm.jumlahLakiLaki} onChange={(e) => setKepForm((s) => ({ ...s, jumlahLakiLaki: e.target.value }))} />
          <input type="number" className="admin-input" placeholder="Jumlah Perempuan" value={kepForm.jumlahPerempuan} onChange={(e) => setKepForm((s) => ({ ...s, jumlahPerempuan: e.target.value }))} />
          <input type="number" className="admin-input" placeholder="% Usia Produktif" value={kepForm.persenUsiaProduktif} onChange={(e) => setKepForm((s) => ({ ...s, persenUsiaProduktif: e.target.value }))} />
          <input type="number" className="admin-input md:col-span-2" placeholder="% Lansia" value={kepForm.persenLansia} onChange={(e) => setKepForm((s) => ({ ...s, persenLansia: e.target.value }))} />
          <textarea className="admin-input min-h-[80px] md:col-span-2" placeholder="Sumber pendapatan (pisahkan koma)" value={kepForm.sumberPendapatan} onChange={(e) => setKepForm((s) => ({ ...s, sumberPendapatan: e.target.value }))} />
          <textarea className="admin-input min-h-[80px] md:col-span-2" placeholder="Aset desa (pisahkan koma)" value={kepForm.asetDesa} onChange={(e) => setKepForm((s) => ({ ...s, asetDesa: e.target.value }))} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Demografi</label>
            <button
              type="button"
              onClick={() =>
                setDemografiItems((prev) => [
                  ...prev,
                  { jenis: 'UMUR', kelompok: '', persentase: '', jumlah: '', urutan: String(prev.length + 1) },
                ])
              }
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="mr-1 inline h-3.5 w-3.5" />
              Tambah Demografi
            </button>
          </div>
          <div className="space-y-3">
            {demografiItems.map((item, idx) => (
              <div key={`${idx}-${item.kelompok}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-5">
                <select className="admin-input" value={item.jenis} onChange={(e) => updateDemografi(idx, 'jenis', e.target.value)}>
                  <option value="UMUR">UMUR</option>
                  <option value="JENIS_KELAMIN">JENIS KELAMIN</option>
                  <option value="PENDIDIKAN">PENDIDIKAN</option>
                </select>
                <input className="admin-input" placeholder="Kelompok" value={item.kelompok} onChange={(e) => updateDemografi(idx, 'kelompok', e.target.value)} />
                <input className="admin-input" type="number" placeholder="Persentase" value={item.persentase} onChange={(e) => updateDemografi(idx, 'persentase', e.target.value)} />
                <input className="admin-input" type="number" placeholder="Jumlah" value={item.jumlah} onChange={(e) => updateDemografi(idx, 'jumlah', e.target.value)} />
                <div className="flex gap-2">
                  <input className="admin-input w-full" type="number" placeholder="Urutan" value={item.urutan} onChange={(e) => updateDemografi(idx, 'urutan', e.target.value)} />
                  <button type="button" onClick={() => setDemografiItems((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Fasilitas</label>
            <button
              type="button"
              onClick={() =>
                setFasilitasItems((prev) => [
                  ...prev,
                  { tipe: 'UMUM', nama: '', jumlah: '', keterangan: '', urutan: String(prev.length + 1) },
                ])
              }
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="mr-1 inline h-3.5 w-3.5" />
              Tambah Fasilitas
            </button>
          </div>
          <div className="space-y-3">
            {fasilitasItems.map((item, idx) => (
              <div key={`${idx}-${item.nama}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-5">
                <select className="admin-input" value={item.tipe} onChange={(e) => updateFasilitas(idx, 'tipe', e.target.value)}>
                  <option value="KESEHATAN">KESEHATAN</option>
                  <option value="PENDIDIKAN">PENDIDIKAN</option>
                  <option value="UMUM">UMUM</option>
                </select>
                <input className="admin-input" placeholder="Nama Fasilitas" value={item.nama} onChange={(e) => updateFasilitas(idx, 'nama', e.target.value)} />
                <input className="admin-input" type="number" placeholder="Jumlah" value={item.jumlah} onChange={(e) => updateFasilitas(idx, 'jumlah', e.target.value)} />
                <input className="admin-input" placeholder="Keterangan" value={item.keterangan} onChange={(e) => updateFasilitas(idx, 'keterangan', e.target.value)} />
                <div className="flex gap-2">
                  <input className="admin-input w-full" type="number" placeholder="Urutan" value={item.urutan} onChange={(e) => updateFasilitas(idx, 'urutan', e.target.value)} />
                  <button type="button" onClick={() => setFasilitasItems((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Mata Pencaharian</label>
            <button
              type="button"
              onClick={() =>
                setPekerjaanItems((prev) => [
                  ...prev,
                  { namaProfesi: '', jumlah: '', persentase: '', urutan: String(prev.length + 1) },
                ])
              }
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="mr-1 inline h-3.5 w-3.5" />
              Tambah Profesi
            </button>
          </div>
          <div className="space-y-3">
            {pekerjaanItems.map((item, idx) => (
              <div key={`${idx}-${item.namaProfesi}`} className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-4">
                <input className="admin-input" placeholder="Nama Profesi" value={item.namaProfesi} onChange={(e) => updatePekerjaan(idx, 'namaProfesi', e.target.value)} />
                <input className="admin-input" type="number" placeholder="Jumlah" value={item.jumlah} onChange={(e) => updatePekerjaan(idx, 'jumlah', e.target.value)} />
                <input className="admin-input" type="number" placeholder="Persentase" value={item.persentase} onChange={(e) => updatePekerjaan(idx, 'persentase', e.target.value)} />
                <div className="flex gap-2">
                  <input className="admin-input w-full" type="number" placeholder="Urutan" value={item.urutan} onChange={(e) => updatePekerjaan(idx, 'urutan', e.target.value)} />
                  <button type="button" onClick={() => setPekerjaanItems((prev) => prev.filter((_, i) => i !== idx))} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="btn-admin" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Profil Sosial'}
        </button>
      </form>
    </div>
  );
}
