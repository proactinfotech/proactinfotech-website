export interface NavPage {
  label: string;
  href: string;
}

export interface SectionLink {
  id: string;
  label: string;
  icon: string;
}

/** Main pages shown in bottom navigator */
export const PAGES: NavPage[] = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Culture", href: "/culture" },
  { label: "Careers", href: "/careers" },
  { label: "Investors", href: "/investors" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Per-page section anchors for floating side icons */
export const PAGE_SECTIONS: Record<string, SectionLink[]> = {
  "/home": [
    { id: "businesses", label: "Businesses", icon: "briefcase" },
    { id: "vision", label: "Vision", icon: "eye" },
    { id: "careers", label: "Working", icon: "users" },
    { id: "impact", label: "Impact", icon: "sparkles" },
  ],
  "/about": [
    
    { id: "story", label: "Story", icon: "book-open" },
    { id: "team", label: "Team", icon: "users" },
  ],
  "/culture": [
    
    { id: "values", label: "Values", icon: "heart" },
    { id: "principles", label: "Principles", icon: "compass" },
    { id: "life", label: "Life", icon: "sun" },
  ],
  "/careers": [
    
    { id: "why-join", label: "Why Join", icon: "star" },
    { id: "openings", label: "Openings", icon: "briefcase" },
  ],
  "/contact": [
    { id: "contact-form", label: "Form", icon: "mail" },
  ],
};
