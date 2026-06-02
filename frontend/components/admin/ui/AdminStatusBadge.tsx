'use client';

type Tone = 'success' | 'warning' | 'danger' | 'default';

const toneClass: Record<Tone, string> = {
  success: 'admin-status-pill-success',
  warning: 'admin-status-pill-warning',
  danger: 'admin-status-pill-danger',
  default: 'bg-slate-100 text-slate-700',
};

type AdminStatusBadgeProps = {
  label: string;
  tone?: Tone;
};

export function AdminStatusBadge({ label, tone = 'default' }: AdminStatusBadgeProps) {
  return <span className={`admin-status-pill ${toneClass[tone]}`}>{label}</span>;
}
