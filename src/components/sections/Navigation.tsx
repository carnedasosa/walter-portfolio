"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll and handle focus trapping when mobile menu is open
  useEffect(() => {
    if (!mounted) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (!isMobileMenuOpen || !menuRef.current) return;
      
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
      window.addEventListener("keydown", handleFocusTrap);
    } else {
      document.body.style.overflow = "unset";
      // Return focus to toggle button when closed
      if (mounted) toggleRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isMobileMenuOpen, mounted]);

  const navLinks = [
    { href: "#projects", label: t(translations.nav.work) },
    { href: "#brands", label: t(translations.nav.brands) },
    { href: "#about", label: t(translations.nav.about) },
    { href: "#contact", label: t(translations.nav.contact) },
  ];

  // Animation Variants
  const containerVariants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    closed: {
      y: 40,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const burgerLine1 = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  };
  const burgerLine2 = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: 10 }
  };
  const burgerLine3 = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl py-4"
          : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            className="font-mono text-xs font-bold tracking-[0.2em] uppercase focus-visible:outline-white"
            aria-label="Walter Ianieri Home"
          >
            WALTER <span className="text-chrome-primary">IANIERI</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-8" role="list">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative px-3 py-1 font-mono text-xs tracking-widest uppercase text-muted-foreground transition-all duration-300 focus-visible:outline-white"
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
                className={`${lang === "it" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors focus-visible:outline-none`}
                aria-label="Switch to Italian"
              >
                IT
              </button>
              <span className="text-border">/</span>
              <button
                onClick={() => setLang("en")}
                className={`${lang === "en" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors focus-visible:outline-none`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-foreground p-2 relative z-[110] focus-visible:outline-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="flex flex-col gap-[5px] w-6 h-4 justify-center items-center">
              <motion.div
                variants={burgerLine1}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="h-px w-6 bg-foreground origin-center"
              />
              <motion.div
                variants={burgerLine2}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="h-px w-6 bg-foreground"
              />
              <motion.div
                variants={burgerLine3}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="h-px w-6 bg-foreground origin-center"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mounted && isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[100] px-10 flex flex-col justify-between pb-12 overflow-y-auto"
            style={{ 
              paddingTop: "max(8rem, env(safe-area-inset-top, 8rem))",
              paddingBottom: "max(3rem, env(safe-area-inset-bottom, 3rem))" 
            }}
          >
            <motion.div 
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-5xl font-bold hover:text-chrome-primary transition-colors block border-b border-border/50 pb-4"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-t border-border pt-8 flex flex-col gap-6"
            >
              <div className="flex gap-6 font-mono text-xs tracking-widest">
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
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Inquiries</span>
                <a href="mailto:walter@walterianieri.com" className="font-mono text-sm text-foreground hover:text-chrome-primary transition-colors">
                  walter@walterianieri.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
