import api from '../axios';
import type { ApiResponse } from '../api';

export interface Kependudukan {
  id: string;
  jumlahPendudukTotal: number;
  jumlahLakiLaki: number;
  jumlahPerempuan: number;
  persenUsiaProduktif: number;
  persenLansia: number;
  sumberPendapatan: string[];
  asetDesa: string[];
}

export interface DemografiItem {
  id: string;
  jenis: 'UMUR' | 'JENIS_KELAMIN' | 'PENDIDIKAN';
  kelompok: string;
  persentase: number;
  jumlah: number | null;
  urutan: number;
}

export interface FasilitasItem {
  id: string;
  tipe: 'KESEHATAN' | 'PENDIDIKAN' | 'UMUM';
  nama: string;
  jumlah: number;
  keterangan: string | null;
  urutan: number;
}

export interface MataPencaharianItem {
  id: string;
  namaProfesi: string;
  jumlah: number;
  persentase: number;
  urutan: number;
}

export interface ProfilSosialData {
  kependudukan: Kependudukan;
  demografi: {
    jenisKelamin: DemografiItem[];
    umur: DemografiItem[];
    pendidikan: DemografiItem[];
  };
  fasilitas: {
    kesehatan: FasilitasItem[];
    pendidikan: FasilitasItem[];
    umum: FasilitasItem[];
  };
  mataPencaharian: MataPencaharianItem[];
}

export const profilSosialApi = {
  getAll: () => api.get<ApiResponse<ProfilSosialData>>('/profil-sosial'),
  updateKependudukan: (payload: {
    jumlahPendudukTotal: number;
    jumlahLakiLaki: number;
    jumlahPerempuan: number;
    persenUsiaProduktif: number;
    persenLansia: number;
    sumberPendapatan?: string[];
    asetDesa?: string[];
  }) => api.put<ApiResponse<Kependudukan>>('/profil-sosial/kependudukan', payload),
  replaceDemografi: (items: Array<{
    jenis: 'UMUR' | 'JENIS_KELAMIN' | 'PENDIDIKAN';
    kelompok: string;
    persentase: number;
    jumlah?: number;
    urutan?: number;
  }>) => api.put<ApiResponse<DemografiItem[]>>('/profil-sosial/demografi', { items }),
  replaceFasilitas: (items: Array<{
    tipe: 'KESEHATAN' | 'PENDIDIKAN' | 'UMUM';
    nama: string;
    jumlah: number;
    keterangan?: string;
    urutan?: number;
  }>) => api.put<ApiResponse<FasilitasItem[]>>('/profil-sosial/fasilitas', { items }),
  replaceMataPencaharian: (items: Array<{
    namaProfesi: string;
    jumlah: number;
    persentase: number;
    urutan?: number;
  }>) =>
    api.put<ApiResponse<MataPencaharianItem[]>>('/profil-sosial/mata-pencaharian', { items }),
};
