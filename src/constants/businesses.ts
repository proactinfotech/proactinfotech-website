export interface Business {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  color: string;
}

export const BUSINESSES: Business[] = [
  {
    name: "Vertex AI",
    slug: "vertex-ai",
    tagline: "Intelligence at Scale",
    description:
      "Building next-generation AI infrastructure that powers enterprise solutions across industries.",
    longDescription:
      "Vertex AI develops cutting-edge artificial intelligence platforms that enable enterprises to harness the full potential of machine learning. From natural language processing to computer vision, our solutions are deployed across healthcare, finance, and logistics — transforming how organizations make decisions at scale.",
    url: "https://example.com/vertex",
    color: "hsl(16 88% 53%)",
  },
  {
    name: "NovaPay",
    slug: "novapay",
    tagline: "Payments, Reimagined",
    description:
      "Seamless digital payment solutions connecting millions of merchants and consumers worldwide.",
    longDescription:
      "NovaPay is redefining the payments landscape with instant, secure, and borderless transaction infrastructure. Our platform processes billions of transactions annually, empowering merchants of all sizes with tools for invoicing, subscriptions, and cross-border commerce.",
    url: "https://example.com/novapay",
    color: "hsl(30 100% 65%)",
  },

];

export function getBusinessBySlug(slug: string): Business | undefined {
  return BUSINESSES.find((b) => b.slug === slug);
}
