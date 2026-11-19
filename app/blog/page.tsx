import type { Metadata } from "next";
import Blog from "@/components/pages/blog";
import ContactBand from "@/components/layout/contact-band";
import { JsonLd } from "@/components/shared";
import { getPosts } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Structured thinking on positioning, content systems and market clarity for B2B tech marketers, with a focus on travel and hotel tech.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Blog posts={posts} />
      <ContactBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog`,
          url: `${SITE_URL}/blog`,
          blogPost: posts.slice(0, 20).map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.publishedAt })),
        }}
      />
    </>
  );
}
