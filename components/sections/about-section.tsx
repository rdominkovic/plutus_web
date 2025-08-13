// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);      // Fade out počinje tek na 80%
  const scale   = useTransform(scrollYProgress, [0.8, 1], [1, 0.9]);     // Scale počinje tek na 80%
  const y       = useTransform(scrollYProgress, [0.8, 1], ['0px', '-500px']); // Pomak počinje tek na 80%
  const blur    = useTransform(scrollYProgress, [0.8, 1], [0, 25]);      // Blur počinje tek na 80%
  const filter  = useTransform(blur, (v) => `blur(${v}px)`);
  return (
    // Ovdje ide ostatak JSX-a za komponentu, nema potrebe za promjenom...
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div
        style={{ 
          opacity,
          y,
          scale,
          filter,
          willChange: 'opacity, transform, filter'
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
    </div>
  );
};

export default AboutSection;