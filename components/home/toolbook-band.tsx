
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { Phase, ToolbookEntry } from "@/lib/content";
import { FeaturedCards, PhaseGrid } from "../shared";

export default function ToolbookBand({ phases, entries }: { phases: Phase[]; entries: ToolbookEntry[] }) {
  return (
    <>

<section className="dark" id="toolbook-band">
  <div className="wrap tb-grid">
    <div className="rv">
      <span className="eyebrow">Free and open · AI Content Ops Toolbook</span>
      <h2 style={{marginTop: "20px"}}>The B2B AI content operations playbook, <span className="hl">built in the open.</span></h2>
      <p className="lead" style={{marginTop: "20px"}}>12 phases of content operations, from business strategy to knowledge-base updates. Pick a phase, choose a process, choose an automation and follow a step-by-step guide.</p>
      <ul className="tb-points">
        <li>Practical automations and tools for B2B content and marketing teams</li>
        <li>Written by practitioners, reviewed by an editor for accuracy and clarity</li>
        <li>Built something that works? Contributors get credited as author, with a link back</li>
      </ul>
      <div className="hero-ctas">
        <a className="btn btn-green" href="/toolbook">Explore the toolbook <span className="arr">&rarr;</span></a>
        <a className="btn btn-ghost" href="https://stacknarrative.com/AI-content-ops-guide/contribute" target="_blank" rel="noopener">Submit your automation</a>
      </div>
    </div>
    <PhaseGrid phases={phases} />
  </div>
  {entries.length > 0 && <div className="wrap">
    <div className="feat-head rv"><h3 style={{fontSize: "1.6rem"}}>Latest in the toolbook</h3><a className="btn btn-ghost" href="https://stacknarrative.com/AI-content-ops-guide/contribute" target="_blank" rel="noopener">Get your automation featured <span className="arr">&rarr;</span></a></div>
    <FeaturedCards entries={entries} />
  </div>}
</section>


    </>
  );
}
