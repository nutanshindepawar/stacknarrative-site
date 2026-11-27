// State of Hotel Tech Brands 2027: plain-text findings computed at build time from the research data file,
// so search engines and AI answer engines can read every key number without running JavaScript.
import fs from "node:fs";
import path from "node:path";

export type HtbCompany = {
  cat: string; subs: string[]; n: number; en: boolean; ai: "headline" | "hero" | "lower" | "none"; aio: number;
  segs: string[]; segsHero: string[]; bens: string[]; lead: string | null; num: number; cust: number;
  btn: string; desc: string; gen: number | null; twin?: number;
};
export type HtbData = {
  meta: { generated: string; captured_from: string; captured_to: string; tracked: number; in_scope: number; studied: number; english: number; similarity_n: number };
  labels: { cats: Record<string, string>; subs: Record<string, string>; segs: Record<string, string>; bens: Record<string, string>; leads: Record<string, string> };
  companies: HtbCompany[];
  phrases: { p: string; uses: number; co: number[] }[];
  sim: Record<string, number>;
  sim_avg: number;
};

export const HTB_FILE = path.join(process.cwd(), "data", "research", "hotel-tech-brands-explorer.json");
export const loadHtbRaw = () => fs.readFileSync(HTB_FILE, "utf8");
export const loadHtb = (): HtbData => JSON.parse(loadHtbRaw());

const pct = <T,>(arr: T[], f: (x: T) => unknown) => (arr.length ? Math.round((arr.filter(f).length / arr.length) * 100) : 0);
export const monthYear = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

const BTN: Record<string, string> = { book_demo: "Book a demo", learn_more: "Learn more", other: "Other wording", none: "No clear button", sign_up: "Sign up / get started", free_trial: "Start a free trial", see_pricing: "See pricing", contact_sales: "Contact sales", download: "Download" };

export function htbFindings(d: HtbData) {
  const C = d.companies, E = C.filter((c) => c.en), L = d.labels;
  const cats = Object.entries(C.reduce<Record<string, number>>((o, c) => ((o[c.cat] = (o[c.cat] || 0) + 1), o), {}))
    .sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ key: k, label: L.cats[k], n, share: Math.round((n / C.length) * 100) }));
  const benefits = Object.keys(L.bens).map((k) => ({ label: L.bens[k], share: pct(C, (c) => c.bens.includes(k)) })).sort((a, b) => b.share - a.share);
  const segments = Object.keys(L.segs).map((k) => ({ label: L.segs[k], share: pct(C, (c) => c.segs.includes(k)), top: pct(C, (c) => c.segsHero.includes(k)) })).sort((a, b) => b.share - a.share);
  const leads = ["outcome", "technology", "feature", "problem", "other"].map((k) => ({ label: L.leads[k], share: pct(E, (c) => c.lead === k) }));
  const ai = { any: pct(C, (c) => c.ai !== "none"), headline: pct(C, (c) => c.ai === "headline"), hero: pct(C, (c) => c.ai === "hero"), lower: pct(C, (c) => c.ai === "lower"), none: pct(C, (c) => c.ai === "none") };
  const buttons = Object.keys(BTN).map((k) => ({ label: BTN[k], share: pct(C, (c) => c.btn === k) })).filter((b) => b.share).sort((a, b) => b.share - a.share);
  const phrases = d.phrases.slice(0, 15).map((p) => ({ phrase: p.p, companies: p.co.length, uses: p.uses }));
  const keys = cats.filter((c) => c.n >= 8).map((c) => c.key);
  const alike = keys.map((k) => ({ label: L.cats[k], x: Math.round(((d.sim[`${k}|${k}`] || 0) / d.sim_avg) * 10) / 10 })).sort((a, b) => b.x - a.x);
  return {
    n: C.length, english: E.length, tracked: d.meta.tracked, asOf: monthYear(d.meta.captured_to), date: d.meta.captured_to,
    cats, benefits, segments, leads, ai, buttons, phrases, alike,
    multi: pct(C, (c) => c.n >= 2), allInOne: pct(C, (c) => c.aio), proofNone: pct(C, (c) => !c.num && !c.cust),
    custCount: pct(C, (c) => c.cust), outcome: pct(E, (c) => c.lead === "outcome"), problem: pct(E, (c) => c.lead === "problem"),
    platform: pct(C, (c) => c.desc === "platform"),
  };
}
