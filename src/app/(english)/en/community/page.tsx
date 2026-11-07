import type { Metadata } from "next";
import { CommunityHome } from "@/english/components/community/CommunityPages";
import { COMMUNITY_HOME } from "@/english/lib/community";

export const metadata: Metadata = {
  title: COMMUNITY_HOME.metaTitle,
  description: COMMUNITY_HOME.description,
};

/** /community — the TX Community hub. */
export default function CommunityPage() {
  return <CommunityHome />;
}
