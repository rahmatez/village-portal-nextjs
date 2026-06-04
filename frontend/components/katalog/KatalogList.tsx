'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { produkApi, formatRupiah } from '@/lib/api';

export function KatalogList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['produk', 'all'],
    queryFn: async () => {
      const res = await produkApi.list();
      return res.data.data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center text-slate-500">Memuat katalog produk...</div>
    );
  }

  if (isError) {
    return (
      <div className="card py-12 text-center text-slate-600">
        Gagal memuat katalog. Pastikan server API berjalan.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="card py-12 text-center text-slate-500">
        Belum ada produk UMKM yang dipublikasikan.
      </div>
    );
  }

  const produk = data;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {produk.map((item) => (
        <article key={item.id} className="card overflow-hidden p-0">
          <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            ) : (
              <Package className="h-14 w-14 text-primary-400" />
            )}
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-primary-800">{item.name}</h3>
            {item.description && (
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            )}
            <p className="mt-3 text-lg font-bold text-accent-red">
              {formatRupiah(item.price)}
            </p>
            {'ownerName' in item && item.ownerName && (
              <p className="mt-2 text-sm text-slate-600">Penjual: {item.ownerName}</p>
            )}
            {'contact' in item && item.contact && (
              <a
                href={`https://wa.me/${String(item.contact).replace(/\D/g, '')}`}
                className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi via WhatsApp
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
