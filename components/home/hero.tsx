
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
    {/* Hero visual: what the content is built on -> the buyer's three questions get answered -> the buyer sees the value. */}
    <div className="hero-photo" role="img" aria-label="Content built on strategic analysis, founder expertise and team knowledge answers your buyer's questions: why this, why now and what do I get. The buyer sees the value and buys.">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hp-img" src="/img/hero-marketer.jpg" alt="" width={1000} height={1500} fetchPriority="high" />
      <svg className="hv-flow" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 24 C 44 22, 70 22, 84 36" />
      </svg>
      <div className="hv-in" aria-hidden="true">
        <span className="hv-h">Built on</span>
        <ul>
          <li><span className="hv-ic"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5M8 12V10M10.5 12V8.5M13 12v-1.5" /></svg></span>Strategic market analysis</li>
          <li><span className="hv-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /><path d="M17.5 3.5l1 1.8 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2-1.5-1.4 2-.3z" /></svg></span>Founder expertise</li>
          <li><span className="hv-ic"><svg viewBox="0 0 24 24"><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M2.5 19a5.5 5.5 0 0 1 11 0M10.5 19a5.5 5.5 0 0 1 11 0" /></svg></span>Team knowledge</li>
        </ul>
      </div>
      <div className="hv-buyer" aria-hidden="true">
        <span className="hv-h"><span className="hv-av"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg></span>Your buyer asks</span>
        <ul>
          <li><span className="hv-mark"><b>?</b><i className="hv-ok"></i></span>Why this?</li>
          <li><span className="hv-mark"><b>?</b><i className="hv-ok"></i></span>Why now?</li>
          <li><span className="hv-mark"><b>?</b><i className="hv-ok"></i></span>What do I get?</li>
        </ul>
      </div>
      <div className="hv-badge" aria-hidden="true"><i></i>Buyer sees the value and buys</div>
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
