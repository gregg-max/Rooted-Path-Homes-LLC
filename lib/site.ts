import site from "@/data/site.json";

export const siteConfig = site;

export const primaryNav = [
  { href: "/homes", label: "Find a Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/guides", label: "Helpful Guides" },
  { href: "/fixer-uppers", label: "Fixer-Uppers" },
  { href: "/sell", label: "Sell Us Your House" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Let's Talk" },
] as const;

export const tourNav = { href: "/book-a-tour", label: "Book a Tour" } as const;

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const vercel = process.env.VERCEL_URL?.trim();
  const raw = explicit || vercelProduction || vercel;
  if (!raw) return "http://localhost:3000";
  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export function telHref() {
  return `tel:${siteConfig.phoneTel}`;
}

export function mailHref() {
  return `mailto:${siteConfig.email}`;
}
