import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { INVESTOR_ROLES } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Fixer-Uppers",
  description:
    "Discounted as-is houses from Rooted Path Homes for investors and handy buyers in southern Illinois. Join the list and we'll call when we have one. No fee.",
  alternates: { canonical: "/fixer-uppers" },
};

export default function FixerUppersPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Fixer-Uppers"
        title="For investors, and for people who own a good tool belt."
        lede="Some houses need more work than a buyer who wants to move in next month will want to take on. When we have one of those, we offer it as-is, at a discount."
      />

      <div className="split" style={{ marginTop: "1.4rem" }}>
        <div className="prose">
          <h2>What as-is means here</h2>
          <p>
            You would buy the house in the condition it is in that day. We are not promising to
            paint it, replace the floor, or haul off what the last person left behind. The price
            reflects that. We will tell you what we know. You should still look with your own eyes.
          </p>
          <p>
            These are not the same homes we sell to someone who wants a long owner-financed note
            and a set of keys for everyday living. If a fixer is also something we would finance,
            we will say that clearly when we talk. Please don&apos;t assume a discounted house
            comes with a payment plan.
          </p>
          <h2>Nothing listed today</h2>
          <p>
            We don&apos;t have a fixer-upper on this site right now. There is no VIP fee and no
            quota. Join the list and we&apos;ll reach out when we have an as-is house to offer
            around southern Illinois. You can ask us to take you off whenever you like.
          </p>
          <ul className="promise-list">
            <li>We sell them as-is. Condition is part of the deal, not a surprise we tidy up later.</li>
            <li>The discount is real only when we name a price. We won&apos;t invent one on this page.</li>
            <li>Telling us you&apos;re interested is not a contract, and it is not a promise that a house will fit.</li>
          </ul>
        </div>
        <div>
          <h2 style={{ color: "var(--forest)" }}>Join the investor list</h2>
          <LeadForm
            form="investor"
            submitLabel="Join the list"
            disclaimer="Joining this list is not a contract and does not promise that a house, a price, or financing will be available."
            successTitle="You're on the fixer-upper list."
            successBody="When we have an as-is house to offer, we'll be in touch. There is nothing to pay for being on the list."
            fields={[
              { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", width: "half" },
              { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              {
                name: "role",
                label: "I am",
                type: "select",
                required: true,
                options: INVESTOR_ROLES.map((value) => ({ value, label: value })),
              },
              {
                name: "note",
                label: "What kind of house are you hoping to hear about?",
                type: "textarea",
                placeholder: "Optional. Area, size, or the kind of work you're ready to do.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
