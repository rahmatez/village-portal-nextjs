'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Plus } from 'lucide-react';
import { authUsersApi } from '@/lib/api/modul';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminTable } from '@/components/admin/ui/AdminTable';
import { AdminModal } from '@/components/admin/ui/AdminModal';
import { AdminFormActions } from '@/components/admin/ui/AdminFormActions';
import { AdminErrorAlert } from '@/components/admin/ui/AdminErrorAlert';
import { AdminStatusBadge } from '@/components/admin/ui/AdminStatusBadge';
import { useConfirmSave } from '@/components/admin/ui/useConfirmSave';

export function UsersManager() {
  const router = useRouter();
  const qc = useQueryClient();
  const { confirmSave } = useConfirmSave();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    api
      .get('/auth/me')
      .then((res) => {
        if (res.data?.data?.role === 'SUPER_ADMIN') setAllowed(true);
        else router.replace('/admin');
      })
      .catch(() => router.replace('/admin'));
  }, [router]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN' as 'ADMIN' | 'SUPER_ADMIN',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => (await authUsersApi.list()).data.data,
  });

  const createMutation = useMutation({
    mutationFn: () => authUsersApi.register(form),
    onSuccess: async () => {
      setShowForm(false);
      setForm({ name: '', email: '', password: '', role: 'ADMIN' });
      await qc.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (e) => setError(e instanceof Error ? e.message : 'Gagal menambah admin'),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!(await confirmSave('Tambah akun admin baru?'))) return;
    setError('');
    createMutation.mutate();
  }

  if (!allowed) {
    return <div className="admin-panel py-10 text-center text-slate-500">Memuat...</div>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Admin"
        description="Daftar akun administrator portal desa."
        action={
          <button type="button" className="btn-admin" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Admin
          </button>
        }
      />

      <AdminTable>
        <thead>
          <tr>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Peran</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-slate-500">
                Memuat...
              </td>
            </tr>
          ) : data?.length ? (
            data.map((u) => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-slate-600">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <AdminStatusBadge
                    label={u.isActive ? 'Aktif' : 'Nonaktif'}
                    tone={u.isActive ? 'success' : 'danger'}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-slate-500">
                Belum ada data.
              </td>
            </tr>
          )}
        </tbody>
      </AdminTable>

      {showForm && (
        <AdminModal title="Tambah Admin" onClose={() => setShowForm(false)}>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <input
              className="admin-input"
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              required
            />
            <input
              type="email"
              className="admin-input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              required
            />
            <input
              type="password"
              className="admin-input"
              placeholder="Password (min. 8 karakter)"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              required
              minLength={8}
            />
            <select
              className="admin-input"
              value={form.role}
              onChange={(e) =>
                setForm((s) => ({ ...s, role: e.target.value as 'ADMIN' | 'SUPER_ADMIN' }))
              }
            >
              <option value="ADMIN">ADMIN</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>
            <AdminErrorAlert message={error} />
            <AdminFormActions
              onCancel={() => setShowForm(false)}
              submitting={createMutation.isPending}
            />
          </form>
        </AdminModal>
      )}
    </div>
  );
}
