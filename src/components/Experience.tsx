"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Experience.
          </h2>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {PORTFOLIO_DATA.experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-center gap-6 md:gap-0 md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 transition-colors duration-300 group-hover:border-accent">
                <div className="w-2 h-2 rounded-full bg-accent scale-0 transition-transform duration-300 group-hover:scale-100" />
              </div>
              
              {/* Content box */}
              <div className="flex-1 md:flex-none md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-card/50 border border-border/50 hover:border-accent/50 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <h3 className="font-display font-semibold text-xl">{job.role}</h3>
                  <span className="text-sm font-mono text-accent">{job.duration}</span>
                </div>
                <h4 className="text-foreground/80 font-medium mb-4">{job.company}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {job.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
