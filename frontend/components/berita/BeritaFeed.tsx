'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, Mail, Search } from 'lucide-react';
import { postsApi } from '@/lib/api/modul';
import { Pagination } from '@/components/ui/Pagination';
import { ListSkeleton } from '@/components/ui/Skeleton';
import { DESA_INFO } from '@/lib/constants';
import { PageHeader } from '@/components/layout/PageHeader';

export function BeritaFeed() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['posts', page, query],
    queryFn: async () => {
      const res = await postsApi.list({ page, limit: 5, search: query || undefined });
      return res.data;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  };

  return (
    <>
      <PageHeader
        title="Berita Desa"
        description={`Kanal informasi resmi ${DESA_INFO.name} — kegiatan, program, dan pengumuman terbaru.`}
        breadcrumbs={[{ label: 'Berita' }]}
      />

      <section className="bg-slate-50 pb-6 pt-6">
        <div className="mx-auto max-w-5xl px-4">
          <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari berita berdasarkan judul/konten..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <button type="submit" className="btn-primary">
              Cari
            </button>
            <a
              href={`mailto:${DESA_INFO.email}?subject=Rilis%20Berita%20Desa`}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Mail className="mr-2 h-4 w-4" />
              Kirim Rilis
            </a>
          </form>
          <p className="mt-3 text-center text-sm text-slate-500">
            Beranda <span className="mx-2">/</span>{' '}
            <span className="font-semibold text-slate-700">Berita</span>
          </p>
        </div>
      </section>

      <section className="pb-12 pt-4">
        <div className="mx-auto max-w-4xl px-4">
          {isLoading ? (
            <ListSkeleton count={3} />
          ) : !data?.data.length ? (
            <div className="card py-12 text-center text-slate-500">Belum ada berita ditemukan.</div>
          ) : (
            <>
              <div className="space-y-8">
                {data.data.map((post) => (
                  <article
                    key={post.id}
                    className="card flex flex-col overflow-hidden p-0 sm:flex-row"
                  >
                    <div className="relative h-48 w-full shrink-0 bg-slate-200 sm:h-auto sm:w-56">
                      {post.fotoSampul ? (
                        <Image
                          src={post.fotoSampul}
                          alt={post.judul}
                          fill
                          className="object-cover"
                          sizes="224px"
                        />
                      ) : (
                        <div className="flex h-full min-h-[12rem] items-center justify-center bg-primary-100 text-primary-400 sm:min-h-full">
                          Berita
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Link href={`/berita/${post.slug}`}>
                        <h2 className="text-xl font-bold text-primary-800 hover:underline">
                          {post.judul}
                        </h2>
                      </Link>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.tanggalRilis).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.waktuBaca} menit baca
                        </span>
                      </div>
                      {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-slate-600">{post.excerpt}</p>
                      )}
                      <Link
                        href={`/berita/${post.slug}`}
                        className="mt-4 text-sm font-semibold text-primary-600 hover:underline"
                      >
                        Baca selengkapnya →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              {data.meta && (
                <Pagination
                  page={data.meta.page}
                  totalPages={data.meta.totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
