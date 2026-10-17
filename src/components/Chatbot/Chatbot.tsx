"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";

interface Message {
  sender: "user" | "twin";
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "twin",
      text: "Namaste! I'm Amar's Digital Twin. I know his actual production stories, late-night architecture decisions, and tech stack quirks. Ask me anything or select a prompt below!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Why build an AI Astrology platform?",
    "How did you scale for 92+ billers?",
    "How do you stop AI hallucinations?",
    "Let's talk about hiring Amar",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getAgentResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes("hire") || text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("reach") || text.includes("call")) {
      return "Amar is actively open to high-impact AI Engineering and Full-Stack roles where he can build autonomous systems or scale mission-critical platforms. You can reach him directly at amarpratapsingh3641@gmail.com or call +91 96994 83641. Feel free to connect on LinkedIn (amar-pratap-singh00) too!";
    }

    if (text.includes("astrology") || text.includes("kundli")) {
      return "True story: When everyone was building ChatGPT clones for recipes, Amar asked: 'What do millions of Indians search for daily that requires complex math + interpretation?' The answer was Vedic Kundli charts! He combined high-precision ephemeris planetary equations with OpenAI agent chains. Today Kundli Online generates real revenue with 500+ daily active users.";
    }

    if (text.includes("biller") || text.includes("plutos") || text.includes("scale") || text.includes("erp")) {
      return "At Plutos One, Amar led frontend architecture for the BBPS enterprise ERP serving 92+ offline Indian utility billers. When manual onboarding was taking weeks per biller, Amar designed BillerHub and automated multi-step Python agent workflows that slashed onboarding time by 90% across 33+ production modules.";
    }

    if (text.includes("hallucinat") || text.includes("guardrail") || text.includes("mcp") || text.includes("stop")) {
      return "Amar's core principle: Never let an LLM touch a database or API without deterministic validation. He uses Anthropic Model Context Protocol (MCP) to enforce strict schema contracts, validates outputs with Pydantic, and runs RAGAS/DeepEval test suites. If an agent fails validation, it loops back with structured error feedback rather than fabricating data.";
    }

    if (text.includes("stack") || text.includes("tech") || text.includes("skill") || text.includes("python") || text.includes("next")) {
      return "Amar's production toolkit: Python (3+ years, FastAPI, LangGraph, CrewAI), TypeScript & JavaScript, Next.js, React, Node.js, Electron.js. Databases: PostgreSQL, MongoDB, Pinecone, FAISS, Redis. Certified in Anthropic Claude API & MCP, and MERN Stack development.";
    }

    return "Amar is a builder at heart. Whether it is cutting 70% of research time with 4 cooperating CrewAI agents, diagnosing skin conditions in <10s with Saundarya AI, or building robust enterprise ERPs, he builds software that creates real human leverage. Try asking about Kundli Online or how to contact him!";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAgentResponse(text);
      const twinMessage: Message = { sender: "twin", text: responseText };
      setMessages((prev) => [...prev, twinMessage]);
      setIsTyping(false);
    }, 700 + Math.random() * 300);
  };

  return (
    <section id="chatbot" className={styles.chatbotSection}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className="craft-stamp">Interactive Intercom</span>
          <h2 className="section-title">Chat with Amar&apos;s Digital Twin</h2>
          <p className="section-subtitle">
            Curious about his deployment stories, why he chose LangGraph over LangChain, or how he can
            join your engineering squad? Fire away!
          </p>
        </div>

        <div className={`${styles.chatWrapper} craft-card`}>
          <div className={styles.terminalHeader}>
            <div className={styles.twinProfile}>
              <div className={styles.twinAvatar}>👤</div>
              <div>
                <span className={styles.twinName}>Amar&apos;s Digital Twin</span>
                <span className={styles.twinStatus}>● Online • Context Loaded</span>
              </div>
            </div>
            <span className={styles.modelTag}>Claude &amp; Resume RAG Powered</span>
          </div>

          <div className={styles.chatWindow}>
            <div className={styles.chatLogs}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.messageRow} ${msg.sender === "user" ? styles.userRow : styles.twinRow}`}
                >
                  <div className={styles.messageBubble}>
                    <p className={styles.messageText}>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={`${styles.messageRow} ${styles.twinRow}`}>
                  <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className={styles.promptChips}>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isTyping}
                  className={styles.promptChip}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className={styles.inputForm}
            >
              <input
                type="text"
                placeholder="Ask about my projects, biller scale, architecture decisions..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                className={styles.chatInput}
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className={styles.sendBtn}
              >
                Send ↵
              </button>
            </form>
          </div>
        </div>

        {/* Real Contact Dossier Cards */}
        <div className={styles.contactDossier}>
          <button
            onClick={() => handleCopy("amarpratapsingh3641@gmail.com", "email")}
            className={styles.dossierItem}
          >
            <span className={styles.dossierIcon}>✉️</span>
            <div>
              <span className={styles.dossierLabel}>Direct Email</span>
              <strong className={styles.dossierVal}>amarpratapsingh3641@gmail.com</strong>
            </div>
            <span className={styles.copyBadge}>
              {copiedText === "email" ? "Copied!" : "Click to copy"}
            </span>
          </button>

          <button
            onClick={() => handleCopy("+919699483641", "phone")}
            className={styles.dossierItem}
          >
            <span className={styles.dossierIcon}>📞</span>
            <div>
              <span className={styles.dossierLabel}>Phone / WhatsApp</span>
              <strong className={styles.dossierVal}>+91 96994 83641</strong>
            </div>
            <span className={styles.copyBadge}>
              {copiedText === "phone" ? "Copied!" : "Click to copy"}
            </span>
          </button>

          <a
            href="https://linkedin.com/in/amar-pratap-singh00"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dossierItem}
          >
            <span className={styles.dossierIcon}>💼</span>
            <div>
              <span className={styles.dossierLabel}>LinkedIn</span>
              <strong className={styles.dossierVal}>amar-pratap-singh00</strong>
            </div>
            <span className={styles.copyBadge}>Visit ↗</span>
          </a>

          <a
            href="https://github.com/Amrpratapsingh"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.dossierItem}
          >
            <span className={styles.dossierIcon}>🐙</span>
            <div>
              <span className={styles.dossierLabel}>GitHub</span>
              <strong className={styles.dossierVal}>Amrpratapsingh</strong>
            </div>
            <span className={styles.copyBadge}>Visit ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
