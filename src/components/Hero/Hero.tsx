"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    try {
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      // fallback
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={`${styles.container} container`}>
        {/* Left Column: Authentic Craftsman Narrative */}
        <div className={styles.heroContent}>
          {/* Top Status & Location Stamp */}
          <div className={styles.topMeta}>
            <span className="craft-stamp">Craftsman &amp; Builder</span>
            <span className={styles.locationPill}>📍 Noida &amp; Prayagraj, India</span>
          </div>

          {/* Clean, Proportionate Headline */}
          <h1 className={`${styles.mainHeading} font-serif`}>
            I teach machines to do the tedious work, so{" "}
            <span className="text-gradient-amber">humans can focus on what matters.</span>
          </h1>

          {/* Lead Bio Story */}
          <p className={styles.storyLead}>
            Hi, I&apos;m <strong>Amar Pratap Singh</strong>. I am an AI &amp; Full-Stack Engineer with 3+ years of
            battle testing—from engineering mission-critical ERP pipelines for 92+ offline Indian billers
            to running consumer AI platforms that calculate planetary ephemeris for 500+ daily astrology seekers.
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <button
              onClick={() => handleScrollTo("#interactive-lab")}
              className={styles.primaryAction}
            >
              <span>✨ Play with Live AI Demos</span>
              <span className={styles.btnArrow}>↓</span>
            </button>
            <button
              onClick={() => handleScrollTo("#projects")}
              className={styles.secondaryAction}
            >
              <span>📁 Case Studies &amp; Scale</span>
            </button>
            <a
              href="/AmarCV.pdf"
              download="Amar_Pratap_Singh_Resume.pdf"
              className={styles.resumeAction}
              title="Download Amar Pratap Singh's Official Resume (PDF)"
            >
              <svg className={styles.resumeIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <polyline points="9 15 12 18 15 15"></polyline>
              </svg>
              <span className={styles.resumeText}>Download Resume</span>
              <span className={styles.resumeTag}>PDF</span>
            </a>
          </div>

          {/* Human Stats Strip */}
          <div className={styles.humanStatsBar}>
            <div className={styles.statCell}>
              <span className={styles.statDigit}>92+</span>
              <span className={styles.statDesc}>Indian Billers in Prod</span>
            </div>
            <div className={styles.statSep}>/</div>
            <div className={styles.statCell}>
              <span className={styles.statDigit}>500+</span>
              <span className={styles.statDesc}>Daily Active AI Users</span>
            </div>
            <div className={styles.statSep}>/</div>
            <div className={styles.statCell}>
              <span className={styles.statDigit}>1,400+</span>
              <span className={styles.statDesc}>Cups of Masala Chai</span>
            </div>
            <div className={styles.statSep}>/</div>
            <div className={styles.statCell}>
              <span className={styles.statDigit}>4</span>
              <span className={styles.statDesc}>Agents in Production</span>
            </div>
          </div>
        </div>

        {/* Right Column: Open Natural Portrait & Sticky Note */}
        <div className={styles.heroShowcase}>
          <div className={styles.openPortraitWrapper}>
            {/* Subtle atmospheric warm glow behind Amar */}
            <div className={styles.portraitAura} />

            <div className={styles.openImageContainer}>
              <Image
                src="/Amar-faded.png"
                alt="Amar Pratap Singh - AI & Full Stack Engineer"
                width={440}
                height={433}
                priority
                className={styles.openPortraitImg}
              />
            </div>
          </div>

          {/* Authentic Curled Post-it Note - Sticking directly with top adhesive, NO TAPE! */}
          <div className={`${styles.attachedNote} sticky-note-realistic`}>
            <strong className={styles.noteTitle}>Amar&apos;s Production Rule #1:</strong>
            <p className={styles.noteBody}>
              &ldquo;If an autonomous agent hallucinates in production, don&apos;t give it more prompt advice—give it
              stricter Pydantic schemas, deterministic RAG guardrails &amp; zero tolerance.&rdquo;
            </p>
            <span className={styles.noteAuthor}>— Amar P. Singh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
