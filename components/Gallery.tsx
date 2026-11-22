"use client";

import { useState } from "react";
import type { HomePhoto } from "@/lib/homes";

export function Gallery({ photos, address }: { photos: HomePhoto[]; address: string }) {
  const [active, setActive] = useState(0);
  const photo = photos[active] ?? photos[0];
  if (!photo) return null;

  return (
    <div className="gallery">
      <img src={photo.src} alt={photo.alt} width={1200} height={800} fetchPriority="high" />
      {photos.length > 1 ? (
        <div className="thumbs" role="group" aria-label={`Photos of ${address}`}>
          {photos.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              aria-current={index === active ? "true" : undefined}
              aria-label={`Show photo ${index + 1} of ${photos.length}`}
              onClick={() => setActive(index)}
            >
              <img src={item.src} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
