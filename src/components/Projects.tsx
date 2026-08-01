"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";
import Image from "next/image";

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Selected Works.
          </h2>
          <p className="text-muted-foreground text-lg">
            A collection of my recent projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-card border border-border mb-6">
                {/* Fallback gradient if no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-card to-muted" />
                
                {/* Image overlay effect on hover */}
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white backdrop-blur-md shadow-lg"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </motion.a>
                </div>
                
                {/* Un-comment next/image when real images are provided
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                */}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-2xl font-semibold group-hover:text-accent transition-colors">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Code className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-muted-foreground mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-accent/80 px-2 py-1 bg-accent/10 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
