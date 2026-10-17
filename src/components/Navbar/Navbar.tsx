"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { label: "Playable Lab", href: "#interactive-lab" },
    { label: "AI Architecture", href: "#agent-architecture" },
    { label: "Projects", href: "#projects" },
    { label: "Story", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Digital Twin", href: "#chatbot" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shading on scroll
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scrollspy detection
      const scrollPosition = window.scrollY + 100;
      let currentActive = "";

      for (const link of navLinks) {
        if (!link.href || link.href === "#") continue;
        try {
          const target = document.querySelector(link.href);
          if (target instanceof HTMLElement) {
            const top = target.offsetTop;
            const height = target.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentActive = link.href;
              break;
            }
          }
        } catch {
          // ignore selector errors
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (!href || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    try {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      // ignore
    }
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.container} container`}>
        <a href="#" className={styles.logo} onClick={(e) => handleLinkClick(e, "#")}>
          <span>Amar</span>
          <span className={styles.logoDot}>.dev</span>
        </a>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.link} ${activeSection === link.href ? styles.activeLink : ""}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/AmarCV.pdf"
            download="Amar_Pratap_Singh_CV.pdf"
            className={styles.cvButton}
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Links */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.mobileLink} ${activeSection === link.href ? styles.mobileActiveLink : ""}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/AmarCV.pdf"
            download="Amar_Pratap_Singh_CV.pdf"
            className={styles.mobileCvButton}
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
