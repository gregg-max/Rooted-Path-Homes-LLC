import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { TOUR_DAYS, TOUR_HOME_UNSURE, TOUR_TIMES } from "@/lib/forms";
import { fullAddress, getHome, tourableHomes } from "@/lib/homes";

export const metadata: Metadata = {
  title: "Book a Tour",
  description:
    "Ask Rooted Path Homes for a tour. Pick a home, the days and times that usually work, and how to reach you. We'll call to confirm. The form is a request, not a locked-in appointment.",
  alternates: { canonical: "/book-a-tour" },
};

export default async function BookTourPage({
  searchParams,
}: {
  searchParams: Promise<{ home?: string }>;
}) {
  const { home: slug } = await searchParams;
  const homes = tourableHomes();
  const requested = slug ? getHome(slug) : undefined;
  const selected = requested && requested.status !== "Sold" ? requested : undefined;
  const options = [
    ...homes.map((home) => ({
      value: fullAddress(home),
      label: `${fullAddress(home)} (${home.status})`,
    })),
    { value: TOUR_HOME_UNSURE, label: TOUR_HOME_UNSURE },
  ];

  return (
    <div className="wrap" style={{ paddingBottom: "3.5rem" }}>
      <PageHeader
        eyebrow="Book a Tour"
        title="Come see a house before you decide anything."
        lede="Tell us which home, and which days and times usually work. We'll call to confirm a real time. Picking a box here is a request, not an appointment, until we talk."
      />

      <div className="split" style={{ marginTop: "1.4rem" }}>
        <div className="prose">
          <p>
            Wear shoes you can walk a yard in. Bring another person if you want a second set of
            ears. Ask about the roof, the heat, the windows, and anything you would worry about at
            10 p.m.
          </p>
          <p>
            A tour is free. It does not reserve the house, and it does not mean you are approved
            to buy it. If you already know you want to talk numbers, you can also use the
            &quot;I&apos;m interested / apply&quot; form on the home&apos;s page.
          </p>
          {requested?.status === "Sold" ? (
            <p className="callout">
              {requested.address} is marked sold. You can still ask about another house, or choose
              &quot;not a specific house yet.&quot;
            </p>
          ) : null}
          <p>Morning is about 8 to noon. Afternoon is noon to 4. Evening is 4 to 7.</p>
        </div>
        <LeadForm
          form="tour"
          initialValues={selected ? { home: fullAddress(selected) } : {}}
          submitLabel="Request a tour"
          disclaimer="This request does not reserve the home, does not confirm an appointment, and does not mean you are approved for owner financing."
          successTitle="We got your tour request."
          successBody="We'll call to confirm a day and time. It isn't on the calendar until we talk."
          fields={[
            { name: "home", label: "Home", type: "select", required: true, options },
            {
              name: "days",
              label: "Preferred days",
              type: "checkboxes",
              required: true,
              help: "Pick every day that usually works. We'll narrow it down by phone.",
              options: TOUR_DAYS.map((value) => ({ value, label: value })),
            },
            {
              name: "times",
              label: "Preferred times",
              type: "checkboxes",
              required: true,
              options: TOUR_TIMES.map((value) => ({ value, label: value })),
            },
            { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", width: "half" },
            { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", width: "half" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "notes", label: "Anything we should know before we call?", type: "textarea" },
          ]}
        />
      </div>
    </div>
  );
}
