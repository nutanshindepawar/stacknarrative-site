import type { Metadata } from "next";
import Toolbook from "@/components/pages/toolbook";
import ContactBand from "@/components/layout/contact-band";
import { getLatestToolbook, getPhases } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Content Ops Toolbook",
  description:
    "A free, open guide to B2B AI content operations: 12 phases from business strategy to knowledge-base updates, with step-by-step automations contributed by practitioners.",
  alternates: { canonical: "/toolbook" },
};

export default async function ToolbookPage() {
  const [phases, entries] = await Promise.all([getPhases(), getLatestToolbook(2)]);
  return (
    <>
      <Toolbook phases={phases} entries={entries} />
      <ContactBand />
    </>
  );
}
