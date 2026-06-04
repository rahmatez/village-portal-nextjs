'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import api from '@/lib/axios';
import { ConfirmDialogProvider } from '@/components/admin/ui/ConfirmDialogProvider';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutDone, setLogoutDone] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    async function checkSession() {
      try {
        const res = await api.get('/auth/me');
        const me = res.data?.data as AdminUser;
        if (me?.role !== 'ADMIN' && me?.role !== 'SUPER_ADMIN') {
          router.replace('/admin/login');
          return;
        }
        setUser(me);
      } catch {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    void checkSession();
  }, [pathname, router]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    let success = false;
    try {
      await api.post('/auth/logout');
      success = true;
      setLogoutDone(true);
      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 700);
    } finally {
      if (!success) setLoggingOut(false);
    }
  }

  if (pathname === '/admin/login') return <>{children}</>;

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-600">Memverifikasi sesi admin...</p>
      </div>
    );
  }

  return (
    <ConfirmDialogProvider>
      <div className="admin-shell">
        {mobileMenuOpen && (
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className="fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 ease-out lg:translate-x-0">
          <div
            className={`h-full transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <AdminSidebar
              userRole={user?.role}
              onNavigate={() => setMobileMenuOpen(false)}
              onCloseMobile={() => setMobileMenuOpen(false)}
              showMobileClose
            />
          </div>
        </div>

        <div className="min-h-screen lg:pl-[280px]">
          <AdminTopbar
            userName={user?.name}
            userRole={user?.role}
            userEmail={user?.email}
            onOpenMenu={() => setMobileMenuOpen(true)}
            onLogout={handleLogout}
            loggingOut={loggingOut}
            logoutDone={logoutDone}
          />

          <main className="mx-auto max-w-[1400px] p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ConfirmDialogProvider>
  );
}
