"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useSectionReveal } from "@/components/ui/useSectionReveal";
import flow from "@/components/ui/SectionFlow.module.css";
import styles from "./AcademyCurtain.module.css";

type AcademyCurtainProps = {
  /** The opening section. */
  hero: ReactNode;
  /** The sections that share the #fcfbfa band. */
  children: ReactNode;
};

/** The Academy shares the homepage's fade and rise in normal document flow. */
export function AcademyCurtain({ hero, children }: AcademyCurtainProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const reveal = useSectionReveal(bandRef);

  return (
    <div className={styles.root}>
      {hero}
      <div ref={bandRef} className={styles.band}>
        <motion.div className={`${styles.content} ${flow.flow}`} style={reveal}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
