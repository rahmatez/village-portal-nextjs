'use client';

import { useQuery } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';
import { statistikApi } from '@/lib/api';

export function IndeksIDM() {
  const { data } = useQuery({
    queryKey: ['statistik'],
    queryFn: async () => {
      const res = await statistikApi.get();
      return res.data.data;
    },
  });

  const status = data?.statusIDM ?? 'Desa Maju';
  const iks = data?.skorIKS ?? 0.72;
  const ike = data?.skorIKE ?? 0.68;
  const ikl = data?.skorIKL ?? 0.75;

  const indeks = [
    { label: 'IKS (Sosial)', value: iks, color: 'bg-primary-500' },
    { label: 'IKE (Ekonomi)', value: ike, color: 'bg-accent-gold' },
    { label: 'IKL (Lingkungan)', value: ikl, color: 'bg-accent-red' },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-primary-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Indeks Desa Membangun
              </span>
            </div>
            <h2 className="section-title mt-2">Status: {status}</h2>
            <p className="section-subtitle">
              Desa Mindaka terus meningkatkan indeks pembangunan melalui pemberdayaan masyarakat
              dan tata kelola yang baik.
            </p>
          </div>
          <div className="space-y-6">
            {indeks.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span>{item.label}</span>
                  <span>{(item.value * 100).toFixed(0)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: `${item.value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
