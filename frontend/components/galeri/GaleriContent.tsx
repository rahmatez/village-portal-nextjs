'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, RefreshCw, X, Calendar, Maximize2 } from 'lucide-react';
import { galleryApi, type GalleryItem } from '@/lib/api/modul';
import { Pagination } from '@/components/ui/Pagination';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { PageHeader } from '@/components/layout/PageHeader';

export function GaleriContent() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['gallery', page, query],
    queryFn: async () => {
      const res = await galleryApi.list({ page, limit: 12, search: query || undefined });
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
        title="Galeri Desa"
        description="Arsip visual dokumentasi kegiatan, pelayanan, dan potensi wilayah Desa Mindaka."
        breadcrumbs={[{ label: 'Galeri Desa' }]}
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
                placeholder="Cari foto berdasarkan nama/format/alt..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              disabled={isFetching}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Segarkan
            </button>
          </form>
        </div>
      </section>

      <section className="pb-12 pt-4">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data?.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.fotoUrl}
                      alt={item.altText ?? 'Galeri desa'}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                      <p className="flex items-center gap-1 text-xs text-white">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(item.tanggalUnggah).toLocaleDateString('id-ID')}
                      </p>
                      {item.width && item.height && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-primary-200">
                          <Maximize2 className="h-3.5 w-3.5" />
                          {item.width} × {item.height} px
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {data?.meta && (
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

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="h-6 w-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.fotoUrl}
            alt={lightbox.altText ?? ''}
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
