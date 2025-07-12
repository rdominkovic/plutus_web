'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Card from '../ui/card';
import AboutSection from './about-section'; // Importamo AboutSection

interface ServiceItem {
  title: string;
  description: string;
  imageUrl: string;
}

const serviceItems: ServiceItem[] = [
    {
    title: 'AI Automatizacija',
    description: 'Implementacija naprednih AI rješenja za automatizaciju poslovnih procesa.',
    imageUrl: 'https://via.placeholder.com/800x450/582fcd/f8f7f4?text=AI',
  },
  {
    title: 'Optimizacija Procesa',
    description: 'Pametna optimizacija i digitalizacija poslovnih i proizvodnih procesa.',
    imageUrl: 'https://via.placeholder.com/800x450/c3fb5e/000000?text=Optimizacija',
  },
  {
    title: 'Integracija Sustava',
    description: 'Povezivanje softverskih alata i platformi u jedinstven ekosustav.',
    imageUrl: 'https://via.placeholder.com/800x450/f8f7f4/000000?text=Integracija',
  },
  {
    title: 'CRM Rješenja',
    description: 'Custom CRM sustavi za upravljanje odnosima s klijentima.',
    imageUrl: 'https://via.placeholder.com/800x450/007aff/f8f7f4?text=CRM',
  },
  {
    title: 'Fintech Analitika',
    description: 'Napredna vizualizacija i analiza financijskih podataka.',
    imageUrl: 'https://via.placeholder.com/800x450/fbbf24/000000?text=Fintech',
  },
  {
    title: 'Logistička Platforma',
    description: 'Praćenje i optimizacija logističkih procesa u realnom vremenu.',
    imageUrl: 'https://via.placeholder.com/800x450/f43f5e/f8f7f4?text=Logistika',
  },
];

const cardBgColors = [
  'bg-blue-700',
  'bg-green-700',
  'bg-purple-700',
  'bg-pink-700',
  'bg-yellow-700',
  'bg-red-700',
];

const WhatWeDoSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const cardsTotal = serviceItems.length;
  // Vraćam dodatni scroll prostor za grupnu animaciju
  const scrollTotal = cardsTotal + 1;

  // Vraćam ispravne pragove za dvostepeno nestajanje
  const startFade = cardsTotal / scrollTotal; // Počinje kad zadnja kartica završi s fokusom
  const midFade = (cardsTotal + 0.5) / scrollTotal; // Sredina (prvi scroll)
  const endFade = 1; // Kraj (drugi scroll)

  // Faza 1: Blago nestajanje. Faza 2: Potpuno nestajanje.
  // Ove animacije se sada primjenjuju SAMO na kontejner s karticama
  const cardsContainerScale = useTransform(scrollYProgress, [startFade, midFade, endFade], [1, 0.9, 0.8]);
  const cardsContainerOpacity = useTransform(scrollYProgress, [startFade, midFade, endFade], [1, 0.3, 0]);
  const cardsContainerBlur = useTransform(scrollYProgress, [startFade, midFade, endFade], [0, 10, 30]);
  const cardsContainerFilter = useTransform(cardsContainerBlur, (v) => `blur(${v}px)`);

  // --- Animacija za "O nama" sekciju ---
  // Koristi ISTE točke kao i nestajanje kartica za savršenu sinkronizaciju

  return (
    <section id="what-we-do" className="relative bg-main-black">
      {/* Glavni kontejner koji prati scroll i definira ukupnu visinu */}
      <div ref={scrollRef} className="relative" style={{ height: `${scrollTotal * 100}vh` }}>
        
        {/* Ovaj motion.div obuhvaća SAMO kartice i upravlja njihovim grupnim nestajanjem */}
        <motion.div
          className="relative w-full h-full"
          style={{
            scale: cardsContainerScale,
            opacity: cardsContainerOpacity,
            filter: cardsContainerFilter,
          }}
        >
          {serviceItems.map((item, i) => (
            <StickyServiceCard
              key={item.title}
              i={i}
              {...item}
              colorClass={cardBgColors[i % cardBgColors.length]}
              scrollYProgress={scrollYProgress}
              total={scrollTotal}
            />
          ))}
        </motion.div>

        {/* AboutSection je sada SIBLING kontejneru s karticama i neće nestati s njim */}
        <AboutSection
          scrollYProgress={scrollYProgress}
          startFade={startFade}
          midFade={midFade}
          endFade={endFade}
        />
      </div>
    </section>
  );
};

interface StickyServiceCardProps {
  i: number;
  title: string;
  description: string;
  imageUrl: string;
  colorClass: string;
  scrollYProgress: MotionValue<number>;
  total: number;
}

const StickyServiceCard = ({ i, title, description, imageUrl, colorClass, scrollYProgress, total }: StickyServiceCardProps) => {
  // Precizna definicija animacije za slaganje kao na Muradov stranici
  const inputRange = [
    i / total,          // 1. Kartica je u fokusu
    (i + 1) / total,    // 2. Sljedeća je u fokusu (ova je 1. iza)
    (i + 2) / total,    // 3. Ona iza sljedeće je u fokusu (ova je 2. iza)
    (i + 3) / total,    // 4. Ova kartica postaje nevidljiva
  ];

  // Kada je u fokusu, scale je 1. Suptilno se smanjuje iza.
  const scale = useTransform(scrollYProgress, inputRange, [1, 0.95, 0.9, 0.9]);
  
  // Pomak prema gore je manji, za gušće slaganje.
  const y = useTransform(scrollYProgress, inputRange, [0, -20, -40, -40]);

  // Ključno za "max 3 kartice" efekt. 1. i 2. su vidljive, 3. je blago, 4. nestaje.
  const opacity = useTransform(scrollYProgress, inputRange, [1, 1, 0.4, 0]);

  return (
    <motion.div
      className="sticky mx-auto max-w-3xl h-screen flex items-center"
      style={{
        top: 50,
        scale,
        y,
        opacity, // Vraćamo individualnu prozirnost
        zIndex: i,
      }}
    >
      <Card className={`overflow-hidden rounded-2xl shadow-2xl w-full h-[500px] flex flex-col ${colorClass}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-1/2 object-cover rounded-t-2xl"
          loading="lazy"
        />
        <div className="p-6 flex flex-col gap-2 justify-center h-1/2">
          <h3 className="font-mono text-xl md:text-2xl uppercase text-white mb-2">{title}</h3>
          <p className="font-sans text-gray-300 text-base md:text-lg">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default WhatWeDoSection;