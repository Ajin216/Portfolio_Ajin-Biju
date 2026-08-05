"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code, ChevronLeft, ChevronRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";
import Image from "next/image";
import { ProjectModal } from "./ProjectModal";

function ProjectCard({ project, onClick }: { project: any; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col min-w-[280px] md:min-w-[320px] max-w-[320px] bg-card/20 border border-border/50 rounded-xl overflow-hidden hover:bg-card/40 hover:border-border transition-colors duration-300 shrink-0 cursor-pointer"
    >
      <div className="relative aspect-video bg-background/50 overflow-hidden border-b border-border/50">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 pointer-events-none">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg group-hover:text-foreground transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {project.githubLink && project.githubLink !== "#" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="View source code"
              >
                <Code className="w-4 h-4" />
              </a>
            )}
            {project.liveLink && project.liveLink !== "#" && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="View live project"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-muted-foreground px-2 py-1 bg-muted/30 border border-border/50 rounded-md group-hover:border-border transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-[10px] font-mono text-muted-foreground px-2 py-1 bg-muted/30 border border-border/50 rounded-md">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function DemoProjects() {
  const demoProjects = PORTFOLIO_DATA.projects.filter((p: any) => !p.main);
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    let animationFrameId: number;
    let accumulatedScroll = 0;
    
    const scrollLoop = () => {
      if (scrollRef.current && !isHovered && !selectedProject && !isScrolling) {
        // Adjust speed here. 0.5 means half a pixel per frame (~30px per second at 60fps)
        accumulatedScroll += 0.5; 
        
        if (accumulatedScroll >= 1) {
          const intScroll = Math.floor(accumulatedScroll);
          accumulatedScroll -= intScroll;
          scrollRef.current.scrollLeft += intScroll;
          
          const scrollWidth = scrollRef.current.scrollWidth;
          const halfWidth = scrollWidth / 2;
          
          // Seamless reset
          if (scrollRef.current.scrollLeft >= halfWidth) {
            scrollRef.current.scrollLeft -= halfWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, selectedProject, shouldReduceMotion, isScrolling]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    setIsScrolling(true);
    
    const scrollAmount = 344; // card width (320) + gap (24)
    const halfWidth = scrollRef.current.scrollWidth / 2;
    
    if (direction === 'left' && scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft += halfWidth;
    } else if (direction === 'right' && scrollRef.current.scrollLeft >= halfWidth) {
      scrollRef.current.scrollLeft -= halfWidth;
    }

    scrollRef.current.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: "smooth" 
    });
    
    // Resume auto-scroll after smooth scroll finishes
    setTimeout(() => setIsScrolling(false), 500);
  };

  const handleCardClick = (project: any) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="demo-projects" className="py-16 px-6 relative z-10 border-t border-border/30 overflow-hidden group/section">
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex justify-between items-end"
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Demo Projects.
            </h2>
            <p className="text-muted-foreground text-base">
              Other experiments, small projects, and creative coding.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => handleManualScroll('left')}
              className="p-2 rounded-full border border-border/50 bg-card/20 hover:bg-card/80 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-20"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleManualScroll('right')}
              className="p-2 rounded-full border border-border/50 bg-card/20 hover:bg-card/80 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-20"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div 
          className="relative w-full pb-8 pt-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Native scroll container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 pr-6" aria-hidden={setIndex === 1}>
                {demoProjects.map((project: any) => (
                  <ProjectCard 
                    key={`${project.id}-${setIndex}`} 
                    project={project} 
                    onClick={() => handleCardClick(project)} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
}
