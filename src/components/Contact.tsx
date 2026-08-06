"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/content";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [errors, setErrors] = useState({ name: "", email: "", description: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", description: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const message = `Hi Ajin! 👋\n\nI came across your portfolio and I'm interested in working together.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Project details:*\n${formData.description}\n\nLooking forward to hearing from you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${PORTFOLIO_DATA.socials.whatsapp}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setStatus("success");
      setFormData({ name: "", email: "", description: "" });
      
      setTimeout(() => setStatus("idle"), 4000);
    }, 500);
  };

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
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4 text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-foreground"
              />
              {errors.name && <span className="text-red-400/80 text-xs mt-1 ml-1 block">{errors.name}</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50 text-foreground"
              />
              {errors.email && <span className="text-red-400/80 text-xs mt-1 ml-1 block">{errors.email}</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: "" });
                }}
                className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none placeholder:text-muted-foreground/50 text-foreground"
              />
              {errors.description && <span className="text-red-400/80 text-xs mt-1 ml-1 block">{errors.description}</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-4 text-center"
            >
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-accent hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Opening WhatsApp..." : "Send via WhatsApp"}
              </motion.button>
              
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent text-sm mt-4 font-medium"
                >
                  Opened in WhatsApp!
                </motion.p>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
