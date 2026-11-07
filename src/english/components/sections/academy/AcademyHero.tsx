import type { CSSProperties } from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/academy/AcademyHero.module.css";

/* Figma 3383:8374 "course-app/amico" — 509.094 x 465.488. Each layer's box in
   % of that frame, painted in the artboard's order. */
const LAYERS = [
  { name: "floor", x: -0.01, y: 41.63, w: 100.02, h: 58.38 },
  { name: "shadows", x: 1.83, y: 50.06, w: 94.95, h: 47.75 },
  { name: "pot", x: 56.16, y: 42.89, w: 12.19, h: 13.01 },
  { name: "plants", x: 50.14, y: 22.89, w: 23.28, h: 25.51 },
  { name: "gear-1", x: 32.74, y: 85.82, w: 17.14, h: 11.35 },
  { name: "gear-2", x: 50.84, y: 84.1, w: 12.62, h: 8.51 },
  { name: "mobile", x: 4.97, y: -0.01, w: 34.37, h: 90.82 },
  { name: "screen-2", x: 12.94, y: 7.33, w: 28.91, h: 83.13 },
  { name: "screen-1", x: 33.19, y: 6.07, w: 28.43, h: 79.04 },
  { name: "video", x: 38.23, y: 20.13, w: 26.19, h: 37.34 },
  { name: "sofa", x: 54.07, y: 41.13, w: 41.49, h: 48.83 },
  { name: "body-bottom", x: 57.61, y: 55.53, w: 28.09, h: 22.62 },
  { name: "body-top", x: 65.47, y: 29.06, w: 22.54, h: 31.53 },
  { name: "hand-1", x: 79.89, y: 68.24, w: 2.49, h: 6.61 },
  { name: "hand-2", x: 87.67, y: 63.79, w: 2.46, h: 6.55 },
  { name: "hand-3", x: 75.48, y: 59.33, w: 19.26, h: 11.89 },
  { name: "hand-4", x: 78.45, y: 59.33, w: 16.29, h: 11.89 },
  { name: "hand-5", x: 75.48, y: 59.33, w: 19.26, h: 11.25 },
  { name: "speech", x: 74.12, y: 13.08, w: 12.05, h: 14.11 },
];

/** Figma 3383:8325 "Desktop - 144" — copy on the right, the e-learning
    illustration on the left. AcademyCurtain brings in the next band using
    the site's shared upward reveal. */
export function AcademyHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.copy}>
          <h1 className={styles.title}>{"Build the skills that turn technology into performance"}</h1>
          <p className={styles.text}>
            {" TX Academies provide practical training in business software, digital solutions, and artificial intelligence, helping organizations equip their teams and individuals develop workplace skills. "}</p>
          <div className={styles.actions}>
            <PillButton href="#tracks">{"Explore the academy"}</PillButton>
            <PillButton variant="outline">{"Discuss your team's needs"}</PillButton>
          </div>
        </Reveal>

        <Reveal className={styles.art} delay={120} aria-hidden>
          {LAYERS.map((layer) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={layer.name}
              className={styles.layer}
              src={`/icons/academy/hero-${layer.name}.svg`}
              alt=""
              style={
                {
                  left: `${layer.x}%`,
                  top: `${layer.y}%`,
                  width: `${layer.w}%`,
                  height: `${layer.h}%`,
                } as CSSProperties
              }
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
