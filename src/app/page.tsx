"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { WallOfBrands } from "@/components/sections/WallOfBrands";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor").then(mod => mod.CustomCursor), {
  ssr: false,
});

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
        <CustomCursor />
        <Navigation />
        <Hero />
        <Projects />
        <WallOfBrands />
        <About />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
