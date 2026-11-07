import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EventCover } from "@/components/community/EventCover";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { COMMUNITY_EVENTS, COMMUNITY_NEWS, communityEventHref } from "@/lib/communityNews";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `${COMMUNITY_NEWS.label} | TX Community`,
  description: "فعاليات TX Community وأخبارها: ورش العمل واللقاءات التي تنظمها ترانسفورمكس مع مجتمع الأعمال والتقنية.",
};

/** Figma 4445:14080 — TX Community's events and news: the hero the artboard
    draws, then a card per event leading to its page. */
export default function CommunityNewsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable} ${jakarta.variable}`}>
        <section className={styles.hero} aria-labelledby="news-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <div className={styles.heroPhoto}>
              <Image
                className={styles.heroImage}
                src="/images/contact/partnerships-hero.jpg"
                alt=""
                fill
                preload
                sizes="(max-width: 900px) 100vw, 67vw"
              />
            </div>
          </div>
          <div className={styles.heroCopy}>
            <Reveal as="h1" id="news-heading" className={styles.heroTitle}>
              ما الذي يمكن أن نبنيه معًا؟
            </Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              نعمل مع الشركات والمؤسسات والشركاء التقنيين على تطوير الحلول الرقمية وتنفيذ مشروعات
              الذكاء الاصطناعي والبيانات وأنظمة المؤسسات وهندسة البرمجيات وتطوير المنتجات والخدمات
              الرقمية. ابدأ بمسار التعاون الأقرب إلى هدفك.
            </Reveal>
            <Reveal className={styles.heroActions} delay={160}>
              <Link href="/contact#request" className={`${styles.button} ${styles.buttonLight}`}>
                ناقش مشروعك
              </Link>
              <Link href="/contact#ways" className={`${styles.button} ${styles.buttonGhost}`}>
                استكشف فرص الشراكة
              </Link>
            </Reveal>
          </div>
        </section>

        <section className={styles.events} aria-label={COMMUNITY_NEWS.label}>
          <ul className={styles.list}>
            {COMMUNITY_EVENTS.map((event) => {
              const href = communityEventHref(event.slug);
              return (
                <Reveal as="li" key={event.slug} className={styles.card}>
                  <article className={styles.cardBody} aria-labelledby={`event-${event.slug}`}>
                    <h2 id={`event-${event.slug}`} className={styles.cardTitle}>
                      <Link href={href}>{event.title}</Link>
                    </h2>
                    <p className={styles.place}>
                      <Image src="/icons/community-pin.svg" alt="" width={18} height={18} aria-hidden />
                      {event.place}
                    </p>
                    <p className={styles.summary}>{event.summary}</p>
                    <hr className={styles.rule} />
                    <p className={styles.meta}>{event.date}</p>
                    <Link href={href} className={styles.cardButton}>
                      اقرأ تفاصيل الخبر
                    </Link>
                  </article>
                  <Link href={href} className={styles.cardCover} tabIndex={-1} aria-hidden="true">
                    <EventCover cover={event.cover} size="card" />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
