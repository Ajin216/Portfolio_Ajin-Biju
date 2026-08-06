"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Demo Projects", href: "#demo-projects" },
  { name: "Get In Touch", href: "#get-in-touch" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Handle scroll for background transparency
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "demo-projects", "get-in-touch", "contact"];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    
    const intersectionRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update ratios for sections that triggered an intersection change
        entries.forEach((entry) => {
          intersectionRatios.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with the highest visibility ratio
        let maxRatio = 0;
        let mostVisibleSectionId = "";

        intersectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSectionId = id;
          }
        });

        // Update state if we found a highly visible section
        if (mostVisibleSectionId && maxRatio > 0) {
          setActiveSection(mostVisibleSectionId);
        }
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px", 
        threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) // 0 to 1.0 in 0.1 steps
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle mobile body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(PORTFOLIO_DATA.personal.name);

  return (
    <>
      <motion.header
        initial={{ y: shouldReduceMotion ? 0 : -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo (Left on all screens) */}
          <Logo size={48} onClick={(e) => handleSmoothScroll(e, "#hero")} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative text-sm font-medium transition-colors duration-300 py-2 group ${
                    isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  
                  {/* Hover Draw-in Underline */}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ease-out ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-accent border border-accent/50 rounded-full hover:bg-accent/10 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Toggle (Right on mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-foreground/80 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-md z-[110]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            <nav className="flex flex-col items-center space-y-8 relative z-10 w-full px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.1 * (i + 1), duration: 0.4 }}
                  className={`text-3xl font-display font-medium transition-colors ${
                    activeSection === link.href.replace("#", "") ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                href="#get-in-touch"
                onClick={(e) => handleSmoothScroll(e, "#get-in-touch")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.1 * (NAV_LINKS.length + 1), duration: 0.4 }}
                className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-accent text-black text-lg font-medium rounded-full hover:bg-accent-hover transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)] w-full max-w-xs"
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
