'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { postsApi } from '@/lib/api/modul';
import { Skeleton } from '@/components/ui/Skeleton';

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => (await postsApi.getBySlug(slug)).data.data,
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Skeleton className="mb-6 h-8 w-2/3" />
        <Skeleton className="mb-8 h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-600">Artikel tidak ditemukan.</p>
        <Link href="/berita" className="btn-primary mt-6 inline-flex">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="bg-primary-900 py-8 text-white">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href="/berita"
            className="mb-4 inline-flex items-center gap-1 text-sm text-primary-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="text-2xl font-bold md:text-3xl">{data.judul}</h1>
          <div className="mt-4 flex gap-4 text-sm text-primary-200">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(data.tanggalRilis).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {data.waktuBaca} menit baca
            </span>
          </div>
        </div>
      </div>

      {data.fotoSampul && (
        <div className="relative mx-auto aspect-video max-w-4xl px-4 -mt-8">
          <div className="relative h-64 overflow-hidden rounded-xl shadow-lg md:h-80">
            <Image src={data.fotoSampul} alt={data.judul} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="prose prose-slate mx-auto max-w-3xl px-4 py-12">
        <div className="whitespace-pre-wrap leading-relaxed text-slate-700">{data.konten}</div>
      </div>
    </article>
  );
}
