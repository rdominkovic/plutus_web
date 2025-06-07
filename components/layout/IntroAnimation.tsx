// path: components/layout/IntroAnimation.tsx
'use client';

import { useEffect, useState, useRef, memo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import styles from './IntroAnimation.module.css';

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&/0123456789";

const BASE_SCRAMBLE_DURATION_MS = 200;
const ADDITIONAL_DURATION_PER_LETTER_MS = 100;

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [letters, setLetters] = useState<string[]>('Loading...'.split(''));
  const [bounceRound, setBounceRound] = useState(0); 

  useEffect(() => {
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const dotAnimationDuration = 0.4; 
    const numberOfDots = 3;
    const oneRoundDurationMs = numberOfDots * dotAnimationDuration * 1000;

    const runAnimationSequence = async () => {
      await wait(1200);

      // Jedan krug skakanja za "Loading..."
      setBounceRound(1);
      await wait(oneRoundDurationMs);

      setBounceRound(0);
      await wait(100);

      const finalWord = ' Plutus...'.split('');
      const transitionStagger = 100;
      for (let i = 0; i < finalWord.length; i++) {
        setLetters(current => {
          const next = [...current];
          next[i] = finalWord[i] || '';
          return next;
        });
        await wait(transitionStagger);
      }
      setLetters(finalWord);
      
      // Jedan krug skakanja za "Plutus..."
      setBounceRound(1); 
      await wait(oneRoundDurationMs); 
      
      onAnimationComplete();
    };

    runAnimationSequence();
  }, [onAnimationComplete]);

  return (
    <motion.div
      layoutId="plutus-logo-container"
      className="flex justify-center items-baseline w-[25rem] font-mono text-6xl uppercase tracking-tight text-main-white"
    >
      <AnimatePresence>
        {letters.map((char, i) => (
          <ScrambleLetter 
            finalChar={char} 
            index={i} 
            bounceRound={bounceRound}
            currentWord={letters.join('')}
            key={i} 
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

const ScrambleLetter = memo(function ScrambleLetter({ finalChar, index, bounceRound, currentWord }: { finalChar: string, index: number, bounceRound: number, currentWord: string }) {
  const [currentChar, setCurrentChar] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const dotAnimationDuration = 0.28;
  const numberOfDots = 3;

  const isDot = finalChar === '.';
  let shouldBounce = false;

  if (currentWord.startsWith('Loading')) {
    if ((bounceRound === 1 || bounceRound === 2) && isDot) {
      shouldBounce = true;
    }
  } 
  else if (currentWord.includes('Plutus')) {
    if (bounceRound === 1 && isDot) {
      shouldBounce = true;
    }
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    bouncing: {
      y: [0, -15, 0],
      opacity: 1,
      transition: {
        duration: dotAnimationDuration,
        // --- IZMJENA OVDJE: Uklonjena svojstva za ponavljanje ---
        // repeat: Infinity,
        // repeatType: "loop",
        delay: (index - (currentWord.length - numberOfDots)) * dotAnimationDuration,
        // repeatDelay: (numberOfDots * dotAnimationDuration) - dotAnimationDuration,
      },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (finalChar === '') {
      setCurrentChar('');
      return;
    }
    const totalScrambleDuration = BASE_SCRAMBLE_DURATION_MS + (index * ADDITIONAL_DURATION_PER_LETTER_MS);
    const intervalDuration = 75;
    const maxScrambles = Math.ceil(totalScrambleDuration / intervalDuration);
    let count = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (count >= maxScrambles) {
        setCurrentChar(finalChar);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      setCurrentChar(characters[Math.floor(Math.random() * characters.length)]);
      count++;
    }, intervalDuration);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [finalChar, index]);

  if (!finalChar && !currentChar) return null;

  return (
    <motion.span
      className={styles.scrambleLetter}
      variants={letterVariants}
      initial="hidden"
      animate={shouldBounce ? "bouncing" : "visible"}
      exit="exit"
    >
      {currentChar === ' ' ? '\u00A0' : currentChar}
    </motion.span>
  );
});