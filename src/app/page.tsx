import { Suspense } from 'react';
import Hero from '@/components/modules/Hero/Hero';
import HeroBackground from '@/components/modules/Hero/HeroBackground';
import SelectedWorks from '@/components/modules/SelectedWorks';
import Services from '@/components/modules/Services';
import TeamGrid from '@/components/modules/TeamGrid';
import ContactForm from '@/components/modules/ContactForm';
import { BentoSkeleton } from '@/components/ui/Skeletons';

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Dynamic Hole: Streams in from Sanity while the rest is static */}
      <Suspense fallback={<BentoSkeleton />}>
        <SelectedWorks />
      </Suspense>
      
      <Services />
      <TeamGrid />
      <ContactForm />
    </>
  );

}
