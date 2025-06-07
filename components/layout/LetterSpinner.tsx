// path: components/layout/LetterSpinner.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './IntroAnimation.module.css';

interface LetterSpinnerProps {
  char: string;
  isBouncing?: boolean;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const dotCharacters = ".,-";

export default function LetterSpinner({ char, isBouncing = false }: LetterSpinnerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Samo animiraj ako se slovo promijenilo ili je prvo renderiranje
    if (!isInitialMount.current) {
        // Logika animacije
        const isDot = char === '.';
        const availableChars = isDot ? dotCharacters : characters;
        const spinsPerLetter = 10;
        const spinDuration = 50;

        track.innerHTML = '';
        for (let j = 0; j < spinsPerLetter; j++) {
            const span = document.createElement('span');
            span.textContent = availableChars.charAt(Math.floor(Math.random() * availableChars.length));
            track.appendChild(span);
        }
        const targetSpan = document.createElement('span');
        targetSpan.textContent = char;
        track.appendChild(targetSpan);

        const charHeight = track.firstElementChild?.clientHeight || 20;
        const finalPosition = -(track.children.length - 1) * charHeight;
        
        track.style.transition = 'none';
        track.style.transform = `translateY(0px)`;
        void track.offsetHeight;
        track.style.transition = `transform ${spinDuration * spinsPerLetter * 0.2}ms ease-out`;
        track.style.transform = `translateY(${finalPosition}px)`;
    }
    
    isInitialMount.current = false;

  }, [char]);

  const bouncingClass = isBouncing ? styles.bouncingDot : '';

  return (
    <div className={`${styles.letterSpinner} ${bouncingClass}`}>
      <div ref={trackRef} className={styles.spinnerTrack}>
        <span>{char}</span>
      </div>
    </div>
  );
}