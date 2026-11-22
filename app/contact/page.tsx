import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { CONTACT_TOPICS } from "@/lib/forms";
import { mailHref, siteConfig, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Let's Talk",
  description: `Call, email, or write Rooted Path Homes. Gregg and Kristi Arnell answer. Phone ${siteConfig.phoneDisplay}. Email ${siteConfig.email}. Southern Illinois, around Murphysboro.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Let's Talk"
        title="Call, write, or send a note. A person answers."
        lede="If we're walking a house with someone, leave a message. We'll get back to you. You don't need to have the perfect question ready."
      />

      <div className="split" style={{ marginTop: "1.4rem" }}>
        <div className="info-grid">
          <article className="info-card">
            <h2>Phone</h2>
            <p>
              <a href={telHref()}>{siteConfig.phoneDisplay}</a>
            </p>
            <p>Tap to call from your phone. If we miss you, leave your name and a good time.</p>
          </article>
          <article className="info-card">
            <h2>Email</h2>
            <p>
              <a href={mailHref()}>{siteConfig.email}</a>
            </p>
            <p>We read it. We don&apos;t hand it to a call center.</p>
          </article>
          <article className="info-card">
            <h2>Where we work</h2>
            <p>{capitalize(siteConfig.serviceArea)}.</p>
            <p>We meet you at the house. We don&apos;t keep a public office lobby.</p>
          </article>
          <article className="info-card">
            <h2>Looking for something specific?</h2>
            <p>
              A house to buy is on <Link href="/homes">Find a Home</Link>. A house to sell starts on{" "}
              <Link href="/sell">Sell Us Your House</Link>. A tour is its own short form.
            </p>
          </article>
        </div>
        <div>
          <h2 style={{ color: "var(--forest)" }}>Send a note</h2>
          <LeadForm
            form="contact"
            submitLabel="Send my note"
            disclaimer="Sending this note is not an application, an offer, or an approval. It just tells us you'd like to talk."
            successTitle="We got your message."
            successBody="Gregg or Kristi will write or call you back."
            fields={[
              { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", width: "half" },
              { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              {
                name: "topic",
                label: "What is this about?",
                type: "select",
                required: true,
                options: CONTACT_TOPICS.map((value) => ({ value, label: value })),
              },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
