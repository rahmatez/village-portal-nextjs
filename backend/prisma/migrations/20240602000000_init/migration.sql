-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "PengaduanStatus" AS ENUM ('PENDING', 'DIPROSES', 'SELESAI', 'DITOLAK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdukUMKM" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "imageUrl" TEXT,
    "ownerName" TEXT,
    "contact" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdukUMKM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengaduan" (
    "id" TEXT NOT NULL,
    "ticketCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "PengaduanStatus" NOT NULL DEFAULT 'PENDING',
    "response" TEXT,
    "handledById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengaduan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataStatistik" (
    "id" TEXT NOT NULL,
    "jumlahPenduduk" INTEGER NOT NULL DEFAULT 0,
    "jumlahKK" INTEGER NOT NULL DEFAULT 0,
    "jumlahDusun" INTEGER NOT NULL DEFAULT 0,
    "statusIDM" TEXT NOT NULL DEFAULT 'Desa Maju',
    "skorIKS" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skorIKE" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skorIKL" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jumlahTokoUMKM" INTEGER NOT NULL DEFAULT 0,
    "ppidResponHari" INTEGER NOT NULL DEFAULT 3,
    "ppidKepuasan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ppidEmail" TEXT,
    "visi" TEXT,
    "misi" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataStatistik_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");

-- CreateIndex
CREATE INDEX "Berita_slug_idx" ON "Berita"("slug");

-- CreateIndex
CREATE INDEX "Berita_isPublished_idx" ON "Berita"("isPublished");

-- CreateIndex
CREATE INDEX "ProdukUMKM_isActive_idx" ON "ProdukUMKM"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Pengaduan_ticketCode_key" ON "Pengaduan"("ticketCode");

-- CreateIndex
CREATE INDEX "Pengaduan_status_idx" ON "Pengaduan"("status");

-- CreateIndex
CREATE INDEX "Pengaduan_ticketCode_idx" ON "Pengaduan"("ticketCode");

-- AddForeignKey
ALTER TABLE "Berita" ADD CONSTRAINT "Berita_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengaduan" ADD CONSTRAINT "Pengaduan_handledById_fkey" FOREIGN KEY ("handledById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
