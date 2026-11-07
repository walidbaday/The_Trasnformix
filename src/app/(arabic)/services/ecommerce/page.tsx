import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { SectorButton } from "@/components/sections/sectors/SectorButton";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "التجارة الإلكترونية والأسواق متعددة البائعين | Transformix",
  description:
    "نطوّر متاجر إلكترونية وأسواقًا رقمية متعددة البائعين، تجمع عمليات البيع وإدارة المنتجات والطلبات والمدفوعات في منصة واحدة.",
};

/* Figma 4354:4763 — two wide cards, then three, in reading order. */
const SERVICES = [
  {
    image: "/images/ecommerce/stores.jpg",
    title: "تطوير المتاجر الإلكترونية",
    text: "إنشاء متاجر إلكترونية تشمل عرض المنتجات، وإدارة التصنيفات، وسلة الشراء، والدفع، ومتابعة الطلبات.",
  },
  {
    image: "/images/ecommerce/marketplaces.jpg",
    title: "منصات الأسواق متعددة البائعين",
    text: "تطوير منصات تجمع عدة تجار، مع لوحات تحكم لإدارة المتاجر والمنتجات والطلبات والصلاحيات والعمولات وفق نموذج المنصة.",
  },
  {
    image: "/images/ecommerce/orders-payments.jpg",
    title: "إدارة الطلبات والمدفوعات",
    text: "تنظيم دورة الطلب من الشراء حتى التنفيذ، وربط بوابات الدفع والخدمات المرتبطة بالمعاملات.",
  },
  {
    image: "/images/ecommerce/shipping.jpg",
    title: "الشحن والخدمات اللوجستية",
    text: "تكاملات مع خدمات الشحن والتوصيل، ومتابعة حالات الطلبات، وتنظيم إجراءات التجهيز والتسليم.",
  },
  {
    image: "/images/ecommerce/integrations.jpg",
    title: "تكامل الأنظمة التجارية",
    text: "ربط المنصة بأنظمة المخزون والمحاسبة وتخطيط موارد المؤسسات (ERP) لتقليل تكرار البيانات وتحسين متابعة العمليات.",
  },
];

/* Figma 4354:4764 — the single-brand store, then the marketplace. */
const MODELS = [
  {
    tag: "شركة واحدة · إدارة موحّدة",
    title: "متجر إلكتروني لعلامتك",
    text: "لبيع منتجات شركتك عبر تجربة تحمل هويتك.",
    points: [
      "كتالوج منتجات وتصنيفات خاص بك",
      "إدارة مركزية للمخزون والطلبات",
      "رحلة شراء ودفع تناسب عملاءك",
    ],
  },
  {
    tag: "تجار متعددون · منصة واحدة",
    title: "سوق يجمع عدة بائعين",
    text: "لربط العملاء بتجار متنوعين ضمن سوقك.",
    points: [
      "مساحة مستقلة لكل تاجر ومنتجاته",
      "صلاحيات وعمولات وفق نموذج المنصة",
      "متابعة موحّدة لأداء المتاجر والطلبات",
    ],
    dark: true,
  },
];

/* Figma 4354:4765 — 01 sits at the right. */
const STEPS = [
  { title: "نفهم نموذج تجارتك", text: "نحدد العملاء والمنتجات واحتياجات التشغيل." },
  { title: "نصمم تجربة الشراء", text: "نرتّب رحلة العميل وإدارة المنصة." },
  { title: "نطوّر ونربط الأنظمة", text: "نبني الحل ونختبر الدفع والشحن والتكاملات." },
  { title: "نطلق ونتابع التطوير", text: "نهيئ فريقك ونتابع فرص التحسين والتوسع." },
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
            <nav aria-label="مسار التنقل">
              <ol className={styles.breadcrumb}>
                <li>
                  <Link href="/">الرئيسية</Link>
                </li>
                <li>
                  <Link href="/services">الخدمات</Link>
                </li>
                <li aria-current="page">التجارة الإلكترونية</li>
              </ol>
            </nav>
            <Reveal as="p" className={styles.eyebrow}>
              التجارة الإلكترونية والأسواق متعددة البائعين
            </Reveal>
            <Reveal as="h1" id="ecommerce-heading" className={styles.heroTitle} delay={60}>
              منصات تجارة إلكترونية
              <br />
              متكاملة
            </Reveal>
            <Reveal as="p" className={styles.heroText} delay={120}>
              نطوّر متاجر إلكترونية وأسواقًا رقمية متعددة البائعين، تجمع عمليات البيع وإدارة
              المنتجات والطلبات والمدفوعات في منصة واحدة.
            </Reveal>
            <Reveal className={styles.heroActions} delay={180}>
              <SectorButton href="#services" className={styles.heroButton}>
                استكشف حلول التجارة الإلكترونية
              </SectorButton>
            </Reveal>
          </div>
        </section>

        <section className={styles.intro} aria-labelledby="ecommerce-intro-heading">
          <Reveal as="h2" id="ecommerce-intro-heading" className={styles.introTitle}>
            تجربة تسوّق أسهل.
            <br />
            عمليات أكثر ترابطًا.
          </Reveal>
          <Reveal as="p" className={styles.introText} delay={80}>
            نصمم الحلول وفق نموذج العمل، سواء لمتجر تابع لشركة واحدة أو سوق يضم عددًا من
            التجار، مع الاهتمام بتجربة العملاء وسهولة إدارة العمليات.
          </Reveal>
        </section>

        <section id="services" className={styles.services} aria-labelledby="ecommerce-services-heading">
          <div className={styles.inner}>
            <Reveal as="p" className={styles.label}>
              خدماتنا
            </Reveal>
            <Reveal as="h2" id="ecommerce-services-heading" className={styles.title} delay={60}>
              كل ما تحتاجه تجارتك، في منصة واحدة
            </Reveal>
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
              أي نموذج يناسب تجارتك؟
            </Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              نبدأ من طريقة عملك، ثم نبني المنصة التي تدعمها.
            </Reveal>
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
              من الفكرة إلى الإطلاق
            </Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              خطوات واضحة لبناء منصة تناسب تشغيلك اليوم، وتدعم نموك غدًا.
            </Reveal>
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
                حلول تناسب نموذج تجارتك
              </h2>
              <p className={styles.ctaText}>
                سواء كنت تطلق متجرًا جديدًا أو تبني سوقًا متعدد البائعين، نطوّر المنصة وفق
                احتياجات التشغيل والتوسع.
              </p>
            </div>
            <SectorButton tone="light" className={styles.ctaButton}>
              استكشف حلول التجارة الإلكترونية
            </SectorButton>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
