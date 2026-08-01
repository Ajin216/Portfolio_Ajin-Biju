import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative z-10">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
