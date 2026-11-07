import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import {
  ActionButton,
  Closing,
  DetailList,
  FaqList,
  kit,
  ProcessSteps,
  SectionIntro,
  ServiceHero,
  type Detail,
} from "@/english/components/services/ServiceKit";
import { Reveal } from "@/english/components/ui/Reveal";
import flow from "@/english/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "@/app/(english)/en/services/odoo/page.module.css";

export const metadata: Metadata = {
  title: "Specialized Odoo Services | Transformix",
  description:
    "Odoo solutions that fit the way your organization works: implementation, customization, integration, upgrades and support, with industry solutions for tourism, contracting and brokerage.",
};

/* Figma 4431:13046 — the five services. Only the first row has a photo on
   the artboard; the others keep its pale panel. */
const SERVICES: readonly Detail[] = [
  {
    title: "ERP and CRM implementation",
    text: "We connect finance, purchasing, inventory, sales and customer relationships to your organization's procedures, defining applications, permissions, data and training within the project scope so the systems become part of everyday work.",
    image: "/images/services/odoo/erp-crm.jpg",
    shade: 0.37,
  },
  {
    title: "Odoo development and customization",
    text: "We develop modules, functions, approval workflows, reports, interfaces and permissions to fit the needs of the business and the agreed development scope.",
  },
  {
    title: "System integration and intelligent automation",
    text: "We connect Odoo to e-commerce stores, booking platforms, applications and external services, and use automation and AI when they add real operational value.",
  },
  {
    title: "System upgrades and migration",
    text: "We review the current version, customizations, data and integrations, and plan the upgrade, testing and migration around business continuity and technical compatibility.",
  },
  {
    title: "Ongoing support and development",
    text: "Support, maintenance, updates and development of reports and integrations to suit the organization. Collaboration can extend to running business operations through Transformix GBS.",
  },
];

/* Figma 4431:13121 — the industry foundations. */
const INDUSTRIES = [
  {
    title: "Odoo for tourism",
    text: "A complete foundation for managing tourism activities and business, configurable to your organization's services, procedures, commercial relationships and integrations.",
    image: "/images/services/odoo/tourism.jpg",
  },
  {
    title: "Odoo for contracting",
    text: "An enterprise system with contracting-specific developments; functions, procedures, reports and integrations are configured to fit your projects and the nature of the company.",
    image: "/images/services/odoo/contracting.jpg",
  },
  {
    title: "Odoo for brokerage firms",
    text: "Managing relationships, transactions and brokerage procedures and connecting them to enterprise applications, with developments that fit the nature of the company's business.",
    image: "/images/services/odoo/brokerage.jpg",
  },
] as const;

/* Figma 4431:13163 — the two editions, right to left. */
const EDITIONS = [
  {
    name: "Odoo Community",
    title: "The open-source edition",
    text: "Implementing the modules and integrations needed within the edition's capabilities, with configuration and development for the functions your business needs.",
  },
  {
    name: "Odoo Enterprise",
    title: "A licensed edition sized to your organization",
    text: "Using the applications included in the licenses, with implementation, development, integration, migration, training and support services as the project requires.",
  },
] as const;

/* Figma 4431:13181 */
const STEPS = [
  { title: "Business analysis", text: "Understanding procedures, data and needs." },
  { title: "Design the solution", text: "Defining the applications, integrations and implementation plan." },
  { title: "Configuration and development", text: "Configuring the system and developing the required functions." },
  { title: "Testing and launch", text: "Verification, training and go-live." },
  { title: "Support and improvement", text: "Follow-up, updates and expansion." },
] as const;

/* Figma 4431:13232 — right to left. */
const TOPICS = ["Improving business procedures", "Automation and data integration", "Odoo upgrades and system compatibility"] as const;

/* Figma 4431:13257 */
const QUESTIONS = [
  {
    question: "Can Odoo be implemented around the nature of our business?",
    answer: "Yes. We configure applications and develop functions and integrations to fit your organization, making clear what standard features can do and what needs custom development.",
  },
  {
    question: "Does Transformix work with both Odoo Community and Enterprise?",
    answer: "Yes. We provide implementation, customization, integration and support for both editions, depending on the project scope, the edition's capabilities and the licenses required.",
  },
  {
    question: "Do you have ready-made industry solutions?",
    answer: "We have specialized solution foundations for tourism, contracting and brokerage firms, configurable and expandable to each organization's procedures and requirements.",
  },
  {
    question: "Can our current Odoo system be upgraded?",
    answer: "We first review the version, customizations, data and integrations, then set out the upgrade, compatibility and migration requirements and a suitable testing plan.",
  },
  {
    question: "Can Odoo be connected to other platforms?",
    answer: "Yes, depending on the available APIs and security and operational requirements, including commerce and booking platforms, applications and external services.",
  },
  {
    question: "Do you offer support after launch?",
    answer: "Maintenance, support and ongoing development can be agreed, or the scope can extend to broader managed operations as the organization needs.",
  },
] as const;

/** Figma 4431:12992 — خدمات Odoo المتخصصة. */
export default function OdooPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="odoo-heading"
          image="/images/services/odoo/hero.jpg"
          eyebrow="TRANSFORMIX · ODOO SOLUTIONS & IMPLEMENTATION"
          title={"Odoo solutions that fit the way your organization works"}
          text={"Connect resource planning, operations and customer relationships in an enterprise environment that grows with your business. Whether you are implementing for the first time, upgrading an existing system or need an industry solution, we implement, customize and integrate Odoo around your operations and growth plans."}
          actions={[{ label: "Discuss your project" }, { label: "Industry solutions", href: "#industries" }]}
          labels="Industry Solutions  /  Customization  /  Implementation  /  Community & Enterprise"
        />

        <section className={`${kit.tinted} ${styles.expertise}`} aria-label={"Transformix's Odoo expertise"}>
          <Reveal as="p" className={kit.lead}>
            {" We combine Odoo Community and Odoo Enterprise expertise with an understanding of operations, software engineering and intelligent automation, and offer adaptable solution foundations for tourism, contracting and brokerage that evolve with your organization's needs. "}</Reveal>
          <Reveal delay={80}>
            <ActionButton action={{ label: "Explore Odoo services", href: "#services", tone: "primary" }} />
          </Reveal>
        </section>

        <section id="services" className={`${kit.section} ${styles.services}`} aria-labelledby="odoo-services-heading">
          <SectionIntro
            id="odoo-services-heading"
            title={"Odoo solutions for your business needs"}
            text={"We treat applications, data and procedures as part of daily operations, not software separate from the way the organization works."}
            center
          />
          <Reveal className={styles.center}>
            <ActionButton action={{ label: "Discuss managed support", tone: "primary" }} />
          </Reveal>
          <DetailList items={SERVICES} />
        </section>

        <section id="industries" className={`${kit.section} ${kit.tinted}`} aria-labelledby="odoo-industries-heading">
          <SectionIntro
            id="odoo-industries-heading"
            title={"Specialized solutions for business sectors"}
            text={"Developed solution foundations that combine Odoo with industry functions. We start from a base ready to configure and expand instead of rebuilding everything from scratch."}
          />
          <ul className={styles.industries}>
            {INDUSTRIES.map((industry) => (
              <Reveal as="li" key={industry.title} className={styles.industry}>
                <div className={styles.industryCopy}>
                  <h3 className={kit.cardTitle}>{industry.title}</h3>
                  <p className={kit.cardText}>{industry.text}</p>
                  <div className={styles.industryActions}>
                    <ActionButton action={{ label: "Explore the solution", tone: "primary" }} />
                    <ActionButton action={{ label: "Request a quote" }} />
                  </div>
                </div>
                <div className={styles.industryMedia}>
                  <Image
                    className={styles.industryImage}
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 560px"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={kit.section} aria-labelledby="odoo-editions-heading">
          <SectionIntro
            id="odoo-editions-heading"
            title={"The right edition starts with your organization's requirements"}
            text={"We assess functions, customizations, integrations and total cost before choosing an edition or upgrading, instead of starting from one assumption for every organization."}
            center
          />
          <Reveal className={styles.center}>
            <ActionButton action={{ label: "Discuss choosing the right edition", tone: "primary" }} />
          </Reveal>
          <ul className={kit.cards}>
            {EDITIONS.map((edition, index) => (
              <Reveal as="li" key={edition.name} className={`${kit.card} ${styles.edition}`} delay={index * 80}>
                <p className={styles.editionName} lang="en">
                  {edition.name}
                </p>
                <h3 className={kit.cardTitle}>{edition.title}</h3>
                <p className={kit.cardText}>{edition.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="odoo-process-heading">
          <SectionIntro
            id="odoo-process-heading"
            title={"From understanding the business to operations and improvement"}
            text={"Analysis, development, testing and support, with clear deliverables and defined responsibilities at every stage."}
            center
          />
          <ProcessSteps steps={STEPS} tall />
        </section>

        <section className={kit.section} aria-labelledby="odoo-insights-heading">
          <SectionIntro
            id="odoo-insights-heading"
            eyebrow="ODOO PROJECTS & INSIGHTS"
            title={"Applied experience and specialist insight"}
            text={"Our experience shows in our projects, industry applications and specialist content on Odoo upgrades, automation and process improvement. We start the conversation with what suits your organization, and work out with you what needs implementing, developing or integrating."}
          />
          <ul className={styles.topics}>
            {TOPICS.map((topic, index) => (
              <Reveal as="li" key={topic} className={styles.topic} delay={index * 60}>
                <h3 className={kit.cardTitle}>{topic}</h3>
                <p className={kit.cardText}>{"Topics for discussing how Odoo is applied and developed in your business."}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className={styles.readiness}>
            <div className={styles.readinessCopy}>
              <p className={kit.eyebrow} lang="en">
                ODOO READINESS ASSESSMENT
              </p>
              <h3 className={kit.title}>{"Odoo readiness assessment"}</h3>
              <p className={kit.cardText}>
                {" An initial assessment of your current systems and implementation, development or upgrade needs, to help define the scope of work and next steps before the project starts. "}</p>
            </div>
            <div className={styles.readinessActions}>
              <ActionButton action={{ label: "Request a readiness assessment", tone: "primary" }} />
              <ActionButton action={{ label: "Discuss an Odoo project" }} />
            </div>
          </Reveal>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="odoo-faq-heading">
          <SectionIntro id="odoo-faq-heading" eyebrow="FREQUENTLY ASKED QUESTIONS" title={"Frequently asked questions"} />
          <FaqList items={QUESTIONS} />
        </section>

        <Closing
          id="odoo-closing-heading"
          className={styles.closing}
          eyebrow="BUILD WITH ODOO · GROW WITH TRANSFORMIX"
          title={"Develop your business system with Transformix"}
          text={"Whether you are starting with Odoo, developing an existing system or looking for an industry solution, we help you define the implementation, customization and support scope that suits your organization."}
          actions={[{ label: "Discuss an Odoo project" }, { label: "Request a quote for ready solutions" }]}
        />
      </main>
      <Footer />
    </>
  );
}
