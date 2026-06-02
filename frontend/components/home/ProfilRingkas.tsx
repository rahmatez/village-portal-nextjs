import Link from 'next/link';
import { BookOpen, Map, Landmark, Image } from 'lucide-react';
import { PROFIL_CARDS } from '@/lib/constants';

const iconMap = {
  BookOpen,
  Map,
  Landmark,
  Image,
} as const;

export function ProfilRingkas() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="section-title">Profil Desa</h2>
          <p className="section-subtitle">Kenali lebih dekat Desa Mindaka melalui informasi utama</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROFIL_CARDS.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <Link key={card.href} href={card.href} className="card group text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-accent-gold">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-primary-800">{card.label}</h3>
                <p className="mt-2 text-sm text-slate-500">Pelajari selengkapnya →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
