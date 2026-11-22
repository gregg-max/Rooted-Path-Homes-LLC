import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Owner financing with Rooted Path Homes, in plain English. Find a home you love, take a tour, sit down to go over the terms, and get your keys. Plus a straight comparison of renting and owning.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    title: "Find a home you love",
    body: "Look through the homes we have posted. Right now that list is short, and that is honest. If you don't see the right house, get on the list. We'd rather show you one real house than a page of maybes.",
  },
  {
    title: "Take a tour",
    body: "Come walk it with us. We'll tell you what we know about the roof, the rooms, and the things that still need love. You tell us what you see. Book a Tour sends us your preferred days and times. We call to set a real appointment. The form itself is not on the calendar yet.",
  },
  {
    title: "Sit down with us to go over the terms",
    body: "This is the heart of it. We go through the purchase price, the down payment, the monthly payment, and how many years the note runs — usually somewhere between 15 and 30 years, decided for that house. We also talk about taxes, insurance, repairs, and what happens if a payment is missed. You can take the papers home. You can show them to a lawyer or a HUD-approved housing counselor. We think that is a good idea.",
  },
  {
    title: "Get your keys",
    body: "If the terms work for you and they work for us, we sign, and then you get the keys. Asking, touring, and filling out a form do not get you there by themselves. A signed note does.",
  },
];

const comparisons = [
  {
    title: "Where the monthly payment goes",
    renting: "A rent check pays for time in a place someone else owns. The amount can change when a lease renews.",
    owning:
      "A payment on our note goes toward the purchase we wrote down for that house. The amount is the one in the paperwork, not a number we remember later.",
  },
  {
    title: "The money at the start",
    renting: "Usually a deposit, and sometimes the first month.",
    owning:
      "A down payment that is part of the purchase. The amount depends on the house. If the page says TBD, we have not set it.",
  },
  {
    title: "Who fixes things",
    renting: "Often the landlord, on the landlord's schedule.",
    owning:
      "Once you buy, the house is yours to care for, unless that house's paperwork says otherwise. We will be plain about condition before you sign. Please don't skip the tour.",
  },
  {
    title: "How long you can stay",
    renting: "A lease has an end date. After that, both sides decide again.",
    owning:
      "A note can run 15 to 30 years if we agree and the payments stay current. The exact length is written for that home.",
  },
  {
    title: "What a yes actually means",
    renting: "A landlord screens you and offers a lease, or doesn't.",
    owning:
      "We review each buyer ourselves. Sending a form is not an approval. We will tell you yes, no, or not this house.",
  },
  {
    title: "When the house is yours on paper",
    renting: "It isn't. You have a right to live there for the lease, and then it ends.",
    owning:
      "How the title is held — and when the deed is in your name — is written in that home's paperwork. We will walk through it before you sign. Please don't guess, and ask a lawyer if you want a second set of eyes.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="How It Works"
        title="Owner financing, the way we'd explain it to a neighbor."
        lede="You buy the house from us. You pay us each month. A bank is not in the middle of that payment. The deal is a note for one specific house, and we will sit at the table until it makes sense."
      />

      <section className="section" aria-labelledby="step-heading" style={{ paddingTop: "1.5rem" }}>
        <h2 id="step-heading">The steps</h2>
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
        <div className="btn-row" style={{ marginTop: "1.2rem" }}>
          <Link className="btn" href="/homes">
            Find a Home
          </Link>
          <Link className="btn btn-copper" href="/book-a-tour">
            Book a Tour
          </Link>
        </div>
      </section>

      <section className="section band-sage" aria-labelledby="compare-heading" style={{ borderRadius: "28px" }}>
        <div className="pad">
          <h2 id="compare-heading">Renting and owning, side by side</h2>
          <p className="lede">
            People ask us how this is different from writing a rent check. Here is the honest
            version. Owning is not automatically cheaper, and it is not automatically wiser. It is
            a different promise.
          </p>
          <div className="compare" style={{ marginTop: "1rem" }}>
            {comparisons.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>
                  <strong>Renting. </strong>
                  {item.renting}
                </p>
                <p>
                  <strong>Owning with our note. </strong>
                  {item.owning}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="promise-heading" style={{ paddingBottom: 0 }}>
        <h2 id="promise-heading">What we will not promise</h2>
        <ul className="promise-list">
          <li>We will not promise that you are approved. A form starts a conversation. It is not a yes.</li>
          <li>We will not promise a payment, a price, or a down payment until it is written for a specific house.</li>
          <li>We will not promise that every person who calls will buy, or that every house will still be open tomorrow.</li>
          <li>We will not ask you to sign something you have not had time to read.</li>
        </ul>
        <p style={{ marginTop: "1.1rem" }}>
          More of the paperwork words are in our guide,{" "}
          <Link href="/guides/how-owner-financing-works">How owner financing works</Link>.
        </p>
      </section>
    </div>
  );
}
