'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Newspaper } from 'lucide-react';
import api from '@/lib/axios';
import type { ApiResponse } from '@/lib/api';

interface Berita {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  createdAt: string;
}

export function BeritaList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['berita', 'published'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Berita[]>>('/berita/published');
      return res.data.data;
    },
    retry: false,
  });

  if (isLoading) {
    return <div className="py-12 text-center text-slate-500">Memuat berita...</div>;
  }

  if (isError || !data?.length) {
    return (
      <div className="card mx-auto max-w-lg py-12 text-center">
        <Newspaper className="mx-auto h-12 w-12 text-slate-300" />
        <p className="mt-4 text-slate-600">
          Belum ada berita yang dipublikasikan. Silakan kembali lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((berita) => (
        <article key={berita.id} className="card">
          <h3 className="text-lg font-semibold text-primary-800">
            <Link href={`/berita/${berita.slug}`} className="hover:underline">
              {berita.title}
            </Link>
          </h3>
          {berita.excerpt && (
            <p className="mt-2 line-clamp-3 text-slate-600">{berita.excerpt}</p>
          )}
          <p className="mt-4 flex items-center gap-1 text-sm text-slate-400">
            <Calendar className="h-4 w-4" />
            {new Date(berita.publishedAt || berita.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <Link
            href={`/berita/${berita.slug}`}
            className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline"
          >
            Baca selengkapnya →
          </Link>
        </article>
      ))}
    </div>
  );
}
