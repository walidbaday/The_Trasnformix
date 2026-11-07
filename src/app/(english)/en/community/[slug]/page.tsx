import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityActivityPage } from "@/english/components/community/CommunityPages";
import { COMMUNITY_PAGES, getCommunityPage } from "@/english/lib/community";

type Props = { params: Promise<{ slug: string }> };

/* Only the sheet's pages exist; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return COMMUNITY_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getCommunityPage((await params).slug);
  return page ? { title: `${page.label} | TX Community`, description: page.description } : {};
}

/** /community/[slug] — one TX Community activity. */
export default async function CommunityActivityRoute({ params }: Props) {
  const page = getCommunityPage((await params).slug);
  if (!page) notFound();
  return <CommunityActivityPage page={page} />;
}
