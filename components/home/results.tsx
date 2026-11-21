// Results from client work. Numbers are rendered in the HTML (for search engines and no-JS);
// site.js counts them up when they scroll into view.
const RESULTS = [
  {
    value: 5,
    suffix: "+",
    label: "trade outlets covered our flagship industry trends report",
    text: "Curated HBX Group's Travel Trends Report 2026 end to end. It was cited by a digital PR agency as one of the year's standout industry reports.",
    tag: "Industry report",
  },
  {
    value: 40,
    suffix: "%",
    label: "read rate on a B2B whitepaper",
    text: "With an 11% download rate on the same whitepaper.",
    extra: { value: 11, suffix: "%", label: "download rate" },
    tag: "Whitepaper",
  },
  {
    value: 50,
    suffix: "+",
    label: "published assets in 3 months",
    text: "Securing first-page Google rankings and AI Overview placements.",
    tag: "SEO + AEO",
  },
];

export default function Results() {
  return (
    <section className="results" aria-labelledby="results-h">
      <div className="wrap">
        <div className="results-head rv">
          <span className="eyebrow">Results</span>
          <h2 id="results-h">Content that ships, ranks and gets read.</h2>
        </div>
        <div className="results-grid">
          {RESULTS.map((r) => (
            <article className="result rv" key={r.label}>
              <span className="result-tag">{r.tag}</span>
              <div className="result-nums">
                <p className="result-num">
                  <span data-count={r.value}>{r.value}</span>
                  {r.suffix}
                </p>
                {r.extra && (
                  <p className="result-num small">
                    <span data-count={r.extra.value}>{r.extra.value}</span>
                    {r.extra.suffix}
                    <span className="result-mini">{r.extra.label}</span>
                  </p>
                )}
              </div>
              <h3>{r.label}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
