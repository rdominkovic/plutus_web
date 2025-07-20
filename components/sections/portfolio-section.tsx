'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Card from '../ui/card';
import AboutSection from './about-section';

interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
}

const portfolioItems: PortfolioItem[] = [
    {
    title: 'OptiFlow Procurement & Transport',
    description: 'Web aplikacija olakšava optimizaciju procesa nabave različitih dobara i organizaciju transportnih usluga, podržavajući ručni unos podataka. Direktna komunikacija s dobavljačima i prikupljanje ponuda su potpuno automatizirani, osiguravajući efikasnost, optimizirane troškove i brže logističke procese.',
    imageUrl: '/images/portfolio/optiflow.png',
  },
  {
    title: 'SmartWork Monitor',
    description: 'Aplikacija koja digitalizira operativne procese omogućujući precizan unos podataka. Sustav pruža menadžmentu analitiku u stvarnom vremenu za praćenje učinkovitosti, troškova i ključnih statistika. Time se postiže povećana operativna transparentnost, optimizacija resursa i brže donošenje informiranih odluka koje doprinose rastu i konkurentnosti poslovanja.',
    imageUrl: '/images/portfolio/SmartWorkMonitor.png',
  },
  {
    title: 'Automatizacija Marketinga',
    description: 'Implementacija pametnih sustava za automatizaciju marketinških kampanja i analizu podataka.',
    imageUrl: 'https://via.placeholder.com/800x450/f8f7f4/000000?text=Marketing',
  },
  {
    title: 'Logistička Optimizacija',
    description: 'Napredna rješenja za optimizaciju ruta, upravljanje zalihama i praćenje pošiljki.',
    imageUrl: 'https://via.placeholder.com/800x450/f43f5e/f8f7f4?text=Logistika',
  },
];

const cardBgColors = [
  'bg-emerald-700',
  'bg-slate-700',
  'bg-purple-700',
  'bg-pink-700',
];

const PortfolioSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const cardsTotal = portfolioItems.length;
  // Smanjujem dodatni scroll prostor da bi se smanjio prazni hod nakon fade-a
  const scrollTotal = cardsTotal + 0.5;

  // Pragovi za nestajanje kartica (ostaju isti kao korisnikova promjena)
  const startFade = cardsTotal / scrollTotal;
  const midFade = (cardsTotal + 0.3) / scrollTotal;
  const endFade = (cardsTotal + 0.5) / scrollTotal;

  // Faza 1: Blago nestajanje. Faza 2: Potpuno nestajanje.
  // Ove animacije se sada primjenjuju SAMO na kontejner s karticama
  const cardsContainerScale = useTransform(scrollYProgress, [startFade, midFade, endFade], [1, 0.9, 0.8]);
  const cardsContainerOpacity = useTransform(scrollYProgress, [startFade, midFade, endFade], [1, 0.3, 0]);
  const cardsContainerBlur = useTransform(scrollYProgress, [startFade, midFade, endFade], [0, 10, 30]);
  const cardsContainerFilter = useTransform(cardsContainerBlur, (v) => `blur(${v}px)`);

  // About počinje točno kad i fade kartica, i završava brže za brzo pojavljivanje
  const aboutStart = startFade;
  const aboutEnd = (cardsTotal + 0.3) / scrollTotal; // Završava prije potpunog fade-a kartica


  return (
    <section id="portfolio" className="relative bg-main-black">
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
          {portfolioItems.map((item, i) => (
            <StickyPortfolioCard
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
          aboutStart={aboutStart}
          aboutEnd={aboutEnd}
        />
      </div>
    </section>
  );
};

interface StickyPortfolioCardProps {
  i: number;
  title: string;
  description: string;
  imageUrl: string;
  colorClass: string;
  scrollYProgress: MotionValue<number>;
  total: number;
}

const StickyPortfolioCard = ({ i, title, description, imageUrl, colorClass, scrollYProgress, total }: StickyPortfolioCardProps) => {
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

export default PortfolioSection;