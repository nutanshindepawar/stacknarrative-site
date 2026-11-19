export default function NotFound() {
  return (
    <section className="page-hero" style={{ paddingBottom: 120 }}>
      <div className="wrap">
        <span className="eyebrow" style={{ display: "flex" }}>404</span>
        <h1 style={{ marginTop: 18, fontSize: "clamp(2.4rem,5vw,4.2rem)" }}>This page took a different path.</h1>
        <p className="lead">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="hero-ctas" style={{ marginTop: 30 }}>
          <a className="btn btn-primary" href="/">Back to home <span className="arr">&rarr;</span></a>
          <a className="btn btn-ghost" href="/blog">Read the blog</a>
        </div>
      </div>
    </section>
  );
}
