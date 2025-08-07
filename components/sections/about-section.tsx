// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface AboutSectionProps {
  scrollYProgress: MotionValue<number>;
  aboutStart: number;
  aboutEnd: number;
  scrollTotal: number;
}

const AboutSection = ({ scrollYProgress, aboutStart, aboutEnd, scrollTotal }: AboutSectionProps) => {
  // Fade-in, zatim statično, zatim fade-out tek kada počne odlaziti
  const opacity = useTransform(scrollYProgress, [0, 0, 0.8, 0.9, 1], [0, 1, 1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0, 0.8, 0.9, 1], [0.9, 1, 1, 0.9, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0, 0.8, 0.9, 1], ['100px', '0px', '0px', '-100px', '-200px']);
  
  // Blur počinje tek kada počne fade out animacija
  const blur = useTransform(scrollYProgress, [0.9, 1], [0, 30]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    // IZMJENA: Klasa h-screen je zamijenjena s py-8 za smanjenje visine i bolje sticky pozicioniranje
    <section id="about" className="sticky top-1/2 -translate-y-1/2 w-full py-8 flex items-center justify-center z-10" style={{ position: 'sticky' }}>
      <motion.div
        className="container mx-auto max-w-3xl text-center"
        style={{ 
          opacity,
          y,
          scale,
          filter
        }}
      >
        <h3
          className="font-mono text-sm uppercase text-white/60 mb-8"
        >
          ../O NAMA
        </h3>
        <p
          className="font-sans text-2xl md:text-3xl lg:text-4xl !leading-tight uppercase text-white"
        >
          Mi smo Plutus, tim specijaliziran za AI automatizaciju i optimizaciju procesa. Kreiramo pametna rješenja koja unapređuju vaše poslovanje i donose konkretne rezultate.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;