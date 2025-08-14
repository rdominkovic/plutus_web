'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

// --- Helper komponenta za rotirajući tekst ---
const Marquee: React.FC = () => {
  const text = "ZAKAŽI POZIV • ";
  const marqueeText = Array(10).fill(text).join("");

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
      >
        <span className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tight text-white">{marqueeText}</span>
      </motion.div>
    </div>
  );
};

// --- Glavna komponenta sekcije ---
const ContactSection: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const email = 'robert.dominkovic@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Tekst iznad gumba */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
        className="mb-8 text-center"
      >
        <p className="font-sans text-lg md:text-xl text-white/80">
          Dopustite da vam pokažemo konkretan potencijal za rast vašeg poslovanja.
        </p>
        <p className="font-sans text-lg md:text-xl text-white/80">
          Rezervirajte uvodni poziv.
        </p>
      </motion.div>

      {/* Glavni CTA gumb s rotirajućim tekstom */}
      <motion.a
        href="https://cal.com/PLACEHOLDER" // Privremeni URL za kalendar
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
        className="group relative w-full max-w-4xl h-32 md:h-48 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm shadow-2xl shadow-black/30 overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
      >
        <Marquee />
      </motion.a>

      {/* Linkovi za email ispod gumba */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.8 }}
        className="mt-8 flex items-center justify-center gap-x-6 font-mono text-xs uppercase tracking-widest text-white/70"
      >
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <EnvelopeIcon className="h-4 w-4" />
          <span>[ {email} ]</span>
        </a>
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          {isCopied ? <ClipboardDocumentCheckIcon className="h-4 w-4 text-accent-green" /> : <ClipboardDocumentCheckIcon className="h-4 w-4" />}
          <span>[ {isCopied ? 'Kopirano!' : 'Kopiraj Email'} ]</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ContactSection;
