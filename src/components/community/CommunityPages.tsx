import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { inter, tajawal } from "@/lib/fonts";
import {
  COMMUNITY_ACTIVITIES,
  COMMUNITY_HOME,
  COMMUNITY_JOIN,
  COMMUNITY_PAGES,
  type CommunityBanner,
  type CommunityPage,
} from "@/lib/community";
import styles from "./CommunityPages.module.css";

const pad = (index: number) => String(index + 1).padStart(2, "0");

/* The TX Community pages share the careers page's look: the /contact hero
   with its two circuit patterns, 16px-radius cards and a pale form band. */
function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable} ${inter.variable}`}>{children}</main>
      <Footer />
    </>
  );
}

function Hero({ id, eyebrow, title, crumb, children }: {
  id: string;
  eyebrow: string;
  title: string;
  /** The page's name in the breadcrumb under the hub. */
  crumb?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.hero} aria-labelledby={id}>
      <Image
        className={`${styles.pattern} ${styles.patternLeft}`}
        src="/images/contact/pattern-left.png"
        alt=""
        width={549}
        height={309}
        preload
        aria-hidden
      />
      <Image
        className={`${styles.pattern} ${styles.patternRight}`}
        src="/images/contact/pattern-right.png"
        alt=""
        width={436}
        height={228}
        aria-hidden
      />
      <div className={styles.heroCopy}>
        {crumb && (
          <nav className={styles.crumbs} aria-label="مسار التنقل">
            <ol>
              <li>
                <Link href={COMMUNITY_HOME.href}>{COMMUNITY_HOME.en}</Link>
              </li>
              <li aria-current="page">{crumb}</li>
            </ol>
          </nav>
        )}
        <Reveal as="p" className={`${styles.eyebrow} ${styles.en}`} lang="en" dir="ltr">
          {eyebrow}
        </Reveal>
        <Reveal as="h1" id={id} className={styles.heroTitle} delay={60}>
          {title}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** Figma 4378:3200 — the photo banner an activity page opens with: the
    headline and its lead on the dark end of a blue shade, and one call that
    drops to the page's form. */
function BannerHero({ page, banner }: { page: CommunityPage; banner: CommunityBanner }) {
  const id = `community-${page.slug}-heading`;
  return (
    <section className={styles.banner} aria-labelledby={id}>
      <div className={styles.bannerMedia} aria-hidden="true">
        <Image
          className={styles.bannerImage}
          src={banner.image}
          alt=""
          fill
          preload
          sizes="100vw"
          style={banner.focus ? { objectPosition: banner.focus } : undefined}
        />
      </div>
      <div className={styles.bannerCopy}>
        <Reveal as="h1" id={id} className={banner.wide ? `${styles.bannerTitle} ${styles.bannerTitleWide}` : styles.bannerTitle}>
          {page.title}
        </Reveal>
        <Reveal as="p" className={styles.bannerText} delay={80}>
          {banner.lead}
        </Reveal>
        <Reveal delay={160}>
          <a href="#join" className={styles.bannerButton}>
            انضم إلينا الان
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** The pale band that closes each page: the call on a gradient panel, the
    sheet's review note, and the form preset to the page. */
function FormBand({ page }: { page: CommunityPage }) {
  const headingId = `community-${page.slug}-form`;
  return (
    <section id="join" className={styles.formBand} aria-labelledby={headingId}>
      <div className={styles.split}>
        <Reveal className={styles.formIntro}>
          <span className={`${styles.formEn} ${styles.en}`} lang="en" dir="ltr">
            {page.en}
          </span>
          <h2 id={headingId} className={styles.formTitle}>
            {page.formTitle ?? page.cta}
          </h2>
          <p className={styles.formText}>
            شاركنا تفاصيل اهتمامك أو اقتراحك، وسيراجع فريق TX Community طلبك ويتواصل معك عند
            توفر فرصة مناسبة.
          </p>
          <span className={styles.divider} aria-hidden />
          <p className={styles.formNote}>{COMMUNITY_JOIN.paragraphs[1]}</p>
        </Reveal>
        <Reveal className={styles.formSlot} delay={120}>
          <ApplicationForm form={page.form} labelledBy={headingId} initial={page.initial} />
        </Reveal>
      </div>
    </section>
  );
}

/** /community — the hub: what TX Community is, a card per activity, and the
    invitation to join. */
export function CommunityHome() {
  return (
    <Shell>
      <Hero id="community-heading" eyebrow={COMMUNITY_HOME.en} title={COMMUNITY_HOME.title}>
        <Reveal className={styles.heroText} delay={120}>
          {COMMUNITY_HOME.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal className={styles.heroActions} delay={180}>
          <PillButton href="#activities" className={styles.primary}>
            {COMMUNITY_HOME.explore}
          </PillButton>
          <PillButton variant="outline" href={COMMUNITY_JOIN.href} className={styles.secondary}>
            {COMMUNITY_HOME.join}
          </PillButton>
        </Reveal>
      </Hero>

      <section id="activities" className={styles.activities} aria-labelledby="community-activities-heading">
        <Reveal as="h2" id="community-activities-heading" className={styles.title}>
          {COMMUNITY_HOME.activitiesTitle}
        </Reveal>
        <ul className={styles.cards}>
          {COMMUNITY_ACTIVITIES.map((activity, index) => (
            <Reveal as="li" key={activity.slug} className={styles.card} delay={(index % 3) * 80}>
              <span className={styles.cardNumber} dir="ltr" aria-hidden="true">{pad(index)}</span>
              <h3 className={styles.cardTitle}>
                <Link href={activity.href}>{activity.label}</Link>
              </h3>
              <span className={`${styles.cardEn} ${styles.en}`} lang="en" dir="ltr">{activity.en}</span>
              {/* A page whose headline is just its name says what it is instead. */}
              <p className={styles.cardText}>
                {activity.title !== activity.label ? activity.title : activity.description}
              </p>
              <div className={styles.cardLinks}>
                <Link href={activity.href} className={styles.cardExplore} aria-label={`استكشف ${activity.label}`}>
                  استكشف
                </Link>
                <Link href={`${activity.href}#join`} className={styles.cardCta}>
                  {activity.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.joinBand} aria-labelledby="community-join-heading">
        <Reveal className={styles.joinPanel}>
          <span className={`${styles.formEn} ${styles.en}`} lang="en" dir="ltr">{COMMUNITY_JOIN.en}</span>
          <h2 id="community-join-heading" className={styles.joinTitle}>{COMMUNITY_JOIN.title}</h2>
          <p className={styles.joinText}>{COMMUNITY_JOIN.paragraphs[0]}</p>
          <div className={styles.joinActions}>
            <PillButton variant="inverse" href={`${COMMUNITY_JOIN.href}#join`}>
              {COMMUNITY_JOIN.cta}
            </PillButton>
            {COMMUNITY_JOIN.secondary && (
              <PillButton variant="ghost" href={COMMUNITY_JOIN.secondary.href}>
                {COMMUNITY_JOIN.secondary.label}
              </PillButton>
            )}
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}

/** /community/[slug] — one activity: its headline, the sheet's text, and the
    form preset to it, then the way on to the other activities. */
export function CommunityActivityPage({ page }: { page: CommunityPage }) {
  const others = COMMUNITY_PAGES.filter(({ slug }) => slug !== page.slug);
  const secondary = page.secondary ?? { label: "كل أنشطة المجتمع", href: COMMUNITY_HOME.href };

  return (
    <Shell>
      {page.banner ? (
        <BannerHero page={page} banner={page.banner} />
      ) : (
        <Hero id={`community-${page.slug}-heading`} eyebrow={page.en} title={page.title} crumb={page.label}>
          <Reveal className={styles.heroActions} delay={120}>
            <PillButton href="#join" className={styles.primary}>
              {page.cta}
            </PillButton>
            <PillButton variant="outline" href={secondary.href} className={styles.secondary}>
              {secondary.label}
            </PillButton>
          </Reveal>
        </Hero>
      )}

      <section className={styles.about} aria-labelledby={`community-${page.slug}-about`}>
        <Reveal className={styles.aboutHead}>
          <h2 id={`community-${page.slug}-about`} className={styles.aboutTitle}>{page.label}</h2>
          <span className={`${styles.cardEn} ${styles.en}`} lang="en" dir="ltr">{page.en}</span>
        </Reveal>
        <Reveal className={styles.prose} delay={80}>
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </section>

      {page.topics && (
        <section className={styles.topics} aria-labelledby={`community-${page.slug}-topics`}>
          <Reveal as="h2" id={`community-${page.slug}-topics`} className={styles.title}>
            {page.topics.title}
          </Reveal>
          <ul className={styles.topicGrid}>
            {page.topics.items.map((item, index) => (
              <Reveal as="li" key={item.audience} className={styles.topic} delay={(index % 3) * 80}>
                <h3 className={styles.topicAudience}>{item.audience}</h3>
                <p className={styles.topicText}>{item.topics}</p>
              </Reveal>
            ))}
          </ul>
          {page.note && (
            <Reveal as="aside" className={styles.note}>
              <p className={styles.noteTitle}>{page.note.title}</p>
              <p>{page.note.text}</p>
            </Reveal>
          )}
        </section>
      )}

      <FormBand page={page} />

      <section className={styles.more} aria-labelledby={`community-${page.slug}-more`}>
        <Reveal as="h2" id={`community-${page.slug}-more`} className={styles.moreTitle}>
          أنشطة أخرى في TX Community
        </Reveal>
        <ul className={styles.moreGrid}>
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={other.href} className={styles.moreLink}>
                <span className={styles.moreLabel}>{other.label}</span>
                <span className={`${styles.moreEn} ${styles.en}`} lang="en" dir="ltr">{other.en}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
