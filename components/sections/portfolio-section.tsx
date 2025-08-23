'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Card from '../ui/card';
import Image from 'next/image';
import AboutSection from './about-section';

interface PortfolioItem {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

interface StickyPortfolioCardProps {
  i: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  colorClass: string;
  scrollYProgress: MotionValue<number>;
  total: number;
  t: any;
}

const PortfolioSection = () => {
  const t = useTranslations('PortfolioSection');
  
  const portfolioItems: PortfolioItem[] = [
    {
      title: t('logisync_title'),
      description: t('logisync_desc'),
      imageUrl: '/images/portfolio/optiflow.webp',
    },
    {
      title: t('smartwork_title'),
      description: t('smartwork_desc'),
      imageUrl: '/images/portfolio/SmartWorkMonitor.png',
    },
    {
      title: t('digital_miner_title'),
      description: t('digital_miner_desc'),
      videoUrl: '/video/portfolio/Digital_data_miner.mp4',
    },
    {
      title: t('chatbot_title'),
      description: t('chatbot_desc'),
      imageUrl: '/images/portfolio/ai_chatbot.png',
    },
  ];

  const cardBgColors = [
    'bg-teal-900',
    'bg-slate-800',
    'bg-blue-900',
    'bg-green-900',
  ];

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

  const StickyPortfolioCard = ({ i, title, description, imageUrl, videoUrl, colorClass, scrollYProgress, total, t }: StickyPortfolioCardProps) => {
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
          top: '2rem',
          scale,
          y,
          opacity, // Vraćamo individualnu prozirnost
          zIndex: i,
        }}
      >
        <Card className={`overflow-hidden rounded-2xl shadow-2xl w-full h-auto min-h-[500px] md:h-[500px] flex flex-col ${colorClass}`}>
          <div className="relative h-48 md:h-1/2 w-full">
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
                {t('video_note')}
              </p>
            )}
            {(i === 0 || i === 1) && (
              <p className="absolute bottom-1 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-main-white/90 backdrop-blur-sm">
                {t('image_note')}
              </p>
            )}
          </div>
          <div className="p-4 md:p-6 flex flex-col justify-start md:justify-center h-auto md:h-1/2 flex-1">
            <h3 className="font-mono text-lg md:text-xl lg:text-2xl uppercase text-white mb-3 md:mb-4">{title}</h3>
            <hr className="border-white/20 mb-3 md:mb-4" />
            <p className="font-sans text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">{description}</p>
          </div>
        </Card>
      </motion.div>
    );
  };

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
              t={t}
            />
          ))}
        </motion.div>

        {/* AboutSection je uklonjena iz portfolio sekcije */}
      </div>
    </section>
  );
};

export default PortfolioSection;