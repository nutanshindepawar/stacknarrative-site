
/* Converted from the reference design (D:\StackNarrative\website\index.html). */
export type MenuPage = { title: string; slug: string; menuGroup?: "top" | "why" | "work" };

export default function Header({ pages = [] }: { pages?: MenuPage[] }) {
  const group = (g: string) => pages.filter((p) => (p.menuGroup || "top") === g).map((p) => <a key={p.slug} href={`/${p.slug}`}>{p.title}</a>);
  return (
    <>
<header className="nav" id="top">
  <div className="wrap nav-in">
    <a className="brand" href="/" aria-label="StackNarrative home">
      <svg className="mark" viewBox="395 355 480 520" aria-hidden="true">
        <path className="k" strokeWidth="30" d="M666 395 Q646 377 620 389 L480 469 Q422 505 422 575 L422 712 Q422 738 447 745" />
        <path className="g" strokeWidth="30" d="M760 455 Q740 437 714 449 L558 538 Q500 573 500 640 L500 770 Q500 794 524 800" />
        <path className="k" strokeWidth="30" d="M582 680 L582 808 Q582 846 618 838 L790 738 Q838 708 838 660 L838 535 Q838 492 798 505 L626 602 Q582 628 582 680 Z" />
      </svg>
      StackNarrative
    </a>
    <button className="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="navLinks">Menu</button>
    <nav className="nav-links" id="navLinks" aria-label="Main">
      <a href="/services">Services</a>
      <div className="dd">
        <button className="dd-btn" type="button" aria-expanded="false" aria-controls="dd-why">Why us <span className="car" aria-hidden="true"></span></button>
        <div className="dd-menu" id="dd-why">
          <a href="/#problems">Problems We Solve</a>
          <a href="/about">About Us</a>
          <a href="/#why">Why Us</a>
          <a href="/contact">Contact Us</a>
          {group("why")}
        </div>
      </div>
      <div className="dd">
        <button className="dd-btn" type="button" aria-expanded="false" aria-controls="dd-work">Work <span className="car" aria-hidden="true"></span></button>
        <div className="dd-menu" id="dd-work">
          <a href="/#work">Client Work</a>
          <a href="/agents">AI Agents</a>
          <a href="https://resources.stacknarrative.com/HospitalityTechFounderLinkedInPlaybook.pdf" target="_blank" rel="noopener">Founder LinkedIn Playbook <span aria-hidden="true">&#8599;</span></a>
          {group("work")}
        </div>
      </div>
      <a href="/toolbook">AI Toolbook</a>
      <a href="/blog">Blog</a>
      {group("top")}
      <a href="/contact" className="cta">Let's talk</a>
    </nav>
  </div>
</header>

    </>
  );
}
