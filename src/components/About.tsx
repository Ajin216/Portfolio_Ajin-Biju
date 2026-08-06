"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/content";
import { PenTool } from "lucide-react";

export function About() {
  const prefersReducedMotion = useReducedMotion();

  // Parallax setup for image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable parallax if prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Calculate values from -0.5 to 0.5
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">

          {/* Column 1: Profile Image */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center lg:justify-start [perspective:1000px]"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2rem] p-1 group"
            >
              {/* Cyan Glow Background */}
              <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-2xl group-hover:bg-accent/30 transition-colors duration-500" style={{ transform: "translateZ(-20px)" }} />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-accent/20 bg-card z-10" style={{ transform: "translateZ(20px)" }}>
                {/* Fallback pattern if image is missing, plus overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <Image
                  src="/images/PortfolioImg.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 384px"
                  onError={(e) => {
                    // Quick fallback for missing placeholder
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center -z-10 bg-accent/5">
                  <PenTool className="w-12 h-12 text-accent/20" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Column 2: Bio & Skills */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-1 flex flex-col justify-center lg:pt-8"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              About Me.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              {PORTFOLIO_DATA.personal.bio}
            </p>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
