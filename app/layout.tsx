import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "600", "700"],
});

const description = `${siteConfig.owners} sell modest single-family homes in southern Illinois with owner financing. A down payment, a monthly payment, and a note you can sit down and understand.`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.shortName} | ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.shortName}`,
  },
  description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.owners }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.company,
    title: `${siteConfig.shortName} | ${siteConfig.tagline}`,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.company}. ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | ${siteConfig.tagline}`,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#144418",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.company,
    slogan: siteConfig.tagline,
    url: getSiteUrl(),
    telephone: siteConfig.phoneTel,
    email: siteConfig.email,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Southern Illinois",
    },
    image: `${getSiteUrl()}/og.png`,
  };

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
