import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactBand from "@/components/layout/contact-band";
import Portable from "@/components/portable";
import { JsonLd } from "@/components/shared";
import { getPage, getPages, type PageSection } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

// Pages created in Sanity ("Pages" in the Studio) are published at /<slug>.
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.length ? pages.map((p) => ({ slug: p.slug })) : [{ slug: "_placeholder" }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Page not found", robots: { index: false } };
  const firstLead = page.sections?.find((s) => s._type === "heroSection")?.lead;
  return { title: page.seoTitle || page.title, description: page.seoDescription || firstLead, alternates: { canonical: `/${page.slug}` } };
}

const isExternal = (u?: string) => !!u && /^https?:\/\//.test(u) && !u.includes("stacknarrative.com");
const linkProps = (u?: string) => (isExternal(u) ? { target: "_blank", rel: "noopener" } : {});

function Section({ s, first }: { s: PageSection; first: boolean }) {
  switch (s._type) {
    case "heroSection":
      return (
        <section className="page-hero">
          <div className="wrap">
            {s.eyebrow && <span className="eyebrow" style={{ display: "flex" }}>{s.eyebrow}</span>}
            {first ? <h1 style={{ marginTop: 18, fontSize: "clamp(2.4rem,5vw,4.2rem)" }}>{s.heading}</h1> : <h2 style={{ marginTop: 18 }}>{s.heading}</h2>}
            {s.lead && <p className="lead">{s.lead}</p>}
            {s.buttonLabel && s.buttonUrl && (
              <div className="hero-ctas" style={{ marginTop: 30 }}>
                <a className="btn btn-primary" href={s.buttonUrl} {...linkProps(s.buttonUrl)}>
                  {s.buttonLabel} <span className="arr">&rarr;</span>
                </a>
              </div>
            )}
          </div>
        </section>
      );
    case "textSection":
      return (
        <section style={{ paddingTop: 20 }}>
          <div className="wrap narrow">
            {s.heading && <h2 style={{ marginBottom: 22 }}>{s.heading}</h2>}
            <div className="prose">
              <Portable value={s.body} />
            </div>
          </div>
        </section>
      );
    case "cardsSection":
      return (
        <section style={{ paddingTop: 20 }}>
          <div className="wrap">
            {s.heading && <h2 style={{ marginBottom: 28 }}>{s.heading}</h2>}
            <div className="phase-list">
              {(s.cards || []).map((c: { _key: string; title: string; text?: string; url?: string }) =>
                c.url ? (
                  <a className="phase-card" key={c._key} href={c.url} {...linkProps(c.url)}>
                    <h3>{c.title}</h3>
                    {c.text && <p>{c.text}</p>}
                    <span className="go">Learn more &rarr;</span>
                  </a>
                ) : (
                  <div className="phase-card" key={c._key}>
                    <h3>{c.title}</h3>
                    {c.text && <p>{c.text}</p>}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      );
    case "faqSection":
      return (
        <section style={{ paddingTop: 20 }}>
          <div className="wrap narrow faqs">
            <h2>{s.heading || "Frequently asked questions"}</h2>
            {(s.faqs || []).map((f: { _key: string; question: string; answer: string }) => (
              <details key={f._key}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "ctaSection":
      return (
        <section className="dark">
          <div className="wrap">
            <div className="head" style={{ marginBottom: 28 }}>
              <h2>{s.heading}</h2>
              {s.text && <p className="lead">{s.text}</p>}
            </div>
            {s.buttonLabel && s.buttonUrl && (
              <a className="btn btn-green" href={s.buttonUrl} {...linkProps(s.buttonUrl)}>
                {s.buttonLabel} <span className="arr">&rarr;</span>
              </a>
            )}
          </div>
        </section>
      );
    default:
      return null;
  }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  const sections = page.sections || [];
  const faqs = sections.filter((s) => s._type === "faqSection").flatMap((s) => s.faqs || []);
  return (
    <>
      {sections[0]?._type !== "heroSection" && (
        <section className="page-hero">
          <div className="wrap">
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)" }}>{page.title}</h1>
          </div>
        </section>
      )}
      {sections.map((s, i) => (
        <Section key={s._key} s={s} first={i === 0} />
      ))}
      <ContactBand />
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "WebPage", name: page.title, url: `${SITE_URL}/${page.slug}` },
          ...(faqs.length
            ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f: { question: string; answer: string }) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }]
            : []),
        ]}
      />
    </>
  );
}
