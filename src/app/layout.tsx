import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amar Pratap Singh | AI & Full Stack Engineer",
  description: "Portfolio of Amar Pratap Singh, Full Stack Developer & AI Engineer with 4+ years of experience specializing in Generative AI, RAG architectures, LangChain/LangGraph, and modern web platforms.",
  keywords: ["AI Engineer", "Full Stack Developer", "Next.js", "React", "TypeScript", "LangChain", "CrewAI", "RAG", "Agentic AI", "MERN Stack"],
  authors: [{ name: "Amar Pratap Singh" }],
  openGraph: {
    title: "Amar Pratap Singh | AI & Full Stack Engineer",
    description: "Portfolio of Amar Pratap Singh, Full Stack Developer & AI Engineer with 4+ years of experience specializing in Generative AI, RAG architectures, LangChain/LangGraph, and modern web platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} ${playfair.variable} ${caveat.variable}`}>
      <body>
        <div className="bg-grid" />
        {children}
      </body>
    </html>
  );
}
