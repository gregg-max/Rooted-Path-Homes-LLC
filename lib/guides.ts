import guidesData from "@/data/guides.json";
import faqsData from "@/data/faqs.json";

export type GuideSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  sections: GuideSection[];
};

export type Faq = {
  question: string;
  answer: string;
};

export function getGuides(): Guide[] {
  return guidesData as Guide[];
}

export function getGuide(slug: string) {
  return getGuides().find((guide) => guide.slug === slug);
}

export function getFaqs(): Faq[] {
  return faqsData as Faq[];
}
