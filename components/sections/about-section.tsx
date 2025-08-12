// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Dvostupanjski finiš: prvi dio jači, drugi dio suptilan
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 0.965, 1], [0, 1, 1, 0.3, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.2, 0.9, 0.965, 1], [0.98, 1, 1, 0.83, 0.8]);
  const y       = useTransform(scrollYProgress, [0, 0.2, 0.9, 0.965, 1], ['10px', '0px', '0px', '-80px', '-150px']);
  const blur    = useTransform(scrollYProgress, [0.9, 0.965, 1], [0, 12, 30]);
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