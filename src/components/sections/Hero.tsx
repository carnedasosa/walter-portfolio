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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // Apple-style ease
      },
    },
  };

  const lineVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="relative min-h-screen hero-grid px-6 pt-28 pb-12 md:px-10 flex flex-col justify-between overflow-hidden">
      {/* Accent Glow Orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        className="absolute top-[-128px] right-[-128px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.5)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Top Meta Row */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex justify-between mb-3 font-mono text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground z-10"
      >
        <motion.div variants={itemVariants} className="flex gap-4">
          <span>{t(translations.hero.year)}</span>
          <span className="text-border">|</span>
          <span>{t(translations.hero.location)}</span>
        </motion.div>
        <motion.div variants={itemVariants} className="hidden md:block">
          <span>{t(translations.hero.role)}</span>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 flex flex-col justify-center z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px w-10 bg-chrome-primary"></div>
          <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-chrome-primary relative">
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

        <motion.h1
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              }
            }
          }}
          className="font-sans text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight"
        >
          <div className="overflow-hidden">
            <motion.div variants={lineVariants}>
              {t(translations.hero.headlineLines[0])}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div variants={lineVariants} className="text-chrome-primary glow-chrome pb-5">
              {t(translations.hero.headlineLines[1])}
            </motion.div>
          </div>
        </motion.h1>

        <motion.div variants={itemVariants} className="mt-8 max-w-lg">
          <p className="font-mono text-xs md:text-sm leading-relaxed tracking-wide text-muted-foreground">
            {t(translations.hero.subtitle)}
          </p>

          <div className="mt-10 flex items-center gap-8">
            <a
              href="#projects"
              className="group border border-foreground px-8 py-4 font-mono text-xs tracking-widest uppercase flex items-center gap-3 hover:border-chrome-primary hover:text-chrome-primary transition-all relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
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
              </span>
            </a>
            <span className="hidden md:block font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              {t(translations.hero.projectsCount)}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex justify-between items-end z-10"
      >
        {/* Scroll Indicator */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
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
        </motion.div>

        {/* Stats */}
        <div className="hidden md:flex gap-16">
          {translations.hero.stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col">
              <span className="font-sans text-3xl font-black">{stat.value}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                {t(stat)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

