import { HeroSection } from '@/components/home/HeroSection';
import { ProfilRingkas } from '@/components/home/ProfilRingkas';
import { StatistikDesa } from '@/components/home/StatistikDesa';
import { IndeksIDM } from '@/components/home/IndeksIDM';
import { VisiMisi } from '@/components/home/VisiMisi';
import { KatalogPreview } from '@/components/home/KatalogPreview';
import { PPIDSection } from '@/components/home/PPIDSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProfilRingkas />
      <StatistikDesa />
      <IndeksIDM />
      <VisiMisi />
      <KatalogPreview />
      <PPIDSection />
    </>
  );
}
