'use client';

import { useQuery } from '@tanstack/react-query';
import { Users, Home, MapPinned, Award } from 'lucide-react';
import { statistikApi } from '@/lib/api';

const fallback = {
  jumlahPenduduk: 4521,
  jumlahKK: 1287,
  jumlahDusun: 4,
  statusIDM: 'Desa Maju',
};

export function StatistikDesa() {
  const { data } = useQuery({
    queryKey: ['statistik'],
    queryFn: async () => {
      const res = await statistikApi.get();
      return res.data.data;
    },
  });

  const stats = data ?? fallback;

  const items = [
    { label: 'Jumlah Penduduk', value: stats.jumlahPenduduk, icon: Users },
    { label: 'Jumlah KK', value: stats.jumlahKK, icon: Home },
    { label: 'Jumlah Dusun', value: stats.jumlahDusun, icon: MapPinned },
    { label: 'Status IDM', value: stats.statusIDM, icon: Award, isText: true },
  ];

  return (
    <section className="bg-primary-700 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Statistik Desa</h2>
          <p className="mt-2 text-primary-100">Data kependudukan dan pembangunan terkini</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-primary-500/50 bg-primary-800/60 p-6 text-center"
            >
              <item.icon className="mx-auto h-10 w-10 text-accent-gold" />
              <p className="mt-4 text-3xl font-bold">
                {item.isText ? item.value : Number(item.value).toLocaleString('id-ID')}
              </p>
              <p className="mt-2 text-sm text-primary-200">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
