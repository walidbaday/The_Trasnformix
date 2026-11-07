import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EventCover } from "@/english/components/community/EventCover";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { COMMUNITY_EVENTS, COMMUNITY_NEWS, communityEventHref } from "@/english/lib/communityNews";
import styles from "@/app/(english)/en/community/news/page.module.css";

export const metadata: Metadata = {
  title: `${COMMUNITY_NEWS.label} | TX Community`,
  description: "TX Community events and news: the workshops and meetups Transformix organizes with the business and technology community.",
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
              {" What can we build together? "}</Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              {" We work with companies, institutions and technology partners to develop digital solutions and deliver projects in AI and data, enterprise systems, software engineering, and digital products and services. Start with the collaboration path closest to your goal. "}</Reveal>
            <Reveal className={styles.heroActions} delay={160}>
              <Link href={"/en/contact#request"} className={`${styles.button} ${styles.buttonLight}`}>
                {" Discuss your project "}</Link>
              <Link href={"/en/contact#ways"} className={`${styles.button} ${styles.buttonGhost}`}>
                {" Explore partnership opportunities "}</Link>
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
                      {" Read the full story "}</Link>
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
