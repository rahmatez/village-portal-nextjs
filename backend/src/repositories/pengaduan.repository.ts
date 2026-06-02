import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const pengaduanRepository = {
  findMany(where?: Prisma.PengaduanWhereInput) {
    return prisma.pengaduan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { handledBy: { select: { id: true, name: true } } },
    });
  },

  findByTicket(ticketCode: string) {
    return prisma.pengaduan.findUnique({
      where: { ticketCode },
      include: { handledBy: { select: { id: true, name: true } } },
    });
  },

  findById(id: string) {
    return prisma.pengaduan.findUnique({ where: { id } });
  },

  create(data: Prisma.PengaduanCreateInput) {
    return prisma.pengaduan.create({ data });
  },

  update(id: string, data: Prisma.PengaduanUpdateInput) {
    return prisma.pengaduan.update({ where: { id }, data });
  },
};
