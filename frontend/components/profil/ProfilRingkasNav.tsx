import Link from 'next/link';
import { BookOpen, Map, Landmark, Image, ArrowRight } from 'lucide-react';
import { PROFIL_CARDS } from '@/lib/constants';

const iconMap = {
  BookOpen,
  Map,
  Landmark,
  Image,
} as const;

export function ProfilRingkasNav() {
  return (
    <section className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="section-title text-center">Informasi Profil Lainnya</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFIL_CARDS.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <Link
                key={card.href}
                href={card.href}
                className="card flex items-center gap-4 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="flex-1 font-medium text-slate-800">{card.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
