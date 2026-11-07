"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Academies.module.css";

/* The three academies, in the client's order. Each opens its track on the
   academy page; the youth academy is the vocational track there.
   NOTE: the pictures are the sector screens until the client sends photos. */
const ACADEMIES = [
  {
    title: "Cooperatives Academy",
    text: "Practical programmes for boards and executive and operational teams in digital governance, member management, enterprise systems and AI, applied to running cooperative work.",
    cta: "Explore Cooperatives Academy",
    href: "/en/academy#cooperatives",
    image: "/images/sectors/cooperatives-1.png",
  },
  {
    title: "Industrial Academy",
    text: "Applied training in manufacturing systems, resource planning, quality management, data analysis, automation and organisational readiness, for industrial, technical and administrative teams.",
    cta: "Explore Industrial Academy",
    href: "/en/academy#industry",
    image: "/images/sectors/industry-3.png",
  },
  {
    title: "Youth & Digital Skills Academy",
    text: "Practical paths in the fundamentals of enterprise systems, programming, data and AI, with hands-on projects and career mentoring that connect learning to what tech jobs require.",
    cta: "Explore Youth Programs",
    href: "/en/academy#vocational",
    image: "/images/sectors/education-2.png",
  },
];

const number = (index: number) => String(index + 1).padStart(2, "0");

/** The academies as hover cards (after Framer's Property Hover Card): the
    card under the pointer, or holding focus, opens — its picture drops in
    from the top, the copy turns white and lifts to make room for the link.
    The first card starts open and the last one opened stays open; a tap
    opens a card on touch screens. Small screens show every card open. */
export function Academies() {
  const [active, setActive] = useState(0);

  return (
    <section id="academies" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="academies-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal as="h2" id="academies-heading" className={styles.title}>{"Academies & Professional Learning"}</Reveal>
          <Reveal as="p" className={styles.subtitle} delay={120}>
            {" Applied learning programmes and specialised training paths that tie digital skills to the needs of work, drawing on our teams' experience in enterprise systems, data, AI and product development. "}</Reveal>
        </div>

        <ol className={styles.list}>
          {ACADEMIES.map((academy, index) => (
            <li
              key={academy.title}
              className={styles.card}
              data-active={active === index}
              onPointerEnter={(event) => { if (event.pointerType !== "touch") setActive(index); }}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <div className={styles.media} aria-hidden="true">
                <Image src={academy.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <span className={styles.number} dir="ltr" aria-hidden="true">{number(index)}</span>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{academy.title}</h3>
                <p className={styles.cardText}>{academy.text}</p>
                <div className={styles.action}>
                  <div>
                    <Link href={academy.href} className={styles.link}>
                      {academy.cta}
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
