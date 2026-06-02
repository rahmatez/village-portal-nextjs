'use client';

import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import { produkApi, formatRupiah } from '@/lib/api';

const fallbackProduk = [
  {
    id: '1',
    name: 'Keripik Singkong Pedas',
    description: 'Camilan tradisional olahan singkong lokal.',
    price: 15000,
    ownerName: 'Ibu Siti',
    contact: '081234567890',
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Madu Hutan Mindaka',
    description: 'Madu murni dari lebah hutan sekitar desa.',
    price: 75000,
    ownerName: 'Pak Budi',
    contact: '081298765432',
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Anyaman Eceng Gondok',
    description: 'Tas dan keranjang anyaman tangan warga.',
    price: 45000,
    ownerName: 'Kelompok Wanita Tani',
    contact: '081276543210',
    imageUrl: null,
  },
];

export function KatalogList() {
  const { data, isLoading } = useQuery({
    queryKey: ['produk', 'all'],
    queryFn: async () => {
      const res = await produkApi.list();
      return res.data.data;
    },
  });

  const produk = data?.length ? data : fallbackProduk;

  if (isLoading) {
    return (
      <div className="py-12 text-center text-slate-500">Memuat katalog produk...</div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {produk.map((item) => (
        <article key={item.id} className="card overflow-hidden p-0">
          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <Package className="h-14 w-14 text-primary-400" />
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
