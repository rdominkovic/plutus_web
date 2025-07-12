'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface AboutSectionProps {
  scrollYProgress: MotionValue<number>;
  aboutStart: number;
  aboutEnd: number;
}

const AboutSection = ({ scrollYProgress, aboutStart, aboutEnd }: AboutSectionProps) => {
  const inputRange = [aboutStart, aboutEnd];
  const opacity = useTransform(scrollYProgress, inputRange, [0, 1]);
  const y = useTransform(scrollYProgress, inputRange, ['100px', '0px']);

  return (
    <section id="about" className="sticky top-1/2 -translate-y-1/2 w-full h-screen flex items-center justify-center z-10">
      <motion.div
        className="container mx-auto max-w-3xl text-center"
        style={{ opacity, y }}
      >
        <h3
          className="font-mono text-sm uppercase text-main-white/60 mb-8"
        >
          ../O NAMA
        </h3>
        <p
          className="font-sans text-2xl md:text-3xl lg:text-4xl !leading-tight uppercase"
        >
          Mi smo Plutus, tim specijaliziran za AI automatizaciju i optimizaciju procesa. Kreiramo pametna rješenja koja unapređuju vaše poslovanje i donose konkretne rezultate.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection; 