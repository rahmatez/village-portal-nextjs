'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Newspaper,
  Image as ImageIcon,
  Wallet,
  MapPinned,
  Landmark,
  Users,
  ShoppingBag,
  MessageSquareWarning,
  UserCog,
  ExternalLink,
  X,
  type LucideIcon,
} from 'lucide-react';
import { DesaLogo } from '@/components/layout/DesaLogo';

type MenuItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  superAdminOnly?: boolean;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    title: 'Utama',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Konten Publik',
    items: [
      { href: '/admin/statistik', label: 'Data Beranda', icon: BarChart3 },
      { href: '/admin/posts', label: 'Berita', icon: Newspaper },
      { href: '/admin/gallery', label: 'Galeri', icon: ImageIcon },
    ],
  },
  {
    title: 'Profil Desa',
    items: [
      { href: '/admin/apb-desa', label: 'APB Desa', icon: Wallet },
      { href: '/admin/geografis', label: 'Geografis', icon: MapPinned },
      { href: '/admin/pemerintahan', label: 'Pemerintahan', icon: Landmark },
      { href: '/admin/profil-sosial', label: 'Profil Sosial', icon: Users },
    ],
  },
  {
    title: 'Layanan',
    items: [
      { href: '/admin/produk', label: 'Produk UMKM', icon: ShoppingBag },
      { href: '/admin/pengaduan', label: 'Pengaduan', icon: MessageSquareWarning },
    ],
  },
  {
    title: 'Sistem',
    items: [
      { href: '/admin/users', label: 'Pengguna Admin', icon: UserCog, superAdminOnly: true },
    ],
  },
];

type AdminSidebarProps = {
  userRole?: 'ADMIN' | 'SUPER_ADMIN';
  onNavigate?: () => void;
  onCloseMobile?: () => void;
  showMobileClose?: boolean;
};

export function AdminSidebar({
  userRole,
  onNavigate,
  onCloseMobile,
  showMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <aside className="admin-sidebar flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-5">
        <Link href="/admin" className="flex min-w-0 items-center gap-3" onClick={onNavigate}>
          <DesaLogo size={40} className="ring-primary-100" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">Desa Mindaka</p>
            <p className="truncate text-xs text-slate-500">Panel Admin</p>
          </div>
        </Link>
        {showMobileClose && (
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onCloseMobile}
            className="admin-icon-btn lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {menuGroups.map((group) => {
          const items = group.items.filter(
            (item) => !item.superAdminOnly || userRole === 'SUPER_ADMIN'
          );
          if (!items.length) return null;

          return (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={`admin-nav-link ${active ? 'admin-nav-link-active' : ''}`}
                      >
                        <span className={`admin-nav-icon ${active ? 'admin-nav-icon-active' : ''}`}>
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="truncate">{item.label}</span>
                        {active && <span className="admin-nav-indicator" aria-hidden />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/80 p-4">
        <Link
          href="/"
          target="_blank"
          className="admin-nav-link text-primary-700 hover:bg-primary-50 hover:text-primary-800"
          onClick={onNavigate}
        >
          <span className="admin-nav-icon bg-primary-50 text-primary-600">
            <ExternalLink className="h-[18px] w-[18px]" />
          </span>
          Lihat Portal Publik
        </Link>
      </div>
    </aside>
  );
}
