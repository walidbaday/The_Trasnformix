import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
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
} from "@/components/services/ServiceKit";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "خدمات Odoo المتخصصة | Transformix",
  description:
    "حلول أودو تتوافق مع طريقة عمل مؤسستك: تنفيذ وتخصيص وتكامل وتحديث ودعم، مع حلول قطاعية للسياحة والمقاولات والوساطة.",
};

/* Figma 4431:13046 — the five services. Only the first row has a photo on
   the artboard; the others keep its pale panel. */
const SERVICES: readonly Detail[] = [
  {
    title: "تنفيذ أنظمة ERP وإدارة علاقات العملاء",
    text: "نربط المالية والمشتريات والمخزون والمبيعات وعلاقات العملاء بإجراءات مؤسستك. نحدّد التطبيقات والصلاحيات والبيانات والتدريب وفق نطاق المشروع، لتصبح الأنظمة جزءًا من العمل اليومي.",
    image: "/images/services/odoo/erp-crm.jpg",
    shade: 0.37,
  },
  {
    title: "تطوير وتخصيص أودو",
    text: "نطوّر الوحدات والوظائف ومسارات الاعتماد والتقارير والواجهات والصلاحيات، بما يتناسب مع احتياجات العمل ونطاق التطوير المتفق عليه.",
  },
  {
    title: "تكامل الأنظمة والأتمتة الذكية",
    text: "نربط أودو بمتاجر التجارة الإلكترونية ومنصات الحجوزات والتطبيقات والخدمات الخارجية، ونوظّف الأتمتة والذكاء الاصطناعي عندما يقدّمان قيمة تشغيلية فعلية.",
  },
  {
    title: "تحديث الأنظمة وترحيلها",
    text: "نراجع الإصدار الحالي والتخصيصات والبيانات والتكاملات، ونضع خطة للتحديث والاختبار والترحيل تراعي استمرارية العمل والتوافق التقني.",
  },
  {
    title: "الدعم والتطوير المستمر",
    text: "دعم وصيانة وتحديثات وتطوير للتقارير والتكاملات وفق احتياجات المؤسسة. ويمكن توسيع التعاون إلى تشغيل عمليات الأعمال من خلال Transformix GBS.",
  },
];

/* Figma 4431:13121 — the industry foundations. */
const INDUSTRIES = [
  {
    title: "أودو للسياحة",
    text: "أساس متكامل لإدارة الأنشطة والأعمال السياحية، قابل للتهيئة وفق الخدمات والإجراءات والعلاقات التجارية والتكاملات الخاصة بمؤسستك.",
    image: "/images/services/odoo/tourism.jpg",
  },
  {
    title: "أودو للمقاولات",
    text: "نظام مؤسسي مع تطويرات متخصصة في المقاولات؛ تُهيّأ الوظائف والإجراءات والتقارير والتكاملات بما يتوافق مع المشروعات وطبيعة الشركة.",
    image: "/images/services/odoo/contracting.jpg",
  },
  {
    title: "أودو لشركات الوساطة",
    text: "إدارة العلاقات والمعاملات وإجراءات الوساطة وربطها بالتطبيقات المؤسسية، مع تطويرات تتوافق مع طبيعة نشاط الشركة.",
    image: "/images/services/odoo/brokerage.jpg",
  },
] as const;

/* Figma 4431:13163 — the two editions, right to left. */
const EDITIONS = [
  {
    name: "Odoo Community",
    title: "نسخة مفتوحة المصدر",
    text: "تنفيذ الوحدات والتكاملات اللازمة ضمن إمكانات النسخة، مع التهيئة والتطوير وفق الوظائف التي تحتاجها أعمالك.",
  },
  {
    name: "Odoo Enterprise",
    title: "نسخة مرخّصة وفق احتياجات المؤسسة",
    text: "الاستفادة من التطبيقات المتاحة ضمن التراخيص، مع خدمات التنفيذ والتطوير والتكامل والترحيل والتدريب والدعم وفق المشروع.",
  },
] as const;

/* Figma 4431:13181 */
const STEPS = [
  { title: "تحليل الأعمال", text: "فهم الإجراءات والبيانات والاحتياجات." },
  { title: "تصميم الحل", text: "تحديد التطبيقات والتكاملات وخطة التنفيذ." },
  { title: "التهيئة والتطوير", text: "تهيئة النظام وتطوير الوظائف المطلوبة." },
  { title: "الاختبار والإطلاق", text: "التحقق والتدريب وبدء التشغيل." },
  { title: "الدعم والتحسين", text: "المتابعة والتحديث والتوسع." },
] as const;

/* Figma 4431:13232 — right to left. */
const TOPICS = ["تحسين إجراءات العمل", "الأتمتة وتكامل البيانات", "تحديثات أودو وتوافق الأنظمة"] as const;

/* Figma 4431:13257 */
const QUESTIONS = [
  {
    question: "هل يمكن تنفيذ Odoo وفق طبيعة أعمال مؤسستنا؟",
    answer: "نعم. نهيّئ التطبيقات ونطوّر الوظائف والتكاملات وفق احتياجات مؤسستك، مع توضيح ما يمكن تنفيذه بالإمكانات القياسية وما يتطلب تطويرًا مخصصًا.",
  },
  {
    question: "هل تعمل ترانسفورمكس على Odoo Community وEnterprise؟",
    answer: "نعم. نقدم التنفيذ والتخصيص والتكامل والدعم للنسختين، وفق نطاق المشروع وإمكانات النسخة والتراخيص المطلوبة.",
  },
  {
    question: "هل لديكم حلول قطاعية جاهزة؟",
    answer: "لدينا أسس حلول متخصصة للسياحة والمقاولات وشركات الوساطة، قابلة للتهيئة والتوسع وفق الإجراءات والمتطلبات الخاصة بكل مؤسسة.",
  },
  {
    question: "هل يمكن تحديث نظام Odoo الحالي؟",
    answer: "نراجع الإصدار والتخصيصات والبيانات والتكاملات أولًا، ثم نحدّد متطلبات التحديث والتوافق والترحيل وخطة الاختبار المناسبة.",
  },
  {
    question: "هل يمكن ربط Odoo بمنصات أخرى؟",
    answer: "نعم، وفق واجهات الربط المتاحة ومتطلبات الأمان والتشغيل؛ بما يشمل منصات التجارة والحجوزات والتطبيقات والخدمات الخارجية.",
  },
  {
    question: "هل تقدمون الدعم بعد الإطلاق؟",
    answer: "يمكن الاتفاق على الصيانة والدعم والتطوير المستمر، أو توسيع النطاق إلى تشغيل مُدار أشمل وفق احتياجات المؤسسة.",
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
          title="حلول أودو تتوافق مع طريقة عمل مؤسستك"
          text="اربط إدارة الموارد والعمليات وعلاقات العملاء ضمن بيئة مؤسسية تتطور مع أعمالك. سواء بدأت التنفيذ لأول مرة، أو حدّثت نظامًا قائمًا، أو احتجت حلًا قطاعيًا؛ نُنفّذ ونُخصّص ونربط أودو وفق عملياتك وخطط نموك."
          actions={[{ label: "ناقش مشروعك" }, { label: "الحلول القطاعية", href: "#industries" }]}
          labels="Industry Solutions  /  Customization  /  Implementation  /  Community & Enterprise"
        />

        <section className={`${kit.tinted} ${styles.expertise}`} aria-label="خبرة ترانسفورمكس في أودو">
          <Reveal as="p" className={kit.lead}>
            نجمع خبرة Odoo Community وOdoo Enterprise مع فهم العمليات وهندسة البرمجيات والأتمتة الذكية.
            ونقدّم أسس حلول قابلة للتكيّف للسياحة والمقاولات والوساطة، تتطور وفق احتياجات مؤسستك.
          </Reveal>
          <Reveal delay={80}>
            <ActionButton action={{ label: "استكشف خدمات أودو", href: "#services", tone: "primary" }} />
          </Reveal>
        </section>

        <section id="services" className={`${kit.section} ${styles.services}`} aria-labelledby="odoo-services-heading">
          <SectionIntro
            id="odoo-services-heading"
            title="حلول أودو وفق احتياجات أعمالك"
            text="نتعامل مع التطبيقات والبيانات والإجراءات باعتبارها جزءًا من التشغيل اليومي، لا برمجيات منفصلة عن طريقة عمل المؤسسة."
            center
          />
          <Reveal className={styles.center}>
            <ActionButton action={{ label: "ناقش الدعم المُدار", tone: "primary" }} />
          </Reveal>
          <DetailList items={SERVICES} />
        </section>

        <section id="industries" className={`${kit.section} ${kit.tinted}`} aria-labelledby="odoo-industries-heading">
          <SectionIntro
            id="odoo-industries-heading"
            title="حلول متخصصة لقطاعات الأعمال"
            text="أسس حلول مطوّرة تجمع أودو والوظائف القطاعية. نبدأ من قاعدة جاهزة للتهيئة والتوسع بدلًا من إعادة بناء كل شيء من البداية."
          />
          <ul className={styles.industries}>
            {INDUSTRIES.map((industry) => (
              <Reveal as="li" key={industry.title} className={styles.industry}>
                <div className={styles.industryCopy}>
                  <h3 className={kit.cardTitle}>{industry.title}</h3>
                  <p className={kit.cardText}>{industry.text}</p>
                  <div className={styles.industryActions}>
                    <ActionButton action={{ label: "استكشف الحل", tone: "primary" }} />
                    <ActionButton action={{ label: "اطلب عرضًا" }} />
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
            title="النسخة المناسبة تبدأ من متطلبات مؤسستك"
            text="نقيّم الوظائف والتخصيصات والتكاملات والتكلفة الإجمالية قبل اختيار النسخة أو الترقية، بدلًا من البدء بافتراض واحد لجميع المؤسسات."
            center
          />
          <Reveal className={styles.center}>
            <ActionButton action={{ label: "ناقش اختيار النسخة المناسبة", tone: "primary" }} />
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
            title="من فهم الأعمال إلى التشغيل والتحسين"
            text="تحليل وتطوير واختبار ودعم بمخرجات واضحة ومسؤوليات محددة في كل مرحلة."
            center
          />
          <ProcessSteps steps={STEPS} tall />
        </section>

        <section className={kit.section} aria-labelledby="odoo-insights-heading">
          <SectionIntro
            id="odoo-insights-heading"
            eyebrow="ODOO PROJECTS & INSIGHTS"
            title="خبرات تطبيقية ورؤى متخصصة"
            text="تنعكس خبرتنا في المشروعات والتطبيقات القطاعية والمحتوى المتخصص في تحديثات أودو والأتمتة وتحسين الإجراءات. نبدأ النقاش بما يلائم مؤسستك، ونحدّد معك ما يحتاج إلى تنفيذ أو تطوير أو تكامل."
          />
          <ul className={styles.topics}>
            {TOPICS.map((topic, index) => (
              <Reveal as="li" key={topic} className={styles.topic} delay={index * 60}>
                <h3 className={kit.cardTitle}>{topic}</h3>
                <p className={kit.cardText}>محاور للنقاش حول تطبيق أودو وتطويره في سياق أعمالك.</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className={styles.readiness}>
            <div className={styles.readinessCopy}>
              <p className={kit.eyebrow} lang="en">
                ODOO READINESS ASSESSMENT
              </p>
              <h3 className={kit.title}>تقييم جاهزية أودو</h3>
              <p className={kit.cardText}>
                تقييم أولي للأنظمة الحالية واحتياجات التنفيذ أو التطوير أو التحديث، يساعد على تحديد نطاق العمل
                والخطوات التالية قبل بدء المشروع.
              </p>
            </div>
            <div className={styles.readinessActions}>
              <ActionButton action={{ label: "اطلب تقييم الجاهزية", tone: "primary" }} />
              <ActionButton action={{ label: "ناقش مشروع Odoo" }} />
            </div>
          </Reveal>
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="odoo-faq-heading">
          <SectionIntro id="odoo-faq-heading" eyebrow="FREQUENTLY ASKED QUESTIONS" title="الأسئلة الشائعة" />
          <FaqList items={QUESTIONS} />
        </section>

        <Closing
          id="odoo-closing-heading"
          className={styles.closing}
          eyebrow="BUILD WITH ODOO · GROW WITH TRANSFORMIX"
          title="طوّر نظام أعمالك مع ترانسفورمكس"
          text="سواء كنت تبدأ مع أودو، أو تطوّر نظامًا قائمًا، أو تبحث عن حل قطاعي؛ نساعدك على تحديد نطاق التنفيذ والتخصيص والدعم الذي يناسب مؤسستك."
          actions={[{ label: "ناقش مشروع Odoo" }, { label: "اطلب عرضًا للحلول الجاهزة" }]}
        />
      </main>
      <Footer />
    </>
  );
}
