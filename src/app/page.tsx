import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { WallOfBrands } from "@/components/sections/WallOfBrands";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
      <Navigation />
      <Hero />
      <Projects />
      <WallOfBrands />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
