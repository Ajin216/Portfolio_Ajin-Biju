"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative min-h-dvh flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background abstract element (optional) */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        className="max-w-5xl w-full z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          variants={itemVariants}
          className="text-accent font-medium tracking-wide mb-4 uppercase text-sm md:text-base"
        >
          {PORTFOLIO_DATA.personal.role}
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8"
        >
          Hi, I&apos;m <span className="text-accent">{PORTFOLIO_DATA.personal.name}</span>. <br />
          <span className="text-muted-foreground/80">I build modern web experiences.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          {PORTFOLIO_DATA.personal.valueProposition}
        </motion.p>

        <motion.div variants={itemVariants}>
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
