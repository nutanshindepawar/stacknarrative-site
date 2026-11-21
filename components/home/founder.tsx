// Home page founder section: large portrait, links to the full story on /about.
import { LINKEDIN_URL } from "@/lib/site";

export default function Founder() {
  return (
    <section className="home-founder" aria-labelledby="founder-h">
      <div className="wrap hf-grid">
        <figure className="hf-photo rv">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/founder-nutan.jpg" alt="Nutan Pawar, founder of StackNarrative" width={900} height={1125} loading="lazy" />
          <span className="hf-badge"><i aria-hidden="true"></i>Hi, I&rsquo;m Nutan</span>
        </figure>
        <div className="hf-copy rv">
          <span className="eyebrow">The founder</span>
          <h2 id="founder-h">Nutan Pawar</h2>
          <p className="hf-role">Founder, StackNarrative · Engineer turned content strategist</p>
          <blockquote className="hf-quote">
            &ldquo;I understand technology because of my engineering background. I understand people because of content and marketing.&rdquo;
          </blockquote>
          <div className="hf-ctas">
            <a className="btn btn-primary" href="/about">
              Read the founder&rsquo;s story <span className="arr">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href={LINKEDIN_URL} target="_blank" rel="noopener">
              Connect on LinkedIn <span className="arr">&#8599;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
