/* Resources: the toolbook, the free Clarity Score tool, the latest blog post and the latest agent in one row.
   Replaces the homepage Toolbook band and the Blog/Agents teasers; copy comes from those blocks. */
import type { Agent } from "@/lib/defaults";
import type { PostCard } from "@/lib/content";

const ICONS = {
  book: (
    <svg viewBox="0 0 48 48"><path d="M8 10a4 4 0 0 1 4-4h12v34H12a4 4 0 0 0-4 4z" /><path d="M40 10a4 4 0 0 0-4-4H24v34h12a4 4 0 0 1 4 4z" /><path className="g" d="M13 15h6M13 21h6M29 15h6M29 21h6" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 48 48"><path d="M8 34a16 16 0 1 1 32 0" /><path className="g" d="M24 34l8-11" /><circle className="g" cx="24" cy="34" r="2.5" /><path d="M12 34h3M33 34h3M24 18v3" /></svg>
  ),
  pen: (
    <svg viewBox="0 0 48 48"><rect x="7" y="8" width="26" height="32" rx="4" /><path d="M13 16h14M13 22h14M13 28h8" /><path className="g" d="M38 14l4 4-14 14-5 1 1-5z" /></svg>
  ),
  agent: (
    <svg viewBox="0 0 48 48"><rect x="10" y="14" width="28" height="22" rx="6" /><path d="M24 6v8M16 40v2M32 40v2" /><circle className="g" cx="19" cy="25" r="2.5" /><circle className="g" cx="29" cy="25" r="2.5" /><path className="g" d="M20 31h8" /></svg>
  ),
};

export default function Resources({ latest, agents }: { latest?: PostCard; agents: Agent[] }) {
  const live = agents.filter((x) => x.status === "live");
  const agent = live[live.length - 1] || agents[0];
  const cards = [
    {
      icon: ICONS.book,
      k: "Free and open · AI Content Ops Toolbook",
      title: "The B2B AI content operations playbook, built in the open.",
      text: "12 phases of content operations, from business strategy to knowledge-base updates.",
      href: "/toolbook",
      cta: "Explore the toolbook",
      ext: false,
    },
    {
      icon: ICONS.gauge,
      k: "Free tool",
      title: "Messaging Clarity Score",
      text: "Score how clearly your homepage speaks to buyers, in under a minute.",
      href: "https://clarityscore.stacknarrative.com",
      cta: "Try it",
      ext: true,
    },
    {
      icon: ICONS.pen,
      k: "Blog",
      title: latest ? latest.title : "Four new posts, every month.",
      text: latest?.excerpt || "Structured thinking on positioning, systems and market clarity for B2B tech, with a focus on travel and hotel tech.",
      href: latest ? `/blog/${latest.slug}` : "/blog",
      cta: latest ? "Read the latest post" : "Read the blog",
      ext: false,
    },
    {
      icon: ICONS.agent,
      k: "AI Agents",
      title: agent ? `${live.length > 1 ? "Latest agent" : "First agent live"}: ${agent.name}.` : "AI agents for content teams.",
      text: agent ? agent.job : "We're building AI agents that take on specific content-ops jobs.",
      href: "/agents",
      cta: "See the agents",
      ext: false,
    },
  ];
  return (
    <section id="resources" className="resources">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">Resources</span>
          <h2>Explore what we&rsquo;ve built and shared.</h2>
        </div>
        <div className="res-grid">
          {cards.map((c) => (
            <a key={c.k} className="res-card rv" href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener" } : {})}>
              <span className="res-ic" aria-hidden="true">{c.icon}</span>
              <span className="res-k">{c.k}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="res-cta">
                {c.cta} <span aria-hidden="true">{c.ext ? "↗" : "→"}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
