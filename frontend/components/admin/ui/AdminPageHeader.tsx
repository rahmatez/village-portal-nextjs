'use client';

import { ReactNode } from 'react';

type AdminPageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="admin-page-title">{title}</h1>
        <p className="admin-page-subtitle">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
