import { prisma } from '../config/database';
import { DemografiJenis, FasilitasTipe, Prisma } from '@prisma/client';

export const profilSosialRepository = {
  getKependudukan() {
    return prisma.kependudukan.findFirst({ orderBy: { updatedAt: 'desc' } });
  },

  createKependudukan(data: Prisma.KependudukanCreateInput) {
    return prisma.kependudukan.create({ data });
  },

  updateKependudukan(id: string, data: Prisma.KependudukanUpdateInput) {
    return prisma.kependudukan.update({ where: { id }, data });
  },

  findDemografi(jenis?: DemografiJenis) {
    return prisma.demografiUmur.findMany({
      where: jenis ? { jenis } : undefined,
      orderBy: [{ jenis: 'asc' }, { urutan: 'asc' }],
    });
  },

  async replaceDemografi(items: Prisma.DemografiUmurCreateManyInput[]) {
    await prisma.demografiUmur.deleteMany();
    return prisma.demografiUmur.createMany({ data: items });
  },

  findFasilitas(tipe?: FasilitasTipe) {
    return prisma.fasilitasDesa.findMany({
      where: tipe ? { tipe } : undefined,
      orderBy: [{ tipe: 'asc' }, { urutan: 'asc' }],
    });
  },

  async replaceFasilitas(items: Prisma.FasilitasDesaCreateManyInput[]) {
    await prisma.fasilitasDesa.deleteMany();
    return prisma.fasilitasDesa.createMany({ data: items });
  },

  findMataPencaharian() {
    return prisma.mataPencaharian.findMany({ orderBy: { urutan: 'asc' } });
  },

  async replaceMataPencaharian(items: Prisma.MataPencaharianCreateManyInput[]) {
    await prisma.mataPencaharian.deleteMany();
    return prisma.mataPencaharian.createMany({ data: items });
  },
};
