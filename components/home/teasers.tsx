
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { Agent } from "@/lib/defaults";
import type { PostCard } from "@/lib/content";

export default function Teasers({ latest, agents }: { latest?: PostCard; agents: Agent[] }) {
  const live = agents.filter((x) => x.status === "live");
  const agent = live[live.length - 1] || agents[0];
  return (
    <>

<section style={{paddingTop: "20px"}}>
  <div className="wrap teasers">
    <div className="teaser rv">
      <span className="eyebrow">Blog</span>
      <h3 style={{fontSize: "1.7rem"}}>{latest ? latest.title : "Four new posts, every month."}</h3>
      <p>{latest?.excerpt || "Structured thinking on positioning, systems and market clarity for B2B tech, with a focus on travel and hotel tech."}</p>
      <div className="cad" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <a className="btn btn-ghost" href={latest ? `/blog/${latest.slug}` : "/blog"} style={{justifySelf: "start"}}>{latest ? "Read the latest post" : "Read the blog"} <span className="arr">&rarr;</span></a>
    </div>
    <div className="teaser rv">
      <span className="eyebrow">AI Agents</span>
      <h3 style={{fontSize: "1.7rem"}}>{agent ? `${agents.filter((x) => x.status === "live").length > 1 ? "Latest agent" : "First agent live"}: ${agent.name}.` : "AI agents for content teams."}</h3>
      <p>{agent ? agent.job : "We're building AI agents that take on specific content-ops jobs."}</p>
      <div className="agent-viz" aria-hidden="true"><span className="node">IN</span><span className="wire"></span><span className="node g">AI</span><span className="wire"></span><span className="node">OUT</span></div>
      <a className="btn btn-ghost" href="/agents" style={{justifySelf: "start"}}>See the agents <span className="arr">&rarr;</span></a>
    </div>
  </div>
</section>

    </>
  );
}
