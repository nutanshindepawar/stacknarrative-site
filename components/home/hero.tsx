
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { ClientCase } from "@/lib/defaults";
import { CaseCard } from "../shared";

// "Trusted by" strip: these five names only. A name with a matching Work case shows that exact case card
// in a pop-up on hover, keyboard focus or tap. Names without a case (Red Bull) show no pop-up.
const TRUSTED = [
  { name: "HBX Group", match: "HBX Group" },
  { name: "Dharma Hospitality", match: "Dharma Hospitality" },
  { name: "Welcome Pickups", match: "Welcome Pickups" },
  { name: "Zatlas", match: "Zatlas" },
  { name: "Red Bull", match: "Red Bull" },
];

export default function Hero({ cases = [] }: { cases?: ClientCase[] }) {
  const trusted = TRUSTED.map((t) => ({ ...t, c: cases.find((c) => c.name.startsWith(t.match)) }));
  return (
    <>
<section className="hero">
  <div className="wrap hero-grid">
    <div>
      <span className="eyebrow">The content engine for B2B tech · specializing in travel &amp; hotel tech</span>
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
    {/* Hero visual (before / after): the buyer hears product-speak and is lost; after StackNarrative they hear the value and want to talk.
        The example lines are generic illustrations, not quotes from a client. */}
    <div className="hero-photo" role="img" aria-label="Before: a list of features, and your buyer is confused by your messaging. After StackNarrative: the buyer hears the value in plain words and says: I get it, let's talk.">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hp-img" src="/img/hero-nutan.jpg" alt="Nutan Pawar, founder of StackNarrative, working at her desk" width={1000} height={1250} fetchPriority="high" />
      <div className="ba-card ba-before" aria-hidden="true">
        <span className="ba-k"><i className="ba-dot"></i>Before</span>
        <p className="ba-say">&ldquo;Real-time 2-way sync, 40+ integrations, open API&hellip;&rdquo;</p>
        <p className="ba-q"><span className="ba-qm">?</span>Your buyer is confused by your messaging.</p>
      </div>
      <div className="ba-card ba-after" aria-hidden="true">
        <span className="ba-k"><i className="ba-dot"></i>After StackNarrative</span>
        <p className="ba-say">&ldquo;Fewer manual updates. More time for your guests.&rdquo;</p>
        <p className="ba-yes"><span className="ba-ok"></span>I get it. Let&rsquo;s talk.</p>
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
    <ul className="tr-list" aria-label="Clients">
      {trusted.map((t, i) =>
        t.c ? (
          <li key={t.name} className={`tr-item${i >= trusted.length - 2 ? " tr-end" : ""}`}>
            <button type="button" className="tr-name" aria-expanded="false" aria-controls={`tr-pop-${i}`}>{t.name}</button>
            <div className="tr-pop" id={`tr-pop-${i}`}>
              <CaseCard c={t.c} reveal={false} />
            </div>
          </li>
        ) : (
          <li key={t.name} className="tr-item"><span className="tr-name tr-plain">{t.name}</span></li>
        )
      )}
    </ul>
  </div>
</div>

    </>
  );
}
