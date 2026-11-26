"use client";
/* State of Hotel Tech Brands: interactive explorer. All charts follow the same filters. */
import { useMemo, useState } from "react";
import { BarChart, type Bar } from "./bar-chart";
import { BUTTON_LABELS, SIZE_LABELS, countBy, headlineStats, pct, type ResearchData } from "@/lib/research";

type Zone = "page" | "hero" | "h";
const ZONES: { key: Zone; label: string }[] = [
  { key: "page", label: "Anywhere on the homepage" },
  { key: "hero", label: "In the hero" },
  { key: "h", label: "In the headline" },
];
const ZONE_WORD: Record<Zone, string> = { page: "anywhere on their homepage", hero: "in their hero section", h: "in their headline" };
const WEAK_WORDS = new Set(["more", "other", "new", "many", "own", "same", "such", "first", "last", "next", "most", "few", "much", "all", "able", "sure", "real", "full", "free", "best", "great", "good", "right", "available", "single", "multiple", "key", "top", "high", "low", "different", "specific", "certain"]);

export default function Explorer({ data }: { data: ResearchData }) {
  const [cat, setCat] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [term, setTerm] = useState<number | null>(null);
  const [zone, setZone] = useState<Zone>("page");
  const [query, setQuery] = useState("");

  const all = data.companies;
  const matchTerm = (c: (typeof all)[number]) => term == null || c.t[zone].includes(term);
  const base = useMemo(() => all.filter((c) => (!size || c.size === size) && matchTerm(c)), [all, size, term, zone]); // eslint-disable-line react-hooks/exhaustive-deps
  const cs = useMemo(() => base.filter((c) => !cat || c.cat === cat), [base, cat]);
  const n = cs.length;
  const s = headlineStats(cs);
  const catLabel = (k: string) => data.categories[k] || k;

  const toBars = (rows: [string, number][], label: (k: string) => string = (k) => k): Bar[] => rows.map(([k, v]) => ({ key: k, label: label(k), value: v }));

  const categoryBars = toBars(countBy(base, (c) => c.cat), catLabel);
  const productBars = toBars(countBy(cs, (c) => c.subs), (k) => cap(data.subcategories[k] || k));
  const termBars: Bar[] = toBars(countBy(cs, (c) => c.t[zone].map(String)), (k) => data.terms[Number(k)].term);
  const aiByCat: Bar[] = countBy(base, (c) => c.cat).map(([k, total]) => {
    const withAi = base.filter((c) => c.cat === k && c.ai[1]).length;
    return { key: k, label: catLabel(k), value: pct(withAi, total), note: `${withAi} of ${total}` };
  }).filter((b) => Number(b.note!.split(" of ")[1]) >= 3).sort((a, b) => b.value - a.value);
  const buttonBars = toBars(countBy(cs, (c) => c.btn), (k) => BUTTON_LABELS[k] || k);
  const descBars = toBars(countBy(cs, (c) => c.desc || "(none)"), (k) => (k === "(none)" ? "None of these" : cap(k)));
  const firstWordBars = toBars(countBy(cs, (c) => c.fw).slice(0, 12), (k) => `"${cap(k)}…"`);
  const adjBars = toBars(countBy(cs, (c) => c.adj.filter((a) => a.length > 3 && !a.endsWith("-") && !WEAK_WORDS.has(a))));
  const verbBars = toBars(countBy(cs, (c) => c.verbs.filter((v) => v.length > 2 && !["have", "get", "make", "see", "need", "use", "let", "know"].includes(v))));

  const filtersOn = cat || size || term != null;
  const reset = () => { setCat(null); setSize(null); setTerm(null); setZone("page"); };
  const sizes = countBy(all.filter((c) => (!cat || c.cat === cat) && matchTerm(c)), (c) => c.size);
  const describe = [cat && catLabel(cat), size && SIZE_LABELS[size], term != null && `using "${data.terms[term].term}" ${ZONE_WORD[zone]}`].filter(Boolean).join(" · ");

  const named = data.meta.names ? cs.filter((c) => !query || `${c.name} ${c.headline} ${c.sub}`.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="rx">
      <div className="rx-filters" role="region" aria-label="Filters">
        <label>
          <span>Category</span>
          <select value={cat ?? ""} onChange={(e) => setCat(e.target.value || null)}>
            <option value="">All categories ({base.length})</option>
            {categoryBars.map((b) => <option key={b.key} value={b.key}>{b.label} ({b.value})</option>)}
          </select>
        </label>
        <label>
          <span>Company size</span>
          <select value={size ?? ""} onChange={(e) => setSize(e.target.value || null)}>
            <option value="">All sizes</option>
            {sizes.map(([k, v]) => <option key={k} value={k}>{SIZE_LABELS[k] || k} ({v})</option>)}
          </select>
        </label>
        <label>
          <span>Uses the word…</span>
          <select value={term ?? ""} onChange={(e) => setTerm(e.target.value === "" ? null : Number(e.target.value))}>
            <option value="">Any wording</option>
            {data.terms.map((t, i) => <option key={t.term} value={i}>{t.term}</option>)}
          </select>
        </label>
        <div className="rx-seg" role="group" aria-label="Where on the homepage">
          {ZONES.map((z) => (
            <button key={z.key} type="button" className={zone === z.key ? "on" : ""} aria-pressed={zone === z.key} onClick={() => setZone(z.key)}>{z.label}</button>
          ))}
        </div>
        {filtersOn && <button type="button" className="rx-reset" onClick={reset}>Clear filters</button>}
      </div>

      <p className="rx-scope" aria-live="polite">
        Showing <b>{n}</b> of {all.length} companies{describe ? <> · {describe}</> : null}
      </p>

      <div className="rx-tiles">
        <Tile value={`${s.aiPage}%`} label="mention AI on their homepage" />
        <Tile value={`${s.aiHero}%`} label="mention AI in the hero" />
        <Tile value={`${s.aiHeadline}%`} label="put AI in the headline" />
        <Tile value={`${s.numbers}%`} label="use a number in their headline or hero claims" />
        <Tile value={`${s.pricing}%`} label="show a pricing link" />
        <Tile value={String(s.headlineWords)} label="words in the average headline" />
      </div>

      <h2 className="rx-h">What they sell</h2>
      <div className="rx-grid">
        <BarChart title="Main category" sub="Read from homepage wording. Click a bar to filter." bars={categoryBars} total={base.length} selected={cat} onSelect={setCat} />
        <BarChart title="Products offered" sub="Product types a company names on its homepage (a company can offer several)." bars={productBars} total={n} />
      </div>

      <h2 className="rx-h">The words they use</h2>
      <div className="rx-grid">
        <BarChart title={`Most-used terms: ${ZONES.find((z) => z.key === zone)!.label.toLowerCase()}`} sub="Companies using each term at least once. Click a term to filter everything by it." bars={termBars} total={n} limit={20} selected={term == null ? null : String(term)} onSelect={(k) => setTerm(k == null ? null : Number(k))} />
        <div className="rx-stack">
          <BarChart title="AI in the hero, by category" sub="Share of each category that mentions AI in its hero section (categories with 3+ companies)." bars={aiByCat} total={base.length} percent max={100} />
          <BarChart title="How headlines start" sub="The first word of the main headline." bars={firstWordBars} total={n} />
        </div>
        <BarChart title="Most common adjectives" sub="Counted per company, from homepage copy." bars={adjBars} total={n} />
        <BarChart title="Most common verbs" sub="Counted per company, from homepage copy." bars={verbBars} total={n} />
      </div>

      <h2 className="rx-h">How they ask and how they describe themselves</h2>
      <div className="rx-grid">
        <BarChart title="Main call to action" sub="The first button near the headline." bars={buttonBars} total={n} />
        <BarChart title="They call themselves a…" sub="Most-used self-description in the title, headline and hero." bars={descBars} total={n} />
      </div>

      {data.meta.names && (
        <>
          <h2 className="rx-h">Companies</h2>
          <input className="rx-search" type="search" placeholder="Search names, headlines and subheadlines" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search companies" />
          <div className="rx-tablewrap">
            <table className="rx-companies">
              <thead><tr><th>Company</th><th>Category</th><th>Headline</th><th>AI</th><th>Main button</th></tr></thead>
              <tbody>
                {named.map((c) => (
                  <tr key={c.k}>
                    <td><a href={c.site} target="_blank" rel="noopener nofollow">{c.name}</a></td>
                    <td>{catLabel(c.cat)}</td>
                    <td><b>{c.headline}</b>{c.sub && <span>{c.sub}</span>}</td>
                    <td>{c.ai[0] ? "Headline" : c.ai[1] ? "Hero" : c.ai[2] ? "Page" : "–"}</td>
                    <td>{BUTTON_LABELS[c.btn] || c.btn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Tile({ value, label }: { value: string; label: string }) {
  return <div className="rx-tile"><b>{value}</b><span>{label}</span></div>;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
