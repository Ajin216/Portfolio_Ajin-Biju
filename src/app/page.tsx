import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { DemoProjects } from "@/components/DemoProjects";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <DemoProjects />

      <Contact />
      <Footer />
    </main>
  );
}
