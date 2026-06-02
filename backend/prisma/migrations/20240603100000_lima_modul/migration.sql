-- CreateTable
CREATE TABLE "WilayahDesa" (
    "id" TEXT NOT NULL,
    "luasWilayah" TEXT NOT NULL,
    "jumlahDusun" INTEGER NOT NULL DEFAULT 0,
    "totalRw" INTEGER NOT NULL DEFAULT 0,
    "totalRt" INTEGER NOT NULL DEFAULT 0,
    "daftarDusun" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WilayahDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerangkatDesa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "orderPriority" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PerangkatDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'image/jpeg',
    "altText" TEXT,
    "tanggalUnggah" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApbDesa" (
    "id" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "totalPendapatan" DECIMAL(16,2) NOT NULL,
    "totalBelanja" DECIMAL(16,2) NOT NULL,
    "pembiayaan" DECIMAL(16,2) NOT NULL,
    "silpa" DECIMAL(16,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ApbDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPendapatan" (
    "id" TEXT NOT NULL,
    "apbId" TEXT NOT NULL,
    "namaPos" TEXT NOT NULL,
    "nominal" DECIMAL(16,2) NOT NULL,
    CONSTRAINT "DetailPendapatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailBelanja" (
    "id" TEXT NOT NULL,
    "apbId" TEXT NOT NULL,
    "namaBidang" TEXT NOT NULL,
    "nominal" DECIMAL(16,2) NOT NULL,
    "persentase" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "DetailBelanja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeografisSpasial" (
    "id" TEXT NOT NULL,
    "koordinat" TEXT NOT NULL,
    "ketinggian" TEXT NOT NULL,
    "kodepos" TEXT NOT NULL,
    "kodeKemendagri" TEXT NOT NULL,
    "batasUtara" TEXT NOT NULL,
    "batasTimur" TEXT NOT NULL,
    "batasSelatan" TEXT NOT NULL,
    "batasBarat" TEXT NOT NULL,
    "googleMapsEmbedUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GeografisSpasial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailDusunSpasial" (
    "id" TEXT NOT NULL,
    "geografisId" TEXT NOT NULL,
    "namaDusun" TEXT NOT NULL,
    "deskripsiZona" TEXT,
    "koordinatDusun" TEXT,
    "titikPenting" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "urutan" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DetailDusunSpasial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JarakAkses" (
    "id" TEXT NOT NULL,
    "geografisId" TEXT NOT NULL,
    "destinasi" TEXT NOT NULL,
    "jarakKm" DOUBLE PRECISION NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "JarakAkses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "excerpt" TEXT,
    "fotoSampul" TEXT,
    "tanggalRilis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "waktuBaca" INTEGER NOT NULL DEFAULT 5,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PerangkatDesa_orderPriority_idx" ON "PerangkatDesa"("orderPriority");
CREATE UNIQUE INDEX "ApbDesa_tahun_key" ON "ApbDesa"("tahun");
CREATE INDEX "DetailPendapatan_apbId_idx" ON "DetailPendapatan"("apbId");
CREATE INDEX "DetailBelanja_apbId_idx" ON "DetailBelanja"("apbId");
CREATE INDEX "DetailDusunSpasial_geografisId_idx" ON "DetailDusunSpasial"("geografisId");
CREATE INDEX "JarakAkses_geografisId_idx" ON "JarakAkses"("geografisId");
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
CREATE INDEX "Post_slug_idx" ON "Post"("slug");
CREATE INDEX "Post_status_idx" ON "Post"("status");
CREATE INDEX "Post_tanggalRilis_idx" ON "Post"("tanggalRilis");
CREATE INDEX "Gallery_tanggalUnggah_idx" ON "Gallery"("tanggalUnggah");

-- AddForeignKey
ALTER TABLE "DetailPendapatan" ADD CONSTRAINT "DetailPendapatan_apbId_fkey" FOREIGN KEY ("apbId") REFERENCES "ApbDesa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DetailBelanja" ADD CONSTRAINT "DetailBelanja_apbId_fkey" FOREIGN KEY ("apbId") REFERENCES "ApbDesa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DetailDusunSpasial" ADD CONSTRAINT "DetailDusunSpasial_geografisId_fkey" FOREIGN KEY ("geografisId") REFERENCES "GeografisSpasial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JarakAkses" ADD CONSTRAINT "JarakAkses_geografisId_fkey" FOREIGN KEY ("geografisId") REFERENCES "GeografisSpasial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
