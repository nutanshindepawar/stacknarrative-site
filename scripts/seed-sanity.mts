// One-time import of the site's current client work and AI agent into Sanity.
// After this runs, edit them in the Studio ("Client work" and "AI agents").
//
// Usage (PowerShell):
//   $env:SANITY_WRITE_TOKEN="<token with Editor rights from sanity.io/manage>"; node scripts/seed-sanity.mts
//
// Safe to run more than once: existing documents with the same id are left untouched.
import { createClient } from "@sanity/client";
import { DEFAULT_AGENTS, DEFAULT_CASES } from "../lib/defaults.ts";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN first (Editor token from sanity.io/manage > API > Tokens).");
  process.exit(1);
}

const client = createClient({ projectId: "5jspd31o", dataset: "production", apiVersion: "2026-07-21", token, useCdn: false });
const key = () => Math.random().toString(36).slice(2, 10);
const id = (prefix: string, s: string) => `${prefix}-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const tx = client.transaction();
for (const c of DEFAULT_CASES) {
  tx.createIfNotExists({
    _id: id("case", c.name),
    _type: "clientCase",
    ...c,
    links: (c.links || []).map((l) => ({ _key: key(), _type: "workLink", ...l })),
  });
}
for (const a of DEFAULT_AGENTS) {
  tx.createIfNotExists({ _id: id("agent", a.slug), _type: "agent", ...a, slug: { _type: "slug", current: a.slug } });
}
const res = await tx.commit();
console.log(`Done: ${res.results.length} documents checked/created.`);
