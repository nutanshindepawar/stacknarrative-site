// /llms.txt: a plain-text guide to the site for AI assistants and answer engines.
import { getAgents, getPosts } from "@/lib/content";
import { htbFindings, loadHtb } from "@/lib/htb";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, TOOLBOOK_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const [posts, agents] = await Promise.all([getPosts(), getAgents()]);
  const f = htbFindings(loadHtb());
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Services (one job: make your product easy to understand): 1) Content that explains your product: whitepapers and research reports, lead magnets, sales assets, blogs, emails and newsletters, website copy. 2) Clarity before content: market and competitive analysis, content audit, positioning, messaging, content strategy and planning. 3) Systems that let you scale: content operations setup, workflows, custom AI tools and hand-over.",
    `Contact: ${CONTACT_EMAIL} or ${SITE_URL}/contact`,
    "",
    "## Pages",
    `- [Services](${SITE_URL}/services): the three services in detail, client testimonials, latest insights and AI tools`,
    `- [About](${SITE_URL}/about): mission, what StackNarrative is built on, and founder Nutan Pawar`,
    `- [Blog](${SITE_URL}/blog): positioning, content systems and market clarity for B2B tech marketers`,
    `- [AI agents](${SITE_URL}/agents): agents that each take on one content-ops job`,
    `- [AI Content Ops Toolbook](${TOOLBOOK_URL}): free, open guide to B2B AI content operations in 12 phases`,
    `- [State of Hotel Tech Brands 2027](${SITE_URL}/research/state-of-hotel-tech-brands): research on how hospitality tech companies describe themselves`,
    "",
    "## Research: State of Hotel Tech Brands 2027",
    `Independent, rule-based data on how ${f.n} hospitality tech companies describe themselves on their homepages (read ${f.asOf}). No ratings or paid placements. Source: ${SITE_URL}/research/state-of-hotel-tech-brands`,
    `- ${f.ai.any}% mention AI on the homepage; ${f.ai.headline}% put AI in the main headline.`,
    `- Most crowded categories: ${f.cats.slice(0, 3).map((c) => `${c.label} (${c.n} companies)`).join(", ")}.`,
    `- Most promised results: ${f.benefits.slice(0, 3).map((b) => `${b.label} (${b.share}%)`).join(", ")}. Least promised: ${f.benefits[f.benefits.length - 1].label} (${f.benefits[f.benefits.length - 1].share}%).`,
    `- ${f.outcome}% of headlines lead with a business result; ${f.problem}% open with the buyer's problem; ${f.proofNone}% show no numbers near the top of the page.`,
    `- ${f.multi}% sell more than one type of product; ${f.allInOne}% call themselves all-in-one.`,
    `- Most repeated phrases: ${f.phrases.slice(0, 5).map((p) => `"${p.phrase}" (${p.companies} companies)`).join(", ")}.`,
    "",
    ...(posts.length ? ["## Blog posts", ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt.replace(/\s+/g, " ")}` : ""}`), ""] : []),
    ...(agents.length ? ["## AI agents", ...agents.map((a) => `- ${a.name}: ${a.job.replace(/\s+/g, " ")}`), ""] : []),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
