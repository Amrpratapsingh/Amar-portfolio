"use client";

import { useState } from "react";
import styles from "./Skills.module.css";

interface SkillItem {
  name: string;
  category: string;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "AI & LLM",
    "Languages & Frameworks",
    "Databases",
    "Web & Infrastructure",
    "Frontend & UI",
    "Tools & Concepts",
  ];

  const skills: SkillItem[] = [
    // Languages & Frameworks
    { name: "JavaScript (ES6+)", category: "Languages & Frameworks" },
    { name: "TypeScript", category: "Languages & Frameworks" },
    { name: "Python", category: "Languages & Frameworks" },
    { name: "Node.js", category: "Languages & Frameworks" },
    { name: "Express.js", category: "Languages & Frameworks" },
    { name: "NestJS", category: "Languages & Frameworks" },
    { name: "FastAPI", category: "Languages & Frameworks" },
    { name: "Electron.js", category: "Languages & Frameworks" },
    { name: "React.js", category: "Languages & Frameworks" },
    { name: "Next.js", category: "Languages & Frameworks" },
    { name: "Redux Toolkit", category: "Languages & Frameworks" },
    
    // AI & LLM
    { name: "OpenAI (GPT/Assistants)", category: "AI & LLM" },
    { name: "Claude API", category: "AI & LLM" },
    { name: "Google Gemini API", category: "AI & LLM" },
    { name: "LangChain", category: "AI & LLM" },
    { name: "LangGraph", category: "AI & LLM" },
    { name: "RAG Architectures", category: "AI & LLM" },
    { name: "CrewAI", category: "AI & LLM" },
    { name: "Prompt Engineering", category: "AI & LLM" },
    { name: "Vector Embeddings", category: "AI & LLM" },
    { name: "Autonomous AI Agents", category: "AI & LLM" },
    { name: "Multi-Agent Systems", category: "AI & LLM" },

    // Databases
    { name: "MongoDB", category: "Databases" },
    { name: "PostgreSQL", category: "Databases" },
    { name: "MySQL", category: "Databases" },
    { name: "SQLite", category: "Databases" },
    { name: "Pinecone (Vector DB)", category: "Databases" },
    { name: "FAISS (Vector Search)", category: "Databases" },

    // Web & Infra
    { name: "REST APIs", category: "Web & Infrastructure" },
    { name: "GraphQL", category: "Web & Infrastructure" },
    { name: "WebSockets", category: "Web & Infrastructure" },
    { name: "Docker", category: "Web & Infrastructure" },
    { name: "Kubernetes (Basic)", category: "Web & Infrastructure" },
    { name: "AWS", category: "Web & Infrastructure" },
    { name: "GCP", category: "Web & Infrastructure" },
    { name: "Firebase", category: "Web & Infrastructure" },
    { name: "CI/CD Pipelines", category: "Web & Infrastructure" },

    // Frontend
    { name: "HTML5", category: "Frontend & UI" },
    { name: "CSS3", category: "Frontend & UI" },
    { name: "Tailwind CSS", category: "Frontend & UI" },
    { name: "Bootstrap", category: "Frontend & UI" },
    { name: "Material UI", category: "Frontend & UI" },
    { name: "Responsive Web Design", category: "Frontend & UI" },

    // Tools & Concepts
    { name: "Git & GitHub", category: "Tools & Concepts" },
    { name: "Claude Code", category: "Tools & Concepts" },
    { name: "Cursor / VS Code", category: "Tools & Concepts" },
    { name: "Postman", category: "Tools & Concepts" },
    { name: "Jira", category: "Tools & Concepts" },
    { name: "Prismic CMS", category: "Tools & Concepts" },
    { name: "n8n Automation", category: "Tools & Concepts" },
    { name: "Data Structures & Algorithms", category: "Tools & Concepts" },
    { name: "System Architecture", category: "Tools & Concepts" },
    { name: "RBAC Access Control", category: "Tools & Concepts" },
    { name: "Microservices", category: "Tools & Concepts" },
    { name: "Unit & Integration Testing", category: "Tools & Concepts" },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">The Craftsman&apos;s Toolkit</span>
          <h2 className="section-title">Skills &amp; Technical Depth</h2>
          <p className="section-subtitle">
            Languages, foundation models, databases, and architectural frameworks hardened over
            3+ years in production.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search skills e.g., Next.js, LangGraph, FastAPI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          <div className={styles.filterPills}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterPill} ${activeCategory === cat ? styles.activePill : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid Display */}
        <div className={styles.skillsGrid}>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <div key={skill.name} className={`${styles.skillCard} craft-card`}>
                <span className={styles.skillCategory}>{skill.category}</span>
                <span className={styles.skillName}>{skill.name}</span>
                <div className={styles.cardIndicator}></div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              No skills found matching &quot;{searchQuery}&quot; in category &quot;{activeCategory}&quot;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
