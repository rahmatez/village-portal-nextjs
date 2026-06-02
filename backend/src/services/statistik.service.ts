import { statistikRepository } from '../repositories/statistik.repository';
import { AppError } from '../middlewares/error.middleware';
import { UpdateStatistikInput } from '../validators/statistik.validator';

const DEFAULT_STATISTIK = {
  jumlahPenduduk: 4521,
  jumlahKK: 1287,
  jumlahDusun: 4,
  statusIDM: 'Desa Maju',
  skorIKS: 0.72,
  skorIKE: 0.68,
  skorIKL: 0.75,
  jumlahTokoUMKM: 24,
  ppidResponHari: 3,
  ppidKepuasan: 87.5,
  ppidEmail: 'ppid@desamindaka.go.id',
  visi:
    'Terwujudnya masyarakat Desa Mindaka yang sejahtera, mandiri, dan berkeadilan melalui pembangunan berkelanjutan.',
  misi: [
    'Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel.',
    'Mengembangkan potensi ekonomi lokal berbasis UMKM dan pertanian.',
    'Memperkuat tata kelola pemerintahan desa yang partisipatif.',
    'Meningkatkan akses pendidikan dan kesehatan bagi seluruh warga.',
    'Memelihara kelestarian lingkungan hidup dan budaya lokal.',
    'Memperluas infrastruktur desa yang mendukung produktivitas warga.',
    'Mendorong pemberdayaan perempuan dan kelompok rentan.',
    'Meningkatkan kemandirian pangan dan ketahanan sosial desa.',
    'Memperkuat sinergi dengan pemangku kepentingan pembangunan.',
  ],
};

export const statistikService = {
  async getPublic() {
    let data = await statistikRepository.getLatest();
    if (!data) {
      data = await statistikRepository.create(DEFAULT_STATISTIK);
    }
    return data;
  },

  async update(input: UpdateStatistikInput) {
    let data = await statistikRepository.getLatest();
    if (!data) {
      return statistikRepository.create({ ...DEFAULT_STATISTIK, ...input });
    }
    return statistikRepository.update(data.id, {
      ...input,
      ppidEmail: input.ppidEmail === '' ? null : input.ppidEmail,
    });
  },
};
