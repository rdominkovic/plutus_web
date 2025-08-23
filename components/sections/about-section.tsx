// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const desktopStart = 0.68;
  const desktopEnd = 0.90;
  const mobileStart = 0.67; // krene točno kad prođe sredinu
  const mobileEnd = 0.90;

  const scale = isMobile
    ? useTransform(scrollYProgress, [0, mobileStart, mobileEnd], [1, 1, 0.9])
    : useTransform(scrollYProgress, [desktopStart, desktopEnd], [1, 0.9]);

  const opacity = isMobile
    ? useTransform(scrollYProgress, [0, mobileStart, mobileEnd], [1, 1, 0])
    : useTransform(scrollYProgress, [desktopStart, desktopEnd], [1, 0]);

  const y = isMobile
    ? useTransform(scrollYProgress, [0, mobileStart, mobileEnd], ['0px', '0px', '-500px'])
    : useTransform(scrollYProgress, [desktopStart, desktopEnd], ['0px', '-500px']);

  const blur = isMobile
    ? useTransform(scrollYProgress, [0, mobileStart, mobileEnd], [0, 0, 20])
    : useTransform(scrollYProgress, [desktopStart, desktopEnd], [0, 25]);

  const filter  = useTransform(blur, (v) => `blur(${v}px)`);

  return (
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