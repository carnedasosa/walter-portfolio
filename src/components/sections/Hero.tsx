"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const { t, tArr } = useLanguage();
  const [index, setIndex] = useState(0);
  const disciplines = tArr(translations.hero.disciplines);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % disciplines.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [disciplines.length]);

  return (
    <section className="relative min-h-screen hero-grid px-6 pt-28 pb-12 md:px-10 flex flex-col justify-between overflow-hidden">
      {/* Accent Glow Orb */}
      <div className="absolute top-[-128px] right-[-128px] w-[600px] height-[600px] rounded-full opacity-5 bg-[radial-gradient(circle,rgba(226,232,240,0.5)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Meta Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-between mb-3 font-mono text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground z-10"
      >
        <div className="flex gap-4">
          <span>{t(translations.hero.year)}</span>
          <span className="text-border">|</span>
          <span>{t(translations.hero.location)}</span>
        </div>
        <div className="hidden md:block">
          <span>{t(translations.hero.role)}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px w-10 bg-chrome-primary"></div>
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-chrome-primary">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {disciplines[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight">
          {t(translations.hero.headlineLines[0])}
          <br />
          <span className="text-chrome-primary glow-chrome">
            {t(translations.hero.headlineLines[1])}
          </span>
        </h1>

        <div className="mt-8 max-w-lg">
          <p className="font-mono text-xs md:text-sm leading-relaxed tracking-wide text-muted-foreground">
            {t(translations.hero.subtitle)}
          </p>

          <div className="mt-10 flex items-center gap-8">
            <a
              href="#projects"
              className="group border border-foreground px-8 py-4 font-mono text-xs tracking-widest uppercase flex items-center gap-3 hover:border-chrome-primary hover:text-chrome-primary transition-all"
            >
              {t(translations.hero.cta)}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M1 11L11 1M11 1H1M11 1V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <span className="hidden md:block font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              {t(translations.hero.projectsCount)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-end z-10">
        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-px bg-border overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-chrome-primary origin-top"
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
            {t(translations.hero.scroll)}
          </span>
        </div>

        {/* Stats */}
        <div className="hidden md:flex gap-16">
          {translations.hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-sans text-3xl font-black">{stat.value}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                {t(stat)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
