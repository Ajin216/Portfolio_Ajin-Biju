import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajin Biju - Portfolio",
  description: "Software Developer creating modern web experiences.",
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}>
        <AnimatedBackground />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
