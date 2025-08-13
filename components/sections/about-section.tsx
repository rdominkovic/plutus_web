// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Zaključano početno stanje (vidljivo i poravnano) + suptilniji long-tail izlaz na prvi sljedeći scroll
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.92, 1], [1, 1, 0.35, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.4, 0.92, 1], [1, 1, 0.86, 0.82]);
  const y       = useTransform(scrollYProgress, [0, 0.4, 0.92, 1], ['0px', '0px', '-70px', '-140px']);
  const blur    = useTransform(scrollYProgress, [0.4, 0.92, 1], [0, 12, 30]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

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