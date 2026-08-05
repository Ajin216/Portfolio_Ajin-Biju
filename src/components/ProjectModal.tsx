"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 2.7 5 3.1 5 3.1a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 10.7c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Trap focus and handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Basic focus trap - focus the modal when it opens
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const hasLiveLink = Boolean(project?.liveLink);
  const hasGithubLink = Boolean(project?.githubLink);

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.92, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0 
    },
    exit: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.92, 
      y: shouldReduceMotion ? 0 : 20 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
          />
          
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-card border border-accent/20 rounded-2xl overflow-hidden shadow-[0_0_40px_-10px_rgba(0,229,255,0.15)] z-10 flex flex-col max-h-[90vh] outline-none"
          >
            {/* Subtle decorative glow in background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10">
              {project.image && (
                <div className="relative w-full aspect-video sm:aspect-[21/9] bg-background/50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                  />
                  {/* Smooth gradient fading into card background */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                </div>
              )}
              
              <div className="p-6 sm:p-8 md:p-10 relative">
                <div className="flex items-center flex-wrap gap-4 mb-4">
                  <h2 id="modal-title" className="font-display text-2xl sm:text-4xl font-bold text-foreground">
                    {project.title}
                  </h2>
                  {project.status && (
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full">
                      {project.status}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-accent/90 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none mb-10 text-muted-foreground">
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-border/30">
                  {hasLiveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-black font-medium rounded-full hover:-translate-y-[2px] hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${!hasGithubLink ? 'w-full' : 'w-full sm:flex-1'}`}
                    >
                      <span>View Live Site</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {hasGithubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-accent/50 text-accent font-medium rounded-full hover:-translate-y-[2px] hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${!hasLiveLink ? 'w-full' : 'w-full sm:flex-1'}`}
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
