import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin@12345', 12);

  await prisma.user.upsert({
    where: { email: 'admin@desamindaka.go.id' },
    update: {},
    create: {
      email: 'admin@desamindaka.go.id',
      password,
      name: 'Administrator Desa',
      role: 'SUPER_ADMIN',
    },
  });

  const statistik = await prisma.dataStatistik.findFirst();
  if (!statistik) {
    await prisma.dataStatistik.create({
      data: {
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
        sejarahDesa: `Asal-usul Desa Mindaka bermula dari perkampungan nelayan dan petani yang bermukim di sepanjang aliran Sungai Mindaka pada abad ke-19. Nama "Mindaka" dipercaya berasal dari kata dalam bahasa Jawa kuno yang berarti "sumber kehidupan", mengingat peran sungai sebagai sumber air dan penghidupan masyarakat.

Pada masa kolonial, wilayah ini menjadi bagian dari kecamatan induk dan mulai terorganisasi dalam sistem pemerintahan desa. Setelah kemerdekaan, Desa Mindaka resmi ditetapkan sebagai desa pada tahun 1958 melalui Peraturan Daerah setempat.

Periode 1980–2000 ditandai pembangunan infrastruktur jalan desa, irigasi pertanian, dan pendirian sekolah dasar. Memasuki era reformasi, desa ini menguatkan tata kelola pemerintahan desa, transparansi APB Desa, dan pemberdayaan ekonomi kreatif melalui UMKM.

Hingga kini, Desa Mindaka terus bertransformasi menuju desa maju dengan indeks desa membangun yang meningkat setiap tahun, tanpa melupakan nilai-nilai budaya dan kearifan lokal yang diwariskan generasi ke generasi.`,
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
      },
    });
  }

  const produkCount = await prisma.produkUMKM.count();
  if (produkCount === 0) {
    await prisma.produkUMKM.createMany({
      data: [
        {
          name: 'Keripik Singkong Pedas',
          description: 'Camilan tradisional olahan singkong lokal.',
          price: 15000,
          ownerName: 'Ibu Siti',
          contact: '081234567890',
        },
        {
          name: 'Madu Hutan Mindaka',
          description: 'Madu murni dari lebah hutan sekitar desa.',
          price: 75000,
          ownerName: 'Pak Budi',
          contact: '081298765432',
        },
        {
          name: 'Anyaman Eceng Gondok',
          description: 'Tas dan keranjang anyaman tangan warga.',
          price: 45000,
          ownerName: 'Kelompok Wanita Tani',
          contact: '081276543210',
        },
      ],
    });
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
