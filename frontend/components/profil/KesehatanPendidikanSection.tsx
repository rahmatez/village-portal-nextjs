import { Stethoscope, GraduationCap, School } from 'lucide-react';
import type { FasilitasItem, DemografiItem } from '@/lib/api/profil-sosial';
import { ProgressBar } from './ProgressBar';

interface KesehatanPendidikanSectionProps {
  kesehatan: FasilitasItem[];
  pendidikanFasilitas: FasilitasItem[];
  pendidikanWarga: DemografiItem[];
}

export function KesehatanPendidikanSection({
  kesehatan,
  pendidikanFasilitas,
  pendidikanWarga,
}: KesehatanPendidikanSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="section-title">Kesehatan & Pendidikan</h2>
          <p className="section-subtitle">
            Prasarana layanan kesehatan, fasilitas pendidikan, dan tingkat pendidikan warga
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2 text-primary-700">
              <Stethoscope className="h-5 w-5" />
              <h3 className="text-lg font-bold">Prasarana Kesehatan</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {kesehatan.map((f) => (
                <div key={f.id} className="card border-l-4 border-l-accent-red py-4">
                  <p className="font-semibold text-slate-800">{f.nama}</p>
                  <p className="mt-1 text-2xl font-bold text-primary-700">{f.jumlah}</p>
                  <p className="text-xs text-slate-500">unit</p>
                  {f.keterangan && (
                    <p className="mt-2 text-sm text-slate-500">{f.keterangan}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-primary-700">
              <School className="h-5 w-5" />
              <h3 className="text-lg font-bold">Fasilitas Pendidikan</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {pendidikanFasilitas.map((f) => (
                <div key={f.id} className="card border-l-4 border-l-accent-gold py-4">
                  <p className="font-semibold text-slate-800">{f.nama}</p>
                  <p className="mt-1 text-2xl font-bold text-primary-700">{f.jumlah}</p>
                  <p className="text-xs text-slate-500">unit</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card mt-10">
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-bold text-primary-800">
              Tingkat Pendidikan Terakhir Warga
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pendidikanWarga.map((item, i) => (
              <ProgressBar
                key={item.id}
                label={item.kelompok}
                value={item.persentase}
                displayValue={`${item.persentase.toFixed(1)}%${
                  item.jumlah ? ` · ${item.jumlah.toLocaleString('id-ID')} jiwa` : ''
                }`}
                barClassName={i % 2 === 0 ? 'bg-primary-500' : 'bg-accent-gold'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
