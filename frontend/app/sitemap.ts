import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const staticRoutes = [
  '',
  '/profil',
  '/profil/sejarah',
  '/pemerintahan',
  '/galeri',
  '/apb-desa',
  '/geografis',
  '/katalog',
  '/berita',
  '/pengaduan',
  '/pengaduan/lacak',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  try {
    const res = await fetch(`${API_BASE}/posts?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const json = await res.json();
      const posts = json.data as { slug: string; updatedAt?: string; tanggalRilis: string }[];
      for (const post of posts) {
        items.push({
          url: `${SITE_URL}/berita/${post.slug}`,
          lastModified: new Date(post.updatedAt ?? post.tanggalRilis),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch {
    /* API unavailable during build */
  }

  return items;
}
