import Link from 'next/link';
import {
  Newspaper,
  Image as ImageIcon,
  Wallet,
  MapPinned,
  Landmark,
  Users,
  ShoppingBag,
  MessageSquareWarning,
  ArrowUpRight,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Layers,
  Inbox,
} from 'lucide-react';

const moduleGroups = [
  {
    title: 'Konten & Beranda',
    description: 'Informasi yang tampil di halaman utama dan artikel publik',
    items: [
      {
        href: '/admin/statistik',
        title: 'Data Beranda',
        desc: 'Statistik, IDM, visi-misi, PPID, sejarah',
        icon: BarChart3,
        accent: 'from-blue-500 to-primary-600',
      },
      {
        href: '/admin/posts',
        title: 'Berita Desa',
        desc: 'Tulis dan publikasikan artikel berita',
        icon: Newspaper,
        accent: 'from-violet-500 to-purple-600',
      },
      {
        href: '/admin/gallery',
        title: 'Galeri Foto',
        desc: 'Dokumentasi kegiatan desa',
        icon: ImageIcon,
        accent: 'from-pink-500 to-rose-500',
      },
    ],
  },
  {
    title: 'Profil & Pemerintahan',
    description: 'Data resmi desa dan struktur pemerintahan',
    items: [
      {
        href: '/admin/apb-desa',
        title: 'APB Desa',
        desc: 'Anggaran pendapatan dan belanja',
        icon: Wallet,
        accent: 'from-emerald-500 to-teal-600',
      },
      {
        href: '/admin/geografis',
        title: 'Geografis',
        desc: 'Peta, dusun, dan aksesibilitas',
        icon: MapPinned,
        accent: 'from-cyan-500 to-blue-600',
      },
      {
        href: '/admin/pemerintahan',
        title: 'Pemerintahan',
        desc: 'Perangkat desa dan wilayah',
        icon: Landmark,
        accent: 'from-amber-500 to-orange-600',
      },
      {
        href: '/admin/profil-sosial',
        title: 'Profil Sosial',
        desc: 'Kependudukan dan sosial ekonomi',
        icon: Users,
        accent: 'from-indigo-500 to-violet-600',
      },
    ],
  },
  {
    title: 'Layanan Warga',
    description: 'UMKM dan pengaduan masyarakat',
    items: [
      {
        href: '/admin/produk',
        title: 'Produk UMKM',
        desc: 'Katalog produk warga',
        icon: ShoppingBag,
        accent: 'from-lime-500 to-green-600',
      },
      {
        href: '/admin/pengaduan',
        title: 'Pengaduan Warga',
        desc: 'Tinjau dan tanggapi laporan warga',
        icon: MessageSquareWarning,
        accent: 'from-red-500 to-rose-600',
      },
    ],
  },
];

const stats = [
  { label: 'Modul Aktif', value: '9', icon: Layers, color: 'text-primary-600 bg-primary-50' },
  { label: 'Status Sistem', value: 'Online', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Prioritas', value: 'Pengaduan', icon: Inbox, color: 'text-amber-600 bg-amber-50' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="admin-welcome-banner">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 left-1/3 h-32 w-32 rounded-full bg-accent-gold/20 blur-2xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Dashboard Admin
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">Kelola Portal Desa Mindaka</h1>
            <p className="mt-2 max-w-xl text-sm text-primary-100/90">
              Pilih modul di bawah untuk memperbarui konten website resmi desa. Perubahan langsung
              tampil di portal publik.
            </p>
          </div>
          <Link
            href="/admin/pengaduan"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-800 shadow-lg transition hover:bg-primary-50 md:self-center"
          >
            <MessageSquareWarning className="h-4 w-4" />
            Cek Pengaduan
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className={`mb-3 inline-flex rounded-xl p-2.5 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-0.5 text-xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Module groups */}
      {moduleGroups.map((group) => (
        <section key={group.title}>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">{group.title}</h2>
            <p className="text-sm text-slate-500">{group.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((card) => (
              <Link key={card.href} href={card.href} className="admin-module-card group">
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${card.accent} p-2.5 text-white shadow-sm`}
                >
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Buka modul
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
