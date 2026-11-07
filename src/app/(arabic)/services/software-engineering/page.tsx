import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { ServiceAction } from "@/components/services/ServiceAction";
import { kit } from "@/components/services/ServiceKit";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { EXTRA_SERVICES, getServiceWebsite } from "@/lib/serviceNavigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "هندسة البرمجيات وتطوير الحلول المخصصة | Transformix",
  description:
    "خدمات هندسة البرمجيات وتطوير الحلول الرقمية، من بناء الأنظمة والتطبيقات المخصصة إلى تطوير المنتجات والمنصات الرقمية وتشغيلها.",
};

const MOBILE_WEBSITE = EXTRA_SERVICES.find((service) => service.key === "mobile")!.website;

/* Figma 4412:7825 — the six capabilities. The two with sites of their own
   (mobile apps, web) lead there; the others open the project form. */
const CAPABILITIES: readonly { title: string; text: string; image: string; href?: string }[] = [
  {
    title: "الأنظمة والبرمجيات المخصصة",
    text: "نصمم ونطور الأنظمة المؤسسية والبرمجيات المخصصة وفق طبيعة العمليات ومتطلبات الأعمال، بما يشمل بوابات العملاء والشركاء، وتطبيقات إدارة العمليات، ولوحات التحكم، والأنظمة متعددة المستخدمين.",
    image: "/images/services/software/service-1.jpg",
  },
  {
    title: "تطبيقات الهواتف الذكية",
    text: "نصمم ونطور تطبيقات iOS وAndroid، باستخدام التطوير الأصلي (Native) أو متعدد المنصات (Cross-Platform)، مع ربط التطبيقات بالأنظمة المؤسسية وقواعد البيانات والخدمات الرقمية.",
    image: "/images/services/software/service-2.jpg",
    href: MOBILE_WEBSITE,
  },
  {
    title: "هندسة المنتجات الرقمية",
    text: "نشارك المؤسسات وشركات التقنية ورواد الأعمال في تطوير المنتجات الرقمية، من تصميم البنية التقنية وبناء النماذج الأولية، إلى تطوير النسخ التشغيلية وإطلاقها وتحسينها. يشمل ذلك نماذج White-Label وشراكات التطوير التقني.",
    image: "/images/services/software/service-3.jpg",
  },
  {
    title: "تكامل الأنظمة وتحديث التطبيقات",
    text: "نطور واجهات البرمجة والتكاملات بين الأنظمة والتطبيقات، ونعمل على تحديث البرمجيات القائمة وتحسين أدائها. تشمل أعمالنا ربط التطبيقات بأنظمة ERP وCRM والمنصات الخارجية مع الاستفادة من المكونات القائمة.",
    image: "/images/services/software/service-4.jpg",
  },
  {
    title: "الاختبار والجودة والدعم المستمر",
    text: "نقدم خدمات اختبار البرمجيات وضمان الجودة، ومعالجة العيوب، وإدارة التحديثات، والصيانة والتطوير المستمر، وفق متطلبات المشروع ومستويات الخدمة المتفق عليها.",
    image: "/images/services/software/service-5.jpg",
  },
  {
    title: "المنصات وتطبيقات الويب",
    text: "نطور منصات الويب والتطبيقات الرقمية، بدءًا من تصميم الواجهات وتجربة المستخدم وحتى بناء الأنظمة الخلفية وقواعد البيانات ولوحات الإدارة. تشمل قدراتنا تطوير المنصات متعددة المستخدمين والخدمات الإلكترونية والتطبيقات السحابية والتكاملات المرتبطة بها.",
    image: "/images/services/software/service-6.jpg",
    href: getServiceWebsite("web"),
  },
];

/* Figma 4365:11525 — the ways of working, right to left. */
const MODELS = [
  { title: "شريك تطوير برمجي", text: "تنفيذ مشروعات كاملة لشركات التكنولوجيا وشركاء الأعمال، بما يشمل White-Label." },
  { title: "فرق هندسية مخصصة", text: "متخصصون وفرق تطوير تعمل مع فريق العميل أو تحت قيادته وفق احتياجات المشروع." },
  { title: "تطوير مشروع متكامل", text: "من تحديد المتطلبات والتصميم الهندسي وحتى التطوير والاختبار والتسليم، وفق نطاق محدد." },
  { title: "التطوير والدعم المستمر", text: "صيانة وتطوير وتحديثات مستمرة ضمن اتفاقيات تشغيل ودعم." },
] as const;

/* Figma 4409:3296 — right to left. Each icon keeps its own drawn size inside
   the 64px slot. */
const TECHNOLOGIES = [
  { icon: "research", width: 51.8188, height: 53, title: "البحث والتطوير", text: "نماذج أولية واختبار أفكار وحلول جديدة." },
  { icon: "creative", width: 45, height: 54, title: "التصميم والإبداع", text: "تجربة المستخدم والواجهات والهوية الرقمية." },
  { icon: "software", width: 65, height: 49.0007, title: "أنظمة المؤسسات", text: "تكامل البرمجيات مع أنظمة ERP وCRM." },
  { icon: "ai", width: 57, height: 57, title: "الذكاء الاصطناعي وعلوم البيانات", text: "دمج التحليلات والوكلاء الأذكياء داخل التطبيقات." },
] as const;

/* Figma 4409:3332 */
const QUESTIONS = [
  {
    question: "هل تقدم ترانسفورمكس تطوير برمجيات مخصصة بالكامل؟",
    answer: "نعم. نطور أنظمة ومنصات وتطبيقات جديدة وفق متطلبات العميل، كما نعمل على تطوير البرمجيات القائمة وتحديثها.",
  },
  {
    question: "هل يمكن لشركة برمجيات الاستعانة بترانسفورمكس لتنفيذ مشروعات عملائها؟",
    answer: "نعم. يمكننا العمل كشريك تطوير تقني، وتنفيذ مشروعات كاملة أو مكونات محددة، بما في ذلك نموذج White-Label.",
  },
  {
    question: "هل يمكن تطوير جزء من نظام قائم دون استبداله؟",
    answer: "نعم، بعد مراجعة النظام الحالي وتحديد إمكانات التعديل والتكامل والقيود التقنية.",
  },
  {
    question: "هل تقدمون الصيانة والدعم بعد إطلاق المشروع؟",
    answer: "نعم. يمكن الاتفاق على الصيانة والتحديثات والتطوير المستمر وفق نطاق ومستويات خدمة محددة.",
  },
  {
    question: "هل يمكن توفير فريق هندسي للعمل مع فريقنا الحالي؟",
    answer: "نعم. نوفر فرقًا ومتخصصين وفق نموذج عمل متفق عليه، سواء لمشروع محدد أو تعاون مستمر.",
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
              هندسة البرمجيات وتطوير الحلول المخصصة
            </Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              تقدم ترانسفورمكس خدمات هندسة البرمجيات وتطوير الحلول الرقمية، من بناء الأنظمة والتطبيقات
              المخصصة إلى تطوير المنتجات والمنصات الرقمية وتشغيلها. نجمع الخبرات الهندسية وتصميم تجربة
              المستخدم وتكامل الأنظمة، مع توظيف الذكاء الاصطناعي والتكنولوجيا الحديثة وفق طبيعة المشروع.
            </Reveal>
            <Reveal delay={160}>
              <ServiceAction className={`${styles.pill} ${styles.pillLight} ${styles.heroButton}`}>
                ناقش مشروعك معنا
              </ServiceAction>
            </Reveal>
          </div>
        </section>

        <section className={styles.capabilities} aria-labelledby="software-capabilities-heading">
          <Reveal className={styles.intro}>
            <h2 id="software-capabilities-heading" className={kit.title}>
              خدمات هندسة البرمجيات
            </h2>
            <p className={kit.lead}>خدمات متخصصة لبناء البرمجيات وتطويرها وصيانتها بما يتناسب مع احتياجات الأعمال.</p>
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
                    تعرّف على الخدمة
                  </ServiceAction>
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
              كيف نعمل معك؟
            </h2>
            <p className={kit.lead}>نختار نموذج التنفيذ وفق طبيعة المشروع وحجم الفريق ومسؤوليات كل طرف.</p>
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
              تقنيات تدعم تطوير منتجاتك
            </h2>
            <p className={`${kit.lead} ${styles.techLead}`}>
              نستخدم تقنيات وأطر تطوير متعددة وفق متطلبات المشروعات، تشمل Flutter وNext.js وPython و.NET
              وDocker، إلى جانب قواعد البيانات وأدوات التكامل والنشر. كما نوظف قدرات الذكاء الاصطناعي
              والأتمتة وعلوم البيانات داخل التطبيقات عند الحاجة. حلول مترابطة ضمن منظومة ترانسفورمكس.
            </p>
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
            طوّر مشروعك مع ترانسفورمكس
          </Reveal>
          <Reveal as="p" className={styles.closingText} delay={80}>
            سواء كنت تطور منتجًا رقميًا جديدًا، أو توسع قدرات أنظمتك الحالية، أو تبحث عن شريك هندسي لتنفيذ
            مشروعاتك، توفر ترانسفورمكس الخبرات التقنية ونماذج التعاون المناسبة لأعمالك.
          </Reveal>
          <Reveal delay={160}>
            <ServiceAction className={`${styles.pill} ${styles.pillLight}`}>تعرّف على الخدمة</ServiceAction>
          </Reveal>
        </section>

        <section className={styles.faq} aria-labelledby="software-faq-heading">
          <Reveal as="h2" id="software-faq-heading" className={kit.title}>
            الأسئلة الشائعة
          </Reveal>
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
