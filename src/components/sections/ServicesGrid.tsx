"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { Reveal, ease } from "@/components/v3/Motion";
import { tajawal } from "@/lib/fonts";
import { AI_SUITE_WEBSITE, EXTRA_SERVICES, getServiceWebsite } from "@/lib/serviceNavigation";
import styles from "./ServicesGrid.module.css";

/* One 16:9 photo per service, from the client's service photo set. Data
   science and marketing have none of their own yet, so they keep the
   earlier data-ai and creative scenes. */
const IMAGES = {
  ai: "/images/services/photos/ai.webp",
  data: "/images/services/photos/data-ai.webp",
  software: "/images/services/photos/software.webp",
  ecommerce: "/images/services/photos/ecommerce.webp",
  reservations: "/images/services/photos/reservations.webp",
  marketing: "/images/services/photos/creative.webp",
  research: "/images/services/photos/research.webp",
  outsourcing: "/images/services/photos/outsourcing.webp",
  consulting: "/images/services/photos/consulting.webp",
};

/* The nine services, in the client's order. A service without an `href`
   shows no button until its page exists. */
const SERVICES: { key: string; title: string; text: string; image: string; cta: string; href?: string }[] = [
  {
    key: "ai",
    title: "الذكاء الاصطناعي والأتمتة الذكية",
    text: "حزمة متكاملة من الوكلاء الأذكياء الجاهزين للتخصيص، وحلول ذكاء اصطناعي متخصصة تُطوّر حسب الطلب، لتلبية احتياجات الأعمال في أتمتة العمليات، وتطوير خدمة العملاء والمبيعات، وتحسين الإنتاجية ودعم القرارات، مع التكامل مع الأنظمة والبيانات الحالية.",
    image: IMAGES.ai,
    cta: "استكشف منظومة الوكلاء الأذكياء",
    href: AI_SUITE_WEBSITE,
  },
  {
    key: "data",
    title: "علوم البيانات والذكاء الرقمي",
    text: "حلول متقدمة لتحليل البيانات والتنقيب عنها، وتطوير نماذج تعلم الآلة والتحليلات التنبؤية وذكاء الأعمال والأسواق. تساعد على اكتشاف الأنماط والفرص، وفهم الأداء، وتحويل البيانات التشغيلية والتجارية إلى رؤى قابلة للتطبيق.",
    image: IMAGES.data,
    cta: "اكتشف حلول البيانات",
    href: getServiceWebsite("data"),
  },
  {
    key: "software",
    title: "هندسة البرمجيات والتطبيقات",
    text: "أنظمة مؤسسية ومنصات رقمية وحلول تخطيط موارد المؤسسات وإدارة علاقات العملاء مصممة وفق متطلبات الأعمال، إلى جانب تطوير تطبيقات الهواتف الذكية بنوعيها: التطبيقات الأصلية لنظامَي آيفون وأندرويد، والتطبيقات متعددة المنصات، مع التكامل بين الأنظمة والاهتمام بالأمان والأداء وقابلية التوسع.",
    image: IMAGES.software,
    cta: "استكشف حلول البرمجيات",
  },
  {
    key: "ecommerce",
    title: "التجارة الإلكترونية والأسواق متعددة البائعين",
    text: "نطوّر متاجر إلكترونية وأسواقًا رقمية متعددة البائعين تجمع إدارة المنتجات والتجار والطلبات والمدفوعات والخدمات اللوجستية في تجربة تجارية متكاملة. تساعد هذه الحلول الشركات على توسيع قنوات البيع، وتنظيم العمليات التجارية، وتطوير تجربة الشراء، مع التكامل مع أنظمة المخزون والموارد المؤسسية.",
    image: IMAGES.ecommerce,
    cta: "استكشف حلول التجارة الإلكترونية",
    href: getServiceWebsite("web"),
  },
  {
    key: "reservations",
    title: "منصات الحجوزات والخدمات السياحية",
    text: "نطوّر منصات إلكترونية للحجوزات والمواعيد والخدمات السياحية، تشمل إدارة التوافر والحجز والتأكيد والدفع والتواصل مع العملاء ومقدمي الخدمات. تتيح هذه المنصات تحسين تجربة الحجز، وتوسيع الوصول إلى العملاء، وتنسيق العمليات التشغيلية من خلال مواقع الويب وتطبيقات الهواتف الذكية.",
    image: IMAGES.reservations,
    cta: "استكشف منصات الحجوزات",
  },
  {
    key: "marketing",
    title: "الإبداع والتسويق الرقمي متعدد القنوات",
    text: "هوية تجارية مميزة، ومحتوى إبداعي، وتجارب رقمية متكاملة، مدعومة باستراتيجيات تسويق متعدد القنوات، والحملات الإعلانية المدفوعة، وتحسين محركات البحث، لزيادة الوصول إلى العملاء وتعزيز التفاعل وتحقيق نمو قابل للقياس.",
    image: IMAGES.marketing,
    cta: "اطّلع على خدمات التسويق",
    href: getServiceWebsite("marketing"),
  },
  {
    key: "research",
    title: "البحث والابتكار",
    text: "بحث تطبيقي وتجارب تقنية لتطوير منتجات وحلول جديدة، واستكشاف إمكانات التكنولوجيا الناشئة وتحويلها إلى تطبيقات ذات جدوى تجارية. يشمل ذلك تطوير النماذج الأولية والأدوات الذكية والمنتجات ذات الملكية الفكرية، بالتعاون مع الشركاء التقنيين والبحثيين.",
    image: IMAGES.research,
    cta: "استكشف الابتكار",
  },
  {
    key: "outsourcing",
    title: "التعهيد التقني وخدمات الأعمال المُدارة",
    text: "خبرات تقنية وتشغيلية متخصصة تتيح للأعمال سرعة التنفيذ ومرونة التوسع وتحسين اقتصاديات التشغيل، دون الحاجة إلى تأسيس فرق داخلية كاملة. تشمل الخدمات تشغيل التجارة الإلكترونية والحجوزات الرقمية، والدعم التقني وخدمة العملاء والمحاسبة وإدارة الأنظمة، عبر فرق متخصصة ونماذج تعهيد وخدمات مُدارة تناسب حجم الأعمال واحتياجاتها.",
    image: IMAGES.outsourcing,
    cta: "استكشف خدمات التعهيد",
  },
  {
    key: "consulting",
    title: "الاستشارات وبناء المشروعات",
    text: "استشارات متخصصة في استراتيجيات الأعمال والتحول الرقمي والحوكمة والجودة وتطوير العمليات، إلى جانب تطوير المشروعات والمنتجات والشراكات التقنية والتجارية، وفق أهداف العملاء وفرص السوق والجدوى الاقتصادية. وتشمل خبراتنا الجودة 5.0، وتوظيف البيانات والأتمتة والذكاء الاصطناعي في قياس الأداء والتحسين المستمر والجاهزية المؤسسية.",
    image: IMAGES.consulting,
    cta: "استكشف الاستشارات",
    href: EXTRA_SERVICES.find(service => service.key === "ventures")!.website,
  },
];

const number = (index: number) => String(index + 1).padStart(2, "0");

/* The list opens on the first five; "عرض المزيد" adds the rest. */
const INITIAL_COUNT = 5;

/** Version 3's process layout, presenting version 1's service content. */
export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 35%", "end 75%"] });
  const visible = expanded ? SERVICES : SERVICES.slice(0, INITIAL_COUNT);
  /* Folding the list away can leave the last reading past its end. */
  const current = Math.min(active, visible.length - 1);
  const moreRef = useRef<HTMLButtonElement>(null);
  const moreTop = useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", value => {
    setActive(Math.max(0, Math.min(visible.length - 1, Math.floor(value * visible.length))));
  });

  const toggle = () => {
    if (expanded) moreTop.current = moreRef.current?.getBoundingClientRect().top ?? null;
    setExpanded(value => !value);
  };

  /* Folding removes four tall items above the button, so the page is moved
     to keep the button where the reader pressed it. */
  useLayoutEffect(() => {
    if (moreTop.current === null || !moreRef.current) return;
    window.scrollBy({ top: moreRef.current.getBoundingClientRect().top - moreTop.current, behavior: "instant" });
    moreTop.current = null;
  }, [expanded]);

  return (
    <section id="services" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="services-title" data-flow="outro">
      <Reveal className={styles.head}>
        <p className={styles.label}>خدماتنا</p>
        <h2 id="services-title">حلول تقنية ترتبط بأهداف أعمالك</h2>
        <p className={styles.lead}>نصمّم وننفّذ حلولنا وفق طبيعة كل نشاط وأولوياته، مع التركيز على الأداء والكفاءة والقدرة على النمو.</p>
      </Reveal>
      <div ref={ref} className={styles.layout}>
        <div className={styles.aside}>
          <div className={styles.art} aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className={styles.image}
                key={current}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{ duration: reduced ? 0 : 0.25, ease }}
              >
                <Image src={SERVICES[current].image} alt="" fill sizes="(max-width: 1200px) 40vw, 540px" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.listColumn}>
          <ol id="services-list" className={styles.list}>
            {visible.map((service, index) => (
              <li key={service.key} className={styles.item} data-active={current === index}>
                <div className={styles.rail} aria-hidden="true">
                  <span>{number(index)}</span>
                  <motion.div initial={false} animate={{ scaleY: reduced || current >= index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.65, ease }} />
                </div>
                <Reveal>
                  <div className={styles.copy}>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    {service.href && (service.href.startsWith("/") ? (
                      <a href={service.href} className={styles.link}>
                        {service.cta} <span aria-hidden="true">↖</span>
                      </a>
                    ) : (
                      <a href={service.href} className={styles.link} target="_blank" rel="noopener noreferrer"
                        aria-label={`${service.cta} (يفتح في علامة تبويب جديدة)`}>
                        {service.cta} <span aria-hidden="true">↖</span>
                      </a>
                    ))}
                    <Image className={styles.mobileImage} src={service.image} alt={service.title} width={1672} height={941}
                      sizes="(max-width: 640px) 90vw, 520px" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          {SERVICES.length > INITIAL_COUNT && (
            <button ref={moreRef} type="button" className={styles.more} aria-expanded={expanded} aria-controls="services-list"
              onClick={toggle}>
              {expanded ? "عرض أقل" : "عرض المزيد"}
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
