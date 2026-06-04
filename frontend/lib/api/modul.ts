import api from '../axios';
import type { ApiResponse } from '../api';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface WilayahDesa {
  id: string;
  luasWilayah: string;
  jumlahDusun: number;
  totalRw: number;
  totalRt: number;
  daftarDusun: string[];
}

export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  fotoUrl: string | null;
  orderPriority: number;
}

export interface GalleryItem {
  id: string;
  fotoUrl: string;
  format: string;
  altText: string | null;
  tanggalUnggah: string;
  width: number | null;
  height: number | null;
}

export interface ApbDesa {
  id: string;
  tahun: number;
  totalPendapatan: string | number;
  totalBelanja: string | number;
  pembiayaan: string | number;
  silpa: string | number;
  pendapatan: { id: string; namaPos: string; nominal: string | number }[];
  belanja: { id: string; namaBidang: string; nominal: string | number; persentase: number }[];
}

export interface GeografisSpasial {
  id: string;
  koordinat: string;
  ketinggian: string;
  kodepos: string;
  kodeKemendagri: string;
  batasUtara: string;
  batasTimur: string;
  batasSelatan: string;
  batasBarat: string;
  googleMapsEmbedUrl: string | null;
  dusun: {
    id: string;
    namaDusun: string;
    deskripsiZona: string | null;
    koordinatDusun: string | null;
    titikPenting: string[];
  }[];
  jarakAkses: { id: string; destinasi: string; jarakKm: number }[];
}

export interface Post {
  id: string;
  judul: string;
  slug: string;
  konten: string;
  excerpt: string | null;
  fotoSampul: string | null;
  tanggalRilis: string;
  waktuBaca: number;
  status: string;
}

export interface ProdukItem {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  imageUrl: string | null;
  ownerName: string | null;
  contact: string | null;
  isActive?: boolean;
}

export interface PengaduanItem {
  id: string;
  ticketCode: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: 'PENDING' | 'DIPROSES' | 'SELESAI' | 'DITOLAK';
  response: string | null;
  createdAt: string;
  handledBy?: { id: string; name: string } | null;
}

export function formatRupiahShort(value: string | number): string {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(2)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)} Jt`;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export const pemerintahanApi = {
  get: () => api.get<ApiResponse<{ wilayah: WilayahDesa; perangkat: PerangkatDesa[] }>>('/pemerintahan'),
  updateWilayah: (payload: {
    luasWilayah: string;
    jumlahDusun: number;
    totalRw: number;
    totalRt: number;
    daftarDusun: string[];
  }) => api.put<ApiResponse<WilayahDesa>>('/pemerintahan/wilayah', payload),
  createPerangkat: (payload: {
    nama: string;
    jabatan: string;
    fotoUrl?: string;
    orderPriority?: number;
  }) => api.post<ApiResponse<PerangkatDesa>>('/pemerintahan/perangkat', payload),
  updatePerangkat: (
    id: string,
    payload: Partial<{ nama: string; jabatan: string; fotoUrl: string; orderPriority: number }>
  ) => api.put<ApiResponse<PerangkatDesa>>(`/pemerintahan/perangkat/${id}`, payload),
  removePerangkat: (id: string) =>
    api.delete<ApiResponse<{ message: string }>>(`/pemerintahan/perangkat/${id}`),
};

export const galleryApi = {
  list: (params: { page?: number; limit?: number; search?: string }) =>
    api.get<{ success: boolean; items: GalleryItem[]; meta: PaginationMeta }>('/gallery', { params }),
  create: (payload: {
    fotoUrl: string;
    format?: string;
    altText?: string;
    width?: number;
    height?: number;
  }) => api.post<ApiResponse<GalleryItem>>('/gallery', payload),
  update: (
    id: string,
    payload: Partial<{
      fotoUrl: string;
      format: string;
      altText: string;
      width: number;
      height: number;
    }>
  ) => api.put<ApiResponse<GalleryItem>>(`/gallery/${id}`, payload),
  remove: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/gallery/${id}`),
};

export const apbDesaApi = {
  getByTahun: (tahun: number) => api.get<ApiResponse<ApbDesa>>('/apb-desa', { params: { tahun } }),
  listTahun: () =>
    api.get<ApiResponse<{ tahun: number; silpa: string | number; totalPendapatan: string | number; totalBelanja: string | number }[]>>('/apb-desa/tahun'),
  create: (payload: {
    tahun: number;
    totalPendapatan: number;
    totalBelanja: number;
    pembiayaan: number;
    silpa: number;
    pendapatan?: { namaPos: string; nominal: number }[];
    belanja?: { namaBidang: string; nominal: number; persentase: number }[];
  }) => api.post<ApiResponse<ApbDesa>>('/apb-desa', payload),
  update: (
    id: string,
    payload: Partial<{
      tahun: number;
      totalPendapatan: number;
      totalBelanja: number;
      pembiayaan: number;
      silpa: number;
      pendapatan: { namaPos: string; nominal: number }[];
      belanja: { namaBidang: string; nominal: number; persentase: number }[];
    }>
  ) => api.put<ApiResponse<ApbDesa>>(`/apb-desa/${id}`, payload),
  remove: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/apb-desa/${id}`),
};

export const geografisApi = {
  get: () => api.get<ApiResponse<GeografisSpasial>>('/geografis'),
  update: (payload: {
    koordinat?: string;
    ketinggian?: string;
    kodepos?: string;
    kodeKemendagri?: string;
    batasUtara?: string;
    batasTimur?: string;
    batasSelatan?: string;
    batasBarat?: string;
    googleMapsEmbedUrl?: string;
    dusun?: {
      namaDusun: string;
      deskripsiZona?: string;
      koordinatDusun?: string;
      titikPenting?: string[];
      urutan?: number;
    }[];
    jarakAkses?: {
      destinasi: string;
      jarakKm: number;
      urutan?: number;
    }[];
  }) => api.put<ApiResponse<GeografisSpasial>>('/geografis', payload),
};

export const postsApi = {
  list: (params: { page?: number; limit?: number; search?: string }) =>
    api.get<{ success: boolean; data: Post[]; meta: PaginationMeta }>('/posts', { params }),
  listAdmin: (params: { page?: number; limit?: number; search?: string }) =>
    api.get<{ success: boolean; data: Post[]; meta: PaginationMeta }>('/posts/admin', { params }),
  getBySlug: (slug: string) => api.get<ApiResponse<Post>>(`/posts/slug/${slug}`),
  create: (payload: {
    judul: string;
    slug: string;
    konten: string;
    excerpt?: string;
    fotoSampul?: string;
    waktuBaca?: number;
    status?: 'draft' | 'published';
  }) => api.post<ApiResponse<Post>>('/posts', payload),
  update: (
    id: string,
    payload: Partial<{
      judul: string;
      slug: string;
      konten: string;
      excerpt: string;
      fotoSampul: string;
      waktuBaca: number;
      status: 'draft' | 'published';
    }>
  ) => api.put<ApiResponse<Post>>(`/posts/${id}`, payload),
  remove: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/posts/${id}`),
};

export const produkApi = {
  listAdmin: () => api.get<ApiResponse<ProdukItem[]>>('/produk/admin'),
  create: (payload: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    ownerName?: string;
    contact?: string;
    isActive?: boolean;
  }) => api.post<ApiResponse<ProdukItem>>('/produk', payload),
  update: (
    id: string,
    payload: Partial<{
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      ownerName: string;
      contact: string;
      isActive: boolean;
    }>
  ) => api.patch<ApiResponse<ProdukItem>>(`/produk/${id}`, payload),
  remove: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/produk/${id}`),
};

export const pengaduanApi = {
  create: (payload: {
    name: string;
    email?: string;
    phone?: string;
    subject: string;
    message: string;
  }) => api.post<ApiResponse<PengaduanItem>>('/pengaduan', payload),
  getByTicket: (ticket: string) =>
    api.get<ApiResponse<PengaduanItem>>(`/pengaduan/ticket/${encodeURIComponent(ticket)}`),
  listAdmin: () => api.get<ApiResponse<PengaduanItem[]>>('/pengaduan'),
  updateStatus: (
    id: string,
    payload: {
      status: 'PENDING' | 'DIPROSES' | 'SELESAI' | 'DITOLAK';
      response?: string;
    }
  ) => api.patch<ApiResponse<PengaduanItem>>(`/pengaduan/${id}/status`, payload),
};

export const uploadApi = {
  image: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post<ApiResponse<{ url: string; filename: string }>>('/uploads', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  createdAt: string;
};

export const authUsersApi = {
  list: () => api.get<ApiResponse<AdminUser[]>>('/auth/users'),
  register: (payload: {
    email: string;
    password: string;
    name: string;
    role?: 'ADMIN' | 'SUPER_ADMIN';
  }) => api.post<ApiResponse<AdminUser>>('/auth/register', payload),
};
