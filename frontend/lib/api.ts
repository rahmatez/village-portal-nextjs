import api from './axios';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface DataStatistik {
  id: string;
  jumlahPenduduk: number;
  jumlahKK: number;
  jumlahDusun: number;
  statusIDM: string;
  skorIKS: number;
  skorIKE: number;
  skorIKL: number;
  jumlahTokoUMKM: number;
  ppidResponHari: number;
  ppidKepuasan: number;
  ppidEmail: string | null;
  visi: string | null;
  misi: string[];
  sejarahDesa: string | null;
}

export interface ProdukUMKM {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  imageUrl: string | null;
  ownerName: string | null;
  contact: string | null;
}

export const statistikApi = {
  get: () => api.get<ApiResponse<DataStatistik>>('/statistik'),
  update: (payload: Partial<DataStatistik>) =>
    api.patch<ApiResponse<DataStatistik>>('/statistik', payload),
};

export const produkApi = {
  list: (limit?: number) =>
    api.get<ApiResponse<ProdukUMKM[]>>('/produk', { params: { limit } }),
};

export function formatRupiah(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
}
