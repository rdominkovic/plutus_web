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
const STAGGER_DELAY_S = 0.08;

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [letters, setLetters] = useState<string[]>('Loading...'.split(''));
  const [canDotsBounce, setCanDotsBounce] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runAnimationSequence = async () => {
      await wait(2500);
      setCanDotsBounce(true);
      await wait(2000);
      setCanDotsBounce(false);
      await wait(100);

      const finalWord = 'Plutus...'.split('');
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
      await wait(500);

      setCanDotsBounce(true);
      await wait(2000);
      
      setIsFlying(true);
      // Ne zovemo onAnimationComplete odmah, nego nakon što se završi let
    };

    runAnimationSequence();
  }, []); // useEffect se pokreće samo jednom

  const flyUpVariants: Variants = {
    initial: { y: 0, scale: 1, position: 'relative' }, // Počinje kao relativan
    animate: {
      y: '-45vh', // Prilagođeno za bolji položaj
      scale: 0.6,
      position: 'fixed', // Postaje fiksiran tek kad leti
      top: '50%',
      left: '50%',
      translateX: '-50%',
      transition: { type: 'spring', stiffness: 50, duration: 1 },
    },
  };
  
  const wordContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER_DELAY_S } },
  };

  return (
    // Vraćamo samo kontejner za tekst. Nema više pozadine.
    <motion.div
      className={styles.loadingContainer}
      variants={flyUpVariants}
      initial="initial"
      animate={isFlying ? "animate" : "initial"}
      // Kada se animacija leta završi, javljamo roditelju
      onAnimationComplete={() => {
        if (isFlying) {
          onAnimationComplete();
        }
      }}
    >
      <motion.div
        className={styles.wordWrapper}
        variants={wordContainerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          if (letters.join('') === 'Loading...') {
            setCanDotsBounce(true);
          }
        }}
      >
        <AnimatePresence>
          {letters.map((char, i) => (
            <ScrambleLetter 
              finalChar={char} 
              index={i} 
              canBounce={canDotsBounce}
              currentWord={letters.join('')}
              key={i} 
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ScrambleLetter komponenta ostaje ista
const ScrambleLetter = memo(function ScrambleLetter({ finalChar, index, canBounce, currentWord }: { finalChar: string, index: number, canBounce: boolean, currentWord: string }) {
  const [currentChar, setCurrentChar] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    bouncing: {
      opacity: 1,
      y: [0, -5, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index - currentWord.replace(/\./g, '').length) * 0.15,
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
      animate={finalChar === '.' && canBounce ? "bouncing" : "visible"}
      exit="exit"
    >
      {currentChar}
    </motion.span>
  );
});