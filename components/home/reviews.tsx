// Client reviews. Add real reviews to REVIEWS; the section stays hidden while the list is empty.
// SN_DEMO=1 (demo builds only) shows clearly labelled placeholders so the layout can be reviewed.
type Review = { quote: string; name: string; role: string; company: string };

// Verbatim excerpts from LinkedIn recommendations (trimmed only, no words changed).
const REVIEWS: Review[] = [
  {
    quote:
      "Her support has been invaluable: from our annual Trend Report to client case studies/success stories and more consultative resources for our hotelier partners, Nutan has aided my team in producing strong copy across numerous formats and, at times, rather niche subject matter, helping us to increase our output and brand awareness.",
    name: "Leanne Sturrock",
    role: "Content Marketing Manager",
    company: "HBX Group",
  },
  {
    quote:
      "We've worked with Nutan on a number of projects and have been very pleased with what she's provided and her ease of writing on a variety of topics.",
    name: "Tiphaine Lazard",
    role: "Marketing Manager",
    company: "EP Climbing",
  },
];

const DEMO: Review[] = [
  { quote: "Placeholder: review 1 goes here, word for word as the client wrote it.", name: "Reviewer name", role: "Role", company: "Company" },
  { quote: "Placeholder: review 2 goes here, word for word as the client wrote it.", name: "Reviewer name", role: "Role", company: "Company" },
];

export default function Reviews({ embedded = false }: { embedded?: boolean }) {
  const demo = !REVIEWS.length && process.env.SN_DEMO === "1";
  const list = REVIEWS.length ? REVIEWS : demo ? DEMO : [];
  if (!list.length) return null;
  const body = (
    <>
      <div className="head rv">
        <span className="eyebrow">Client reviews</span>
        <h2 id="reviews-h">What our clients say about us.</h2>
      </div>
      <div className="reviews-grid">
        {list.map((r, i) => (
          <figure className={`review rv${demo ? " is-demo" : ""}`} key={i}>
            <span className="review-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>{r.quote}</blockquote>
            <figcaption>
              <span className="review-av" aria-hidden="true">{r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
              <span>
                <b>{r.name}</b>
                <span>
                  {r.role}, {r.company}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
  if (embedded) return <div className="reviews reviews-embedded" aria-labelledby="reviews-h">{body}</div>;
  return (
    <section className="reviews" aria-labelledby="reviews-h">
      <div className="wrap">{body}</div>
    </section>
  );
}
