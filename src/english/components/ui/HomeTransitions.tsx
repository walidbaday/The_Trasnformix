"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionEnvironment, useSectionReveal } from "@/english/components/ui/useSectionReveal";
import styles from "@/english/components/ui/HomeTransitions.module.css";

/** Sections retain their natural document positions and 100px gaps. */
export function HomeTransitions({ children, className }: { children: ReactNode; className?: string }) {
  const { enabled } = useMotionEnvironment();

  return (
    <main
      className={`${styles.flow}${className ? ` ${className}` : ""}`}
      data-home-transitions={enabled ? "on" : "off"}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}

type HomeSectionProps = {
  children: ReactNode;
  effect?: "scene" | "reveal";
  tone?: "paper" | "brand" | "ice";
};

/** A short fade and rise settles before the section reaches the reading area. */
export function HomeSection({ children, effect = "reveal", tone = "paper" }: HomeSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reveal = useSectionReveal(trackRef, effect !== "scene");

  return (
    <div
      ref={trackRef}
      className={`${styles.track} ${styles[tone]}`}
      data-section-transition={effect}
      data-transition-tone={tone}
    >
      <motion.div className={styles.surface} style={reveal}>
        <div className={styles.content}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
