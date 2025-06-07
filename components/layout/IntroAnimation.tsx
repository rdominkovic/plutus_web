// path: components/layout/IntroAnimation.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './IntroAnimation.module.css';
import LetterSpinner from './LetterSpinner';

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [areDotsBouncing, setAreDotsBouncing] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const animatedTextContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const addTimer = (cb: () => void, delay: number) => {
        timeouts.push(setTimeout(cb, delay));
    };

    const sequence = [
      "L", "Lo", "Loa", "Load", "Loadi", "Loadin", "Loading",
      "Loading.", "Loading..", "Loading..."
    ];

    sequence.forEach((text, index) => {
      addTimer(() => setDisplayText(text), index * 200);
    });

    addTimer(() => setAreDotsBouncing(true), sequence.length * 200);

    addTimer(() => {
        setAreDotsBouncing(false);
        const plutusSequence = ["Plutus", "Plutu", "Plut", "Plu", "Pl", "P", ""];
        plutusSequence.forEach((text, index) => {
            addTimer(() => setDisplayText(text), index * 100);
        });
        addTimer(() => animateWord("Plutus", finalizeAndFly), plutusSequence.length * 100 + 100);

    }, (sequence.length * 200) + 2500); // Pauza od 2.5s

    const animateWord = (targetWord: string, callback: () => void) => {
        const letters = targetWord.split('');
        letters.forEach((_, index) => {
            addTimer(() => setDisplayText(targetWord.substring(0, index + 1)), index * 200);
        });
        addTimer(callback, letters.length * 200);
    };

    const finalizeAndFly = () => {
        const container = animatedTextContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        document.body.appendChild(container);
        
        container.style.position = 'fixed';
        container.style.left = `${rect.left}px`;
        container.style.top = `${rect.top}px`;
        container.style.zIndex = '2000';
        container.style.minWidth = 'auto'; 
        
        void container.offsetHeight;

        container.style.transition = 'top 1s ease-in-out, left 1s ease-in-out, font-size 1s ease-in-out, transform 1s ease-in-out';
        
        container.style.top = '20px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.fontSize = '1.5rem';

        addTimer(() => setIsFlying(true), 1000);
    };
    
    return () => { // Cleanup
        timeouts.forEach(clearTimeout);
    };

  }, []);

  useEffect(() => {
    if (isFlying) {
      onAnimationComplete();
    }
  }, [isFlying, onAnimationComplete]);

  return (
    <div className={styles.introOverlay}>
      <div className={styles.loadingContainer} ref={animatedTextContainerRef}>
        <div className={styles.loadingText}>
            {displayText.split('').map((char, index) => (
                <LetterSpinner 
                    key={index} 
                    char={char} 
                    isBouncing={areDotsBouncing && char === '.'}
                />
            ))}
        </div>
      </div>
    </div>
  );
}