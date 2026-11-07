import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import { ServiceAction } from "@/english/components/services/ServiceAction";
import {
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
import styles from "@/app/(english)/en/services/gbs/page.module.css";

export const metadata: Metadata = {
  title: "Transformix GBS — Technology-Led Business Services | Transformix",
  description:
    "We deliver technology projects for technology companies and their partners, and we develop, run and maintain systems and manage digital operations for organizations.",
};

const pad = (index: number) => String(index + 1).padStart(2, "0");

/* Figma 4431:12507 — who the services are for, in reading order (right
   column first). Each call opens the project form. */
const AUDIENCES = [
  {
    title: "Technology and software companies",
    text: "Delivering whole projects or parts of them, including development, integration, testing, maintenance and support. We can work white-label under the partner's brand, under a clear agreement.",
    cta: "Discuss your delivery needs",
  },
  {
    title: "Companies and institutions",
    text: "We develop the ERP and CRM systems behind your operations, then run applications, transactions, invoices, orders and data on an ongoing basis within an agreed scope.",
    cta: "Explore running your operations",
  },
  {
    title: "Digital business and e-commerce",
    text: "Technical and operational support for stores and platforms, covering maintenance, content, orders, invoices, campaigns and integrations, so the sales and service experience runs as one.",
    cta: "Discuss running your platform",
  },
  {
    title: "Organizations with in-house technology teams",
    text: "Managing the teams you already have, part-time technology leadership, periodic reviews of solutions and projects, and specialist advice, without hiring a full technology management team.",
    cta: "Discuss technology leadership",
  },
] as const;

/* Figma 4431:12576 — the five service groups. */
const SERVICES: readonly Detail[] = [
  {
    title: "Outsourced technology project delivery",
    text: "We build software, applications, platforms, integrations and tests, and develop specific components for technology companies, their partners and institutions. We work through defined projects or ongoing teams, and under the partner's brand when agreed.",
    image: "/images/services/gbs/service-1.jpg",
    shade: 0.34,
    height: 264,
  },
  {
    title: "Technology management and operations",
    text: "We maintain, update and run websites, applications and systems, including support, integrations, testing, incident handling and performance monitoring. We work as an external team or an extension of your current team.",
    image: "/images/services/gbs/service-2.jpg",
    shade: 0.36,
    height: 264,
  },
  {
    title: "Business process management and operations",
    text: "We run operations inside ERP and CRM systems: invoices, orders, records, inventory, data, and administrative and accounting support, within the client's approved permissions and controls.",
    image: "/images/services/gbs/service-3.jpg",
    height: 234,
  },
  {
    title: "Commerce and digital business operations",
    text: "We run stores, platforms, bookings, products, content, orders, support, campaigns and reports, and connect payments, inventory, accounting and shipping to suit the business.",
    image: "/images/services/gbs/service-4.jpg",
    shade: 0.42,
    height: 234,
  },
  {
    title: "Technology leadership and advisory",
    text: "We manage the client's technology teams, oversee vendors and projects, and review architecture, performance and development plans. We provide external leadership, a fractional CTO or periodic advice as needed.",
    image: "/images/services/gbs/service-5.jpg",
    shade: 0.3,
    height: 234,
  },
];

/* Figma 4431:12652 — the four ways of working, right to left. */
const MODELS = [
  { title: "A defined project", text: "A clear scope, defined deliverables and an agreed timeline." },
  { title: "A dedicated team", text: "Specialists working on your priorities while your team directs the work." },
  { title: "A managed service", text: "An end-to-end service with agreed deliverables, performance and service levels." },
  { title: "Part-time technology leadership", text: "Leading the team and reviewing plans periodically, without a full-time leader." },
] as const;

/* Figma 4431:12674 — the dedicated team beside the managed service. */
const COMPARISON = [
  {
    en: "DEDICATED TEAM",
    title: "The dedicated team",
    rows: [
      { label: "What do you get?", text: "The time and expertise of a team of specialists." },
      { label: "Who sets the priorities?", text: "You or your team set the priorities and direct the work." },
      { label: "What is our role?", text: "Providing the talent and coordinating resources under the contract." },
      { label: "An example", text: "Two developers working within a software company's team." },
    ],
  },
  {
    en: "MANAGED SERVICE",
    title: "The managed service",
    rows: [
      { label: "What do you get?", text: "A service, deliverables and an agreed level of performance." },
      { label: "Who runs the day-to-day work?", text: "Transformix runs the service day to day." },
      { label: "What is our role?", text: "Delivery, follow-up, improvement and escalation when needed." },
      { label: "An example", text: "Monthly e-commerce management covering maintenance and operations." },
    ],
  },
] as const;

/* Figma 4431:12712 */
const REASONS = [
  {
    title: "Engineering and operations expertise in one ecosystem",
    text: "We bring together software and application development, enterprise systems, e-commerce and business operations; we don't just supply people, we connect technical expertise with operations.",
  },
  {
    title: "Flexible in size and responsibility",
    text: "Start with a small scope, then grow into ongoing collaboration or full management of the service. The team's size and responsibilities evolve with the needs of the business.",
  },
  {
    title: "We start with your current systems",
    text: "We review the technologies and processes in place to find opportunities for support, integration and improvement, without assuming that replacing the system is the first answer.",
  },
  {
    title: "Operations built on governance and performance",
    text: "Clear permissions, deliverables, documentation, service levels and reports, using automation and AI where they fit.",
  },
] as const;

/* Figma 4431:12772 */
const SECTORS = [
  { title: "Technology and software", text: "Project delivery, testing, support and specialist teams." },
  { title: "Associations and institutions", text: "Managing memberships, platforms and administrative operations." },
  { title: "E-commerce & Retail", text: "Running stores, orders, products and digital support." },
  { title: "Real estate and facilities", text: "Platforms, requests, tickets and operational data." },
  { title: "Trade and distribution", text: "Systems, procurement, inventory and invoicing." },
  { title: "Tourism, hospitality and bookings", text: "Availability, systems and the digital operations behind the service." },
] as const;

/* Figma 4431:12858 */
const STEPS = [
  { title: "We understand the need", text: "We review the scope of work and current systems." },
  { title: "We choose the model", text: "A project, a team, a managed service or part-time leadership." },
  { title: "We set the agreement", text: "Roles, deliverables, timing and service levels." },
  { title: "We start delivery", text: "Teams, tools, knowledge transfer and integration." },
  { title: "We track performance", text: "We review results and opportunities to improve." },
] as const;

/* Figma 4431:12904 */
const QUESTIONS = [
  {
    question: "Does Transformix work with other technology companies?",
    answer: "Yes. We deliver complete projects or parts of them and provide specialist teams and maintenance and support services, including white-label work under a clear agreement.",
  },
  {
    question: "Can you be our company's external technology team?",
    answer: "Yes. We develop, run and support applications, websites and systems within agreed responsibilities and service levels.",
  },
  {
    question: "Can you manage the technology team we already have?",
    answer: "Yes. We provide external or part-time technology leadership, overseeing teams and vendors, reviewing solutions and projects, and setting development plans.",
  },
  {
    question: "Do you offer ERP operations, accounting and invoicing services?",
    answer: "We configure the systems and run the agreed operations, including support for accounting, invoicing, orders and data. Statutory responsibilities and approvals remain with the authorized parties, within the client's permissions and controls.",
  },
  {
    question: "What is the difference between a dedicated team and a managed service?",
    answer: "With a dedicated team, you or your team manage the specialists' priorities and work. With a managed service, Transformix manages the service, its deliverables and its performance as agreed.",
  },
  {
    question: "Can we start with one project and then move to ongoing operations?",
    answer: "Yes. You can start with a defined project, then move to operations, maintenance or ongoing support, or widen the collaboration gradually.",
  },
  {
    question: "How is the cost of collaboration set?",
    answer: "By the scope of work, the size of the team or the deliverables required, operational coverage, systems, integrations and service levels. The model and cost are set in an agreement that fits the collaboration.",
  },
] as const;

function Arrow() {
  return (
    <span className={kit.arrow} aria-hidden="true">
      ←
    </span>
  );
}

/** Figma 4431:12464 — Transformix GBS: technology-led business services. */
export default function GbsPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${kit.main} ${tajawal.variable} ${jakarta.variable}`}>
        <ServiceHero
          id="gbs-heading"
          image="/images/services/gbs/hero.jpg"
          eyebrow="TRANSFORMIX GBS · TECHNOLOGY-LED BUSINESS SERVICES"
          title={"The technology and operations team that works with your business"}
          text={"We deliver technology projects for technology companies and their partners, and we develop, run and maintain systems and manage digital operations for organizations. We work as your external technology team, as an extension of your current team, or as a partner responsible for running a complete service."}
          actions={[
            { label: "Discuss the right collaboration model" },
            { label: "Explore GBS services", href: "#services" },
          ]}
        />

        <section className={kit.section} aria-labelledby="gbs-audiences-heading">
          <SectionIntro
            id="gbs-audiences-heading"
            title={"Who are GBS services for?"}
            text={"We shape our services around what you need: delivering a project, an ongoing capability, a fully managed service, or leadership for your current technology team."}
          />
          <ul className={kit.cards}>
            {AUDIENCES.map((audience, index) => (
              <Reveal as="li" key={audience.title} className={`${kit.card} ${styles.audience}`} delay={(index % 2) * 80}>
                <span className={kit.cardNumber} dir="ltr" aria-hidden="true">
                  {pad(index)}
                </span>
                <h3 className={kit.cardTitle}>{audience.title}</h3>
                <p className={kit.cardText}>{audience.text}</p>
                <ServiceAction className={kit.cardLink}>
                  {audience.cta}
                  <Arrow />
                </ServiceAction>
              </Reveal>
            ))}
          </ul>
        </section>

        <section id="services" className={`${kit.section} ${styles.services}`} aria-labelledby="gbs-services-heading">
          <SectionIntro
            id="gbs-services-heading"
            title={"GBS services"}
            center
            text={
              <>
                <p>
                  {" Five service groups, organized around the work you want to hand over. They can be combined in one agreement that brings delivery, operations and leadership together. "}</p>
                <p>
                  <strong>{"Technology is part of the operating model"}</strong>{" "}
                  {" — we use ERP and CRM systems, the cloud, collaboration tools, data, automation and AI where they add real value to the work. Data protection, governance and each party's responsibilities are defined within the operating model, not treated as separate add-ons. "}</p>
              </>
            }
          />
          <DetailList items={SERVICES} />
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="gbs-models-heading">
          <SectionIntro id="gbs-models-heading" title={"How can we work with your company?"} />
          <ul className={styles.models}>
            {MODELS.map((model, index) => (
              <Reveal as="li" key={model.title} className={styles.model} delay={index * 60}>
                <h3 className={kit.cardTitle}>{model.title}</h3>
                <p className={kit.cardText}>{model.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={kit.section} aria-labelledby="gbs-compare-heading">
          <SectionIntro
            id="gbs-compare-heading"
            title={"Dedicated team or managed service?"}
            text={"The choice isn't only about team size; it's about who manages the priorities and who is responsible for operations and results."}
          />
          <div className={styles.compare}>
            {COMPARISON.map((model, index) => (
              <Reveal key={model.en} className={styles.compareCard} delay={index * 80}>
                <p className={kit.eyebrow} lang="en">
                  {model.en}
                </p>
                <h3 className={kit.cardTitle}>{model.title}</h3>
                <dl className={styles.compareRows}>
                  {model.rows.map((row) => (
                    <div key={row.label} className={styles.compareRow}>
                      <dt className={styles.compareLabel}>{row.label}</dt>
                      <dd className={kit.cardText}>{row.text}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="gbs-why-heading">
          <SectionIntro id="gbs-why-heading" title={"Why Transformix GBS?"} center />
          <ul className={kit.cards}>
            {REASONS.map((reason, index) => (
              <Reveal as="li" key={reason.title} className={kit.card} delay={(index % 2) * 80}>
                <h3 className={kit.cardTitle}>{reason.title}</h3>
                <p className={kit.cardText}>{reason.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={kit.section} aria-labelledby="gbs-sectors-heading">
          <SectionIntro
            id="gbs-sectors-heading"
            title={"Sectors we serve"}
            text={"Examples of sectors and areas of collaboration we can support, not a list of clients or project results."}
          />
          <ul className={kit.cards}>
            {SECTORS.map((sector, index) => (
              <Reveal as="li" key={sector.title} className={kit.card} delay={(index % 2) * 80}>
                <h3 className={kit.cardTitle}>{sector.title}</h3>
                <p className={kit.cardText}>{sector.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* One cream band holds the process and the questions, so the two
            sections read as one surface while they scroll in. */}
        <div className={kit.tinted}>
          <section className={kit.section} aria-labelledby="gbs-process-heading">
            <SectionIntro id="gbs-process-heading" title={"From defining the need to operations"} />
            <ProcessSteps steps={STEPS} />
          </section>

          <section className={kit.section} aria-labelledby="gbs-faq-heading">
            <SectionIntro id="gbs-faq-heading" eyebrow="FREQUENTLY ASKED QUESTIONS" title={"Frequently asked questions"} />
            <FaqList items={QUESTIONS} />
          </section>
        </div>

        <section className={kit.section} aria-labelledby="gbs-insight-heading">
          <SectionIntro id="gbs-insight-heading" title={"A deeper look at the economics of operations"} />
          <Reveal as="article" className={styles.insight}>
            <h3 className={kit.cardTitle}>
              {" Outsourcing and shared services: redesigning operating costs and strengthening business agility "}</h3>
            <p className={kit.cardText}>
              {" The question is no longer just cutting costs, but the ability to redistribute resources, scale teams up or down, and keep talent without committing to fixed structures that are hard to change when markets shift. The question facing management today…"}{" "}
              <Link href={"/en/community/insights"} className={styles.readMore}>
                {" Read more "}</Link>
            </p>
          </Reveal>
        </section>

        <Closing
          id="gbs-closing-heading"
          eyebrow="START A CONVERSATION"
          title={"Technology and operations collaboration that fits your business"}
          text={"Whether you are a technology company looking for a delivery partner, an institution that needs an external team, or a digital business that needs end-to-end operations, we choose the model around your goals, systems and needs. Expertise and teams across Egypt, Saudi Arabia and the UAE, with remote and distributed delivery as agreed."}
          actions={[{ label: "Discuss the right collaboration model" }]}
        />
      </main>
      <Footer />
    </>
  );
}
