// path: app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import IntroAnimation from '../components/layout/IntroAnimation';
import { Header } from '../components/layout/Header';
import TextRotator from '../components/sections/TextRotator';
import PortfolioSection from '../components/sections/portfolio-section';
import AboutSection from '../components/sections/about-section';
import { BottomNav } from '../components/layout/bottom-nav';
import ServicesSection from '../components/sections/services-section';


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Scroll tracking za "O nama" sekciju
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ['start 85%', 'end 15%'],
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
              <PortfolioSection />
              
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
            </main>
            <BottomNav />
          </motion.div>
        </>
      )}
    </>
  );
}