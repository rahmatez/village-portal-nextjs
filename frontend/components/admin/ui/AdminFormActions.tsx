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
  className = 'pt-2',
}: AdminFormActionsProps) {
  return (
    <div className={`flex justify-end gap-2 ${className}`}>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Batal
      </button>
      <button type="submit" disabled={submitting} className="btn-admin">
        {submitting ? submittingLabel : submitLabel}
      </button>
    </div>
  );
}
