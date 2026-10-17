import styles from "./Certifications.module.css";

interface Certification {
  title: string;
  issuer: string;
  logoText: string;
  details: string[];
  colorTheme: string;
}

export default function Certifications() {
  const certifications: Certification[] = [
    {
      title: "Building with Claude API & Model Context Protocol (MCP)",
      issuer: "Anthropic",
      logoText: "A",
      details: [
        "Building with the Claude API (Anthropic Credentials)",
        "Claude 101 Prompting & System Architectures",
        "Introduction to Model Context Protocol (MCP) for autonomous agent tooling",
      ],
      colorTheme: styles.anthropicTheme,
    },
    {
      title: "MERN Stack Development Certification",
      issuer: "Croma Campus",
      logoText: "MERN",
      details: [
        "Full-stack development using MongoDB, Express.js, React.js, and Node.js",
        "Database indexing, REST API design, and frontend state management",
        "Deploying and hosting production-ready high-availability MERN platforms",
      ],
      colorTheme: styles.mernTheme,
    },
  ];

  return (
    <section id="certifications" className={styles.certSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">Verified Credentials</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Formal technical certifications validating foundation models, Model Context Protocol,
            and full-stack engineering standards.
          </p>
        </div>

        <div className={styles.certGrid}>
          {certifications.map((cert, index) => (
            <div key={index} className={`${styles.certCard} craft-card`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.badgeLogo} ${cert.colorTheme}`}>
                  {cert.logoText}
                </div>
                <div className={styles.badgeMeta}>
                  <span className={styles.issuer}>{cert.issuer}</span>
                  <h3 className={`${styles.title} font-serif`}>{cert.title}</h3>
                </div>
              </div>
              <div className={styles.cardBody}>
                <ul className={styles.detailsList}>
                  {cert.details.map((detail, idx) => (
                    <li key={idx} className={styles.detailItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <p>{detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
