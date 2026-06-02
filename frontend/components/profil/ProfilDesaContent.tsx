'use client';

import { useQuery } from '@tanstack/react-query';
import { profilSosialApi } from '@/lib/api/profil-sosial';
import { ProfilHero } from './ProfilHero';
import { StatistikKunci } from './StatistikKunci';
import { DemografiSection } from './DemografiSection';
import { KesehatanPendidikanSection } from './KesehatanPendidikanSection';
import { MataPencaharianSection } from './MataPencaharianSection';
import { EkonomiInfrastrukturSection } from './EkonomiInfrastrukturSection';
import { ProfilRingkasNav } from './ProfilRingkasNav';

export function ProfilDesaContent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profil-sosial'],
    queryFn: async () => {
      const res = await profilSosialApi.getAll();
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <ProfilHero />
        <div className="py-24 text-center text-slate-500">Memuat data profil desa...</div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <ProfilHero />
        <div className="py-24 text-center text-slate-600">
          Gagal memuat data. Pastikan backend berjalan di port 4000.
        </div>
      </>
    );
  }

  return (
    <>
      <ProfilHero />
      <StatistikKunci data={data.kependudukan} />
      <DemografiSection
        jenisKelamin={data.demografi.jenisKelamin}
        umur={data.demografi.umur}
      />
      <KesehatanPendidikanSection
        kesehatan={data.fasilitas.kesehatan}
        pendidikanFasilitas={data.fasilitas.pendidikan}
        pendidikanWarga={data.demografi.pendidikan}
      />
      <MataPencaharianSection items={data.mataPencaharian} />
      <EkonomiInfrastrukturSection
        kependudukan={data.kependudukan}
        prasaranaUmum={data.fasilitas.umum}
      />
      <ProfilRingkasNav />
    </>
  );
}
