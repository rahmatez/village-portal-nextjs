'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { DESA_INFO } from '@/lib/constants';

const slides = [
  {
    image: '/haro-1.jpg',
    title: `Selamat Datang di ${DESA_INFO.name}`,
    subtitle: 'Bersama membangun desa yang maju, mandiri, dan sejahtera',
  },
  {
    image: '/hero-2.jpg',
    title: 'Pelayanan Publik Transparan',
    subtitle: 'Informasi desa terbuka untuk seluruh masyarakat',
  },
  {
    image: '/hero-3.jpg',
    title: 'UMKM Lokal Berkembang',
    subtitle: 'Dukung produk unggulan warga Desa Mindaka',
  },
] as const;

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
      <div className="relative min-h-[420px] md:min-h-[520px]">
        {/* Background images */}
        {slides.map((item, i) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== current}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlay agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/70 to-primary-900/50" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.07]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center px-4 py-20 md:py-28">
          <span className="mb-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur">
            Portal Resmi Pemerintah Desa
          </span>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white drop-shadow-sm md:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-100 drop-shadow-sm">{slide.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/profil" className="btn-accent">
              Profil Desa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/pengaduan"
              className="btn-outline border-white text-white hover:bg-white/10"
            >
              Ajukan Pengaduan
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white backdrop-blur transition hover:bg-black/40"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white backdrop-blur transition hover:bg-black/40"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
