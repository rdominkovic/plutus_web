// path: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/sections/hero-section';
import ProblemSection from '../components/sections/problem-section';
import ServicesSection from '../components/sections/services-section';
import ApproachSection from '../components/sections/approach-section';
import ExamplesSection from '../components/sections/examples-section';
import ContactSection from '../components/sections/contact-section';
import IntroAnimation from '../components/layout/IntroAnimation';

export default function HomePage() {
  const [animationState, setAnimationState] = useState('intro'); // Moguća stanja: 'intro', 'outro', 'finished'

  useEffect(() => {
    if (animationState === 'finished') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [animationState]);

  const handleAnimationComplete = () => {
    // Kada Intro animacija završi svoj let, pokrećemo 'outro' fazu
    setAnimationState('outro');
  };

  return (
    <>
      {/* Kontejner za pozicioniranje animacije i pozadine */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Renderiramo IntroAnimation samo dok animacija traje */}
        {animationState === 'intro' && (
          <IntroAnimation onAnimationComplete={handleAnimationComplete} />
        )}
      </div>

      {/* Crna pozadina koja nestaje */}
      <AnimatePresence>
        {animationState !== 'finished' && (
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 1 }}
            animate={{ opacity: animationState === 'outro' || animationState === 'finished' ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => {
              if (animationState === 'outro') {
                setAnimationState('finished');
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Glavni sadržaj stranice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animationState === 'outro' || animationState === 'finished' ? 1 : 0 }}
        transition={{ duration: 1.0, delay: 0.2 }}
      >
        <main>
          <HeroSection />
          <ProblemSection />
          <ServicesSection />
          <ApproachSection />
          <ExamplesSection />
          <ContactSection />
        </main>
      </motion.div>
    </>
  );
}