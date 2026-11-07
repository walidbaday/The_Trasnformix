import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RequestForm, RequestLink } from "@/components/contact/ContactRequest";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { jakarta, tajawal } from "@/lib/fonts";
import { getPartnershipPath, type PartnershipPathId } from "@/lib/partnerships";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "تواصل معنا | Transformix",
  description:
    "نعمل مع الشركات والمؤسسات والشركاء التقنيين على تطوير الحلول الرقمية وتنفيذ مشروعات الذكاء الاصطناعي والبيانات وأنظمة المؤسسات وهندسة البرمجيات وتطوير المنتجات والخدمات الرقمية. ابدأ بمسار التعاون الأقرب إلى هدفك.",
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
    title: "هل تحتاج إلى تطوير حل تقني أو تحديث أنظمتك؟",
    text: "نساعد الشركات على بناء حلول جديدة وتحديث الأنظمة والحصول على خدمات متخصصة في الذكاء الاصطناعي والوكلاء الأذكياء والبيانات، وأنظمة ERP وCRM والتجارة الإلكترونية وتطبيقات الهاتف ومنصات المؤسسات والتحول الرقمي والإداري.",
  },
  {
    type: "technology",
    title: "هل تبحث عن شريك تقني أو استراتيجي؟",
    text: "نتعاون مع شركات التكنولوجيا ومقدمي الحلول والمنصات وشركات الاستشارات وشركاء التنفيذ لتطوير عروض مشتركة، وتبادل الخبرات، وتكامل الحلول وتنفيذ المشروعات عبر الأسواق.",
  },
  {
    type: "regional",
    title: "هل ترغب في تطوير أعمال مشتركة في منطقتك؟",
    text: "نرحب بالشركات ذات الحضور التجاري أو المعرفة القطاعية في الأسواق المحلية والإقليمية، للتعاون في المبيعات وقنوات التوزيع والتنفيذ وتطوير الأعمال والتوسع في أسواق جديدة.",
  },
  {
    type: "outsourcing",
    title: "هل يحتاج فريقك إلى خبرات أو تشغيل مستمر؟",
    text: "نوفر خبرات البرمجيات والذكاء الاصطناعي والبيانات وأنظمة المؤسسات، ودعم التجارة الإلكترونية والحجوزات والمحاسبة والأعمال. اختر متخصصين أو فريقًا مخصصًا أو تنفيذ مشروع أو خدمة مُدارة وفق احتياجاتك.",
  },
  {
    type: "academic",
    title: "هل تمثل جامعة أو مؤسسة تعليمية أو مهنية؟",
    text: "نتعاون مع الجامعات ومراكز الابتكار والمؤسسات المهنية في الأنشطة التقنية التطبيقية والتدريب ومشروعات الطلاب والإرشاد؛ عبر Transformix Academy وTX Community والمحاضرات وورش العمل ومشروعات التخرج.",
  },
  {
    type: "ventures",
    title: "هل لديك منتج رقمي أو مشروع ناشئ؟",
    text: "ندعم الشركات الناشئة وأصحاب المنتجات والفرق المتخصصة في تطوير المنتجات والنماذج الأولية وMVP. يشمل التعاون خدمات تقنية متخصصة أو تطويرًا مشتركًا أو شراكات مختارة للمشروعات، بموجب اتفاق مستقل.",
  },
];

/* Figma 4431:12357 — the requests the form doesn't take, which lead into
   TX Community. Sponsorship goes to its community-impact page, where
   initiatives are proposed. */
const OTHER_WAYS = [
  {
    title: "هل تبحث عن رعاية تقنية لمبادرتك؟",
    text: "يمكن للمؤسسات غير الربحية والمبادرات التقدم بطلب دعم تقني انتقائي، وفق طبيعة المبادرة وفرص الأثر والتعاون.",
    cta: "تقدم بطلب رعاية",
    href: "/community/impact#join",
  },
  {
    title: "هل ترغب في الانضمام إلى المجتمع؟",
    text: "شارك في الأنشطة أو استكشف فرص التعاون كشريك مجتمعي أو ممثل أو سفير ضمن TX Community.",
    cta: "انتقل إلى TX Community",
    href: "/community",
  },
] as const;

/* Figma 4431:12338 — the three offices, right to left. */
const OFFICES = [
  { country: "المملكة العربية السعودية", address: "حي اليقين، حي الخالدية، جدة" },
  {
    country: "الإمارات العربية المتحدة",
    address: "المنطقة الحرة لشركة SPC، E311، طريق الشيخ محمد بن زايد، الزاهية، الشارقة",
  },
  { country: "مصر", address: "شارع عبد العزيز فهمي، الإسكندرية" },
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
              ما الذي يمكن أن نبنيه معًا؟
            </Reveal>
            <Reveal as="p" className={styles.heroText} delay={80}>
              نعمل مع الشركات والمؤسسات والشركاء التقنيين على تطوير الحلول الرقمية وتنفيذ مشروعات
              الذكاء الاصطناعي والبيانات وأنظمة المؤسسات وهندسة البرمجيات وتطوير المنتجات والخدمات
              الرقمية. ابدأ بمسار التعاون الأقرب إلى هدفك.
            </Reveal>
            <Reveal className={styles.heroActions} delay={160}>
              <RequestLink type="business" href={FORM_HREF} className={`${styles.button} ${styles.buttonLight}`}>
                ناقش مشروعك
              </RequestLink>
              <a href="#ways" className={`${styles.button} ${styles.buttonGhost}`}>
                استكشف فرص الشراكة
              </a>
            </Reveal>
          </div>
        </section>

        <section id="ways" className={styles.section} aria-labelledby="contact-ways-heading">
          <Reveal className={styles.intro}>
            <h2 id="contact-ways-heading" className={styles.title}>
              كيف ترغب في التعاون معنا؟
            </h2>
            <p className={styles.lead}>
              من تنفيذ المشروعات والخدمات المتخصصة إلى المنتجات المشتركة والشراكات الاستراتيجية
              والتعاون التعليمي والمهني؛ اختر السؤال الذي يعبّر عن احتياجك.
            </p>
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
                كيف يصل طلبي إلى الفريق المناسب؟
              </h2>
              <p className={styles.lead}>
                كل مسار يقود إلى نموذج طلب موحّد. تتكيف الحقول الإضافية مع نوع الطلب، لتصل المعلومات
                إلى الفريق المناسب دون إعادة إدخالها.
              </p>
            </Reveal>
            <div className={styles.routing}>
              <Reveal className={styles.guidance}>
                <h3 className={styles.guidanceTitle}>طلب واحد، وبداية أوضح</h3>
                <p>
                  أخبرنا عن شركتك والهدف من التواصل. يراجع الفريق المعلومات لتحديد مسار النقاش
                  والمتخصصين المناسبين لطلبك.
                </p>
                <p>
                  أضف ما يتوفر لديك من نطاق العمل أو الأنظمة الحالية أو فكرة الشراكة. لا يلزم أن تكون
                  جميع التفاصيل مكتملة.
                </p>
              </Reveal>
              <RequestForm id={FORM_ID} labelledBy="contact-request-heading" />
            </div>
          </section>

          <section className={styles.section} aria-labelledby="contact-other-heading">
            <Reveal as="h2" id="contact-other-heading" className={styles.title}>
              هل تبحث عن طريق آخر للتواصل؟
            </Reveal>
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
            <h3 className={styles.cardTitle}>كيف تدعمون التوسع الإقليمي؟</h3>
            <p className={styles.cardText}>
              نجمع فرق التنفيذ والمتخصصين والشركاء المحليين لدعم التعاون عبر الأسواق. نرحب بمقترحات
              الأعمال المشتركة والشراكات التي تفتح آفاقًا للتوسع الإقليمي.
            </p>
            <div className={styles.regionalActions}>
              <RequestLink type="regional" href={FORM_HREF} className={`${styles.button} ${styles.buttonPrimary}`}>
                استكشف التعاون الإقليمي
              </RequestLink>
            </div>
          </Reveal>
          <Reveal className={styles.intro}>
            <p className={styles.eyebrow} lang="en">
              REGIONAL PRESENCE
            </p>
            <h2 id="contact-presence-heading" className={styles.title}>
              أين تعمل ترانسفورمكس؟
            </h2>
            <p className={styles.lead}>
              نعمل حاليًا عبر ثلاث مدن في مصر والمملكة العربية السعودية والإمارات العربية المتحدة، مع
              توسيع التعاون عبر المنطقة العربية.
            </p>
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
              ابدأ التواصل معنا
            </h2>
            <p className={styles.closingText}>
              سواء كنت شركة تبحث عن شريك تقني، أو مؤسسة تستكشف تعاونًا استراتيجيًا، أو فريق منتج؛
              شاركنا تفاصيل مشروعك أو مقترحك. يراجع الفريق المعلومات لتوجيه طلبك إلى المسار المناسب.
              تواصل مع ترانسفورمكس لمناقشة مشروعك أو مقترح التعاون.
            </p>
          </Reveal>
          <Reveal className={styles.closingActions} delay={120}>
            <RequestLink type="business" href={FORM_HREF} className={`${styles.button} ${styles.buttonLight}`}>
              ناقش مشروعك
            </RequestLink>
            <a href="#ways" className={`${styles.button} ${styles.buttonLight}`}>
              استكشف فرص الشراكة
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
