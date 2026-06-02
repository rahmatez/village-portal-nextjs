import { Clock, Mail } from 'lucide-react';
import { DESA_INFO } from '@/lib/constants';

export function TopBar() {
  return (
    <div className="bg-primary-800 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2 text-xs sm:flex-row sm:text-sm">
        <p className="text-center sm:text-left">
          Selamat datang di Portal Resmi {DESA_INFO.name}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {DESA_INFO.jamLayanan}
          </span>
          <a
            href={`mailto:${DESA_INFO.pengaduanEmail}?subject=Pengaduan%20Cepat%20Desa%20Mindaka`}
            className="flex items-center gap-1.5 rounded bg-accent-gold px-3 py-1 font-semibold text-primary-900 transition hover:bg-accent-gold-dark"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            Pengaduan Cepat
          </a>
        </div>
      </div>
    </div>
  );
}
