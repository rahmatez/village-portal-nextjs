import { DESA_INFO } from './constants';

export const PROFIL_DESA = {
  ringkasan: `${DESA_INFO.name} adalah desa yang terletak di wilayah pedesaan dengan masyarakat yang hidup rukun, gotong royong, dan berorientasi pada pembangunan berkelanjutan. Desa ini memiliki potensi pertanian, perikanan, dan UMKM lokal yang terus dikembangkan oleh pemerintah desa bersama warga.`,
  luasWilayah: '1.245 Ha',
  batasUtara: 'Desa Sukamaju',
  batasSelatan: 'Desa Harapan Jaya',
  batasTimur: 'Sungai Mindaka',
  batasBarat: 'Hutan Lindung Mindaka',
  kodeWilayah: '33.01.12.2005',
};

export const SEJARAH_DESA = `
Asal-usul ${DESA_INFO.name} bermula dari perkampungan nelayan dan petani yang bermukim di sepanjang aliran Sungai Mindaka pada abad ke-19. Nama "Mindaka" dipercaya berasal dari kata dalam bahasa Jawa kuno yang berarti "sumber kehidupan", mengingat peran sungai sebagai sumber air dan penghidupan masyarakat.

Pada masa kolonial, wilayah ini menjadi bagian dari kecamatan induk dan mulai terorganisasi dalam sistem pemerintahan desa. Setelah kemerdekaan, ${DESA_INFO.name} resmi ditetapkan sebagai desa pada tahun 1958 melalui Peraturan Daerah setempat.

Periode 1980–2000 ditandai pembangunan infrastruktur jalan desa, irigasi pertanian, dan pendirian sekolah dasar. Memasuki era reformasi, desa ini menguatkan tata kelola pemerintahan desa, transparansi APB Desa, dan pemberdayaan ekonomi kreatif melalui UMKM.

Hingga kini, ${DESA_INFO.name} terus bertransformasi menuju desa maju dengan indeks desa membangun yang meningkat setiap tahun, tanpa melupakan nilai-nilai budaya dan kearifan lokal yang diwariskan generasi ke generasi.
`.trim();

export const GEOGRAFIS = {
  topografi: 'Topografi desa didominasi dataran rendah hingga perbukitan ringan dengan ketinggian 15–120 mdpl.',
  iklim: 'Iklim tropis dengan curah hujan rata-rata 2.100 mm/tahun dan suhu 26–32°C.',
  sungai: 'Sungai Mindaka mengalir di bagian timur desa dan menjadi sumber irigasi pertanian.',
  potensi: ['Pertanian padi dan palawija', 'Perikanan tambak', 'Kerajinan anyaman', 'Ekowisata sungai'],
};

export const STRUKTUR_PEMERINTAHAN = [
  { jabatan: 'Kepala Desa', nama: 'Bapak Sutrisno, S.Sos.' },
  { jabatan: 'Sekretaris Desa', nama: 'Ibu Wulan Dariyanti, S.AP.' },
  { jabatan: 'Kasi Pemerintahan', nama: 'Bapak Agus Prasetyo' },
  { jabatan: 'Kasi Kesejahteraan', nama: 'Ibu Rina Marlina' },
  { jabatan: 'Kasi Pelayanan', nama: 'Bapak Hendra Wijaya' },
  { jabatan: 'Kaur Keuangan', nama: 'Ibu Dian Permatasari' },
];

export const BPD_ANGGOTA = [
  'Bapak Joko Susilo (Ketua)',
  'Ibu Sri Wahyuni (Wakil Ketua)',
  'Bapak Eko Nugroho',
  'Ibu Ani Lestari',
  'Bapak Bambang Irawan',
  'Ibu Fitri Handayani',
  'Bapak Dwi Cahyono',
];
