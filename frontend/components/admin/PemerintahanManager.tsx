'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { pemerintahanApi, type PerangkatDesa } from '@/lib/api/modul';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminTable } from '@/components/admin/ui/AdminTable';
import { AdminModal } from '@/components/admin/ui/AdminModal';
import { AdminRowActions } from '@/components/admin/ui/AdminRowActions';
import { AdminFormActions } from '@/components/admin/ui/AdminFormActions';
import { AdminLoadingRow } from '@/components/admin/ui/AdminLoadingRow';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

type PerangkatForm = {
  nama: string;
  jabatan: string;
  fotoUrl: string;
  orderPriority: string;
};

const EMPTY_PERANGKAT: PerangkatForm = {
  nama: '',
  jabatan: '',
  fotoUrl: '',
  orderPriority: '1',
};

export function PemerintahanManager() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-pemerintahan'],
    queryFn: async () => (await pemerintahanApi.get()).data.data,
  });

  const [wilayahForm, setWilayahForm] = useState({
    luasWilayah: '',
    jumlahDusun: '',
    totalRw: '',
    totalRt: '',
    daftarDusun: '',
  });

  const [showPerangkatForm, setShowPerangkatForm] = useState(false);
  const [editing, setEditing] = useState<PerangkatDesa | null>(null);
  const [perangkatForm, setPerangkatForm] = useState<PerangkatForm>(EMPTY_PERANGKAT);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  useEffect(() => {
    if (!data?.wilayah) return;
    setWilayahForm({
      luasWilayah: data.wilayah.luasWilayah,
      jumlahDusun: String(data.wilayah.jumlahDusun),
      totalRw: String(data.wilayah.totalRw),
      totalRt: String(data.wilayah.totalRt),
      daftarDusun: data.wilayah.daftarDusun.join(', '),
    });
  }, [data?.wilayah]);

  const updateWilayah = useMutation({
    mutationFn: () =>
      pemerintahanApi.updateWilayah({
        luasWilayah: wilayahForm.luasWilayah,
        jumlahDusun: Number(wilayahForm.jumlahDusun),
        totalRw: Number(wilayahForm.totalRw),
        totalRt: Number(wilayahForm.totalRt),
        daftarDusun: wilayahForm.daftarDusun
          .split(',')
          .map((d) => d.trim())
          .filter(Boolean),
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-pemerintahan'] });
    },
  });

  const createPerangkat = useMutation({
    mutationFn: () =>
      pemerintahanApi.createPerangkat({
        nama: perangkatForm.nama,
        jabatan: perangkatForm.jabatan,
        fotoUrl: perangkatForm.fotoUrl || undefined,
        orderPriority: Number(perangkatForm.orderPriority),
      }),
    onSuccess: async () => {
      closePerangkatForm();
      await qc.invalidateQueries({ queryKey: ['admin-pemerintahan'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan'),
  });

  const updatePerangkat = useMutation({
    mutationFn: () =>
      pemerintahanApi.updatePerangkat(editing!.id, {
        nama: perangkatForm.nama,
        jabatan: perangkatForm.jabatan,
        fotoUrl: perangkatForm.fotoUrl || '',
        orderPriority: Number(perangkatForm.orderPriority),
      }),
    onSuccess: async () => {
      closePerangkatForm();
      await qc.invalidateQueries({ queryKey: ['admin-pemerintahan'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal memperbarui'),
  });

  const deletePerangkat = useMutation({
    mutationFn: (id: string) => pemerintahanApi.removePerangkat(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-pemerintahan'] });
    },
  });

  function openCreate() {
    setEditing(null);
    setPerangkatForm(EMPTY_PERANGKAT);
    setError('');
    setShowPerangkatForm(true);
  }

  function openEdit(item: PerangkatDesa) {
    setEditing(item);
    setPerangkatForm({
      nama: item.nama,
      jabatan: item.jabatan,
      fotoUrl: item.fotoUrl ?? '',
      orderPriority: String(item.orderPriority),
    });
    setError('');
    setShowPerangkatForm(true);
  }

  function closePerangkatForm() {
    setShowPerangkatForm(false);
    setEditing(null);
    setPerangkatForm(EMPTY_PERANGKAT);
    setError('');
  }

  async function onSubmitPerangkat(e: FormEvent) {
    e.preventDefault();
    if (
      !(await confirmSave(
        editing ? 'Simpan perubahan perangkat ini?' : 'Simpan perangkat baru ini?'
      ))
    )
      return;
    if (editing) updatePerangkat.mutate();
    else createPerangkat.mutate();
  }

  async function onSubmitWilayah(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave('Simpan perubahan data wilayah?'))) return;
    updateWilayah.mutate();
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Pemerintahan"
        description="Ubah ringkasan wilayah dan perangkat desa."
      />

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Data Wilayah</h2>
        <form onSubmit={onSubmitWilayah} className="mt-4 grid gap-3 md:grid-cols-2">
          <input className="admin-input" placeholder="Luas Wilayah" value={wilayahForm.luasWilayah} onChange={(e) => setWilayahForm((s) => ({ ...s, luasWilayah: e.target.value }))} />
          <input type="number" className="admin-input" placeholder="Jumlah Dusun" value={wilayahForm.jumlahDusun} onChange={(e) => setWilayahForm((s) => ({ ...s, jumlahDusun: e.target.value }))} />
          <input type="number" className="admin-input" placeholder="Total RW" value={wilayahForm.totalRw} onChange={(e) => setWilayahForm((s) => ({ ...s, totalRw: e.target.value }))} />
          <input type="number" className="admin-input" placeholder="Total RT" value={wilayahForm.totalRt} onChange={(e) => setWilayahForm((s) => ({ ...s, totalRt: e.target.value }))} />
          <textarea className="admin-input md:col-span-2 min-h-[90px]" placeholder="Daftar dusun (pisahkan dengan koma)" value={wilayahForm.daftarDusun} onChange={(e) => setWilayahForm((s) => ({ ...s, daftarDusun: e.target.value }))} />
          <div className="md:col-span-2">
            <button className="btn-admin" disabled={updateWilayah.isPending}>
              {updateWilayah.isPending ? 'Menyimpan...' : 'Simpan Wilayah'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Perangkat Desa</h2>
          <button onClick={openCreate} className="btn-admin" type="button">
            <Plus className="mr-2 h-4 w-4" />
            Tambah
          </button>
        </div>
        <AdminTable minWidthClassName="min-w-[680px]">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Jabatan</th>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <AdminLoadingRow colSpan={4} text="Memuat..." />
              ) : (
                data?.perangkat.map((p) => (
                  <tr key={p.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-900">{p.nama}</td>
                    <td className="px-3 py-2 text-slate-600">{p.jabatan}</td>
                    <td className="px-3 py-2 text-slate-600">{p.orderPriority}</td>
                    <td className="px-3 py-2">
                      <AdminRowActions
                        onEdit={() => openEdit(p)}
                        onDelete={() => deletePerangkat.mutate(p.id)}
                        deleteConfirmText="Hapus perangkat ini?"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </AdminTable>
      </div>

      {showPerangkatForm && (
        <AdminModal title={editing ? 'Edit Perangkat' : 'Tambah Perangkat'} maxWidthClassName="max-w-xl">
          <form onSubmit={onSubmitPerangkat} className="mt-4 space-y-3">
              <input className="admin-input" placeholder="Nama" value={perangkatForm.nama} onChange={(e) => setPerangkatForm((s) => ({ ...s, nama: e.target.value }))} required />
              <input className="admin-input" placeholder="Jabatan" value={perangkatForm.jabatan} onChange={(e) => setPerangkatForm((s) => ({ ...s, jabatan: e.target.value }))} required />
              <input className="admin-input" placeholder="URL Foto (opsional)" value={perangkatForm.fotoUrl} onChange={(e) => setPerangkatForm((s) => ({ ...s, fotoUrl: e.target.value }))} />
              <input type="number" min={0} className="admin-input" placeholder="Order Priority" value={perangkatForm.orderPriority} onChange={(e) => setPerangkatForm((s) => ({ ...s, orderPriority: e.target.value }))} />
              <AdminErrorAlert message={error} />
              <AdminFormActions
                onCancel={closePerangkatForm}
                submitting={createPerangkat.isPending || updatePerangkat.isPending}
              />
          </form>
        </AdminModal>
      )}
    </div>
  );
}
