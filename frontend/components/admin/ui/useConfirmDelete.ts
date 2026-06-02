'use client';

import { useConfirmDialog } from './ConfirmDialogProvider';

export function useConfirmDelete() {
  const { confirm } = useConfirmDialog();

  function confirmDelete(message: string): Promise<boolean> {
    return confirm({
      title: 'Konfirmasi Hapus',
      message,
      confirmText: 'Hapus',
      cancelText: 'Batalkan',
      tone: 'danger',
    });
  }

  return { confirmDelete };
}
