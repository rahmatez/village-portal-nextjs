'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pengaduanApi, type PengaduanItem } from '@/lib/api/modul';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminTable } from '@/components/admin/ui/AdminTable';
import { AdminStatusBadge } from '@/components/admin/ui/AdminStatusBadge';
import { AdminLoadingRow } from '@/components/admin/ui/AdminLoadingRow';

const STATUS_OPTIONS: PengaduanItem['status'][] = ['PENDING', 'DIPROSES', 'SELESAI', 'DITOLAK'];

function getStatusTone(status: PengaduanItem['status']): 'warning' | 'success' | 'danger' {
  if (status === 'SELESAI') return 'success';
  if (status === 'DITOLAK') return 'danger';
  return 'warning';
}

export function PengaduanManager() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-pengaduan'],
    queryFn: async () => (await pengaduanApi.listAdmin()).data.data,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      status,
      response,
    }: {
      id: string;
      status: PengaduanItem['status'];
      response?: string;
    }) => pengaduanApi.updateStatus(id, { status, response }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['admin-pengaduan'] });
    },
  });

  function onChangeStatus(item: PengaduanItem, status: PengaduanItem['status']) {
    const response =
      status === 'SELESAI' || status === 'DITOLAK'
        ? window.prompt('Tulis respon admin (opsional):', item.response ?? '') ?? ''
        : item.response ?? '';
    updateMutation.mutate({ id: item.id, status, response });
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Pengaduan"
        description="Pantau tiket warga dan update status tindak lanjut."
      />

      <div className="mt-6">
        <AdminTable minWidthClassName="min-w-[980px]">
          <thead>
            <tr>
              <th className="px-4 py-3">Tiket</th>
              <th className="px-4 py-3">Pelapor</th>
              <th className="px-4 py-3">Subjek</th>
              <th className="px-4 py-3">Pesan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Respon</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <AdminLoadingRow colSpan={6} />
            ) : data?.length ? (
              data.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{item.ticketCode}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleString('id-ID')}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <p>{item.name}</p>
                    <p className="text-xs text-slate-500">{item.phone || item.email || '-'}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{item.subject}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <p className="line-clamp-3">{item.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="mb-2">
                      <AdminStatusBadge label={item.status} tone={getStatusTone(item.status)} />
                    </div>
                    <select
                      value={item.status}
                      onChange={(e) => onChangeStatus(item, e.target.value as PengaduanItem['status'])}
                      className="admin-input"
                      disabled={updateMutation.isPending}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <p className="line-clamp-3">{item.response || '-'}</p>
                    {item.handledBy?.name ? (
                      <p className="mt-1 text-xs text-slate-500">oleh {item.handledBy.name}</p>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={6}>Belum ada pengaduan masuk.</td>
              </tr>
            )}
          </tbody>
        </AdminTable>
      </div>
    </div>
  );
}
