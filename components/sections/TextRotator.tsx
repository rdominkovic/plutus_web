// path: components/sections/TextRotator.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Novi scroll fade/blur efekt: fade-out traje 100px prije nego što donji rub teksta dođe do vrha headera
  const HEADER_HEIGHT = 64; // px, prilagodi po potrebi
  const FADE_RANGE = 100; // px
  const [fadeProgress, setFadeProgress] = useState(0);
  const initialDistanceRef = useRef<number | null>(null);

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

  // Logic for scroll animation (Y-position, opacity, blur)
  useEffect(() => {
    if (!h1Ref.current) return;

    const handleScroll = () => {
      const rect = h1Ref.current?.getBoundingClientRect();
      if (!rect) return;

      // Hero_Tekst_Glavni nestaje do 600px skrola 
      // Početna pozicija je y_position: 197px 
      // Na 200px skrola: y_position: 242px 
      // Na 400px skrola: y_position: 259px 
      // Na 600px skrola: Postao NEVIDLJIV 

      // Možemo koristiti window.scrollY za ukupni skrol ili rect.top za relativni pomak elementa.
      // Za Muradov efekt, element se pomiče gore s pozadinom, pa je rect.top dobar pokazatelj.
      // Početak animacije: kad je vrh elementa (ili određena referentna točka) u viewportu.
      // Kraj animacije: kad je element potpuno izvan viewporta ili skrolan dovoljno.

      const scrollThresholdStart = 0; // Animacija počinje odmah
      const scrollThresholdEnd = 600; // Završava nakon 600px skrola (kao kod Muradova) 

      // Računamo koliko smo skrolali od početka dokumenta.
      // Možemo koristiti window.scrollY ili document.documentElement.scrollTop
      const currentScrollY = window.scrollY;

      // Normalizirani progres od 0 do 1 unutar zone skrolanja
      let currentProgress = (currentScrollY - scrollThresholdStart) / (scrollThresholdEnd - scrollThresholdStart);
      currentProgress = Math.min(1, Math.max(0, currentProgress)); // Klippamo između 0 i 1

      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Pokreni odmah za početnu poziciju

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Novi scroll fade/blur efekt: fade-out traje 100px prije nego što donji rub teksta dođe do vrha headera
  useEffect(() => {
    if (!h1Ref.current) return;

    const handleScroll = () => {
      const rect = h1Ref.current?.getBoundingClientRect();
      if (!rect) return;
      const textBottom = rect.bottom;
      const distance = textBottom - HEADER_HEIGHT;
      // Postavi početnu udaljenost na prvom renderu
      if (initialDistanceRef.current === null) {
        initialDistanceRef.current = distance;
      }
      const totalDistance = initialDistanceRef.current || 1;
      let progress = 1 - distance / totalDistance;
      progress = Math.max(0, Math.min(1, progress));
      setFadeProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolacija stilova na temelju scrollProgressa i fadeProgressa
  const translateY = scrollProgress * -100;
  const opacity = 1 - fadeProgress;
  const blur = fadeProgress * 8;

  // Ako je scrollProgress > 1, tekst se uopće ne prikazuje
  if (scrollProgress > 1) return null;

  return (
    <div className="relative text-center pt-48 pb-24 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          ref={h1Ref} // Postavljamo ref na h1 element
          key={rotatingTexts[currentIndex]}
          className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tight text-main-white text-center will-change-transform will-change-opacity will-change-filter" // Dodao will-change za perf
          style={{
            transform: `translateY(${translateY}px)`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out', // Glatka tranzicija
          }}
        >
          {scrambledDisplay}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default TextRotator;