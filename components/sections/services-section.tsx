'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard = ({ title, description }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8 backdrop-blur-md"
  >
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" />
    <h3 className="relative z-10 font-mono text-lg md:text-xl uppercase text-white mb-3">{title}</h3>
    <p className="relative z-10 font-sans text-white/80 text-base md:text-lg leading-relaxed">{description}</p>
  </motion.div>
);

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="bg-black">
      <div className="container mx-auto max-w-5xl px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h4 className="font-mono text-sm uppercase text-white/60 mb-3">../USLUGE</h4>
          <p className="font-sans text-2xl md:text-3xl lg:text-4xl !leading-tight uppercase text-white">
            Što nudimo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <ServiceCard
            title="Prilagođeni razvoj aplikacija"
            description="Dizajniramo i razvijamo aplikacije skrojene prema vašim poslovnim procesima: od ideje i arhitekture do implementacije i održavanja. Fokus na pouzdanost, sigurnost i mjerljive rezultate."
          />
          <ServiceCard
            title="AI agenti i automatizacija"
            description="Projektiramo AI agente koji samostalno obavljaju zadatke, integriraju se u postojeće tokove rada i smanjuju operativno opterećenje. Povezujemo modele, alate i podatke u koherentan sustav."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


