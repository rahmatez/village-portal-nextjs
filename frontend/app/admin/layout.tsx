'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  Image as ImageIcon,
  Wallet,
  MapPinned,
  Landmark,
  Users,
  ShoppingBag,
  MessageSquareWarning,
  LogOut,
  Loader2,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';
import api from '@/lib/axios';
import { ConfirmDialogProvider } from '@/components/admin/ui/ConfirmDialogProvider';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
};

const menu = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts Berita', icon: Newspaper },
  { href: '/admin/gallery', label: 'Galeri', icon: ImageIcon },
  { href: '/admin/apb-desa', label: 'APB Desa', icon: Wallet },
  { href: '/admin/geografis', label: 'Geografis', icon: MapPinned },
  { href: '/admin/pemerintahan', label: 'Pemerintahan', icon: Landmark },
  { href: '/admin/profil-sosial', label: 'Profil Sosial', icon: Users },
  { href: '/admin/produk', label: 'Produk UMKM', icon: ShoppingBag },
  { href: '/admin/pengaduan', label: 'Pengaduan', icon: MessageSquareWarning },
];

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
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
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
      if (!success) {
        setLoggingOut(false);
      }
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  if (pathname === '/admin/login') return <>{children}</>;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
          Memeriksa sesi admin...
        </div>
      </div>
    );
  }

  return (
    <ConfirmDialogProvider>
      <div className="admin-shell">
      <div className="mx-auto max-w-[1500px] lg:h-screen lg:overflow-hidden">
        {mobileMenuOpen ? (
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={closeMobileMenu}
          />
        ) : null}

        <aside
          className={`admin-sidebar fixed inset-y-0 left-0 z-40 w-[260px] overflow-y-auto transition-transform duration-200 ease-out lg:fixed lg:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-3 flex items-center justify-end lg:hidden">
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={closeMobileMenu}
              className="inline-flex rounded-lg border border-slate-700 p-2 text-slate-200 hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Link
            href="/"
            className="mb-6 block rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-4 text-white shadow-sm transition hover:border-slate-600 hover:brightness-110"
            onClick={closeMobileMenu}
          >
            <p className="text-xs uppercase tracking-wide text-slate-300">Dashboard</p>
            <p className="mt-1 font-bold">Portal Desa Mindaka</p>
          </Link>
          <nav className="space-y-1">
            {menu.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`admin-nav-link ${active ? 'admin-nav-link-active' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="lg:ml-[260px] lg:h-screen lg:overflow-y-auto">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center justify-between">
              <div>
                <button
                  type="button"
                  aria-label="Buka menu"
                  onClick={() => setMobileMenuOpen(true)}
                  className="mb-2 inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <p className="text-xs uppercase tracking-wide text-slate-500">Signed in as</p>
                <p className="font-semibold text-slate-800">
                  {user?.name ?? 'Admin'} · {user?.role ?? '-'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-70"
              >
                {loggingOut ? (
                  <>
                    {logoutDone ? (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                    ) : (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {logoutDone ? 'Logout berhasil...' : 'Memproses logout...'}
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                )}
              </button>
            </div>
          </header>

          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
      </div>
    </ConfirmDialogProvider>
  );
}
