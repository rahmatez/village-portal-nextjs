import Link from 'next/link';
import { Mail } from 'lucide-react';
import { DESA_INFO } from '@/lib/constants';
import { DesaLogo } from './DesaLogo';

const quickNav = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/geografis', label: 'Geografis' },
  { href: '/berita', label: 'Berita' },
  { href: '/apb-desa', label: 'APB' },
];

const layanan = [
  { href: '/pemerintahan', label: 'Pemerintahan' },
  { href: '/profil/sejarah', label: 'Sejarah' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/katalog', label: 'Katalog UMKM' },
  { href: '/pengaduan', label: 'Pengaduan Warga' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="h-1 bg-gradient-to-r from-accent-gold via-primary-500 to-accent-red" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <DesaLogo size={52} />
            <div>
              <p className="text-lg font-bold">{DESA_INFO.name}</p>
              <p className="text-xs text-primary-200">{DESA_INFO.wilayah}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-primary-100">{DESA_INFO.address}</p>
          <a
            href={`mailto:${DESA_INFO.email}`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-accent-gold"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {DESA_INFO.email}
          </a>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-accent-gold">Navigasi Cepat</h3>
          <ul className="space-y-2 text-sm text-primary-100">
            {quickNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-accent-gold">Layanan Publik</h3>
          <ul className="space-y-2 text-sm text-primary-100">
            {layanan.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-primary-200 sm:flex-row sm:text-left">
          <p>© {year} {DESA_INFO.name}. Hak cipta dilindungi.</p>
          <p>Dikembangkan oleh {DESA_INFO.developer}</p>
        </div>
      </div>
    </footer>
  );
}
