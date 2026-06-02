import { beritaRepository } from '../repositories/berita.repository';
import { AppError } from '../middlewares/error.middleware';
import { CreateBeritaInput, UpdateBeritaInput } from '../validators/berita.validator';

export const beritaService = {
  async listPublished() {
    return beritaRepository.findMany({ isPublished: true });
  },

  async listAll() {
    return beritaRepository.findMany();
  },

  async getBySlug(slug: string) {
    const berita = await beritaRepository.findBySlug(slug);
    if (!berita) {
      throw new AppError(404, 'Berita tidak ditemukan');
    }
    return berita;
  },

  async create(authorId: string, input: CreateBeritaInput) {
    const existing = await beritaRepository.findBySlug(input.slug);
    if (existing) {
      throw new AppError(409, 'Slug sudah digunakan');
    }

    return beritaRepository.create({
      ...input,
      imageUrl: input.imageUrl || null,
      author: { connect: { id: authorId } },
      publishedAt: input.isPublished ? new Date() : null,
    });
  },

  async update(id: string, input: UpdateBeritaInput) {
    const berita = await beritaRepository.findById(id);
    if (!berita) {
      throw new AppError(404, 'Berita tidak ditemukan');
    }

    if (input.slug && input.slug !== berita.slug) {
      const existing = await beritaRepository.findBySlug(input.slug);
      if (existing) {
        throw new AppError(409, 'Slug sudah digunakan');
      }
    }

    const publishedAt =
      input.isPublished === true && !berita.publishedAt ? new Date() : berita.publishedAt;

    return beritaRepository.update(id, {
      ...input,
      imageUrl: input.imageUrl === '' ? null : input.imageUrl,
      publishedAt,
    });
  },

  async remove(id: string) {
    const berita = await beritaRepository.findById(id);
    if (!berita) {
      throw new AppError(404, 'Berita tidak ditemukan');
    }
    return beritaRepository.delete(id);
  },
};
