// Shared building blocks for the homepage Services section and the /services page.
import { START_WHERE } from "@/lib/services";

export const SVC_ICONS: Record<string, React.ReactNode> = {
  content: (
    <svg viewBox="0 0 48 48"><path d="M12 6h16l8 8v26a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" /><path d="M28 6v8h8" /><path className="g" d="M15 22h15M15 28h15M15 34h9" /></svg>
  ),
  clarity: (
    <svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="13" /><path d="M31 31l11 11" /><path className="g" d="M15 21l4 4 8-8" /></svg>
  ),
  systems: (
    <svg viewBox="0 0 48 48"><rect x="5" y="6" width="14" height="12" rx="3" /><rect x="29" y="6" width="14" height="12" rx="3" /><rect x="17" y="30" width="14" height="12" rx="3" /><path className="g" d="M12 18v6h24v-6M24 24v6" /></svg>
  ),
};

export function StartWhere({ base = "" }: { base?: string }) {
  return (
    <div className="sw rv">
      <h3 className="sw-h">Not sure where to start?</h3>
      <div className="sw-grid">
        {START_WHERE.map((s) => (
          <a key={s.id} className="sw-card" href={`${base}#svc-${s.id}`}>
            <span className="sw-ic" aria-hidden="true">{SVC_ICONS[s.id]}</span>
            <q>{s.quote}</q>
            <span className="sw-go">Start with <b>{s.label}</b> <span aria-hidden="true">&rarr;</span></span>
          </a>
        ))}
      </div>
      <a className="btn btn-primary sw-btn" href="/contact">Tell us which one sounds like you <span className="arr">&rarr;</span></a>
    </div>
  );
}
