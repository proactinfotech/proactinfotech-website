export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Ava Chen",
    role: "CEO & Founder",
    bio: "Former VP at Stripe. Obsessed with building systems that scale.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Marcus Rivera",
    role: "CTO",
    bio: "Ex-Google engineer. Architect of distributed systems serving billions.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Priya Sharma",
    role: "COO",
    bio: "McKinsey alumna. Operational excellence across three continents.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "James Okonkwo",
    role: "CFO",
    bio: "Goldman Sachs veteran. Stewarding capital with discipline and vision.",
    linkedin: "https://linkedin.com",
  },
];
