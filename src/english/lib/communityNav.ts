/* The TX Community pages by slug and short name, in the content sheet's
   site-map order. Kept apart from their content (lib/community.ts) so the
   navbar can list them without shipping every page's text. */

export const COMMUNITY_HREF = "/en/community";

export const COMMUNITY_NAV = [
  { slug: "talks", label: "Talks & Meetups" },
  { slug: "insights", label: "Insights & Activities" },
  { slug: "talent", label: "Talent & Teams" },
  { slug: "events", label: "Events & Hackathons" },
  /* The events-and-news list (Figma 4445:14080), with a page per event. */
  { slug: "news", label: "Events & News" },
  { slug: "research", label: "Academic & Applied Research" },
  { slug: "industry", label: "Professional & Industry Collaboration" },
  { slug: "impact", label: "Innovation & Community Impact" },
  { slug: "clubs", label: "Clubs & Community Partnerships" },
  { slug: "partners", label: "Regional Partners & Ambassadors" },
  { slug: "join", label: "Join TX Community" },
] as const;

export type CommunitySlug = (typeof COMMUNITY_NAV)[number]["slug"];

export const communityHref = (slug: CommunitySlug) => `${COMMUNITY_HREF}/${slug}`;
