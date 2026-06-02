'use client';

type AdminEmptyStateProps = {
  text: string;
};

export function AdminEmptyState({ text }: AdminEmptyStateProps) {
  return <div className="admin-empty">{text}</div>;
}
