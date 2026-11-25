// The three StackNarrative services. Single source for the homepage Services section (short)
// and the /services page (full). Copy approved by Nutan on 2026-11-25. US English.

export type ServiceItem = { name: string; short: string; text: string };
export type Service = {
  id: "content" | "clarity" | "systems";
  n: string;
  title: string;
  startHere: string;
  summary: string; // one line for the homepage card
  lead: string; // bold opening line on /services
  leadMore?: string;
  insight?: string;
  items: ServiceItem[];
  note?: { title: string; text: string };
  cta: { label: string; href: string };
  img: string;
  alt: string;
};

export const SERVICES_INTRO = {
  eyebrow: "Services",
  title: "One job: make your product easy to understand.",
  short: "Every buyer meets your product without you in the room. We make sure it explains itself. Three ways to work with us; start with any.",
  full: "Buyers meet your product without you in the room: on your website, in a forwarded PDF, in an AI answer. We make sure it explains itself. Three ways to work with us; start with any.",
};

export const SERVICES: Service[] = [
  {
    id: "content",
    n: "01",
    title: "Content that explains your product",
    startHere: "Start here if your content strategy and brand positioning are clear.",
    summary: "Your product knowledge, research and expertise, turned into marketing and sales assets.",
    lead: "Sometimes you don't need another strategy exercise. You need content that gets the job done.",
    leadMore: "We turn your product knowledge, research and expertise into marketing and sales assets.",
    insight: "The person who signs rarely sees your demo. They see whatever your champion forwards to them. We write for that forward.",
    items: [
      { name: "Whitepapers and research reports", short: "Whitepapers & reports", text: "Industry insight your market quotes." },
      { name: "Lead magnets", short: "Lead magnets", text: "Guides and tools that earn the email address." },
      { name: "Sales assets", short: "Sales assets", text: "One-pagers, case studies, comparison pages and decks your sales team actually sends." },
      { name: "Blogs", short: "Blogs", text: "Built to rank on Google and show up in AI answers." },
      { name: "Emails and newsletters", short: "Emails", text: "Nurture that keeps you in mind until the timing is right." },
      { name: "Website copy", short: "Website copy", text: "Homepages and product pages that explain things fast." },
    ],
    cta: { label: "Start with content", href: "/contact" },
    img: "/img/svc-content.jpg",
    alt: "Content writer drafting notes next to her laptop",
  },
  {
    id: "clarity",
    n: "02",
    title: "Clarity before content",
    startHere: "Start here if every piece sounds different.",
    summary: "What to say, who to say it to and why they should care, before you create more content.",
    lead: "Before creating more content, we help you figure out what to say, who to say it to and why they should care.",
    insight: "If your founder, your sales team and your website each describe the product differently, buyers hear three different products. More content won't fix that. One clear story will.",
    items: [
      { name: "Market and competitive analysis", short: "Market & competitor analysis", text: "How buyers choose, and how your competitors are positioned." },
      { name: "Content audit", short: "Content audit", text: "What you have, what works, what's missing, what contradicts itself." },
      { name: "Positioning", short: "Positioning", text: "What you should be known for, and by whom." },
      { name: "Messaging", short: "Messaging", text: "Answers to why this, why now and what do I get, for every buyer in the room: GM, owner, revenue manager, IT." },
      { name: "Content strategy and planning", short: "Strategy & planning", text: "A plan tied to your sales goals, not a calendar full of topics." },
    ],
    note: { title: "Already clear on your positioning?", text: "Then skip this. We'll take your messaging and execute only." },
    cta: { label: "Get clear first", href: "/contact" },
    img: "/img/svc-clarity.jpg",
    alt: "Team analyzing charts and market data around a table",
  },
  {
    id: "systems",
    n: "03",
    title: "Systems that let you scale",
    startHere: "Start here if content is slow, or depends on one person.",
    summary: "Processes, workflows and custom AI tools so your team produces more, without losing quality.",
    lead: "We design and set up the processes, workflows and AI-enabled operations that help your team produce, manage and scale content without adding unnecessary complexity.",
    items: [
      { name: "Content operations setup", short: "Content ops setup", text: "Clear steps, owners and standards from idea to published." },
      { name: "Workflows", short: "Workflows", text: "Briefs, reviews and approvals that don't stall." },
      { name: "Custom AI tools", short: "Custom AI tools", text: "Built on your messaging, voice and product facts, so you get more content without losing quality or your message." },
      { name: "Hand-over", short: "Hand-over & training", text: "We build it, train your team, and it's yours to keep." },
    ],
    cta: { label: "See the systems in our free toolbook", href: "/toolbook" },
    img: "/img/svc-systems.jpg",
    alt: "Marketer organizing a content workflow on a sticky-note board",
  },
];

export const START_WHERE = [
  { quote: "We know our story. We just don't have time to write, and we want an industry expert like you.", id: "content", label: "Content" },
  { quote: "Sales explains it one way, the website another.", id: "clarity", label: "Clarity" },
  { quote: "Our content depends on one or two people. We want to stay lean and scale without losing quality.", id: "systems", label: "Systems" },
] as const;
