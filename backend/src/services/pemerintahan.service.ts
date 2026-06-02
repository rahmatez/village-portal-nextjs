import { pemerintahanRepository } from '../repositories/pemerintahan.repository';
import { AppError } from '../middlewares/error.middleware';
import {
  UpdateWilayahInput,
  PerangkatInput,
  UpdatePerangkatInput,
} from '../validators/pemerintahan.validator';
import { DEFAULT_PERANGKAT, DEFAULT_WILAYAH } from '../data/modul-defaults';

async function ensureData() {
  let wilayah = await pemerintahanRepository.getWilayah();
  if (!wilayah) {
    wilayah = await pemerintahanRepository.createWilayah(DEFAULT_WILAYAH);
  }
  let perangkat = await pemerintahanRepository.findPerangkat();
  if (perangkat.length === 0) {
    for (const p of DEFAULT_PERANGKAT) {
      await pemerintahanRepository.createPerangkat(p);
    }
    perangkat = await pemerintahanRepository.findPerangkat();
  }
  return { wilayah, perangkat };
}

export const pemerintahanService = {
  async getPublic() {
    return ensureData();
  },

  async updateWilayah(input: UpdateWilayahInput) {
    const { wilayah } = await ensureData();
    return pemerintahanRepository.updateWilayah(wilayah!.id, input);
  },

  async createPerangkat(input: PerangkatInput) {
    return pemerintahanRepository.createPerangkat({
      ...input,
      fotoUrl: input.fotoUrl || null,
    });
  },

  async updatePerangkat(id: string, input: UpdatePerangkatInput) {
    const item = await pemerintahanRepository.findPerangkatById(id);
    if (!item) throw new AppError(404, 'Perangkat tidak ditemukan');
    return pemerintahanRepository.updatePerangkat(id, {
      ...input,
      fotoUrl: input.fotoUrl === '' ? null : input.fotoUrl,
    });
  },

  async deletePerangkat(id: string) {
    const item = await pemerintahanRepository.findPerangkatById(id);
    if (!item) throw new AppError(404, 'Perangkat tidak ditemukan');
    return pemerintahanRepository.deletePerangkat(id);
  },
};
