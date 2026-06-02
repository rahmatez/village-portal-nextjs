import { geografisRepository } from '../repositories/geografis.repository';
import { UpdateGeografisInput } from '../validators/geografis.validator';
import { DEFAULT_GEOGRAFIS } from '../data/modul-defaults';

async function ensureGeografis() {
  let data = await geografisRepository.getLatest();
  if (!data) {
    data = await geografisRepository.create(DEFAULT_GEOGRAFIS);
  }
  return data;
}

export const geografisService = {
  async getPublic() {
    return ensureGeografis();
  },

  async update(input: UpdateGeografisInput) {
    const current = await ensureGeografis();
    const { dusun, jarakAkses, googleMapsEmbedUrl, ...rest } = input;

    await geografisRepository.update(current.id, {
      ...rest,
      googleMapsEmbedUrl: googleMapsEmbedUrl === '' ? null : googleMapsEmbedUrl,
    });

    if (dusun) {
      await geografisRepository.replaceDusun(
        current.id,
        dusun.map((d, i) => ({
          geografisId: current.id,
          namaDusun: d.namaDusun,
          deskripsiZona: d.deskripsiZona,
          koordinatDusun: d.koordinatDusun,
          titikPenting: d.titikPenting ?? [],
          urutan: d.urutan ?? i,
        }))
      );
    }

    if (jarakAkses) {
      await geografisRepository.replaceJarakAkses(
        current.id,
        jarakAkses.map((j, i) => ({
          geografisId: current.id,
          destinasi: j.destinasi,
          jarakKm: j.jarakKm,
          urutan: j.urutan ?? i,
        }))
      );
    }

    return geografisRepository.getLatest();
  },
};
