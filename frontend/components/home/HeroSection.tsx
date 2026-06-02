'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { DESA_INFO } from '@/lib/constants';

const slides = [
  {
    title: `Selamat Datang di ${DESA_INFO.name}`,
    subtitle: 'Bersama membangun desa yang maju, mandiri, dan sejahtera',
    gradient: 'from-primary-600/95 to-primary-900/95',
  },
  {
    title: 'Pelayanan Publik Transparan',
    subtitle: 'Informasi desa terbuka untuk seluruh masyarakat',
    gradient: 'from-primary-700/95 via-primary-800/95 to-primary-900/95',
  },
  {
    title: 'UMKM Lokal Berkembang',
    subtitle: 'Dukung produk unggulan warga Desa Mindaka',
    gradient: 'from-primary-800/95 to-primary-900/95',
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative min-h-[420px] bg-gradient-to-br ${slide.gradient} md:min-h-[520px]`}
      >
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center px-4 py-20 md:py-28">
          <span className="mb-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur">
            Portal Resmi Pemerintah Desa
          </span>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100">{slide.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/profil" className="btn-accent">
              Profil Desa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={`mailto:${DESA_INFO.pengaduanEmail}?subject=Pengaduan%20Warga`}
              className="btn-outline border-white text-white hover:bg-white/10"
            >
              Ajukan Pengaduan
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
