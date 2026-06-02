-- CreateEnum
CREATE TYPE "FasilitasTipe" AS ENUM ('KESEHATAN', 'PENDIDIKAN', 'UMUM');

-- CreateEnum
CREATE TYPE "DemografiJenis" AS ENUM ('UMUR', 'JENIS_KELAMIN', 'PENDIDIKAN');

-- CreateTable
CREATE TABLE "Kependudukan" (
    "id" TEXT NOT NULL,
    "jumlahPendudukTotal" INTEGER NOT NULL DEFAULT 0,
    "jumlahLakiLaki" INTEGER NOT NULL DEFAULT 0,
    "jumlahPerempuan" INTEGER NOT NULL DEFAULT 0,
    "persenUsiaProduktif" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "persenLansia" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sumberPendapatan" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "asetDesa" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kependudukan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemografiUmur" (
    "id" TEXT NOT NULL,
    "jenis" "DemografiJenis" NOT NULL DEFAULT 'UMUR',
    "kelompok" TEXT NOT NULL,
    "persentase" DOUBLE PRECISION NOT NULL,
    "jumlah" INTEGER,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemografiUmur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FasilitasDesa" (
    "id" TEXT NOT NULL,
    "tipe" "FasilitasTipe" NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 1,
    "keterangan" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FasilitasDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MataPencaharian" (
    "id" TEXT NOT NULL,
    "namaProfesi" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "persentase" DOUBLE PRECISION NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MataPencaharian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DemografiUmur_jenis_idx" ON "DemografiUmur"("jenis");

-- CreateIndex
CREATE INDEX "FasilitasDesa_tipe_idx" ON "FasilitasDesa"("tipe");
