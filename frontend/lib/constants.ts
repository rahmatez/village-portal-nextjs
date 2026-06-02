export const DESA_INFO = {
  name: 'Desa Mindaka',
  tagline: 'Portal Resmi Pemerintah Desa',
  wilayah: 'Kecamatan Tarub, Kabupaten Tegal',
  address:
    'Desa Mindaka, Kecamatan Tarub, Kabupaten Tegal, Provinsi Jawa Tengah',
  email: 'info@desamindaka.go.id',
  ppidEmail: 'ppid@desamindaka.go.id',
  pengaduanEmail: process.env.NEXT_PUBLIC_PENGADUAN_EMAIL || 'pengaduan@desamindaka.go.id',
  jamLayanan: 'Senin – Jumat, 08.00 – 15.00 WIB',
  developer: 'Tim Pengembang Desa Mindaka',
};

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil Desa' },
  { href: '/pemerintahan', label: 'Pemerintahan' },
  { href: '/galeri', label: 'Galeri Desa' },
  { href: '/apb-desa', label: 'APB Desa' },
  { href: '/geografis', label: 'Geografis' },
  { href: '/katalog', label: 'Katalog' },
  { href: '/berita', label: 'Berita' },
] as const;

export const PROFIL_CARDS = [
  { href: '/profil/sejarah', label: 'Sejarah', icon: 'BookOpen' },
  { href: '/geografis', label: 'Geografis', icon: 'Map' },
  { href: '/pemerintahan', label: 'Pemerintahan', icon: 'Landmark' },
  { href: '/galeri', label: 'Galeri', icon: 'Image' },
] as const;
