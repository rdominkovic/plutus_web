'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Card from '../ui/card';
import Image from 'next/image';
import AboutSection from './about-section';

interface PortfolioItem {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

const portfolioItems: PortfolioItem[] = [
    {
    title: 'OptiFlow Procurement & Transport',
    description: 'Web aplikacija olakšava optimizaciju procesa nabave različitih dobara i organizaciju transportnih usluga. Direktna komunikacija s dobavljačima i prikupljanje ponuda su potpuno automatizirani, osiguravajući efikasnost, optimizirane troškove i brže logističke procese.',
    imageUrl: '/images/portfolio/optiflow.png',
  },
  {
    title: 'SmartWork Monitor',
    description: 'Aplikacija koja digitalizira operativne procese omogućujući precizan unos podataka. Sustav pruža analitiku u stvarnom vremenu za praćenje učinkovitosti, troškova i ključnih statistika. Time se postiže povećana operativna transparentnost, optimizacija resursa i brže donošenje informiranih odluka koje doprinose rastu i konkurentnosti poslovanja.',
    imageUrl: '/images/portfolio/SmartWorkMonitor.png',
  },
  {
    title: 'Digital Data Miner',
    description: 'Ova AI-pokretana Python skripta automatizira kompleksno prikupljanje web podataka s dvo-razinskom selekcijom, drastično smanjujući vrijeme potrebno za obavljanje monotonih zadataka. Omogućuje brzu isporuku preciznih podataka u različitim formatima (xlsx, docx, json, csv, xml, md), oslobađajući ljudske resurse za strateški važnije aktivnosti.',
    videoUrl: '/video/portfolio/Digital_data_miner.mp4',
  },
  {
    title: 'Interni ChatGPT',
    description: 'Interni AI chatbot integriran u web stranicu pruža trenutan pristup verificiranim odgovorima iz opsežne baze znanja. Navođenjem točnih izvora, sustav štedi vrijeme zaposlenika i drastično povećava operativnu efikasnost.',
    imageUrl: '/images/portfolio/ai_chatbot.png',
  },
];

const cardBgColors = [
  'bg-teal-900',
  'bg-slate-800',
  'bg-blue-900',
  'bg-green-900',
];

const PortfolioSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const cardsTotal = portfolioItems.length;
  // Povećavam dodatni scroll prostor za veći razmak između sekcija
  const scrollTotal = cardsTotal + 0.35;

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
    <section id="portfolio" className="relative bg-main-black" aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading" className="sr-only">Portfolio radovi</h2>
      {/* Glavni kontejner koji prati scroll i definira ukupnu visinu */}
      <div ref={scrollRef} className="relative" style={{ height: `${scrollTotal * 100}svh` }}>
        
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

        {/* AboutSection je uklonjena iz portfolio sekcije */}
      </div>
    </section>
  );
};

interface StickyPortfolioCardProps {
  i: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  colorClass: string;
  scrollYProgress: MotionValue<number>;
  total: number;
}

const StickyPortfolioCard = ({ i, title, description, imageUrl, videoUrl, colorClass, scrollYProgress, total }: StickyPortfolioCardProps) => {
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
      className="sticky mx-auto max-w-3xl min-h-[100svh] flex items-center justify-center"
      style={{
        top: 0,
        scale,
        y,
        opacity, // Vraćamo individualnu prozirnost
        zIndex: i,
      }}
    >
      <Card className={`overflow-hidden rounded-2xl shadow-2xl w-full h-[500px] flex flex-col ${colorClass}`}>
        <div className="relative h-1/2 w-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill={false as unknown as undefined}
              width={1200}
              height={600}
              className="h-full w-full rounded-t-2xl object-cover"
              priority={i === 0}
            />
          )}
          {videoUrl && (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-t-2xl object-cover"
            />
          )}
          {i === 2 && (
            <p className="absolute bottom-1 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-mono text-main-white backdrop-blur-sm">
              Video ilustrira automatizirani pozadinski proces skripte, a ne front-end sučelje aplikacije.
            </p>
          )}
          {(i === 0 || i === 1) && (
            <p className="absolute bottom-1 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-main-white/90 backdrop-blur-sm">
              Ilustrativna slika: Konceptualni prikaz sučelja radi zaštite povjerljivosti podataka klijenta.
            </p>
          )}
        </div>
        <div className="p-6 flex flex-col justify-center h-1/2">
          <h3 className="font-mono text-xl md:text-2xl uppercase text-white mb-2">{title}</h3>
          <p className="font-sans text-gray-300 text-base md:text-lg">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default PortfolioSection;