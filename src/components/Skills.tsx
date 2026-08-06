"use client";

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";
import { PenTool, Box as BoxIcon, Settings, Code2, GitBranch, Terminal, Database, Server, Key, Layout } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Skill Icons Map
const SkillIcons: Record<string, React.ReactNode> = {
  "TypeScript": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.85-6.57c-1.3 0-2.3-.3-2.9-.8v-1.8c.6.5 1.4.8 2.2.8.9 0 1.2-.4 1.2-.9 0-1.2-3.4-.6-3.4-2.8 0-1.4 1-2.4 2.9-2.4 1.1 0 2 .3 2.7.7v1.7c-.6-.4-1.3-.6-2-.6-.7 0-1.1.4-1.1.8 0 1.1 3.4.6 3.4 2.8 0 1.4-1.1 2.5-3 2.5zm-5-5.5h2.6V15h2.1v-5.5h2.6V7.7H5.15v1.8z" />
    </svg>
  ),
  "React": (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 13.91l-6.1-8.15H8v8.48h1.64v-6.3l5.3 7.08c-.85.59-1.87.98-2.94.98-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5c0 1.25-.43 2.4-1.15 3.3z" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2L2 7.778v8.444L12 22l10-5.778V7.778L12 2zm0 2.31l8 4.62-8 4.62-8-4.62 8-4.62zm0 15.38l-8-4.62v-7.14l8 4.62v7.14zm0-7.14l-8-4.62 8-4.62 8 4.62-8 4.62z" />
    </svg>
  ),
  "JavaScript (ES6+)": <span className="font-bold text-[10px]">JS</span>,
  "HTML5/CSS3": <Layout className="w-4 h-4" />,
  "Redux/Zustand": <Database className="w-4 h-4" />,
  "Express.js": <Server className="w-4 h-4" />,
  "REST APIs": <Code2 className="w-4 h-4" />,
  "WebSocket": <Code2 className="w-4 h-4" />,
  "JWT/Authentication": <Key className="w-4 h-4" />,
  "MongoDB": <Database className="w-4 h-4" />,
  "Mongoose": <Database className="w-4 h-4" />,
  "Git & GitHub": <GitBranch className="w-4 h-4" />,
  "Postman": <Code2 className="w-4 h-4" />,
  "VS Code": <Terminal className="w-4 h-4" />,
  "npm/Vite": <Terminal className="w-4 h-4" />
};

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCallout, setActiveCallout] = useState<{
    skill: any;
    angle: number;
    radius: number;
  } | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Data processing
  const categories = Object.keys(PORTFOLIO_DATA.skills) as Array<keyof typeof PORTFOLIO_DATA.skills>;
  const allSkills = categories.flatMap(category => 
    PORTFOLIO_DATA.skills[category].map(skill => ({ ...skill, category }))
  );
  
  const coreSkills = allSkills.filter(s => s.isCore);
  const supportingSkills = allSkills.filter(s => !s.isCore);

  // Radii for dual-ring
  const innerRadius = 150;
  const outerRadius = 260;

  // Animation values
  const innerRotation = useMotionValue(0);
  const innerReverse = useMotionValue(0);
  const outerRotation = useMotionValue(0);
  const outerReverse = useMotionValue(0);

  const innerAnimRef = useRef<any>(null);
  const innerRevAnimRef = useRef<any>(null);
  const outerAnimRef = useRef<any>(null);
  const outerRevAnimRef = useRef<any>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const startInner = () => {
    import("framer-motion").then(({ animate }) => {
      innerAnimRef.current = animate(innerRotation, innerRotation.get() + 360, {
        duration: 40,
        ease: "linear",
        repeat: Infinity
      });
      innerRevAnimRef.current = animate(innerReverse, innerReverse.get() - 360, {
        duration: 40,
        ease: "linear",
        repeat: Infinity
      });
    });
  };

  const startOuter = () => {
    import("framer-motion").then(({ animate }) => {
      // Rotates opposite direction, slightly slower
      outerAnimRef.current = animate(outerRotation, outerRotation.get() - 360, {
        duration: 50,
        ease: "linear",
        repeat: Infinity
      });
      outerRevAnimRef.current = animate(outerReverse, outerReverse.get() + 360, {
        duration: 50,
        ease: "linear",
        repeat: Infinity
      });
    });
  };

  const stopInner = () => {
    if (innerAnimRef.current) innerAnimRef.current.stop();
    if (innerRevAnimRef.current) innerRevAnimRef.current.stop();
  };

  const stopOuter = () => {
    if (outerAnimRef.current) outerAnimRef.current.stop();
    if (outerRevAnimRef.current) outerRevAnimRef.current.stop();
  };

  useEffect(() => {
    if (!prefersReducedMotion) {
      startInner();
      startOuter();
    }
    return () => {
      stopInner();
      stopOuter();
    };
  }, [prefersReducedMotion]);

  const handleMouseEnterInner = (skill: any, baseAngle: number) => {
    if (!prefersReducedMotion) stopInner();
    setHoveredSkill(skill.name);

    let current = innerRotation.get() % 360;
    if (current < 0) current += 360;
    setActiveCallout({ skill, angle: (baseAngle + current) % 360, radius: innerRadius });
  };

  const handleMouseEnterOuter = (skill: any, baseAngle: number) => {
    if (!prefersReducedMotion) stopOuter();
    setHoveredSkill(skill.name);

    let current = outerRotation.get() % 360;
    if (current < 0) current += 360;
    setActiveCallout({ skill, angle: (baseAngle + current) % 360, radius: outerRadius });
  };

  const handleMouseLeaveInner = () => {
    if (!prefersReducedMotion) startInner();
    setHoveredSkill(null);
    setActiveCallout(null);
  };

  const handleMouseLeaveOuter = () => {
    if (!prefersReducedMotion) startOuter();
    setHoveredSkill(null);
    setActiveCallout(null);
  };

  return (
    <section id="skills" className="py-24 px-6 relative z-10 overflow-visible">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="max-w-7xl mx-auto flex flex-col items-center"
      >
        <div className="w-full text-center mb-40">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Technical Skills.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The core technologies and tools I use to build modern, high-performance applications.
          </p>
        </div>

        {/* Desktop Orbit Layout */}
        <div className="hidden lg:flex relative w-[600px] h-[600px] items-center justify-center">
          
          {/* Subtle background rings for both orbits */}
          <div className="absolute rounded-full border border-border/20 border-dashed" style={{ width: innerRadius * 2, height: innerRadius * 2 }} />
          <div className="absolute rounded-full border border-border/10" style={{ width: outerRadius * 2, height: outerRadius * 2 }} />

          {/* Center Hub */}
          <div className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-card border border-accent/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
            <Settings className="w-6 h-6 text-accent mb-1 animate-[spin_10s_linear_infinite]" />
            <span className="font-display font-semibold text-[10px] tracking-widest text-foreground uppercase text-center leading-tight">Technical<br />Skills</span>
          </div>

          {/* INNER RING (Core Skills) */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ rotate: prefersReducedMotion ? 0 : innerRotation }}
          >
            {coreSkills.map((skill: any, index) => {
              const Icon = SkillIcons[skill.name] || <Code2 className="w-4 h-4" />;
              const angle = (index / coreSkills.length) * 360;

              return (
                <div
                  key={skill.name}
                  className="absolute left-1/2 top-1/2 w-0 h-0"
                  style={{ transform: `rotate(${angle}deg) translate(${innerRadius}px)` }}
                >
                  <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ rotate: prefersReducedMotion ? 0 : innerReverse }}
                  >
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      <div
                        className={`pointer-events-auto group relative flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-card border cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:-translate-y-1 ${hoveredSkill && hoveredSkill !== skill.name ? 'opacity-30' : 'opacity-100 border-border'}`}
                        onMouseEnter={() => handleMouseEnterInner(skill, angle)}
                        onMouseLeave={handleMouseLeaveInner}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                        <div className="relative z-10 text-muted-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                          {Icon}
                        </div>
                        <span className="relative z-10 text-xs font-medium text-foreground group-hover:text-accent transition-colors duration-300 text-center px-1">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* OUTER RING (Supporting Skills) */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ rotate: prefersReducedMotion ? 0 : outerRotation }}
          >
            {supportingSkills.map((skill: any, index) => {
              const Icon = SkillIcons[skill.name] || <Code2 className="w-4 h-4" />;
              const angle = (index / supportingSkills.length) * 360;

              return (
                <div
                  key={skill.name}
                  className="absolute left-1/2 top-1/2 w-0 h-0"
                  style={{ transform: `rotate(${angle}deg) translate(${outerRadius}px)` }}
                >
                  <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ rotate: prefersReducedMotion ? 0 : outerReverse }}
                  >
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      <div
                        className={`pointer-events-auto group relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-card border cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:-translate-y-1 ${hoveredSkill && hoveredSkill !== skill.name ? 'opacity-30' : 'opacity-100 border-border/60'}`}
                        onMouseEnter={() => handleMouseEnterOuter(skill, angle)}
                        onMouseLeave={handleMouseLeaveOuter}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                        <div className="relative z-10 text-muted-foreground/80 group-hover:text-accent transition-colors duration-300 mb-1">
                          {Icon}
                        </div>
                        <span className="relative z-10 text-[10px] font-medium text-foreground/80 group-hover:text-accent transition-colors duration-300 text-center px-1">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Hover Callout Overlay */}
          <AnimatePresence>
            {activeCallout && (
              <CalloutOverlay
                skill={activeCallout.skill}
                angle={activeCallout.angle}
                radius={activeCallout.radius}
                prefersReducedMotion={prefersReducedMotion}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Mobile/Tablet Categorized Fallback */}
        <div className="lg:hidden w-full max-w-2xl mt-8">
          <div className="space-y-12">
            {categories.map((category) => (
              <motion.div 
                key={category} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-3 w-full">
                  <div className="h-px bg-border flex-1" />
                  <span className="text-accent uppercase tracking-wider text-sm">{category}</span>
                  <div className="h-px bg-border flex-1" />
                </h3>
                
                <div className="flex flex-wrap gap-3 justify-center w-full">
                  {PORTFOLIO_DATA.skills[category].map((skill: any) => {
                    const Icon = SkillIcons[skill.name] || <Code2 className="w-4 h-4" />;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
                        className="group relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/50 sm:w-auto w-[45%]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center gap-2 w-full justify-center">
                          <div className="relative z-10 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                            {Icon}
                          </div>
                          <span className="relative z-10 text-xs font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>

                        <AnimatePresence>
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              className="text-[10px] text-muted-foreground text-center relative z-10 w-full leading-relaxed"
                            >
                              {skill.description}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}

const CalloutOverlay = ({ skill, angle, radius, prefersReducedMotion }: any) => {
  const angleRad = angle * (Math.PI / 180);
  
  // Outer radius items are smaller (w-20 -> half width is 40). Inner radius items are (w-24 -> half width is 48).
  const badgeHalfWidth = radius === 150 ? 48 : 40;

  const badgeX = 300 + radius * Math.cos(angleRad);
  const badgeY = 300 + radius * Math.sin(angleRad);

  const startX = badgeX + badgeHalfWidth * Math.cos(angleRad);
  const startY = badgeY + badgeHalfWidth * Math.sin(angleRad);

  // Extend further out for the line
  const endX = startX + 35 * Math.cos(angleRad);
  const endY = startY + 35 * Math.sin(angleRad);

  let translateX = "-50%";
  let translateY = "-50%";

  if (Math.cos(angleRad) > 0.5) translateX = "0%";
  else if (Math.cos(angleRad) < -0.5) translateX = "-100%";

  if (Math.sin(angleRad) > 0.5) translateY = "0%";
  else if (Math.sin(angleRad) < -0.5) translateY = "-100%";

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <motion.line
          x1={startX} y1={startY} x2={endX} y2={endY}
          stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent"
          style={{ filter: "drop-shadow(0 0 6px rgba(0, 255, 255, 0.5))" }}
          initial={prefersReducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        className="absolute w-52 p-3.5 rounded-xl bg-card border border-accent/50 shadow-[0_0_20px_rgba(0,255,255,0.15)] pointer-events-none backdrop-blur-sm"
        style={{
          left: endX,
          top: endY,
          x: translateX,
          y: translateY
        }}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.1 }}
      >
        <div className="flex items-center justify-between mb-1">
           <h4 className="text-sm font-bold text-foreground">{skill.name}</h4>
           <span className="text-[9px] uppercase tracking-wider text-accent border border-accent/30 rounded px-1.5 py-0.5 bg-accent/5">{skill.category}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
      </motion.div>
    </div>
  );
};
