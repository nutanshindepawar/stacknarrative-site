// Types and helpers for the State of Hotel Tech Brands explorer.
// Data comes from the research system (D:\StackNarrative\Hotel Tech Brands, step 10 publish:web).
export type Company = {
  k: string; cat: string; others: string[]; subs: string[]; size: string;
  ai: [number, number, number];                    // headline, hero, anywhere on page
  t: { h: number[]; hero: number[]; page: number[] }; // term indexes per zone
  btn: string; desc: string; price: number; num: number; cust: number;
  hw: number | null; fw: string; gen: number | null; you: number; we: number;
  adj: string[]; verbs: string[]; en: number; at: string;
  name?: string; site?: string; headline?: string; sub?: string; // only when names are published
};
export type ResearchData = {
  meta: { title: string; generated: string; captured_from: string; captured_to: string; companies: number; names: boolean; category_dictionary: string; lexicon: string };
  categories: Record<string, string>;
  subcategories: Record<string, string>;
  terms: { term: string; family: string }[];
  companies: Company[];
};

export const BUTTON_LABELS: Record<string, string> = {
  book_demo: "Book a demo", learn_more: "Learn more / explore", sign_up: "Sign up / get started", contact_sales: "Contact sales",
  see_pricing: "See pricing", free_trial: "Free trial", download: "Download", other: "Other wording", none: "No clear button",
};
export const SIZE_LABELS: Record<string, string> = { "1-50": "1–50 employees", "51-200": "51–200 employees", "200+": "200+ employees", unknown: "Size unknown" };

export const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

/** Count companies per key (each company counted once per key). */
export function countBy<T>(items: T[], keys: (item: T) => string[] | string) {
  const m = new Map<string, number>();
  for (const it of items) {
    const ks = keys(it);
    for (const k of new Set(Array.isArray(ks) ? ks : [ks])) if (k) m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

/** Headline figures used by both the static page text and the explorer. */
export function headlineStats(cs: Company[]) {
  const n = cs.length;
  const avg = (xs: number[]) => (xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10 : 0);
  return {
    n,
    aiPage: pct(cs.filter((c) => c.ai[2]).length, n),
    aiHero: pct(cs.filter((c) => c.ai[1]).length, n),
    aiHeadline: pct(cs.filter((c) => c.ai[0]).length, n),
    numbers: pct(cs.filter((c) => c.num).length, n),
    pricing: pct(cs.filter((c) => c.price).length, n),
    demo: pct(cs.filter((c) => c.btn === "book_demo").length, n),
    headlineWords: avg(cs.map((c) => c.hw).filter((x): x is number => x != null)),
  };
}
