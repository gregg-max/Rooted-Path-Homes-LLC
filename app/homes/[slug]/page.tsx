import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FactList, StatusBadge } from "@/components/HomeCard";
import { HomeTerms } from "@/components/HomeTerms";
import { Gallery } from "@/components/Gallery";
import { LeadForm } from "@/components/LeadForm";
import { MOVE_TIMELINES } from "@/lib/forms";
import { formatMoney, isTbd } from "@/lib/format";
import { fullAddress, getHome, getHomes, mapsUrl } from "@/lib/homes";
import { getSiteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getHomes().map((home) => ({ slug: home.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const home = getHome(slug);
  if (!home) return { title: "Home" };
  const title = `${home.address}, ${home.city}`;
  const priced = !isTbd(home.purchasePrice) && !isTbd(home.monthlyPayment);
  const description = priced
    ? `${fullAddress(home)}. Owner financing from Rooted Path Homes. Purchase price ${formatMoney(home.purchasePrice)}, ${formatMoney(home.downPayment)} down, monthly payments from ${formatMoney(home.monthlyPayment)}. Bedrooms, bathrooms, and square feet are not posted yet.`
    : `${fullAddress(home)}. Owner financing with Rooted Path Homes. Price, down payment, and monthly payment are shown only when we have real numbers. Status: ${home.status}.`;
  return {
    title,
    description,
    alternates: { canonical: `/homes/${home.slug}` },
    openGraph: { title, description },
  };
}

export default async function HomeDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const home = getHome(slug);
  if (!home) notFound();

  const address = fullAddress(home);
  const paragraphs = home.description.split(/\n\n+/).filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: address,
    url: `${getSiteUrl()}/homes/${home.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: home.address,
      addressLocality: home.city,
      addressRegion: home.state,
      postalCode: home.zip,
      addressCountry: "US",
    },
    ...(isTbd(home.purchasePrice)
      ? {}
      : {
          offers: {
            "@type": "Offer",
            price: home.purchasePrice.replace(/[$,]/g, ""),
            priceCurrency: "USD",
            availability:
              home.status === "Sold"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
          },
        }),
  };

  return (
    <article className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <div style={{ paddingTop: "1.25rem" }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/homes", label: "Find a Home" },
            { label: home.address },
          ]}
        />
      </div>
      <div className="detail-layout">
        <div className="stack">
          <Gallery photos={home.photos} address={address} />
          <div>
            <StatusBadge status={home.status} />
            <h1 className="detail-title">{home.address}</h1>
            <p className="card-address" style={{ fontSize: "1.1rem" }}>
              {home.city}, {home.state} {home.zip}
              {home.county ? ` · ${home.county}` : ""}
            </p>
            <p>
              <a className="map-link" href={mapsUrl(home)} target="_blank" rel="noopener noreferrer">
                Open this address in maps
              </a>
            </p>
          </div>
          {home.paymentOptions?.length ? (
            <>
              <HomeTerms home={home} />
              <dl className="facts">
                {(
                  [
                    ["Bedrooms", home.beds],
                    ["Bathrooms", home.baths],
                    ["Square feet", home.sqft],
                  ] as const
                ).map(([label, value]) => (
                  <div className="fact" key={label}>
                    <dt>{label}</dt>
                    <dd className={isTbd(value) ? "is-tbd" : undefined}>
                      {isTbd(value) ? (
                        <>
                          <span className="sr-only">Not posted yet. </span>
                          TBD
                          <small>Not posted yet</small>
                        </>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <FactList home={home} />
          )}
          <div className="prose">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          {home.status !== "Sold" ? (
            <div className="btn-row">
              <a className="btn" href="#interested">
                I&apos;m interested
              </a>
              <Link className="btn btn-copper" href={`/book-a-tour?home=${home.slug}`}>
                Book a Tour
              </Link>
            </div>
          ) : null}
          <p>
            New to seller financing? <Link href="/how-it-works">How It Works</Link> explains the
            steps in plain English.
          </p>
        </div>

        <div className="detail-form" id="interested">
          {home.status === "Sold" ? (
            <div className="callout">
              <h2>This home is sold</h2>
              <p>
                We&apos;re glad it found someone. If you want to hear about the next one,{" "}
                <Link href="/homes#get-on-the-list">get on the list</Link>.
              </p>
            </div>
          ) : (
            <>
              {home.status === "Pending" ? (
                <p className="callout">
                  This home is pending. Someone is already in conversation with us. You can still
                  write, and we&apos;ll tell you honestly if it is still open.
                </p>
              ) : null}
              <h2 style={{ color: "var(--forest)" }}>I&apos;m interested / apply</h2>
              <p>
                Tell us about you and this house. We&apos;ll reply ourselves. This is how a
                conversation starts.
              </p>
              <LeadForm
                form="interest"
                context={{ home: home.slug, homeAddress: address }}
                submitLabel="Send my note"
                disclaimer="Sending this form does not reserve the home and does not mean you are approved for owner financing."
                successTitle="We got your note."
                successBody="Gregg or Kristi will be in touch about this house. This does not hold it for you, and it is not an approval."
                fields={[
                  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", width: "half" },
                  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
                  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                  {
                    name: "downPayment",
                    label: "Down payment available",
                    type: "text",
                    required: true,
                    placeholder: "Your number, or not sure",
                    width: "half",
                  },
                  {
                    name: "monthlyBudget",
                    label: "Monthly budget",
                    type: "text",
                    required: true,
                    placeholder: "Fits a tight month",
                    width: "half",
                  },
                  {
                    name: "moveTimeline",
                    label: "Move timeline",
                    type: "select",
                    required: true,
                    options: MOVE_TIMELINES.map((value) => ({ value, label: value })),
                  },
                  {
                    name: "notes",
                    label: "Anything else we should know?",
                    type: "textarea",
                  },
                ]}
              />
            </>
          )}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
