import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const postsRepository = {
  findPublished(params: { skip: number; take: number; search?: string }) {
    const where: Prisma.PostWhereInput = {
      status: 'published',
      ...(params.search
        ? {
            OR: [
              { judul: { contains: params.search, mode: 'insensitive' } },
              { konten: { contains: params.search, mode: 'insensitive' } },
              { excerpt: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    return prisma.post.findMany({
      where,
      skip: params.skip,
      take: params.take,
      orderBy: { tanggalRilis: 'desc' },
    });
  },
  countPublished(search?: string) {
    const where: Prisma.PostWhereInput = {
      status: 'published',
      ...(search
        ? {
            OR: [
              { judul: { contains: search, mode: 'insensitive' } },
              { konten: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    return prisma.post.count({ where });
  },
  findAllAdmin(params: { skip: number; take: number; search?: string }) {
    const where: Prisma.PostWhereInput = params.search
      ? {
          OR: [
            { judul: { contains: params.search, mode: 'insensitive' } },
            { slug: { contains: params.search, mode: 'insensitive' } },
          ],
        }
      : {};
    return prisma.post.findMany({
      where,
      skip: params.skip,
      take: params.take,
      orderBy: { tanggalRilis: 'desc' },
    });
  },
  countAll(search?: string) {
    const where: Prisma.PostWhereInput = search
      ? { judul: { contains: search, mode: 'insensitive' } }
      : {};
    return prisma.post.count({ where });
  },
  findBySlug(slug: string) {
    return prisma.post.findUnique({ where: { slug } });
  },
  findById(id: string) {
    return prisma.post.findUnique({ where: { id } });
  },
  create(data: Prisma.PostCreateInput) {
    return prisma.post.create({ data });
  },
  update(id: string, data: Prisma.PostUpdateInput) {
    return prisma.post.update({ where: { id }, data });
  },
  delete(id: string) {
    return prisma.post.delete({ where: { id } });
  },
  countAllPosts() {
    return prisma.post.count();
  },
};
