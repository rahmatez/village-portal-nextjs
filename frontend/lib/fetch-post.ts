import type { Post } from '@/lib/api/modul';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_BASE}/posts/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as Post;
  } catch {
    return null;
  }
}
