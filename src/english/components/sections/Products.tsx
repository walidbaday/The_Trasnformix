"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import { getServiceWebsite, PRODUCT_WEBSITES } from "@/english/lib/serviceNavigation";
import styles from "@/english/components/sections/Products.module.css";

type Product = {
  /** The product's own name, set in Latin above its Arabic title. */
  name?: string;
  title: string;
  text: string;
  /** What "اقرأ المزيد" opens; without it the toggle is left out. */
  details?: string[];
  website?: string;
  image: { src: string; fit: "cover" | "contain" };
};

/* The client's three products, in their order. */
const PRODUCTS: Product[] = [
  {
    name: "TX AI Suite",
    title: "AI Agents Suite",
    text: "A customisable suite of AI agents that helps organisations speed up customer service, improve sales and booking follow-up, cut operational effort and surface the information behind decisions.",
    details: [
      "TX AI Suite lets organisations respond to customers faster and more consistently, turn enquiries into clear follow-up opportunities, and automate a range of repetitive operational tasks. It integrates with your existing communication channels, systems and data according to the needs of each business.",
      "Agents can be configured around the nature of the service, business rules and permissions, helping improve the customer experience, raise team efficiency and free up time for higher-value work.",
    ],
    image: { src: "/images/products/ai-agents.png", fit: "cover" },
  },
  {
    name: "TX ERP",
    title: "Enterprise Resource Planning",
    text: "An enterprise system developed by Transformix to manage operations, data and workflows in one unified environment that can grow and integrate.",
    /* The ‎ mark keeps ".NET"'s dot in front of it in Arabic text. */
    details: [
      "TX ERP is an enterprise resource planning system that Transformix develops in-house to organise operations and manage data and workflows across connected business functions. It is built on Flutter, Next.js, Python, .NET and Docker, supporting scalable interfaces, applications and services.",
      "It provides a foundation for developing business processes, reporting and system integration to fit operational requirements. It is offered as a standalone Transformix product, alongside the company's experience implementing and integrating multi-platform ERP and CRM systems.",
    ],
    website: getServiceWebsite("erp"),
    image: { src: "/images/services/photos/erp.webp", fit: "cover" },
  },
  {
    title: "Investor & Cooperative Management Platform",
    text: "A digital platform for managing investor and member relations, governance, electronic voting and reporting across the web and mobile apps.",
    website: PRODUCT_WEBSITES.cooperatives,
    image: { src: "/images/products/cooperatives-platform.png", fit: "contain" },
  },
];

const pad = (value: number) => String(value).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as const;

/** The products, one at a time (after Framer's Slide Content Toggle): the
    copy beside its picture between two hairlines, square arrows to step
    through them, and the picture easing closer on hover. Stepping slides the
    copy and the picture the way the reader is moving; "اقرأ المزيد" unfolds
    a product's details in place. */
export function Products() {
  const uid = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [open, setOpen] = useState(false);
  const product = PRODUCTS[index];
  const detailsId = `${uid}-details`;

  const step = (by: number) => {
    /* Forward is leftwards in Arabic, so the slide's sign follows the page. */
    const rtl = sectionRef.current ? getComputedStyle(sectionRef.current).direction === "ltr" : true;
    setSlide([(index + by + PRODUCTS.length) % PRODUCTS.length, by * (rtl ? -1 : 1)]);
    setOpen(false);
  };

  const distance = reduced ? 0 : 48;
  const timing = (duration: number) => ({ duration: reduced ? 0 : duration, ease });
  /* The outgoing slide leaves quickly so the copy is never blank for long. */
  const slide = {
    enter: (dir: number) => ({ opacity: 0, x: dir * distance }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -distance, transition: timing(0.2) }),
  };

  return (
    <section ref={sectionRef} id="our-products" className={`${styles.section} ${tajawal.variable}`} aria-labelledby="products-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal as="h2" id="products-heading" className={styles.heading}>{"Our Products & Digital Solutions"}</Reveal>
          <Reveal as="p" className={styles.lead} delay={120}>
            {" Technology platforms and products built to support commercial and organisational operations, ready to integrate and customise for the needs of each sector. "}</Reveal>
        </div>

        <div className={styles.stage} role="group" aria-roledescription="carousel" aria-label={"Our products"}>
          <div className={styles.copy}>
            <div className={styles.viewport} aria-live="polite">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={timing(0.36)}
                >
                  {product.name ? (
                    <>
                      <h3 className={styles.name} dir="ltr">{product.name}</h3>
                      <p className={styles.title}>{product.title}</p>
                    </>
                  ) : (
                    <h3 className={styles.name}>{product.title}</h3>
                  )}
                  <p className={styles.text}>{product.text}</p>

                  <AnimatePresence initial={false}>
                    {open && product.details && (
                      <motion.div
                        id={detailsId}
                        className={styles.details}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={timing(0.45)}
                      >
                        {product.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {(product.details || product.website) && (
                    <div className={styles.actions}>
                      {product.details && (
                        <button
                          type="button"
                          className={styles.more}
                          aria-expanded={open}
                          aria-controls={detailsId}
                          onClick={() => setOpen((value) => !value)}
                        >
                          {open ? "Show less" : "Read More"}
                          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}
                      {product.website && (
                        <a
                          href={product.website}
                          className={styles.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${"Go to Website"} (opens in a new tab)`}
                        >
                          {" Go to Website "}<span aria-hidden="true">↖</span>
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.controls}>
              <button type="button" className={styles.arrow} aria-label={"Previous product"} onClick={() => step(-1)}>
                <svg className={styles.back} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className={styles.arrow} aria-label={"Next product"} onClick={() => step(1)}>
                <svg className={styles.forward} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className={styles.counter} dir="ltr" aria-hidden="true">
                {pad(index + 1)} <span>/ {pad(PRODUCTS.length)}</span>
              </span>
            </div>
          </div>

          <div className={styles.frame}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                className={`${styles.picture} ${product.image.fit === "contain" ? styles.contain : ""}`}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={timing(0.55)}
              >
                <Image src={product.image.src} alt={product.title} fill sizes="(max-width: 900px) 100vw, 45vw" />
              </motion.div>
            </AnimatePresence>
            {/* The other pictures load alongside, unseen, so a step never
                waits on a download. */}
            {PRODUCTS.map((item, i) => i !== index && (
              <Image key={item.image.src} className={styles.preload} src={item.image.src} alt="" fill
                sizes="(max-width: 900px) 100vw, 45vw" aria-hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
