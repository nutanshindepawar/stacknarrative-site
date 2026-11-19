
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
export default function Services() {
  return (
    <>

<section className="dark" id="services">
  <div className="wrap">
    <div className="head rv">
      <span className="eyebrow">Services</span>
      <h2>We build the <span className="hl">systems</span> behind your marketing.</h2>
      <p className="lead">Systems, processes, workflows and automations for every phase of marketing and content operations. Plus the strategy and content that run through them.</p>
    </div>
    <div className="build-row rv" aria-label="What we build">
      <div><b>Systems</b><span>How content moves through your team, end to end</span></div>
      <div><b>Processes</b><span>Clear steps, owners and standards for each phase</span></div>
      <div><b>Workflows</b><span>Hand-offs, reviews and approvals that don't stall</span></div>
      <div><b>Automations</b><span>AI doing the repetitive work, people doing the judgement</span></div>
    </div>
    <div className="svc-tabs" role="tablist" aria-label="Service groups">
      <button role="tab" id="tab-a" aria-selected="true" aria-controls="p-a">Marketing ops systems</button>
      <button role="tab" id="tab-s" aria-selected="false" aria-controls="p-s" tabIndex={-1}>Strategy</button>
      <button role="tab" id="tab-e" aria-selected="false" aria-controls="p-e" tabIndex={-1}>Content execution</button>
    </div>
    <div className="svc-panel on" id="p-a" role="tabpanel" aria-labelledby="tab-a">
      <div>
        <h3>A system for every phase of content operations.</h3>
        <p className="lead">We map how your team works today, design the process, build the workflow and automate the repetitive parts. Your team keeps all of it.</p>
        <a className="btn btn-ghost" href="/toolbook" style={{marginTop: "24px"}}>See all 12 phases in the toolbook <span className="arr">&rarr;</span></a>
      </div>
      <ul className="svc-list">
        <li><b>Strategy &amp; planning</b><span>Content calendars and plans tied to business goals</span></li>
        <li><b>Market &amp; customer intelligence</b><span>Ongoing buyer, competitor and trend research</span></li>
        <li><b>Knowledge capture</b><span>Founder and SME insight captured without long interviews</span></li>
        <li><b>Brief creation</b><span>Research-backed briefs in minutes, not hours</span></li>
        <li><b>Production</b><span>AI-assisted drafting with your voice and facts built in</span></li>
        <li><b>Review, QA &amp; approval</b><span>Accuracy, brand and claim checks without endless back-and-forth</span></li>
        <li><b>Publishing &amp; CMS</b><span>A content library your team can find and reuse</span></li>
        <li><b>Repurposing</b><span>One strong idea turned into many formats and channels</span></li>
        <li><b>Distribution &amp; sales enablement</b><span>Content that reaches buyers and gets used by sales</span></li>
        <li><b>Performance &amp; knowledge updates</b><span>Learn what works and keep product knowledge current</span></li>
      </ul>
    </div>
    <div className="svc-panel" id="p-s" role="tabpanel" aria-labelledby="tab-s">
      <div><h3>Know what to say before you say it.</h3><p className="lead">The foundation every system and every piece of content stands on. Done once, properly, and used by marketing, sales and leadership.</p></div>
      <ul className="svc-list">
        <li><b>Market intelligence</b><span>Buyer, competitor and trend research for your segment</span></li>
        <li><b>Positioning</b><span>What you should be known for, and for whom</span></li>
        <li><b>Content strategy</b><span>A repeatable plan tied to pipeline goals</span></li>
        <li><b>Messaging frameworks</b><span>One story, adapted for every buyer in the room</span></li>
      </ul>
    </div>
    <div className="svc-panel" id="p-e" role="tabpanel" aria-labelledby="tab-e">
      <div><h3>Content buyers read, and sales actually sends.</h3><p className="lead">Produced through the same systems we build for you, by people who know the difference between a PMS and a CRS.</p></div>
      <ul className="svc-list">
        <li><b>Founder thought leadership</b><span>Your point of view, in your voice</span></li>
        <li><b>Product messaging</b><span>Features translated into outcomes</span></li>
        <li><b>Product launch content</b><span>Everything a launch needs, on time</span></li>
        <li><b>Case studies</b><span>Proof that hoteliers believe</span></li>
        <li><b>Blogs &amp; newsletters</b><span>Steady, search- and AI-answer-ready publishing</span></li>
        <li><b>Sales one-pagers</b><span>Built around real buyer questions</span></li>
        <li><b>Website messaging</b><span>Homepages that explain, fast</span></li>
        <li><b>Market reports</b><span>Industry insight turned into a lead asset</span></li>
      </ul>
    </div>
  </div>
</section>

    </>
  );
}
