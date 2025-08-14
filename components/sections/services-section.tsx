'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Service {
  title: string;
  shortDescription: string;
  details: string[];
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onExpand: () => void;
}

const servicesData: Service[] = [
  {
    title: 'Prilagođeni razvoj aplikacija',
    shortDescription:
      'Dizajniramo i razvijamo softverska rješenja po mjeri: od web aplikacija za optimizaciju procesa do sustava za praćenje ključnih poslovnih metrika. Rješenja su fokusirana na pouzdanost, sigurnost i mjerljive rezultate.',
    details: [
      'Razvoj web aplikacija (npr. za nabavu, logistiku)',
      'Implementacija sustava za praćenje učinkovitosti u proizvodnji',
      'Dizajn i optimizacija korisničkog sučelja (UI/UX)',
      'Integracija s postojećim alatima i API-jevima',
      'Održavanje i tehnička podrška',
    ],
  },
  {
    title: 'AI Agenti i Automatizacija',
    shortDescription:
      'Kreiramo pametne AI agente koji automatiziraju repetitivne zadatke, obrađuju podatke i pružaju internu podršku. Oslobađamo vaš tim za strateške ciljeve, smanjujući monotoni rad i povećavajući efikasnost.',
    details: [
      'Razvoj AI chatbota',
      'Automatizacija uredskih i administrativnih zadataka',
      'Integracija AI modela u postojeće poslovne aplikacije',
      'Kreiranje sustava za podršku pri odlučivanju',
      'Fino podešavanje (fine-tuning) jezičnih modela',
    ],
  },
];

const ServiceCard = ({ service, isExpanded, onExpand }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    className={[
      'relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8 backdrop-blur-md shadow-xl shadow-black/20 transition-colors',
      isExpanded ? 'bg-white/[0.08]' : 'hover:bg-white/[0.08]'
    ].join(' ')}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_70%_-50%,rgba(255,255,255,0.06),transparent)]" />
    <h3 className="relative z-10 font-mono text-2xl md:text-3xl uppercase text-white mb-4 tracking-tight">{service.title}</h3>
    <p className="relative z-10 font-sans text-white/75 text-base md:text-lg leading-relaxed">
      {service.shortDescription}
    </p>

    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-10 mt-6 overflow-hidden divide-y divide-white/10"
        >
          {service.details.map((item, idx) => (
            <li
              key={idx}
              className="relative pl-8 py-3 font-sans text-sm md:text-base text-white/90"
            >
              <span className="pointer-events-none absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-white/30" />
              {item}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>

    <div className="relative z-10 mt-8">
      {!isExpanded ? (
        <button
          type="button"
          onClick={onExpand}
          className="w-full inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-white hover:bg-white/[0.1] hover:border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          PRIKAŽI VIŠE  +
        </button>
      ) : (
        <a
          href="#contact"
          className="w-full inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-white hover:bg-white/[0.1] hover:border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          KONTAKTIRAJTE NAS
        </a>
      )}
    </div>
  </motion.div>
);

const ServicesSection: React.FC = () => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const handleExpand = (index: number) => {
    setExpanded((prev) => {
      // dozvoli više otvorenih kartica; jednom otvorena ostaje otvorena
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <section id="services" className="bg-black">
      <div className="container mx-auto max-w-5xl px-4 py-24 md:py-12 min-h-[100svh] flex flex-col justify-center pb-[20svh]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {servicesData.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              isExpanded={expanded.has(idx)}
              onExpand={() => handleExpand(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


