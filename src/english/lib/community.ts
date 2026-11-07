import type { FormId, Values } from "@/english/components/careers/forms";
import { COMMUNITY_HREF, COMMUNITY_NAV, communityHref, type CommunitySlug } from "@/english/lib/communityNav";

/* TX Community — the client's "TX Community" content sheet (5 November 2026):
   the hub at /community and one page per activity, in the sheet's site-map
   order. The sheet's knowledge stream (Insights & Activities) is a page of its
   own, which the menu lists under Resources → Community.

   The sheet asks that a page with nothing published yet show its description
   and an interest form rather than invented events or partners, so every page
   ends with a form preset to its own kind of participation. */

export type CommunityTopic = { audience: string; topics: string };

/** A photo banner that heads the page (Figma 4378:3200). */
export type CommunityBanner = {
  image: string;
  /** The line under the headline, as the banner words it. */
  lead: string;
  /** Which part of the photo stays in frame when it is cropped. */
  focus?: string;
  /** The artboard lets this headline run 35px past the copy column. */
  wide?: boolean;
};

export type CommunityPage = {
  slug: CommunitySlug;
  href: string;
  /** The sheet's English name for the section. */
  en: string;
  /** The short name the menu, the hub cards and the breadcrumb use. */
  label: string;
  /** The page's H1. */
  title: string;
  description: string;
  paragraphs: string[];
  topics?: { title: string; items: CommunityTopic[] };
  note?: { title: string; text: string };
  /** The participation call: the hero button and the hub card link. */
  cta: string;
  /** Heads the page's form when it differs from the call. */
  formTitle?: string;
  /** A second call that leaves the page. */
  secondary?: { label: string; href: string };
  /** The page's photo banner, where the design draws one; the others keep
      the plain hero. */
  banner?: CommunityBanner;
  form: FormId;
  /** Answers the page's form starts with. */
  initial?: Values;
};

export const COMMUNITY_HOME = {
  href: COMMUNITY_HREF,
  en: "TX Community",
  title: "A community for technology, innovation and talent development",
  metaTitle: "Technology & Innovation Community | TX Community",
  description:
    "TX Community is the technology and innovation community from Transformix: professional meetups, mentoring and applied collaboration for specialists, developers, tech talent and entrepreneurs in Saudi Arabia, Egypt and the UAE.",
  paragraphs: [
    "TX Community is a professional initiative from Transformix that brings specialists, developers, tech talent and entrepreneurs together in activities for networking, knowledge sharing, career mentoring and applied collaboration.",
    "We work with universities, social and sports clubs, professional communities and companies on specific meetups and activities, drawing on Transformix's experience and network in Saudi Arabia, Egypt and the UAE to widen participation and discover promising talent, teams and projects.",
    "Our activities are guided by Technology 5.0 principles, including human-centred innovation, sustainability, resilience, and the responsible use of technology and AI.",
  ],
  explore: "Explore community activities",
  join: "Join TX Community",
  activitiesTitle: "Community activities",
};

const page = (slug: CommunitySlug, content: Omit<CommunityPage, "slug" | "href" | "label">): CommunityPage => ({
  slug,
  href: communityHref(slug),
  label: COMMUNITY_NAV.find((item) => item.slug === slug)!.label,
  ...content,
});

export const COMMUNITY_PAGES: CommunityPage[] = [
  page("talks", {
    en: "TX Talks & Meetups",
    title: "Tech conversations and professional experience that open doors to collaboration",
    description:
      "In-person and virtual professional meetups that bring experts, developers and business leaders together to discuss applications of AI, digital transformation, enterprise systems and innovation.",
    paragraphs: [
      "In-person and virtual professional meetups that bring experts, developers and business leaders together to discuss applications of AI, digital transformation, enterprise systems and innovation, and to share expertise and practical experience.",
      "Participants learn about expertise and technologies related to their interests and build their professional networks. Universities, clubs and companies can host meetups tailored to their audiences in coordination with the community team.",
    ],
    cta: "Suggest a topic or speak",
    form: "community",
    initial: { type: "talks" },
    banner: {
      image: "/images/community/talks.png",
      lead: "In-person and virtual professional meetups that bring experts, developers and business leaders together to discuss applications of AI, digital transformation, enterprise systems and innovation, and to share expertise and practical experience.",
      focus: "left",
    },
  }),
  page("insights", {
    en: "TX Community Insights & Activities",
    title: "Insights & Activities",
    description:
      "Tech articles and experiences shared by TX Community members and speakers: applied AI experiences, discussion summaries and documented coverage of community activities.",
    paragraphs: [
      "We document community meetups and professional contributions, and publish selected knowledge contributions from members and speakers, including applied articles, discussion summaries, project experiences and lessons learned. Readers can find documented coverage of activities, with photos and videos cleared for publication and links to related analysis.",
      "This space helps members and anyone interested follow the community's activity, learn from participants' experience and find upcoming opportunities to take part. All material goes through editorial review and states who the contributor is and the nature of their role; no confidential content is published, and no photos without the necessary rights and consents.",
    ],
    cta: "Share an article or experience",
    formTitle: "Share an article or experience, or showcase your project",
    form: "community",
    initial: { type: "contribution" },
    banner: {
      image: "/images/community/insights.png",
      lead: "We document community meetups and professional contributions, and publish selected knowledge contributions from members and speakers, including applied articles, discussion summaries, project experiences and lessons learned. Readers can find documented coverage of activities, with photos and videos cleared for publication and links to related analysis.",
      focus: "top",
    },
  }),
  page("talent", {
    en: "Talent & Team Development",
    title: "Developing talent and discovering promising tech teams",
    description:
      "Career mentoring, hands-on training and volunteering opportunities for developers, specialists, students, graduates and tech teams, subject to actual resources and opportunities.",
    paragraphs: [
      "We connect with developers, specialists, students, graduates and tech teams, and offer opportunities for career mentoring, hands-on training, volunteering and taking part in available activities and projects, subject to actual resources and opportunities.",
      "Partner organizations get to know skilled people and specialized teams, while participants can present their skills and projects and explore professional collaboration. Selected projects can be showcased with their owners' consent and with their intellectual property protected.",
    ],
    cta: "Register as a talent or team",
    form: "community",
    initial: { type: "talent" },
    banner: {
      image: "/images/community/talent.png",
      lead: "We connect with developers, specialists, students, graduates and tech teams, and offer opportunities for career mentoring, hands-on training, volunteering and taking part in available activities and projects, subject to actual resources and opportunities.",
      focus: "top",
    },
  }),
  page("events", {
    en: "Events & Hackathons",
    title: "Professional participation in tech events and competitions",
    description:
      "TX Community takes part in hackathons, competitions and tech events run by universities and partner organizations, contributing technical expertise, mentoring and specialist talks.",
    paragraphs: [
      "We take part in hackathons, competitions and tech events organized by universities and partner organizations, contributing technical expertise, mentoring or specialist talks, depending on the nature of each activity and the team's capacity.",
      "Organizers gain professional expertise grounded in the technology market, and participants can present their ideas and connect with specialists. The initiative's scope does not include a commitment to organize its own hackathons.",
    ],
    cta: "Invite TX Community to take part",
    form: "community",
    initial: { type: "events" },
    banner: {
      image: "/images/community/events.png",
      lead: "We take part in hackathons, competitions and tech events organized by universities and partner organizations, contributing technical expertise, mentoring or specialist talks, depending on the nature of each activity and the team's capacity.",
    },
  }),
  page("research", {
    en: "Academic & Applied Research",
    title: "Academic collaboration and applied research tied to market needs",
    description:
      "Collaboration with universities and researchers on research ideas and graduation projects: technical guidance, idea evaluation, and development of selected prototypes and projects.",
    paragraphs: [
      "We work with universities, researchers and academic teams on research ideas, graduation projects and their practical applications, and can contribute our expertise directly through technical guidance, evaluating ideas, and developing prototypes and selected projects.",
      "When a project needs disciplines or capabilities outside our scope, we may suggest suitable organizations or experts from our professional network, subject to availability and the agreement of all parties. Students and researchers benefit from an applied review grounded in market experience, without any promise to deliver or fund every project.",
    ],
    cta: "Submit a research or graduation project",
    form: "community",
    initial: { type: "research" },
    banner: {
      image: "/images/community/research.png",
      lead: "We work with universities, researchers and academic teams on research ideas, graduation projects and their practical applications, and can contribute our expertise directly through technical guidance, evaluating ideas and developing prototypes.",
      focus: "center 47%",
    },
  }),
  page("industry", {
    en: "Professional & Industry Collaboration",
    title: "Professional expertise and partnerships for business and technology development",
    description:
      "Specialized meetups and initiatives with companies and industrial and technology organizations in AI, data, software, enterprise systems and industrial transformation.",
    paragraphs: [
      "We work with companies, industrial and technology organizations and professional communities on specialized meetups and initiatives, knowledge exchange, and exploring collaboration on projects and digital applications.",
      "Areas of participation include AI, data, software, enterprise systems, digital commerce and industrial transformation. A contribution from the Transformix team, or access to its partner network, can be explored within a clearly defined scope for each collaboration.",
    ],
    cta: "Discuss a Partnership",
    form: "community",
    initial: { type: "industry" },
    banner: {
      image: "/images/community/industry.png",
      lead: "We work with companies, industrial and technology organizations and professional communities on specialized meetups and initiatives, knowledge exchange, and exploring collaboration on projects and digital applications.",
      focus: "top",
    },
  }),
  page("impact", {
    en: "Innovation & Community Impact",
    title: "Applied innovation and initiatives with community value",
    description:
      "Selected initiatives in technology, education, skills development, responsible AI and sustainability, with a scope that can actually be delivered.",
    paragraphs: [
      "We work with organizations and partners on selected initiatives related to technology, education, skills development, the responsible use of AI and sustainability, by sharing expertise and contributing to activities with an achievable scope.",
      "Interested organizations can propose technology or knowledge initiatives that suit their goals and audiences. Proposals are reviewed against available resources, fit and expected impact.",
    ],
    cta: "Propose a joint initiative",
    form: "community",
    initial: { type: "initiative" },
    banner: {
      image: "/images/community/impact.png",
      lead: "We work with organizations and partners on selected initiatives related to technology, education, skills development, the responsible use of AI and sustainability, by sharing expertise and contributing to activities with an achievable scope.",
      focus: "bottom",
    },
  }),
  page("clubs", {
    en: "Clubs & Community Partnerships",
    title: "Technology and knowledge activities inside clubs and local communities",
    description:
      "AI events for clubs and technology workshops for families and young people: practical sessions inside sports and social clubs and local and university communities.",
    paragraphs: [
      "We work with sports and social clubs and with local, university and professional communities to run meetups and interactive experiences that suit their members' interests and show practical applications of technology and AI in life, work and education.",
      "Target organizations include clubs such as Smouha and Sporting in Alexandria, and similar clubs and communities in Saudi Arabia, Egypt, the UAE and the wider Arab region. Any activity is subject to an agreement with the club or host organization; mentioning these clubs as examples does not imply an existing partnership with them.",
      "Clubs enrich their social, cultural and professional programmes with activities led by specialists, and members get practical sessions suited to their age groups and interests. Events can run as part of TX Talks or as tailored meetups, without setting up a separate operating programme for each club.",
    ],
    topics: {
      title: "Example topics, adapted to each audience",
      items: [
        {
          audience: "For mothers and families",
          topics: "AI in everyday life; how children use AI for learning; digital safety, deepfakes and misinformation.",
        },
        {
          audience: "For women and women business owners",
          topics: "Using AI for marketing, content creation and running small businesses; digital skills and returning to the job market.",
        },
        {
          audience: "For young people and teenagers",
          topics: "Technical and professional specializations; building a simple prototype with the help of AI; the skills the job market needs.",
        },
        {
          audience: "For business owners and professionals",
          topics: "Applications of AI in management, customer service, data analysis and productivity.",
        },
        {
          audience: "For university communities",
          topics: "Specialist meetups, project mentoring, and participation in existing activities and competitions.",
        },
      ],
    },
    note: {
      title: "How activities are organized",
      text: "The topic, timing, audience and registration are agreed with the host organization, with parental consent where minors take part and privacy and photography requirements respected. We do not promise a fixed schedule or specific attendance numbers before an operating agreement is in place.",
    },
    cta: "Propose an activity for your club or community",
    form: "community",
    initial: { type: "hosting", applicant: "organization" },
    banner: {
      image: "/images/community/clubs.png",
      wide: true,
      lead: "We work with sports and social clubs and with local, university and professional communities to run meetups and interactive experiences that suit their members' interests and show practical applications of technology and AI in life, work and education.",
      focus: "top",
    },
  }),
  page("partners", {
    en: "Regional Partners & Ambassadors",
    title: "Regional partnerships that widen opportunities to take part and collaborate",
    description:
      "Regional partners and ambassadors for TX Community in Saudi Arabia, Egypt, the UAE and the Arab region, proposing activities, coordinating meetups and sharing expertise.",
    paragraphs: [
      "We welcome collaboration with organizations, specialists and professional communities in Saudi Arabia, Egypt, the UAE and the Arab region to take part in TX Community activities and spread the word about meetup and collaboration opportunities.",
      "Regional partners and community ambassadors may help by proposing activities, coordinating meetups with host organizations or sharing expertise, without being granted any legal representation or automatic commercial mandate in the name of Transformix.",
    ],
    cta: "Become a community partner",
    formTitle: "Become a community partner or join the TX ambassadors",
    form: "partner",
    banner: {
      image: "/images/community/partners.png",
      lead: "We welcome collaboration with organizations, specialists and professional communities in Saudi Arabia, Egypt, the UAE and the Arab region to take part in TX Community activities and spread the word about meetup and collaboration opportunities.",
      focus: "left",
    },
  }),
  page("join", {
    en: "Join TX Community",
    title: "Share your expertise and grow your professional network and collaboration opportunities",
    description:
      "Register your interest in TX Community activities and in mentoring, volunteering and knowledge-sharing opportunities, or propose a specific activity or partnership for your organization.",
    paragraphs: [
      "If you are a developer, specialist, student, entrepreneur or member of a tech team, you can register your interest in community activities and in mentoring, volunteering and knowledge-sharing opportunities. Universities, clubs, companies and professional bodies can propose a specific activity or partnership.",
      "Requests are reviewed for fit and against the opportunities available. Registering does not guarantee acceptance, training, employment or delivery of a project.",
    ],
    cta: "Join the community",
    secondary: { label: "Propose a collaboration", href: `${communityHref("partners")}#join` },
    form: "community",
    initial: { type: "join" },
    banner: {
      image: "/images/community/join.png",
      lead: "If you are a developer, specialist, student, entrepreneur or member of a tech team, you can register your interest in community activities and in mentoring, volunteering and knowledge-sharing opportunities. Universities, clubs, companies and professional bodies can propose a specific activity or partnership.",
      focus: "top",
    },
  }),
];

/** The activities the hub lays out as cards; joining has a band of its own. */
export const COMMUNITY_ACTIVITIES = COMMUNITY_PAGES.filter(({ slug }) => slug !== "join");

export const COMMUNITY_JOIN = COMMUNITY_PAGES.find(({ slug }) => slug === "join")!;

export const getCommunityPage = (slug: string) =>
  COMMUNITY_PAGES.find((item) => item.slug === slug);
