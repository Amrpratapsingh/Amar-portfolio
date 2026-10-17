"use client";

import { useState, useEffect } from "react";
import styles from "./AgentVisualizer.module.css";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  type: "trigger" | "orchestrator" | "rag" | "llm" | "tool";
  icon: string;
  badge: string;
  details: string;
  specs: { label: string; value: string }[];
}

interface WorkflowScenario {
  id: string;
  title: string;
  client: string;
  description: string;
  logs: string[];
  metrics: { latency: string; tokens: string; guardrails: string; mcpStatus: string };
}

export default function AgentVisualizer() {
  const [activeScenario, setActiveScenario] = useState<string>("biller");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("orchestrator");
  const [logs, setLogs] = useState<string[]>([]);

  const scenarios: Record<string, WorkflowScenario> = {
    biller: {
      id: "biller",
      title: "Enterprise Biller Hub Onboarding",
      client: "Plutos One Private Limited",
      description: "Automated multi-step agent workflow cutting 90+ biller onboarding time by 90% using LangGraph & Python.",
      metrics: {
        latency: "142ms",
        tokens: "2,480 tokens",
        guardrails: "BBPS Strict Compliant",
        mcpStatus: "6 Tools Bound",
      },
      logs: [
        "[00:00.012] Trigger: Offline Biller payload received via BBPS enterprise gateway.",
        "[00:00.045] Orchestrator: LangGraph graph-state initialized. Routing to schema validator.",
        "[00:00.089] Vector RAG: Pinecone query vector matched biller taxonomy (similarity: 0.96).",
        "[00:00.120] LLM Reasoning: Claude 3.5 Sonnet validated KYC & compliance parameters.",
        "[00:00.142] MCP Tool: Postgres transaction committed. Onboarding lifecycle updated to Active.",
      ],
    },
    astrology: {
      id: "astrology",
      title: "Kundli Online Real-Time RAG Pipeline",
      client: "Kundli Online (500+ Daily Active Users)",
      description: "Astronomical planetary calculation merged with vector database retrieval and OpenAI GPT reasoning.",
      metrics: {
        latency: "210ms",
        tokens: "4,150 tokens",
        guardrails: "Deterministic Ephemeris Check",
        mcpStatus: "Astrological MCP Online",
      },
      logs: [
        "[00:00.015] Trigger: User birth timestamp & lat/long coordinates supplied.",
        "[00:00.052] Orchestrator: Ephemeris mathematical calculation initialized in Python engine.",
        "[00:00.098] Vector RAG: FAISS similarity search retrieved Vedic astrological rules & dasha charts.",
        "[00:00.165] LLM Reasoning: OpenAI GPT-4o synthesizes personalized chart breakdown with dasha timelines.",
        "[00:00.210] Tool Execution: PDF generated and cached to Redis edge cache for instant response.",
      ],
    },
    crewai: {
      id: "crewai",
      title: "CrewAI Multi-Agent Research Squad",
      client: "CrewAI Platform (4 Cooperating Agents)",
      description: "Hierarchical agent system where 4 autonomous agents cut research and drafting duration by 70%.",
      metrics: {
        latency: "380ms",
        tokens: "6,890 tokens",
        guardrails: "RAGAS & Hallucination Guard",
        mcpStatus: "Multi-Agent Sync",
      },
      logs: [
        "[00:00.018] Trigger: User objective 'Enterprise RAG Architectures Analysis' launched.",
        "[00:00.075] Orchestrator: CrewAI Manager decomposes objective into 3 sub-tasks.",
        "[00:00.140] Vector RAG: Hybrid search retrieves arxiv preprints & production benchmark vectors.",
        "[00:00.270] LLM Reasoning: Claude 3.5 Sonnet drafts technical synthesis with citations.",
        "[00:00.380] Tool Execution: DeepEval fact-checker validates citations. Markdown report exported.",
      ],
    },
  };

  const nodes: ArchitectureNode[] = [
    {
      id: "trigger",
      name: "Event Trigger",
      role: "Input Gateway",
      type: "trigger",
      icon: "⚡",
      badge: "Inbound Event",
      details: "Receives user web requests, BBPS webhook payloads, or scheduled autonomous cron triggers.",
      specs: [
        { label: "Protocols", value: "REST, WebSockets, Kafka" },
        { label: "Avg Ingest Latency", value: "< 8ms" },
        { label: "Authentication", value: "OAuth2 & JWT Verified" },
      ],
    },
    {
      id: "orchestrator",
      name: "Supervisor Agent",
      role: "LangGraph / CrewAI",
      type: "orchestrator",
      icon: "🧠",
      badge: "Decision Engine",
      details: "Directs stateful multi-agent flow, determines sub-agent routing, and maintains conversation context memory.",
      specs: [
        { label: "Framework", value: "LangGraph / CrewAI (Python)" },
        { label: "State Graph", value: "Cyclic Conditional Edge Routing" },
        { label: "Checkpointing", value: "PostgreSQL Async Memory" },
      ],
    },
    {
      id: "rag",
      name: "Vector RAG Hub",
      role: "Pinecone & FAISS",
      type: "rag",
      icon: "🔍",
      badge: "Knowledge Base",
      details: "Performs dense semantic retrieval across domain manuals, compliance guidelines, and enterprise documents.",
      specs: [
        { label: "Vector Stores", value: "Pinecone, FAISS" },
        { label: "Embeddings", value: "text-embedding-3-large (1536d)" },
        { label: "Reranker", value: "Cohere Rerank v3" },
      ],
    },
    {
      id: "llm",
      name: "Reasoning LLM",
      role: "Claude / Gemini / GPT-4",
      type: "llm",
      icon: "✨",
      badge: "Inference Engine",
      details: "Synthesizes multi-step reasoning, extracts structured entities (Pydantic), and formulates decisive actions.",
      specs: [
        { label: "Foundation Models", value: "Claude 3.5 Sonnet, Gemini 1.5 Pro, GPT-4o" },
        { label: "Output Validation", value: "Pydantic Structured Schema" },
        { label: "Guardrails", value: "RAGAS, DeepEval & Custom Rules" },
      ],
    },
    {
      id: "tool",
      name: "MCP & Tool Actuator",
      role: "Anthropic MCP",
      type: "tool",
      icon: "🛡️",
      badge: "Action Execution",
      details: "Executes verified external tool calls via Anthropic Model Context Protocol (MCP) to databases and third-party APIs.",
      specs: [
        { label: "Standard", value: "Anthropic Model Context Protocol" },
        { label: "Executors", value: "Python Sandbox, DB Connectors" },
        { label: "Safety", value: "Human-in-the-Loop & RBAC Check" },
      ],
    },
  ];

  const currentScenario = scenarios[activeScenario];
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs([currentScenario.logs[0]]);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < nodes.length) {
        setActiveStep(step);
        setSelectedNodeId(nodes[step].id);
        setLogs((prev) => [...prev, currentScenario.logs[step]]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
        }, 500);
      }
    }, 750);
  };

  useEffect(() => {
    setActiveStep(-1);
    setLogs(currentScenario.logs.slice(0, 2));
  }, [activeScenario]);

  return (
    <section id="agent-architecture" className={styles.visualizerSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">Architecture Blueprint</span>
          <h2 className="section-title">Multi-Agent Workflow Visualizer</h2>
          <p className="section-subtitle">
            Experience how Amar designs and deploys autonomous multi-agent pipelines with LangGraph,
            CrewAI, Vector RAG, and Anthropic Model Context Protocol (MCP).
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className={styles.scenarioBar}>
          <span className={styles.scenarioLabel}>Select Architecture Scenario:</span>
          <div className={styles.scenarioTabs}>
            {Object.values(scenarios).map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenario(sc.id);
                  setActiveStep(-1);
                }}
                disabled={isRunning}
                className={`${styles.scenarioTab} ${activeScenario === sc.id ? styles.activeScenarioTab : ""}`}
              >
                <span className={styles.scenarioTabDot}></span>
                {sc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer Canvas Card */}
        <div className={`${styles.visualizerCard} craft-card`}>
          <div className={styles.canvasToolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.pipelineName}>{currentScenario.title}</span>
              <span className={styles.clientTag}>@ {currentScenario.client}</span>
            </div>
            <div className={styles.toolbarRight}>
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className={`${styles.runBtn} ${isRunning ? styles.btnRunning : ""}`}
              >
                <span className={styles.runIcon}>{isRunning ? "⚙" : "▶"}</span>
                {isRunning ? "Simulating Execution..." : "Run Live Simulation"}
              </button>
            </div>
          </div>

          {/* Interactive Flow Nodes */}
          <div className={styles.nodesWrapper}>
            <div className={styles.nodesTrack}>
              {nodes.map((node, index) => {
                const isStepActive = activeStep === index;
                const isSelected = selectedNodeId === node.id;
                const isPast = activeStep > index;

                return (
                  <div key={node.id} className={styles.nodeBlock}>
                    <button
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`${styles.nodeCard} ${isStepActive ? styles.nodeStepActive : ""} ${
                        isSelected ? styles.nodeSelected : ""
                      } ${isPast ? styles.nodePast : ""}`}
                    >
                      <div className={styles.nodeBadge}>{node.badge}</div>
                      <div className={styles.nodeIconWrap}>
                        <span className={styles.nodeIcon}>{node.icon}</span>
                        {isStepActive && <span className={styles.nodePulse}></span>}
                      </div>
                      <h4 className={styles.nodeTitle}>{node.name}</h4>
                      <span className={styles.nodeRole}>{node.role}</span>

                      <div className={styles.nodeStepIndicator}>
                        Step 0{index + 1}
                      </div>
                    </button>

                    {index < nodes.length - 1 && (
                      <div
                        className={`${styles.flowConnector} ${
                          activeStep > index ? styles.connectorActive : ""
                        }`}
                      >
                        <div className={styles.flowLine}></div>
                        <div
                          className={`${styles.flowParticle} ${
                            isStepActive ? styles.particleActive : ""
                          }`}
                        ></div>
                        <span className={styles.flowArrow}>›</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry & Node Inspector Grid */}
          <div className={styles.inspectorGrid}>
            {/* Left: Selected Node Deep Dive */}
            <div className={styles.nodeDeepDive}>
              <div className={styles.diveHeader}>
                <div className={styles.diveHeaderLeft}>
                  <span className={styles.diveIcon}>{selectedNode.icon}</span>
                  <div>
                    <h4 className={styles.diveTitle}>{selectedNode.name}</h4>
                    <span className={styles.diveSubtitle}>{selectedNode.role}</span>
                  </div>
                </div>
                <span className={styles.diveBadge}>Node Inspector</span>
              </div>
              <p className={styles.diveDesc}>{selectedNode.details}</p>

              <div className={styles.specList}>
                {selectedNode.specs.map((spec, i) => (
                  <div key={i} className={styles.specRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real-time Telemetry & Execution Log Terminal */}
            <div className={styles.telemetryBox}>
              <div className={styles.telemetryStats}>
                <div className={styles.statMetric}>
                  <span className={styles.metricTitle}>Target Latency</span>
                  <span className={`${styles.metricVal} text-gradient`}>
                    {currentScenario.metrics.latency}
                  </span>
                </div>
                <div className={styles.statMetric}>
                  <span className={styles.metricTitle}>Context Window</span>
                  <span className={`${styles.metricVal} text-gradient-purple`}>
                    {currentScenario.metrics.tokens}
                  </span>
                </div>
                <div className={styles.statMetric}>
                  <span className={styles.metricTitle}>Guardrails</span>
                  <span className={styles.metricVal}>{currentScenario.metrics.guardrails}</span>
                </div>
                <div className={styles.statMetric}>
                  <span className={styles.metricTitle}>MCP Protocol</span>
                  <span className={styles.metricValGreen}>{currentScenario.metrics.mcpStatus}</span>
                </div>
              </div>

              {/* Execution Log */}
              <div className={styles.terminalLog}>
                <div className={styles.logHeader}>
                  <div className={styles.logDots}>
                    <span className={styles.redDot}></span>
                    <span className={styles.yellowDot}></span>
                    <span className={styles.greenDot}></span>
                  </div>
                  <span className={styles.logTitle}>agent-telemetry.log</span>
                  <span className={styles.logStatus}>
                    {isRunning ? "● SIMULATING" : "● READY"}
                  </span>
                </div>
                <div className={styles.logLines}>
                  {logs.map((line, idx) => (
                    <div key={idx} className={styles.logLine}>
                      <span className={styles.logPrompt}>❯</span> {line}
                    </div>
                  ))}
                  {isRunning && (
                    <div className={styles.logLineTyping}>
                      <span className={styles.logPrompt}>❯</span>
                      <span className={styles.cursorBlink}>_</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
