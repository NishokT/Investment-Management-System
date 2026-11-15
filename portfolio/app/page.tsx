import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Overview } from '@/components/sections/Overview';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Work } from '@/components/sections/Work';

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Overview />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
