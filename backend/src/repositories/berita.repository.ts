import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const beritaRepository = {
  findMany(where?: Prisma.BeritaWhereInput) {
    return prisma.berita.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { id: true, name: true } } },
    });
  },

  findBySlug(slug: string) {
    return prisma.berita.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });
  },

  findById(id: string) {
    return prisma.berita.findUnique({ where: { id } });
  },

  create(data: Prisma.BeritaCreateInput) {
    return prisma.berita.create({ data });
  },

  update(id: string, data: Prisma.BeritaUpdateInput) {
    return prisma.berita.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.berita.delete({ where: { id } });
  },
};
