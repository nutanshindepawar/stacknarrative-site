import type { Metadata } from "next";
import Script from "next/script";
import { JsonLd } from "@/components/shared";
import { htbFindings, loadHtb, loadHtbRaw } from "@/lib/htb";
import { SITE_URL } from "@/lib/site";
import "../htb.css";

// Every number on this page is computed at build time from the research system's anonymous data file,
// and written into the HTML, so search engines and AI answer engines can read it without JavaScript.
const PATH = "/research/state-of-hotel-tech-brands";
const URL = `${SITE_URL}${PATH}`;
const TITLE = "State of Hotel Tech Brands 2027";

export function generateMetadata(): Metadata {
  const f = htbFindings(loadHtb());
  const desc = `How ${f.n} hospitality tech companies describe themselves on their homepages: what they sell, what they promise, the words they repeat and where they sound alike. ${f.ai.any}% mention AI; only ${f.ai.headline}% put it in the headline. Pure data, no ratings.`;
  return {
    title: `${TITLE}: hotel tech messaging data`,
    description: desc,
    alternates: { canonical: PATH },
    openGraph: { title: TITLE, description: desc, type: "article", url: URL },
    twitter: { card: "summary_large_image", title: TITLE, description: desc },
  };
}

const T = ({ caption, head, rows }: { caption: string; head: string[]; rows: (string | number)[][] }) => (
  <div className="htb-tw">
    <table className="htb-table">
      <caption>{caption}</caption>
      <thead><tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody>
    </table>
  </div>
);

export default function Page() {
  const d = loadHtb();
  const f = htbFindings(d);
  const top = f.cats[0];
  const topBen = f.benefits[0], lowBen = f.benefits[f.benefits.length - 1];
  const alike = f.alike[0];
  const findings = [
    `${top.label} is the most crowded hotel tech category: ${top.n} of the ${f.n} companies studied (${top.share}%).`,
    `${f.ai.any}% of hospitality tech homepages mention AI, but only ${f.ai.headline}% put it in the main headline.`,
    `${f.multi}% of companies sell more than one type of product, and ${f.allInOne}% call themselves all-in-one, unified or one platform.`,
    `"${topBen.label}" is the most promised result (${topBen.share}% of homepages). "${lowBen.label}" is the rarest (${lowBen.share}%).`,
    `Only ${f.outcome}% of headlines lead with a business result, and just ${f.problem}% open with the buyer's problem.`,
    `${f.proofNone}% show no numbers or customer counts near the top of the homepage.`,
    `${alike.label} companies sound the most alike: their headline and hero wording overlaps ${alike.x}× more than two random hotel tech companies.`,
    `"${f.buttons[0].label}" is the most common first button (${f.buttons[0].share}% of homepages).`,
  ];
  const faq: [string, string][] = [
    ["What is the State of Hotel Tech Brands 2027?", `An independent StackNarrative study of how hospitality tech companies describe themselves on their homepages. We read ${f.n} homepages in ${f.asOf} and counted what they sell, what they promise and the words they use. It contains no ratings, rankings or paid placements.`],
    ["How many hotel tech companies mention AI on their homepage?", `${f.ai.any}% of the ${f.n} hospitality tech homepages studied mention AI somewhere. ${f.ai.headline}% put AI in the main headline, ${f.ai.hero}% mention it just below the headline, ${f.ai.lower}% only lower on the page, and ${f.ai.none}% don't mention it at all.`],
    ["Which hotel tech category is the most crowded?", `${f.cats.slice(0, 3).map((c) => `${c.label} (${c.n} companies)`).join(", ")} are the three largest categories in the study.`],
    ["What do hotel tech companies promise most?", `${f.benefits.slice(0, 3).map((b) => `${b.label} (${b.share}%)`).join(", ")}. The least promised result is ${lowBen.label}, at ${lowBen.share}% of homepages.`],
    ["Which words and phrases do hotel tech homepages repeat most?", `The most repeated phrases are ${f.phrases.slice(0, 5).map((p) => `"${p.phrase}" (${p.companies} companies)`).join(", ")}.`],
    ["How was the data collected?", `We captured each company's public homepage and counted words with published rules: no human or AI scored any company. Companies were included only when their homepage confirmed they sell technology to accommodation businesses. We track ${f.tracked} companies and add homepages as they are verified.`],
  ];
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org", "@type": "Dataset", name: TITLE, url: URL,
          description: `Anonymous, rule-based data on the homepage messaging of ${f.n} hospitality technology companies: product categories, promised benefits, headline approach, AI mentions, repeated phrases and messaging similarity.`,
          creator: { "@type": "Organization", name: "StackNarrative", url: SITE_URL },
          isAccessibleForFree: true, temporalCoverage: `${d.meta.captured_from}/${d.meta.captured_to}`,
          keywords: ["hotel tech", "hospitality technology", "positioning", "messaging", "B2B marketing", "AI in hospitality"],
          variableMeasured: ["Product category", "Promised benefits", "Headline approach", "AI mentions", "Repeated phrases", "Call to action", "Messaging similarity"],
        },
        {
          "@context": "https://schema.org", "@type": "Report", headline: TITLE, url: URL, datePublished: d.meta.generated, dateModified: d.meta.generated,
          author: { "@type": "Organization", name: "StackNarrative", url: SITE_URL }, publisher: { "@type": "Organization", name: "StackNarrative", url: SITE_URL },
          about: "How hospitality technology companies position and describe themselves", abstract: findings.join(" "),
        },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: TITLE, item: URL },
        ] },
      ]} />

      <section className="page-hero htb-hero">
        <div className="wrap">
          <a className="crumb" href="/">&larr; Back to home</a>
          <p className="eyebrow htb-tag"><i aria-hidden="true" />StackNarrative Research · 2027 edition</p>
          <h1>{TITLE}</h1>
          <p className="htb-sub">Know your market. Understand your competitors. <em>Find how you are different and stand out.</em></p>
          <p className="lead">{`We read the homepages of ${f.n} hospitality tech companies and counted what they sell, what they promise and the words they use. Pick your category below and see how you compare with the market.`}</p>
          <p className="htb-facts"><span><b>{f.n}</b> homepages read</span><span><b>{f.cats.length}</b> product categories</span><span><b>{f.tracked}</b> companies tracked</span><span>Read in <b>{f.asOf}</b></span></p>
        </div>
      </section>

      <section className="htb-key" aria-labelledby="key-findings">
        <div className="wrap">
          <h2 id="key-findings">Key findings</h2>
          <ol className="htb-findings">{findings.map((x, i) => <li key={i}>{x}</li>)}</ol>
        </div>
      </section>

      <div id="htb-explorer" aria-label="Interactive explorer: compare your category with the market">
        <noscript><div className="wrap htb-noscript">The interactive explorer needs JavaScript. Every key number is also listed in the tables below.</div></noscript>
      </div>
      <script id="htb-data" type="application/json" dangerouslySetInnerHTML={{ __html: loadHtbRaw().replace(/</g, "\\u003c") }} />
      <Script src="/research/hotel-tech-brands-explorer.js" strategy="afterInteractive" />

      <section className="htb-data" aria-labelledby="the-data">
        <div className="wrap">
          <h2 id="the-data">The data behind the explorer</h2>
          <p className="lead">{`All figures are shares of the ${f.n} hospitality tech homepages read in ${f.asOf}. Headline and word figures use the ${f.english} English-language homepages.`}</p>
          <div className="htb-tables">
            <details open><summary>Companies by product category</summary>
              <T caption="Hotel tech companies by main product category" head={["Category", "Companies", "Share"]} rows={f.cats.map((c) => [c.label, c.n, `${c.share}%`])} /></details>
            <details><summary>Results companies promise</summary>
              <T caption="Share of homepages promising each result (title, headline and hero text)" head={["Promised result", "Homepages"]} rows={f.benefits.map((b) => [b.label, `${b.share}%`])} /></details>
            <details><summary>What headlines lead with</summary>
              <T caption="What the headline and subheadline lead with (English homepages)" head={["Headline leads with", "Headlines"]} rows={f.leads.map((l) => [l.label, `${l.share}%`])} /></details>
            <details><summary>Where AI appears on the homepage</summary>
              <T caption="Highest place on the homepage where AI words appear" head={["Placement", "Homepages"]} rows={[["In the main headline", `${f.ai.headline}%`], ["Just below the headline", `${f.ai.hero}%`], ["Lower on the page only", `${f.ai.lower}%`], ["Not mentioned", `${f.ai.none}%`]]} /></details>
            <details><summary>Most repeated phrases</summary>
              <T caption="Two- and three-word phrases in headlines and hero text" head={["Phrase", "Companies using it", "Total uses"]} rows={f.phrases.map((p) => [p.phrase, p.companies, p.uses])} /></details>
            <details><summary>Customers they name</summary>
              <T caption="Share of homepages naming each type of property" head={["Customer type", "Anywhere on the page", "Near the top"]} rows={f.segments.map((s) => [s.label, `${s.share}%`, `${s.top}%`])} /></details>
            <details><summary>First button next to the headline</summary>
              <T caption="The main call to action next to the headline" head={["Button", "Homepages"]} rows={f.buttons.map((b) => [b.label, `${b.share}%`])} /></details>
            <details><summary>Categories that sound most alike</summary>
              <T caption="Overlap of headline and hero wording within a category, compared with two random companies (1.0×)" head={["Category", "Sameness"]} rows={f.alike.map((a) => [a.label, `${a.x}×`])} /></details>
          </div>
        </div>
      </section>

      <section className="htb-faq" aria-labelledby="faq">
        <div className="wrap">
          <h2 id="faq">Questions about this research</h2>
          <div className="htb-faqs">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          <p className="htb-fine">Spotted something wrong about your company? <a href="/contact">Request a correction</a>. Company names will be added once every homepage has been verified.</p>
        </div>
      </section>
    </>
  );
}
