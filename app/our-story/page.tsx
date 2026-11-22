import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { mailHref, siteConfig, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Rooted Path Homes LLC is Gregg and Kristi Arnell's company in southern Illinois. We sell modest houses with owner financing. Where Life Takes Root.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Our Story"
        title="We're Gregg and Kristi. This company is the two of us."
        lede={`${siteConfig.company} is a small, husband-and-wife company. We live and work in ${siteConfig.serviceArea}. We buy modest single-family houses and sell them to people who want to own, using owner financing.`}
      />

      <div className="split" style={{ marginTop: "1.5rem" }}>
        <div className="prose">
          <p className="pullquote">{siteConfig.tagline}</p>
          <p>
            A lot of folks we talk with can handle a house payment. What gets in the way is the
            lump a bank wants up front, or a process that never quite opens the door. We built
            this company for that gap.
          </p>
          <p>
            The name is the whole idea. A path you can actually walk, and roots you get to put
            down. {siteConfig.tagline.replace(/\.$/, "")} is what we want a set of keys to mean: a
            place that is yours, a payment you understand, and someone on the other end of the
            phone who will sit at the table and go through the paperwork with you.
          </p>
          <p>
            We are small on purpose. You&apos;ll talk to us. If we don&apos;t know an answer — about
            a roof, a deed, a timeline — we will say so. We would rather be plain than polished.
          </p>
          <h2>What we sell, and what we buy</h2>
          <p>
            On the buying side, we sell houses with seller financing: a down payment, a monthly
            payment, and a note that usually runs 15 to 30 years. The numbers belong to that one
            house. We don&apos;t publish a figure until it is real, and we don&apos;t tell anyone
            they are approved just because they filled out a form.
          </p>
          <p>
            On the selling side, we buy houses for cash, as-is, in any condition. If you have a
            place you&apos;re ready to let go of, <Link href="/sell">tell us about it</Link>. You
            can say no to an offer.
          </p>
          <p>
            We keep housing fair and simple to say out loud: everyone who calls gets the same
            respect, and the same straight answers. The Equal Housing Opportunity statement in the
            footer is not decoration. It is how we work.
          </p>
        </div>
        <aside className="info-card">
          <h2>Say hello</h2>
          <p>
            <a href={telHref()}>{siteConfig.phoneDisplay}</a>
          </p>
          <p>
            <a href={mailHref()}>{siteConfig.email}</a>
          </p>
          <p>{capitalize(siteConfig.serviceArea)}.</p>
          <p>We don&apos;t keep a public lobby. We meet you at the house, or we call you back.</p>
          <div className="btn-row">
            <Link className="btn" href="/contact">
              Let&apos;s Talk
            </Link>
            <Link className="btn btn-copper" href="/book-a-tour">
              Book a Tour
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
