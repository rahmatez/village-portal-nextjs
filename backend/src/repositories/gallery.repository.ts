import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const galleryRepository = {
  findMany(params: {
    skip: number;
    take: number;
    search?: string;
  }) {
    const where: Prisma.GalleryWhereInput = params.search
      ? {
          OR: [
            { altText: { contains: params.search, mode: 'insensitive' } },
            { format: { contains: params.search, mode: 'insensitive' } },
          ],
        }
      : {};
    return prisma.gallery.findMany({
      where,
      skip: params.skip,
      take: params.take,
      orderBy: { tanggalUnggah: 'desc' },
    });
  },
  count(search?: string) {
    const where: Prisma.GalleryWhereInput = search
      ? { altText: { contains: search, mode: 'insensitive' } }
      : {};
    return prisma.gallery.count({ where });
  },
  findById(id: string) {
    return prisma.gallery.findUnique({ where: { id } });
  },
  create(data: Prisma.GalleryCreateInput) {
    return prisma.gallery.create({ data });
  },
  update(id: string, data: Prisma.GalleryUpdateInput) {
    return prisma.gallery.update({ where: { id }, data });
  },
  delete(id: string) {
    return prisma.gallery.delete({ where: { id } });
  },
  countAll() {
    return prisma.gallery.count();
  },
};
