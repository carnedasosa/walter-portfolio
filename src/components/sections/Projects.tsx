"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-24 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-chrome-primary"></div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {t(translations.projects.label)}
            </span>
          </div>
          <h2 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter">
            {t(translations.projects.title)}
          </h2>
        </div>
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest hidden md:block">
          {t(translations.projects.count)}
        </div>
      </div>

      {/* Project List */}
      <div className="flex flex-col gap-32 md:gap-48">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-12 md:gap-24 items-center`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 group relative overflow-hidden aspect-[4/3] bg-card border border-border">
               <motion.div 
                 className="w-full h-full"
                 whileHover={{ scale: 1.05 }}
                 transition={{ duration: 0.7 }}
               >
                 <img
                   src={project.image}
                   alt={project.title}
                   className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                 />
               </motion.div>
               
               {/* Accent Overlay */}
               <div 
                 className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                 style={{ backgroundColor: project.accentColor }}
               />

               <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/60 tracking-widest">
                 {project.year}
               </div>

               {/* Corner Accent */}
               <div 
                 className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ borderColor: project.accentColor }}
               />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span 
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 border"
                  style={{ borderColor: project.accentColor, color: project.accentColor }}
                >
                  {project.category}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Number */}
              <div>
                <span className="font-mono text-xs text-muted-foreground block mb-2">
                  0{index + 1}
                </span>
                <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black group-hover:text-chrome-primary transition-colors cursor-pointer">
                  {project.title}
                </h3>
              </div>

              {/* Tagline */}
              <p 
                className="font-mono text-sm tracking-wide font-bold"
                style={{ color: project.accentColor }}
              >
                {t(project.tagline)}
              </p>

              {/* Description */}
              <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground max-w-md">
                {t(project.description)}
              </p>

              {/* Highlight Box */}
              <div 
                className="border-l-2 pl-4 py-1"
                style={{ borderColor: project.accentColor }}
              >
                <p className="font-mono text-xs tracking-wide text-foreground/80 italic">
                  {t(project.highlight)}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`#${project.id}`}
                className="group flex items-center gap-4 font-mono text-xs tracking-widest uppercase mt-4 w-fit"
              >
                {t(translations.projects.discover)}
                <div className="relative h-[1px] w-8 overflow-hidden">
                   <div 
                     className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:w-full"
                     style={{ backgroundColor: project.accentColor }}
                   ></div>
                   <motion.div 
                     className="absolute inset-0 w-8 h-full"
                     whileHover={{ width: 64 }}
                     style={{ backgroundColor: project.accentColor }}
                   />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
