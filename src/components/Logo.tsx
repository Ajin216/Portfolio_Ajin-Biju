"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/content";

interface LogoProps {
  size?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Logo({ size = 44, className = "", onClick }: LogoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(PORTFOLIO_DATA.personal.name);

  // We use a custom style block to handle the smooth duration transition on hover,
  // which Tailwind's arbitrary values handle fine but defining it explicitly ensures no jumps.
  const spinnerStyle = prefersReducedMotion 
    ? {} 
    : {
        animation: "spin var(--spin-duration, 8s) linear infinite",
        transition: "var(--spin-transition, animation-duration 0.5s ease)",
      };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      e.preventDefault();
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href="#hero"
      onClick={handleSmoothScroll}
      className={`group relative flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-label="Scroll to top"
    >
      {/* Hexagon Background Layer (Rotates) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={
          !prefersReducedMotion 
            ? { 
                ...spinnerStyle, 
                // Set custom properties for hover state handled by group-hover via arbitrary properties or inline style logic
                // React inline styles don't support pseudo classes, so we'll use a class-based approach below.
              } 
            : {}
        }
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full text-accent transition-all duration-300 drop-shadow-[0_0_2px_rgba(0,255,255,0.4)] group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] ${!prefersReducedMotion ? "animate-[spin_8s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]" : ""}`}
          style={{
            // When CSS animation-duration changes, it can jerk. 
            // However, modern browsers handle duration transitions reasonably well if defined.
            // Using tailwind arbitrary group-hover:animate-[spin_2s...] overrides the animation completely.
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        >
          {/* Hexagon polygon path */}
          <polygon points="50,2 93,25 93,75 50,98 7,75 7,25" />
        </svg>
      </div>

      {/* Static Text Layer */}
      <div className="relative z-10 font-mono font-bold flex items-center justify-center pointer-events-none select-none tracking-tighter">
        <span className="text-muted-foreground/60" style={{ fontSize: size * 0.22 }}>&lt;</span>
        <span className="text-accent ml-0.5 mr-[1px]" style={{ fontSize: size * 0.25 }}>{initials}</span>
        <span className="text-muted-foreground/60" style={{ fontSize: size * 0.22 }}>/&gt;</span>
      </div>
    </a>
  );
}
