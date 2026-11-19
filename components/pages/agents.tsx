
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { Agent } from "@/lib/defaults";
import { AgentCard, EmptyState } from "../shared";

export default function Agents({ agents }: { agents: Agent[] }) {
  return (
    <>
<div id="view-agents">
  <section className="page-hero">
    <div className="wrap">
      <a className="crumb" href="/">&larr; Back to home</a>
      <span className="eyebrow" style={{display: "flex"}}>AI Agents</span>
      <h1 style={{marginTop: "18px", fontSize: "clamp(2.4rem,5vw,4.2rem)"}}>AI agents for B2B tech content teams.</h1>
      <p className="lead">Each agent takes on one specific content-ops job, built on the same workflows we use with clients.</p>
    </div>
  </section>
  <section style={{paddingTop: "10px"}}>
    <div className="wrap">{agents.length ? <><div className="agents-list">{agents.map((a) => <AgentCard key={a.slug} a={a} />)}</div><p className="compare-note" style={{marginTop: "22px"}}>More agents are in progress. Follow on <a href="https://www.linkedin.com/in/nutanstrategist/" target="_blank" rel="noopener">LinkedIn</a> to hear when each goes live.</p></> : <EmptyState title="The first agents are being built now." text="Each one will handle a single content-ops job, mapped to a phase of the AI Content Ops Toolbook." />}</div>
  </section>
</div>

    </>
  );
}
