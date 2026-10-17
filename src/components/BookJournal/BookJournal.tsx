"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./BookJournal.module.css";

interface PageMeta {
  id: string;
  title: string;
  chapter: string;
}

const PAGES_META: PageMeta[] = [
  { id: "hero", title: "The Atelier", chapter: "01" },
  { id: "interactive-lab", title: "Playable Lab", chapter: "02" },
  { id: "agent-architecture", title: "AI Architecture", chapter: "03" },
  { id: "projects", title: "Case Dossiers", chapter: "04" },
  { id: "about", title: "The Story", chapter: "05" },
  { id: "experience", title: "Battle History", chapter: "06" },
  { id: "skills", title: "Craft Stack", chapter: "07" },
  { id: "chatbot", title: "Digital Twin & Close", chapter: "08" },
];

interface PageRange {
  internalDist: number; // Extra height of content inside this section
  turnDist: number;     // Window scroll distance dedicated to 3D page turn
  rangeStart: number;   // Window scroll start offset for this section
  totalRange: number;   // internalDist + turnDist
}

interface BookJournalProps {
  children: React.ReactNode[];
}

export default function BookJournal({ children }: BookJournalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [turnFraction, setTurnFraction] = useState<number>(0);
  const [currentInternalScroll, setCurrentInternalScroll] = useState<number>(0);
  const [pageRanges, setPageRanges] = useState<PageRange[]>([]);
  const [totalTrackHeight, setTotalTrackHeight] = useState<number>(0);

  const [isClient, setIsClient] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const totalPages = children.length;

  // Check client and screen width
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 860);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure content heights & calculate scroll ranges
  const updatePageMetrics = useCallback(() => {
    if (!containerRef.current) return;
    const vh = window.innerHeight;
    // Turn distance: full viewport height for cinematic page flip
    const TURN_DISTANCE = Math.max(600, Math.round(vh * 1.0));

    let accumulated = 0;
    const ranges: PageRange[] = [];

    for (let idx = 0; idx < totalPages; idx++) {
      const el = sheetContentRefs.current[idx];
      let internalDist = 0;
      if (el) {
        // scrollHeight works correctly because we use visibility:hidden
        // instead of display:none, so all sheets maintain their layout
        const contentHeight = el.scrollHeight;
        const clientHeight = el.clientHeight || vh;
        internalDist = Math.max(0, contentHeight - clientHeight);
      }

      // Generous dwell cushion: the user rests at the bottom of each section
      // for this distance before the page turn begins. This ensures all
      // bottom content is fully visible and readable.
      const dwellDist = internalDist > 0 ? Math.max(250, Math.round(vh * 0.3)) : 0;

      // The last page doesn't turn into anything
      const isLast = idx === totalPages - 1;
      const turnDist = isLast ? 0 : TURN_DISTANCE;

      const rangeStart = accumulated;
      const totalRange = internalDist + dwellDist + turnDist;
      accumulated += totalRange;

      ranges.push({
        internalDist: internalDist + dwellDist,
        turnDist,
        rangeStart,
        totalRange,
      });
    }

    setPageRanges(ranges);
    // Total track height = accumulated scroll distance + 1 viewport height
    setTotalTrackHeight(accumulated + vh);
  }, [totalPages]);

  // Initial measurement + resize handling + image load checks
  useEffect(() => {
    if (isMobile) return;

    // Run initial metric calculation
    updatePageMetrics();

    // Re-measure after hydration, fonts, images, and lazy-loaded content settle
    const timer1 = setTimeout(updatePageMetrics, 300);
    const timer2 = setTimeout(updatePageMetrics, 800);
    const timer3 = setTimeout(updatePageMetrics, 1500);
    const timer4 = setTimeout(updatePageMetrics, 3000);

    window.addEventListener("resize", updatePageMetrics);

    // Watch for DOM size shifts on ALL sheets
    const observer = new ResizeObserver(() => {
      updatePageMetrics();
    });

    sheetContentRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener("resize", updatePageMetrics);
      observer.disconnect();
    };
  }, [updatePageMetrics, isMobile]);

  // Jump to specific page start
  const jumpToPage = useCallback(
    (pageIndex: number) => {
      if (!containerRef.current || pageRanges.length === 0) return;
      const targetRange = pageRanges[pageIndex];
      if (!targetRange) return;

      const targetScroll = containerRef.current.offsetTop + targetRange.rangeStart;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [pageRanges]
  );

  // Handle Hash Navigation (Navbar clicks)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const foundIdx = PAGES_META.findIndex((p) => `#${p.id}` === hash);
      if (foundIdx !== -1) {
        jumpToPage(foundIdx);
      }
    };

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [jumpToPage]);

  // Global click interceptor for internal anchor links & custom jump events
  useEffect(() => {
    const handleJumpEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string | number>;
      if (typeof customEvent.detail === "number") {
        jumpToPage(customEvent.detail);
      } else if (typeof customEvent.detail === "string") {
        const id = customEvent.detail.replace("#", "");
        const idx = PAGES_META.findIndex((p) => p.id === id);
        if (idx !== -1) {
          jumpToPage(idx);
        }
      }
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const id = href.replace("#", "");
        const idx = PAGES_META.findIndex((p) => p.id === id);
        if (idx !== -1) {
          e.preventDefault();
          jumpToPage(idx);
          try {
            window.history.pushState(null, "", href);
          } catch {
            // ignore
          }
        }
      }
    };

    window.addEventListener("journal:jump", handleJumpEvent);                       
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      window.removeEventListener("journal:jump", handleJumpEvent);
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, [jumpToPage]);

  // Unified Scroll Listener: Reading through long section first, then turning page at end
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || pageRanges.length === 0) return;

        const containerTop = containerRef.current.offsetTop;
        const currentScroll = Math.max(0, window.scrollY - containerTop);

        // 1. Identify active page from precomputed scroll ranges
        let activeIdx = 0;
        for (let i = 0; i < pageRanges.length; i++) {
          const range = pageRanges[i];
          const isLast = i === pageRanges.length - 1;
          const nextStart = range.rangeStart + range.totalRange;

          if (currentScroll >= range.rangeStart && (currentScroll < nextStart || isLast)) {
            activeIdx = i;
            break;
          }
        }

        const currentRange = pageRanges[activeIdx];
        if (!currentRange) return;

        const pageOffset = Math.max(0, currentScroll - currentRange.rangeStart);

        let fraction = 0;
        let internalScroll = 0;

        if (pageOffset <= currentRange.internalDist) {
          // READING ZONE: Page stays completely flat. Content scrolls normally
          // so the user can read everything top to bottom.
          internalScroll = pageOffset;
          fraction = 0;
        } else {
          // PAGE TURN ZONE: Content is fully scrolled and pinned at the bottom.
          // Continuing to scroll now drives the 3D page turn animation.
          internalScroll = currentRange.internalDist;
          const rawProgress =
            currentRange.turnDist > 0
              ? (pageOffset - currentRange.internalDist) / currentRange.turnDist
              : 0;
          const clamped = Math.max(0, Math.min(1, rawProgress));
          // Quadratic ease-in for smooth start, linear through middle
          fraction = clamped < 0.3
            ? (clamped / 0.3) * (clamped / 0.3) * 0.3
            : clamped;
        }

        // Apply internal scroll position to active section
        const activeEl = sheetContentRefs.current[activeIdx];
        if (activeEl) {
          activeEl.scrollTop = internalScroll;
        }

        // Synchronize past sheets to their bottom, and upcoming sheets to top
        for (let i = 0; i < totalPages; i++) {
          if (i < activeIdx) {
            const pastEl = sheetContentRefs.current[i];
            const pastRange = pageRanges[i];
            if (pastEl && pastRange) {
              pastEl.scrollTop = pastRange.internalDist;
            }
          } else if (i > activeIdx) {
            const futureEl = sheetContentRefs.current[i];
            if (futureEl) {
              futureEl.scrollTop = 0;
            }
          }
        }

        setCurrentPage(activeIdx);
        setTurnFraction(fraction);
        setCurrentInternalScroll(internalScroll);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [pageRanges, totalPages, isMobile]);

  // If mobile or reduced motion: render clean flowing pages
  if (isMobile) {
    return (
      <div className={styles.mobileFlow}>
        {children.map((child, idx) => (
          <div key={idx} id={PAGES_META[idx]?.id} className={styles.mobilePage}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  const activeRange = pageRanges[currentPage];
  const hasLongContent = activeRange && activeRange.internalDist > 40;

  return (
    <div
      ref={containerRef}
      className={styles.journalUniverse}
      style={{
        height: totalTrackHeight > 0 ? `${totalTrackHeight}px` : `${totalPages * 140}vh`,
      }}
    >
      {/* Pinned 3D Viewport Stage */}
      <div className={styles.stickyStage}>
        {/* Top Journal Binder Spine Accent */}
        <div className={styles.topJournalSpine}>
          <div className={styles.spineLeather}>
            <div className={styles.spineRivets}>
              <span className={styles.rivetDot}></span>
              <span className={styles.rivetDot}></span>
              <span className={styles.rivetDot}></span>
              <span className={styles.rivetDot}></span>
              <span className={styles.rivetDot}></span>
              <span className={styles.rivetDot}></span>
            </div>
          </div>
        </div>

        {/* Floating Journal Page Navigation / Bookmark */}
        {(() => {
          const displayPageIndex = turnFraction > 0.5 ? Math.min(totalPages - 1, currentPage + 1) : currentPage;
          return (
            <aside className={styles.journalBookmark} aria-label="Notebook Page Navigation">
              <div className={styles.bookmarkHeader}>
                <span className={styles.bookmarkChapter}>
                  PAGE {PAGES_META[displayPageIndex]?.chapter || "01"}
                </span>
                <span className={styles.bookmarkTitle}>
                  {PAGES_META[displayPageIndex]?.title || "The Atelier"}
                </span>
              </div>
              <div className={styles.pageDots}>
                {PAGES_META.map((meta, idx) => {
                  const isActive = idx === displayPageIndex;
                  return (
                    <button
                      key={meta.id}
                      onClick={() => jumpToPage(idx)}
                      className={`${styles.pageDotBtn} ${isActive ? styles.activeDot : ""}`}
                      title={`Turn to Page ${meta.chapter}: ${meta.title}`}
                      aria-label={`Turn to Page ${meta.chapter}: ${meta.title}`}
                    >
                      <span className={styles.dotShape}></span>
                      <span className={styles.dotTooltip}>{meta.title}</span>
                    </button>
                  );
                })}
              </div>
            </aside>
          );
        })()}

        {/* 3D Page Deck */}
        <div className={styles.pagesDeck}>
          {children.map((child, idx) => {
            // Determine position relative to current active page
            let pageState: "past" | "active" | "incoming" | "future" = "future";

            if (idx < currentPage) {
              pageState = "past";
            } else if (idx === currentPage) {
              pageState = "active";
            } else if (idx === currentPage + 1) {
              pageState = "incoming";
            } else {
              pageState = "future";
            }

            // Calculate dynamic 3D transform for physical bottom-to-top notebook page turn
            let transform = "translateY(0) rotateX(0deg) scale(1)";
            let opacity = 1;
            let shadowOpacity = 0;
            let incomingShadow = 0;
            let zIndex = totalPages - idx;

            if (pageState === "past") {
              // Flipped up and tucked away cleanly above
              transform = "translateY(-120%) rotateX(120deg) scale(0.9)";
              opacity = 0;
              zIndex = 1;
            } else if (pageState === "active") {
              if (turnFraction === 0) {
                // Resting flat on table while reading content
                transform = "translateY(0%) rotateX(0deg) scale(1)";
                opacity = 1;
                zIndex = totalPages;
              } else {
                // Turning in 3D bottom-to-top: curls up from bottom, arches up, flips over top binder
                const rotX = Math.pow(turnFraction, 0.95) * 115;
                const translateY = -Math.pow(turnFraction, 1.35) * 115;
                const scale = 1 - turnFraction * 0.07;
                opacity =
                  turnFraction > 0.75
                    ? Math.max(0, 1 - (turnFraction - 0.75) / 0.25)
                    : 1;
                transform = `translateY(${translateY}%) rotateX(${rotX}deg) scale(${scale})`;
                shadowOpacity = Math.min(1, turnFraction * 1.2);
                zIndex = totalPages;
              }
            } else if (pageState === "incoming") {
              // Fresh page underneath: reveals as old page flips away
              const incomingScale = 0.97 + turnFraction * 0.03;
              transform = `translateY(0%) rotateX(0deg) scale(${incomingScale})`;
              incomingShadow = Math.max(0, (1 - turnFraction) * 0.65);
              opacity = 1;
              zIndex = totalPages - 1;
            } else {
              // Deeper in the notebook stack
              transform = "translateY(0%) scale(0.96)";
              opacity = 0;
              zIndex = 1;
            }

            // Determine which pages need full rendering vs hidden layout
            const isVisible =
              pageState === "active" ||
              (pageState === "incoming" && turnFraction > 0.002);

            // Allow interaction when page is resting flat (reading mode)
            const isInteractive = pageState === "active" && turnFraction < 0.06;

            return (
              <div
                key={idx}
                id={PAGES_META[idx]?.id}
                className={`${styles.journalSheet} ${
                  pageState === "active" && turnFraction > 0 ? styles.isTurning : ""
                } ${pageState === "incoming" ? styles.isIncoming : ""}`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  // CRITICAL: Use visibility instead of display so scrollHeight
                  // can always be measured accurately for all sheets.
                  // display:none collapses layout = scrollHeight becomes 0.
                  visibility: isVisible ? "visible" : "hidden",
                  pointerEvents: isInteractive ? "auto" : "none",
                  willChange: isVisible ? "transform, opacity" : "auto",
                }}
              >
                {/* Internal Page Scroller driven by unified window scroll */}
                <div
                  ref={(el) => {
                    sheetContentRefs.current[idx] = el;
                  }}
                  className={styles.sheetContentScroll}
                >
                  {child}
                </div>

                {/* Subtle Reading Progress Hint when section has tall content */}
                {pageState === "active" && hasLongContent && turnFraction < 0.02 && (() => {
                  const scrollProgress = activeRange.internalDist > 0
                    ? currentInternalScroll / activeRange.internalDist
                    : 0;
                  const isNearEnd = scrollProgress >= 0.92;
                  // Fade out the hint smoothly as we approach the page turn zone
                  const hintOpacity = turnFraction > 0.005
                    ? Math.max(0, 1 - turnFraction / 0.02)
                    : 1;
                  return (
                    <div
                      className={styles.sectionScrollHint}
                      style={{ opacity: hintOpacity }}
                    >
                      <span className={styles.scrollHintText}>
                        {isNearEnd
                          ? "Section complete • Scroll to turn page ↓"
                          : "Scroll to continue reading ↓"}
                      </span>
                      <div className={styles.scrollHintBar}>
                        <div
                          className={styles.scrollHintFill}
                          style={{
                            width: `${Math.min(100, Math.round(scrollProgress * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Dynamic Paper Shading Gradient when lifting up */}
                {pageState === "active" && turnFraction > 0 && (
                  <div
                    className={styles.pageTurnShadow}
                    style={{ opacity: shadowOpacity }}
                  />
                )}

                {/* Dynamic Incoming Shadow that lifts off revealing fresh paper */}
                {pageState === "incoming" && turnFraction > 0.002 && (
                  <div
                    className={styles.incomingPaperShadow}
                    style={{ opacity: incomingShadow }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
