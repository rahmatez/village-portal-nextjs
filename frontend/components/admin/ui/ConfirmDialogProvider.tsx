'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

type ConfirmTone = 'primary' | 'danger';

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  tone?: ConfirmTone;
};

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

type PendingConfirm = ConfirmOptions & {
  resolve: (result: boolean) => void;
};

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending({ ...options, resolve });
    });
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  function close(result: boolean) {
    if (!pending) return;
    pending.resolve(result);
    setPending(null);
  }

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {pending ? (
        <div
          className="admin-modal-backdrop z-[60]"
          onClick={(e) => {
            if (e.target === e.currentTarget) close(false);
          }}
        >
          <div className="admin-modal-panel max-w-md !overflow-visible">
            <div className="p-6">
              <div
                className={`mb-4 inline-flex rounded-2xl p-3 ${
                  pending.tone === 'danger'
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-primary-50 text-primary-600'
                }`}
              >
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {pending.title ?? 'Konfirmasi Aksi'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{pending.message}</p>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => close(false)} className="admin-btn-ghost">
                  {pending.cancelText ?? 'Batalkan'}
                </button>
                <button
                  type="button"
                  onClick={() => close(true)}
                  className={
                    pending.tone === 'danger' ? 'admin-btn-danger' : 'btn-admin'
                  }
                >
                  {pending.confirmText ?? 'Ya, lanjutkan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </ConfirmContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used inside ConfirmDialogProvider');
  }
  return context;
}
