"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";
import Image from "next/image";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveLink: string;
  githubLink: string;
  featured?: boolean;
  main?: boolean;
  status?: string;
}

export function Projects() {
  const featuredProjects = PORTFOLIO_DATA.projects.filter((p: any) => p.main && p.featured);
  const regularProjects = PORTFOLIO_DATA.projects.filter((p: any) => p.main && !p.featured);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Main Projects.
          </h2>
          <p className="text-muted-foreground text-lg">
            The projects I'm most proud of.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:gap-12">
          {featuredProjects.map((project: any, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} isFeatured={true} />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {regularProjects.map((project: any, index: number) => (
              <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} isFeatured={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isFeatured }: { project: Project, index: number, isFeatured: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <motion.div
      {...animationProps}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : index * 0.15 }}
      className={`group flex flex-col h-full bg-card/30 border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] hover:border-accent/40 transition-all duration-400 ${isFeatured ? 'md:flex-row' : ''}`}
    >
      <div className={`relative ${isFeatured ? 'md:w-3/5' : 'w-full'} border-b md:border-b-0 ${isFeatured ? 'md:border-r' : ''} border-border bg-background/30 p-4 md:p-6`}>
        <BrowserFrame project={project} isFeatured={isFeatured} />
      </div>

      <div className={`flex-1 flex flex-col p-6 md:p-8 ${isFeatured ? 'md:w-2/5' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-muted-foreground/50">0{index + 1}</span>
            <h3 className={`font-display font-semibold group-hover:text-accent transition-colors ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                {project.title}
              </a>
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
            >
              <GithubIcon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
            >
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono text-accent/80 px-2.5 py-1.5 bg-accent/10 border border-accent/20 rounded-md group-hover:border-accent/50 group-hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BrowserFrame({ project, isFeatured }: { project: Project, isFeatured?: boolean }) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-border bg-card shadow-sm flex flex-col h-full group/frame">
      {/* Browser Top Bar */}
      <div className="h-8 border-b border-border bg-muted/30 flex items-center px-3 gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto bg-background/50 border border-border/50 rounded text-[10px] text-muted-foreground/50 px-8 py-0.5 max-w-[60%] flex-1 text-center truncate">
          {project.title.toLowerCase().replace(/\s+/g, '-')}.com
        </div>
      </div>

      {/* Image Area */}
      <div className="relative aspect-video bg-background/80 overflow-hidden flex-1 group-hover/frame:bg-background transition-colors duration-500">
        {project.status && (
          <div className="absolute top-3 right-3 z-30">
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-sm">
              {project.status}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 bg-background/60 opacity-0 group-hover/frame:opacity-100 backdrop-blur-sm transition-all duration-400 flex items-center justify-center">
          <span className="translate-y-4 group-hover/frame:translate-y-0 transition-transform duration-400 text-foreground font-semibold flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full shadow-lg">
            View Project <ArrowUpRight className="w-4 h-4" />
          </span>
        </a>

        {/* Real image component */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={isFeatured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
          priority={isFeatured}
          className="object-cover transition-transform duration-500 group-hover/frame:scale-105"
        />
      </div>
    </div>
  );
}
