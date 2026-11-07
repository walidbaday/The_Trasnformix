"use client";

import { usePathname } from "next/navigation";
import { animate, motion, MotionConfig, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { OpeningMark } from "./OpeningMark";
import styles from "./HomeOpening.module.css";

type Version = "v1" | "v2";
const ease = [0.22, 1, 0.36, 1] as const;
const steps = ["فكرة", "تكنولوجيا", "أثر"];
const letters = [..."TRANSFORMIX"];

function OpeningStep({ progress, index, label }: { progress: MotionValue<number>; index: number; label: string }) {
  const opacity = useTransform(progress, value => value >= index * 33 ? 1 : 0.35);
  const scaleX = useTransform(progress, [index * 33, (index + 1) * 33], [0, 1]);
  return (
    <motion.span className={styles.step} style={{ opacity }}>
      <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
      {label}
      <motion.i style={{ scaleX }} />
    </motion.span>
  );
}

function Opening({ version, onComplete }: { version: Version; onComplete: () => void }) {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const scale = useTransform(progress, [0, 100], [0, 1]);
  const percent = useTransform(progress, value => String(Math.round(value)).padStart(2, "0"));
  const [leaving, setLeaving] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controls = animate(progress, 100, {
      duration: reduced ? 0.1 : 2.5,
      ease: [0.35, 0, 0.2, 1],
      onComplete: () => setLeaving(true),
    });
    const fallback = window.setTimeout(onComplete, 6000);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
      if (event.key === "Tab") {
        event.preventDefault();
        overlayRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      controls.stop();
      window.clearTimeout(fallback);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, progress, reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${styles[version]}`}
        data-home-opening={version}
        role="status"
        aria-label="مرحبًا بك في Transformix"
      >
        <div className={styles.panels} aria-hidden="true">
          {[0, 1, 2, 3].map(index => (
            <motion.div
              key={index}
              className={styles.panel}
              initial={false}
              animate={{ y: leaving ? "-101%" : "0%" }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.055, ease }}
              onAnimationComplete={() => { if (leaving && index === 3) onComplete(); }}
            />
          ))}
        </div>
        <motion.div
          className={styles.composition}
          initial={false}
          animate={{ opacity: leaving ? 0 : 1, y: leaving && !reduced ? -30 : 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease }}
        >
          <div className={styles.top} aria-hidden="true">
            <span className={styles.signature} dir="ltr"><span className={styles.cross}>+</span> THE TRANSFORMIX</span>
            <span>حلول رقمية متكاملة</span>
          </div>
          <div className={styles.stage} aria-hidden="true">
            <OpeningMark reduced={reduced} />
            <div className={styles.word} dir="ltr">
              {letters.map((letter, index) => (
                <span key={index} className={styles.letterClip}>
                  <motion.span
                    initial={reduced ? false : { y: "110%", rotate: 5 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : 0.65 + index * 0.04, ease }}
                  >{letter}</motion.span>
                </span>
              ))}
              <motion.sup initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 1.6 }}>®</motion.sup>
            </div>
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1.3, ease }}
            >من الفكرة إلى أثر حقيقي</motion.p>
          </div>
          <div className={styles.bottom} aria-hidden="true">
            <div className={styles.progress} dir="ltr">
              <div className={styles.counter}><motion.span>{percent}</motion.span><span className={styles.percent}>%</span></div>
              <div className={styles.track}><motion.div style={{ scaleX: scale }} /></div>
            </div>
            <div className={styles.steps}>
              {steps.map((label, index) => <OpeningStep key={label} progress={progress} index={index} label={label} />)}
            </div>
          </div>
        </motion.div>
        <motion.button
          type="button"
          className={styles.skip}
          data-opening-skip
          onClick={onComplete}
          initial={false}
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          تخطي المقدمة <span aria-hidden="true">↗</span>
        </motion.button>
      </div>
    </MotionConfig>
  );
}

function OpeningFrame({ version, play, children }: { version: Version; play: boolean; children: ReactNode }) {
  const [phase, setPhase] = useState<"pending" | "playing" | "done">(play ? "pending" : "done");
  const contentRef = useRef<HTMLDivElement>(null);
  const complete = useCallback(() => {
    const restoreFocus = !!document.activeElement?.closest("[data-home-opening]");
    setPhase("done");
    if (restoreFocus) {
      requestAnimationFrame(() => {
        contentRef.current?.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
      });
    }
  }, []);

  useEffect(() => {
    if (!play) return;
    const frame = requestAnimationFrame(() => setPhase(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "done" : "playing"));
    const replay = (event: PageTransitionEvent) => {
      if (event.persisted && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPhase("playing");
    };
    window.addEventListener("pageshow", replay);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", replay);
    };
  }, [play]);

  return (
    <div data-opening-state={phase}>
      {phase === "playing" && <Opening version={version} onComplete={complete} />}
      <div ref={contentRef} data-home-content inert={phase === "playing"}>{children}</div>
    </div>
  );
}

export function HomeOpening({ version, children }: { version: Version; children: ReactNode }) {
  const pathname = usePathname();
  return <OpeningFrame key={pathname} version={version} play={pathname === (version === "v1" ? "/" : "/v2")}>
    {children}
  </OpeningFrame>;
}
