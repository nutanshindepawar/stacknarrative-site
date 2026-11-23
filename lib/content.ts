// All build-time data fetching: Sanity (posts, agents, client work, pages) and the
// toolbook's Supabase database (phases and latest published entries).
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { DEFAULT_AGENTS, DEFAULT_CASES, DEFAULT_PHASES, type Agent, type ClientCase } from "./defaults";
import { TOOLBOOK_URL } from "./site";

// Static builds read fresh data straight from the API, not the CDN cache.
const sanity = client.withConfig({ useCdn: false });

async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (err) {
    console.warn(`[content] ${label} failed, using fallback:`, (err as Error).message);
    return fallback;
  }
}

/* ---------- Blog ---------- */
export type PostCard = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
};
export type Post = PostCard & {
  _updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  quickAnswer?: string;
  keyTakeaways?: string[];
  faqs?: { question: string; answer: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  authorName?: string;
};

const POST_CARD = `title, "slug": slug.current, publishedAt, excerpt, "category": categories[0]->title,
  "imageUrl": mainImage.asset->url, "imageAlt": mainImage.alt`;

const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc){${POST_CARD}}`,
);
const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{${POST_CARD}, _updatedAt, seoTitle, seoDescription, quickAnswer, keyTakeaways, faqs,
    "authorName": author->name,
    body[]{..., _type == "image" => {..., "url": asset->url}}}`,
);

// Preview helper: SN_SAMPLE_POST=1 adds a clearly marked sample post so the article template can be
// checked before real posts exist. Never set this for production builds.
const SAMPLE = process.env.SN_SAMPLE_POST === "1";
const block = (text: string, style = "normal") => ({ _type: "block", _key: Math.random().toString(36).slice(2), style, markDefs: [], children: [{ _type: "span", _key: "s", text, marks: [] }] });
const SAMPLE_POST: Post = {
  title: "Sample post: how this article template looks",
  slug: "sample-post",
  publishedAt: "2026-11-19T09:00:00Z",
  _updatedAt: "2026-11-19T09:00:00Z",
  excerpt: "A preview-only sample used to check the blog layout. It never appears in production builds.",
  category: "Positioning",
  quickAnswer: "This box shows your post's quick answer: one or two sentences that directly answer the main question, so AI engines and featured snippets can quote you.",
  keyTakeaways: ["Key takeaways appear as a short list", "They summarise the post at a glance", "Up to six per post"],
  faqs: [{ question: "Where do FAQs come from?", answer: "From the FAQs field on each post in Sanity. They also become FAQ structured data." }],
  body: [block("First section", "h2"), block("Body text renders here."), block("Second section", "h2"), block("More body text."), block("Third section", "h2"), block("A pull quote looks like this.", "blockquote")],
  authorName: "Nutan Pawar",
};

export const getPosts = async () => {
  const rows = await safe<PostCard[]>("posts", () => sanity.fetch(POSTS_QUERY), []);
  return SAMPLE ? [SAMPLE_POST, ...rows] : rows;
};
export const getPost = async (slug: string) =>
  SAMPLE && slug === SAMPLE_POST.slug ? SAMPLE_POST : safe<Post | null>("post", () => sanity.fetch(POST_QUERY, { slug }), null);

/* ---------- Agents & client work ---------- */
const AGENTS_QUERY = defineQuery(
  `*[_type == "agent" && defined(slug.current)] | order(coalesce(order, 999) asc, _createdAt asc){
    name, "slug": slug.current, status, job, outputs, forWho, phase, platform, time, url, guideUrl, order}`,
);
const CASES_QUERY = defineQuery(
  `*[_type == "clientCase"] | order(coalesce(order, 999) asc, _createdAt asc){name, website, segment, summary, deliverables, links[]{label, url}, order}`,
);

export async function getAgents(): Promise<Agent[]> {
  const rows = await safe<Agent[]>("agents", () => sanity.fetch(AGENTS_QUERY), []);
  return rows.length ? rows : DEFAULT_AGENTS;
}
export async function getCases(): Promise<ClientCase[]> {
  const rows = await safe<ClientCase[]>("client work", () => sanity.fetch(CASES_QUERY), []);
  return rows.length ? rows : DEFAULT_CASES;
}

/* ---------- Pages ---------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PageSection = { _type: string; _key: string; [k: string]: any };
export type CmsPage = {
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  showInMenu?: boolean;
  menuGroup?: "top" | "why" | "work";
  sections?: PageSection[];
};
const PAGES_QUERY = defineQuery(
  `*[_type == "page" && defined(slug.current)]{title, "slug": slug.current, seoTitle, seoDescription, showInMenu, menuGroup}`,
);
const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{title, "slug": slug.current, seoTitle, seoDescription, showInMenu, menuGroup, sections}`,
);
export const getPages = () => safe<CmsPage[]>("pages", () => sanity.fetch(PAGES_QUERY), []);
export const getPage = (slug: string) => safe<CmsPage | null>("page", () => sanity.fetch(PAGE_QUERY, { slug }), null);

/* ---------- Toolbook (Supabase, public read-only via anon key) ---------- */
export type Phase = { number: number; slug: string; name: string; description: string };
export type ToolbookEntry = {
  kind: "Automation" | "Tool" | "AI agent" | "Resource";
  title: string;
  summary?: string;
  phase?: string;
  author?: string;
  authorUrl?: string;
  url: string;
  updatedAt: string;
};

async function supabase<T>(path: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_TOOLBOOK_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_TOOLBOOK_SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error("toolbook Supabase env vars are not set");
  const res = await fetch(`${base}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getPhases(): Promise<Phase[]> {
  const rows = await safe<Phase[]>("phases", () => supabase("phases?select=number,slug,name,description&order=number"), []);
  return rows.length ? rows : DEFAULT_PHASES;
}

const RESOURCE_KIND: Record<string, ToolbookEntry["kind"]> = { tool: "Tool", ai_agent: "AI agent" };
const firstPara = (s?: string | null) => (s ? s.split(/\n\s*\n/)[0].trim().slice(0, 220) : undefined);

export async function getLatestToolbook(limit = 4): Promise<ToolbookEntry[]> {
  type Auto = { slug: string; title: string; contributor_name?: string; contributor_website?: string; updated_at: string; processes?: { phases?: { name: string } } };
  type Res = { slug: string; title: string; type: string; description?: string; contributor_name?: string; contributor_website?: string; updated_at: string };
  const [autos, res] = await Promise.all([
    safe<Auto[]>("toolbook automations", () =>
      supabase(`automations?select=slug,title,contributor_name,contributor_website,updated_at,processes(phases(name))&status=eq.published&order=updated_at.desc&limit=${limit}`), []),
    safe<Res[]>("toolbook resources", () =>
      supabase(`resources?select=slug,title,type,description,contributor_name,contributor_website,updated_at&status=eq.published&slug=not.is.null&order=updated_at.desc&limit=${limit}`), []),
  ]);
  const entries: ToolbookEntry[] = [
    ...autos.map((a) => ({
      kind: "Automation" as const,
      title: a.title,
      phase: a.processes?.phases?.name,
      author: a.contributor_name || "StackNarrative Team",
      authorUrl: a.contributor_website || undefined,
      url: `${TOOLBOOK_URL}/automation/${a.slug}`,
      updatedAt: a.updated_at,
    })),
    ...res.map((r) => ({
      kind: RESOURCE_KIND[r.type] || ("Resource" as const),
      title: r.title,
      summary: firstPara(r.description),
      author: r.contributor_name || "StackNarrative Team",
      authorUrl: r.contributor_website || undefined,
      url: `${TOOLBOOK_URL}/resource/${r.slug}`,
      updatedAt: r.updated_at,
    })),
  ];
  return entries.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt)).slice(0, limit);
}

// Latest AI agent added to the toolbook (homepage Resources row).
export async function getLatestToolbookAgent(): Promise<ToolbookEntry | null> {
  type Res = { slug: string; title: string; description?: string; contributor_name?: string; contributor_website?: string; updated_at: string };
  const rows = await safe<Res[]>("toolbook agent", () =>
    supabase(`resources?select=slug,title,description,contributor_name,contributor_website,updated_at&status=eq.published&type=eq.ai_agent&slug=not.is.null&order=updated_at.desc&limit=1`), []);
  const r = rows[0];
  if (!r) return null;
  return {
    kind: "AI agent",
    title: r.title,
    summary: firstPara(r.description),
    author: r.contributor_name || "StackNarrative Team",
    authorUrl: r.contributor_website || undefined,
    url: `${TOOLBOOK_URL}/resource/${r.slug}`,
    updatedAt: r.updated_at,
  };
}
