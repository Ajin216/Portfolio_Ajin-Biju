"use client";

import { Code, Briefcase, MessageCircle, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", url: PORTFOLIO_DATA.socials.github, icon: Code },
    { name: "LinkedIn", url: PORTFOLIO_DATA.socials.linkedin, icon: Briefcase },
    { name: "Twitter", url: PORTFOLIO_DATA.socials.twitter, icon: MessageCircle },
    { name: "Email", url: `mailto:${PORTFOLIO_DATA.socials.email}`, icon: Mail },
  ];

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">
          © {currentYear} {PORTFOLIO_DATA.personal.name}. All rights reserved.
        </p>

        <div className="flex items-center space-x-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
                aria-label={link.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
