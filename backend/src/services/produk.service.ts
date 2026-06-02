import { produkRepository } from '../repositories/produk.repository';
import { AppError } from '../middlewares/error.middleware';
import { CreateProdukInput, UpdateProdukInput } from '../validators/produk.validator';
import { Prisma } from '@prisma/client';

export const produkService = {
  async listPublic(limit?: number) {
    return produkRepository.findMany({ isActive: true }, limit);
  },

  async listAll() {
    return produkRepository.findMany();
  },

  async getById(id: string) {
    const produk = await produkRepository.findById(id);
    if (!produk) {
      throw new AppError(404, 'Produk tidak ditemukan');
    }
    return produk;
  },

  async create(input: CreateProdukInput) {
    return produkRepository.create({
      ...input,
      price: new Prisma.Decimal(input.price),
      imageUrl: input.imageUrl || null,
    });
  },

  async update(id: string, input: UpdateProdukInput) {
    await this.getById(id);
    return produkRepository.update(id, {
      ...input,
      price: input.price !== undefined ? new Prisma.Decimal(input.price) : undefined,
      imageUrl: input.imageUrl === '' ? null : input.imageUrl,
    });
  },

  async remove(id: string) {
    await this.getById(id);
    return produkRepository.delete(id);
  },
};
