"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate API call
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-10 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_50%_50%_at_100%_100%,rgba(226,232,240,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 relative z-10">
        {/* Left Column: Info */}
        <div className="flex flex-col gap-16">
          <div>
            <h2 className="font-sans text-5xl md:text-7xl font-black leading-tight uppercase tracking-tighter">
              {t(translations.contact.titleLines[0])}
              <br />
              {t(translations.contact.titleLines[1])}
              <br />
              <span className="text-chrome-primary glow-chrome">
                {t(translations.contact.titleLines[2])}
              </span>
            </h2>
            <p className="mt-8 font-mono text-sm tracking-widest uppercase text-muted-foreground">
              {t(translations.contact.subtitle)}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {[
              { label: "Email", value: "walter@walterianieri.com", href: "mailto:walter@walterianieri.com" },
              { label: "Location", value: "Puglia, IT", href: null },
              { label: "LinkedIn", value: "/in/walterianieri", href: "https://linkedin.com/in/walterianieri" },
            ].map((item) => (
              <div key={item.label}>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-2 font-bold">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-sans text-lg md:text-xl font-medium hover:text-chrome-primary transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="font-sans text-lg md:text-xl font-medium">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {formState !== "success" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    {t(translations.contact.form.name)}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="border border-border bg-transparent px-6 py-4 font-sans text-sm focus:border-chrome-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    {t(translations.contact.form.email)}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="border border-border bg-transparent px-6 py-4 font-sans text-sm focus:border-chrome-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    {t(translations.contact.form.message)}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="..."
                    className="border border-border bg-transparent px-6 py-4 font-sans text-sm focus:border-chrome-primary focus:outline-none transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="mt-4 border border-chrome-primary bg-chrome-primary px-10 py-5 font-mono text-xs tracking-widest uppercase text-background hover:bg-transparent hover:text-chrome-primary transition-all duration-300 disabled:opacity-50"
                >
                  {formState === "loading" ? "..." : t(translations.contact.form.submit)}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-12 border border-chrome-primary border-chrome bg-card h-full"
              >
                <h3 className="font-sans text-3xl font-black text-chrome-primary uppercase mb-4">
                  {t(translations.contact.success.title)}
                </h3>
                <p className="font-mono text-sm text-foreground/80 mb-10 max-w-xs">
                  {t(translations.contact.success.subtitle)}
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="font-mono text-xs tracking-widest uppercase border-b border-chrome-primary text-chrome-primary hover:text-foreground hover:border-foreground transition-all duration-300"
                >
                  {t(translations.contact.success.reset)}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
