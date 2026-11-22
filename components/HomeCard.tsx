import Link from "next/link";
import { formatFact, isTbd } from "@/lib/format";
import { fullAddress, type Home } from "@/lib/homes";

const FACTS: { key: keyof Home; label: string }[] = [
  { key: "purchasePrice", label: "Purchase price" },
  { key: "downPayment", label: "Down payment" },
  { key: "monthlyPayment", label: "Monthly payment" },
  { key: "beds", label: "Bedrooms" },
  { key: "baths", label: "Bathrooms" },
  { key: "sqft", label: "Square feet" },
];

export function HomeCard({ home, featured = false }: { home: Home; featured?: boolean }) {
  const photo = home.photos[0];
  const moneyPending = [home.purchasePrice, home.downPayment, home.monthlyPayment].every(isTbd);

  return (
    <article className={`home-card card ${featured ? "featured" : ""}`}>
      <div className="card-photo">
        <img src={photo.src} alt={photo.alt} width={1200} height={800} />
      </div>
      <div className="card-body">
        <p className="card-kicker">
          <StatusBadge status={home.status} />
        </p>
        <h3>
          <Link href={`/homes/${home.slug}`}>{home.address}</Link>
        </h3>
        <p className="card-address">
          {home.city}, {home.state} {home.zip}
        </p>
        {moneyPending ? (
          <p className="tbd-note">
            Purchase price, down payment, and monthly payment are not posted yet. TBD means we
            have not set that number. It is not a hidden price.
          </p>
        ) : null}
        <dl className="facts">
          {FACTS.map((fact) => {
            const raw = String(home[fact.key]);
            const pending = isTbd(raw);
            return (
              <div key={fact.label} className="fact">
                <dt>{fact.label}</dt>
                <dd className={pending ? "is-tbd" : undefined}>
                  {pending ? (
                    <>
                      <span className="sr-only">Not posted yet. </span>
                      TBD
                      <small>Not posted yet</small>
                    </>
                  ) : (
                    formatFact(fact.label, raw)
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
        <div className="btn-row">
          <Link className="btn" href={`/homes/${home.slug}`}>
            See this home
          </Link>
          {home.status !== "Sold" ? (
            <Link className="btn btn-copper" href={`/book-a-tour?home=${home.slug}`}>
              Book a Tour
            </Link>
          ) : null}
        </div>
        <p className="card-address sr-only">{fullAddress(home)}</p>
      </div>
    </article>
  );
}

export function StatusBadge({ status }: { status: Home["status"] }) {
  return <span className={`status status-${status.toLowerCase()}`}>{status}</span>;
}

export function FactList({ home }: { home: Home }) {
  return (
    <dl className="facts">
      {FACTS.map((fact) => {
        const raw = String(home[fact.key]);
        const pending = isTbd(raw);
        return (
          <div key={fact.label} className="fact">
            <dt>{fact.label}</dt>
            <dd className={pending ? "is-tbd" : undefined}>
              {pending ? (
                <>
                  <span className="sr-only">Not posted yet. </span>
                  TBD
                  <small>Not posted yet</small>
                </>
              ) : (
                formatFact(fact.label, raw)
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
