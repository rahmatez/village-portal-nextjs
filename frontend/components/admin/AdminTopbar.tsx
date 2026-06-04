'use client';

import { Loader2, LogOut, Menu, CheckCircle2 } from 'lucide-react';

type AdminTopbarProps = {
  userName?: string;
  userRole?: string;
  userEmail?: string;
  onOpenMenu: () => void;
  onLogout: () => void;
  loggingOut: boolean;
  logoutDone: boolean;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function AdminTopbar({
  userName = 'Admin',
  userRole,
  userEmail,
  onOpenMenu,
  onLogout,
  loggingOut,
  logoutDone,
}: AdminTopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Buka menu"
          onClick={onOpenMenu}
          className="admin-icon-btn lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">Selamat datang kembali</p>
          <p className="text-xs text-slate-500">Kelola konten portal desa Anda</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-3 py-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-sm">
            {getInitials(userName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
            <p className="truncate text-xs text-slate-500">
              {userRole?.replace('_', ' ')}
              {userEmail ? ` · ${userEmail}` : ''}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="admin-btn-ghost shrink-0"
        >
          {loggingOut ? (
            logoutDone ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin" />
            )
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {loggingOut ? (logoutDone ? 'Berhasil' : 'Keluar...') : 'Keluar'}
          </span>
        </button>
      </div>
    </header>
  );
}
