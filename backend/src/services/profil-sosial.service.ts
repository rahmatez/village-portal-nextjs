import { profilSosialRepository } from '../repositories/profil-sosial.repository';
import {
  UpdateKependudukanInput,
  ReplaceDemografiInput,
  ReplaceFasilitasInput,
  ReplaceMataPencaharianInput,
} from '../validators/profil-sosial.validator';

const DEFAULT_KEPENDUDUKAN = {
  jumlahPendudukTotal: 4521,
  jumlahLakiLaki: 2280,
  jumlahPerempuan: 2241,
  persenUsiaProduktif: 62.4,
  persenLansia: 11.8,
  sumberPendapatan: [
    'PADes (Pendapatan Asli Desa)',
    'Dana Desa',
    'Bantuan keuangan dari APBD Kabupaten/Kota',
    'Bantuan keuangan dari APBD Provinsi',
    'Bantuan keuangan dari APBN',
    'Bagian dari hasil pajak dan retribusi',
  ],
  asetDesa: [
    'Tanah kas desa',
    'Gedung balai desa',
    'Peralatan kantor desa',
    'Kendaraan operasional desa',
    'Aset infrastruktur irigasi',
  ],
};

const DEFAULT_DEMOGRAFI: ReplaceDemografiInput['items'] = [
  { jenis: 'JENIS_KELAMIN', kelompok: 'Laki-laki', persentase: 50.4, jumlah: 2280, urutan: 0 },
  { jenis: 'JENIS_KELAMIN', kelompok: 'Perempuan', persentase: 49.6, jumlah: 2241, urutan: 1 },
  { jenis: 'UMUR', kelompok: '0–4 tahun', persentase: 8.2, jumlah: 371, urutan: 0 },
  { jenis: 'UMUR', kelompok: '5–9 tahun', persentase: 9.1, jumlah: 411, urutan: 1 },
  { jenis: 'UMUR', kelompok: '10–14 tahun', persentase: 8.5, jumlah: 384, urutan: 2 },
  { jenis: 'UMUR', kelompok: '15–19 tahun', persentase: 9.8, jumlah: 443, urutan: 3 },
  { jenis: 'UMUR', kelompok: '20–24 tahun', persentase: 10.2, jumlah: 461, urutan: 4 },
  { jenis: 'UMUR', kelompok: '25–29 tahun', persentase: 9.5, jumlah: 429, urutan: 5 },
  { jenis: 'UMUR', kelompok: '30–34 tahun', persentase: 8.7, jumlah: 393, urutan: 6 },
  { jenis: 'UMUR', kelompok: '35–39 tahun', persentase: 7.9, jumlah: 357, urutan: 7 },
  { jenis: 'UMUR', kelompok: '40–44 tahun', persentase: 7.2, jumlah: 325, urutan: 8 },
  { jenis: 'UMUR', kelompok: '45–49 tahun', persentase: 6.5, jumlah: 294, urutan: 9 },
  { jenis: 'UMUR', kelompok: '50–54 tahun', persentase: 5.8, jumlah: 262, urutan: 10 },
  { jenis: 'UMUR', kelompok: '55–59 tahun', persentase: 4.2, jumlah: 190, urutan: 11 },
  { jenis: 'UMUR', kelompok: '60+ tahun (Lansia)', persentase: 4.4, jumlah: 201, urutan: 12 },
  { jenis: 'PENDIDIKAN', kelompok: 'Tidak/Belum Sekolah', persentase: 4.2, jumlah: 190, urutan: 0 },
  { jenis: 'PENDIDIKAN', kelompok: 'Tamat SD/Sederajat', persentase: 38.5, jumlah: 1741, urutan: 1 },
  { jenis: 'PENDIDIKAN', kelompok: 'Tamat SMP/Sederajat', persentase: 28.3, jumlah: 1279, urutan: 2 },
  { jenis: 'PENDIDIKAN', kelompok: 'Tamat SMA/Sederajat', persentase: 22.1, jumlah: 999, urutan: 3 },
  { jenis: 'PENDIDIKAN', kelompok: 'Diploma/Sarjana', persentase: 6.9, jumlah: 312, urutan: 4 },
];

const DEFAULT_FASILITAS: ReplaceFasilitasInput['items'] = [
  { tipe: 'KESEHATAN', nama: 'Posyandu', jumlah: 4, urutan: 0 },
  { tipe: 'KESEHATAN', nama: 'Polindes', jumlah: 1, urutan: 1 },
  { tipe: 'KESEHATAN', nama: 'Bidan Desa', jumlah: 2, keterangan: 'Puskesmas pembantu', urutan: 2 },
  { tipe: 'KESEHATAN', nama: 'Pos Kesehatan Desa (PKD)', jumlah: 1, urutan: 3 },
  { tipe: 'PENDIDIKAN', nama: 'PAUD/TK', jumlah: 3, urutan: 0 },
  { tipe: 'PENDIDIKAN', nama: 'SD/MI', jumlah: 2, urutan: 1 },
  { tipe: 'PENDIDIKAN', nama: 'SMP/MTs', jumlah: 1, urutan: 2 },
  { tipe: 'PENDIDIKAN', nama: 'Perpustakaan Desa', jumlah: 1, urutan: 3 },
  { tipe: 'UMUM', nama: 'Masjid/Mushola', jumlah: 6, urutan: 0 },
  { tipe: 'UMUM', nama: 'Gedung Serbaguna (Balai Desa)', jumlah: 1, urutan: 1 },
  { tipe: 'UMUM', nama: 'Lapangan Olahraga', jumlah: 2, urutan: 2 },
  { tipe: 'UMUM', nama: 'Pasar Desa', jumlah: 1, urutan: 3 },
];

const DEFAULT_MATA_PENCAHARIAN: ReplaceMataPencaharianInput['items'] = [
  { namaProfesi: 'Karyawan Swasta', jumlah: 1240, persentase: 27.4, urutan: 0 },
  { namaProfesi: 'Petani/Pekebun', jumlah: 980, persentase: 21.7, urutan: 1 },
  { namaProfesi: 'Wiraswasta', jumlah: 720, persentase: 15.9, urutan: 2 },
  { namaProfesi: 'Buruh Harian Lepas', jumlah: 540, persentase: 11.9, urutan: 3 },
  { namaProfesi: 'Nelayan', jumlah: 310, persentase: 6.9, urutan: 4 },
  { namaProfesi: 'PNS/TNI/Polri', jumlah: 185, persentase: 4.1, urutan: 5 },
  { namaProfesi: 'Pedagang', jumlah: 168, persentase: 3.7, urutan: 6 },
  { namaProfesi: 'Guru/Honorer', jumlah: 142, persentase: 3.1, urutan: 7 },
  { namaProfesi: 'Lainnya', jumlah: 236, persentase: 5.3, urutan: 8 },
];

async function ensureDefaults() {
  let kependudukan = await profilSosialRepository.getKependudukan();
  if (!kependudukan) {
    kependudukan = await profilSosialRepository.createKependudukan(DEFAULT_KEPENDUDUKAN);
  }

  let demografi = await profilSosialRepository.findDemografi();
  if (demografi.length === 0) {
    await profilSosialRepository.replaceDemografi(DEFAULT_DEMOGRAFI);
    demografi = await profilSosialRepository.findDemografi();
  }

  let fasilitas = await profilSosialRepository.findFasilitas();
  if (fasilitas.length === 0) {
    await profilSosialRepository.replaceFasilitas(DEFAULT_FASILITAS);
    fasilitas = await profilSosialRepository.findFasilitas();
  }

  let mataPencaharian = await profilSosialRepository.findMataPencaharian();
  if (mataPencaharian.length === 0) {
    await profilSosialRepository.replaceMataPencaharian(DEFAULT_MATA_PENCAHARIAN);
    mataPencaharian = await profilSosialRepository.findMataPencaharian();
  }

  return { kependudukan, demografi, fasilitas, mataPencaharian };
}

export const profilSosialService = {
  async getAll() {
    const data = await ensureDefaults();
    return {
      kependudukan: data.kependudukan,
      demografi: {
        jenisKelamin: data.demografi.filter((d) => d.jenis === 'JENIS_KELAMIN'),
        umur: data.demografi.filter((d) => d.jenis === 'UMUR'),
        pendidikan: data.demografi.filter((d) => d.jenis === 'PENDIDIKAN'),
      },
      fasilitas: {
        kesehatan: data.fasilitas.filter((f) => f.tipe === 'KESEHATAN'),
        pendidikan: data.fasilitas.filter((f) => f.tipe === 'PENDIDIKAN'),
        umum: data.fasilitas.filter((f) => f.tipe === 'UMUM'),
      },
      mataPencaharian: data.mataPencaharian,
    };
  },

  async updateKependudukan(input: UpdateKependudukanInput) {
    let record = await profilSosialRepository.getKependudukan();
    if (!record) {
      return profilSosialRepository.createKependudukan({ ...DEFAULT_KEPENDUDUKAN, ...input });
    }
    return profilSosialRepository.updateKependudukan(record.id, input);
  },

  async replaceDemografi(input: ReplaceDemografiInput) {
    await profilSosialRepository.replaceDemografi(input.items);
    return profilSosialRepository.findDemografi();
  },

  async replaceFasilitas(input: ReplaceFasilitasInput) {
    await profilSosialRepository.replaceFasilitas(input.items);
    return profilSosialRepository.findFasilitas();
  },

  async replaceMataPencaharian(input: ReplaceMataPencaharianInput) {
    await profilSosialRepository.replaceMataPencaharian(input.items);
    return profilSosialRepository.findMataPencaharian();
  },
};
