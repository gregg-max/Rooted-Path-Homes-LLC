import Link from "next/link";
import { mailHref, primaryNav, siteConfig, telHref, tourNav } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img
            className="footer-logo"
            src="/logo-primary.png"
            alt={`${siteConfig.company}. ${siteConfig.tagline}`}
            width={1400}
            height={968}
          />
          <p>
            {siteConfig.company} is {siteConfig.owners}&apos;s company. We buy modest single-family
            houses and sell them with owner financing, in plain English.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2>On this site</h2>
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href={tourNav.href}>{tourNav.label}</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2>Talk to us</h2>
          <p>
            <a href={telHref()}>{siteConfig.phoneDisplay}</a>
          </p>
          <p>
            <a href={mailHref()}>{siteConfig.email}</a>
          </p>
          <p>{capitalize(siteConfig.serviceArea)}</p>
        </div>
      </div>
      <div className="eho">
        <div className="wrap eho-inner">
          <EqualHousingIcon />
          <p>
            <strong>Equal Housing Opportunity.</strong> {siteConfig.company} follows the Fair
            Housing Act. We do not discriminate in housing because of race, color, religion, sex,
            disability, familial status, national origin, or any other characteristic protected by
            law.
          </p>
        </div>
      </div>
      <div className="legal-bar">
        <div className="wrap legal-inner">
          <p>
            © {year} {siteConfig.company}
          </p>
          <p>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function EqualHousingIcon() {
  return (
    <svg className="eho-icon" viewBox="0 0 64 64" role="img" aria-label="Equal Housing Opportunity">
      <path
        d="M6 30 32 8l26 22v26H6V30Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M18 38h28M18 48h28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
