'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Store, ArrowRight, Package } from 'lucide-react';
import { produkApi, formatRupiah } from '@/lib/api';
import { statistikApi } from '@/lib/api';

export function KatalogPreview() {
  const { data: produkRes, isLoading } = useQuery({
    queryKey: ['produk', 'preview'],
    queryFn: async () => {
      const res = await produkApi.list(3);
      return res.data.data;
    },
  });

  const { data: statRes } = useQuery({
    queryKey: ['statistik'],
    queryFn: async () => {
      const res = await statistikApi.get();
      return res.data.data;
    },
  });

  const produk = produkRes ?? [];
  const jumlahToko = statRes?.jumlahTokoUMKM ?? 0;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="section-title">Katalog UMKM</h2>
            <p className="section-subtitle">Produk unggulan warga Desa Mindaka</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-4 py-2 text-primary-800">
            <Store className="h-5 w-5" />
            <span className="font-semibold">{jumlahToko} Toko UMKM Terdaftar</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <p className="col-span-full text-center text-slate-500">Memuat produk...</p>
          )}
          {!isLoading && produk.length === 0 && (
            <p className="col-span-full text-center text-slate-500">
              Belum ada produk UMKM. Kelola di dashboard admin.
            </p>
          )}
          {produk.map((item) => (
            <article key={item.id} className="card overflow-hidden p-0">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                <Package className="h-16 w-16 text-primary-400" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-primary-800">{item.name}</h3>
                {'description' in item && item.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</p>
                )}
                <p className="mt-3 text-lg font-bold text-accent-red">
                  {formatRupiah(item.price)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/katalog" className="btn-primary">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Lihat Semua Produk
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
