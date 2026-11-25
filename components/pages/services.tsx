// /services: the three services in full, "Not sure where to start?", client testimonials,
// then the latest insights (blog) and AI tools. Copy from lib/services.ts. US English.
import type { Agent } from "@/lib/defaults";
import type { PostCard, ToolbookEntry } from "@/lib/content";
import { SERVICES, SERVICES_INTRO } from "@/lib/services";
import Reviews from "../home/reviews";
import { StartWhere, SVC_ICONS } from "../services-ui";

type Card = { k: string; title: string; text?: string; href: string; cta: string; ext?: boolean; kind: "post" | "tool" };

export default function ServicesPage({ posts, toolbookAgent, agents }: { posts: PostCard[]; toolbookAgent: ToolbookEntry | null; agents: Agent[] }) {
  const live = agents.filter((a) => a.status === "live");
  const agent = live[live.length - 1] || agents[0];
  const cards: Card[] = [
    ...posts.slice(0, 2).map((p, i) => ({ k: i === 0 ? "Blog · Latest" : "Blog", title: p.title, text: p.excerpt, href: `/blog/${p.slug}`, cta: "Read the post", kind: "post" as const })),
    ...(toolbookAgent ? [{ k: "AI agent", title: toolbookAgent.title, text: toolbookAgent.summary, href: toolbookAgent.url, cta: "See the agent", ext: true, kind: "tool" as const }] : []),
    ...(agent ? [{ k: "AI agent", title: agent.name, text: agent.job, href: "/agents", cta: "See our AI agents", kind: "tool" as const }] : []),
  ];

  return (
    <div id="view-services">
      <section className="page-hero">
        <div className="wrap ph-grid">
          <div className="ph-copy">
            <a className="crumb" href="/">&larr; Back to home</a>
            <span className="eyebrow" style={{ display: "flex" }}>{SERVICES_INTRO.eyebrow}</span>
            <h1 style={{ marginTop: "18px", fontSize: "clamp(2.4rem,5vw,4.2rem)" }}>{SERVICES_INTRO.title}</h1>
            <p className="lead">{SERVICES_INTRO.full}</p>
          </div>
          <figure className="ph-photo rv">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/services-hero.jpg" alt="Hotel manager reviewing a tablet demo with a hotel tech vendor" width={1200} height={800} style={{ "--pos": "52% 50%" } as React.CSSProperties} />
          </figure>
        </div>
      </section>

      {SERVICES.map((s, idx) => (
        <section key={s.id} id={`svc-${s.id}`} className={`sp-svc${idx % 2 ? " flip" : ""}`}>
          <div className="wrap sp-grid">
            <figure className="sp-media rv">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.alt} width={1200} height={800} loading="lazy" />
              <span className="sv-n">{s.n}</span>
            </figure>
            <div className="sp-copy rv">
              <span className="sp-start"><span className="sv-ic" aria-hidden="true">{SVC_ICONS[s.id]}</span>{s.startHere}</span>
              <h2>{s.title}</h2>
              <p className="sp-lead"><b>{s.lead}</b>{s.leadMore ? ` ${s.leadMore}` : ""}</p>
              {s.insight && <p className="sp-insight"><span>The insight</span>{s.insight}</p>}
              <ul className="sp-items">
                {s.items.map((i) => (
                  <li key={i.name}><b>{i.name}</b><span>{i.text}</span></li>
                ))}
              </ul>
              {s.note && <p className="sp-note"><b>{s.note.title}</b> {s.note.text}</p>}
              <a className="btn btn-primary" href={s.cta.href}>{s.cta.label} <span className="arr">&rarr;</span></a>
            </div>
          </div>
        </section>
      ))}

      <section className="sp-start-where">
        <div className="wrap"><StartWhere /></div>
      </section>

      <Reviews />

      {cards.length > 0 && (
        <section className="sp-insights">
          <div className="wrap">
            <div className="head rv">
              <span className="eyebrow">Insights and AI tools</span>
              <h2>Check our latest insights and the AI tools we built.</h2>
            </div>
            <div className="res-grid">
              {cards.map((c) => (
                <a key={c.href} className="res-card rv" href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="res-ic" aria-hidden="true">{c.kind === "post" ? SVC_ICONS.content : SVC_ICONS.systems}</span>
                  <span className="res-k">{c.k}</span>
                  <h3>{c.title}</h3>
                  {c.text && <p>{c.text}</p>}
                  <span className="res-cta">{c.cta} <span aria-hidden="true">{c.ext ? "↗" : "→"}</span></span>
                </a>
              ))}
            </div>
            <p className="sv-all rv"><a href="/blog">All insights <span aria-hidden="true">&rarr;</span></a> &nbsp;·&nbsp; <a href="/toolbook">AI Content Ops Toolbook <span aria-hidden="true">&rarr;</span></a></p>
          </div>
        </section>
      )}
    </div>
  );
}
