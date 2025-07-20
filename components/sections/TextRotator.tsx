// path: components/sections/TextRotator.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const rotatingTexts = [
  "UNAPREĐUJEMO VAŠE POSLOVANJE",
  "AI AUTOMATIZACIJA",
  "PROCESNA OPTIMIZACIJA",
  "PAMETNA RJEŠENJA"
];

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&/0123456789";

const TextRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledDisplay, setScrambledDisplay] = useState(rotatingTexts[0]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();
  // Animacija se sada odvija u dvije faze preko 200px
  const scrollThreshold = [0, 100, 200];

  // Faza 1 (prvi scroll): Pomak, smanjenje, zamućenje, ali ostaje vidljivo
  // Faza 2 (drugi scroll): Potpuno nestaje
  const y = useTransform(scrollY, scrollThreshold, ['0px', '-20px', '-200px']);
  const opacity = useTransform(scrollY, scrollThreshold, [1, 0.7, 0]);
  const scale = useTransform(scrollY, scrollThreshold, [1, 0.5, 0.5]);
  const blur = useTransform(scrollY, scrollThreshold, [0, 8, 50]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);


  const scrambleToTarget = useCallback((targetText: string): Promise<void> => {
    return new Promise((resolve) => {
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

      let iteration = 0;
      const originalChars = targetText.split('');
      const maxIterations = targetText.length * 1.2;

      scrambleIntervalRef.current = setInterval(() => {
        const scrambled = originalChars
          .map((char, index) => {
            if (char === ' ') return '\u00A0';
            if (index < iteration) {
              return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        setScrambledDisplay(scrambled);

        if (iteration >= maxIterations) {
          clearInterval(scrambleIntervalRef.current as NodeJS.Timeout);
          scrambleIntervalRef.current = null;
          setScrambledDisplay(targetText);
          resolve();
        }
        iteration += 0.75;
      }, 25);
    });
  }, []);

  useEffect(() => {
    const runTextCycle = async () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const currentTargetText = rotatingTexts[currentIndex];
      await scrambleToTarget(currentTargetText);
      await new Promise(resolve => timeoutRef.current = setTimeout(resolve, 2500));

      const scrambleOutPromise = new Promise<void>(resolve => {
        let scrambleOutIteration = 0;
        const scrambleOutInterval = setInterval(() => {
          const scrambled = currentTargetText.split('')
            .map((char, index) => {
              if (char === ' ') return '\u00A0';
              if (index >= currentTargetText.length - 1 - scrambleOutIteration) {
                return characters[Math.floor(Math.random() * characters.length)];
              }
              return char;
            })
            .join('');
          setScrambledDisplay(scrambled);

          if (scrambleOutIteration >= currentTargetText.length * 0.75) {
            clearInterval(scrambleOutInterval);
            resolve();
          }
          scrambleOutIteration += 1.5;
        }, 15);
      });

      await scrambleOutPromise;

      const nextIndex = (currentIndex + 1) % rotatingTexts.length;
      setCurrentIndex(nextIndex);
    };

    runTextCycle();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    };
  }, [currentIndex, scrambleToTarget]);

  return (
    <div className="relative text-center pt-36 pb-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={rotatingTexts[currentIndex]}
          className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tight text-main-white text-center"
          style={{
            y,
            opacity,
            scale,
            filter: blurFilter,
          }}
        >
          {scrambledDisplay}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default TextRotator;