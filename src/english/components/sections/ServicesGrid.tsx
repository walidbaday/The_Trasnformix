"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useLayoutEffect, useRef, useState } from "react";
import { Reveal, ease } from "@/english/components/v3/Motion";
import { tajawal } from "@/lib/fonts";
import { AI_SUITE_WEBSITE, EXTRA_SERVICES, getServiceWebsite } from "@/english/lib/serviceNavigation";
import styles from "@/english/components/sections/ServicesGrid.module.css";

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
    title: "AI & Intelligent Automation",
    text: "An integrated suite of ready-to-customise AI agents and specialised AI solutions built to order, covering process automation, customer service and sales, productivity and decision support, and integrated with your existing systems and data.",
    image: IMAGES.ai,
    cta: "Explore AI Agents",
    href: AI_SUITE_WEBSITE,
  },
  {
    key: "data",
    title: "Data Science & Digital Intelligence",
    text: "Advanced data analysis and mining, machine learning models, predictive analytics, and business and market intelligence. They help you spot patterns and opportunities, understand performance, and turn operational and commercial data into actionable insight.",
    image: IMAGES.data,
    cta: "Explore data solutions",
    href: getServiceWebsite("data"),
  },
  {
    key: "software",
    title: "Software Engineering & Applications",
    text: "Enterprise systems, digital platforms, and ERP and CRM solutions designed around your business requirements, alongside mobile app development of both kinds: native apps for iOS and Android, and cross-platform apps, with system integration and close attention to security, performance and scalability.",
    image: IMAGES.software,
    cta: "Explore Software Solutions",
  },
  {
    key: "ecommerce",
    title: "E-commerce & Multi-Vendor Marketplaces",
    text: "We build online stores and multi-vendor marketplaces that bring products, merchants, orders, payments and logistics together in one integrated commerce experience. These solutions help businesses expand their sales channels, organise commercial operations and improve the buying experience, integrated with inventory and ERP systems.",
    image: IMAGES.ecommerce,
    cta: "Explore E-commerce Solutions",
    href: getServiceWebsite("web"),
  },
  {
    key: "reservations",
    title: "Reservations & Tourism Platforms",
    text: "We build online platforms for reservations, appointments and tourism services, covering availability, booking, confirmation, payment and communication with customers and service providers. They improve the booking experience, widen your reach and coordinate operations across websites and mobile apps.",
    image: IMAGES.reservations,
    cta: "Explore Booking Platforms",
  },
  {
    key: "marketing",
    title: "Creative & Omnichannel Digital Marketing",
    text: "A distinctive brand identity, creative content and integrated digital experiences, backed by omnichannel marketing strategies, paid advertising campaigns and search engine optimisation, to reach more customers, deepen engagement and deliver measurable growth.",
    image: IMAGES.marketing,
    cta: "Explore Marketing Services",
    href: getServiceWebsite("marketing"),
  },
  {
    key: "research",
    title: "Research & Innovation",
    text: "Applied research and technical experiments to develop new products and solutions, exploring what emerging technology can do and turning it into commercially viable applications. This includes prototypes, smart tools and proprietary products, built with our technology and research partners.",
    image: IMAGES.research,
    cta: "Explore Innovation",
  },
  {
    key: "outsourcing",
    title: "Technology Outsourcing & Managed Business Services",
    text: "Specialised technical and operational expertise that lets businesses move fast, scale flexibly and run more economically, without building full in-house teams. Services include running e-commerce and digital reservations, technical support, customer service, accounting and systems administration, through dedicated teams and outsourcing and managed-service models sized to your business.",
    image: IMAGES.outsourcing,
    cta: "Explore Managed Services",
  },
  {
    key: "consulting",
    title: "Consulting & Venture Building",
    text: "Specialised consulting in business strategy, digital transformation, governance, quality and process improvement, alongside developing ventures, products and technology and commercial partnerships, guided by client goals, market opportunities and economic feasibility. Our expertise includes Quality 5.0 and the use of data, automation and AI for performance measurement, continuous improvement and organisational readiness.",
    image: IMAGES.consulting,
    cta: "Explore Consulting",
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
        <p className={styles.label}>{"Our services"}</p>
        <h2 id="services-title">{"Technology solutions tied to your business goals"}</h2>
        <p className={styles.lead}>{"We design and deliver our solutions around the nature and priorities of each business, with a focus on performance, efficiency and room to grow."}</p>
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
                        aria-label={`${service.cta} (opens in a new tab)`}>
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
              {expanded ? "Show less" : "Show more"}
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
