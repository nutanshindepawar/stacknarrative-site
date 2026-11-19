// Built-in content shown until the matching documents exist in Sanity.
// The seed script (scripts/seed-sanity.mts) imports exactly this content into Sanity,
// after which the site reads it from there and you edit it in the Studio.

export type WorkLink = { label: string; url: string };
export type ClientCase = {
  name: string;
  website?: string;
  segment?: string;
  summary: string;
  deliverables?: string[];
  links?: WorkLink[];
  order?: number;
};
export type Agent = {
  name: string;
  slug: string;
  status: "live" | "coming-soon";
  job: string;
  outputs?: string[];
  forWho?: string;
  phase?: string;
  platform?: string;
  time?: string;
  url?: string;
  guideUrl?: string;
  order?: number;
};

export const DEFAULT_CASES: ClientCase[] = [
  {
    name: "HBX Group (Hotelbeds)",
    website: "https://www.hbxgroup.com",
    segment: "Travel distribution",
    summary:
      "A global travel technology platform connecting hotels, distributors and travel brands. We turned market research, traveller trends and product expertise into reports, product messaging and customer education for hotel partners.",
    deliverables: ["Travel Trends Report 2026", "Case studies", "Blogs"],
    links: [
      { label: "Travel Trends Report 2026", url: "https://drive.google.com/file/d/1OB-UPmpFPxLT07TgV-j32IcdsXKTCAKG/view?usp=drive_link" },
      { label: "Case study: Minor Hotels", url: "https://www.hbxgroup.com/resources/articles/minor-hotels" },
      { label: "Product update: Partner Accelerator Programme", url: "https://discover.hotelbeds.com/resources/insight/partner-accelerator-programme" },
      { label: "Hotel Segmentation", url: "https://www.hbxgroup.com/resources/articles/hotel-segmentation" },
      { label: "How to Attract Gen Z Travellers to Hotels", url: "https://www.hbxgroup.com/resources/articles/how-attract-gen-z-travellers-hotels" },
    ],
    order: 1,
  },
  {
    name: "Dharma Hospitality",
    website: "https://www.dharma-grp.com",
    segment: "Property management",
    summary:
      "An AI-powered remote property management company that recently pivoted from a pure tech company to remote services. We supported that major transition end to end, from market research to brand messaging and branding materials. We also built their new website using Claude and work within their AI operations team.",
    deliverables: ["Branding materials", "Website, built with Claude", "Content strategy", "Blogs, LinkedIn, newsletters, ads"],
    links: [
      { label: "Hybrid Hospitality: Why Hotels, Apartments and Rentals Are Converging", url: "https://www.dharma-grp.com/en/blog-posts/hybrid-hospitality-why-hotels-apartments-and-rentals-are-converging" },
      { label: "Work Order SOP Templates", url: "https://www.dharma-grp.com/en/blog-posts/work-order-sop-templates-operations" },
      { label: "Vacation Rental Operations: Insights for Property Managers", url: "https://www.dharma-grp.com/en/blog-posts/vacation-rental-operations-insights-property-managers" },
    ],
    order: 2,
  },
  {
    name: "Welcome Pickups",
    website: "https://www.welcomepickups.com",
    segment: "Traveller experience",
    summary:
      "An airport transfer and traveller experience platform in 350+ cities. We built AEO/SEO pages grounded in market research and verified data. They rank on Google's first page and appear in Google's AI Overviews, bringing in high-intent travellers across international markets.",
    deliverables: ["50+ SEO pages in 3 months", "Research-backed", "Results-driven"],
    links: [
      { label: "Airport-to-city transfer AEO/SEO pages", url: "https://www.welcomepickups.com/lisbon/airport-transfer-to-city/" },
      { label: "City travel guides: Mykonos", url: "https://www.welcomepickups.com/guides/greece/mykonos/top-things-to-do-in-mykonos/" },
    ],
    order: 3,
  },
  {
    name: "Zatlas",
    website: "https://www.zatlas.com/en",
    segment: "Revenue intelligence",
    summary:
      "A finance and revenue intelligence platform for hotels. We built thought leadership on revenue intelligence and market data to support Zatlas's expansion in Mexico around FIFA 2026, linking industry trends to the value of data-driven decisions.",
    order: 4,
  },
];

export const DEFAULT_AGENTS: Agent[] = [
  {
    name: "Blog Brief Gem",
    slug: "blog-brief-gem",
    status: "live",
    job: "Turns a blog topic or core thesis into a detailed, research-backed brief. It researches forums, industry sources, reports and expert interviews, then writes recommendations from two angles: a B2B content strategist and a hospitality operations expert.",
    outputs: ["Brief overview", "Introduction framework", "Two outline versions", "References", "Writing notes", "SEO/AEO FAQ section"],
    forWho: "Content strategists, content marketing managers, hotel-tech and travel-tech marketers, founders writing thought leadership, and teams briefing freelance writers",
    phase: "Content Design & Brief Creation",
    platform: "Google Gemini (Gem)",
    time: "10–20 min per brief",
    url: "https://gemini.google.com/gem/1bJXUdo2xKSsGRzvLFKoUFm-apSDOv2cF?usp=sharing",
    guideUrl: "https://stacknarrative.com/AI-content-ops-guide/automation/generate-research-backed-blog-briefs-with-a-gemini-gem",
    order: 1,
  },
];

export const DEFAULT_PHASES = [
  "Business Strategy", "Market & Customer Intelligence", "Content Strategy & Planning", "Knowledge Capture & Research",
  "Content Design & Brief Creation", "Content Production", "Review, QA & Compliance", "Repurposing & Content Reuse",
  "CMS & Content Library", "Distribution & Activation", "Performance, Learning & Optimization", "Knowledge Base Updates",
].map((name, i) => ({ number: i + 1, slug: "", name, description: "" }));
