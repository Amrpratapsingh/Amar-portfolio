import styles from "./About.module.css";

export default function About() {
  const principles = [
    {
      number: "01",
      title: "No Toy Prototypes",
      desc: "Every AI feature I build must pay for its own compute or save tangible human hours. If it can't survive real production latency and network failures, it belongs in a notebook, not on my resume.",
    },
    {
      number: "02",
      title: "Deterministic Guardrails",
      desc: "LLMs are creative reasoners, not infallible databases. I enforce strict Pydantic schemas, Model Context Protocol (MCP) contracts, and RAGAS evaluations before any agent touches an external API.",
    },
    {
      number: "03",
      title: "Latency is Empathy",
      desc: "Whether it is a Tier-3 city municipal biller loading an ERP dashboard or a user waiting for a skin scan, sub-second responses and async workers reflect genuine respect for user time.",
    },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">The Human Behind The Code</span>
          <h2 className="section-title">The Craftsman&apos;s Journey</h2>
          <p className="section-subtitle">
            From humble beginnings in Pratapgarh &amp; Prayagraj to architecting mission-critical
            enterprise pipelines and consumer AI platforms.
          </p>
        </div>

        <div className={styles.storyGrid}>
          {/* Main Narrative Column */}
          <div className={styles.narrativeCol}>
            <div className={`${styles.storyLetter} craft-card`}>
              <h3 className={`${styles.chapterHeading} font-serif`}>
                &ldquo;I fell in love with code because it lets one person build leverage for thousands.&rdquo;
              </h3>

              <p className={styles.paragraph}>
                My journey didn&apos;t begin with glamorous Silicon Valley tools. It started at B.B.S College
                of Engineering &amp; Technology in Prayagraj, studying core Data Structures and algorithms.
                My first real battle was at <strong>Clouwood Studio</strong>, optimizing <em>KeyShare</em>—a
                cross-platform desktop app using Electron.js, React, and Node.js. When memory leaks crashed
                production user machines, I learned deep respect for platform stability and low-level IPC.
              </p>

              <p className={styles.paragraph}>
                At <strong>Plutos One</strong>, I stepped directly into the backbone of Indian financial
                infrastructure: the BBPS enterprise ERP. We were serving 92+ offline billers—electricity
                boards, educational institutions, water departments. Biller onboarding was slow and manual.
                I architected <strong>BillerHub</strong> and deployed agentic Python automation workflows that
                slashed onboarding timelines by <strong>90%</strong> and scaled to 33+ production modules.
              </p>

              <p className={styles.paragraph}>
                When Generative AI took off, I refused to build trivial prompt wrappers. Instead, I shipped
                <strong> Kundli Online</strong> (combining astronomical ephemeris equations with LangChain
                agent chains for 500+ daily seekers) and <strong>Saundarya AI</strong> (sub-10s computer vision
                dermatology using FastAPI and Gemini 1.5 Pro).
              </p>
            </div>
          </div>

          {/* Sticky Notes & Core Principles Sidebar */}
          <div className={styles.sidebarCol}>
            {/* Hyper-Realistic Curled Sticky Note (Self-Adhesive, No Tape) */}
            <div className="sticky-note-realistic" style={{ marginBottom: "2.5rem" }}>
              <strong style={{ display: "block", fontSize: "1.25rem", color: "#78350f", marginBottom: "0.25rem" }}>
                Amar&apos;s Engineering Rule #1:
              </strong>
              <p style={{ fontSize: "1.18rem", lineHeight: "1.4" }}>
                &ldquo;Any developer can prompt an LLM to write a poem. It takes an engineer to make 4
                autonomous agents cooperate on multi-step financial tasks without hallucinating bank
                account numbers.&rdquo;
              </p>
              <span style={{ display: "block", textAlign: "right", fontStyle: "italic", fontWeight: "700", color: "#92400e", marginTop: "0.35rem" }}>
                — Amar
              </span>
            </div>

            {/* Core Principles */}
            <div className={styles.principlesCard}>
              <h4 className={styles.principlesHeader}>Engineering Creed</h4>
              <div className={styles.principlesList}>
                {principles.map((p) => (
                  <div key={p.number} className={styles.principleItem}>
                    <span className={styles.principleNum}>{p.number}</span>
                    <div>
                      <h5 className={styles.principleTitle}>{p.title}</h5>
                      <p className={styles.principleDesc}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
