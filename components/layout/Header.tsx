// path: components/layout/Header.tsx
'use client';

import { motion } from 'framer-motion';

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 pointer-events-none">
    <motion.div
      layoutId="plutus-logo-container"
      className="flex justify-center items-baseline w-[25rem] font-mono text-6xl uppercase tracking-tight text-main-white"
    >
      Plutus
    </motion.div>
  </header>
);

export default Header;