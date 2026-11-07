import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { PillButton } from "@/english/components/ui/PillButton";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/ventures/page.module.css";

export const metadata: Metadata = {
  title: "Venture Builder | Transformix",
  description:
    "Transformix Ventures systematically builds and grows technology startups by combining engineering discipline with entrepreneurial speed.",
};

/* Figma 4036:5170 — the three blue cards, in reading order. */
const PILLARS = [
  {
    icon: "/icons/ventures/idea.svg",
    title: "Ideate",
    text: "Validate ideas through market research and strategic planning",
  },
  {
    icon: "/icons/ventures/build.svg",
    title: "Build",
    text: "Develop an MVP with rapid iteration and continuous feedback",
  },
  {
    icon: "/icons/ventures/scale.svg",
    title: "Scale",
    text: "Optimize growth with data-driven strategies and resources",
  },
];

/* Figma 4037:5471, 4037:5493 — the two white cards beside the photo. */
const TRACKS = [
  {
    badge: "From zero to launch",
    title: "Venture building",
    text: "Build companies from scratch based on validated opportunities. We handle everything from idea to market launch.",
  },
  {
    badge: "Funding and mentorship",
    title: "Strategic investment",
    text: "Invest in early-stage startups with strong founders and proven traction, while providing strategic guidance and resources.",
  },
];

/* Figma 4036:4921 — 01 sits at the right. */
const STEPS = [
  {
    icon: "/icons/ventures/idea.svg",
    title: "Discovery and validation",
    text: "Market research, founder alignment, and problem-solution fit validated through rapid prototyping.",
  },
  {
    icon: "/icons/ventures/step-build.svg",
    title: "Build and test",
    text: "Agile development, MVP launch, user feedback loops, and iterative product improvement.",
  },
  {
    icon: "/icons/ventures/step-market.svg",
    title: "Go to market",
    text: "Strategic positioning, early customer acquisition, distribution channels, and early traction.",
  },
  {
    icon: "/icons/ventures/growth.svg",
    title: "Scale and optimize",
    text: "Growth systems, operational excellence, fundraising preparation, and performance optimization.",
  },
];

/* Figma 4037:5246 — a 2 x 2 grid read right to left, row by row. */
const VALUES = [
  {
    icon: "/icons/ventures/risk.svg",
    title: "Risk reduction",
    text: "Reduce failure risk through systematic validation, data-driven decisions, and continuous iteration.",
  },
  {
    icon: "/icons/ventures/speed.svg",
    title: "Speed to market",
    text: "Launch faster with our proven frameworks, ready infrastructure, and dedicated team.",
  },
  {
    icon: "/icons/ventures/network.svg",
    title: "Network and resources",
    text: "Access our broad network of mentors, investors, partners, and industry experts.",
  },
  {
    icon: "/icons/ventures/growth.svg",
    title: "Scalable growth",
    text: "Build on solid foundations with scalable infrastructure, optimized operations, and growth systems.",
  },
];

/** Figma 4036:5109 — the venture builder page. */
export default function VenturesPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable}`}>
        <section className={styles.hero} aria-labelledby="ventures-heading">
          <div className={styles.heroCopy}>
            <h1 id="ventures-heading" className={styles.heroTitle}>
              {" Transformix, where startups are designed "}</h1>
            <p className={styles.heroText}>
              {" Transformix Ventures systematically builds and grows technology startups by combining engineering discipline with entrepreneurial speed. "}</p>
            <div className={styles.heroActions}>
              <PillButton className={styles.apply}>{"Apply now"}</PillButton>
              <PillButton variant="outline" href={"/en/contact"} className={styles.contact}>
                {" Contact us "}</PillButton>
            </div>
          </div>
          <Image
            className={styles.heroArt}
            src="/images/ventures/hero.png"
            alt=""
            width={1536}
            height={1024}
            sizes="(max-width: 1024px) 100vw, 40vw"
            preload
          />
        </section>

        <section className={styles.pillarsSection} aria-labelledby="ventures-pillars-heading">
          <div className={styles.intro}>
            <Reveal as="h2" id="ventures-pillars-heading" className={styles.title}>
              {" Built for founders, backed by systems "}</Reveal>
            <Reveal as="p" className={styles.lead} delay={80}>
              {" We systematically ideate, build, and scale startups by combining engineering discipline with entrepreneurial speed. "}</Reveal>
          </div>
          <ul className={styles.pillars}>
            {PILLARS.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} className={styles.pillar} delay={index * 80}>
                <span className={styles.pillarIcon}>
                  <Image src={pillar.icon} alt="" width={28} height={28} />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.paths} aria-labelledby="ventures-paths-heading">
          <div className={styles.pathsInner}>
            <div className={styles.intro}>
              <Reveal as="h2" id="ventures-paths-heading" className={styles.title}>
                {" Choose the right path for your company "}</Reveal>
              <Reveal as="p" className={styles.lead} delay={80}>
                {" Flexible engagement models designed for maximum impact "}</Reveal>
            </div>
            <div className={styles.pathGrid}>
              <Reveal as="article" className={styles.featured}>
                <Image
                  className={styles.featuredImage}
                  src="/images/ventures/co-founding.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className={styles.featuredCopy}>
                  <h3>{"Co-founding model"}</h3>
                  <p>
                    {" Partner with exceptional founders from day one. We become your co-founder, bringing not just capital but deep operational involvement across product, technology, marketing, and operations. "}</p>
                </div>
              </Reveal>
              {TRACKS.map((track, index) => (
                <Reveal as="article" key={track.title} className={styles.track} delay={(index + 1) * 80}>
                  <span className={styles.badge}>{track.badge}</span>
                  <h3>{track.title}</h3>
                  <p>{track.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.steps} aria-labelledby="ventures-steps-heading">
          <div className={styles.intro}>
            <Reveal as="h2" id="ventures-steps-heading" className={styles.title}>
              {" How we build ventures "}</Reveal>
            <Reveal as="p" className={styles.lead} delay={80}>
              {" A systematic approach from idea to scale "}</Reveal>
          </div>
          <ol className={styles.stepGrid}>
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} className={styles.step} delay={index * 80}>
                <span className={styles.stepIcon}>
                  <Image src={step.icon} alt="" width={28} height={28} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className={styles.stepNumber} dir="ltr" aria-hidden="true">0{index + 1}</span>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className={styles.values} aria-labelledby="ventures-values-heading">
          <div className={styles.intro}>
            <Reveal as="h2" id="ventures-values-heading" className={styles.title}>
              {" Our value goes beyond building "}</Reveal>
            <Reveal as="p" className={styles.lead} delay={80}>
              {" We combine engineering excellence with entrepreneurial agility to build ventures that last. "}</Reveal>
          </div>
          <ul className={styles.valueGrid}>
            {VALUES.map((value, index) => (
              <Reveal as="li" key={value.title} className={styles.value} delay={index * 80}>
                <span className={styles.valueIcon}>
                  <Image src={value.icon} alt="" width={28} height={28} />
                </span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.cta} aria-labelledby="ventures-cta-heading">
          <Image
            className={styles.ctaLines}
            src="/icons/ventures/cta-lines.svg"
            alt=""
            width={1940}
            height={638}
            aria-hidden
          />
          <Reveal className={styles.ctaCopy}>
            <h2 id="ventures-cta-heading">{"Ready to build your venture?"}</h2>
            <p>
              {" Whether you're a founder with an idea or an entrepreneur ready to scale, let's explore how the Transformix venture builder can help you succeed. "}</p>
            <PillButton variant="outline" className={styles.ctaButton}>
              {" Apply now "}<Image className={styles.ctaArrow} src="/icons/ventures/cta-arrow.svg" alt="" width={20} height={20} />
            </PillButton>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
