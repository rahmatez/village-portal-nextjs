'use client';

type AdminFormActionsProps = {
  onCancel: () => void;
  submitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  className?: string;
};

export function AdminFormActions({
  onCancel,
  submitting = false,
  submitLabel = 'Simpan',
  submittingLabel = 'Menyimpan...',
  className = 'pt-4',
}: AdminFormActionsProps) {
  return (
    <div className={`flex flex-col-reverse gap-2 border-t border-slate-100 sm:flex-row sm:justify-end ${className}`}>
      <button type="button" onClick={onCancel} className="admin-btn-ghost">
        Batal
      </button>
      <button type="submit" disabled={submitting} className="btn-admin">
        {submitting ? submittingLabel : submitLabel}
      </button>
    </div>
  );
}
