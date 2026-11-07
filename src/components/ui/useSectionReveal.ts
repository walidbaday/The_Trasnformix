"use client";

import { useSyncExternalStore, type RefObject } from "react";
import { useScroll, useTransform } from "framer-motion";

const motionQuery = "(prefers-reduced-motion: no-preference)";
const compactQuery = "(max-width: 767px)";

function subscribeEnvironment(onChange: () => void) {
  const motion = window.matchMedia(motionQuery);
  const compact = window.matchMedia(compactQuery);
  motion.addEventListener("change", onChange);
  compact.addEventListener("change", onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    compact.removeEventListener("change", onChange);
  };
}

const getEnvironment = () => (window.matchMedia(motionQuery).matches ? 1 : 0)
  | (window.matchMedia(compactQuery).matches ? 2 : 0);
const getServerEnvironment = () => 0;

export function useMotionEnvironment() {
  const environment = useSyncExternalStore(subscribeEnvironment, getEnvironment, getServerEnvironment);
  return { enabled: Boolean(environment & 1), compact: Boolean(environment & 2) };
}

/** Finish the entrance before the section reaches the reading area. The
 * stationary target keeps the animation independent of its own movement. */
export function useSectionReveal(target: RefObject<HTMLElement | null>, animate = true) {
  const { enabled, compact } = useMotionEnvironment();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "start 40%"],
    trackContentSize: true,
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [compact ? 20 : 36, 0]);
  const active = enabled && animate;

  return { opacity: active ? opacity : 1, y: active ? y : 0 };
}
