
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
import Fit from "@/components/home/fit";

export default function ContactBand({ fit = false }: { fit?: boolean }) {
  return (
    <>
<section className="dark cta-band" id="contact">
  <div className="wrap cta-box">
    <div className="rv">
      <span className="eyebrow">Let's talk</span>
      <h2 style={{marginTop: "20px"}}>Build a content engine that grows with your business.</h2>
      <p className="lead" style={{marginTop: "20px"}}>Stop relying on one-off content. Tell us what you're selling, who you're selling to and where content is slowing you down. We'll tell you honestly whether we can help.</p>
    </div>
    <div className="contact rv">
      <div className="contact-line">
        <div><small>Email</small><a href="mailto:nutan@stacknarrative.com" style={{textDecoration: "none"}}>nutan@stacknarrative.com</a></div>
        <button className="copy-btn" type="button" id="copyEmail">Copy</button>
      </div>
      <a className="contact-line" href="https://www.linkedin.com/in/nutanstrategist/" target="_blank" rel="noopener">
        <div><small>LinkedIn</small>linkedin.com/in/nutanstrategist</div><span style={{marginLeft: "auto"}}>&#8599;</span>
      </a>
      <a className="contact-line" href="/contact">
        <div><small>Prefer a form?</small>Contact us: tell us what you need</div><span style={{marginLeft: "auto"}}>&rarr;</span>
      </a>
    </div>
  </div>
  {fit && <div className="wrap"><Fit embedded /></div>}
</section>

    </>
  );
}
