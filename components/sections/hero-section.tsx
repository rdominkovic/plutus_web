'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/button';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 = full visible, 1 = fully out

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Start animating when top of section leaves top of viewport
      const start = 0;
      // End animating when 60% of section height is scrolled past
      const end = rect.height * 0.6;
      const scrolled = Math.min(Math.max(-rect.top, start), end);
      const newProgress = scrolled / end;
      setProgress(newProgress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolate values
  const translateY = 0 + 40 * progress; // from 0px to 40px up
  const opacity = 1 - progress; // from 1 to 0

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[80vh] flex-col justify-end bg-main-black pb-16 pt-24 md:pt-32"
    >
      <div className="container mx-auto flex flex-col items-start gap-8 px-4 md:px-8">
        {/* <h1
          className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-tight text-main-white mb-4"
          style={{
            transform: `translateY(-${translateY}px)`,
            opacity,
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          Plutus: AI Optimization for Modern Business
        </h1> */}
        <p
          className="font-sans text-lg md:text-2xl text-main-white/60 max-w-xl mb-8"
          style={{
            transform: `translateY(-${translateY * 0.7}px)`, // slightly less movement than H1
            opacity,
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          We help you unlock efficiency and growth with cutting-edge AI automation and process optimization.
        </p>
        <Button aria-label="Contact Plutus">Get in touch</Button>
      </div>
      <div className="absolute right-8 bottom-8 w-32 h-32 bg-palatinate-blue/30 rounded-full blur-2xl opacity-60 pointer-events-none" aria-hidden="true" />
    </section>
  );
};

export default HeroSection; 