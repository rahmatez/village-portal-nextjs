'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { formatRupiahShort, produkApi, type ProdukItem } from '@/lib/api/modul';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminTable } from '@/components/admin/ui/AdminTable';
import { AdminModal } from '@/components/admin/ui/AdminModal';
import { AdminRowActions } from '@/components/admin/ui/AdminRowActions';
import { AdminFormActions } from '@/components/admin/ui/AdminFormActions';
import { AdminLoadingRow } from '@/components/admin/ui/AdminLoadingRow';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';
import { ImageUploadField } from '@/components/admin/ui/ImageUploadField';

type ProdukForm = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  ownerName: string;
  contact: string;
  isActive: boolean;
};

const EMPTY_FORM: ProdukForm = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  ownerName: '',
  contact: '',
  isActive: true,
};

export function ProdukManager() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<ProdukItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProdukForm>(EMPTY_FORM);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-produk'],
    queryFn: async () => (await produkApi.listAdmin()).data.data,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      produkApi.create({
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        imageUrl: form.imageUrl || undefined,
        ownerName: form.ownerName || undefined,
        contact: form.contact || undefined,
        isActive: form.isActive,
      }),
    onSuccess: async () => {
      closeForm();
      await qc.invalidateQueries({ queryKey: ['admin-produk'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menambah produk'),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      produkApi.update(editing!.id, {
        name: form.name,
        description: form.description || '',
        price: Number(form.price),
        imageUrl: form.imageUrl || '',
        ownerName: form.ownerName || '',
        contact: form.contact || '',
        isActive: form.isActive,
      }),
    onSuccess: async () => {
      closeForm();
      await qc.invalidateQueries({ queryKey: ['admin-produk'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal memperbarui produk'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => produkApi.remove(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-produk'] });
    },
  });

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowForm(true);
  }

  function openEdit(item: ProdukItem) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description ?? '',
      price: String(item.price),
      imageUrl: item.imageUrl ?? '',
      ownerName: item.ownerName ?? '',
      contact: item.contact ?? '',
      isActive: item.isActive ?? true,
    });
    setError('');
    setShowForm(true);
  }

  function closeForm() {
    setEditing(null);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setError('');
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !(await confirmSave(editing ? 'Simpan perubahan produk ini?' : 'Simpan produk baru ini?'))
    )
      return;
    if (editing) updateMutation.mutate();
    else createMutation.mutate();
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Produk UMKM"
        description="Tambah, ubah, hapus, dan aktif/nonaktifkan produk."
        action={
          <button type="button" onClick={openCreate} className="btn-admin">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </button>
        }
      />

      <AdminTable>
          <thead>
            <tr>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3">Pemilik</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Kontak</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <AdminLoadingRow colSpan={5} />
            ) : data?.length ? (
              data.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    {item.description ? <p className="line-clamp-1 text-xs text-slate-500">{item.description}</p> : null}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.ownerName || '-'}</td>
                  <td className="px-4 py-3 text-slate-700">{formatRupiahShort(item.price)}</td>
                  <td className="px-4 py-3 text-slate-600">{item.contact || '-'}</td>
                  <td className="px-4 py-3">
                    <AdminRowActions
                      onEdit={() => openEdit(item)}
                      onDelete={() => deleteMutation.mutate(item.id)}
                      deleteConfirmText="Hapus produk ini?"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>Belum ada produk.</td>
              </tr>
            )}
          </tbody>
      </AdminTable>

      {showForm && (
        <AdminModal title={editing ? 'Edit Produk UMKM' : 'Tambah Produk UMKM'} onClose={closeForm}>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input className="admin-input" placeholder="Nama Produk" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} required />
              <textarea className="admin-input min-h-[90px]" placeholder="Deskripsi" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
              <div className="grid gap-3 md:grid-cols-2">
                <input type="number" min={1} className="admin-input" placeholder="Harga" value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))} required />
                <ImageUploadField
                  label="Gambar produk"
                  value={form.imageUrl}
                  onChange={(url) => setForm((s) => ({ ...s, imageUrl: url }))}
                />
                <input className="admin-input" placeholder="Nama Pemilik (opsional)" value={form.ownerName} onChange={(e) => setForm((s) => ({ ...s, ownerName: e.target.value }))} />
                <input className="admin-input" placeholder="Kontak (opsional)" value={form.contact} onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))} />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((s) => ({ ...s, isActive: e.target.checked }))} />
                Produk aktif ditampilkan ke publik
              </label>
              <AdminErrorAlert message={error} />
              <AdminFormActions
                onCancel={closeForm}
                submitting={createMutation.isPending || updateMutation.isPending}
              />
          </form>
        </AdminModal>
      )}
    </div>
  );
}
