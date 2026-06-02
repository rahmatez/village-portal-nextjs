import { Prisma } from '@prisma/client';

export const DEFAULT_WILAYAH = {
  luasWilayah: '1.245 Ha',
  jumlahDusun: 4,
  totalRw: 12,
  totalRt: 48,
  daftarDusun: ['Dusun Krajan', 'Dusun Wetan', 'Dusun Kulon', 'Dusun Lor'],
};

export const DEFAULT_PERANGKAT = [
  { nama: 'Sutrisno, S.Sos.', jabatan: 'Kepala Desa', orderPriority: 1 },
  { nama: 'Wulan Dariyanti, S.AP.', jabatan: 'Sekretaris Desa', orderPriority: 2 },
  { nama: 'Agus Prasetyo', jabatan: 'Kasi Pemerintahan', orderPriority: 3 },
  { nama: 'Rina Marlina', jabatan: 'Kasi Kesejahteraan', orderPriority: 4 },
  { nama: 'Hendra Wijaya', jabatan: 'Kasi Pelayanan', orderPriority: 5 },
  { nama: 'Dian Permatasari', jabatan: 'Kaur Keuangan', orderPriority: 6 },
  { nama: 'Joko Susilo', jabatan: 'Kaur Umum', orderPriority: 7 },
  { nama: 'Sri Wahyuni', jabatan: 'Kaur Perencanaan', orderPriority: 8 },
];

export const DEFAULT_GALLERY = [
  {
    fotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=800',
    format: 'image/jpeg',
    altText: 'Panorama sawah Desa Mindaka',
    width: 800,
    height: 533,
  },
  {
    fotoUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    format: 'image/jpeg',
    altText: 'Kegiatan gotong royong warga',
    width: 800,
    height: 533,
  },
  {
    fotoUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
    format: 'image/jpeg',
    altText: 'Balai desa dan pelayanan publik',
    width: 800,
    height: 533,
  },
];

export function buildApb2025(): Prisma.ApbDesaCreateInput {
  return {
    tahun: 2025,
    totalPendapatan: 2850000000,
    totalBelanja: 2720000000,
    pembiayaan: 45000000,
    silpa: 175000000,
    pendapatan: {
      create: [
        { namaPos: 'PADes', nominal: 185000000 },
        { namaPos: 'Dana Desa', nominal: 980000000 },
        { namaPos: 'ADD (Alokasi Dana Desa)', nominal: 1120000000 },
        { namaPos: 'Bantuan Keuangan APBD Kab/Kota', nominal: 320000000 },
        { namaPos: 'Lain-lain Pendapatan', nominal: 245000000 },
      ],
    },
    belanja: {
      create: [
        { namaBidang: 'Bidang Penyelenggaraan Pemerintahan Desa', nominal: 680000000, persentase: 25 },
        { namaBidang: 'Bidang Pelaksanaan Pembangunan Desa', nominal: 1088000000, persentase: 40 },
        { namaBidang: 'Bidang Pembinaan Kemasyarakatan', nominal: 408000000, persentase: 15 },
        { namaBidang: 'Bidang Pemberdayaan Masyarakat', nominal: 326400000, persentase: 12 },
        { namaBidang: 'Bidang Penanggulangan Bencana', nominal: 217600000, persentase: 8 },
      ],
    },
  };
}

export function buildApb2024(): Prisma.ApbDesaCreateInput {
  return {
    tahun: 2024,
    totalPendapatan: 2620000000,
    totalBelanja: 2510000000,
    pembiayaan: 40000000,
    silpa: 110000000,
    pendapatan: {
      create: [
        { namaPos: 'PADes', nominal: 165000000 },
        { namaPos: 'Dana Desa', nominal: 920000000 },
        { namaPos: 'ADD', nominal: 1050000000 },
        { namaPos: 'Bantuan APBD', nominal: 295000000 },
        { namaPos: 'Lain-lain', nominal: 190000000 },
      ],
    },
    belanja: {
      create: [
        { namaBidang: 'Penyelenggaraan Pemerintahan Desa', nominal: 627500000, persentase: 25 },
        { namaBidang: 'Pelaksanaan Pembangunan Desa', nominal: 1004000000, persentase: 40 },
        { namaBidang: 'Pembinaan Kemasyarakatan', nominal: 376500000, persentase: 15 },
        { namaBidang: 'Pemberdayaan Masyarakat', nominal: 301200000, persentase: 12 },
        { namaBidang: 'Penanggulangan Bencana', nominal: 200800000, persentase: 8 },
      ],
    },
  };
}

export const DEFAULT_GEOGRAFIS = {
  koordinat: '-6.9123, 109.1456',
  ketinggian: '15–120 mdpl',
  kodepos: '52193',
  kodeKemendagri: '33.28.11.2005',
  batasUtara: 'Desa Sukamaju',
  batasTimur: 'Sungai Mindaka',
  batasSelatan: 'Desa Harapan Jaya',
  batasBarat: 'Hutan Lindung Mindaka',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d109.1456!3d-6.9123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnNDQuMyJTIDEwOcKwMDgnNDQuMiJF!5e0!3m2!1sid!2sid!4v1',
  dusun: {
    create: [
      {
        namaDusun: 'Dusun Krajan',
        deskripsiZona: 'Pusat pemerintahan dan pasar desa',
        koordinatDusun: '-6.9110, 109.1440',
        titikPenting: ['Balai Desa', 'Pasar Mindaka'],
        urutan: 0,
      },
      {
        namaDusun: 'Dusun Wetan',
        deskripsiZona: 'Kawasan pertanian dan perikanan',
        koordinatDusun: '-6.9135, 109.1480',
        titikPenting: ['Tambak warga', 'Embung irigasi'],
        urutan: 1,
      },
      {
        namaDusun: 'Dusun Kulon',
        deskripsiZona: 'Permukiman padat dengan akses jalan desa',
        koordinatDusun: '-6.9145, 109.1425',
        titikPenting: ['Masjid Al-Ikhlas', 'Posyandu Melati'],
        urutan: 2,
      },
      {
        namaDusun: 'Dusun Lor',
        deskripsiZona: 'Zona perbatasan hutan lindung',
        koordinatDusun: '-6.9095, 109.1410',
        titikPenting: ['Hutan lindung', 'Gardu listrik'],
        urutan: 3,
      },
    ],
  },
  jarakAkses: {
    create: [
      { destinasi: 'Kecamatan Tarub', jarakKm: 8.5, urutan: 0 },
      { destinasi: 'Kabupaten Tegal', jarakKm: 22.0, urutan: 1 },
      { destinasi: 'RSUD Terdekat', jarakKm: 15.3, urutan: 2 },
      { destinasi: 'Pasar Induk', jarakKm: 6.2, urutan: 3 },
      { destinasi: 'Pelabuhan Perikanan', jarakKm: 11.8, urutan: 4 },
    ],
  },
};

export const DEFAULT_POSTS = [
  {
    judul: 'Desa Mindaka Raih Penghargaan Desa Terang 2025',
    slug: 'desa-mindaka-raih-penghargaan-desa-terang-2025',
    excerpt:
      'Pemerintah desa berhasil meningkatkan penerangan jalan umum dan fasilitas publik berbasis energi hemat.',
    konten:
      'Desa Mindaka secara resmi menerima penghargaan Desa Terang tingkat kabupaten atas komitmen peningkatan infrastruktur penerangan jalan umum dan fasilitas publik.\n\nKepala Desa menyampaikan apresiasi kepada seluruh warga dan perangkat desa yang telah berpartisipasi aktif dalam program tersebut.',
    waktuBaca: 4,
    status: 'published',
  },
  {
    judul: 'Festival UMKM Mindaka Sukses Digelar',
    slug: 'festival-umkm-mindaka-2025',
    excerpt: 'Puluhan produk lokal dipamerkan di halaman balai desa selama tiga hari.',
    konten:
      'Festival UMKM Desa Mindaka menghadirkan produk unggulan warga mulai dari keripik singkong, madu hutan, hingga anyaman eceng gondok.\n\nKegiatan ini menjadi ajang promosi ekonomi kreatif sekaligus mempererat silaturahmi antarwarga.',
    waktuBaca: 3,
    status: 'published',
  },
];
