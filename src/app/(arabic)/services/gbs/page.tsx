import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { ServiceAction } from "@/components/services/ServiceAction";
import {
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
  title: "Transformix GBS — خدمات الأعمال التقنية | Transformix",
  description:
    "ننفّذ المشروعات التقنية لصالح شركات التكنولوجيا وشركائها، ونتولى تطوير الأنظمة وتشغيلها وصيانتها وإدارة العمليات الرقمية للمؤسسات.",
};

const pad = (index: number) => String(index + 1).padStart(2, "0");

/* Figma 4431:12507 — who the services are for, in reading order (right
   column first). Each call opens the project form. */
const AUDIENCES = [
  {
    title: "شركات التكنولوجيا والبرمجيات",
    text: "تنفيذ المشروعات أو أجزاء منها، بما يشمل التطوير والتكامل والاختبار والصيانة والدعم. يمكن العمل بنموذج White-Label تحت علامة الشريك وفق اتفاق واضح.",
    cta: "ناقش احتياجات التنفيذ",
  },
  {
    title: "الشركات والمؤسسات",
    text: "نطوّر أنظمة ERP وCRM المرتبطة بعملياتك، ثم نشغّل التطبيقات والمعاملات والفواتير والطلبات والبيانات بشكل مستمر ضمن نطاق متفق عليه.",
    cta: "استكشف تشغيل أعمالك",
  },
  {
    title: "الأعمال الرقمية والتجارة الإلكترونية",
    text: "دعم تقني وتشغيلي للمتاجر والمنصات، يشمل الصيانة والمحتوى والطلبات والفواتير والحملات والتكاملات، لتعمل تجربة البيع والخدمة بصورة مترابطة.",
    cta: "ناقش تشغيل منصتك",
  },
  {
    title: "المؤسسات ذات الفرق التقنية الداخلية",
    text: "إدارة الفرق الموجودة بالفعل وقيادة تقنية جزئية، ومراجعات دورية للحلول والمشروعات واستشارات متخصصة دون الحاجة إلى تعيين إدارة تقنية كاملة.",
    cta: "ناقش القيادة التقنية",
  },
] as const;

/* Figma 4431:12576 — the five service groups. */
const SERVICES: readonly Detail[] = [
  {
    title: "تعهيد تنفيذ المشروعات التقنية",
    text: "ننفّذ البرمجيات والتطبيقات والمنصات والتكاملات والاختبارات، ونطوّر مكونات محددة لصالح شركات التكنولوجيا وشركائها والمؤسسات. نعمل عبر مشروعات محددة أو فرق مستمرة، وبالعلامة التجارية للشريك عند الاتفاق.",
    image: "/images/services/gbs/service-1.jpg",
    shade: 0.34,
    height: 264,
  },
  {
    title: "إدارة وتشغيل التقنية",
    text: "نتولى صيانة المواقع والتطبيقات والأنظمة وتحديثها وتشغيلها، بما يشمل الدعم والتكاملات والاختبارات والتعامل مع الحوادث ومتابعة الأداء. نعمل كفريق خارجي أو امتداد لفريقك الحالي.",
    image: "/images/services/gbs/service-2.jpg",
    shade: 0.36,
    height: 264,
  },
  {
    title: "إدارة وتشغيل عمليات الأعمال",
    text: "نشغّل العمليات داخل أنظمة ERP وCRM: الفواتير والطلبات والسجلات والمخزون والبيانات والدعم الإداري والمحاسبي، وفق الصلاحيات والضوابط المعتمدة لدى العميل.",
    image: "/images/services/gbs/service-3.jpg",
    height: 234,
  },
  {
    title: "تشغيل التجارة والأعمال الرقمية",
    text: "ندير تشغيل المتاجر والمنصات والحجوزات والمنتجات والمحتوى والطلبات والدعم والحملات والتقارير. نربط المدفوعات والمخزون والمحاسبة والشحن وفق احتياجات العمل.",
    image: "/images/services/gbs/service-4.jpg",
    shade: 0.42,
    height: 234,
  },
  {
    title: "القيادة والاستشارات التقنية",
    text: "ندير فرق التقنية لدى العميل ونتابع الموردين والمشروعات، ونراجع المعمارية والأداء وخطط التطوير. نوفر قيادة خارجية أو Fractional CTO أو استشارات دورية حسب الحاجة.",
    image: "/images/services/gbs/service-5.jpg",
    shade: 0.3,
    height: 234,
  },
];

/* Figma 4431:12652 — the four ways of working, right to left. */
const MODELS = [
  { title: "مشروع محدد", text: "نطاق واضح ومخرجات محددة وجدول زمني متفق عليه." },
  { title: "فريق مخصص", text: "متخصصون يعملون على أولوياتك، بينما يوجّه فريقك العمل." },
  { title: "خدمة مُدارة", text: "خدمة متكاملة بمخرجات وأداء ومستويات خدمة متفق عليها." },
  { title: "قيادة تقنية جزئية", text: "إدارة الفريق ومراجعة الخطط بشكل دوري دون قائد متفرغ." },
] as const;

/* Figma 4431:12674 — the dedicated team beside the managed service. */
const COMPARISON = [
  {
    en: "DEDICATED TEAM",
    title: "الفريق المخصص",
    rows: [
      { label: "ما الذي تحصل عليه؟", text: "وقت وخبرة فريق من المتخصصين." },
      { label: "من يدير الأولويات؟", text: "أنت أو فريقك تحددون الأولويات وتوجّهون العمل." },
      { label: "ما دورنا؟", text: "توفير الكفاءات وتنسيق الموارد وفق العقد." },
      { label: "مثال للتعاون", text: "مطوران يعملان ضمن فريق شركة برمجيات." },
    ],
  },
  {
    en: "MANAGED SERVICE",
    title: "الخدمة المُدارة",
    rows: [
      { label: "ما الذي تحصل عليه؟", text: "خدمة ومخرجات ومستوى أداء متفق عليه." },
      { label: "من يدير العمل اليومي؟", text: "ترانسفورمكس تدير التشغيل اليومي للخدمة." },
      { label: "ما دورنا؟", text: "التنفيذ والمتابعة والتحسين والتصعيد عند الحاجة." },
      { label: "مثال للتعاون", text: "إدارة شهرية للتجارة الإلكترونية تشمل الصيانة والتشغيل." },
    ],
  },
] as const;

/* Figma 4431:12712 */
const REASONS = [
  {
    title: "خبرات هندسية وتشغيلية في منظومة واحدة",
    text: "نجمع تطوير البرمجيات والتطبيقات وأنظمة المؤسسات والتجارة الإلكترونية وعمليات الأعمال؛ لا نكتفي بتوفير أفراد، بل نربط الخبرة التقنية بالتشغيل.",
  },
  {
    title: "مرونة في الحجم والمسؤولية",
    text: "ابدأ بنطاق صغير ثم توسّع إلى تعاون مستمر أو إدارة كاملة للخدمة. يتطور حجم الفريق ومسؤولياته مع احتياج العمل.",
  },
  {
    title: "نبدأ بأنظمتك الحالية",
    text: "نراجع التقنيات والعمليات القائمة لتحديد فرص الدعم والتكامل والتحسين، دون افتراض أن استبدال النظام هو الحل الأول.",
  },
  {
    title: "تشغيل قائم على الحوكمة والأداء",
    text: "صلاحيات ومخرجات وتوثيق ومستويات خدمة وتقارير واضحة؛ مع استخدام الأتمتة والذكاء الاصطناعي عندما يكونان مناسبين.",
  },
] as const;

/* Figma 4431:12772 */
const SECTORS = [
  { title: "التكنولوجيا والبرمجيات", text: "تنفيذ المشروعات والاختبار والدعم وتوفير الفرق المتخصصة." },
  { title: "الجمعيات والمؤسسات", text: "إدارة العضويات والمنصات والعمليات الإدارية." },
  { title: "التجارة الإلكترونية والتجزئة", text: "تشغيل المتاجر والطلبات والمنتجات والدعم الرقمي." },
  { title: "العقارات والمرافق", text: "المنصات والطلبات والتذاكر والبيانات التشغيلية." },
  { title: "التجارة والتوزيع", text: "الأنظمة والمشتريات والمخزون والفواتير." },
  { title: "السياحة والضيافة والحجوزات", text: "التوافر والأنظمة والعمليات الرقمية المرتبطة بالخدمة." },
] as const;

/* Figma 4431:12858 */
const STEPS = [
  { title: "نفهم المطلوب", text: "نراجع نطاق العمل والأنظمة الحالية." },
  { title: "نختار النموذج", text: "مشروع أو فريق أو خدمة مُدارة أو قيادة جزئية." },
  { title: "نحدد الاتفاق", text: "الأدوار والمخرجات والتوقيت ومستويات الخدمة." },
  { title: "نبدأ التنفيذ", text: "الفرق والأدوات ونقل المعرفة والتكامل." },
  { title: "نتابع الأداء", text: "نراجع النتائج وفرص التحسين." },
] as const;

/* Figma 4431:12904 */
const QUESTIONS = [
  {
    question: "هل تعمل ترانسفورمكس مع شركات تكنولوجيا أخرى؟",
    answer: "نعم. ننفّذ مشروعات كاملة أو أجزاء منها، ونوفر فرقًا متخصصة وخدمات الصيانة والدعم، بما في ذلك العمل بنموذج White-Label وفق اتفاق واضح.",
  },
  {
    question: "هل يمكنكم أن تكونوا فريق التقنية الخارجي لشركتنا؟",
    answer: "نعم. نتولى تطوير التطبيقات والمواقع والأنظمة وتشغيلها ودعمها ضمن نطاق مسؤوليات ومستويات خدمة متفق عليها.",
  },
  {
    question: "هل يمكنكم إدارة فريق التقنية الموجود بالفعل لدينا؟",
    answer: "نعم. نوفر قيادة تقنية خارجية أو جزئية، مع الإشراف على الفرق والموردين ومراجعة الحلول والمشروعات ووضع خطط التطوير.",
  },
  {
    question: "هل تقدمون خدمات تشغيل ERP وعمليات المحاسبة والفواتير؟",
    answer: "نهيّئ الأنظمة ونشغّل العمليات المتفق عليها، بما يشمل دعم المحاسبة والفواتير والطلبات والبيانات. تبقى المسؤوليات النظامية والاعتمادات لدى الأطراف المخوّلة، وفق صلاحيات وضوابط العميل.",
  },
  {
    question: "ما الفرق بين الفريق المخصص والخدمة المُدارة؟",
    answer: "في الفريق المخصص، تدير أنت أو فريقك أولويات المتخصصين وعملهم. في الخدمة المُدارة، تتولى ترانسفورمكس إدارة الخدمة ومخرجاتها وأدائها وفق ما يتم الاتفاق عليه.",
  },
  {
    question: "هل يمكن البدء بمشروع واحد ثم الانتقال إلى تشغيل مستمر؟",
    answer: "نعم. يمكن البدء بمشروع محدد، ثم الانتقال إلى التشغيل أو الصيانة أو الدعم المستمر، أو توسيع نطاق التعاون تدريجيًا.",
  },
  {
    question: "كيف يتم تحديد تكلفة التعاون؟",
    answer: "وفق نطاق العمل وحجم الفريق أو المخرجات المطلوبة، والتغطية التشغيلية والأنظمة والتكاملات ومستويات الخدمة. يُحدّد النموذج والتكلفة ضمن اتفاق يناسب احتياجات التعاون.",
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
          title="فريق التقنية والتشغيل الذي يعمل مع أعمالك"
          text="ننفّذ المشروعات التقنية لصالح شركات التكنولوجيا وشركائها، ونتولى تطوير الأنظمة وتشغيلها وصيانتها وإدارة العمليات الرقمية للمؤسسات. نعمل كفريقك التقني الخارجي، أو كامتداد لفريقك الحالي، أو كشريك مسؤول عن تشغيل خدمة متكاملة."
          actions={[
            { label: "ناقش نموذج التعاون المناسب" },
            { label: "استكشف خدمات GBS", href: "#services" },
          ]}
        />

        <section className={kit.section} aria-labelledby="gbs-audiences-heading">
          <SectionIntro
            id="gbs-audiences-heading"
            title="لمن نقدم خدمات GBS؟"
            text="نكيّف خدماتنا وفق ما تحتاجه: تنفيذ مشروع، أو قدرة مستمرة، أو خدمة مُدارة متكاملة، أو قيادة فريقك التقني الحالي."
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
            title="خدمات GBS"
            center
            text={
              <>
                <p>
                  خمس مجموعات من الخدمات، منظّمة حول الأعمال التي ترغب في إسنادها. يمكن دمجها ضمن اتفاق
                  واحد يجمع التنفيذ والتشغيل والقيادة.
                </p>
                <p>
                  <strong>التكنولوجيا جزء من نموذج التشغيل</strong>{" "}
                  حيث نوظّف أنظمة ERP وCRM والسحابة وأدوات التعاون والبيانات والأتمتة والذكاء الاصطناعي
                  حيث تضيف قيمة فعلية للعمل. ونحدّد حماية البيانات والحوكمة ومسؤوليات الأطراف ضمن نموذج
                  التشغيل، لا باعتبارها إضافات منفصلة.
                </p>
              </>
            }
          />
          <DetailList items={SERVICES} />
        </section>

        <section className={`${kit.section} ${kit.tinted}`} aria-labelledby="gbs-models-heading">
          <SectionIntro id="gbs-models-heading" title="كيف يمكن أن نعمل مع شركتك؟" />
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
            title="فريق مخصص أم خدمة مُدارة؟"
            text="الاختيار لا يتعلق بحجم الفريق فقط؛ بل بمن يدير الأولويات ومن يتحمل مسؤولية التشغيل والنتائج."
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
          <SectionIntro id="gbs-why-heading" title="لماذا Transformix GBS؟" center />
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
            title="القطاعات التي نخدمها"
            text="أمثلة للقطاعات ونطاقات التعاون التي يمكن أن ندعمها، وليست قائمة بعملاء أو نتائج مشروعات."
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
            <SectionIntro id="gbs-process-heading" title="من تحديد المطلوب إلى التشغيل" />
            <ProcessSteps steps={STEPS} />
          </section>

          <section className={kit.section} aria-labelledby="gbs-faq-heading">
            <SectionIntro id="gbs-faq-heading" eyebrow="FREQUENTLY ASKED QUESTIONS" title="الأسئلة الشائعة" />
            <FaqList items={QUESTIONS} />
          </section>
        </div>

        <section className={kit.section} aria-labelledby="gbs-insight-heading">
          <SectionIntro id="gbs-insight-heading" title="فكرة أعمق عن اقتصاديات التشغيل" />
          <Reveal as="article" className={styles.insight}>
            <h3 className={kit.cardTitle}>
              التعهيد الخارجي والخدمات المشتركة: إعادة تصميم تكلفة التشغيل وتعزيز مرونة الأعمال
            </h3>
            <p className={kit.cardText}>
              لم تعد المسألة خفض المصروفات وحده، بل القدرة على إعادة توزيع الموارد، وتوسيع الفرق أو
              تقليصها، والحفاظ على الكفاءات دون الالتزام بهياكل ثابتة يصعب تعديلها عندما تتغير الأسواق.
              السؤال أمام الإدارة اليوم…{" "}
              <Link href="/community/insights" className={styles.readMore}>
                قراءة المزيد
              </Link>
            </p>
          </Reveal>
        </section>

        <Closing
          id="gbs-closing-heading"
          eyebrow="START A CONVERSATION"
          title="تعاون تقني وتشغيلي يناسب أعمالك"
          text="سواء كنت شركة تكنولوجيا تبحث عن شريك تنفيذ، أو مؤسسة تحتاج فريقًا خارجيًا، أو مشروعًا رقميًا يحتاج تشغيلًا متكاملًا؛ نختار النموذج وفق أهدافك وأنظمتك واحتياجاتك. خبرات وفرق عبر مصر والسعودية والإمارات، وتنفيذ عن بُعد وموزّع وفق الاتفاق."
          actions={[{ label: "ناقش نموذج التعاون المناسب" }]}
        />
      </main>
      <Footer />
    </>
  );
}
