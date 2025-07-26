'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface AboutSectionProps {
  scrollYProgress: MotionValue<number>;
  aboutStart: number;
  aboutEnd: number;
  scrollTotal: number; // Dodano za izračun fadeout pozicija
}

const AboutSection = ({ scrollYProgress, aboutStart, aboutEnd, scrollTotal }: AboutSectionProps) => {
  // Jednostavna fade-in/fade-out logika
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['100px', '0px']);

  return (
    <section id="about" className="sticky top-1/2 -translate-y-1/2 w-full h-screen flex items-center justify-center z-10">
      <motion.div
        className="container mx-auto max-w-3xl text-center"
        style={{ 
          opacity,
          y,
          scale
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