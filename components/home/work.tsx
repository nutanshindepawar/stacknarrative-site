
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { ClientCase } from "@/lib/defaults";
import { CaseCard } from "../shared";
import Reviews from "./reviews";

export default function Work({ cases }: { cases: ClientCase[] }) {
  return (
    <>

<section id="work" style={{paddingTop: "30px"}}>
  <div className="wrap">
    <div className="head rv">
      <span className="eyebrow">Work</span>
      <h2>Content we've built for B2B travel and hotel tech.</h2>
    </div>
    <div className="work-grid">
      {cases.map((c) => <CaseCard key={c.name} c={c} />)}
    </div>
    <Reviews embedded />
  </div>
</section>

    </>
  );
}
