'use client';

import { ReactNode } from 'react';

type AdminTableProps = {
  children: ReactNode;
  minWidthClassName?: string;
};

export function AdminTable({ children, minWidthClassName = 'min-w-[760px]' }: AdminTableProps) {
  return (
    <div className="admin-table-wrap">
      <table className={`admin-table ${minWidthClassName}`}>{children}</table>
    </div>
  );
}
