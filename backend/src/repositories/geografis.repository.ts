import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const geografisRepository = {
  getLatest() {
    return prisma.geografisSpasial.findFirst({
      orderBy: { updatedAt: 'desc' },
      include: {
        dusun: { orderBy: { urutan: 'asc' } },
        jarakAkses: { orderBy: { urutan: 'asc' } },
      },
    });
  },
  create(data: Prisma.GeografisSpasialCreateInput) {
    return prisma.geografisSpasial.create({
      data,
      include: { dusun: true, jarakAkses: true },
    });
  },
  update(id: string, data: Prisma.GeografisSpasialUpdateInput) {
    return prisma.geografisSpasial.update({
      where: { id },
      data,
      include: { dusun: true, jarakAkses: true },
    });
  },
  async replaceDusun(
    geografisId: string,
    items: Prisma.DetailDusunSpasialCreateManyInput[]
  ) {
    await prisma.detailDusunSpasial.deleteMany({ where: { geografisId } });
    if (items.length) await prisma.detailDusunSpasial.createMany({ data: items });
  },
  async replaceJarakAkses(
    geografisId: string,
    items: Prisma.JarakAksesCreateManyInput[]
  ) {
    await prisma.jarakAkses.deleteMany({ where: { geografisId } });
    if (items.length) await prisma.jarakAkses.createMany({ data: items });
  },
};
