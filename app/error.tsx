"use client";

import { siteConfig } from "@/lib/site";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap narrow" style={{ padding: "3rem 0 4rem" }}>
      <h1>Something went sideways.</h1>
      <p className="lede">
        Try that once more. If it keeps happening, call {siteConfig.phoneDisplay} and we&apos;ll
        help you the old-fashioned way.
      </p>
      <button className="btn" type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
