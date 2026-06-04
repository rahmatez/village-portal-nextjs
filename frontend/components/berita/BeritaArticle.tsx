'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  Link2,
  Newspaper,
  Share2,
} from 'lucide-react';
import { postsApi, type Post } from '@/lib/api/modul';
import { ArticleFeaturedImage } from '@/components/berita/ArticleFeaturedImage';

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function ArticleBreadcrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1 text-sm text-slate-500"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition hover:bg-slate-100 hover:text-primary-700"
      >
        <Home className="h-3.5 w-3.5" aria-hidden />
        Beranda
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />
      <Link
        href="/berita"
        className="rounded-md px-1 py-0.5 transition hover:bg-slate-100 hover:text-primary-700"
      >
        Berita
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />
      <span className="line-clamp-1 font-medium text-slate-700" title={title}>
        {title}
      </span>
    </nav>
  );
}

function MetaPill({
  icon: Icon,
  children,
}: {
  icon: typeof Calendar;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-800">
      <Icon className="h-4 w-4 text-primary-600" aria-hidden />
      {children}
    </span>
  );
}

function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['posts', 'related', currentSlug],
    queryFn: async () => {
      const res = await postsApi.list({ page: 1, limit: 4 });
      return res.data.data.filter((p) => p.slug !== currentSlug).slice(0, 3);
    },
  });

  if (isLoading) {
    return (
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <section className="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-lg font-bold text-primary-800">
        Berita lainnya
      </h2>
      <p className="mt-1 text-sm text-slate-500">Artikel terbaru dari Desa Mindaka</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {data.map((post) => (
          <li key={post.id}>
            <RelatedCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function RelatedCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/berita/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-primary-200 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] bg-slate-100">
        {post.fotoSampul ? (
          <Image
            src={post.fotoSampul}
            alt=""
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary-300">
            <Newspaper className="h-8 w-8" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-primary-700">
          {post.judul}
        </h3>
        <p className="mt-2 text-xs text-slate-500">{formatTanggal(post.tanggalRilis)}</p>
      </div>
    </Link>
  );
}

type BeritaArticleProps = {
  post: Post;
};

export function BeritaArticle({ post }: BeritaArticleProps) {
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const paragraphs = useMemo(() => splitParagraphs(post.konten), [post.konten]);
  const hasCover = Boolean(post.fotoSampul?.trim());
  const lead = post.excerpt?.trim();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setReadProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.judul,
          text: lead || post.judul,
          url: window.location.href,
        });
        return;
      } catch {
        /* user cancelled or unsupported */
      }
    }
    void handleCopyLink();
  };

  return (
    <div className="bg-slate-50 pb-16">
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-primary-500 transition-[width] duration-150 ease-out"
        style={{ width: `${readProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progres membaca artikel"
      />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <ArticleBreadcrumb title={post.judul} />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-6 md:py-10">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {hasCover && (
            <ArticleFeaturedImage src={post.fotoSampul!} alt={post.judul} flush />
          )}

          <div className="p-6 md:p-10">
            <Link
              href="/berita"
              className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Kembali ke daftar berita
            </Link>

            <header>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                Berita Desa
              </p>
              <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900 md:text-3xl md:leading-snug">
                {post.judul}
              </h1>

              <div className="mt-5 flex flex-wrap gap-2">
                <MetaPill icon={Calendar}>{formatTanggal(post.tanggalRilis)}</MetaPill>
                <MetaPill icon={Clock}>{post.waktuBaca} menit baca</MetaPill>
              </div>

              {lead && (
                <p className="mt-6 border-l-4 border-primary-400 bg-primary-50/60 py-3 pl-4 text-lg leading-relaxed text-slate-700">
                  {lead}
                </p>
              )}
            </header>

            <div className="mt-8 space-y-5 text-base leading-[1.85] text-slate-700 md:text-[1.0625rem]">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <footer className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Terima kasih telah membaca. Kembali ke{' '}
                <Link href="/berita" className="font-semibold text-primary-600 hover:underline">
                  halaman berita
                </Link>{' '}
                untuk informasi lainnya.
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <Share2 className="h-4 w-4" aria-hidden />
                  Bagikan
                </button>
                <button
                  type="button"
                  onClick={() => void handleCopyLink()}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <Link2 className="h-4 w-4" aria-hidden />
                  {copied ? 'Tersalin!' : 'Salin tautan'}
                </button>
              </div>
            </footer>
          </div>
        </article>

        <RelatedArticles currentSlug={post.slug} />
      </main>
    </div>
  );
}
