// path: app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import IntroAnimation from '../components/layout/IntroAnimation';
import { Header } from '../components/layout/Header';
import TextRotator from '../components/sections/TextRotator';
import PortfolioSection from '../components/sections/portfolio-section';
import AboutSection from '../components/sections/about-section';


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Scroll tracking za "O nama" sekciju
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
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
              <PortfolioSection />
              
              {/* "O nama" sekcija sa smanjenom visinom */}
              <section ref={aboutRef} className="relative bg-black" style={{ height: '100vh' }}>
                <AboutSection
                  scrollYProgress={aboutScrollProgress}
                />
              </section>

              {/* Placeholder sekcija sa smanjenim gornjim prostorom */}
              <section className="h-auto py-48 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-4xl font-mono">Placeholder Section</h2>
                  <p className="text-white/60 mt-4">This space is for testing scroll animations.</p>
                </div>
              </section>
            </main>
          </motion.div>
        </>
      )}
    </>
  );
}