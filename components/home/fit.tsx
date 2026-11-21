/* Converted from the reference design (D:\StackNarrative\website\index.html).
   embedded: rendered inside the homepage contact band (compact, no section of its own). */
export default function Fit({ embedded = false }: { embedded?: boolean }) {
  const cols = (
    <div className="fit">
      <div className="fit-col yes rv">
        <h3>We're a strong fit if you…</h3>
        <ul>
          <li>Sell B2B technology, especially to travel and hotel businesses</li>
          <li>Have product-market fit: typically 15+ employees or at least 10 customers</li>
          <li>Have an active sales team that needs better content to sell with</li>
          <li>Are a founder, CEO, CMO, Head of Marketing or Product Marketing Manager who owns the story</li>
          <li>Want a repeatable system, not one-off pieces</li>
        </ul>
      </div>
      <div className="fit-col no rv">
        <h3>We're probably not right if you…</h3>
        <ul>
          <li>Need consumer travel content for hotels or OTAs selling to guests</li>
          <li>Are still searching for product-market fit</li>
          <li>Want the cheapest cost per word</li>
          <li>Are a B2C company</li>
        </ul>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="fit-embedded" id="fit">
        <div className="fit-embedded-head rv">
          <span className="eyebrow">Who we work with</span>
          <h3>Are we a fit?</h3>
          <p>We're deliberately narrow. That's how we stay good at what we do.</p>
        </div>
        {cols}
      </div>
    );
  }

  return (
    <section id="fit">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">Who we work with</span>
          <h2>Are we a fit?</h2>
          <p className="lead">We're deliberately narrow. That's how we stay good at what we do.</p>
        </div>
        {cols}
      </div>
    </section>
  );
}
