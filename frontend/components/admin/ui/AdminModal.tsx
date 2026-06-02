'use client';

import { ReactNode } from 'react';

type AdminModalProps = {
  title: string;
  children: ReactNode;
  maxWidthClassName?: string;
};

export function AdminModal({
  title,
  children,
  maxWidthClassName = 'max-w-2xl',
}: AdminModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full rounded-2xl bg-white p-6 shadow-xl ${maxWidthClassName}`}>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {children}
      </div>
    </div>
  );
}
