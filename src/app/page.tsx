import { Header } from '@/components/Header';
import { Hero } from '@/components/sections/Hero';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { MiceVenue } from '@/components/sections/MiceVenue';
import { Spaces } from '@/components/sections/Spaces';
import { Rooms } from '@/components/sections/Rooms';
import { Dining } from '@/components/sections/Dining';
import { Amenities } from '@/components/sections/Amenities';
import { Location } from '@/components/sections/Location';
import { ContactForm } from '@/components/sections/ContactForm';
import { Footer } from '@/components/Footer';
import { StickyCTA } from '@/components/StickyCTA';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhyChoose />
      <MiceVenue />
      <Spaces />
      <Rooms />
      <Dining />
      <Amenities />
      <Location />
      <ContactForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}
