import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const apbDesaRepository = {
  findByTahun(tahun: number) {
    return prisma.apbDesa.findUnique({
      where: { tahun },
      include: { pendapatan: true, belanja: true },
    });
  },
  findAllTahun() {
    return prisma.apbDesa.findMany({
      select: { tahun: true, silpa: true, totalPendapatan: true, totalBelanja: true },
      orderBy: { tahun: 'desc' },
    });
  },
  create(data: Prisma.ApbDesaCreateInput) {
    return prisma.apbDesa.create({
      data,
      include: { pendapatan: true, belanja: true },
    });
  },
  update(id: string, data: Prisma.ApbDesaUpdateInput) {
    return prisma.apbDesa.update({
      where: { id },
      data,
      include: { pendapatan: true, belanja: true },
    });
  },
  delete(id: string) {
    return prisma.apbDesa.delete({ where: { id } });
  },
  findById(id: string) {
    return prisma.apbDesa.findUnique({
      where: { id },
      include: { pendapatan: true, belanja: true },
    });
  },
  replacePendapatan(apbId: string, items: { namaPos: string; nominal: number }[]) {
    return prisma.$transaction([
      prisma.detailPendapatan.deleteMany({ where: { apbId } }),
      prisma.detailPendapatan.createMany({
        data: items.map((i) => ({ apbId, namaPos: i.namaPos, nominal: i.nominal })),
      }),
    ]);
  },
  replaceBelanja(
    apbId: string,
    items: { namaBidang: string; nominal: number; persentase: number }[]
  ) {
    return prisma.$transaction([
      prisma.detailBelanja.deleteMany({ where: { apbId } }),
      prisma.detailBelanja.createMany({
        data: items.map((i) => ({
          apbId,
          namaBidang: i.namaBidang,
          nominal: i.nominal,
          persentase: i.persentase,
        })),
      }),
    ]);
  },
};
