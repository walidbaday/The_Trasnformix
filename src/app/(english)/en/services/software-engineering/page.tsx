import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { ServiceAction } from "@/english/components/services/ServiceAction";
import { kit } from "@/english/components/services/ServiceKit";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { EXTRA_SERVICES, getServiceWebsite } from "@/english/lib/serviceNavigation";
import styles from "@/app/(english)/en/services/software-engineering/page.module.css";

export const metadata: Metadata = {
  title: "Software Engineering and Custom Solution Development | Transformix",
  description:
    "Software engineering and digital solution development, from building custom systems and applications to developing and running digital products and platforms.",
};

const MOBILE_WEBSITE = EXTRA_SERVICES.find((service) => service.key === "mobile")!.website;

/* Figma 4412:7825 — the six capabilities. The two with sites of their own
   (mobile apps, web) lead there; the others open the project form. */
const CAPABILITIES: readonly { title: string; text: string; image: string; href?: string }[] = [
  {
    title: "Custom systems and software",
    text: "We design and build enterprise systems and custom software around your operations and business requirements, including customer and partner portals, operations management applications, dashboards and multi-user systems.",
    image: "/images/services/software/service-1.jpg",
  },
  {
    title: "Mobile applications",
    text: "We design and build iOS and Android apps, native or cross-platform, connected to enterprise systems, databases and digital services.",
    image: "/images/services/software/service-2.jpg",
    href: MOBILE_WEBSITE,
  },
  {
    title: "Digital product engineering",
    text: "We partner with organizations, technology companies and entrepreneurs to develop digital products, from designing the technical architecture and building prototypes to developing, launching and improving production releases. This includes white-label models and technical development partnerships.",
    image: "/images/services/software/service-3.jpg",
  },
  {
    title: "System integration and application modernization",
    text: "We build APIs and integrations between systems and applications, and modernize existing software and improve its performance. Our work includes connecting applications to ERP and CRM systems and external platforms while making use of existing components.",
    image: "/images/services/software/service-4.jpg",
  },
  {
    title: "Testing, quality and ongoing support",
    text: "We provide software testing and quality assurance, defect resolution, update management, and ongoing maintenance and development, in line with project requirements and agreed service levels.",
    image: "/images/services/software/service-5.jpg",
  },
  {
    title: "Platforms and web applications",
    text: "We build web platforms and digital applications, from interface and user experience design to back-end systems, databases and admin dashboards. Our capabilities include multi-user platforms, online services, cloud applications and the integrations around them.",
    image: "/images/services/software/service-6.jpg",
    href: getServiceWebsite("web"),
  },
];

/* Figma 4365:11525 — the ways of working, right to left. */
const MODELS = [
  { title: "Software development partner", text: "Delivering complete projects for technology companies and business partners, including white-label work." },
  { title: "Dedicated engineering teams", text: "Specialists and development teams working with the client's team or under its lead, as the project requires." },
  { title: "End-to-end project development", text: "From defining requirements and engineering design to development, testing and delivery, within a defined scope." },
  { title: "Ongoing development and support", text: "Ongoing maintenance, development and updates under operations and support agreements." },
] as const;

/* Figma 4409:3296 — right to left. Each icon keeps its own drawn size inside
   the 64px slot. */
const TECHNOLOGIES = [
  { icon: "research", width: 51.8188, height: 53, title: "Research and development", text: "Prototypes and testing new ideas and solutions." },
  { icon: "creative", width: 45, height: 54, title: "Design and creativity", text: "User experience, interfaces and digital identity." },
  { icon: "software", width: 65, height: 49.0007, title: "Enterprise systems", text: "Integrating software with ERP and CRM systems." },
  { icon: "ai", width: 57, height: 57, title: "AI and data science", text: "Building analytics and intelligent agents into applications." },
] as const;

/* Figma 4409:3332 */
const QUESTIONS = [
  {
    question: "Does Transformix build fully custom software?",
    answer: "Yes. We build new systems, platforms and applications to the client's requirements, and we also develop and modernize existing software.",
  },
  {
    question: "Can a software company bring in Transformix to deliver its clients' projects?",
    answer: "Yes. We can work as a technical development partner and deliver complete projects or specific components, including on a white-label basis.",
  },
  {
    question: "Can part of an existing system be developed without replacing it?",
    answer: "Yes, after reviewing the current system and identifying what can be changed or integrated and the technical constraints.",
  },
  {
    question: "Do you provide maintenance and support after the project launches?",
    answer: "Yes. Maintenance, updates and ongoing development can be agreed within a defined scope and service levels.",
  },
  {
    question: "Can you provide an engineering team to work with our current team?",
    answer: "Yes. We provide teams and specialists under an agreed working model, for a specific project or ongoing collaboration.",
  },
] as const;

const pad = (index: number) => String(index + 1).padStart(2, "0");

/** Figma 4365:10797 — هندسة البرمجيات وتطوير الحلول المخصصة. */
export default function SoftwareEngineeringPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <section className={styles.hero} aria-labelledby="software-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              className={styles.heroImage}
              src="/images/services/software/hero.jpg"
              alt=""
              fill
              preload
              sizes="100vw"
            />
          </div>
          <div className={styles.heroCopy}>
            <Reveal as="h1" id="software-heading" className={styles.heroTitle}>
              {" Software engineering and custom solution development "}</Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              {" Transformix provides software engineering and digital solution development, from building custom systems and applications to developing and running digital products and platforms. We bring together engineering expertise, user experience design and system integration, using AI and modern technology as each project requires. "}</Reveal>
            <Reveal delay={160}>
              <ServiceAction className={`${styles.pill} ${styles.pillLight} ${styles.heroButton}`}>
                {" Discuss your project with us "}</ServiceAction>
            </Reveal>
          </div>
        </section>

        <section className={styles.capabilities} aria-labelledby="software-capabilities-heading">
          <Reveal className={styles.intro}>
            <h2 id="software-capabilities-heading" className={kit.title}>
              {" Software engineering services "}</h2>
            <p className={kit.lead}>{"Specialized services for building, developing and maintaining software to fit your business needs."}</p>
          </Reveal>
          <ul className={styles.capabilityList}>
            {CAPABILITIES.map((capability) => (
              <Reveal as="li" key={capability.title} className={styles.capability}>
                <div className={styles.capabilityCopy}>
                  <h3 className={kit.cardTitle}>{capability.title}</h3>
                  <p className={kit.cardText}>{capability.text}</p>
                  <ServiceAction
                    href={capability.href}
                    external={Boolean(capability.href)}
                    className={`${styles.pill} ${styles.pillPrimary}`}
                  >
                    {" Learn about the service "}</ServiceAction>
                </div>
                <div className={styles.capabilityMedia}>
                  <Image
                    className={styles.capabilityImage}
                    src={capability.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 640px"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="software-journey-heading">
          <Reveal className={styles.introSpaced}>
            <h2 id="software-journey-heading" className={kit.title}>
              {" How do we work with you? "}</h2>
            <p className={kit.lead}>{"We choose the delivery model based on the nature of the project, the size of the team and each party's responsibilities."}</p>
          </Reveal>
          <ol className={styles.models}>
            {MODELS.map((model, index) => (
              <Reveal as="li" key={model.title} className={styles.model} delay={index * 60}>
                <span className={styles.modelNumber} aria-hidden="true">
                  {pad(index)}  ———
                </span>
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={kit.cardText}>{model.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className={kit.section} aria-labelledby="software-tech-heading">
          <Reveal className={styles.introSpaced}>
            <h2 id="software-tech-heading" className={kit.title}>
              {" Technologies that power your product development "}</h2>
            <p className={`${kit.lead} ${styles.techLead}`}>
              {" We use a range of technologies and frameworks to suit each project, including Flutter, Next.js, Python, .NET and Docker, alongside databases and integration and deployment tools. We also build AI, automation and data science capabilities into applications where needed. Connected solutions within the Transformix ecosystem. "}</p>
          </Reveal>
          <ul className={styles.technologies}>
            {TECHNOLOGIES.map((technology, index) => (
              <Reveal as="li" key={technology.icon} className={styles.technology} delay={index * 60}>
                <span className={styles.techIcon} aria-hidden="true">
                  <Image
                    src={`/icons/services/tech/${technology.icon}.svg`}
                    alt=""
                    width={technology.width}
                    height={technology.height}
                  />
                </span>
                <h3 className={styles.techTitle}>{technology.title}</h3>
                <p className={kit.cardText}>{technology.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.closing} aria-labelledby="software-closing-heading">
          <Reveal as="h2" id="software-closing-heading" className={kit.closingTitle}>
            {" Develop your project with Transformix "}</Reveal>
          <Reveal as="p" className={styles.closingText} delay={80}>
            {" Whether you are building a new digital product, expanding your current systems or looking for an engineering partner to deliver your projects, Transformix provides the technical expertise and collaboration models that suit your business. "}</Reveal>
          <Reveal delay={160}>
            <ServiceAction className={`${styles.pill} ${styles.pillLight}`}>{"Learn about the service"}</ServiceAction>
          </Reveal>
        </section>

        <section className={styles.faq} aria-labelledby="software-faq-heading">
          <Reveal as="h2" id="software-faq-heading" className={kit.title}>
            {" Frequently asked questions "}</Reveal>
          <ul className={styles.faqList}>
            {QUESTIONS.map((item) => (
              <Reveal as="li" key={item.question} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={kit.cardText}>{item.answer}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
