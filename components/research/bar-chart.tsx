"use client";
/* Horizontal bar chart in StackNarrative style: ink bars on cream, green = selected.
   Thin bars (<=18px), 4px rounded data end, value at the tip, hover tooltip, table view. */
import { useState } from "react";

export type Bar = { key: string; label: string; value: number; note?: string };

export function BarChart({
  title, sub, bars, total, unit = "companies", percent = false, selected, onSelect, max: maxIn, limit = 15,
}: {
  title: string; sub?: string; bars: Bar[]; total: number; unit?: string; percent?: boolean;
  selected?: string | null; onSelect?: (key: string | null) => void; max?: number; limit?: number;
}) {
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const shown = bars.slice(0, limit);
  const max = maxIn ?? Math.max(1, ...shown.map((b) => b.value));
  const fmt = (b: Bar) => (percent ? `${Math.round(b.value)}%` : String(b.value));
  const tipText = (b: Bar) =>
    percent ? `${b.label}: ${Math.round(b.value)}%${b.note ? ` (${b.note})` : ""}`
            : `${b.label}: ${b.value} ${unit} (${total ? Math.round((b.value / total) * 100) : 0}% of ${total})`;

  return (
    <figure className="rx-chart">
      <figcaption>
        <h3>{title}</h3>
        {sub && <p>{sub}</p>}
      </figcaption>
      {shown.length === 0 ? <p className="rx-empty">No companies match these filters.</p> : (
        <div className="rx-bars" onMouseLeave={() => setTip(null)}>
          {shown.map((b) => {
            const isSel = selected === b.key;
            const Row = onSelect ? "button" : "div";
            return (
              <Row
                key={b.key}
                className={`rx-row${isSel ? " sel" : ""}${onSelect ? " click" : ""}`}
                {...(onSelect ? { type: "button" as const, onClick: () => onSelect(isSel ? null : b.key), "aria-pressed": isSel } : {})}
                aria-label={tipText(b)}
                onMouseMove={(e: React.MouseEvent) => {
                  const box = (e.currentTarget as HTMLElement).closest(".rx-bars")!.getBoundingClientRect();
                  setTip({ x: e.clientX - box.left, y: e.clientY - box.top, text: tipText(b) });
                }}
              >
                <span className="rx-lab">{b.label}</span>
                <span className="rx-track">
                  <span className="rx-bar" style={{ width: `${Math.max(0.5, (b.value / max) * 100)}%` }} />
                  <span className="rx-val">{fmt(b)}</span>
                </span>
              </Row>
            );
          })}
          {tip && <div className="rx-tip" style={{ left: tip.x + 14, top: tip.y - 10 }} role="presentation">{tip.text}</div>}
        </div>
      )}
      {shown.length > 0 && (
        <details className="rx-table">
          <summary>Show as table</summary>
          <table>
            <thead><tr><th>{title.split(":")[0]}</th><th>{percent ? "Share" : unit}</th>{!percent && <th>% of {total}</th>}</tr></thead>
            <tbody>
              {bars.map((b) => (
                <tr key={b.key}><td>{b.label}</td><td>{fmt(b)}{b.note ? ` (${b.note})` : ""}</td>{!percent && <td>{total ? Math.round((b.value / total) * 100) : 0}%</td>}</tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </figure>
  );
}
