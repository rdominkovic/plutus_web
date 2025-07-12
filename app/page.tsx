// path: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from '../components/layout/IntroAnimation';
import { Header } from '../components/layout/Header';
import TextRotator from '../components/sections/TextRotator';
import WhatWeDoSection from '../components/sections/what-we-do-section';
// AboutSection se više ne importa i ne renderira ovdje direktno
// import AboutSection from '../components/sections/about-section';


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
            <main>
              <TextRotator />
              <WhatWeDoSection />
              {/* <AboutSection /> */}
            </main>
          </motion.div>
        </>
      )}
    </>
  );
}