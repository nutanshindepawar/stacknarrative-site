import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Explorer from "@/components/research/explorer";
import ContactBand from "@/components/layout/contact-band";
import { JsonLd } from "@/components/shared";
import { headlineStats, type ResearchData } from "@/lib/research";
import "../research.css";

// Built at deploy time from the research system's published data file.
function load(): ResearchData {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "research", "state-of-hotel-tech-brands.json"), "utf8"));
}

const TITLE = "State of Hotel Tech Brands 2027";
const DESC = "Data on how hotel tech companies describe themselves on their homepages: what they sell, the words they use, how often they mention AI and how they ask buyers to act. No ratings, just data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/research/state-of-hotel-tech-brands" },
  openGraph: { title: TITLE, description: DESC, type: "article" },
};

const longDate = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function Page() {
  const data = load();
  const s = headlineStats(data.companies);
  const asOf = longDate(data.meta.captured_to);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Dataset", name: TITLE, description: DESC,
        url: "https://stacknarrative.com/research/state-of-hotel-tech-brands",
        creator: { "@type": "Organization", name: "StackNarrative", url: "https://stacknarrative.com" },
        temporalCoverage: `${data.meta.captured_from}/${data.meta.captured_to}`,
        variableMeasured: ["Product category", "AI mentions", "Buzzword use", "Call to action", "Headline length"],
      }} />
      <section className="page-hero rx-hero">
        <div className="wrap">
          <a className="crumb" href="/">&larr; Back to home</a>
          <span className="eyebrow" style={{ display: "flex" }}>StackNarrative Research</span>
          <h1>{TITLE}</h1>
          <p className="lead">
            {`How ${s.n} hotel tech companies describe themselves on their homepages: what they sell, the words they use and how they ask buyers to act. We don't rate anyone. This is just the data.`}
          </p>
          <p className="rx-asof">Homepages captured {asOf} · n = {s.n} companies · updated as the dataset grows</p>
        </div>
      </section>

      <section className="rx-key" aria-label="Key findings">
        <div className="wrap">
          <h2 className="rx-h">Key findings</h2>
          <ul className="rx-findings">
            <li><b>{s.aiPage}%</b> of hotel tech companies mention AI on their homepage, but only <b>{s.aiHeadline}%</b> put it in their main headline.</li>
            <li><b>{s.demo}%</b> make &ldquo;book a demo&rdquo; their main call to action.</li>
            <li><b>{s.pricing}%</b> link to pricing from their homepage.</li>
            <li><b>{s.numbers}%</b> back a headline or hero claim with a number.</li>
            <li>The average main headline is <b>{s.headlineWords}</b> words long.</li>
          </ul>
        </div>
      </section>

      <section className="rx-section">
        <div className="wrap">
          <span className="eyebrow">Explore the data</span>
          <Explorer data={data} />
        </div>
      </section>

      <section className="rx-method" id="method">
        <div className="wrap">
          <h2 className="rx-h">How this data was collected</h2>
          <div className="rx-method-grid">
            <div><b>Who is included</b><p>Companies that sell technology to accommodation businesses: hotels, resorts, hostels, vacation-rental managers and serviced apartments. Travel sellers, operators and generic software are excluded.</p></div>
            <div><b>What we read</b><p>Each company&apos;s public homepage, captured on {asOf}. We keep a dated copy of every page, so every number can be traced back to its source.</p></div>
            <div><b>How it&apos;s counted</b><p>Categories come from the words a homepage uses to describe its products. Terms are counted by code from a published word list, so the counts are repeatable. No AI is used to judge or score companies.</p></div>
            <div><b>What we don&apos;t do</b><p>We don&apos;t rate, rank or review products. A term appearing more or less often is a fact about wording, not about quality.</p></div>
          </div>
          <p className="rx-fine">Category dictionary {data.meta.category_dictionary} · word list {data.meta.lexicon} · data file generated {longDate(data.meta.generated)}. Spotted something wrong about your company? <a href="/contact">Request a correction</a>.</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
