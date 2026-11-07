export const SERVICE_CATEGORIES = [
  {
    key: "data",
    slug: "data-analytics",
    label: "Data science and artificial intelligence",
    website: "https://Data.thetransformix.com",
    text: "We turn scattered data into clear metrics that support decisions and reveal opportunities for improvement.",
  },
  {
    key: "web",
    slug: "web-development",
    label: "Web development",
    website: "https://web.thetransformix.com/",
    text: "We build clear, fast Arabic websites that reflect your organization's identity and serve its users.",
  },
  {
    key: "marketing",
    slug: "marketing-design",
    label: "Creative studio and digital marketing",
    website: "https://creative.thetransformix.com/",
    text: "We connect messaging with content and design for a consistent experience across digital channels.",
  },
  {
    key: "erp",
    slug: "erp",
    label: "ERP systems",
    website: "https://ai.thetransformix.com/erp",
    text: "We organize operations and connect departments through a flexible system that supports daily work.",
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
  title: "Solutions that start with your needs and work together.",
  lead: "Four services covering data, digital presence, communication, and operations. We help you choose the right path, with services that can work together according to your priorities and readiness.",
};

export const getServiceLinks = (basePath: string) =>
  SERVICE_CATEGORIES.map(({ key, slug, label }) => ({
    key,
    label,
    href: `${basePath}/${slug}`,
  }));

export type ServiceMenuLink = { label: string; href: string; external?: boolean };

export const getServicesMenu = (basePath: string): ServiceMenuLink[] => [
  { label: "All services", href: basePath },
  ...SERVICE_CATEGORIES.map(({ label, website }) => ({ label, href: website, external: true })),
];

/* Offered beside the four categories above but kept apart from them, since
   the v2–v4 service routes are built around exactly those four. */
export const EXTRA_SERVICES = [
  {
    key: "mobile",
    label: "Mobile app development",
    website: "https://mobile.thetransformix.com",
    text: "We design and build smooth, secure iOS and Android apps that serve your customers wherever they are.",
  },
  {
    key: "ventures",
    label: "Venture builder",
    website: "/en/ventures",
    text: "We systematically build tech startups with their founders, from idea and validation to launch and scale.",
  },
] as const;

export const ALL_SERVICES = [...SERVICE_CATEGORIES, ...EXTRA_SERVICES];

/** The v1 dropdown: the services trigger itself opens the overview, so the
    menu lists only the services, each in a new tab. */
export const getServiceSitesMenu = (): ServiceMenuLink[] =>
  ALL_SERVICES.map(({ label, website }) => ({ label, href: website, external: true }));
