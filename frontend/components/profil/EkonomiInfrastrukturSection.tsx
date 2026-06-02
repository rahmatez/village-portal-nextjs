import { Landmark, Building2, Wallet } from 'lucide-react';
import type { Kependudukan, FasilitasItem } from '@/lib/api/profil-sosial';

interface EkonomiInfrastrukturSectionProps {
  kependudukan: Kependudukan;
  prasaranaUmum: FasilitasItem[];
}

export function EkonomiInfrastrukturSection({
  kependudukan,
  prasaranaUmum,
}: EkonomiInfrastrukturSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="section-title">Ekonomi & Infrastruktur</h2>
          <p className="section-subtitle">
            Sumber pendapatan desa, aset, dan prasarana umum
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="card">
            <div className="mb-4 flex items-center gap-2 text-primary-700">
              <Wallet className="h-5 w-5" />
              <h3 className="text-lg font-bold">Sumber Pendapatan Desa</h3>
            </div>
            <ul className="space-y-2">
              {kependudukan.sumberPendapatan.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-slate-600 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent-gold"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="mb-4 flex items-center gap-2 text-primary-700">
              <Landmark className="h-5 w-5" />
              <h3 className="text-lg font-bold">Aset Desa</h3>
            </div>
            <ul className="space-y-2">
              {kependudukan.asetDesa.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-slate-600 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary-500"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card mt-8">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-bold text-primary-800">Rekap Prasarana Umum</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-700">Fasilitas</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Jumlah</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {prasaranaUmum.map((f, i) => (
                  <tr key={f.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-4 py-3 font-medium text-slate-800">{f.nama}</td>
                    <td className="px-4 py-3 text-primary-700 font-semibold">{f.jumlah}</td>
                    <td className="px-4 py-3 text-slate-500">{f.keterangan ?? '—'}</td>
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
