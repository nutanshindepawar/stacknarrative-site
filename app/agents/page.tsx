import type { Metadata } from "next";
import Agents from "@/components/pages/agents";
import ContactBand from "@/components/layout/contact-band";
import { JsonLd } from "@/components/shared";
import { getAgents } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI agents for content teams",
  description: "AI agents that each take on one specific content-ops job for B2B tech marketers, built on the workflows StackNarrative uses with clients.",
  alternates: { canonical: "/agents" },
};

export default async function AgentsPage() {
  const agents = await getAgents();
  return (
    <>
      <Agents agents={agents} />
      <ContactBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "StackNarrative AI agents",
          itemListElement: agents.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "SoftwareApplication", name: a.name, description: a.job, applicationCategory: "BusinessApplication", url: a.url || `${SITE_URL}/agents#${a.slug}`, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
          })),
        }}
      />
    </>
  );
}
