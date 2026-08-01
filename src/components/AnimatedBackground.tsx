"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;
    const mouse = { x: -1000, y: -1000 };
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set up canvas size
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const isMobile = width < 768;
      const particleCount = isMobile ? 30 : 70;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!isVisible || prefersReducedMotion) {
        if (prefersReducedMotion) {
          draw(false); // Draw static frame
        }
        return; // Don't loop if not visible or reduced motion
      }

      update();
      draw(true);
      animationFrameId = requestAnimationFrame(animate);
    };

    const update = () => {
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (subtle repulsion)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 150;

        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          // Very subtle drift away from mouse
          p.x -= forceDirectionX * force * 1.5;
          p.y -= forceDirectionY * force * 1.5;
        }

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep strictly within bounds after bounce
        if (p.x < 0) p.x = 0;
        if (p.x > width) p.x = width;
        if (p.y < 0) p.y = 0;
        if (p.y > height) p.y = height;
      });
    };

    const draw = (animating: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            // Check distance to mouse to make lines glow
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDx = mouse.x - midX;
            const mouseDy = mouse.y - midY;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            const isNearMouse = mouseDistance < 150;
            const opacity = 1 - distance / 150;
            
            ctx.beginPath();
            if (isNearMouse && animating) {
              // Bright cyan glow when near mouse
              ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.8})`;
              ctx.lineWidth = 1.5;
            } else {
              // Muted cyan for normal connections
              ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.3})`;
              ctx.lineWidth = 0.8;
            }
            
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(156, 163, 175, 0.8)"; // Muted gray/blue with higher opacity
        ctx.fill();
      });
    };

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        animate();
      }
    };

    // Init
    resize();
    if (prefersReducedMotion) {
      draw(false);
    } else {
      animate();
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
