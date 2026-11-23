/* Resources: the AI Content Ops Toolbook, the two latest blog posts and the latest AI agent added to the toolbook.
   Posts and the agent are read at build time, so the row updates whenever the site rebuilds. */
import type { Agent } from "@/lib/defaults";
import type { PostCard, ToolbookEntry } from "@/lib/content";

const ICONS = {
  book: (
    <svg viewBox="0 0 48 48"><path d="M8 10a4 4 0 0 1 4-4h12v34H12a4 4 0 0 0-4 4z" /><path d="M40 10a4 4 0 0 0-4-4H24v34h12a4 4 0 0 1 4 4z" /><path className="g" d="M13 15h6M13 21h6M29 15h6M29 21h6" /></svg>
  ),
  pen: (
    <svg viewBox="0 0 48 48"><rect x="7" y="8" width="26" height="32" rx="4" /><path d="M13 16h14M13 22h14M13 28h8" /><path className="g" d="M38 14l4 4-14 14-5 1 1-5z" /></svg>
  ),
  agent: (
    <svg viewBox="0 0 48 48"><rect x="10" y="14" width="28" height="22" rx="6" /><path d="M24 6v8M16 40v2M32 40v2" /><circle className="g" cx="19" cy="25" r="2.5" /><circle className="g" cx="29" cy="25" r="2.5" /><path className="g" d="M20 31h8" /></svg>
  ),
};

type Card = { icon: React.ReactNode; k: string; title: string; text?: string; href: string; cta: string; ext: boolean };

export default function Resources({ posts, toolbookAgent, agents }: { posts: PostCard[]; toolbookAgent: ToolbookEntry | null; agents: Agent[] }) {
  const cards: Card[] = [
    {
      icon: ICONS.book,
      k: "Free and open · AI Content Ops Toolbook",
      title: "The B2B AI content operations playbook, built in the open.",
      text: "12 phases of content operations, from business strategy to knowledge-base updates.",
      href: "/toolbook",
      cta: "Explore the toolbook",
      ext: false,
    },
    ...posts.slice(0, 2).map((p, i) => ({
      icon: ICONS.pen,
      k: i === 0 ? "Blog · Latest" : "Blog",
      title: p.title,
      text: p.excerpt,
      href: `/blog/${p.slug}`,
      cta: "Read the post",
      ext: false,
    })),
  ];

  if (toolbookAgent) {
    cards.push({
      icon: ICONS.agent,
      k: "New AI agent in the toolbook",
      title: toolbookAgent.title,
      text: toolbookAgent.summary,
      href: toolbookAgent.url,
      cta: "See the agent",
      ext: true,
    });
  } else {
    // Fallback if the toolbook has no published AI agent yet: the latest agent from the Agents page.
    const live = agents.filter((x) => x.status === "live");
    const agent = live[live.length - 1] || agents[0];
    if (agent) cards.push({ icon: ICONS.agent, k: "AI Agents", title: agent.name, text: agent.job, href: "/agents", cta: "See the agents", ext: false });
  }

  return (
    <section id="resources" className="resources">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">Resources</span>
          <h2>Explore what we&rsquo;ve built and shared.</h2>
        </div>
        <div className="res-grid">
          {cards.map((c) => (
            <a key={c.href} className="res-card rv" href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener" } : {})}>
              <span className="res-ic" aria-hidden="true">{c.icon}</span>
              <span className="res-k">{c.k}</span>
              <h3>{c.title}</h3>
              {c.text && <p>{c.text}</p>}
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
