"use client";

import { useState } from "react";
import styles from "./InteractivePlayground.module.css";

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<"kundli" | "saundarya" | "crewai">("kundli");

  // Kundli Interactive State
  const [selectedZodiac, setSelectedZodiac] = useState("Scorpio ♏");
  const [selectedQuestion, setSelectedQuestion] = useState("career");
  const [kundliOutput, setKundliOutput] = useState<{
    planetary: string;
    reading: string;
    luckyTech: string;
  } | null>({
    planetary: "Jupiter transiting 10th House of Career (24° Leo) • Mercury trine Ascendant",
    reading:
      "A rare configuration for high-impact architecture decisions. The planetary alignments favor taking calculated risks in autonomous AI pipelines. Your focus on reliability is about to pay off with massive system adoption.",
    luckyTech: "Vector Databases & Python LangGraph",
  });
  const [isKundliLoading, setIsKundliLoading] = useState(false);

  // Saundarya Interactive State
  const [scannerZone, setScannerZone] = useState<"tzone" | "cheeks" | "forehead">("cheeks");

  // CrewAI State
  const [crewRunning, setCrewRunning] = useState(false);
  const [crewStep, setCrewStep] = useState(0);

  const zodiacList = [
    "Aries ♈", "Taurus ♉", "Gemini ♊", "Cancer ♋",
    "Leo ♌", "Virgo ♍", "Libra ♎", "Scorpio ♏",
    "Sagittarius ♐", "Capricorn ♑", "Aquarius ♒", "Pisces ♓",
  ];

  const handleGenerateKundli = () => {
    setIsKundliLoading(true);
    setKundliOutput(null);
    setTimeout(() => {
      const answers: Record<string, { planetary: string; reading: string; luckyTech: string }> = {
        career: {
          planetary: "Sun entering 11th House of Gains • Saturn in Kendra providing stability",
          reading: `For ${selectedZodiac}, the 10th lord is fortified with decisive clarity. In the next 3 quarters, leadership in complex technical projects is strongly indicated. Trust the architecture instincts you developed during late-night debugging.`,
          luckyTech: "Distributed Systems & Next.js 16",
        },
        deploy: {
          planetary: "Mercury retrograde clear • Rahu aspecting 6th House of bug resolution",
          reading: `Green lights across the CI/CD pipeline! The astrological ephemeris predicts a clean deployment. Zero rollbacks if you double-check your environment variables before 4 PM.`,
          luckyTech: "Docker Containers & Pytest",
        },
        karma: {
          planetary: "Jupiter sextile Moon • Dasha period of high spiritual & mental endurance",
          reading: `Writing clean, readable code that helps non-technical people is your highest karma right now. The 92+ offline billers you've enabled have generated immense karmic dividend.`,
          luckyTech: "Ethical AI Guardrails & Human-in-the-Loop",
        },
      };

      setKundliOutput(answers[selectedQuestion] || answers.career);
      setIsKundliLoading(false);
    }, 600);
  };

  const handleRunCrew = () => {
    if (crewRunning) return;
    setCrewRunning(true);
    setCrewStep(1);

    const stepTimers = [
      setTimeout(() => setCrewStep(2), 900),
      setTimeout(() => setCrewStep(3), 1800),
      setTimeout(() => setCrewStep(4), 2700),
      setTimeout(() => {
        setCrewRunning(false);
      }, 3400),
    ];
  };

  return (
    <section id="interactive-lab" className={styles.playgroundSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">Craftsman's Workshop</span>
          <h2 className="section-title">Playable AI Experiments</h2>
          <p className="section-subtitle">
            Don't just read about my code—interact with live simulations of the actual commercial
            algorithms and production architectures I built.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className={styles.tabBar}>
          <button
            onClick={() => setActiveTab("kundli")}
            className={`${styles.tabBtn} ${activeTab === "kundli" ? styles.activeTabBtn : ""}`}
          >
            <span className={styles.tabIcon}>🌌</span>
            <span>Kundli Online (Astrology AI)</span>
            <span className={styles.tabPill}>500+ daily users</span>
          </button>

          <button
            onClick={() => setActiveTab("saundarya")}
            className={`${styles.tabBtn} ${activeTab === "saundarya" ? styles.activeTabBtn : ""}`}
          >
            <span className={styles.tabIcon}>✨</span>
            <span>Saundarya AI (Vision Scanner)</span>
            <span className={styles.tabPill}>Gemini 1.5 Pro</span>
          </button>

          <button
            onClick={() => setActiveTab("crewai")}
            className={`${styles.tabBtn} ${activeTab === "crewai" ? styles.activeTabBtn : ""}`}
          >
            <span className={styles.tabIcon}>🤖</span>
            <span>CrewAI Squad (4 Agents)</span>
            <span className={styles.tabPill}>Autonomous Debate</span>
          </button>
        </div>

        {/* TAB 1: KUNDLI ONLINE EXPERIMENT */}
        {activeTab === "kundli" && (
          <div className={`${styles.demoCanvas} craft-card`}>
            <div className={styles.demoTopBar}>
              <div className={styles.demoMeta}>
                <h3 className={styles.demoTitle}>Kundli Ephemeris & LLM Reasoner</h3>
                <span className={styles.demoBadge}>Live Interactive Simulation</span>
              </div>
              <div className={styles.stickyMarginalia}>
                <div className="sticky-note-realistic">
                  <strong style={{ display: "block", fontSize: "1.2rem", color: "#78350f", marginBottom: "0.2rem" }}>
                    Amar&apos;s Engineering Note:
                  </strong>
                  <p style={{ fontSize: "1.15rem", lineHeight: "1.35" }}>
                    Vedic astrology math requires 0.001° planetary precision. I paired NASA JPL
                    ephemeris data with LangChain vector embeddings to generate real personal horoscopes.
                  </p>
                  <span style={{ display: "block", textAlign: "right", fontStyle: "italic", fontWeight: "700", color: "#92400e", marginTop: "0.25rem" }}>
                    — Amar
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.kundliGrid}>
              <div className={styles.kundliControls}>
                <label className={styles.controlLabel}>Select Moon / Sun Zodiac Sign:</label>
                <div className={styles.zodiacGrid}>
                  {zodiacList.map((z) => (
                    <button
                      key={z}
                      onClick={() => setSelectedZodiac(z)}
                      className={`${styles.zodiacChip} ${selectedZodiac === z ? styles.activeZodiac : ""}`}
                    >
                      {z}
                    </button>
                  ))}
                </div>

                <label className={styles.controlLabel} style={{ marginTop: "1.25rem" }}>
                  Select Inquiry Category:
                </label>
                <div className={styles.questionSelector}>
                  <button
                    onClick={() => setSelectedQuestion("career")}
                    className={`${styles.qChip} ${selectedQuestion === "career" ? styles.activeQ : ""}`}
                  >
                    🚀 Career & Leadership
                  </button>
                  <button
                    onClick={() => setSelectedQuestion("deploy")}
                    className={`${styles.qChip} ${selectedQuestion === "deploy" ? styles.activeQ : ""}`}
                  >
                    ⚡ Friday Deployment Fortune
                  </button>
                  <button
                    onClick={() => setSelectedQuestion("karma")}
                    className={`${styles.qChip} ${selectedQuestion === "karma" ? styles.activeQ : ""}`}
                  >
                    🙏 Code Karma & Purpose
                  </button>
                </div>

                <button
                  onClick={handleGenerateKundli}
                  disabled={isKundliLoading}
                  className={styles.craftActionBtn}
                >
                  {isKundliLoading ? "Calculating Ephemeris Degrees..." : "✨ Generate AI Astrological Reading"}
                </button>
              </div>

              {/* Live Output Card */}
              <div className={styles.kundliDisplay}>
                <div className={styles.chartWheelVisual}>
                  <div className={styles.wheelInner}>
                    <span className={styles.wheelCenterIcon}>🪐</span>
                    <span className={styles.wheelRing}></span>
                  </div>
                </div>

                {kundliOutput && (
                  <div className={styles.readingCard}>
                    <div className={styles.planetaryHeader}>
                      <span className={styles.planetaryTag}>Planetary Coordinates</span>
                      <p className={styles.planetaryCoords}>{kundliOutput.planetary}</p>
                    </div>

                    <div className={styles.readingBody}>
                      <span className={styles.readingTag}>AI Synthesis (Kundli Online Engine)</span>
                      <p className={styles.readingText}>{kundliOutput.reading}</p>
                    </div>

                    <div className={styles.luckyBadge}>
                      <span>Recommended Technical Mojo:</span>
                      <strong>{kundliOutput.luckyTech}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SAUNDARYA AI SKIN SCANNER */}
        {activeTab === "saundarya" && (
          <div className={`${styles.demoCanvas} craft-card`}>
            <div className={styles.demoTopBar}>
              <div className={styles.demoMeta}>
                <h3 className={styles.demoTitle}>Saundarya AI Computer Vision Lens</h3>
                <span className={styles.demoBadge}>Google Gemini 1.5 Pro + FastAPI</span>
              </div>
              <div className={styles.stickyMarginalia}>
                <div className="sticky-note-realistic" style={{ background: "linear-gradient(175deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 85%, #86efac 100%)", color: "#064e3b" }}>
                  <strong style={{ display: "block", fontSize: "1.2rem", color: "#065f46", marginBottom: "0.2rem" }}>
                    Amar&apos;s Production Metric:
                  </strong>
                  <p style={{ fontSize: "1.15rem", lineHeight: "1.35" }}>
                    Over 1,000 real skin scans processed. We reduced vision diagnostic latency from 32s
                    down to &lt;8 seconds with async FastAPI task queues.
                  </p>
                  <span style={{ display: "block", textAlign: "right", fontStyle: "italic", fontWeight: "700", color: "#047857", marginTop: "0.25rem" }}>
                    — Amar
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.scannerLayout}>
              {/* Interactive Face Canvas */}
              <div className={styles.faceCanvasWrap}>
                <div className={styles.faceCanvas}>
                  <div className={styles.faceIllustration}>
                    <div className={styles.zoneGuide}>Click zones to simulate AI scan</div>

                    <button
                      onClick={() => setScannerZone("forehead")}
                      className={`${styles.scanTarget} ${styles.targetForehead} ${
                        scannerZone === "forehead" ? styles.activeTarget : ""
                      }`}
                    >
                      <span>Forehead Zone</span>
                    </button>

                    <button
                      onClick={() => setScannerZone("tzone")}
                      className={`${styles.scanTarget} ${styles.targetTZone} ${
                        scannerZone === "tzone" ? styles.activeTarget : ""
                      }`}
                    >
                      <span>T-Zone / Nose</span>
                    </button>

                    <button
                      onClick={() => setScannerZone("cheeks")}
                      className={`${styles.scanTarget} ${styles.targetCheeks} ${
                        scannerZone === "cheeks" ? styles.activeTarget : ""
                      }`}
                    >
                      <span>Cheeks / Barrier</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Diagnostic Live Telemetry */}
              <div className={styles.scannerDiagnostic}>
                <div className={styles.diagHeader}>
                  <span className={styles.diagStatus}>● Vision Neural Net Active</span>
                  <span className={styles.diagSpeed}>Latency: 7.8s</span>
                </div>

                {scannerZone === "forehead" && (
                  <div className={styles.zoneDetails}>
                    <h4 className={styles.zoneTitle}>Analysis: Frontal Cranial Zone</h4>
                    <div className={styles.metricRow}>
                      <span>Hydration Level</span>
                      <strong className={styles.valGood}>84% (Optimal)</strong>
                    </div>
                    <div className={styles.metricRow}>
                      <span>Fine Lines / Stress Index</span>
                      <strong>Low (0.12)</strong>
                    </div>
                    <div className={styles.metricRow}>
                      <span>Barrier Integrity</span>
                      <strong className={styles.valGood}>Healthy Stratum Corneum</strong>
                    </div>
                    <div className={styles.prescriptionBox}>
                      <span className={styles.presTitle}>Recommended Regimen:</span>
                      <p>Centella Asiatica + Hyaluronic Acid serum. Zero comedogenic oils.</p>
                    </div>
                  </div>
                )}

                {scannerZone === "tzone" && (
                  <div className={styles.zoneDetails}>
                    <h4 className={styles.zoneTitle}>Analysis: Central Sebum Matrix (T-Zone)</h4>
                    <div className={styles.metricRow}>
                      <span>Sebum Activity</span>
                      <strong className={styles.valWarn}>Moderate Sebum Congestion</strong>
                    </div>
                    <div className={styles.metricRow}>
                      <span>Pore Diameter Variance</span>
                      <strong>0.24mm (Slightly dilated)</strong>
                    </div>
                    <div className={styles.metricRow}>
                      <span>Blemish Probability</span>
                      <strong>6% (Minimal risk)</strong>
                    </div>
                    <div className={styles.prescriptionBox}>
                      <span className={styles.presTitle}>Recommended Regimen:</span>
                      <p>Salicylic Acid 2% (BHA) gentle wash twice weekly + lightweight gel moisturizer.</p>
                    </div>
                  </div>
                )}

                {scannerZone === "cheeks" && (
                  <div className={styles.zoneDetails}>
                    <h4 className={styles.zoneTitle}>Analysis: Lateral Cheeks & Moisture Barrier</h4>
                    <div className={styles.metricRow}>
                      <span>Erythema / Redness</span>
                      <strong className={styles.valGood}>Normal (No inflammation)</strong>
                    </div>
                    <div className={styles.metricRow}>
                      <span>Melanin Distribution</span>
                      <strong>Uniform (Index 0.38)</strong>
                    </div>
                    <div className={styles.metricRow}>
                      <span>Skin Elasticity</span>
                      <strong className={styles.valGood}>91% (Youthful rebound)</strong>
                    </div>
                    <div className={styles.prescriptionBox}>
                      <span className={styles.presTitle}>Recommended Regimen:</span>
                      <p>Ceramide NP barrier cream + Broad Spectrum SPF 50 mineral protection.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREWAI MULTI-AGENT SQUAD DEBATE */}
        {activeTab === "crewai" && (
          <div className={`${styles.demoCanvas} craft-card`}>
            <div className={styles.demoTopBar}>
              <div className={styles.demoMeta}>
                <h3 className={styles.demoTitle}>CrewAI Autonomous Agent Squad</h3>
                <span className={styles.demoBadge}>4 Specialized Cooperating Agents</span>
              </div>
              <button
                onClick={handleRunCrew}
                disabled={crewRunning}
                className={styles.craftActionBtn}
              >
                {crewRunning ? "Agents Debating..." : "▶ Start Live Agent Debate"}
              </button>
            </div>

            <div className={styles.agentChatWrapper}>
              <div className={`${styles.agentMessage} ${crewStep >= 1 ? styles.msgVisible : ""}`}>
                <div className={styles.agentAvatar}>🕵️</div>
                <div className={styles.agentBubble}>
                  <span className={styles.agentName}>Agent Maya (Senior Researcher)</span>
                  <p>
                    &quot;Scraped 48 GitHub repositories &amp; arXiv papers. Finding: Multi-agent systems
                    reduce human manual routing by 70%, but require deterministic guardrails to avoid
                    infinite tool loops.&quot;
                  </p>
                </div>
              </div>

              <div className={`${styles.agentMessage} ${crewStep >= 2 ? styles.msgVisible : ""}`}>
                <div className={styles.agentAvatar}>⚖️</div>
                <div className={styles.agentBubble}>
                  <span className={styles.agentName}>Agent Roy (Compliance &amp; Hallucination Critic)</span>
                  <p>
                    &quot;Hold on Maya. DeepEval test suites show that without Anthropic MCP structured
                    schemas, agents hallucinate arguments 14% of the time. We must mandate Pydantic
                    models on all external calls.&quot;
                  </p>
                </div>
              </div>

              <div className={`${styles.agentMessage} ${crewStep >= 3 ? styles.msgVisible : ""}`}>
                <div className={styles.agentAvatar}>✍️</div>
                <div className={styles.agentBubble}>
                  <span className={styles.agentName}>Agent Kabir (Executive Synthesizer)</span>
                  <p>
                    &quot;Drafting unified proposal: Combining Maya&apos;s hierarchical routing with Roy&apos;s
                    Pydantic guardrails. Outputting 3-page implementation blueprint for enterprise
                    deployment.&quot;
                  </p>
                </div>
              </div>

              <div className={`${styles.agentMessage} ${crewStep >= 4 ? styles.msgVisible : ""}`}>
                <div className={styles.agentAvatar}>🚀</div>
                <div className={`${styles.agentBubble} ${styles.supervisorBubble}`}>
                  <span className={styles.agentName}>Amar&apos;s Supervisor Node (Final Decision)</span>
                  <p>
                    &quot;Validated. State committed to PostgreSQL async checkpoint. Task finished in
                    1.42s with 0 errors. Ready for production dispatch.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
