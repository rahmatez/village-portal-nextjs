'use client';

type Tone = 'success' | 'warning' | 'danger' | 'default';

const toneDot: Record<Tone, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  default: 'bg-slate-400',
};

const toneClass: Record<Tone, string> = {
  success: 'admin-status-pill-success',
  warning: 'admin-status-pill-warning',
  danger: 'admin-status-pill-danger',
  default: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/60',
};

type AdminStatusBadgeProps = {
  label: string;
  tone?: Tone;
};

export function AdminStatusBadge({ label, tone = 'default' }: AdminStatusBadgeProps) {
  return (
    <span className={`admin-status-pill ${toneClass[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${toneDot[tone]}`} aria-hidden />
      {label}
    </span>
  );
}
