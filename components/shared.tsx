// Reusable pieces that render Sanity / Supabase data in the site's design.
import type { Agent, ClientCase } from "@/lib/defaults";
import type { Phase, PostCard, ToolbookEntry } from "@/lib/content";
import { LINKEDIN_URL, TOOLBOOK_URL } from "@/lib/site";

export const fmtDate = (d?: string) => {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? "" : t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const pad = (n: number) => String(n).padStart(2, "0");

export function CaseCard({ c, reveal = true }: { c: ClientCase; reveal?: boolean }) {
  return (
    <article className={`case${reveal ? " rv" : ""}`}>
      <div className="top">
        <h3>
          {c.website ? (
            <a className="client-link" href={c.website} target="_blank" rel="noopener">
              {c.name}
              <span aria-hidden="true">&#8599;</span>
            </a>
          ) : (
            c.name
          )}
        </h3>
        {c.segment && <span className="seg">{c.segment}</span>}
      </div>
      <p>{c.summary}</p>
      {!!c.deliverables?.length && (
        <div className="deliv">
          <span>Deliverables</span>
          {c.deliverables.map((d) => (
            <b key={d}>{d}</b>
          ))}
        </div>
      )}
      {!!c.links?.length && (
        <ul>
          {c.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function PhaseGrid({ phases }: { phases: Phase[] }) {
  return (
    <div className="phases rv" id="phaseGrid" aria-label="The 12 phases of the toolbook">
      {phases.map((p) => (
        <a key={p.number} className="ph" href={TOOLBOOK_URL} target="_blank" rel="noopener">
          <span className="n">{pad(p.number)}</span>
          <b>{p.name}</b>
        </a>
      ))}
    </div>
  );
}

export function PhaseList({ phases }: { phases: Phase[] }) {
  return (
    <div className="phase-list">
      {phases.map((p) => (
        <a key={p.number} className="phase-card" href={TOOLBOOK_URL} target="_blank" rel="noopener">
          <span className="n">Phase {pad(p.number)}</span>
          <h3>{p.name}</h3>
          {p.description && <p>{p.description}</p>}
          <span className="go">Browse automations &#8599;</span>
        </a>
      ))}
    </div>
  );
}

export function FeaturedCards({ entries, light }: { entries: ToolbookEntry[]; light?: boolean }) {
  if (!entries.length) return null;
  return (
    <div className={`feat rv${light ? " light" : ""}`}>
      {entries.map((e) => (
        <article className="fcard" key={e.url}>
          <div className="meta">
            <span className="chip g">{e.kind}</span>
            {e.phase && <span className="chip">{e.phase}</span>}
          </div>
          <h3>{e.title}</h3>
          {e.summary && <p>{e.summary}</p>}
          <div className="by">
            <span>
              By{" "}
              {e.authorUrl ? (
                <a href={e.authorUrl} target="_blank" rel="noopener">
                  {e.author}
                </a>
              ) : (
                <b>{e.author}</b>
              )}
            </span>
            <a href={e.url} target="_blank" rel="noopener">
              Read the guide &#8599;
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PostGrid({ posts }: { posts: PostCard[] }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <a className="post" href={`/blog/${p.slug}`} key={p.slug} data-cat={p.category || "Article"}>
          <span className="meta">
            {p.category || "Article"} · {fmtDate(p.publishedAt)}
          </span>
          <h3>{p.title}</h3>
          {p.excerpt && <p>{p.excerpt}</p>}
        </a>
      ))}
    </div>
  );
}

export function EmptyState({ title, text, topics }: { title: string; text: string; topics?: string[] }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{text}</p>
      {topics && (
        <div className="topic-row">
          {topics.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <a className="btn btn-primary" href={LINKEDIN_URL} target="_blank" rel="noopener">
        Follow on LinkedIn &#8599;
      </a>
    </div>
  );
}

export function AgentCard({ a }: { a: Agent }) {
  return (
    <article className="agent" id={a.slug}>
      <div className="a-main">
        <span className="live">{a.status === "live" ? "Live now" : "Coming soon"}</span>
        <h3>{a.name}</h3>
        <p>{a.job}</p>
        {!!a.outputs?.length && (
          <div>
            <b style={{ display: "block", marginBottom: 8 }}>What you get</b>
            <ul className="outs">
              {a.outputs.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="a-ctas">
          {a.url && (
            <a className="btn btn-primary" href={a.url} target="_blank" rel="noopener">
              Try it free <span className="arr">&#8599;</span>
            </a>
          )}
          {a.guideUrl && (
            <a className="btn btn-ghost" href={a.guideUrl} target="_blank" rel="noopener">
              Build your own: step-by-step guide
            </a>
          )}
        </div>
      </div>
      <div className="a-side">
        <dl>
          {a.platform && (
            <div>
              <dt>Runs on</dt>
              <dd>{a.platform}</dd>
            </div>
          )}
          {a.phase && (
            <div>
              <dt>Toolbook phase</dt>
              <dd>{a.phase}</dd>
            </div>
          )}
          {a.time && (
            <div>
              <dt>Time</dt>
              <dd>{a.time}</dd>
            </div>
          )}
          {a.forWho && (
            <div>
              <dt>Built for</dt>
              <dd>{a.forWho}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  // Structured data for search engines and AI answer engines.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
