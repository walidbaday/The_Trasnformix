import Image from "next/image";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import { tajawal } from "@/lib/fonts";
import styles from "@/english/components/sections/Hero.module.css";

/* Headline, lead and the two calls to action, layered over the full-screen
   hero artwork on the reading-start side. Hero.module.css mirrors the artwork
   in Arabic so its logo faces the copy from the other side.

   The hero then stays pinned while the full-screen showreel scrolls up over
   it like a curtain, and the page carries on once the reel has covered it. */
export function Hero() {
  return (
    <section className={`${styles.hero} ${tajawal.variable}`}>
      <div className={styles.stage}>
        <div className={styles.media}>
          <Image
            src="/images/hero/hero.png"
            alt=""
            fill
            preload
            sizes="100vw"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.copy}>
            <Reveal as="h1" className={styles.title}>
              {" Creating New Business Opportunities Through Technology & Innovation "}</Reveal>
            <Reveal className={styles.lead} delay={120}>
              <p className={styles.subtitle}>
                {" We help businesses grow, strengthen their competitiveness and reinvent their operating and business models by putting AI and advanced digital technology to work. "}</p>
              <p className={styles.text}>
                {" Transformix brings together its expertise in AI, data science, software engineering and digital commerce to develop technology solutions, platforms and products, backed by research and development and strategic partnerships, and guided by Technology 5.0 principles. "}</p>
            </Reveal>
          </div>
          <Reveal className={styles.actions} delay={240}>
            {/* Down to the services and products further along this page. */}
            <PillButton className={styles.primaryAction} href="#services" variant="inverse">
              {" Explore Our Solutions "}</PillButton>
            {/* Opens the six ways to work with us, each leading to its form. */}
            <PillButton className={styles.secondaryAction} variant="ghost" opens="partnerships">
              {" Discuss a Partnership "}</PillButton>
          </Reveal>
        </div>
      </div>

      {/* Muted and inline so it may autoplay; the reel's black shows through
          until the first frame decodes. */}
      <div className={styles.reel}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-label={"Transformix showreel"}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
