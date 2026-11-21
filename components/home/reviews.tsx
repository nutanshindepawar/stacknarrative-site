// Client reviews. Add real reviews to REVIEWS; the section stays hidden while the list is empty.
// SN_DEMO=1 (demo builds only) shows clearly labelled placeholders so the layout can be reviewed.
type Review = { quote: string; name: string; role: string; company: string };

const REVIEWS: Review[] = [];

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
        <h2 id="reviews-h">Built with the people who know the market best.</h2>
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
