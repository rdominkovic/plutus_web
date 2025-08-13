'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const BottomNav: React.FC = () => {
  const items: NavItem[] = useMemo(
    () => [
      { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
      { id: 'about', label: 'O nama', href: '#about' },
      { id: 'services', label: 'Usluge', href: '#services' },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>('portfolio');

  useEffect(() => {
    const sectionIds = items.map((i) => i.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) {
      return;
    }

    // pratimo zadnje poznate omjere presjeka za svaku sekciju
    const ratios: Record<string, number> = Object.fromEntries(sectionIds.map((id) => [id, 0]));

    const pickActiveFromRatios = () => {
      let bestId = sectionIds[0];
      let bestRatio = -1;
      for (const id of sectionIds) {
        const r = ratios[id] ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestId = id;
        }
      }
      setActiveId(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        for (const entry of entries) {
          const id = entry.target.id;
          const ratio = entry.intersectionRatio || 0;
          if (ratios[id] !== ratio) {
            ratios[id] = ratio;
            changed = true;
          }
        }
        if (changed) {
          pickActiveFromRatios();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    // inicijalno izračunaj trenutno stanje
    pickActiveFromRatios();
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // Precizno centriranje za sticky sekcije (trenutno: O nama)
    if (id === 'about') {
      const rect = el.getBoundingClientRect();
      // Poravnaj vrh sekcije na 85% visine viewporta kako bi scrollYProgress krenuo od 0
      const targetTop = window.scrollY + rect.top - window.innerHeight * 0.30;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      return;
    }

    // Ostale sekcije poravnaj na početak
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Sekcijska navigacija"
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md shadow-lg shadow-black/30"
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'px-4 py-2 rounded-full text-xs md:text-sm font-mono uppercase transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                isActive
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-white/80 hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          );
        })}
      </motion.div>
    </nav>
  );
};


