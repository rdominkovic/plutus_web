// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale   = useTransform(scrollYProgress, [0.68, 0.9], [1, 0.9]);     // Scale počinje tek na 65%
  const opacity = useTransform(scrollYProgress, [0.68, 0.9], [1, 0]);      // Fade out počinje tek na 65%
  const y       = useTransform(scrollYProgress, [0.68, 0.9], ['0px', '-500px']); // Pomak počinje tek na 65%
  const blur    = useTransform(scrollYProgress, [0.68, 0.9], [0, 25]);      // Blur počinje tek na 65%
  const filter  = useTransform(blur, (v) => `blur(${v}px)`);
  return (
    // Ovdje ide ostatak JSX-a za komponentu, nema potrebe za promjenom...
    <div className="container mx-auto max-w-4xl text-center">
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
        <div className="space-y-6">
          <p
            className="font-sans text-xl md:text-2xl lg:text-3xl !leading-tight text-white"
          >
            Svijet se mijenja. Velike riječi tehnoloških lidera nisu daleka budućnost – one su današnja stvarnost. U toj novoj eri, pobjednici neće biti oni koji se opiru, već oni koji iskoriste snagu umjetne inteligencije.
          </p>
          
          <p
            className="font-sans text-xl md:text-2xl lg:text-3xl !leading-tight text-white"
          >
            Tu nastupa Plutus. Mi pretvaramo kompleksnost AI tehnologije u vaše najjače oružje. Naš posao je da operativni kaos pretvorimo u red i vratimo vam najvrjedniji resurs – vrijeme. Mi smo partner koji vam osigurava da budete oni koji mijenjaju, a ne oni koji su zamijenjeni.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;