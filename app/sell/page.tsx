import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { SELLER_CONDITIONS, SELLER_TIMELINES } from "@/lib/forms";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell Us Your House",
  description:
    "Sell your southern Illinois house to Rooted Path Homes for cash, as-is, in any condition. Tell us the address and your timeline. An offer is optional. You can say no.",
  alternates: { canonical: "/sell" },
};

const faqs = [
  {
    question: "Do you really buy houses as-is?",
    answer:
      "Yes. We don't hand you a repair list and wait. We look at the house the way it is today — leaky roof, old carpet, a full garage, a tenant still living there. Tell us the truth. The truth helps us make a fair offer. It does not, by itself, scare us off.",
  },
  {
    question: "How fast can you close?",
    answer:
      "As fast as the title work and the paperwork allow. Tell us the date you have in mind. If we can meet it, we'll say so. If we can't, we'll say that too, instead of promising a week we don't control.",
  },
  {
    question: "What if I still owe money on the house?",
    answer:
      "Tell us. We can often still take a look, as long as the numbers have room to work. We won't know until we hear the details, and hearing them is not a promise that we'll buy.",
  },
  {
    question: "Do I have to clean everything out?",
    answer:
      "No. If you want to leave things behind, say so. We'll factor the clean-out into the offer instead of asking you to spend a weekend hauling.",
  },
  {
    question: "Am I stuck if I don't like the offer?",
    answer:
      "No. An offer is an offer. You can say no, and you can take time to think. Sending this form does not obligate you to sell.",
  },
];

export default function SellPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Sell Us Your House"
        title="Cash, as-is, and no repair list from us."
        lede={`If you have a house in ${siteConfig.serviceArea} that you're ready to let go of, tell us about it. We buy for cash. Any condition. You don't have to paint, clean, or fix a thing for us to come look.`}
      />

      <div className="split" style={{ marginTop: "1.4rem" }}>
        <div>
          <ul className="promise-list">
            <li>You tell us the address and what shape the house is in.</li>
            <li>We come take a look, or we tell you quickly if it&apos;s outside what we buy.</li>
            <li>If it&apos;s a fit, we make an offer. You can say yes or no.</li>
            <li>We try to close on a timeline that works for you, without pretending title work is magic.</li>
          </ul>
          <p>
            Not every house is one we&apos;ll buy. We&apos;d rather say that early than waste your
            week. A conversation is not a contract.
          </p>
          <section aria-labelledby="sell-faq" style={{ marginTop: "1.5rem" }}>
            <h2 id="sell-faq">A few quick answers</h2>
            <div className="faq">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
        <div>
          <h2 style={{ color: "var(--forest)" }}>Tell us about the house</h2>
          <LeadForm
            form="seller"
            submitLabel="Send my house details"
            disclaimer="Sending this form is not a contract. You don't have to accept an offer, and we don't have to make one."
            successTitle="We got the details."
            successBody="We'll reach out about a time to talk or to see the house. You are not obligated to sell."
            fields={[
              {
                name: "propertyAddress",
                label: "Property address",
                type: "text",
                required: true,
                autoComplete: "street-address",
                placeholder: "Street, city, and state",
              },
              { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", width: "half" },
              { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              {
                name: "condition",
                label: "Condition",
                type: "select",
                required: true,
                width: "half",
                options: SELLER_CONDITIONS.map((value) => ({ value, label: value })),
              },
              {
                name: "timeline",
                label: "Timeline",
                type: "select",
                required: true,
                width: "half",
                options: SELLER_TIMELINES.map((value) => ({ value, label: value })),
              },
              {
                name: "askingPrice",
                label: "Asking price (optional)",
                type: "text",
                placeholder: "Your number, if you have one",
              },
              {
                name: "notes",
                label: "Anything else we should know?",
                type: "textarea",
                placeholder: "Tenants, a mortgage, stuff left inside, a date that matters.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
