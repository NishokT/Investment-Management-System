import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { Work } from '@/components/sections/Work';
import { Marquee } from '@/components/Marquee';

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
