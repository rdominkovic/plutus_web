// path: components/layout/Header.tsx
'use client';

import { motion } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-0 md:py-4 px-6 pointer-events-none bg-black">
    <motion.div
      layoutId="plutus-logo-container"
      className="flex justify-center items-baseline w-[25rem] font-mono text-6xl uppercase tracking-tight text-main-white pointer-events-none"
    >
      Plutus
    </motion.div>
    <div className="absolute right-6 pointer-events-auto">
      <LanguageSwitcher />
    </div>
  </header>
);

export default Header;