import { Briefcase } from 'lucide-react';
import type { MataPencaharianItem } from '@/lib/api/profil-sosial';
import { ProgressBar } from './ProgressBar';

interface MataPencaharianSectionProps {
  items: MataPencaharianItem[];
}

export function MataPencaharianSection({ items }: MataPencaharianSectionProps) {
  const sorted = [...items].sort((a, b) => b.persentase - a.persentase);

  return (
    <section className="bg-primary-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="section-title">Mata Pencaharian Utama</h2>
          <p className="section-subtitle">Top pekerjaan dan distribusi lapangan usaha warga</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="card space-y-4">
            {sorted.map((item, i) => (
              <ProgressBar
                key={item.id}
                label={item.namaProfesi}
                value={item.persentase}
                displayValue={`${item.persentase.toFixed(1)}% · ${item.jumlah.toLocaleString('id-ID')} jiwa`}
                barClassName={
                  i === 0 ? 'bg-accent-gold' : i < 3 ? 'bg-primary-500' : 'bg-primary-300'
                }
              />
            ))}
          </div>

          <div className="card overflow-hidden p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary-700 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pekerjaan</th>
                  <th className="px-4 py-3 font-semibold">Jumlah</th>
                  <th className="px-4 py-3 font-semibold">%</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((item, i) => (
                  <tr
                    key={item.id}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{item.namaProfesi}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.jumlah.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary-700">
                      {item.persentase.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
