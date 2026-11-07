import Image from "next/image";
import type { CSSProperties } from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import { PRODUCT_WEBSITES } from "@/english/lib/serviceNavigation";
import styles from "@/english/components/sections/products/ProductShowcase.module.css";

type Product = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  text: string;
  /** The "لمن هذه المنصة" row under the copy. */
  audience?: string;
  cta: string;
  /** Without one the pill opens the contact form; another site opens in a
      new tab. */
  href?: string;
  /** Wider pills carry their label on one line. */
  ctaWidth: number;
  media: "tablet" | "agents";
  /** The agents row puts its card on the right and hangs its copy from the
      top of the row; the platform row centres both. */
  reverse?: boolean;
  /** Band height and the row's offset from its top, on the 1440 artboard. */
  height: number;
  top: number;
};

/* Figma 3817:48405 and 3817:48431 — two 548-wide columns 88 apart, a 556
   high row, the copy in one column and a 420 high blue card in the other. */
const PRODUCTS: Product[] = [
  {
    id: "cooperatives",
    eyebrow: "For cooperatives",
    title: "Cooperative investor platform",
    lead: "A platform developed by Transformix for cooperatives.",
    text: "Cooperatives serve their members, manage assets, and report to boards and stakeholders.",
    audience: "For Saudi cooperatives and their boards",
    cta: "Visit the platform",
    href: PRODUCT_WEBSITES.cooperatives,
    ctaWidth: 245,
    media: "tablet",
    height: 777,
    top: 110,
  },
  {
    id: "ai-agents",
    eyebrow: "AI agents for business",
    title: "Five AI agents to support your work",
    lead: "Intelligent tools that help businesses with analysis, automation, customer service, marketing, and faster decisions.",
    text: "A collection of AI agents designed to help your company respond, qualify leads, follow up, analyze information, and make decisions faster.",
    cta: "Explore our AI agents",
    ctaWidth: 351,
    media: "agents",
    reverse: true,
    height: 744,
    top: 70,
  },
];

const rem = (px: number) => `${px / 10}rem`;

/** Figma 3817:48429 — the platform dashboard on a tablet, cast off the card
    by two drop shadows. */
function TabletMedia() {
  return (
    <div className={`${styles.media} ${styles.tabletCard}`}>
      <div className={styles.tablet}>
        <div className={styles.tabletCrop}>
          <Image
            className={styles.tabletImage}
            src="/images/products/cooperatives-platform.png"
            alt={"Cooperative investor platform dashboard displayed on a tablet"}
            width={1536}
            height={1024}
            sizes="(max-width: 1024px) 100vw, 520px"
          />
        </div>
      </div>
    </div>
  );
}

/** Figma 3817:48433 — the five agents standing in a pair of soft arcs, with
    two rings cut off by the card's top edge. */
function AgentsMedia() {
  return (
    <div className={`${styles.media} ${styles.agentsCard}`}>
      <div className={styles.arcOuter} aria-hidden>
        <span className={`${styles.ring} ${styles.ringA}`} />
        <span className={`${styles.ring} ${styles.ringB}`} />
      </div>
      <div className={styles.arcInner}>
        <Image
          className={styles.agentsImage}
          src="/images/products/ai-agents.png"
          alt={"Five AI agents represented as characters"}
          width={1000}
          height={750}
          sizes="(max-width: 1024px) 80vw, 401px"
        />
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <>
      {PRODUCTS.map((product) => (
        <section
          key={product.id}
          id={product.id}
          className={`${styles.product} ${product.reverse ? styles.reverse : ""}`}
          style={{ "--band-h": rem(product.height), "--row-top": rem(product.top) } as CSSProperties}
        >
          <div className={styles.row}>
            <div className={styles.copy}>
              <Reveal as="p" className={styles.eyebrow}>
                {product.eyebrow}
              </Reveal>
              <Reveal as="h2" className={styles.title} delay={80}>
                {product.title}
              </Reveal>
              <Reveal as="p" className={styles.lead} delay={160}>
                {product.lead}
              </Reveal>
              <Reveal as="p" className={styles.text} delay={220}>
                {product.text}
              </Reveal>
              {product.audience && (
                <Reveal as="dl" className={styles.audience} delay={280}>
                  <dt className={styles.audienceLabel}>{"Who is this platform for?"}</dt>
                  <dd className={styles.audienceValue}>{product.audience}</dd>
                </Reveal>
              )}
              <Reveal
                className={styles.action}
                delay={product.audience ? 340 : 280}
                style={{ "--pill-w": rem(product.ctaWidth) } as CSSProperties}
              >
                <PillButton href={product.href} external={product.href?.startsWith("https://")} className={styles.cta}>
                  {product.cta}
                </PillButton>
              </Reveal>
            </div>

            <Reveal className={styles.mediaSlot} delay={120}>
              {product.media === "tablet" ? <TabletMedia /> : <AgentsMedia />}
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
