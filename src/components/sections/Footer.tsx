"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 md:px-10 border-t border-border bg-background relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <a href="#" className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
            WALTER <span className="text-chrome-primary">IANIERI</span>
          </a>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase opacity-60 max-w-[200px]">
            {t(translations.footer.tagline)}
          </p>
        </div>

        <nav className="flex gap-8 md:gap-12">
          {[
            { label: t(translations.nav.work), href: "#projects" },
            { label: t(translations.nav.brands), href: "#brands" },
            { label: t(translations.nav.about), href: "#about" },
            { label: t(translations.nav.contact), href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase">
          © {year} Walter Ianieri. {t(translations.footer.copyright)}
        </div>
      </div>
    </footer>
  );
}
