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

function parseCount(value: string | undefined) {
  if (!value || isTbd(value)) return null;
  const match = value.match(/\d[\d,]*/);
  if (!match) return null;
  const number = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(number) ? number : null;
}

function HouseFacts({ home }: { home: ReturnType<typeof getHome> }) {
  if (!home) return null;
  const lot =
    home.lotAcres && home.lotSqft
      ? `${home.lotAcres} acre (about ${Number(home.lotSqft).toLocaleString("en-US")} sq ft)`
      : home.lotAcres
        ? `${home.lotAcres} acre`
        : null;
  const rows: { label: string; value: string }[] = [
    { label: "Bedrooms", value: home.beds },
    { label: "Bathrooms", value: home.baths },
    {
      label: "Square feet",
      value: parseCount(home.sqft)?.toLocaleString("en-US") ?? home.sqft,
    },
    ...(home.propertyType ? [{ label: "Home type", value: home.propertyType }] : []),
    ...(home.yearBuilt ? [{ label: "Year built", value: home.yearBuilt }] : []),
    ...(lot ? [{ label: "Lot", value: lot }] : []),
    ...(home.siding ? [{ label: "Siding", value: home.siding }] : []),
    ...(home.waterSewer ? [{ label: "Water and sewer", value: home.waterSewer }] : []),
  ];
  return (
    <section aria-labelledby="house-facts-heading">
      <h2 id="house-facts-heading" className="facts-heading">
        The house
      </h2>
      <dl className="facts">
        {rows.map((row) => (
          <div className="fact" key={row.label}>
            <dt>{row.label}</dt>
            <dd className={isTbd(row.value) ? "is-tbd" : undefined}>
              {isTbd(row.value) ? (
                <>
                  <span className="sr-only">Not posted yet. </span>
                  TBD
                  <small>Not posted yet</small>
                </>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

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
  const sized = !isTbd(home.beds) && !isTbd(home.baths) && !isTbd(home.sqft);
  const description = priced
    ? `${fullAddress(home)}. ${sized ? `${home.beds} bedroom, ${home.baths} bath, ${Number(home.sqft).toLocaleString("en-US")} sq ft. ` : ""}Owner financing from Rooted Path Homes. Purchase price ${formatMoney(home.purchasePrice)}, ${formatMoney(home.downPayment)} down, monthly payments from ${formatMoney(home.monthlyPayment)}.`
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
    ...(parseCount(home.beds) == null ? {} : { numberOfBedrooms: parseCount(home.beds) }),
    ...(parseCount(home.baths) == null ? {} : { numberOfBathroomsTotal: parseCount(home.baths) }),
    ...(parseCount(home.sqft) == null
      ? {}
      : {
          floorSize: {
            "@type": "QuantitativeValue",
            value: parseCount(home.sqft),
            unitCode: "FTK",
            unitText: "sq ft",
          },
        }),
    ...(parseCount(home.yearBuilt) == null ? {} : { yearBuilt: parseCount(home.yearBuilt) }),
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
              <HouseFacts home={home} />
              <HomeTerms home={home} />
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
