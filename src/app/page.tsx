import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import InteractivePlayground from "@/components/InteractivePlayground/InteractivePlayground";
import AgentVisualizer from "@/components/AgentVisualizer/AgentVisualizer";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Experience from "@/components/Experience/Experience";
import Skills from "@/components/Skills/Skills";
import Certifications from "@/components/Certifications/Certifications";
import Chatbot from "@/components/Chatbot/Chatbot";
import BookJournal from "@/components/BookJournal/BookJournal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.layoutWrapper}>
      {/* Floating Header */}
      <Navbar />

      {/* Main 3D Continuous Scroll-Driven Book Journal */}
      <main>
        <BookJournal>
          <Hero />
          <InteractivePlayground />
          <AgentVisualizer />
          <Projects />
          <About />
          <Experience />
          <Skills />
          <div className={styles.finalPageGroup}>
            <Certifications />
            <Chatbot />
            <footer className={styles.footer}>
              <div className="container">
                <div className={styles.footerContent}>
                  <p className={styles.copyright}>
                    © {new Date().getFullYear()} Amar Pratap Singh. All rights reserved.
                  </p>
                  <p className={styles.techTag}>
                    Built with <span className="text-gradient">Next.js</span>, <span className="text-gradient-purple">TypeScript</span> &amp; <span className="text-gradient">Vanilla CSS Modules</span>.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </BookJournal>
      </main>
    </div>
  );
}
