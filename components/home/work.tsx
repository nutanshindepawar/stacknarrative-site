
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import type { ClientCase } from "@/lib/defaults";
import { CaseCard } from "../shared";

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
    <div className="extras">
      <a className="mini ink rv" href="https://drive.google.com/file/d/1OB-UPmpFPxLT07TgV-j32IcdsXKTCAKG/view?usp=drive_link" target="_blank" rel="noopener">
        <span className="k">Market intelligence</span><h3>HBX Group Travel Trends Report 2026</h3><p>Industry signals turned into an actionable resource. View the report &#8599;</p>
      </a>
      <a className="mini grn rv" href="https://drive.google.com/file/d/1Mt_Cnvk0qrcuwrVJISTjEpjDjOaGiVhg/view" target="_blank" rel="noopener">
        <span className="k">B2B whitepaper · EP Climbing</span><h3>Making climbing accessible to everyone</h3>
        <div className="stat"><div><b>40%</b><small>read rate</small></div><div><b>11%</b><small>download rate</small></div></div>
      </a>
      <a className="mini out rv" href="https://clarityscore.stacknarrative.com" target="_blank" rel="noopener">
        <span className="k">Free tool</span><h3>Messaging Clarity Score</h3><p>Score how clearly your homepage speaks to buyers, in under a minute. Try it &#8599;</p>
      </a>
    </div>
  </div>
</section>

    </>
  );
}
