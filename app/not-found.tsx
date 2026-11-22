import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap narrow" style={{ padding: "3rem 0 4rem" }}>
      <p className="eyebrow">404</p>
      <h1>We can&apos;t find that page.</h1>
      <p className="lede">
        The link may be old, or the address may have a typo. The home we have posted is still on
        Find a Home.
      </p>
      <div className="btn-row">
        <Link className="btn" href="/homes">
          Find a Home
        </Link>
        <Link className="btn btn-ghost" href="/">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
