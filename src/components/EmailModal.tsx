"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from '@emailjs/browser';
import { PORTFOLIO_DATA } from "@/data/content";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Trap focus and handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: PORTFOLIO_DATA.personal.name,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      setStatus('success');
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
    }
  };

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
      {isOpen && (
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
            className="relative w-full max-w-xl bg-card border border-accent/20 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,229,255,0.15)] z-10 flex flex-col outline-none overflow-hidden"
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

            <div className="p-6 sm:p-8 relative z-10">
              <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Send a Message
              </h2>
              <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  <button 
                    onClick={onClose}
                    className="mt-8 px-6 py-2.5 bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        disabled={status === 'loading'}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all disabled:opacity-50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        disabled={status === 'loading'}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all disabled:opacity-50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                    <textarea 
                      id="message"
                      required
                      rows={5}
                      disabled={status === 'loading'}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all resize-none disabled:opacity-50"
                      placeholder={`Hi ${PORTFOLIO_DATA.personal.name.split(' ')[0]}, I'd like to talk about...`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-400/10 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p>Something went wrong. Please try again later or email me directly.</p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent text-black font-medium rounded-xl hover:-translate-y-[2px] hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card mt-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
