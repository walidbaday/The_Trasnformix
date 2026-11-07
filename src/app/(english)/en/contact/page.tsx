import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RequestForm, RequestLink } from "@/english/components/contact/ContactRequest";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { getPartnershipPath, type PartnershipPathId } from "@/english/lib/partnerships";
import styles from "@/app/(english)/en/contact/page.module.css";

export const metadata: Metadata = {
  title: "Contact Us | Transformix",
  description:
    "We work with companies, institutions and technology partners to develop digital solutions and deliver projects in AI and data, enterprise systems, software engineering, and digital products and services. Start with the collaboration path closest to your goal.",
};

/** The request form's id, which every call on the page drops to. */
const FORM_ID = "request";
const FORM_HREF = `#${FORM_ID}`;

/* Figma 4431:12151 — the six ways of working together, in reading order
   (right column first). Each card's call picks its own request type in the
   form below. */
const WAYS: readonly { type: PartnershipPathId; title: string; text: string }[] = [
  {
    type: "business",
    title: "Do you need a new technology solution or modernized systems?",
    text: "We help companies build new solutions, modernize their systems and access specialized services in AI, intelligent agents and data, ERP and CRM systems, e-commerce, mobile apps, enterprise platforms, and digital and administrative transformation.",
  },
  {
    type: "technology",
    title: "Looking for a technology or strategic partner?",
    text: "We work with technology companies, solution and platform providers, consulting firms and delivery partners to build joint offerings, share expertise, integrate solutions and deliver projects across markets.",
  },
  {
    type: "regional",
    title: "Want to grow a joint business in your region?",
    text: "We welcome companies with a commercial presence or sector knowledge in local and regional markets to collaborate on sales, distribution channels, delivery, business development and expansion into new markets.",
  },
  {
    type: "outsourcing",
    title: "Does your team need expertise or ongoing operations?",
    text: "We provide expertise in software, AI, data and enterprise systems, along with support for e-commerce, bookings, accounting and business operations. Choose specialists, a dedicated team, project delivery or a managed service to suit your needs.",
  },
  {
    type: "academic",
    title: "Do you represent a university or an educational or professional institution?",
    text: "We work with universities, innovation centers and professional institutions on applied technology activities, training, student projects and mentoring, through Transformix Academy, TX Community, lectures, workshops and graduation projects.",
  },
  {
    type: "ventures",
    title: "Do you have a digital product or a startup venture?",
    text: "We support startups, product owners and specialist teams in developing products, prototypes and MVPs. Collaboration may include specialized technical services, joint development or selected project partnerships under a separate agreement.",
  },
];

/* Figma 4431:12357 — the requests the form doesn't take, which lead into
   TX Community. Sponsorship goes to its community-impact page, where
   initiatives are proposed. */
const OTHER_WAYS = [
  {
    title: "Looking for technical sponsorship for your initiative?",
    text: "Non-profit organizations and initiatives can apply for selective technical support, depending on the nature of the initiative and its opportunities for impact and collaboration.",
    cta: "Apply for sponsorship",
    href: "/en/community/impact#join",
  },
  {
    title: "Want to join the community?",
    text: "Take part in activities or explore collaborating as a community partner, representative or ambassador within TX Community.",
    cta: "Go to TX Community",
    href: "/en/community",
  },
] as const;

/* Figma 4431:12338 — the three offices, right to left. */
const OFFICES = [
  { country: "Saudi Arabia", address: "Al-Yaqeen, Al-Khalidiyah District, Jeddah" },
  {
    country: "United Arab Emirates",
    address: "SPC Free Zone, E311, Sheikh Mohammed Bin Zayed Road, Al Zahia, Sharjah",
  },
  { country: "Egypt", address: "Abdel Aziz Fahmy Street, Alexandria" },
] as const;

const pad = (index: number) => String(index + 1).padStart(2, "0");

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      ←
    </span>
  );
}

/** Figma 4431:12108 — التواصل والشراكات: what we can build together, the
    six ways in, one request form for all of them, the community routes,
    where we work, and a closing call. */
export default function ContactPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${styles.main} ${tajawal.variable} ${jakarta.variable}`}>
        <section className={styles.hero} aria-labelledby="contact-heading">
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
            <Reveal as="h1" id="contact-heading" className={styles.heroTitle}>
              {" What can we build together? "}</Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              {" We work with companies, institutions and technology partners to develop digital solutions and deliver projects in AI and data, enterprise systems, software engineering, and digital products and services. Start with the collaboration path closest to your goal. "}</Reveal>
            <Reveal className={styles.heroActions} delay={160}>
              <RequestLink type="business" href={FORM_HREF} className={`${styles.button} ${styles.buttonLight}`}>
                {" Discuss your project "}</RequestLink>
              <a href="#ways" className={`${styles.button} ${styles.buttonGhost}`}>
                {" Explore partnership opportunities "}</a>
            </Reveal>
          </div>
        </section>

        <section id="ways" className={styles.section} aria-labelledby="contact-ways-heading">
          <Reveal className={styles.intro}>
            <h2 id="contact-ways-heading" className={styles.title}>
              {" How would you like to work with us? "}</h2>
            <p className={styles.lead}>
              {" From project delivery and specialized services to joint products, strategic partnerships and educational and professional collaboration, choose the question that matches your need. "}</p>
          </Reveal>
          <ul className={styles.cards}>
            {WAYS.map((way, index) => (
              <Reveal as="li" key={way.type} className={styles.card} delay={(index % 2) * 80}>
                <span className={styles.cardNumber} dir="ltr" aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={styles.cardTitle}>{way.title}</h3>
                <p className={styles.cardText}>{way.text}</p>
                <RequestLink type={way.type} href={FORM_HREF} className={styles.cardLink}>
                  {getPartnershipPath(way.type).cta}
                  <Arrow />
                </RequestLink>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* One cream band holds the form and the community routes, so the
            two sections read as one surface while they scroll in. */}
        <div className={styles.band}>
          <section className={styles.section} aria-labelledby="contact-request-heading">
            <Reveal className={styles.intro}>
              <h2 id="contact-request-heading" className={styles.title}>
                {" How does my request reach the right team? "}</h2>
              <p className={styles.lead}>
                {" Every path leads to one unified request form. The details adapt to the type of request, so your information reaches the right team without being entered twice. "}</p>
            </Reveal>
            <div className={styles.routing}>
              <Reveal className={styles.guidance}>
                <h3 className={styles.guidanceTitle}>{"One request, a clearer start"}</h3>
                <p>
                  {" Tell us about your company and why you are getting in touch. The team reviews the information to set the direction of the conversation and find the right specialists for your request. "}</p>
                <p>
                  {" Add whatever you have on the scope of work, your current systems or the partnership idea. Not every detail needs to be complete. "}</p>
              </Reveal>
              <RequestForm id={FORM_ID} labelledBy="contact-request-heading" />
            </div>
          </section>

          <section className={styles.section} aria-labelledby="contact-other-heading">
            <Reveal as="h2" id="contact-other-heading" className={styles.title}>
              {" Looking for another way to connect? "}</Reveal>
            <ul className={styles.cards}>
              {OTHER_WAYS.map((way, index) => (
                <Reveal as="li" key={way.href} className={`${styles.card} ${styles.cardPlain}`} delay={index * 80}>
                  <h3 className={styles.cardTitle}>{way.title}</h3>
                  <p className={styles.cardText}>{way.text}</p>
                  <Link href={way.href} className={styles.cardLink}>
                    {way.cta}
                    <Arrow />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>

        <section className={`${styles.section} ${styles.presence}`} aria-labelledby="contact-presence-heading">
          <Reveal className={styles.regional}>
            <h3 className={styles.cardTitle}>{"How do you support regional expansion?"}</h3>
            <p className={styles.cardText}>
              {" We bring together delivery teams, specialists and local partners to support collaboration across markets. We welcome joint business proposals and partnerships that open new horizons for regional expansion. "}</p>
            <div className={styles.regionalActions}>
              <RequestLink type="regional" href={FORM_HREF} className={`${styles.button} ${styles.buttonPrimary}`}>
                {" Explore regional collaboration "}</RequestLink>
            </div>
          </Reveal>
          <Reveal className={styles.intro}>
            <p className={styles.eyebrow} lang="en">
              REGIONAL PRESENCE
            </p>
            <h2 id="contact-presence-heading" className={styles.title}>
              {" Where does Transformix work? "}</h2>
            <p className={styles.lead}>
              {" We currently work across three cities in Egypt, Saudi Arabia and the United Arab Emirates, while expanding collaboration across the Arab region. "}</p>
          </Reveal>
          <ul className={styles.offices}>
            {OFFICES.map((office, index) => (
              <Reveal as="li" key={office.country} className={styles.office} delay={index * 80}>
                <h3 className={styles.cardTitle}>{office.country}</h3>
                <p className={styles.cardText}>{office.address}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.closing} aria-labelledby="contact-closing-heading">
          <Reveal className={styles.closingCopy}>
            <p className={styles.closingEyebrow} lang="en" dir="ltr">
              LET’S BUILD WHAT COMES NEXT
            </p>
            <h2 id="contact-closing-heading" className={styles.closingTitle}>
              {" Get in touch "}</h2>
            <p className={styles.closingText}>
              {" Whether you are a company looking for a technology partner, an institution exploring a strategic collaboration or a product team, share the details of your project or proposal. The team reviews the information to route your request to the right path. Contact Transformix to discuss your project or collaboration proposal. "}</p>
          </Reveal>
          <Reveal className={styles.closingActions} delay={120}>
            <RequestLink type="business" href={FORM_HREF} className={`${styles.button} ${styles.buttonLight}`}>
              {" Discuss your project "}</RequestLink>
            <a href="#ways" className={`${styles.button} ${styles.buttonLight}`}>
              {" Explore partnership opportunities "}</a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
