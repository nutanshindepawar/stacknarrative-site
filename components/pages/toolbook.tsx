
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { Phase, ToolbookEntry } from "@/lib/content";
import { FeaturedCards, PhaseList } from "../shared";

export default function Toolbook({ phases, entries }: { phases: Phase[]; entries: ToolbookEntry[] }) {
  return (
    <>
<div id="view-toolbook">
  <section className="page-hero">
    <div className="wrap">
      <a className="crumb" href="/">&larr; Back to home</a>
      <span className="eyebrow" style={{display: "flex"}}>AI Content Ops Toolbook</span>
      <h1 style={{marginTop: "18px", fontSize: "clamp(2.4rem,5vw,4.2rem)"}}>The B2B AI content operations guide.</h1>
      <p className="lead">Explore a phase, choose a process, choose an automation, follow a step-by-step guide. Free, practical and built with contributions from people doing the work.</p>
      <div className="hero-ctas" style={{marginTop: "30px"}}>
        <a className="btn btn-primary" href="https://stacknarrative.com/AI-content-ops-guide" target="_blank" rel="noopener">Open the full guide <span className="arr">&#8599;</span></a>
        <a className="btn btn-ghost" href="https://stacknarrative.com/AI-content-ops-guide/contribute" target="_blank" rel="noopener">Contribute an automation</a>
      </div>
    </div>
  </section>
  <section style={{paddingTop: "10px"}}>
    <div className="wrap">
      {entries.length > 0 && <><h2 style={{fontSize: "1.8rem", marginBottom: "22px"}}>Latest entries</h2>
      <div style={{marginBottom: "60px"}}><FeaturedCards entries={entries} light /></div></>}
      <h2 style={{fontSize: "1.8rem", marginBottom: "22px"}}>Browse all 12 phases</h2>
      <PhaseList phases={phases} />
    </div>
  </section>
  <section className="dark">
    <div className="wrap">
      <div className="head">
        <span className="eyebrow">Contribute</span>
        <h2>Built an automation that saves your content team hours? Share it.</h2>
        <p className="lead">Contributions are voluntary and unpaid. In return, you're credited as the author on the published guide with a link to your site or profile.</p>
      </div>
      <div className="how">
        <div><b>1. Pick one thing</b><p>A specific, tested automation or tool your team actually uses.</p></div>
        <div><b>2. See an example</b><p>Read an existing guide to match the format before you write.</p></div>
        <div><b>3. Fill in the form</b><p>Make it clear enough that someone else could follow it step by step.</p></div>
        <div><b>4. Editor review</b><p>An editor reviews every submission for accuracy, clarity and fit, and may email you.</p></div>
      </div>
      <div className="hero-ctas" style={{marginTop: "40px"}}>
        <a className="btn btn-green" href="https://stacknarrative.com/AI-content-ops-guide/contribute" target="_blank" rel="noopener">Submit your automation <span className="arr">&#8599;</span></a>
      </div>
    </div>
  </section>
</div>

    </>
  );
}
