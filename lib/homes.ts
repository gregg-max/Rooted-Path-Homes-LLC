import homesData from "@/data/homes.json";

export const HOME_STATUSES = ["Available", "Pending", "Sold"] as const;
export type HomeStatus = (typeof HOME_STATUSES)[number];

export type HomePhoto = {
  src: string;
  alt: string;
};

export type PaymentOption = {
  label: string;
  payments: number;
  principalAndInterest: string;
  propertyTax: string;
  total: string;
};

export type Home = {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county?: string;
  status: HomeStatus;
  beds: string;
  baths: string;
  sqft: string;
  purchasePrice: string;
  downPayment: string;
  amountFinanced?: string;
  interestRate?: string;
  monthlyPayment: string;
  annualPropertyTax?: string;
  summaryPdf?: string;
  paymentOptions?: PaymentOption[];
  description: string;
  photos: HomePhoto[];
};

function assertHome(value: Home, index: number) {
  const where = value.address || `home #${index + 1}`;
  if (!value.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug)) {
    throw new Error(
      `The slug for ${where} in data/homes.json needs lowercase words and dashes, like 426-north-st-murphysboro.`,
    );
  }
  if (!HOME_STATUSES.includes(value.status)) {
    throw new Error(
      `Status for ${where} must be exactly Available, Pending, or Sold.`,
    );
  }
  if (!value.photos?.length) {
    throw new Error(
      `Add at least one photo for ${where}. The coming-soon picture is /images/photo-coming-soon.svg.`,
    );
  }
}

export function getHomes(): Home[] {
  const homes = homesData as Home[];
  const slugs = new Set<string>();
  homes.forEach((home, index) => {
    assertHome(home, index);
    if (slugs.has(home.slug)) {
      throw new Error(`Two homes share the slug "${home.slug}". Each slug has to be unique.`);
    }
    slugs.add(home.slug);
  });
  const rank: Record<HomeStatus, number> = { Available: 0, Pending: 1, Sold: 2 };
  return [...homes].sort((a, b) => rank[a.status] - rank[b.status]);
}

export function getHome(slug: string) {
  return getHomes().find((home) => home.slug === slug);
}

export function fullAddress(home: Pick<Home, "address" | "city" | "state" | "zip">) {
  return `${home.address}, ${home.city}, ${home.state} ${home.zip}`;
}

export function mapsUrl(home: Pick<Home, "address" | "city" | "state" | "zip">) {
  return `https://maps.google.com/?q=${encodeURIComponent(fullAddress(home))}`;
}

export function tourableHomes() {
  return getHomes().filter((home) => home.status !== "Sold");
}
