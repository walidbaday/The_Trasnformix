import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { SectorButton } from "@/english/components/sections/sectors/SectorButton";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/services/ecommerce/page.module.css";

export const metadata: Metadata = {
  title: "E-commerce & Multi-Vendor Marketplaces | Transformix",
  description:
    "We build online stores and multi-vendor digital marketplaces that bring sales, product management, orders and payments together on one platform.",
};

/* Figma 4354:4763 — two wide cards, then three, in reading order. */
const SERVICES = [
  {
    image: "/images/ecommerce/stores.jpg",
    title: "Online store development",
    text: "Online stores covering product display, category management, the shopping cart, checkout and order tracking.",
  },
  {
    image: "/images/ecommerce/marketplaces.jpg",
    title: "Multi-vendor marketplace platforms",
    text: "Platforms that bring many merchants together, with dashboards to manage stores, products, orders, permissions and commissions to fit the platform's model.",
  },
  {
    image: "/images/ecommerce/orders-payments.jpg",
    title: "Order & payment management",
    text: "Organising the order cycle from purchase to fulfilment, and connecting payment gateways and transaction services.",
  },
  {
    image: "/images/ecommerce/shipping.jpg",
    title: "Shipping & logistics",
    text: "Integrations with shipping and delivery services, order status tracking, and organised packing and handover.",
  },
  {
    image: "/images/ecommerce/integrations.jpg",
    title: "Commerce system integration",
    text: "Connecting the platform to inventory, accounting and ERP systems to cut duplicate data and improve operational tracking.",
  },
];

/* Figma 4354:4764 — the single-brand store, then the marketplace. */
const MODELS = [
  {
    tag: "One company · unified management",
    title: "An online store for your brand",
    text: "Sell your company's products through an experience that carries your identity.",
    points: [
      "Your own product catalogue and categories",
      "Central inventory and order management",
      "A buying and checkout journey that suits your customers",
    ],
  },
  {
    tag: "Many merchants · one platform",
    title: "A marketplace for many sellers",
    text: "Connect customers with a range of merchants in your marketplace.",
    points: [
      "A separate space for each merchant and their products",
      "Permissions and commissions that follow the platform's model",
      "Unified tracking of store performance and orders",
    ],
    dark: true,
  },
];

/* Figma 4354:4765 — 01 sits at the right. */
const STEPS = [
  { title: "We understand your business model", text: "We define your customers, products and operating needs." },
  { title: "We design the buying experience", text: "We map the customer journey and platform management." },
  { title: "We build and connect the systems", text: "We build the solution and test payments, shipping and integrations." },
  { title: "We launch and keep improving", text: "We onboard your team and pursue opportunities to improve and grow." },
];

const pad = (index: number) => String(index + 1).padStart(2, "0");

/** /services/ecommerce (Figma 4354:4739) — e-commerce stores and multi-vendor
    marketplaces. The page's own navbar and footer are the site's. */
export default function EcommercePage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable}`}>
        <section className={styles.hero} aria-labelledby="ecommerce-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              className={styles.heroImage}
              src="/images/ecommerce/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroCopy}>
            <nav aria-label={"Breadcrumb navigation"}>
              <ol className={styles.breadcrumb}>
                <li>
                  <Link href={"/en"}>{"Home"}</Link>
                </li>
                <li>
                  <Link href={"/en/services"}>{"Services"}</Link>
                </li>
                <li aria-current="page">{"E-commerce"}</li>
              </ol>
            </nav>
            <Reveal as="p" className={styles.eyebrow}>
              {" E-commerce & Multi-Vendor Marketplaces "}</Reveal>
            <Reveal as="h1" id="ecommerce-heading" className={styles.heroTitle} delay={60}>
              {" Integrated e-commerce "}<br />
              {" platforms "}</Reveal>
            <Reveal as="p" className={styles.heroText} delay={120}>
              {" We build online stores and multi-vendor digital marketplaces that bring sales, product management, orders and payments together on one platform. "}</Reveal>
            <Reveal className={styles.heroActions} delay={180}>
              <SectorButton href="#services" className={styles.heroButton}>
                {" Explore E-commerce Solutions "}</SectorButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.intro} aria-labelledby="ecommerce-intro-heading">
          <Reveal as="h2" id="ecommerce-intro-heading" className={styles.introTitle}>
            {" Easier shopping. "}<br />
            {" Better-connected operations. "}</Reveal>
          <Reveal as="p" className={styles.introText} delay={80}>
            {" We design each solution around your business model, whether a single company's store or a marketplace of many merchants, with care for the customer experience and easy operations. "}</Reveal>
        </section>

        <section id="services" className={styles.services} aria-labelledby="ecommerce-services-heading">
          <div className={styles.inner}>
            <Reveal as="p" className={styles.label}>
              {" Our services "}</Reveal>
            <Reveal as="h2" id="ecommerce-services-heading" className={styles.title} delay={60}>
              {" Everything your business needs, on one platform "}</Reveal>
            <ul className={styles.serviceGrid}>
              {SERVICES.map((service, index) => (
                <Reveal
                  as="li"
                  key={service.title}
                  className={`${styles.service} ${index < 2 ? styles.serviceWide : ""}`}
                  delay={(index < 2 ? index : index - 2) * 90}
                >
                  <div className={styles.serviceMedia}>
                    <Image
                      className={styles.serviceImage}
                      src={service.image}
                      alt=""
                      fill
                      sizes={index < 2 ? "(max-width: 640px) 100vw, 43vw" : "(max-width: 640px) 100vw, 28vw"}
                    />
                  </div>
                  <div className={styles.serviceBody}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceText}>{service.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.models} aria-labelledby="ecommerce-models-heading">
          <div className={styles.inner}>
            <Reveal as="h2" id="ecommerce-models-heading" className={styles.title}>
              {" Which model fits your business? "}</Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              {" We start from how you work, then build the platform that supports it. "}</Reveal>
            <ul className={styles.modelGrid}>
              {MODELS.map((model, index) => (
                <Reveal
                  as="li"
                  key={model.title}
                  className={`${styles.model} ${model.dark ? styles.modelDark : ""}`}
                  delay={index * 90}
                >
                  <p className={styles.modelTag}>{model.tag}</p>
                  <h3 className={styles.modelTitle}>{model.title}</h3>
                  <p className={styles.modelText}>{model.text}</p>
                  <ul className={styles.modelPoints}>
                    {model.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="ecommerce-process-heading">
          <div className={styles.inner}>
            <Reveal as="h2" id="ecommerce-process-heading" className={styles.title}>
              {" From idea to launch "}</Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              {" Clear steps to build a platform that fits how you operate today and supports your growth tomorrow. "}</Reveal>
            <ol className={styles.steps}>
              {STEPS.map((step, index) => (
                <Reveal as="li" key={step.title} className={styles.step} delay={index * 90}>
                  <span className={styles.stepNumber} aria-hidden="true">{pad(index)}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="ecommerce-cta-heading">
          <Reveal className={styles.ctaCard}>
            <div className={styles.ctaCopy}>
              <h2 id="ecommerce-cta-heading" className={styles.ctaTitle}>
                {" Solutions that fit your business model "}</h2>
              <p className={styles.ctaText}>
                {" Whether you're launching a new store or building a multi-vendor marketplace, we develop the platform around your operating and growth needs. "}</p>
            </div>
            <SectorButton tone="light" className={styles.ctaButton}>
              {" Explore E-commerce Solutions "}</SectorButton>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
