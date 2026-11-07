"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig, useAnimationControls, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import styles from "@/english/components/careers/CareersMotion.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const tags = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
};

type CareerRevealProps = Pick<
  HTMLMotionProps<"div">,
  "children" | "className" | "id" | "lang" | "dir"
> & {
  as?: keyof typeof tags;
  /** Milliseconds, matching the site's existing Reveal component. */
  delay?: number;
  effect?: "rise" | "scale";
  interactive?: boolean;
};

/** Keep careers motion scoped to this page, including its reduced-motion policy. */
export function CareersMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** A one-time entrance; keyboard focus also reveals content immediately. */
export function CareerReveal({
  as = "div",
  delay = 0,
  effect = "rise",
  interactive = false,
  className,
  ...props
}: CareerRevealProps) {
  const Tag = tags[as];
  const reduced = useReducedMotion();
  const controls = useAnimationControls();

  return (
    <Tag
      {...props}
      className={`${styles.reveal}${className ? ` ${className}` : ""}`}
      initial="hidden"
      animate={controls}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -32px 0px" }}
      variants={{
        hidden: { opacity: 0, y: effect === "scale" ? 16 : 28, scale: effect === "scale" ? 0.97 : 1 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay / 1000, ease },
        },
      }}
      whileHover={interactive && !reduced ? { y: -8, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onFocusCapture={() => controls.set("visible")}
    />
  );
}
