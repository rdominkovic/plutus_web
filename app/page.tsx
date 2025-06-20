// path: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from '../components/layout/IntroAnimation';
import { Header } from '../components/layout/Header';
import TextRotator from '../components/sections/TextRotator';
// Uvezite sve potrebne sekcije
import ProblemSection from '../components/sections/problem-section';
import ServicesSection from '../components/sections/services-section';
import ApproachSection from '../components/sections/approach-section';
import ExamplesSection from '../components/sections/examples-section';
import ContactSection from '../components/sections/contact-section';


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

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
            {/* Uklanjamo min-h-screen i flex postavke jer će sadržaj pružiti visinu */}
            <main>
              <TextRotator />
              {/* Dodajemo ostale sekcije ovdje */}
              <ProblemSection />
              <ServicesSection />
              <ApproachSection />
              <ExamplesSection />
              <ContactSection />
            </main>
          </motion.div>
        </>
      )}
    </>
  );
}