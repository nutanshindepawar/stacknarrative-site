import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactBand from "@/components/layout/contact-band";
import Portable, { blockText, headings } from "@/components/portable";
import Share from "@/components/share";
import { JsonLd, PostGrid, fmtDate } from "@/components/shared";
import { getPost, getPosts } from "@/lib/content";
import { FOUNDER, SITE_NAME, SITE_URL } from "@/lib/site";

// Only posts that exist at build time get pages; publishing in Sanity triggers a rebuild.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // A static export needs at least one path; "_placeholder" renders a 404 until the first post exists.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_placeholder" }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  const description = post.seoDescription || post.excerpt || post.quickAnswer || "";
  const image = post.imageUrl ? `${post.imageUrl}?w=1200&h=630&fit=crop&auto=format` : undefined;
  return {
    title: post.seoTitle || post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.authorName || FOUNDER.name],
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: post.imageAlt || post.title }] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const toc = headings(post.body);
  const words = (post.body || []).filter((b) => b._type === "block").map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const related = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const hasToc = toc.length > 2;

  const ld: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription || post.excerpt || post.quickAnswer,
      url,
      mainEntityOfPage: url,
      datePublished: post.publishedAt,
      dateModified: post._updatedAt,
      wordCount: words,
      ...(post.imageUrl ? { image: `${post.imageUrl}?w=1200&auto=format` } : {}),
      ...(post.category ? { articleSection: post.category } : {}),
      author: { "@type": "Person", name: post.authorName || FOUNDER.name, sameAs: [FOUNDER.linkedin] },
      publisher: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
      ...(post.keyTakeaways?.length ? { abstract: post.keyTakeaways.join(" ") } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }

  return (
    <>
      <article className="article">
        <header className="page-hero article-hero">
          <div className="wrap">
            <div className="article-head">
              <a className="crumb" href="/blog">&larr; All posts</a>
              <span className="eyebrow" style={{ display: "flex" }}>
                {post.category || "Article"}
              </span>
              <h1>{post.title}</h1>
              {post.excerpt && <p className="lead">{post.excerpt}</p>}
              <p className="article-meta">
                By {post.authorName || FOUNDER.name} · <time dateTime={post.publishedAt}>{fmtDate(post.publishedAt)}</time> · {minutes} min read
              </p>
              <div className="share-mobile">
                <Share url={url} title={post.title} />
              </div>
            </div>
          </div>
        </header>
        <div className="wrap article-layout">
          <div className="article-main article-body">
            {post.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="article-cover" src={`${post.imageUrl}?w=1600&auto=format`} alt={post.imageAlt || ""} />
            )}
            {post.quickAnswer && (
              <aside className="quick-answer" aria-label="Quick answer">
                <span className="k">Quick answer</span>
                <p>{post.quickAnswer}</p>
              </aside>
            )}
            {!!post.keyTakeaways?.length && (
              <aside className="takeaways" aria-label="Key takeaways">
                <span className="k">Key takeaways</span>
                <ul>
                  {post.keyTakeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </aside>
            )}
            {hasToc && (
              <details className="toc toc-mobile">
                <summary>
                  <span className="k">In this article ({toc.length})</span>
                </summary>
                <TocList toc={toc} />
              </details>
            )}
            <div className="prose">
              <Portable value={post.body} />
            </div>
            {!!post.faqs?.length && (
              <section className="faqs" aria-labelledby="faq-h">
                <h2 id="faq-h">Frequently asked questions</h2>
                {post.faqs.map((f) => (
                  <details key={f.question}>
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </section>
            )}
            <div className="share-end">
              <p>Found this useful? Share it with your team.</p>
              <Share url={url} title={post.title} />
            </div>
          </div>
          <aside className="article-side" aria-label="Article tools">
            <div className="side-sticky">
              {hasToc && (
                <nav className="toc toc-side" aria-label="In this article">
                  <span className="k">In this article</span>
                  <TocList toc={toc} />
                </nav>
              )}
              <Share url={url} title={post.title} label="Share" />
              <div className="side-cta">
                <p className="side-cta-h">Is your product hard to explain?</p>
                <p>We turn what your team knows into content B2B tech buyers understand and trust.</p>
                <a className="btn btn-primary" href="/contact">
                  Let&rsquo;s talk <span className="arr">&rarr;</span>
                </a>
                <a className="side-cta-link" href="/toolbook">
                  Explore the AI Content Ops Toolbook&nbsp;&rarr;
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section style={{ paddingTop: 30 }}>
          <div className="wrap">
            <h2 style={{ fontSize: "1.8rem", marginBottom: 22 }}>Keep reading</h2>
            <PostGrid posts={related} />
          </div>
        </section>
      )}
      <ContactBand />
      <JsonLd data={ld} />
    </>
  );
}

function TocList({ toc }: { toc: { id: string; text: string }[] }) {
  return (
    <ol>
      {toc.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} data-toc={h.id}>
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
