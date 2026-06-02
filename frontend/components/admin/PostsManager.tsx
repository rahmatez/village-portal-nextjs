'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { postsApi, type Post } from '@/lib/api/modul';
import { Pagination } from '@/components/ui/Pagination';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminTable } from '@/components/admin/ui/AdminTable';
import { AdminModal } from '@/components/admin/ui/AdminModal';
import { AdminRowActions } from '@/components/admin/ui/AdminRowActions';
import { AdminStatusBadge } from '@/components/admin/ui/AdminStatusBadge';
import { AdminFormActions } from '@/components/admin/ui/AdminFormActions';
import { AdminLoadingRow } from '@/components/admin/ui/AdminLoadingRow';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

type PostForm = {
  judul: string;
  slug: string;
  konten: string;
  excerpt: string;
  fotoSampul: string;
  waktuBaca: string;
  status: 'draft' | 'published';
};

const EMPTY_FORM: PostForm = {
  judul: '',
  slug: '',
  konten: '',
  excerpt: '',
  fotoSampul: '',
  waktuBaca: '5',
  status: 'published',
};

export function PostsManager() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState<PostForm>(EMPTY_FORM);
  const [error, setError] = useState('');
  const { confirmSave } = useConfirmSave();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-posts', page, query],
    queryFn: async () => (await postsApi.listAdmin({ page, limit: 10, search: query || undefined })).data,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      postsApi.create({
        judul: form.judul,
        slug: form.slug,
        konten: form.konten,
        excerpt: form.excerpt || undefined,
        fotoSampul: form.fotoSampul || undefined,
        waktuBaca: Number(form.waktuBaca),
        status: form.status,
      }),
    onSuccess: async () => {
      closeForm();
      await qc.invalidateQueries({ queryKey: ['admin-posts'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menyimpan'),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      postsApi.update(editing!.id, {
        judul: form.judul,
        slug: form.slug,
        konten: form.konten,
        excerpt: form.excerpt || undefined,
        fotoSampul: form.fotoSampul || undefined,
        waktuBaca: Number(form.waktuBaca),
        status: form.status,
      }),
    onSuccess: async () => {
      closeForm();
      await qc.invalidateQueries({ queryKey: ['admin-posts'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal memperbarui'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => postsApi.remove(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-posts'] });
    },
  });

  const submitting = createMutation.isPending || updateMutation.isPending;

  const title = useMemo(
    () => (editing ? 'Edit Post Berita' : 'Tambah Post Berita'),
    [editing]
  );

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowForm(true);
  }

  function openEdit(item: Post) {
    setEditing(item);
    setForm({
      judul: item.judul,
      slug: item.slug,
      konten: item.konten,
      excerpt: item.excerpt ?? '',
      fotoSampul: item.fotoSampul ?? '',
      waktuBaca: String(item.waktuBaca),
      status: item.status === 'draft' ? 'draft' : 'published',
    });
    setError('');
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setError('');
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave(editing ? 'Simpan perubahan post ini?' : 'Simpan post baru ini?'))) return;
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
        title="Kelola Posts Berita"
        description="Tambah, ubah, dan hapus berita desa."
        action={
          <button type="button" className="btn-admin" onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Post
          </button>
        }
      />

      <form onSubmit={onSearch} className="admin-filter-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari judul atau slug..."
          className="admin-input"
        />
        <button type="submit" className="btn-admin">
          Cari
        </button>
      </form>

      <AdminTable>
          <thead>
            <tr>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <AdminLoadingRow colSpan={5} />
            ) : data?.data.length ? (
              data.data.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{p.judul}</td>
                  <td className="px-4 py-3 text-slate-600">{p.slug}</td>
                  <td className="px-4 py-3">
                    <AdminStatusBadge
                      label={p.status}
                      tone={p.status === 'published' ? 'success' : 'warning'}
                    />
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(p.tanggalRilis).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <AdminRowActions
                      onEdit={() => openEdit(p)}
                      onDelete={() => deleteMutation.mutate(p.id)}
                      deleteConfirmText="Hapus post ini?"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
      </AdminTable>

      {data?.meta && (
        <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onPageChange={setPage} />
      )}

      {showForm && (
        <AdminModal title={title}>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input className="admin-input" placeholder="Judul" value={form.judul} onChange={(e) => setForm((s) => ({ ...s, judul: e.target.value }))} required />
              <input className="admin-input" placeholder="Slug" value={form.slug} onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))} required />
              <input className="admin-input" placeholder="URL Foto Sampul (opsional)" value={form.fotoSampul} onChange={(e) => setForm((s) => ({ ...s, fotoSampul: e.target.value }))} />
              <textarea className="admin-input min-h-[100px]" placeholder="Excerpt (opsional)" value={form.excerpt} onChange={(e) => setForm((s) => ({ ...s, excerpt: e.target.value }))} />
              <textarea className="admin-input min-h-[180px]" placeholder="Konten" value={form.konten} onChange={(e) => setForm((s) => ({ ...s, konten: e.target.value }))} required />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" min={1} className="admin-input" placeholder="Waktu baca (menit)" value={form.waktuBaca} onChange={(e) => setForm((s) => ({ ...s, waktuBaca: e.target.value }))} />
                <select className="admin-input" value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as 'draft' | 'published' }))}>
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                </select>
              </div>
              <AdminErrorAlert message={error} />
              <AdminFormActions onCancel={closeForm} submitting={submitting} />
          </form>
        </AdminModal>
      )}
    </div>
  );
}
