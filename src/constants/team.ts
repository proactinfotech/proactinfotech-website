export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  photo?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Mohammad Tahir Khan Gooty",
    role: "Founder · CEO · CTO",
    bio: "Visionary founder driving the strategic and technical direction of Proact Infotech.",
    linkedin: "https://www.linkedin.com/in/mohammad-tahir-khan-gooty",
    photo: "/images/mohammad_tahir_khan_gooty.jpeg",
  },
  {
    name: "Farhan Kazi",
    role: "Co-Founder · COO",
    bio: "Operations leader ensuring every venture runs with precision and purpose.",
    linkedin: "https://www.linkedin.com/in/farhan-kazi-98bb5427a",
    photo: "/images/farhan_kazi.jpeg",
  },
  {
    name: "Fakhruddin Syed",
    role: "Co-Founder · CMO",
    bio: "Marketing lead building brand identity, campaigns, and audience growth across all Proact ventures.",
    linkedin: "https://www.linkedin.com/in/fakruddin-syed-11b867295",
    photo: "/images/fakhruddin_syed.jpeg",
  },
  {
    name: "Ayaan Tabrez",
    role: "Co-Founder · CRO",
    bio: "Research lead driving product discovery, and data-informed decisions across all ventures.",
    linkedin: "https://www.linkedin.com/in/ayaantabrez",
    photo: "/images/ayaan_tabrez.jpeg",
  },
];
