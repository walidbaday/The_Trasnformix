/* TX Community's events and news (Figma 4445:14080 the list, 4416:4876 one
   event): each entry is a card on /community/news and a page beneath it.
   Add an event here and both appear. */

export const COMMUNITY_NEWS = {
  href: "/en/community/news",
  label: "Events & News",
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
    title: "Transformix showcases Odoo 20 applications at Creativa Alexandria",
    place: "Creativa, Alexandria",
    summary:
      "Four sessions on enterprise systems, human resources, Odoo applications, e-commerce and AI, attended by more than 50 participants.",
    lead: "Four hands-on sessions connecting enterprise systems to business needs, from choosing a system to AI agents.",
    date: "Event date: to be confirmed",
    published: "Published: 5 November 2026",
    cover: {
      headline: "Odoo 20",
      theme: "From technical knowledge to business applications",
      topics: "ERP  /  HR TECHNOLOGY  /  ECOMMERCE  /  AI",
      location: "CREATIVA · ALEXANDRIA",
      tally: "4 sessions • 50+ participants",
    },
    stats: {
      title: "The workshop at a glance",
      items: [
        { value: "50+", label: "participants from the business and technology community" },
        { value: "4 sessions", label: "of applied business-management knowledge" },
      ],
    },
    intro: {
      title: "Applied knowledge, and a conversation with the business community",
      paragraphs: [
        "Transformix held a specialized workshop on Odoo 20 applications in business management, hosted by the Creativa Technology Innovation Center in Alexandria, part of the Ministry of Communications and Information Technology's network, and attended by more than 50 participants including business owners, business-sector representatives, specialists and people interested in enterprise resource planning systems.",
        "The workshop offered four sessions covering the evolution of technology and choosing enterprise systems, human resources technology, Odoo's core operational modules and their industry applications, through to e-commerce and AI applications inside the system.",
      ],
    },
    sessions: {
      title: "Four sessions, one complete picture",
      items: [
        {
          order: "Session one",
          title: "Islam Gad: The evolution of technology and how to choose an enterprise system",
          text: "Dr. Islam Gad, CEO of Transformix, opened the workshop by tracing the evolution of technology from the third to the fourth generation, the preparation for fifth-generation technology, and how this affects the way enterprise systems are built and run. He discussed the different functions of ERP modules, practical criteria for choosing an ERP system according to the nature of the business and its operational needs, and the differences between ERP, CRM, sales software and customer engagement tools.",
          image: `${PHOTOS}/session-1.jpg`,
          caption: "Dr. Islam Gad presenting",
        },
        {
          order: "Session two",
          title: "Adham Raafat: HR technology and digitizing the employee lifecycle",
          text: "Adham Raafat led the second session on human resources technology, reviewing the main functions of HR management and how to turn them into integrated digital procedures. He covered recruitment, employee records, leave, performance reviews and payroll, and how these applications connect with the rest of the organization's operations.",
          image: `${PHOTOS}/session-2.jpg`,
          caption: "Adham Raafat and HR Technology content",
        },
        {
          order: "Session three",
          title: "Mahmoud Salah: The seven core modules and Odoo applications in real estate and construction",
          text: "In the third session, accountant Mahmoud Dalfiga covered the seven core operational modules (Core 7) and how their functions connect within the system, with a look at Odoo applications in real estate companies and construction projects. The session focused on connecting sales, finance, purchasing, inventory and project management, and on using shared data to support monitoring and operations across sectors.",
          image: `${PHOTOS}/session-3.jpg`,
          caption: "Mahmoud Dalfiga presenting",
        },
        {
          order: "Session four",
          title: "Abdelrahman Gad: E-commerce and AI agents in Odoo 20",
          text: "Eng. Abdelrahman Gad, CTO of Transformix, closed the sessions with e-commerce and AI applications in Odoo 20, including built-in AI capabilities and intelligent agents. He demonstrated a working sales agent that talks with online store visitors, searches for products, checks inventory, and helps prepare orders and invoices and send emails, relying on the system's data and permissions.",
          image: `${PHOTOS}/session-4.jpg`,
          caption: "Abdelrahman Gad presenting",
          height: 216,
        },
      ],
    },
    community: {
      title: "An audience bringing business and specialists together",
      paragraphs: [
        "The audience ranged from business owners looking to learn about business management solutions to enterprise systems specialists and people interested in professional and technical opportunities in the Odoo ecosystem. The discussions opened up questions about choosing the right system, implementation requirements and the role of AI in improving operations.",
        "This participation is part of the knowledge and professional activities Transformix offers through TX Community, in collaboration with organizations that support innovation and skills development, to share applied expertise and connect technical knowledge with business needs.",
      ],
    },
    gallery: {
      title: "Photo gallery",
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
