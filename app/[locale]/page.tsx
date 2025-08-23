// path: app/[locale]/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useParams } from 'next/navigation';
import IntroAnimation from '../../components/layout/IntroAnimation';
import { Header } from '../../components/layout/Header';
import TextRotator from '../../components/sections/TextRotator';
import PortfolioSection from '../../components/sections/portfolio-section';
import AboutSection from '../../components/sections/about-section';
import { BottomNav } from '../../components/layout/bottom-nav';
import ServicesSection from '../../components/sections/services-section';
import ContactSection from '../../components/sections/contact-section';


export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;
  const [isLoading, setIsLoading] = useState(true);
  const aboutRef = useRef<HTMLDivElement>(null);
  
// Novi, pouzdaniji kod
const { scrollYProgress: aboutScrollProgress } = useScroll({
  target: aboutRef,
  // Pratimo sekciju tijekom cijelog njezinog prolaska kroz ekran
  offset: ['start start', 'end end'],
});

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="intro-container"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
          >
            <IntroAnimation onAnimationComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
          >
            <main>
              <TextRotator />
              <section id="portfolio">
                <PortfolioSection />
              </section>
              
              {/* "O nama" sekcija: dovoljno produžena da sticky ostane ~1–2 skrola, bez suvišnog praznog prostora */}
              <section
                id="about"
                ref={aboutRef}
                className="relative bg-black scroll-mt-24"
                style={{ height: '70vh' }}
              >
                {/* Sticky kontejner u parent sekciji kao i portfolio kartice */}
                <motion.div className="sticky top-1/2 -translate-y-1/2">
                  <AboutSection scrollYProgress={aboutScrollProgress} />
                </motion.div>
              </section>

              {/* Usluge sekcija */}
              <ServicesSection />
              
              {/* Kontejner za kraj stranice koji centrira kontaktnu sekciju */}
              <section 
                id="contact" 
                className="relative flex items-center justify-center min-h-screen bg-black px-4"
              >
                <ContactSection />
              </section>
            </main>
            <BottomNav />
          </motion.div>
        </>
      )}
    </>
  );
}