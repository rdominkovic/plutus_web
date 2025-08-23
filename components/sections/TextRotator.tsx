// path: components/sections/TextRotator.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const rotatingTexts = [
  {
    quote: "The future of AI is in our hands.",
    author: "Tim Cook, CEO of Apple"
  },
  {
    quote: "AI is unquestionably the most powerful technology force the world has ever known",
    author: "Jensen Huang, CEO of Nvidia"
  },
  {
    quote: "AI will not replace humans, but those who use AI will replace those who don't.",
    author: "Ginni Rometty, Former CEO of IBM"
  },
  {
    quote: "AI will enhance the ways humans experience the world.",
    author: "Jeff Bezos, Founder of Amazon"
  },
  {
    quote: "AI is going to reshape every industry and every job.",
    author: "Reid Hoffman, Co-founder of LinkedIn"
  },
  {
    quote: "AI is the new electricity.",
    author: "Andrew Ng, Co-founder of Google Brain and Coursera"
  },
  {
    quote: "AI has the potential to be more transformative than electricity or fire.",
    author: "Sundar Pichai, CEO of Google"
  }
];

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&/0123456789"; 

const TextRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledDisplay, setScrambledDisplay] = useState(rotatingTexts[0].quote);
  const [scrambledAuthor, setScrambledAuthor] = useState(rotatingTexts[0].author);
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

  // Animacija za strelicu - nestaje kad se počne skrolati
  const arrowOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const arrowY = useTransform(scrollY, [0, 50], [0, 10]);


  const scrambleToTarget = useCallback((targetText: string, targetAuthor: string): Promise<void> => {
    return new Promise((resolve) => {
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

      let iteration = 0;
      const maxIterations = 8; // Smanjio sam broj iteracija

      scrambleIntervalRef.current = setInterval(() => {
        const scrambled = targetText.split('')
          .map((char) => {
            if (char === ' ') return '\u00A0';
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        const scrambledAuthor = targetAuthor.split('')
          .map((char) => {
            if (char === ' ') return '\u00A0';
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        setScrambledDisplay(scrambled);
        setScrambledAuthor(scrambledAuthor);

        if (iteration >= maxIterations) {
          clearInterval(scrambleIntervalRef.current as NodeJS.Timeout);
          scrambleIntervalRef.current = null;
          setScrambledDisplay(targetText);
          setScrambledAuthor(targetAuthor);
          resolve();
        }
        iteration += 1;
      }, 50); // Povećao sam interval za brži efekt
    });
  }, []);

  useEffect(() => {
    const runTextCycle = async () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const currentTargetText = rotatingTexts[currentIndex].quote;
      const currentTargetAuthor = rotatingTexts[currentIndex].author;
      await scrambleToTarget(currentTargetText, currentTargetAuthor);
      await new Promise(resolve => timeoutRef.current = setTimeout(resolve, 4500));

      const scrambleOutPromise = new Promise<void>(resolve => {
        let scrambleOutIteration = 0;
        const maxScrambleOutIterations = 6; // Smanjio sam broj iteracija
        
        const scrambleOutInterval = setInterval(() => {
          const scrambled = currentTargetText.split('')
            .map((char: string) => {
              if (char === ' ') return '\u00A0';
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
          
          const scrambledAuthor = currentTargetAuthor.split('')
            .map((char: string) => {
              if (char === ' ') return '\u00A0';
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');

          setScrambledDisplay(scrambled);
          setScrambledAuthor(scrambledAuthor);

          if (scrambleOutIteration >= maxScrambleOutIterations) {
            clearInterval(scrambleOutInterval);
            resolve();
          }
          scrambleOutIteration += 1;
        }, 30); // Povećao sam interval za brži efekt
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
    <div className="relative text-center min-h-screen md:min-h-[35svh] flex items-center md:items-end justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <div className="space-y-4 max-w-[95%] mx-auto px-4 transform -translate-y-1/2 md:transform-none md:pb-50">
          <motion.h1
            key={rotatingTexts[currentIndex].quote}
            className={`font-sans font-bold tracking-tight text-main-white text-center text-2xl md:text-3xl lg:text-4xl leading-relaxed overflow-hidden ${
              scrambledDisplay !== rotatingTexts[currentIndex].quote ? 'whitespace-nowrap' : 'break-words'
            }`}
            style={{
              y,
              opacity,
              scale,
              filter: blurFilter,
            }}
          >
            "{scrambledDisplay}"
          </motion.h1>
          <motion.p
            key={`${rotatingTexts[currentIndex].quote}-author`}
            className={`font-sans text-lg md:text-xl text-white/80 text-center italic leading-relaxed overflow-hidden ${
              scrambledAuthor !== rotatingTexts[currentIndex].author ? 'whitespace-nowrap' : 'break-words'
            }`}
            style={{
              y,
              opacity,
              scale,
              filter: blurFilter,
            }}
          >
            – {scrambledAuthor}
          </motion.p>
        </div>
      </AnimatePresence>

      {/* Strelica za skrolanje */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 md:bottom-40 text-white/60 md:hidden"
        style={{
          opacity: arrowOpacity,
          y: arrowY,
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDownIcon className="h-6 w-6 md:h-8 md:w-8" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TextRotator;