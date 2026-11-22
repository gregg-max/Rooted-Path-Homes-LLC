import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getGuide, getGuides } from "@/lib/guides";

type Params = { slug: string };

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <article className="wrap narrow" style={{ paddingBottom: "3.5rem" }}>
      <div style={{ paddingTop: "1.25rem" }}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/guides", label: "Helpful Guides" },
            { label: guide.title },
          ]}
        />
      </div>
      <header className="page-header">
        <p className="eyebrow">{guide.minutes} minute read</p>
        <h1>{guide.title}</h1>
        <p className="lede">{guide.description}</p>
      </header>
      <div className="prose">
        {guide.sections.map((section) => (
          <section key={section.heading || section.paragraphs?.[0]?.slice(0, 32)}>
            {section.heading ? <h2>{section.heading}</h2> : null}
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <p>
          When you are ready, <Link href="/homes">see the home we have</Link> or{" "}
          <Link href="/book-a-tour">book a tour</Link>. The{" "}
          <Link href="/guides">other guides and the FAQ</Link> are gathered in one place.
        </p>
      </div>
    </article>
  );
}
