"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { motion } from "framer-motion";

export function About() {
  const { t } = useLanguage();

  const skills = [
    "Rhinoceros 3D",
    "V-Ray",
    "KeyShot",
    "AutoCAD",
    "SolidWorks",
    "Adobe CC",
    "Blender",
    "Cinema 4D",
  ];

  return (
    <section id="about" className="relative py-24 px-6 md:px-10 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[800px] bg-[radial-gradient(ellipse_40%_60%_at_0%_50%,rgba(203,213,225,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center relative z-10">
        {/* Left Column: Bio & Skills */}
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="font-sans text-5xl md:text-7xl font-black leading-tight uppercase tracking-tighter">
              {t(translations.about.titleLines[0])}
              <br />
              <span className="text-chrome-tertiary glow-platinum">
                {t(translations.about.titleLines[1])}
              </span>
            </h2>
            <p className="mt-8 font-sans text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {t(translations.about.bio)}
            </p>
          </div>

          <div className="border-l-2 border-chrome-tertiary pl-6 py-4 bg-muted/20">
            <span className="font-mono text-[10px] tracking-widest uppercase text-chrome-tertiary block mb-2 font-bold">
              {t(translations.about.approachLabel)}
            </span>
            <p className="font-sans text-sm md:text-base text-foreground/90">
              {t(translations.about.approachText)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border border-border hover:border-chrome-tertiary hover:text-chrome-tertiary transition-colors duration-300 pointer-cursor"
              >
                {skill}
              </span>
            ))}
          </div>

          <a
            href="#"
            className="group w-fit border border-chrome-tertiary px-10 py-5 font-mono text-xs tracking-widest uppercase text-chrome-tertiary transition-all duration-300 flex items-center gap-4 btn-fill-left"
          >
            <span className="relative z-10 flex items-center gap-4">
              {t(translations.about.download)}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-y-1"
              >
                <path
                  d="M7 1V10M7 10L11 6M7 10L3 6M1 13H13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Right Column: Portrait & Stats */}
        <div className="relative group">
          <div className="aspect-[3/4] overflow-hidden border border-border relative">
            <img
              src="/assets/about/walter-front.png"
              alt="Walter Ianieri"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-chrome-tertiary" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-chrome-tertiary" />
          </div>

          {/* Floating Stat Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            className="absolute -bottom-8 -right-4 md:-right-8 border border-border bg-card p-8 md:p-10 shadow-2xl z-20"
          >
            <div className="flex flex-col gap-1">
              <span className="font-sans text-5xl md:text-6xl font-black text-chrome-tertiary">
                {translations.about.expValue}
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">
                {t(translations.about.expLabel)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
