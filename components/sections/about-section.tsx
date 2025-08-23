// path: components/sections/about-section.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const AboutSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const t = useTranslations('AboutSection');
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
          {t('title')}
        </h3>
        <div className="space-y-6">
          <p
            className="font-sans text-xl md:text-2xl lg:text-3xl !leading-tight text-white"
          >
            {t('p1')}
          </p>
          
          <p
            className="font-sans text-xl md:text-2xl lg:text-3xl !leading-tight text-white"
          >
            {t('p2')}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;