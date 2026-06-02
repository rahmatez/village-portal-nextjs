import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const produkRepository = {
  findMany(where?: Prisma.ProdukUMKMWhereInput, take?: number) {
    return prisma.produkUMKM.findMany({
      where,
      take,
      orderBy: { createdAt: 'desc' },
    });
  },

  findById(id: string) {
    return prisma.produkUMKM.findUnique({ where: { id } });
  },

  create(data: Prisma.ProdukUMKMCreateInput) {
    return prisma.produkUMKM.create({ data });
  },

  update(id: string, data: Prisma.ProdukUMKMUpdateInput) {
    return prisma.produkUMKM.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.produkUMKM.delete({ where: { id } });
  },

  countActive() {
    return prisma.produkUMKM.count({ where: { isActive: true } });
  },
};
