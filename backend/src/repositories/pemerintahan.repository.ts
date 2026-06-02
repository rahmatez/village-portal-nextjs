import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const pemerintahanRepository = {
  getWilayah() {
    return prisma.wilayahDesa.findFirst({ orderBy: { updatedAt: 'desc' } });
  },
  createWilayah(data: Prisma.WilayahDesaCreateInput) {
    return prisma.wilayahDesa.create({ data });
  },
  updateWilayah(id: string, data: Prisma.WilayahDesaUpdateInput) {
    return prisma.wilayahDesa.update({ where: { id }, data });
  },
  findPerangkat() {
    return prisma.perangkatDesa.findMany({ orderBy: { orderPriority: 'asc' } });
  },
  findPerangkatById(id: string) {
    return prisma.perangkatDesa.findUnique({ where: { id } });
  },
  createPerangkat(data: Prisma.PerangkatDesaCreateInput) {
    return prisma.perangkatDesa.create({ data });
  },
  updatePerangkat(id: string, data: Prisma.PerangkatDesaUpdateInput) {
    return prisma.perangkatDesa.update({ where: { id }, data });
  },
  deletePerangkat(id: string) {
    return prisma.perangkatDesa.delete({ where: { id } });
  },
};
