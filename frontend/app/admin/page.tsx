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
  FolderKanban,
  ShieldCheck,
} from 'lucide-react';

const cards = [
  {
    href: '/admin/posts',
    title: 'Kelola Posts Berita',
    desc: 'Tambah, edit, dan publikasi berita desa.',
    icon: Newspaper,
  },
  {
    href: '/admin/gallery',
    title: 'Kelola Galeri',
    desc: 'Atur foto dokumentasi kegiatan desa.',
    icon: ImageIcon,
  },
  {
    href: '/admin/apb-desa',
    title: 'Kelola APB Desa',
    desc: 'Perbarui data anggaran dan bidang belanja.',
    icon: Wallet,
  },
  {
    href: '/admin/geografis',
    title: 'Kelola Geografis',
    desc: 'Atur data spasial, dusun, dan aksesibilitas.',
    icon: MapPinned,
  },
  {
    href: '/admin/pemerintahan',
    title: 'Kelola Pemerintahan',
    desc: 'Perangkat desa, jabatan, dan wilayah.',
    icon: Landmark,
  },
  {
    href: '/admin/profil-sosial',
    title: 'Kelola Profil Sosial',
    desc: 'Data kependudukan dan sosial ekonomi.',
    icon: Users,
  },
  {
    href: '/admin/produk',
    title: 'Kelola Produk UMKM',
    desc: 'Produk katalog UMKM desa.',
    icon: ShoppingBag,
  },
  {
    href: '/admin/pengaduan',
    title: 'Kelola Pengaduan',
    desc: 'Tinjau dan respon pengaduan warga.',
    icon: MessageSquareWarning,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Dashboard Admin</h1>
      <p className="mt-1 text-slate-600">
        Pilih modul untuk mengelola seluruh konten Portal Resmi Desa.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="admin-stat-card">
          <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2 text-[#465fff]">
            <FolderKanban className="h-4 w-4" />
          </div>
          <p className="text-sm text-slate-500">Total Modul</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{cards.length}</p>
        </div>
        <div className="admin-stat-card">
          <div className="mb-3 inline-flex rounded-lg bg-violet-50 p-2 text-violet-600">
            <BarChart3 className="h-4 w-4" />
          </div>
          <p className="text-sm text-slate-500">Status Sistem</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">Aktif</p>
        </div>
        <div className="admin-stat-card">
          <div className="mb-3 inline-flex rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="text-sm text-slate-500">Akses Admin</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">Terverifikasi</p>
        </div>
        <div className="admin-stat-card">
          <div className="mb-3 inline-flex rounded-lg bg-amber-50 p-2 text-amber-600">
            <MessageSquareWarning className="h-4 w-4" />
          </div>
          <p className="text-sm text-slate-500">Prioritas</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">Pengaduan</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="admin-panel group transition hover:-translate-y-0.5 hover:border-[#465fff]/30 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[#465fff]/10 p-2 text-[#465fff]">
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 group-hover:text-[#465fff]">
                  {card.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-[#465fff]">
                  Buka modul
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
