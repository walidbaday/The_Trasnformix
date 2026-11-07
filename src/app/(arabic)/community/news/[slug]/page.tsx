import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventCover } from "@/components/community/EventCover";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { COMMUNITY_HREF } from "@/lib/communityNav";
import { COMMUNITY_EVENTS, COMMUNITY_NEWS, getCommunityEvent } from "@/lib/communityNews";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

/* Only the events in lib/communityNews.ts exist; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return COMMUNITY_EVENTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getCommunityEvent((await params).slug);
  return event ? { title: `${event.title} | TX Community`, description: event.lead } : {};
}

function Pin() {
  return <Image src="/icons/community-pin.svg" alt="" width={18} height={18} aria-hidden />;
}

/** Figma 4416:4876 — one event's story: its cover, the workshop in brief,
    the sessions, who came, and the photos. */
export default async function CommunityEventPage({ params }: Props) {
  const event = getCommunityEvent((await params).slug);
  if (!event) notFound();

  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable} ${jakarta.variable}`}>
        <section className={styles.header} aria-labelledby="event-heading">
          <nav className={styles.crumbs} aria-label="مسار التنقل">
            <ol>
              <li>
                <Link href="/">الرئيسية</Link>
              </li>
              <li>
                <Link href={COMMUNITY_HREF}>مجتمع ترانسفورمكس</Link>
              </li>
              <li>
                <Link href={COMMUNITY_NEWS.href}>{COMMUNITY_NEWS.label}</Link>
              </li>
            </ol>
          </nav>
          <div className={styles.titleBlock}>
            <Reveal as="h1" id="event-heading" className={styles.title}>
              {event.title}
            </Reveal>
            <Reveal as="p" className={styles.lead} delay={60}>
              {event.lead}
            </Reveal>
            <Reveal className={styles.meta} delay={120}>
              <div className={styles.metaGroup}>
                <p className={styles.place}>
                  <Pin />
                  {event.place}
                </p>
                <p>{event.date}</p>
              </div>
              <p>{event.published}</p>
            </Reveal>
          </div>
          <Reveal className={styles.cover} delay={160}>
            <EventCover cover={event.cover} size="page" />
          </Reveal>
        </section>

        <section className={styles.overview} aria-labelledby="event-intro-heading">
          <Reveal className={styles.intro}>
            <h2 id="event-intro-heading" className={styles.sectionTitle}>
              {event.intro.title}
            </h2>
            {event.intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal as="aside" className={styles.stats} delay={80} aria-label={event.stats.title}>
            <p className={styles.statsTitle}>{event.stats.title}</p>
            {event.stats.items.map((stat) => (
              <div key={stat.value} className={styles.stat}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </section>

        <section className={styles.sessions} aria-labelledby="event-sessions-heading">
          <Reveal as="h2" id="event-sessions-heading" className={styles.sectionTitle}>
            {event.sessions.title}
          </Reveal>
          <ol className={styles.sessionList}>
            {event.sessions.items.map((session) => (
              <Reveal as="li" key={session.order} className={styles.session}>
                <div className={styles.sessionCopy}>
                  <p className={styles.sessionOrder}>{session.order}</p>
                  <h3 className={styles.sessionTitle}>{session.title}</h3>
                  <p className={styles.text}>{session.text}</p>
                </div>
                <figure className={styles.sessionFigure}>
                  <div
                    className={styles.photo}
                    style={{ height: `${(session.height ?? 260) / 10}rem` }}
                  >
                    <Image
                      className={styles.photoImage}
                      src={session.image}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 384px"
                    />
                  </div>
                  <figcaption className={styles.caption}>{session.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className={styles.community} aria-labelledby="event-community-heading">
          <Reveal className={styles.communityCopy}>
            <h2 id="event-community-heading" className={styles.sectionTitle}>
              {event.community.title}
            </h2>
            {event.community.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </section>

        <section className={styles.gallery} aria-labelledby="event-gallery-heading">
          <Reveal as="h2" id="event-gallery-heading" className={styles.sectionTitle}>
            {event.gallery.title}
          </Reveal>
          <ul className={styles.galleryGrid}>
            {event.gallery.images.map((image, index) => (
              <Reveal as="li" key={image.src} className={styles.galleryItem} delay={index * 60}>
                <Image
                  className={styles.photoImage}
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 262px"
                  style={image.focus ? { objectPosition: image.focus } : undefined}
                />
              </Reveal>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
