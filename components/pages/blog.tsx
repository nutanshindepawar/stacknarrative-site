
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { PostCard } from "@/lib/content";
import { EmptyState, PostGrid } from "../shared";

export default function Blog({ posts }: { posts: PostCard[] }) {
  const cats = [...new Set(posts.map((p) => p.category || "Article"))];
  return (
    <>
<div id="view-blog">
  <section className="page-hero">
    <div className="wrap ph-grid">
      <div className="ph-copy">
      <a className="crumb" href="/">&larr; Back to home</a>
      <span className="eyebrow" style={{display: "flex"}}>Blog</span>
      <h1 style={{marginTop: "18px", fontSize: "clamp(2.4rem,5vw,4.2rem)"}}>Clear thinking for B2B tech marketers.</h1>
      <p className="lead">Structured thinking on positioning, systems and market clarity. Four new posts every month.</p>
    </div>
      <figure className="ph-photo rv">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img style={{"--pos": "50% 30%"} as React.CSSProperties} src="/img/blog-window.jpg" alt="Smiling woman reading by a bright window" width={1000} height={1500} />
      </figure>
    </div>
  </section>
  <section style={{paddingTop: "10px"}}>
    <div className="wrap">
      {posts.length > 0 && cats.length > 1 && <div className="filters" id="blogFilters">{["All", ...cats].map((c, i) => <button type="button" key={c} data-c={c} aria-pressed={i === 0}>{c}</button>)}</div>}
      {posts.length > 0 ? <PostGrid posts={posts} /> : <EmptyState title="The first posts are on their way." text="We publish four posts a month on positioning, content systems and market clarity for B2B tech, with a focus on travel and hotel tech. Follow along on LinkedIn to get them as they land." topics={["Positioning", "Content systems", "Market clarity", "AI content ops"]} />}
    </div>
  </section>
</div>

    </>
  );
}
