export const SERVICE_CATEGORIES = [
  {
    key: "data",
    slug: "data-analytics",
    label: "علوم البيانات والذكاء الاصطناعي",
    website: "https://Data.thetransformix.com",
    text: "نحوّل البيانات المتفرقة إلى مؤشرات واضحة تدعم القرار وتكشف فرص التحسين.",
  },
  {
    key: "web",
    slug: "web-development",
    label: "تطوير المواقع",
    website: "https://web.thetransformix.com/",
    text: "نبني تجارب عربية واضحة وسريعة، تعكس هوية المنشأة وتخدم مستخدميها.",
  },
  {
    key: "marketing",
    slug: "marketing-design",
    label: "استديو الإبداع والتسويق الرقمي",
    website: "https://creative.thetransformix.com/",
    text: "نربط الرسالة بالمحتوى والتصميم، ضمن تجربة متسقة عبر القنوات الرقمية.",
  },
  {
    key: "erp",
    slug: "erp",
    label: "أنظمة ERP",
    website: "https://ai.thetransformix.com/erp",
    text: "ننظم العمليات ونربط الإدارات في منظومة مرنة تدعم العمل اليومي.",
  },
] as const;

export type ServiceKey = (typeof SERVICE_CATEGORIES)[number]["key"];

export const getServiceWebsite = (key: ServiceKey) =>
  SERVICE_CATEGORIES.find(service => service.key === key)!.website;

/** Every link about the manufacturing sector leaves for its own site. */
export const MANUFACTURING_WEBSITE = "https://manufacturing.thetransformix.com/";

/** TX AI Suite — the ready-to-customise AI agents. */
export const AI_SUITE_WEBSITE = "https://ai.thetransformix.com/";

/** The product platforms that run on sites of their own. */
export const PRODUCT_WEBSITES = {
  cooperatives: "https://cooperatives.thetransformix.com/",
  logistics: "https://logistics.thetransformix.com/",
  marketplaces: "https://marketplaces.thetransformix.com/",
  xt: "https://xt.thetransformix.com/",
} as const;

export const SERVICES_INTRO = {
  title: "حلول تبدأ من احتياجك، وتعمل معًا.",
  lead: "أربع خدمات تغطي البيانات والحضور الرقمي والتواصل والعمليات. نساعدك على اختيار المسار المناسب، مع إمكانية تكامل الخدمات وفق الأولويات وجاهزية المنشأة.",
};

export const getServiceLinks = (basePath: string) =>
  SERVICE_CATEGORIES.map(({ key, slug, label }) => ({
    key,
    label,
    href: `${basePath}/${slug}`,
  }));

export type ServiceMenuLink = { label: string; href: string; external?: boolean };

export const getServicesMenu = (basePath: string): ServiceMenuLink[] => [
  { label: "جميع الخدمات", href: basePath },
  ...SERVICE_CATEGORIES.map(({ label, website }) => ({ label, href: website, external: true })),
];

/* Offered beside the four categories above but kept apart from them, since
   the v2–v4 service routes are built around exactly those four. */
export const EXTRA_SERVICES = [
  {
    key: "mobile",
    label: "تطوير تطبيقات الجوال",
    website: "https://mobile.thetransformix.com",
    text: "نصمم ونطوّر تطبيقات جوال سلسة وآمنة لنظامي iOS وAndroid، تخدم عملاءك أينما كانوا.",
  },
  {
    key: "ventures",
    label: "بناء الشركات الناشئة",
    website: "/ventures",
    text: "نبني الشركات الناشئة التقنية مع مؤسسيها بشكل منهجي، من الفكرة والتحقق إلى الإطلاق والتوسع.",
  },
] as const;

export const ALL_SERVICES = [...SERVICE_CATEGORIES, ...EXTRA_SERVICES];

/** The v1 dropdown: the services trigger itself opens the overview, so the
    menu lists only the services, each in a new tab. */
export const getServiceSitesMenu = (): ServiceMenuLink[] =>
  ALL_SERVICES.map(({ label, website }) => ({ label, href: website, external: true }));
