'use client';

import { useConfirmDialog } from './ConfirmDialogProvider';

export function useConfirmSave() {
  const { confirm } = useConfirmDialog();

  function confirmSave(message = 'Simpan perubahan ini?'): Promise<boolean> {
    return confirm({
      title: 'Konfirmasi Simpan',
      message,
      confirmText: 'Simpan',
      cancelText: 'Batalkan',
      tone: 'primary',
    });
  }

  return { confirmSave };
}
