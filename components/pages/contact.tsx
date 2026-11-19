
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import { CONTACT_EMAIL, FORM_ENDPOINT } from "@/lib/site";

export default function Contact() {
  return (
    <>
<div id="view-contact-us">
  <section className="page-hero" style={{paddingBottom: "30px"}}>
    <div className="wrap">
      <a className="crumb" href="/">&larr; Back to home</a>
      <span className="eyebrow" style={{display: "flex"}}>Contact us</span>
      <h1 style={{marginTop: "18px", fontSize: "clamp(2.4rem,5vw,4.2rem)"}}>Tell us where content is slowing you down.</h1>
      <p className="lead">Two minutes. We read every message and reply personally, and we'll tell you honestly whether we're the right fit.</p>
    </div>
  </section>
  <section style={{paddingTop: "10px"}}>
    <div className="wrap cform-grid">
      <form className="cform" id="cform" noValidate data-endpoint={FORM_ENDPOINT} data-email={CONTACT_EMAIL}>
        <div className="row2">
          <div className="field"><label htmlFor="cf-name">Your name <i>*</i></label><input id="cf-name" name="name" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="cf-email">Work email <i>*</i></label><input id="cf-email" name="email" type="email" autoComplete="email" required /></div>
        </div>
        <div className="field"><label htmlFor="cf-company">Company name <i>*</i></label><input id="cf-company" name="company" autoComplete="organization" required /></div>
        <fieldset className="field">
          <legend>What problems are you facing? <i>*</i> <span className="hint">Pick any that apply</span></legend>
          <div className="chips" id="cf-problems">
            <label className="chip-c"><input type="checkbox" name="problems" value="Buyers don't understand our product" /><span>Buyers don't understand our product</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="Agencies need too much briefing" /><span>Agencies need too much briefing</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="Our content sounds generic" /><span>Our content sounds generic</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="Sales doesn't use our content" /><span>Sales doesn't use our content</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="Founder insight isn't captured" /><span>Founder insight isn't captured</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="Not enough marketing bandwidth" /><span>Not enough marketing bandwidth</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="No content system or workflows" /><span>No content system or workflows</span></label>
            <label className="chip-c"><input type="checkbox" name="problems" value="Something else" /><span>Something else</span></label>
          </div>
        </fieldset>
        <div className="field"><label htmlFor="cf-service">Which service can we help with? <i>*</i></label>
          <select id="cf-service" name="service" required>
            <option value="">Choose a service</option>
            <option>Marketing ops systems &amp; AI content operations</option>
            <option>Market intelligence</option>
            <option>Positioning &amp; messaging</option>
            <option>Content strategy</option>
            <option>Founder thought leadership</option>
            <option>Product messaging &amp; launch content</option>
            <option>Case studies &amp; sales one-pagers</option>
            <option>Blogs &amp; newsletters</option>
            <option>Website messaging</option>
            <option>Market reports</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="field"><label htmlFor="cf-more">Tell us more <span className="hint">Optional</span></label><textarea id="cf-more" name="more" rows={5} placeholder="Your product, your buyers, what you've tried, timelines…"></textarea></div>
        <div className="hp" aria-hidden="true"><label htmlFor="cf-website">Website</label><input id="cf-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <p className="cf-err" id="cf-err" role="alert"></p>
        <button className="btn btn-primary" type="submit" id="cf-submit">Send message <span className="arr">&rarr;</span></button>
      </form>
      <aside className="cform-side">
        <div className="side-card">
          <h3>What happens next</h3>
          <ol>
            <li><b>We read it</b><span>Your message goes straight to the founder.</span></li>
            <li><b>We reply</b><span>With questions, or a time for a short call.</span></li>
            <li><b>We're honest</b><span>If we're not the right fit, we'll say so.</span></li>
          </ol>
        </div>
        <div className="side-card ink">
          <small>Rather email directly?</small>
          <a href="mailto:nutan@stacknarrative.com">nutan@stacknarrative.com</a>
        </div>
      </aside>
      <div className="cf-done" id="cf-done" hidden></div>
    </div>
  </section>
</div>

    </>
  );
}
