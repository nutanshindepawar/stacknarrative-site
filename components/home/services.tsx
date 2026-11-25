// Homepage Services: three picture cards (one job, three ways), each with a few deliverables,
// then "Not sure where to start?". Full detail lives on /services. Copy from lib/services.ts.
import { SERVICES, SERVICES_INTRO } from "@/lib/services";
import { StartWhere, SVC_ICONS } from "../services-ui";

export default function Services() {
  return (
    <section id="services" className="svc-home">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{SERVICES_INTRO.eyebrow}</span>
          <h2>One job: make your product <span className="hl">easy to understand.</span></h2>
          <p className="lead">{SERVICES_INTRO.short}</p>
        </div>
        <div className="sv-grid">
          {SERVICES.map((s) => (
            <article key={s.id} className="sv-card rv" id={`svc-${s.id}`}>
              <div className="sv-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.alt} width={1200} height={800} loading="lazy" />
                <span className="sv-n">{s.n}</span>
              </div>
              <div className="sv-body">
                <span className="sv-ic" aria-hidden="true">{SVC_ICONS[s.id]}</span>
                <h3>{s.title}</h3>
                <p className="sv-start">{s.startHere}</p>
                <p>{s.summary}</p>
                <ul className="sv-chips">
                  {s.items.map((i) => <li key={i.name}>{i.short}</li>)}
                </ul>
                <a className="sv-more" href={`/services#svc-${s.id}`}>See what&rsquo;s included <span aria-hidden="true">&rarr;</span></a>
              </div>
            </article>
          ))}
        </div>
        <StartWhere base="/services" />
        <p className="sv-all rv"><a href="/services">See all services in detail <span aria-hidden="true">&rarr;</span></a></p>
      </div>
    </section>
  );
}
