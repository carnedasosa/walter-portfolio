"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { brands } from "@/data/brands";
import { motion } from "framer-motion";

export function WallOfBrands() {
  const { t } = useLanguage();

  const sectorColors: any = {
    horeca: "#ff2d2d",
    luxury: "#c9a84c",
    industrial: "#00d4ff",
  };

  return (
    <section id="brands" className="relative py-24 px-6 md:px-10 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,212,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-sans text-5xl md:text-7xl font-black leading-tight uppercase tracking-tighter">
            {t(translations.brands.titleLines[0])}
            <br />
            <span className="text-neon-blue glow-blue">
              {t(translations.brands.titleLines[1])}
            </span>
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-lg">
            {t(translations.brands.subtitle)}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-8 mb-12 border-b border-border pb-8">
          {Object.entries(translations.brands.sectors).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <div
                className="h-1.5 w-6"
                style={{ backgroundColor: sectorColors[key] }}
              />
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
                {t(label)}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-3 bg-border gap-px border-y border-border">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              className="bg-background relative p-12 flex flex-col items-center justify-center min-h-[240px] group transition-colors hover:bg-card overflow-hidden"
            >
              {/* Sector Accent Line */}
              <motion.div
                variants={{
                  hover: { width: "100%" },
                }}
                initial={{ width: 0 }}
                className="absolute top-0 left-0 h-px transition-all duration-500"
                style={{ backgroundColor: brand.color }}
              />

              <div className="flex flex-col items-center gap-4">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: brand.color }}
                />
                <h3 className="font-sans text-xl font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-all duration-300">
                  {brand.name}
                </h3>
              </div>

              {/* Sector Tag (Corner) */}
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span 
                  className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border"
                  style={{ borderColor: brand.color, color: brand.color }}
                >
                  {t((translations.brands.sectors as any)[brand.sector])}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NDA Footer */}
        <p className="mt-8 font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          {t(translations.brands.nda)}
        </p>
      </div>
    </section>
  );
}
