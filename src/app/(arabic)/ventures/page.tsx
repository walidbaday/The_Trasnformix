import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "بناء الشركات الناشئة | Transformix",
  description:
    "ترانسفورمكس للمشاريع يبني ويطور الشركات الناشئة التكنولوجية بشكل منهجي من خلال دمج الانضباط الهندسي مع سرعة ريادة الأعمال.",
};

/* Figma 4036:5170 — the three blue cards, in reading order. */
const PILLARS = [
  {
    icon: "/icons/ventures/idea.svg",
    title: "توليد الأفكار",
    text: "تحقق من الأفكار من خلال أبحاث السوق والتخطيط الاستراتيجي",
  },
  {
    icon: "/icons/ventures/build.svg",
    title: "بناء",
    text: "تطوير نموذج أولي مع تكرار سريع وتعليقات مستمرة",
  },
  {
    icon: "/icons/ventures/scale.svg",
    title: "توسيع",
    text: "تحسين النمو باستخدام استراتيجيات وموارد قائمة على البيانات",
  },
];

/* Figma 4037:5471, 4037:5493 — the two white cards beside the photo. */
const TRACKS = [
  {
    badge: "من الصفر إلى الإطلاق",
    title: "بناء المشاريع",
    text: "بناء الشركات من الصفر بناءً على الفرص المثبتة. نحن نتولى كل شيء من الفكرة إلى إطلاق السوق.",
  },
  {
    badge: "تغذية وإرشاد",
    title: "استثمار استراتيجي",
    text: "استثمر في الشركات الناشئة في مراحلها المبكرة مع مؤسسين أقوياء ونجاح مثبت، مع توفير الإرشاد الاستراتيجي والموارد.",
  },
];

/* Figma 4036:4921 — 01 sits at the right. */
const STEPS = [
  {
    icon: "/icons/ventures/idea.svg",
    title: "الاكتشاف والتحقق",
    text: "بحث السوق، توافق المؤسسين، والتحقق من ملاءمة المشكلة والحل من خلال النماذج الأولية السريعة.",
  },
  {
    icon: "/icons/ventures/step-build.svg",
    title: "البناء والاختبار",
    text: "تطوير مرن، إطلاق المنتج الأدنى، حلقات تغذية راجعة من المستخدمين، وتحسين المنتج بشكل تكراري.",
  },
  {
    icon: "/icons/ventures/step-market.svg",
    title: "الذهاب إلى السوق",
    text: "تحديد المواقع الاستراتيجية، اكتساب العملاء المبكر، قنوات التوزيع، والجر المبكر.",
  },
  {
    icon: "/icons/ventures/growth.svg",
    title: "التوسع والتحسين",
    text: "أنظمة النمو، التميز التشغيلي، التحضير لجمع التبرعات، وتحسين الأداء.",
  },
];

/* Figma 4037:5246 — a 2 x 2 grid read right to left, row by row. */
const VALUES = [
  {
    icon: "/icons/ventures/risk.svg",
    title: "تخفيف المخاطر",
    text: "تقليل مخاطر الفشل من خلال التحقق المنهجي، والقرارات المستندة إلى البيانات، والتكرار المستمر.",
  },
  {
    icon: "/icons/ventures/speed.svg",
    title: "السرعة إلى السوق",
    text: "أطلق أسرع مع أطرنا المثبتة، والبنية التحتية الجاهزة، وفريقنا المخصص.",
  },
  {
    icon: "/icons/ventures/network.svg",
    title: "الشبكة والموارد",
    text: "الوصول إلى شبكتنا الواسعة من المرشدين، والمستثمرين، والشركاء، والخبراء في الصناعة.",
  },
  {
    icon: "/icons/ventures/growth.svg",
    title: "نمو قابل للتوسع",
    text: "ابنِ على أسس متينة مع بنية تحتية قابلة للتوسع، وعمليات محسّنة، وأنظمة نمو.",
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
              ترانسفورمكس حيث يتم تصميم الشركات الناشئة
            </h1>
            <p className={styles.heroText}>
              ترانسفورمكس للمشاريع يبني ويطور الشركات الناشئة التكنولوجية بشكل منهجي
              من خلال دمج الانضباط الهندسي مع سرعة ريادة الأعمال.
            </p>
            <div className={styles.heroActions}>
              <PillButton className={styles.apply}>قدم طلبك الان</PillButton>
              <PillButton variant="outline" href="/contact" className={styles.contact}>
                تواصل معنا
              </PillButton>
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
              مصمم للمؤسسين و مدعوم بالأنظمة
            </Reveal>
            <Reveal as="p" className={styles.lead} delay={80}>
              نحن نفكر بشكل منهجي، نبني، ونتوسع في الشركات الناشئة من خلال دمج
              الانضباط الهندسي مع سرعة ريادة الأعمال.
            </Reveal>
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
                اختر مسارك المناسب لشركتك
              </Reveal>
              <Reveal as="p" className={styles.lead} delay={80}>
                نماذج التفاعل المرنة مصممة لتحقيق أقصى تأثير
              </Reveal>
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
                  <h3>نموذج التأسيس المشترك</h3>
                  <p>
                    تعاون مع مؤسسين استثنائيين من اليوم الأول. نصبح شريكك المؤسس،
                    نقدم ليس فقط رأس المال ولكن أيضًا مشاركة عميقة في العمليات عبر
                    المنتج والتكنولوجيا والتسويق والعمليات.
                  </p>
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
              كيف نبني المشاريع
            </Reveal>
            <Reveal as="p" className={styles.lead} delay={80}>
              نهج منهجي من الفكرة إلى التوسع
            </Reveal>
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
              قيمتنا تتجاوز حدود البناء
            </Reveal>
            <Reveal as="p" className={styles.lead} delay={80}>
              نحن نجمع بين التميز الهندسي والمرونة الريادية لبناء مشاريع تدوم.
            </Reveal>
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
            <h2 id="ventures-cta-heading">هل أنت مستعد لبناء مشروعك؟</h2>
            <p>
              سواء كنت مؤسسًا بفكرة أو رائد أعمال جاهز للتوسع، دعنا نستكشف كيف يمكن
              لاستوديو ترانسفورمكس للمشاريع مساعدتك على النجاح.
            </p>
            <PillButton variant="outline" className={styles.ctaButton}>
              قدم طلب الان
              <Image className={styles.ctaArrow} src="/icons/ventures/cta-arrow.svg" alt="" width={20} height={20} />
            </PillButton>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
