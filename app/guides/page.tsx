import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getFaqs, getGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Helpful Guides",
  description:
    "Short, plain-English guides from Rooted Path Homes on owning and renting, how owner financing works, and what to have ready before you apply. Plus a friendly FAQ.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  const guides = getGuides();
  const faqs = getFaqs();

  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Helpful Guides"
        title="A few pages worth reading before you call."
        lede="Short on purpose. No jargon if we can help it. If a sentence doesn't match the house in front of you, the paperwork for that house wins, and you should ask us."
      />

      <div className="guide-grid three" style={{ marginTop: "1.4rem" }}>
        {guides.map((guide) => (
          <Link className="guide-card" key={guide.slug} href={`/guides/${guide.slug}`}>
            <span>{guide.minutes} min read</span>
            <h2 style={{ fontSize: "1.45rem", margin: 0 }}>{guide.title}</h2>
            <p style={{ margin: 0 }}>{guide.description}</p>
          </Link>
        ))}
      </div>

      <section className="section" aria-labelledby="faq-heading" style={{ paddingBottom: 0 }}>
        <h2 id="faq-heading">Questions we hear a lot</h2>
        <div className="faq">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <p>
          Still wondering? <Link href="/contact">Let&apos;s Talk</Link>, or call us. A real voice is
          allowed to be simpler than a web page.
        </p>
      </section>
    </div>
  );
}
