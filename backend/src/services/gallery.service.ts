import { galleryRepository } from '../repositories/gallery.repository';
import { AppError } from '../middlewares/error.middleware';
import { buildMeta, parsePagination } from '../utils/pagination';
import { CreateGalleryInput, UpdateGalleryInput } from '../validators/gallery.validator';
import { DEFAULT_GALLERY } from '../data/modul-defaults';

async function ensureGallery() {
  const count = await galleryRepository.countAll();
  if (count === 0) {
    for (const g of DEFAULT_GALLERY) {
      await galleryRepository.create(g);
    }
  }
}

export const galleryService = {
  async listPublic(query: { page?: string; limit?: string; search?: string }) {
    await ensureGallery();
    const { page, limit, skip } = parsePagination(query, 12, 48);
    const search = query.search?.trim() || undefined;
    const [items, total] = await Promise.all([
      galleryRepository.findMany({ skip, take: limit, search }),
      galleryRepository.count(search),
    ]);
    return { items, meta: buildMeta(page, limit, total) };
  },

  async getById(id: string) {
    const item = await galleryRepository.findById(id);
    if (!item) throw new AppError(404, 'Foto tidak ditemukan');
    return item;
  },

  async create(input: CreateGalleryInput) {
    return galleryRepository.create(input);
  },

  async update(id: string, input: UpdateGalleryInput) {
    await this.getById(id);
    return galleryRepository.update(id, input);
  },

  async remove(id: string) {
    await this.getById(id);
    return galleryRepository.delete(id);
  },
};
