import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { ALL_SERVICES, SERVICES_INTRO } from "@/lib/serviceNavigation";
import { SERVICES_OVERVIEW } from "@/lib/servicesOverview";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "جميع الخدمات | Transformix",
  description: SERVICES_INTRO.lead,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main}`}>
        <PageHero
          title={SERVICES_INTRO.title}
          text={SERVICES_INTRO.lead}
          cta="اطلب استشارة مجانية"
          height={552}
          textHeight={117}
          tuck={117}
          lines={{
            left: { src: "/icons/about-hero-lines-left.svg", width: 516, height: 335, top: 0 },
            right: { src: "/icons/about-hero-lines-right.svg", width: 495, height: 396, top: 156 },
          }}
        />

        <section className={styles.wrap} aria-labelledby="services-heading">
          <Reveal as="h2" id="services-heading" className={styles.heading}>جميع الخدمات</Reveal>
          <ul className={styles.directory}>
            {ALL_SERVICES.map((service, index) => (
              <li key={service.key}>
                <Reveal as="a" href={service.website} target="_blank" rel="noopener noreferrer"
                  className={styles.serviceCard} delay={index * 80}
                  aria-label={`${service.label} (يفتح في علامة تبويب جديدة)`}>
                  <span className={styles.number} dir="ltr">0{index + 1}</span>
                  <h3>{service.label}</h3>
                  <p>{service.text}</p>
                  <span className={styles.siteLink}>زيارة الموقع <span aria-hidden="true">↖</span></span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.guidance} aria-labelledby="services-challenges-heading">
          <div className={styles.wrap}>
            <Reveal as="p" className={styles.eyebrow}>{SERVICES_OVERVIEW.challenges.eyebrow}</Reveal>
            <Reveal as="h2" id="services-challenges-heading" className={styles.heading}>
              {SERVICES_OVERVIEW.challenges.title}
            </Reveal>
            <div className={styles.challengeGrid}>
              {SERVICES_OVERVIEW.challenges.items.map((item, index) => (
                <Reveal as="article" key={item.title} className={styles.challengeCard} delay={index * 80}>
                  <Image src={item.icon} alt="" width={36} height={36} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.wrap} aria-labelledby="services-process-heading">
          <Reveal as="p" className={styles.eyebrow}>كيف نعمل معك؟</Reveal>
          <Reveal as="h2" id="services-process-heading" className={styles.heading}>من فهم التحدي إلى خطة واضحة</Reveal>
          <ol className={styles.steps}>
            {SERVICES_OVERVIEW.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 80}>
                <span className={styles.stepNumber} dir="ltr">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className={`${styles.wrap} ${styles.faq}`} aria-labelledby="services-faq-heading">
          <Reveal as="h2" id="services-faq-heading" className={styles.heading}>الأسئلة الشائعة</Reveal>
          {SERVICES_OVERVIEW.faqs.map(item => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        <section className={`${styles.wrap} ${styles.cta}`} aria-labelledby="services-cta-heading">
          <Reveal as="h2" id="services-cta-heading">{SERVICES_OVERVIEW.cta.title}</Reveal>
          <Reveal as="p">{SERVICES_OVERVIEW.cta.text}</Reveal>
          <PillButton variant="inverse">اطلب استشارة مجانية</PillButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
