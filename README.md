# Portal Resmi Desa Mindaka

Website profil desa + dashboard admin untuk mengelola konten publik (berita, galeri, APB Desa, geografis, pemerintahan, profil sosial, produk UMKM, pengaduan).

## Fitur Utama

- Halaman publik: profil desa, pemerintahan, APB Desa, geografis, galeri, berita, katalog produk, dan pengaduan.
- Dashboard admin lengkap dengan login berbasis cookie HttpOnly + JWT.
- Manajemen konten modular:
  - Berita
  - Galeri
  - APB Desa
  - Geografis
  - Pemerintahan
  - Profil sosial ekonomi
  - Produk UMKM
  - Pengaduan warga
- UI admin sudah dioptimalkan untuk desktop + mobile (hamburger sidebar, konfirmasi aksi, animasi login/logout).

## Stack Teknologi

### Backend (`/backend`)

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT + cookie-parser
- Zod validation

### Frontend (`/frontend`)

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- Lucide Icons

## Struktur Proyek

```text
desa-mindaka/
├── backend/          # API + Prisma + auth + business logic
├── frontend/         # Next.js app (public + admin dashboard)
├── docker-compose.yml
├── promt.md
└── lanjutan.md
```

## Persiapan

- Node.js 18+ (disarankan 20+)
- npm
- PostgreSQL (lokal) atau Docker

## Menjalankan Secara Lokal (Manual)

## 1) Jalankan Backend

```bash
cd backend
npm install
cp .env.example .env
```

Sesuaikan nilai di `.env`:

- `DATABASE_URL`
- `JWT_SECRET` (minimal 32 karakter)
- `CORS_ORIGIN` (default `http://localhost:3000`)

Contoh `DATABASE_URL`:

- Homebrew Postgres (Mac): `postgresql://<username-sistem>@localhost:5432/desa_mindaka?schema=public`
- Docker/local default postgres: `postgresql://postgres:postgres@localhost:5432/desa_mindaka?schema=public`

Lanjutkan:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Backend berjalan di `http://localhost:4000`.

## 2) Jalankan Frontend

```bash
cd frontend
npm install
```

Jika perlu, buat `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Lalu:

```bash
npm run dev
```

Frontend berjalan di `http://localhost:3000`.

## Menjalankan dengan Docker (Backend + DB)

```bash
docker compose up --build
```

Service yang aktif secara default:

- `postgres` pada port `5432`
- `api` pada port `4000`

> Catatan: service frontend di Docker masih dikomentari di `docker-compose.yml`.

## Akun Admin Default (Seed)

- Email: `admin@desamindaka.go.id`
- Password: `Admin@12345`

Diset di `backend/prisma/seed.ts`.

## Scripts Penting

### Backend

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run prisma:studio
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Troubleshooting

- Error Prisma akses DB (`P1010` / denied access):
  - pastikan `DATABASE_URL` sesuai user Postgres yang benar di mesin Anda.
- Build Next.js error random terkait `/_not-found`, `/_document`, atau chunk:
  - hapus cache dan build ulang:
    ```bash
    rm -rf frontend/.next
    npm --prefix frontend run build
    ```

## Fitur Baru (Portal Lengkap)

- **Pengaduan warga**: `/pengaduan` (form) dan `/pengaduan/lacak` (lacak tiket).
- **Upload gambar admin**: unggah foto untuk berita, galeri, dan produk (`POST /api/uploads`).
- **Admin data beranda**: `/admin/statistik` (statistik, IDM, visi-misi, PPID, sejarah).
- **Admin users** (SUPER_ADMIN): `/admin/users`.
- **SEO**: metadata & Open Graph per artikel, `robots.txt`, `sitemap.xml`.
- **Keamanan**: rate limiting login & pengaduan.

## Deploy Produksi

### Backend (Railway / VPS)

1. Set environment: `DATABASE_URL`, `JWT_SECRET` (≥32 karakter), `CORS_ORIGIN` (URL frontend), `COOKIE_SECURE=true`, `API_PUBLIC_URL` (URL publik API, mis. `https://api.desamindaka.go.id`).
2. Jalankan `npx prisma migrate deploy` dan `npx prisma db seed` (sekali).
3. Pastikan folder `uploads/` persisten (volume) agar gambar tidak hilang saat redeploy.
4. Health check: `GET /api/health`.

### Frontend (Vercel)

1. Set `NEXT_PUBLIC_API_URL` ke URL API produksi (dengan `/api`).
2. Set `NEXT_PUBLIC_SITE_URL` ke domain frontend (untuk sitemap).
3. Build command: `npm run build` di folder `frontend`.

## Catatan

- Proyek ini menggunakan cookie auth (`withCredentials: true`) di frontend.
- Pastikan `CORS_ORIGIN` backend sesuai origin frontend saat development.
- Modul berita publik memakai **`/api/posts`** (model `Post`). API `/api/berita` lama tidak lagi dipasang di router.
