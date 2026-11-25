import type { Metadata } from "next";
import ServicesPage from "@/components/pages/services";
import ContactBand from "@/components/layout/contact-band";
import { JsonLd } from "@/components/shared";
import { getAgents, getLatestToolbookAgent, getPosts } from "@/lib/content";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services: content, clarity and content systems for B2B tech",
  description:
    "StackNarrative makes B2B travel and hotel tech products easy to understand: content that explains your product, clarity before content (positioning and messaging), and systems with custom AI tools that let you scale.",
  alternates: { canonical: "/services" },
};

export default async function Page() {
  const [posts, toolbookAgent, agents] = await Promise.all([getPosts(), getLatestToolbookAgent(), getAgents()]);
  return (
    <>
      <ServicesPage posts={posts} toolbookAgent={toolbookAgent} agents={agents} />
      <ContactBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "StackNarrative services",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: s.title, description: s.summary, provider: { "@id": `${SITE_URL}/#org` }, url: `${SITE_URL}/services#svc-${s.id}` },
          })),
        }}
      />
    </>
  );
}
