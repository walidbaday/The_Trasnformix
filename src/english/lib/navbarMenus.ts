import { COMMUNITY_HREF, COMMUNITY_NAV, communityHref } from "@/english/lib/communityNav";
import {
  AI_SUITE_WEBSITE,
  EXTRA_SERVICES,
  getServiceWebsite,
  MANUFACTURING_WEBSITE,
  PRODUCT_WEBSITES,
} from "@/english/lib/serviceNavigation";

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
      site("AI & Intelligent Automation", AI_SUITE_WEBSITE),
      site("Data Science & Digital Intelligence", getServiceWebsite("data")),
      {
        label: "Software Engineering & Applications",
        href: "/en/services/software-engineering",
        extras: [
          site("Web development", getServiceWebsite("web")),
          site("Mobile apps", extraWebsite("mobile")),
        ],
      },
      { label: "Odoo services", href: "/en/services/odoo" },
    ],
  }],
  [{
    links: [
      { label: "E-commerce & Multi-Vendor Marketplaces", href: "/en/services/ecommerce" },
      { label: "Reservations & Tourism Platforms", href: "/en/services" },
      site("Creative & Omnichannel Digital Marketing", getServiceWebsite("marketing")),
    ],
  }],
];

const CONSULTING: NavBlock[][] = [
  [{
    links: [
      { label: "Research & Innovation", href: "/en/services" },
      { label: "Technology Outsourcing & Managed Business Services", href: "/en/services/gbs" },
      { label: "Startups", href: extraWebsite("ventures") },
    ],
  }],
];

/* المنتجات — the agents run on the TX AI Suite. Platforms with a site of
   their own open it; the rest wait on the products page. */
const AGENTS: NavBlock = {
  title: { label: "AI Agents Suite", href: "/en/products#ai-agents" },
  links: [
    site("Customer Service Agent", AI_SUITE_WEBSITE),
    site("Sales Agent", AI_SUITE_WEBSITE),
    site("Reservations Agent", AI_SUITE_WEBSITE),
    site("Operations Agent", AI_SUITE_WEBSITE),
    site("Enterprise Knowledge Agent", AI_SUITE_WEBSITE),
    site("Reporting Agent", AI_SUITE_WEBSITE),
  ],
};

const PLATFORMS: NavBlock = {
  title: { label: "Platforms & Systems", href: "/en/products#cooperatives" },
  links: [
    site("Enterprise Resource Planning", getServiceWebsite("erp")),
    site("Investor & Cooperative Management Platform", PRODUCT_WEBSITES.cooperatives),
    { label: "Closed Joint-Stock Company Governance Platform", href: "/en/products" },
    site("Logistics Management Platform", PRODUCT_WEBSITES.logistics),
  ],
};

const MORE_PLATFORMS: NavBlock = {
  continues: true,
  links: [
    site("Multi-Vendor Marketplace Platform", PRODUCT_WEBSITES.marketplaces),
    site("XT Smart Learning Platform", PRODUCT_WEBSITES.xt),
    { label: "Reservations & Tourism Services Platform", href: "/en/products" },
  ],
};

/* الموارد — the sectors, the academies and TX Community, with the portfolio
   (أعمالنا), which the new bar no longer shows on its own. Manufacturing
   leaves for its own site, as everywhere else. */
const SECTORS: NavBlock = {
  title: { label: "Industries", href: "/en/sectors" },
  links: [
    { label: "Cooperatives & Associations", href: "/en/sectors#cooperatives" },
    site("Industry & Manufacturing", MANUFACTURING_WEBSITE),
    { label: "Education and training", href: "/en/sectors#education" },
    { label: "E-commerce & Retail", href: "/en/sectors" },
    { label: "Tourism, Services & Reservations", href: "/en/sectors" },
    { label: "Logistics", href: "/en/sectors" },
  ],
};

const ACADEMIES: NavBlock = {
  title: { label: "Academies", href: "/en/academy" },
  links: [
    { label: "Cooperatives Academy", href: "/en/academy#cooperatives" },
    { label: "Industrial Academy", href: "/en/academy#industry" },
    { label: "Youth & Digital Skills Academy", href: "/en/academy#vocational" },
  ],
};

/* TX Community — the hub, then a page per activity (lib/communityNav.ts). Its
   own tab splits the list over two columns. */
const COMMUNITY_LINKS: NavLink[] = COMMUNITY_NAV.map(({ slug, label }) => ({ label, href: communityHref(slug) }));
const COMMUNITY_TITLE: NavLink = { label: "Community", href: COMMUNITY_HREF };
const COMMUNITY: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS };
const COMMUNITY_SPLIT = Math.ceil(COMMUNITY_LINKS.length / 2);
const COMMUNITY_FIRST: NavBlock = { title: COMMUNITY_TITLE, links: COMMUNITY_LINKS.slice(0, COMMUNITY_SPLIT) };
const COMMUNITY_REST: NavBlock = { continues: true, links: COMMUNITY_LINKS.slice(COMMUNITY_SPLIT) };

const WORKS: NavBlock = {
  title: { label: "Our work", href: "/en/works" },
  links: [{ label: "All projects", href: "/en/works" }],
};

/** Right-to-left reading order, so the first entry sits beside the logo. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/en/services",
    routes: ["/en/services", "/en/ventures"],
    menu: {
      id: "services",
      arrow: "/icons/nav/tab-arrow-services.svg",
      plain: true,
      overview: [...TECH_SOLUTIONS, ...CONSULTING],
      tabs: [
        { label: "Our Technology Solutions", href: "/en/services", columns: TECH_SOLUTIONS },
        { label: "Consulting & Venture Building", href: "/en/ventures", columns: CONSULTING },
      ],
    },
  },
  {
    label: "Products",
    href: "/en/products",
    routes: ["/en/products"],
    menu: {
      id: "products",
      arrow: "/icons/nav/tab-arrow.svg",
      overview: [[AGENTS], [PLATFORMS], [MORE_PLATFORMS]],
      tabs: [
        { label: "AI Agents Suite", href: "/en/products#ai-agents", columns: [[AGENTS]] },
        { label: "Platforms & Systems", href: "/en/products#cooperatives", columns: [[PLATFORMS], [MORE_PLATFORMS]] },
      ],
    },
  },
  {
    label: "Resources",
    routes: ["/en/sectors", "/en/academy", "/en/works", "/en/community"],
    menu: {
      id: "resources",
      arrow: "/icons/nav/tab-arrow.svg",
      overview: [[SECTORS], [ACADEMIES, WORKS], [COMMUNITY]],
      tabs: [
        { label: "Industries", href: "/en/sectors", columns: [[SECTORS]] },
        { label: "Academies", href: "/en/academy", columns: [[ACADEMIES]] },
        { label: "Community", href: COMMUNITY_HREF, columns: [[COMMUNITY_FIRST], [COMMUNITY_REST]] },
        { label: "Our work", href: "/en/works", columns: [[WORKS]] },
      ],
    },
  },
  /* من نحن is not drawn on the new bar; it keeps its place among the
     company links rather than hiding inside a menu. */
  { label: "About us", href: "/en/about", routes: ["/en/about"] },
  { label: "Careers", href: "/en/careers", routes: ["/en/careers"] },
  { label: "Contact us", href: "/en/contact", routes: ["/en/contact"] },
];

/** The logo's destination, which the small-screen sheet also lists. */
export const HOME_LINK: NavLink = { label: "Home", href: "/en" };

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
