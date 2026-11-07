"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "./Academies.module.css";

/* The three academies, in the client's order. Each opens its track on the
   academy page; the youth academy is the vocational track there.
   NOTE: the pictures are the sector screens until the client sends photos. */
const ACADEMIES = [
  {
    title: "أكاديمية التعاونيات",
    text: "برامج عملية لمجالس الإدارة والفرق التنفيذية والتشغيلية في الحوكمة الرقمية وإدارة الأعضاء والأنظمة المؤسسية والذكاء الاصطناعي، مع تطبيقات ترتبط بإدارة العمل التعاوني.",
    cta: "استكشف أكاديمية التعاونيات",
    href: "/academy#cooperatives",
    image: "/images/sectors/cooperatives-1.png",
  },
  {
    title: "الأكاديمية الصناعية",
    text: "تدريب تطبيقي في أنظمة التصنيع وتخطيط الموارد وإدارة الجودة وتحليل البيانات والأتمتة والجاهزية المؤسسية، موجه للفرق الصناعية والفنية والإدارية.",
    cta: "استكشف الأكاديمية الصناعية",
    href: "/academy#industry",
    image: "/images/sectors/industry-3.png",
  },
  {
    title: "أكاديمية الشباب والمهارات الرقمية",
    text: "مسارات عملية في أساسيات الأنظمة المؤسسية والبرمجة والبيانات والذكاء الاصطناعي، مع مشروعات تطبيقية وإرشاد مهني لربط التعلم بمتطلبات الوظائف التقنية.",
    cta: "استكشف برامج الشباب",
    href: "/academy#vocational",
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
          <Reveal as="h2" id="academies-heading" className={styles.title}>الأكاديميات والتطوير المهني</Reveal>
          <Reveal as="p" className={styles.subtitle} delay={120}>
            برامج تعلم تطبيقي ومسارات تأهيل متخصصة تربط المهارات الرقمية باحتياجات العمل، وتستفيد من خبرات فرقنا في الأنظمة المؤسسية والبيانات والذكاء الاصطناعي وتطوير المنتجات.
          </Reveal>
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
