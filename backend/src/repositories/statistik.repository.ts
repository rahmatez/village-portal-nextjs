import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const statistikRepository = {
  getLatest() {
    return prisma.dataStatistik.findFirst({
      orderBy: { updatedAt: 'desc' },
    });
  },

  create(data: Prisma.DataStatistikCreateInput) {
    return prisma.dataStatistik.create({ data });
  },

  update(id: string, data: Prisma.DataStatistikUpdateInput) {
    return prisma.dataStatistik.update({ where: { id }, data });
  },
};
