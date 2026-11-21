/* How we work: the four steps on the left, a hospitality photo for the active step on the right.
   site.js moves the active step automatically and on hover, focus or click. Copy unchanged. */
const STEPS = [
  {
    n: "01",
    title: "Market intelligence",
    text: "We research your buyers, competitors and market to find what you should be known for.",
    you: "Your time: one kickoff call",
    img: "/img/step-research.jpg",
    alt: "Professional researching on a laptop in a bright hotel lounge",
  },
  {
    n: "02",
    title: "Positioning & content strategy",
    text: "Messaging and a repeatable content plan tied directly to your commercial goals.",
    you: "Your time: review & approve",
    img: "/img/step-strategy.jpg",
    alt: "Marketing team in discussion inside a glass-walled meeting cabin",
  },
  {
    n: "03",
    title: "Thought leadership & product messaging",
    text: "Founder expertise, customer insight and product knowledge become content buyers trust.",
    you: "Your time: short SME sessions",
    img: "/img/step-stage.jpg",
    alt: "Founder speaking on stage at an industry conference",
  },
  {
    n: "04",
    title: "AI-powered content operations",
    text: "Workflows that let you produce more high-quality content without growing the team.",
    you: "Your time: approvals only",
    img: "/img/step-lobby.jpg",
    alt: "Bright, modern hotel lobby",
  },
];

export default function Process() {
  return (
    <section id="how-we-work" style={{ paddingTop: "20px" }}>
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">How we work</span>
          <h2>Strategy first. Then a system that ships.</h2>
          <p className="lead">Most agencies start at the brief. We start with the market, because content only works when it&rsquo;s built on the right position.</p>
        </div>
        <div className="flow" id="flow">
          <ol className="flow-steps">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`flow-step${i === 0 ? " active" : ""}`} data-step={i} tabIndex={0}>
                <span className="dot">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="you">{s.you}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="flow-media rv">
            {STEPS.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.n} className={`flow-img${i === 0 ? " active" : ""}`} data-step={i} src={s.img} alt={s.alt} width={1100} height={733} loading="lazy" />
            ))}
            <div className="flow-card" aria-hidden="true">
              <span className="flow-card-n">01</span>
              <span className="flow-card-t">Your time: one kickoff call</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
