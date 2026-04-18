"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative py-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }
        }}
        className="flex justify-between items-end mb-24 border-b border-border pb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] bg-chrome-primary"
            ></motion.div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {t(translations.projects.label)}
            </span>
          </div>
          <h2 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter overflow-hidden">
            <motion.span
              key={t(translations.projects.title)}
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {t(translations.projects.title)}
            </motion.span>
          </h2>
        </div>
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest hidden md:block">
          {t(translations.projects.count)}
        </div>
      </motion.div>

      {/* Project List */}
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1
          }
        }
      }}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-12 md:gap-24 items-center border-b border-border/30 pb-24 md:pb-32 mb-24 md:mb-32 last:border-0 last:pb-0 last:mb-0 relative`}
    >
      {/* Background Index Number (Scroll parallax) */}
      <motion.div 
        style={{ y }}
        className={`absolute -top-12 ${index % 2 === 0 ? "left-0" : "right-0"} font-sans text-[12vw] font-black opacity-[0.03] select-none pointer-events-none hidden md:block`}
      >
        0{index + 1}
      </motion.div>

      {/* Image Side */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, scale: 0.95, x: index % 2 === 0 ? -20 : 20 },
          visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
        }}
        className={`w-full md:w-1/2 group relative overflow-hidden ${(project as any).aspectRatio || "aspect-[4/3]"} bg-card border border-border sticky-image`}
      >
         <motion.div 
           className="w-full h-full relative overflow-hidden"
           whileHover={{ scale: 1.05 }}
           transition={{ duration: 0.7 }}
         >
           <motion.img
             src={project.image}
             alt={project.title}
             style={{ 
               y: imageY, 
               scale: 1.1,
               objectPosition: (project as any).imagePosition || "center",
               objectFit: (project as any).objectFit || "cover"
             }}
             className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
           />
           {/* Mask Reveal Overlay */}
           <motion.div 
             initial={{ x: "0%" }}
             whileInView={{ x: "100%" }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
             className="absolute inset-0 bg-background z-10"
           />
         </motion.div>
         
         {/* Accent Overlay */}
         <div 
           className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
           style={{ backgroundColor: project.accentColor }}
         />

         <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/60 tracking-widest z-20">
           {project.year}
         </div>

         {/* Corner Accent */}
         <div 
           className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
           style={{ borderColor: project.accentColor }}
         />
      </motion.div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        {/* Tags */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          className="flex flex-wrap gap-2"
        >
          <span 
            className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 border"
            style={{ borderColor: project.accentColor, color: project.accentColor }}
          >
            {project.category}
          </span>
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 border border-border text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title & Number */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <span className="font-mono text-xs text-muted-foreground block mb-2">
            0{index + 1}
          </span>
          <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black group-hover:text-chrome-primary transition-colors cursor-pointer leading-tight">
            {project.title}
          </h3>
        </motion.div>

        {/* Tagline */}
        <motion.p 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="font-mono text-sm tracking-wide font-bold"
          style={{ color: project.accentColor }}
        >
          {t(project.tagline)}
        </motion.p>

        {/* Description */}
        <motion.p 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground max-w-md"
        >
          {t(project.description)}
        </motion.p>

        {/* Highlight Box */}
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8 } }
          }}
          className="border-l-2 pl-4 py-1 origin-left"
          style={{ borderColor: project.accentColor }}
        >
          <p className="font-mono text-xs tracking-wide text-foreground/80 italic">
            {t(project.highlight)}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.a
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 }
          }}
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
        </motion.a>
      </div>
    </motion.div>
  );
}
