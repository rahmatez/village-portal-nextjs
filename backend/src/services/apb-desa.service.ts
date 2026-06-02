import { apbDesaRepository } from '../repositories/apb-desa.repository';
import { AppError } from '../middlewares/error.middleware';
import { CreateApbInput, UpdateApbInput } from '../validators/apb-desa.validator';
import { Prisma } from '@prisma/client';
import { buildApb2024, buildApb2025 } from '../data/modul-defaults';

async function ensureApb() {
  const y2025 = await apbDesaRepository.findByTahun(2025);
  if (!y2025) await apbDesaRepository.create(buildApb2025());
  const y2024 = await apbDesaRepository.findByTahun(2024);
  if (!y2024) await apbDesaRepository.create(buildApb2024());
}

export const apbDesaService = {
  async getByTahun(tahun: number) {
    await ensureApb();
    const data = await apbDesaRepository.findByTahun(tahun);
    if (!data) throw new AppError(404, `APB Desa tahun ${tahun} tidak ditemukan`);
    return data;
  },

  async listTahun() {
    await ensureApb();
    return apbDesaRepository.findAllTahun();
  },

  async create(input: CreateApbInput) {
    const existing = await apbDesaRepository.findByTahun(input.tahun);
    if (existing) throw new AppError(409, 'APB untuk tahun ini sudah ada');

    const { pendapatan, belanja, ...rest } = input;
    return apbDesaRepository.create({
      ...rest,
      totalPendapatan: new Prisma.Decimal(rest.totalPendapatan),
      totalBelanja: new Prisma.Decimal(rest.totalBelanja),
      pembiayaan: new Prisma.Decimal(rest.pembiayaan),
      silpa: new Prisma.Decimal(rest.silpa),
      pendapatan: pendapatan?.length
        ? { create: pendapatan.map((p) => ({ ...p, nominal: new Prisma.Decimal(p.nominal) })) }
        : undefined,
      belanja: belanja?.length
        ? { create: belanja.map((b) => ({ ...b, nominal: new Prisma.Decimal(b.nominal) })) }
        : undefined,
    });
  },

  async update(id: string, input: UpdateApbInput) {
    const apb = await apbDesaRepository.findById(id);
    if (!apb) throw new AppError(404, 'APB tidak ditemukan');

    const { pendapatan, belanja, ...rest } = input;
    const updated = await apbDesaRepository.update(id, {
      ...rest,
      totalPendapatan:
        rest.totalPendapatan !== undefined
          ? new Prisma.Decimal(rest.totalPendapatan)
          : undefined,
      totalBelanja:
        rest.totalBelanja !== undefined ? new Prisma.Decimal(rest.totalBelanja) : undefined,
      pembiayaan:
        rest.pembiayaan !== undefined ? new Prisma.Decimal(rest.pembiayaan) : undefined,
      silpa: rest.silpa !== undefined ? new Prisma.Decimal(rest.silpa) : undefined,
    });

    if (pendapatan) {
      await apbDesaRepository.replacePendapatan(id, pendapatan);
    }
    if (belanja) {
      await apbDesaRepository.replaceBelanja(id, belanja);
    }

    return apbDesaRepository.findById(id);
  },

  async remove(id: string) {
    const apb = await apbDesaRepository.findById(id);
    if (!apb) throw new AppError(404, 'APB tidak ditemukan');
    return apbDesaRepository.delete(id);
  },
};
