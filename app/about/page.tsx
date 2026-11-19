import type { Metadata } from "next";
import About from "@/components/pages/about";
import ContactBand from "@/components/layout/contact-band";
import { JsonLd } from "@/components/shared";
import { FOUNDER, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "StackNarrative helps great B2B tech products, specialising in travel and hotel tech, become easy to understand, trust and buy. Meet founder Nutan Pawar: engineer turned content strategist.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <ContactBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/about`,
          mainEntity: {
            "@type": "Person",
            name: FOUNDER.name,
            jobTitle: FOUNDER.jobTitle,
            sameAs: [FOUNDER.linkedin],
            worksFor: { "@id": `${SITE_URL}/#org` },
            knowsAbout: ["Software engineering", "Content strategy", "Positioning", "AI content operations", "Travel technology", "Hotel technology"],
          },
        }}
      />
    </>
  );
}
