/* The TX Community pages by slug and short name, in the content sheet's
   site-map order. Kept apart from their content (lib/community.ts) so the
   navbar can list them without shipping every page's text. */

export const COMMUNITY_HREF = "/community";

export const COMMUNITY_NAV = [
  { slug: "talks", label: "الحوارات واللقاءات" },
  { slug: "insights", label: "المعرفة والأنشطة" },
  { slug: "talent", label: "المواهب والفرق" },
  { slug: "events", label: "الفعاليات والمسابقات" },
  /* The events-and-news list (Figma 4445:14080), with a page per event. */
  { slug: "news", label: "الأحداث والأخبار" },
  { slug: "research", label: "التعاون الأكاديمي والبحث التطبيقي" },
  { slug: "industry", label: "التعاون المهني والصناعي" },
  { slug: "impact", label: "الابتكار والأثر المجتمعي" },
  { slug: "clubs", label: "التعاون مع الأندية والمجتمعات" },
  { slug: "partners", label: "الشراكات الإقليمية والسفراء" },
  { slug: "join", label: "المشاركة والانضمام" },
] as const;

export type CommunitySlug = (typeof COMMUNITY_NAV)[number]["slug"];

export const communityHref = (slug: CommunitySlug) => `${COMMUNITY_HREF}/${slug}`;
