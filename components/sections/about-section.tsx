// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface AboutSectionProps {
  scrollYProgress: MotionValue<number>;
  aboutStart: number;
  aboutEnd: number;
  scrollTotal: number;
}

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Animacija ulaska i mirovanja ostaje ista (od 0% do 85% skrola)
  // Odlazna animacija (od 85% do 100%) je sada sinkronizirana
  const opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress,   [0.25, 0.4, 0.85, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress,       [0.25, 0.4, 0.85, 1], ['50px', '0px', '0px', '-150px']);
  
  // Blur sada počinje točno na 85% i završava na 100%, zajedno s ostalim animacijama
  const blur = useTransform(scrollYProgress, [0.85, 1], [0, 50]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    // Ovdje ide ostatak JSX-a za komponentu, nema potrebe za promjenom...
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div
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
    </div>
  );
};

export default AboutSection;