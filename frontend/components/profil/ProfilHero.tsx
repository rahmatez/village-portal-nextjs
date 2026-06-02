'use client';

import Link from 'next/link';
import { Download, BarChart3 } from 'lucide-react';
import { DESA_INFO } from '@/lib/constants';
import { DesaLogo } from '@/components/layout/DesaLogo';

export function ProfilHero() {
  const scrollToStatistik = () => {
    document.getElementById('statistik-desa')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-gold" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-red" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center md:flex-row md:py-20 md:text-left">
        <DesaLogo size={120} className="ring-4 ring-white/30" />
        <div className="flex-1">
          <nav className="mb-4 flex items-center justify-center gap-1 text-sm text-primary-200 md:justify-start">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-white">
              Beranda
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">Profil Desa</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-gold">
            Profil Desa & Kondisi Sosial Ekonomi
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl lg:text-5xl">{DESA_INFO.name}</h1>
          <p className="mt-4 max-w-2xl text-primary-100 md:text-lg">
            Data kependudukan, demografi, fasilitas layanan publik, mata pencaharian, serta kondisi
            ekonomi dan infrastruktur {DESA_INFO.wilayah}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <button type="button" onClick={scrollToStatistik} className="btn-accent">
              <BarChart3 className="mr-2 h-4 w-4" />
              Lihat Statistik Desa
            </button>
            <a
              href="/dokumen/profil-desa-mindaka.pdf"
              download
              className="btn-outline border-white text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Unduh Profil Resmi (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
