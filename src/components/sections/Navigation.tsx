"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#projects", label: t(translations.nav.work) },
    { href: "#brands", label: t(translations.nav.brands) },
    { href: "#about", label: t(translations.nav.about) },
    { href: "#contact", label: t(translations.nav.contact) },
  ];

  return (
    <>
      <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
          WALTER <span className="text-chrome-primary">IANIERI</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-3 py-1 font-mono text-xs tracking-widest uppercase text-muted-foreground transition-all duration-300"
              >
                <span className="relative z-10 group-hover:text-foreground transition-colors">
                  {link.label}
                </span>
                <span className="absolute inset-0 bg-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 border border-white/10 rounded-sm transition-all duration-300 -z-0" />
              </a>
            ))}
          </div>

          {/* Lang Toggle */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setLang("it")}
              className={`${lang === "it" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
            >
              IT
            </button>
            <span className="text-border">/</span>
            <button
              onClick={() => setLang("en")}
              className={`${lang === "en" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <div className="flex flex-col gap-[5px]">
            <div className="h-px w-6 bg-foreground"></div>
            <div className="h-px w-6 bg-foreground"></div>
            <div className="h-px w-6 bg-foreground"></div>
          </div>}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-50 px-10 pt-32 flex flex-col justify-between pb-12"
          >
            <button
              className="absolute top-8 right-6 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-4xl font-bold hover:text-chrome-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="border-t border-border pt-8 flex flex-col gap-4">
              <div className="flex gap-4 font-mono text-xs">
                <button
                  onClick={() => { setLang("it"); setIsMobileMenuOpen(false); }}
                  className={lang === "it" ? "text-foreground" : "text-muted-foreground"}
                >
                  ITALIANO
                </button>
                <button
                  onClick={() => { setLang("en"); setIsMobileMenuOpen(false); }}
                  className={lang === "en" ? "text-foreground" : "text-muted-foreground"}
                >
                  ENGLISH
                </button>
              </div>
              <a href="mailto:walter@walterianieri.com" className="font-mono text-xs text-muted-foreground">
                walter@walterianieri.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] px-10 pt-32 flex flex-col justify-between pb-12"
          >
            <button
              className="absolute top-8 right-6 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-4xl font-bold hover:text-chrome-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="border-t border-border pt-8 flex flex-col gap-4">
              <div className="flex gap-4 font-mono text-xs">
                <button
                  onClick={() => { setLang("it"); setIsMobileMenuOpen(false); }}
                  className={lang === "it" ? "text-foreground" : "text-muted-foreground"}
                >
                  ITALIANO
                </button>
                <button
                  onClick={() => { setLang("en"); setIsMobileMenuOpen(false); }}
                  className={lang === "en" ? "text-foreground" : "text-muted-foreground"}
                >
                  ENGLISH
                </button>
              </div>
              <a href="mailto:walter@walterianieri.com" className="font-mono text-xs text-muted-foreground">
                walter@walterianieri.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
