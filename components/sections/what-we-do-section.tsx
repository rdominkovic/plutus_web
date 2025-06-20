// path: components/sections/what-we-do-section.tsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Card from '../ui/card';

const services = [
  {
    title: 'AI Automatizacija Poslovanja',
    description: 'Implementiramo napredne AI sustave koji automatiziraju repetitivne zadatke, smanjuju mogućnost ljudske pogreške i oslobađaju vaše zaposlenike za strateške aktivnosti.',
    imageUrl: 'https://via.placeholder.com/800x450/582fcd/f8f7f4?text=AI+Automation'
  },
  {
    title: 'Optimizacija Proizvodnih Procesa',
    description: 'Analiziramo vaše proizvodne linije i procese te uvodimo pametna rješenja za praćenje učinkovitosti, prediktivno održavanje i maksimalno iskorištavanje resursa.',
    imageUrl: 'https://via.placeholder.com/800x450/c3fb5e/000000?text=Process+Optimization'
  },
  {
    title: 'Integracija Pametnih Rješenja',
    description: 'Povezujemo različite softverske alate i platforme u jedinstven, inteligentan ekosustav koji vam pruža cjelovit uvid u poslovanje i omogućuje donošenje odluka temeljenih na podacima.',
    imageUrl: 'https://via.placeholder.com/800x450/f8f7f4/000000?text=Smart+Integration'
  },
];

const cardBackgrounds = [
  'bg-gray-600',
  'bg-gray-550',
  'bg-gray-500'
];

const WhatWeDoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={sectionRef} className="relative bg-main-black h-[200vh]">
        {/* Visina je sada na samoj sekciji, nema više pomoćnog diva */}
        {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              i={i}
              {...service}
              background={cardBackgrounds[i]}
              scrollYProgress={scrollYProgress}
            />
        ))}
    </section>
  );
};

const ServiceCard = ({ i, title, description, imageUrl, background, scrollYProgress }: {
  i: number;
  title: string;
  description: string;
  imageUrl: string;
  background: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const totalCards = services.length;
  
  // Svaka kartica ima svoj "slot" za skrolanje (npr. za 3 kartice, svaka zauzima 0.33 napretka).
  const slotSize = 1 / totalCards;
  
  // Početak slota za ovu karticu.
  const slotStart = i * slotSize;
  
  // Animacija se događa samo u prvoj polovici slota, ostatak je "prazan hod".
  const animationEnd = slotStart + (slotSize * 0.5);

  const scale = useTransform(
    scrollYProgress,
    // Mapiramo [početak slota] -> [kraj animacije] na [puna veličina] -> [smanjena veličina]
    [slotStart, animationEnd],
    [1, 0.95],
    { clamp: true } // Osigurava da vrijednost ne ide izvan zadanog ranga
  );

  return (
    <motion.div
      className="sticky w-full"
      style={{
        // Prva kartica se lijepi 100px od vrha, svaka sljedeća točno 50px niže.
        top: `${50 + i * 50}px`,
        scale,
      }}
    >
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <Card
          className={`w-full overflow-hidden ${background} h-[60vh] flex flex-col`}
          gradient={false}
        >
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-[200px] object-cover rounded-t-lg" 
          />
          <div className="p-6 flex-grow">
            <h3 className="font-mono text-xl md:text-2xl uppercase text-gray-1000 mb-4">{title}</h3>
            <p className="font-sans text-gray-700">{description}</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default WhatWeDoSection;