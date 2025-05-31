import HeroSection from '../components/sections/hero-section';
import ProblemSection from '../components/sections/problem-section';
import ServicesSection from '../components/sections/services-section';
import ApproachSection from '../components/sections/approach-section';
import ExamplesSection from '../components/sections/examples-section';
import ContactSection from '../components/sections/contact-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ApproachSection />
      <ExamplesSection />
      <ContactSection />
    </main>
  );
} 