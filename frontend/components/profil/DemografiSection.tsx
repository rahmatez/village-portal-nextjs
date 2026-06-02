import type { DemografiItem } from '@/lib/api/profil-sosial';
import { ProgressBar } from './ProgressBar';

interface DemografiSectionProps {
  jenisKelamin: DemografiItem[];
  umur: DemografiItem[];
}

export function DemografiSection({ jenisKelamin, umur }: DemografiSectionProps) {
  const maxUmur = Math.max(...umur.map((u) => u.persentase), 1);

  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="section-title">Demografi Penduduk</h2>
          <p className="section-subtitle">Komposisi jenis kelamin dan struktur usia</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="card">
            <h3 className="mb-6 text-lg font-bold text-primary-800">Komposisi Jenis Kelamin</h3>
            <div className="space-y-5">
              {jenisKelamin.map((item, i) => (
                <ProgressBar
                  key={item.id}
                  label={item.kelompok}
                  value={item.persentase}
                  displayValue={`${item.persentase.toFixed(1)}%${
                    item.jumlah ? ` (${item.jumlah.toLocaleString('id-ID')} jiwa)` : ''
                  }`}
                  barClassName={i === 0 ? 'bg-primary-500' : 'bg-accent-red'}
                />
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="mb-6 text-lg font-bold text-primary-800">Struktur Umur</h3>
            <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2">
              {umur.map((item) => (
                <div key={item.id} className="flex items-end gap-3">
                  <div className="w-28 shrink-0 text-right text-xs font-medium text-slate-600">
                    {item.kelompok}
                  </div>
                  <div className="flex-1">
                    <div className="flex h-24 items-end">
                      <div
                        className="w-full rounded-t bg-primary-500 transition-all"
                        style={{ height: `${(item.persentase / maxUmur) * 100}%`, minHeight: '4px' }}
                        title={`${item.persentase.toFixed(1)}%`}
                      />
                    </div>
                    <p className="mt-1 text-center text-xs text-slate-500">
                      {item.persentase.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
