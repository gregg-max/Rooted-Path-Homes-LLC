import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { mailHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for using the Rooted Path Homes website. Listings can change, TBD means a number is not posted, and a form is not an approval or a contract.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="wrap narrow prose" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Terms"
        title="The ground rules for this website."
        lede="Last updated November 22, 2026. This page is here so nobody has to guess what a button means."
      />
      <h2>Information, not an offer</h2>
      <p>
        The words on this site are general information from {siteConfig.company}. A listing is an
        invitation to ask, not an offer you can accept by clicking. Prices, payments, room counts,
        and photos can change or be unfinished. When you see TBD, that fact is not posted yet. Do
        not treat a blank as a price of zero, and do not treat an example in a form field as a
        number we are offering.
      </p>
      <h2>A form is not a yes</h2>
      <p>
        Sending &quot;I&apos;m interested / apply,&quot; booking a tour, joining a list, or writing
        us does not reserve a home, lock a payment, create a contract, or mean you are approved
        for owner financing. We decide house by house and person by person. We can say no. You can
        say no.
      </p>
      <h2>Owner financing is specific</h2>
      <p>
        Seller financing terms — price, down payment, monthly payment, length of the note, taxes,
        insurance, and what happens if a payment is late — are written for one house. Nothing on a
        general page replaces that paperwork. Please read it, and show it to a lawyer or a
        HUD-approved housing counselor if you want another opinion. We are not your lawyer, and
        this website is not legal, tax, or financial advice.
      </p>
      <h2>Selling us a house</h2>
      <p>
        A seller form is a request for a conversation. We may make an offer, or we may not. You
        don&apos;t have to accept one. We buy some houses as-is for cash. We don&apos;t promise a
        closing date until the title work and the contract say so.
      </p>
      <h2>Fair housing</h2>
      <p>
        We follow the Fair Housing Act. We don&apos;t discriminate because of race, color,
        religion, sex, disability, familial status, national origin, or any other characteristic
        protected by law. See the statement in the footer.
      </p>
      <h2>The site itself</h2>
      <p>
        We work to keep the pages accurate and available. We don&apos;t promise the site will never
        have a typo, a missed photo, or a moment offline. If something looks wrong,{" "}
        <Link href="/contact">tell us</Link>. The logos and words are ours. Please don&apos;t copy
        the site and pretend it is yours.
      </p>
      <h2>Privacy</h2>
      <p>
        How we handle form notes is in the <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <h2>Talk to us</h2>
      <p>
        Questions about these terms: <a href={mailHref()}>{siteConfig.email}</a> or{" "}
        {siteConfig.phoneDisplay}.
      </p>
    </div>
  );
}
