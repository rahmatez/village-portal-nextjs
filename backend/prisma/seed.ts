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
