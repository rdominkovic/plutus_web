// path: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import HeroSection from '../components/sections/hero-section';
import ProblemSection from '../components/sections/problem-section';
import ServicesSection from '../components/sections/services-section';
import ApproachSection from '../components/sections/approach-section';
import ExamplesSection from '../components/sections/examples-section';
import ContactSection from '../components/sections/contact-section';
import IntroAnimation from '../components/layout/IntroAnimation';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Spriječi scroll dok je intro aktivan
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Očisti stil prilikom unmountanja komponente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showIntro]);

  const handleAnimationComplete = () => {
    setShowIntro(false);
    setShowMainContent(true); 
  };

  return (
    <>
      {showIntro && <IntroAnimation onAnimationComplete={handleAnimationComplete} />}
      
      <div style={{ opacity: showMainContent ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
        <main>
          {/* Ostatak tvojih sekcija */}
          <HeroSection />
          <ProblemSection />
          <ServicesSection />
          <ApproachSection />
          <ExamplesSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}