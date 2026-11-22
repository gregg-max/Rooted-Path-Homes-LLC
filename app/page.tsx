import Link from "next/link";
import { HomeCard } from "@/components/HomeCard";
import { LeadForm } from "@/components/LeadForm";
import { getHomes } from "@/lib/homes";
import { siteConfig } from "@/lib/site";

const steps = [
  {
    title: "Find a home you love",
    body: "Start with the house we have posted. If the numbers say TBD, that only means we have not published them yet.",
  },
  {
    title: "Take a tour",
    body: "Walk the rooms with us. Open the closets. Ask whatever you notice. A tour is a look, not a promise.",
  },
  {
    title: "Sit down with us to go over the terms",
    body: "We read the purchase price, the down payment, the monthly payment, and the length of the note out loud. You can take the papers home.",
  },
  {
    title: "Get your keys",
    body: "If we both say yes, and the paperwork is signed, the keys are yours. Not before.",
  },
];

export default function HomePage() {
  const homes = getHomes();
  const featured = homes.find((home) => home.status === "Available") ?? homes[0];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <img
            className="hero-logo"
            src="/logo-primary.png"
            alt={`${siteConfig.company}. ${siteConfig.tagline}`}
            width={1400}
            height={968}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">Southern Illinois</p>
            <h1>A home of your own, on terms we can explain at the kitchen table.</h1>
            <p className="lede">
              We&apos;re {siteConfig.owners}. {siteConfig.shortName} buys modest single-family houses
              around Murphysboro and sells them with owner financing. You pay a down payment, then a
              monthly payment, on a note that usually runs 15 to 30 years. You talk to us, not a
              call center.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/homes">
                Find a Home
              </Link>
              <Link className="btn btn-ghost" href="/how-it-works">
                How It Works
              </Link>
            </div>
            <ul className="trust-row">
              <li>Husband and wife owned</li>
              <li>Owner financing</li>
              <li>Plain-English paperwork</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section band-paper" aria-labelledby="featured-heading">
        <div className="wrap">
          <p className="eyebrow">Right now</p>
          <h2 id="featured-heading">The home we have to show you</h2>
          <p className="lede">
            We post a house when we actually have it. There is one on the site today, with the
            owner-financing numbers filled in. Photos of the house are still on the way.
          </p>
          <div className="stack" style={{ marginTop: "1.25rem" }}>
            {featured ? (
              <HomeCard home={featured} featured />
            ) : (
              <p>We don&apos;t have a home posted today. Get on the list and we&apos;ll tell you when we do.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-heading">
        <div className="wrap">
          <p className="eyebrow">Four steps</p>
          <h2 id="steps-heading">How buying with us works</h2>
          <p className="lede">
            Owner financing means we are the seller and we hold the note. A bank is not in the
            middle of your house payment. The path itself is simple.
          </p>
          <ol className="steps">
            {steps.map((step, index) => (
              <li className="step" key={step.title}>
                <span className="step-index">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: "1.1rem" }}>
            <Link href="/how-it-works">See the full explanation, including renting and owning</Link>
          </p>
        </div>
      </section>

      <section className="section band-sage" aria-labelledby="paths-heading">
        <div className="wrap">
          <h2 id="paths-heading">Two ways we can help</h2>
          <div className="path-grid" style={{ marginTop: "1rem" }}>
            <Link className="path-card path-buy" href="/homes">
              <h3>I want to buy</h3>
              <p>
                Look at the home we have, book a tour, or get on the list for the next one. Asking
                is not an approval, and it does not reserve a house.
              </p>
              <span className="btn btn-copper" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                Find a Home
              </span>
            </Link>
            <Link className="path-card path-sell" href="/sell">
              <h3>I want to sell</h3>
              <p>
                We buy houses for cash, as-is, in any condition. You don&apos;t have to fix a thing
                for us to come look. You can say no to an offer.
              </p>
              <span className="btn btn-copper" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                Sell Us Your House
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section band-forest" aria-labelledby="note-heading">
        <div className="wrap narrow">
          <p className="eyebrow" style={{ color: "#f4e6d4" }}>
            From the owners
          </p>
          <h2 id="note-heading">A note from Gregg and Kristi</h2>
          <p>
            We started {siteConfig.shortName} because we kept meeting people who could handle a
            house payment and still couldn&apos;t get through a bank&apos;s front door. Seller
            financing is how we close that gap. We buy the house. We sell it to you. You pay us.
          </p>
          <p>
            The numbers live in a note for that one house. We would rather explain every line than
            rush you past it. If we don&apos;t know an answer, we&apos;ll say so.
          </p>
          <Link className="btn btn-copper" href="/our-story">
            Our Story
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="list-heading">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Next home</p>
            <h2 id="list-heading">Get on the list</h2>
            <p className="lede">
              If the house we have isn&apos;t the one, or the numbers aren&apos;t posted yet, leave
              your name. When we have another home to share, we&apos;ll reach out. Joining the list
              is not an application and it is not an approval.
            </p>
          </div>
          <LeadForm
            form="waitlist"
            submitLabel="Get on the list"
            disclaimer="Sending this form does not reserve a home and does not mean you are approved for owner financing."
            successTitle="You're on the list."
            successBody="When we have another home to share, we'll reach out. You can ask us to take you off anytime."
            fields={[
              { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", width: "half" },
              { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              {
                name: "note",
                label: "What are you hoping for?",
                type: "textarea",
                placeholder: "A short note is plenty. Town, timing, or what you can comfortably pay.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
