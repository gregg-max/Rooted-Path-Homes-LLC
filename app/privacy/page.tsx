import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { mailHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Rooted Path Homes LLC uses the name, phone, email, and notes you send through this website. We use them to reply. We don't sell them.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="wrap narrow prose" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Privacy"
        title="What we do with what you send us."
        lede="This is the plain version. Last updated November 22, 2026."
      />
      <h2>Who we are</h2>
      <p>
        {siteConfig.company} runs this website. You can reach us at{" "}
        <a href={mailHref()}>{siteConfig.email}</a> or {siteConfig.phoneDisplay}.
      </p>
      <h2>What we collect</h2>
      <p>
        If you send a form, we collect the fields on that form. Depending on which form it is,
        that can include your name, phone number, email address, a property address, notes about
        timing or money, and which home you asked about. We also collect whatever you type into
        the message box.
      </p>
      <p>
        If you only read the site, we don&apos;t ask you to make an account, and we don&apos;t run
        advertising trackers.
      </p>
      <h2>Why we collect it</h2>
      <p>
        We use it to reply: to call you about a tour, to talk through a house, to answer a
        question, or to tell you when another home is available if you asked to be on a list. We
        don&apos;t sell your information. We don&apos;t rent it out. We don&apos;t send it to a
        lead marketplace.
      </p>
      <h2>Who else sees it</h2>
      <p>
        The form is delivered by Web3Forms, a form service that emails the same submission to
        gregg@rootedpathhomesllc.com and kristi@rootedpathhomesllc.com. Their
        own privacy terms cover that handoff. The website itself is hosted so it can be on the
        internet (we use Vercel for that). Those companies see the technical bits required to
        deliver the page and the email. They are not allowed, by us, to use your note for their
        own marketing.
      </p>
      <p>
        If you call or email us directly, that message lives in our phone or inbox, the same way
        any other conversation would.
      </p>
      <h2>How long we keep it</h2>
      <p>
        We keep a submission for as long as we need it to respond and to remember what we told
        you. If a conversation turns into a sale, we keep the records the law and the paperwork
        require. If you ask us to delete a note and we don&apos;t have to keep it, we will.
      </p>
      <h2>Your choices</h2>
      <p>
        Email {siteConfig.email} and ask for a copy of what we have from a form, or ask us to
        delete it. Tell us the email address or phone number you used so we can find the right
        note. We may keep something if a law, a signed contract, or a dispute requires it.
      </p>
      <h2>Cookies</h2>
      <p>
        We don&apos;t set advertising cookies. The company that hosts the site may use essential
        technical cookies so the pages load. We don&apos;t use them to build a profile of you.
      </p>
      <h2>Children</h2>
      <p>This site is for adults looking at housing. We don&apos;t knowingly collect information from children under 13.</p>
      <h2>Changes</h2>
      <p>
        If we change this page, we will update the date at the top. The way we treat a note you
        already sent will stay as decent as this version.
      </p>
    </div>
  );
}
