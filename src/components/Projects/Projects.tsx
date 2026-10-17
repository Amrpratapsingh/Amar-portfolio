import styles from "./Projects.module.css";

interface Project {
  fileId: string;
  title: string;
  category: string;
  metricBadge: string;
  metricHighlight: string;
  description: string;
  handwrittenNote: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  icon: string;
  gradientTheme: string;
  isFeatured?: boolean;
}

export default function Projects() {
  const projects: Project[] = [
    {
      fileId: "DOSSIER #01 // COMMERCE",
      title: "Kundli Online",
      category: "Generative AI Astrology & RAG Engine",
      metricBadge: "Revenue-Generating",
      metricHighlight: "500+ Daily Active Users",
      description:
        "High-performance AI astrology platform that combines accurate astronomical planetary calculations with OpenAI agent chains to deliver personalized Kundli charts and predictive horoscope reports in seconds.",
      handwrittenNote: "Calculates planetary degrees down to 0.001° precision. Paved the way for paying users across India.",
      features: [
        "Vedic planetary math engine & ephemeris data integration",
        "OpenAI API custom agent chains for personalized narrative synthesis",
        "Instant PDF report generator with automated billing & checkout",
      ],
      technologies: ["Next.js", "React", "OpenAI API", "Node.js", "MongoDB", "Redis"],
      liveUrl: "https://kundli.online",
      icon: "🌌",
      gradientTheme: styles.amberGlow,
      isFeatured: true,
    },
    {
      fileId: "DOSSIER #02 // MULTI-AGENT",
      title: "CrewAI Multi-Agent Platform",
      category: "Autonomous Workflow Orchestration",
      metricBadge: "Production AI Agents",
      metricHighlight: "4 Cooperating Agents • 70% Time Cut",
      description:
        "Engineered an agentic multi-agent orchestration hub where 4 specialized AI agents execute hierarchical research, citation extraction, source validation, and publication-ready drafting autonomously.",
      handwrittenNote: "4 agents debating and cross-checking citations. Zero hallucinations allowed in output.",
      features: [
        "Hierarchical agent delegation pattern with supervisor routing",
        "RAGAS evaluation & automated hallucination guardrails",
        "Exportable markdown/PDF research dossiers with verifiable sources",
      ],
      technologies: ["CrewAI", "LangChain", "OpenAI", "Next.js", "Python", "FastAPI"],
      liveUrl: "https://crewai-six.vercel.app",
      icon: "🤖",
      gradientTheme: styles.coralGlow,
      isFeatured: true,
    },
    {
      fileId: "DOSSIER #03 // COMPUTER VISION",
      title: "Saundarya AI",
      category: "Computer Vision & Dermatological AI",
      metricBadge: "Vision AI Inference",
      metricHighlight: "1,000+ Scans • <10s Inference",
      description:
        "AI-powered skin analysis application utilizing Google Gemini Vision API to evaluate skin conditions from user photo uploads, delivering customized skincare routines and product matching.",
      handwrittenNote: "FastAPI async queues brought inference latency from 32 seconds down to under 8 seconds.",
      features: [
        "Real-time visual diagnostic extraction via Google Gemini 1.5 Pro",
        "Sub-10 second pipeline response using FastAPI async workers",
        "Personalized ingredient safety check and routine recommendation engine",
      ],
      technologies: ["FastAPI", "Google Gemini API", "Python", "React", "PostgreSQL"],
      liveUrl: "https://saundaryaai.com",
      icon: "✨",
      gradientTheme: styles.emeraldGlow,
      isFeatured: false,
    },
    {
      fileId: "DOSSIER #04 // ENTERPRISE FINTECH",
      title: "Enterprise ERP & BillerHub",
      category: "Enterprise FinTech & Automation",
      metricBadge: "Enterprise Mission-Critical",
      metricHighlight: "92+ Billers • 33+ Modules • 90% Faster",
      description:
        "Architected core frontend modules and agentic Python automation workflows for a BBPS enterprise ERP system, slashing biller onboarding duration by 90% and serving 92+ offline enterprise billers.",
      handwrittenNote: "Built for Indian offline utility billers where network drops and high transaction volumes are the daily reality.",
      features: [
        "Architected 33+ production-ready ERP modules with strict RBAC",
        "Engineered BillerHub automated lifecycle tracking system",
        "Integrated Python LLM chatbots reducing Tier-1 support load by 40%",
      ],
      technologies: ["Next.js", "TypeScript", "Python Agents", "BBPS Ecosystem", "PostgreSQL"],
      icon: "🏛️",
      gradientTheme: styles.amberGlow,
      isFeatured: false,
    },
  ];

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">Production Portfolio</span>
          <h2 className="section-title">Physical Case Dossiers</h2>
          <p className="section-subtitle">
            Battle-tested applications delivering verified commercial impact, real user scale,
            and autonomous multi-agent intelligence.
          </p>
        </div>

        {/* Dossier Bento Grid Layout */}
        <div className={styles.bentoGrid}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`${styles.dossierCard} ${project.isFeatured ? styles.cardFeatured : ""} craft-card`}
            >
              {/* Physical Folder Tab Header */}
              <div className={styles.folderTab}>
                <span className={styles.folderIcon}>📁</span>
                <span className={styles.folderFileId}>{project.fileId}</span>
                <div className={styles.folderGrommet}></div>
              </div>

              <div className={styles.cardTop}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.iconWrap}>{project.icon}</div>
                  <div>
                    <span className={styles.categoryLabel}>{project.category}</span>
                    <h3 className={`${styles.projectTitle} font-serif`}>{project.title}</h3>
                  </div>
                </div>

                <div className={styles.badgeGroup}>
                  <span className={styles.metricBadge}>{project.metricBadge}</span>
                  <span className={styles.metricHighlight}>{project.metricHighlight}</span>
                </div>
              </div>

              <p className={styles.projectDesc}>{project.description}</p>

              {/* Handwritten Developer Margin Note */}
              <div className={styles.handwrittenMargin}>
                <span className={styles.pencilIcon}>✎</span>
                <span className={styles.noteContent}>{project.handwrittenNote}</span>
              </div>

              {/* Bullet Highlights */}
              <div className={styles.featureList}>
                {project.features.map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <span className={styles.featureBullet}>◆</span>
                    <span className={styles.featureText}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Footer with Tech Badges and Live Action Button */}
              <div className={styles.cardFooter}>
                <div className={styles.techStack}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveButton}
                  >
                    <span>Inspect Live</span>
                    <span className={styles.arrowIcon}>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
