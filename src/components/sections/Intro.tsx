import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "./Intro.module.css";

/* The five labs, in the client's order. */
const LABS = [
  "مختبر الذكاء الاصطناعي والبيانات",
  "مختبر أنظمة المؤسسات",
  "مختبر هندسة البرمجيات",
  "المختبر الإبداعي",
  "مختبر البحث والتطوير والاستشارات",
];

/** Version 4's editorial introduction, with links kept in version 1. */
export function Intro() {
  return (
    <section id="about" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="intro-title">
      <Reveal as="h2" id="intro-title" className={styles.heading}>
        نعمل وفق <span>تكنولوجيا الجيل الخامس</span>
      </Reveal>
      <div className={styles.bottom}>
        <span className={styles.cross} aria-hidden="true">✳</span>
        <Reveal className={styles.copy} delay={120}>
          <p>تعتمد ترانسفورمكس مبادئ تكنولوجيا الجيل الخامس في تطوير منتجاتها وطريقة عملها، بالتركيز على الإنسان والابتكار والاستدامة والمرونة والتوظيف المسؤول للتكنولوجيا، مع اختيار الحلول والتقنيات المناسبة لمتطلبات كل عميل.</p>
          <Link href="/about" className={styles.link}>
            من نحن
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M25 7 7 25M7 7v18h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </Reveal>
      </div>
      <Reveal as="h3" id="intro-labs-title" className={styles.labsTitle}>
        مختبراتنا الخمسة
      </Reveal>
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
