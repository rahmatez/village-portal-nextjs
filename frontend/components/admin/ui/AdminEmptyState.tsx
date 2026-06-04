'use client';

import { Inbox } from 'lucide-react';

type AdminEmptyStateProps = {
  text: string;
};

export function AdminEmptyState({ text }: AdminEmptyStateProps) {
  return (
    <div className="admin-empty">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Inbox className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium text-slate-600">{text}</p>
      <p className="mt-1 text-xs text-slate-400">Belum ada data untuk ditampilkan</p>
    </div>
  );
}
