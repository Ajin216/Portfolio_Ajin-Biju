"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";
import { Database, Server, Code2, Box, FileCode2, Globe, Code, ChevronDown } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 2.7 5 3.1 5 3.1a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 10.7c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ROLES = [
  "SOFTWARE ENGINEER",
  "MERN STACK DEVELOPER",
  "PROBLEM SOLVER"
];

const TECH_STACK = [
  { name: "MongoDB", icon: Database },
  { name: "Express", icon: Server },
  { name: "React", icon: Code2 },
  { name: "Node.js", icon: Box },
  { name: "TypeScript", icon: FileCode2 },
  { name: "Next.js", icon: Globe },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  useEffect(() => {
    // Only animate if prefers-reduced-motion is false
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const badgeContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.4 },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" } },
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
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center mb-6">
          <div className="h-5 overflow-hidden relative flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-accent font-medium tracking-wide uppercase text-sm"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Headline */}
        <motion.div 
          variants={headlineVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2">
            <motion.span variants={textVariants}>Hi,</motion.span>
            <motion.span variants={textVariants}>I&apos;m</motion.span>
            <motion.span variants={textVariants} className="text-accent drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              {PORTFOLIO_DATA.personal.name}.
            </motion.span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-muted-foreground/80">
            {"I build modern web experiences.".split(" ").map((word, i) => (
              <motion.span key={i} variants={textVariants}>{word}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
        >
          {PORTFOLIO_DATA.personal.valueProposition}
        </motion.p>

        {/* Tech Badges */}
        <motion.div 
          variants={badgeContainerVariants}
          className="flex flex-wrap gap-3 mb-10"
        >
          {TECH_STACK.map((tech) => (
            <motion.div key={tech.name} variants={badgeVariants} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground text-xs font-medium hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
              <tech.icon className="w-3.5 h-3.5" />
              {tech.name}
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs and Socials */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/40 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
            >
              Contact Me
            </a>
          </div>
          
          <div className="flex items-center gap-5 sm:ml-4">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300">
              <Code className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
