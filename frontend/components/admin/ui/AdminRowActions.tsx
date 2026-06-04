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
    <div className="flex justify-end gap-1.5">
      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="admin-icon-btn !border-primary-100 !text-primary-600 hover:!border-primary-200 hover:!bg-primary-50"
          aria-label="Edit"
          title="Edit"
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
          className="admin-icon-btn !border-rose-100 !text-rose-600 hover:!border-rose-200 hover:!bg-rose-50"
          aria-label="Hapus"
          title="Hapus"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
