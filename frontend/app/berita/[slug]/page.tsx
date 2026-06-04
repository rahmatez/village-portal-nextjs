import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import { BeritaArticle } from '@/components/berita/BeritaArticle';
import { fetchPostBySlug } from '@/lib/fetch-post';
type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) {
    return { title: 'Artikel tidak ditemukan' };
  }
  const description = post.excerpt?.trim() || post.konten.slice(0, 160);
  return {
    title: post.judul,
    description,
    openGraph: {
      title: post.judul,
      description,
      type: 'article',
      publishedTime: post.tanggalRilis,
      images: post.fotoSampul ? [{ url: post.fotoSampul }] : undefined,
    },
  };
}

export default async function BeritaDetailPage({ params }: Props) {
  const post = await fetchPostBySlug(params.slug);

  if (!post || post.status !== 'published') {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-slate-50 px-4 py-24 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <Newspaper className="mx-auto h-12 w-12 text-slate-300" aria-hidden />
          <h1 className="mt-4 text-xl font-bold text-slate-800">Artikel tidak ditemukan</h1>
          <p className="mt-2 max-w-sm text-slate-600">
            Artikel mungkin telah dihapus atau alamat tautan tidak valid.
          </p>
          <Link href="/berita" className="btn-primary mt-6 inline-flex">
            Lihat semua berita
          </Link>
        </div>
      </div>
    );
  }

  return <BeritaArticle post={post} />;
}
