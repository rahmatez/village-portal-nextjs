'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useConfirmDelete } from './useConfirmDelete';

type AdminRowActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void | Promise<void>;
  deleteConfirmText?: string;
};

export function AdminRowActions({
  onEdit,
  onDelete,
  deleteConfirmText = 'Yakin ingin menghapus data ini?',
}: AdminRowActionsProps) {
  const { confirmDelete } = useConfirmDelete();

  return (
    <div className="flex justify-end gap-2">
      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
        >
          <Pencil className="h-4 w-4" />
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          onClick={async () => {
            if (await confirmDelete(deleteConfirmText)) {
              await onDelete();
            }
          }}
          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
