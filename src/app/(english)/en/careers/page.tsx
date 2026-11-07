import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ApplyButton, CareerApplicationProvider } from "@/english/components/careers/CareerApplication";
import { CareerReveal as Reveal, CareersMotion } from "@/english/components/careers/CareersMotion";
import { Footer } from "@/english/components/sections/Footer";
import { Navbar } from "@/english/components/sections/Navbar";
import flow from "@/english/components/ui/SectionFlow.module.css";
import styles from "@/app/(english)/en/careers/page.module.css";

export const metadata: Metadata = {
  title: "Careers & Opportunities | Transformix",
  description:
    "We bring in specialists and emerging talent in technology and business, with paths for employment, training and project collaboration.",
};

/* Figma 4334:4695 — the six paths, in reading order (right column first).
   Each opens the application preset to its own path, except the community
   one, which leads to TX Community. */
const TRACKS = [
  {
    icon: "/icons/careers/open-positions.svg",
    title: "Open positions",
    text: "Career opportunities in software engineering, AI and data, enterprise systems, design and digital production, project management, business development and operations, based on the company's needs and published openings.",
    cta: "Explore jobs",
    type: "job",
  },
  {
    icon: "/icons/careers/internships.svg",
    title: "Internships",
    text: "Hands-on training for university students and recent graduates inside our teams, built on practical tasks and projects, professional supervision and clear evaluation whenever programmes are available.",
    cta: "Apply for an internship",
    type: "internship",
  },
  {
    icon: "/icons/careers/university-training.svg",
    title: "University training",
    text: "Summer training, mandatory training required by universities, and co-op training, coordinated with academic institutions and each programme's requirements and duration.",
    cta: "Choose university training",
    type: "university",
  },
  {
    icon: "/icons/careers/graduation-projects.svg",
    title: "Graduation projects",
    text: "We receive technology-related university project proposals and explore mentoring, technical support or prototype reviews for selected projects.",
    cta: "Share your project proposal",
    type: "graduation",
  },
  {
    icon: "/icons/careers/freelance.svg",
    title: "Freelance & project-based",
    text: "Collaboration with experts, freelancers, consultants and technical teams on specific tasks and projects, based on specialty, scope and need.",
    cta: "Register your interest in collaborating",
    type: "freelance",
  },
  {
    icon: "/icons/careers/community.svg",
    title: "Community opportunities",
    text: "Take part in tech meetups, university initiatives, volunteering and community activities. These opportunities are managed through TX Community.",
    cta: "Go to TX Community",
    href: "/en/community",
  },
];

/* Figma 4352:5548 — what each path adds to the application. */
const REQUIREMENTS = [
  {
    title: "Jobs and freelancers",
    text: "Years of experience, specialties, work mode, expected availability, portfolio.",
  },
  {
    title: "Internships & university training",
    text: "University, faculty, year of study, training type, required duration, and a university letter where needed.",
  },
  {
    title: "Graduation projects",
    text: "Project title, team members, academic supervisor, current stage, type of support needed.",
  },
  {
    title: "Talent network",
    text: "Fields of interest, city, and work preferences.",
  },
];

/** /careers (Figma 4334:4672) — the ways to join Transformix. Every apply
    on the page opens the application form (Figma 4334:4697) in a dialog. */
export default function CareersPage() {
  return (
    <CareersMotion>
      <Navbar variant="slim" />
      <CareerApplicationProvider>
        <main className={`${flow.flow} ${styles.main}`}>
          <section className={styles.hero} aria-labelledby="careers-heading">
            <div className={styles.heroMedia} aria-hidden="true">
              <Image
                className={styles.heroImage}
                src="/images/careers/hero.png"
                alt=""
                fill
                priority
                sizes="100vw"
              />
            </div>
            <div className={styles.heroCopy}>
              <Reveal as="h1" id="careers-heading" className={styles.heroTitle}>
                {" Careers & opportunities "}</Reveal>
              <Reveal as="p" className={styles.heroText} delay={80}>
                {" We bring in specialists and emerging talent in technology and business, and offer paths for employment, training and project collaboration. Find the opportunities that fit your field and register your interest through a single form. "}</Reveal>
              <Reveal delay={160}>
                <ApplyButton className={styles.heroButton}>{"Join us now"}</ApplyButton>
              </Reveal>
            </div>
          </section>

          <section className={styles.tracks} aria-labelledby="careers-tracks-heading">
            <Reveal as="h2" id="careers-tracks-heading" className={styles.title}>
              {" Ways to join and collaborate "}</Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              {" Choose the path that fits your field and career stage. "}</Reveal>
            <ul className={styles.trackGrid}>
              {TRACKS.map((track, index) => (
                <Reveal as="li" key={track.title} className={styles.track} delay={(index % 2) * 90} interactive>
                  <div className={styles.trackHead}>
                    <Image className={styles.trackIcon} src={track.icon} alt="" width={40} height={40} />
                    <h3 className={styles.trackTitle}>{track.title}</h3>
                  </div>
                  <p className={styles.trackText}>{track.text}</p>
                  {track.href ? (
                    <Link href={track.href} className={styles.trackLink}>
                      {track.cta}
                      <span className={styles.trackArrow} aria-hidden="true">←</span>
                    </Link>
                  ) : (
                    <ApplyButton type={track.type} className={styles.trackLink}>
                      {track.cta}
                      <span className={styles.trackArrow} aria-hidden="true">←</span>
                    </ApplyButton>
                  )}
                </Reveal>
              ))}
            </ul>
          </section>

          <section className={styles.requirements} aria-labelledby="careers-requirements-heading">
            <Reveal as="h2" id="careers-requirements-heading" className={styles.requirementsTitle}>
              {" Additional fields by path "}</Reveal>
            <ul className={styles.requirementGrid}>
              {REQUIREMENTS.map((item, index) => (
                <Reveal as="li" key={item.title} className={styles.requirement} delay={(index % 2) * 90}>
                  <h3 className={styles.requirementTitle}>{item.title}</h3>
                  <p className={styles.requirementText}>{item.text}</p>
                </Reveal>
              ))}
            </ul>
            <p className={styles.note}>
              {" Submitted details are subject to our privacy policy and your consent to be contacted; submitting an application does not guarantee acceptance or employment. "}</p>
            <div className={styles.actions}>
              <ApplyButton className={styles.submit}>{"Submit interest"}</ApplyButton>
            </div>
          </section>
        </main>
      </CareerApplicationProvider>
      <Footer />
    </CareersMotion>
  );
}
