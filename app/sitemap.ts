import type { MetadataRoute } from "next";
import { getPages, getPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Rebuilt on every publish, so new posts and pages are always listed.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  const now = new Date();
  const fixed = ["", "/services", "/about", "/blog", "/agents", "/toolbook", "/contact"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: (p === "/blog" || p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  return [
    ...fixed,
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.publishedAt ? new Date(p.publishedAt) : now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...pages.map((p) => ({ url: `${SITE_URL}/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
