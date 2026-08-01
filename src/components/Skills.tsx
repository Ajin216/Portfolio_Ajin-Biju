"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";
import { PenTool, Box as BoxIcon, Settings, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

// Skill Icons Map
const SkillIcons: Record<string, React.ReactNode> = {
  "TypeScript": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.85-6.57c-1.3 0-2.3-.3-2.9-.8v-1.8c.6.5 1.4.8 2.2.8.9 0 1.2-.4 1.2-.9 0-1.2-3.4-.6-3.4-2.8 0-1.4 1-2.4 2.9-2.4 1.1 0 2 .3 2.7.7v1.7c-.6-.4-1.3-.6-2-.6-.7 0-1.1.4-1.1.8 0 1.1 3.4.6 3.4 2.8 0 1.4-1.1 2.5-3 2.5zm-5-5.5h2.6V15h2.1v-5.5h2.6V7.7H5.15v1.8z"/>
    </svg>
  ),
  "React": (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.91l-6.1-8.15H8v8.48h1.64v-6.3l5.3 7.08c-.85.59-1.87.98-2.94.98-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5c0 1.25-.43 2.4-1.15 3.3z"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2L2 7.778v8.444L12 22l10-5.778V7.778L12 2zm0 2.31l8 4.62-8 4.62-8-4.62 8-4.62zm0 15.38l-8-4.62v-7.14l8 4.62v7.14zm0-7.14l-8-4.62 8-4.62 8 4.62-8 4.62z"/>
    </svg>
  ),
  "UI/UX Design": <PenTool className="w-4 h-4" />,
  "WebGL": <BoxIcon className="w-4 h-4" />
};

export function Skills() {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const skills = PORTFOLIO_DATA.skills;
  const radius = 220; // Radius of the orbit

  // Fallback variants for grid layout on mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-24 px-6 relative z-10 overflow-hidden">
      <motion.div 
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="max-w-7xl mx-auto flex flex-col items-center"
      >
        
        {/* Desktop Orbit Layout (Hidden on Mobile) */}
        <div className="hidden lg:flex relative w-[600px] h-[600px] items-center justify-center">
          
          {/* Subtle background rings */}
          <div className="absolute inset-4 rounded-full border border-border/30 border-dashed" />
          <div className="absolute inset-16 rounded-full border border-border/10" />
          
          {/* Center Hub */}
          <div className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-card border border-accent/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
            <Settings className="w-6 h-6 text-accent mb-2 animate-[spin_10s_linear_infinite]" />
            <span className="font-display font-semibold text-xs tracking-widest text-foreground uppercase">Skills</span>
          </div>

          {/* Rotating Orbit Container */}
          <div 
            className={`absolute inset-0 z-10 pointer-events-none ${prefersReducedMotion ? '' : 'animate-[spin_25s_linear_infinite]'}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {skills.map((skill, index) => {
              const Icon = SkillIcons[skill] || <Code2 className="w-4 h-4" />;
              const angle = (index / skills.length) * 360;
              
              return (
                <div 
                  key={skill}
                  className="absolute left-1/2 top-1/2 w-0 h-0"
                  style={{
                    transform: `rotate(${angle}deg) translate(${radius}px)`
                  }}
                >
                  {/* The Counter-rotating Badge Container */}
                  <div 
                    className={`absolute -translate-x-1/2 -translate-y-1/2 ${prefersReducedMotion ? '' : 'animate-[spin_25s_linear_infinite_reverse]'}`}
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                  >
                    {/* Reverse the initial layout rotation so text is upright */}
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      <div 
                        className="pointer-events-auto group relative flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-card border border-border cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:-translate-y-1"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                        <div className="relative z-10 text-muted-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                          {Icon}
                        </div>
                        <span className="relative z-10 text-xs font-medium text-foreground group-hover:text-accent transition-colors duration-300 text-center px-1">
                          {skill}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile/Tablet Grid Fallback */}
        <div className="lg:hidden w-full max-w-2xl">
          <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3 justify-center">
            <div className="h-px bg-border flex-1" />
            Skills
            <div className="h-px bg-border flex-1" />
          </h3>
          
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {skills.map((skill) => {
              const Icon = SkillIcons[skill] || <Code2 className="w-4 h-4" />;
              return (
                <motion.div
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border overflow-hidden cursor-default transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    {Icon}
                  </div>
                  <span className="relative z-10 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                    {skill}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
