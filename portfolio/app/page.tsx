import { Contact } from '@/components/sections/Contact';
import { Overview } from '@/components/sections/Overview';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Work } from '@/components/sections/Work';

export default function HomePage() {
  return (
    <main id="main">
      <Overview />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
