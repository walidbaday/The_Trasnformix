import { COMMUNITY_HREF, COMMUNITY_NAV, communityHref } from "./communityNav";
import {
  AI_SUITE_WEBSITE,
  EXTRA_SERVICES,
  getServiceWebsite,
  MANUFACTURING_WEBSITE,
  PRODUCT_WEBSITES,
} from "./serviceNavigation";

/* The v1 navbar (Figma 4305:4654 الخدمات, 4305:4657 المنتجات, 4305:4660
   الموارد): five labels in a white 64px bar, three of which open a full-width
   panel — a grey sidebar of tabs beside up to three columns of links.

   Every destination is one the site already has. An entry without a page of
   its own opens the overview it belongs to (/services, /products, /sectors)
   until that page exists. */

export type NavLink = {
  label: string;
  href: string;
  /** Leaves the site, so it opens in a new tab. */
  external?: boolean;
  /** The grey line under a label (Figma 4319:37736), one link per part. */
  extras?: NavLink[];
};

/** A run of links in one column under an optional bold, blue heading. */
export type NavBlock = {
  title?: NavLink;
  links: NavLink[];
  /** Carries on the heading of the column before it, so its first link
      lines up with that column's first link (Figma 4305:4783). */
  continues?: boolean;
};

/** A sidebar row: pointing at it shows its columns; its label opens `href`. */
export type NavTab = { label: string; href?: string; columns: NavBlock[][] };

export type NavMenuId = "services" | "products" | "resources";

export type NavMenu = {
  id: NavMenuId;
  /** The sidebar arrow is drawn a hair heavier on the services artboard. */
  arrow: string;
  /** Services list unheaded links 28px apart; the others head each column
      and space their links 19px apart. */
  plain?: boolean;
  /** Everything the menu holds, shown as it opens until a tab is pointed at. */
  overview: NavBlock[][];
  /** The sidebar rows, under the menu's own label. */
  tabs: NavTab[];
};

export type NavItem = {
  label: string;
  /** The page the label opens. The resources label only opens its menu. */
  href?: string;
  /** Pages under this label, which light it up. */
  routes: string[];
  menu?: NavMenu;
};

const site = (label: string, href: string): NavLink => ({ label, href, external: true });
const extraWebsite = (key: (typeof EXTRA_SERVICES)[number]["key"]) =>
  EXTRA_SERVICES.find((service) => service.key === key)!.website;

/* الخدمات — the nine services of the home page, linked as its grid links them. */
const TECH_SOLUTIONS: NavBlock[][] = [
  [{
    links: [
      site("الذكاء الاصطناعي والأتمتة الذكية", AI_SUITE_WEBSITE),
      site("علوم البيانات والذكاء الرقمي", getServiceWebsite("data")),
      {
        label: "هندسة البرمجيات والتطبيقات",
        href: "/services/software-engineering",
        extras: [
          site("تطوير المواقع", getServiceWebsite("web")),
          site("تطبيقات الموبيل", extraWebsite("mobile")),
        ],
      },
      { label: "خدمات Odoo", href: "/services/odoo" },
    ],
  }],
  [{
    links: [
      { label: "التجارة الإلكترونية والأسواق متعددة البائعين", href: "/services/ecommerce" },
      { label: "منصات الحجوزات والخدمات السياحية", href: "/services" },
      site("الإبداع والتسويق الرقمي متعدد القنوات", getServiceWebsite("marketing")),
    ],
  }],
];

const CONSULTING: NavBlock[][] = [
  [{
    links: [
      { label: "البحث والابتكار", href: "/services" },
      { label: "التعهيد التقني وخدمات الأعمال المُدارة", href: "/services/gbs" },
      { label: "الشركات الناشئة", href: extraWebsite("ventures") },
    ],
  }],
];

/* المنتجات — the agents run on the TX AI Suite. Platforms with a site of
   their own open it; the rest wait on the products page. */
const AGENTS: NavBlock = {
  title: { label: "منظومة الوكلاء الأذكياء", href: "/products#ai-agents" },
  links: [
    site("وكيل خدمة العملاء", AI_SUITE_WEBSITE),
    site("وكيل المبيعات", AI_SUITE_WEBSITE),
    site("وكيل الحجوزات", AI_SUITE_WEBSITE),
    site("وكيل العمليات", AI_SUITE_WEBSITE),
    site("وكيل المعرفة المؤسسية", AI_SUITE_WEBSITE),
    site("وكيل التقارير", AI_SUITE_WEBSITE),
  ],
};

const PLATFORMS: NavBlock = {
  title: { label: "المنصات والأنظمة", href: "/products#cooperatives" },
  links: [
    site("نظام تخطيط موارد المؤسسات", getServiceWebsite("erp")),
    site("منصة إدارة المستثمرين والتعاونيات", PRODUCT_WEBSITES.cooperatives),
    { label: "منصة حوكمة الشركات المساهمة المقفلة", href: "/products" },
    site("منصة إدارة الخدمات اللوجستية", PRODUCT_WEBSITES.logistics),
  ],
};

const MORE_PLATFORMS: NavBlock = {
  continues: true,
  links: [
    site("منصة الأسواق الإلكترونية متعددة البائعين", PRODUCT_WEBSITES.marketplaces),
    site("منصة التعلم الذكي XT", PRODUCT_WEBSITES.xt),
    { label: "منصة الحجوزات والخدمات السياحية", href: "/products" },
  ],
};

/* الموارد — the sectors, the academies and TX Community, with the portfolio
   (أعمالنا), which the new bar no longer shows on its own. Manufacturing
   leaves for its own site, as everywhere else. */
const SECTORS: NavBlock = {
  title: { label: "القطاعات", href: "/sectors" },
  links: [
    { label: "التعاونيات والجمعيات", href: "/sectors#cooperatives" },
    site("الصناعة والتصنيع", MANUFACTURING_WEBSITE),
    { label: "التعليم والتدريب", href: "/sectors#education" },
    { label: "التجارة الإلكترونية والتجزئة", href: "/sectors" },
    { label: "السياحة والخدمات والحجوزات", href: "/sectors" },
    { label: "الخدمات اللوجستية", href: "/sectors" },
  ],
};

const ACADEMIES: NavBlock = {
  title: { label: "الأكاديميات", href: "/academy" },
  links: [
    { label: "أكاديمية التعاونيات", href: "/academy#cooperatives" },
    { label: "الأكاديمية الصناعية", href: "/academy#industry" },
    { label: "أكاديمية الشباب والمهارات الرقمية", href: "/academy#vocational" },
  ],
};

/* TX Community — the hub, then a page per activity (lib/communityNav.ts). Its
   own tab splits the list over two columns. */
const COMMUNITY_LINKS: NavLink[] = COMMUNITY_NAV.map(({ slug, label }) => ({ label, href: communityHref(slug) }));
const COMMUNITY_TITLE: NavLink = { label: "المجتمع", href: COMMUNITY_HREF };
const COMMUNITY: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS };
const COMMUNITY_SPLIT = Math.ceil(COMMUNITY_LINKS.length / 2);
const COMMUNITY_FIRST: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS.slice(0, COMMUNITY_SPLIT) };
const COMMUNITY_REST: NavBlock = { continues: true, links: COMMUNITY_LINKS.slice(COMMUNITY_SPLIT) };

const WORKS: NavBlock = {
  title: { label: "أعمالنا", href: "/works" },
  links: [{ label: "جميع المشاريع", href: "/works" }],
};

/** Right-to-left reading order, so the first entry sits beside the logo. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "الخدمات",
    href: "/services",
    routes: ["/services", "/ventures"],
    menu: {
      id: "services",
      arrow: "/icons/nav/tab-arrow-services.svg",
      plain: true,
      overview: [...TECH_SOLUTIONS, ...CONSULTING],
      tabs: [
        { label: "حلولنا التقنية", href: "/services", columns: TECH_SOLUTIONS },
        { label: "الاستشارات وبناء المشروعات", href: "/ventures", columns: CONSULTING },
      ],
    },
  },
  {
    label: "المنتجات",
    href: "/products",
    routes: ["/products"],
    menu: {
      id: "products",
      arrow: "/icons/nav/tab-arrow.svg",
      overview: [[AGENTS], [PLATFORMS], [MORE_PLATFORMS]],
      tabs: [
        { label: "منظومة الوكلاء الأذكياء", href: "/products#ai-agents", columns: [[AGENTS]] },
        { label: "المنصات والأنظمة", href: "/products#cooperatives", columns: [[PLATFORMS], [MORE_PLATFORMS]] },
      ],
    },
  },
  {
    label: "الموارد",
    routes: ["/sectors", "/academy", "/works", "/community"],
    menu: {
      id: "resources",
      arrow: "/icons/nav/tab-arrow.svg",
      overview: [[SECTORS], [ACADEMIES, WORKS], [COMMUNITY]],
      tabs: [
        { label: "القطاعات", href: "/sectors", columns: [[SECTORS]] },
        { label: "الأكاديميات", href: "/academy", columns: [[ACADEMIES]] },
        { label: "المجتمع", href: COMMUNITY_HREF, columns: [[COMMUNITY_FIRST], [COMMUNITY_REST]] },
        { label: "أعمالنا", href: "/works", columns: [[WORKS]] },
      ],
    },
  },
  /* من نحن is not drawn on the new bar; it keeps its place among the
     company links rather than hiding inside a menu. */
  { label: "من نحن", href: "/about", routes: ["/about"] },
  { label: "الوظائف", href: "/careers", routes: ["/careers"] },
  { label: "تواصل معنا", href: "/contact", routes: ["/contact"] },
];

/** The logo's destination, which the small-screen sheet also lists. */
export const HOME_LINK: NavLink = { label: "الرئيسية", href: "/" };

export type NavSearchEntry = NavLink & { trail: string };

/* Folds the spellings people type interchangeably — hamza seats, taa
   marbuta, alef maqsura, diacritics and tatweel — and letter case. */
const ALEF = String.fromCharCode(0x0627);
const HEH = String.fromCharCode(0x0647);
const YEH = String.fromCharCode(0x064a);
const fold = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[آأإٱ]/g, () => ALEF)
    .replace(/ة/g, () => HEH)
    .replace(/ى/g, () => YEH)
    .replace(/\s+/g, " ")
    .trim();

function buildIndex(): NavSearchEntry[] {
  const entries: NavSearchEntry[] = [{ ...HOME_LINK, trail: "" }];
  const add = (link: NavLink, trail: string) => {
    if (!entries.some((entry) => entry.label === link.label && entry.href === link.href)) {
      entries.push({ label: link.label, href: link.href, external: link.external, trail });
    }
    link.extras?.forEach((extra) => add(extra, trail));
  };

  for (const item of NAV_ITEMS) {
    if (item.href) add({ label: item.label, href: item.href }, "");
    for (const tab of item.menu?.tabs ?? []) {
      if (tab.href) add({ label: tab.label, href: tab.href }, item.label);
      for (const block of tab.columns.flat()) {
        const trail = block.title ? `${item.label} · ${block.title.label}` : item.label;
        if (block.title) add(block.title, item.label);
        block.links.forEach((link) => add(link, trail));
      }
    }
  }
  return entries;
}

const INDEX = buildIndex().map((entry) => ({ entry, label: fold(entry.label), trail: fold(entry.trail) }));

/** Pages and menu entries whose label (or section) holds every typed word;
    labels that start with the query rank first. */
export function searchNav(query: string, limit = 8): NavSearchEntry[] {
  const words = fold(query).split(" ").filter(Boolean);
  if (!words.length) return [];
  const phrase = words.join(" ");
  return INDEX
    .filter(({ label, trail }) => words.every((word) => label.includes(word) || trail.includes(word)))
    .map((item) => ({ ...item, rank: item.label.startsWith(phrase) ? 0 : item.label.includes(phrase) ? 1 : 2 }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

/** What the search panel offers before anything is typed. */
export const NAV_SEARCH_SUGGESTIONS: NavSearchEntry[] = INDEX
  .filter(({ entry }) => !entry.trail)
  .map(({ entry }) => entry);
