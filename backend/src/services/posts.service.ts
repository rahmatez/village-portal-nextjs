import { postsRepository } from '../repositories/posts.repository';
import { AppError } from '../middlewares/error.middleware';
import { buildMeta, parsePagination } from '../utils/pagination';
import { CreatePostInput, UpdatePostInput } from '../validators/posts.validator';
import { DEFAULT_POSTS } from '../data/modul-defaults';

async function ensurePosts() {
  const count = await postsRepository.countAllPosts();
  if (count === 0) {
    for (const p of DEFAULT_POSTS) {
      await postsRepository.create({
        ...p,
        tanggalRilis: new Date(),
        status: p.status,
      });
    }
  }
}

export const postsService = {
  async listPublic(query: { page?: string; limit?: string; search?: string }) {
    await ensurePosts();
    const { page, limit, skip } = parsePagination(query, 5, 20);
    const search = query.search?.trim() || undefined;
    const [items, total] = await Promise.all([
      postsRepository.findPublished({ skip, take: limit, search }),
      postsRepository.countPublished(search),
    ]);
    return { items, meta: buildMeta(page, limit, total) };
  },

  async listAdmin(query: { page?: string; limit?: string; search?: string }) {
    await ensurePosts();
    const { page, limit, skip } = parsePagination(query, 10, 50);
    const search = query.search?.trim() || undefined;
    const [items, total] = await Promise.all([
      postsRepository.findAllAdmin({ skip, take: limit, search }),
      postsRepository.countAll(search),
    ]);
    return { items, meta: buildMeta(page, limit, total) };
  },

  async getBySlug(slug: string, admin = false) {
    await ensurePosts();
    const post = await postsRepository.findBySlug(slug);
    if (!post) throw new AppError(404, 'Berita tidak ditemukan');
    if (!admin && post.status !== 'published') {
      throw new AppError(404, 'Berita tidak ditemukan');
    }
    return post;
  },

  async create(input: CreatePostInput) {
    const existing = await postsRepository.findBySlug(input.slug);
    if (existing) throw new AppError(409, 'Slug sudah digunakan');
    return postsRepository.create({
      judul: input.judul,
      slug: input.slug,
      konten: input.konten,
      excerpt: input.excerpt,
      fotoSampul: input.fotoSampul || null,
      tanggalRilis: input.tanggalRilis ?? new Date(),
      waktuBaca: input.waktuBaca ?? 5,
      status: input.status ?? 'published',
    });
  },

  async update(id: string, input: UpdatePostInput) {
    const post = await postsRepository.findById(id);
    if (!post) throw new AppError(404, 'Berita tidak ditemukan');
    if (input.slug && input.slug !== post.slug) {
      const existing = await postsRepository.findBySlug(input.slug);
      if (existing) throw new AppError(409, 'Slug sudah digunakan');
    }
    return postsRepository.update(id, {
      ...input,
      fotoSampul: input.fotoSampul === '' ? null : input.fotoSampul,
    });
  },

  async remove(id: string) {
    const post = await postsRepository.findById(id);
    if (!post) throw new AppError(404, 'Berita tidak ditemukan');
    return postsRepository.delete(id);
  },
};
