import Link from "next/link";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Intro.module.css";

/* The five labs, in the client's order. */
const LABS = [
  "AI & Data Lab",
  "ERP & Enterprise Systems Lab",
  "Software Engineering Lab",
  "Creative Lab",
  "R&D & Advisory Lab",
];

/** Version 4's editorial introduction, with links kept in version 1. */
export function Intro() {
  return (
    <section id="about" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="intro-title">
      <Reveal as="h2" id="intro-title" className={styles.heading}>
        {" Built on "}<span>{"Technology 5.0"}</span>
      </Reveal>
      <div className={styles.bottom}>
        <span className={styles.cross} aria-hidden="true">✳</span>
        <Reveal className={styles.copy} delay={120}>
          <p>{"Transformix builds its products and its way of working on the principles of Technology 5.0, with a focus on people, innovation, sustainability, resilience and the responsible use of technology, choosing the solutions and technologies that fit each client's requirements."}</p>
          <Link href={"/en/about"} className={styles.link}>
            {" About us "}<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M25 7 7 25M7 7v18h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </Reveal>
      </div>
      <Reveal as="h3" id="intro-labs-title" className={styles.labsTitle}>
        {" Our Five Labs "}</Reveal>
      <ol className={styles.stats} aria-labelledby="intro-labs-title">
        {LABS.map((lab, index) => (
          <Reveal as="li" key={lab} delay={index * 80}>
            <span className={styles.value} dir="ltr">{String(index + 1).padStart(2, "0")}</span>
            <h4>{lab}</h4>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
