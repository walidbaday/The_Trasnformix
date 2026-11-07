/* TX Community's events and news (Figma 4445:14080 the list, 4416:4876 one
   event): each entry is a card on /community/news and a page beneath it.
   Add an event here and both appear. */

export const COMMUNITY_NEWS = {
  href: "/community/news",
  label: "الأحداث والأخبار",
};

export type EventSession = {
  /** "الجلسة الأولى" and so on. */
  order: string;
  title: string;
  text: string;
  image: string;
  caption: string;
  /** The photo's height on the artboard, in px (260 unless noted). */
  height?: number;
};

export type CommunityEvent = {
  slug: string;
  title: string;
  place: string;
  /** The card's two-line summary. */
  summary: string;
  /** The page's lead under the title. */
  lead: string;
  /** What the cards and the page print for the event's date. */
  date: string;
  /** When the piece was written. */
  published: string;
  /** The navy editorial cover the card and the page share. */
  cover: {
    headline: string;
    theme: string;
    topics: string;
    /** The Latin place line, on the page's cover only. */
    location: string;
    tally: string;
  };
  stats: { title: string; items: readonly { value: string; label: string }[] };
  intro: { title: string; paragraphs: readonly string[] };
  sessions: { title: string; items: readonly EventSession[] };
  community: { title: string; paragraphs: readonly string[] };
  gallery: { title: string; images: readonly { src: string; focus?: string }[] };
};

const PHOTOS = "/images/community/news/odoo-20-creativa";

export const COMMUNITY_EVENTS: readonly CommunityEvent[] = [
  {
    slug: "odoo-20-creativa",
    title: "ترانسفورمكس تستعرض تطبيقات Odoo 20 بكرياتيفا الإسكندرية",
    place: "كرياتيفا، الإسكندرية",
    summary:
      "أربع جلسات حول الأنظمة المؤسسية والموارد البشرية وتطبيقات أودو والتجارة الإلكترونية والذكاء الاصطناعي، بحضور أكثر من ٥٠ مشاركًا.",
    lead: "أربع جلسات تطبيقية تربط الأنظمة المؤسسية باحتياجات الأعمال، من اختيار النظام إلى وكلاء الذكاء الاصطناعي.",
    date: "تاريخ الفعالية: قيد التأكيد",
    published: "تاريخ إعداد الخبر: ٥ نوفمبر ٢٠٢٦",
    cover: {
      headline: "Odoo 20",
      theme: "من المعرفة التقنية إلى تطبيقات الأعمال",
      topics: "ERP  /  HR TECHNOLOGY  /  ECOMMERCE  /  AI",
      location: "CREATIVA · ALEXANDRIA",
      tally: "٤ جلسات • أكثر من ٥٠ مشاركًا",
    },
    stats: {
      title: "الورشة في سطور",
      items: [
        { value: "أكثر من ٥٠", label: "مشاركًا من مجتمع الأعمال والتقنية" },
        { value: "٤ جلسات", label: "معرفة تطبيقية في إدارة الأعمال" },
      ],
    },
    intro: {
      title: "معرفة تطبيقية، وحوار مع مجتمع الأعمال",
      paragraphs: [
        "نظّمت شركة ترانسفورمكس ورشة عمل متخصصة حول تطبيقات Odoo 20 في إدارة الأعمال، استضافها مركز كرياتيفا للإبداع التكنولوجي بالإسكندرية، ضمن منظومة وزارة الاتصالات وتكنولوجيا المعلومات، بحضور أكثر من ٥٠ مشاركًا من أصحاب الشركات وممثلي قطاع الأعمال والمتخصصين والمهتمين بأنظمة تخطيط موارد المؤسسات.",
        "قدّمت الورشة أربع جلسات تناولت تطور التكنولوجيا واختيار الأنظمة المؤسسية، وتقنيات إدارة الموارد البشرية، والوحدات التشغيلية الأساسية في أودو وتطبيقاتها القطاعية، وصولًا إلى التجارة الإلكترونية وتطبيقات الذكاء الاصطناعي داخل النظام.",
      ],
    },
    sessions: {
      title: "أربع جلسات، ورؤية متكاملة",
      items: [
        {
          order: "الجلسة الأولى",
          title: "إسلام جاد: تطور التكنولوجيا ومعايير اختيار النظام المؤسسي",
          text: "افتتح الدكتور إسلام جاد، الرئيس التنفيذي لترانسفورمكس، الورشة باستعراض تطور التكنولوجيا من الجيل الثالث إلى الرابع، والاستعداد لتكنولوجيا الجيل الخامس، وتأثير ذلك على طريقة بناء وإدارة الأنظمة المؤسسية. وناقش الوظائف المختلفة لوحدات تخطيط موارد المؤسسات، والمعايير العملية لاختيار نظام ERP وفقًا لطبيعة النشاط واحتياجات التشغيل، والفروق بين ERP وCRM وبرمجيات المبيعات والتفاعل مع العملاء.",
          image: `${PHOTOS}/session-1.jpg`,
          caption: "د. إسلام جاد أثناء العرض",
        },
        {
          order: "الجلسة الثانية",
          title: "أدهم رأفت: تقنيات الموارد البشرية ورقمنة دورة الموظف",
          text: "قدّم أدهم رأفت الجلسة الثانية حول تقنيات الموارد البشرية، واستعرض الوظائف الرئيسية لإدارة الموارد البشرية وكيفية تحويلها إلى إجراءات رقمية متكاملة. وتناول مسارات التوظيف، وبيانات الموظفين، والإجازات، وتقييم الأداء، والرواتب، وعلاقة هذه التطبيقات ببقية العمليات المؤسسية.",
          image: `${PHOTOS}/session-2.jpg`,
          caption: "أدهم رأفت ومحتوى HR Technology",
        },
        {
          order: "الجلسة الثالثة",
          title: "محمود صلاح: الوحدات السبع الأساسية وتطبيقات أودو في العقارات والإنشاءات",
          text: "تناول المحاسب محمود دالفيجا في الجلسة الثالثة الوحدات التشغيلية الأساسية السبعة (Core 7) وترابط وظائفها داخل النظام، مع استعراض تطبيقات أودو في شركات العقارات ومشروعات الإنشاءات. وركزت الجلسة على ربط العمليات التجارية والمالية والمشتريات والمخزون وإدارة المشروعات، وكيفية استخدام البيانات المشتركة لدعم المتابعة والتشغيل في القطاعات المختلفة.",
          image: `${PHOTOS}/session-3.jpg`,
          caption: "محمود دالفيجا أثناء العرض",
        },
        {
          order: "الجلسة الرابعة",
          title: "عبد الرحمن جاد: التجارة الإلكترونية ووكلاء الذكاء الاصطناعي في أودو ٢٠",
          text: "اختتم المهندس عبد الرحمن جاد، المدير التقني في ترانسفورمكس، الجلسات بعرض تطبيقات التجارة الإلكترونية والذكاء الاصطناعي في Odoo 20، بما يشمل قدرات الذكاء الاصطناعي المدمجة والوكلاء الأذكياء. واستعرض نموذجًا عمليًا لوكيل مبيعات يتفاعل مع زوار المتجر الإلكتروني، ويبحث عن المنتجات، ويتحقق من المخزون، ويساعد في إعداد الطلبات والفواتير وإرسال البريد الإلكتروني بالاعتماد على بيانات النظام وصلاحياته.",
          image: `${PHOTOS}/session-4.jpg`,
          caption: "عبد الرحمن جاد أثناء العرض",
          height: 216,
        },
      ],
    },
    community: {
      title: "حضور يجمع قطاع الأعمال والمتخصصين",
      paragraphs: [
        "تنوع الحضور بين أصحاب الشركات الراغبين في التعرف على حلول إدارة الأعمال، ومتخصصي الأنظمة المؤسسية، والمهتمين بالفرص المهنية والتقنية في منظومة أودو. وأتاحت المناقشات تبادل الأسئلة حول الاختيار المناسب للأنظمة، ومتطلبات التطبيق، ودور الذكاء الاصطناعي في تحسين العمليات.",
        "تأتي هذه المشاركة ضمن الأنشطة المعرفية والمهنية التي تقدمها ترانسفورمكس عبر TX Community، بالتعاون مع الجهات الداعمة للابتكار وتطوير المهارات، بهدف مشاركة الخبرات التطبيقية وربط المعرفة التقنية باحتياجات الأعمال.",
      ],
    },
    gallery: {
      title: "معرض الصور",
      images: [
        { src: `${PHOTOS}/gallery-4.jpg`, focus: "50% 9%" },
        { src: `${PHOTOS}/gallery-3.jpg`, focus: "50% 6%" },
        { src: `${PHOTOS}/gallery-2.jpg`, focus: "50% 5%" },
        { src: `${PHOTOS}/session-4.jpg`, focus: "50% 0%" },
      ],
    },
  },
];

export const getCommunityEvent = (slug: string) => COMMUNITY_EVENTS.find((event) => event.slug === slug);

export const communityEventHref = (slug: string) => `${COMMUNITY_NEWS.href}/${slug}`;
