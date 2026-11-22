import type { Metadata } from "next";
import Link from "next/link";
import { HomeCard } from "@/components/HomeCard";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { getHomes } from "@/lib/homes";

export const metadata: Metadata = {
  title: "Find a Home",
  description:
    "Homes Rooted Path Homes is selling with owner financing in southern Illinois. 426 North St in Murphysboro is a 1-bedroom, 1-bath, 534-square-foot house. The purchase price is $57,750, with $2,500 down and monthly payments from $681.19.",
  alternates: { canonical: "/homes" },
};

export default function HomesPage() {
  const homes = getHomes();

  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Find a Home"
        title="The houses we actually have."
        lede="We keep this page short on purpose. If a home is here, we can talk about it. If a number says TBD, we have not set it yet, and we will not invent one to fill the space."
      />

      <div className="stack" style={{ marginTop: "1.25rem" }}>
        {homes.length ? (
          homes.map((home) => <HomeCard key={home.slug} home={home} featured />)
        ) : (
          <p className="callout">Nothing is posted today. Leave your name below and we&apos;ll reach out when a home is ready to show.</p>
        )}
      </div>

      <section id="get-on-the-list" className="section" aria-labelledby="waitlist-heading" style={{ paddingBottom: 0 }}>
        <div className="split">
          <div>
            <h2 id="waitlist-heading">Get on the list</h2>
            <p className="lede">
              Waiting on the next house? Tell us how to reach you. We&apos;ll write or call when we
              have something new around Murphysboro and southern Illinois.
            </p>
            <p>
              Want the longer version of how a purchase works? Read <Link href="/how-it-works">How It Works</Link>.
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
                placeholder: "Optional. Timing, size, or the payment that feels comfortable.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
