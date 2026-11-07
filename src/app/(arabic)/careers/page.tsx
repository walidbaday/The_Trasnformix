import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ApplyButton, CareerApplicationProvider } from "@/components/careers/CareerApplication";
import { CareerReveal as Reveal, CareersMotion } from "@/components/careers/CareersMotion";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import flow from "@/components/ui/SectionFlow.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "الوظائف والفرص المهنية | Transformix",
  description:
    "نستقطب متخصصين ومواهب ناشئة في التكنولوجيا والأعمال، ونوفر مسارات للتوظيف والتدريب والتعاون في المشروعات.",
};

/* Figma 4334:4695 — the six paths, in reading order (right column first).
   Each opens the application preset to its own path, except the community
   one, which leads to TX Community. */
const TRACKS = [
  {
    icon: "/icons/careers/open-positions.svg",
    title: "الوظائف المتاحة",
    text: "فرص مهنية في هندسة البرمجيات، والذكاء الاصطناعي والبيانات، وأنظمة المؤسسات، والتصميم والإنتاج الرقمي، وإدارة المشروعات، وتطوير الأعمال والوظائف التشغيلية، وفق احتياجات الشركة وإعلاناتها المنشورة.",
    cta: "استكشف الوظائف",
    type: "job",
  },
  {
    icon: "/icons/careers/internships.svg",
    title: "التدريب العملي",
    text: "تدريب تطبيقي لطلاب الجامعات والخريجين الجدد داخل فرق العمل، يعتمد على مهام ومشروعات عملية وإشراف مهني وتقييم واضح عند توفر البرامج.",
    cta: "قدّم اهتمامك بالتدريب",
    type: "internship",
  },
  {
    icon: "/icons/careers/university-training.svg",
    title: "التدريب الجامعي",
    text: "التدريب الصيفي، والتدريب الإلزامي المطلوب من الجامعات، والتدريب التعاوني، بالتنسيق مع المؤسسات الأكاديمية ومتطلبات البرنامج ومدته.",
    cta: "اختر التدريب الجامعي",
    type: "university",
  },
  {
    icon: "/icons/careers/graduation-projects.svg",
    title: "مشروعات التخرج",
    text: "استقبال مقترحات المشروعات الجامعية ذات الصلة بالتكنولوجيا، ودراسة فرص الإرشاد أو الدعم الفني أو مراجعة النماذج التقنية للمشروعات المختارة.",
    cta: "شارك مقترح مشروعك",
    type: "graduation",
  },
  {
    icon: "/icons/careers/freelance.svg",
    title: "التعاون المهني",
    text: "التعاون مع الخبراء والمستقلين والاستشاريين والفرق التقنية في مهام ومشروعات محددة وفق التخصص والنطاق والاحتياج.",
    cta: "سجّل اهتمامك بالتعاون",
    type: "freelance",
  },
  {
    icon: "/icons/careers/community.svg",
    title: "فرص المجتمع",
    text: "المشاركة في اللقاءات التقنية والمبادرات الجامعية والتطوع والأنشطة المجتمعية؛ وتُدار هذه الفرص من خلال TX Community.",
    cta: "انتقل إلى TX Community",
    href: "/community",
  },
];

/* Figma 4352:5548 — what each path adds to the application. */
const REQUIREMENTS = [
  {
    title: "الوظائف والمستقلون",
    text: "سنوات الخبرة، التخصصات، نمط العمل، التفرغ المتوقع، ملف الأعمال.",
  },
  {
    title: "التدريب العملي والجامعي",
    text: "الجامعة، الكلية، السنة الدراسية، نوع التدريب، المدة المطلوبة، خطاب الجامعة عند الحاجة.",
  },
  {
    title: "مشروعات التخرج",
    text: "عنوان المشروع، أعضاء الفريق، المشرف الأكاديمي، المرحلة الحالية، نوع الدعم المطلوب.",
  },
  {
    title: "شبكة المواهب",
    text: "التخصصات المهتم بها والمدينة وتفضيلات العمل.",
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
                الوظائف والفرص المهنية
              </Reveal>
              <Reveal as="p" className={styles.heroText} delay={80}>
                نستقطب متخصصين ومواهب ناشئة في التكنولوجيا والأعمال، ونوفر مسارات للتوظيف
                والتدريب والتعاون في المشروعات. تعرّف على الفرص المناسبة لتخصصك، وقدّم اهتمامك
                من خلال نموذج موحد.
              </Reveal>
              <Reveal delay={160}>
                <ApplyButton className={styles.heroButton}>انضم إلينا الان</ApplyButton>
              </Reveal>
            </div>
          </section>

          <section className={styles.tracks} aria-labelledby="careers-tracks-heading">
            <Reveal as="h2" id="careers-tracks-heading" className={styles.title}>
              مسارات الانضمام والتعاون
            </Reveal>
            <Reveal as="p" className={styles.subtitle} delay={60}>
              اختر المسار المناسب لتخصصك ومرحلتك المهنية.
            </Reveal>
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
              حقول إضافية بحسب المسار
            </Reveal>
            <ul className={styles.requirementGrid}>
              {REQUIREMENTS.map((item, index) => (
                <Reveal as="li" key={item.title} className={styles.requirement} delay={(index % 2) * 90}>
                  <h3 className={styles.requirementTitle}>{item.title}</h3>
                  <p className={styles.requirementText}>{item.text}</p>
                </Reveal>
              ))}
            </ul>
            <p className={styles.note}>
              يخضع تقديم البيانات لسياسة الخصوصية والموافقة على التواصل؛ ولا يعني تقديم الطلب ضمان
              القبول أو التوظيف.
            </p>
            <div className={styles.actions}>
              <ApplyButton className={styles.submit}>إرسال الاهتمام</ApplyButton>
            </div>
          </section>
        </main>
      </CareerApplicationProvider>
      <Footer />
    </CareersMotion>
  );
}
