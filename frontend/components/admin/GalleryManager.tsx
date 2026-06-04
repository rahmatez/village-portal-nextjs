'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { galleryApi, type GalleryItem } from '@/lib/api/modul';
import { Pagination } from '@/components/ui/Pagination';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminModal } from '@/components/admin/ui/AdminModal';
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState';
import { AdminRowActions } from '@/components/admin/ui/AdminRowActions';
import { AdminFormActions } from '@/components/admin/ui/AdminFormActions';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';
import { ImageUploadField } from '@/components/admin/ui/ImageUploadField';

type GalleryForm = {
  fotoUrl: string;
  format: string;
  altText: string;
  width: string;
  height: string;
};

const EMPTY_FORM: GalleryForm = {
  fotoUrl: '',
  format: 'image/jpeg',
  altText: '',
  width: '',
  height: '',
};

export function GalleryManager() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GalleryForm>(EMPTY_FORM);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-gallery', page, query],
    queryFn: async () => (await galleryApi.list({ page, limit: 12, search: query || undefined })).data,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      galleryApi.create({
        fotoUrl: form.fotoUrl,
        format: form.format || 'image/jpeg',
        altText: form.altText || undefined,
        width: form.width ? Number(form.width) : undefined,
        height: form.height ? Number(form.height) : undefined,
      }),
    onSuccess: async () => {
      closeForm();
      await qc.invalidateQueries({ queryKey: ['admin-gallery'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan'),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      galleryApi.update(editing!.id, {
        fotoUrl: form.fotoUrl,
        format: form.format || 'image/jpeg',
        altText: form.altText || undefined,
        width: form.width ? Number(form.width) : undefined,
        height: form.height ? Number(form.height) : undefined,
      }),
    onSuccess: async () => {
      closeForm();
      await qc.invalidateQueries({ queryKey: ['admin-gallery'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal memperbarui'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryApi.remove(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-gallery'] });
    },
  });

  const submitting = createMutation.isPending || updateMutation.isPending;

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  }

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowForm(true);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({
      fotoUrl: item.fotoUrl,
      format: item.format,
      altText: item.altText ?? '',
      width: item.width ? String(item.width) : '',
      height: item.height ? String(item.height) : '',
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
      !(await confirmSave(editing ? 'Simpan perubahan foto ini?' : 'Simpan foto baru ini?'))
    )
      return;
    setError('');
    if (editing) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Galeri"
        description="Tambah, edit, dan hapus koleksi foto desa."
        action={
          <button type="button" onClick={openCreate} className="btn-admin">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Foto
          </button>
        }
      />

      <form onSubmit={onSearch} className="admin-filter-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari alt text atau format..."
          className="admin-input"
        />
        <button type="submit" className="btn-admin">Cari</button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <AdminEmptyState text="Memuat data..." />
        ) : data?.items.length ? (
          data.items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.fotoUrl} alt={item.altText ?? 'foto'} className="h-44 w-full object-cover" />
              <div className="p-4">
                <p className="line-clamp-1 font-semibold text-slate-800">{item.altText || 'Tanpa keterangan'}</p>
                <p className="mt-1 text-xs text-slate-500">{item.format}</p>
                <div className="mt-3 flex justify-end gap-2">
                  <AdminRowActions
                    onEdit={() => openEdit(item)}
                    onDelete={() => deleteMutation.mutate(item.id)}
                    deleteConfirmText="Hapus foto ini?"
                  />
                </div>
              </div>
            </article>
          ))
        ) : (
          <AdminEmptyState text="Tidak ada data galeri." />
        )}
      </div>

      {data?.meta && (
        <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onPageChange={setPage} />
      )}

      {showForm && (
        <AdminModal title={editing ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'} maxWidthClassName="max-w-xl" onClose={closeForm}>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <ImageUploadField
                label="Foto galeri"
                value={form.fotoUrl}
                onChange={(url) => setForm((s) => ({ ...s, fotoUrl: url }))}
              />
              <input className="admin-input" placeholder="Format (image/jpeg)" value={form.format} onChange={(e) => setForm((s) => ({ ...s, format: e.target.value }))} />
              <input className="admin-input" placeholder="Alt text (opsional)" value={form.altText} onChange={(e) => setForm((s) => ({ ...s, altText: e.target.value }))} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" min={1} className="admin-input" placeholder="Width" value={form.width} onChange={(e) => setForm((s) => ({ ...s, width: e.target.value }))} />
                <input type="number" min={1} className="admin-input" placeholder="Height" value={form.height} onChange={(e) => setForm((s) => ({ ...s, height: e.target.value }))} />
              </div>
              <AdminErrorAlert message={error} />
              <AdminFormActions onCancel={closeForm} submitting={submitting} />
          </form>
        </AdminModal>
      )}
    </div>
  );
}
