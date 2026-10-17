"use client";

import { useState } from "react";
import styles from "./Experience.module.css";

interface Job {
  id: string;
  company: string;
  shortName: string;
  role: string;
  duration: string;
  location: string;
  highlightTag: string;
  points: string[];
  humanNote: string;
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState("plutos");
  const [isPending, setIsPending] = useState(false);

  const jobs: Job[] = [
    {
      id: "plutos",
      company: "Plutos One Private Limited",
      shortName: "Plutos One",
      role: "Software Engineer (AI & Full Stack)",
      duration: "Dec 2024 – Present",
      location: "Noida, Uttar Pradesh",
      highlightTag: "Enterprise BBPS Platform",
      points: [
        "Lead frontend architecture and end-to-end development of a BBPS-based enterprise-grade ERP platform serving 92+ offline billers, delivering 33+ production-ready modules and increasing operational efficiency by 30%.",
        "Design and maintain BillerHub, a centralized biller onboarding ecosystem supporting 90+ billers, reducing onboarding timelines by 90% through automated workflows and lifecycle tracking.",
        "Build and deploy Python-based AI chatbot features that use LLM integration to handle user queries in real time, reducing reliance on manual support.",
        "Develop agentic AI automation workflows in Python that execute multi-step operational tasks across biller onboarding and support, reducing manual handoffs between teams.",
      ],
      humanNote:
        "Building for Indian billers taught me that enterprise software must work seamlessly on patchy Tier-3 internet connections without corrupting ledger state.",
    },
    {
      id: "clouwood",
      company: "Clouwood Studio Private Limited",
      shortName: "Clouwood Studio",
      role: "Software Developer",
      duration: "Aug 2023 – Nov 2024",
      location: "Noida, Uttar Pradesh",
      highlightTag: "Desktop & Web Scale",
      points: [
        "Built and enhanced KeyShare, a cross-platform desktop application using Electron.js, React.js, and Node.js, improving platform stability by 45% and reducing support incidents by 30%.",
        "Crafted reusable and modular UI components that improved user experience metrics and increased customer satisfaction by 45%.",
        "Built a fully dynamic corporate website using Next.js and Prismic CMS, reducing content publishing turnaround time by 50%.",
      ],
      humanNote:
        "KeyShare forced me to master multi-process architecture in Electron—handling native OS events without bottlenecking the Chromium renderer.",
    },
  ];

  const handleTabChange = (id: string) => {
    if (id === activeTab) return;
    setIsPending(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsPending(false);
    }, 150);
  };

  const activeJob = jobs.find((job) => job.id === activeTab) || jobs[0];

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">Battle-Tested History</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Real companies, real production workloads, and scalable software handling mission-critical data.
          </p>
        </div>

        <div className={styles.timelineGrid}>
          {/* Company Selector Tab List */}
          <div className={styles.tabList}>
            {jobs.map((job) => (
              <button
                key={job.id}
                className={`${styles.tabBtn} ${activeTab === job.id ? styles.activeTab : ""}`}
                onClick={() => handleTabChange(job.id)}
              >
                <div className={styles.tabInfo}>
                  <span className={styles.tabCompany}>{job.shortName}</span>
                  <span className={styles.tabDuration}>{job.duration}</span>
                </div>
                <span className={styles.tabBadge}>{job.highlightTag}</span>
              </button>
            ))}
          </div>

          {/* Job Details Card */}
          <div className={`${styles.detailsCard} ${isPending ? styles.pending : styles.fadeIn} craft-card`}>
            <div className={styles.jobHeader}>
              <div>
                <h3 className={`${styles.jobRole} font-serif`}>
                  {activeJob.role} <span className={styles.atCompany}>@ {activeJob.company}</span>
                </h3>
                <div className={styles.jobMeta}>
                  <span className={styles.jobDuration}>{activeJob.duration}</span>
                  <span className={styles.jobMetaDivider}>•</span>
                  <span className={styles.jobLocation}>{activeJob.location}</span>
                </div>
              </div>
            </div>

            <ul className={styles.pointsList}>
              {activeJob.points.map((point, index) => (
                <li key={index} className={styles.pointItem}>
                  <span className={styles.bullet}>◆</span>
                  <p>{point}</p>
                </li>
              ))}
            </ul>

            {/* Behind The Scenes Note */}
            <div className={styles.jobNoteBox}>
              <span className={styles.noteLabel}>Behind The Scenes:</span>
              <p className={styles.noteText}>&ldquo;{activeJob.humanNote}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
