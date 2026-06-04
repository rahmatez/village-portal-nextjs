'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';

type AdminModalProps = {
  title: string;
  children: ReactNode;
  maxWidthClassName?: string;
  onClose?: () => void;
};

export function AdminModal({
  title,
  children,
  maxWidthClassName = 'max-w-2xl',
  onClose,
}: AdminModalProps) {
  return (
    <div
      className="admin-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div className={`admin-modal-panel ${maxWidthClassName}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h2 id="admin-modal-title" className="text-lg font-bold text-slate-900">
            {title}
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="admin-icon-btn !p-1.5"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
}
