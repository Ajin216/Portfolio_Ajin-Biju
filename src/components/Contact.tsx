"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-accent/5 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Let&apos;s work together.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            I&apos;m currently available for freelance work and open to new opportunities. 
            If you have a project in mind or just want to say hi, feel free to reach out.
          </p>
          
          <motion.a
            href={`mailto:${PORTFOLIO_DATA.socials.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
