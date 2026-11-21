
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
export default function Hero() {
  return (
    <>
<section className="hero">
  <div className="wrap hero-grid">
    <div>
      <span className="eyebrow">The content engine for B2B tech · specialising in travel &amp; hotel tech</span>
      <h1 style={{marginTop: "22px"}}><span className="line">Your product is great.</span><span className="line">Your buyers just <span className="hl">don't get it</span> yet.</span></h1>
      <p className="lead">We turn what your team already knows into content buyers understand and trust.</p>
      <ul className="hero-flow">
        <li><span className="k">You bring</span><span>Market insight, founder expertise, product knowledge</span></li>
        <li><span className="k">We deliver</span><span>Positioning, thought leadership, product messaging, sales content</span></li>
        <li><span className="k">Powered by</span><span>AI content operations that need very little of your time</span></li>
      </ul>
      <div className="hero-ctas">
        <a className="btn btn-primary" href="#contact">Talk to us about your content <span className="arr">&rarr;</span></a>
        <a className="btn btn-ghost" href="/toolbook">Explore the AI Content Ops Toolbook</a>
      </div>
      <p className="hero-note">Built for B2B tech teams, especially in travel and hotel tech, that already have product-market fit and a sales team to feed.</p>
    </div>
    <div className="hero-photo" aria-label="A busy week for a B2B marketing team, and how StackNarrative takes it off their plate">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hp-img" src="/img/hero-marketer.jpg" alt="Smiling marketing professional at her desk with a tablet" width={1000} height={1500} fetchPriority="high" />
      <div className="hp-card hp-todo">
        <span className="hp-k">This week</span>
        <ul>
          <li>Launch blog due Friday</li>
          <li>Founder too busy to brief anyone</li>
          <li>Sales needs a one-pager for a hotel group</li>
        </ul>
      </div>
      <div className="hp-card hp-done">
        <span className="hp-k"><i aria-hidden="true"></i>With StackNarrative</span>
        <p className="hp-from">One short call with your founder</p>
        <p className="hp-to">Blog, LinkedIn posts and one-pager, ready for your review</p>
      </div>
    </div>
  </div>
</section>

<a className="tb-strip" href="https://stacknarrative.com/AI-content-ops-guide" target="_blank" rel="noopener">
  <span className="wrap tb-strip-in">
    <span className="tb-new">Free</span>
    <span className="tb-txt"><b>AI Content Ops Toolbook:</b> step-by-step AI automations for all 12 phases of B2B content operations</span>
    <span className="tb-go">Open the toolbook <span aria-hidden="true">&#8599;</span></span>
  </span>
</a>

<div className="trusted">
  <div className="wrap trusted-in">
    <span className="label">Trusted by</span>
    <div className="marquee" aria-label="Clients: Welcome Pickups, Dharma, HBX Group, Zatlas, Technogym, Trek The Himalayas, 57hours, Adventure Tripr, Red Bull">
      <div className="marquee-track" aria-hidden="true">
        <span>Welcome Pickups</span><span>Dharma</span><span>HBX Group</span><span>Zatlas</span><span>Technogym</span><span>Trek The Himalayas</span><span>57hours</span><span>Adventure Tripr</span><span>Red Bull</span>
        <span>Welcome Pickups</span><span>Dharma</span><span>HBX Group</span><span>Zatlas</span><span>Technogym</span><span>Trek The Himalayas</span><span>57hours</span><span>Adventure Tripr</span><span>Red Bull</span>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
